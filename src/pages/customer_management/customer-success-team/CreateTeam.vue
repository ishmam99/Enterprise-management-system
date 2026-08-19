<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center bg-white shadow rounded py-3 px-2 gap-4">
        <div
          class="w-14 h-14 rounded-xl bg-primary text-primary-content flex items-center justify-center"
        >
          <i class="ri-team-line text-3xl"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold">Create Customer Success Team</h1>
          <p class="text-sm text-gray-500">{{ currentDate }}</p>
        </div>
      </div>

      <!-- Card -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body space-y-6">
          <!-- Team Name -->
          <div>
            <label class="block mb-1 font-medium">Team Name</label>
            <input
              v-model="form.name"
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Customer Success Team"
            />
          </div>

          <!-- HTSS Section -->
          <div class="p-4 bg-blue-100 rounded-xl space-y-4">
            <h2 class="text-2xl font-semibold text-blue-600">HTSS Team Section</h2>

            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Partner</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Hi-Tech Softsys</option>
                </select>
              </div>
              <div>
                <label class="label-text font-medium">Choose Customer Success Manager </label>
                <select v-model="form.user_id" class="w-full px-3 py-2 border rounded-lg">
                  <option disabled value="">Select Manager</option>
                  <option
                    v-for="m in successTeamUsers.filter(
                      (e) => e.role == 'Customer Success Manager'
                    )"
                    :key="m.id"
                    :value="m.user_id"
                  >
                    {{ m.user.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Success Manager</option>
                </select>
              </div>
              <!-- Sales -->
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Partner</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Hi-Tech Softsys</option>
                </select>
              </div>
              <div>
                <label class="label-text font-medium"
                  >Choose Customer Success Sales Executive</label
                >
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.sales)"
                >
                  <option disabled selected value="">Select</option>
                  <option
                    v-for="u in users.filter((e) => e.role === 'sales-executive')"
                    :key="u.id"
                    :value="u.id"
                  >
                    {{ u.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Success Sales Executive</option>
                </select>
              </div>
              <!-- Tech -->
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Partner</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Hi-Tech Softsys</option>
                </select>
              </div>
              <div>
                <label class="label-text font-medium">Choose Customer Success Tech Support</label>
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.tech)"
                >
                  <option disabled selected value="">Select</option>
                  <option
                    v-for="u in successTeamUsers.filter(
                      (e) => e.role === 'Customer Success Tech Support'
                    )"
                    :key="u.id"
                    :value="u.user_id"
                  >
                    {{ u.user.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Success Tech Support Executive</option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Partner</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Hi-Tech Softsys</option>
                </select>
              </div>

              <!-- Trainer -->
              <div>
                <label class="label-text font-medium">Choose Customer Success Trainer</label>
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.trainer)"
                >
                  <option disabled selected value="">Select</option>
                  <option
                    v-for="u in users.filter((e) => e.role === 'trainer')"
                    :key="u.id"
                    :value="u.id"
                  >
                    {{ u.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Success Instructor</option>
                </select>
              </div>

              <!-- CRM Executive -->
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Partner</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Hi-Tech Softsys</option>
                </select>
              </div>
              <div>
                <label class="label-text font-medium">Choose Customer Success CRM Executive</label>
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.crm)"
                >
                  <option disabled selected value="">Select</option>
                  <option
                    v-for="u in users.filter((e) => e.role === 'crm-executive')"
                    :key="u.id"
                    :value="u.id"
                  >
                    {{ u.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Success CRM Executive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Partner Section -->
          <div class="p-4 bg-violet-100 rounded-xl space-y-3">
            <h2 class="text-2xl font-semibold text-violet-600">Partner Section</h2>
            <div class="grid gap-4 grid-cols-3">
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Partner</span>
                </label>
                <select class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option v-for="partner in partners" :key="partner">
                    {{ partner.user.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Partner Representative</span>
                </label>
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.partner)"
                >
                  <option disabled selected value="">Select Partner Rep</option>
                  <option v-for="p in partnerReps" :key="p.id" :value="p.id">
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">MSC Direct Sales Representative</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Customer Section -->
          <div class="p-4 bg-pink-100 rounded-xl space-y-4">
            <h2 class="text-2xl font-semibold text-pink-600">Customer Section</h2>

            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Parent Company</span>
                </label>
                <select v-model="form.company_id" class="px-3 py-2 border rounded-lg">
                  <option disabled value="">Select Parent Company</option>
                  <option v-for="c in companies" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Choose a Customer Representative</span>
                </label>
                <select
                  class="w-full px-3 py-2 border rounded-lg"
                  @change="(e) => upsertMember(+e.target.value, roles.customer)"
                >
                  <option disabled selected value="">Select Partner Rep</option>
                  <option v-for="p in customerReps" :key="p.id" :value="p.id">
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="label">
                  <span class="label-text font-medium">Select Customer Success Team Role</span>
                </label>
                <select disabled class="px-3 py-2 border bg-gray-100 rounded-lg">
                  <option selected value="">Customer Representative</option>
                </select>
              </div>
            </div>

            <div v-if="selectedCompany" class="grid grid-cols-3 gap-3">
              <div
                v-for="customer in selectedCompany.customers"
                :key="customer.id"
                class="flex items-center gap-2 bg-fuchsia-500 text-white p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  @change="toggleCustomer(customer.user.id)"
                />
                <span class="flex-1 text-center">
                  {{ customer.user.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-center gap-4">
            <button class="btn btn-outline" @click="resetForm">Reset</button>
            <button class="btn btn-primary" @click="submitForm">Create Team</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import Swal from 'sweetalert2'
import api from '@/config/api'
import Partners from '@/components/homePage/Partners.vue'

/* Roles */
const roles = {
  sales: 'Customer Success Sales Executive',
  tech: 'Customer Success Tech Support Executive',
  trainer: 'Customer Success Instructor',
  partner: 'MSC Direct Sales Representative',
  customer: 'Customer Representative',
  crm: 'Customer Success CRM Executive'
}

/* Form */
const form = ref({
  name: '',
  user_id: null,
  status: 1,
  company_id: null,
  companies: [],
  members: []
})

/* Lists */
const users = ref([])
const managers = ref([])
const companies = ref([])
const partnerReps = ref([])
const partners = ref([])
const customerReps = ref([])
const successTeamUsers = ref([])
/* Computed */
const selectedCompany = computed(() => companies.value.find((c) => c.id === form.value.company_id))

const currentDate = moment().format('dddd, MMMM Do YYYY')

/* Helpers */
const upsertMember = (id, role) => {
  if (!id) return
  const i = form.value.members.findIndex((m) => m.role === role)
  if (i !== -1) form.value.members[i].id = id
  else form.value.members.push({ id, role })
}

const toggleCustomer = (id) => {
  const exists = form.value.members.find((m) => m.id === id)
  if (exists) {
    form.value.members = form.value.members.filter((m) => m.id !== id)
  } else {
    form.value.members.push({ id, role: roles.customer })
  }
}

/* API */
const getUsers = async () => {
  const { data } = await api().get(
    '/users?role[]=customer_success_management_manager&role[]=partner&role[]=customer-manager&role[]=trainer&role[]=software_management_system_executive&role[]=sales-executive&role[]=crm-executive'
  )
  users.value = data.data
  managers.value = data.data.filter((e) => e.role === 'customer_success_management_manager')
  partnerReps.value = data.data.filter((e) => e.role === 'partner')
  customerReps.value = data.data.filter((e) => e.role === 'customer-manager')
}

const getCompanies = async () => {
  const { data } = await api().get('/companies?with=customers.user')
  companies.value = data.data
}

/* Submit */
const submitForm = async () => {
  if (!form.value.name || !form.value.user_id) {
    Swal.fire('Missing data', 'Team name & manager required', 'warning')
    return
  }

  const payload = {
    name: form.value.name,
    user_id: form.value.user_id,
    status: form.value.status,
    company_id: form.value.company_id,
    companies: form.value.companies,
    members: form.value.members
  }
  console.log(payload)
  await api().post('/success-teams', payload)
  Swal.fire('Success', 'Team created successfully', 'success')
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    user_id: null,
    status: 1,
    company_id: null,
    companies: [],
    members: []
  }
}
const getSuccessTeamUsers = async () => {
  const { data } = await api().get('success-team-roles?with=user')
  successTeamUsers.value = data.data
}
const getPartners = async () => {
  const { data } = await api().get('partners?with=user')
  partners.value = data.data
}

onMounted(() => {
  getSuccessTeamUsers()
  getUsers()
  getPartners()
  getCompanies()
})
</script>
