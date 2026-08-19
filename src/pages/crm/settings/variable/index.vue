<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
    <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-800">Variables</h1>
        <router-link to="/crm/settings/variable/create"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          + Add New Field
        </router-link>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input v-model="search" type="text" placeholder="Search by label..."
          class="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400" />

        <select v-model="typeFilter"
          class="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400">
          <option value="">All Types</option>
          <option v-for="type in fieldTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <select v-model="moduleFilter"
          class="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400">
          <option value="">All Modules</option>
          <option v-for="module in availableModules" :key="module" :value="module">
            {{ module }}
          </option>
        </select>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse table-zebra">
          <thead>
            <tr class="bg-indigo-600 text-white">
              <th class="text-left border-e px-4 py-3 rounded-tl-lg">Label</th>
              <th class="text-left border-e px-4 py-3">Type</th>
              <th class="text-left border-e px-4 py-3">Module Name</th>
              <th class="text-left border-e px-4 py-3">Required</th>
              <th class="text-left border-e px-4 py-3">Unique</th>
              <th class="text-left border-e px-4 py-3">Order Group</th>
              <th class="text-left border-e px-4 py-3">Options</th>
              <th class="text-right px-4 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="70" class="text-center text-gray-500 py-6">
                <div>
                  <span class="loading loading-spinner loading-lg text-indigo-600"></span>
                  <p class="mt-2">Loading fields...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="!filteredFields.length">
              <td colspan="70" class="text-center text-gray-500 py-6">No fields found.</td>
            </tr>
            <tr v-for="field in filteredFields" v-else :key="field.id" class="border-b hover:bg-indigo-50 transition">
              <td class="px-4 py-1 border-x font-medium text-gray-800">{{ field.label }}</td>
              <td class="px-4 py-1 border-e capitalize text-gray-700">{{ field.type }}</td>
              <td class="px-4 py-1 border-e font-semibold capitalize text-gray-700">
                {{ field.module.name }}
              </td>
              <td class="px-4 py-1 border-e">
                <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="field.required ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  ">
                  {{ field.required ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="px-4 py-1 border-e">
                <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="field.unique ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  ">
                  {{ field.unique ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="px-4 py-1 border-e">
                <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="'bg-gray-100 text-gray-600'
                  ">
                  {{ field.order_group }}
                </span>
              </td>
              <td class="px-4 py-1 border-e text-gray-600 truncate max-w-xs">
                <span v-if="field.options?.length">
                  {{ field.options.join(', ') }}
                </span>
                <span v-else>-</span>
              </td>
              <td class="px-4 py-1 border-e flex justify-end gap-2">
                <router-link :to="`/crm/settings/variable/edit/${field.id}`"
                  class="text-indigo-600 border px-2 py-1 rounded-lg hover:text-white hover:bg-indigo-600 font-medium">
                  Edit
                </router-link>
                <button @click="deleteField(field.id)" :disabled="deletingId === field.id"
                  class="text-red-500 border px-2 py-1 rounded-lg hover:text-white hover:bg-red-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="deletingId === field.id" class="loading loading-spinner loading-sm"></span>
                  <span v-else>Delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { ref, computed, onMounted, watch } from "vue";
const authStore = useAuthStore()
const fields = ref([]);
const search = ref("");
const typeFilter = ref("");
const moduleFilter = ref(authStore.variableModuleId || '')

// store instance


watch(moduleFilter, (newVal) => {
  authStore.setVariableModuleId(newVal || null)
})



const fieldTypes = [
  "text",
  "textarea",
  "number",
  "email",
  "date",
  "select",
  "checkbox",
];

// Compute available modules from fields data
const availableModules = computed(() => {
  const modules = new Set();
  fields.value.forEach(field => {
    if (field.module && field.module.name) {
      modules.add(field.module.name);
    }
  });
  return Array.from(modules).sort();
});

// Filtered Fields
const filteredFields = computed(() => {
  return fields.value.filter((f) => {
    const matchesSearch = f.label.toLowerCase().includes(search.value.toLowerCase());
    const matchesType = typeFilter.value ? f.type === typeFilter.value : true;
    const matchesModule = moduleFilter.value ?
      f.module?.name?.toLowerCase() === moduleFilter.value.toLowerCase() : true;

    return matchesSearch && matchesType && matchesModule;
  });
});

const getFields = async () => {
  try {
    const response = await api().get('/crm/field');
    fields.value = response.data;
  } catch (error) {
    console.error("Error fetching fields:", error);
  }
}

onMounted(() => {
  getFields();
});

const deleteField = async (id) => {
  if (confirm("Are you sure you want to delete this field?")) {
    try {
      await api().delete(`/crm/field/${id}`);
      fields.value = fields.value.filter((f) => f.id !== id);
      alert("Field deleted successfully!");
    } catch (error) {
      console.error("Error deleting field:", error);
      alert("Failed to delete field");
    }
  }
};
</script>