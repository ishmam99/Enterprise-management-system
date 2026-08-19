<template>
  <div class="p-6 space-y-6 w-full">
    <h2 class="text-2xl font-bold flex items-center gap-2 text-blue-800">
      <i class="ri-macbook-line text-2xl"></i> Software Overview
    </h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow">
        <h3 class="font-semibold text-blue-700 flex items-center gap-2">
          <i class="ri-cpu-line"></i> MSC Nastran
        </h3>
        <p class="text-sm text-blue-900 mt-2">
          Structural analysis suite for finite element simulation.
        </p>
      </div>

      <div class="bg-indigo-50 border-l-4 border-indigo-400 rounded-lg p-4 shadow">
        <h3 class="font-semibold text-indigo-700 flex items-center gap-2">
          <i class="ri-robot-line"></i> Adams
        </h3>
        <p class="text-sm text-indigo-900 mt-2">
          Motion simulation software for dynamic system analysis.
        </p>
      </div>

      <div class="bg-teal-50 border-l-4 border-teal-400 rounded-lg p-4 shadow">
        <h3 class="font-semibold text-teal-700 flex items-center gap-2">
          <i class="ri-tools-line"></i> Simufact Forming
        </h3>
        <p class="text-sm text-teal-900 mt-2">
          Metal forming solution for process optimization.
        </p>
      </div>
    </div>
  </div>
</template>
