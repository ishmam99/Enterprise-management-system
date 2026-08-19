<template>
  <div class="p-6 space-y-8">
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
              <optgroup v-for="(group, groupName) in allFields" :label="groupName">
                <option 
                  v-for="field in group" 
                  :value="field.name"
                  :disabled="isFieldAlreadySelected(field.name, index)"
                >
                  {{ formatFieldName(field.name) }}
                </option>
              </optgroup>
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
              @blur="saveField(quickAccessFields[index].name)"
              @keyup.enter="saveField(quickAccessFields[index].name)"
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

    <!-- Rest of your existing sections (Sales Overview, Project Overview, etc.) -->
    <section v-for="section in sections" :key="section.title">
      <h2 class="text-xl font-semibold mb-4">{{ section.title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="field in section.fields" :key="field.name" class="space-y-1">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700">
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
            {{ getFieldValue(field.name) || '-' }}
          </div>

          <input
            v-else
            v-model="tempValues[field.name]"
            type="text"
            @blur="saveField(field.name)"
            @keyup.enter="saveField(field.name)"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            :placeholder="`Enter ${formatFieldName(field.name)}`"
            ref="editInput"
          >
        </div>
      </div>
    </section>

        <div class="grid grid-cols-1 gap-6 mt-8">
      <!-- Notes Card -->
      <div 
        class="border rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        @click="navigateTo('notes')"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Notes</h3>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </div>
        <p class="text-gray-500 mt-2">View and manage all account notes</p>
      </div>

      <!-- Deals Card -->
      <div 
        class="border rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        @click="navigateTo('deals')"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Deals</h3>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </div>
        <p class="text-gray-500 mt-2">View and manage all account deals</p>
      </div>

      <!-- Invoice Card -->
      <div 
        class="border rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        @click="navigateTo('invoice')"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Invoice</h3>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </div>
        <p class="text-gray-500 mt-2">View and manage all invoices</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useAccountDetailsStore } from '@/stores/AccountDetailsStore'

const accountDetailsStore = useAccountDetailsStore()
const editingField = ref(null)
const editInput = ref(null)
const tempValues = ref({})
const quickAccessFields = ref(Array(10).fill().map(() => ({ name: '', value: '' })))

// Initialize or load quick access fields
onMounted(() => {
  const savedFields = localStorage.getItem('quickAccessFields')
  if (savedFields) {
    quickAccessFields.value = JSON.parse(savedFields)
    // Ensure we always have 10 fields
    while (quickAccessFields.value.length < 10) {
      quickAccessFields.value.push({ name: '', value: '' })
    }
  }
})

// All available fields grouped by section
const allFields = computed(() => ({
  'Sales Overview': accountDetailsStore.salesOverview,
  'Project Overview': accountDetailsStore.projectOverview,
  'Owner Details': accountDetailsStore.ownerDetails,
  'Architect Details': accountDetailsStore.architectDetails,
  'Contractor Details': accountDetailsStore.contractorDetails,
  'Developer Details': accountDetailsStore.developerDetails
}))

// Sections for the main content
const sections = computed(() => [
  { title: 'Sales Overview', fields: accountDetailsStore.salesOverview },
  { title: 'Project Overview', fields: accountDetailsStore.projectOverview },
  { title: 'Owner Details', fields: accountDetailsStore.ownerDetails },
  { title: 'Architect Details', fields: accountDetailsStore.architectDetails },
  { title: 'Contractor Details', fields: accountDetailsStore.contractorDetails },
  { title: 'Developer Details', fields: accountDetailsStore.developerDetails }
])

// Format field names to be more readable
const formatFieldName = (name) => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/Parent Company Name/, '')
    .replace(/  /g, ' ')
    .trim()
}

// Get field value from the store
const getFieldValue = (fieldName) => {
  const summaryField = accountDetailsStore.summaryPage.find(f => f.name === fieldName)
  return summaryField ? summaryField.value : ''
}

const toggleEdit = (fieldName) => {
  if (editingField.value === fieldName) {
    saveField(fieldName)
  } else {
    editingField.value = fieldName
    tempValues.value[fieldName] = getFieldValue(fieldName)
    nextTick(() => {
      editInput.value?.focus()
    })
  }
}

const saveField = (fieldName) => {
  if (editingField.value === fieldName) {
    accountDetailsStore.updateField(fieldName, tempValues.value[fieldName])
    editingField.value = null
  }
}

const saveQuickAccessFields = () => {
  localStorage.setItem('quickAccessFields', JSON.stringify(quickAccessFields.value))
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
/* Add any custom styles if needed */
section {
  @apply border-b border-gray-200 pb-8 last:border-b-0 last:pb-0;
}

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