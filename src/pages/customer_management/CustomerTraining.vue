<template>
  <div class="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-400">
    <h2 class="text-xl font-semibold text-indigo-800 flex items-center gap-2">
      <i class="ri-graduation-cap-line text-2xl"></i> Training Sessions
    </h2>

    <table class="w-full mt-4 border-collapse text-left">
      <thead class="bg-indigo-100 text-indigo-900">
        <tr>
          <th class="p-2 border">Training Title</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Instructor</th>
          <th class="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-indigo-50">
          <td class="p-2 border">MSC Nastran Fundamentals</td>
          <td class="p-2 border">02 Mar 2025</td>
          <td class="p-2 border">Jane Smith</td>
          <td class="p-2 border text-green-700 font-medium">Completed</td>
        </tr>
        <tr class="hover:bg-indigo-50">
          <td class="p-2 border">Adams Motion Dynamics</td>
          <td class="p-2 border">20 Mar 2025</td>
          <td class="p-2 border">John Lee</td>
          <td class="p-2 border text-yellow-700 font-medium">Ongoing</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 text-sm text-indigo-600">
      <i class="ri-information-line"></i> Total Sessions Completed: 5 | Upcoming: 2
    </div>
  </div>
</template>
