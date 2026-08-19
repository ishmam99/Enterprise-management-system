<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header with Actions -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
          <p class="text-gray-600 mt-1">Manage your customer portfolio</p>
        </div>

      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-xl border p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search customers by name, company, or email..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3">
          <select v-model="selectedSegment" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="">All Segments</option>
            <option value="enterprise">Enterprise</option>
            <option value="mid-market">Mid Market</option>
            <option value="smb">SMB</option>
          </select>

          <select v-model="selectedStatus" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="at-risk">At Risk</option>
            <option value="churned">Churned</option>
            <option value="onboarding">Onboarding</option>
          </select>

          <select v-model="selectedPlan" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="">All Plans</option>
            <option value="enterprise">Enterprise</option>
            <option value="pro">Pro</option>
            <option value="basic">Basic</option>
          </select>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-600">{{ totalCustomers }}</p>
          <p class="text-sm text-gray-600">Total Customers</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{{ activeCustomers }}</p>
          <p class="text-sm text-gray-600">Active</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-orange-600">{{ atRiskCustomers }}</p>
          <p class="text-sm text-gray-600">At Risk</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-red-600">{{ churnedCustomers }}</p>
          <p class="text-sm text-gray-600">Churned</p>
        </div>
      </div>
    </div>

    <!-- Customer List Table -->
    <div class="bg-white rounded-xl border overflow-hidden">
      <!-- Table Header -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Segment
              </th>


              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Touch
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Customer Info -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-blue-600 font-semibold">{{ customer.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
                      <span v-if="customer.isKeyAccount" class="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Key</span>
                    </div>
                    <p class="text-sm text-gray-500">{{ customer.company }}</p>
                    <p class="text-xs text-gray-400">{{ customer.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Segment -->
              <td class="px-6 py-4">
                <span :class="`px-2 py-1 text-xs rounded-full ${getSegmentColor(customer.segment)}`">
                  {{ customer.segment }}
                </span>
              </td>




              <!-- Status -->
              <td class="px-6 py-4">
                <span :class="`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`">
                  {{ customer.status }}
                </span>
              </td>

              <!-- Last Touch -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ formatDate(customer.lastTouch) }}</div>
                <div class="text-xs text-gray-500">{{ customer.lastActivity }}</div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewCustomer(customer)"
                    class="p-1 text-gray-400 hover:text-blue-600"
                    title="View Details"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="contactCustomer(customer)"
                    class="p-1 text-gray-400 hover:text-green-600"
                    title="Contact"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button
                    @click="showNotes(customer)"
                    class="p-1 text-gray-400 hover:text-purple-600"
                    title="Add Note"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="scheduleMeeting(customer)"
                    class="p-1 text-gray-400 hover:text-orange-600"
                    title="Schedule Meeting"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCustomers.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding a new customer' }}
        </p>
        <div class="mt-6">
          <button
            @click="showAddCustomer = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Customer
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCustomers.length > 0" class="px-6 py-4 border-t bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ filteredCustomers.length }}</span> of {{ customers.length }} customers
          </div>
          <div class="flex space-x-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}`"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage * pageSize >= filteredCustomers.length"
              :class="`px-3 py-1 rounded border ${currentPage * pageSize >= filteredCustomers.length ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}`"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Customer Modal -->
    <div v-if="showAddCustomer" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold">Add New Customer</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input v-model="newCustomer.company" type="text" class="w-full px-3 py-2 border rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input v-model="newCustomer.name" type="text" class="w-full px-3 py-2 border rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="newCustomer.email" type="email" class="w-full px-3 py-2 border rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Segment</label>
              <select v-model="newCustomer.segment" class="w-full px-3 py-2 border rounded-lg">
                <option value="enterprise">Enterprise</option>
                <option value="mid-market">Mid Market</option>
                <option value="smb">SMB</option>
              </select>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 border-t flex justify-end space-x-3">
          <button @click="showAddCustomer = false" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button @click="addCustomer" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Customer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Search and filters
const searchQuery = ref('')
const selectedSegment = ref('')
const selectedStatus = ref('')
const selectedPlan = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = 10

// Modal
const showAddCustomer = ref(false)
const newCustomer = ref({
  company: '',
  name: '',
  email: '',
  segment: 'smb'
})

// Sample customer data
const customers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechCorp Inc.',
    email: 'sarah@techcorp.com',
    segment: 'enterprise',
    mrr: 12500,
    mrrGrowth: 12,
    healthScore: 85,
    status: 'active',
    lastTouch: '2024-01-15',
    lastActivity: 'QBR Completed',
    isKeyAccount: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Innovate Labs',
    email: 'michael@innovatelabs.com',
    segment: 'mid-market',
    mrr: 8500,
    mrrGrowth: 5,
    healthScore: 65,
    status: 'at-risk',
    lastTouch: '2024-01-14',
    lastActivity: 'Support Ticket',
    isKeyAccount: false
  },
  {
    id: 3,
    name: 'Emma Wilson',
    company: 'Growth Marketing',
    email: 'emma@growthmarketing.com',
    segment: 'smb',
    mrr: 1200,
    mrrGrowth: -2,
    healthScore: 45,
    status: 'at-risk',
    lastTouch: '2024-01-10',
    lastActivity: 'Product Feedback',
    isKeyAccount: false
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Enterprise Solutions',
    email: 'david@enterprisesolutions.com',
    segment: 'enterprise',
    mrr: 25000,
    mrrGrowth: 25,
    healthScore: 92,
    status: 'active',
    lastTouch: '2024-01-12',
    lastActivity: 'Contract Renewed',
    isKeyAccount: true
  },
  {
    id: 5,
    name: 'Lisa Rodriguez',
    company: 'StartUp Co.',
    email: 'lisa@startupco.com',
    segment: 'smb',
    mrr: 800,
    mrrGrowth: 0,
    healthScore: 30,
    status: 'churned',
    lastTouch: '2024-01-05',
    lastActivity: 'Account Cancelled',
    isKeyAccount: false
  },
  {
    id: 6,
    name: 'Robert Kim',
    company: 'Data Analytics Pro',
    email: 'robert@dataanalytics.com',
    segment: 'mid-market',
    mrr: 4500,
    mrrGrowth: 8,
    healthScore: 75,
    status: 'active',
    lastTouch: '2024-01-13',
    lastActivity: 'Training Session',
    isKeyAccount: false
  },
  {
    id: 7,
    name: 'Jennifer Lee',
    company: 'Cloud Systems',
    email: 'jennifer@cloudsystems.com',
    segment: 'enterprise',
    mrr: 18000,
    mrrGrowth: 15,
    healthScore: 88,
    status: 'onboarding',
    lastTouch: '2024-01-16',
    lastActivity: 'Onboarding Call',
    isKeyAccount: false
  }
])

// Computed properties
const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    const matchesSearch = searchQuery.value === '' ||
      customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesSegment = selectedSegment.value === '' || customer.segment === selectedSegment.value
    const matchesStatus = selectedStatus.value === '' || customer.status === selectedStatus.value

    return matchesSearch && matchesSegment && matchesStatus
  })
})

const totalCustomers = computed(() => customers.value.length)
const activeCustomers = computed(() => customers.value.filter(c => c.status === 'active').length)
const atRiskCustomers = computed(() => customers.value.filter(c => c.status === 'at-risk').length)
const churnedCustomers = computed(() => customers.value.filter(c => c.status === 'churned').length)

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getSegmentColor = (segment) => {
  const colors = {
    'enterprise': 'bg-purple-100 text-purple-800',
    'mid-market': 'bg-blue-100 text-blue-800',
    'smb': 'bg-gray-100 text-gray-800'
  }
  return colors[segment] || 'bg-gray-100 text-gray-800'
}

const getHealthScoreColor = (score) => {
  if (score >= 70) return 'bg-green-500'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getHealthScoreTextColor = (score) => {
  if (score >= 70) return 'text-green-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}

const getStatusColor = (status) => {
  const colors = {
    'active': 'bg-green-100 text-green-800',
    'at-risk': 'bg-yellow-100 text-yellow-800',
    'churned': 'bg-red-100 text-red-800',
    'onboarding': 'bg-blue-100 text-blue-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Actions
const viewCustomer = (customer) => {
  alert(`Viewing ${customer.name} from ${customer.company}`)
  // In a real app, navigate to customer detail page
}

const contactCustomer = (customer) => {
  alert(`Opening contact options for ${customer.name}`)
  // In a real app, open email or call dialog
}

const showNotes = (customer) => {
  alert(`Adding note for ${customer.name}`)
  // In a real app, open notes modal
}

const scheduleMeeting = (customer) => {
  alert(`Scheduling meeting with ${customer.name}`)
  // In a real app, open calendar integration
}

const exportCustomers = () => {
  alert('Exporting customer data...')
  // In a real app, generate and download CSV
}

const addCustomer = () => {
  if (!newCustomer.value.company || !newCustomer.value.name || !newCustomer.value.email) {
    alert('Please fill in all required fields')
    return
  }

  customers.value.push({
    id: customers.value.length + 1,
    name: newCustomer.value.name,
    company: newCustomer.value.company,
    email: newCustomer.value.email,
    segment: newCustomer.value.segment,
    mrr: 0,
    mrrGrowth: 0,
    healthScore: 50,
    status: 'onboarding',
    lastTouch: new Date().toISOString().split('T')[0],
    lastActivity: 'New Account',
    isKeyAccount: false
  })

  // Reset form
  newCustomer.value = {
    company: '',
    name: '',
    email: '',
    segment: 'smb'
  }
  showAddCustomer.value = false

  alert('Customer added successfully!')
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value * pageSize < filteredCustomers.value.length) currentPage.value++
}
</script>

<style scoped>
/* Custom styles for better table appearance */
table {
  min-width: 1024px;
}

@media (max-width: 1024px) {
  .overflow-x-auto {
    overflow-x: auto;
  }
}
</style>
