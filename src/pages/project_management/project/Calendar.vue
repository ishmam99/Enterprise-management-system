<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Team Calendar</h1>
          <p class="text-gray-500 text-sm mt-1">View team schedules and events</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="px-4 py-2 text-sm font-semibold text-gray-700">October 2026</span>
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="p-2 text-center text-xs font-medium text-gray-500">{{ day }}</div>
        </div>
        <div class="grid grid-cols-7">
          <div v-for="(day, index) in calendarDays" :key="index" class="min-h-[80px] p-2 border-b border-r border-gray-100" :class="{ 'bg-gray-50': day.empty, 'cursor-pointer hover:bg-gray-50': !day.empty }">
            <span class="text-sm font-medium" :class="day.today ? 'text-purple-600 bg-purple-100 rounded-full px-2 py-0.5' : 'text-gray-700'">{{ day.date }}</span>
            <div v-if="day.events && day.events.length" class="mt-1 space-y-0.5">
              <div v-for="event in day.events" :key="event.title" class="text-[10px] px-1.5 py-0.5 rounded" :class="event.color">{{ event.time }} {{ event.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const calendarDays = ref([
  { date: '', empty: true }, { date: '', empty: true }, { date: '', empty: true }, { date: '1', empty: false, events: [] }, { date: '2', empty: false, events: [] }, { date: '3', empty: false, events: [] }, { date: '4', empty: false, events: [{ title: 'Team Meeting', time: '11:00', color: 'bg-blue-100 text-blue-700' }] },
  { date: '5', empty: false, events: [] }, { date: '6', empty: false, events: [] }, { date: '7', empty: false, events: [] }, { date: '8', empty: false, events: [] }, { date: '9', empty: false, events: [] }, { date: '10', empty: false, events: [] }, { date: '11', empty: false, events: [] },
  { date: '12', empty: false, events: [{ title: 'Client Review', time: '14:00', color: 'bg-green-100 text-green-700' }] }, { date: '13', empty: false, events: [] }, { date: '14', empty: false, events: [{ title: 'Design Review', time: '10:00', color: 'bg-purple-100 text-purple-700' }] }, { date: '15', empty: false, events: [] }, { date: '16', empty: false, events: [] }, { date: '17', empty: false, events: [] }, { date: '18', empty: false, events: [] },
  { date: '19', empty: false, events: [] }, { date: '20', empty: false, events: [{ title: 'Milestone Review', time: '9:00', color: 'bg-orange-100 text-orange-700' }] }, { date: '21', empty: false, events: [] }, { date: '22', empty: false, events: [] }, { date: '23', empty: false, events: [] }, { date: '24', empty: false, events: [] }, { date: '25', empty: false, events: [] },
  { date: '26', empty: false, events: [{ title: 'Project Update', time: '11:00', color: 'bg-blue-100 text-blue-700' }] }, { date: '27', empty: false, events: [] }, { date: '28', empty: false, events: [] }, { date: '29', empty: false, events: [] }, { date: '30', empty: false, events: [] }, { date: '31', empty: false, events: [] }
])
</script>