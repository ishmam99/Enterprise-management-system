<template>
  <div class="p-6 w-4/5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1
        class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        All Customer Success Manager List
      </h1>
      <p class="text-gray-600 mt-2">View all Customer Success Managers</p>
    </div>

    <!-- Search -->
    <div class="flex mb-8">
      <div class="relative flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full pl-12 pr-6 py-3 rounded-xl border border-purple-200
                 focus:border-purple-500 focus:ring-4 focus:ring-purple-100
                 outline-none transition"
        />
        <i class="fas fa-search absolute left-4 top-4 text-purple-400"></i>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th class="py-4 px-6 text-left">#</th>
              <th class="py-4 px-6 text-left">Customer Name</th>
              <th class="py-4 px-6 text-left">Email</th>
              <th class="py-4 px-6 text-left">Phone</th>
              <th class="py-4 px-6 text-left">Address</th>
              <th class="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(customer, index) in customers"
              :key="customer.id"
              class="hover:bg-purple-50 transition"
            >
              <td class="py-2 px-6 font-medium">{{ index + 1 }}</td>
              <td class="py-2 px-6 font-semibold text-gray-800">{{ customer.user?.name }}</td>
              <td class="py-2 px-6 text-gray-600">{{ customer.user?.email }}</td>
              <td class="py-2 px-6 text-gray-600">{{ customer.phone }}</td>
              <td class="py-2 px-6 text-gray-600">{{ customer.address }}</td>
              <td class="py-2 px-6 text-center flex justify-center gap-2">
                
                
                <router-link
                    :to="{ name: 'customer_management-ManagerDetails-id', params: { id: customer.user_id } }"
                    class="px-5 text-nowrap py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <i class="fas fa-eye"></i> View
                  </router-link>

                <button
                  @click="openEditModal(customer)"
                  class="px-5 text-nowrap py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <i class="fas fa-pen mr-1"></i>Edit
                </button>

                <!-- Delete Button -->
                <button
                  @click="deleteCustomer(customer.id)"
                  class="px-5 text-nowrap py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <i class="fas fa-trash"></i>Delete
                </button>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="customers.length === 0">
                <td colspan="10" class="text-center py-16">
                    <div class="flex flex-col items-center justify-center text-gray-400 text-lg">
                    <i class="fas fa-inbox text-5xl mb-4"></i>
                    <span>No customer success manager found</span>
                    </div>
                </td>
                </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="meta && customers.length"
        class="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-sm text-gray-600">
          Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} records
        </div>

        <div class="flex gap-2">
          <button
            v-for="link in meta.links"
            :key="link.label"
            @click="currentPage = link.page || currentPage; getCustomers()"
            :class="[ 
              'px-4 py-2 rounded-lg font-medium transition',
              link.active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
            ]"
            v-html="link.label"
          />
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Edit Customer</h2>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <input
            v-model="editCustomer.name"
            type="text"
            placeholder="Name"
            class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
          />
          <input
            v-model="editCustomer.email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
          />
          <input
            v-model="editCustomer.phone"
            type="text"
            placeholder="Phone"
            class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
          />
          <input
            v-model="editCustomer.address"
            type="text"
            placeholder="Address"
            class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
          />
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <button @click="closeEditModal" class="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl">Cancel</button>
          <button
            @click="updateCustomer"
            :disabled="editLoading"
            class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-md"
          >
            {{ editLoading ? 'Updating...' : 'Update' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/config/api'
import swal from 'sweetalert2'

const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref(null)

// Edit modal
const showEditModal = ref(false)
const editCustomer = ref({ id: '', name: '', email: '', phone: '', address: '' })
const editLoading = ref(false)

// Fetch all customers
const getCustomers = async () => {
  try {
    const { data } = await api().get(`customer-success-managers?page=${currentPage.value}&search=${searchQuery.value}`)
    customers.value = data.data
    meta.value = data.meta
  } catch (err) {
    console.error(err)
    swal.fire('Error', 'Failed to fetch customers', 'error')
  }
}

// Delete customer success manager
const deleteCustomer = async (id) => {
  const result = await swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the Customer Success Manager permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return

  try {
    await api().delete(`customer-success-managers/${id}`)
    swal.fire('Deleted!', 'Customer Success Manager deleted successfully.', 'success')
    getCustomers()
  } catch (err) {
    console.error(err)
    swal.fire('Error', 'Failed to delete customer', 'error')
  }
}

// Open edit modal
const openEditModal = (customer) => {
  editCustomer.value = {
    id: customer.id,
    name: customer.user?.name || '',
    email: customer.user?.email || '',
    phone: customer.phone || '',
    address: customer.address || ''
  }
  showEditModal.value = true
}

// Close edit modal
const closeEditModal = () => {
  showEditModal.value = false
}

// Update customer
const updateCustomer = async () => {
  if (!editCustomer.value.name || !editCustomer.value.email) {
    swal.fire('Error', 'Name and Email are required', 'warning')
    return
  }

  editLoading.value = true
  try {
    await api().post(`customer-success-managers/${editCustomer.value.id}`, {
      name: editCustomer.value.name,
      email: editCustomer.value.email,
      phone: editCustomer.value.phone,
      address: editCustomer.value.address,
      _method: 'PUT'
    })
    swal.fire('Updated!', 'Customer updated successfully!', 'success')
    showEditModal.value = false
    getCustomers()
  } catch (err) {
    console.error(err)
    swal.fire('Error', 'Failed to update customer', 'error')
  } finally {
    editLoading.value = false
  }
}

// Debounced search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

watch(
  searchQuery,
  debounce(() => {
    currentPage.value = 1
    getCustomers()
  }, 500)
)

onMounted(() => {
  getCustomers()
})
</script>

<style scoped>
</style>
