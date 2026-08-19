<template>
  <section id="my-references" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

    <div class="border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
      <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          <i class="ri-user-star-line"></i>
          Professional References
        </h2>
      </div>

      <button
        @click="openReferenceModal"
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <i class="ri-add-line"></i>
        Add Reference
      </button>
    </div>

    <!-- Loader -->
    <div v-if="loadingReferences" class="p-10 text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
    </div>

    <!-- List -->
    <div v-else class="p-6 space-y-4">

      <div
        v-for="reference in referenceList"
        :key="reference.id"
        class="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
      >
        <div class="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit text-xl">
          <img
            v-if="reference.image"
            :src="reference.image"
            :alt="reference.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <span v-else>👤</span>
        </div>

        <div class="flex-1">
          <h3 class="font-bold text-gray-800">
            {{ reference.name }}
          </h3>

          <p class="text-sm text-amber-600 font-medium">
            {{ reference.designation }} at {{ reference.company_name }}
          </p>

          <div class="flex flex-wrap gap-3 mt-2">
            <span class="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
              {{ reference.email }}
            </span>
            <span class="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded">
              {{ reference.phone }}
            </span>
          </div>

          <p v-if="reference.note" class="text-sm text-gray-500 mt-2">
            Note: {{ reference.note }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            @click="editReference(reference)"
            class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
            title="Edit"
          >
            <i class="ri-edit-line"></i>
          </button>
          <button
            @click="deleteReference(reference.id)"
            class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
            title="Delete"
          >
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loadingReferences && referenceList.length === 0" class="text-center py-8 text-gray-500">
        No references added yet. Click "Add Reference" to get started.
      </div>

    </div>

    <!-- Reference Modal -->
    <div
      v-if="showReferenceModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      @click.self="closeReferenceModal"
    >
      <div class="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
        <h2 class="text-xl font-bold mb-6">
          {{ isEditing ? 'Edit Professional Reference' : 'Add Professional Reference' }}
        </h2>

        <div class="space-y-4">
          <!-- Name Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              v-model="referenceForm.name"
              type="text"
              placeholder="Enter full name"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Designation Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
            <input
              v-model="referenceForm.designation"
              type="text"
              placeholder="Enter designation"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Company Name Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              v-model="referenceForm.company_name"
              type="text"
              placeholder="Enter company name"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              v-model="referenceForm.email"
              type="email"
              placeholder="Enter email address"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Phone Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              v-model="referenceForm.phone"
              type="tel"
              placeholder="Enter phone number"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Notes Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              v-model="referenceForm.note"
              placeholder="Enter additional notes (optional)"
              rows="3"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Image Upload Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div v-if="referenceForm.existingImage && !referenceForm.image" class="mt-2">
              <p class="text-xs text-gray-500">Current image: {{ referenceForm.existingImage }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="closeReferenceModal"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            @click="submitReference"
            :disabled="savingReference"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <i v-if="savingReference" class="fas fa-spinner fa-spin"></i>
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from '@/config/api'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

const referenceList = ref([])
const loadingReferences = ref(false)

const showReferenceModal = ref(false)
const savingReference = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const referenceForm = ref({
  name: '',
  designation: '',
  company_name: '',
  email: '',
  phone: '',
  note: '',
  image: null,
  existingImage: null
})

const openReferenceModal = () => {
  isEditing.value = false
  editingId.value = null
  referenceForm.value = {
    name: '',
    designation: '',
    company_name: '',
    email: '',
    phone: '',
    note: '',
    image: null,
    existingImage: null
  }
  showReferenceModal.value = true
}

const editReference = (reference) => {
  isEditing.value = true
  editingId.value = reference.id
  referenceForm.value = {
    name: reference.name,
    designation: reference.designation,
    company_name: reference.company_name,
    email: reference.email,
    phone: reference.phone,
    note: reference.note || '',
    image: null,
    existingImage: reference.image
  }
  showReferenceModal.value = true
}

const closeReferenceModal = () => {
  showReferenceModal.value = false
  // Reset form
  referenceForm.value = {
    name: '',
    designation: '',
    company_name: '',
    email: '',
    phone: '',
    note: '',
    image: null,
    existingImage: null
  }
  isEditing.value = false
  editingId.value = null
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    referenceForm.value.image = file
  }
}

const submitReference = async () => {
  // Validate required fields

  savingReference.value = true

  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', referenceForm.value.name)
    formData.append('designation', referenceForm.value.designation)
    formData.append('company_name', referenceForm.value.company_name)
    formData.append('email', referenceForm.value.email)
    formData.append('phone', referenceForm.value.phone)
    formData.append('note', referenceForm.value.note)

    if (referenceForm.value.image) {
      formData.append('image', referenceForm.value.image)
    }

    let response
    if (isEditing.value) {
      // Update existing reference
      response = await api().put(`/professional-references/${editingId.value}`, formData, { _method: 'PUT' })

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Reference has been updated successfully.',
        timer: 2000,
        showConfirmButton: false
      })
    } else {
      // Create new reference
      response = await api().post('/professional-references', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Reference has been added successfully.',
        timer: 2000,
        showConfirmButton: false
      })
    }

    closeReferenceModal()
    fetchReferences()

  } catch (err) {
    console.error('Error submitting reference:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Failed to save reference. Please try again.',
      confirmButtonColor: '#3b82f6'
    })
  } finally {
    savingReference.value = false
  }
}

const deleteReference = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })

  if (result.isConfirmed) {
    try {
      await api().delete(`/professional-references/${id}`)

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Reference has been deleted successfully.',
        timer: 2000,
        showConfirmButton: false
      })

      fetchReferences()
    } catch (err) {
      console.error('Error deleting reference:', err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to delete reference. Please try again.',
        confirmButtonColor: '#3b82f6'
      })
    }
  }
}

const fetchReferences = async () => {
  loadingReferences.value = true

  try {
    const res = await api().get('/professional-references')
    referenceList.value = res.data.data || []
  } catch (err) {
    console.error('Error fetching references:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load references. Please refresh the page.',
      confirmButtonColor: '#3b82f6'
    })
  } finally {
    loadingReferences.value = false
  }
}

onMounted(() => {
  fetchReferences()
})
</script>

<style lang="scss" scoped>
</style>
