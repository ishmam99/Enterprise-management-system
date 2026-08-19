<template>
  <div class="w-full mx-auto px-5 py-5">
    <div class="w-full">

      <!-- Header -->
      <header class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight
                   bg-gradient-to-r from-primary to-secondary
                   bg-clip-text text-transparent">
            Task List
          </h1>
          <p class="mt-2 text-lg text-base-content/70">
            All Tasks assigned to {{ authStore.user?.name || 'you' }}
          </p>
        </div>
      </header>

      <!-- Search -->
      <div class="mb-8">
        <label class="input input-bordered flex items-center gap-2 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search by solution, software, description..."
            class="grow" />
        </label>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl shadow border overflow-x-auto">
        <table class="min-w-full text-sm table-zebra">
          <thead class="bg-sky-200 text-gray-600">
            <tr>
              <th class="px-4 py-3 border-e text-left font-medium">#</th>
              <th class="px-4 py-3 border-e text-left font-medium">Solution</th>
              <th class="px-4 py-3 border-e text-left font-medium">Software</th>
              <th class="px-4 py-3 border-e text-left font-medium">Task Type</th>
              <th class="px-4 py-3 border-e text-left font-medium">Description</th>
              <th class="px-4 py-3 border-e text-left font-medium">Action List</th>
              <th class="px-4 py-3 border-e text-left font-medium">Task Status</th>
              <th class="px-4 py-3 border-e text-left font-medium">Assigned By</th>
              <th class="px-4 py-3 border-e text-left font-medium">Assigned To</th>
              <th class="px-4 py-3 border-e text-left font-medium">Task Date</th>
              <th class="px-4 py-3 text-center font-medium">Add Action</th>
            </tr>
          </thead>

          <tbody>
            <!-- Loading -->
            <tr v-if="loading">
              <td colspan="9" class="px-4 py-12 text-center">
                <span class="loading loading-spinner loading-lg"></span>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="!filteredAssignments.length">
              <td colspan="9" class="px-4 py-12 text-center text-gray-500">
                No tasks found
              </td>
            </tr>

            <!-- Data Rows -->
            <tr v-else v-for="(assignment, index) in filteredAssignments" :key="assignment.id"
              class="border-t hover:bg-gray-50 transition">
              <td class="px-4 py-3 border-e">{{ index + 1 }}</td>
              <td class="px-4 py-3 border-e font-medium">{{ assignment.solution?.name || 'N/A' }}</td>
              <td class="px-4 py-3 border-e">{{ assignment.software?.name || 'N/A' }}</td>
              <td class="px-4 py-3 border-e text-blue-600">{{ assignment.type || 'N/A' }}</td>
              <td class="px-4 py-3 border-e break-words whitespace-normal">
                <div class="w-64">
                  <p @click="showTextDescription = showTextDescription == assignment.id ? null : assignment.id" class=""
                    :class="showTextDescription != assignment.id ? 'truncate' : ''">
                    {{ assignment.description || 'No description' }}
                  </p>
                </div>
              </td>

              <!-- Outputs -->
              <td class="px-4 py-3 border-e">
                <div class="flex flex-col gap-2 ">
                  <div v-for="output in assignment.outputs" :key="output.id"
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
                  <div v-if="!assignment.outputs.length" class="text-gray-500 text-xs">No Actions</div>
                </div>
              </td>

              <td class="px-4 py-3 border-e">
                <span class="badge p-1" :class="statusColor(assignment.status)">
                  {{ assignment.status }}
                </span>
              </td>
              <td class="px-4 py-3 border-e">{{ assignment.user?.name || 'N/A' }}</td>
              <td class="px-4 py-3 border-e">{{ assignment.assignedTo?.name || 'N/A' }}</td>
              <td class="px-4 py-3 border-e">{{ formatDate(assignment.date) }}</td>

              <!-- Add Action Button -->
              <td class="px-4 py-3 border-e text-center">
                <button @click="openAddModal(assignment.id)"
                  class="px-3 py-1.5 rounded-md shadow bg-emerald-500 text-white text-xs hover:bg-emerald-600">
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

        <!-- Footer -->
        <div class="p-4 border-t border-base-300/60 text-sm text-base-content/70">
          Showing {{ filteredAssignments.length }} of {{ assignments.length }}
        </div>
      </div>

      <!-- Add Action Modal -->
      <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4">Add Action</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Date</label>
              <input v-model="newActionDate" type="date" class="w-full border rounded-lg p-2 text-sm" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Action Details</label>
              <textarea v-model="newActionText" class="w-full border rounded-lg p-2 text-sm" rows="4"
                placeholder="Enter action details"></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button @click="showAddModal = false" class="px-4 py-2 border rounded">
              Cancel
            </button>
            <button @click="saveAction" :disabled="savingAction"
              class="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2 disabled:opacity-60">
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const assignments = ref([])
const searchQuery = ref('')
const loading = ref(false)
const postingIds = ref(new Set())

const showAddModal = ref(false)
const showStatusUpdateModal = ref(false)
const newActionText = ref('')
const newActionDate = ref('')
const newCompletionDate = ref('')
const selectedTaskId = ref(null)
const selectedOutputId = ref(null)
const savingAction = ref(false)
const isLoadingUpdateStatus = ref(false)
const showText = ref(null)
const showTextDescription = ref(null)

const assignedPersonId = computed(() => authStore.user?.id)

const filteredAssignments = computed(() => {
  if (!searchQuery.value) return assignments.value

  const q = searchQuery.value.toLowerCase()
  return assignments.value.filter(a =>
    a.solution?.name?.toLowerCase().includes(q) ||
    a.software?.name?.toLowerCase().includes(q) ||
    a.description?.toLowerCase().includes(q) ||
    a.outputs.some(o => o.output.toLowerCase().includes(q))
  )
})

const statusColor = (status) => {
  const map = {
    pending: 'badge-success',
    'in progress': 'badge-info',
    completed: 'badge-secondary',
    overdue: 'badge-error'
  }
  return map[status?.toLowerCase()] || 'badge-ghost'
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/* ------------------ API ------------------ */
const loadAssignments = async () => {
  if (!assignedPersonId.value) return
  loading.value = true
  try {
    const res = await api().get('/success-team-tasks', {
      params: {
        assigned_to: assignedPersonId.value,
        with: 'solution,software,user,assignedPerson,outputs,successTeam',
      }
    })

    assignments.value = res.data.data.map(item => ({
      id: item.id,
      solution: { name: item.solution?.name },
      software: { name: item.software?.name },
      assignedTo: { name: item.assigned_person?.name },
      description: item.description,
      status: item.status,
      createdAt: item.created_at,
      outputs: item.outputs || [],
      type: item.type || 'N/A',
      user: { name: item.user?.name },
      date: item.date,
    }))
  } catch (e) {
    console.error('Failed to load assignments', e)
  } finally {
    loading.value = false
  }
}

/* ------------------ Output Actions ------------------ */
const updateOutput = async (output) => {
  const { value } = await Swal.fire({
    title: 'Update Action',
    input: 'textarea',
    inputValue: output.output,
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: async (text) => {
      await api().post(`/success-team-task/${output.id}`, {
        _method: 'put',
        output: text,
      })
    }
  })

  if (value !== undefined) {
    Swal.fire('Updated!', 'Action updated successfully', 'success')
    loadAssignments()
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
    loadAssignments()
  }
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
    loadAssignments()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', `Could not Mark Completed action`, 'error')
  } finally {
    postingIds.value.delete(selectedOutputId.value)
    showStatusUpdateModal.value = false
  }
}

/* ------------------ Add Action ------------------ */
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
    loadAssignments()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', 'Could not save action', 'error')
  } finally {
    savingAction.value = false
  }
}

/* ------------------ Watch ------------------ */
watch(
  () => authStore.user,
  (user) => {
    if (user?.id) loadAssignments()
  },
  { immediate: true }
)
</script>
