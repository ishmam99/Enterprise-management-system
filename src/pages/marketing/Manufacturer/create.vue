<template>
  <div class="p-6 mx-auto bg-white rounded-lg shadow-md">
    <transition name="fade">
      <div v-if="toast.show" 
           :class="`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
        {{ toast.message }}
      </div>
    </transition>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Create Manufacturer</h1>
      <NuxtLink
        to="/admin/inventory_management/brands"
        class="text-sm bg-blue-600 hover:bg-blue-800 text-white p-2 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Brand List
      </NuxtLink>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="name"
          >
            Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="input"
            placeholder="Enter category name"
            required
          />
        </div>

        <div class="sm:col-span-2">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="description"
          >
            Description
          </label>
          <textarea
            v-model="form.description"
            id="description"
            rows="3"
            class="input"
            placeholder="Enter category description"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="status"
          >
            Status <span class="text-red-500">*</span>
          </label>
          <select v-model="form.status" id="status" class="input" required>
            <option value="" disabled selected>Select status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="image"
          >
            Logo
          </label>
          <div class="mt-1 flex items-center">
            <input
              @change="handleFileUpload"
              id="image"
              type="file"
              class="hidden"
              accept="image/*"
              ref="fileInput"
            />
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Choose File
            </button>
            <span class="ml-2 text-sm text-gray-500 truncate max-w-xs">
              {{ form.logo ? form.logo.name : "No file chosen" }}
            </span>
          </div>
          <div v-if="form.logo" class="mt-2">
            <img
              :src="previewImage"
              alt="Preview"
              class="h-20 w-20 object-cover rounded"
              v-if="previewImage"
            />
          </div>
        </div>
      </div>

      <div class="pt-4 flex justify-end space-x-3">
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset
        </button>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
          <span v-else> Create Brand </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>

definePageMeta({
  layout: "supply-chain-management",
});

const toast = reactive({
  show: false,
  message: "",
  type: "", // 'success' or 'error'
});

let toastTimeout = null;

const showToast = (message, type = "success") => {
  toast.show = true;
  toast.message = message;
  toast.type = type;

  // Hide after 3 seconds
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// const toast = useToast()
const fileInput = ref(null);
const previewImage = ref(null);

const form = reactive({
  name: "",
  description: "",
  logo: null,
  status: "",
});

const isSubmitting = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.logo = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const resetForm = () => {
  form.name = "";
  form.description = "";
  form.logo = null;
  form.status = "";
  previewImage.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const submitForm = async () => {
  isSubmitting.value = true;

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("status", form.status);
  if (form.logo) {
    formData.append("logo", form.logo);
  }

  try {
    await useApi("brand", {
      method: "POST",
      body: formData,
    });

    showToast('Brand created successfully!', 'success')
    resetForm();
  } catch (error) {
    console.error("Failed to create brand:", error);
    showToast(error.response?.data?.message || 'Failed to create brand', 'error')
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150;
}
/* Toast animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
