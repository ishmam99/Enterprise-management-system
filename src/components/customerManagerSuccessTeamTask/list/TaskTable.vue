<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { formatDate, getStatusConfig, getOutputSummary } from './taskUtils'

const props = defineProps({
  assignments: {
    type: Array,
    required: true
  }
})

const taskTypes = [
  { value: 'Training', name: 'Customer Success Training Team' },
  { value: 'Engineering Service', name: 'Customer Success Engineering Team' },
  { value: 'Sales Champion', name: 'Customer Success Sales Team' }
]

const getTeamName = (value) => {
  return taskTypes.find((t) => t.value == value)?.name || ''
}
const formatRole = (role) => {
  console.log(`Role ${role}`)
  const roleMap = {
    'customer-manager': 'Customer Representative',
    partner: 'MSC Direct Sales Representative',
    'sales-executive': 'Customer Success Sales Executive',
    trainer: 'Customer Success Instructor',
    software_management_system_executive: 'Customer Success Tech Support Executive',
    'crm-executive': 'Customer Success CRM Executive',
    customer_success_management_manager: 'Customer Success Manager'
  }
  return roleMap[role]
}

const authStore = useAuthStore()

const emit = defineEmits(['view-details', 'edit-task', 'delete-task'])
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Solution</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Software</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assignee</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              {{
                authStore.role == 'partner' || authStore.role == 'customer-manager'
                  ? 'Task Team'
                  : 'Task Type'
              }}
            </th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Update</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(task, index) in assignments"
            :key="task.id"
            class="hover:bg-gray-50 transition-colors"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'"
          >
            <td class="px-6 py-4">
              <div>
                <div class="font-medium text-gray-900">
                  {{ task.solution?.name || '—' }}
                </div>
                <div class="text-sm text-gray-500 truncate max-w-xs mt-1">
                  {{ task.description || 'No description' }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center"
                >
                  <i class="fas fa-desktop text-emerald-500 text-sm"></i>
                </div>
                <span class="font-medium text-gray-700">{{ task.software?.name || '—' }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {{ task.user?.name?.charAt(0) || '?' }}
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ task.user?.name || '—' }}</div>
                  <div class="text-xs text-gray-500">{{ formatRole(task.user?.role) || '—' }}</div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {{ task.assigned_person?.name?.charAt(0) || '?' }}
                </div>
                <div>
                  <div class="font-medium text-gray-900">
                    {{ task.assigned_person?.name || '—' }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ formatRole(task.assigned_person?.role) || '—' }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-700">{{
                  authStore.role == 'partner' || authStore.role == 'customer-manager'
                    ? getTeamName(task.type)
                    : task.role
                }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                :class="[
                  getStatusConfig(task.status).bgColor,
                  getStatusConfig(task.status).textColor
                ]"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="getStatusConfig(task.status).dotColor"
                ></span>
                {{ getStatusConfig(task.status).label }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-700">{{ formatDate(task.created_at) }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-600 italic">
                {{ getOutputSummary(task.outputs) }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <button
                  class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title="View"
                  @click="$emit('view-details', task.id)"
                >
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
