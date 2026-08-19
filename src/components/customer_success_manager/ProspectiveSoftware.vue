<template>
  <div class="p-3 w-full mx-auto">
    <!-- Volunteer Services List -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold"> Prospective Software List</h1>
          <span class="bg-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {{ services.length }} Softwares
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

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Software Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(service, index) in services"
                :key="index"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                    <div v-if="!service.editing" class="text-sm font-medium text-gray-900">
                         {{ service?.software?.name }}
                    </div>
                    <input
                      v-else
                      v-model="service.editName"
                      type="text"
                      class="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      @keyup.enter="updateService(service)"
                      @keyup.escape="cancelEdit(service)"
                    />
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    service.status == 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]">
                    {{ service.status == 0 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button


                      class="text-white px-3 hover:text-blue-700 transition-colors bg-blue-600 p-1 rounded hover:bg-blue-50"
                      title="Add"
                       @click="enableEdit(service)"
                    >
                   <i class="ri-add-circle-line"></i> Add
                    </button>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
    const response = await api().get('/customer-software')
    // Add editing state to each service
    services.value = response.data.map(service => ({
      ...service,
      editing: false,
      editName: service.name,
      editDescription: service.description,
      originalName: service.name,
      originalDescription: service.description
    }))
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
/* Custom styles for better table responsiveness */
@media (max-width: 640px) {
  table {
    display: block;
  }
  thead {
    display: none;
  }
  tbody {
    display: block;
  }
  tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border: none;
  }
  td::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 1rem;
    color: #374151;
  }
}
</style>
