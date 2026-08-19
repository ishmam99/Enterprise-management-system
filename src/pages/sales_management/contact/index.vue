<template>
  <div class="contacts-management-dashboard overflow-hidden">
    <Breadcrumb />
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">Contacts</h1>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-white">{{ authStore?.user?.name ? authStore?.user?.name : 'Sales' }}, {{ authStore?.role ? authStore?.role : 'Director' }}</p>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" 
      :class="`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl text-white transform transition-all duration-300 ${
        toast.type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
          : 'bg-gradient-to-r from-red-500 to-rose-600'
      }`">
      {{ toast.message }}
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:contacts" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-indigo-700 text-sm font-semibold">Total Contacts</h3>
        </div>
        <p class="text-3xl font-bold text-indigo-800 mb-2">
          <span class="text-indigo-600 font-bold flex gap-1">
            <count-up :end-val="stats?.totalContacts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-indigo-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:person" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-purple-700 text-sm font-semibold">Active Contacts</h3>
        </div>
        <p class="text-3xl font-bold text-purple-800 mb-2">
          <span class="text-purple-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeContacts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-purple-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:phone" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-pink-700 text-sm font-semibold">Phone Contacts</h3>
        </div>
        <p class="text-3xl font-bold text-pink-800 mb-2">
          <span class="text-pink-600 font-bold flex gap-1">
            <count-up :end-val="stats?.phoneContacts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-pink-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full" style="width: 65%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-2xl shadow-lg border border-rose-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-rose-500 to-rose-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:email" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-rose-700 text-sm font-semibold">Email Contacts</h3>
        </div>
        <p class="text-3xl font-bold text-rose-800 mb-2">
          <span class="text-rose-600 font-bold flex gap-1">
            <count-up :end-val="stats?.emailContacts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-rose-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-rose-500 to-rose-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>

    <!-- Contacts Table Section -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
      <!-- Table Header with Actions -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-100 border-b border-indigo-200 px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-indigo-800 flex items-center gap-2">
              <Icon name="material-symbols:contacts" class="text-indigo-600 w-6 h-6" />
              Contact Database
            </h2>
            <div class="flex items-center gap-2">
              <select class="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Contacts-ELH-ALL</option>
                <option>Contacts-ELH-Active</option>
                <option>Contacts-ELH-Inactive</option>
                <option>Contacts-ELH-Archived</option>
              </select>
              <Icon name="material-symbols:filter-list" class="text-indigo-600 w-5 h-5" />
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- <button class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <Icon name="material-symbols:add" class="w-5 h-5" />
              + Create New Contact
            </button> -->
            <button class="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
              Actions
              <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <!-- Records Info and Pagination -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
          <div class="text-gray-600">
            Total Records: <span class="font-semibold text-indigo-700">{{ contacts.length }}</span>
          </div>
          <div class="flex items-center gap-3">
            <select class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              <option>25 Per Page</option>
              <option>50 Per Page</option>
              <option>100 Per Page</option>
            </select>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>1 - {{ contacts.length }}</span>
              <div class="flex gap-1">
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-left" class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Account Name</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">First Name</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Last Name</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Title</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Mobile</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Lead Objective</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="isLoading" class="hover:bg-indigo-50 transition-colors">
              <td colspan="10" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center gap-3">
                  <Icon name="eos-icons:loading" class="w-8 h-8 text-indigo-500 animate-spin" />
                  <span class="text-lg">Loading contacts...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="contacts.length === 0" class="hover:bg-indigo-50 transition-colors">
              <td colspan="10" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:contacts" class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:settings" class="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No contacts found</h3>
                    <p class="text-gray-500 mb-4">Get started by creating your first contact</p>
                    <button class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                      <Icon name="material-symbols:add" class="w-5 h-5" />
                      + Create Contact
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="contact in contacts" :key="contact.id" class="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {{ contact.accountName?.charAt(0)?.toUpperCase() || 'C' }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-semibold text-gray-900">{{ contact.accountName || 'Account Name' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.firstName || 'First Name' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.lastName || 'Last Name' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.title || 'Title' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.mobile || 'Mobile' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.phone || 'Phone' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ contact.email || 'Email' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-3 py-2 text-xs rounded-full font-semibold shadow-sm': true,
                  'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200': contact.leadObjective === 'New Business',
                  'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200': contact.leadObjective === 'Existing Business',
                  'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200': contact.leadObjective === 'Partnership',
                  'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200': contact.leadObjective === 'Referral',
                  'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200': !contact.leadObjective
                }">
                  {{ contact.leadObjective || 'Not Set' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:visibility" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:edit" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";

const authStore = useAuthStore();

authStore.sidebarOpen = true;

const contacts = ref([])
const stats = ref({})
const isLoading = ref(true)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => toast.show = false, 3000)
}

const fetchContacts = async () => {
  try {
    isLoading.value = true
    // Mock data for demonstration - replace with actual API call
    const mockContacts = [
      {
        id: 1,
        accountName: 'Tech Solutions Inc',
        firstName: 'Sarah',
        lastName: 'Johnson',
        title: 'CEO',
        mobile: '+1 (555) 123-4567',
        phone: '+1 (555) 123-4568',
        email: 'sarah.johnson@techsolutions.com',
        leadObjective: 'New Business'
      },
      {
        id: 2,
        accountName: 'Green Energy Co',
        firstName: 'Michael',
        lastName: 'Chen',
        title: 'Founder',
        mobile: '+1 (555) 987-6543',
        phone: '+1 (555) 987-6544',
        email: 'michael.chen@greenenergy.com',
        leadObjective: 'Partnership'
      }
    ]
    
    contacts.value = mockContacts
    stats.value = {
      totalContacts: mockContacts.length,
      activeContacts: mockContacts.length,
      phoneContacts: mockContacts.filter(c => c.phone).length,
      emailContacts: mockContacts.filter(c => c.email).length
    }
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    showToast('Failed to fetch contacts', 'error')
  } finally {
    isLoading.value = false
  }
}

// Fetch when component mounts
onMounted(async () => {
  await fetchContacts()
})
</script>

<style scoped>
/* Enhanced Contacts Management Dashboard Styles */
.contacts-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen;
}

/* Custom animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply animations to elements */
.contacts-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.contacts-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.contacts-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.contacts-management-dashboard > *:nth-child(4) {
  animation-delay: 0.3s;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #6366f1, #a855f7);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #4f46e5, #9333ea);
}

/* Enhanced focus states */
button:focus, a:focus, input:focus, select:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .contacts-management-dashboard {
    @apply p-4;
  }
  
  .bg-gradient-to-r.from-indigo-600.via-purple-600.to-pink-700 {
    @apply p-6;
  }
  
  .bg-gradient-to-r.from-indigo-600.via-purple-600.to-pink-700 h1 {
    @apply text-2xl;
  }
  
  .bg-gradient-to-r.from-indigo-600.via-purple-600.to-pink-700 p {
    @apply text-base;
  }
}

/* Loading animation enhancement */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status badge enhancements */
.status-new-business {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.4);
}

.status-existing-business {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-partnership {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
}

.status-referral {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}
</style>
