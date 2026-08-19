<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10">
      <h1 class="text-4xl font-bold text-indigo-900 mb-3">All Applications</h1>
      <p class="text-lg text-indigo-700">
        View and manage all candidate applications across active job openings
      </p>
    </div>

    <!-- Applications Table -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5">
        <h2 class="text-2xl font-semibold text-white">Candidate Applications ({{ applications.length }})</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Candidate</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Education</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Software</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Applied On</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">System</th>
              <th class="px-8 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- Loading State Row -->
            <tr v-if="loading">
              <td :colspan="7" class="px-8 py-12 text-center">
                <div class="flex flex-col items-center justify-center gap-4">
                  <div class="loading loading-spinner loading-lg text-indigo-600"></div>
                  <p class="text-xl text-gray-500">Loading applications...</p>
                </div>
              </td>
            </tr>

            <!-- Empty State Row -->
            <tr v-else-if="applications.length === 0 && !loading">
              <td :colspan="7" class="px-8 py-16 text-center">
                <p class="text-xl text-gray-500">No applications received yet.</p>
              </td>
            </tr>

            <!-- Application Rows -->
            <tr v-for="app in applications" :key="app.id" class="hover:bg-gray-50 transition-colors">
              <!-- Candidate Column -->
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-bold text-lg">
                    {{ getInitial(app.full_name) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ app.full_name }}</p>
                    <p class="text-sm text-gray-500">{{ app.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Contact Column -->
              <td class="px-8 py-5">
                <div>
                  <p class="text-base text-gray-700">{{ app.contact }}</p>
                  <p class="text-sm text-gray-500 mt-1">Emergency: {{ app.emergency_contact }}</p>
                </div>
              </td>

              <!-- Education Column -->
              <td class="px-8 py-5">
                <div>
                  <p class="text-base text-gray-700">{{ app.highest_education || 'Not specified' }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ app.university || 'Not specified' }}</p>
                </div>
              </td>

              <!-- Software Column -->
              <td class="px-8 py-5">
                <div v-if="app.software" class="flex items-center gap-2">
                  <div v-if="app.software.image" class="w-8 h-8">
                    <img :src="app.software.image" :alt="app.software.name" class="w-full h-full object-cover rounded">
                  </div>
                  <span class="text-base text-gray-700">{{ app.software.name }}</span>
                </div>
                <span v-else class="text-base text-gray-400">{{ app.softwares || 'Not specified' }}</span>
              </td>

              <!-- Applied On Column -->
              <td class="px-8 py-5">
                <span class="text-base text-gray-600">{{ formatDate(app.created_at) }}</span>
              </td>

              <!-- System Column -->
              <td class="px-8 py-5">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  {{ app.system }}
                </span>
              </td>

              <!-- Actions Column -->
              <td class="px-8 py-5 text-center">
                <div class="flex items-center justify-center gap-3">
                  <!-- View Details Button -->
                  <router-link
                    :to="`/hr_management/recruitment/applications/applicant-details/${app.id}`"
                    class="btn btn-outline btn-sm btn-info"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Details
                  </router-link>

                  <!-- Shortlist Button -->
                  <button
                    @click="shortlist(app.id)"
                    :disabled="loadingOnShortlist[app.id]"
                    class="btn btn-outline btn-sm btn-success"
                  >
                    <span v-if="loadingOnShortlist[app.id]" class="loading loading-spinner loading-xs"></span>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Shortlist
                  </button>

                  <!-- Reject Button -->
                  <button
                    @click="reject(app.id)"
                    :disabled="loadingOnReject[app.id]"
                    class="btn btn-outline btn-sm btn-error"
                  >
                    <span v-if="loadingOnReject[app.id]" class="loading loading-spinner loading-xs"></span>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
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
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue'

const applications = ref([]);
const loading = ref(false);
const loadingOnShortlist = ref({});
const loadingOnReject = ref({});

const getInitial = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const shortlist = async(id) => {
  // Show confirmation modal without hover issues
  Swal.fire({
    title: 'Shortlist Candidate?',
    text: 'Are you sure you want to shortlist this candidate?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, shortlist',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    focusCancel: false,
    allowEscapeKey: true,
    allowEnterKey: true,
    reverseButtons: false,
    showClass: {
      popup: 'animate__animated animate__fadeIn'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut'
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadingOnShortlist.value[id] = true;

      try {
        const { data } = await api().post(`applied-job-status/${id}`, {
          status: 2,
          _method: 'PUT'
        });

        Swal.fire({
          title: 'Success!',
          text: 'Candidate has been shortlisted successfully.',
          icon: 'success',
          confirmButtonColor: '#10B981',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        getAllApplications();
      } catch (error) {
        console.error('Shortlist error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to shortlist candidate. Please try again.',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        });
      } finally {
        loadingOnShortlist.value[id] = false;
      }
    }
  });
}

const reject = async(id) => {
  // Show confirmation modal without hover issues
  Swal.fire({
    title: 'Reject Candidate?',
    text: 'Are you sure you want to reject this candidate? This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    focusCancel: false,
    allowEscapeKey: true,
    allowEnterKey: true,
    reverseButtons: false,
    showClass: {
      popup: 'animate__animated animate__fadeIn'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut'
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadingOnReject.value[id] = true;

      try {
        const { data } = await api().post(`applied-job-status/${id}`, {
          status: 4,
          _method: 'PUT'
        });

        Swal.fire({
          title: 'Rejected!',
          text: 'Candidate has been rejected.',
          icon: 'success',
          confirmButtonColor: '#EF4444',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        getAllApplications();
      } catch (error) {
        console.error('Reject error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to reject candidate. Please try again.',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        });
      } finally {
        loadingOnReject.value[id] = false;
      }
    }
  });
}

const getAllApplications = async() => {
  loading.value = true;
  try {
    const { data } = await api().get('applied-jobs');
    applications.value = data.data.filter(e => e.status == 1);
  } catch(error) {
    console.error('Error loading applications:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to load applications. Please try again.',
      icon: 'error',
      confirmButtonColor: '#4F46E5'
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllApplications();
})
</script>

