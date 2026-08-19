<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import api from '@/config/api'

/* ---------------- Router ---------------- */
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)

/* ---------------- State ---------------- */
const loading = ref(false)
const submitting = ref(false)
const addMembers = ref(false)

// Modal states
const showAddMemberModal = ref(false)
const showPartnerModal = ref(false)
const showCustomerModal = ref(false)
const showCompanyModal = ref(false)
const showTeamNameEdit = ref(false)

const form = ref({
  name: '',
  user_id: null,
  status: true,
  members: [] // [{ id, role }]
})

// For modals
const newMembers = ref([])
const newPartnerReps = ref([])
const newCustomerReps = ref([])
const selectedCompany = ref(null)
const selectedRole = ref('')
const selectedUsers = ref([])

const managerList = ref([])
const salesExecutive = ref([])
const trainerList = ref([])
const techSupportList = ref([])
const crmExecutiveList = ref([])
const partnerList = ref([])
const customerRepList = ref([])
const members = ref([]) // 👉 ALL available members (users)
const companies = ref([])
const team = ref([])
const partnerRepresentative = ref('')
const customerRepresentative = ref('')
const memberIds = ref([])

const roles = {
  sales: 'Customer Success Sales Executive',
  tech: 'Customer Success Tech Support Executive',
  trainer: 'Customer Success Instructor',
  crm: 'Customer Success CRM Executive'
}
/* ---------------- Fetch Team (Edit Mode) ---------------- */
const getTeam = async () => {
  if (!isEdit.value) return

  loading.value = true
  const { data } = await api().get(`/success-teams/${route.params.id}`)
  team.value = data

  if (team.value != null) {
    getUsers()
    getCompanies()
  }

  form.value.name = data.name
  form.value.user_id = data.user_id
  form.value.status = !!data.status
  partnerRepresentative.value = data.members.find((e) => e.role === 'partner')?.name || ''
  customerRepresentative.value = data.members.find((e) => e.role === 'customer-manager')?.name || ''

  // selected members with role
  form.value.members = data.members.map((m) => ({
    id: m.id,
    role: m.pivot.role
  }))

  loading.value = false
}

/* ---------------- Fetch Managers ---------------- */
const getUsers = async () => {
  const { data } = await api().get(
    '/users?role[]=customer_success_management_manager&role[]=partner&role[]=customer-manager&role[]=trainer&role[]=software_management_system_executive&role[]=sales-executive&role[]=customer-manager&role[]=crm-executive'
  )

  let userList = []

  userList = data.data.filter((e) => !team.value.members.some((m) => m.id == e.id))

  managerList.value = userList.filter((e) => e.role === 'customer_success_management_manager')
  salesExecutive.value = userList.filter((e) => e.role === 'sales-executive')
  trainerList.value = userList.filter((e) => e.role === 'trainer')
  techSupportList.value = userList.filter((e) => e.role === 'software_management_system_executive')
  crmExecutiveList.value = userList.filter((e) => e.role === 'crm-executive')
  partnerList.value = userList.filter((e) => e.role === 'partner')
  customerRepList.value = userList.filter((e) => e.role === 'customer-manager')
}

/* ---------------- Fetch Members (FROM SUCCESS TEAMS) ---------------- */
const getMembers = async () => {
  const { data } = await api().get('/success-teams?page=1&search=')

  const usersMap = new Map()

  data.data?.map((team) => {
    team.members?.map((member) => {
      if (!usersMap.has(member.id)) {
        usersMap.set(member.id, {
          id: member.id,
          name: member.name
        })
      }
    })
  })

  // 👉 FINAL usable members list
  members.value = Array.from(usersMap.values())
}

/*  Fetch Companies  */
const getCompanies = async () => {
  const { data } = await api().get('/companies')

  console.log(team.value.company_id)
  console.log(data.data)
  companies.value = data.data.filter((e) => e.id != team.value.company_id)
  console.log(companies.value)
}

// Update Team Name
const updateTeamName = async () => {
  if (!form.value.name.trim()) {
    Swal.fire('Error', 'Team name cannot be empty', 'error')
    return
  }

  try {
    submitting.value = true
    await api().post(`/success-teams/${route.params.id}`, {
      name: form.value.name,
      _method: 'put'
    })

    await getTeam() // Refresh team data
    showTeamNameEdit.value = false
    Swal.fire('Success', 'Team name updated successfully', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to update team name', 'error')
  } finally {
    submitting.value = false
  }
}

// Remove Member
const removeMember = async (memberId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to remove this member from the team?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!'
  })

  if (!result.isConfirmed) return

  try {
    submitting.value = true
    await api().post(`/success-teams/${route.params.id}/assign`, {
      remove_members: [memberId]
    })

    await getTeam() // Refresh team data
    Swal.fire('Removed!', 'Member has been removed.', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to remove member', 'error')
  } finally {
    submitting.value = false
  }
}

// Add Members
const openAddMemberModal = () => {
  selectedRole.value = ''
  selectedUsers.value = []
  showAddMemberModal.value = true
}

const getUsersByRole = computed(() => {
  switch (selectedRole.value) {
    case 'sales':
      return salesExecutive.value
    case 'tech':
      return techSupportList.value
    case 'trainer':
      return trainerList.value
    case 'crm':
      return crmExecutiveList.value
    default:
      return []
  }
})

const addNewMembers = async () => {
  if (!selectedRole.value || selectedUsers.value.length === 0) {
    Swal.fire('Error', 'Please select a role and at least one user', 'error')
    return
  }

  try {
    submitting.value = true

    const membersToAdd = selectedUsers.value.map((userId) => ({
      id: userId,
      role: roles[selectedRole.value]
    }))

    await api().post(`/success-teams/${route.params.id}/assign`, {
      members: [...form.value.members, ...membersToAdd],
      companies: form.value.companies
    })

    await getTeam() // Refresh team data
    showAddMemberModal.value = false
    selectedRole.value = ''
    selectedUsers.value = []
    Swal.fire('Success', 'Members added successfully', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to add members', 'error')
  } finally {
    submitting.value = false
  }
}

/* ---------------- Add Partner Representative (API 1) ---------------- */
const openPartnerModal = () => {
  newPartnerReps.value = []
  showPartnerModal.value = true
}

const addPartnerRepresentatives = async () => {
  if (newPartnerReps.value.length === 0) {
    Swal.fire('Error', 'Please select at least one partner representative', 'error')
    return
  }

  try {
    submitting.value = true

    const partnersToAdd = newPartnerReps.value.map((userId) => ({
      id: userId,
      role: 'MSC Direct Sales Representative'
    }))

    await api().post(`/success-teams/${route.params.id}/assign`, {
      members: [...form.value.members, ...partnersToAdd],
      companies: form.value.companies
    })

    await getTeam() // Refresh team data
    showPartnerModal.value = false
    newPartnerReps.value = []
    Swal.fire('Success', 'Partner representatives added successfully', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to add partner representatives', 'error')
  } finally {
    submitting.value = false
  }
}

/* ---------------- Add Customer Representative (API 1) ---------------- */
const openCustomerModal = () => {
  newCustomerReps.value = []
  showCustomerModal.value = true
}

const addCustomerRepresentatives = async () => {
  if (newCustomerReps.value.length === 0) {
    Swal.fire('Error', 'Please select at least one customer representative', 'error')
    return
  }

  try {
    submitting.value = true

    const customersToAdd = newCustomerReps.value.map((userId) => ({
      id: userId,
      role: 'customer-manager'
    }))

    await api().post(`/success-teams/${route.params.id}/assign`, {
      members: [...form.value.members, ...customersToAdd],
      companies: form.value.companies
    })

    await getTeam() // Refresh team data
    showCustomerModal.value = false
    newCustomerReps.value = []
    Swal.fire('Success', 'Customer representatives added successfully', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to add customer representatives', 'error')
  } finally {
    submitting.value = false
  }
}

/* ---------------- Update Company (API 2) ---------------- */
const openCompanyModal = () => {
  selectedCompany.value = null
  showCompanyModal.value = true
}

const updateCompany = async () => {
  if (!selectedCompany.value) {
    Swal.fire('Error', 'Please select a company', 'error')
    return
  }

  try {
    submitting.value = true

    await api().post(`/success-teams/${route.params.id}`, {
      company_id: selectedCompany.value,
      _method: 'put'
    })

    await getTeam() // Refresh team data
    showCompanyModal.value = false
    Swal.fire('Success', 'Company updated successfully', 'success')
  } catch (error) {
    Swal.fire('Error', 'Failed to update company', 'error')
  } finally {
    submitting.value = false
  }
}

/* ---------------- Mount ---------------- */
onMounted(async () => {
  getMembers(), getTeam()
})
</script>

<template>
  <div class="max-w mx-auto p-6">
    <div class="flex w-full justify-between items-center">
      <h2 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {{ isEdit ? 'Edit Success Team' : 'Create Success Team' }}
      </h2>
      <button class="btn btn-secondary" @click="router.push('/customer_management/customer-success-team/TeamList')"> Go
        Back</button>
    </div>
    <div v-if="loading" class="text-center py-10 text-gray-600 dark:text-gray-400">Loading...</div>

    <div v-else class="space-y-6">
      <!-- Team Info -->
      <h3 class="font-semibold text-gray-700 dark:text-gray-300">Team Name</h3>
      <div
        class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
        <div v-if="showTeamNameEdit" class="space-y-4">
          <div class="flex gap-2">
            <button @click="updateTeamName" :disabled="submitting"
              class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Saving...' : 'Save' }}
            </button>
            <button @click="showTeamNameEdit = false"
              class="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors">
              Cancel
            </button>
          </div>
          <input v-model="form.name" type="text"
            class="w-full h-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Team name" />
        </div>
        <div v-else class="flex items-center justify-between">
          <div class="h-16 px-3 py-2 flex items-center text-gray-800 dark:text-gray-200 text-lg font-medium">
            {{ form.name }}
          </div>
          <button @click="showTeamNameEdit = true"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
            Edit
          </button>
        </div>
      </div>

      <div>
        <div class="flex justify-between pb-2">
          <h3 class="font-semibold text-gray-700 dark:text-gray-300">Customer Success Manager</h3>
        </div>
        <div
          class="group flex items-center justify-between gap-3 p-3 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
          <div class="flex items-center gap-3">
            <!-- User Info -->
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full">
                <span class="text-white font-semibold">
                  {{ team.owner?.name?.split('')[0]?.charAt(0)?.toUpperCase() }}
                  {{ team.owner?.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || '' }}
                </span>
              </div>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {{ team.owner?.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Members -->
      <div>
        <div class="flex justify-between pb-2">
          <h3 class="font-semibold text-gray-700 dark:text-gray-300 mt-2">Team Members</h3>
          <button type="button" @click="openAddMemberModal"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="submitting">
            Add New Member
          </button>
        </div>

        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div v-if="
            team.members &&
            team.members.filter((m) => m.role !== 'partner' && m.role !== 'customer-manager')
              .length > 0
          " class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="member in team.members.filter(
              (m) => m.role !== 'partner' && m.role !== 'customer-manager'
            )" :key="member.id"
              class="group flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
              <div class="flex items-center gap-3">
                <!-- User Info -->
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full">
                    <span class="text-white font-semibold">
                      {{ member.name?.split('')[0]?.charAt(0)?.toUpperCase() }}
                      {{ member.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || '' }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {{ member.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ member.pivot.role }}
                  </p>
                </div>
              </div>
              <!-- Remove Button -->
              <button @click="removeMember(member.id)" :disabled="submitting"
                class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-600 border border-red-300 dark:border-red-700 hover:border-red-500 rounded-lg transition-all duration-200 group/button disabled:opacity-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
            No team members added yet
          </div>
        </div>
      </div>

      <!-- MSC Direct Sales Representative -->
      <div>
        <div class="flex justify-between pb-2">
          <h3 class="font-semibold text-gray-700 dark:text-gray-300 mt-2">
            MSC Direct Sales Representative
          </h3>
          <button type="button" @click="openPartnerModal"
            class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="submitting">
            Add New MSC Direct Sales Representative
          </button>
        </div>

        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div v-if="team.members && team.members.filter((m) => m.role === 'partner').length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="member in team.members.filter((m) => m.role === 'partner')" :key="member.id"
              class="group flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
              <div class="flex items-center gap-3">
                <!-- User Info -->
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full">
                    <span class="text-white font-semibold">
                      {{ member.name?.split('')[0]?.charAt(0)?.toUpperCase() }}
                      {{ member.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || '' }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {{ member.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    MSC Direct Sales Representative
                  </p>
                </div>
              </div>
              <!-- Remove Button -->
              <button @click="removeMember(member.id)" :disabled="submitting"
                class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-600 border border-red-300 dark:border-red-700 hover:border-red-500 rounded-lg transition-all duration-200 group/button disabled:opacity-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
            No MSC Direct Sales Representative added yet
          </div>
        </div>
      </div>

      <!-- Customer Representative -->
      <div>
        <div class="flex justify-between pb-2">
          <h3 class="font-semibold text-gray-700 dark:text-gray-300 mt-2">
            Customer Representative
          </h3>
          <button type="button" @click="openCustomerModal"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="submitting">
            Add New Customer Representative
          </button>
        </div>

        <div class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div v-if="
            team.members && team.members.filter((m) => m.role === 'customer-manager').length > 0
          " class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="member in team.members.filter((m) => m.role === 'customer-manager')" :key="member.id"
              class="group flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
              <div class="flex items-center gap-3">
                <!-- User Info -->
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full">
                    <span class="text-white font-semibold">
                      {{ member.name?.split('')[0]?.charAt(0)?.toUpperCase() }}
                      {{ member.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || '' }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {{ member.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Customer Representative</p>
                </div>
              </div>
              <!-- Remove Button -->
              <button @click="removeMember(member.id)" :disabled="submitting"
                class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-600 border border-red-300 dark:border-red-700 hover:border-red-500 rounded-lg transition-all duration-200 group/button disabled:opacity-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
            No Customer Representative added yet
          </div>
        </div>
      </div>

      <!-- Company -->
      <div>
        <!-- Company -->
        <div>
          <div class="flex justify-between pb-2">
            <h3 class="font-semibold text-gray-700 dark:text-gray-300">Company</h3>
            <button @click="openCompanyModal"
              class="text-white btn btn-success hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">
              {{ team.company ? 'Change' : 'Add Company' }}
            </button>
          </div>
          <!-- Company Info -->
          <div v-if="team.company" class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full">
                  <span class="text-white font-semibold">
                    {{ team.company.name?.split('')[0]?.charAt(0)?.toUpperCase() }}
                    {{ team.company.name?.split(' ')[1]?.charAt(0)?.toUpperCase() || '' }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {{ team.company.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Member Modal -->
    <div v-if="showAddMemberModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Add Team Members
          </h3>

          <!-- Role Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Role</label>
            <select v-model="selectedRole"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="">Select a role</option>
              <option value="sales">Customer Success Sales Executive</option>
              <option value="tech">Customer Success Tech Support Executive</option>
              <option value="trainer">Customer Success Instructor</option>
              <option value="crm">Customer Success CRM Executive</option>
            </select>
          </div>

          <!-- User Selection -->
          <div v-if="selectedRole" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Users</label>
            <div class="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md">
              <div v-for="user in getUsersByRole" :key="user.id"
                class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <input type="checkbox" :value="user.id" v-model="selectedUsers" :id="'user-' + user.id"
                  class="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500" />
                <label :for="'user-' + user.id" class="ml-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {{ user.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button @click="showAddMemberModal = false"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button @click="addNewMembers" :disabled="submitting || !selectedRole || selectedUsers.length === 0"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Adding...' : 'Add Members' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Partner Representative Modal -->
    <div v-if="showPartnerModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Add MSC Direct Sales Representative
          </h3>

          <!-- Partner Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select MSC Direct Sales
              Representatives</label>
            <div class="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md">
              <div v-for="partner in partnerList" :key="partner.id"
                class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <input type="checkbox" :value="partner.id" v-model="newPartnerReps" :id="'partner-' + partner.id"
                  class="h-4 w-4 text-orange-600 rounded border-gray-300 dark:border-gray-600 focus:ring-orange-500" />
                <label :for="'partner-' + partner.id"
                  class="ml-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {{ partner.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="showPartnerModal = false"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button @click="addPartnerRepresentatives" :disabled="submitting || newPartnerReps.length === 0"
              class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Adding...' : 'Add Representatives' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Customer Representative Modal -->
    <div v-if="showCustomerModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Add Customer Representative
          </h3>

          <!-- Customer Representative Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Customer
              Representatives</label>
            <div class="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md">
              <div v-for="customerRep in customerRepList" :key="customerRep.id"
                class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <input type="checkbox" :value="customerRep.id" v-model="newCustomerReps"
                  :id="'customer-' + customerRep.id"
                  class="h-4 w-4 text-purple-600 rounded border-gray-300 dark:border-gray-600 focus:ring-purple-500" />
                <label :for="'customer-' + customerRep.id"
                  class="ml-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {{ customerRep.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="showCustomerModal = false"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button @click="addCustomerRepresentatives" :disabled="submitting || newCustomerReps.length === 0"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Adding...' : 'Add Representatives' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Company Modal -->
    <div v-if="showCompanyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Change Company
          </h3>

          <!-- Company Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Company</label>
            <select v-model="selectedCompany"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="">Select a company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>

          <div class="flex justify-end gap-3">
            <button @click="showCompanyModal = false"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button @click="updateCompany" :disabled="submitting || !selectedCompany"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors disabled:opacity-50">
              {{ submitting ? 'Saving...' : 'Save Company' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
