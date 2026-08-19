<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <!-- Profile Header -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fade-in-up border border-gray-100">
      <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 p-6 text-white relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 opacity-20 rounded-full translate-y-12 -translate-x-12"></div>

        <div class="flex justify-between items-center relative z-10">
          <div>
            <h1 class="text-4xl font-bold font-serif bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {{ store?.user?.name  }}
            </h1>
            <h1 class="text-4xl font-bold font-serif bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              User Profile
            </h1>
          </div>
          <button
            @click="navigateToEdit"
            class="flex items-center gap-2 px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-white border-opacity-30"
          >
            <i class="fas fa-edit"></i>
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading profile data...</p>
      </div>

      <!-- Error State -->
      <!-- <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-500 text-lg mb-4">
          <i class="fas fa-exclamation-triangle"></i>
          {{ error }}
        </div>
        <button
          @click="fetchUserData"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div> -->

      <!-- Profile Content -->
      <div v-else-if="userData" class="p-6 bg-gradient-to-br from-gray-50 to-white">
        <!-- Personal Information Section -->
        <div class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 border-b-2 border-purple-200 pb-3 mb-6 flex items-center">
            <div class="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg mr-3 shadow-md">
              <i class="fas fa-user text-white text-lg"></i>
            </div>
            Personal Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Info -->
            <div class="space-y-5">
              <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-sm text-purple-600 font-semibold flex items-center">
                  <i class="fas fa-envelope mr-2"></i>Email
                </p>
                <p class="font-medium text-gray-800 mt-1">{{ store?.user?.email || 'Not provided' }}</p>
              </div>
              <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-sm text-blue-600 font-semibold flex items-center">
                  <i class="fas fa-phone mr-2"></i>Phone
                </p>
                <p class="font-medium text-gray-800 mt-1">{{ store?.user?.profile?.phone || 'Not provided' }}</p>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="space-y-5">
              <div class="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-sm text-pink-600 font-semibold flex items-center">
                  <i class="fas fa-user-tag mr-2"></i>Username
                </p>
                <p class="font-medium text-gray-800 mt-1">{{ store?.user?.profile?.username  || 'Not provided' }}</p>
              </div>

              <!-- Company Name from customer_id -->
              <div class="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-sm text-indigo-600 font-semibold flex items-center">
                  <i class="fas fa-building mr-2"></i>Company
                </p>
                <p class="font-medium text-gray-800 mt-1">
                  {{ companyName || 'Loading company...' }}
                  <span v-if="loadingCompany" class="text-xs text-gray-500 ml-2">
                    <i class="fas fa-spinner fa-spin"></i>
                  </span>
                </p>
                <!-- <p v-if="store?.user?.profile?.customer_id" class="text-xs text-gray-500 mt-1">
                  Customer ID: {{ store?.user?.profile?.customer_id }}
                </p> -->
              </div>

              <div class="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-sm text-teal-600 font-semibold flex items-center">
                  <i class="fas fa-home mr-2"></i>Address
                </p>
                <p class="font-medium text-gray-800 mt-1">{{ store?.user?.profile?.address || 'Not provided' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Software Skills Section -->
        <div class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 border-b-2 border-green-200 pb-3 mb-6 flex items-center">
            <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3 shadow-md">
              <i class="fas fa-laptop-code text-white text-lg"></i>
            </div>
            Software Skills
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="software in store?.user?.profile?.softwares"
              :key="software.id"
              class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p class="text-sm text-green-600 font-semibold flex items-center">
                <i class="fas fa-cube mr-2"></i>{{ software.name }}
              </p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs font-medium px-2 py-1 rounded-full"
                      :class="getLevelClass(software.pivot.level)">
                  {{ software.pivot.level || 'Not set' }}
                </span>
                <span class="text-xs text-gray-500">
                  ID: {{ software.id }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Software Levels Section -->
        <div class="mb-10">
          <h2 class="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-6 flex items-center">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg mr-3 shadow-md">
              <i class="fas fa-chart-bar text-white text-lg"></i>
            </div>
            Detailed Software Levels
          </h2>

          <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg overflow-hidden">
              <thead class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <tr>
                  <th class="py-3 px-4 text-left">Software</th>
                  <th class="py-3 px-4 text-left">Level</th>
                  <th class="py-3 px-4 text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="level in store?.user?.profile?.softwares"
                  :key="level.id"
                  class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4 font-medium text-gray-800">
                    {{ level.name }}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-xs font-medium px-2 py-1 rounded-full"
                          :class="getLevelClass(level.level)">
                      {{ level.pivot.level || 'Not set' }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">
                    {{ formatDate(level.updated_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="p-8 text-center">
        <p class="text-gray-600">No user data available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const store = useAuthStore();

// Reactive data
const userData = ref(store.user)
const loading = ref(false)
const error = ref(null)
const companyName = ref('')
const loadingCompany = ref(false)


// Methods
// const fetchUserData = async () => {
//   loading.value = true
//   error.value = null

//   try {
//     const response = await api().get('/login')

//     if (response.data && response.data.user) {
//       userData.value = response.data.user
      
//       // If customer_id exists, fetch company name
//       if (store?.user?.profile?.customer_id) {
//         await fetchCompanyName(store.user.profile.customer_id)
//       } else {  
//         companyName.value = 'No company assigned'
//       }
//     } else {
//       throw new Error('Invalid response structure')
//     }
//   } catch (err) {
//     console.error('Error fetching user data:', err)
   
//     // For demo purposes, set mock data on error
//     setMockData()
//   } finally {
//     loading.value = false
//   }
// }


const fetchCompanyName = async () => {
// console.log(userData.value.profile.customer_id)
  loadingCompany.value = true
  try {
    const response = await api().get(`/customers/${userData.value.profile.customer_id}`)
    companyName.value = response.data.data.user.name || 'Company name not available'
  } catch (err) {
    console.error('Error fetching company data:', err)
    companyName.value = 'Error loading company'
  } finally {
    loadingCompany.value = false
  }
}



const getLevelClass = (level) => {
  const classes = {
    'bg-gray-100 text-gray-800': !level,
    'bg-green-100 text-green-800': level === 'beginner' || level === 'medium',
    'bg-blue-100 text-blue-800': level === 'high',
    'bg-purple-100 text-purple-800': level === 'advance' || level === 'expert'
  }

  return Object.keys(classes)
    .filter(cls => classes[cls])
    .join(' ')
}

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const navigateToEdit = () => {
  alert('Edit profile functionality would go here!')
  console.log('Navigating to edit profile')
}

// Watch for changes in userData to fetch company name when data is loaded
watch(userData, (newValue) => {
  if (newValue?.profile?.customer_id) {
    fetchCompanyName(newValue.profile.customer_id)
  }
})

// Lifecycle
onMounted(() => {
  fetchCompanyName()
  // fetchUserData()
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects for cards */
.bg-gradient-to-r:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Custom scrollbar for the page */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8b5cf6, #6366f1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7c3aed, #4f46e5);
}

/* Table responsive styles */
@media (max-width: 768px) {
  .overflow-x-auto {
    border: 0;
  }

  .overflow-x-auto table {
    display: block;
    width: 100%;
  }

  .overflow-x-auto thead {
    display: none;
  }

  .overflow-x-auto tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
  }

  .overflow-x-auto tbody td {
    display: block;
    text-align: right;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  } 

  .overflow-x-auto tbody td:before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #6b7280;
  }
}
</style>