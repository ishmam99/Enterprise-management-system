
<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="mx-auto ">

      <!-- Header with modern gradient -->
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200">
            <i class="ri-group-line text-2xl"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-slate-800">Customer Success Teams</h1>
            <p class="text-sm text-slate-500">
              Manage teams, members & assigned companies
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <!-- Search with icon -->
          <div class="relative">
            <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input v-model="search" type="text" placeholder="Search teams..."
              class="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <router-link to="/teams/create"
            class="inline-flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 text-sm font-medium text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl">
            <i class="ri-add-line text-lg"></i>
            Create Team
          </router-link>
        </div>
      </div>

      <!-- Excel-like card -->
      <div class="overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-200">
        <!-- Loading state -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="flex items-center gap-3 text-slate-500">
            <i class="ri-loader-4-line animate-spin text-xl"></i>
            <span>Loading teams...</span>
          </div>
        </div>

        <!-- Excel-like table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Team</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Manager</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Members</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Company</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Customers</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Created</th>
                <th
                  class="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr v-if="teams.length === 0">
                <td colspan="8" class="py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <i class="ri-team-line text-4xl text-slate-300"></i>
                    <p class="text-slate-500">No teams found</p>
                    <router-link to="/teams/create" class="text-sm text-blue-600 hover:text-blue-700">
                      Create your first team
                    </router-link>
                  </div>
                </td>
              </tr>

              <tr v-for="team in teams" :key="team.id" class="transition-colors hover:bg-blue-50/50">
                <!-- Team -->
                <td class="px-4 py-3 font-medium text-slate-800">
                  {{ team.name }}
                </td>

                <!-- Manager -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-7 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                      {{ team.owner?.name?.charAt(0) || '?' }} {{ team.owner?.name?.split(" ")[1].charAt(0) || '?' }}
                    </div>
                    <span class="text-slate-700">{{ team.owner?.name || '—' }}</span>
                  </div>
                </td>

                <!-- Members -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      {{team?.members?.filter(m => m.role != 'customer-manager').length}}
                    </span>
                    <div class="flex -space-x-2 gap-1">
                      <div class="flex flex-col space-y-2">
                        <div v-for="member in team.members.filter(m => m.role != 'customer-manager')"
                          :key="member.id"
                          class="flex items-center justify-center h-6 w-32 rounded-full border-2 border-white bg-slate-200 text-xs font-medium text-slate-700"
                          :title="`${member.name} (${member.pivot.role})`">
                          {{ member.name || '' }}
                        </div>
                      </div>
                      <div class="ml-2 flex flex-col space-y-2">
                        <div v-for="member in team.members.filter(m => m.role != 'customer-manager')"
                          :key="member.id"
                          class="flex items-center justify-center h-6 w-64 rounded-md border-2 border-white bg-blue-200 text-xs font-medium text-slate-700"
                          :title="`${member.name} (${member.pivot.role})`">
                          {{ member.pivot.role || '' }}
                        </div>
                      </div>


                    </div>
                  </div>
                </td>

         
               <!-- Companies -->
                  <td class="max-w-xs">
                    <div
                        class="flex items-center  gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-900">
                      <img :src="getLogo(team?.company?.name)" alt="" class="w-5 h-5">   <p> {{ team?.company?.name }}</p>
                        <span class="rounded-full nowrap bg-emerald-500 px-2 text-[10px] text-white">
                          {{ team?.company?.customers.length }}
                        </span>
                  </div>
                  </td>

                <!-- Customer Representatives -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {{team?.members?.filter(m => m.role == 'customer-manager').length}}
                    </span>
                    <div class="flex flex-col gap-1">
                      <div v-for="member in team.members.filter(m => m.role == 'customer-manager').slice(0, 2)"
                        :key="member.id" class="flex items-center gap-1">
                        <span class="text-xs text-slate-600">{{ member.name }}</span>
                        <span class="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                          Representative
                        </span>
                      </div>
                      <div v-if="team.members.filter(m => m.role == 'customer-manager').length > 2"
                        class="text-xs text-slate-500">
                        +{{team.members.filter(m => m.role == 'customer-manager').length - 2}} more
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-1.5">
                    <span class="h-2 w-2 rounded-full" :class="team.status ? 'bg-green-500' : 'bg-slate-300'"></span>
                    <span class="text-xs font-medium" :class="team.status ? 'text-green-700' : 'text-slate-500'">
                      {{ team.status ? 'Active' : 'Inactive' }}
                    </span>
                  </span>
                </td>

                <!-- Created -->
                <td class="whitespace-nowrap px-4 py-3 text-slate-600">
                  {{ formatDate(team.created_at) }}
                </td>

                <!-- Actions -->
                <td class="whitespace-nowrap px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <router-link :to="`/customer_management/customer-success-team/edit/${team.id}`"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Edit">
                      <i class="ri-edit-line text-lg"></i>
                    </router-link>

                    <router-link :to="{
                      path: `/customer_management/customer-success-team/viewTeam/${team.id}`,
                      query: { user_id: team.user_id }
                    }"
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                      title="View">
                      <i class="ri-eye-line text-lg"></i>
                    </router-link>

                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      @click="confirmDelete(team)" title="Delete">
                      <i class="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Excel-like pagination -->
        <div v-if="meta?.total > meta?.per_page"
          class="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3">
          <span class="text-sm text-slate-600">
            Showing <span class="font-medium">{{ meta?.from }}</span> to <span class="font-medium">{{ meta?.to }}</span>
            of <span class="font-medium">{{ meta?.total }}</span> results
          </span>

          <div class="flex items-center gap-2">
            <button
              class="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="meta?.current_page === 1" @click="changePage(meta?.current_page - 1)">
              <i class="ri-arrow-left-s-line mr-1 text-lg"></i>
              Previous
            </button>

            <div class="flex items-center gap-1">
              <button v-for="p in getPageNumbers()" :key="p"
                class="h-8 min-w-[2rem] rounded-lg px-2 text-sm font-medium transition-colors" :class="p === meta?.current_page
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'" @click="changePage(p)">
                {{ p }}
              </button>
            </div>

            <button
              class="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="meta?.current_page === meta?.last_page" @click="changePage(meta?.current_page + 1)">
              Next
              <i class="ri-arrow-right-s-line ml-1 text-lg"></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import moment from 'moment'
import debounce from 'lodash/debounce'
import { useCompanyLogo } from '@/composables/useCompanyLogo'

const { getLogo } = useCompanyLogo()
const teams = ref([])
const loading = ref(false)

const search = ref('')
const page = ref(1)

const meta = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
  from: 0,
  to: 0,
})

const formatDate = (date) =>
  moment(date).format('DD MMM YYYY')

const fetchTeams = async () => {
  loading.value = true

  const { data } = await api().get('success-teams', {
    params: {
      page: page.value,
      search: search.value,
      with:'company.customers,owner,members'
    },
  })

  teams.value = data.data
  meta.value = data.meta

  loading.value = false
}

const changePage = (p) => {
  page.value = p
  fetchTeams()
}

const debouncedSearch = debounce(() => {
  page.value = 1
  fetchTeams()
}, 400)

watch(search, debouncedSearch)

const confirmDelete = (team) => {
  Swal.fire({
    title: 'Delete Team?',
    text: `Delete "${team.name}" permanently?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Yes, delete',
  }).then((result) => {
    if (result.isConfirmed) {
      teams.value = teams.value.filter(t => t.id !== team.id)

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        timer: 1200,
        showConfirmButton: false,
      })
    }
  })
}

onMounted(fetchTeams)
</script>
