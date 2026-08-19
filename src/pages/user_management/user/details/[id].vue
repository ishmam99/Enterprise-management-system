<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
    <div class="max-w-7xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease]">
    <div class="flex w-full justify-end items-center gap-10">
            <h1 class="text-3xl text-white font-bold w-full border-b-4 border-b-blue-500 bg-fuchsia-500 text-center rounded-md px-10 py-3">
              <i class="ri-user-line p-2 bg-blue-500 rounded-full"></i>
              User Details</h1>
            <button @click="$router.back" class="btn btn-error text-white"><i class="ri-arrow-left-line"></i> Back</button>
        </div>

      <!-- Header -->
      <div class="bg-white rounded-2xl justify-between items-center shadow-xl p-8 border-l-8 border-indigo-500 flex flex-col md:flex-row items-center gap-8">
  <div class="min-w-72">


          <h1 class="text-3xl flex items-center gap-2 font-bold text-gray-800">
           <img :src="`https://ui-avatars.com/api/?name=${userData?.user?.name}&background=6366F1&color=fff`" class="w-24 h-24 rounded-full shadow-lg ring-4 ring-indigo-300" />
  {{ userData?.user?.name ?? userData?.username ?? userData?.first_name+' '+userData?.last_name ??'—' }}
          </h1>
          <p class="text-gray-600 text-lg">
            {{ roleLabel }} • {{ customerLabel }}
          </p>
          <p class="text-gray-500 text-sm mt-1">{{ industryLabel }}</p>
          <p class="text-gray-500 text-sm">
            {{ userData?.user?.email ?? '—' }}
            <span v-if="userData?.user?.phone"> | {{ userData.user.phone }}</span>
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-4 w-full">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
            <p class="text-sm opacity-80">Softwares</p>
            <p class="text-3xl font-bold mt-1">{{ softwaresCount }}</p>
          </div>
          <div class="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
            <p class="text-sm opacity-80">Software Levels</p>
            <p class="text-3xl font-bold mt-1">{{ softwareLevelsCount }}</p>
          </div>
          <div class="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <p class="text-sm opacity-80">High / Advance</p>
            <p class="text-3xl font-bold mt-1">{{ highCount }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg">
            <p class="text-sm opacity-80">Trainings</p>
            <p class="text-3xl font-bold mt-1">—</p>
          </div>
          <div class="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg">
            <p class="text-sm opacity-80">Status</p>
            <p class="text-3xl font-bold mt-1" :class="userData?.status === '1' ? 'text-white' : 'text-gray-100'">
              {{ userData?.status === '1' ? 'Active' : 'Inactive' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column -->
        <div class="space-y-6">
          <!-- Personal info -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-indigo-500">
            <h2 class="text-xl font-semibold text-indigo-800">User Information</h2>
            <div class="mt-4 text-gray-700 text-sm space-y-2">
              <p><span class="font-bold">User ID:</span> {{ userData?.id ?? '—' }}</p>
              <p><span class="font-bold">Username:</span> {{ userData?.username ?? '—' }}</p>
              <p><span class="font-bold">Customer ID:</span> {{ userData?.customer_id ?? '—' }}</p>
              <p><span class="font-bold">Industry ID:</span> {{ userData?.industry_id ?? '—' }}</p>
            </div>
          </div>

          <!-- Enrolled trainings (placeholder - user will provide later) -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-green-500">
            <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
              <i class="ri-graduation-cap-line text-2xl"></i> Enrolled Trainings
            </h2>
            <div class="mt-4 text-gray-800 text-sm">
              <p class="italic text-gray-500">Trainings will be shown here once the trainings endpoint is added.</p>
            </div>
          </div>
        </div>

        <!-- Right column (main details) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Selected Softwares list -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-blue-800 flex items-center gap-2">
                <i class="ri-macbook-line text-2xl"></i> Selected Softwares
              </h2>
              <div class="text-sm text-gray-500">{{ softwaresCount }} softwares</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              <div
                v-for="sw in softwaresMerged"
                :key="sw.id"
                class="p-3 bg-slate-50 rounded-lg border flex flex-col gap-2 hover:shadow transition"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="text-sm font-medium text-gray-800">{{ sw.name }}</div>
                    <div class="text-xs text-gray-500">Added: {{ moment(sw.created_at).format('dd/mm/yyyy') }}</div>
                  </div>

                  <div class="text-right">
                    <div class="text-xs text-gray-500">Level</div>
                    <div class="font-semibold text-sm" :class="levelColorClass(sw.level)">
                      {{ sw.levelDisplay }}
                    </div>
                  </div>
                </div>

                <div class="mt-2 text-xs text-gray-600">
                  <!-- pivot.level vs softwareLevels -->
                  <div v-if="sw.pivot && sw.pivot.level">
                    Pivot level: <span class="font-medium">{{ sw.pivot.level }}</span>
                  </div>
                  <div v-else-if="sw.level">
                    Level: <span class="font-medium">{{ sw.level }}</span>
                  </div>
                  <div v-else class="italic text-gray-400">Knowledge level not set</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Knowledge Levels bar view -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-yellow-500">
            <h2 class="text-xl font-semibold text-yellow-800 flex items-center gap-2">
              <i class="ri-bar-chart-fill text-2xl"></i> Knowledge Levels
            </h2>
            <div class="mt-4 space-y-4">
              <div v-for="row in softwaresMerged" :key="'bar-'+row.id">
                <div class="flex justify-between items-center">
                  <div class="text-sm font-medium text-gray-800">{{ row.name }}</div>
                  <div class="text-xs text-gray-500 ml-4">{{ row.levelDisplay }}</div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                  <div
                    class="h-3 rounded-full transition-all"
                    :style="{ width: levelPercent(row.level) }"
                    :class="levelColorBar(row.level)"
                  ></div>
                </div>
              </div>

              <div v-if="softwaresMerged.length === 0" class="italic text-gray-500">No software data to display.</div>
            </div>
          </div>

          <!-- Software Skills table (built from softwareLevels) -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-teal-500">
            <h2 class="text-xl font-semibold text-teal-800 flex items-center gap-2">
              <i class="ri-tools-line text-2xl"></i> Software Skills
            </h2>

            <table class="w-full mt-4 text-sm border-collapse">
              <thead>
                <tr class="bg-teal-100 text-teal-900 font-medium">
                  <th class="p-3 border">Software</th>
                  <th class="p-3 border">Knowledge Level</th>
                  <th class="p-3 border">Skill Codes (example)</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="sw in softwareLevelsMapped" :key="'skill-'+sw.software.id" class="hover:bg-gray-50">
                  <td class="p-3 border font-medium text-gray-800">{{ sw.software.name }}</td>
                  <td class="p-3 border">
                    <span :class="levelBadgeClass(sw.level)">{{ sw.level ?? 'Not Set' }}</span>
                  </td>
                  <td class="p-3 border text-gray-700">
                    <!-- API does not include actual skill codes — fallback example or empty -->
                    <div v-if="sw.software.skills && sw.software.skills.length">
                      <span
                        v-for="s in sw.software.skills"
                        :key="s"
                        class="inline-block px-3 py-1 mr-2 mb-1 rounded bg-teal-50 text-teal-700 text-xs"
                      >
                        {{ s }}
                      </span>
                    </div>
                    <div v-else class="italic text-gray-400">No skill codes (add later)</div>
                  </td>
                </tr>

                <tr v-if="softwareLevelsMapped.length === 0">
                  <td class="p-3 border text-gray-500 italic" colspan="3">No software levels assigned.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Training Sessions (placeholder if you add later) -->
          <div class="p-6 bg-white rounded-2xl shadow-xl border-l-4 border-indigo-500">
            <h2 class="text-xl font-semibold text-indigo-800 flex items-center gap-2">
              <i class="ri-calendar-line text-2xl"></i> Training Sessions
            </h2>

            <div class="mt-4 text-sm text-gray-600">
              <p class="italic text-gray-500">Training sessions will appear here when the endpoint or data is provided.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-center text-gray-500">Loading user data…</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userData = ref(null)
const loading = ref(false)
const error = ref(null)

// use uploaded avatar as fallback (developer provided local path)
const defaultAvatar = '/mnt/data/1a4c38e3-14ef-4f18-b5b0-4f2313cbb522.png'
const avatarSrc = computed(() => {
  // if your API returns image/icon use it, otherwise fallback to uploaded image
  return userData.value?.user?.avatar || defaultAvatar
})

// Fetch function
const getUser = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api().get(`end-users/${route.params.id}`)
    // your api helper likely returns { data: { data: <payload> } } — adjust if different
    userData.value = res.data?.data ?? res.data
  } catch (err) {
    error.value = err?.response?.data?.message || err.message || 'Failed to load user'
  } finally {
    loading.value = false
  }
}

// Basic labels / fallbacks
const roleLabel = computed(() => userData.value?.role ?? 'End User')
const customerLabel = computed(() => (userData.value?.customer_name ?? `Customer #${userData.value?.customer_id ?? '—'}`))
const industryLabel = computed(() => (userData.value?.industry_name ?? (userData.value?.industry_id ? `Industry #${userData.value.industry_id}` : 'Industry not set')))
const industryPresent = computed(() => !!userData.value?.industry_name)

// Counts
const softwaresCount = computed(() => (userData.value?.softwares?.length ?? 0))
const softwareLevelsCount = computed(() => (userData.value?.softwareLevels?.length ?? 0))
const highCount = computed(() => {
  const arr = userData.value?.softwareLevels ?? []
  return arr.filter(s => s.level === 'high' || s.level === 'advance').length
})

// Merge softwares + softwareLevels: pick level from pivot -> softwareLevels -> fallback
const softwaresMerged = computed(() => {
  const softwares = userData.value?.softwares ?? []
  const levels = userData.value?.softwareLevels ?? []

  // map levels by software_id for quick lookup
  const levelMap = new Map()
  for (const lv of levels) {
    levelMap.set(String(lv.software_id ?? lv.software?.id), lv.level ?? null)
  }

  return softwares.map(s => {
    const idKey = String(s.id)
    const levelFromPivot = s.pivot?.level ?? null
    const levelFromLevels = levelMap.get(idKey) ?? null
    const finalLevel = levelFromPivot ?? levelFromLevels ?? null

    return {
      ...s,
      level: finalLevel,
      levelDisplay: (finalLevel === null || finalLevel === undefined) ? 'Not Set' : String(finalLevel).toUpperCase()
    }
  })
})

// Map softwareLevels for the skills table (keeps software object nested)
const softwareLevelsMapped = computed(() => {
  return (userData.value?.softwareLevels ?? []).map(sl => {
    // ensure software object exists
    const softwareObj = sl.software ?? userData.value?.softwares?.find(s => String(s.id) === String(sl.software_id)) ?? { id: sl.software_id, name: 'Unknown' }
    // keep expected shape software.skills (not provided by API) — placeholder empty array
    return {
      ...sl,
      software: {
        ...softwareObj,
        skills: softwareObj.skills ?? [] // if you add skills later to API, they'll appear here
      }
    }
  })
})

// helper: convert level to percent for bars
const levelPercent = (level) => {
  if (!level) return '6%'
  const map = { 'low': '25%', 'medium': '60%', 'high': '85%', 'advance': '90%' }
  return map[String(level).toLowerCase()] ?? '50%'
}

// badge classes
const levelBadgeClass = (level) => {
  const l = String(level ?? '').toLowerCase()
  if (l === 'high') return 'inline-block px-3 py-1 rounded-full bg-green-100 text-green-700'
  if (l === 'advance') return 'inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700'
  if (l === 'medium') return 'inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700'
  if (!level) return 'inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600'
  return 'inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700'
}
const levelColorBar = (level) => {
  const l = String(level ?? '').toLowerCase()
  if (l === 'high') return 'bg-green-500'
  if (l === 'advance') return 'bg-indigo-500'
  if (l === 'medium') return 'bg-yellow-400'
  return 'bg-gray-400'
}
const levelColorClass = (level) => {
  const l = String(level ?? '').toLowerCase()
  if (l === 'high') return 'text-green-700'
  if (l === 'advance') return 'text-indigo-700'
  if (l === 'medium') return 'text-yellow-600'
  if (!level) return 'text-gray-400'
  return 'text-gray-700'
}

onMounted(() => {
  getUser()
})
</script>

<style scoped>
/* tiny polished animation for entrance */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-\[fadeIn_0\.5s_ease\] {
  animation: fadeIn 0.5s ease;
}
</style>
