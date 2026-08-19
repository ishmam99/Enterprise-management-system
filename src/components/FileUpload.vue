<!-- components/FileUpload.vue -->
<template>
  <div class="file-upload">
    <input 
      type="file" 
      ref="fileInput"
      :accept="accept"
      @change="handleFileChange"
      class="hidden"
    >
    <button
      @click="triggerFileInput"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
    >
      <Icon :name="icon" />
      <span>{{ label }}</span>
    </button>
    <div v-if="file" class="mt-2">
      <p class="text-sm text-gray-600">Selected: {{ file.name }}</p>
      <button
        @click="removeFile"
        class="text-red-600 text-sm mt-1 flex items-center gap-1"
      >
        <Icon name="material-symbols:delete" class="text-sm" />
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  accept: {
    type: String,
    default: '*/*'
  },
  label: {
    type: String,
    default: 'Upload'
  },
  icon: {
    type: String,
    default: 'material-symbols:upload'
  }
})

const emit = defineEmits(['file-selected'])

const fileInput = ref(null)
const file = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    emit('file-selected', selectedFile)
  }
}

const removeFile = () => {
  file.value = null
  fileInput.value.value = ''
  emit('file-selected', null)
}
</script>