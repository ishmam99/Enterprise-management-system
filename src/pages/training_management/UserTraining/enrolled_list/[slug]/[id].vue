<template>
  <div class="p-6 bg-gray-50 min-h-screen w-full">
    <!-- Header Section with Type Badge -->
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-2">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isUpcoming ? 'Upcoming' : 'Completed' }} Trainees
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
        {{ isUpcoming ? 'List of all approved upcoming training sessions' : 'List of all completed training sessions' }}
      </p>
    </div>

    <!-- ==================== FILTERS PANEL (ADDED) ==================== -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-6 rounded-full bg-teal-500"></div>
        <h2 class="font-semibold text-gray-700 text-sm uppercase tracking-wider">Filter Trainees</h2>
        <button @click="resetFilters" class="ml-auto text-xs text-teal-600 hover:text-teal-800 font-medium border border-teal-200 hover:border-teal-400 px-3 py-1 rounded-full transition-all">
          ↺ Reset All
        </button>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <!-- Search -->
        <div class="relative lg:col-span-2">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="filters.search" type="text" placeholder="Search user, email, course, trainer..." class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-gray-50" />
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
      <p class="mt-4 text-gray-600">Loading {{ isUpcoming ? 'upcoming' : 'completed' }} trainees...</p>
    </div>

    <!-- Table Section -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="filteredEnrollments.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">{{ isUpcoming ? '📅' : '✅' }}</div>
        <p class="text-gray-600">No {{ isUpcoming ? 'upcoming' : 'completed' }} trainees found for {{ getTypeLabel() }}</p>
        <button @click="resetFilters" class="mt-4 text-teal-600 text-sm font-medium hover:underline">Clear all filters</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 table-zebra">
          <thead class="bg-blue-50">
            <tr>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">Course Information</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule & Trainer</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">Course Price</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th class="px-6 py-3 text-left border-e text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="enrollment in filteredEnrollments" :key="enrollment.id" class="hover:bg-gray-50 transition">
              <!-- ID Column -->
              <td class="px-6 py-4 border-e border-gray-200/70 whitespace-nowrap">
                <span class="text-sm font-semibold text-blue-600">#{{ enrollment.id }}</span>
              </td>

              <!-- User Details Column -->
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div class="text-sm">
                  <div class="font-medium text-gray-900 mb-1">
                    <span class="inline-block mr-1">👤</span>
                    {{ enrollment.user?.name || 'N/A' }}
                  </div>
                  <div class="text-gray-500 text-xs mb-1">{{ enrollment.user?.email || 'N/A' }}</div>
                  <div class="text-gray-400 text-xs font-mono">ID: {{ enrollment.user_id }}</div>
                </div>
              </td>

              <!-- Course Information Column -->
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div class="text-sm">
                  <div class="font-semibold text-gray-900 mb-1">{{ enrollment.training_course?.name || 'N/A' }}</div>
                  <div class="text-gray-500 text-xs font-mono mb-2">Code: {{ enrollment.training_course?.code || 'N/A' }}</div>
                  <div class="flex gap-2 mb-2">
                    <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{{ enrollment.training_course?.level || 'N/A' }}</span>
                    <span class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{{ enrollment.training_course?.duration || 'N/A' }}</span>
                  </div>
                  <div class="text-gray-500 text-xs">
                    <span class="inline-block mr-1">📘</span>
                    {{ enrollment.training_course?.type || 'N/A' }}
                  </div>
                </div>
              </td>

              <!-- Schedule & Trainer Column -->
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div v-if="enrollment.training_course_schedule" class="text-sm">
                  <div class="mb-2">
                    <span class="inline-block mr-1">📅</span>
                    <span class="text-gray-700">{{ formatDate(enrollment.training_course_schedule.date) }}</span>
                  </div>
                  <div class="mb-2">
                    <span class="inline-block mr-1">👨‍🏫</span>
                    <span class="text-gray-700">{{ enrollment.training_course_schedule.trainer?.name || 'No trainer assigned' }}</span>
                  </div>
                  <div>
                    <span class="inline-block mr-1">💺</span>
                    <span class="text-green-600 text-sm">Available: {{ enrollment.training_course_schedule.available_seats || 0 }} seats</span>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-400">
                  <div class="mb-1">📅 No schedule assigned</div>
                  <div class="flex items-center">
                    <span class="inline-block mr-1">👨‍🏫</span>
                    <span>No trainer assigned</span>
                  </div>
                </div>
              </td>

              <!-- Course Price Column -->
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div class="text-sm">
                  <span class="text-gray-500">${{ parseFloat(enrollment.course_price).toFixed(2) }}</span>
                </div>
              </td>

              <!-- Payment Status Column -->
              <td class="px-6 py-4 border-e border-gray-200/70">
                <div class="space-y-1">
                  <span :class="[
                    'inline-block px-2 py-1 text-xs font-semibold rounded-full text-center min-w-[80px]',
                    enrollment.payment_status === 'paid' ? 'bg-blue-100 text-blue-800' : '',
                    enrollment.payment_status === 'pending' ? 'bg-orange-100 text-orange-800' : '',
                    enrollment.payment_status === 'failed' ? 'bg-red-100 text-red-800' : '',
                    enrollment.payment_status === 'refunded' ? 'bg-purple-100 text-purple-800' : ''
                  ]">
                    {{ getPaymentLabel(enrollment.payment_status) }}
                  </span>
                </div>
              </td>

              <!-- Actions Column -->
              <td class="px-6 py-4 border-e border-gray-200/70 whitespace-nowrap">
                <div class="flex gap-2">
                  <button
                    @click="viewDetails(enrollment)"
                    class="w-8 h-8 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    title="View Details">
                    👁️
                  </button>
                  
                  <!-- Mark Complete Button - Only shown for upcoming page -->
                  <button
                    v-if="isUpcoming"
                    @click="openMarkCompleteModal(enrollment)"
                    class="w-8 h-8 bg-green-50 text-green-600 rounded hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                    title="Mark as Complete">
                    ✅
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mark Complete Modal (unchanged) -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div class="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Mark Training as Complete</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Training Request #{{ selectedEnrollment?.id }}
            </label>
            <p class="text-sm text-gray-500 mb-4">
              Course: {{ selectedEnrollment?.training_course?.name }}
            </p>
            
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Admin Notes <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="adminNotes"
              rows="4"
              class="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Please provide notes about the completion..."
              :class="{ 'border-red-500': notesError }"
            ></textarea>
            <p v-if="notesError" class="mt-1 text-xs text-red-500">Admin notes are required</p>
          </div>
          
          <div class="flex justify-end gap-3">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              @click="markAsComplete"
              :disabled="updating"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="updating" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Confirm Complete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import api from '@/config/api';   // added missing import

const route = useRoute();
const loading = ref(false);
const updating = ref(false);
const enrollments = ref([]);
const showModal = ref(false);
const selectedEnrollment = ref(null);
const adminNotes = ref('');
const notesError = ref(false);

// Filter state
const filters = reactive({
  search: '',
  solution_id: '',
  software_id: '',
  analysis: '',
  course_id: '',
});

// Data for dropdowns
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

// Computed: any active filter
const hasActiveFilters = computed(() =>
  filters.search || filters.solution_id || filters.software_id || filters.analysis || filters.course_id
);

// Helper: get solution/software names for chips
const getSolutionName = (id) => solutions.value.find(s => s.id == id)?.name || 'Unknown';
const getSoftwareName = (id) => softwares.value.find(s => s.id == id)?.name || 'Unknown';

// Determine if we're on upcoming or completed page
const isUpcoming = computed(() => route.params.slug === 'upcoming');

const getTypeLabel = () => {
  switch (route.params.id) {
    case 'group': return 'Group Training';
    case 'company': return 'Company Training';
    case 'individual': return 'Individual Training';
    default: return 'Training';
  }
};

const getTypeIcon = () => {
  switch (route.params.id) {
    case 'group': return '👥';
    case 'company': return '🏢';
    case 'individual': return '👤';
    default: return '📚';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getPaymentLabel = (status) => {
  const paymentMap = { paid: 'Paid', pending: 'Pending', failed: 'Failed', refunded: 'Refunded' };
  return paymentMap[status] || status || 'Unknown';
};

// --- Filtered enrollments (client-side) ---
const filteredEnrollments = computed(() => {
  let list = [...enrollments.value];

  // Search: user name/email, course name/code, trainer name, solution/software name
  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(en => {
      const course = en.training_course;
      const trainerName = en.training_course_schedule?.trainer?.name?.toLowerCase() || '';
      const solutionName = course?.solution?.name?.toLowerCase() || '';
      const softwareName = course?.software?.name?.toLowerCase() || '';
      return (
        en.user?.name?.toLowerCase().includes(s) ||
        en.user?.email?.toLowerCase().includes(s) ||
        course?.name?.toLowerCase().includes(s) ||
        course?.code?.toLowerCase().includes(s) ||
        trainerName.includes(s) ||
        solutionName.includes(s) ||
        softwareName.includes(s)
      );
    });
  }

  // Solution filter
  if (filters.solution_id) {
    list = list.filter(en => en.training_course?.solution_id == filters.solution_id);
  }

  // Software filter
  if (filters.software_id) {
    list = list.filter(en => en.training_course?.software_id == filters.software_id);
  }

  // Analysis filter
  if (filters.analysis) {
    list = list.filter(en => en.training_course?.analysis === filters.analysis);
  }

  // Course filter
  if (filters.course_id) {
    list = list.filter(en => en.training_course?.id == filters.course_id);
  }

  return list;
});

// Reset all filters
const resetFilters = () => {
  filters.search = '';
  filters.solution_id = '';
  filters.software_id = '';
  filters.analysis = '';
  filters.course_id = '';
};

// Fetch enrollments (unchanged except using filteredEnrollments for display)
const fetchEnrollment = async () => {
  loading.value = true;
  try {
    const statusFilter = isUpcoming.value ? 'approved' : 'completed';
    const response = await api().get(`/training-requests`, {
      params: {
        enrolled: 'yes',
        training_type: route.params.id,
        status: statusFilter
      }
    });
    enrollments.value = (response.data?.data?.data || response.data?.data || [])
      .filter(enrollment => enrollment.payment_status == 'paid' && enrollment?.training_course_schedule?.trainer_id != null);
  } catch (err) {
    console.error('Error fetching enrolled trainees:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load enrolled trainees. Please try again later.',
      confirmButtonColor: '#3085d6'
    });
    enrollments.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch filter dropdown data
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

// View details (unchanged)
const viewDetails = (enrollment) => {
  Swal.fire({
    title: 'Enrollment Details',
    html: `
      <div style="text-align: left;">
        <p><strong>Request ID:</strong> ${enrollment.id}</p>
        <p><strong>User:</strong> ${enrollment.user?.name} (${enrollment.user?.email})</p>
        <p><strong>Course:</strong> ${enrollment.training_course?.name}</p>
        <p><strong>Schedule:</strong> ${enrollment.training_course_schedule ? formatDate(enrollment.training_course_schedule.date) : 'No schedule assigned'}</p>
        <p><strong>Trainer:</strong> ${enrollment.training_course_schedule?.trainer?.name || 'No trainer assigned'}</p>
        <p><strong>Payment:</strong> ${getPaymentLabel(enrollment.payment_status)}</p>
        <p><strong>Status:</strong> ${enrollment.status}</p>
        <p><strong>Enrolled On:</strong> ${new Date(enrollment.created_at).toLocaleString()}</p>
        <p><strong>Completed At:</strong> ${new Date(enrollment.completed_at).toLocaleString()}</p>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#3085d6'
  });
};

// Mark complete modal (unchanged)
const openMarkCompleteModal = (enrollment) => {
  selectedEnrollment.value = enrollment;
  adminNotes.value = '';
  notesError.value = false;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedEnrollment.value = null;
  adminNotes.value = '';
  notesError.value = false;
};

const markAsComplete = async () => {
  if (!adminNotes.value.trim()) {
    notesError.value = true;
    return;
  }
  notesError.value = false;
  updating.value = true;
  try {
    const response = await api().post(`/training-requests/${selectedEnrollment.value.id}/status`, {
      status: 'completed',
      admin_notes: adminNotes.value.trim()
    });
    if (response.data?.success || response.status === 200) {
      enrollments.value = enrollments.value.filter(e => e.id !== selectedEnrollment.value.id);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Training has been marked as completed successfully.',
        confirmButtonColor: '#3085d6',
        timer: 2000,
        showConfirmButton: false
      });
      closeModal();
    } else {
      throw new Error(response.data?.message || 'Failed to update status');
    }
  } catch (err) {
    console.error('Error marking as complete:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Failed to mark training as complete. Please try again.',
      confirmButtonColor: '#3085d6'
    });
  } finally {
    updating.value = false;
  }
};

// Watch route changes
watch([() => route.params.id, () => route.params.slug], () => {
  fetchEnrollment();
  resetFilters();       // optional: reset filters when switching views
});

onMounted(() => {
  fetchEnrollment();
  fetchSoftwares();
  fetchSolutions();
  fetchCourses();
});
</script>