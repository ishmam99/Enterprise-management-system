<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-500 text-white pt-24 pb-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div
          class="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-pulse delay-1000">
        </div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span class="text-xl">✨</span>
              <span class="font-semibold">Join Our Community</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Create Your Professional Account as a Trainer
            </h1>
            <p class="text-lg md:text-xl text-purple-100 mb-8">Unlock your career growth opportunities as a trainer</p>
            <div class="flex gap-8">
              <div>
                <div class="text-2xl md:text-3xl font-bold">10K+</div>
                <div class="text-purple-200 text-sm">Professionals</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold">150+</div>
                <div class="text-purple-200 text-sm">Courses</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold">95%</div>
                <div class="text-purple-200 text-sm">Success Rate</div>
              </div>
            </div>
            <div class="text-xl font-semibold mt-2">
              Already have an account? <router-link to="/login?role=trainer"
                class="underline hover:text-emerald-400">Login here</router-link>
            </div>
          </div>
          <div class="relative h-64 md:h-80 hidden lg:block">
            <div
              class="absolute top-10 right-20 w-32 h-40 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow">
            </div>
            <div
              class="absolute bottom-10 right-40 w-40 h-28 bg-purple-400/30 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow delay-300">
            </div>
            <div
              class="absolute bottom-20 right-0 w-28 h-32 bg-pink-400/30 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow delay-700">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Registration Section -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="grid lg:grid-cols-[380px,1fr] gap-8">
          <!-- Left Sidebar -->
          <aside class="space-y-6">
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Your Registration</h3>
              <div class="relative w-32 h-32 mx-auto mb-4">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#e2e8f0" stroke-width="4" />
                  <circle cx="64" cy="64" r="58" fill="none" stroke="url(#gradient)" stroke-width="4"
                    stroke-dasharray="364.4" :stroke-dashoffset="calculateDashOffset()" stroke-linecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#2563eb" />
                      <stop offset="100%" stop-color="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center"><span
                    class="text-2xl font-bold text-blue-600">{{ currentStep }}/{{ totalSteps }}</span></div>
              </div>
              <p class="text-gray-600 font-medium">{{ steps[currentStep - 1] }}</p>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Why Join?</h3>
              <div class="space-y-3">
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50">
                  <div class="text-2xl">🎓</div>
                  <div>
                    <p class="font-semibold">Expert Training</p>
                    <p class="text-xs text-gray-500">Learn from industry leaders</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50">
                  <div class="text-2xl">🏆</div>
                  <div>
                    <p class="font-semibold">Certifications</p>
                    <p class="text-xs text-gray-500">Recognized globally</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50">
                  <div class="text-2xl">🚀</div>
                  <div>
                    <p class="font-semibold">Career Growth</p>
                    <p class="text-xs text-gray-500">Advance your skills</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50">
                  <div class="text-2xl">🤝</div>
                  <div>
                    <p class="font-semibold">Community</p>
                    <p class="text-xs text-gray-500">Connect with peers</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center">
              <p class="text-sm italic mb-3">"This platform transformed my career. Highly recommended for
                professionals!"</p>
              <p class="text-xs opacity-90">— Sarah Chen, VP Engineering</p>
            </div>
          </aside>

          <!-- Right Column: Form -->
          <main class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="p-6 md:p-8 border-b border-gray-100">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Let's Get Started</h2>
              <p class="text-gray-600">{{ getStepDescription() }}</p>
            </div>

            <!-- Progress Steps -->
            <div class="px-6 md:px-8 pt-6">
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div v-for="(step, index) in steps" :key="index" class="text-center">
                  <div
                    :class="['w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all font-semibold text-sm',
                      currentStep > index + 1 ? 'bg-green-500 text-white' : currentStep === index + 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-100 text-gray-400']">
                    <svg v-if="currentStep > index + 1" class="w-5 h-5" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <span
                    :class="['text-xs font-medium', currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400']">{{
                      step }}</span>
                </div>
              </div>
              <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full"
                  :style="{ width: progressPercent + '%' }"></div>
              </div>
            </div>

            <!-- Form Content -->
            <form @submit.prevent="submitForm" class="p-6 md:p-8">
              <!-- Step 1: Personal Info -->
              <div v-show="currentStep === 1" class="space-y-4">
                <div class="grid grid-cols-2 gap-2">
                  <div><label class="block text-sm font-semibold">Full Name *</label><input v-model="form.name"
                      type="text" class="w-full px-4 py-2 border rounded-lg" placeholder="John Doe" /></div>
                  <div><label class="block text-sm font-semibold">Email *</label><input v-model="form.email"
                      type="email" class="w-full px-4 py-2 border rounded-lg" placeholder="john@example.com" /></div>
                </div>
                <div><label class="block text-sm font-semibold">Phone *</label><input v-model="form.phone" type="tel"
                    class="w-full px-4 py-2 border rounded-lg" placeholder="+1234567890" /></div>
                <div><label class="block text-sm font-semibold">Address</label><input v-model="form.address" type="text"
                    class="w-full px-4 py-2 border rounded-lg" placeholder="Dhaka" /></div>
                <div><label class="block text-sm font-semibold">Years of Experience *</label><input
                    v-model="form.experience_year" type="number" class="w-full px-4 py-2 border rounded-lg"
                    placeholder="5" /></div>
                <div><label class="block text-sm font-semibold">Current Company *</label><input
                    v-model="form.current_company" type="text" class="w-full px-4 py-2 border rounded-lg"
                    placeholder="Tech Corp" /></div>
                <div><label class="block text-sm font-semibold">Current Position *</label><input
                    v-model="form.current_position" type="text" class="w-full px-4 py-2 border rounded-lg"
                    placeholder="Senior Trainer" /></div>
              </div>

              <!-- Step 2: Schedule -->
              <div v-show="currentStep === 2" class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold mb-2">Your Availability *</label>
                  <div v-for="(schedule, idx) in schedules" :key="idx" class="border rounded-xl p-4 mb-4 relative">
                    <button v-if="schedules.length > 1" type="button" @click="schedules.splice(idx, 1)"
                      class="absolute top-2 right-2 text-red-500">✕</button>
                    <div class="mb-3">
                      <span class="text-sm font-medium">Select days</span>
                      <div class="flex flex-wrap gap-3 mt-2">
                        <label v-for="day in weekDays" :key="day.value" class="inline-flex items-center gap-2">
                          <input type="checkbox" :value="day.value" v-model="schedule.days" class="rounded" />
                          <span class="text-sm">{{ day.label }}</span>
                        </label>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div><label class="text-sm">Start Time</label><input type="time" v-model="schedule.start_time"
                          class="w-full px-3 py-2 border rounded-lg" /></div>
                      <div><label class="text-sm">End Time</label><input type="time" v-model="schedule.end_time"
                          class="w-full px-3 py-2 border rounded-lg" /></div>
                    </div>
                  </div>
                  <button type="button" @click="schedules.push({ days: [], start_time: '09:00', end_time: '17:00' })"
                    class="text-blue-600 text-sm font-semibold flex items-center gap-1">+ Add another schedule
                    block</button>
                </div>
              </div>

              <!-- Step 3: Expertise (Solutions + Training Courses by Analysis) -->
              <div v-show="currentStep === 3" class="space-y-6">
                <!-- Solutions of Interest (Remains as is) -->
                <div>
                  <label class="block text-sm font-semibold mb-2">Solutions of Interest</label>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <label v-for="sol in solutions" :key="sol.id"
                      class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                      <input type="checkbox" :value="sol.id" v-model="form.solution_ids"
                        class="w-4 h-4 text-blue-600 rounded" />
                      <span>{{ sol.name }}</span>
                    </label>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-200 my-4"></div>

                <!-- Training Courses Selection by Analysis -->
                <div>
                  <label class="block text-sm font-semibold mb-2">Training Courses *</label>

                  <!-- Analysis Dropdown -->
                  <div class="mb-4">
                    <select v-model="selectedAnalysis" @change="onAnalysisChange"
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">-- Select an analysis type first --</option>
                      <option v-for="analysis in analysisTypeList" :key="analysis.name" :value="analysis.name">
                        {{ analysis.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Course Selection (shown only when analysis is selected) -->
                  <div v-if="selectedAnalysis">
                    <div class="flex gap-2 mb-4">
                      <select v-model="selectedCourseId"
                        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-5/12"
                        :disabled="filteredCourses.length === 0">
                        <option value="">-- Select a course --</option>
                        <option v-for="course in filteredCourses" :key="course.id" :value="course.id">
                          {{ course.name }} ({{ course.level == "Beginner" ? "Basic" : "Advanced" || 'No code' }}) ({{ course.type == "online" ? "Lunch and Learn" : "Training" || 'No code' }})
                        </option>
                      </select>
                      <button type="button" @click="addCourse" :disabled="!selectedCourseId"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        + Add Course
                      </button>
                    </div>

                    <!-- Selected Courses List -->
                    <div v-if="selectedCourses.length > 0" class="space-y-2">
                      <label class="block text-sm font-semibold mb-2">Selected Courses ({{ selectedCourses.length
                      }})</label>
                      <div class="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                        <div v-for="course in selectedCourses" :key="course.id"
                          class="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm">
                          <div class="flex-1">
                            <div class="font-medium text-gray-900">{{ course.name }}</div>
                            <div class="text-xs text-gray-500">Code: {{ course.code || 'N/A' }} | Analysis: {{
                              getAnalysisNameByCourse(course) }}</div>
                            <div class="text-xs text-gray-400 mt-1">{{ course.short_description ||
                              course.long_description?.substring(0, 100) || 'No description' }}...</div>
                          </div>
                          <button type="button" @click="removeCourse(course.id)"
                            class="ml-2 text-red-500 hover:text-red-700 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- Summary -->
                      <div class="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <strong>Summary:</strong> {{ selectedCourses.length }} course(s) selected
                      </div>
                    </div>

                    <p v-if="filteredCourses.length === 0" class="text-yellow-600 text-sm mt-2">
                      ⚠️ No courses available for the selected analysis type.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex items-center gap-4 mt-8 pt-6 border-t">
                <button v-if="currentStep > 1" type="button" @click="currentStep--"
                  class="px-6 py-2 border rounded-lg hover:bg-gray-50">← Back</button>
                <div class="flex-1"></div>
                <button v-if="currentStep < totalSteps" type="button" @click="nextStep"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Continue →</button>
                <button v-else type="submit" :disabled="loading"
                  class="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                  <span v-if="!loading">✓ Complete Registration</span>
                  <span v-else class="flex items-center gap-2"><svg class="w-4 h-4 animate-spin" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg> Submitting...</span>
                </button>
              </div>
            </form>
            <div class="p-6 bg-gray-50 border-t text-center text-xs text-gray-500">By registering, you agree to our
              Terms and Privacy Policy</div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 3
const steps = ['Personal', 'Schedule', 'Expertise']
const loading = ref(false)

// Data from API
const softwares = ref([])
const solutions = ref([])
const allCourses = ref([])
const selectedAnalysis = ref('')
const selectedCourseId = ref('')
const selectedCourses = ref([])

// Analysis Type List
const analysisTypeList = ref([
  {
    id: 'dynamic',
    name: 'Dynamic Analysis',
    icon: '📊',
    gradient: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    shortDescription: 'Vibration, shock, and transient response'
  },
  {
    id: 'static',
    name: 'Static Analysis',
    icon: '⚖️',
    gradient: 'bg-gradient-to-br from-blue-600 to-cyan-700',
    shortDescription: 'Linear and nonlinear static analysis'
  },
  {
    id: 'thermal',
    name: 'Thermal Analysis',
    icon: '🔥',
    gradient: 'bg-gradient-to-br from-orange-600 to-red-700',
    shortDescription: 'Heat transfer and thermal simulation'
  },
  {
    id: 'cfd',
    name: 'CFD Analysis',
    icon: '🌊',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-700',
    shortDescription: 'Computational fluid dynamics'
  },
  {
    id: 'multibody',
    name: 'Multibody Dynamic Analysis',
    icon: '⚙️',
    gradient: 'bg-gradient-to-br from-pink-600 to-rose-700',
    shortDescription: 'Mechanical system simulation'
  },
  {
    id: 'fatigue',
    name: 'Fatigue Analysis',
    icon: '🔄',
    gradient: 'bg-gradient-to-br from-amber-600 to-orange-700',
    shortDescription: 'Durability and fatigue life prediction'
  },
  {
    id: 'composite',
    name: 'Composite Analysis',
    icon: '📐',
    gradient: 'bg-gradient-to-br from-teal-600 to-cyan-700',
    shortDescription: 'Composite material modeling'
  },
  {
    id: 'acoustics',
    name: 'Acoustics Analysis',
    icon: '🎵',
    gradient: 'bg-gradient-to-br from-purple-600 to-pink-700',
    shortDescription: 'Sound and vibration simulation'
  }
])

// Computed: Filtered courses based on selected analysis
const filteredCourses = computed(() => {
  if (!selectedAnalysis.value) return []
  console.log(selectedAnalysis.value);

  return allCourses.value.filter(course => {
    // Match analysis - check if course analysis matches selected analysis
    const courseAnalysis = course.analysis || course.analysis_name || ''
    return courseAnalysis.toLowerCase() == selectedAnalysis.value.toLowerCase()
  })
})

// Helper functions
const getAnalysisDescription = (analysisId) => {
  const analysis = analysisTypeList.value.find(a => a.id === analysisId)
  return analysis?.shortDescription || ''
}

const getAnalysisNameByCourse = (course) => {
  return course.analysis || course.analysis_name || 'General'
}

const onAnalysisChange = () => {
  // Reset course selection when analysis changes
  selectedCourseId.value = ''
}

const addCourse = () => {
  if (!selectedCourseId.value) return

  const course = filteredCourses.value.find(c => c.id === selectedCourseId.value)
  if (course && !selectedCourses.value.some(c => c.id === course.id)) {
    selectedCourses.value.push(course)
    selectedCourseId.value = '' // Reset selection
  } else if (selectedCourses.value.some(c => c.id === course.id)) {
    Swal.fire('Duplicate Course', 'This course has already been added', 'warning')
  }
}

const removeCourse = (courseId) => {
  selectedCourses.value = selectedCourses.value.filter(c => c.id !== courseId)
}

// Week days
const weekDays = [
  { value: 'monday', label: 'Monday' }, { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' }, { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' }, { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
]

// Schedule blocks
const schedules = ref([{ days: [], start_time: '09:00', end_time: '17:00' }])

// Form data matching API
const form = reactive({
  name: '', email: '', phone: '', address: '', experience_year: '',
  current_company: '', current_position: '',
  solution_ids: [],  // KEPT: Solutions selection
  course_ids: []     // NEW: Training courses selection
})

// Helper: progress bar
const progressPercent = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)
const calculateDashOffset = () => {
  const circumference = 2 * Math.PI * 58
  return circumference - ((currentStep.value - 1) / (totalSteps - 1)) * circumference
}
const getStepDescription = () => {
  const desc = ['Tell us about yourself', 'Set your weekly availability', 'Select solutions and training courses']
  return desc[currentStep.value - 1]
}

// Simple validation
const validateStep = () => {
  if (currentStep.value === 1) {
    if (!form.name || !form.email || !form.phone || !form.experience_year || !form.current_company || !form.current_position) {
      Swal.fire('Missing fields', 'Please fill all required fields (*)', 'warning')
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Swal.fire('Invalid email', 'Please enter a valid email address', 'warning')
      return false
    }
  }
  if (currentStep.value === 2) {
    const hasValid = schedules.value.some(s => s.days.length > 0 && s.start_time && s.end_time)
    if (!hasValid) {
      Swal.fire('Schedule required', 'Please add at least one schedule block with selected days and time range', 'warning')
      return false
    }
  }
  if (currentStep.value === 3) {
    // Validate at least one training course is selected
    if (selectedCourses.value.length === 0) {
      Swal.fire('Courses required', 'Please select at least one training course', 'warning')
      return false
    }
  }
  return true
}

const nextStep = () => { if (validateStep()) currentStep.value++ }

const submitForm = async () => {
  if (!validateStep()) return

  form.course_ids = selectedCourses.value.map(course => course.id)

  const validSchedules = schedules.value
    .filter(s => s.days.length > 0 && s.start_time && s.end_time)
    .map(s => ({ days: s.days, start_time: s.start_time, end_time: s.end_time }))

  const skills = []
  
  form.solution_ids.forEach(id => {
    skills.push({
      skill_type: 2,
      solution_id: id
    })
  })

  const payload = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    experience_year: form.experience_year,
    current_company: form.current_company,
    current_position: form.current_position,
    schedules: validSchedules,
    skills: skills,           
    course_ids: form.course_ids 
  }

  loading.value = true
  try {
    const response = await api().post('/trainer-request-form', payload)
    if (response.status === 200 || response.status === 201) {
      await Swal.fire({ 
        icon: 'success', 
        title: 'Registration Successful!', 
        text: 'Your trainer request has been submitted. Wait for approval and further instructions via email.', 
        confirmButtonColor: '#2563eb' 
      })
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      throw new Error('Unexpected response')
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message || 'Registration failed'
    await Swal.fire({ 
      icon: 'error', 
      title: 'Registration Failed', 
      text: msg, 
      confirmButtonColor: '#dc2626' 
    })
  } finally {
    loading.value = false
  }
}

const fetchSoftwares = async () => {
  try {
    const response = await api().get('/softwares')
    softwares.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching softwares:', error)
  }
}

const fetchTrainingsCourses = async () => {
  try {
    const response = await api().get('/internal-trainings')
    let trainings = []

    if (response.data && response.data.data) {
      trainings = response.data.data
    } else if (Array.isArray(response.data)) {
      trainings = response.data
    }

    allCourses.value = trainings.map((training) => ({
      ...training,
      software_name: getSoftwareNameById(training.software_id),
      solution_name: getSolutionNameById(training.solution_id),
      shortDescription: training.short_description,
      longDescription: training.long_description
    }))
  } catch (error) {
    console.error('Error fetching trainings:', error)
    allCourses.value = []
  }
}

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions')
    solutions.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching solutions:', error)
  }
}

// Helper functions for getting names
const getSoftwareNameById = (id) => {
  const software = softwares.value.find(s => s.id == id)
  return software?.name || 'Unknown'
}

const getSolutionNameById = (id) => {
  const solution = solutions.value.find(s => s.id == id)
  return solution?.name || 'Unknown'
}

onMounted(() => {
  fetchSoftwares()
  fetchSolutions()
  fetchTrainingsCourses()
})
</script>

<style scoped>
@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-20px)
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-1000 {
  animation-delay: 1s;
}
</style>