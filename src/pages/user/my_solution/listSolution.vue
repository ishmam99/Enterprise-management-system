<template>
  <div class="px-4 md:px-16 py-6 w-full mx-auto ">


    <!-- Volunteer Services List -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold">Solution List</h1>
          <span class="bg-teal-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {{ services.length }} Solutions
          </span>
        </div>
      </div>

      <div class="p-6">
        <div v-if="services.length === 0" class="text-center py-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p class="mt-2">No systems found. Create your first system above.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center">
                <span class="h-2 w-2 rounded-full bg-teal-600 mr-2"></span>
                <span v-if="!service.editing" class="text-lg font-semibold text-gray-800">{{ service?.name }}</span>
                <input
                  v-else
                  v-model="service.editName"
                  type="text"
                  class="text-lg font-semibold text-gray-800 border border-gray-300 rounded-lg px-3 py-2 w-full"
                  @keyup.enter="updateService(service)"
                  @keyup.escape="cancelEdit(service)"
                />
              </div>
              <div class="flex space-x-2">
                <button
                  v-if="!service.editing"
                  @click="enableEdit(service)"
                  class="text-teal-500 hover:text-teal-700 transition-colors"
                  title="Edit service"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  v-if="!service.editing"
                  @click="confirmDelete(service)"
                  class="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete service"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  v-if="service.editing"
                  @click="updateService(service)"
                  class="text-green-500 hover:text-green-700 transition-colors"
                  title="Save changes"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  v-if="service.editing"
                  @click="cancelEdit(service)"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Cancel editing"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>



            <div class="text-xs  text-gray-400 mt-2">
              Status: {{ service.status == 0 ? 'Active' : 'Inactive' }}<br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useToast } from '@/components/ui/toast/use-toast'
import Swal from 'sweetalert2'


const { toast } = useToast()
const services = ref([])
const newServiceName = ref('')
const newServiceDescription = ref('')



const getServices = async () => {
  try {
    const response = await api().get('/end-user-solution-list')
    services.value = response.data.data || []
    // Add editing state to each service
    // services.value = response.data.map(service => ({
    //   ...service,
    //   editing: false,
    //   editName: service.name,
    //   editDescription: service.description,
    //   originalName: service.name,
    //   originalDescription: service.description
    // }))
  } catch (error) {
    console.error('Error fetching services:', error)
    toast({ title: 'Error', description: 'Failed to fetch systems.' })
  }
}

const addService = async () => {
  if (!newServiceName.value.trim()) {
    toast({ title: 'Error', description: 'System name cannot be empty!' })
    return
  }

  if (!newServiceDescription.value.trim()) {
    toast({ title: 'Error', description: 'System description cannot be empty!' })
    return
  }

  const serviceExists = services.value.some(
    (service) => service.name.toLowerCase() === newServiceName.value.toLowerCase()
  )

  if (serviceExists) {
    toast({ title: 'Error', description: 'System already exists!' })
    return
  }

  try {
    const data = {
      name: newServiceName.value,
      description: newServiceDescription.value
    }
    await api().post('/softwares', data)

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'System added successfully',
      confirmButtonColor: '#0d9488'
    })
    newServiceName.value = ''
    newServiceDescription.value = ''
    getServices() // Refresh the list
  } catch (error) {
    console.error('Error adding system:', error)
    toast({ title: 'Error', description: 'Failed to add system. Please try again.' })
  }
}

const enableEdit = (service) => {
  // Reset editing state for all services
  services.value.forEach(s => {
    if (s.id !== service.id) {
      s.editing = false
    }
  })

  service.editing = true
  service.editName = service.name
  service.editDescription = service.description
  service.originalName = service.name
  service.originalDescription = service.description
}

const cancelEdit = (service) => {
  service.editing = false
  service.editName = service.originalName
  service.editDescription = service.originalDescription
}

const updateService = async (service) => {
  if (!service.editName.trim()) {
    toast({ title: 'Error', description: 'System name cannot be empty!' })
    return
  }

  if (!service.editDescription.trim()) {
    toast({ title: 'Error', description: 'System description cannot be empty!' })
    return
  }

  // Check if the new name already exists (excluding the current service)
  const serviceExists = services.value.some(
    (s) => s.id !== service.id && s.name.toLowerCase() === service.editName.toLowerCase()
  )

  if (serviceExists) {
    toast({ title: 'Error', description: 'System name already exists!' })
    return
  }

  try {
    const data = {
      name: service.editName,
      description: service.editDescription
    }
    await api().put(`/system/${service.id}`, data)

    service.name = service.editName
    service.description = service.editDescription
    service.originalName = service.editName
    service.originalDescription = service.editDescription
    service.editing = false

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'System updated successfully',
      confirmButtonColor: '#0d9488'
    })
  } catch (error) {
    console.error('Error updating system:', error)
    toast({ title: 'Error', description: 'Failed to update system. Please try again.' })
  }
}

const confirmDelete = (service) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete "${service.name}". This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#0d9488',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteService(service)
    }
  })
}

const deleteService = async (service) => {
  try {
    await api().delete(`/softwares/${service.id}`)

    // Remove the service from the local list
    services.value = services.value.filter(s => s.id !== service.id)

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'System has been deleted.',
      confirmButtonColor: '#0d9488'
    })
  } catch (error) {
    console.error('Error deleting system:', error)
    toast({ title: 'Error', description: 'Failed to delete system. Please try again.' })
  }
}

onMounted(() => {
  getServices()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
