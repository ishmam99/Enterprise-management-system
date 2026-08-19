<template>
   <div class="max-w-7xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden">
     <div class="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
         <h1 class="text-3xl w-full text-center font-semibold text-white">Create Product</h1>
         <!-- <button
           class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all"
         >
           + Add Product
         </button> -->
       </div>

    <form @submit.prevent="handleSubmit" class="space-y-5 px-10">


      <!-- Service Area (Multi-select) -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Service Area</label>

        <div
          @click="toggleDropdown('area')"
          class="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex flex-wrap gap-2 min-h-[42px]"
        >
          <template v-if="selectedServiceAreas.length">
            <span
              v-for="(area, index) in selectedServiceAreas"
              :key="area"
              class="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              {{ area }}
              <button
                type="button"
                @click.stop="removeArea(index)"
                class="text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          </template>
          <span v-else class="text-gray-400 text-sm">Select service areas...</span>
        </div>

        <div
          v-if="showAreaDropdown"
          class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          <div
            v-for="area in serviceAreas"
            :key="area"
            @click.stop="toggleAreaSelection(area)"
            class="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
          >
            <span>{{ area }}</span>
            <input type="checkbox" :checked="selectedServiceAreas.includes(area)" />
          </div>
        </div>
      </div>

      <!-- Service Type (Multi-select) -->
      <!-- <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>

        <div
          @click="toggleDropdown('type')"
          class="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex flex-wrap gap-2 min-h-[42px]"
        >
          <template v-if="selectedServiceTypes.length">
            <span
              v-for="(type, index) in selectedServiceTypes"
              :key="type"
              class="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              {{ type }}
              <button
                type="button"
                @click.stop="removeType(index)"
                class="text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          </template>
          <span v-else class="text-gray-400 text-sm">Select service types...</span>
        </div>

        <div
          v-if="showTypeDropdown"
          class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          <div
            v-for="type in serviceTypes"
            :key="type"
            @click.stop="toggleTypeSelection(type)"
            class="px-3 py-2 hover:bg-green-50 cursor-pointer flex justify-between items-center"
          >
            <span>{{ type }}</span>
            <input type="checkbox" :checked="selectedServiceTypes.includes(type)" />
          </div>
        </div>
      </div> -->
       <!-- Product Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          v-model="productName"
          type="text"
          placeholder="Enter product name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        Create Product
      </button>
    </form>

    <!-- Debug Output -->
    <div class="mt-6 bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
      <p><strong>Product Name:</strong> {{ productName }}</p>
      <p><strong>Service Areas:</strong> {{ selectedServiceAreas.join(', ') }}</p>
      <!-- <p><strong>Service Types:</strong> {{ selectedServiceTypes.join(', ') }}</p> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const productName = ref('')
const serviceAreas = ['Structural Analysis','System Dynamics','Acouastics','Fluids','Autonomuos','VM&C','ICME (Materials)']
// const serviceTypes = [ 'Software Sales' ,'Software Taining','Engineering Service']

const selectedServiceAreas = ref([])
const selectedServiceTypes = ref([])

const showAreaDropdown = ref(false)
const showTypeDropdown = ref(false)

const toggleDropdown = (type) => {
  if (type === 'area') {
    showAreaDropdown.value = !showAreaDropdown.value
    showTypeDropdown.value = false
  } else {
    showTypeDropdown.value = !showTypeDropdown.value
    showAreaDropdown.value = false
  }
}

const toggleAreaSelection = (area) => {
  const index = selectedServiceAreas.value.indexOf(area)
  if (index === -1) selectedServiceAreas.value.push(area)
  else selectedServiceAreas.value.splice(index, 1)
}

const toggleTypeSelection = (type) => {
  const index = selectedServiceTypes.value.indexOf(type)
  if (index === -1) selectedServiceTypes.value.push(type)
  else selectedServiceTypes.value.splice(index, 1)
}

const removeArea = (index) => selectedServiceAreas.value.splice(index, 1)
const removeType = (index) => selectedServiceTypes.value.splice(index, 1)

const handleSubmit = () => {
  const product = {
    name: productName.value,
    serviceAreas: selectedServiceAreas.value,
    serviceTypes: selectedServiceTypes.value,
  }
  console.log('Product created:', product)
  alert('Product created successfully!')
}
</script>
