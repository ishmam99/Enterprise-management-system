<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-bold flex items-center gap-2 text-green-800">
      <i class="ri-user-settings-line text-2xl"></i> Customer Users
    </h2>

    <table class="w-full border-collapse bg-white rounded-lg shadow">
      <thead class="bg-green-100 text-green-900">
        <tr>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Role</th>
          <th class="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-green-50">
          <td class="p-2 border">Jane Smith</td>
          <td class="p-2 border">jane@company.com</td>
          <td class="p-2 border">Engineer</td>
          <td class="p-2 border text-green-600">Active</td>
        </tr>
        <tr class="hover:bg-green-50">
          <td class="p-2 border">John Lee</td>
          <td class="p-2 border">john@company.com</td>
          <td class="p-2 border">Analyst</td>
          <td class="p-2 border text-red-600">Inactive</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
