<template>
  <div class="mx-auto pb-8">
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <i class="ri-filter-2-line text-3xl font-bold text-gray-800"></i>
        <select class="select">
          <option disabled selected>All</option>
          <option>ELH-Tanveer/Sam Build</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <i class="ri-pencil-fill cursor-pointer" @click="showColumnPopup = true"></i>
        <i class="ri-restart-line"></i>
        <p class="flex items-center w-full">
          Welcome <span class="ml-1 font-semibold text-blue-600">{{ authUser?.name }}</span>!
        </p>
      </div>
      <h1>My Accounts By Industry : <span class="uppercase"> {{ route.params.name }}</span></h1>
      <div class="flex items-center space-x-4">
        <i class="ri-align-justify"></i>

        <router-link to="/crm/accounts/createAccount" class="btn btn-primary"> Create Account </router-link>
        <select class="select">
          <option disabled selected>Actions</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
      </div>
    </div>

    <!-- Column Selection Popup -->
    <!-- Column Selection Popup -->
    <div v-if="showColumnPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-3/4 max-w-4xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Manage Columns</h3>
          <button @click="showColumnPopup = false" class="text-gray-500 hover:text-gray-700">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <div class="flex space-x-6">
          <!-- Available Columns -->
          <div class="flex-1 border border-gray-200 rounded p-4">
            <h4 class="font-medium text-gray-700 mb-3">Available Columns</h4>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="column in availableColumns" :key="column.name"
                class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click="addColumn(column.name)">
                <i class="ri-add-line mr-2 text-gray-500"></i>
                <span>{{ column.name }}</span>
              </div>
            </div>
          </div>

          <!-- Selected Columns -->
          <div class="flex-1 border border-gray-200 rounded p-4">
            <h4 class="font-medium text-gray-700 mb-3">Selected Columns</h4>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="column in visibleColumns" :key="column.name"
                class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div class="flex items-center">
                  <i class="ri-drag-move-2-line mr-2 text-gray-400 cursor-move"></i>
                  <span>{{ column.name }}</span>
                </div>
                <i class="ri-close-line text-gray-500 hover:text-red-500 cursor-pointer"
                  @click.stop="removeColumn(column.name)"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button @click="showColumnPopup = false" class="btn btn-outline">Cancel</button>
          <button @click="applyColumnSelection" class="btn btn-primary">Apply</button>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center p-4 bg-slate-200">
      <p class="text-gray-600 mt-2">
        Total Records: <span class="font-bold">42,801</span> Sort By
        <span class="font-bold">Last SSEM Call Date</span> unsort
      </p>
      <div class="flex items-center space-x-4">
        <select class="select">
          <option disabled selected>100 Records Per Page</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <p>1 - 100</p>
        <div class="flex items-center space-x-2">
          <i class="ri-arrow-left-line"></i>
          <i class="ri-arrow-right-line"></i>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-100 text-gray-800">
            <th class="border border-gray-300 px-4 py-2">
              <input type="checkbox" class="checkbox" />
            </th>
            <th v-for="col in visibleColumns" :key="col.name"
              class="border border-gray-300 px-4 py-2 text-sm font-semibold">
              <p class="flex justify-between gap-2">{{ col.name }} <span><i class="ri-menu-line"></i></span></p>
            </th>
            <th class="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in groupedTableData" :key="rowIndex"
            :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'"
            @click="navigateToAccountDetails(row)">
            <td class="border border-gray-200 px-4 py-2">
              <input type="checkbox" class="checkbox" />
            </td>
            <td v-for="col in visibleColumns" :key="col.name"
              class="border border-gray-200 px-4 py-2 text-sm text-gray-700">
              <router-link :to="{name: 'crm-Accounts-accountsPage', params:{id:col.id}}" class="text-wrap">{{ row[col.name] || '-' }}</router-link>
              <!-- <router-link :to="{name: 'crm-Accounts-accountsPage2', params:{id:col.id}}" class="text-wrap">{{ row[col.name] || '-' }}</router-link> -->
            </td>
            <td class="border border-gray-200 px-4 py-2">
              <div class="flex space-x-2 justify-center">
                <button class="text-blue-600 hover:text-blue-800">
                  <i class="ri-edit-line"></i>
                </button>
                <button class="text-red-600 hover:text-red-800">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAccountsStore } from '@/stores/AccountStore'
import { storeToRefs } from 'pinia'

const store = useAccountsStore()
const { tableData, allColumns } = storeToRefs(store)

const authStore = useAuthStore()
const authUser = computed(() => authStore.user)

const showColumnPopup = ref(false)
const selectedColumns = ref(allColumns.value.map((col) => col.name))

import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const route = useRoute()

const router = useRouter()

const navigateToAccountDetails = (row) => {
  router.push({
    name: 'account-details',
    params: { id: row['Account ID'] || row.id },
    state: { accountData: row }
  })
}
// Group tableData into proper rows
const groupedTableData = computed(() => {
  const result = []
  let currentRow = {}
  let columnsInRow = new Set()

  tableData.value.forEach((item, index) => {
    // If we encounter a column that's already in the current row, start a new row
    if (columnsInRow.has(item.name)) {
      result.push(currentRow)
      currentRow = {}
      columnsInRow = new Set()
    }

    currentRow[item.name] = item.value
    columnsInRow.add(item.name)

    // Push the last row if we're at the end
    if (index === tableData.value.length - 1) {
      result.push(currentRow)
    }
  })

  return result
})

const visibleColumns = computed(() => {
  return allColumns.value.filter((col) => selectedColumns.value.includes(col.name))
})

const availableColumns = computed(() => {
  return allColumns.value.filter((col) => !selectedColumns.value.includes(col.name))
})

const addColumn = (columnName) => {
  if (!selectedColumns.value.includes(columnName)) {
    selectedColumns.value.push(columnName)
  }
}

const removeColumn = (columnName) => {
  selectedColumns.value = selectedColumns.value.filter((col) => col !== columnName)
}

const applyColumnSelection = () => {
  showColumnPopup.value = false
}
</script>

<style scoped>
.checkbox {
  @apply h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-outline {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50;
}

.select {
  @apply border border-gray-300 rounded-md px-3 py-1 bg-white;
}

/* Additional styles for the column management */
.cursor-move {
  cursor: move;
}
</style>
