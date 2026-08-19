<template>
  <div class="max-w-7xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden">
    <div class="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
      <h1 class="text-3xl w-full text-center font-semibold text-white">All Product List</h1>
      <!-- <button
        class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all"
      >
        + Add Product
      </button> -->
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">#</th>
            <th class="px-6 py-3 text-left font-semibold">Service Areas</th>
            <th class="px-6 py-3 text-left font-semibold">Product Name</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in products"
            :key="index"
            class="hover:bg-gray-50 transition-colors border-b"
          >
            <td class="px-6 py-3 font-medium text-gray-800">{{ index + 1 }}</td>
            <td class="px-6 py-3 text-gray-800">{{ product.serviceName }}</td>
            <td class="px-6 py-3 text-gray-800">{{ product.softwareName }}</td>

          </tr>

          <tr v-if="!products.length">
            <td colspan="3" class="text-center py-6 text-gray-400">
              No products available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { serviceName: "A. Structural Analysis", softwareName: "A1a. Patran" },
  { serviceName: "A. Structural Analysis", softwareName: "A1b. Natran" },
  { serviceName: "A. Structural Analysis", softwareName: "A1c. Marc" },
  { serviceName: "A. Structural Analysis", softwareName: "A1d. MSC Fatigue" },
  { serviceName: "A. Structural Analysis", softwareName: "A1e. Adams" },
  { serviceName: "A. Structural Analysis", softwareName: "A1f. Sim Manager" },
  { serviceName: "A. Structural Analysis", softwareName: "A1g. Dytran" },
  { serviceName: "A. Structural Analysis", softwareName: "A1h. MSC Apex" },

  { serviceName: "B. System Dynamics", softwareName: "B1a. Romax" },
  { serviceName: "B. System Dynamics", softwareName: "B1b. Easy 5" },
  { serviceName: "B. System Dynamics", softwareName: "B1c. Elements" },

  { serviceName: "C. Acouastics", softwareName: "C1a. Actran" },

  { serviceName: "D. Fluids", softwareName: "D1a. MSC Cradle CFD" },
  { serviceName: "D. Fluids", softwareName: "D1b. MSCCoSim" },

  { serviceName: "E. Autonomuos", softwareName: "E1a. VTDScale" },
  { serviceName: "E. Autonomuos", softwareName: "E1b. VTD" },
  { serviceName: "E. Autonomuos", softwareName: "E1c. Clouds" },

  { serviceName: "F. VM&C", softwareName: "F1a. ODYSSEE" },
  { serviceName: "F. VM&C", softwareName: "F1b. Simufact" },
  { serviceName: "F. VM&C", softwareName: "F1c. FTI FormingSuite" },

  { serviceName: "G. ICME (Materials)", softwareName: "G1a. MaterialCenter" },
  { serviceName: "G. ICME (Materials)", softwareName: "G1b. Digimat" },
  { serviceName: "G. ICME (Materials)", softwareName: "G1c. MaterialCenterDatabanks" },


])
</script>
