<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/config/api'

/* ================= STATE ================= */
const assignments = ref([])
const loading = ref(false)
const searchQuery = ref('')

/* ================= FETCH ================= */
const loadAssignments = async () => {
  loading.value = true
  try {
    const res = await api().get(`/success-team-tasks?with=solution,software,user,assignedPerson,outputs,successTeam`)
    assignments.value = res.data.data ?? res.data
  } catch (err) {
    console.error('Failed to load tasks', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadAssignments)

/* ================= FILTER ================= */
const filteredAssignments = computed(() => {
  if (!searchQuery.value) return assignments.value

  const q = searchQuery.value.toLowerCase()

  return assignments.value.filter(t =>
    (t.solution?.name || '').toLowerCase().includes(q) ||
    (t.software?.name || '').toLowerCase().includes(q) ||
    (t.assigned_user?.name || '').toLowerCase().includes(q) ||
    (t.description || '').toLowerCase().includes(q)
  )
})

/* ================= HELPERS ================= */
const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const statusClass = (status) => {
  const map = {
    Pending: 'badge-neutral',
    'In Progress': 'badge-info',
    Completed: 'badge-success',
    Overdue: 'badge-error'
  }
  return map[status] || 'badge-ghost'
}

/* ================= ACTIONS ================= */
const deleteTask = async (id) => {
  if (!confirm('Are you sure?')) return
  try {
    await api().delete(`/success-team-tasks/${id}`)
    assignments.value = assignments.value.filter(t => t.id !== id)
  } catch (err) {
    alert('Failed to delete task')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200/70 via-base-200 to-base-300/60 pb-16 pt-10 px-5 sm:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Header -->
      <header class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Task List
          </h1>
          <p class="mt-2 text-lg text-base-content/70">
            Manage success team tasks
          </p>
        </div>

        <button
          class="btn btn-primary btn-lg"
          @click="$router.push('/assignments/create')"
        >
          + New Task
        </button>
      </header>

      <!-- Search -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          placeholder="Search solution, software, assignee..."
          class="input input-bordered w-full"
        />
      </div>

      <!-- Table -->
      <div class="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Solution</th>
                <th>Software</th>
                <th>Assigned To</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="loading">
                <td colspan="8" class="text-center py-10">Loading...</td>
              </tr>

              <tr
                v-for="(task, index) in filteredAssignments"
                :key="task.id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ task.solution?.name || '—' }}</td>
                <td>{{ task.software?.name || '—' }}</td>
                <td>{{ task.assigned_person?.name || '—' }}</td>
                <td class="max-w-xs truncate">
                  {{ task.description || '—' }}
                </td>
                <td>
                  <span class="badge" :class="statusClass(task.status)">
                    {{ task.status || 'Pending' }}
                  </span>
                </td>
                <td>{{ formatDate(task.created_at) }}</td>
                <td class="text-right">
                  <div class="flex justify-end gap-2">
                    <button class="btn btn-sm btn-outline btn-info">
                      View
                    </button>
                    <button class="btn btn-sm btn-outline btn-warning">
                      Edit
                    </button>
                    <button
                      class="btn btn-sm btn-outline btn-error"
                      @click="deleteTask(task.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!loading && !filteredAssignments.length">
                <td colspan="8" class="text-center py-12 opacity-60">
                  No tasks found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
