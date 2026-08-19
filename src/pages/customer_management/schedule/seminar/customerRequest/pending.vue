<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🕓 Pending Seminar Requests
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title or requester..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <select
        v-model="filterStatus"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <!-- Requests Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Title</th>
            <th class="py-3 border-e px-4">Requested By</th>
            <th class="py-3 border-e px-4">Date</th>
            <th class="py-3 border-e px-4">Status</th>
            <!-- <th class="py-3 border-e px-4 text-right">Action</th> -->
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(req, index) in filteredRequests"
            :key="req.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ req.title }}</td>
            <td class="py-3 border-e px-4">{{ req.requestedBy }}</td>
            <td class="py-3 border-e px-4">{{ req.date }}</td>
            <td class="py-3 border-e px-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  req.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : req.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ req.status }}
              </span>
            </td>

            <!-- <td class="py-3 px-4 text-right flex justify-end gap-3">
              <button
                v-if="req.status === 'pending'"
                @click="approveRequest(req)"
                class="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Approve
              </button>
              <button
                v-if="req.status === 'pending'"
                @click="rejectRequest(req)"
                class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Reject
              </button>
              <button
                class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                @click="viewDetails(req)"
              >
                View
              </button>
            </td> -->
          </tr>

          <tr v-if="filteredRequests.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No seminar requests found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Details Modal -->
    <div
      v-if="selectedRequest"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[500px] p-6 relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          @click="selectedRequest = null"
        >
          <i class="fa fa-times"></i>
        </button>

        <h2 class="text-xl font-bold text-emerald-700 mb-3">
          {{ selectedRequest.title }}
        </h2>
        <p><strong>Requested By:</strong> {{ selectedRequest.requestedBy }}</p>
        <p><strong>Date:</strong> {{ selectedRequest.date }}</p>
        <p><strong>Status:</strong> {{ selectedRequest.status }}</p>
        <p class="mt-3 text-gray-700">{{ selectedRequest.description }}</p>
      </div>
    </div>

    <!-- Toast Message -->
    <div
      v-if="toastMessage"
      class="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')
const selectedRequest = ref(null)
const toastMessage = ref('')

const requests = ref([
  {
    id: 1,
    title: 'Next-Gen Cloud Architecture',
    requestedBy: 'Rasik Ahmed',
    date: '2025-10-12',
    status: 'pending',
    description: 'A seminar proposal focusing on cloud-native patterns and serverless systems.',
  },
  {
    id: 2,
    title: 'AI in Modern Software',
    requestedBy: 'Nafis Hasan',
    date: '2025-10-10',
    status: 'pending',
    description: 'Approved seminar discussing how AI is changing enterprise workflows.',
  },
  {
    id: 3,
    title: 'UI/UX Trends 2025',
    requestedBy: 'Tariq Hossain',
    date: '2025-10-13',
    status: 'pending',
    description: 'Proposed seminar highlighting the latest user interface design best practices.',
  },
])

const filteredRequests = computed(() => {
  return requests.value.filter(req =>
    (filterStatus.value ? req.status === filterStatus.value : true) &&
    (req.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     req.requestedBy.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

const approveRequest = (req) => {
  req.status = 'approved'
  showToast(`✅ "${req.title}" has been approved`)
}

const rejectRequest = (req) => {
  req.status = 'rejected'
  showToast(`❌ "${req.title}" has been rejected`)
}

const viewDetails = (req) => {
  selectedRequest.value = req
}

const showToast = (msg) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
