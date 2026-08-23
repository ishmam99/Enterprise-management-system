<template>
  <div class="categories-management">
    <!-- Toast Notification -->
    <div v-if="toast.show" 
         :class="`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
      {{ toast.message }}
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Manufacturer</h1>
        <!-- <p class="text-gray-600">Organize your products into categories</p> -->
      </div>
      <div class="flex gap-3">
        <button 
          class="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm flex items-center hover:bg-blue-700"
          @click="openAddCategoryModal"
        >
          <Icon name="material-symbols:add" class="mr-1.5" /> Add Manufacturer
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="h-40 bg-gray-200 animate-pulse"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div class="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
          <div class="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div class="flex justify-between mt-4">
            <div class="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div class="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="relative h-40 bg-gray-100">
          <img 
            v-if="category.logo"
            :src="category.logo" 
            class="w-full h-full object-cover"
            alt="Category image"
          >
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <Icon name="material-symbols:category" class="w-12 h-12" />
          </div>
          <div class="absolute top-3 right-3 flex gap-2">
            <button 
              @click="openEditCategoryModal(category)"
              class="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <Icon name="material-symbols:edit" class="w-4 h-4 text-gray-600" />
            </button>
            <button 
              @click="confirmDeleteCategory(category)"
              class="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <Icon name="material-symbols:delete" class="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-medium text-gray-900 mb-1">{{ category.name }}</h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ category.description }}</p>
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">{{ category.product_count }} products</span>
            <span 
              :class="{
                'px-2 py-1 rounded-full text-xs': true,
                'bg-green-100 text-green-800': category.status === 1,
                'bg-gray-100 text-gray-800': category.status === 0
              }"
            >
              {{ category.status === 1 ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="categories.length === 0 && !isLoading" 
        class="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
      >
        <div class="mx-auto max-w-md">
          <Icon name="material-symbols:category" class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
          <p class="mt-1 text-sm text-gray-500">Create your first category to organize products</p>
          <button 
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center mx-auto hover:bg-blue-700"
            @click="openAddCategoryModal"
          >
            <Icon name="material-symbols:add" class="mr-1.5" /> Add Manufacturer
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingCategory ? 'Edit Manufacturer' : 'Add New Manufacturer' }}
          </h3>
          <button @click="closeCategoryModal" class="text-gray-400 hover:text-gray-500">
            <Icon name="material-symbols:close" class="w-6 h-6" />
          </button>
        </div>
        <div class="px-6 py-4">
          <div class="space-y-4">
            <div>
              <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                v-model="categoryForm.name"
                type="text" 
                id="category-name" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div>
              <label for="category-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="categoryForm.description"
                id="category-description" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label for="category-image" class="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <div class="flex items-center gap-4">
                <div 
                  class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden"
                  @click="triggerImageInput"
                >
                  <img 
                    v-if="categoryForm.imagePreview" 
                    :src="categoryForm.imagePreview" 
                    class="w-full h-full object-cover"
                  >
                  <Icon 
                    v-else 
                    name="material-symbols:image" 
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <input 
                  ref="imageInput"
                  type="file" 
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                >
                <button 
                  type="button"
                  @click="triggerImageInput"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  {{ categoryForm.imagePreview ? 'Change' : 'Upload' }}
                </button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div class="flex items-center gap-4">
                <label class="inline-flex items-center">
                  <input 
                    v-model="categoryForm.status"
                    type="radio" 
                    :value="1"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <span class="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label class="inline-flex items-center">
                  <input 
                    v-model="categoryForm.status"
                    type="radio" 
                    :value="0"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  >
                  <span class="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button 
            @click="closeCategoryModal"
            type="button" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            @click="saveCategory"
            type="button" 
            class="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            <span v-else>
              {{ editingCategory ? 'Update' : 'Save' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Delete Manufacturer</h3>
          <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500">
            <Icon name="material-symbols:close" class="w-6 h-6" />
          </button>
        </div>
        <div class="px-6 py-4">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete "{{ categoryToDelete?.name }}"? 
            This will remove the Manufacturer but won't delete products in it.
          </p>
        </div>
        <div class="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            type="button" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            @click="deleteCategory"
            type="button" 
            class="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            :disabled="isDeleting"
          >
            <span v-if="isDeleting">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </span>
            <span v-else>
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'supply-chain-management',
})

const imageInput = ref(null)
const showCategoryModal = ref(false)
const showDeleteModal = ref(false)
const editingCategory = ref(null)
const categoryToDelete = ref(null)
const categories = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const isDeleting = ref(false)

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

const categoryForm = reactive({
  name: '',
  description: '',
  image: null,
  imagePreview: null,
  status: 1
})

// Fetch categories from API
const fetchCategories = async () => {
  try {
    isLoading.value = true
    const response = await useApi('brand', {
      method: 'GET'
    })
    categories.value = response.data || []
  } catch (error) {
    console.error('Error fetching Manufacturer:', error)
    showToast('Failed to load Manufacturer', 'error')
  } finally {
    isLoading.value = false
  }
}

const openAddCategoryModal = () => {
  resetCategoryForm()
  editingCategory.value = null
  showCategoryModal.value = true
}

const openEditCategoryModal = (category) => {
  editingCategory.value = category.id
  categoryForm.name = category.name
  categoryForm.description = category.description
  categoryForm.status = category.status
  categoryForm.imagePreview = category.logo // This should be the full image URL from API
  showCategoryModal.value = true
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
}

const resetCategoryForm = () => {
  categoryForm.name = ''
  categoryForm.description = ''
  categoryForm.logo = null
  categoryForm.imagePreview = null
  categoryForm.status = 1
}

const triggerImageInput = () => {
  imageInput.value.click()
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    categoryForm.logo = file
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (event) => {
      categoryForm.imagePreview = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveCategory = async () => {
  try {
    isSubmitting.value = true
    
    const formData = new FormData()
    formData.append('name', categoryForm.name)
    formData.append('description', categoryForm.description)
    formData.append('status', categoryForm.status)
    
    if (editingCategory.value) {
      formData.append('_method', 'PUT') // Add this line for edit
    }
    
    if (categoryForm.logo) {
      formData.append('logo', categoryForm.logo)
    }

    if (editingCategory.value) {
      // Update existing category with POST + _method=PUT
      await useApi(`brand/${editingCategory.value}`, {
        method: 'POST', // Changed from PUT to POST
        body: formData
      })
      showToast('Category updated successfully')
    } else {
      // Create new category (regular POST)
      await useApi('brand', {
        method: 'POST',
        body: formData
      })
      showToast('Category created successfully')
    }
    
    await fetchCategories()
    closeCategoryModal()
  } catch (error) {
    console.error('Error saving category:', error)
    showToast(error.response?.data?.message || 'Failed to save category', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDeleteCategory = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return
  
  try {
    isDeleting.value = true
    await useApi(`brand/${categoryToDelete.value.id}`, {
      method: 'DELETE'
    })
    showToast('Category deleted successfully')
    await fetchCategories()
    showDeleteModal.value = false
    categoryToDelete.value = null
  } catch (error) {
    console.error('Error deleting category:', error)
    showToast(error.response?.data?.message || 'Failed to delete category', 'error')
  } finally {
    isDeleting.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.categories-management {
  max-width: 1800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>