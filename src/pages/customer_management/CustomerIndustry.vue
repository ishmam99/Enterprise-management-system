<template>
  <div class="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-400">
    <h2 class="text-xl font-semibold text-yellow-800 flex items-center gap-2">
      <i class="ri-building-4-line text-2xl"></i> Industry Sectors
    </h2>

    <div class="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="p-4 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
        <i class="ri-car-line text-3xl text-yellow-600 mb-2"></i>
        <h3 class="font-medium text-yellow-800">Automotive</h3>
        <p class="text-sm text-gray-500 mt-1">Vehicle structure design and simulation.</p>
      </div>

      <div class="p-4 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
        <i class="ri-rocket-line text-3xl text-yellow-600 mb-2"></i>
        <h3 class="font-medium text-yellow-800">Aerospace</h3>
        <p class="text-sm text-gray-500 mt-1">Thermal and aerodynamic performance evaluation.</p>
      </div>

      <div class="p-4 bg-yellow-50 rounded-lg shadow hover:shadow-md transition">
        <i class="ri-oil-line text-3xl text-yellow-600 mb-2"></i>
        <h3 class="font-medium text-yellow-800">Energy</h3>
        <p class="text-sm text-gray-500 mt-1">Industrial plant modeling and stress analysis.</p>
      </div>
    </div>
  </div>
</template>
