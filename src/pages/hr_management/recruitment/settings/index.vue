<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Settings</h1>
        <p class="text-lg text-indigo-700">Manage system, HR, and user preferences</p>
      </div>
    </div>

    <div class="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar -->
      <div class="bg-white rounded-2xl shadow-xl p-4">
        <ul class="space-y-2">
          <li 
            v-for="tab in tabs" 
            :key="tab" 
            @click="activeTab = tab"
            class="px-4 py-3 rounded-xl cursor-pointer transition-all"
            :class="activeTab === tab 
              ? 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 font-medium border-l-4 border-indigo-600' 
              : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'"
          >
            {{ tab }}
          </li>
        </ul>
      </div>

      <!-- Content -->
      <div class="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6">
        <!-- General Settings -->
        <div v-if="activeTab === 'General'">
          <h2 class="section-title">General Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="label">Company Name</label>
              <input v-model="general.company" class="form-input" />
            </div>
            <div>
              <label class="label">Timezone</label>
              <select v-model="general.timezone" class="form-input">
                <option>Asia/Dhaka</option>
                <option>UTC</option>
                <option>Asia/Kolkata</option>
              </select>
            </div>
          </div>
        </div>

        <!-- HR Settings -->
        <div v-if="activeTab === 'HR'">
          <h2 class="section-title">HR Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="label">Working Days</label>
              <select v-model="hr.workingDays" class="form-input">
                <option>Sunday - Thursday</option>
                <option>Monday - Friday</option>
              </select>
            </div>
            <div>
              <label class="label">Probation Period (months)</label>
              <input type="number" v-model="hr.probation" class="form-input" />
            </div>
          </div>
        </div>

        <!-- Recruitment Settings -->
        <div v-if="activeTab === 'Recruitment'">
          <h2 class="section-title">Recruitment Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="label">Interview Rounds</label>
              <input type="number" v-model="recruitment.rounds" class="form-input" />
            </div>
            <div>
              <label class="label">Offer Validity (days)</label>
              <input type="number" v-model="recruitment.offerValidity" class="form-input" />
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'Notifications'">
          <h2 class="section-title">Notification Settings</h2>
          <div class="space-y-4">
            <label class="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition">
              <input type="checkbox" v-model="notifications.email" class="w-5 h-5 text-indigo-600" />
              <span class="font-medium">Email Notifications</span>
            </label>
            <label class="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition">
              <input type="checkbox" v-model="notifications.sms" class="w-5 h-5 text-indigo-600" />
              <span class="font-medium">SMS Notifications</span>
            </label>
            <label class="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition">
              <input type="checkbox" v-model="notifications.reminders" class="w-5 h-5 text-indigo-600" />
              <span class="font-medium">Interview Reminders</span>
            </label>
          </div>
        </div>

        <!-- Security -->
        <div v-if="activeTab === 'Security'">
          <h2 class="section-title">Security Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="label">Password Expiry (days)</label>
              <input type="number" v-model="security.passwordExpiry" class="form-input" />
            </div>
            <div>
              <label class="label">Two-Factor Authentication</label>
              <select v-model="security.twoFA" class="form-input">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button class="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['General', 'HR', 'Recruitment', 'Notifications', 'Security']
const activeTab = ref('General')

const general = ref({
  company: 'My Company',
  timezone: 'Asia/Dhaka'
})

const hr = ref({
  workingDays: 'Sunday - Thursday',
  probation: 3
})

const recruitment = ref({
  rounds: 3,
  offerValidity: 7
})

const notifications = ref({
  email: true,
  sms: false,
  reminders: true
})

const security = ref({
  passwordExpiry: 90,
  twoFA: 'Enabled'
})
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all;
}
.label {
  @apply text-sm font-medium text-gray-700 mb-2 block;
}
.section-title {
  @apply text-xl font-semibold text-indigo-900 mb-6;
}
.btn-primary { 
  @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md; 
}
</style>