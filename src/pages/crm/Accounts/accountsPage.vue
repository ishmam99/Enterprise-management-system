<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex h-screen bg-gray-200">
        <!-- Sidebar -->
        <aside class="w-64 bg-base-200 border-r border-gray-200 p-4">
            <h2 class="text-lg font-semibold mb-4">Related List</h2>
            <ul class="menu bg-base-200 rounded-box">
                <li v-for="(item, index) in sidebarItems" :key="index">
                    <button class="w-full text-left" :class="{ 'bg-primary text-white': activeSidebar === item.key }"
                        @click="activeSidebar = item.key">
                        {{ item.label }}
                        <span v-if="item.count" class="ml-2 badge badge-sm badge-primary">
                            {{ item.count }}
                        </span>
                    </button>
                </li>
            </ul>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-y-auto">
            <!-- Upper Account Section -->
            <div class="card bg-base-100 shadow-md p-4 w-full">
                <!-- Tabs -->
                <div class="flex items-center border-b mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-t-lg">
                    <button v-for="tab in tabs" :key="tab"
                        class="px-6 py-3 text-sm font-medium rounded-t-lg transition-all mx-1" 
                        :class="overviewTab === tab
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                : 'text-gray-600 hover:text-indigo-600 hover:bg-blue-100'
                            " 
                        @click="overviewTab = tab">
                        {{ tab }}
                    </button>
                    <span class="ml-auto text-xs text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Last Update: 4 day(s) ago
                    </span>
                </div>

                <!-- Overview Tab -->
                <div v-if="overviewTab === 'Overview'" class="space-y-3">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="font-medium text-gray-500">
                            D06B SSEM Communication Schedule
                        </div>
                        <div class="text-gray-700">—</div>

                        <div class="font-medium text-gray-500">
                            D06C SSEM Call Importance
                        </div>
                        <div class="text-gray-700">—</div>

                        <div class="font-medium text-gray-500">
                            D06D SSEM Work Notes
                        </div>
                        <div class="text-gray-700">—</div>

                        <div class="font-medium text-gray-500">
                            H03 Account Potential Status
                        </div>
                        <div class="text-gray-700">1. Initial Lead</div>

                        <div class="font-medium text-gray-500">E16 Next Step Summary</div>
                        <div class="text-gray-700">
                            20250825: Asif: Left vm need to call back
                        </div>
                    </div>
                </div>

                <!-- Timeline Tab -->
                <div v-else-if="overviewTab === 'Timeline'" class="space-y-2">
                    <p class="text-gray-600">Timeline data will appear here...</p>
                </div>
            </div>

            <!-- Lower Account Section (Sidebar Content) -->
            <main class="p-6 flex-1">
                <h2 class="text-xl font-bold mb-4">{{ currentTab.label }}</h2>

                <div v-if="activeSidebar === 'notes'" class="space-y-2">
                    <div v-for="(note, idx) in notes" :key="idx" class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-700">{{ note }}</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'connected-records'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">Connected Records will appear here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'attachments'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">Attachments list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'deals'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">deals list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'contacts'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">contacts list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'open-activities'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">open-activities list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'closed-activities'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">closed-activities list goes here.</p>
                    </div>
                </div>
                <div v-else-if="activeSidebar === 'products'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">products list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'quotes'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">quotes list goes here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'sales-orders'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">sales-orders list goes here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'invoices'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">invoices list goes here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'member-accounts'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-600">member-accounts list goes here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'account-review'">
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <h3 class="font-semibold">Account Review 2022</h3>
                        <p>
                            <span class="font-medium">Account Name:</span> Extended Stay
                            America Premier Suites Austin - Kyle
                        </p>
                        <p>
                            <span class="font-medium">Last Email Date:</span> Aug 20, 2025
                        </p>
                        <p>
                            <span class="font-medium">Lead Associate Last Call Back Date:</span>
                            --
                        </p>
                    </div>
                </div>

                <div v-else>
                    <div class="card bg-base-100 shadow-md p-4 w-full">
                        <p class="text-gray-500">Select a section from the sidebar.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tabs = ["Overview", "Timeline"];
const overviewTab = ref("Overview");

const sidebarItems = [
    { key: "notes", label: "Notes", count: 3 },
    { key: "connected-records", label: "Connected Records" },
    { key: "attachments", label: "Attachments" },
    { key: "deals", label: "Deals" },
    { key: "contacts", label: "Contacts" },
    { key: "open-activities", label: "Open Activities" },
    { key: "closed-activities", label: "Closed Activities" },
    { key: "products", label: "Products" },
    { key: "quotes", label: "Quotes" },
    { key: "sales-orders", label: "Sales Orders" },
    { key: "invoices", label: "Invoices" },
    { key: "member-accounts", label: "Member Accounts" },
    { key: "account-review", label: "Account Review 2022" },
];

const activeSidebar = ref("account-review");

const currentTab = computed(() => {
    return sidebarItems.find((item) => item.key === activeSidebar.value) || {};
});

const notes = [
    "2025-08-25: Asif - Left VM, need to call back",
    "2025-08-20: Initial Lead created",
    "2025-08-10: Follow-up scheduled",
];
</script>
