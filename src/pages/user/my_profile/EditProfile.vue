<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <!-- Edit Profile Header -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fade-in-up border border-gray-100">
      <div class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 p-6 text-white relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 opacity-20 rounded-full translate-y-12 -translate-x-12"></div>

        <div class="flex justify-between items-center relative z-10">
          <div>
            <h1 class="text-4xl font-bold font-serif bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {{ formData.name }}
            </h1>
            <h1 class="text-2xl font-bold font-serif bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mt-2">
              Edit Profile
            </h1>
          </div>
          <div class="flex gap-3">
            <button
              @click="cancelEdit"
              class="flex items-center gap-2 px-5 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-white border-opacity-30"
            >
              <i class="fas fa-times"></i>
              Cancel
            </button>
            <button
              @click="submitForm"
              :disabled="loading"
              class="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-white border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-save"></i>
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="initialLoading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading profile data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="initialError" class="p-8 text-center">
        <div class="text-red-500 text-lg mb-4">
          <i class="fas fa-exclamation-triangle"></i>
          {{ initialError }}
        </div>
        <button
          @click="fetchUserData"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>

      <!-- Edit Form -->
      <div v-else class="p-6 bg-gradient-to-br from-gray-50 to-white">
        <!-- Success Message -->
        <div v-if="successMessage" class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <i class="fas fa-check-circle mr-2"></i>
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          {{ errorMessage }}
        </div>

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
              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-purple-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-user mr-2"></i>Full Name
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                >
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-purple-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-envelope mr-2"></i>Email
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                >
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-blue-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-phone mr-2"></i>Phone
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                >
              </div>
            </div>

            <!-- Additional Info -->
            <div class="space-y-5">
              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-pink-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-user-tag mr-2"></i>Username
                </label>
                <input
                  v-model="formData.username"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your username"
                >
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-indigo-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-home mr-2"></i>Address
                </label>
                <textarea
                  v-model="formData.address"
                  rows="3"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="text-sm text-green-600 font-semibold flex items-center mb-2">
                  <i class="fas fa-chart-line mr-2"></i>Knowledge Level
                </label>
                <select
                  v-model="formData.knowledge_level"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select knowledge level</option>
              <option value="beginner">Beginner</option>

                <option value="expert">Intermediate</option>
                <option value="advance">Advance</option>
                </select>
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
              v-for="(software, index) in formData.softwares"
              :key="software.id"
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <label class="text-sm text-green-600 font-semibold flex items-center mb-2">
                <i class="fas fa-cube mr-2"></i>{{ software.name }}
              </label>
              <select
                v-model="software.pivot.level"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-sm"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>

                <option value="expert">Intermediate</option>
                <option value="advance">Advance</option>
              </select>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-gray-500">
                  ID: {{ software.id }}
                </span>
                <button
                  @click="removeSoftware(index)"
                  class="text-red-500 hover:text-red-700 text-xs"
                  type="button"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            @click="cancelEdit"
            type="button"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i class="fas fa-save"></i>
            {{ loading ? 'Saving Changes...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
const router = useRouter()

// Reactive data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  username: '',
  address: '',
  knowledge_level: '',
  softwares: []
})
const authStore = useAuthStore()
const initialLoading = ref(false)
const loading = ref(false)
const initialError = ref(null)
const errorMessage = ref(null)
const successMessage = ref(null)

// Methods
const fetchUserData = async () => {
  initialLoading.value = true
  initialError.value = null

  try {
    const response = await api().get('/end-user-by-user-id/'+authStore.user.id)

    if (response.data && response.data.user) {
      const user = response.data.user
      // Map API response to form data
      formData.value = {
        name: user.name || '',
        email: user.email || '',
        phone: user.profile?.user?.phone || '',
        username: user.profile?.username || '',
        address: user.profile?.user?.address || '',
        knowledge_level: user.profile?.knowledge_level || '',
        softwares: user.profile?.softwares?.map(software => ({
          ...software,
          pivot: { ...software.pivot }
        })) || []
      }
    } else {
      throw new Error('Invalid response structure')
    }
  } catch (err) {
    console.error('Error fetching user data:', err)

    // For demo purposes, set mock data on error
    setMockData()
  } finally {
    initialLoading.value = false
  }
}

const setMockData = () => {
  formData.value = {
    name: "Harun R Khan",
    email: "harun@htss.com",
    phone: "01245",
    username: "Harun",
    address: "",
    knowledge_level: "",
    softwares: [
      {
        id: 1,
        name: "Patran",
        pivot: { level: null }
      },
      {
        id: 12,
        name: "Actran",
        pivot: { level: "medium" }
      },
      {
        id: 15,
        name: "VTDScale",
        pivot: { level: "medium" }
      },
      {
        id: 9,
        name: "Romax",
        pivot: { level: "advance" }
      },
      {
        id: 6,
        name: "Sim Manager",
        pivot: { level: "high" }
      }
    ]
  }
}

const submitForm = async () => {
  loading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    // Prepare data for API (adjust according to your API requirements)
    const updateData = {
      name: formData.value.name,
      email: formData.value.email,
      profile: {
        username: formData.value.username,
        knowledge_level: formData.value.knowledge_level,
        user: {
          phone: formData.value.phone,
          address: formData.value.address
        }
      },
      softwares: formData.value.softwares.map(software => ({
        software_id: software.id,
        level: software.pivot.level
      }))
    }

    // Make PUT request to update user data
    const response = await api().put('/login', updateData)

    if (response.data) {
      successMessage.value = 'Profile updated successfully!'
      // Redirect back to profile page after 2 seconds
      setTimeout(() => {
        router.back()
      }, 2000)
    } else {
      throw new Error('Failed to update profile')
    }
  } catch (err) {
    console.error('Error updating user data:', err)
    errorMessage.value = err.response?.data?.message || 'Failed to update profile. Please try again.'
  } finally {
    loading.value = false
  }
}

const cancelEdit = () => {
  router.back()
}

const removeSoftware = (index) => {
  formData.value.softwares.splice(index, 1)
}

// Lifecycle
onMounted(() => {
  fetchUserData()
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

/* Custom styles for form inputs */
input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Hover effects for cards */
.bg-white:hover {
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
</style>
