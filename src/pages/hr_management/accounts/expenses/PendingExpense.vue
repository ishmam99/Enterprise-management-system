<template>
  <SectionMain class="mx-10">
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-green-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Pending Expense"
      main
    >
      <div class="text-left flex items-center mb-2">
        <p
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd]"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
            ></path>
          </svg>
          Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <div class="space-y-4 mt-6">
      <div v-if="filteredExpenses.length > 0">
        <table class="w-full table-auto bg-white">
          <thead>
            <tr>
              <th class="border px-4 py-2">Title</th>
              <th class="border px-4 py-2">Description</th>
              <th class="border px-4 py-2">Amount</th>
              <th class="border px-4 py-2">File</th>
              <th class="border px-4 py-2">Date</th>
              <th class="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in filteredExpenses" :key="expense.id">
              <td class="border px-4 py-2">
                <span v-if="editingExpense?.id !== expense.id" class="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ expense.title }}</span>
                <input v-else v-model="editingExpense.title" class="border rounded px-2 py-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <span v-if="editingExpense?.id !== expense.id" class="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ expense.description }}</span>
                <input v-else v-model="editingExpense.description" class="border rounded px-2 py-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <span v-if="editingExpense?.id !== expense.id" class="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ expense.amount }}</span>
                <input
                  v-else
                  v-model="editingExpense.amount"
                  class="border rounded px-2 py-1 w-full"
                  @input="validateAmount"
                />
              </td>
              <td class="border px-4 py-2">
                <a v-if="expense.file && editingExpense?.id !== expense.id" :href="expense.file" target="_blank" class="text-sm text-blue-500">View File</a>
                <span v-else-if="editingExpense?.id !== expense.id">N/A</span>
                <input v-else type="file" @change="handleFileChange(expense.id, $event)" :value="editingExpense.file ? editingExpense.file.name : ''" />
              </td>
              <td class="border px-4 py-2">
                <span v-if="editingExpense?.id !== expense.id" class="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ expense.date }}</span>
                <input v-else v-model="editingExpense.date" class="border rounded px-2 py-1 w-full" type="date" />
              </td>
              <td class="border px-4 py-2">
                <button v-if="editingExpense?.id !== expense.id" @click="editExpense(expense)" class="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
                <button v-else @click="updateExpense" class="px-4 py-2 me-2 bg-green-600 text-white rounded">Save</button>
                <button v-if="editingExpense?.id === expense.id" @click="cancelEditing" class="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
                <button v-if="editingExpense?.id !== expense.id" @click="deleteExpense(expense.id)" class="ml-2 px-4 py-2 bg-red-600 text-white rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-10">No pending expenses available.</div>
    </div>
  </SectionMain>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { mdiAccountMultiplePlus } from '@mdi/js'
import Swal from 'sweetalert2'

import { useHRM } from '@/composables/useHRM'


const router = useRouter()

const expenses = ref([])
const filteredExpenses = ref([])
const loading = ref(false)
const editingExpense = ref(null)
const files = ref({})
const originalExpenses = ref({})
const {hrmApi} = useHRM();
const fetchExpenses = async () => {
  loading.value = true
  try {
    const response = await hrmApi.get('expense')
    expenses.value = response.data.data
    filteredExpenses.value = expenses.value.filter(expense => expense.status === 0)
    filteredExpenses.value.forEach(expense => {
      originalExpenses.value[expense.id] = { ...expense }
    })
  } catch (error) {

    console.error(error)
  }
  loading.value = false
}

const editExpense = (expense) => {
  editingExpense.value = { ...expense }
}

const updateExpense = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('title', editingExpense.value.title)
    formData.append('description', editingExpense.value.description)

    const amountToSend = editingExpense.value.amount !== originalExpenses.value[editingExpense.value.id]?.amount
      ? String(editingExpense.value.amount)
      : String(originalExpenses.value[editingExpense.value.id]?.amount)
    formData.append('amount', amountToSend)

    const fileToSend = files.value[editingExpense.value.id] || originalExpenses.value[editingExpense.value.id].file
    if (fileToSend) {
      formData.append('file', fileToSend)
    }

    formData.append('date', editingExpense.value.date)

    formData.append('_method', 'PUT')

    await api().post(`expense/${editingExpense.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    fetchExpenses()
    editingExpense.value = null
  } catch (error) {

    console.error(error)
  }
  loading.value = false
}

const deleteExpense = async (expenseId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This expense will be deleted permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    loading.value = true
    try {
      await api().delete(`expense/${expenseId}`)

      fetchExpenses()
    } catch (error) {

      console.error(error)
    }
    loading.value = false
  }
}

const cancelEditing = () => {
  editingExpense.value = null
}

const handleFileChange = (expenseId, event) => {
  files.value[expenseId] = event.target.files[0]
}

const validateAmount = () => {}

onMounted(() => {
  fetchExpenses()
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.w-full {
  width: 100%;
  box-sizing: border-box;
}

.overflow-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.border.px-4.py-2 {
  min-width: 150px;
}

.border.px-4.py-2:last-child {
  min-width: 200px;
}

.border.px-4.py-2 button {
  padding: 8px 12px;
  font-size: 14px;
}
.space-y-4.mt-6 {
  margin-left: auto;
  margin-right: auto;
}

table {
  width: 100%;
  table-layout: auto;
}

input[type="text"], input[type="date"] {
  max-width: 150px;
  box-sizing: border-box;
}

input[type="file"] {
  max-width: 200px;
  box-sizing: border-box;
}
</style>
