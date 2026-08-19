<template>
  <div
    class="w-full bg-gradient-to-br from-cyan-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 p-4 md:p-5 relative"
    style="
      min-height: 1315px;
      height: auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    ">
    <!-- Header -->
    <div class="mb-3 mt-20 flex-shrink-0">
      <h3 class="text-lg md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
        <svg class="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
          </path>
        </svg>
        Upcoming Training Courses
      </h3>
      <div class="h-1 w-20 bg-yellow-400 rounded-full"></div>
      <p class="text-white/70 text-xs mt-2">
        Next 6 months - Enroll in our curated training programs
      </p>
    </div>

    <!-- SCROLLABLE MONTHLY COURSES LIST -->
    <div ref="monthlyScrollRef" class="overflow-y-auto scroll-smooth custom-scrollbar flex-1 pr-1 monthly-scroll"
      style="max-height: calc(158vh - 140px)">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div v-for="n in 3" :key="'skeleton-' + n" class="bg-white/10 rounded-xl p-4 animate-pulse">
          <div class="h-5 w-24 bg-white/20 rounded mb-3"></div>
          <div class="space-y-3">
            <div class="h-20 bg-white/20 rounded-lg"></div>
            <div class="h-20 bg-white/20 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-10 bg-white/10 rounded-2xl backdrop-blur-sm">
        <svg class="w-12 h-12 mx-auto mb-3 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-white font-medium">Failed to load courses</p>
        <p class="text-white/60 text-xs mt-1">{{ error }}</p>
        <button @click="fetchMonthlyCourses"
          class="mt-3 px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition">
          Retry
        </button>
      </div>

      <!-- Courses Display - Monthly View with Alternating Backgrounds -->
      <div v-else>
        <div v-for="(monthGroup, idx) in monthlyCourses" :key="idx"
          class="month-card mb-6 rounded-2xl overflow-hidden" :class="getMonthBackgroundClass(idx)">
          <!-- Month Badge with matching background color -->
          <div class="flex items-center gap-2 mb-2 sticky top-0 py-1.5 px-3 shadow-md"
            :class="[getMonthBadgeClass(idx), idx === 0 ? 'rounded-t-2xl' : 'rounded-t-2xl']">
            <div class="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center">
              <span class="text-indigo-900 font-bold text-sm">{{
                monthGroup.month.slice(0, 1)
              }}</span>
            </div>
            <h4 class="font-bold text-white text-base tracking-wide">
              {{ monthGroup.month }} {{ monthGroup.year }}
            </h4>
            <span class="ml-auto text-xs bg-white/30 px-2 py-0.5 rounded-full text-white">
              {{ monthGroup.courses.length }} course{{ monthGroup.courses.length !== 1 ? 's' : '' }}
            </span>
          </div>

          <!-- Courses per month with alternating card backgrounds -->
          <div class="space-y-3 p-3 pt-2">
            <div v-for="course in monthGroup.courses" :key="course.id"
              class="group relative rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 border shadow-md hover:shadow-lg overflow-hidden"
              :class="getCourseCardBackground(idx)">
              <div class="relative p-3">
                <div class="flex justify-between items-start gap-2">
                  <div class="flex-1">
                    <h5
                      class="font-bold text-sm text-slate-800 dark:text-white line-clamp-2 flex items-start gap-1">
                      <span class="text-blue-500 text-xs">📘</span> {{ course.name }}
                    </h5>
                    <div class="flex flex-wrap gap-1 mt-1.5 mb-1.5">
                      <span
                        class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40">{{
                          course.duration || '2 days' }}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{{
                        course.level || 'Intermediate' }}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{{
                        course.format || 'Onsite' }}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700">{{
                        course.date || 'Onsite' }}</span>
                    </div>
                    <p class="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                      {{
                        course.short_description ||
                        course.description ||
                        'Comprehensive training for engineering excellence.'
                      }}
                    </p>
                    <div class="mt-2 flex items-center justify-between">
                      <span
                        class="text-[10px] font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">{{
                          course.software?.name || 'MSC Software' }}</span>
                      <button @click="openCourseEnrollModal(course)"
                        class="text-xs font-semibold bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition-all">
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && !error && monthlyCourses.length === 0"
        class="text-center py-10 text-white/70 bg-white/10 rounded-2xl">
        <p>No courses available</p>
      </div>
      <div class="h-2"></div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

// Assets for software logos (keep as they were)
import MSCNastranLogo from '@/assets/LOGO/MSCNastran.png'
import ActranLogo from '@/assets/LOGO/Actran.png'
import CradleCFDLogo from '@/assets/LOGO/Cradle CFD.png'
import MSCApexLogo from '@/assets/LOGO/MSC Apex.png'
import PatranLogo from '@/assets/LOGO/Patran.jpg'
import MSCOneLogo from '@/assets/LOGO/MSCOne.jpg'
import DytranLogo from '@/assets/LOGO/Dytran.png'
import MSCCoSimLogo from '@/assets/LOGO/cossim.jpeg'

import nastran from '@/assets/LOGO/cover/nastran.jpeg'
import actran from '@/assets/LOGO/cover/actran.jpg'
import cradleCFD from '@/assets/LOGO/cover/cradle.jpg'
import mscApex from '@/assets/LOGO/cover/apex.jpg'
import patran from '@/assets/LOGO/cover/patran.jpg'
import mscOne from '@/assets/LOGO/cover/mscone.jpg'
import dytran from '@/assets/LOGO/cover/dytran.jpg'
import mscCoSim from '@/assets/LOGO/cover/cosim.webp'

const router = useRouter()
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

// Software Logos Carousel (unchanged)
const softwareLogos = ref([
  { name: 'MSC Nastran', logo: MSCNastranLogo, cover: nastran, description: 'Advanced FEA Solver for Structural Analysis', analysis: 'Static Analysis' },
  { name: 'Actran', logo: ActranLogo, cover: actran, description: 'Premium Acoustics & Vibration Simulation', analysis: 'Acoustic Analysis' },
  { name: 'Cradle CFD', logo: CradleCFDLogo, cover: cradleCFD, description: 'Computational Fluid Dynamics Solutions', analysis: 'CFD Analysis' },
  { name: 'MSC Apex', logo: MSCApexLogo, cover: mscApex, description: 'Direct Modeling & Generative Design', analysis: 'Generative Design' },
  { name: 'Patran', logo: PatranLogo, cover: patran, description: 'Comprehensive Pre/Post Processing', analysis: 'Pre/Post Processing' },
  { name: 'MSC One', logo: MSCOneLogo, cover: mscOne, description: 'Integrated Multidiscipline Platform', analysis: 'Multidisciplinary Analysis' },
  { name: 'Dytran', logo: DytranLogo, cover: dytran, description: 'Transient & Impact Analysis', analysis: 'Transient Analysis' },
  { name: 'MSC CoSim', logo: MSCCoSimLogo, cover: mscCoSim, description: 'Advanced Co-Simulation Technology', analysis: 'Co-Simulation' }
])

const currentLogoIndex = ref(0)
let logoInterval = null

const nextSoftwareLogo = () => {
  currentLogoIndex.value = (currentLogoIndex.value + 1) % softwareLogos.value.length
}

const goToSoftwareLogo = (index) => {
  currentLogoIndex.value = index
  if (logoInterval) {
    clearInterval(logoInterval)
    logoInterval = setInterval(nextSoftwareLogo, 95000)
  }
}

// Helper functions for month styling (unchanged)
const getMonthBackgroundClass = (index) => {
  const backgrounds = [
    'bg-gradient-to-br from-amber-300 to-orange-400 border border-amber-400',
    'bg-gradient-to-br from-emerald-300 to-teal-400 border border-emerald-400',
    'bg-gradient-to-br from-blue-300 to-indigo-400 border border-blue-400',
    'bg-gradient-to-br from-purple-300 to-pink-400 border border-purple-400',
    'bg-gradient-to-br from-rose-300 to-red-400 border border-rose-400',
    'bg-gradient-to-br from-cyan-300 to-sky-400 border border-cyan-400'
  ]
  return backgrounds[index % backgrounds.length] || 'bg-white/5'
}

const getMonthBadgeClass = (index) => {
  const badgeBackgrounds = [
    'bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-sm',
    'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-sm',
    'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm',
    'bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm',
    'bg-gradient-to-r from-rose-600/90 to-red-600/90 backdrop-blur-sm',
    'bg-gradient-to-r from-cyan-600/90 to-sky-600/90 backdrop-blur-sm'
  ]
  return badgeBackgrounds[index % badgeBackgrounds.length] || 'bg-gradient-to-r from-indigo-700/90 to-cyan-700/90 backdrop-blur-sm'
}

const getCourseCardBackground = (index) => {
  const cardBackgrounds = [
    'bg-white/95 dark:bg-gray-800/95 border-amber-200/50',
    'bg-white/95 dark:bg-gray-800/95 border-emerald-200/50',
    'bg-white/95 dark:bg-gray-800/95 border-blue-200/50',
    'bg-white/95 dark:bg-gray-800/95 border-purple-200/50',
    'bg-white/95 dark:bg-gray-800/95 border-rose-200/50',
    'bg-white/95 dark:bg-gray-800/95 border-cyan-200/50'
  ]
  return cardBackgrounds[index % cardBackgrounds.length] || 'bg-white/95'
}

// Data state
const monthlyCourses = ref([])
const loading = ref(true)
const error = ref(null)
const monthlyScrollRef = ref(null)

// New API call
const fetchMonthlyCourses = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await api().get('/public/training-course-schedules/monthly/available-courses')

    if (response.data?.success && response.data?.data?.groups) {
      const groups = response.data.data.groups

      monthlyCourses.value = groups.map(group => {
        const mappedCourses = (group.courses || []).map(course => {
          const details = course.course_details || {}

          return {
            id: details.id || course.course_id,
            name: details.name || course.course_name,
            short_description: details.short_description || '',
            description: details.long_description || details.short_description,
            duration: details.duration || '2 days',
            level: details.level || 'Intermediate',
            format: details.type === 'online' ? 'Online' : 'Onsite',
            type: details.type || 'onsite',
            software: details.software ? { name: details.software.name } : { name: 'MSC Software' },
            schedules: course.schedules || [],
            total_available_seats: course.total_available_seats,
            date: course.schedules[0]?.date || ''
          }
        })

        return {
          month: group.month_name,
          year: group.year,
          courses: mappedCourses
        }
      }).slice(0, 1) // Only take the first object
    } else {
      monthlyCourses.value = []
      error.value = 'Invalid response format from server'
    }
  } catch (err) {
    console.error('Failed to fetch monthly courses:', err)
    error.value = err.message || 'Network error while loading courses'
    monthlyCourses.value = []
  } finally {
    loading.value = false
  }
}

// Enrollment logic (unchanged)
const openCourseEnrollModal = (course) => {
  if (!isLoggedIn.value) {
    promptRegisterThenRedirect(course)
    return
  }
  if (!course) {
    router.push({
      name: 'msc_software_training-solution-enrollment',

    })
  } else {
    router.push({
      name: 'msc_software_training-solution-enrollment',
      query: {
        courseId: course.id
      }
    })
  }
}

const promptRegisterThenRedirect = (course) => {
  Swal.fire({
    title: 'You need to login to enroll',
    text: 'You will be redirected to the login page automatically. If you do not have an account, you can create one by clicking "Open a New Account".',
    icon: 'info',
    confirmButtonText: 'Go to Login',
    denyButtonText: 'Open a New Account',
    showDenyButton: true,
    denyButtonColor: '#10B981',
    allowOutsideClick: false,
    allowEscapeKey: true,
    showCloseButton: true,
    timer: 12000,
    timerProgressBar: true,
    // footer: "Don't have an account?"
  }).then((result) => {
   if(course){
     if (result.isConfirmed) {
      router.push('/login?role=user&page=trainingEnroll&course_id=' + course.id)
    } else if (result.isDenied) {
      router.push('/register?page=trainingEnroll&course_id=' + course.id)
    } else if (result.dismiss === Swal.DismissReason.timer) {
      router.push('/login?role=user&page=trainingEnroll&course_id=' + course.id)
    }
   } else{
     if (result.isConfirmed) {
      router.push('/login?role=user&page=trainingEnroll')
    } else if (result.isDenied) {
      router.push('/register?page=trainingEnroll')
    } else if (result.dismiss === Swal.DismissReason.timer) {
      router.push('/login?role=user&page=trainingEnroll')
    }
   }
  })
}

const handleCourseClick = (course) => {
  console.log('[Router] Course detail clicked:', course.name, course.id)
  alert(`✨ Course detail: ${course.name}\nRedirect logic ready.`)
}

// Lifecycle hooks
onMounted(() => {
  logoInterval = setInterval(nextSoftwareLogo, 12000)
  fetchMonthlyCourses()
})

onUnmounted(() => {
  if (logoInterval) clearInterval(logoInterval)
})
</script>

<style scoped>
/* All original styles remain unchanged */
.animate-fadeInUp {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(28px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}

.month-card {
  animation: fadeSlideUp 0.4s ease-out forwards;
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.monthly-scroll::-webkit-scrollbar {
  width: 5px;
}

.monthly-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.monthly-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}

.advert-blink {
  animation: advert-blink 1.25s ease-in-out infinite;
}

@keyframes advert-blink {
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 0 14px rgba(36, 68, 251, 0.55), inset 0 0 0 rgba(255, 255, 255, 0);
  }
  40% {
    transform: translateY(-0.5px);
    box-shadow: 0 0 24px rgba(251, 191, 36, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.35);
  }
  70% {
    transform: translateY(0);
    box-shadow: 0 0 10px rgba(176, 251, 36, 0.65), inset 0 0 0 rgba(255, 255, 255, 0);
  }
}

@media (max-width: 768px) {
  .monthly-scroll {
    max-height: 450px !important;
  }
}

.month-card {
  transition: all 0.3s ease;
}

.month-card:hover {
  transform: translateX(4px);
}

.month-card>div:first-child {
  position: relative;
  z-index: 2;
}

.month-card .rounded-xl {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.month-card .rounded-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>