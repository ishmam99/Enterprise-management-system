<template>
  <div>

  </div>
</template>

<script setup>
import { useHRM } from '@/composables/useHRM'
import { onMounted, ref } from 'vue'
const { hrmApi } = useHRM()

const loading = ref(false)
const employees = ref([])
const fetchEmployees = async () => {
  loading.value = true
  try {
    const response = await hrmApi.get('employee') 
    employees.value = response.data.data 

  } catch (error) {
   alert('lmao')
    console.error(error)
  }
  loading.value = false
}

// Call fetchExpenses when component is mounted
onMounted(() => {
  fetchEmployees()
})


</script>

<style scoped>

</style>