<script setup>
import { ref, computed } from 'vue'

const openings = [
  {
    title: 'Composite Manufacturing Engineer',
    department: 'Engineering',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Design and optimize composite manufacturing processes for aerospace and defense programs.',
    posted: '2 weeks ago'
  },
  {
    title: 'Quality Assurance Inspector',
    department: 'Quality',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Perform NDI and dimensional inspections on composite components per AS9100 and NADCAP requirements.',
    posted: '1 week ago'
  },
  {
    title: 'Senior Program Manager',
    department: 'Program Management',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Lead cross‑functional teams to deliver complex composite programs on time and within budget.',
    posted: '3 weeks ago'
  },
  {
    title: 'Composite Layup Technician',
    department: 'Production',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Hand‑layup and automated tape layup of advanced composite materials for mission‑critical components.',
    posted: '4 days ago'
  },
  {
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Manage material procurement, vendor relationships, and inventory for composite manufacturing.',
    posted: '2 weeks ago'
  }
]

// Modal state
const showModal = ref(false)
const selectedJob = ref('')
const isSubmitting = ref(false)
const success = ref(false)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  resume: null,
  coverLetter: '',
  agree: false
})

// Open modal with job title
const openModal = (jobTitle) => {
  selectedJob.value = jobTitle
  showModal.value = true
  // Reset form for new application
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    agree: false
  }
  success.value = false
}

// Close modal
const closeModal = () => {
  showModal.value = false
  success.value = false
  isSubmitting.value = false
}

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.resume = file
  }
}

// Submit application
const submitApplication = async () => {
  // Simple validation
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.agree) {
    alert('Please fill in all required fields and agree to the terms.')
    return
  }

  isSubmitting.value = true

  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    success.value = true
    // Optionally reset form after success
    setTimeout(() => {
      closeModal()
    }, 3000)
  } catch (error) {
    alert('Something went wrong. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-16 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 30% 40%, rgba(37,99,235,0.3) 0%, transparent 60%);
      "></div>

      <div class="relative container mx-auto px-6 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-4"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Current Openings
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Join Our <span class="text-blue-400">Mission‑Driven</span> Team
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore opportunities across engineering, quality, production, and support roles.
        </p>
        <div class="mt-6">
          <RouterLink to="/careers" class="text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Careers
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Job Listings -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto space-y-4">
          <div
            v-for="job in openings"
            :key="job.title"
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="text-xl font-bold text-slate-800">{{ job.title }}</h3>
                  <span class="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {{ job.department }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ job.location }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ job.type }}
                  </span>
                  <span class="flex items-center gap-1 text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Posted {{ job.posted }}
                  </span>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">{{ job.description }}</p>
              </div>
              <div class="flex-shrink-0">
                <button
                  @click="openModal(job.title)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition text-sm w-full md:w-auto inline-block text-center"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <p class="text-gray-500 text-sm">
            Don't see the right role? We're always looking for talented individuals.
            <a href="#" class="text-blue-600 hover:underline font-medium">Send us your resume</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Application Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8">
        <!-- Modal Header -->
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-slate-800">Apply for</h3>
            <p class="text-lg font-semibold text-blue-600">{{ selectedJob }}</p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition text-2xl leading-none">
            ✕
          </button>
        </div>

        <!-- Success State -->
        <div v-if="success" class="text-center py-8">
          <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 class="text-xl font-bold text-slate-800">Application Submitted!</h4>
          <p class="text-gray-500 mt-2">We'll review your application and get back to you soon.</p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitApplication" class="space-y-5">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name <span class="text-red-500">*</span></label>
              <input
                type="text"
                v-model="form.firstName"
                required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                placeholder="John"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name <span class="text-red-500">*</span></label>
              <input
                type="text"
                v-model="form.lastName"
                required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address <span class="text-red-500">*</span></label>
            <input
              type="email"
              v-model="form.email"
              required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              v-model="form.phone"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Resume / CV <span class="text-red-500">*</span></label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input
                type="file"
                ref="fileInput"
                class="hidden"
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx"
                required
              />
              <div class="text-3xl mb-1">📎</div>
              <p class="text-gray-500 text-sm">Click to upload or drag and drop</p>
              <p v-if="form.resume" class="text-sm text-green-600 font-medium mt-2">
                ✅ {{ form.resume.name }}
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
            <textarea
              v-model="form.coverLetter"
              rows="3"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
              placeholder="Tell us why you're a great fit..."
            ></textarea>
          </div>

          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              v-model="form.agree"
              required
              class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="text-sm text-gray-600">
              I agree to the terms and conditions and confirm that the information provided is accurate. <span class="text-red-500">*</span>
            </label>
          </div>

          <div class="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg shadow-blue-600/25 text-sm disabled:opacity-70"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>