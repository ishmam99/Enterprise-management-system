<template>
  <div class="p-6 pt-24 space-y-8 container mx-auto">

<div class="flex justify-between">
   <!-- BACK BUTTON -->
    <button
      class="btn bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mb-4 flex items-center gap-2"
      @click="$router.back()"
    >
      <i class="ri-arrow-left-line text-xl"></i>
      Back
    </button>
         <!-- TABS -->
        <div class="tabs tabs-boxed bg-gradient-to-r from-gray-50 to-blue-50 shadow-lg rounded-2xl p-1 border border-gray-200">
          <a
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'tab tab-lg font-semibold transition-all duration-300 transform hover:scale-105',
              {
                'tab-active bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg': activeTab === tab.key,
                'text-gray-700 hover:text-blue-600': activeTab !== tab.key
              }
            ]"
          >
            <i :class="tab.icon + ' mr-2 text-xl'"></i>
            {{ tab.label }}
            <div
              v-if="tab.count !== undefined"
              :class="[
                'badge badge-sm px-2 ml-2 border-0',
                activeTab === tab.key ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
              ]"
            >
              {{ tab.count }}
            </div>
          </a>
        </div>
</div>


    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-32">
      <div class="text-center">
        <div class="loading loading-spinner loading-lg text-gradient bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <p class="mt-4 text-gray-600 font-medium">Loading customer data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-error shadow-lg bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
      <div class="flex items-center gap-3">
        <i class="ri-error-warning-line text-2xl"></i>
        <span class="font-semibold">{{ error }}</span>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>

<!-- Compact Full-Width Customer Header -->
  <div class="relative w-full overflow-hidden bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-400 rounded-3xl shadow-2xl">
    <!-- Subtle animated blobs (scaled down for compactness) -->
    <div class="absolute inset-0 opacity-25">
      <div class="absolute top-0 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div class="absolute top-10 right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-2000 animate-blob"></div>
      <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-4000 animate-blob"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-6 md:py-8">
          <h1 class="text-3xl md:text-5xl font-black text-gray-300 text-center  drop-shadow-xl mb-5">
                Customer Details

              </h1>
      <div class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:-skew-x-12 before:animate-shine">

        <!-- Gradient top accent -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>

        <div class="px-6 py-6 md:px-10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <!-- Left: Customer Info -->
            <div class="flex-1">
              <h1 class="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-xl">
                {{ customerName || 'Customer' }}
                <span class="inline-block ml-2 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
              </h1>

              <div class="mt-3 flex flex-wrap gap-3 text-sm md:text-base text-white/80">
                <div class="flex items-center gap-2">
                  <i class="ri-hashtag text-cyan-400"></i>
                  <span class="bg-white/15 px-3 py-1 rounded-full border border-white/10">{{ customerId }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="ri-mail-line text-purple-400"></i>
                  <span class="bg-white/15 px-3 py-1 rounded-full border border-white/10 truncate max-w-48">{{ customerEmail }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="ri-phone-line text-pink-400"></i>
                  <span class="bg-white/15 px-3 py-1 rounded-full border border-white/10">{{ customerPhone }}</span>
                </div>
              </div>
            </div>

            <!-- Right: 2x2 Compact Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Active Users -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                <div class="relative bg-black/30 backdrop-blur-md px-5 py-1 rounded-xl border border-white/10 flex items-center gap-3">
                  <i class="ri-user-follow-line text-2xl text-green-400"></i>
                  <div>
                    <div class="text-2xl font-bold text-white">{{ activeUsersCount }}</div>
                    <div class="text-xs text-green-300">Active</div>
                  </div>
                </div>
              </div>

              <!-- Total Users -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                <div class="relative bg-black/30 backdrop-blur-md px-5 py-1 rounded-xl border border-white/10 flex items-center gap-3">
                  <i class="ri-team-line text-2xl text-purple-400"></i>
                  <div>
                    <div class="text-2xl font-bold text-white">{{ endUsers.length }}</div>
                    <div class="text-xs text-purple-300">Total Users</div>
                  </div>
                </div>
              </div>

              <!-- Total Softwares -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                <div class="relative bg-black/30 backdrop-blur-md px-5 py-1 rounded-xl border border-white/10 flex items-center gap-3">
                  <i class="ri-apps-2-line text-2xl text-cyan-400"></i>
                  <div>
                    <div class="text-2xl font-bold text-white">{{ allSoftwares.length }}</div>
                    <div class="text-xs text-cyan-300">Softwares</div>
                  </div>
                </div>
              </div>

              <!-- Total Industries -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                <div class="relative bg-black/30 backdrop-blur-md px-5 py-1 rounded-xl border border-white/10 flex items-center gap-3">
                  <i class="ri-building-4-line text-2xl text-amber-400"></i>
                  <div>
                    <div class="text-2xl font-bold text-white">{{ customer?.tickets?.length }}</div>
                    <div class="text-xs text-amber-300">Tickets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <!-- TAB CONTENT BOX -->
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">

        <!-- OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'">


          <!-- SOFT + INDUSTRIES -->
          <div class="grid lg:grid-cols-2 gap-8">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-blue-100">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-3">
                <div class="p-2 bg-blue-500 rounded-lg">
                  <i class="ri-macbook-line text-2xl text-white"></i>
                </div>
                <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  All Softwares
                </span>
              </h3>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="sw in customer?.softwares"
                  :key="sw.id"
                  class="badge px-2 badge-lg bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {{ sw.name }}
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-amber-100">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-3">
                <div class="p-2 bg-amber-500 rounded-lg">
                  <i class="ri-building-4-line text-2xl text-white"></i>
                </div>
                <span class="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  All Solutions
                </span>
              </h3>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="ind in customer?.solutions"
                  :key="ind.id"
                  class="badge badge-lg px-2 bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {{ ind.name || 'Industry ' + ind.id }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- USERS TAB -->
        <div v-if="activeTab === 'users'">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-3">
              <i class="ri-user-3-line"></i>
              End Users ({{ endUsers.length }})
            </h2>
          </div>

          <div class="overflow-x-auto rounded-2xl shadow-lg">
            <table class="table w-full">
              <thead class="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th class="font-bold text-gray-700">Name</th>
                  <th class="font-bold text-gray-700">Email</th>
                  <th class="font-bold text-gray-700">Username</th>
                  <th class="font-bold text-gray-700">Status</th>
                  <th class="font-bold text-gray-700">Softwares (Level)</th>
                  <th class="font-bold text-gray-700">Created</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="eu in endUsers"
                  :key="eu?.id"
                  class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-100"
                >
                  <td class="font-semibold text-gray-800">{{ eu?.user?.name || '—' }}</td>
                  <td class="text-gray-600">{{ eu?.user?.email || '—' }}</td>
                  <td class="text-gray-600">{{ eu?.username }}</td>



                  <td>
                    <span
                      :class="[
                        'badge px-2 border-0 text-white shadow font-semibold',
                        eu.status === '1'
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gradient-to-r from-red-500 to-pink-500'
                      ]"
                    >
                      {{ eu.status === '1' ? 'Active' : 'Inactive' }}
                    </span>
                  </td>

                  <td>
                    <div class="flex flex-wrap gap-1">
                      <template v-if="eu?.softwares?.length > 0">
                        <span
                          v-for="sw in eu.softwares"
                          :key="sw.id"
                          class="badge badge-sm px-2 border-0 text-white text-nowrap shadow"
                          :class="{

                              'bg-gradient-to-r from-blue-500 to-blue-600': sw.pivot?.level == 'basic',
                            'bg-gradient-to-r from-blue-500 to-blue-600': sw.pivot?.level == 'Beginner' || sw.pivot?.level == 'beginner',
                            'bg-gradient-to-r from-green-500 to-green-600': sw.pivot?.level == 'Advance' || sw.pivot?.level == 'advance',
                            'bg-gradient-to-r from-amber-500 to-amber-600': sw.pivot?.level == 'Intermediate' ||  sw.pivot?.level == 'intermediate',
                            'bg-gradient-to-r from-teal-500 to-teal-600': sw.pivot?.level == 'medium' || sw.pivot.level == 'Medium',
                            'bg-gradient-to-r from-red-500 to-red-600': sw.pivot?.level == 'high' || sw.pivot.level == 'high',
                            'bg-gradient-to-r from-gray-500 to-gray-600': !sw.pivot?.level,
                              'bg-gradient-to-r from-blue-500 to-blue-600': sw.pivot?.level == 'Basic',
                          }"
                        >
                      {{ sw.pivot?.level == 'Basic' }}  {{ sw.name }} ({{ sw.pivot?.level || 'Beginner' }})
                        </span>
                      </template>

                      <span v-else class="text-gray-400 italic text-xs">No software assigned</span>
                    </div>
                  </td>

                  <td class="text-gray-600">{{ formatDate(eu.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SOFTWARES TAB -->
        <div v-if="activeTab === 'softwares'">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-3">
              <i class="ri-macbook-line"></i>
              All Available Softwares ({{ allSoftwares.length }})
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="sw in allSoftwares"
              :key="sw.id"
              class="card bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <div class="card-body text-center p-6">
                <div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <i class="ri-macbook-line text-2xl text-white"></i>
                </div>
                <h3 class="font-bold text-lg text-gray-800">{{ sw.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">ID: {{ sw.id }}</p>

                <div
                  class="badge mt-3 border-0 px-2 text-white shadow font-semibold"
                  :class="sw.status === '1'
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-red-500 to-pink-500'"
                >
                  {{ sw.status === '1' ? 'Active' : 'Inactive' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SOLUTIONS TAB -->
        <div v-if="activeTab === 'solutions'">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-3">
              <i class="ri-lightbulb-flash-line"></i>
              Solutions ({{ solutions.length }})
            </h2>
          </div>

          <div v-if="solutions.length === 0" class="text-center py-16 text-gray-500 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg">
            <i class="ri-inbox-line text-5xl text-gray-300 mb-4"></i>
            <p class="text-lg">No solutions available</p>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div
              v-for="sol in solutions"
              :key="sol.id"
              class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-start gap-4">
                <div class="p-2 bg-indigo-500 rounded-lg">
                  <i class="ri-lightbulb-flash-line text-xl text-white"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-800">{{ sol.name }}</h3>
                  <p class="text-gray-700 mt-2">{{ sol.description || 'No description provided' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- INDUSTRIES TAB -->
        <div v-if="activeTab === 'industries'">
          <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-lg mb-6">
            <h2 class="text-2xl font-bold flex items-center gap-3">
              <i class="ri-building-4-line"></i>
              Tickets ({{ allIndustries.length }})
            </h2>
          </div>
   <div v-if="allIndustries.length > 0" class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">Ticket #</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Subject</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Type</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Priority</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Status</th>
                    <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Customer</th>
                    <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">User</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">User Email</th>
              <th class="px-6 py-1 text-left text-sm font-semibold tracking-wider">Attachment</th>
              <th class="px-6 py-1 text-center text-sm font-semibold tracking-wider rounded-tr-2xl">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="(ticket, index) in allIndustries"
              :key="index"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
            >
              <!-- Ticket ID -->
              <td class="px-6 py-1 text-sm font-bold text-purple-700">#{{ ticket.id }}</td>

              <!-- Subject -->
              <td class="px-6 py-1">
                <div class="text-sm font-semibold text-gray-800">{{ ticket.subject }}</div>
                <div class="text-gray-500 text-xs line-clamp-1 mt-1">{{ ticket.description }}</div>
              </td>

              <!-- Issue Type -->
              <td class="px-6 py-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ ticket.issue_type }}
                </span>
              </td>

              <!-- Priority -->
              <td class="px-6 py-1">
                <span
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                    ticket.priority_level === 'High'
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                      : ticket.priority_level === 'Medium'
                      ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                      : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                  ]"
                >
                  {{ ticket.priority_level }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-1">
                <span
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-semibold',
                    ticket.status == 1
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
                  ]"
                >
                  {{ ticket.status == 1 ? 'Solved' : 'Closed' }}
                </span>
              </td>

             <td class="px-6 py-1 text-sm font-medium text-gray-700 text-nowrap">{{ ticket?.customer?.user?.name|| 'N/A' }}</td>
              <td class="px-6 py-1 text-sm text-gray-700">{{ ticket.end_user.user.name || 'N/A' }}</td>
              <td class="px-6 py-1 text-sm text-gray-700">{{ ticket.end_user.user.email || 'N/A' }}</td>

              <!-- Attachment -->
              <td class="px-6 py-1">
                <div v-if="ticket.attachment" class="flex justify-center">
                  <div class="relative group">
                    <img
                      :src="ticket.attachment"
                      alt="Attachment"
                      class="w-16 h-16 object-cover rounded-xl border-2 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div v-else class="text-gray-400 text-xs italic text-center">No File</div>
              </td>

              <!-- Action -->
              <td class="px-6 py-1 text-center">
                <button
                  @click="viewTicket(ticket)"
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-nowrap"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const customerId = computed(() => route.params.id || route.query.customer_id)

const loading = ref(true)
const error = ref(null)

const endUsers = ref([])
const allSoftwares = ref([])
const solutions = ref([])
const allIndustries = ref([])

const customerName = ref('')
const customerEmail = ref('')
const customerPhone = ref('')
const customer = ref()
const activeTab = ref('overview')

const tabs = [
  { key: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
  { key: 'users', label: 'Users', icon: 'ri-user-3-line', count: computed(() => endUsers.value.length) },
  { key: 'softwares', label: 'Softwares', icon: 'ri-macbook-line', count: computed(() => allSoftwares.value.length) },
  { key: 'solutions', label: 'Solutions', icon: 'ri-lightbulb-flash-line', count: computed(() => solutions.value.length) },
  { key: 'industries', label: 'Customer Support', icon: 'ri-building-4-line', count: computed(() => allIndustries.value.length) },
]

/* -----------------------------------
      FETCH CUSTOMER NAME
----------------------------------- */
const fetchCustomer = async () => {
  try {
    const res = await api().get(`/customers/${customerId.value}`)
    customer.value = res.data?.data
    customerName.value = res.data?.data?.user?.name || res.data?.name || 'Customer'
    customerEmail.value = res.data?.data?.user?.email || res.data?.email || 'Customer Email'
    customerPhone.value = res.data?.data?.phone || res.data?.phone || 'Customer Phone'
     allSoftwares.value =   customer.value.softwares
    solutions.value =customer.value.solutions
    // allIndustries.value = customer.value.tickets
  } catch {
    customerName.value = 'Customer'
  }
}

/* -----------------------------------
      FETCH ALL DATA
----------------------------------- */
const fetchAllData = async () => {
  if (!customerId.value) {
    error.value = 'Customer ID is missing'
    loading.value = false
    return
  }

  try {
    await fetchCustomer()

    const [usersRes,tickets] = await Promise.all([
      api().get('/end-users?with=user,softwares', {
        params: { customer_id: customerId.value }
      }),
      api().get('customer-support?customer_id='+customerId.value)


    ])

    endUsers.value = usersRes.data.data || usersRes.data
      allIndustries.value = tickets.data.data || tickets.data

  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load customer data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAllData()
})

/* HELPERS */
const activeUsersCount = computed(() =>
  endUsers.value.filter(u => u.status === '1').length
)

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString('en-GB') : '—'
}
</script>

<style scoped>
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
}

.card:hover {
  transform: translateY(-8px);
}

.badge {
  transition: all 0.3s ease;
}

.tab {
  border-radius: 12px;
}

.table tr {
  transition: all 0.3s ease;
}

.loading {
  background: conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6);
}
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.1); }
}
.animate-blob { animation: blob 18s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.before\\:animate-shine::before {
  content: '';
  animation: shine 7s ease-in-out infinite;
}
@keyframes shine {
  0% { transform: translateX(-150%) skewX(-12deg); }
  100% { transform: translateX(300%) skewX(-12deg); }
}
</style>
