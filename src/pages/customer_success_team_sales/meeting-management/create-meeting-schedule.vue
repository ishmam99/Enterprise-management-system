<template>
  <div class="w-full mx-auto p-6 bg-slate-50 min-h-screen">
    <!-- Header -->
    <div class="mb-7">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Schedule a Meeting</h1>
      <p class="text-slate-500 text-sm">Plan and organize team meetings with stakeholders</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <!-- Left Column: Meeting Form -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div class="px-6 py-5 border-b border-slate-200">
          <h2 class="text-lg font-semibold text-slate-800">Meeting Details</h2>
        </div>

        <form @submit.prevent="submitMeeting" class="p-6">
          <!-- Meeting Title -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Meeting Title <span class="text-red-500">*</span>
            </label>
            <input v-model="meetingForm.title" type="text"
              placeholder="e.g., Q4 Strategy Review, Customer Onboarding Session" :class="[
                'w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all',
                validationErrors.title ? 'border-red-500' : 'border-slate-300'
              ]" required />
            <span v-if="validationErrors.title" class="text-red-500 text-xs mt-1 block">{{ validationErrors.title
            }}</span>
          </div>

          <!-- Description -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea v-model="meetingForm.description" rows="3"
              placeholder="Add agenda, objectives, or any relevant details..."
              class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          <!-- Date & Time Row -->
          <div class="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Date <span class="text-red-500">*</span>
              </label>
              <input v-model="meetingForm.date" type="date" :min="minDate" :class="[
                'w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500',
                validationErrors.date ? 'border-red-500' : 'border-slate-300'
              ]" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Time <span class="text-red-500">*</span>
              </label>
              <input v-model="meetingForm.time" type="time" :class="[
                'w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500',
                validationErrors.time ? 'border-red-500' : 'border-slate-300'
              ]" required />
            </div>
          </div>

          <!-- Duration & Timezone -->
          <div class="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Duration <span class="text-red-500">*</span>
              </label>
              <select v-model="meetingForm.duration"
                class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
              <select v-model="meetingForm.timezone"
                class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                  {{ tz.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Type of Activity</label>
              <select v-model="meetingForm.type_of_activity"
                class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option v-for="activity in typeOfActivity" :key="activity.value" :value="activity.value">
                  {{ activity.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Meeting Type -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-2">Meeting Type</label>
            <div class="flex flex-wrap gap-5">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="meetingForm.meeting_type" value="virtual" class="w-4 h-4" />
                <span class="text-sm">💻 Virtual (Google Meet / Webex)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="meetingForm.meeting_type" value="in_person" class="w-4 h-4" />
                <span class="text-sm">🏢 In Person</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="meetingForm.meeting_type" value="phone" class="w-4 h-4" />
                <span class="text-sm">📞 Phone Call</span>
              </label>
            </div>
          </div>

          <!-- Meeting Link (conditional) -->
          <div v-if="meetingForm.meeting_type === 'virtual'" class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Meeting Link</label>
            <input v-model="meetingForm.meeting_link" type="url"
              placeholder="https://meet.google.com/... or https://webex.us/j/..."
              class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <!-- Location (conditional) -->
          <div v-if="meetingForm.meeting_type === 'in_person'" class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
            <input v-model="meetingForm.location" type="text" placeholder="Office address, conference room, etc."
              class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <!-- Priority -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
            <select v-model="meetingForm.priority"
              class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
              <option value="urgent">⚡ Urgent</option>
            </select>
          </div>




          <!-- Reminder -->
          <!-- <div class="mb-6">
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Reminder</label>
            <select v-model="meetingForm.reminder_minutes" class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="5">5 minutes before</option>
              <option value="10">10 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div> -->

          <!-- Submit Button -->
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" @click="resetForm"
              class="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="isSubmitting"
              class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5">
              <span v-if="isSubmitting"
                class="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              {{ isSubmitting ? 'Scheduling...' : 'Schedule Meeting' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Right Column: Team Members & Customer Info -->
      <div class="space-y-6">
        <!-- Team Information -->
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-slate-800">Team Information</h2>
            <span class="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600">{{ team.name
            }}</span>
          </div>
          <div v-if="team.company" class="p-5 bg-slate-50 m-4 rounded-xl">
            <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Client Company</h3>
            <p class="font-medium text-slate-800 text-sm">{{ team.company.name }}</p>
            <p v-if="team.company.address" class="text-slate-500 text-xs mt-1">{{ team.company.address }}</p>
            <p v-if="team.company.email" class="text-slate-500 text-xs">{{ team.company.email }}</p>
          </div>
        </div>

        <!-- Team Members Selection -->
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-slate-800">Team Members</h2>
            <span class="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">{{
              selectedMembers.length }} selected</span>
          </div>
          <div class="max-h-80 overflow-y-auto">
            <label v-for="member in team.members" :key="member.id"
              class="flex items-center gap-3 px-5 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
              <input type="checkbox" :value="member.id" v-model="selectedMembers"
                class="w-4 h-4 rounded border-slate-300" />
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                :style="{ backgroundColor: getAvatarColor(member.name) }">
                {{ getInitials(member.name) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-800 text-sm">{{ member.name }}</p>
                <p class="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">{{
                  member.pivot.role }}</p>
                <p class="text-xs text-slate-400 truncate">{{ member.email }}</p>
              </div>
            </label>
          </div>
          <div class="px-5 py-3 border-t border-slate-200 bg-slate-50">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" class="w-4 h-4" />
              <span class="text-sm text-slate-700">Select All Team Members</span>
            </label>
          </div>
        </div>


        <!-- Owner Information -->
        <div v-if="team.owner" class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-200">
            <h2 class="text-lg font-semibold text-slate-800">Customer Success Manager</h2>
          </div>
          <div class="flex items-center gap-4 p-6">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
              :style="{ backgroundColor: getAvatarColor(team.owner.name) }">
              {{ getInitials(team.owner.name) }}
            </div>
            <div>
              <p class="font-semibold text-slate-800">{{ team.owner.name }}</p>
              <p class="text-xs text-indigo-600 mt-0.5">{{ formatRole(team.owner.role) }}</p>
              <p class="text-xs text-slate-400">{{ team.owner.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" :class="[
      'fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-medium z-50 animate-slide-in',
      toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
    ]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

/* Route & Store */
const route = useRoute()
const authStore = useAuthStore()

/* State */
const team = ref({})
const isSubmitting = ref(false)
const selectedMembers = ref([])
const selectedCompanies = ref([])
const selectedCustomers = ref([])

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const validationErrors = ref({})

/* Form Data */
const meetingForm = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  duration: '30',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  meeting_type: 'virtual',
  meeting_link: '',
  location: '',
  priority: 'medium',
  reminder_minutes: '15',
  type_of_activity: '',
})

/* Computed */
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const isAllSelected = computed(() => {
  return team.value.members && team.value.members.length > 0 &&
    selectedMembers.value.length === team.value.members.length
})

/* Helper Functions */
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const getAvatarColor = (name) => {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  let hash = 0
  if (name) {
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i)
      hash |= 0
    }
  }
  return colors[Math.abs(hash) % colors.length]
}

const formatRole = (role) => {
  if (!role) return ''
  return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}



const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const validateForm = () => {
  validationErrors.value = {}
  let isValid = true

  if (!meetingForm.value.title.trim()) {
    validationErrors.value.title = 'Meeting title is required'
    isValid = false
  }
  if (!meetingForm.value.date) {
    validationErrors.value.date = 'Date is required'
    isValid = false
  }
  if (!meetingForm.value.time) {
    validationErrors.value.time = 'Time is required'
    isValid = false
  }

  return isValid
}

const resetForm = () => {
  meetingForm.value = {
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '30',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    meeting_type: 'virtual',
    meeting_link: '',
    location: '',
    priority: 'medium',
    reminder_minutes: '15',
    type_of_activity: '',
  }
  selectedMembers.value = []
  selectedCompanies.value = []
  selectedCustomers.value = []
  validationErrors.value = {}
}

const toggleSelectAll = (event) => {
  if (event.target.checked && team.value.members) {
    selectedMembers.value = team.value.members.map(m => m.id)
  } else {
    selectedMembers.value = []
  }
}



/* Timezone List */
const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska (AKST)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii (HST)' },
  { value: 'Europe/London', label: 'GMT (UTC+0)' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
]



const typeOfActivity = [
  { value: 'Training', label: 'Training' },
  { value: 'Technical Suppport', label: 'Technical Suppport' },
  { value: 'Lunch and Learn', label: 'Lunch and Learn' },
  { value: 'Customer Onboarding', label: 'Customer Onboarding' },
  { value: 'Quarterly Business Review', label: 'Quarterly Business Review' },
  { value: 'Renewal Discussion', label: 'Renewal Discussion' },
  { value: 'Adoption Check-in', label: 'Adoption Check-in' },
  { value: 'Feedback Session', label: 'Feedback Session' },
]

/* API Functions */
const getTeam = async () => {
  try {
    const { data } = await api().get(`/success-teams/${authStore.team_id}`)
    team.value = data
  } catch (error) {
    console.error('Failed to fetch team:', error)
    showToast('Failed to load team data', 'error')
  }
}

const submitMeeting = async () => {
  if (!validateForm()) {
    showToast('Please fill in all required fields', 'error')
    return
  }

  if (selectedMembers.value.length === 0) {
    showToast('Please select at least one team member', 'error')
    return
  }

  isSubmitting.value = true

  const payload = {
    meeting_title: meetingForm.value.title,
    description: meetingForm.value.description,

    date: meetingForm.value.date,
    time: meetingForm.value.time + ':00',
    duration: meetingForm.value.duration,

    type_of_activity: meetingForm.value.type_of_activity,
    timezone: meetingForm.value.timezone,

    meeting_type:
      meetingForm.value.meeting_type === 'virtual'
        ? 'online'
        : meetingForm.value.meeting_type,

    priority: meetingForm.value.priority,

    success_team_id: team.value.id,
    success_team_user_id: selectedMembers.value
  }

  // ✅ Conditional fields
  if (meetingForm.value.meeting_type === 'virtual') {
    payload.meeting_link = meetingForm.value.meeting_link
  }

  if (meetingForm.value.meeting_type === 'in_person') {
    payload.location = meetingForm.value.location
  }

  try {
    const { data } = await api().post('/meeting-schedules', payload)

    console.log('Meeting created:', data)

    showToast('Meeting scheduled successfully!', 'success')
    resetForm()

  } catch (error) {
    console.error('Failed:', error)
    showToast(
      error.response?.data?.message || 'Failed to schedule meeting',
      'error'
    )
  } finally {
    isSubmitting.value = false
  }
}

/* Watch for route changes */
watch(() => route.params, () => {
  getTeam()
})

/* Lifecycle */
onMounted(() => {
  getTeam()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  meetingForm.value.date = tomorrow.toISOString().split('T')[0]

  const nextHour = new Date()
  nextHour.setHours(nextHour.getHours() + 1, 0, 0)
  meetingForm.value.time = nextHour.toTimeString().slice(0, 5)
})
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>