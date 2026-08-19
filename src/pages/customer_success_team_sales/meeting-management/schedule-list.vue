<template>
  <div class="px-6 py-6 bg-slate-100 min-h-screen">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800">
        Meeting Schedules
      </h1>
      <p class="text-sm text-gray-500">
        View all scheduled meetings
      </p>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

      <!-- Loader -->
      <div v-if="loading" class="p-6 space-y-4">
        <div v-for="i in 5" :key="i" class="h-10 bg-slate-200 animate-pulse rounded"></div>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-emerald-100 text-slate-700 text-sm">
            <tr>
              <th class="border-e">Title &amp; Activity</th>
              <th class="border-e">Date &amp; Time</th>
              <th class="border-e">Duration</th>
              <th class="border-e">Type &amp; Details</th>
              <th class="border-e">Participants</th>
              <th class="border-e">Created By</th>
              <th class="border-e">Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="meeting in meetings" :key="meeting.id" :class="{ 'bg-red-50': isUserInMeeting(meeting) }">
              <!-- Title & Activity Type (separate column) -->
              <td class="border-e">
                <p class="font-semibold text-slate-800">
                  {{ meeting.meeting_title }}
                </p>
                <p class="text-xs text-red-500">
                 Type of Activity: {{ meeting.type_of_activity }}
                </p>
              </td>

              <!-- Date & Time -->
              <td class="border-e text-sm">
                <p>{{ formatDate(meeting.date) }}</p>
                <p class="text-slate-500 text-xs">
                  {{ formatTime(meeting.time) }} ({{ meeting.timezone }})
                </p>
              </td>

              <!-- Duration -->
              <td class="border-e text-sm">
                {{ meeting.duration }} min
              </td>

              <!-- Type & Details (with Join button for online) -->
              <td class="border-e">
                <div class="flex flex-col gap-1">
                  <!-- Meeting Type Badge -->
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium w-fit',
                    meeting.meeting_type === 'online'
                      ? 'bg-indigo-100 text-indigo-700'
                      : meeting.meeting_type === 'in_person'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-yellow-100 text-yellow-700'
                  ]">
                    {{ meeting.meeting_type }}
                  </span>

                  <!-- Online: Meeting Link & Join Button -->
                  <div v-if="meeting.meeting_type === 'online' && meeting.meeting_link"
                    class="flex flex-col gap-1 mt-1">
                    <a :href="meeting.meeting_link" target="_blank"
                      class="text-xs text-blue-500 truncate max-w-[150px] hover:underline">
                      {{ meeting.meeting_link }}
                    </a>
                    <button @click="joinMeeting(meeting.meeting_link)"
                      class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-md transition-colors w-fit">
                      Join Meeting
                    </button>
                  </div>

                  <!-- In Person: Location with prefix -->
                  <p v-if="meeting.meeting_type === 'in_person' && meeting.location"
                    class="text-xs text-slate-600 mt-1">
                    📍 Location is: {{ meeting.location }}
                  </p>
                </div>
              </td>

              <!-- Participants (clickable initials show full name) -->
              <td class="border-e">
                <div class="flex -space-x-2">
                  <div v-for="user in meeting.users" :key="user.id"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white cursor-pointer hover:opacity-80 transition-opacity"
                    :style="{ backgroundColor: getAvatarColor(user.name) }" @click="showParticipantName(user.name)">
                    {{ getInitials(user.name) }}
                  </div>
                </div>
              </td>

              <!-- Created By (with pivot role) -->
              <td class="border-e text-sm">
                <div class="flex flex-col">
                  <span class="font-medium">{{ meeting.created_by?.name }}</span>
                  <span class="text-xs text-slate-500">
                    {{ formatRole(meeting.created_by?.role) }}
                  </span>
                </div>
              </td>

              <!-- Priority -->
              <td class="border-e">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  meeting.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : meeting.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                ]">
                  {{ meeting.priority }}
                </span>
              </td>

              <!-- Action -->
              <td>
                <button class="text-indigo-600 hover:underline text-sm" @click="viewMeeting(meeting)">
                  View
                </button>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-if="meetings.length === 0">
              <td colspan="8" class="text-center py-6 text-slate-500">
                No meetings found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-slate-800 mb-2">Participant</h3>
        <p class="text-gray-600">{{ selectedParticipantName }}</p>
        <div class="mt-4 flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'


const authStore = useAuthStore()

const route = useRoute()



const meetings = ref([])
const loading = ref(false)

/* Fetch Meetings */
const getMeetings = async () => {
  loading.value = true
  try {
    const { data } = await api().get(`/meeting-schedules?created_by=${authStore.user?.id}`)
    meetings.value = data.data || []
  } catch (error) {
    console.error('Error fetching meetings:', error)
  } finally {
    loading.value = false
  }
}

/* Helper Functions */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const formatTime = (time) => {
  return time?.slice(0, 5)
}

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const getAvatarColor = (name) => {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec489a']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const showModal = ref(false)
const selectedParticipantName = ref('')

const showParticipantName = (name) => {
  selectedParticipantName.value = name
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
  selectedParticipantName.value = ''
}

const joinMeeting = (link) => {
  if (link) {
    window.open(link, '_blank')
  }
}

const formatRole = (role) => {
  if (!role) return 'No role'
  return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const isUserInMeeting = (meeting) => {
  if (!authStore.user?.id) return false
  return meeting.users?.some(user => user.id == authStore.user.id)
}

/* Actions */
const viewMeeting = (meeting) => {
  console.log('View meeting:', meeting)
}

onMounted(() => {
  getMeetings()
})
</script>

<style scoped>
.bg-blue-50 {
  background-color: #eff6ff;
}
</style>