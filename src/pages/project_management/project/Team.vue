<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Team</h1>
          <p class="text-gray-500 text-sm mt-1">Manage your project team</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="member in team" :key="member.id" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center gap-3">
            <img :src="member.avatar" class="w-14 h-14 rounded-full border-2 border-purple-200" />
            <div>
              <h3 class="font-bold text-gray-900">{{ member.name }}</h3>
              <p class="text-sm text-purple-600">{{ member.role }}</p>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div><p class="text-gray-400 text-xs">Projects</p><p class="font-semibold text-gray-900">{{ member.projects }}</p></div>
            <div><p class="text-gray-400 text-xs">Tasks</p><p class="font-semibold text-gray-900">{{ member.tasks }}</p></div>
            <div><p class="text-gray-400 text-xs">Completion</p><p class="font-semibold text-green-600">{{ member.completion }}%</p></div>
            <div><p class="text-gray-400 text-xs">Hours</p><p class="font-semibold text-gray-900">{{ member.hours }} hrs</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const team = ref([
  { id: 1, name: 'John Smith', role: 'Project Manager', avatar: 'https://i.pravatar.cc/100?img=11', projects: 3, tasks: 8, completion: 85, hours: 40 },
  { id: 2, name: 'Sarah Johnson', role: 'Senior Engineer', avatar: 'https://i.pravatar.cc/100?img=12', projects: 2, tasks: 6, completion: 78, hours: 35 },
  { id: 3, name: 'Mike Lee', role: 'Design Lead', avatar: 'https://i.pravatar.cc/100?img=13', projects: 2, tasks: 5, completion: 72, hours: 32 },
  { id: 4, name: 'Emily Davis', role: 'Quality Engineer', avatar: 'https://i.pravatar.cc/100?img=14', projects: 2, tasks: 4, completion: 68, hours: 28 },
  { id: 5, name: 'David Wilson', role: 'Manufacturing Specialist', avatar: 'https://i.pravatar.cc/100?img=15', projects: 1, tasks: 3, completion: 65, hours: 24 },
  { id: 6, name: 'Lisa Chen', role: 'Composites Engineer', avatar: 'https://i.pravatar.cc/100?img=16', projects: 2, tasks: 5, completion: 70, hours: 30 }
])
</script>