<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
        <div class="mx-auto">

            <!-- Header with Animation -->
            <div
                class="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl mb-8 transform transition-all duration-300 hover:shadow-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold mb-2 flex items-center gap-3">
                            <i class="fas fa-users text-3xl"></i>
                            {{ statusText(parseInt(route.params.id)) }}
                        </h1>
                        <p class="text-sm opacity-90 flex items-center gap-2">
                            <i class="fas fa-user-graduate"></i>
                            Employee Candidates Management
                        </p>
                    </div>
                    <div class="hidden md:block">
                        <i class="fas fa-file-alt text-6xl opacity-20"></i>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <i class="fas fa-list-ul text-indigo-500"></i>
                                Candidates List
                            </h3>
                            <p class="text-sm text-gray-500 mt-1">Manage and review candidate applications</p>
                        </div>
                        <div class="flex gap-2">
                            <div class="relative">
                                <i
                                    class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input v-model="searchQuery" type="text" placeholder="Search candidates..."
                                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                            </div>
                            <button @click="refreshData"
                                class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                    <p class="text-gray-500">Loading candidates...</p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th class="p-4 font-semibold">Name</th>
                                <th class="p-4 font-semibold">Email</th>
                                <th class="p-4 font-semibold">Job Details</th>
                                <th class="p-4 font-semibold">Highest Education</th>
                                <th class="p-4 font-semibold">University</th>
                                <th class="p-4 font-semibold">Status</th>
                                <th class="p-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="application in filteredCandidates" :key="application.id"
                                class="border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-transparent transition-all duration-200">
                                <td class="p-2 w-60">
                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {{ getInitials(application.full_name) }}
                                            </div>
                                            <div>
                                                <div class="font-semibold text-gray-800">{{ application.full_name }}
                                                </div>
                                                <div class="text-sm text-gray-500">{{ application.contact || 'N/A' }}
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-envelope text-gray-400 text-sm"></i>
                                        <span class="text-gray-600">{{ application.email }}</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <div class="flex bg-gray-100 p-2 rounded shadow-md flex-col gap-1">
                                        <span class="font-semibold text-gray-800">{{ application.job?.title }}</span>
                                        <div class="flex flex-wrap gap-2">
                                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                {{ application.job?.department }}
                                            </span>
                                            <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                                                {{ application.job?.job_type }}
                                            </span>
                                            <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                                <i class="fas fa-map-marker-alt mr-1"></i>{{
                                                    application.job?.base_country }}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td class="p-4">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        {{ application.highest_education || 'N/A' }}
                                    </span>
                                </td>
                                <td class="p-4 text-gray-600">
                                    {{ application.university || 'N/A' }}
                                </td>
                                <td class="p-4">
                                    <span :class="statusClass(application.status)"
                                        class="px-3 py-1 rounded-full text-xs font-semibold">
                                        <i :class="statusIcon(application.status)" class="mr-1"></i>
                                        {{ statusText(application.status) }}
                                    </span>
                                </td>
                                <td class="p-4">
                                    <div class="flex flex-wrap items-center justify-center gap-2">
                                        <!-- Status Action Buttons based on current page -->

                                        <!-- For Pending page (status 0) - Show only Shortlist button -->
                                        <template v-if="parseInt(route.params.id) === 0">
                                            <button @click="updateStatus(application.id, 1)"
                                                class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Shortlisted">
                                                <i class="fas fa-star"></i>
                                                <span class="hidden lg:inline">Shortlist</span>
                                            </button>
                                        </template>

                                        <!-- For Shortlisted page (status 1) - Show Interview & Rejected buttons -->
                                        <template v-else-if="parseInt(route.params.id) === 1">
                                            <button @click="updateStatus(application.id, 2)"
                                                class="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Interview Stage">
                                                <i class="fas fa-calendar-alt"></i>
                                                <span class="hidden lg:inline">Interview</span>
                                            </button>

                                            <button @click="updateStatus(application.id, 10)"
                                                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Rejected">
                                                <i class="fas fa-times-circle"></i>
                                                <span class="hidden lg:inline">Reject</span>
                                            </button>
                                        </template>

                                        <!-- For Interview Stage page (status 2) - Show Selection & Offer and Rejected buttons -->
                                        <template v-else-if="parseInt(route.params.id) === 2">
                                            <button @click="updateStatus(application.id, 3)"
                                                class="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Selection & Offer">
                                                <i class="fas fa-file-signature"></i>
                                                <span class="hidden lg:inline">Offer</span>
                                            </button>

                                            <button @click="updateStatus(application.id, 10)"
                                                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Rejected">
                                                <i class="fas fa-times-circle"></i>
                                                <span class="hidden lg:inline">Reject</span>
                                            </button>
                                        </template>

                                        <!-- For Selection & Offer page (status 3) - Show only Rejected button -->
                                        <template v-else-if="parseInt(route.params.id) === 3">
                                            <button @click="updateStatus(application.id, 10)"
                                                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                                                title="Move to Rejected">
                                                <i class="fas fa-times-circle"></i>
                                                <span class="hidden lg:inline">Reject</span>
                                            </button>
                                        </template>

                                        <!-- For Rejected page (status 10) - Show no action buttons -->

                                        <!-- View Button (shown on all pages) -->
                                        <router-link
                                            :to="{ path: `/hr_management/recruitment/hiring_pipeline/hiring_details/${application.id}`, query: { 'status': route.params.id } }"
                                            class="px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2">
                                            <i class="fas fa-eye"></i>
                                            <span class="hidden lg:inline">View</span>
                                        </router-link>

                                        <!-- Feedback Button (only for interview stage page - status 2) -->
                                        <router-link
                                            :to="`/hr_management/recruitment/hiring_pipeline/interview_feedback/${application.id}`"
                                            v-if="parseInt(route.params.id) === 2"
                                            class="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2">
                                            <i class="fas fa-comment"></i>
                                            <span class="hidden lg:inline">Feedback</span>
                                        </router-link>
                                    </div>
                                </td>
                            </tr>

                            <!-- Empty State -->
                            <tr v-if="filteredCandidates.length == 0">
                                <td colspan="7" class="text-center py-16">
                                    <div class="flex flex-col items-center">
                                        <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                                        <p class="text-gray-400 text-lg">No candidates found</p>
                                        <p class="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/config/api'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const applications = ref([])
const loading = ref(false)
const searchQuery = ref('')
const route = useRoute()

/* ---------------- Computed Properties ---------------- */
const filteredCandidates = computed(() => {
    if (!searchQuery.value) return applications.value
    const query = searchQuery.value.toLowerCase()
    return applications.value.filter(candidate =>
        candidate.full_name?.toLowerCase().includes(query) ||
        candidate.email?.toLowerCase().includes(query) ||
        candidate.contact?.toLowerCase().includes(query)
    )
})

/* ---------------- Helper Functions ---------------- */
const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

/* ---------------- Update Status API ---------------- */
const updateStatus = async (applicationId, newStatus) => {
    const statusName = statusText(newStatus)

    const result = await Swal.fire({
        title: 'Update Status?',
        text: `Are you sure you want to move this candidate to "${statusName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
        try {
            // Show loading state
            Swal.fire({
                title: 'Updating...',
                text: 'Please wait while we update the status',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })

            // API call to update status
            const response = await api().post(`/applied-jobs/${applicationId}`, {
                status: newStatus,
                _method: 'PUT'
            })

            if (response.data.success || response.status === 200) {
                // Update local data
                const index = applications.value.findIndex(app => app.id === applicationId)
                if (index !== -1) {
                    applications.value[index].status = newStatus
                }

                // Show success message
                Swal.fire({
                    title: 'Updated!',
                    text: `Candidate has been moved to "${statusName}" successfully.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })

                // If the updated status doesn't match current filter, remove from list
                if (parseInt(route.params.id) !== newStatus) {
                    applications.value = applications.value.filter(app => app.id !== applicationId)
                }
            } else {
                throw new Error('Update failed')
            }
        } catch (error) {
            console.error('Error updating status:', error)
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update candidate status. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
}

/* ---------------- Fetch API ---------------- */
const fetchCandidates = async () => {
    loading.value = true
    try {
        const { data } = await api().get(`/applied-jobs?status=${route.params.id}`)
        applications.value = data.data
        // applications.value =  response.data.data.filter(e => parseInt(e.status) === parseInt(route.params.id))
    } catch (error) {
        console.error('Error fetching candidates:', error)
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load candidates. Please refresh the page.',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } finally {
        loading.value = false
    }
}

const refreshData = () => {
    fetchCandidates()
    Swal.fire({
        title: 'Refreshed!',
        text: 'Candidate list has been updated.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    })
}

/* ---------------- Watchers ---------------- */
watch(() => route.params.id, (newId, oldId) => {
    if (newId !== oldId) {
        searchQuery.value = ''
        fetchCandidates()
    }
})

onMounted(fetchCandidates)

/* ---------------- Status Mapping ---------------- */
const statusText = (status) => {
    switch (parseInt(status)) {
        case 0: return 'Pending'
        case 1: return 'Shortlisted'
        case 2: return 'Interview Stage'
        case 3: return 'Selection & Offer'
        case 4: return 'Verification'
        case 5: return 'Documentation'
        case 6: return 'Joining & Setup'
        case 7: return 'Probation & Confirmation'
        case 10: return 'Rejected'
        default: return 'Unknown'
    }
}

const statusClass = (status) => {
    switch (parseInt(status)) {
        case 0: return 'bg-yellow-100 text-yellow-700'
        case 1: return 'bg-blue-100 text-blue-700'
        case 2: return 'bg-purple-100 text-purple-700'
        case 3: return 'bg-green-100 text-green-700'
        case 4: return 'bg-teal-100 text-teal-700'
        case 5: return 'bg-cyan-100 text-cyan-700'
        case 6: return 'bg-orange-100 text-orange-700'
        case 7: return 'bg-pink-100 text-pink-700'
        case 10: return 'bg-red-100 text-red-700'
        default: return 'bg-gray-100 text-gray-600'
    }
}

const statusIcon = (status) => {
    switch (parseInt(status)) {
        case 0: return 'fas fa-clock'
        case 1: return 'fas fa-star'
        case 2: return 'fas fa-calendar-alt'
        case 3: return 'fas fa-file-signature'
        case 4: return 'fas fa-check-double'
        case 5: return 'fas fa-file-alt'
        case 6: return 'fas fa-user-plus'
        case 7: return 'fas fa-chart-line'
        case 10: return 'fas fa-times-circle'
        default: return 'fas fa-question'
    }
}

</script>

<style scoped>
/* Custom animations and transitions */
.transform {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* Table zebra styling */
.table-zebra tbody tr:nth-child(even) {
    background-color: #f9fafb;
}

/* Responsive button adjustments */
@media (max-width: 1280px) {
    .lg\:inline {
        display: none;
    }
}

@media (max-width: 768px) {
    .flex-wrap {
        justify-content: center;
    }
}
</style>