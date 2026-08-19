<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-800">Layouts</h1>

      </div>



      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-indigo-600 text-white">
              <th class="text-left px-4 py-3 rounded-tl-lg">Module Name</th>
              <th class="text-left px-4 py-3">Number of variables</th>

              <th class="text-right px-4 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="field in modules"
              :key="field.id"
              class="border-b hover:bg-indigo-50 transition"
            >
              <td class="px-4 py-3 font-medium text-gray-800"> <i :class="field.icon"></i> {{ field.label }}</td>
              <td class="px-4 py-3 font-semibold capitalize text-gray-700">{{ field.fields_count }}</td>

              <td class="px-4 py-3 flex justify-end gap-2">
                <router-link
                  :to="`/crm/settings/layout/edit/${field.id}`"
                  class="text-white btn btn-info hover:text-indigo-800 font-medium"
                >
                  Edit
                </router-link>
                <router-link
                  :to="`/crm/settings/layout/view/${field.id}`"
                  class="text-white btn btn-success hover:text-indigo-800 font-medium"
                >
                  View
                </router-link>

              </td>
            </tr>

            <tr v-if="!modules.length">
              <td colspan="7" class="text-center text-gray-500 py-6">
                No fields found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const modules = ref([]);
const getModules = async() => {
  try {
    const response = await api().get('/crm/modules');
    modules.value = response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
  }
}

onMounted(() => {
  getModules();
});

</script>
