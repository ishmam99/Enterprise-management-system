<template>
  <div class="p-6 bg-gray-50 min-h-screen w-full">
    <!-- Header Section with Type Badge -->
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-2">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isUpcoming ? 'Upcoming' : 'Completed' }} Training Schedules
        </h2>
        <div :class="[
          'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold',
          route.params.id === 'group' ? 'bg-purple-100 text-purple-700' : '',
          route.params.id === 'company' ? 'bg-pink-100 text-pink-700' : '',
          route.params.id === 'individual' ? 'bg-blue-100 text-blue-700' : ''
        ]">
          <i>{{ getTypeIcon() }}</i>
          {{ getTypeLabel() }}
        </div>
      </div>
      <p class="text-sm text-gray-600">
        {{ isUpcoming ? 'List of all upcoming training schedules' : 'List of all completed training schedules' }}
      </p>
    </div>

    <!-- Filters Panel -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-6 rounded-full bg-teal-500"></div>
        <h2 class="font-semibold text-gray-700 text-sm uppercase tracking-wider">Filter Schedules</h2>
        <button @click="resetFilters" class="ml-auto text-xs text-teal-600 hover:text-teal-800 font-medium border border-teal-200 hover:border-teal-400 px-3 py-1 rounded-full transition-all">
          ↺ Reset All
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <!-- Search -->
        <div class="relative lg:col-span-2">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="filters.search" type="text" placeholder="Search course name, code, software, solution..." class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-gray-50" />
        </div>

        <!-- Solution Filter -->
        <select v-model="filters.solution_id" class="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-gray-700">
          <option value="">All Solutions</option>
          <option v-for="sol in solutions" :key="sol.id" :value="sol.id">{{ sol.name }}</option>
        </select>

        <!-- Software Filter -->
        <select v-model="filters.software_id" class="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-gray-700">
          <option value="">All Software</option>
          <option v-for="sw in softwares" :key="sw.id" :value="sw.id">{{ sw.name }}</option>
        </select>

        <!-- Analysis Filter -->
        <select v-model="filters.analysis" class="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-gray-700">
          <option value="">All Analysis Types</option>
          <option v-for="a in analysisTypeList" :key="a.id" :value="a.name">{{ a.icon }} {{ a.name }}</option>
        </select>

        <!-- Course Filter -->
        <select v-model="filters.course_id" class="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700">
          <option value="">All Courses</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <!-- Active filter chips -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
        <span class="text-xs text-gray-500 self-center">Active:</span>
        <span v-if="filters.search" class="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium border border-teal-200">
          🔍 "{{ filters.search }}" <button @click="filters.search=''" class="ml-1 hover:text-teal-900">×</button>
        </span>
        <span v-if="filters.solution_id" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
          Solution: {{ getSolutionName(filters.solution_id) }} <button @click="filters.solution_id=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.software_id" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
          Software: {{ getSoftwareName(filters.software_id) }} <button @click="filters.software_id=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.analysis" class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
          Analysis: {{ filters.analysis }} <button @click="filters.analysis=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.course_id" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
          Course: {{ courses.find(c=>c.id==filters.course_id)?.name }} <button @click="filters.course_id=''" class="ml-1">×</button>
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600">Loading schedules...</p>
    </div>

    <!-- Table Section -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="filteredSchedules.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">{{ isUpcoming ? '📅' : '✅' }}</div>
        <p class="text-gray-600">No {{ isUpcoming ? 'upcoming' : 'completed' }} schedules found for {{ getTypeLabel() }}</p>
        <button @click="resetFilters" class="mt-4 text-teal-600 text-sm font-medium hover:underline">Clear all filters</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 table-zebra">
          <thead class="bg-blue-50">
            <tr>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Training Type</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Available Seats</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
              <th class="px-6 py-3 text-left border-e border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="schedule in filteredSchedules" :key="schedule.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 border-e border-gray-200/70 whitespace-nowrap">
                <span class="text-sm font-semibold text-blue-600">#{{ schedule.id }}</span>
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70 capitalize">
                <span class="inline-flex items-center gap-1">
                  {{ schedule.training_type === 'group' ? '👥 Group' : schedule.training_type === 'company' ? '🏢 Company' : '👤 Individual' }}
                </span>
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70 whitespace-nowrap">
                {{ formatDate(schedule.date) }}
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70">
                <span class="inline-flex items-center gap-1">
                  💺 {{ schedule.available_seats }}
                </span>
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div class="font-medium text-gray-900">{{ schedule.training_course?.name || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70">
                <span class="text-xs font-mono">{{ schedule.training_course?.code || 'N/A' }}</span>
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70">
                {{ schedule.training_course?.software?.name || '—' }}
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70">
                {{ schedule.training_course?.solution?.name || '—' }}
              </td>
              <td class="px-6 py-4 border-e border-gray-200/70 max-w-xs truncate">
                <span class="text-sm text-gray-600 line-clamp-2">{{ schedule.training_course?.short_description || '—' }}</span>
              </td>
              <td class=" px-1 py-4 whitespace-nowrap">
                <button @click="viewDetails(schedule)" class=" p-1 text-sm bg-blue-50 rounded-lg text-blue-600 rounded hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="View Details">
                  👁️ View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="text-sm text-gray-500">
          Showing {{ (currentPage - 1) * perPage + 1 }}–{{ Math.min(currentPage * perPage, totalItems) }} of {{ totalItems }} schedules
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">‹ Prev</button>
          <button v-for="p in visiblePages" :key="p" class="join-item btn btn-sm" :class="p === currentPage ? 'btn-active bg-blue-600 text-white border-blue-600' : ''" @click="changePage(p)">{{ p }}</button>
          <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next ›</button>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="selectedSchedule" class="modal modal-open">
      <div class="modal-box max-w-2xl p-0 overflow-hidden">
        <div class="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
          <h3 class="text-lg font-bold">Schedule Details</h3>
          <button @click="selectedSchedule = null" class="text-white/80 hover:text-white text-xl font-bold">×</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div><span class="font-semibold">ID:</span> {{ selectedSchedule.id }}</div>
            <div><span class="font-semibold">Training Type:</span> {{ selectedSchedule.training_type }}</div>
            <div><span class="font-semibold">Date:</span> {{ formatDate(selectedSchedule.date) }}</div>
            <div><span class="font-semibold">Available Seats:</span> {{ selectedSchedule.available_seats }}</div>
            <div class="col-span-2"><span class="font-semibold">Course:</span> {{ selectedSchedule.training_course?.name }} ({{ selectedSchedule.training_course?.code }})</div>
            <div><span class="font-semibold">Software:</span> {{ selectedSchedule.training_course?.software?.name || '—' }}</div>
            <div><span class="font-semibold">Solution:</span> {{ selectedSchedule.training_course?.solution?.name || '—' }}</div>
            <div class="col-span-2"><span class="font-semibold">Description:</span> {{ selectedSchedule.training_course?.short_description || '—' }}</div>
          </div>
        </div>
        <div class="modal-action p-4 border-t border-gray-200 bg-gray-50">
          <button class="btn btn-sm" @click="selectedSchedule = null">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import api from '@/config/api';

const route = useRoute();

// State
const loading = ref(false);
const schedules = ref([]);
const selectedSchedule = ref(null);

// Pagination
const currentPage = ref(1);
const perPage = ref(15);
const totalItems = ref(0);
const totalPages = ref(1);

// Filters
const filters = reactive({
  search: '',
  solution_id: '',
  software_id: '',
  analysis: '',
  course_id: '',
});

// Dropdown data
const softwares = ref([]);
const solutions = ref([]);
const courses = ref([]);
const analysisTypeList = [
  { id: "dynamic", name: "Dynamic Analysis", icon: "📊" },
  { id: "static", name: "Static Analysis", icon: "⚖️" },
  { id: "thermal", name: "Thermal Analysis", icon: "🔥" },
  { id: "cfd", name: "CFD Analysis", icon: "🌊" },
  { id: "multibody", name: "Multibody Dynamic Analysis", icon: "⚙️" },
  { id: "fatigue", name: "Fatigue Analysis", icon: "🔄" },
  { id: "composite", name: "Composite Analysis", icon: "📐" },
  { id: "acoustics_analysis", name: "Acoustics Analysis", icon: "🎵" },
];


const isUpcoming = computed(() => route.params.status === 'upcoming');

// Training type from route (group/company/individual)
const trainingType = computed(() => route.params.id);

// Helper: visible page numbers for pagination
const visiblePages = computed(() => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;
  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i);
    }
  }
  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });
  return rangeWithDots;
});

// Filtered schedules (client‑side after fetch)
const filteredSchedules = computed(() => {
  let list = [...schedules.value];

  // Search: course name, code, software name, solution name
  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(sch => {
      const course = sch.training_course;
      return (
        course?.name?.toLowerCase().includes(s) ||
        course?.code?.toLowerCase().includes(s) ||
        course?.software?.name?.toLowerCase().includes(s) ||
        course?.solution?.name?.toLowerCase().includes(s)
      );
    });
  }

  // Solution filter
  if (filters.solution_id) {
    list = list.filter(sch => sch.training_course?.solution_id == filters.solution_id);
  }

  // Software filter
  if (filters.software_id) {
    list = list.filter(sch => sch.training_course?.software_id == filters.software_id);
  }

  // Analysis filter
  if (filters.analysis) {
    list = list.filter(sch => sch.training_course?.analysis === filters.analysis);
  }

  // Course filter
  if (filters.course_id) {
    list = list.filter(sch => sch.training_course?.id == filters.course_id);
  }

  return list;
});

// Helper to get names for chips
const getSolutionName = (id) => solutions.value.find(s => s.id == id)?.name || 'Unknown';
const getSoftwareName = (id) => softwares.value.find(s => s.id == id)?.name || 'Unknown';

const hasActiveFilters = computed(() =>
  filters.search || filters.solution_id || filters.software_id || filters.analysis || filters.course_id
);

const resetFilters = () => {
  filters.search = '';
  filters.solution_id = '';
  filters.software_id = '';
  filters.analysis = '';
  filters.course_id = '';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getTypeLabel = () => {
  switch (trainingType.value) {
    case 'group': return 'Group Training';
    case 'company': return 'Company Training';
    case 'individual': return 'Individual Training';
    default: return 'Training';
  }
};

const getTypeIcon = () => {
  switch (trainingType.value) {
    case 'group': return '👥';
    case 'company': return '🏢';
    case 'individual': return '👤';
    default: return '📚';
  }
};

// Fetch schedules from API
const fetchSchedules = async () => {
  loading.value = true;
  try {
    const params = {
      page: 1,
      per_page: 100,
      with: 'trainer,trainingCourse.software,trainingCourse.solution',
    };
    // Add filter by training_type if route param exists
    if (trainingType.value && trainingType.value !== 'all') {
      params.training_type = trainingType.value;
    }
    // Add status filter based on upcoming/completed
    // if (isUpcoming.value) {
    //   params.status = '0'; // assuming 0 = upcoming
    // } else {
    //   params.status = '1'; // completed
    // }

    const response = await api().get('/admin/training-course-schedules', { params });
    if (response.data?.success) {
      const paginated = response.data.data;
      schedules.value = paginated.data || [];
      totalItems.value = paginated.total || 0;
      totalPages.value = paginated.last_page || 1;
      currentPage.value = paginated.current_page || 1;
    } else {
      schedules.value = [];
    }
  } catch (err) {
    console.error('Error fetching schedules:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load training schedules.',
      confirmButtonColor: '#3085d6'
    });
    schedules.value = [];
  } finally {
    loading.value = false;
  }
};

// Change page
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchSchedules();
};

// View details
const viewDetails = (schedule) => {
  selectedSchedule.value = schedule;
};

// Fetch dropdown data
const fetchSoftwares = async () => {
  try {
    const response = await api().get('/softwares');
    softwares.value = response.data.data || [];
  } catch (e) {
    console.error('Failed to fetch softwares:', e);
  }
};

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions');
    solutions.value = response.data.data || [];
  } catch (e) {
    console.error('Failed to fetch solutions:', e);
  }
};

const fetchCourses = async () => {
  try {
    const res = await api().get('/internal-trainings?status=2');
    courses.value = res.data.data || [];
  } catch (e) {
    console.error('Failed to fetch courses:', e);
  }
};

// Watch route changes
watch([() => route.params.id, () => route.params.status], () => {
  currentPage.value = 1;
  resetFilters();
  fetchSchedules();
});

onMounted(() => {
  fetchSchedules();
  fetchSoftwares();
  fetchSolutions();
  fetchCourses();
});
</script>

<style scoped>
/* Ensure border-e (right border) works */
.border-e {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #e5e7eb;
}
.table-zebra tbody tr:nth-child(even) {
  background-color: #f9fafb;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>