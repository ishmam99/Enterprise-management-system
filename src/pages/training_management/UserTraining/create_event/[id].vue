<template>
  <div class="p-6 bg-gray-50 min-h-screen w-full">
    <!-- Header Section with Type Badge -->
    <div class="mb-6">
      <div class="flex items-center gap-4 mb-2">
        <h2 class="text-2xl font-bold text-gray-800">Training Enrollment Requests</h2>
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
      <p class="text-sm text-gray-600">Manage and review all training enrollment requests</p>
      <p class="text-sm text-blue-600 mt-2">Showing enrollments with no trainer assigned only</p>
    </div>

    <!-- ==================== FILTERS PANEL ==================== -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-6 rounded-full bg-teal-500"></div>
        <h2 class="font-semibold text-gray-700 text-sm uppercase tracking-wider">Filter Enrollments</h2>
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
      <p class="mt-4 text-gray-600">Loading enrollments...</p>
    </div>

    <!-- Table Section -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="filteredEnrollments.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">✅</div>
        <p class="text-gray-600">No enrollments found without assigned trainers for {{ getTypeLabel() }}</p>
        <button v-if="hasActiveFilters" @click="resetFilters" class="mt-4 text-teal-600 text-sm font-medium hover:underline">Clear all filters</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 table-zebra">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Information</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule & Trainer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="enrollment in filteredEnrollments" :key="enrollment.id" class="hover:bg-gray-50 transition">
              <!-- ID Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-blue-600">#{{ enrollment.id }}</span>
              </td>

              <!-- User Details Column -->
              <td class="px-6 py-4">
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
              <td class="px-6 py-4">
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
              <td class="px-6 py-4">
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

              <!-- Financial Info Column -->
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">${{ parseFloat(enrollment.course_price).toFixed(2) }}</span>
                  </div>
                </div>
               </td>

              <!-- Status Column -->
              <td class="px-6 py-4">
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
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex gap-2">
                  <button 
                    @click="viewDetails(enrollment)" 
                    class="w-8 h-8 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    title="View Details">
                    👁️
                  </button>
                  <button 
                    @click="openAssignTrainerModal(enrollment)" 
                    class="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-600 hover:text-white transition text-sm font-medium"
                    title="Assign Trainer">
                    Assign Trainer
                  </button>
                </div>
               </td>
             </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assign Trainer Modal (unchanged) -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 class="text-lg font-semibold text-gray-900">Assign Trainer</h3>
          <p class="text-sm text-gray-500 mt-1">Select a trainer for the course schedule</p>
        </div>
        
        <div class="px-6 py-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Course</label>
            <p class="text-gray-900">{{ selectedEnrollment?.training_course?.name }}</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
            <p class="text-gray-900">{{ selectedEnrollment?.training_course_schedule ? formatDate(selectedEnrollment.training_course_schedule.date) : 'N/A' }}</p>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Trainer</label>
            <select 
              v-model="selectedTrainerId" 
              @change="onTrainerSelect"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">-- Select a trainer --</option>
              <option 
                v-for="trainer in availableTrainersForCourse" 
                :key="trainer.user_id" 
                :value="trainer.user_id"
              >
                {{ trainer.user?.name || 'Unknown Trainer' }} 
                <span v-if="trainer.courses && trainer.courses.length > 0" class="text-xs text-gray-500">
                  - {{ trainer.courses.length }} course(s)
                </span>
              </option>
            </select>
            <p v-if="availableTrainersForCourse.length === 0" class="text-xs text-red-500 mt-1">
              No trainers available for this course. Trainers must be associated with the course before assignment.
            </p>
          </div>
          
          <!-- Trainer Details Section (unchanged) -->
          <div v-if="selectedTrainer" class="mt-6 border-t border-gray-200 pt-4">
            <h4 class="text-md font-semibold text-gray-800 mb-3">Trainer Details</h4>
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div><span class="text-gray-500">Name:</span> <span class="ml-2 text-gray-800 font-medium">{{ selectedTrainer.name }}</span></div>
                <div><span class="text-gray-500">Email:</span> <span class="ml-2 text-gray-800">{{ selectedTrainer.email }}</span></div>
                <div><span class="text-gray-500">Phone:</span> <span class="ml-2 text-gray-800">{{ selectedTrainer.phone || 'N/A' }}</span></div>
                <div><span class="text-gray-500">Trainer ID:</span> <span class="ml-2 text-gray-800">#{{ selectedTrainer.id }}</span></div>
                <div class="col-span-2"><span class="text-gray-500">Address:</span> <span class="ml-2 text-gray-800">{{ selectedTrainer.address || 'N/A' }}</span></div>
              </div>
            </div>

            <div class="mb-4" v-if="selectedTrainer.courses && selectedTrainer.courses.length > 0">
              <h5 class="text-sm font-semibold text-gray-700 mb-2 flex items-center"><span class="mr-1">📚</span> Assigned Courses ({{ selectedTrainer.courses.length }})</h5>
              <div class="space-y-2">
                <div v-for="course in selectedTrainer.courses" :key="course.id" class="bg-blue-50 rounded-lg p-3 text-sm">
                  <div class="font-medium text-gray-800">{{ course.training_course?.name || `Course #${course.training_course_id}` }}</div>
                  <div class="text-xs text-gray-600 mt-1">
                    <div>Code: {{ course.training_course?.code || 'N/A' }}</div>
                    <div class="mt-1">Duration: {{ course.training_course?.duration || 'N/A' }} • Level: {{ course.training_course?.level || 'N/A' }}</div>
                    <div class="mt-1">Type: {{ course.training_course?.type == 'onsite' ? "Training" : "Lunch and Learn" || 'N/A' }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <h5 class="text-sm font-semibold text-gray-700 mb-2 flex items-center"><span class="mr-1">🎯</span> Skills & Expertise</h5>
              <div v-if="selectedTrainer.skills && selectedTrainer.skills.length > 0" class="space-y-3">
                <div v-if="getSoftwareSkills(selectedTrainer.skills).length > 0">
                  <div class="text-xs font-medium text-gray-500 mb-1">Software Skills:</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in getSoftwareSkills(selectedTrainer.skills)" :key="skill.id" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {{ skill.software_id ? `Software ID: ${skill.software_id}` : 'Software Skill' }}
                      {{ skill.level ? `(${skill.level})` : '' }}
                    </span>
                  </div>
                </div>
                <div v-if="getSolutionSkills(selectedTrainer.skills).length > 0">
                  <div class="text-xs font-medium text-gray-500 mb-1 mt-2">Solution Skills:</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in getSolutionSkills(selectedTrainer.skills)" :key="skill.id" class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Solution ID: {{ skill.solution_id }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-sm text-gray-400 italic">No skills listed</div>
            </div>
            
            <div class="mb-4">
              <h5 class="text-sm font-semibold text-gray-700 mb-2 flex items-center"><span class="mr-1">📅</span> Preferred Schedule</h5>
              <div v-if="selectedTrainer.schedules && selectedTrainer.schedules.length > 0" class="space-y-2">
                <div v-for="schedule in selectedTrainer.schedules" :key="schedule.id" class="bg-gray-50 rounded-lg p-3 text-sm">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="font-medium text-gray-700">{{ formatDays(schedule.days) }}</span>
                    <span class="text-gray-500">{{ schedule.start_time }} - {{ schedule.end_time }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-sm text-gray-400 italic">No schedule available</div>
            </div>
          </div>
          
          <div v-if="assignLoading" class="text-center py-2">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button @click="closeModal" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition" :disabled="assignLoading">Cancel</button>
          <button @click="submitAssignTrainer" class="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition" :disabled="!selectedTrainerId || assignLoading || availableTrainersForCourse.length === 0">Assign Trainer</button>
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
const loading = ref(false);
const assignLoading = ref(false);
const enrollments = ref([]);
const trainersList = ref([]);
const showModal = ref(false);
const selectedEnrollment = ref(null);
const selectedTrainerId = ref('');
const selectedTrainer = ref(null);

// ==================== FILTERS STATE ====================
const filters = reactive({
  search: '',
  solution_id: '',
  software_id: '',
  analysis: '',
  course_id: '',
});

// Dropdown data for filters
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

// Helper: get names for chips
const getSolutionName = (id) => solutions.value.find(s => s.id == id)?.name || 'Unknown';
const getSoftwareName = (id) => softwares.value.find(s => s.id == id)?.name || 'Unknown';

// Reset all filters
const resetFilters = () => {
  filters.search = '';
  filters.solution_id = '';
  filters.software_id = '';
  filters.analysis = '';
  filters.course_id = '';
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

// Filtered enrollments: first apply "no trainer assigned" filter, then client‑side filters
const filteredEnrollments = computed(() => {
  let list = enrollments.value.filter(enrollment => {
    const schedule = enrollment.training_course_schedule;
    return !schedule || !schedule.trainer_id || !schedule.trainer;
  });

  // Search
  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(en => {
      const course = en.training_course;
      return (
        en.user?.name?.toLowerCase().includes(s) ||
        en.user?.email?.toLowerCase().includes(s) ||
        course?.name?.toLowerCase().includes(s) ||
        course?.code?.toLowerCase().includes(s)
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

// ==================== Existing Methods ====================
const getTypeLabel = () => {
  const type = route.params.id;
  switch(type) {
    case 'group': return 'Group Training';
    case 'company': return 'Company Training';
    case 'individual': return 'Individual Training';
    default: return 'Training';
  }
};

const getTypeIcon = () => {
  const type = route.params.id;
  switch(type) {
    case 'group': return '👥';
    case 'company': return '🏢';
    case 'individual': return '👤';
    default: return '📚';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getPaymentLabel = (status) => {
  const paymentMap = { paid: 'Paid', pending: 'Pending', failed: 'Failed', refunded: 'Refunded' };
  return paymentMap[status] || status || 'Unknown';
};

const getSoftwareSkills = (skills) => skills.filter(skill => skill.skill_type === '1' || skill.skill_type === 1);
const getSolutionSkills = (skills) => skills.filter(skill => skill.skill_type === '2' || skill.skill_type === 2);

const formatDays = (daysData) => {
  let daysArray = daysData;
  if (typeof daysData === 'string') {
    try { daysArray = JSON.parse(daysData); } catch (e) { daysArray = []; }
  }
  if (!daysArray || !Array.isArray(daysArray)) return 'N/A';
  const dayMap = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };
  return daysArray.map(day => dayMap[day?.toLowerCase()] || day).join(', ');
};

const fetchTrainers = async () => {
  try {
    const response = await api().get('/trainer?with=user,skills,preferedSchedules,courses.trainingCourse');
    const trainers = response.data?.data?.data || response.data?.data || [];
    trainersList.value = trainers;
  } catch (err) {
    console.error("Error fetching trainers:", err);
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load trainers list.', confirmButtonColor: '#3085d6' });
  }
};

const onTrainerSelect = () => {
  if (selectedTrainerId.value) {
    const trainer = trainersList.value.find(t => t.id == selectedTrainerId.value);
    if (trainer) {
      selectedTrainer.value = {
        id: trainer.id,
        user_id: trainer.user_id,
        name: trainer.user?.name || 'Unknown',
        email: trainer.user?.email || 'Unknown',
        phone: trainer.phone,
        address: trainer.address,
        experience_year: trainer.experience_year,
        skills: trainer.skills || [],
        schedules: trainer.prefered_schedules || [],
        courses: trainer.courses || []
      };
    }
  } else {
    selectedTrainer.value = null;
  }
};

const fetchEnrollment = async () => {
  loading.value = true;
  try {
    const response = await api().get(`/training-requests?enrolled=yes&training_type=${route.params.id}`);
    enrollments.value = (response.data?.data?.data || response.data?.data || []).filter(enrollment => enrollment.payment_status == 'paid');
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load enrollments. Please try again later.', confirmButtonColor: '#3085d6' });
    enrollments.value = [];
  } finally {
    loading.value = false;
  }
};

const viewDetails = (enrollment) => {
  Swal.fire({
    title: 'Enrollment Details',
    html: `<div style="text-align: left;">
      <p><strong>Request ID:</strong> ${enrollment.id}</p>
      <p><strong>User:</strong> ${enrollment.user?.name} (${enrollment.user?.email})</p>
      <p><strong>Course:</strong> ${enrollment.training_course?.name}</p>
      <p><strong>Schedule:</strong> ${enrollment.training_course_schedule ? formatDate(enrollment.training_course_schedule.date) : 'No schedule assigned'}</p>
      <p><strong>Trainer:</strong> ${enrollment.training_course_schedule?.trainer?.name || 'No trainer assigned'}</p>
      <p><strong>Payment:</strong> ${getPaymentLabel(enrollment.payment_status)}</p>
      <p><strong>Created:</strong> ${new Date(enrollment.created_at).toLocaleString()}</p>
    </div>`,
    icon: 'info',
    confirmButtonColor: '#3085d6'
  });
};

const openAssignTrainerModal = (enrollment) => {
  selectedEnrollment.value = enrollment;
  selectedTrainerId.value = '';
  selectedTrainer.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedEnrollment.value = null;
  selectedTrainerId.value = '';
  selectedTrainer.value = null;
};

const submitAssignTrainer = async () => {
  if (!selectedTrainerId.value || !selectedEnrollment.value) return;
  const schedule = selectedEnrollment.value.training_course_schedule;
  if (!schedule || !schedule.id) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'No schedule found for this enrollment.', confirmButtonColor: '#3085d6' });
    return;
  }
  assignLoading.value = true;
  try {
    const payload = { trainer_id: selectedTrainerId.value, _method: "PUT" };
    await api().post(`/admin/training-course-schedules/${schedule.id}`, payload);
    Swal.fire({ icon: 'success', title: 'Success', text: 'Trainer assigned successfully!', confirmButtonColor: '#3085d6' });
    closeModal();
    await fetchEnrollment();
    await fetchTrainers();
  } catch (err) {
    console.error("Error assigning trainer:", err);
    Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Failed to assign trainer.', confirmButtonColor: '#3085d6' });
  } finally {
    assignLoading.value = false;
  }
};

// Watch for route param changes
watch(() => route.params.id, () => {
  fetchEnrollment();
  resetFilters(); // reset filters when switching tabs
});

onMounted(() => {
  fetchEnrollment();
  fetchTrainers();
  fetchSoftwares();
  fetchSolutions();
  fetchCourses();
});
</script>