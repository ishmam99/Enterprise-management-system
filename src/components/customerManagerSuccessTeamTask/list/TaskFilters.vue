
<script setup>
import { computed } from 'vue'

const props = defineProps({
  searchQuery: String,
  statusFilter: String,
  assigneeFilter: String,
  viewMode: String,
  showFilters: Boolean,
  sortBy: String,
  sortOrder: String,
  uniqueAssignees: Array,

})

const emit = defineEmits([
  'update:searchQuery',
  'update:statusFilter',
  'update:assigneeFilter',
  'update:viewMode',
  'update:showFilters',
  'update:sortBy',
  'update:sortOrder',
  'resetFilters',
  'toggleSort'
])

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

const hasActiveFilters = computed(() => {
  return props.statusFilter !== 'all' || props.assigneeFilter !== 'all'
})

const clearSearch = () => {
  emit('update:searchQuery', '')
}
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="flex-1">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400"></i>
          </div>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Search tasks, solutions, software, or assignees..."
          />
          <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button class="text-gray-400 hover:text-gray-600" @click="clearSearch">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex bg-gray-100 p-1 rounded-xl">
          <button
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
            :class="viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'"
            title="Grid View"
            @click="$emit('update:viewMode', 'grid')"
          >
            <i class="ri-layout-grid-fill text-lg"></i>
          </button>
          <button
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
            :class="viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'"
            title="Table View"
            @click="$emit('update:viewMode', 'table')"
          >
            <i class="fas fa-table text-lg"></i>
          </button>
        </div>

        <button
          class="px-4 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2 font-medium"
          :class="showFilters ? 'bg-blue-50 text-blue-600 border-blue-300' : 'bg-white text-gray-700'"
          @click="$emit('update:showFilters', !showFilters)"
        >
          <i class="fas fa-filter"></i>
          Filters
          <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-blue-500"></span>
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="mt-6 pt-6 border-t border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            :value="statusFilter"
            @change="$emit('update:statusFilter', $event.target.value)"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
          <select
            :value="assigneeFilter"
            @change="$emit('update:assigneeFilter', $event.target.value)"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="all">All Assignees</option>
            <option v-for="person in uniqueAssignees" :key="person.id" :value="person.id">
              {{ person.name }}
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            class="px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            @click="$emit('resetFilters')"
          >
            <i class="fas fa-redo"></i>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="filteredTasks?.length > 0" class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <p class="text-sm text-gray-600">
      Showing <span class="font-semibold text-gray-900">{{ filteredTasks.length }}</span> ofs
      <span class="font-semibold text-gray-900">{{ assignments.length }}</span> tasks
    </p>
    <div class="flex items-center gap-3">
      <span class="text-sm text-gray-600">Sort by:</span>
      <select
        :value="sortBy"
        @change="() => {
          $emit('update:sortBy', $event.target.value)
          $emit('update:sortOrder', 'asc')
        }"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
      >
        <option value="created_at">Date Created</option>
        <option value="software">Software</option>
        <option value="assignee">Assignee</option>
      </select>
      <button
        class="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center bg-white"
        title="Toggle sort order"
        @click="$emit('toggleSort', sortBy)"
      >
        <i v-if="sortOrder === 'asc'" class="fas fa-sort-up text-gray-600"></i>
        <i v-else class="fas fa-sort-down text-gray-600"></i>
      </button>
    </div>
  </div> -->
</template>

