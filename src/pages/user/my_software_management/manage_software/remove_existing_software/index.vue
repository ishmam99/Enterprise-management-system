<template>
  <div class="min-h-screen bg-gray-50 p-8 w-3/4 mx-auto my-5">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Software Management</h1>
      <p class="text-gray-600 mt-2">Manage your software licenses and subscriptions</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Add Software Form -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-6">Add New Software</h2>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Software Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Software</label>
              <select
                v-model="form.software"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select software</option>
                <option v-for="software in softwareOptions" :key="software" :value="software">
                  {{ software }}
                </option>
              </select>
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                v-model="form.startDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>

            <!-- Expiration Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
              <input
                type="date"
                v-model="form.expirationDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>

            <!-- Save Button -->
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <!-- Software List -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-md">
          <!-- Table Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-700">Software Licenses</h2>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Software Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiration Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="software in softwareList" :key="software.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-cube text-blue-600"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ software.name }}</div>
                        <div class="text-sm text-gray-500">Version {{ software.version }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(software.startDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(software.expirationDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(software.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ software.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="editSoftware(software)"
                        class="text-blue-600 hover:text-blue-900 transition duration-200"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        @click="renewSoftware(software)"
                        class="text-green-600 hover:text-green-900 transition duration-200"
                        title="Renew"
                      >
                        <i class="fas fa-sync-alt"></i>
                      </button>
                      <button
                        @click="deleteSoftware(software.id)"
                        class="text-red-600 hover:text-red-900 transition duration-200"
                        title="Delete"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-if="softwareList.length === 0" class="text-center py-12">
            <i class="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
            <p class="text-gray-500">No software licenses found</p>
            <p class="text-gray-400 text-sm mt-1">Add a new software license to get started</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const softwareOptions = [
  'Actran',
  'CAEfatigue',
  'Cradle CFD',
  'MSC Apex',
  'Marc',
  'Patran',
  'MSC Nastran',
  'MSC CoSim'
]

const form = ref({
  software: '',
  startDate: '',
  expirationDate: ''
})

const softwareList = ref([])

// Initialize with sample data
onMounted(() => {
  softwareList.value = [
    {
      id: 1,
      name: 'MSC Nastran',
      version: '2023',
      startDate: '2023-01-15',
      expirationDate: '2024-01-14',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Actran',
      version: '2022',
      startDate: '2023-03-10',
      expirationDate: '2023-11-09',
      status: 'Expired'
    },
    {
      id: 3,
      name: 'Cradle CFD',
      version: '2023',
      startDate: '2023-06-20',
      expirationDate: '2024-06-19',
      status: 'Active'
    }
  ]
})

const handleSubmit = () => {
  if (!form.value.software || !form.value.startDate || !form.value.expirationDate) {
    alert('Please fill all fields')
    return
  }

  const newSoftware = {
    id: Date.now(),
    name: form.value.software,
    version: '2023',
    startDate: form.value.startDate,
    expirationDate: form.value.expirationDate,
    status: 'Active'
  }

  softwareList.value.push(newSoftware)

  // Reset form
  form.value = {
    software: '',
    startDate: '',
    expirationDate: ''
  }
}

const editSoftware = (software) => {
  // Populate form with software data for editing
  form.value = {
    software: software.name,
    startDate: software.startDate,
    expirationDate: software.expirationDate
  }

  // Remove from list (will be re-added after editing)
  softwareList.value = softwareList.value.filter(s => s.id !== software.id)
}

const renewSoftware = (software) => {
  const newExpirationDate = new Date(software.expirationDate)
  newExpirationDate.setFullYear(newExpirationDate.getFullYear() + 1)

  software.expirationDate = newExpirationDate.toISOString().split('T')[0]
  software.status = 'Active'
}

const deleteSoftware = (id) => {
  if (confirm('Are you sure you want to delete this software?')) {
    softwareList.value = softwareList.value.filter(software => software.id !== id)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'Expired': 'bg-red-100 text-red-800',
    'Expiring Soon': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
