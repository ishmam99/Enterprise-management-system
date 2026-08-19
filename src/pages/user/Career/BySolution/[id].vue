<template>
  <div class="w-full px-10 py-4 bg-slate-100 min-h-screen">
    <div
      class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-6 shadow-lg"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">{{ softwareName }} - Career Development</h1>
          <p class="text-sm opacity-80">Track your learning, training &amp; growth</p>
        </div>

        <button
          class="bg-white text-indigo-600 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition"
          @click="
            router.push({
              path: '/user/Career/BySolution/create',
              query: { solution_id: route.params.id, name: route.query.name }
            })
          "
        >
          + Add Development
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow p-4">
      <div class="overflow-x-auto">
        <table class="w-full text-sm table-zebra">
          <thead>
            <tr class="text-left border-b bg-sky-200 text-slate-600">
              <th class="p-3 border-x">Title</th>
              <!-- <th class="p-3 border-x">Solution</th> -->
              <th class="p-3 border-e">Type</th>
              <th class="p-3 border-e">Status</th>
              <th class="p-3 border-e">Priority</th>
              <th class="p-3 border-e">Estimated Hours</th>
              <th class="p-3 border-e">Start Date</th>
              <th class="p-3 border-e">End Date</th>
              <th class="p-3 border-e text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="50" class="text-center p-10 text-slate-400">
                <div class="flex items-center justify-center space-x-2">
                  <span class="loading loading-spinner"></span>
                  <span>Loading developments...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="!loading && developments.length == 0">
              <td colspan="50" class="text-center p-10 text-slate-400">
                No developments found for this solution.
              </td>
            </tr>
            <tr
              v-for="item in developments"
              v-else
              :key="item.id"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 border-x font-medium text-slate-800">
                {{ item.title }}
              </td>

              <!-- <td class="p-3 border-e font-medium text-slate-800">
                {{ route.query.solution_name || 'N/A' }}
              </td> -->

              <td class="p-3 border-e">
                <span class="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs capitalize">
                  {{ item.type }}
                </span>
              </td>

              <td class="p-3 border-e">
                <span class="px-2 py-1 rounded text-xs" :class="statusClass(item.status)">
                  {{ formatStatus(item.status) }}
                </span>
              </td>

              <td class="p-3 border-e">
                <span class="px-2 py-1 rounded bg-emerald-100 text-emerald-600 text-xs capitalize">
                  {{ item.priority }}
                </span>
              </td>
              <td class="p-3 border-e">
                <span class="px-2 py-1 rounded bg-sky-100 text-sky-600 text-xs capitalize">
                  {{ item.estimated_hours }} hrs
                </span>
              </td>

              <td class="p-3 border-e text-slate-600">
                {{ item.start_date }}
              </td>
              <td class="p-3 border-e text-slate-600">
                {{ item.end_date }}
              </td>

              <td class="p-3 border-e text-center">
                <button
                  @click="deleteItem(item.id)"
                  class="text-red-400 hover:text-red-600 transition"
                >
                  <i class="ri-delete-bin-line text-xl"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const developments = ref([])
const loading = ref(false)
const softwareName = ref('')

const fetchData = async (id) => {
  if (!id) return
  try {
    loading.value = true
    const { data } = await api().get(`/end-user-road-maps?solution_id=${id}`)
    developments.value = data?.data || []
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return

  try {
    await api().delete(`/end-user-road-maps/${id}`)
    developments.value = developments.value.filter((item) => item.id !== id)
    Swal.fire('Deleted!', 'Item has been deleted.', 'success')
  } catch (err) {
    console.error('Delete error:', err)
    Swal.fire('Error!', 'Failed to delete item.', 'error')
  }
}

const statusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-600'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const formatStatus = (status) => {
  return status ? status.replace('_', ' ').toUpperCase() : 'N/A'
}

// Watch handles the initial load (via immediate) and any route changes
watch(
  () => [route.params.id, route.query.name],
  ([newId, newName]) => {
    softwareName.value = newName || 'Solution'
    fetchData(newId)
  },
  { immediate: true }
)
</script>
