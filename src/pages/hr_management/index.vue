  <template>
    <div class="w-11/12 mx-auto">
      <!-- HEADER -->
      <div class="mb-10">
        <!-- Option 1: Soft Teal Gradient (Eye-Soothing) -->
      <div
        class="m-4 px-8 pt-12 pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6
              bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900
              rounded-3xl text-white shadow-xl relative overflow-hidden
              border border-white/10"
      >
          <!-- Glow Effects -->
          <div class="absolute top-0 left-0 w-64 h-64 bg-teal-300/30 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full translate-x-1/3 translate-y-1/3"></div>

          <!-- Animated Waves -->
          <div class="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <div class="absolute -bottom-2 w-full h-12 bg-white/10 backdrop-blur-sm rounded-t-[100%]"></div>
          </div>

          <div class="relative z-10 flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold tracking-tight drop-shadow">
                {{ props.activeTab }} Dashboard
              </h1>
            </div>

          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="px-4 md:px-10 pb-14">

        <!-- SECTION TITLE - Centered & Redesigned -->
      <div class="relative mb-12 text-center">
        <!-- Decorative line -->
        <div class="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-y-1/2"></div>

        <div class="relative inline-flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
          <!-- Icon Container -->
          <div class="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          <!-- Title -->
          <div class="text-left">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              All Roles Overview
            </h2>
            <p class="text-sm text-gray-500 mt-1">Team composition and distribution analysis</p>
          </div>
        </div>
      </div>

              <!-- GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <template v-for="group in groupedRoles" :key="group.key">
          <div class="relative group rounded-3xl overflow-hidden cursor-pointer
                      transition-all duration-500 ease-out
                      hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              :style="{ backgroundImage: group.gradient }">
            <div class="px-7 py-9 relative z-10 h-full
                        flex flex-col justify-between
                        bg-gradient-to-b from-white/10 via-white/5 to-black/20
                        backdrop-blur-md">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[11px] font-semibold tracking-wider uppercase text-white/70">
                    {{ group.label }}
                  </p>
                  <p class="text-5xl font-extrabold mt-1 text-white drop-shadow-lg">
                    <count-up :end-val="group.total" />
                  </p>
                </div>
              </div>
            </div>
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 blur-xl transition-all"></div>
          </div>
        </template>
        </div>

      </div>
    </div>
  </template>
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useAuthStore } from '/src/stores/AuthStore'
  import CountUp from 'vue-countup-v3'
  import { useHRM } from "@/composables/useHRM.js";

  const { hrmApi, user, token, loading, logout } = useHRM();
  const store = useAuthStore()
  const props = defineProps({ activeTab: String })
  defineEmits(['setTab'])
  const employees = ref()
  const dbStats = ref(null)

// Base gradient palette
const gradientPalette = [
  'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)', // deep ocean blue
  'linear-gradient(135deg, #2B0F3F 0%, #4A1C5B 50%, #6A2F74 100%)', // royal purple
  'linear-gradient(135deg, #1B2A49 0%, #3D5A99 50%, #6B8FD8 100%)', // sapphire blue
  'linear-gradient(135deg, #7B3F00 0%, #C76A1B 50%, #FF9A3C 100%)', // warm orange
  'linear-gradient(135deg, #1A2E0A 0%, #3C5C14 50%, #6FA42A 100%)', // olive green
  'linear-gradient(135deg, #3B0A0A 0%, #7B1E1E 50%, #B83232 100%)', // luxury red
  'linear-gradient(135deg, #003C2F 0%, #01634B 50%, #01A679 100%)', // emerald green
  'linear-gradient(135deg, #4A2C2A 0%, #8B4F48 50%, #C97A6A 100%)', // clay orange
  'linear-gradient(135deg, #0A2F2F 0%, #145454 50%, #1F7F7F 100%)', // deep teal
  'linear-gradient(135deg, #1A0B2E 0%, #3F1A63 50%, #5E2CA5 100%)', // violet
  'linear-gradient(135deg, #2E1A47 0%, #5C297C 50%, #8149A8 100%)', // royal purple 2
  'linear-gradient(135deg, #003366 0%, #336699 50%, #6699CC 100%)', // soft blue
  'linear-gradient(135deg, #660033 0%, #993366 50%, #CC6699 100%)', // magenta gradient
  'linear-gradient(135deg, #004400 0%, #228833 50%, #66BB66 100%)', // leafy green
  'linear-gradient(135deg, #663300 0%, #996633 50%, #CC9966 100%)', // brown-beige
  'linear-gradient(135deg, #330033 0%, #663366 50%, #996699 100%)', // deep mauve
  'linear-gradient(135deg, #003333 0%, #336666 50%, #669999 100%)', // ocean teal
  'linear-gradient(135deg, #660000 0%, #993333 50%, #CC6666 100%)', // deep red
];

const getGradient = (key) => gradients[key] || gradients.user

// Role Grouping Logic
const groupedRoles = computed(() => {
  if (!dbStats.value?.data) return []

  const map = {}
  const data = dbStats.value.data

  // Used to assign gradients dynamically
  let paletteIndex = 0

  data.forEach(item => {
    if (!item.role) return

    const role = item.role.toLowerCase()

    // Skip CEO
    if (role === 'ceo') return

    // Group key: take first part of role (e.g., 'hr-executive' → 'hr')
    let groupKey = role.split('-')[0]
    let label = groupKey.charAt(0).toUpperCase() + groupKey.slice(1) + ' Team'

    // Assign gradient
    const gradient = gradientPalette[paletteIndex % gradientPalette.length]
    paletteIndex++

    if (!map[groupKey]) {
      map[groupKey] = {
        key: groupKey,
        label,
        total: 0,
        roles: [],
        gradient,
      }
    }

    map[groupKey].total += parseInt(item.total)
    map[groupKey].roles.push(item)
  })

  return Object.values(map).sort((a, b) => b.total - a.total)
})

  const totalUsers = computed(() => {
    const item = dbStats.value?.data?.find(i => i.role === null)
    return item ? parseInt(item.total) : 0
  })

  const formatRoleName = (role) => {
    return role
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const fetchDbStats = async () => {
    try {
      const { data } = await api().get('users/role-count')
      dbStats.value = data
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }
  async function fetchEmployees() {
    try {
      const res = await hrmApi.get("/employee");
      employees.value = res.data;
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  }
  onMounted(()=>{
    fetchEmployees()
    fetchDbStats()
  }
    )
  </script>

  <style scoped>
  button { @apply font-semibold transition-all duration-300; }
  </style>
