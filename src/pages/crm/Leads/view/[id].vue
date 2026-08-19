<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <!-- Sidebar -->
        <aside class="w-64 bg-gradient-to-b from-purple-600 to-indigo-700 text-white border-r border-indigo-500 p-4 shadow-xl">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Related List
            </h2>
            <ul class="menu rounded-box">
                <li v-for="(item, index) in sidebarItems" :key="index" class="mb-2">
                    <button class="w-full text-left flex items-center justify-between rounded-lg transition-all duration-200 hover:bg-indigo-500/50" 
                        :class="{ 'bg-white/20 text-white shadow-lg': activeSidebar === item.key }"
                        @click="activeSidebar = item.key">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {{ item.label }}
                        </div>
                        <span v-if="item.count" class="badge bg-amber-400 text-purple-800 border-0 badge-sm rounded-full py-1 px-2">
                            {{ item.count }}
                        </span>
                    </button>
                </li>
            </ul>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-y-auto">
            <!-- Upper Account Section -->
            <div class="card bg-white shadow-xl p-6 m-6 mt-8 rounded-2xl">
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
                <div v-if="overviewTab === 'Overview'" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                            <div class="font-medium text-gray-600">
                                D06B SSEM Communication Schedule
                            </div>
                            <div class="text-gray-800 font-semibold mt-2">—</div>
                        </div>

                        <div class="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                            <div class="font-medium text-gray-600">
                                D06C SSEM Call Importance
                            </div>
                            <div class="text-gray-800 font-semibold mt-2">—</div>
                        </div>

                        <div class="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-500">
                            <div class="font-medium text-gray-600">
                                D06D SSEM Work Notes
                            </div>
                            <div class="text-gray-800 font-semibold mt-2">—</div>
                        </div>

                        <div class="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                            <div class="font-medium text-gray-600">
                                H03 Account Potential Status
                            </div>
                            <div class="text-gray-800 font-semibold mt-2">1. Initial Lead</div>
                        </div>

                        <div class="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 col-span-1 md:col-span-2">
                            <div class="font-medium text-gray-600">E16 Next Step Summary</div>
                            <div class="text-gray-800 font-semibold mt-2">
                                20250825: Asif: Left vm need to call back
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Timeline Tab -->
                <div v-else-if="overviewTab === 'Timeline'" class="space-y-4 p-4">
                    <p class="text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Timeline data will appear here...
                    </p>
                </div>
            </div>

            <!-- Lower Account Section (Sidebar Content) -->
            <main class="px-6 pb-6 flex-1">
                <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {{ currentTab.label }}
                </h2>

                <div v-if="activeSidebar === 'notes'" class="space-y-4">
                    <div v-for="(note, idx) in notes" :key="idx" class="card bg-white shadow-md p-5 rounded-xl border-l-4 border-amber-500 transition-all hover:shadow-lg">
                        <p class="text-gray-700">{{ note }}</p>
                        <div class="flex items-center mt-3 text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {{ getDateFromNote(note) }}
                        </div>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'connected-records'">
                    <div class="card bg-white shadow-md p-6 rounded-xl text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        <p class="text-gray-600">Connected Records will appear here.</p>
                    </div>
                </div>

                <div v-else-if="activeSidebar === 'attachments'">
                    <div class="card bg-white shadow-md p-6 rounded-xl text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <p class="text-gray-600">Attachments list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'deals'">
                    <div class="card bg-white shadow-md p-6 rounded-xl text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p class="text-gray-600">Deals list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'contacts'">
                    <div class="card bg-white shadow-md p-6 rounded-xl text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p class="text-gray-600">Contacts list goes here.</p>
                    </div>
                </div>
                
                <div v-else-if="activeSidebar === 'account-review'">
                    <div class="card bg-white shadow-md p-6 rounded-xl border-l-4 border-indigo-500">
                        <h3 class="font-semibold text-xl text-indigo-700 mb-4">Account Review 2022</h3>
                        <div class="space-y-3">
                            <p class="flex items-center">
                                <span class="font-medium text-gray-600 w-40">Lead Name:</span> 
                                <span class="text-gray-800">Hart Hagerty</span>
                            </p>
                            <p class="flex items-center">
                                <span class="font-medium text-gray-600 w-40">Last Email Date:</span> 
                                <span class="text-gray-800">Aug 20, 2025</span>
                            </p>
                            <p class="flex items-center">
                                <span class="font-medium text-gray-600 w-40">Lead Associate Last Call Back Date:</span>
                                <span class="text-gray-800">--</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="card bg-white shadow-md p-6 rounded-xl text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <p class="text-gray-500">Select a section from the sidebar to view details.</p>
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

const getDateFromNote = (note) => {
    return note.split(':')[0];
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}

.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.badge {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
    100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
}

.sidebar-item {
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
}

.sidebar-item:hover {
    border-left-color: #fbbf24;
    background-color: rgba(255, 255, 255, 0.2);
}

.sidebar-item.active {
    border-left-color: #f59e0b;
    background-color: rgba(255, 255, 255, 0.3);
}
</style>