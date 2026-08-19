<template>
  <div class="min-h-screen w-full bg-gray-50 py-10 px-4">
    <div class=" mx-10">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Unassigned employees</h1>
          <p class="text-gray-500 text-sm">Overview of staff, IDs, and assigned system roles.</p>
        </div>

        <div class="flex items-center gap-3">
          <select
            v-model="filters.department_id"
            @change="fetchEmployees"
            class="border rounded-lg px-4 py-2 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>

          <button @click="fetchEmployees" class="p-2 bg-white border rounded-lg hover:bg-gray-100 shadow-sm">
            <span class="sr-only">Refresh</span>
            🔄
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee & ID</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined Date</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">System Role</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading">
                <td colspan="5" class="py-12 text-center text-gray-400">Loading employees...</td>
              </tr>

              <tr v-else-if="employees.length === 0">
                <td colspan="5" class="py-12 text-center text-gray-400">No records found.</td>
              </tr>

              <tr v-for="emp in employees" :key="emp.id" class="hover:bg-gray-50/50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                      {{ emp.user?.name?.charAt(0) }}
                    </div>
                    <div>
                      <div class="font-bold text-gray-900">{{ emp.user?.name }}</div>
                      <div class="text-xs text-gray-400 font-mono">UID: {{ emp.employee_uid }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ emp.email }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ formatDate(emp.joined_at) }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="getRoleBadgeClass(emp.user?.role)"
                    class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight"
                  >
                    {{ emp.user?.role || 'No Role' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <span v-if="emp.status == '2'" class="text-emerald-500 text-xs font-bold">● Active</span>
                  <span v-else class="text-gray-400 text-xs font-bold">● Inactive</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'

const employees = ref([])
const departments = ref([])
const loading = ref(false)
const filters = ref({ department_id: '' })

const fetchDepartments = async () => {
  try {
    const res = await api().get('department')
    departments.value = res.data.data || res.data
  } catch (err) {
    console.error("Dept Fetch Error:", err)
  }
}

const fetchEmployees = async () => {
  loading.value = true
  try {
    let url = `employees?with=user`
    if (filters.value.department_id) {
      url += `&department_id=${filters.value.department_id}`
    }
    const res = await api().get(url)
    employees.value = res.data.data || res.data
  } catch (err) {
    console.error("Employee Fetch Error:", err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

const getRoleBadgeClass = (role) => {
  // Mapping roles to colors based on your "executive-sales" etc.
  const classes = {
    'executive-sales': 'bg-blue-100 text-blue-700 border border-blue-200',
    'admin': 'bg-red-100 text-red-700 border border-red-200',
    'customer-success-manager': 'bg-emerald-100 text-emerald-700 border border-emerald-200'
  }
  return classes[role] || 'bg-gray-100 text-gray-600 border border-gray-200'
}

onMounted(() => {
  fetchDepartments()
  fetchEmployees()
})
</script>
