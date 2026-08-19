<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkg0OHYxMkgzNnYtMTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <i class="fa-solid fa-chalkboard-user text-blue-300"></i>
            <span class="text-blue-200 font-semibold">Trainer Application</span>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl flex justify-center gap-2 items-center font-bold leading-tight mb-6">
            Become a
            <span class="block bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Trainer
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Share your expertise and help others master MSC Software solutions. Apply now to join our team of industry-leading trainers.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <!-- Main Form Section -->
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-200">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <i class="fa-solid fa-file-signature text-blue-600"></i>
            Trainer Application Form
          </h2>

          <form @submit.prevent="submitTrainerRequest" class="space-y-8">
            <!-- Personal Information Section -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-user-circle text-blue-600"></i>
                Personal Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      v-model="trainerRequest.name"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <!-- Email Address -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="email"
                      v-model="trainerRequest.email"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <!-- Phone Number -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="tel"
                      v-model="trainerRequest.phone"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>

                <!-- Address Field -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Address <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-map-marker-alt absolute left-4 top-4 text-gray-400"></i>
                    <textarea
                      v-model="trainerRequest.address"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                      rows="3"
                      placeholder="Enter your address"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Professional Experience Section -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-briefcase text-green-600"></i>
                Professional Experience
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Current Company -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Current Company <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      v-model="trainerRequest.current_company"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                </div>

                <!-- Current Position -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Current Position <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-user-tie absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      v-model="trainerRequest.current_position"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      placeholder="Your Job Title"
                      required
                    />
                  </div>
                </div>

                <!-- Professional Experience Details -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Professional Experience Details <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i class="fa-solid fa-file-alt absolute left-4 top-4 text-gray-400"></i>
                    <textarea
                      v-model="trainerRequest.experience_year"
                      class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
                      rows="4"
                      placeholder="Describe your professional experience, skills, achievements, and areas of expertise..."
                      required
                    ></textarea>
                  </div>
                  <p class="text-sm text-gray-500 mt-2">Include key projects, technologies used, and any relevant achievements</p>
                </div>
              </div>
            </div>

            <!-- Submission Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i class="fa-solid fa-paper-plane"></i>
                Ready to Submit?
              </h3>
              <p class="text-blue-100 mb-6">
                By submitting this application, you agree to our terms and conditions. Our team will review your application and contact you within 3-5 business days.
              </p>

              <button
                type="submit"
                class="w-full bg-white text-blue-600 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                :disabled="loading"
              >
                <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                <span>{{ loading ? 'Submitting Application...' : 'Submit Trainer Application' }}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const { toast } = useToast()

const trainerRequest = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  current_company: '',
  current_position: '',
  experience_year: ''
})

const loading = ref(false)

const submitTrainerRequest = async () => {
  // Validation
  if (!trainerRequest.name.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your full name',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.email.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your email address',
      variant: 'destructive'
    })
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trainerRequest.email)) {
    toast({
      title: 'Error',
      description: 'Please enter a valid email address',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.phone.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your phone number',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.address.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your address',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.current_company.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your current company',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.current_position.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your current position',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.experience_year.trim()) {
    toast({
      title: 'Error',
      description: 'Please describe your professional experience',
      variant: 'destructive'
    })
    return
  }

  loading.value = true

  try {
    const response = await api().post('trainer-request-form', {
      name: trainerRequest.name.trim(),
      email: trainerRequest.email.trim(),
      phone: trainerRequest.phone.trim(),
      address: trainerRequest.address.trim(),
      current_company: trainerRequest.current_company.trim(),
      current_position: trainerRequest.current_position.trim(),
      experience_year: trainerRequest.experience_year.trim()
    })

    Swal.fire({
      title: 'Application Submitted!',
      text: 'Thank you for your interest in becoming a trainer. Our team will review your application and contact you within 3-5 business days.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#2563eb',
      customClass: {
        popup: 'rounded-2xl'
      }
    })

    // Reset form
    Object.keys(trainerRequest).forEach(key => {
      trainerRequest[key] = ''
    })

  } catch (error) {
    console.error('Error submitting trainer request:', error)
    Swal.fire({
      title: 'Application Error',
      text: error.response?.data?.message || 'Failed to submit trainer application. Please try again.',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#ef4444',
      customClass: {
        popup: 'rounded-2xl'
      }
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Add smooth scrolling and transition effects */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 5px;
}

/* Input focus effects */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>