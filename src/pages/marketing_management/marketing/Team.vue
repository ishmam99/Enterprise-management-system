<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Team</h1>
          <p class="text-gray-500 text-sm mt-1">Manage your marketing team</p>
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
              <p class="text-sm text-purple-600">{{ member.title }}</p>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div><p class="text-gray-400 text-xs">Campaigns</p><p class="font-semibold text-gray-900">{{ member.campaigns }}</p></div>
            <div><p class="text-gray-400 text-xs">Leads</p><p class="font-semibold text-gray-900">{{ member.leads }}</p></div>
            <div><p class="text-gray-400 text-xs">Engagement</p><p class="font-semibold text-green-600">{{ member.engagement }}%</p></div>
            <div><p class="text-gray-400 text-xs">ROI</p><p class="font-semibold text-gray-900">{{ member.roi }}%</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const team = ref([
  { id: 1, name: 'Sarah Johnson', title: 'Director of Marketing', avatar: 'https://i.pravatar.cc/100?img=12', campaigns: 12, leads: 342, engagement: 78, roi: 215 },
  { id: 2, name: 'Mike Lee', title: 'Digital Marketing Manager', avatar: 'https://i.pravatar.cc/100?img=13', campaigns: 8, leads: 215, engagement: 72, roi: 188 },
  { id: 3, name: 'Emily Davis', title: 'Content Marketing Lead', avatar: 'https://i.pravatar.cc/100?img=14', campaigns: 6, leads: 156, engagement: 68, roi: 165 },
  { id: 4, name: 'David Wilson', title: 'Social Media Specialist', avatar: 'https://i.pravatar.cc/100?img=15', campaigns: 4, leads: 89, engagement: 82, roi: 142 },
  { id: 5, name: 'Lisa Chen', title: 'Email Marketing Specialist', avatar: 'https://i.pravatar.cc/100?img=16', campaigns: 5, leads: 123, engagement: 75, roi: 198 },
  { id: 6, name: 'John Smith', title: 'Marketing Analyst', avatar: 'https://i.pravatar.cc/100?img=11', campaigns: 3, leads: 67, engagement: 65, roi: 155 }
])
</script>