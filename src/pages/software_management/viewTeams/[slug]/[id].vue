<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div class="max-w-7xl mx-auto ">

      <!-- Header -->
      <div class="flex items-center justify-between bg-white shadow rounded p-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center">
            <i class="ri-team-line text-3xl"></i>
          </div>
          <div>
            <h1 class="text-3xl font-bold">{{ team.name }}</h1>
            <p class="text-sm text-gray-500">
              Created on {{ formattedDate }}
            </p>
          </div>
        </div>

        <span
          class="badge px-3 text-white"
          :class="team.status ? 'badge-success' : 'badge-error'"
        >
          {{ team.status ? 'Active' : 'Inactive' }}
        </span>
      </div>

      <!-- Owner -->
       <div class="flex mt-10 justify-center items-center">
      <div class="card bg-green-100 shadow">
        <div class="card-body">
          <h2 class="text-xl font-semibold text-primary mb-3">
            Customer Representative
          </h2>

          <div  v-for="m in customerMembers"
              :key="m.id" class="flex items-center gap-3">
            <div class=" placeholder">
              <div class="bg-primary flex justify-center items-center text-white rounded-full p-3 w-12">
                {{ initials(m.name.charAt(0)) }}
              </div>
            </div>
            <div>
              <p class="font-medium">{{m.name }}</p>
              <p class="text-sm text-gray-500">Customer Representative</p>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
       <div class="flex justify-center items-center">
      <div class="card bg-sky-100 shadow">
        <div class="card-body">
          <h2 class="text-xl font-semibold text-primary mb-3">
            Customer Success Manager
          </h2>

          <div class="flex items-center gap-3">
            <div class=" placeholder">
              <div class="bg-primary flex justify-center items-center text-white rounded-full p-3 w-12">
                {{ initials(team.owner?.name) }}
              </div>
            </div>
            <div>
              <p class="font-medium">{{ team.owner?.name }}</p>
              <p class="text-sm text-gray-500">Customer Success Manager</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
       <div class="grid grid-cols-7">
        <div></div>
      <div class="card col-span-2 bg-fuchsia-100 shadow">
        <div  v-for="m in partnerMembers" :key="m.id"  class="card-body">
          <h2 class="text-xl font-semibold text-primary mb-3">
            {{ m.pivot.role }}
          </h2>

          <div  class="flex items-center gap-3">
            <div class=" placeholder">
              <div class="bg-primary flex justify-center items-center text-white rounded-full p-3 w-12">
                {{ initials(m?.name) }}
              </div>
            </div>
            <div>
              <p class="font-medium">{{ m?.name }}</p>
              <p class="text-sm text-gray-500">{{ m.pivot.role }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center mr-2 justify-start">
        <div class="border-b-4 w-1/2 flex justify-center items-center h-2"></div>
      <div class="border-r-4 h-full flex justify-center items-center"></div>
      </div>

      </div>
        <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
            <div class="border-b-4 w-2/3 mx-auto flex justify-center items-center h-2"></div>
        <div class="grid grid-cols-3">
            <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
            <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
            <div class="border-r-4 h-20 flex justify-center items-center w-1/2"></div>
          </div>
        <div class="grid gap-16 grid-cols-3">
        <div  v-for="m in htssMembers"
              :key="m.id" class="card bg-amber-100 shadow">
        <div class="card-body">
          <h2 class="text-xl font-semibold text-primary mb-3">
            {{ m.pivot.role  }}
          </h2>

          <div class="flex items-center gap-3">
            <div class=" placeholder">
              <div class="bg-primary flex justify-center items-center text-white rounded-full p-3 w-12">
                {{ initials(m?.name) }}
              </div>
            </div>
            <div>
              <p class="font-medium">{{ m?.name }}</p>
              <p class="text-sm text-gray-500">{{ m.pivot.role }}</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- HTSS Team -->
      <div class="card hidden bg-blue-50 shadow">
        <div class="card-body space-y-4">
          <h2 class="text-2xl font-semibold text-blue-600">
            HTSS Team Members
          </h2>

          <div class="grid grid-cols-3 gap-4">
            <MemberCard
              v-for="m in htssMembers"
              :key="m.id"
              :member="m"
            />
          </div>
        </div>
      </div>

      <!-- Partner Section -->
      <div class="card hidden bg-violet-50 shadow">
        <div class="card-body space-y-4">
          <h2 class="text-2xl font-semibold text-violet-600">
            Partner Section
          </h2>
             <div class="mb-3 bg-sky-100 px-3 text-lg py-2 rounded-lg text-violet-900">
            <span class="font-semibold">Partner  :</span>
            <span class="ml-2 badge font-bold text-lg text-blue-900  badge-outline">
             MSC Hexagon
            </span>
          </div>
          <MemberCard
            v-for="m in partnerMembers"
            :key="m.id"
            :member="m"
          />
        </div>
      </div>

      <!-- Customer Section -->
      <div class="card hidden bg-pink-50 shadow">
        <div class="card-body space-y-4">
          <h2 class="text-2xl font-semibold text-pink-600">
            Customer Section
          </h2>
           <div class="mb-3 bg-fuchsia-100 px-3 text-lg py-2 rounded-lg text-violet-900">
            <span class="font-semibold">Parent Company :</span>
            <span class="ml-2 badge font-bold text-lg text-blue-900  badge-outline">
              {{ team.company?.name }}
            </span>
          </div>
            <div class="flex justify-start items-center gap-10">


          <div class="w-full ">
            <MemberCard class="w-full"
              v-for="m in customerMembers"
              :key="m.id"
              :member="m"
            />
          </div>
          </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="customer in team.company?.customers"
      :key="customer.id"
      class="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div class="card-body p-5">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div class=" placeholder">
            <div
              class="bg-blue-600 text-white  rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold"
            >
              {{ customer.user.name.charAt(0) }}
            </div>
          </div>

          <!-- Name & Email -->
          <div class="flex-1">
            <h2 class="font-semibold text-base">
              {{ customer.user.name }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ customer.user.email }}
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider my-2"></div>

        <!-- Info -->
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">Account type</span>
            <span class="font-medium">
              {{ customer.role ?? 'Customer' }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Phone</span>
            <span class="font-medium">
              {{ customer.user.phone ?? customer.phone }}
            </span>
          </div>
        </div>


      </div>

  </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import api from '@/config/api'
import MemberCard from '@/components/shared/MemberCard.vue'

const teamId = computed(() => route.params.id)

/* Route */
const route = useRoute()

/* State */
const team = ref({})

/* Computed */
const formattedDate = computed(() =>
  team.value.created_at
    ? moment(team.value.created_at).format('MMMM Do YYYY')
    : ''
)

const htssMembers = computed(() =>
  team.value.members?.filter(m =>
    m.pivot.role.includes('Customer Success') &&
    !m.pivot.role.includes('MSC') &&
    !m.pivot.role.includes('Customer Representative')
  ) || []
)

const partnerMembers = computed(() =>
  team.value.members?.filter(m =>
    m.pivot.role.includes('MSC')
  ) || []
)

const customerMembers = computed(() =>
  team.value.members?.filter(m =>
    m.pivot.role.includes('Customer Representative')
  ) || []
)

/* Helpers */
const initials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

/* API */
// const getTeam = async () => {
//   const { data } = await api().get(`/success-teams/7`)
//   team.value = data
// }
const getTeam = async () => {
  try {
    const { data } = await api().get(`/success-teams/${teamId.value}`)
    team.value = data.data ?? data
  } catch (err) {
    console.error('Failed to load team', err)
  }
}

onMounted(getTeam)
</script>
