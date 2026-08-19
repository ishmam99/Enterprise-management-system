<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-10">
    <div
      class="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <!-- Header -->
      <div
        class="flex justify-between items-center bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 px-8 py-5"
      >
        <h1 class="text-3xl w-full text-center font-extrabold text-white tracking-wide drop-shadow-md">
          🌟 All {{ instanceName }} Events List
        </h1>
        <!-- Optional Add Button -->
        <!--
        <button
          class="bg-white/90 text-indigo-700 px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-50 transition-all duration-300"
        >twar
          + Add Item
        </button>
        -->
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto p-6">
        <table class="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr class="bg-gradient-to-r from-indigo-100 to-blue-50 text-indigo-700 uppercase text-sm font-semibold tracking-wide shadow-sm">
              <th class="px-6 py-3 text-left rounded-l-xl">#</th>
              <th class="px-6 py-3 text-left">Events Type</th>
              <th class="px-6 py-3 text-left rounded-r-xl">Events Name</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="bg-white hover:scale-[1.01] hover:bg-indigo-50 transition-all duration-300 ease-in-out shadow-sm rounded-xl"
            >
              <td class="px-6 py-3 font-semibold text-gray-800 rounded-l-xl">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-3 text-gray-700">{{ instanceName }}</td>
              <td class="px-6 py-3 text-gray-700 rounded-r-xl">
                {{ item.softwareName }}
              </td>
            </tr>

            <tr v-if="!items.length">
              <td
                colspan="3"
                class="text-center py-6 text-gray-400 bg-white/60 rounded-xl shadow-inner"
              >
                🚫 No softwares available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const instanceName = computed(()=>{
  return route.params.name
})

const items = ref([
  {eventType : "Internal" , softwareName : "TechFusion 2025"},
  {eventType : "Internal" , softwareName : "Code Innovate Week"},
  {eventType : "Internal" , softwareName : "SysOps Excellence Program"},
  {eventType : "Internal" , softwareName : "NextGen Cloud Academy"},
  {eventType : "Internal" , softwareName : "Digital Defense Camp"},
  {eventType : "Internal" , softwareName : "Data Intelligence Bootcamp"},
])
</script>

<style lang="scss" scoped>

</style>
