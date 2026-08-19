<template>
  <div class="p-6">
    <!-- <Breadcrumb /> -->
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-800">
        My Action - Monthly
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
        No tasks found for this month
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

      <!-- Action List -->
      <td class="px-4 py-3 border-e">
        <div class="flex flex-col gap-2">
          <div
            v-for="output in task.success_team_task.outputs || []"
            :key="output.id"
            class="flex items-center justify-between gap-2 bg-gray-50 rounded-lg p-2"
          >
            <div class="flex flex-col">
              <span class="text-sm text-gray-800">
                {{ output.output }}
              </span>

              <span
                class="text-xs font-medium"
                :class="output.status == 0 ? 'text-yellow-600' : 'text-green-600'"
              >
                {{ output.status == 0 ? 'Pending' : 'Completed' }}
              </span>
            </div>

<div class="flex gap-2">
  <button
    class="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
    @click="updateOutput(output)"
  >
    Update
  </button>

<button
  @click="togglePostOutput(output)"
  :disabled="postingIds.has(output.id)"
  class="px-2 py-1 text-xs rounded flex items-center gap-2 text-white
    disabled:opacity-60
    transition"
  :class="output.status == 0
    ? 'bg-emerald-500 hover:bg-emerald-600'
    : 'bg-yellow-500 hover:bg-yellow-600'"
>
  <span
    v-if="postingIds.has(output.id)"
    class="loading loading-spinner loading-xs"
  ></span>

  <span>
    {{ output.status == 0 ? 'Post' : 'Un-Post' }}
  </span>
</button>


  <button
    class="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
    @click="deleteOutput(output.id)"
  >
    Delete
  </button>
</div>

          </div>
        </div>
      </td>

      <!-- Add Action -->
      <td class="px-4 py-3 border-e text-center">
        <button
          @click="openAddModal(task.success_team_task_id)"
          class="px-3 py-1.5 rounded-md bg-emerald-500 text-white text-xs hover:bg-emerald-600"
        >
          Add
        </button>
      </td>
    </tr>
  </tbody>
</table>

    </div>
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
  <div class="bg-white rounded-xl p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Add Action</h3>

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

  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
import Breadcrumb from '@/components/Breadcrumb.vue'
/* ------------------ Month Logic ------------------ */
const currentDate = ref(new Date())
const authStore = useAuthStore()
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

  const start = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  const end = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)

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
const newActionText = ref('')
const selectedTaskId = ref(null)
const openAddModal = (taskId) => {
  selectedTaskId.value = taskId
  newActionText.value = ''
  showAddModal.value = true
}
const savingAction = ref(false)
const saveAction = async () => {
  if (!newActionText.value.trim()) return

  savingAction.value = true
  try {
    await api().post(`/success-team-tasks/${selectedTaskId.value}/outputs`, {
      output: newActionText.value
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


/* ------------------ Init ------------------ */
onMounted(() => {
  fetchActions()
})
</script>
