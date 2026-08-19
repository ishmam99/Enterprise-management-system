<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 -right-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-40 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 p-6 w-full mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Activity Timeline
        </h2>
        <p class="mt-2 text-md text-gray-600 font-medium">Real-time user actions with smart date filters</p>
      </div>

      <!-- Filters Card -->
      <div class="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
        <!-- Quick Date Tabs -->
        <div class="flex flex-wrap gap-3 justify-center mb-6">
          <button
            v-for="tab in dateTabs"
            :key="tab.key"
            @click="setQuickDate(tab.key)"
            :class="[
              'px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm',
              activeDateTab === tab.key
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg'
                : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Search + Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="relative">
            <input
              v-model="search"
              @keyup.enter="fetchActivities(1)"
              placeholder="Search user, module, action..."
              class="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all font-medium text-sm placeholder-gray-500"
            />
          </div>

          <select v-model="type" @change="fetchActivities(1)" class="px-4 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 font-medium text-sm">
            <option value="">All Actions</option>
            <option value="viewed">View</option>
            <option value="created">Create</option>
            <option value="updated-field">Update</option>
            <option value="deleted">Delete</option>
            <option value="login">Login</option>
          </select>

          <input type="date" v-model="startDate" @change="onCustomDateChange" class="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 font-medium text-sm" />

          <input type="date" v-model="endDate" @change="onCustomDateChange" class="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 font-medium text-sm" />

          <button @click="fetchActivities(1)" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
            Refresh
          </button>
        </div>
      </div>

      <!-- Table Header -->
      <div class="bg-white/90 backdrop-blur-xl rounded-t-2xl shadow-md border border-white/30 px-6 py-4">
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
      <div class="space-y-4 mb-8">
        <div
          v-for="act in activities.data"
          :key="act.id"
          class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 overflow-hidden"
        >
          <div class="p-6">
            <div class="grid grid-cols-12 gap-5 items-start text-sm">
              <!-- User & Time -->
              <div class="col-span-2">
                <div class="flex items-center gap-3 mb-3">
                  <div class="relative">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-md">
                      <div class="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-purple-700 text-lg">
                        {{ (act.user?.name || 'U').charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ act.user?.name || 'Unknown User' }}</p>
                    <p class="text-xs text-gray-500 truncate max-w-40">{{ act.user?.email || '-' }}</p>
                  </div>
                </div>
                <p class="text-xs text-gray-500 flex items-center gap-1">{{ formatDateTime(act.created_at) }}</p>
              </div>

              <!-- Action -->
              <div class="col-span-1"><p v-if="act.meta" class="text-xs text-gray-500 mt-1 italic">{{ act.meta }}</p></div>

              <!-- Module & Record -->
              <div class="col-span-2">
                <div class="space-y-2">
                  <div class="flex items-center gap-2"><span class="font-medium text-gray-800">{{ act.module || '—' }}</span></div>
                  <div v-if="act.record_id" class="flex items-center gap-1 text-orange-600 font-semibold text-xs">Record #{{ act.record_id }}</div>
                </div>
              </div>

              <!-- IP & Location -->
              <div class="col-span-2">
                <p class="font-mono text-xs bg-gray-100 px-2 py-1 rounded border mb-1">{{ act.ip || '—' }}</p>
              </div>

              <!-- Browser & Device -->
              <div class="col-span-3">
                <div class="flex items-center gap-3 text-sm">
                  <span class="font-medium">{{ getBrowserName(act.user_agent) }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="text-gray-600">{{ isMobile(act.user_agent) ? 'Mobile' : 'Desktop' }}</span>
                </div>
              </div>

              <!-- Details -->
              <div class="col-span-2">
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                  <p class="text-xs leading-relaxed text-gray-800 font-medium">{{ parsedDetails(act.details) || '—' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!activities.data?.length" class="text-center py-16 text-gray-500">
          No activities found.
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-6 mt-10">
        <button @click="fetchActivities(currentPage - 1)" :disabled="!activities.links?.prev" class="px-6 py-3 bg-white border border-purple-400 rounded-lg font-semibold text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-105 transition-all">Previous</button>
        <div class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg text-lg">Page {{ activities.current_page || 1 }} of {{ activities.last_page || 1 }}</div>
        <button @click="fetchActivities(currentPage + 1)" :disabled="!activities.links?.next" class="px-6 py-3 bg-white border border-purple-400 rounded-lg font-semibold text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-105 transition-all">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activities = ref({ data: [], current_page: 1, last_page: 1, total: 0, links: {} })
const search = ref('')
const type = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const activeDateTab = ref('week')

const dateTabs = [
  { key: 'today', label: 'Today', route: 'today' },
  { key: 'week', label: 'This Week', route: 'thisWeek' },
  { key: 'month', label: 'This Month', route: 'ThisMonth' },
  { key: 'custom', label: 'Custom Range', route: null }
]

const getTabFromRoute = () => {
  if (route.path.includes('/today')) return 'today'
  if (route.path.includes('/thisWeek')) return 'week'
  if (route.path.includes('/ThisMonth')) return 'month'
  return 'week'
}

const getDateParamsFromTab = (tab) => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const todayStr = `${yyyy}-${mm}-${dd}`

  if (tab === 'today') return { today: todayStr }
  if (tab === 'week') {
    const start = new Date(today)
    const day = start.getDay()
    const diff = start.getDate() - day + (day === 0 ? -6 : 1)
    start.setDate(diff)
    return { start_date: start.toISOString().split('T')[0], end_date: todayStr }
  }
  if (tab === 'month') return { start_date: `${yyyy}-${mm}-01`, end_date: todayStr }
  return {}
}

const setQuickDate = (key) => {
  activeDateTab.value = key
  startDate.value = ''
  endDate.value = ''

  const tab = dateTabs.find(t => t.key === key)
  const routeSegment = tab.route ? `/${tab.route}` : ''
  router.push(`/hr_management/activity${routeSegment}`).catch(() => {})

  const params = getDateParamsFromTab(key)
  fetchActivities(1, params)
}

const onCustomDateChange = () => {
  activeDateTab.value = 'custom'
  router.push('/hr_management/activity').catch(() => {})
  fetchActivities(1)
}

const fetchActivities = async (page = 1, overrideParams = {}) => {
  currentPage.value = page

  const params = {
    page,
    per_page: 50,
    search: search.value || undefined,
    action: type.value || undefined,
    ...overrideParams
  }

  if (activeDateTab.value === 'custom') {
    if (startDate.value) params.start_date = startDate.value
    if (endDate.value) params.end_date = endDate.value
  }

  Object.keys(params).forEach(key => params[key] === undefined && delete params[key])

  try {
    const { data } = await api().get('/crm/activities', { params })
    activities.value = data
  } catch {
    activities.value = { data: [], current_page: 1, last_page: 1, total: 0, links: {} }
  }
}

watch(route, () => {
  const tab = getTabFromRoute()
  activeDateTab.value = tab
  const params = getDateParamsFromTab(tab)
  fetchActivities(1, params)
}, { immediate: true })

watch([search, type], () => fetchActivities(1))
watch([startDate, endDate], () => activeDateTab.value === 'custom' && fetchActivities(1))

onMounted(() => {
  const tab = getTabFromRoute()
  activeDateTab.value = tab
  const params = getDateParamsFromTab(tab)
  fetchActivities(1, params)
})

const formatDateTime = (date) => new Date(date).toLocaleString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' })
const parsedDetails = (details) => { try { return JSON.parse(details).data || details } catch { return details } }
const getBrowserName = (ua) => ua?.includes('Chrome') ? 'Chrome' : ua?.includes('Firefox') ? 'Firefox' : 'Browser'
const isMobile = (ua) => /Mobi|Android|iPhone/i.test(ua)
</script>

<style scoped>
@keyframes blob { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(30px,-30px) scale(1.1) } }
.animate-blob { animation: blob 20s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
