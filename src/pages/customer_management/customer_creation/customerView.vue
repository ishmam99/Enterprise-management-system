<template>
  <div class="p-6 space-y-6">

<!-- Header -->
<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <h1 class="text-3xl font-bold text-gray-800">Customer Profile</h1>
  <button class="btn btn-sm btn-primary flex items-center gap-2">
    <i class="ri-edit-line text-lg"></i> Edit Profile
  </button>
</div>

<!-- Summary Cards with Soft Colors -->


<!-- Profile Card -->
<div class="flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-lg p-6 border-l-8 border-primary">
  <img
    src="/src/assets/people.png"
    alt="User Avatar"
    class="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
  />
  <div class="flex-1 max-w-lg text-center md:text-left">
    <h2 class="text-2xl font-semibold text-gray-800">John Doe</h2>
    <p class="text-gray-500">Senior Mechanical Engineer</p>
    <p class="text-sm text-gray-400">johndoe@email.com | +1 (555) 123-4567</p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  <div class="p-4 rounded-lg bg-blue-50 text-center shadow">
    <h2 class="text-lg font-medium text-blue-700">Softwares</h2>
    <p class="text-2xl font-bold text-blue-900 mt-2">5</p>
  </div>
  <div class="p-4 rounded-lg bg-green-50 text-center shadow">
    <h2 class="text-lg font-medium text-green-700">Users</h2>
    <p class="text-2xl font-bold text-green-900 mt-2">12</p>
  </div>
  <div class="p-4 rounded-lg bg-purple-50 text-center shadow">
    <h2 class="text-lg font-medium text-purple-700">Solutions</h2>
    <p class="text-2xl font-bold text-purple-900 mt-2">8</p>
  </div>
  <div class="p-4 rounded-lg bg-yellow-50 text-center shadow">
    <h2 class="text-lg font-medium text-yellow-700">Industries</h2>
    <p class="text-2xl font-bold text-yellow-900 mt-2">3</p>
  </div>
  <div class="p-4 rounded-lg bg-indigo-50 text-center shadow">
    <h2 class="text-lg font-medium text-indigo-700">Trainings</h2>
    <p class="text-2xl font-bold text-indigo-900 mt-2">4</p>
  </div>
  <div class="p-4 rounded-lg bg-pink-50 text-center shadow">
    <h2 class="text-lg font-medium text-pink-700">Sessions</h2>
    <p class="text-2xl font-bold text-pink-900 mt-2">15</p>
  </div>
</div>
</div>

<!-- Software & Solutions Cards -->
<div class="grid md:grid-cols-2 gap-6">
  <div class="p-4 rounded-lg bg-blue-50 shadow border-l-4 border-blue-400">
    <h3 class="font-semibold text-lg flex items-center gap-2 text-blue-800">
      <i class="ri-macbook-line text-xl"></i> Software Purchased
    </h3>
    <ul class="list-disc ml-6 mt-2 text-blue-900 space-y-1">
      <li>MSC Nastran – Structural Analysis Suite</li>
      <li>Adams – Motion Simulation</li>
      <li>Simufact Forming – Metal Forming Solution</li>
    </ul>
  </div>

  <div class="p-4 rounded-lg bg-green-50 shadow border-l-4 border-green-400">
    <h3 class="font-semibold text-lg flex items-center gap-2 text-green-800">
      <i class="ri-lightbulb-flash-line text-xl"></i> Solutions Used
    </h3>
    <p class="text-green-900 mt-2">
      Structural Optimization, Thermal Analysis, and Design Validation
      for automotive component development.
    </p>
  </div>
</div>

<!-- Skills & License Cards -->
<div class="grid md:grid-cols-2 gap-6">
  <div class="p-4 rounded-lg bg-purple-50 shadow border-l-4 border-purple-400">
    <h3 class="font-semibold text-lg flex items-center gap-2 text-purple-800">
      <i class="ri-tools-line text-xl"></i> Skills
    </h3>
    <div class="flex flex-wrap gap-2 mt-3 text-purple-900">
      <span class="badge badge-outline border-purple-800 text-purple-800">FEA Analysis</span>
      <span class="badge badge-outline border-purple-800 text-purple-800">CAD Modeling</span>
      <span class="badge badge-outline border-purple-800 text-purple-800">Simulation Setup</span>
      <span class="badge badge-outline border-purple-800 text-purple-800">Python Scripting</span>
    </div>
  </div>

  <div class="p-4 rounded-lg bg-yellow-50 shadow border-l-4 border-yellow-400">
    <h3 class="font-semibold text-lg flex items-center gap-2 text-yellow-800">
      <i class="ri-key-2-line text-xl"></i> License Information
    </h3>
    <ul class="ml-6 mt-2 list-disc text-yellow-900 space-y-1">
      <li>Total Licenses: 5</li>
      <li>Active Licenses: 4</li>
      <li>Expiry Date: 12 Jan 2026</li>
    </ul>
  </div>
</div>

<!-- Training Sessions Table with Striped Rows -->
<div class="p-4 rounded-lg bg-indigo-50 shadow border-l-4 border-indigo-400">
  <h3 class="font-semibold text-lg mb-4 text-indigo-800 flex items-center gap-2">
    <i class="ri-calendar-line text-xl"></i> Training Sessions
  </h3>
  <table class="w-full text-left border-collapse">
    <thead class="bg-indigo-200 text-indigo-900">
      <tr>
        <th class="p-2 border">Session Name</th>
        <th class="p-2 border">Date</th>
        <th class="p-2 border">Attendees</th>
        <th class="p-2 border">Trainer</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-indigo-50">
        <td class="p-2 border">MSC Nastran Basics</td>
        <td class="p-2 border">01 Mar 2025</td>
        <td class="p-2 border">5</td>
        <td class="p-2 border">Jane Smith</td>
      </tr>
      <tr class="bg-indigo-100">
        <td class="p-2 border">Adams Motion Simulation</td>
        <td class="p-2 border">15 Mar 2025</td>
        <td class="p-2 border">7</td>
        <td class="p-2 border">John Lee</td>
      </tr>
    </tbody>
  </table>
</div>


  </div>
</template>
