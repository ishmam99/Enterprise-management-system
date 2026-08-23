<template>
  <div class="vendors-list">
    <!-- Toast Notification -->
    <div v-if="toast.show" 
         :class="`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
      {{ toast.message }}
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Quotes</h1>
        <p class="text-gray-600">All the requested quotes in one place</p>
      </div>
      <!-- <NuxtLink
        to="/admin/product_management/vendors/create"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <Icon name="material-symbols:add" />
        New Vendor
      </NuxtLink> -->
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <!-- Search and Filter -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="material-symbols:search" class="text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search quotes..."
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

      <!-- vendors Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Number</th>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 border-e text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th class="px-6 py-3 border-e text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="50" class="px-6 py-4 border-e text-center">
                <Icon name="eos-icons:loading" class="w-8 h-8 text-blue-500 mx-auto" />
              </td>
            </tr>
            <tr v-else-if="filteredVendors.length == 0">
              <td colspan="50" class="px-6 py-4 border-e text-center text-gray-500">
                No Quotes found
              </td>
            </tr>
            <tr v-for="vendor in filteredVendors" :key="vendor.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ vendor?.product?.name }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ vendor?.brand?.name }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ vendor?.model_number }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">{{ vendor.name }}</div>
                    <!-- <div class="text-sm text-gray-500">{{ vendor.email }}</div> -->
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">Phone: {{ vendor?.phone_number }}</div>
                <div class="text-gray-900">Email: {{ vendor?.email }}</div>
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ vendor?.company_details }}</div>
                <!-- <div class="text-sm text-gray-500">{{ vendor?.address }}</div> -->
              </td>
              <td class="px-6 py-4 border-e whitespace-nowrap">
                <div class="text-gray-900">{{ vendor?.requirement }}</div>
              </td>
                 <td class="px-6 py-4 border-e whitespace-nowrap text-right text-sm font-medium">
    <button 
      v-if="vendor?.status == 1"
      disabled
      class="bg-blue-600 text-white px-4 py-1.5 rounded cursor-default"
    >
      Contacted
    </button>
    <button 
  v-else
  @click="updateQuoteStatus(vendor.id)"
  :disabled="updatingStatuses[vendor.id]"
  class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition disabled:opacity-70"
>
  <span v-if="updatingStatuses[vendor.id]">
    <Icon name="eos-icons:loading" class="inline mr-1" /> Updating...
  </span>
  <span v-else>Not Contacted</span>
</button>
  </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete {{ vendorToDelete?.name }}?</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="deleteVendor"
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
  type: 'success'
})
definePageMeta({
  layout: 'supply-chain-management',
})
const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => toast.show = false, 3000)
}

// Data
const vendors = ref([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const showDeleteModal = ref(false)
const vendorToDelete = ref(null)

// Fetch vendors
const fetchQuotes = async () => {
  try {
    loading.value = true
    const response = await useApi('quote', {
      method: 'GET',
    })
    vendors.value = response.data || []
  } catch (error) {
    showToast('Failed to load vendors', 'error')
    console.error('Error fetching vendors:', error)
  } finally {
    loading.value = false
  }
}

// Filtered vendors
const filteredVendors = computed(() => {
  return vendors.value.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || vendor.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Fix status comparison - convert statusFilter to number if it exists
    const matchesStatus = !statusFilter.value || vendor.status.toString() === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

// Delete vendor
const confirmDelete = (vendor) => {
  vendorToDelete.value = vendor
  showDeleteModal.value = true
}

const deleteVendor = async () => {
  try {
    await useApi(`vendor/${vendorToDelete.value.id}`, {
      method: 'DELETE'
    })
    showToast('Vendor deleted successfully')
    fetchQuotes()
  } catch (error) {
    showToast(error.response?.data?.message || 'Failed to delete vendor', 'error')
  } finally {
    showDeleteModal.value = false
  }
}
const updatingStatuses = ref({}); 
const updateQuoteStatus = async (quoteId) => {
  updatingStatuses.value[quoteId] = true; // Set loading for this specific quote
  
  try {
    await useApi(`quote/${quoteId}`, {
      method: 'POST',
      body: JSON.stringify({
        status: 1,
        _method: 'put'
      })
    });
    
    showToast('Status updated to Contacted');
    
    // Update local data
    const quote = vendors.value.find(q => q.id === quoteId);
    if (quote) quote.status = 1;
    
  } catch (error) {
    showToast(error.response?.data?.message || 'Update failed', 'error');
  } finally {
    updatingStatuses.value[quoteId] = false; // Clear loading for this quote
  }
};

// Initial fetch
onMounted(fetchQuotes)
</script>

<style scoped>
/* Add any custom styles here */
</style>