<template>
  <div class="rv-container">

    <!-- Report Header -->
    <div class="rv-header">
      <div class="rv-header-left">
        <div class="rv-header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div>
          <h2 class="rv-title">Activity Report View</h2>
          <p class="rv-meta">{{ report.teamName }} &bull; {{ report.period }}</p>
        </div>
      </div>
      <div class="rv-header-right">
        <span class="rv-status-badge" :class="statusClass">{{ statusLabel }}</span>
      </div>
    </div>

    <!-- Report Body -->
    <div class="rv-body">

      <!-- Meta strip -->
      <div class="rv-meta-strip">
        <div class="rv-meta-item">
          <span class="rv-meta-label">Team</span>
          <span class="rv-meta-value">{{ report.teamName || '—' }}</span>
        </div>
        <div class="rv-meta-divider"></div>
        <div class="rv-meta-item">
          <span class="rv-meta-label">Period</span>
          <span class="rv-meta-value">{{ report.period || '—' }}</span>
        </div>
        <div class="rv-meta-divider"></div>
        <div class="rv-meta-item">
          <span class="rv-meta-label">Generated</span>
          <span class="rv-meta-value">{{ today }}</span>
        </div>
        <div class="rv-meta-divider"></div>
        <div class="rv-meta-item">
          <span class="rv-meta-label">Status</span>
          <span class="rv-meta-value" :class="'rv-status--' + report.status">{{ statusLabel }}</span>
        </div>
      </div>

      <!-- ── Section A: Summary of Activities ── -->
      <section class="rv-section" v-if="report.summaryActivities?.length">
        <div class="rv-section-heading rv-section-heading--blue">
          <span class="rv-heading-pill">A</span>
          <h3>Summary of Activities</h3>
          <span class="rv-count-badge">{{ report.summaryActivities.length }} item{{ report.summaryActivities.length !== 1 ? 's' : '' }}</span>
        </div>
        <div class="rv-table-wrap">
          <table class="rv-table">
            <thead>
              <tr>
                <th class="rv-th rv-th--num">#</th>
                <th class="rv-th">Activity Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in report.summaryActivities" :key="idx" class="rv-tr">
                <td class="rv-td rv-td--num">
                  <span class="rv-row-num rv-row-num--blue">A{{ idx + 1 }}</span>
                </td>
                <td class="rv-td">{{ item }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ── Section B: Key Outcomes ── -->
      <section class="rv-section" v-if="report.keyOutcomes?.length">
        <div class="rv-section-heading rv-section-heading--amber">
          <span class="rv-heading-pill">B</span>
          <h3>Key Outcomes</h3>
          <span class="rv-count-badge">{{ report.keyOutcomes.length }} item{{ report.keyOutcomes.length !== 1 ? 's' : '' }}</span>
        </div>
        <div class="rv-table-wrap">
          <table class="rv-table">
            <thead>
              <tr>
                <th class="rv-th rv-th--num">#</th>
                <th class="rv-th">Outcome Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in report.keyOutcomes" :key="idx" class="rv-tr">
                <td class="rv-td rv-td--num">
                  <span class="rv-row-num rv-row-num--amber">B{{ idx + 1 }}</span>
                </td>
                <td class="rv-td">{{ item }}</td>
               </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ── Section C: Engagement Activities ── -->
      <section class="rv-section" v-if="report.engagementGroups?.length">
        <div class="rv-section-heading rv-section-heading--orange">
          <span class="rv-heading-pill">C</span>
          <h3>Engagement Activities</h3>
          <span class="rv-count-badge">{{ totalEngagements }} output{{ totalEngagements !== 1 ? 's' : '' }}</span>
        </div>

        <div
          v-for="(group, gIdx) in report.engagementGroups"
          :key="group.taskId ?? gIdx"
          class="rv-engagement-group"
        >
          <!-- Task Header Row -->
          <div class="rv-task-banner">
            <div class="rv-task-banner-left">
              <span class="rv-task-type">C{{ gIdx + 1 }}: {{ group.task?.type }}</span>
              <p class="rv-task-desc">{{ group.task?.description }}</p>
            </div>
            <div class="rv-task-banner-right">
              <span class="rv-task-due">Due: {{ formatDate(group.task?.date) }}</span>
            </div>
          </div>

          <!-- Outputs Table -->
          <div class="rv-table-wrap rv-table-wrap--inner">
            <table class="rv-table">
              <thead>
                <tr>
                  <th class="rv-th rv-th--num">#</th>
                  <th class="rv-th">Output / Action Taken</th>
                  <th class="rv-th rv-th--status">Status</th>
                  <th class="rv-th rv-th--date">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(output, oIdx) in group.outputs"
                  :key="output.id"
                  class="rv-tr"
                >
                  <td class="rv-td rv-td--num">
                    <span class="rv-row-num rv-row-num--orange">C{{ gIdx + 1 }}.{{ oIdx + 1 }}</span>
                  </td>
                  <td class="rv-td">{{ output.output }}</td>
                  <td class="rv-td rv-td--status">
                    <span class="rv-output-status" :class="output.status === '1' ? 'rv-output-status--done' : 'rv-output-status--pending'">
                      {{ output.status === '1' ? 'Completed' : 'Pending' }}
                    </span>
                  </td>
                  <td class="rv-td rv-td--date">{{ formatDate(output.date) }}</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Empty state -->
      <div v-if="!hasContent" class="rv-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p>No report data to display. Please fill out the form to generate a report.</p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})

const statusOptions = [
  { value: 0, label: 'Draft'     },
  { value: 1, label: 'Submitted' },
  { value: 2, label: 'Approved'  },
]

const statusLabel = computed(() =>
  statusOptions.find(o => o.value === props.report.status)?.label ?? 'Draft'
)
const statusClass = computed(() => ({
  'rv-badge--gray':  props.report.status === 0,
  'rv-badge--blue':  props.report.status === 1,
  'rv-badge--green': props.report.status === 2,
}))

const today = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

const hasContent = computed(() =>
  props.report.summaryActivities?.length ||
  props.report.keyOutcomes?.length ||
  props.report.engagementGroups?.length
)

const totalEngagements = computed(() =>
  (props.report.engagementGroups ?? []).reduce((sum, g) => sum + (g.outputs?.length ?? 0), 0)
)

// Globally sequential C-index across all groups
const globalIndex = computed(() => {
  const lookup = []
  let counter = 1
  for (let g = 0; g < (props.report.engagementGroups?.length ?? 0); g++) {
    lookup[g] = []
    for (let o = 0; o < props.report.engagementGroups[g].outputs.length; o++) {
      lookup[g][o] = counter++
    }
  }
  return (gIdx, oIdx) => lookup[gIdx]?.[oIdx] ?? '?'
})

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(dateStr))
  } catch { return dateStr }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

.rv-container {
  font-family: 'DM Sans', sans-serif;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,.05);
}

/* Header */
.rv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2563eb;
  color: #fff;
  padding: 1rem 1.5rem;
  gap: 1rem;
}
.rv-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rv-header-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
.rv-title {
  font-family: 'Lora', serif;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}
.rv-meta {
  font-size: 0.7rem;
  opacity: 0.7;
  margin: 0.1rem 0 0;
}
.rv-status-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
}
.rv-badge--gray  { background: rgba(255,255,255,0.2); color: #fff; }
.rv-badge--blue  { background: rgba(147,210,255,0.3); color: #fff; }
.rv-badge--green { background: rgba(74,222,128,0.3); color: #fff; }

/* Body */
.rv-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Meta Strip */
.rv-meta-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}
.rv-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.rv-meta-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  font-weight: 600;
}
.rv-meta-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #0f172a;
}
.rv-meta-divider {
  width: 1px;
  height: 28px;
  background: #e2e8f0;
  margin: 0 0.25rem;
}
.rv-status--0 { color: #64748b; }
.rv-status--1 { color: #2563eb; }
.rv-status--2 { color: #16a34a; }

/* Sections */
.rv-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.rv-section-heading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.9rem;
  border-radius: 9px;
  border-left: 4px solid transparent;
}
.rv-section-heading--blue   { background: #eff6ff; border-color: #2563eb; }
.rv-section-heading--amber  { background: #fffbeb; border-color: #d97706; }
.rv-section-heading--orange { background: #fff7ed; border-color: #ea580c; }
.rv-section-heading h3 {
  font-family: 'Lora', serif;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}
.rv-heading-pill {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lora', serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
}
.rv-section-heading--blue   .rv-heading-pill { background: #2563eb; }
.rv-section-heading--amber  .rv-heading-pill { background: #d97706; }
.rv-section-heading--orange .rv-heading-pill { background: #ea580c; }
.rv-count-badge {
  margin-left: auto;
  font-size: 0.68rem;
  font-weight: 600;
  background: rgba(0,0,0,0.05);
  color: #475569;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
}

/* Tables */
.rv-table-wrap {
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  overflow: hidden;
}
.rv-table-wrap--inner {
  border-radius: 0 0 8px 8px;
  border-top: none;
}
.rv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}
.rv-th {
  background: #f1f5f9;
  color: #475569;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0.5rem 0.8rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.rv-th--num    { width: 55px; text-align: center; }
.rv-th--status { width: 100px; text-align: center; }
.rv-th--date   { width: 100px; }
.rv-tr {
  transition: background 0.1s;
}
.rv-tr:hover {
  background: #f8fafc;
}
.rv-tr + .rv-tr td {
  border-top: 1px solid #f1f5f9;
}
.rv-td {
  padding: 0.6rem 0.8rem;
  color: #1e293b;
  vertical-align: top;
  line-height: 1.45;
}
.rv-td--num    { text-align: center; vertical-align: middle; }
.rv-td--status { text-align: center; vertical-align: middle; }
.rv-td--date   { white-space: nowrap; color: #64748b; font-size: 0.75rem; }
.rv-row-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  padding: 0.15rem 0.4rem;
  border-radius: 5px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  font-family: 'Lora', serif;
}
.rv-row-num--blue   { background: #2563eb; }
.rv-row-num--amber  { background: #d97706; }
.rv-row-num--orange { background: #ea580c; }

/* Engagement Groups */
.rv-engagement-group {
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 0.1rem;
}
.rv-task-banner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  background: linear-gradient(to right, #fff7ed, #fff);
  border-bottom: 1px solid #fed7aa;
  padding: 0.65rem 0.9rem;
}
.rv-task-type {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #ea580c;
  color: #fff;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  margin-bottom: 0.25rem;
}
.rv-task-desc {
  font-size: 0.78rem;
  color: #7c2d12;
  margin: 0;
  font-weight: 500;
  line-height: 1.4;
}
.rv-task-due {
  font-size: 0.7rem;
  color: #92400e;
  white-space: nowrap;
}
.rv-task-banner-right {
  flex-shrink: 0;
}
.rv-output-status {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
}
.rv-output-status--done    { background: #dcfce7; color: #15803d; }
.rv-output-status--pending { background: #fef9c3; color: #a16207; }

/* Empty */
.rv-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.85rem;
  text-align: center;
}
.rv-empty p {
  margin: 0;
}
</style>