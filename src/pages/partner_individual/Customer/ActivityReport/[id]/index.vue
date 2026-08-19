<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    
    <!-- Main Container -->
    <div class="max-w-6xl mx-auto">
      
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-3 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                Activity Report
              </h1>
            </div>
            <p class="text-gray-600 text-sm md:text-base">
              Detailed view of individual customer activity and interactions
            </p>
          </div>
          
          <!-- Export PDF Button - Fixed with v-if -->
          <button
            v-if="activity"
            @click="downloadPDF"
            class="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span class="font-medium">Export PDF</span>
          </button>
        </div>
        
        <!-- In your template, update the status badge part: -->
<!-- Status Badge -->
<div v-if="activity" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-full">
  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
  <span class="text-sm font-medium text-green-700">
    Report #{{ activity.id }} • {{ getReportStatus(activity.date) }}
  </span>
</div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Column - Activity Details -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Activity Card -->
          <div v-if="activity" class="group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div class="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300">
              
              <!-- Card Header -->
              <div class="px-6 pt-6 pb-4 border-b border-gray-100">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <span class="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700">
                      {{ activity.type }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-500">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {{ formatDate(activity.date) }}
                  </div>
                </div>
                <h2 class="text-xl font-bold text-gray-900">
                  Activity Details
                </h2>
              </div>
              
              <!-- Card Body -->
              <div class="p-6">
                
                <!-- Activity Description -->
                <div class="mb-8">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-700">Description</h3>
                  </div>
                  <div class="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-5 border border-gray-100">
                    <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                      {{ activity.activity }}
                    </p>
                  </div>
                </div>
                
                <!-- Grid Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-4">
                    <!-- Customer Info -->
                    <div class="p-4 bg-gradient-to-br from-gray-50 to-indigo-50/20 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                      <p class="text-xs font-medium text-gray-500 mb-1">Customer</p>
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {{ activity.customer_id.toString().slice(0, 2) }}
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">Name: {{ route?.query.name }}</p>
                          <p class="text-xs text-gray-500">Customer profile</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Type Details -->
                    <div class="p-4 bg-gradient-to-br from-gray-50 to-blue-50/20 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                      <p class="text-xs font-medium text-gray-500 mb-1">Activity Type</p>
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">{{ activity.type }}</p>
                          <p class="text-xs text-gray-500">Interaction category</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <!-- User Info -->
                    <div class="p-4 bg-gradient-to-br from-gray-50 to-emerald-50/20 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                      <p class="text-xs font-medium text-gray-500 mb-1">Performed By</p>
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {{ activity.user_id.toString().slice(0, 1) }}
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">User ID: {{ activity.user_id }}</p>
                          <!-- <p class="font-semibold text-gray-900">Manager Name: {{ route.query.name }}</p> -->
                          <p class="text-xs text-gray-500">Team member</p>
                        </div>
                      </div>
                    </div>
                    
                   <!-- Date Info -->
<div class="p-4 bg-gradient-to-br from-gray-50 to-amber-50/20 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors">
  <p class="text-xs font-medium text-gray-500 mb-1">Activity Date</p>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
      <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
    <div>
      <p class="font-semibold text-gray-900">{{ formatDateShort(activity.date) }}</p>
      <p class="text-xs text-gray-500">{{ getReportStatus(activity.date) }}</p>
    </div>
  </div>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-else class="flex flex-col items-center justify-center py-16 space-y-4">
            <div class="relative">
              <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p class="text-gray-500 font-medium">Loading activity report...</p>
            <p class="text-sm text-gray-400">Fetching the latest details</p>
          </div>
        </div>
        
        <!-- Right Column - Summary -->
        <div>
          <!-- Report Summary -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
            <div class="px-5 pt-5 pb-3 border-b border-gray-100">
              <h3 class="font-bold text-gray-900">Report Summary</h3>
            </div>
            <div class="p-5 space-y-4" v-if="activity">
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Report ID</span>
                <span class="font-mono font-bold text-gray-900">#{{ activity.id }}</span>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Status</span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  Completed
                </span>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Created</span>
                <span class="font-medium text-gray-900">{{ formatDate(activity.date) }}</span>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Customer ID</span>
                <span class="font-medium text-gray-900">{{ activity.customer_id }}</span>
              </div>
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">User ID</span>
                <span class="font-medium text-gray-900">{{ activity.user_id }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-gray-600">Activity Type</span>
                <span class="font-medium text-blue-600">{{ activity.type }}</span>
              </div>
            </div>
            <div v-else class="p-5">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <!-- PDF Export Card -->
          <div v-if="activity" class="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div class="p-5">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Export Report</h4>
                  <p class="text-sm text-gray-600">Download as PDF document</p>
                </div>
              </div>
              <button
                @click="downloadPDF"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span class="font-semibold">Download PDF</span>
              </button>
              <p class="text-xs text-gray-500 mt-3 text-center">
                Includes all report details in printable format
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import jsPDF from 'jspdf'

const route = useRoute()
const activity = ref(null)
const isLoading = ref(false)
const successManagers = ref([])

const fetchActivity = async () => {
  try {
    isLoading.value = true
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const res = await api().get('/monthly-csm-activity', {
      params: { id: route.params.id }
    })

    if (res.data.success && res.data.data.length) {
      activity.value = res.data.data[0]
    }
  } catch (error) {
    console.error('Failed to load activity', error)
  } finally {
    isLoading.value = false
  }
}

const fetchSuccessManagers = async () =>{
    try {
        const {data} = await api().get('/customer-success-managers')
        successManagers.value = data.data
    } catch (error) {
        console.error('Failed to load success managers', error)
    }
}

const formatDate = (date) => {
  return moment(date).format('DD MMM YYYY, hh:mm A')
}

const formatDateShort = (date) => {
  return moment(date).format('DD MMM YYYY')
}

const formatRelativeTime = (date) => {
  // Check if date is in the past relative to current time in the data context
  const activityDate = moment(date)
  const now = moment()
  
  // If the date is in the future or very recent, show appropriate relative time
  if (activityDate.isAfter(now)) {
    return activityDate.fromNow() // "in 2 days"
  } else {
    // For past dates, check if it's recent (within 1 year)
    const daysDiff = now.diff(activityDate, 'days')
    if (daysDiff < 365) {
      return activityDate.fromNow() // "2 days ago"
    } else {
      // For older dates, just show the year
      return activityDate.format('YYYY')
    }
  }
}

const getReportStatus = (date) => {
  const activityDate = moment(date)
  const now = moment()
  const daysDiff = now.diff(activityDate, 'days')
  
  if (daysDiff < 7) {
    return 'Recent'
  } else if (daysDiff < 30) {
    return 'This Month'
  } else if (daysDiff < 365) {
    return 'This Year'
  } else {
    return 'Archived'
  }
}

const downloadPDF = () => {
  if (!activity.value) return
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  // Page margins
  const marginLeft = 15
  const marginRight = 15
  const pageWidth = 210
  const contentWidth = pageWidth - marginLeft - marginRight
  let y = 15

  // Add company header with gradient effect (simulated)
  doc.setFillColor(30, 64, 175) // Dark blue
  doc.rect(0, 0, pageWidth, 25, 'F')
  
  // Company logo/text
  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.text('ACTIVITY REPORT', marginLeft, 17)
  
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 255)
  doc.text('Customer Success Management System', marginLeft, 22)
  
  // Current date
  doc.setFontSize(8)
  doc.text(`Generated: ${moment().format('DD MMM YYYY, HH:mm')}`, pageWidth - marginRight - 40, 22, { align: 'right' })
  
  y = 35

  // Main title
  doc.setFontSize(20)
  doc.setTextColor(30, 41, 59) // Slate 800
  doc.setFont('helvetica', 'bold')
  doc.text(`Activity Report #${activity.value.id}`, marginLeft, y)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139) // Slate 500
  doc.setFont('helvetica', 'normal')
  doc.text('Detailed view of individual customer activity and interactions', marginLeft, y + 7)
  
  y += 20

  // Status badge with better date context
  const reportStatus = getReportStatus(activity.value.date)
  const statusColor = reportStatus === 'Recent' ? '#16a34a' : 
                     reportStatus === 'This Month' ? '#2563eb' :
                     reportStatus === 'This Year' ? '#7c3aed' : '#6b7280'
  
  doc.setFillColor(reportStatus === 'Recent' ? '#dcfce7' : 
                   reportStatus === 'This Month' ? '#dbeafe' :
                   reportStatus === 'This Year' ? '#f3e8ff' : '#f3f4f6')
  doc.setDrawColor(reportStatus === 'Recent' ? '#86efac' : 
                   reportStatus === 'This Month' ? '#93c5fd' :
                   reportStatus === 'This Year' ? '#c4b5fd' : '#d1d5db')
  doc.rect(marginLeft, y, 80, 8, 'FD')
  
  doc.setFontSize(8)
  doc.setTextColor(statusColor)
  doc.setFont('helvetica', 'bold')
  
  const dateText = reportStatus === 'Archived' ? 
    `Report #${activity.value.id} • ${moment(activity.value.date).format('YYYY')}` :
    `Report #${activity.value.id} • ${getReportStatus(activity.value.date)}`
  
  doc.text(dateText, marginLeft + 3, y + 5.5)
  
  y += 15

  // Activity Type and Date row
  doc.setFontSize(11)
  doc.setTextColor(71, 85, 105) // Slate 600
  doc.setFont('helvetica', 'bold')
  doc.text('Activity Type:', marginLeft, y)
  
  doc.setFillColor(219, 234, 254) // Blue 100
  doc.setTextColor(29, 78, 216) // Blue 700
  doc.setFont('helvetica', 'normal')
  doc.text(activity.value.type, marginLeft + 25, y)
  
  doc.setFontSize(11)
  doc.setTextColor(71, 85, 105)
  doc.setFont('helvetica', 'bold')
  doc.text('Date:', pageWidth - marginRight - 40, y)
  
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'normal')
  
  // Format date appropriately
  const activityDate = moment(activity.value.date)
  const now = moment()
  const yearsDiff = now.diff(activityDate, 'years')
  
  let dateDisplay
  if (yearsDiff >= 1) {
    // For dates older than 1 year, show full date with year
    dateDisplay = activityDate.format('DD MMMM YYYY')
  } else {
    // For recent dates, show date without year
    dateDisplay = activityDate.format('DD MMMM')
  }
  
  doc.text(dateDisplay, pageWidth - marginRight - 25, y, { align: 'right' })
  
  y += 15

  // Divider line
  doc.setDrawColor(226, 232, 240) // Slate 200
  doc.setLineWidth(0.5)
  doc.line(marginLeft, y, pageWidth - marginRight, y)
  
  y += 10

  // Section: Activity Details
  doc.setFontSize(14)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.text('Activity Details', marginLeft, y)
  
  y += 8

  // Description box
  doc.setFillColor(248, 250, 252) // Slate 50
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(marginLeft, y, contentWidth, 40, 2, 2, 'FD')
  
  doc.setFontSize(11)
  doc.setTextColor(71, 85, 105)
  doc.setFont('helvetica', 'bold')
  doc.text('Description:', marginLeft + 5, y + 7)
  
  doc.setFontSize(10)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'normal')
  const descriptionLines = doc.splitTextToSize(activity.value.activity, contentWidth - 10)
  doc.text(descriptionLines, marginLeft + 5, y + 14)
  
  y += 50

  // Grid Info Section
  doc.setFontSize(12)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.text('Activity Information', marginLeft, y)
  
  y += 10

  // Customer Info Box
  doc.setFillColor(238, 242, 255) // Indigo 50
  doc.setDrawColor(199, 210, 254) // Indigo 200
  doc.roundedRect(marginLeft, y, contentWidth / 2 - 5, 25, 3, 3, 'FD')
  
  doc.setFontSize(10)
  doc.setTextColor(67, 56, 202) // Indigo 600
  doc.setFont('helvetica', 'bold')
  doc.text('Customer', marginLeft + 10, y + 8)
  
  doc.setFontSize(11)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.text(`Name: ${route?.query.name || 'N/A'}`, marginLeft + 10, y + 15)
  
  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'normal')
  doc.text(`ID: ${activity.value.customer_id}`, marginLeft + 10, y + 21)

  // User Info Box
  doc.setFillColor(236, 253, 245) // Emerald 50
  doc.setDrawColor(167, 243, 208) // Emerald 300
  doc.roundedRect(marginLeft + contentWidth / 2 + 5, y, contentWidth / 2 - 5, 25, 3, 3, 'FD')
  
  doc.setFontSize(10)
  doc.setTextColor(5, 150, 105) // Emerald 600
  doc.setFont('helvetica', 'bold')
  doc.text('Performed By', marginLeft + contentWidth / 2 + 15, y + 8)
  
  doc.setFontSize(11)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.text(`User ID: ${activity.value.user_id}`, marginLeft + contentWidth / 2 + 15, y + 15)
  
  // Find manager name if available
  const manager = successManagers.value.find(m => m.id === activity.value.user_id)
  const managerName = manager ? manager.name : (route.query.name || 'N/A')
  
  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'normal')
  doc.text(managerName, marginLeft + contentWidth / 2 + 15, y + 21)
  
  y += 35

  // Summary Section
  doc.setFontSize(12)
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.text('Report Summary', marginLeft, y)
  
  y += 8

  // Summary table with appropriate date display
  const summaryData = [
    ['Report ID', `#${activity.value.id}`],
    ['Status', getReportStatus(activity.value.date)],
    ['Created', moment(activity.value.date).format('DD MMM YYYY')],
    ['Customer ID', activity.value.customer_id],
    ['User ID', activity.value.user_id],
    ['Activity Type', activity.value.type]
  ]

  summaryData.forEach(([label, value], index) => {
    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252) // Slate 50
      doc.rect(marginLeft, y, contentWidth, 8, 'F')
    }
    
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    doc.setFont('helvetica', 'normal')
    doc.text(label + ':', marginLeft + 5, y + 5.5)
    
    doc.setFontSize(9)
    // Color coding based on label
    if (label === 'Activity Type') {
      doc.setTextColor(29, 78, 216) // Blue 600
    } else if (label === 'Status') {
      const status = value
      const statusColor = status === 'Recent' ? '#16a34a' : 
                        status === 'This Month' ? '#2563eb' :
                        status === 'This Year' ? '#7c3aed' : '#6b7280'
      doc.setTextColor(statusColor)
    } else {
      doc.setTextColor(30, 41, 59)
    }
    doc.setFont('helvetica', 'bold')
    doc.text(value.toString(), marginLeft + 40, y + 5.5)
    
    y += 8
  })
  
  y += 10

  // Activity Date Context Note
  const yearsOld = moment().diff(moment(activity.value.date), 'years')
  if (yearsOld >= 1) {
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.setFont('helvetica', 'italic')
    doc.text(`Note: This activity was recorded ${yearsOld} year${yearsOld > 1 ? 's' : ''} ago`, marginLeft, y)
    y += 5
  }

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184) // Slate 400
  doc.setFont('helvetica', 'normal')
  doc.text('Confidential - For internal use only', marginLeft, 285)
  
  doc.text(`Page 1 of 1`, pageWidth - marginRight, 285, { align: 'right' })
  
  // Watermark
  doc.setFontSize(60)
  doc.setTextColor(241, 245, 249) // Slate 100
  doc.setFont('helvetica', 'bold')
  doc.setGState(new doc.GState({opacity: 0.1}))
  doc.text('REPORT', pageWidth / 2, 150, { align: 'center' })
  doc.setGState(new doc.GState({opacity: 1}))
  
  // Save the PDF
  const fileName = `activity-report-${activity.value.id}-${moment().format('YYYY-MM-DD')}.pdf`
  doc.save(fileName)
}

onMounted(() => {
  fetchActivity()
  fetchSuccessManagers()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #4f46e5);
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Card hover effects */
.group:hover .group-hover\:rotate-0 {
  transform: rotate(0);
}

/* Prevent text selection during loading */
[disabled] {
  user-select: none;
}
</style>