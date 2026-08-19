<template>
  <div class="px-2 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Create Trainer</h1>
      <p class="text-gray-300">Fill out the form below to create a new trainer</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="createTrainer">
        <div class="py-5 space-y-7 mt-5">
          <!-- Name and Email Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="trainer.name"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Full Name <span class="text-red-500">*</span>
              </label>
            </div>
            <div class="relative mb-3 w-full">
              <input
                type="email"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="trainer.email"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Email Address <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- Phone and LinkedIn Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <input
                type="tel"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="trainer.phone"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Phone Number <span class="text-red-500">*</span>
              </label>
            </div>
            <div class="relative mb-3 w-full">
              <input
                type="url"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="trainer.linkedin_profile"
                placeholder="https://linkedin.com/in/username"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >LinkedIn Profile
              </label>
            </div>
          </div>

          <!-- Expertise Area Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Expertise Area <span class="text-red-500">*</span>
                <div v-if="loadingIndustries" class="inline-block ml-2">
                  <span class="loading loading-spinner loading-xs"></span>
                </div>
              </label>
              <select
                v-model="trainer.expertise_area"
                class="select select-bordered w-full rounded-xl border-2 px-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="loadingIndustries"
              >
                <option value="" disabled>Select Expertise Area</option>
                <!-- Dynamic options from industries API -->
                <option v-for="industry in industries" :key="industry.id" :value="industry.name">
                  {{ industry.name }}
                </option>
                <option value="custom">Other (specify)</option>
              </select>
            </div>
          </div>

          <!-- Custom Expertise Field (Conditional) -->
          <div v-if="trainer.expertise_area === 'custom'" class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="trainer.custom_expertise"
                placeholder="Enter your specific expertise area"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Custom Expertise Area <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- Address Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <textarea
                class="peer block min-h-[80px] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none resize-none"
                v-model="trainer.address"
                required
                placeholder="Enter complete address"
              ></textarea>
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Address <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- Bio Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <textarea
                class="peer block min-h-[120px] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none resize-none"
                v-model="trainer.bio"
                required
                placeholder="Enter trainer's biography, experience, and qualifications"
              ></textarea>
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >Biography <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <span>{{ loading ? 'Creating...' : 'Create Trainer' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

const trainer = reactive({
  name: '',
  email: '',
  bio: '',
  expertise_area: '',
  phone: '',
  linkedin_profile: '',
  address: '',
  custom_expertise: ''
})

const industries = ref([])
const loading = ref(false)
const loadingIndustries = ref(false)

// Fetch industries for expertise area
const fetchIndustries = async () => {
  loadingIndustries.value = true
  try {
    const response = await api().get('industries')
    industries.value = response.data.data || response.data
    
    // Sort industries alphabetically for better UX
    industries.value.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error fetching industries:', error)
    toast({
      title: 'Error',
      description: 'Failed to load industry expertise options',
      variant: 'destructive'
    })
  } finally {
    loadingIndustries.value = false
  }
}

const createTrainer = async () => {
  // Validation
  if (!trainer.name.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter trainer name',
      variant: 'destructive'
    })
    return
  }

  if (!trainer.email.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter email address',
      variant: 'destructive'
    })
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trainer.email)) {
    toast({
      title: 'Error',
      description: 'Please enter a valid email address',
      variant: 'destructive'
    })
    return
  }

  if (!trainer.phone.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter phone number',
      variant: 'destructive'
    })
    return
  }

  if (!trainer.expertise_area) {
    toast({
      title: 'Error',
      description: 'Please select expertise area',
      variant: 'destructive'
    })
    return
  }

  if (trainer.expertise_area === 'custom' && !trainer.custom_expertise.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter custom expertise area',
      variant: 'destructive'
    })
    return
  }

  if (!trainer.address.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter address',
      variant: 'destructive'
    })
    return
  }

  if (!trainer.bio.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter biography',
      variant: 'destructive'
    })
    return
  }

  loading.value = true

  try {
    // Prepare final expertise area value
    const finalExpertiseArea = trainer.expertise_area === 'custom' 
      ? trainer.custom_expertise 
      : trainer.expertise_area

    const response = await api().post('trainer', {
      name: trainer.name.trim(),
      email: trainer.email.trim(),
      bio: trainer.bio.trim(),
      expertise_area: finalExpertiseArea,
      phone: trainer.phone.trim(),
      linkedin_profile: trainer.linkedin_profile.trim(),
      address: trainer.address.trim()
    })

    Swal.fire({
      title: 'Success!',
      text: 'Trainer Created Successfully',
      icon: 'success'
    })

    // Reset form
    trainer.name = ''
    trainer.email = ''
    trainer.bio = ''
    trainer.expertise_area = ''
    trainer.phone = ''
    trainer.linkedin_profile = ''
    trainer.address = ''
    trainer.custom_expertise = ''
    
  } catch (error) {
    console.error('Error creating trainer:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to create trainer. Please try again.',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Fetch industries on component mount
onMounted(() => {
  fetchIndustries()
})
</script>