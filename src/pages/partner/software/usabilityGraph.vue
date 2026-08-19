<template>
  <div class="px-4 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
    <Breadcrumb />
    <div class="backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl p-5 border border-white/20">
      <!-- Header with glass morphism -->
      <div class="mb-5 border-b border-white/30 pb-3">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Software Usability Graph
            </h1>
            <p class="text-xs text-slate-600/70 mt-1 flex items-center gap-2">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Visual representation of software usability metrics
            </p>
          </div>
          <!-- Glass morphism legend -->
          <div class="flex gap-2 text-xs">
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm">
              <div class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
              <span class="text-slate-700">Low Usability</span>
            </div>
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm">
              <div class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"></div>
              <span class="text-slate-700">Medium Usability</span>
            </div>
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm">
              <div class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <span class="text-slate-700">High Usability</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Glass morphism Loader -->
      <div v-if="loading" class="text-center py-16">
        <div class="relative w-12 h-12 mx-auto">
          <div class="absolute inset-0 rounded-full border-3 border-slate-200/50"></div>
          <div class="absolute inset-0 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-3 text-slate-600 font-medium text-sm">Loading graph data...</p>
      </div>

      <!-- Chart with reduced height -->
      <div v-else class="w-full">
        <div class="relative flex items-center justify-center">
          <canvas 
            ref="chartRef" 
            :key="canvasKey"
            class="w-full"
            style="height: 320px !important;"
          ></canvas>
        </div>
        
        <!-- Glass morphism insights summary -->
        <div class="mt-4 pt-3 border-t border-white/30" v-if="totalSoftware > 0">
          <div class="flex flex-wrap gap-4 justify-center text-xs">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-sm">
              <span class="font-semibold text-slate-700">Average:</span>
              <span class="px-2 py-0.5 rounded-full font-bold text-white text-xs" 
                    :class="getScoreClass(avgUsability)">
                {{ avgUsability }}%
              </span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-sm">
              <span class="font-semibold text-slate-700">Software:</span>
              <span class="px-2 py-0.5 rounded-full bg-white/80 text-slate-700 font-bold text-xs">
                {{ totalSoftware }}
              </span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-sm">
              <span class="font-semibold text-slate-700">Top Performer:</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700 font-medium text-xs">
                {{ topPerformer }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import Breadcrumb from "@/components/Breadcrumb.vue";

const authStore = useAuthStore()

const loading = ref(false)
const chartRef = ref(null)
const canvasKey = ref(0)
let chartInstance = null

// Reactive data for insights
const avgUsability = ref(0)
const totalSoftware = ref(0)
const topPerformer = ref('—')

const fetchData = async () => {
  loading.value = true

  try {
    const res = await api().get(
      '/customer-software?company_id=' + authStore.companyId
    )

    const raw = res.data || []

    // Group by software
    const grouped = {}

    raw.forEach(item => {
      const name = item.software?.name || 'Unknown'
      const usability = Number(item.usability || 0)

      if (!grouped[name]) {
        grouped[name] = []
      }
      grouped[name].push(usability)
    })

    // Prepare chart data
    const labels = []
    const values = []
    let totalSum = 0
    let totalCount = 0
    let maxValue = -1
    let topName = '—'

    Object.keys(grouped).forEach(name => {
      const arr = grouped[name]
      const avg = Math.round(
        arr.reduce((a, b) => a + b, 0) / arr.length
      )

      labels.push(name)
      values.push(avg)
      
      totalSum += avg
      totalCount++
      
      if (avg > maxValue) {
        maxValue = avg
        topName = name
      }
    })
    
    avgUsability.value = totalCount > 0 ? Math.round(totalSum / totalCount) : 0
    totalSoftware.value = totalCount
    topPerformer.value = topName

    // Force canvas re-render
    canvasKey.value++
    
    await nextTick()
    
    setTimeout(() => {
      renderChart(labels, values)
    }, 50)

  } catch (err) {
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

// Helper to get color class for a score
const getScoreClass = (score) => {
  if (score >= 75) return 'bg-gradient-to-r from-emerald-500 to-green-600'
  if (score >= 50) return 'bg-gradient-to-r from-amber-400 to-yellow-500'
  return 'bg-gradient-to-r from-red-500 to-orange-500'
}

// Get bar color based on value
const getBarColor = (value) => {
  if (value >= 75) return '#10b981' // emerald-500
  if (value >= 50) return '#fbbf24' // amber-400
  return '#ef4444' // red-500
}

const renderChart = (labels, data) => {
  // Enhanced safety checks
  if (!chartRef.value) {
    console.warn('Canvas ref not available, retrying...')
    setTimeout(() => renderChart(labels, data), 100)
    return
  }

  const canvas = chartRef.value
  
  if (!document.body.contains(canvas)) {
    console.warn('Canvas not in DOM, retrying...')
    setTimeout(() => renderChart(labels, data), 100)
    return
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Context not available')
    return
  }

  // Destroy old chart
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  // Create gradient backgrounds for each bar
  const backgroundColors = data.map(value => getBarColor(value))
  const borderColors = data.map(value => {
    if (value >= 75) return '#059669'
    if (value >= 50) return '#d97706'
    return '#dc2626'
  })

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Usability Score',
          data,
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          hoverOffset: 4,
          hoverBackgroundColor: backgroundColors.map(color => color + 'dd')
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      animation: {
        duration: 600,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#475569',
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          borderColor: 'rgba(203, 213, 225, 0.5)',
          borderWidth: 1,
          callbacks: {
            label: (context) => {
              const value = context.raw
              let tier = ''
              if (value >= 75) tier = '🟢 High Usability'
              else if (value >= 50) tier = '🟡 Medium Usability'
              else tier = '🔴 Low Usability'
              return [`${tier}`, `Usability: ${value}%`]
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(203, 213, 225, 0.3)',
            drawBorder: false,
            lineWidth: 1
          },
          title: {
            display: true,
            text: 'Usability (%)',
            color: '#64748b',
            font: {
              size: 11,
              weight: '500'
            }
          },
          ticks: {
            callback: val => val + '%',
            stepSize: 25,
            color: '#94a3b8',
            font: {
              size: 10
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#475569',
            font: {
              size: 10,
              weight: '500'
            },
            maxRotation: 35,
            minRotation: 35,
            autoSkip: true,
            maxTicksLimit: 8
          },
          title: {
            display: true,
            text: 'Software',
            color: '#64748b',
            font: {
              size: 11,
              weight: '500'
            }
          }
        }
      },
      layout: {
        padding: {
          left: 5,
          right: 5,
          top: 15,
          bottom: 5
        }
      }
    }
  })
}

// Handle window resize
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await fetchData()
})

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 670px !important;
}

/* Glass morphism scrollbar */
.border-t::-webkit-scrollbar {
  height: 3px;
}

.border-t::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 10px;
}

.border-t::-webkit-scrollbar-thumb {
  background: rgba(203, 213, 225, 0.8);
  border-radius: 10px;
}

/* Smooth glass morphism hover effects */
.backdrop-blur-xl {
  transition: all 0.3s ease;
}

.backdrop-blur-xl:hover {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1);
}
</style>