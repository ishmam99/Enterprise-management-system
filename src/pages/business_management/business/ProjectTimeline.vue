<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Project Timeline</h1>
          <p class="text-gray-500 text-sm mt-1">Visual timeline of all project milestones</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 mt-3 md:mt-0">
          <i class="fa-solid fa-print"></i> Print
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="relative">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div v-for="(item, index) in timelineItems" :key="index" class="relative flex items-start gap-6 mb-8 last:mb-0">
            <div class="w-4 h-4 rounded-full mt-1 flex-shrink-0" :style="{ backgroundColor: item.color }"></div>
            <div class="flex-1 bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ item.title }}</h3>
                  <p class="text-sm text-gray-500">{{ item.description }}</p>
                </div>
                <div class="flex items-center gap-3 mt-2 md:mt-0">
                  <span class="text-xs text-gray-400">{{ item.date }}</span>
                  <span class="text-xs px-2 py-1 rounded-full" :class="item.status === 'Completed' ? 'bg-green-100 text-green-700' : item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'">{{ item.status }}</span>
                </div>
              </div>
              <div class="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>📋 {{ item.project }}</span>
                <span>👤 {{ item.owner }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const timelineItems = ref([
  { title: 'Project Kickoff', description: 'Initial project briefing and team alignment', date: 'Oct 1, 2026', status: 'Completed', project: 'Composite Innovation', owner: 'John Smith', color: '#10B981' },
  { title: 'Research Phase Complete', description: 'Preliminary research and feasibility study', date: 'Oct 15, 2026', status: 'Completed', project: 'Composite Innovation', owner: 'Sarah Johnson', color: '#10B981' },
  { title: 'Prototype Development', description: 'First prototype build and testing', date: 'Nov 1, 2026', status: 'In Progress', project: 'Composite Innovation', owner: 'Mike Lee', color: '#3B82F6' },
  { title: 'Quality Testing Phase', description: 'Comprehensive quality assurance testing', date: 'Nov 20, 2026', status: 'Pending', project: 'Composite Innovation', owner: 'Emily Davis', color: '#F59E0B' },
  { title: 'Client Review & Demo', description: 'Demo and feedback session with client', date: 'Dec 10, 2026', status: 'Pending', project: 'Composite Innovation', owner: 'John Smith', color: '#F59E0B' }
])
</script>