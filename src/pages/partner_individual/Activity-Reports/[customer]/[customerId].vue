<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns'
import api from '@/config/api'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const route = useRoute()
const loading = ref(false)
const selectedMonth = ref('')
const activities = ref([])

const customerName = computed(() => decodeURIComponent(route.params.customer || 'Client'))

const selectedMonthLabel = computed(() => {
  if (!selectedMonth.value) return ''
  const date = parseISO(selectedMonth.value + '-01')
  return format(date, 'MMMM yyyy')
})

const groupedActivities = computed(() => {
  const summary = []
  const outcomes = []

  activities.value.forEach(item => {
    const type = (item.type || '').toLowerCase()
    if (type.includes('outcome')) {
      outcomes.push(item)
    } else {
      summary.push(item)
    }
  })

  const sortByDate = arr => [...arr].sort((a, b) => new Date(a.date) - new Date(b.date))

  return [
    { label: 'Summary of Activities', items: sortByDate(summary), accent: '#334155' },
    { label: 'Key Outcomes & Achievements', items: sortByDate(outcomes), accent: '#0f766e' }
  ].filter(g => g.items.length > 0)
})

const hasActivities = computed(() => groupedActivities.value.length > 0)

const downloadPDF = () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 2
  })

  // ────────────────────────────────────────────────
  //  Configuration
  // ────────────────────────────────────────────────
  const margin = { top: 22, right: 18, bottom: 22, left: 18 }
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin.left - margin.right

  const colors = {
    primary: [15, 23, 42],      // slate-900
    secondary: [71, 85, 105],   // slate-600
    muted: [148, 163, 184],     // slate-400
    line: [226, 232, 240],      // slate-200
    outcome: [16, 185, 129],    // emerald-500
    summary: [59, 130, 246]     // blue-500 light
  }

  let y = margin.top

  // ────────────────────────────────────────────────
  //  Header
  // ────────────────────────────────────────────────
  // Optional: Logo (uncomment and adjust path if you have one)
  // doc.addImage(logoBase64, 'PNG', margin.left, y - 4, 35, 10)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(21)
  doc.setTextColor(...colors.primary)
  doc.text('Executive Activity Report', margin.left, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...colors.secondary)
  doc.text(`Client: ${customerName.value}`, margin.left, y)
  doc.text(`Reporting Period: ${selectedMonthLabel.value}`, margin.left + 90, y, { align: 'left' })
  y += 10

  doc.setFontSize(9.5)
  doc.setTextColor(...colors.muted)
  doc.text(`Generated on ${format(new Date(), 'PPP')} • HTSS Digital`, margin.left, y)
  y += 12

  // Divider
  doc.setDrawColor(...colors.line)
  doc.setLineWidth(0.5)
  doc.line(margin.left, y, pageWidth - margin.right, y)
  y += 14

  // ────────────────────────────────────────────────
  //  Sections
  // ────────────────────────────────────────────────
  groupedActivities.value.forEach((group, index) => {
    if (index > 0) y += 14

    // Section heading
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...(group.label.includes('Outcome') ? colors.outcome : colors.summary))
    doc.text(`${index + 1}. ${group.label}`, margin.left, y)
    y += 10

    // Prepare clean text rows
    const body = group.items.map(item => {
      let text = item.activity
        .replace(/<[^>]+>/g, ' ')     // strip tags
        .replace(/\s+/g, ' ')         // normalize whitespace
        .trim()

      // Very basic bullet detection → we can improve this later
      if (text.startsWith('• ') || text.startsWith('- ') || text.match(/^\d+\.\s/)) {
        text = '  ' + text
      }

      return [text]
    })

    autoTable(doc, {
      startY: y,
      head: [],
      body,
      theme: 'plain',
      margin: { left: margin.left, right: margin.right },
      styles: {
        fontSize: 10.2,
        cellPadding: { top: 3.2, right: 2, bottom: 3.8, left: 0 },
        textColor: [51, 65, 85],
        lineColor: [241, 245, 249],
        lineWidth: 0.15,
        overflow: 'linebreak',
        font: 'helvetica'
      },
      columnStyles: {
        0: { cellWidth: contentWidth }
      },
      didParseCell(data) {
        // Slight indent for detected list items
        if (data.cell.text[0]?.startsWith('  ')) {
          data.cell.styles.cellPadding.left = 8
        }
      },
      didDrawPage: (data) => {
        y = data.cursor.y
      }
    })

    y = doc.lastAutoTable.finalY + 10
  })

  // ────────────────────────────────────────────────
  //  Footer on every page
  // ────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages()

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8.5)
    doc.setTextColor(...colors.muted)
    doc.setFont('helvetica', 'normal')

    // Left
    doc.text('Confidential – For internal use only', margin.left, 290)

    // Center
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 290, { align: 'center' })

    // Right
    doc.text('HTSS Digital  •  support@htss.digital', pageWidth - margin.right, 290, { align: 'right' })
  }

  // ────────────────────────────────────────────────
  //  Save
  // ────────────────────────────────────────────────
  const filename = `${customerName.value.replace(/[^a-z0-9]/gi, '_')}_Activity_${selectedMonth.value}.pdf`
  doc.save(filename)
}
const fetchReport = async () => {
  if (!selectedMonth.value) return
  loading.value = true
  try {
    const date = parseISO(selectedMonth.value + '-01')
    const res = await api().get(`/companies/${route.params.customerId}/csm-reports`, {
      params: {
        start_date: format(startOfMonth(date), 'yyyy-MM-dd'),
        end_date: format(endOfMonth(date), 'yyyy-MM-dd')
      }
    })
    activities.value = res.data.data || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(selectedMonth, fetchReport, { immediate: true })
onMounted(() => {
  if (!selectedMonth.value) {
    selectedMonth.value = format(new Date(), 'yyyy-MM')
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50/70 py-10 px-10 sm:px-8 lg:px-12 font-sans">
    <div class="">

      <!-- Header + controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Activity Report
          </h1>
          <p class="mt-2 text-slate-600 font-medium">
            Monthly performance overview • {{ customerName }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <input
            type="month"
            v-model="selectedMonth"
            class="bg-transparent text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 rounded px-2 py-1.5 min-w-[140px]"
          />
          <button
            @click="downloadPDF"
            :disabled="loading || !hasActivities"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-lg shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-97"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden">
        <!-- Subtle top accent -->
        <div class="h-1.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800"></div>

        <div class="p-8 lg:p-10">
          <!-- Loading -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-24">
            <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mb-4"></div>
            <p class="text-slate-500 font-medium">Loading report...</p>
          </div>

          <!-- No data -->
          <div v-else-if="!hasActivities" class="py-24 text-center">
            <div class="inline-block p-8 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-lg text-slate-500 font-medium">
                No activities recorded for <strong>{{ selectedMonthLabel }}</strong>
              </p>
            </div>
          </div>

          <!-- Content -->
          <div v-else class="space-y-16">
            <section v-for="group in groupedActivities" :key="group.label">
              <h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-5 flex items-center gap-4">
                {{ group.label }}
                <div class="flex-grow h-px bg-slate-100"></div>
              </h2>

              <div class="prose prose-slate max-w-none text-[15.2px] leading-relaxed">
                <div
                  v-for="(item, index) in group.items"
                  :key="index"
                  class="py-3.5 border-b border-slate-100 last:border-0"
                  v-html="item.activity"
                />
              </div>
            </section>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-8 py-5 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-500 font-medium flex justify-between items-center">
          <span>High-Tech Softsys</span>
          <span>Confidential • {{ customerName }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Better HTML content handling */
:deep(p) {
  margin: 0.4em 0;
}
:deep(ul), :deep(ol) {
  margin: 0.6em 0 0.6em 1.4em;
  padding-left: 0;
}
:deep(li) {
  margin-bottom: 0.35em;
}
:deep(strong) {
  color: #0f172a;
  font-weight: 600;
}
:deep(h1), :deep(h2), :deep(h3) {
  color: #1e293b;
  margin: 1.1em 0 0.55em;
}
</style>
