<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Email Campaigns</h1>
          <p class="text-gray-500 text-sm mt-1">Manage all email marketing campaigns</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Campaign
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Total Emails</p>
          <p class="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Open Rate</p>
          <p class="text-2xl font-bold text-green-600">42%</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Click Rate</p>
          <p class="text-2xl font-bold text-blue-600">18%</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Subscribers</p>
          <p class="text-2xl font-bold text-gray-900">3,842</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opens</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="campaign in emailCampaigns" :key="campaign.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><p class="text-sm font-medium text-gray-900">{{ campaign.name }}</p></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ campaign.sent }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ campaign.opens }} ({{ campaign.openRate }}%)</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ campaign.clicks }} ({{ campaign.clickRate }}%)</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="campaign.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ campaign.status }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">View</button>
                  <button class="text-gray-400 hover:text-gray-600 ml-3 text-sm">Edit</button>
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
import { ref } from 'vue'

const emailCampaigns = ref([
  { id: 1, name: 'Q4 Product Launch Newsletter', sent: 'Oct 15, 2026', opens: 1250, openRate: 45, clicks: 320, clickRate: 11.5, status: 'Sent' },
  { id: 2, name: 'Monthly Industry Update', sent: 'Oct 10, 2026', opens: 980, openRate: 38, clicks: 210, clickRate: 8.2, status: 'Sent' },
  { id: 3, name: 'Special Offer: Composite Materials', sent: 'Oct 5, 2026', opens: 2100, openRate: 52, clicks: 540, clickRate: 13.5, status: 'Sent' },
  { id: 4, name: 'Webinar Invitation - Advanced Composites', sent: 'Oct 1, 2026', opens: 850, openRate: 35, clicks: 180, clickRate: 7.5, status: 'Sent' },
  { id: 5, name: 'Holiday Season Campaign', sent: 'Pending', opens: 0, openRate: 0, clicks: 0, clickRate: 0, status: 'Draft' }
])
</script>