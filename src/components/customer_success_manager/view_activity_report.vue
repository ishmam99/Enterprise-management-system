<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { format, startOfMonth, endOfMonth, parse, parseISO } from 'date-fns'
import api from '@/config/api'

const route = useRoute()
const loading = ref(false)
const selectedMonth = ref('')
const activities = ref([])

// Computed properties
const customerName = computed(() => decodeURIComponent(route.params.customer || 'Client'))

const selectedMonthLabel = computed(() => {
  if (!selectedMonth.value) return ''
  const date = parse(selectedMonth.value, 'yyyy-MM', new Date())
  return `${format(startOfMonth(date), 'MMMM d, yyyy')} to ${format(endOfMonth(date), 'MMMM d, yyyy')}`
})

const groupedActivities = computed(() => {
  const summaryItems = []
  const outcomeItems = []

  activities.value.forEach(item => {
    const type = item.type?.toLowerCase() || ''
    type.includes('outcome') ? outcomeItems.push(item) : summaryItems.push(item)
  })

  const sortByDate = (arr) => [...arr].sort((a, b) => new Date(a.date) - new Date(b.date))

  const groups = [
    { label: 'Summary of Activities', items: sortByDate(summaryItems) },
    { label: 'Key Outcomes', items: sortByDate(outcomeItems) }
  ]

  return groups.filter(group => group.items.length > 0)
})

const hasActivities = computed(() => groupedActivities.value.length > 0)

// Methods
const fetchReport = async () => {
  if (!selectedMonth.value) return

  loading.value = true
  const date = parse(selectedMonth.value, 'yyyy-MM', new Date())
  const startDate = format(startOfMonth(date), 'yyyy-MM-dd')
  const endDate = format(endOfMonth(date), 'yyyy-MM-dd')

  try {
    const res = await api().get(`csm-reports?start_date=${startDate}&end_date=${endDate}`)
    activities.value = res.data.data || []
  } catch (err) {
    console.error('Failed to fetch report:', err)
    activities.value = []
  } finally {
    loading.value = false
  }
}

// Lifecycle
watch(selectedMonth, fetchReport)

onMounted(() => {
  selectedMonth.value = format(new Date(), 'yyyy-MM')
})
</script>

<template>
  <div class="report-container">
    <div class="report-card">
      <!-- Header Section -->
      <header class="report-header">
        <div class="header-content">
          <h1 class="report-title">Monthly Activity Report</h1>
          <input type="month" v-model="selectedMonth" class="month-selector" aria-label="Select month for report" />
        </div>
        <div class="period-display">
          <strong class="period-label">Period:</strong> {{ selectedMonthLabel }}
        </div>
      </header>

      <!-- Main Content -->
      <main class="report-content">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p class="loading-text">Loading Report Data...</p>
        </div>

        <div v-else-if="!hasActivities" class="empty-state">
          <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="empty-text">No activities found for the selected period</p>
        </div>

        <div v-else class="activities-container">
          <section v-for="group in groupedActivities" :key="group.label"
            :class="['activity-group', { 'outcome-group': group.label.includes('Outcome') }]">
            <h2 class="group-title">{{ group.label }}</h2>

            <div class="activity-items">
              <article v-for="(item, index) in group.items" :key="item.id || index" class="activity-item">
                <div class="activity-content" v-html="item.activity" />
              </article>
            </div>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="report-footer">
        <div class="footer-content">
          HTSS • {{ customerName }} • Confidential
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.report-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

}

@media (min-width: 640px) {
  .report-container {
    padding: 3rem 1rem;
  }
}

@media print {
  .report-container {
    background: white;
    padding: 0;
  }
}

/* Card */
.report-card {
  max-width: 72rem;
  margin: 0 auto;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

@media print {
  .report-card {
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
}

/* Header */
.report-header {
  padding: 3rem 2.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(to right, #f8fafc, white);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.report-title {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .report-title {
    font-size: 2.25rem;
  }
}

.month-selector {
  width: auto;
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: white;
  color: #334155;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.month-selector:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media print {
  .month-selector {
    display: none;
  }
}

.period-display {
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  font-size: 1.125rem;
  color: #475569;
}

.period-label {
  color: #1e293b;
}

/* Content */
.report-content {
  padding: 2rem 2.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  gap: 1rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  gap: 1rem;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: #cbd5e1;
}

.empty-text {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Activities */
.activities-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.activity-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.group-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f1f5f9;
  position: relative;
}

.group-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 3rem;
  height: 2px;
  background: #3b82f6;
}

.outcome-group .group-title::after {
  background: #10b981;
}

.activity-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.activity-item {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.activity-content {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #334155;
}

/* Footer */
.report-footer {
  padding: 1.5rem 2.5rem;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}

.footer-content {
  text-align: center;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media print {
  .report-footer {
    background: white;
  }
}

/* Content Styles */
.activity-content :deep(h2) {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
}

.activity-content :deep(ul) {
  list-style: none;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.activity-content :deep(li) {
  position: relative;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  color: #334155;
}

.activity-content :deep(li::before) {
  content: '➤';
  position: absolute;
  left: 0;
  color: #475569;
  font-size: 0.75rem;
  top: 0.15rem;
}

.outcome-group .activity-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.outcome-group .activity-content :deep(ol li) {
  padding-left: 0.5rem;
}

.outcome-group .activity-content :deep(ol li::before) {
  display: none;
}

@media print {
  .activity-content {
    font-size: 11pt;
    line-height: 1.6;
  }

  .activity-content :deep(*) {
    break-inside: avoid;
  }
}
</style>
