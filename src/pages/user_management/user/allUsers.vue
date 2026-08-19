<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <!-- Title Section -->
      <div class="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
          <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">👥</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                All User list
              </h1>
              <p class="text-emerald-100 text-sm font-medium">
                Manage and monitor all user accounts
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ meta?.total || 0 }}</span>
            <span class="text-emerald-100 text-sm ml-1">Users</span>
          </div>
        </div>
      </div>

      <!-- Search and Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Stats Cards -->
        <div class="flex space-x-3">
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Showing</span>
            <span class="font-bold text-emerald-600 ml-1">{{ users?.length || 0 }}</span>
          </div>
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Page</span>
            <span class="font-bold text-emerald-600 ml-1">{{ currentPage }}</span>
          </div>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users by name or email..."
            class="pl-12 pr-4 py-3 w-full sm:w-80 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
          />
          <i class="fa fa-search absolute left-4 top-3.5 text-emerald-500"></i>
          <div class="absolute right-3 top-2.5">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <div v-if="loading1" class="flex justify-center p-12">
        <div class="text-center">
          <span class="loading loading-spinner loading-lg text-emerald-600 mb-4"></span>
          <p class="text-gray-600">Loading initial data...</p>
        </div>
      </div>
      <table v-else class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-emerald-500 px-6 font-semibold text-sm uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-emerald-500 px-6 font-semibold text-sm uppercase tracking-wider">Name</th>
            <th class="py-4 border-e border-emerald-500 px-6 font-semibold text-sm uppercase tracking-wider">Email</th>
            <th class="py-4 border-e border-emerald-500 px-6 font-semibold text-sm uppercase tracking-wider">Customer</th>
            <th class="py-4 border-e border-emerald-500 px-6 font-semibold text-sm uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody :class="loading?'blur-sm':''">
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="py-4 border-e px-6 font-semibold">
              <router-link
                :to="'/user_management/user/details/'+user.id"
                class="text-emerald-700 hover:text-emerald-900 transition-colors duration-200 flex items-center"
              >
                <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                {{ user.user?.name || user.first_name+' '+user.last_name }}
              </router-link>
            </td>
            <td class="py-4 border-e px-6 text-gray-600">{{ user.user?.email || user.email }}</td>
            <td class="py-4 border-e px-6 capitalize text-gray-700">{{ user.customer?.user.name || 'Independet User' }}</td>
        <td class="py-4 border-e px-6  space-x-2 flex justify-end items-center">

  <!-- Edit -->
  <button
    class="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
    @click="openEdit(user)"
  >
    Edit
  </button>

  <!-- Delete -->
  <button
    class="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
    @click="deleteUser(user)"
  >
    Delete
  </button>

  <!-- Inactive Button -->
  <button
    v-if="user.status == 0 || user.status == 'active'"
    class="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-green-600 text-white text-sm"
    @click="statusUpdate(user)"
  >
    Approve User
  </button>

</td>
          </tr>
          <tr v-if="users?.length === 0">
            <td colspan="5" class="text-center py-12 text-gray-400">
              <div class="flex flex-col items-center">
                <span class="text-4xl mb-2">👥</span>
                <p class="text-lg">No active users found</p>
                <p class="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="users?.length > 0 && meta" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
        </div>
        <div class="flex space-x-1">
          <button
            v-for="link in meta?.links"
            :key="link.label"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="currentPage == link.page
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50'"
            @click="currentPage = link.page, getUsers()"
          >
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
      <!-- Edit Modal -->
<div
  v-if="showEditModal"
  class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
>
  <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">

    <div class="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
      <h2 class="text-xl font-semibold text-white tracking-tight">
        Edit User Profile
      </h2>
      <p class="text-indigo-100 text-xs mt-1">Modify account details and permissions</p>
    </div>

    <div class="p-6 space-y-5">

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
        <input
          v-model="editForm.name"
          type="text"
          class="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="e.g. Alexander Hamilton"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
        <input
          v-model="editForm.email"
          type="email"
          class="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          placeholder="name@company.com"
        />
      </div>

    </div>

    <div class="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
      <button
        class="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
        @click="showEditModal = false"
      >
        Dismiss
      </button>

      <button
        class="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 rounded-lg transition-all active:scale-95"
        @click="updateUser"
      >
        Save Changes
      </button>
    </div>

  </div>
</div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import Swal from 'sweetalert2'
import { ref, computed, onMounted, watch } from 'vue'

const searchQuery = ref('')
const meta = ref()
const users = ref([])
const actionLoading = ref(false)
const approvingId = ref(null)
const currentPage = ref(1)
const loading1 = ref(true)
const loading = ref(false)

const getUsers = async()=>{
  loading.value = true
  const {data} = await api().get('end-users?page='+currentPage.value+'&per_page=20&with=user,customer.user&search='+searchQuery.value)
  users.value = data.data.data
  meta.value = data.data
  loading.value = false
}
const showEditModal = ref(false)
const editForm = ref({
  id: null,
  name: '',
  email: ''
})
const openEdit = (user) => {

  editForm.value = {
    id: user.id,
    name: user.user.name,
    email: user.user.email
  }

  showEditModal.value = true
}
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const statusUpdate = async (user) => {
  actionLoading.value = true
  approvingId.value = user.id

  try {
    const payload = {
      name: user.user.name,
      email: user.user.email,
      status: 1,
      _method: "PUT"
    }

    console.log('Sending payload with original data:', payload)

    await api().post(`end-users/${user.id}`, payload)

    // Refresh the data to get the updated status
    await getUsers()

    Swal.fire({
      title: 'Success!',
      text: `${user.user.name} has been deactivated successfully.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })

  } catch (error) {
    console.error('Error updating status:', error)

    let errorMessage = 'Failed to deactivate user. Please try again.'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage = Object.values(error.response.data.errors).flat().join(', ')
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}
const updateUser = async () => {

  try {

    const payload = {
      name: editForm.value.name,
      email: editForm.value.email,
      _method: "PUT"
    }

    await api().post(`end-users/${editForm.value.id}`, payload)

    showEditModal.value = false

    await getUsers()

    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "User updated successfully",
      timer: 2000,
      showConfirmButton: false
    })

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update user"
    })

  }

}
const deleteUser = async (user) => {

  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This user will be deleted",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes Delete"
  })

  if (!confirm.isConfirmed) return

  try {

    await api().post(`end-users/${user.id}`, {
      _method: "DELETE"
    })

    await getUsers()

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "User deleted successfully",
      timer: 2000,
      showConfirmButton: false
    })

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete user"
    })

  }

}
// Watch searchQuery with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1 // reset page on new search
  getUsers()
}, 500))

onMounted(async()=>{
 await getUsers()
 loading1.value = false
})
</script>

<style scoped>
/* Custom scrollbar for better appearance */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
