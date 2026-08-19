<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-t-lg py-4 px-6 mb-6 shadow-md flex justify-between items-center">
      <h1 class="text-2xl font-bold">🎤 Ongoing Seminars</h1>
      <span class="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
        {{ filteredSeminars.length }} Active
      </span>
    </div>

    <!-- Search & Filter Section -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="relative flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title, speaker, or topic..."
            class="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
          <i class="fa fa-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3">
          <select
            v-model="selectedCategory"
            class="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none min-w-[150px]"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>

          <select
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none min-w-[150px]"
          >
            <option value="date_asc">Date: Earliest First</option>
            <option value="date_desc">Date: Latest First</option>
            <option value="title_asc">Title: A to Z</option>
            <option value="title_desc">Title: Z to A</option>
          </select>

          <button
            @click="resetFilters"
            class="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <i class="fa fa-refresh"></i>
            Reset
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
        <span class="text-sm text-gray-600 mr-2">Active filters:</span>
        <span v-if="searchQuery" class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          Search: "{{ searchQuery }}"
          <button @click="searchQuery = ''" class="hover:text-emerald-900">
            <i class="fa fa-times-circle"></i>
          </button>
        </span>
        <span v-if="selectedCategory" class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          Category: {{ selectedCategory }}
          <button @click="selectedCategory = ''" class="hover:text-emerald-900">
            <i class="fa fa-times-circle"></i>
          </button>
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
      <p class="mt-4 text-gray-600 text-lg">Loading seminars...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <i class="fa fa-exclamation-circle text-4xl text-red-500 mb-3"></i>
      <h3 class="text-lg font-semibold text-red-700 mb-2">Failed to Load Seminars</h3>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="fetchSeminars"
        class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2"
      >
        <i class="fa fa-refresh"></i>
        Try Again
      </button>
    </div>

    <!-- Seminars Grid -->
    <div v-else-if="filteredSeminars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="seminar in filteredSeminars"
        :key="seminar.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group"
      >
        <!-- Card Header with Status Badge -->
        <div class="relative h-40 bg-gradient-to-br from-emerald-600 to-emerald-400 p-4">
          <div class="absolute top-3 right-3">
            <span class="bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <i class="fa fa-play-circle text-xs"></i>
              {{ seminar.status }}
            </span>
          </div>
          <div class="absolute bottom-3 left-4 text-white">
            <p class="text-sm opacity-90">Starts in</p>
            <p class="text-2xl font-bold">{{ getDaysUntil(seminar.start_date) }} days</p>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-5">
          <h3 class="font-bold text-lg text-gray-800 mb-2 group-hover:text-emerald-600 transition line-clamp-2">
            {{ seminar.title }}
          </h3>

          <p class="text-sm text-gray-600 mb-3 flex items-center gap-2">
            <i class="fa fa-user text-emerald-500"></i>
            {{ seminar.speaker }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
              <i class="fa fa-tag mr-1"></i>{{ seminar.category }}
            </span>
            <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              <i class="fa fa-users mr-1"></i>{{ seminar.participants }} attending
            </span>
          </div>

          <!-- Date & Time -->
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa fa-calendar text-emerald-500 w-4"></i>
              <span>{{ formatDate(seminar.start_date) }} - {{ formatDate(seminar.end_date) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa fa-clock-o text-emerald-500 w-4"></i>
              <span>{{ seminar.time }}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fa fa-map-marker text-emerald-500 w-4"></i>
              <span>{{ seminar.location }}</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{{ seminar.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: seminar.progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              @click="viewDetails(seminar)"
              class="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium flex items-center justify-center gap-2"
            >
              <i class="fa fa-eye"></i>
              View Details
            </button>
            <button
              @click="joinSeminar(seminar)"
              class="flex-1 border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition text-sm font-medium flex items-center justify-center gap-2"
            >
              <i class="fa fa-video-camera"></i>
              Join Live
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
      <div class="text-gray-400 mb-4">
        <i class="fa fa-calendar-times-o text-6xl"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No Ongoing Seminars</h3>
      <p class="text-gray-500 mb-6">There are no ongoing seminars at the moment. Check back later!</p>
      <button
        @click="resetFilters"
        class="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition inline-flex items-center gap-2"
      >
        <i class="fa fa-refresh"></i>
        Clear Filters
      </button>
    </div>

    <!-- Seminar Details Modal -->
    <div
      v-if="selectedSeminar"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="selectedSeminar = null"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header with Gradient -->
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 rounded-t-xl">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold text-white mb-2">{{ selectedSeminar.title }}</h2>
              <div class="flex items-center gap-4 text-emerald-100">
                <span class="flex items-center gap-1">
                  <i class="fa fa-user"></i> {{ selectedSeminar.speaker }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="fa fa-tag"></i> {{ selectedSeminar.category }}
                </span>
              </div>
            </div>
            <button
              class="text-white hover:text-emerald-200 transition"
              @click="selectedSeminar = null"
            >
              <i class="fa fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Progress Section -->
          <div class="bg-emerald-50 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-emerald-800">Seminar Progress</span>
              <span class="text-emerald-700">{{ selectedSeminar.progress }}% Complete</span>
            </div>
            <div class="w-full bg-emerald-200 rounded-full h-3">
              <div
                class="bg-emerald-600 h-3 rounded-full transition-all"
                :style="{ width: selectedSeminar.progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 mb-1">📅 Date</p>
                <p class="font-medium">{{ formatDate(selectedSeminar.start_date) }} - {{ formatDate(selectedSeminar.end_date) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">⏰ Time</p>
                <p class="font-medium">{{ selectedSeminar.time }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">📍 Location</p>
                <p class="font-medium">{{ selectedSeminar.location }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 mb-1">👥 Participants</p>
                <p class="font-medium">{{ selectedSeminar.participants }} attending</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">🏷️ Category</p>
                <p class="font-medium">{{ selectedSeminar.category }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">📊 Status</p>
                <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  {{ selectedSeminar.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-2">About this Seminar</h3>
            <p class="text-gray-600 leading-relaxed">{{ selectedSeminar.description }}</p>
          </div>

          <!-- Speaker Info -->
          <div class="border-t border-gray-100 pt-6 mb-6">
            <h3 class="font-semibold text-gray-800 mb-3">About the Speaker</h3>
            <div class="flex items-start gap-4">
              <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <i class="fa fa-user-circle text-3xl text-emerald-600"></i>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ selectedSeminar.speaker }}</p>
                <p class="text-sm text-gray-500 mb-2">{{ selectedSeminar.speaker_title }}</p>
                <p class="text-sm text-gray-600">{{ selectedSeminar.speaker_bio }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="joinSeminar(selectedSeminar)"
              class="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <i class="fa fa-video-camera"></i>
              Join Seminar Now
            </button>
            <button
              @click="downloadMaterials(selectedSeminar)"
              class="flex-1 border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-semibold flex items-center justify-center gap-2"
            >
              <i class="fa fa-download"></i>
              Download Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import api from '@/config/api'

// State
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('date_asc')
const selectedSeminar = ref(null)
const loading = ref(true)
const error = ref(null)

// Data
const seminars = ref([])



// Fetch seminars on mount
onMounted(() => {
  fetchSeminars()
})

// Methods
const fetchSeminars = async () => {
  loading.value = true
  error.value = null

  try {
    // Fetch ongoing seminars from API
    // const response = await api().get('/training-offer?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution&status=2')
    const response = await api().get('/training-offer?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution&status=2')

    if (response.data.success) {
      // Transform API data to match our component structure
      seminars.value = response.data.data.map(transformSeminarData)
    } else {
      throw new Error('Failed to fetch seminars')
    }
  } catch (err) {
    console.error('Error fetching seminars:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load seminars'

    // For demo purposes, load mock data if API fails
    loadMockData()
  } finally {
    loading.value = false
  }
}

// Transform API data to component format
const transformSeminarData = (item) => {
  const course = item.event?.training_course || {}
  const software = course.software?.name || 'General'
  const industry = course.industry?.name || 'Technology'
  const solution = course.solution?.name || 'General'

  // Calculate progress based on dates (for ongoing seminars)
  const startDate = new Date(item.start_date)
  const endDate = new Date(item.end_date)
  const today = new Date()
  const totalDuration = endDate - startDate
  const elapsed = today - startDate
  const progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)))

  return {
    id: item.id,
    title: course.title || 'Untitled Seminar',
    speaker: `Trainer ID: ${item.event?.trainer_id || 'TBD'}`,
    speaker_title: 'Industry Expert',
    speaker_bio: 'Experienced professional in the field',
    category: industry,
    start_date: item.start_date,
    end_date: item.end_date,
    time: '10:00 AM - 12:00 PM', // You might want to extract this from your data
    location: item.location || 'Online',
    participants: Math.floor(Math.random() * 50) + 10, // Mock data
    progress: progress,
    status: item.status === '2' ? 'Ongoing' : 'Upcoming',
    description: course.description || `Join us for an in-depth seminar on ${course.title || 'industry topics'}. This session covers ${software} software applications in the ${industry} industry, focusing on ${solution} solutions.`,
    software: software,
    solution: solution,
    available_seats: item.available_seats,
    price: item.price
  }
}

// Mock data for development/fallback
const loadMockData = () => {
  seminars.value = [
    {
      id: 1,
      title: 'Modern AI and Future Workflows',
      speaker: 'Rasik Ahmed',
      speaker_title: 'AI Research Lead at TechCorp',
      speaker_bio: '10+ years experience in AI and machine learning, previously at Google AI.',
      category: 'Artificial Intelligence',
      start_date: '2025-03-18',
      end_date: '2025-03-20',
      time: '10:00 AM - 12:00 PM',
      location: 'Online (Zoom)',
      participants: 45,
      progress: 65,
      status: 'Ongoing',
      description: 'Exploring AI-based automations in modern workplaces and coding practices. This session covers practical applications of AI in software development.',
      software: 'TensorFlow',
      solution: 'Machine Learning'
    },
    {
      id: 2,
      title: 'Advanced Web Security Techniques',
      speaker: 'Nafis Hasan',
      speaker_title: 'Cybersecurity Expert',
      speaker_bio: 'Certified ethical hacker and security consultant.',
      category: 'Cybersecurity',
      start_date: '2025-03-19',
      end_date: '2025-03-21',
      time: '3:00 PM - 5:00 PM',
      location: 'Conference Room A',
      participants: 32,
      progress: 40,
      status: 'Ongoing',
      description: 'Learn how to secure your web apps with modern authentication and encryption strategies.',
      software: 'Security Tools',
      solution: 'Application Security'
    },
    {
      id: 3,
      title: 'Scaling Vue 3 Applications',
      speaker: 'Tariq Hossain',
      speaker_title: 'Senior Frontend Architect',
      speaker_bio: 'Core contributor to several open source Vue libraries.',
      category: 'Web Development',
      start_date: '2025-03-20',
      end_date: '2025-03-22',
      time: '11:00 AM - 1:00 PM',
      location: 'Online (Google Meet)',
      participants: 28,
      progress: 25,
      status: 'Ongoing',
      description: 'Tips and techniques for building scalable and maintainable Vue 3 applications.',
      software: 'Vue.js',
      solution: 'Frontend Development'
    }
  ]
}

// Computed properties
const categories = computed(() => {
  return [...new Set(seminars.value.map(s => s.category))]
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value
})

const filteredSeminars = computed(() => {
  let filtered = seminars.value.filter(seminar => {
    // Search filter
    const matchesSearch = searchQuery.value === '' ||
      seminar.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      seminar.speaker.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      seminar.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      seminar.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Category filter
    const matchesCategory = !selectedCategory.value ||
      seminar.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date_asc':
        return new Date(a.start_date) - new Date(b.start_date)
      case 'date_desc':
        return new Date(b.start_date) - new Date(a.start_date)
      case 'title_asc':
        return a.title.localeCompare(b.title)
      case 'title_desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return filtered
})

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getDaysUntil = (dateString) => {
  const targetDate = new Date(dateString)
  const today = new Date()
  const diffTime = targetDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'date_asc'
}

// Actions
const viewDetails = (seminar) => {
  selectedSeminar.value = seminar
}

const joinSeminar = (seminar) => {
  // Implement join logic
  console.log('Joining seminar:', seminar.id)
  alert(`Joining: ${seminar.title}\nMeeting link will be sent to your email.`)
}

const downloadMaterials = (seminar) => {
  // Implement download logic
  console.log('Downloading materials for:', seminar.id)
  alert('Seminar materials download started.')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Hover effects */
.group:hover .group-hover\:text-emerald-600 {
  color: #059669;
}

/* Transition for progress bar */
.transition-all {
  transition: all 0.3s ease;
}
</style>
