<template>
  <div class="fixed inset-0 z-[9999] bg-slate-900/65 backdrop-blur-sm flex flex-col items-center overflow-y-auto" @click.self="$emit('close')">
    <div class="w-full max-w-[820px] flex flex-col min-h-full">

      <!-- Toolbar -->
      <div class="sticky top-0 z-10 bg-slate-800 text-white flex items-center justify-between py-3 px-6 gap-4 font-sans text-sm font-semibold shadow-lg">
        <div class="flex items-center gap-2.5 opacity-90">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span class="tracking-wide">PDF Preview</span>
        </div>
        <div class="flex items-center gap-3">
          <button 
            class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200" 
            @click="downloadPDF"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </button>
          <button 
            class="bg-white/10 hover:bg-white/20 text-white rounded-lg w-9 h-9 flex items-center justify-center transition-all duration-200" 
            @click="$emit('close')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- PDF Content Area -->
      <div class="bg-gray-100 flex-1 min-h-[600px] overflow-auto p-4">
        <div id="pdf-content" class="pdf-page max-w-[820px] mx-auto">
          <!-- Page Header -->
          <div class="pdf-page-header">
            <div class="pdf-letterhead">
              <div class="pdf-company-logo">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div class="flex flex-col leading-tight font-sans font-bold text-center">
                      <!-- <span class="text-sm text-blue-600">Hi-Tech</span>
                      <span class="text-xs text-red-600">SoftSys</span> -->
                       <img
                        src="/src/assets/images/HHi-tech_softsys_Logo_Black.png"
                         alt="Hi-Tech SoftSys"
                        class="w-10 h-10" />
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-2xl font-bold text-blue-600 leading-tight">Hi-Tech</span>
                    <span class="text-xl font-bold text-red-600 leading-tight">SoftSys</span>
                  </div>
                </div>
              </div>
              <div class="pdf-company-address">
                850 Central Pkwy E, Suite 248, Plano TX 75075<br>
                WWW.hitechsoftsys.net
              </div>
            </div>
            <div class="pdf-header-rule"></div>
          </div>

          <!-- Report Title -->
          <div class="pdf-report-title-block">
            <h1 class="pdf-report-title">Monthly Activity Report</h1>
            <p class="pdf-report-period">Period: {{ periodFull }}</p>
          </div>

          <!-- Section A: Summary of Activities -->
          <section class="pdf-section" v-if="report.summaryActivities?.length">
            <h2 class="pdf-section-title">A. Summary of Activities</h2>
            <div v-for="(item, idx) in report.summaryActivities" :key="idx" class="pdf-list-item">
              <span class="pdf-item-num">A{{ idx + 1 }}.</span>
              <span class="pdf-item-text">{{ item }}</span>
            </div>
          </section>

          <!-- Section B: Key Outcomes -->
          <section class="pdf-section" v-if="report.keyOutcomes?.length">
            <h2 class="pdf-section-title">B. Key Outcomes</h2>
            <div v-for="(item, idx) in report.keyOutcomes" :key="idx" class="pdf-list-item">
              <span class="pdf-item-num">B{{ idx + 1 }}.</span>
              <span class="pdf-item-text">{{ item }}</span>
            </div>
          </section>

          <!-- Section C: Engagement Activities -->
          <section class="pdf-section" v-if="report.engagementGroups?.length">
            <h2 class="pdf-section-title">C. Engagement Activities</h2>
            <template v-for="(group, gIdx) in report.engagementGroups" :key="group.taskId ?? gIdx">
              <div v-if="group.task" class="pdf-task-context">
                <em>C{{ gIdx+1 }}): {{ group.task.description }}</em>
              </div>
              <div v-for="(output, oIdx) in group.outputs" :key="output.id" class="pdf-list-item">
                <span class="pdf-item-num">C{{ gIdx+1 }}.{{ oIdx+1 }}.</span>
                <span class="pdf-item-text">
                  {{ output.output }}
                  <span class="pdf-output-meta"> — {{ output.status === '1' ? 'Completed' : 'Pending' }}, {{ formatDate(output.date) }}</span>
                </span>
              </div>
            </template>
          </section>

          <!-- Page Footer -->
          <div class="pdf-page-footer">
            <div class="pdf-footer-rule"></div>
            <div class="pdf-footer-inner">
              <span class="pdf-page-num">Page 1 of 1</span>
              <span class="pdf-footer-address">850 Central Pkwy E, Suite 248, Plano TX 75075 &bull; WWW.hitechsoftsys.net</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isGenerating" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
        <div class="bg-white rounded-lg p-6 text-center">
          <div class="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-700">Generating PDF...</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})
defineEmits(['close'])

const isGenerating = ref(false)

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Build period string
const periodFull = computed(() => {
  if (!props.report.period) return '—'
  const parts = props.report.period.split('-')
  if (parts.length < 2) return props.report.period

  let monthName, year
  if (isNaN(parts[0])) {
    monthName = parts[0]
    year = parts[1]
  } else {
    year = parts[0]
    monthName = months[parseInt(parts[1]) - 1] ?? parts[1]
  }

  const monthIdx = months.indexOf(monthName)
  const lastDay = monthIdx >= 0 ? new Date(parseInt(year), monthIdx + 1, 0).getDate() : 30
  return `${monthName} 1, ${year} to ${monthName} ${lastDay}, ${year}`
})

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
  } catch {
    return dateStr
  }
}

// Generate PDF by capturing the div content
const generatePDFFromDiv = async () => {
  const element = document.getElementById('pdf-content')
  if (!element) return

  isGenerating.value = true

  try {
    // Create a clone of the element to avoid modifying the original
    const cloneElement = element.cloneNode(true)
    cloneElement.style.transform = 'none'
    cloneElement.style.position = 'absolute'
    cloneElement.style.top = '-9999px'
    cloneElement.style.left = '-9999px'
    document.body.appendChild(cloneElement)

    // Capture the cloned element as canvas
    const canvas = await html2canvas(cloneElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc, element) => {
        // Fix any potential color issues in the cloned document
        const allElements = clonedDoc.querySelectorAll('*')
        allElements.forEach(el => {
          // Remove any problematic CSS variables
          const computedStyle = window.getComputedStyle(el)
          if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
            el.style.backgroundColor = '#ffffff'
          }
        })
      }
    })

    // Remove the clone
    document.body.removeChild(cloneElement)

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    })

    // Add first page
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add subsequent pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      doc.addPage()
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    return doc
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  } finally {
    isGenerating.value = false
  }
}

// Download PDF
const downloadPDF = async () => {
  try {
    const doc = await generatePDFFromDiv()
    const teamName = props.report.teamName?.replace(/[^a-z0-9]/gi, '_') || 'Activity_Report'
    const period = props.report.period?.replace(/[^a-z0-9]/gi, '_') || 'monthly'
    doc.save(`${teamName}_${period}_Activity_Report.pdf`)
  } catch (error) {
    console.error('Failed to download PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Source+Serif+4:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 0.65s linear infinite;
}

/* PDF Page Styles - Using only RGB/RGBA colors */
.pdf-page {
  background: #ffffff;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 3rem 2rem;
  box-shadow: 0 0 40px rgba(0,0,0,0.25);
  font-family: 'Source Serif 4', 'Times New Roman', serif;
  font-size: 10.5pt;
  color: #111111;
  line-height: 1.6;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
}

/* Letterhead */
.pdf-page-header { margin-bottom: 0.75rem; }
.pdf-letterhead  { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.5rem; }
.pdf-company-logo { display: flex; align-items: center; }
.pdf-company-address {
  font-family: 'DM Sans', sans-serif;
  font-size: 8pt;
  color: #555555;
  text-align: right;
  line-height: 1.5;
}
.pdf-header-rule { border: none; border-top: 2.5px solid #c0392b; margin: 0; }

/* Title Block */
.pdf-report-title-block { text-align: center; margin: 1.25rem 0 1rem; }
.pdf-report-title {
  font-family: 'Source Serif 4', serif;
  font-size: 16pt;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: #111111;
}
.pdf-report-period { font-size: 10pt; color: #333333; margin: 0; }

/* Sections */
.pdf-section { margin-bottom: 1.25rem; }
.pdf-section-title {
  font-family: 'Source Serif 4', serif;
  font-size: 11.5pt;
  font-weight: 700;
  margin: 0 0 0.55rem;
  color: #111111;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.25rem;
}

/* List items */
.pdf-list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}
.pdf-item-num {
  font-weight: 700;
  font-size: 10.5pt;
  min-width: 28px;
  color: #222222;
  flex-shrink: 0;
}
.pdf-item-text { flex: 1; text-align: justify; }
.pdf-output-meta { font-size: 9pt; color: #666666; font-style: italic; }

/* Task context */
.pdf-task-context {
  font-size: 9pt;
  color: #555555;
  font-style: italic;
  margin: 0.2rem 0 0.4rem 0.5rem;
  padding: 0.3rem 0.6rem;
  border-left: 3px solid #fca5a5;
  background: #fff5f5;
  border-radius: 0 4px 4px 0;
}

/* Footer */
.pdf-page-footer { margin-top: auto; padding-top: 1rem; }
.pdf-footer-rule { border: none; border-top: 1px solid #bbbbbb; margin-bottom: 0.35rem; }
.pdf-footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 8pt;
  color: #555555;
}
.pdf-page-num { font-weight: 600; }
.pdf-footer-address { text-align: center; }
</style>