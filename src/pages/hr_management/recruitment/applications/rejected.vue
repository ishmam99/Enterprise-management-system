<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header with back button -->
    <div class="mx-auto mb-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-4xl font-bold text-indigo-900 mb-3">Rejected Applications</h1>
          <p class="text-lg text-indigo-700">
            View and manage all rejected candidate applications
          </p>
        </div>
        <router-link 
          to="/hr_management/recruitment/applications"
          class="btn btn-outline btn-primary"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Applications
        </router-link>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Rejected</p>
              <p class="text-3xl font-bold text-red-600 mt-2">{{ applications.length }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-3xl font-bold text-orange-600 mt-2">{{ thisMonthCount }}</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Last 7 Days</p>
              <p class="text-3xl font-bold text-purple-600 mt-2">{{ lastWeekCount }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p class="text-3xl font-bold text-amber-600 mt-2">0</p>
            </div>
            <div class="p-3 bg-amber-100 rounded-full">
              <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-5">
        <h2 class="text-2xl font-semibold text-white">Rejected Applications ({{ applications.length }})</h2>
      </div>

      <!-- Filters -->
      <div class="px-8 py-4 bg-gray-50 border-b border-gray-200">
        <div class="flex flex-wrap items-center gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Filter by Date</span>
            </label>
            <input 
              type="date" 
              v-model="dateFilter"
              class="input input-bordered input-sm w-full max-w-xs"
              @change="filterApplications"
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Filter by System</span>
            </label>
            <select 
              v-model="systemFilter"
              class="select select-bordered select-sm w-full max-w-xs"
              @change="filterApplications"
            >
              <option value="">All Systems</option>
              <option v-for="system in uniqueSystems" :key="system" :value="system">{{ system }}</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Search</span>
            </label>
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search by name, email, or contact..."
                class="input input-bordered input-sm pl-10 w-full max-w-xs"
                @input="filterApplications"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div class="ml-auto">
            <button 
              @click="resetFilters"
              class="btn btn-outline btn-sm btn-secondary mt-6"
            >
              Reset Filters
            </button>
          </div>
        </div>
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
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Rejected On</th>
              <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">System</th>
              <th class="px-8 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- Loading State Row -->
            <tr v-if="loading">
              <td :colspan="8" class="px-8 py-12 text-center">
                <div class="flex flex-col items-center justify-center gap-4">
                  <div class="loading loading-spinner loading-lg text-red-600"></div>
                  <p class="text-xl text-gray-500">Loading rejected applications...</p>
                </div>
              </td>
            </tr>

            <!-- Empty State Row -->
            <tr v-else-if="filteredApplications.length === 0 && !loading">
              <td :colspan="8" class="px-8 py-16 text-center">
                <div class="flex flex-col items-center justify-center gap-4">
                  <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-xl text-gray-500">No rejected applications found.</p>
                  <p v-if="hasActiveFilters" class="text-gray-400">
                    Try adjusting your filters or
                    <button @click="resetFilters" class="text-red-600 hover:text-red-800 font-medium ml-1">
                      reset all filters
                    </button>
                  </p>
                </div>
              </td>
            </tr>

            <!-- Application Rows -->
            <tr v-for="app in filteredApplications" :key="app.id" class="hover:bg-red-50 transition-colors">
              <!-- Candidate Column -->
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-800 font-bold text-lg">
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
              
              <!-- Rejected On Column -->
              <td class="px-8 py-5">
                <span class="text-base text-red-600 font-medium">{{ formatDate(app.updated_at) }}</span>
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
                  
                  <!-- Restore Button -->
                  <button 
                    @click="restore(app.id)" 
                    :disabled="loadingOnRestore[app.id]"
                    class="btn btn-outline btn-sm btn-success"
                  >
                    <span v-if="loadingOnRestore[app.id]" class="loading loading-spinner loading-xs"></span>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Restore
                  </button>
                  
                  <!-- Delete Button -->
                  <button 
                    @click="deletePermanently(app.id)" 
                    :disabled="loadingOnDelete[app.id]"
                    class="btn btn-outline btn-sm btn-error"
                  >
                    <span v-if="loadingOnDelete[app.id]" class="loading loading-spinner loading-xs"></span>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredApplications.length > 0 && !loading" class="px-8 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ Math.min(filteredApplications.length, 1) }} to {{ Math.min(filteredApplications.length, 10) }} of {{ filteredApplications.length }} entries
          </div>
          <div class="join">
            <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">
              Previous
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="join-item btn btn-sm"
              :class="{ 'btn-active': currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage++">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue'

const applications = ref([]);
const filteredApplications = ref([]);
const loading = ref(false);
const loadingOnRestore = ref({});
const loadingOnDelete = ref({});

// Filter states
const searchQuery = ref('');
const dateFilter = ref('');
const systemFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

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

// Computed properties
const uniqueSystems = computed(() => {
  const systems = applications.value.map(app => app.system).filter(Boolean);
  return [...new Set(systems)];
});

const thisMonthCount = computed(() => {
  const now = new Date();
  const thisMonth = applications.value.filter(app => {
    const appDate = new Date(app.updated_at);
    return appDate.getMonth() === now.getMonth() && 
           appDate.getFullYear() === now.getFullYear();
  });
  return thisMonth.length;
});

const lastWeekCount = computed(() => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeek = applications.value.filter(app => {
    const appDate = new Date(app.updated_at);
    return appDate >= oneWeekAgo && appDate <= now;
  });
  return lastWeek.length;
});

const hasActiveFilters = computed(() => {
  return searchQuery.value || dateFilter.value || systemFilter.value;
});

const totalPages = computed(() => {
  return Math.ceil(filteredApplications.value.length / itemsPerPage);
});

const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredApplications.value.slice(start, end);
});

// Filter function
const filterApplications = () => {
  let filtered = [...applications.value];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(app => 
      app.full_name?.toLowerCase().includes(query) ||
      app.email?.toLowerCase().includes(query) ||
      app.contact?.toLowerCase().includes(query)
    );
  }
  
  // Date filter
  if (dateFilter.value) {
    filtered = filtered.filter(app => {
      const appDate = new Date(app.updated_at).toISOString().split('T')[0];
      return appDate === dateFilter.value;
    });
  }
  
  // System filter
  if (systemFilter.value) {
    filtered = filtered.filter(app => app.system === systemFilter.value);
  }
  
  filteredApplications.value = filtered;
  currentPage.value = 1;
}

const resetFilters = () => {
  searchQuery.value = '';
  dateFilter.value = '';
  systemFilter.value = '';
  filteredApplications.value = [...applications.value];
  currentPage.value = 1;
}

const restore = async(id) => {
  Swal.fire({
    title: 'Restore Candidate?',
    text: 'This will move the candidate back to active applications.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, restore',
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
      loadingOnRestore.value[id] = true;
      
      try {
        const { data } = await api().post(`applied-job-status/${id}`, {
          status: 1,
          _method: 'PUT'
        });
        
        Swal.fire({
          title: 'Restored!',
          text: 'Candidate has been restored to active applications.',
          icon: 'success',
          confirmButtonColor: '#10B981',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        
        getAllApplications();
      } catch (error) {
        console.error('Restore error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to restore candidate. Please try again.',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        });
      } finally {
        loadingOnRestore.value[id] = false;
      }
    }
  });
}

const deletePermanently = async(id) => {
  Swal.fire({
    title: 'Delete Permanently?',
    text: 'This action cannot be undone. The candidate data will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete permanently',
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
      loadingOnDelete.value[id] = true;
      
      try {
        const { data } = await api().delete(`applied-jobs/${id}`);
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Candidate has been permanently deleted.',
          icon: 'success',
          confirmButtonColor: '#EF4444',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        
        getAllApplications();
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to delete candidate. Please try again.',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        });
      } finally {
        loadingOnDelete.value[id] = false;
      }
    }
  });
}

const getAllApplications = async() => {
  loading.value = true;
  try {
    const { data } = await api().get('applied-jobs');
    // Filter for rejected applications (status = 4 as per your code)
    applications.value = data.data.filter(e => e.status == 4);
    filteredApplications.value = [...applications.value];
  } catch(error) {
    console.error('Error loading applications:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to load rejected applications. Please try again.',
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