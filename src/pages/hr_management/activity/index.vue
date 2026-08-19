<template>
  >
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 -right-20 w-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-40 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 p-6 max-w-full mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h2 class="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          All Activity Timeline
        </h2>
        <p class="mt-3 text-lg text-gray-600 font-medium">Track every user action with powerful filters</p>
      </div>

      <!-- Filters Card -->
      <div class="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
        <!-- Quick Date Tabs -->
        <div class="flex flex-wrap gap-4 justify-center mb-8">
          <button
            v-for="tab in dateTabs"
            :key="tab"
            @click="setQuickDate(tab)"
            :class="[
              'px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md',
              activeDateTab === tab
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg'
            ]"
          >
            {{ dateTabLabels[tab] }}
          </button>
        </div>

        <!-- Filters Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-6">
          <!-- Search -->
          <div class="relative">

            <input

              v-model="search"
              @keyup.enter="fetchActivities(1)"
              placeholder="Search user, module, action..."
              class="w-full pl-12 pr-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 font-medium transition-all placeholder-gray-500 text-sm"
            />

          </div>

          <!-- Action Type -->
          <select v-model="type" @change="fetchActivities(1)"
            class="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 font-medium text-sm">
            <option value="">All Actions</option>
            <option value="viewed">View</option>
            <option value="created">Create</option>
            <option value="updated-field">Update</option>
            <option value="deleted">Delete</option>
            <option value="login">Login</option>
          </select>

          <!-- Role Select (Your Custom Style) -->
          <div class="relative">
            <select
              v-model="selectedRole"
              @change="onRoleChange"
              class="w-full px-6 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-200 font-medium transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">All Roles</option>
              <option v-for="role in availableRoles" :key="role" :value="role">
                {{ formatRoleName(role) }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- User Select (Cascading) -->
          <div v-if="selectedRole" class="relative">
            <select
              v-model="selectedUserId"
              @change="fetchActivities(1)"
              :disabled="loadingUsers"
              class="w-full px-6 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 rounded-2xl focus:border-rose-500 focus:ring-4 focus:ring-rose-200 font-medium transition-all disabled:opacity-60 appearance-none cursor-pointer text-sm"
            >
              <option value="">All Users in {{ formatRoleName(selectedRole) }}</option>
              <option v-for="user in usersInRole" :key="user.id" :value="user.id">
                {{ user.name }} <span class="text-gray-500">({{ user.email }})</span>
              </option>
            </select>
            <span v-if="loadingUsers" class="absolute right-12 top-4 text-sm text-gray-500">Loading...</span>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Date Range -->
          <input
            type="date"
            v-model="startDate"
            @change="onDateChange"
            class="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-200 font-medium text-sm"
          />
          <input
            type="date"
            v-model="endDate"
            @change="onDateChange"
            class="px-6 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 font-medium text-sm"
          />

          <!-- Refresh Button -->
          <button
            @click="fetchActivities(1)"
            class="col-span-1 md:col-span-2 xl:col-span-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-sm"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Activity Table Header -->
      <div class="bg-white/90 backdrop-blur-xl rounded-xl shadow-md border border-white/30 mb-4 px-6 py-4">
        <div class="grid grid-cols-12 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
          <div class="col-span-2">User & Time</div>
          <div class="col-span-1">Action</div>
          <div class="col-span-2">Module / Record</div>
          <div class="col-span-2">IP & Location</div>
          <div class="col-span-3">Browser & Device</div>
          <div class="col-span-2">Details</div>
        </div>
      </div>

      <!-- Activity Rows -->
      <div class="space-y-5">
        <div
          v-for="act in activities?.data"
          :key="act.id"
          class="group bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 overflow-hidden"
        >
          <div class="p-6">
            <div class="grid grid-cols-12 gap-5 items-start text-sm">
              <!-- User & Time -->
              <div class="col-span-2">
                <div class="flex items-center gap-3 mb-2">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-md">
                      <div class="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-purple-700">
                        {{ (act.user?.name || 'U').charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 truncate max-w-32">{{ act.user?.name || 'Unknown User' }}</p>
                    <p class="text-xs text-gray-500">{{ act.user?.email }}</p>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-3 flex items-center gap-1">
                  {{ formatDateTime(act.created_at) }}
                </p>
              </div>

              <!-- Action -->
              <div class="col-span-1">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm"
                  :class="getBadgeClass(act.action)">
                  {{ getActionLabel(act.action) }}
                </span>
              </div>

              <!-- Module / Record -->
              <div class="col-span-2">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-800">{{ act.module || '—' }}</span>
                  </div>
                  <div v-if="act.record_id" class="text-xs text-orange-600 font-semibold">
                    Record #{{ act.record_id }}
                  </div>
                </div>
              </div>

              <!-- IP & Location -->
              <div class="col-span-2">
                <p class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{{ act.ip || '—' }}</p>
                <p class="text-xs text-gray-600 mt-1">{{ getLocationFromIP(act.ip) }}</p>
              </div>

              <!-- Browser & Device -->
              <div class="col-span-3 text-xs">
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ getBrowserName(act.user_agent) }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="text-gray-600">{{ isMobile(act.user_agent) ? 'Mobile' : 'Desktop' }}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1 truncate">{{ simplifyUserAgent(act.user_agent) }}</p>
              </div>

              <!-- Details -->
              <div class="col-span-2">
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 text-xs">
                  <p class="font-medium text-gray-800 leading-relaxed">
                    {{ parsedDetails(act.details) || '—' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex justify-center items-center gap-6">
        <button @click="fetchActivities(currentPage - 1)" :disabled="!activities?.links?.prev"
          class="px-8 py-4 bg-white border-2 border-purple-400 rounded-2xl font-bold text-purple-700 hover:bg-purple-50 disabled:opacity-50 shadow-lg hover:scale-105 transition-all">
          Previous
        </button>
        <div class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-xl">
          {{ activities?.meta?.current_page || 1 }}
        </div>
        <button @click="fetchActivities(currentPage + 1)" :disabled="!activities?.links?.next"
          class="px-8 py-4 bg-white border-2 border-purple-400 rounded-2xl font-bold text-purple-700 hover:bg-purple-50 disabled:opacity-50 shadow-lg hover:scale-105 transition-all">
          Next
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="selectedActivity" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" @click="selectedActivity = null">
          <div class="relative max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-purple-500/50 overflow-hidden" @click.stop>
            <button @click="selectedActivity = null" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="p-8 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/70 to-pink-900/70">
              <h3 class="text-3xl font-bold text-white flex items-center gap-3">
                <span class="px-4 py-2 bg-purple-600 rounded-full text-sm">{{ getActionLabel(selectedActivity.action) }}</span>
                Activity Details
              </h3>
              <p class="text-gray-300 mt-3">
                {{ selectedActivity.user?.name || 'System' }} • {{ formatDate(selectedActivity.created_at) }}
                <span class="ml-4 text-xs bg-white/10 px-3 py-1 rounded">IP: {{ selectedActivity.ip }}</span>
              </p>
            </div>
            <div class="p-8 max-h-[70vh] overflow-y-auto">
              <pre class="text-green-400 font-mono text-sm bg-black/50 p-6 rounded-xl border border-purple-500/30">
{{ formatDetails(selectedActivity.details) }}</pre>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted, watch } from 'vue'

// Reactive State
const activities = ref({ data: [], meta: {}, links: {} })
const loading = ref(false)
const search = ref('')
const type = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const activeDateTab = ref('week')
const selectedActivity = ref(null)

// Role & User Filters
const selectedRole = ref('')
const selectedUserId = ref('')
const usersInRole = ref([])
const loadingUsers = ref(false)

// Your exact role list
const availableRoles = ref([
  'sales-director', 'sales-manager', 'sales-executive',
  'crm-director', 'crm-manager', 'crm-executive',
  'customer-director', 'customer-manager',
  'hr-director', 'marketing-executive',
  'partner-director', 'website-director'
])

const dateTabs = ['today', 'week', 'month', 'custom']
const dateTabLabels = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  custom: 'Custom Range'
}

// Format role name: sales-director → Sales Director
const formatRoleName = (role) => {
  return role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Fetch users when role changes
const onRoleChange = async () => {
  selectedUserId.value = ''
  usersInRole.value = []

  if (!selectedRole.value) {
    fetchActivities(1)
    return
  }

  loadingUsers.value = true
  api().get('/users/role-get', { params: { role: selectedRole.value } })
    .then(res => {
      usersInRole.value = res.data?.data || res.data || []
    })
    .catch(err => {
      console.error('Failed to load users:', err)
      usersInRole.value = []
    })
    .finally(() => {
      loadingUsers.value = false
    })
}

const onDateChange = () => {
  activeDateTab.value = 'custom'
  fetchActivities(1)
}

// Main API call
const fetchActivities = async (page = 1, overrideParams = {}) => {
  if (loading.value) return
  loading.value = true
  currentPage.value = page

  const params = {
    page,
    per_page: 50,
    search: search.value || undefined,
    action: type.value || undefined,
    start_date: startDate.value || undefined,
    end_date: endDate.value || undefined,
    role: selectedRole.value || undefined,
    user_id: selectedUserId.value || undefined,
    ...overrideParams
  }

  Object.keys(params).forEach(k => params[k] === undefined && delete params[k])

  try {
    const res = await api().get('/crm/activities', { params })
    activities.value = {
      data: res.data?.data || [],
      meta: res.data?.meta || {},
      links: res.data?.links || {}
    }
    currentPage.value = res.data?.meta?.current_page || 1
  } catch (err) {
    console.error('Failed to load activities:', err)
    activities.value = { data: [], meta: {}, links: {} }
  } finally {
    loading.value = false
  }
}

// Quick date filters
const setQuickDate = (tab) => {
  activeDateTab.value = tab
  startDate.value = ''
  endDate.value = ''

  if (tab === 'today') {
    const today = new Date().toISOString().split('T')[0]
    fetchActivities(1, { today })
    return
  }

  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const end = `${year}-${month}-${day}`

  let start = end
  if (tab === 'week') {
    const startOfWeek = new Date(today)
    const diff = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    startOfWeek.setDate(diff)
    start = startOfWeek.toISOString().split('T')[0]
  } else if (tab === 'month') {
    start = `${year}-${month}-01`
  }

  startDate.value = start
  endDate.value = end
  fetchActivities(1)
}

// Watch all filters
watch([search, type, selectedRole, selectedUserId], () => fetchActivities(1))
watch([startDate, endDate], () => {
  if (activeDateTab.value === 'custom') fetchActivities(1)
})

// Helpers
const formatDateTime = (dt) => new Date(dt).toLocaleString('en-US', {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
})
const formatDate = (d) => new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })

const formatDetails = (d) => {
  try {
    if (typeof d === 'string') d = JSON.parse(d)
    return JSON.stringify(d.data || d, null, 2)
  } catch { return String(d) }
}

const getBadgeClass = (action) => {
  const map = {
    created: 'from-green-500 to-emerald-600',
    viewed: 'from-blue-500 to-cyan-600',
    'updated-field': 'from-yellow-500 to-orange-600',
    deleted: 'from-red-500 to-rose-600',
    login: 'from-indigo-500 to-purple-600',
  }
  return `bg-gradient-to-r ${map[action] || 'from-gray-500 to-gray-600'}`
}

const getActionLabel = (action) => ({
  created: 'Created', viewed: 'Viewed', 'updated-field': 'Updated', deleted: 'Deleted', login: 'Logged In'
}[action] || action.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))

const parsedDetails = (details) => {
  if (!details) return '—'
  let parsed
  try { parsed = JSON.parse(details) } catch { return details }

  if (typeof parsed === 'string') return parsed
  if (parsed.data || parsed.message) return parsed.data || parsed.message

  const keys = Object.keys(parsed)
  if (keys.length === 1) return `${keys[0].replace(/_/g, ' ')}: ${parsed[keys[0]]}`

  if (parsed.old_value !== undefined || parsed.new_value !== undefined) {
    const field = parsed.field_name || 'Value'
    const oldVal = parsed.old_value ?? '—'
    const newVal = parsed.new_value ?? '—'
    if (oldVal === '—') return `Set "${field}" to "${newVal}"`
    return `Updated "${field}" from "${oldVal}" to "${newVal}"`
  }

  return JSON.stringify(parsed, null, 2)
}

const getBrowserName = (ua) => {
  if (!ua) return 'Unknown'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edg')) return 'Edge'
  return 'Browser'
}

const isMobile = (ua) => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
const simplifyUserAgent = (ua) => ua ? ua.split(' ').slice(0, 4).join(' ') + '...' : ''
const getLocationFromIP = () => 'USA' // Replace with real service if needed

// Initial load
onMounted(() => setQuickDate('week'))
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}
.animate-blob { animation: blob 20s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
