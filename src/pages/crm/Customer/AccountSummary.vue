<template>
  <div class="p-6 space-y-6">
    <!-- Quick Access Section -->
    <section class="bg-gray-50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Quick Access</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="(field, index) in quickAccessFields" :key="index" class="space-y-1">
          <div class="flex items-center justify-between">
            <select 
              v-model="quickAccessFields[index].name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-white"
              @change="saveQuickAccessFields"
            >
              <option value="">Select Field</option>
              <option 
                v-for="field in allSummaryFields" 
                :value="field.name"
                :disabled="isFieldAlreadySelected(field.name, index)"
              >
                {{ formatFieldName(field.name) }}
              </option>
            </select>
            <button
              @click="removeQuickAccessField(index)"
              class="text-gray-400 hover:text-red-500 ml-2"
              title="Remove"
              v-if="quickAccessFields[index].name"
            >
              <i class="ri-close-line"></i>
            </button>
          </div>

          <div v-if="quickAccessFields[index].name" class="flex items-center justify-between mt-1">
            <div v-if="editingField !== quickAccessFields[index].name" class="p-2 bg-white rounded flex-1">
              {{ getFieldValue(quickAccessFields[index].name) || '-' }}
            </div>

            <input
              v-else
              v-model="tempValues[quickAccessFields[index].name]"
              type="text"
              @blur="saveQuickAccessField(quickAccessFields[index].name)"
              @keyup.enter="saveQuickAccessField(quickAccessFields[index].name)"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border flex-1"
              :placeholder="`Enter ${formatFieldName(quickAccessFields[index].name)}`"
              ref="editInput"
            >

            <button
              @click="toggleEdit(quickAccessFields[index].name)"
              class="text-gray-400 hover:text-blue-500 ml-2"
              :title="editingField === quickAccessFields[index].name ? 'Save' : 'Edit'"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Summary Content -->
    <div>
      <h2 class="text-xl font-semibold mb-6">Account Summary</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div v-for="field in summaryFields" :key="field.name" class="space-y-1">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700 capitalize">
              {{ formatFieldName(field.name) }}:
            </label>
            <button
              @click="toggleEdit(field.name)"
              class="text-gray-400 hover:text-blue-500"
              :title="editingField === field.name ? 'Save' : 'Edit'"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>

          <div v-if="editingField !== field.name" class="p-2 bg-gray-50 rounded">
            {{ field.value || '-' }}
          </div>

          <input
            v-else
            v-model="field.value"
            type="text"
            @blur="saveField(field)"
            @keyup.enter="saveField(field)"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            :placeholder="`Enter ${formatFieldName(field.name)}`"
            ref="editInput"
          >
        </div>
      </div>

      <!-- Project Description (larger field) -->
      <div class="mt-6 col-span-full">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700">Project Description:</label>
          <button
            @click="toggleEdit('Project Description')"
            class="text-gray-400 hover:text-blue-500"
            :title="editingField === 'Project Description' ? 'Save' : 'Edit'"
          >
            <i class="ri-pencil-line"></i>
          </button>
        </div>

        <div v-if="editingField !== 'Project Description'" class="p-2 bg-gray-50 rounded whitespace-pre-line">
          {{ projectDescriptionField.value || 'No description available' }}
        </div>

        <textarea
          v-else
          v-model="projectDescriptionField.value"
          @blur="saveField(projectDescriptionField)"
          @keyup.enter="saveField(projectDescriptionField)"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="Enter project description"
          ref="editTextarea"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useAccountDetailsStore } from '@/stores/AccountDetailsStore'

const accountDetailsStore = useAccountDetailsStore()
const editingField = ref(null)
const editInput = ref(null)
const editTextarea = ref(null)
const tempValues = ref({})
const quickAccessFields = ref(Array(10).fill().map(() => ({ name: '', value: '' })))

// Initialize or load quick access fields
onMounted(() => {
  const savedFields = localStorage.getItem('summaryQuickAccessFields')
  if (savedFields) {
    quickAccessFields.value = JSON.parse(savedFields)
    // Ensure we always have 10 fields
    while (quickAccessFields.value.length < 10) {
      quickAccessFields.value.push({ name: '', value: '' })
    }
  }
})

const allSummaryFields = computed(() => accountDetailsStore.summaryPage)
const summaryFields = computed(() =>
  accountDetailsStore.summaryPage.filter(field => field.name !== 'Project Description')
)
const projectDescriptionField = computed(() =>
  accountDetailsStore.summaryPage.find(field => field.name === 'Project Description') || { name: 'Project Description', value: '' }
)

const formatFieldName = (name) => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/Parent Company Name/, '')
    .replace(/  /g, ' ')
    .trim()
}

const getFieldValue = (fieldName) => {
  const field = accountDetailsStore.summaryPage.find(f => f.name === fieldName)
  return field ? field.value : ''
}

const toggleEdit = (fieldName) => {
  if (editingField.value === fieldName) {
    editingField.value = null
  } else {
    editingField.value = fieldName
    tempValues.value[fieldName] = getFieldValue(fieldName)
    nextTick(() => {
      if (fieldName === 'Project Description') {
        editTextarea.value?.focus()
      } else {
        editInput.value?.focus()
      }
    })
  }
}

const saveField = (field) => {
  accountDetailsStore.updateField(field.name, field.value)
  editingField.value = null
}

const saveQuickAccessField = (fieldName) => {
  accountDetailsStore.updateField(fieldName, tempValues.value[fieldName])
  editingField.value = null
}

const saveQuickAccessFields = () => {
  localStorage.setItem('summaryQuickAccessFields', JSON.stringify(quickAccessFields.value))
}

const removeQuickAccessField = (index) => {
  quickAccessFields.value[index].name = ''
  saveQuickAccessFields()
}

const isFieldAlreadySelected = (fieldName, currentIndex) => {
  return quickAccessFields.value.some((field, index) => 
    field.name === fieldName && index !== currentIndex
  )
}
</script>

<style scoped>
/* Additional custom styles if needed */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}
</style>