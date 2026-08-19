<template>
  <div class="min-h-screen w-full bg-gray-50">
    <!-- Header Section -->
    <div class="bg-amber-200 shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-amber-900">Pending for Approval Trainings List</h1>
            <p class="text-amber-700 text-sm mt-1">Manage and track all training programs</p>
          </div>
          <RouterLink 
            to="/training_management/training/create" 
            class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Training
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p class="mt-4 text-gray-600">Loading trainings...</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Filters Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search Filter -->
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search by name or code..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
            </div>

            <!-- Software Filter -->
            <select
              v-model="filters.software_id"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option :value="null">All Software</option>
              <option v-for="software in softwareList" :key="software.id" :value="software.id">
                {{ software.name }}
              </option>
            </select>

            <!-- Solution Filter -->
            <select
              v-model="filters.solution_id"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option :value="null">All Solutions</option>
              <option v-for="solution in analysisTypeList" :key="solution.id" :value="solution.name">
                {{ solution.name }}
              </option>
            </select>

            <!-- Type Filter -->
            <select
              v-model="filters.type"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option :value="null">All Types</option>
              <option value="onsite">On-Site</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <!-- Level Filter -->
            <select
              v-model="filters.level"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option :value="null">All Levels</option>
              <option value="Basic">Basic</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
              <option value="All">All Levels</option>
            </select>

            <!-- Status Filter -->
            <select
              v-model="filters.status"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option :value="null">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <!-- Reset Filters Button -->
            <button
              @click="resetFilters"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p class="text-2xl font-bold text-purple-600">{{ totalTrainings }}</p>
            <p class="text-sm text-gray-500">Total Trainings</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p class="text-2xl font-bold text-green-600">{{ activeCount }}</p>
            <p class="text-sm text-gray-500">Active</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p class="text-2xl font-bold text-orange-600">{{ onsiteCount }}</p>
            <p class="text-sm text-gray-500">On-Site</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p class="text-2xl font-bold text-blue-600">{{ onlineCount }}</p>
            <p class="text-sm text-gray-500">Online</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p class="text-2xl font-bold text-cyan-600">{{ hybridCount }}</p>
            <p class="text-sm text-gray-500">Hybrid</p>
          </div>
        </div>

        <!-- Trainings Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="training in paginatedTrainings" :key="training.id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-mono font-medium text-purple-600">{{ training.code }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ training.name }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-xs">{{ training.short_description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-600">{{ training.software_name || '-' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                   <span class="text-sm text-gray-600">{{ training.analysis || '-' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 text-xs rounded-full': true,
                      'bg-purple-100 text-purple-700': training.type === 'onsite',
                      'bg-blue-100 text-blue-700': training.type === 'online',
                      'bg-cyan-100 text-cyan-700': training.type === 'hybrid'
                    }">
                      {{ training.type === 'onsite' ? 'On-Site' : training.type === 'online' ? 'Online' : 'Hybrid' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 text-xs rounded-full': true,
                      'bg-green-100 text-green-700': training.level === 'Beginner',
                      'bg-yellow-100 text-yellow-700': training.level === 'Intermediate',
                      'bg-orange-100 text-orange-700': training.level === 'Advanced',
                      'bg-red-100 text-red-700': training.level === 'Expert',
                      'bg-gray-100 text-gray-700': training.level === 'All'
                    }">
                      {{ training.level }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-600">{{ training.duration }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="training.price == 0" class="text-sm text-green-600 font-semibold">Free</span>
                    <span v-else class="text-sm text-gray-900 font-semibold">${{ training.price }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 text-xs rounded-full': true,
                      'bg-green-100 text-green-700': training.status == 1,
                      'bg-red-100 text-red-700': training.status == 0
                    }">
                      {{ training.status == 1 ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-2">
                      <RouterLink 
                        :to="`/training_management/training/edit/${training.id}`"
                        class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </RouterLink>
                      <button 
                        @click="toggleStatus(training)"
                        class="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        :title="training.status == 1 ? 'Deactivate' : 'Approve'"
                      >
                        <svg v-if="training.status == 1" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </button>
                      <button 
                        @click="confirmDelete(training)"
                        class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-if="filteredTrainings.length === 0" class="text-center py-12">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No Trainings Found</h3>
            <p class="text-gray-500 mb-4">Try adjusting your filters or create a new training.</p>
            <RouterLink 
              to="/internal-trainings/create"
              class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create New Training
            </RouterLink>
          </div>

          <!-- Pagination -->
          <div v-if="filteredTrainings.length > 0" class="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-sm text-gray-600">
              Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredTrainings.length) }} of {{ filteredTrainings.length }} entries
            </div>
            <div class="flex gap-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <div class="flex gap-1">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="{
                    'px-3 py-1 rounded-lg transition': true,
                    'bg-purple-600 text-white': currentPage === page,
                    'border border-gray-300 text-gray-600 hover:bg-gray-100': currentPage !== page
                  }"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showDeleteModal = false"></div>
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-red-600 px-6 py-4">
            <h3 class="text-lg font-bold text-white">Confirm Delete</h3>
          </div>
          <div class="px-6 py-4">
            <p class="text-gray-700">Are you sure you want to delete <span class="font-semibold">{{ trainingToDelete?.name }}</span>?</p>
            <p class="text-sm text-red-600 mt-2">This action cannot be undone.</p>
          </div>
          <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button @click="showDeleteModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">Cancel</button>
            <button @click="deleteTraining" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div v-if="toastMessage" class="fixed bottom-4 right-4 z-50">
      <div :class="{
        'px-4 py-3 rounded-lg shadow-lg flex items-center gap-2': true,
        'bg-green-500 text-white': toastType === 'success',
        'bg-red-500 text-white': toastType === 'error'
      }">
        <svg v-if="toastType === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

// ========== ROUTER ==========
const router = useRouter();


// ========== STATE ==========
const loading = ref(true);
const trainings = ref([]);
const softwareList = ref([]);
const solutionList = ref([]);
const showDeleteModal = ref(false);
const trainingToDelete = ref(null);
const toastMessage = ref("");
const toastType = ref("success");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const analysisTypeList = ref([
  { id: "dynamic", name: "Dynamic Analysis", icon: "📊", gradient: "bg-gradient-to-br from-purple-600 to-indigo-700", shortDescription: "Vibration, shock, and transient response" },
  { id: "static", name: "Static Analysis", icon: "⚖️", gradient: "bg-gradient-to-br from-blue-600 to-cyan-700", shortDescription: "Linear and nonlinear static analysis" },
  { id: "thermal", name: "Thermal Analysis", icon: "🔥", gradient: "bg-gradient-to-br from-orange-600 to-red-700", shortDescription: "Heat transfer and thermal simulation" },
  { id: "cfd", name: "CFD Analysis", icon: "🌊", gradient: "bg-gradient-to-br from-green-600 to-emerald-700", shortDescription: "Computational fluid dynamics" },
  { id: "multibody", name: "Multibody Analysis", icon: "⚙️", gradient: "bg-gradient-to-br from-pink-600 to-rose-700", shortDescription: "Mechanical system simulation" },
  { id: "fatigue", name: "Fatigue Analysis", icon: "🔄", gradient: "bg-gradient-to-br from-amber-600 to-orange-700", shortDescription: "Durability and fatigue life prediction" },
  { id: "composite", name: "Composite Analysis", icon: "📐", gradient: "bg-gradient-to-br from-teal-600 to-cyan-700", shortDescription: "Composite material modeling" },
  { id: "acoustics_analysis", name: "Acoustics Analysis", icon: "🎵", gradient: "bg-gradient-to-br from-purple-600 to-pink-700", shortDescription: "Sound and vibration simulation" },
]);
// Filters
const filters = ref({
  search: "",
  software_id: null,
  solution_id: null,
  type: null,
  level: null,
  status: null
});

// ========== COMPUTED PROPERTIES ==========
const totalTrainings = computed(() => trainings.value.length);

const activeCount = computed(() => trainings.value.filter(t => t.status == 2).length);

const onsiteCount = computed(() => trainings.value.filter(t => t.type === 'onsite').length);

const onlineCount = computed(() => trainings.value.filter(t => t.type === 'online').length);

const hybridCount = computed(() => trainings.value.filter(t => t.type === 'hybrid').length);

const filteredTrainings = computed(() => {
  let filtered = [...trainings.value];
  
  // Search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(searchTerm) || 
      t.code.toLowerCase().includes(searchTerm)
    );
  }
  
  // Software filter
  if (filters.value.software_id) {
    filtered = filtered.filter(t => t.software_id == filters.value.software_id);
  }
  
  // Solution filter
  if (filters.value.solution_id) {
    filtered = filtered.filter(t => t.analysis == filters.value.solution_id);
  }
  
  // Type filter
  if (filters.value.type) {
    filtered = filtered.filter(t => t.type === filters.value.type);
  }
  
  // Level filter
  if (filters.value.level) {
    filtered = filtered.filter(t => t.level === filters.value.level);
  }
  
  // Status filter
  if (filters.value.status !== null) {
    filtered = filtered.filter(t => t.status == filters.value.status);
  }
  
  // Sort by ID descending (newest first)
  return filtered.sort((a, b) => b.id - a.id);
});

const totalPages = computed(() => Math.ceil(filteredTrainings.value.length / itemsPerPage.value));

const paginatedTrainings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTrainings.value.slice(start, end);
});

// ========== API METHODS ==========
const fetchSoftwares = async () => {
  try {
    const response = await api().get(`/softwares`);
    if (response.data && response.data.data) {
      softwareList.value = response.data.data;
    } else if (Array.isArray(response.data)) {
      softwareList.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching softwares:", error);
  }
};

const fetchSolutions = async () => {
  try {
    const response = await api().get(`/solutions`);
    if (response.data && response.data.data) {
      solutionList.value = response.data.data;
    } else if (Array.isArray(response.data)) {
      solutionList.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching solutions:", error);
  }
};

const fetchTrainings = async () => {
  try {
    const response = await api().get(`/internal-trainings?status=0`);
    let trainingsData = [];
    
    if (response.data && response.data.data) {
      trainingsData = response.data.data;
    } else if (Array.isArray(response.data)) {
      trainingsData = response.data;
    }
    
    // Enhance training data with related names
    trainings.value = trainingsData.map(training => ({
      ...training,
      software_name: getSoftwareNameById(training.software_id),
      solution_name: getSolutionNameById(training.solution_id),
    }));
  } catch (error) {
    console.error("Error fetching trainings:", error);
    showToast("Failed to load trainings", "error");
  }
};

const getSoftwareNameById = (softwareId) => {
  const software = softwareList.value.find(s => s.id == softwareId);
  return software ? software.name : null;
};

const getSolutionNameById = (solutionId) => {
  const solution = solutionList.value.find(s => s.id == solutionId);
  return solution ? solution.name : null;
};

const loadAllData = async () => {
  loading.value = true;
  await Promise.all([fetchSoftwares(), fetchSolutions()]);
  await fetchTrainings();
  loading.value = false;
};

// ========== CRUD OPERATIONS ==========
const toggleStatus = async (training) => {
  try {
    const newStatus = training.status == 1 ? 0 : 1;
    const response = await api().post(`/internal-trainings/${training.id}`, {
      ...training,
      status: newStatus,
      _method: 'PUT' 
    });
    
    if (response.data) {
      training.status = newStatus;
      showToast(`Training ${newStatus == 1 ? 'activated' : 'deactivated'} successfully`, "success");
    }
  } catch (error) {
    console.error("Error toggling status:", error);
    showToast("Failed to update status", "error");
  }
};

const confirmDelete = (training) => {
  trainingToDelete.value = training;
  showDeleteModal.value = true;
};

const deleteTraining = async () => {
  if (!trainingToDelete.value) return;
  
  try {
    await api().delete(`/internal-trainings/${trainingToDelete.value.id}`);
    trainings.value = trainings.value.filter(t => t.id !== trainingToDelete.value.id);
    showDeleteModal.value = false;
    trainingToDelete.value = null;
    showToast("Training deleted successfully", "success");
    
    // Adjust current page if needed
    if (paginatedTrainings.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  } catch (error) {
    console.error("Error deleting training:", error);
    showToast("Failed to delete training", "error");
  }
};

// ========== FILTER METHODS ==========
const resetFilters = () => {
  filters.value = {
    search: "",
    software_id: null,
    solution_id: null,
    type: null,
    level: null,
    status: null
  };
  currentPage.value = 1;
};

// ========== UI HELPERS ==========
const showToast = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
};

// ========== WATCHERS ==========
// Reset to first page when filters change
watch(filters, () => {
  currentPage.value = 1;
}, { deep: true });

// ========== LIFECYCLE ==========
onMounted(() => {
  loadAllData();
});
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>