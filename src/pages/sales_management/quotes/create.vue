<template>
  <div class="create-vendor">
    <!-- Toast Notification -->
    <div v-if="toast.show" 
      :class="`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
      {{ toast.message }}
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Create New Vendor</h1>
        <p class="text-gray-600">Add a new vendor to your system</p>
      </div>
      <NuxtLink
        to="/admin/product_management/vendors"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white rounded p-2"
      >
        <Icon name="material-symbols:arrow-back" />
        Back to Vendors
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form @submit.prevent="submitSupplier">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
            
            <div>
              <label for="supplier-name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                v-model="supplier.name"
                type="text" 
                id="supplier-name" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="supplier-email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                v-model="supplier.email"
                type="email" 
                id="supplier-email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="supplier-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input 
                v-model="supplier.phone"
                type="number"
                min="0" 
                id="supplier-phone" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="supplier-company" class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input 
                v-model="supplier.company"
                type="text" 
                id="supplier-company" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>

          <!-- Additional Information -->
          <div class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h2>
            
            <div>
              <label for="supplier-address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea 
                v-model="supplier.address"
                id="supplier-address" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <!-- <div>
              <label for="supplier-lead-time" class="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
              <input 
                v-model="supplier.lead_time"
                type="number" 
                id="supplier-lead-time" 
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div> -->

            <!-- Supplier Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Image</label>
              <div class="flex flex-col items-center">
                <div
                  class="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3 cursor-pointer"
                  @click="triggerFileInput"
                >
                  <img
                    v-if="supplier.imagePreview"
                    :src="supplier.imagePreview"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="text-center p-4">
                    <Icon
                      name="material-symbols:image"
                      class="w-10 h-10 text-gray-400 mx-auto"
                    />
                    <p class="text-sm text-gray-500 mt-2">Click to upload image</p>
                  </div>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
                <button
                  type="button"
                  @click="triggerFileInput"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  {{ supplier.imagePreview ? "Change Image" : "Upload Image" }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div class="flex items-center gap-4">
                <label class="inline-flex items-center">
                  <input
                    v-model="supplier.status"
                    type="radio"
                    value="1"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="supplier.status"
                    type="radio"
                    value="0"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
          <NuxtLink
            to="/suppliers"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            class="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <Icon name="eos-icons:loading" class="inline mr-2" />
              Creating...
            </span>
            <span v-else>
              Create Supplier
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'supply-chain-management',
})
const toast = reactive({
  show: false,
  message: '',
  type: '' // 'success' or 'error'
})

let toastTimeout = null

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type

  // Hide after 3 seconds
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.show = false
  }, 3000)
}

const fileInput = ref(null);
const supplier = reactive({
  name: '',
  email: '',
  // password: '',
  phone: null,
  address: '',
  company: '',
  lead_time: '',
  image: null,
  imagePreview: null,
  status: '1' // Active by default
})

const isSubmitting = ref(false)

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    supplier.image = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      supplier.imagePreview = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitSupplier = async () => {
  try {
    isSubmitting.value = true;
    
    const formData = new FormData()
    formData.append('name', supplier.name)
    formData.append('email', supplier.email)
    // formData.append('password', supplier.password || '')
    formData.append('phone', supplier.phone)
    formData.append('address', supplier.address)
    formData.append('company', supplier.company)
    // formData.append('lead_time', supplier.lead_time)
    if (supplier.image) {
      formData.append('image', supplier.image)
    }
    formData.append('status', supplier.status)

    await useApi('vendor', {
      method: 'POST',
      body: formData
    })
    
    showToast("Vendor created successfully!")
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
      navigateTo('/admin/inventory_management/vendors')
    }, 1500)
    
  } catch (error) {
    console.error('Failed to create Vendor:', error)
    showToast(error.response?.data?.message || "Failed to create Vendor", 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>