<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
    <!-- Enhanced Animated Background Blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 -right-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-40 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob animation-delay-6000"></div>
      <div class="absolute bottom-20 right-1/3 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-8000"></div>
    </div>

    <div class="relative z-10 p-6 w-full mx-auto max-w-full">
      <!-- Enhanced Header -->
      <div class="text-center mb-8">
        <div class="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1 rounded-2xl mb-4 shadow-2xl">
          <h2 class="text-5xl font-extrabold bg-white bg-clip-text text-transparent drop-shadow-lg px-6 py-3 rounded-xl">
            🚀 Sales Person Activity Timeline {{ selectedUser ? `- ${usersOfRole.find(u => u.id === selectedUser)?.name || 'User'}` : '' }}
          </h2>
        </div>
        <p class="mt-2 text-md text-gray-600 font-medium bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-white/30">
          📊 Real-time user actions with smart date filters
        </p>
      </div>

      <!-- Colorful Cards Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- ROLE DROPDOWN Card -->
        <div class="backdrop-blur-xl bg-gradient-to-br from-purple-100/80 to-blue-100/80 rounded-2xl shadow-xl border border-purple-200/50 p-6">
          <label class="block text-sm font-medium mb-2 text-purple-800">🎭 Select Sales Role</label>
          <select v-model="selectedRole" class="select select-bordered w-full bg-white/90 border-purple-300 text-purple-700 font-medium rounded-xl py-2">
            <option value="" class="text-gray-500">-- choose role --</option>
            <option v-for="r in roles" :key="r" :value="r" class="text-purple-700">
              {{ r.replace(/-/g, ' ').toUpperCase() }}
            </option>
          </select>
        </div>

        <!-- USER DROPDOWN Card -->
        <div v-if="usersOfRole.length > 0" class="backdrop-blur-xl bg-gradient-to-br from-pink-100/80 to-red-100/80 rounded-2xl shadow-xl border border-pink-200/50 p-6">
          <label class="block text-sm font-medium mb-2 text-pink-800">👤 Select User</label>
          <select v-model="selectedUser" class="select select-bordered w-full bg-white/90 border-pink-300 text-pink-700 font-medium rounded-xl py-2">
            <option value="" class="text-gray-500">-- choose user --</option>
            <option v-for="u in usersOfRole" :key="u.id" :value="u.id" class="text-pink-700">
              🟢 {{ u.name }} ({{ u.email }})
            </option>
          </select>
        </div>

        <!-- Stats Card -->

      </div>

      <!-- ACTIVITIES SECTION -->
      <div v-if="selectedUser">
        <!-- Enhanced Filters Card -->
        <div class="backdrop-blur-xl bg-gradient-to-br from-indigo-100/80 via-purple-100/80 to-pink-100/80 rounded-2xl shadow-2xl border border-white/30 p-6 mb-6">
          <!-- Quick Date Tabs -->
          <div class="flex flex-wrap gap-3 mb-6 justify-center">
            <button
              v-for="tab in dateTabs"
              :key="tab.key"
              @click="setQuickDate(tab.key)"
              :class="[
                'px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg border-2',
                activeDateTab === tab.key
                  ? getTabActiveClass(tab.key) + ' text-white scale-105 shadow-xl transform -translate-y-1'
                  : 'bg-white/80 text-gray-700 border-white hover:bg-white hover:shadow-xl hover:scale-105'
              ]"
            >
              <span class="flex items-center gap-2">
                {{ getTabIcon(tab.key) }}
                {{ tab.label }}
              </span>
            </button>
          </div>

          <!-- Search + Filters -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div class="relative">
              <input
                v-model="search"
                @keyup.enter="fetchActivities(1)"
                placeholder="🔍 Search user, module, action..."
                class="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-200 transition-all font-medium placeholder-purple-500 text-purple-700 text-sm shadow-lg"
              />
              <svg class="absolute left-4 top-3.5 w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select v-model="type" @change="fetchActivities(1)"
              class="px-4 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-400 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 font-medium text-indigo-700 text-sm shadow-lg">
              <option value="">🎯 All Actions</option>
              <option value="viewed">👁️ View</option>
              <option value="created">✨ Create</option>
              <option value="updated-field">🔄 Update</option>
              <option value="deleted">🗑️ Delete</option>
              <option value="login">🔐 Login</option>
            </select>

            <input type="date" v-model="startDate" @change="onDateChange"
              class="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-200 font-medium text-green-700 text-sm shadow-lg" />

            <input type="date" v-model="endDate" @change="onDateChange"
              class="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl focus:border-orange-600 focus:ring-4 focus:ring-orange-200 font-medium text-orange-700 text-sm shadow-lg" />

            <button @click="fetchActivities(1)"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all flex items-center justify-center gap-3 text-sm">
              <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              🚀 Refresh
            </button>
          </div>
        </div>

        <!-- Enhanced Loading State -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-flex flex-col items-center gap-4">
            <div class="relative">
              <div class="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-20 h-20 border-4 border-pink-600 border-b-transparent rounded-full animate-spin animation-delay-1000"></div>
            </div>
            <p class="text-purple-700 font-semibold text-lg bg-white/80 px-4 py-2 rounded-full border border-purple-200">
              🎨 Loading colorful activities...
            </p>
          </div>
        </div>

        <!-- Enhanced Activity Table Header -->
        <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 mb-4 px-6 py-5">
          <div class="grid grid-cols-12 gap-4 text-xs font-bold text-white uppercase tracking-wider">
            <div class="col-span-2 flex items-center gap-2">👤 User & Time</div>
            <div class="col-span-1 flex items-center gap-2">🎭 Action</div>
            <div class="col-span-2 flex items-center gap-2">📁 Module / Record</div>
            <div class="col-span-2 flex items-center gap-2">🌐 IP & Location</div>
            <div class="col-span-3 flex items-center gap-2">💻 Browser & Device</div>
            <div class="col-span-2 flex items-center gap-2">📋 Details</div>
          </div>
        </div>

        <!-- Enhanced Activity Rows -->
        <div class="space-y-4">
          <div
            v-for="(act, index) in activities?.data"
            :key="act.id"
            class="group bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-purple-300/50 hover:shadow-2xl hover:border-purple-500 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
            :style="`animation-delay: ${index * 100}ms`"
          >
            <div class="p-6">
              <div class="grid grid-cols-12 gap-5 items-start text-sm">

                <!-- 1. User & Time -->
                <div class="col-span-2">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-lg">
                        <div class="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-purple-700 text-lg">
                          {{ (act.user?.name || 'U').charAt(0).toUpperCase() }}
                        </div>
                      </div>
                      <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 truncate">{{ act.user?.name || 'Unknown User' }}</p>
                      <p class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{{ act.user?.email }}</p>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600 mt-2 flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                    <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
                    {{ formatDateTime(act.created_at) }}
                  </p>
                </div>

                <!-- 2. Action -->
                <div class="col-span-1">
                  <span class="inline-flex items-center px-3 py-2 rounded-full text-xs font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-110"
                        :class="getBadgeClass(act.action)">
                    {{ getActionIcon(act.action) }} {{ getActionLabel(act.action) }}
                  </span>
                  <p v-if="act.meta" class="text-xs text-gray-600 mt-2 bg-gray-100 px-2 py-1 rounded-full italic">{{ act.meta }}</p>
                </div>

                <!-- 3. Module & Record -->
                <div class="col-span-2">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                      </svg>
                      <span class="font-semibold text-blue-800">{{ act.module || '—' }}</span>
                    </div>
                    <div v-if="act.record_id" class="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                      <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7 2a1 1 0 00-.707.293l-1 1A1 1 0 006 4h8a1 1 0 00.707-.293l1-1A1 1 0 0016 2H7zM5 6a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z" clip-rule="evenodd"/></svg>
                      <span class="text-orange-700 font-bold text-xs">Record #{{ act.record_id }}</span>
                    </div>
                  </div>
                </div>

                <!-- 4. IP & Location -->
                <div class="col-span-2">
                  <div class="space-y-2">
                    <p class="font-mono text-xs bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-2 rounded-xl border border-gray-600 shadow-inner">
                      🌐 {{ act.ip || '—' }}
                    </p>
                    <p class="text-xs text-gray-700 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                      {{ getLocationFromIP(act.ip) }}
                    </p>
                  </div>
                </div>

                <!-- 5. Browser & Device -->
                <div class="col-span-3">
                  <div class="flex items-center gap-3 text-sm mb-2">
                    <div class="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-200">
                      <span class="font-semibold text-indigo-700">{{ getBrowserName(act.user_agent) }}</span>
                    </div>
                    <span class="text-gray-400">•</span>
                    <div class="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200">
                      <svg v-if="isMobile(act.user_agent)" class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z"/></svg>
                      <svg v-else class="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489 1.099 4.39a1 1 0 01-.97 1.367l-1.048-.42-1.048.42a1 1 0 01-.97-1.367l1.099-4.39L9.78 16H5a2 2 0 01-2-2V5z" clip-rule="evenodd"/></svg>
                      <span class="text-purple-700 font-medium">{{ isMobile(act.user_agent) ? '📱 Mobile' : '💻 Desktop' }}</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 truncate">
                    {{ simplifyUserAgent(act.user_agent) }}
                  </p>
                </div>

                <!-- 6. Details Message -->
                <div class="col-span-2">
                  <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 hover:border-purple-500 transition-all duration-300">
                    <p class="font-semibold text-gray-800 text-xs leading-relaxed">
                      {{ parsedDetails(act.details) || '—' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Pagination -->
        <div class="mt-10 flex justify-center items-center gap-4">
          <button @click="fetchActivities(currentPage - 1)" :disabled="!activities?.links?.prev || loading"
            class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-3 text-sm border-2 border-white">
            ⬅️ Previous
          </button>
          <div class="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-2xl border-2 border-white">
            📄 {{ activities?.meta?.current_page || 1 }} / {{ activities?.meta?.last_page || 1 }}
          </div>
          <button @click="fetchActivities(currentPage + 1)" :disabled="!activities?.links?.next || loading"
            class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-3 text-sm border-2 border-white">
            Next ➡️
          </button>
        </div>
      </div>

      <!-- No Data State -->
      <div v-if="selectedUser && !loading && (!activities?.data || activities.data.length === 0)"
           class="text-center py-16 backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl border border-purple-200/50">
        <div class="text-6xl mb-4">😴</div>
        <h3 class="text-2xl font-bold text-purple-700 mb-2">No Activities Found</h3>
        <p class="text-purple-600">Try adjusting your filters or select a different time range</p>
      </div>

      <!-- Enhanced DETAILS MODAL -->
      <Teleport to="body">
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="selectedActivity" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" @click="selectedActivity = null">
            <div class="relative max-w-4xl w-full bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 rounded-3xl shadow-2xl border-2 border-purple-500/50 overflow-hidden" @click.stop>
              <button @click="selectedActivity = null" class="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-sm border border-white/20">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-600/70 to-pink-600/70 backdrop-blur-sm">
                <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                  <span class="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm border border-white/30">
                    {{ getActionLabel(selectedActivity.action) }}
                  </span>
                  🎯 Activity Details
                </h3>
                <p class="text-sm text-gray-200 mt-2 flex items-center gap-4">
                  <span class="flex items-center gap-1">
                    👤 {{ selectedActivity.user?.name || 'System' }}
                  </span>
                  <span class="flex items-center gap-1">
                    🕒 {{ formatDate(selectedActivity.created_at) }}
                  </span>
                  <span class="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs">
                    🌐 IP: {{ selectedActivity.ip }}
                  </span>
                </p>
              </div>
              <div class="p-6 max-h-[70vh] overflow-y-auto">
                <pre class="text-green-400 text-sm font-mono leading-relaxed bg-black/40 p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm shadow-inner">
{{ formatDetails(selectedActivity.details) }}</pre>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import api from "@/config/api";
import router from "@/router";

const route = useRoute();

const loading = ref(false);
const activities = ref(null);
const selectedActivity = ref(null);

const roles = ref([ "sales-manager", "sales-executive"]);
const selectedRole = ref("");
const usersOfRole = ref([]);
const selectedUser = ref("");

const activeDateTab = ref("today");
const startDate = ref("");
const endDate = ref("");
const search = ref("");
const type = ref("");
const currentPage = ref(1);
const perPage = 50;

const dateTabs = [
  { key: 'today', label: 'Today', route: 'today' },
  { key: 'week', label: 'This Week', route: 'thisWeek' },
  { key: 'month', label: 'This Month', route: 'thisMonth' },
  { key: 'custom', label: 'Custom Range', route: null }
]
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
// Enhanced helper functions
const getTabActiveClass = (key) => {
  const classes = {
    today: 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-500',
    week: 'bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-500',
    month: 'bg-gradient-to-r from-purple-500 to-pink-600 border-purple-500',
    custom: 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500'
  };
  return classes[key] || 'bg-gradient-to-r from-gray-500 to-gray-600 border-gray-500';
};

const getTabIcon = (key) => {
  const icons = {
    today: '📅',
    week: '🗓️',
    month: '📆',
    custom: '🎛️'
  };
  return icons[key] || '⏰';
};

const getActionIcon = (action) => {
  const icons = {
    viewed: '👁️',
    created: '✨',
    'updated-field': '🔄',
    deleted: '🗑️',
    login: '🔐'
  };
  return icons[action] || '🎭';
};

// Load users by role
const loadUsersByRole = async () => {
  if (!selectedRole.value) {
    usersOfRole.value = [];
    return;
  }
  try {
    const { data } = await api().get(`/users/role-get?role=${selectedRole.value}`);
    usersOfRole.value = data?.data || [];
  } catch (err) {
    console.error("Failed to load users:", err);
  }
};

// Critical Fix: Always send start/end dates if they exist
const fetchActivities = async (page = 1, overrideParams = {}) => {
  if (!selectedUser.value) return;

  loading.value = true;
  currentPage.value = page;

  const params = {
    page,
    per_page: perPage,
    user_id: selectedUser.value,
    search: search.value || undefined,
    action: type.value || undefined,
    ...overrideParams,
  };

  // Always include manual dates if present
  if (startDate.value) params.start_date = startDate.value;
  if (endDate.value) params.end_date = endDate.value;

  // Only apply quick filters if no custom dates are set
  if (!startDate.value && !endDate.value) {
    if (activeDateTab.value === "today") {
      const today = new Date().toISOString().substring(0, 10);
      params.today = today;  // FIXED
    }
    else if (activeDateTab.value === "thisWeek") {
      params.thisWeek = 1;
    }
    else if (activeDateTab.value === "thisMonth") {
      params.thisMonth = 1;
    }
  }

  // Cleanup undefined
  Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

  console.log("Fetching activities with params:", params); // Debug

  try {
    const res = await api().get("crm/activities", { params });
    activities.value = res.data;
  } catch (err) {
    console.error("Failed to fetch activities:", err);
  } finally {
    loading.value = false;
  }
};

// Quick date setter
const setQuickDate = (key) => {
  activeDateTab.value = key
  startDate.value = ''
  endDate.value = ''

  const tab = dateTabs.find(t => t.key === key)
  const routeSegment = tab.route ? `${tab.route}` : ''
  router.push(`/hr_management/activity/sales-person/${routeSegment}`).catch(() => {})

  const params = getDateParamsFromTab(key)
  fetchActivities(1, params)
}

// Unified date change handler
const onDateChange = () => {
  if (startDate.value || endDate.value) {
    activeDateTab.value = "custom";
  }
  fetchActivities(1);
};

// Utilities
const formatDate = (dt) => new Date(dt).toLocaleString();
const getBadgeClass = (action) => ({
  "bg-gradient-to-r from-blue-500 to-cyan-600": action === "viewed",
  "bg-gradient-to-r from-green-500 to-emerald-600": action === "created",
  "bg-gradient-to-r from-yellow-500 to-orange-600": action === "updated-field",
  "bg-gradient-to-r from-red-500 to-pink-600": action === "deleted",
  "bg-gradient-to-r from-purple-500 to-indigo-600": action === "login",
});
const getActionLabel = (action) => {
  const map = {
    viewed: "View",
    created: "Create",
    "updated-field": "Update",
    deleted: "Delete",
    login: "Login",
  };
  return map[action] || action || "Unknown";
};
const formatDetails = (details) => JSON.stringify(details, null, 2);

const getTabFromRoute = () => {
  if (route.path.includes('/today')) return 'today'
  if (route.path.includes('/thisWeek')) return 'week'
  if (route.path.includes('/thisMonth')) return 'month'
  return 'week'
}
watch(route, () => {
  const tab = getTabFromRoute()
  activeDateTab.value = tab
  const params = getDateParamsFromTab(tab)
  fetchActivities(1, params)
}, { immediate: true })

watch([search, type], () => fetchActivities(1))
watch([startDate, endDate], () => activeDateTab.value === 'custom' && fetchActivities(1))
// Watchers
watch(selectedRole, () => {
  selectedUser.value = "";
  usersOfRole.value = [];
  activities.value = null;
  loadUsersByRole();
});

watch(selectedUser, (newVal) => {
  if (newVal) {
    activities.value = null;
    fetchActivities(1);
  }
});
onMounted(() => {
  const tab = getTabFromRoute()
  activeDateTab.value = tab
  const params = getDateParamsFromTab(tab)
  fetchActivities(1, params)
})
// Enhanced helpers
const formatDateTime = (dt) => {
  return new Date(dt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const parsedDetails = (details) => {
  if (!details) return '—';

  let parsed;
  try {
    parsed = JSON.parse(details);
  } catch (e) {
    return details; // raw fallback
  }

  // 1. Plain string
  if (typeof parsed === 'string') return parsed;

  // 2. Wrapped message (most common)
  if (parsed.data || parsed.message || parsed.detail || parsed.description) {
    return parsed.data || parsed.message || parsed.detail || parsed.description;
  }

  // 3. Field Update Pattern (old → new)
  if (
    (parsed.old_value !== undefined && parsed.new_value !== undefined) ||
    parsed.field_id ||
    parsed.field_name ||
    Object.keys(parsed).some(k => k.includes('old') || k.includes('new') || k.includes('from') || k.includes('to'))
  ) {
    const field = parsed.field_name || parsed.field || `Field #${parsed.field_id || ''}`.trim() || 'Value';
    const oldVal = parsed.old_value ?? parsed.from_value ?? '—';
    const newVal = parsed.new_value ?? parsed.to_value ?? '—';

    if (oldVal === '—' && newVal !== '—') return `Set "${field}" to "${newVal}"`;
    if (oldVal !== '—' && newVal === '—') return `Cleared "${field}" (was "${oldVal}")`;
    return `Updated "${field}" from "${oldVal}" to "${newVal}"`;
  }

  // 4. Email-only or single key-value (like your new case)
  const keys = Object.keys(parsed);
  if (keys.length === 1) {
    const key = keys[0];
    const value = parsed[key];

    // Common meaningful single fields
    if (key === 'email') return `Logged in as ${value}`;
    if (key === 'ip') return `From IP: ${value}`;
    if (key === 'user_agent') return `Browser: ${simplifyUserAgent(value)}`;
    if (key === 'reason') return `Reason: ${value}`;
    if (key === 'module') return `Accessed: ${value}`;

    // Generic fallback
    return `${key.replace(/_/g, ' ')}: ${value}`;
  }

  // 5. Multiple fields — show most important ones
  if (keys.length <= 3) {
    const parts = keys.map(k => {
      const label = k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${label}: ${parsed[k]}`;
    });
    return parts.join(' • ');
  }

  // 6. Final fallback: pretty JSON
  return JSON.stringify(parsed, null, 2);
};

const getBrowserName = (ua) => {
  if (!ua) return 'Unknown';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  return 'Browser';
};

const isMobile = (ua) => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

const simplifyUserAgent = (ua) => {
  if (!ua) return '';
  return ua.split(' ').slice(0, 4).join(' ') + '...';
};

const getLocationFromIP = (ip) => {
  // Placeholder - you can integrate ip-api.com later
  return 'USA'; // or use a real geolocation service
};

// URL params support on mount
onMounted(() => {
  if (route.query.user_id) selectedUser.value = route.query.user_id;
  if (route.query.start_date) startDate.value = route.query.start_date;
  if (route.query.end_date) endDate.value = route.query.end_date;
  if (route.query.page) currentPage.value = Number(route.query.page);
  if (route.query.role) selectedRole.value = route.query.role;

  // Auto-load if user is pre-selected
  nextTick(() => {
    if (selectedRole.value && !usersOfRole.value.length) loadUsersByRole();
    if (selectedUser.value) fetchActivities(currentPage.value);
  });
});
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  25% { transform: translate(40px, -40px) scale(1.1); }
  50% { transform: translate(0px, 20px) scale(1.05); }
  75% { transform: translate(-40px, -20px) scale(1.1); }
}
.animate-blob { animation: blob 25s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
.animation-delay-6000 { animation-delay: 6s; }
.animation-delay-8000 { animation-delay: 8s; }
</style>
