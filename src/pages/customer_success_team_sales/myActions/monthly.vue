<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">
  My Action - Weekly
</h2>


      <!-- Month Selector -->
   <div class="flex items-center gap-3">
        <button
          @click="prevMonth"
          class="px-3 py-1 flex items-center gap-1 rounded-md border text-sm bg-sky-500 text-white hover:bg-sky-600"
        > 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path></svg>
          Previous Month
        </button>

        <span class="text-sm border border-sky-500 rounded-md px-2 py-1 font-medium text-gray-700">
          {{ currentMonthLabel }}
        </span>

        <button
          @click="nextMonth"
          class="px-3 py-1 rounded-md border flex items-center gap-1 text-sm bg-sky-500 text-white hover:bg-sky-600"
        >
          Next Month 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"></path></svg>
        </button>
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-xl shadow border overflow-x-auto">
    <table class="min-w-full text-sm table-zebra">
  <thead class="bg-sky-200 text-gray-600">
    <tr>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Parent Company</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Solution Area</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Software Name</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Task Description</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Task Assigned By</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Task Assigned To</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Assigned Date</th>
      <th class="px-4 border-e border-white py-3 text-left font-medium">Action List</th>
      <th class="px-4 border-white py-3 text-center font-medium">Add Action</th>
    </tr>
  </thead>

  <tbody>
    <!-- Loading -->
    <tr v-if="loading">
      <td colspan="7" class="px-4 py-8 text-center text-gray-500">
        <div class="flex gap-2 items-center justify-center">
          <span class="loading loading-spinner"></span>
          <span>Loading...</span>
        </div>
      </td>
    </tr>

    <!-- Empty state -->
    <tr v-else-if="actionData && actionData.length === 0">
      <td colspan="7" class="px-4 py-8 text-center text-gray-500">
        No tasks found for this week
      </td>
    </tr>

    <!-- Data rows -->
    <tr
      v-else
      v-for="task in actionData"
      :key="task.id"
      class="border-t hover:bg-gray-50 transition"
    >
      <td class="px-4 py-3 border-e">
        {{ authStore.companyName || '-' }}
      </td>

      <td class="px-4 py-3 border-e">
        {{ task.success_team_task.solution.name || '-' }}
      </td>

      <td class="px-4 py-3 border-e">
        {{ task?.success_team_task?.software?.name || '-' }}
      </td>

      <td class="px-4 py-3 border-e text-gray-700">
        {{ task.success_team_task.description }}
      </td>

      <td class="px-4 py-3 border-e">
        {{ task.success_team_task.user.name || '-' }}
      </td>
      <td class="px-4 py-3 border-e">
        {{ authStore.user.name || '-' }}
      </td>
      <td class="px-4 py-3 border-e text-nowrap">
        {{ task.success_team_task.date || '-' }}
      </td>

      <!-- Action List -->
                  <td class="px-4 py-3 border-e">
                <div class="flex flex-col gap-2 ">
                  <div v-for="output in task.success_team_task.outputs" :key="output.id"
                    class="flex items-center justify-between gap-2 bg-gray-50 rounded-lg p-2 shadow-sm">
                    <div class="flex flex-col w-96">
                      <span @click=" showText = showText == output.id ? null : output.id" class="text-sm text-gray-800"
                        :class="showText != output.id ? 'truncate' : ''">{{ output.output }}</span>
                      <span v-if="output.status == 1" class="text-xs font-medium" :class="'text-green-600'">
                        {{ 'Completed' }}
                        <span class="text-xs font-medium" :class="'text-blue-600'">
                          {{ output.completed_at == null ? "" : ` ||
                          Completed
                          at: ${formatDate(output.completed_at)}` }}
                        </span>
                      </span>

                    </div>
                    <div class="flex gap-2">
                      <button class="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                        @click="updateOutput(output)">
                        Update
                      </button>
                      <button v-if="output.status == 0" @click="openUpdateStatusModal(output.id)"
                        :disabled="postingIds.has(output.id)"
                        class="px-2 py-1 text-xs rounded flex items-center gap-2 text-white disabled:opacity-60 transition"
                        :class="'bg-emerald-500 hover:bg-emerald-600'
                          ">
                        <span v-if="postingIds.has(output.id)" class="loading loading-spinner loading-xs"></span>
                        <span>Complete</span>
                      </button>
                      <button class="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                        @click="deleteOutput(output.id)">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div v-if="!task.success_team_task.outputs.length" class="text-gray-500 text-xs">No Actions</div>
                </div>
              </td>

      <!-- Add Action -->
      <td class="px-4 py-3 border-e text-center">
        <button
          @click="openAddModal(task.success_team_task_id)"
          class="px-3 py-1.5 rounded-md shadow bg-emerald-500 text-white text-xs hover:bg-emerald-600"
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                    fill="currentColor">
                    <path
                      d="M11 11.0001L11 2.0005L13 2.00049L13 11.0001L22.0001 10.9999L22.0002 12.9999L13 13.0001L13.0001 22L11.0001 22L11.0001 13.0001L2.00004 13.0003L2 11.0003L11 11.0001Z">
                    </path>
                  </svg>
        </button>
      </td>
    </tr>
  </tbody>
</table>

    </div>
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
    <p class="text-center border-b-2 text-xl font-semibold mb-2 pb-1">Add Action</p>
                <div class="mb-2">
              <label class="block text-lg font-semibold mb-2">Date</label>
              <input v-model="newActionDate" type="date" class="w-full border rounded-lg p-2 text-sm" />
            </div>

    <h3 class="text-lg font-semibold mb-2">Add Action</h3>

    <textarea
      v-model="newActionText"
      class="w-full border rounded-lg p-2 text-sm"
      rows="4"
      placeholder="Enter action details"
    ></textarea>

    <div class="flex justify-end gap-2 mt-4">
      <button @click="showAddModal=false" class="px-4 py-2 border rounded">
        Cancel
      </button>
<button
  @click="saveAction"
  :disabled="savingAction"
  class="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2 disabled:opacity-60"
>
  <span v-if="savingAction" class="loading loading-spinner loading-xs"></span>
  <span>{{ savingAction ? 'Saving...' : 'Save' }}</span>
</button>

    </div>
  </div>
</div>

<div v-if="showStatusUpdateModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4">Mark Completed</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Date</label>
              <input v-model="newCompletionDate" type="date" class="w-full border rounded-lg p-2 text-sm" />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button @click="showStatusUpdateModal = false" class="px-4 py-2 border rounded">
              Cancel
            </button>
            <button @click="toggleStatusOutput" :disabled="isLoadingUpdateStatus"
              class="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2 disabled:opacity-60">
              <span v-if="isLoadingUpdateStatus" class="loading loading-spinner loading-xs"></span>
              <span>{{ isLoadingUpdateStatus ? 'updating...' : 'Mark' }}</span>
            </button>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
/* ------------------ Month Logic ------------------ */
const currentDate = ref(new Date())
const authStore = useAuthStore()
const weekRange = computed(() => {
  const date = new Date(currentDate.value)
  const day = date.getDay() || 7

  const start = new Date(date)
  start.setDate(date.getDate() - day + 1)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return { start, end }
})

const currentMonthLabel = computed(() =>
  currentDate.value.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })
)


const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
  fetchActions()
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
  fetchActions()
}


const actionData = ref([])
const fetchActions = async () => {
  loading.value = true

const date = new Date(currentDate.value)
const day = date.getDay() || 7   // Sunday fix

const start = new Date(date)
start.setDate(date.getDate() - day + 1) // Monday

const end = new Date(start)
end.setDate(start.getDate() + 6) // Sunday


  try {
    const { data } = await api().get(
      `my-success-team-task-outputs`, {
        params: {
          created_at_from: start.toISOString().slice(0, 10),
          created_at_to: end.toISOString().slice(0, 10),
          group_by: 'success_team_task_id',
          with: 'successTeamTask.outputs,successTeamTask.solution,successTeamTask.software,successTeamTask.user'
        }
      }
    )

    actionData.value = data.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}



const loading = ref(false)

const updateOutput = async (output) => {
  const { value } = await Swal.fire({
    title: 'Update Action',
    input: 'textarea',
    inputValue: output.output,
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: async (text) => {
      await api().post(`/success-team-task-outputs/${output.id}`, {
        _method: 'put',
        output: text,
      })
    }
  })

  if (value !== undefined) {
    Swal.fire('Updated!', 'Action updated successfully', 'success')
    fetchActions()
  }
}

const deleteOutput = async (outputId) => {
  const res = await Swal.fire({
    title: 'Delete this action?',
    text: 'This cannot be undone',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Delete'
  })

  if (res.isConfirmed) {
    await api().delete(`/success-team-task-outputs/${outputId}`)
    Swal.fire('Deleted!', 'Action removed', 'success')
    fetchActions()
  }
}

const showAddModal = ref(false)
const showStatusUpdateModal = ref(false)
const newActionText = ref('')
const newActionDate = ref('')
const selectedTaskId = ref(null)
const newCompletionDate = ref('')
const selectedOutputId = ref(null)
const openAddModal = (taskId) => {
  selectedTaskId.value = taskId
  newActionText.value = ''
  newActionDate.value = ''
  showAddModal.value = true
}
const openUpdateStatusModal = (outputId) => {
  selectedOutputId.value = outputId
  newCompletionDate.value = ''
  showStatusUpdateModal.value = true
}
const savingAction = ref(false)
const saveAction = async () => {
  if (!newActionText.value.trim()) return

  savingAction.value = true
  try {
    await api().post(`/success-team-tasks/${selectedTaskId.value}/outputs`, {
      output: newActionText.value,
      date: newActionDate.value
    })

    showAddModal.value = false
    Swal.fire('Saved!', 'Action added successfully', 'success')
    fetchActions()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', 'Could not save action', 'error')
  } finally {
    savingAction.value = false
  }
}
const postingIds = ref(new Set())
const togglePostOutput = async (output) => {
  const isPosting = output.status == 0
  const actionText = isPosting ? 'Post' : 'Un-Post'

  const res = await Swal.fire({
    title: `${actionText} this action?`,
    text: isPosting
      ? 'This will mark the action as posted'
      : 'This will revert the action to pending',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: actionText,
    confirmButtonColor: isPosting ? '#10b981' : '#f59e0b'
  })

  if (!res.isConfirmed) return

  postingIds.value.add(output.id)

  try {
    await api().post(`/success-team-task-outputs/${output.id}`, {
      _method: 'put',
      status: isPosting ? 1 : 0
    })

    Swal.fire(
      isPosting ? 'Posted!' : 'Un-Posted!',
      `Action successfully ${isPosting ? 'posted' : 'un-posted'}`,
      'success'
    )

    fetchActions()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', `Could not ${actionText.toLowerCase()} action`, 'error')
  } finally {
    postingIds.value.delete(output.id)
  }
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const toggleStatusOutput = async () => {
  const res = await Swal.fire({
    title: `Mark completed this action?`,
    text:
      'This will mark the action as completed'
    ,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Mark Completed',
    confirmButtonColor: '#10b981'
  })

  if (!res.isConfirmed) return

  postingIds.value.add(selectedOutputId.value)
  try {
    await api().post(`/success-team-task-outputs/${selectedOutputId.value}`, {
      _method: 'put',
      status: 1,
      completed_at: newCompletionDate.value,
    })
    Swal.fire(
      'Marked Completed!',
      `Action successfully marked completed`,
      'success'
    )
    fetchActions()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', `Could not Mark Completed action`, 'error')
  } finally {
    postingIds.value.delete(selectedOutputId.value)
    showStatusUpdateModal.value = false
  }
}


/* ------------------ Init ------------------ */
onMounted(() => {
  fetchActions()
})
</script>
