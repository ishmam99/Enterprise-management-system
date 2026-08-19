<template>
  <div class="suppliers-list">
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white ${
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`"
    >
      {{ toast.message }}
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Suppliers</h1>
        <p class="text-gray-600">All your suppliers in one place</p>
      </div>
      <NuxtLink
        to="/admin/supply_chain_management/suppliers/create"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <Icon name="material-symbols:add" />
        New Supplier
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <!-- Search and Filter -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon name="material-symbols:search" class="text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search suppliers..."
          />
        </div>
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      <!-- Suppliers Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Supplier
              </th>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company
              </th>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead Time
              </th>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Supplier Type
              </th>
              <th
                class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 border-e text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="5" class="px-6 py-4 border-e text-center">
                <Icon
                  name="eos-icons:loading"
                  class="w-8 h-8 text-blue-500 mx-auto"
                />
              </td>
            </tr>
            <tr v-else-if="filteredSuppliers.length === 0">
              <td
                colspan="5"
                class="px-6 py-4 border-e text-center text-gray-500"
              >
                No suppliers found
              </td>
            </tr>
            <tr
              v-for="supplier in filteredSuppliers"
              :key="supplier.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      v-if="supplier.image"
                      :src="supplier.image"
                      class="h-10 w-10 rounded-full object-cover"
                      :alt="supplier.name"
                    />
                    <div
                      v-else
                      class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <Icon
                        name="material-symbols:person"
                        class="text-gray-400"
                      />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">
                      {{ supplier.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ supplier.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ supplier.company }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ supplier.phone }}</div>
                <div class="text-sm text-gray-500">{{ supplier.address }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ supplier.lead_time }} days
                </span>
              </td>
              <td
                class="px-6 py-4 border-e whitespace-nowrap"
                
              >
              <span :class="{
                  'bg-green-100  text-green-800 rounded-full px-3 py-2': supplier.tier == 1,
                  'bg-blue-100 text-blue-800 rounded-full px-3 py-2': supplier.tier == 2,
                  'bg-yellow-100 text-yellow-800 rounded-full px-3 py-2': supplier.tier == 3,
                } ">
                {{
                  supplier.tier == 1
                    ? 'Direct Manufacturer'
                    : supplier.tier == 2
                    ? 'Distributor/Wholesaler'
                    : 'Reseller/Retailer'
                }}
              </span>
               
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    supplier.status == '1'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`"
                >
                  {{ supplier.status == 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td
                class="px-6 py-4 border-e whitespace-nowrap text-right text-sm font-medium"
              >
                <NuxtLink
                  :to="`/admin/supply_chain_management/suppliers/edit/${supplier.id}`"
                  class="bg-blue-600 hover:bg-blue-900 mr-2 text-white px-4 py-1.5 rounded"
                >
                  Edit
                </NuxtLink>
                <button
                  @click="confirmDelete(supplier)"
                  class="bg-red-600 hover:bg-red-900 text-white px-4 py-1.5 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete {{ supplierToDelete?.name }}?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="deleteSupplier"
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const toast = reactive({
  show: false,
  message: '',
  type: 'success',
})
definePageMeta({
  layout: 'supply-chain-management',
})
const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

// Data
const suppliers = ref([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const showDeleteModal = ref(false)
const supplierToDelete = ref(null)

// Fetch suppliers
const fetchSuppliers = async () => {
  try {
    loading.value = true
    const response = await useApi('supplier')
    suppliers.value = response.data || []
  } catch (error) {
    showToast('Failed to load suppliers', 'error')
    console.error('Error fetching suppliers:', error)
  } finally {
    loading.value = false
  }
}

// Filtered suppliers
const filteredSuppliers = computed(() => {
  return suppliers.value.filter(supplier => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Fix status comparison - convert statusFilter to number if it exists
    const matchesStatus =
      !statusFilter.value || supplier.status.toString() === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

// Delete supplier
const confirmDelete = supplier => {
  supplierToDelete.value = supplier
  showDeleteModal.value = true
}

const deleteSupplier = async () => {
  try {
    await useApi(`supplier/${supplierToDelete.value.id}`, {
      method: 'DELETE',
    })
    showToast('Supplier deleted successfully')
    fetchSuppliers()
  } catch (error) {
    showToast(
      error.response?.data?.message || 'Failed to delete supplier',
      'error'
    )
  } finally {
    showDeleteModal.value = false
  }
}

// Initial fetch
onMounted(fetchSuppliers)
</script>

<style scoped>
/* Add any custom styles here */
</style>
