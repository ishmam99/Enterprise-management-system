<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import api from '@/config/api'


const activities = ref([]);

/* --------------------------------------------------
   Route
-------------------------------------------------- */
const route = useRoute()
const teamId = route.params.id

/* --------------------------------------------------
   State
-------------------------------------------------- */
const loading = ref(true)
const team = ref(null)

/* --------------------------------------------------
   Fetch Team
-------------------------------------------------- */
const getTeam = async () => {
  loading.value = true

  const { data } = await api().get(`/success-teams/${teamId}`, {
    params: {
      include: 'members,companies.customers,owner'
    }
  })

  team.value = data
  loading.value = false
}

const getActivities = async () =>{
  try{
    const { data } = await api().get(`/monthly-csm-activity`);
    activities.value = data.data.filter( e => e.user_id == route.query.user_id );
    console.log(activities);
  } catch (error){
    console.error('Error fetching activities:', error)
  }
}

// const activities = ref([
//   {
//     time: 'Today, 10:30 AM',
//     type: 'Update',
//     description: 'Team details updated by manager',
//     color: 'bg-blue-500 text-white',
//     badgeColor: 'badge-primary',
//     icon: 'ri-edit-line',
//   },
//   {
//     time: '2 days ago, 2:15 PM',
//     type: 'Company',
//     description: 'New company assigned to this team',
//     color: 'bg-green-500 text-white',
//     badgeColor: 'badge-success',
//     icon: 'ri-building-line',
//   },
//   {
//     time: '5 days ago, 09:00 AM',
//     type: 'Member',
//     description: 'New member added to the team',
//     color: 'bg-sky-500 text-white',
//     badgeColor: 'badge-info',
//     icon: 'ri-user-add-line',
//   },
// ])

onMounted( () =>{
  getActivities();
  getTeam();
})
</script>

<template>
  <div class="max-w-7xl bg-slate-200 mx-auto p-6 space-y-6">

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <template v-else>

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl text-violet-600 font-bold">
            {{ team.name }}
          </h1>
          <p class="text-sm text-gray-500">
            Created {{ moment(team.created_at).fromNow() }}
          </p>
        </div>

        <span
          class="badge px-2 text-white"
          :class="team.status ? 'badge-success' : 'badge-error'"
        >
          {{ team.status ? 'Active' : 'Inactive' }}
        </span>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div class="stat text-blue-500 bg-base-100 shadow rounded-xl">
          <div class="stat-title">Manager</div>
          <div class="stat-value  text-lg">
            {{ team.owner?.name }}
          </div>
        </div>

        <div class="stat text-violet-500 bg-base-100 shadow rounded-xl">
          <div class="stat-title">Members</div>
          <div class="stat-value ">{{ team.members.length }}</div>
        </div>

        <div class="stat text-green-500 bg-base-100 shadow rounded-xl">
          <div class="stat-title">Companies</div>
          <div class="stat-value ">{{ team.companies.length }}</div>
        </div>

        <div class="stat text-amber-500 bg-base-100 shadow rounded-xl">
          <div class="stat-title">Customers</div>
          <div class="stat-value">
            {{
              team.companies.reduce(
                (sum, c) => sum + c.customers.length,
                0
              )
            }}
          </div>
        </div>
      </div>

      <!-- Members -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">Team Members</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              v-for="member in team.members"
              :key="member.id"
              class="flex items-center justify-between p-3 rounded-lg bg-base-200"
            >
              <div>
                <p class="font-medium">{{ member.name }}</p>
                <p class="text-xs text-gray-500">{{ member.email }}</p>
              </div>

              <span class="badge badge-primary badge-outline">
                {{ member.pivot.role }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Companies & Customers -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">Companies & Customers</h2>

          <div class="space-y-4">
            <div
              v-for="company in team.companies"
              :key="company.id"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-lg">
                  {{ company.name }}
                </h3>

                <span class="badge px-2 text-white badge-info">
                  {{ company.customers.length }} Customers
                </span>
              </div>

              <!-- Customers -->
              <div v-if="company.customers.length">
                <ul class="divide-y">
                  <li
                    v-for="customer in company.customers"
                    :key="customer.id"
                    class="py-2 flex justify-between text-sm"
                  >
                  <div>
                    <div class="font-medium">{{ customer.user.name }}</div>
                    <p class="text-sm font-semibold text-gray-600"> {{ customer.phone }}</p>
                  </div>

                    <div v-if=" customer.industry" class="bg-sky-700 text-white px-2 py-1 flex items-center rounded-full ">{{ customer.industry?.name }}</div>
                    <span class="text-gray-500">
                      {{ customer.user.email }}
                    </span>
                  </li>
                </ul>
              </div>

              <p v-else class="text-sm text-gray-400 italic">
                No customers assigned
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Timeline -->
     <div class="card bg-base-100 shadow-lg rounded-xl">
  <div class="card-body">
   <h2 class="card-title text-xl font-bold mb-4">Recent Activity</h2>

<ul class="relative border-l border-gray-200">
  <li
    v-for="item in activities"
    :key="item.id"
    class="mb-8 ml-6"
  >
    <!-- Timeline Dot -->
    <span
      class="absolute -left-3.5 flex items-center justify-center w-7 h-7 rounded-full ring-8 ring-base-100 bg-success text-white"
    >
      <i class="ri-file-list-3-line text-sm"></i>
    </span>

    <!-- Content -->
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <!-- Date -->
        <span class="text-gray-400 text-xs">
          {{ item.date }}
        </span>

        <!-- Type -->
        <span class="badge badge-sm badge-success">
          {{ item.type }}
        </span>
      </div>

      <!-- Activity HTML -->
      <div
        class="text-gray-700 text-sm leading-relaxed"
        v-html="item.activity"
      ></div>
    </div>
  </li>
</ul>

  </div>
</div>


    </template>
  </div>
</template>
