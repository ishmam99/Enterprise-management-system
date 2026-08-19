<template>
  <div class="formal-container ">
    <!-- Professional Header -->
    <div class="formal-header" :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">{{ statusText(route.params.id) }}</h1>
          <p class="page-subtitle">Candidates Hiring Management</p>
        </div>
        <div class="header-decoration">
          <i class="fas fa-user-tie"></i>
        </div>
      </div>
    </div>

    <!-- Main Card -->
    <div class="formal-card">
      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="search-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email or contact..."
              class="formal-search"
            />
          </div>
          <div class="filter-group">
            <select v-model="selectedJobTitle" class="formal-select">
              <option value="">All Job Titles</option>
              <option v-for="title in uniqueJobTitles" :key="title" :value="title">
                {{ title }}
              </option>
            </select>
            <select v-model="selectedDepartment" class="formal-select">
              <option value="">All Departments</option>
              <option v-for="dept in uniqueDepartments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
            <select v-model="selectedJobType" class="formal-select">
              <option value="">All Job Types</option>
              <option v-for="type in uniqueJobTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
        </div>
        <div class="toolbar-right">
          <button @click="refreshData" class="formal-btn formal-btn-secondary">
            <i class="fas fa-sync-alt"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="active-filters">
        <span class="filter-label">Active filters:</span>
        <div class="filter-tags">
          <span v-if="selectedJobTitle" class="filter-tag">
            <i class="fas fa-briefcase"></i>
            {{ selectedJobTitle }}
            <button @click="selectedJobTitle = ''" class="filter-remove">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <span v-if="selectedDepartment" class="filter-tag">
            <i class="fas fa-building"></i>
            {{ selectedDepartment }}
            <button @click="selectedDepartment = ''" class="filter-remove">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <span v-if="selectedJobType" class="filter-tag">
            <i class="fas fa-clock"></i>
            {{ selectedJobType }}
            <button @click="selectedJobType = ''" class="filter-remove">
              <i class="fas fa-times"></i>
            </button>
          </span>
          <button v-if="hasActiveFilters" @click="clearAllFilters" class="clear-filters">
            Clear all
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading candidates...</p>
      </div>

      <!-- Data Table -->
      <div v-else class="table-wrapper">
        <table class="formal-table table-zebra">
          <thead class="bg-sky-100">
            <tr>
              <th class="col-status border-e border-slate-400/70">Status of Hiring</th>
              <th class="col-name border-e border-slate-400/70">Candidate</th>
              <th class="col-job border-e border-slate-400/70">Applied Position</th>
              <th class="col-email border-e border-slate-400/70">Email</th>
              <th class="col-phone border-e border-slate-400/70">Phone Number</th>
              <th class="col-actions border-e border-slate-400/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="application in filteredCandidates" :key="application.id">
              <td class="status-cell border-e">
                <span :class="['status-badge', statusClass(application.status)]">
                  <i :class="statusIcon(application.status)"></i>
                  {{ statusText(application.status) }}
                </span>
              </td>
              <td class="candidate-cell border-e">
                <div class="candidate-info">
                  <div class="candidate-avatar">
                    {{ getInitials(application.full_name) }}
                  </div>
                  <div>
                    <div class="candidate-name">{{ application.full_name }}</div>

                  </div>
                </div>
              </td>
              <td class="job-cell border-e">
                <div class="job-title">{{ application.job?.title || 'N/A' }}</div>
                <div class="job-meta">
                  <span class="job-meta-item">
                    <i class="fas fa-building"></i>
                    {{ application.job?.department || 'N/A' }}
                  </span>
                  <span class="job-meta-item">
                    <i class="fas fa-clock"></i>
                    {{ application.job?.job_type || 'N/A' }}
                  </span>
                  <span class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ application.job?.base_country || 'N/A' }}
                  </span>
                </div>
              </td>
              <td class="email-cell border-e">
                <div class="email-wrapper !text-base">
                  <i class="fas fa-envelope"></i>
                  <span>{{ application.email }}</span>
                </div>
              </td>
              <td class="phone-cell border-e">
                <div class="flex items-center text-base gap-2">
                   <i class="fas fa-phone"></i>
                 
          <div >{{ application.contact || 'No contact' }}</div>
                </div>

              </td>

              <td class="actions-cell">
                <div class="action-buttons">
                  <router-link
                    :to="{
                      path: `/hr_management/recruitment/hiring_pipeline/hiring_details/${application.id}`,
                      query: { status: route.params.id }
                    }"
                    class="formal-btn formal-btn-sm formal-btn-primary"
                  >
                    <i class="fas fa-eye"></i>
                    <span>View</span>
                  </router-link>
                  <router-link
                    v-if="route.params.id == 2"
                    :to="`/hr_management/recruitment/hiring_pipeline/interview_feedback/${application.id}`"
                    class="formal-btn formal-btn-sm formal-btn-secondary"
                  >
                    <i class="fas fa-comment"></i>
                    <span>Feedback</span>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr v-if="filteredCandidates.length === 0">
              <td colspan="5" class="empty-state">
                <div class="empty-content">
                  <i class="fas fa-users"></i>
                  <p>No candidates found</p>
                  <span>Try adjusting your search or filters</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/config/api'
import { useRoute } from 'vue-router'

const applications = ref([])
const loading = ref(false)
const searchQuery = ref('')
const route = useRoute()

// New filter variables
const selectedJobTitle = ref('')
const selectedDepartment = ref('')
const selectedJobType = ref('')

/* ---------------- Computed Properties ---------------- */

// Get unique values for filters
const uniqueJobTitles = computed(() => {
  const titles = new Set()
  applications.value.forEach(app => {
    if (app.job?.title) {
      titles.add(app.job.title)
    }
  })
  return Array.from(titles).sort()
})

const uniqueDepartments = computed(() => {
  const depts = new Set()
  applications.value.forEach(app => {
    if (app.job?.department) {
      depts.add(app.job.department)
    }
  })
  return Array.from(depts).sort()
})

const uniqueJobTypes = computed(() => {
  const types = new Set()
  applications.value.forEach(app => {
    if (app.job?.job_type) {
      types.add(app.job.job_type)
    }
  })
  return Array.from(types).sort()
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return selectedJobTitle.value || selectedDepartment.value || selectedJobType.value
})

// Filter candidates based on all filters
const filteredCandidates = computed(() => {
  let filtered = applications.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (candidate) =>
        candidate.full_name?.toLowerCase().includes(query) ||
        candidate.email?.toLowerCase().includes(query) ||
        candidate.contact?.toLowerCase().includes(query)
    )
  }

  // Job title filter
  if (selectedJobTitle.value) {
    filtered = filtered.filter(
      (candidate) => candidate.job?.title === selectedJobTitle.value
    )
  }

  // Department filter
  if (selectedDepartment.value) {
    filtered = filtered.filter(
      (candidate) => candidate.job?.department === selectedDepartment.value
    )
  }

  // Job type filter
  if (selectedJobType.value) {
    filtered = filtered.filter(
      (candidate) => candidate.job?.job_type === selectedJobType.value
    )
  }

  return filtered
})

/* ---------------- Helper Functions ---------------- */
const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const clearAllFilters = () => {
  selectedJobTitle.value = ''
  selectedDepartment.value = ''
  selectedJobType.value = ''
  searchQuery.value = ''
}

/* ---------------- Fetch API ---------------- */
const fetchCandidates = async () => {
  loading.value = true
  try {
    if (route.params.id == 22) {
      const response = await api().get(`/applied-jobs`)
      applications.value = response.data.data.filter((e) => e.status > 1)
    }
    else if (route.params.id == 23) {
      const response = await api().get(`/applied-jobs?status=7`)
      applications.value = response.data.data.slice(0, 10)
    } else if (route.params.id == 24) {
      const response = await api().get(`/applied-jobs?status=7`)
      applications.value = response.data.data
    }
    else {
      const response = await api().get(`/applied-jobs?status=${route.params.id}`)
      applications.value = response.data.data.filter((e) => e.status == route.params.id)
    }
  } catch (error) {
    console.error('Error fetching candidates:', error)
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  fetchCandidates()
}

/* ---------------- Watchers ---------------- */
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      clearAllFilters()
      fetchCandidates()
    }
  }
)

onMounted(fetchCandidates)

/* ---------------- Status Mapping ---------------- */
const statusText = (status) => {
  switch (String(status)) {
    case '22':
      return 'All Stage'
    case '2':
      return 'Interview Stage'
    case '3':
      return 'Selection & Offer'
    case '4':
      return 'Verification'
    case '5':
      return 'Documentation'
    case '6':
      return 'Joining & Setup'
    case '7':
      return 'Probation'
    default:
      return 'Unknown'
  }
}

const statusClass = (status) => {
  switch (String(status)) {
    case '2':
      return 'status-interview'
    case '3':
      return 'status-offer'
    case '4':
      return 'status-verification'
    case '5':
      return 'status-document'
    case '6':
      return 'status-joining'
    case '7':
      return 'status-probation'
    default:
      return 'status-default'
  }
}

const statusIcon = (status) => {
  switch (String(status)) {
    case '2':
      return 'fas fa-calendar-alt'
    case '3':
      return 'fas fa-file-signature'
    case '4':
      return 'fas fa-check-double'
    case '5':
      return 'fas fa-file-alt'
    case '6':
      return 'fas fa-user-plus'
    case '7':
      return 'fas fa-chart-line'
    default:
      return 'fas fa-question'
  }
}
</script>

<style scoped>
/* Formal Container */
.formal-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px 32px;
}

/* Professional Header */
.formal-header {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  border: 1px solid #e4e7ec;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 30px;
  font-weight: 600;
  color: #cdd7e0;
  margin: 0 0 4px 0;
  letter-spacing: -0.2px;
}

.page-subtitle {
  font-size: 20px;
  color: #e6eef3;
  margin: 0;
}

.header-decoration {
  width: 48px;
  height: 48px;
  background: #f0f4f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c5f8a;
  font-size: 24px;
}

/* Main Card */
.formal-card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e4e7ec;
  overflow: hidden;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #eef2f6;
  flex-wrap: wrap;
  gap: 12px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  width: 260px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: #8a9aa8;
}

.formal-search {
  width: 100%;
  padding: 8px 12px 8px 36px;
  font-size: 13px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #ffffff;
  transition: all 0.2s;
}

.formal-search:focus {
  outline: none;
  border-color: #2c5f8a;
  box-shadow: 0 0 0 3px rgba(44, 95, 138, 0.1);
}

.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.formal-select {
  padding: 8px 32px 8px 12px;
  font-size: 13px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #ffffff;
  color: #1a2c3e;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6e7c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  min-width: 140px;
}

.formal-select:focus {
  outline: none;
  border-color: #2c5f8a;
  box-shadow: 0 0 0 3px rgba(44, 95, 138, 0.1);
}

.toolbar-right {
  display: flex;
  gap: 12px;
}

/* Buttons */
.formal-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: none;
}

.formal-btn-sm {
  padding: 6px 12px;
  font-size: 12px;
  gap: 6px;
}

.formal-btn-primary {
  background: #2c5f8a;
  color: #ffffff;
}

.formal-btn-primary:hover {
  background: #1e4768;
}

.formal-btn-secondary {
  background: #f0f4f9;
  color: #1a2c3e;
  border: 1px solid #d0d7de;
}

.formal-btn-secondary:hover {
  background: #e4e9f0;
}

/* Active Filters */
.active-filters {
  padding: 12px 20px;
  background: #fafbfd;
  border-bottom: 1px solid #eef2f6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-label {
  font-size: 12px;
  color: #5a6e7c;
  font-weight: 500;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 10px;
  background: #eef2f6;
  border-radius: 4px;
  font-size: 12px;
  color: #1a2c3e;
}

.filter-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #8a9aa8;
  padding: 2px;
  font-size: 10px;
}

.filter-remove:hover {
  color: #c0392b;
}

.clear-filters {
  background: none;
  border: none;
  font-size: 12px;
  color: #c0392b;
  cursor: pointer;
  padding: 4px 8px;
}

.clear-filters:hover {
  text-decoration: underline;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #eef2f6;
  border-top-color: #2c5f8a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: #5a6e7c;
  font-size: 13px;
  margin: 0;
}

/* Table Styles */
.table-wrapper {
  overflow-x: auto;
}

.formal-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.formal-table thead tr {
  background: #bedeffb0;
  border-bottom: 1px solid #e4e7ec;
}

.formal-table th {
  text-align: left;
  padding: 14px 16px;
  font-weight: 600;
  color: #1a2c3e;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.formal-table td {
  padding: 16px;
  border-bottom: 1px solid #eef2f6;
  vertical-align: middle;
}

.formal-table tbody tr:hover {
  background: #fafbfd;
}

/* Column Widths */
.col-status { width: 130px; }
.col-name { width: 220px; }
.col-job { width: 280px; }
.col-email { width: 220px; }
.col-actions { width: 160px; }

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-interview {
  background: #e3f2fd;
  color: #1565c0;
}

.status-offer {
  background: #fff8e1;
  color: #f57c00;
}

.status-verification {
  background: #ffebee;
  color: #c62828;
}

.status-document {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-joining {
  background: #f3e5f5;
  color: #7b1fa2;
}

.status-probation {
  background: #e0f7fa;
  color: #00838f;
}

.status-default {
  background: #eceff1;
  color: #546e7a;
}

/* Candidate Cell */
.candidate-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.candidate-avatar {
  width: 36px;
  height: 36px;
  background: #2c5f8a;
  color: #ffffff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.candidate-name {
  font-weight: 500;
  color: #1a2c3e;
  margin-bottom: 2px;
}

.candidate-contact {
  font-size: 11px;
  color: #8a9aa8;
}

/* Job Cell */
.job-title {
  font-weight: 500;
  color: #1a2c3e;
  margin-bottom: 6px;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.job-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #5a6e7c;
}

.job-meta-item i {
  font-size: 10px;
  color: #8a9aa8;
}

/* Email Cell */
.email-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a2c3e;
}

.email-wrapper i {
  color: #8a9aa8;
  font-size: 12px;
}

/* Actions */
.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px !important;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-content i {
  font-size: 48px;
  color: #cbd5e1;
}

.empty-content p {
  font-size: 14px;
  color: #5a6e7c;
  margin: 0;
  font-weight: 500;
}

.empty-content span {
  font-size: 12px;
  color: #8a9aa8;
}

/* Responsive */
@media (max-width: 768px) {
  .formal-container {
    padding: 16px;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-left {
    flex-direction: column;
    width: 100%;
  }

  .search-wrapper {
    width: 100%;
  }

  .filter-group {
    width: 100%;
  }

  .formal-select {
    flex: 1;
  }

  .col-status,
  .col-name,
  .col-job,
  .col-email,
  .col-actions {
    width: auto;
  }
}
</style>
