<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-10">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-800">Edit Module Field</h1>
        <router-link
          to="/crm/settings/variable"
          class="text-indigo-600 border px-2 py-1 rounded-lg hover:text-white hover:bg-indigo-600 text-sm"
        >
          ← Back to Field List
        </router-link>
      </div>

      <!-- Field Edit Form -->
      <div class="space-y-5">
        <!-- Field Label -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
          <input
            v-model="field.label"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <!-- Field Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
          <select
            v-model="field.type"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option disabled value="">Select type</option>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="select">Dropdown</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Order Group</label>
          <select
            v-model="field.order_group"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option selected disabled value="">Select Order Group</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
          </select>
        </div>

        <!-- Required Checkbox -->
        <div class="flex items-center">
          <input
            id="required"
            v-model="field.required"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label for="required" class="ml-2 text-sm text-gray-700">Required Field</label>
        </div>

        <!-- Options Section for Dropdown or Checkbox -->
        <div v-if="field.type === 'select' || field.type === 'checkbox'">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-semibold text-gray-700">
              {{ field.type === 'select' ? 'Dropdown Options' : 'Checkbox Values' }}
            </h2>
            <div class="flex gap-2">
              <!-- Bulk Add Button -->
              <button
                @click="openBulkAddModal"
                class="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Bulk Add
              </button>
              
              <!-- Add Option Button -->
              <button
                @click="addOption"
                class="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Option
              </button>
              
              <!-- Remove All Button (only show if there are options) -->
              <button
                v-if="field.options?.length"
                @click="confirmRemoveAll"
                class="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove All
              </button>
            </div>
          </div>

          <!-- Drag & Drop Instructions -->
          <div v-if="field.options?.length" class="mb-2 text-xs text-gray-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 15h8" />
              <circle cx="6" cy="12" r="1" fill="currentColor" />
              <circle cx="18" cy="12" r="1" fill="currentColor" />
            </svg>
            Drag the dots to reorder options
          </div>

          <!-- Bulk Add Modal -->
          <div v-if="showBulkAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Bulk Add Options</h3>
              <p class="text-sm text-gray-600 mb-3">
                Enter each option on a new line. Empty lines will be ignored.
              </p>
              <textarea
                v-model="bulkOptionsText"
                rows="8"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 font-mono text-sm"
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              ></textarea>
              
              <!-- Preview of parsed options -->
              <div v-if="parsedBulkOptions.length" class="mt-3">
                <p class="text-sm font-medium text-gray-700 mb-2">Preview ({{ parsedBulkOptions.length }} options):</p>
                <div class="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                  <div v-for="(opt, idx) in parsedBulkOptions" :key="idx" class="text-sm text-gray-600">
                    • {{ opt }}
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end gap-3 mt-6">
                <button
                  @click="closeBulkAddModal"
                  class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  @click="addBulkOptions"
                  :disabled="!parsedBulkOptions.length"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add {{ parsedBulkOptions.length }} Options
                </button>
              </div>
            </div>
          </div>

          <!-- Remove All Confirmation Modal -->
          <div v-if="showRemoveAllConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Remove All Options</h3>
              <p class="text-gray-600 mb-6">
                Are you sure you want to remove all {{ field.options.length }} options? This action cannot be undone.
              </p>
              <div class="flex justify-end gap-3">
                <button
                  @click="showRemoveAllConfirm = false"
                  class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  @click="removeAllOptions"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Remove All
                </button>
              </div>
            </div>
          </div>

          <!-- Draggable Options List -->
          <div v-if="field.options?.length" class="space-y-2">
            <TransitionGroup name="list" tag="div" class="space-y-2">
              <div
                v-for="(option, index) in field.options"
                :key="index"
                class="flex items-center gap-3 group"
                draggable="true"
                @dragstart="handleDragStart($event, index)"
                @dragover.prevent
                @dragenter.prevent
                @drop="handleDrop($event, index)"
              >
                <!-- Drag Handle -->
                <div class="cursor-move text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 15h8" />
                    <circle cx="6" cy="12" r="1" fill="currentColor" />
                    <circle cx="18" cy="12" r="1" fill="currentColor" />
                  </svg>
                </div>
                
                <!-- Option Input -->
                <input
                  v-model="field.options[index]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                  :placeholder="`Option ${index + 1}`"
                />
                
                <!-- Move Up Button (disabled for first item) -->
                <button
                  @click="moveOptionUp(index)"
                  :disabled="index === 0"
                  class="text-gray-500 hover:text-indigo-600 p-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                
                <!-- Move Down Button (disabled for last item) -->
                <button
                  @click="moveOptionDown(index)"
                  :disabled="index === field.options.length - 1"
                  class="text-gray-500 hover:text-indigo-600 p-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Remove Button -->
                <button
                  @click="removeOption(index)"
                  class="text-red-500 hover:text-red-700 p-1"
                  title="Remove this option"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </TransitionGroup>
          </div>

          <p v-else class="text-gray-500 italic text-sm">No options added yet.</p>
        </div>

        <!-- Save Button -->
        <div class="pt-6 flex justify-end">
          <button
            @click="saveField"
            :disabled="loading"
            class="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <div v-if="loading" class="flex items-center gap-2">
              <span class="loading loading-spinner"></span>
              <span>Saving</span>
            </div>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/config/api";
import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Modal states
const showBulkAddModal = ref(false);
const showRemoveAllConfirm = ref(false);
const bulkOptionsText = ref("");
const draggedItemIndex = ref(null);

const field = ref({
  id: null,
  order_group: "",
  label: "",
  type: "",
  name: '',
  required: false,
  options: []
})

const loading = ref(false);

// Parse bulk options text into array (filter out empty lines and trim)
const parsedBulkOptions = computed(() => {
  return bulkOptionsText.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');
});

// Fetch field data
const fetchField = async(id) => {
  const {data} = await api().get(`/crm/field/${id}`);
  field.value = data;
  field.value.options = data.options != null && data.options != "" ? data.options : [];
};

// Option management
const addOption = () => {
  field.value.options.push('')
}

const removeOption = (index) => {
  field.value.options.splice(index, 1);
};

// Drag and drop functionality
const handleDragStart = (event, index) => {
  draggedItemIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
  // Add a class to the dragged element
  event.target.classList.add('opacity-50');
};

const handleDrop = (event, dropIndex) => {
  event.preventDefault();
  // Remove the opacity class
  event.target.classList.remove('opacity-50');
  
  if (draggedItemIndex.value === null) return;
  
  // Don't do anything if dropping at the same position
  if (draggedItemIndex.value === dropIndex) {
    draggedItemIndex.value = null;
    return;
  }
  
  // Reorder the array
  const newOptions = [...field.value.options];
  const [draggedItem] = newOptions.splice(draggedItemIndex.value, 1);
  newOptions.splice(dropIndex, 0, draggedItem);
  field.value.options = newOptions;
  
  draggedItemIndex.value = null;
};

// Move up/down buttons
const moveOptionUp = (index) => {
  if (index > 0) {
    const newOptions = [...field.value.options];
    [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
    field.value.options = newOptions;
  }
};

const moveOptionDown = (index) => {
  if (index < field.value.options.length - 1) {
    const newOptions = [...field.value.options];
    [newOptions[index], newOptions[index + 1]] = [newOptions[index + 1], newOptions[index]];
    field.value.options = newOptions;
  }
};

// Bulk add functionality
const openBulkAddModal = () => {
  bulkOptionsText.value = "";
  showBulkAddModal.value = true;
};

const closeBulkAddModal = () => {
  showBulkAddModal.value = false;
  bulkOptionsText.value = "";
};

const addBulkOptions = () => {
  if (parsedBulkOptions.value.length) {
    // Add all parsed options to the existing options
    field.value.options = [...field.value.options, ...parsedBulkOptions.value];
    closeBulkAddModal();
  }
};

// Remove all functionality
const confirmRemoveAll = () => {
  showRemoveAllConfirm.value = true;
};

const removeAllOptions = () => {
  field.value.options = [];
  showRemoveAllConfirm.value = false;
};

// Watch for type changes
watch(
  () => field.value.type,
  (newType) => {
    if (newType !== 'select' && newType !== 'checkbox') {
      field.value.options = []
    }
  }
);

// Save field
// Save field
const saveField = async() => {
  try {
    loading.value = true;
    field.value._method = 'PUT';
    
    // Generate name from label (add this before sending to API)
    const fieldName = field.value.label
      .replace(/\//g, '_')
      .replace(/-/g, '_')
      .replace(/\s+/g, '_')
      .toLowerCase();
    
    // Prepare data with the generated name
    const dataToSend = {
      ...field.value,
      name: fieldName
    };
    
    await api().post(`/crm/field/${field.value.id}`, dataToSend);
    router.push("/crm/settings/variable");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const fieldId = route.params.id
  fetchField(fieldId)
})
</script>

<style scoped>
/* Transition animations for reordering */
.list-move {
  transition: transform 0.3s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* Drag and drop styles */
[draggable="true"] {
  cursor: move;
}

[draggable="true"]:active {
  opacity: 0.8;
}
</style>