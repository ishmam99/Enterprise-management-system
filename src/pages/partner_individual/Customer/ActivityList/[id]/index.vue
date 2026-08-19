<!-- src/components/MonthlyActivityList.vue -->
<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div class="sm:flex sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Activity List</h1>
                    <p class="mt-2 text-sm text-gray-600">
                        All logged calls, meetings, follow-ups and other interactions
                    </p>
                </div>
                <div class="mt-4 sm:mt-0 space-x-3">
                    <button @click="openCreateModal"
                        class="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        + Log New Activity
                    </button>
                </div>
            </div>

            <!-- Loading / Error / Empty -->
            <div v-if="loading" class="text-center py-12">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent">
                </div>
                <p class="mt-3 text-gray-600">Loading activities...</p>
            </div>

            <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <p class="text-red-700">{{ error }}</p>
            </div>

            <div v-else-if="activities.length === 0" class="bg-white shadow rounded-lg p-10 text-center">
                <p class="text-gray-600">No activities yet. Start by adding one.</p>
            </div>

            <!-- Table -->
            <div v-else class="bg-white shadow overflow-hidden rounded-xl border border-gray-200">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Activity</th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="act in activities" :key="act.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(act.date) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="typeBadgeClass(act.type)">
                                        {{ formatType(act.type) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ act.customer?.name || 'Customer #' + act.customer_id }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-900 max-w-xl truncate">{{ act.activity }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <!-- <router-link :to="'/partner/Customer/ActivityReport/' + act.id"
                                        class="text-indigo-600 hover:text-indigo-900 mr-4">View Report</router-link> -->
                                   

                                    <router-link :to="{
                                        path: `/partner/Customer/ActivityReport/${act.id}`,
                                        query: { name: route.query?.name }
                                    }" class="px-3 py-1 text-white btn btn-info rounded-lg hover:bg-blue-100 transition">
                                        View Report
                                    </router-link> 

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Create / Edit Modal -->
            <div v-if="showFormModal"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="px-6 py-5 border-b border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900">
                            {{ isEditing ? 'Edit Activity' : 'Log New Activity' }}
                        </h3>
                    </div>

                    <form @submit.prevent="saveActivity" class="p-6 space-y-5">
                        <!-- Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Type <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.type" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option value="" disabled>Select type</option>
                                <option>Summary of Activities</option>
                                <option>Key Outcomes</option>

                            </select>
                        </div>

                        <!-- Date -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.date" type="date" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>




                        <!-- Activity -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Activity Details <span
                                    class="text-red-500">*</span></label>
                            <textarea v-model="form.activity" required rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Describe what happened..."></textarea>
                        </div>

                        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit" :disabled="saving"
                                class="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
                                {{ saving ? 'Saving...' : (isEditing ? 'Update' : 'Save') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Delete Confirmation -->
            <div v-if="showDeleteConfirm"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                    <h3 class="text-lg font-medium text-gray-900">Delete this activity?</h3>
                    <p class="mt-2 text-sm text-gray-600">This cannot be undone.</p>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button @click="showDeleteConfirm = false"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button @click="performDelete" :disabled="deleting"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
                            {{ deleting ? 'Deleting...' : 'Delete' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Messages -->
            <div v-if="message"
                :class="['mt-6 p-4 rounded-lg text-center', messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800']">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import { useRoute } from 'vue-router'

const activities = ref([])
const customers = ref([])
const loading = ref(false)
const error = ref(null)
const message = ref('')
const messageType = ref('')

const route = useRoute()

// Form modal state
const showFormModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const form = ref({
    id: null,
    type: '',
    date: new Date().toISOString().split('T')[0],
    customer_id: '',
    activity: ''
})

// Delete state
const showDeleteConfirm = ref(false)
const deleting = ref(false)
const activityToDelete = ref(null)

// ────────────────────────────────────────────────
async function fetchActivities() {
    loading.value = true
    try {
        const res = await api().get('/monthly-csm-activity')
        activities.value = res.data.data || res.data || []
    } catch (err) {
        error.value = 'Could not load activities'
        console.error(err)
    } finally {
        loading.value = false
    }
}

async function fetchCustomers() {
    try {
        const res = await api().get('/customers') // ← adjust endpoint if needed
        customers.value = res.data.data || res.data || []
    } catch (err) {
        console.error('Failed to load customers', err)
    }
}

// ────────────────────────────────────────────────
function openCreateModal() {
    resetForm()
    isEditing.value = false
    showFormModal.value = true
}

function openEditModal(act) {
    form.value = {
        id: act.id,
        type: act.type,
        date: act.date,
        customer_id: act.customer_id,
        activity: act.activity
    }
    isEditing.value = true
    showFormModal.value = true
}

function closeModal() {
    showFormModal.value = false
    resetForm()
}

function resetForm() {
    form.value = {
        id: null,
        type: '',
        date: new Date().toISOString().split('T')[0],
        customer_id: '',
        activity: ''
    }
}

// ────────────────────────────────────────────────
async function saveActivity() {
    saving.value = true
    message.value = ''

    try {
        const payload = {
            type: form.value.type,
            date: form.value.date,
            activity: form.value.activity.trim(),
            customer_id: Number(form.value.customer_id)
        }

        if (isEditing.value) {
            // UPDATE
            await api().post(`/monthly-csm-activity/${form.value.id}`, payload, { method: 'PUT' })
            message.value = 'Activity updated successfully'
        } else {
            // CREATE
            await api().post('/monthly-csm-activity', payload)
            message.value = 'Activity created successfully'
        }

        messageType.value = 'success'
        closeModal()
        await fetchActivities()
    } catch (err) {
        message.value = err.response?.data?.message || 'Failed to save activity'
        messageType.value = 'error'
        console.error(err)
    } finally {
        saving.value = false
    }
}

// ────────────────────────────────────────────────
function confirmDelete(id) {
    activityToDelete.value = id
    showDeleteConfirm.value = true
}

async function performDelete() {
    deleting.value = true
    try {
        await api().delete(`/monthly-csm-activity/${activityToDelete.value}`)
        message.value = 'Activity deleted'
        messageType.value = 'success'
        activities.value = activities.value.filter(a => a.id !== activityToDelete.value)
    } catch (err) {
        message.value = 'Failed to delete activity'
        messageType.value = 'error'
        console.error(err)
    } finally {
        deleting.value = false
        showDeleteConfirm.value = false
        activityToDelete.value = null
    }
}

// ────────────────────────────────────────────────
function formatDate(dateStr) {
    return dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
}

function formatType(type) {
    return type ? type.charAt(0).toUpperCase() + type.slice(1) : '—'
}

function typeBadgeClass(type) {
    const map = {
        call: 'bg-blue-100 text-blue-800',
        meeting: 'bg-purple-100 text-purple-800',
        email: 'bg-green-100 text-green-800',
        followup: 'bg-yellow-100 text-yellow-800',
        other: 'bg-gray-100 text-gray-800'
    }
    return map[type] || 'bg-gray-100 text-gray-800'
}

// ────────────────────────────────────────────────
onMounted(() => {
    fetchActivities()
    fetchCustomers()
})
</script>
