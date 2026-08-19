<template>
  <div class="bg-slate-50 min-h-screen py-8 px-4 md:px-6 font-sans text-slate-900">
    <div v-if="showReportView" class="flex justify-end items-center gap-4 mb-6">
      <button class="bg-red-500 px-2 py-1 text-white rounded-lg shadow" @click="showReportView = !showReportView">
        <i class="ri-arrow-left-line" />
        Back</button>
    </div>
    <ReportView v-if="showReportView" :report="reportData" @close="showReportView = false" />

    <!-- ── PDF Preview Modal ── -->
    <ReportPDF v-else-if="showReportPDF" :report="reportData" @close="showReportPDF = false" />
    <div v-else>
      <div
        class="bg-gradient-to-r from-blue-900 to-cyan-700 text-white rounded-xl shadow-lg mb-6 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
          </div>
          <div>
            <h1 class="font-display text-xl font-bold tracking-tight">Activity Report</h1>
            <p class="text-sm opacity-75">Create a new monthly activity report</p>
          </div>
        </div>
        <div :class="[
          'text-xs font-semibold tracking-wide uppercase py-1.5 px-3 rounded-full backdrop-blur-sm self-start',
          statusClass
        ]">
          {{ statusLabel }}
        </div>
      </div>
      <!-- ── Report View Modal ── -->

      <form @submit.prevent="submit" class=" flex flex-col gap-5" novalidate>

        <!-- Section A: Time Period & Team -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div class="flex items-center gap-2.5 py-2.5 px-4 border-b border-slate-200 bg-blue-50">
            <span
              class="w-7 h-7 rounded-md flex items-center justify-center font-display text-sm font-bold text-white bg-blue-600 shrink-0">A</span>
            <h2 class="font-display text-sm font-bold">Time Period &amp; Team Selection</h2>
          </div>
          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- Success Team -->
            <div>
              <label class="block text-xs font-semibold text-slate-900 mb-1.5" for="success-team">
                Success Team <span class="text-red-600 ml-0.5">*</span>
              </label>
              <div class="relative">
                <select id="success-team" v-model="form.success_team_id"
                  class="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-9 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-colors cursor-pointer"
                  :class="{ 'border-red-500 focus:border-red-500': errors.success_team_id }">
                  <option value="" disabled>— Select a team —</option>
                  <option v-for="team in successTeams" :key="team.id" :value="team.id">
                    {{ team.name }}
                  </option>
                </select>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              <transition name="ar-err">
                <p v-if="errors.success_team_id" class="text-xs text-red-600 mt-1.5">{{ errors.success_team_id }}</p>
              </transition>
            </div>

            <!-- Period -->
            <div>
              <label class="block text-xs font-semibold text-slate-900 mb-1.5">
                Reporting Period <span class="text-red-600 ml-0.5">*</span>
              </label>
              <div class="grid grid-cols-2 gap-2">
                <div class="relative">
                  <select v-model="month"
                    class="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-9 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-colors cursor-pointer"
                    :class="{ 'border-red-500 focus:border-red-500': errors.period }">
                    <option value="" disabled>Month</option>
                    <option v-for="(m, idx) in months" :key="idx" :value="idx + 1">{{ m }}</option>
                  </select>
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                <div class="relative">
                  <select v-model="year"
                    class="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-9 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-colors cursor-pointer"
                    :class="{ 'border-red-500 focus:border-red-500': errors.period }">
                    <option value="" disabled>Year</option>
                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                  </select>
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>
              <transition name="ar-err">
                <p v-if="errors.period" class="text-xs text-red-600 mt-1.5">{{ errors.period }}</p>
              </transition>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-xs font-semibold text-slate-900 mb-1.5" for="status">Status</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="opt in statusOptions" :key="opt.value"
                  class="flex items-center gap-1.5 border border-slate-200 rounded-lg py-1.5 px-3 text-sm font-medium cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50"
                  :class="{ 'border-blue-500 bg-blue-50 text-blue-600': form.status === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.status" hidden />
                  <span class="w-2 h-2 rounded-full" :class="opt.dotClass"></span>
                  {{ opt.label }}
                </label>
              </div>
            </div>

          </div>
        </div>

        <!-- Section B: Summary of Activities -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div class="flex items-center gap-2.5 py-2.5 px-4 border-b border-slate-200 bg-green-50">
            <span
              class="w-7 h-7 rounded-md flex items-center justify-center font-display text-sm font-bold text-white bg-green-600 shrink-0">B</span>
            <h2 class="font-display text-sm font-bold">Summary of Activities</h2>
          </div>
          <div class="p-5">
            <div class="flex gap-2 mb-3">
              <textarea v-model="newSummaryActivity" placeholder="Describe an activity..."
                class="flex-1 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-colors resize-none"
                rows="2" maxlength="1000" @keydown.enter.exact.prevent="addSummaryActivity"></textarea>
              <button type="button"
                class="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all active:translate-y-px hover:bg-blue-700"
                @click="addSummaryActivity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add
              </button>
            </div>
            <transition-group name="ar-list" tag="ul" class="space-y-1.5">
              <li v-for="(activity, idx) in summaryActivities" :key="'sa-' + idx"
                class="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm">
                <span class="font-display font-bold text-xs py-0.5 px-2 rounded-md text-white bg-green-600 shrink-0">B{{
                  idx + 1 }}</span>
                <span class="flex-1 text-slate-900">{{ activity }}</span>
                <button type="button"
                  class="p-1 rounded-md text-slate-500 transition-colors hover:text-red-600 hover:bg-red-100"
                  @click="removeSummaryActivity(idx)" title="Remove">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </li>
            </transition-group>
            <p v-if="summaryActivities.length === 0" class="text-xs text-slate-500 italic mt-2">No activities added yet.
              Use the field above to add one.</p>
          </div>
        </div>

        <!-- Section C: Key Outcomes -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div class="flex items-center gap-2.5 py-2.5 px-4 border-b border-slate-200 bg-amber-50">
            <span
              class="w-7 h-7 rounded-md flex items-center justify-center font-display text-sm font-bold text-white bg-amber-600 shrink-0">C</span>
            <h2 class="font-display text-sm font-bold">Key Outcomes</h2>
          </div>
          <div class="p-5">
            <div class="flex gap-2 mb-3">
              <textarea v-model="newKeyOutcome" placeholder="Describe a key outcome..."
                class="flex-1 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-colors resize-none"
                rows="2" maxlength="1000" @keydown.enter.exact.prevent="addKeyOutcome"></textarea>
                <button type="button"
                  class="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all active:translate-y-px hover:bg-blue-700"
                  @click="addKeyOutcome">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add
                </button>
            </div>
            <transition-group name="ar-list" tag="ul" class="space-y-1.5">
              <li v-for="(outcome, idx) in keyOutcomes" :key="'ko-' + idx"
                class="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm">
                <span class="font-display font-bold text-xs py-0.5 px-2 rounded-md text-white bg-amber-600 shrink-0">C{{
                  idx + 1 }}</span>
                <span class="flex-1 text-slate-900">{{ outcome }}</span>
                <button type="button"
                  class="p-1 rounded-md text-slate-500 transition-colors hover:text-red-600 hover:bg-red-100"
                  @click="removeKeyOutcome(idx)" title="Remove">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </li>
            </transition-group>
            <p v-if="keyOutcomes.length === 0" class="text-xs text-slate-500 italic mt-2">No key outcomes added yet. Use
              the field above to add one.</p>
          </div>
        </div>

        <!-- Section D: Engagement Activities -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div
            class="flex flex-wrap items-center justify-between gap-2 py-2.5 px-4 border-b border-slate-200 bg-orange-50">
            <div class="flex items-center gap-2.5">
              <span
                class="w-7 h-7 rounded-md flex items-center justify-center font-display text-sm font-bold text-white bg-orange-600 shrink-0">D</span>
              <h2 class="font-display text-sm font-bold">Engagement Activities</h2>
            </div>
            <button type="button"
              class="inline-flex items-center gap-1.5 bg-orange-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-all disabled:opacity-55 disabled:cursor-not-allowed hover:bg-orange-700"
              :disabled="loadingEngagement || !canFetchEngagement" @click="fetchEngagementActivities"
              :title="!canFetchEngagement ? 'Select a team and period first' : 'Fetch activities'">
              <span v-if="loadingEngagement"
                class="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {{ loadingEngagement ? 'Loading...' : 'Load Activities' }}
            </button>
          </div>

          <div v-if="!canFetchEngagement && engagementActivities.length === 0" class="p-5">
            <div
              class="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-lg py-3 px-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Select a team and reporting period first, then click <strong class="mx-0.5">Load Activities</strong>.
            </div>
          </div>

          <div v-else class="p-5">
            <div v-if="loadingEngagement" class="flex flex-col items-center gap-2 py-8 text-slate-500 text-sm">
              <span
                class="inline-block w-7 h-7 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin"></span>
              <p>Fetching engagement activities...</p>
            </div>

            <div v-else-if="engagementError"
              class="flex items-start gap-2 text-xs rounded-lg py-3 px-4 bg-red-50 text-red-800 border border-red-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {{ engagementError }}
            </div>

            <p v-else-if="engagementActivities.length === 0" class="text-xs text-slate-500 italic">
              No engagement activities found for the selected period.
            </p>

            <div v-else class="space-y-3">
              <div v-for="(group, gIdx) in engagementGroups" :key="group.taskId ?? gIdx"
                class="border border-slate-200 rounded-lg overflow-hidden">
                <!-- Task header -->
                <div v-if="group.task"
                  class="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100 py-2.5 px-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span
                      class="text-[0.65rem] font-bold tracking-wide uppercase bg-orange-600 text-white py-0.5 px-2 rounded-full">D{{
                        gIdx + 1 }}.
                      {{ group.task.type }}</span>
                    <span class="text-[0.7rem] text-slate-500 ml-auto">Due: {{ formatDate(group.task.date) }}</span>
                  </div>
                  <p class="text-xs text-amber-800 font-medium leading-relaxed">{{ group.task.description }}</p>
                </div>

                <!-- Outputs under this task -->
                <transition-group name="ar-list" tag="ul" class="space-y-2 py-2.5 px-3">
                  <li v-for="(activity, oIdx) in group.outputs" :key="activity.id"
                    class="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        class="font-display font-bold text-xs py-0.5 px-2 rounded-md text-white bg-orange-600 shrink-0">D
                        {{ gIdx + 1 }}.{{ oIdx + 1 }}</span>
                      <span class="text-[0.65rem] font-bold uppercase tracking-wide py-0.5 px-2 rounded-full"
                        :class="activity.status === '1' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'">
                        {{ activity.status === '1' ? 'Completed' : 'Pending' }}
                      </span>
                      <span class="text-[0.7rem] text-slate-500 ml-auto">{{ formatDate(activity.date) }}</span>
                    </div>
                    <p class="text-sm text-slate-900 mb-2">{{ activity.output }}</p>
                  </li>
                </transition-group>
              </div>
            </div>
          </div>
        </div>

        <!-- Global error -->
        <transition name="ar-err">
          <div v-if="serverError"
            class="flex items-start gap-2 text-sm rounded-lg py-3 px-4 bg-red-50 text-red-800 border border-red-200 -mt-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ serverError }}
          </div>
        </transition>

        <!-- Actions -->
        <div class="flex flex-wrap gap-2 pt-2">
          <button type="submit"
            class="inline-flex items-center gap-1.5 bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-all disabled:opacity-55 disabled:cursor-not-allowed hover:shadow-lg active:translate-y-px"
            :disabled="loading">
            <span v-if="loading"
              class="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {{ loading ? 'Saving…' : 'Create Report' }}
          </button>

          <button type="button"
            class="inline-flex items-center gap-1.5 bg-white text-slate-900 text-sm font-semibold py-2 px-4 rounded-lg border border-slate-200 transition-colors hover:bg-slate-50"
            @click="handleViewReport">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Report
          </button>

          <button type="button"
            class="inline-flex items-center gap-1.5 bg-cyan-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-cyan-800"
            @click="handleViewPDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View PDF
          </button>

          <button type="button"
            class="inline-flex items-center gap-1.5 bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-70 hover:bg-green-700"
            @click="handleApprove" :disabled="form.status === 2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {{ form.status === 2 ? 'Approved' : 'Approve Draft' }}
          </button>

          <button type="button"
            class="inline-flex items-center gap-1.5 bg-transparent text-slate-500 text-sm font-semibold py-2 px-4 rounded-lg border border-slate-200 transition-colors hover:text-red-600 hover:border-red-600"
            @click="handleCancel">
            Cancel
          </button>
        </div>

      </form>
    </div>


  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
// import { api } from '@/utils/api' // adjust to your actual api import
import ReportView from '@/components/customer_success_manager/ReportView.vue'
import ReportPDF from '@/components/customer_success_manager/ReportPDF.vue'

const router = useRouter()
const authStore = useAuthStore()

// ─── State ────────────────────────────────────────────────────────────────────
const loading = ref(false)
const loadingEngagement = ref(false)
const errors = ref({})
const serverError = ref('')
const engagementError = ref('')
const successTeams = ref([])
import Swal from 'sweetalert2'
import { watch } from 'vue'


// Modal visibility
const showReportView = ref(false)
const showReportPDF = ref(false)

const form = ref({
  success_team_id: authStore.team_id ?? '',
  status: 0,
  summary_activities: [],
  key_outcomes: [],
})

const month = ref('')
const year = ref('')

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

const statusOptions = [
  { value: 0, label: 'Draft', dotClass: 'bg-slate-500' },
  { value: 2, label: 'Pre-Approved', dotClass: 'bg-blue-600' },
  { value: 1, label: 'Approved', dotClass: 'bg-green-600' },
]

// ─── Computed ─────────────────────────────────────────────────────────────────
const period = computed(() => {
  if (!month.value || !year.value) return ''
  return `${months[month.value - 1]}-${year.value}`
})

const statusLabel = computed(() => statusOptions.find(o => o.value === form.value.status)?.label ?? 'Draft')
const statusClass = computed(() => ({
  'bg-white/20 text-white': true,
  'bg-green-600/30': form.value.status === 2,
  'bg-blue-600/30': form.value.status === 1,
}))

const canFetchEngagement = computed(
  () => !!form.value.success_team_id && !!month.value && !!year.value
)

// ─── Report data shape shared by ReportView & ReportPDF ───────────────────────
const reportData = computed(() => ({
  teamName: successTeams.value.find(t => t.id === form.value.success_team_id)?.name ?? '',
  period: period.value,
  status: form.value.status,
  summaryActivities: summaryActivities.value,
  keyOutcomes: keyOutcomes.value,
  engagementGroups: engagementGroups.value,
}))

// ─── Summary Activities ───────────────────────────────────────────────────────
const newSummaryActivity = ref('')
const summaryActivities = ref([])

const addSummaryActivity = () => {
  const text = newSummaryActivity.value.trim()
  if (!text) return
  summaryActivities.value.push(text)
  newSummaryActivity.value = ''
  form.value.summary_activities = [...summaryActivities.value]
}

const removeSummaryActivity = (index) => {
  summaryActivities.value.splice(index, 1)
  form.value.summary_activities = [...summaryActivities.value]
}

// ─── Key Outcomes ─────────────────────────────────────────────────────────────
const newKeyOutcome = ref('')
const keyOutcomes = ref([])

const addKeyOutcome = () => {
  const text = newKeyOutcome.value.trim()
  if (!text) return
  keyOutcomes.value.push(text)
  newKeyOutcome.value = ''
  form.value.key_outcomes = [...keyOutcomes.value]
}

const removeKeyOutcome = (index) => {
  keyOutcomes.value.splice(index, 1)
  form.value.key_outcomes = [...keyOutcomes.value]
}

// ─── Engagement Activities ────────────────────────────────────────────────────
// Raw grouped response: { "4": [...outputs], "5": [...outputs] }
const engagementGroups = ref([])   // [{ taskId, task, outputs: [] }]
const engagementActivities = ref([]) // flat list for legacy .length checks

const padMonth = (m) => String(m).padStart(2, '0')

const fetchEngagementActivities = async () => {
  if (!canFetchEngagement.value) return

  loadingEngagement.value = true
  engagementError.value = ''

  const m = padMonth(month.value)
  const startDate = `${year.value}-${m}-01`
  const lastDay = new Date(year.value, month.value, 0).getDate()
  const endDate = `${year.value}-${m}-${String(lastDay).padStart(2, '0')}`

  try {
    const response = await api().get(
      `/task-outputs-by-team-and-date-range/${form.value.success_team_id}`,
      { params: { start_date: startDate, end_date: endDate } }
    )

    // Response shape: { "4": [...], "5": [...] }  (keyed by task_id)
    const raw = response.data?.data ?? response.data ?? {}

    if (Array.isArray(raw)) {
      // Fallback: already a flat array
      engagementActivities.value = raw
      engagementGroups.value = raw.length
        ? [{ taskId: null, task: raw[0]?.success_team_task ?? null, outputs: raw }]
        : []
    } else {
      // Grouped object — convert to array of groups
      const groups = Object.entries(raw).map(([taskId, outputs]) => ({
        taskId,
        task: outputs[0]?.success_team_task ?? null,
        outputs,
      }))
      engagementGroups.value = groups
      engagementActivities.value = groups.flatMap(g => g.outputs)
    }
  } catch (error) {
    console.error('Failed to fetch engagement activities:', error)
    engagementError.value = error.response?.data?.message ?? 'Failed to load engagement activities. Please try again.'
    engagementActivities.value = []
    engagementGroups.value = []
  } finally {
    loadingEngagement.value = false
  }
}

// Running D-index counter — globally sequential across groups
// Called from template: globalIndex(groupIndex, outputIndex)
const globalIndex = computed(() => {
  // Build a lookup: [gIdx][oIdx] -> sequential number
  const lookup = []
  let counter = 1
  for (let g = 0; g < engagementGroups.value.length; g++) {
    lookup[g] = []
    for (let o = 0; o < engagementGroups.value[g].outputs.length; o++) {
      lookup[g][o] = counter++
    }
  }
  return (gIdx, oIdx) => lookup[gIdx]?.[oIdx] ?? '?'
})

// ─── Format helpers ───────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const { data } = await api().get('/my-success-team')
    successTeams.value = data?.data?.data ?? data?.data ?? []
  } catch (e) {
    console.error('Failed to fetch success teams:', e)
    successTeams.value = []
  }
})

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = () => {
  const errs = {}
  if (!form.value.success_team_id) errs.success_team_id = 'Please select a success team.'
  if (!month.value || !year.value) errs.period = 'Please select both month and year.'
  errors.value = errs
  return Object.keys(errs).length === 0
}

// ─── Submit ───────────────────────────────────────────────────────────────────
const submit = async () => {
  serverError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    const payload = {
      success_team_id: form.value.success_team_id,
      period: period.value,
      status: form.value.status,
      summary_activities: form.value.summary_activities,
      key_outcomes: form.value.key_outcomes,
    }
    await api().post('/success-team-activity-reports', payload)
    window.$toast?.success('Activity report created successfully.')
    router.back()
  } catch (e) {
    if (e.response?.status === 422) {
      errors.value = e.response.data.errors ?? {}
      serverError.value = e.response.data.message ?? 'Validation failed. Please review the fields above.'
    } else {
      serverError.value = e.response?.data?.message ?? 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// ─── Action Handlers ──────────────────────────────────────────────────────────
const handleViewReport = () => {
  showReportView.value = true
}

const handleViewPDF = () => {
  showReportPDF.value = true
}

const handleApprove = async () => {
  if (form.value.status === 2) return
  if (!confirm('Are you sure you want to approve this draft?')) return
  form.value.status = 2
  window.$toast?.success('Report marked as Approved.')
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
/* Only keep animations that Tailwind doesn't provide */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ar-list-enter-active,
.ar-list-leave-active {
  transition: all 0.2s ease;
}

.ar-list-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.ar-list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.ar-err-enter-active,
.ar-err-leave-active {
  transition: all 0.2s ease;
}

.ar-err-enter-from,
.ar-err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
