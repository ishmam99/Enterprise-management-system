<template>
  <canvas ref="root" />
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { Chart, BarElement, BarController, LinearScale, CategoryScale, Tooltip } from 'chart.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const root = ref(null)

let chart

Chart.register(BarElement, BarController, LinearScale, CategoryScale, Tooltip)

onMounted(() => {
  chart = new Chart(root.value, {
    type: 'bar',
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: true,
          beginAtZero: true
        },
        x: {
          display: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
})

const chartData = computed(() => props.data)

watch(chartData, (data) => {
  if (chart) {
    chart.data = data
    chart.update()
  }
})
</script>
