<template>
    <div class="p-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen w-full">
        <div class="flex items-center justify-between mb-7 flex-wrap gap-4">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
                {{ pageTitle }}
            </h2>
            <div :class="[
                'px-5 py-2 rounded-full font-semibold text-sm uppercase tracking-wide shadow-md',
                statusBadgeClass
            ]">
                {{ statusLabel }}
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gradient-to-r from-slate-800 to-slate-900">
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">ID</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">User</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Course</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Type</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Schedule Date</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Organization</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Participants</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Price</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Payment</th>
                            <th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Status</th>
                            <th v-if="showActionColumn" class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="request in filteredRequests" 
                            :key="request.id" 
                            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
                        >
                            <td class="px-5 py-4 whitespace-nowrap">
                                <span class="font-mono font-bold text-indigo-600">#{{ request.id }}</span>
                            </td>
                            <td class="px-5 py-4">
                                <div>
                                    <div class="font-semibold text-gray-800">{{ request.user?.name || 'N/A' }}</div>
                                    <div class="text-xs text-gray-500">{{ request.user?.email || 'N/A' }}</div>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <div>
                                    <div class="font-medium text-gray-800">{{ request.training_course?.name || 'N/A' }}</div>
                                    <div class="text-xs text-gray-400 mt-1">
                                        <span class="bg-gray-100 px-2 py-0.5 rounded-full">{{ request.training_course?.code || '' }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <span :class="[
                                    'inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                                    typeBadgeClass(request.training_type)
                                ]">
                                    {{ formatTrainingType(request.training_type) }}
                                </span>
                            </td>
                            <td class="px-5 py-4 whitespace-nowrap">
                                <span v-if="request.training_type === 'group' && request.training_course_schedule" class="text-gray-700">
                                    {{ formatDate(request.training_course_schedule.date) }}
                                </span>
                                <span v-else class="text-gray-400 italic">—</span>
                            </td>
                            <td class="px-5 py-4">
                                <span v-if="request.training_type === 'company' && request.organization" class="text-gray-700">
                                    {{ request.organization }}
                                </span>
                                <span v-else class="text-gray-400 italic">—</span>
                            </td>
                            <td class="px-5 py-4">
                                <span class="inline-flex items-center justify-center bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm min-w-[40px]">
                                    {{ request.number_of_participants || 1 }}
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                <span class="font-bold text-emerald-600">{{ formatCurrency(request.course_price) }}</span>
                            </td>
                            <td class="px-5 py-4">
                                <span :class="[
                                    'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold',
                                    paymentBadgeClass(request.payment_status)
                                ]">
                                    {{ formatPaymentStatus(request.payment_status) }}
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                <span :class="[
                                    'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold',
                                    statusBadgeSmallClass(request.status)
                                ]">
                                    {{ formatStatus(request.status) }}
                                </span>
                            </td>
                            <td v-if="showActionColumn" class="px-5 py-4">
                                <button 
                                    v-if="request.status == 'pending'" 
                                    @click="approveRequest(request.id)"
                                    :disabled="approvingId == request.id"
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="approvingId === request.id" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span v-else>✓ Approve</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredRequests.length === 0 && !isLoading" class="bg-white rounded-2xl shadow-lg p-12 text-center mt-6">
            <div class="text-6xl mb-4 opacity-60">📋</div>
            <p class="text-gray-500 text-lg">No {{ statusLabel.toLowerCase() }} training requests found.</p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center mt-6">
            <div class="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p class="text-gray-500">Loading requests...</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const trainingRequestList = ref([]);
const isLoading = ref(false);
const approvingId = ref(null);

// Updated status mapping - now mapping IDs to status strings
const statusMapping = {
    1: { id: 1, status: 'pending', label: 'Pending', badgeClass: 'bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900' },
    2: { id: 2, status: 'approved', label: 'Approved', badgeClass: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-blue-900' },
    3: { id: 3, status: 'scheduled', label: 'Scheduled', badgeClass: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-emerald-900' }
};

// Get status from route params (which is a number: 1, 2, or 3)
const currentStatusId = computed(() => {
    const statusId = parseInt(route.params.id);
    // Check if it's a valid status ID (1, 2, or 3)
    if (statusId && statusMapping[statusId]) {
        return statusId;
    }
    return null;
});

// Get the status string ('pending', 'approved', 'scheduled') for filtering
const currentStatusString = computed(() => {
    return currentStatusId.value ? statusMapping[currentStatusId.value].status : null;
});

const statusLabel = computed(() => {
    return currentStatusId.value ? statusMapping[currentStatusId.value].label : 'All';
});

const pageTitle = computed(() => {
    return `${statusLabel.value} Training Requests`;
});

const statusBadgeClass = computed(() => {
    return currentStatusId.value ? statusMapping[currentStatusId.value].badgeClass : 'bg-gray-500 text-white';
});

// Show action column only for pending status (ID 1)
const showActionColumn = computed(() => currentStatusId.value === 1);

// Filter requests based on status string
const filteredRequests = computed(() => {
    if (!trainingRequestList.value.length) return [];
    
    let filtered = [...trainingRequestList.value];
    
    if (currentStatusString.value) {
        filtered = filtered.filter(req => req.status === currentStatusString.value);
    }
    
    return filtered;
});

// Helper functions (unchanged)
const formatTrainingType = (type) => {
    const types = {
        'group': 'Group',
        'company': 'Company',
        'individual': 'Individual'
    };
    return types[type] || type || 'N/A';
};

const typeBadgeClass = (type) => {
    const classes = {
        'group': 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
        'company': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
        'individual': 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
    };
    return classes[type] || 'bg-gray-500 text-white';
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatPaymentStatus = (status) => {
    const statuses = {
        'pending': 'Pending',
        'paid': 'Paid',
        'failed': 'Failed',
        'refunded': 'Refunded'
    };
    return statuses[status] || status || 'N/A';
};

const paymentBadgeClass = (status) => {
    const classes = {
        'pending': 'bg-amber-100 text-amber-700',
        'paid': 'bg-emerald-100 text-emerald-700',
        'failed': 'bg-red-100 text-red-700',
        'refunded': 'bg-purple-100 text-purple-700'
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
};

const formatStatus = (status) => {
    const statuses = {
        'pending': 'Pending',
        'approved': 'Approved',
        'scheduled': 'Scheduled',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'rejected': 'Rejected'
    };
    return statuses[status] || status || 'N/A';
};

const statusBadgeSmallClass = (status) => {
    const classes = {
        'pending': 'bg-orange-100 text-orange-700',
        'approved': 'bg-green-100 text-green-700',
        'scheduled': 'bg-blue-100 text-blue-700',
        'completed': 'bg-teal-100 text-teal-700',
        'cancelled': 'bg-red-100 text-red-700',
        'rejected': 'bg-gray-100 text-gray-700'
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
};

// Approve request function
const approveRequest = async (requestId) => {
    if (!confirm('Are you sure you want to approve this training request?')) return;
    
    approvingId.value = requestId;
    try {
        const response = await api().post(`/training-requests/${requestId}/status`, {
            status: 'approved'
        });
        
        if (response.data.success) {
            const index = trainingRequestList.value.findIndex(r => r.id === requestId);
            if (index !== -1) {
                trainingRequestList.value[index].status = 'approved';
            }
            alert('Request approved successfully!');
        } else {
            alert('Failed to approve request. Please try again.');
        }
    } catch (error) {
        console.error('Error approving request:', error);
        alert('An error occurred while approving the request.');
    } finally {
        approvingId.value = null;
    }
};

// Fetch training requests
const fetchTrainingRequest = async () => {
    isLoading.value = true;
    try {
        const response = await api().get(`/training-requests`);
        if (response.data.success && response.data.data.data) {
            trainingRequestList.value = response.data.data.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
            trainingRequestList.value = response.data.data;
        } else {
            trainingRequestList.value = [];
        }
    } catch (error) {
        console.error('Error fetching training-requests:', error);
        trainingRequestList.value = [];
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchTrainingRequest();
});
</script>