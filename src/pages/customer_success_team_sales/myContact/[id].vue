<script setup>
import { ref, onMounted, reactive, watch, onUnmounted, computed } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import api from "@/config/api";
import { useRoute } from 'vue-router';

const authStore = useAuthStore()
authStore.sidebarOpen = true

const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
const totalAccounts = ref(0)
const fields = ref([])
const contactDepartmentHtssOptions = ref([])
const contactTitleHtssOptions = ref([])
const contactEngagementOptions = ref([])
const contactsLeadPriorityOptions = ref([])
const contactsTypeOptions = ref([])
const leads = ref([])

// Selected filter values
const selectedContactDepartment = ref('')
const selectedContactTitle = ref('')
const selectedLeadPriority = ref('')
const selectedContactType = ref('')
const selectedContactEngagement = ref('')

const activeDropdown = ref(null)

// Track active filters for API
const activeFilters = reactive({
    contactDepartment: '',
    contactTitle: '',
    leadPriority: '',
    contactType: '',
    contactEngagement: ''
})


// Computed property to check if any filters are active
const hasActiveFilters = computed(() => {
    return selectedContactDepartment.value ||
        selectedContactTitle.value ||
        selectedLeadPriority.value ||
        selectedContactType.value ||
        selectedContactEngagement.value ||
        selectedFilter.value !== 'HTSS'
})

// const stats = ref({})
const isLoading = ref(true)
const selectedFilter = ref('HTSS')
const toast = reactive({
    show: false,
    message: '',
    type: 'success'
})

const showFilterDropdown = ref(false)

const filterOptions = [
    {
        value: 'HTSS',
        borderBottom: true
    },
    {
        value: 'MSC',
        borderBottom: true
    },
    {
        value: 'ALL',
        borderBottom: false
    }
]


const toggleFilterDropdown = () => {
    showFilterDropdown.value = !showFilterDropdown.value
    activeDropdown.value = null
}

const toggleDropdown = (dropdownName) => {
    if (activeDropdown.value === dropdownName) {
        activeDropdown.value = null
    } else {
        activeDropdown.value = dropdownName
        showFilterDropdown.value = false
    }
}
const changeFilter = (filter) => {
    selectedFilter.value = filter
    showFilterDropdown.value = false
    fetchLeads(1)
}

const selectFilter = (type, value) => {
    switch (type) {
        case 'contactDepartment':
            selectedContactDepartment.value = value
            activeFilters.contactDepartment = value
            break
        case 'contactTitle':
            selectedContactTitle.value = value
            activeFilters.contactTitle = value
            break
        case 'leadPriority':
            selectedLeadPriority.value = value
            activeFilters.leadPriority = value
            break
        case 'contactType':
            selectedContactType.value = value
            activeFilters.contactType = value
            break
        case 'contactEngagement':
            selectedContactEngagement.value = value
            activeFilters.contactEngagement = value
            break
    }

    activeDropdown.value = null
    fetchLeads(1)
}

const clearFilter = (type) => {
    switch (type) {
        case 'contactDepartment':
            selectedContactDepartment.value = ''
            activeFilters.contactDepartment = ''
            break
        case 'contactTitle':
            selectedContactTitle.value = ''
            activeFilters.contactTitle = ''
            break
        case 'leadPriority':
            selectedLeadPriority.value = ''
            activeFilters.leadPriority = ''
            break
        case 'contactType':
            selectedContactType.value = ''
            activeFilters.contactType = ''
            break
        case 'contactEngagement':
            selectedContactType.value = ''
            activeFilters.contactType = ''
            break
        case 'contactOwner':
            selectedFilter.value = 'HTSS'
            break
    }

    fetchLeads(1)
}

const clearAllFilters = () => {
    if (!hasActiveFilters.value) return

    selectedFilter.value = 'HTSS'
    selectedContactDepartment.value = ''
    selectedContactTitle.value = ''
    selectedLeadPriority.value = ''
    selectedContactType.value = ''
    selectedContactEngagement.value = ''

    // Clear all active filters
    Object.keys(activeFilters).forEach(key => {
        activeFilters[key] = ''
    })

    fetchLeads(1)
}


const closeDropdownsOnClickOutside = (event) => {
    const isFilterButton = event.target.closest('[data-filter-button]')
    const isDropdown = event.target.closest('[data-dropdown]')

    if (!isFilterButton && !isDropdown) {
        showFilterDropdown.value = false
        activeDropdown.value = null
    }
}

const route = useRoute()

const getApiVariable = (value) => {
    if (value === 'solution-structure-analysis-service') {
        return 'A. Structure Analysis Service'
    } else if (value === 'solution-system-dynamics-analysis-service') {
        return 'B. System Dynamics Analysis Service'
    } else if (value === 'solution-acoustics-analysis-service') {
        return 'C. Acoustics Analysis Service'
    } else if (value === 'solution-fluids-analysis-service') {
        return 'D. Fluids Analysis Service'
    } else if (value === 'solution-autonomous-analysis-service') {
        return 'E. Autonomous Analysis Service'
    } else if (value === 'solution-vm&c-analysis-service' || value === 'vmc-analysis-service') {
        return 'F. VM&C Analysis Service'
    } else if (value === 'solution-icme-analysis-service') {
        return 'G. ICME Analysis Service'
    } else if (value === 'software-adams') {
        return 'A1. Structural Analysis -Adams'
    } else if (value === 'software-cae-fatigue') {
        return 'A2. Structural Analysis -CAE Fatigue'
    } else if (value === 'software-msc-apex') {
        return 'A3. Structural Analysis -MSC Apex'
    } else if (value === 'software-dytran') {
        return 'A7. Structural Analysis -Dytran'
    } else if (value === 'software-marc') {
        return 'A4. Structural Analysis -Marc'
    } else if (value === 'software-nastran') {
        return 'A5. Structural Analysis -MSC Nastran'
    } else if (value === 'software-patran') {
        return 'A6. Structural Analysis -MSC Patran'
    } else if (value === 'software-msc-cradle-cfd') {
        return 'D1. Fluids -MSC Cradle CFD'
    } else if (value === 'software-msc-cosim') {
        return 'D2. Fluids -MSCCoSim'
    } else if (value === 'software-romax') {
        return 'B1. System Dynamics -Romax'
    } else if (value === 'software-easy5') {
        return 'B2. System Dynamics -Easy5'
    } else if (value === 'software-elements') {
        return 'B3. System Dynamics -Elements'
    } else if (value === 'software-material-center') {
        return 'G1. ICME (Materials) -MaterialCenter'
    } else if (value === 'software-digimat') {
        return 'G2. ICME (Materials) -Digimat'
    } else if (value === 'software-material-center-databanks') {
        return 'G3. ICME (Materials) -MaterialCenterDatabanks'
    } else if (value === 'software-odyssee') {
        return 'F1. VM&C -ODYSSEE'
    } else if (value === 'software-simufact') {
        return 'F2. VM&C -Simufact'
    } else if (value === 'software-fti-formingsuite') {
        return 'F3. VM&C -FTI FormingSuite'
    } else if (value === 'software-vtd-scale') {
        return 'E1. Autonomous -VTDScale'
    } else if (value === 'software-vtd') {
        return 'E2. Autonomous -VTD'
    } else if (value === 'software-cloud') {
        return 'E3. Autonomous -Cloud'
    } else if (value === 'software-actran') {
        return 'C1. Acoustics -Actran'
    } else if (value === 'fluids-analysis-service') {
        return 'D. Fluids Analysis Service'
    } else if (value === 'autonomous-analysis-service') {
        return 'E. Autonomous Analysis Service'
    } else if (value === 'vm&c-analysis-service') {
        return 'F. VM&C Analysis Service'
    } else if (value === 'icme-analysis-service') {
        return 'G. ICME Analysis Service'
    }
}

const headingMap = {
    // Solutions
    'solution-structure-analysis-service': 'Structure Analysis Service',
    'solution-system-dynamics-analysis-service': 'System Dynamics Analysis Service',
    'solution-acoustics-analysis-service': 'Acoustics Analysis Service',
    'solution-fluids-analysis-service': 'Fluids Analysis Service',
    'solution-autonomous-analysis-service': 'Autonomous Analysis Service',
    'solution-vm&c-analysis-service': 'VM&C Analysis Service',
    'solution-vmc-analysis-service': 'VM&C Analysis Service',
    'solution-icme-analysis-service': 'ICME Analysis Service',

    // Software
    'software-adams': 'Adams',
    'software-cae-fatigue': 'CAE Fatigue',
    'software-msc-apex': 'MSC Apex',
    'software-dytran': 'Dytran',
    'software-marc': 'Marc',
    'software-nastran': 'Nastran',
    'software-patran': 'Patran',
    'software-msc-cradle-cfd': 'MSC Cradle CFD',
    'software-msc-cosim': 'MSC CoSim',
    'software-romax': 'Romax',
    'software-easy5': 'Easy5',
    'software-elements': 'Elements',
    'software-material-center': 'Material Center',
    'software-digimat': 'Digimat',
    'software-material-center-database': 'Material Center Database',
    'software-odyssee': 'ODYSSEE',
    'software-simufact': 'Simufact',
    'software-fti-formingsuite': 'FTI FormingSuite',
    'software-vtd-scale': 'VTD Scale',
    'software-vtd': 'VTD',
    'software-cloud': 'Cloud',
    'software-actran': 'Actran',


    // Engineering Department
    'engineering-department': "Engineering Department",

    // Purchase Sales Department
    'purchase-sales-department': 'Purchase Sales Department'


}

const getHeading = (value) => {
    return headingMap[value] || value
}


const showToast = (message, type = 'success') => {
    toast.show = true
    toast.message = message
    toast.type = type
    setTimeout(() => toast.show = false, 3000)
}

onMounted(() => {
    document.addEventListener('click', closeDropdownsOnClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdownsOnClickOutside)
})



const isLoadingDropdowns = ref(true)

const fetchFields = async () => {
    const { data } = await api().get('/crm/modules/3/fields')
    fields.value = data.data
    console.log(fields.value)
    for (const item of data.data) {
        console.log(`ID: ${item.id}`);
    }
    getDropdownList()

}

const getDropdownList = async () => {
    try {
        contactDepartmentHtssOptions.value =
            fields.value?.find((e) => e?.id == 688)?.options || []
        contactTitleHtssOptions.value = fields.value?.find((e) => e?.id == 687)?.options || []
        contactsLeadPriorityOptions.value = fields.value?.find((e) => e?.id == 758)?.options || []
        contactsTypeOptions.value = fields.value?.find((e) => e?.id == 19)?.options || []
        contactEngagementOptions.value = fields.value?.find((e) => e?.id == 759)?.options || []

        console.log('Engagement options:', contactDepartmentHtssOptions.value);

    } catch (error) {
        console.error('Error getting dropdown list:', error)
    } finally {
        isLoadingDropdowns.value = false
    }
}


const fetchCustomers = async () => {
    const { data } = await api().get(`/companies/${authStore.companyId}?with=customer`)
    // fields.value = data.data
}

const fetchLeads = async (page = 1) => {
    await fetchFields()
    try {
        isLoading.value = true

        // Build base API URL
        let apiUrl = route.params.id.includes("software")
            ? `/crm/record-child-get/0/Accounts-Contacts?page=${page}&per_page=${perPage.value}&filters[d0_001._software_name]=${getApiVariable(route.params.id)}&company_id=${authStore.companyId}`
            : route.params.id.includes("solution")
                ? `/crm/record-child-get/0/Accounts-Contacts?page=${page}&per_page=${perPage.value}&filters[c1_315._engineering_segment]=${getApiVariable(route.params.id)}&company_id=${authStore.companyId}`
                : route.params.id.includes("engineering") ?
                    `/crm/record-child-get/0/Accounts-Contacts?page=${page}&per_page=${perPage.value}&filters[contact_department_htss]=3. Engineering Management&company_id=${authStore.companyId}`
                    : `/crm/record-child-get/0/Accounts-Contacts?page=${page}&per_page=${perPage.value}&filters[contact_department_htss]=5h. Purchase and Sales&company_id=${authStore.companyId}`

        // Add Contact Owner filter etah badh
        if (selectedFilter.value === 'HTSS') {
            apiUrl += '&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210'
        } else if (selectedFilter.value === 'MSC') {
            apiUrl += '&filters[e1_113._contact_source]=A001. MSC-Hexagon -20251209&filters[e1_113._contact_source]=A002. MSC-Hexagon -20251101&filters[e1_113._contact_source]=A003. MSC-Hexagon -20251216&filters[e1_113._contact_source]=A004. MSC-Hexagon -20251220&filters[e1_113._contact_source]=A005. MSC-Hexagon -20260101'
        }

        // Rasik
        // if (selectedContactDepartment.value) {
        //     apiUrl += `&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210&filters[contact_department_htss]=${selectedContactDepartment.value}`
        // }

        // if (selectedContactTitle.value) {
        //     apiUrl += `&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210&filters[contact_title_htss]=${selectedContactTitle.value}`
        // }

        // if (selectedLeadPriority.value) {
        //     apiUrl += `&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210&filters[b1._04_contact_lead_priority_level]=${selectedLeadPriority.value}`
        // }

        // if (selectedContactType.value) {
        //     apiUrl += `&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210&filters[contact_type]=${selectedContactType.value}`
        // }

        // if (selectedContactEngagement.value) {
        //     apiUrl += `&filters[e1_113._contact_source]=B001. HTSS-Champion-BellTextron-20251210&filters[contact_engagement]=${selectedContactEngagement.value}`
        // }
     

        // Add additional filters if selected etah badh
        if (selectedContactDepartment.value) {
            apiUrl += `&filters[contact_department_htss]=${selectedContactDepartment.value}`
        }

        if (selectedContactTitle.value) {
            apiUrl += `&filters[contact_title_htss]=${selectedContactTitle.value}`
        }

        if (selectedLeadPriority.value) {
            apiUrl += `&filters[b1._04_contact_lead_priority_level]=${selectedLeadPriority.value}`
        }

        if (selectedContactType.value) {
            apiUrl += `&filters[contact_type]=${selectedContactType.value}`
        }

        if (selectedContactEngagement.value) {
            apiUrl += `&filters[contact_engagement]=${selectedContactEngagement.value}`
        }

        const { data } = await api().get(apiUrl)

        leads.value = data.data
        currentPage.value = data.current_page
        totalPages.value = data.last_page
        totalAccounts.value = data.total
    } catch (error) {
        console.error('Failed to fetch leads:', error)
        showToast('Failed to fetch leads', 'error')
    } finally {
        isLoading.value = false
    }
}
const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return

    fetchLeads(page)
}


watch(perPage, () => {
    fetchLeads(1)
})

watch(() => route.params.id, (newId, oldId) => {
    if (newId !== oldId) {
        fetchLeads(1)
    }
})


// Fetch when component mounts
onMounted(async () => {
    await fetchLeads()
    await fetchCustomers()
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen py-8">
        <div class="container mx-auto">
            <Breadcrumb title="Contacts" />

            <!-- Card -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="flex justify-between">
                    <h2 class="text-2xl font-bold text-gray-800 pb-2"> {{
                        getHeading(route.params.id) }} Contacts - {{ authStore.companyName }}
                    </h2>
                    <div class="flex items-center gap-3">
                        <label for="perPage" class="text-sm text-gray-600 whitespace-nowrap">Per Page:</label>
                        <select id="perPage" v-model="perPage"
                            class="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none">
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                </div>
                <!-- Header controls -->
                <div class="flex mb-6 gap-4 flex-wrap">

                    <!-- Left: Filter Buttons -->
                    <!-- Left: Filter Buttons -->
                    <div v-if="isLoadingDropdowns == false" class="relative flex">
                        <div class="grid grid-cols-7 gap-4">
                            <!-- Contact Owner Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <h3 class="text-sm font-semibold text-gray-700 mb-1">Contact Owner</h3>
                                    <button @click="toggleFilterDropdown" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedFilter === 'HTSS' || selectedFilter === 'MSC' || selectedFilter === 'ALL'
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border-blue-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium">{{ selectedFilter }}</span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': showFilterDropdown }" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="showFilterDropdown"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                                        @click.stop data-dropdown>
                                        <button v-for="option in filterOptions" :key="option.value"
                                            @click="changeFilter(option.value)" :class="[
                                                'flex items-center gap-3 w-full px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50',
                                                selectedFilter === option.value
                                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                                    : 'text-gray-700 hover:text-blue-600',
                                                option.borderBottom ? 'border-b border-gray-100' : ''
                                            ]">
                                            <div class="flex-1">
                                                <span class="font-medium">{{ option.value }}</span>
                                                <p class="text-xs text-gray-500 mt-0.5">{{ option.description }}</p>
                                            </div>
                                            <svg v-if="selectedFilter === option.value" class="w-4 h-4 text-blue-600"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Contact Department Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm font-semibold text-gray-700 mb-1">Department</h3>
                                        <button v-if="selectedContactDepartment"
                                            @click="clearFilter('contactDepartment')"
                                            class="text-xs text-red-500 hover:text-red-700">
                                            Clear
                                        </button>
                                    </div>
                                    <button @click="toggleDropdown('contactDepartment')" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedContactDepartment
                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md border-purple-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium truncate">
                                                {{ selectedContactDepartment || 'Select Department' }}
                                            </span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': activeDropdown === 'contactDepartment' }"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="activeDropdown === 'contactDepartment'"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto"
                                        @click.stop data-dropdown>
                                        <button v-for="option in contactDepartmentHtssOptions" :key="option"
                                            @click="selectFilter('contactDepartment', option)" :class="[
                                                'flex items-center justify-between w-full px-4 py-2 text-left transition-all duration-200 hover:bg-purple-50',
                                                selectedContactDepartment === option
                                                    ? 'bg-purple-50 text-purple-700 font-semibold'
                                                    : 'text-gray-700 hover:text-purple-600'
                                            ]">
                                            <span class="truncate">{{ option }}</span>
                                            <svg v-if="selectedContactDepartment === option"
                                                class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Contact Title Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm font-semibold text-gray-700 mb-1">Title</h3>
                                        <button v-if="selectedContactTitle" @click="clearFilter('contactTitle')"
                                            class="text-xs text-red-500 hover:text-red-700">
                                            Clear
                                        </button>
                                    </div>
                                    <button @click="toggleDropdown('contactTitle')" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedContactTitle
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md border-green-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium truncate">
                                                {{ selectedContactTitle || 'Select Title' }}
                                            </span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': activeDropdown === 'contactTitle' }" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="activeDropdown === 'contactTitle'"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto"
                                        @click.stop data-dropdown>
                                        <button v-for="option in contactTitleHtssOptions" :key="option"
                                            @click="selectFilter('contactTitle', option)" :class="[
                                                'flex items-center justify-between w-full px-4 py-2 text-left transition-all duration-200 hover:bg-green-50',
                                                selectedContactTitle === option
                                                    ? 'bg-green-50 text-green-700 font-semibold'
                                                    : 'text-gray-700 hover:text-green-600'
                                            ]">
                                            <span class="truncate">{{ option }}</span>
                                            <svg v-if="selectedContactTitle === option" class="w-4 h-4 text-green-600"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Lead Priority Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm font-semibold text-gray-700 mb-1">Lead Priority</h3>
                                        <button v-if="selectedLeadPriority" @click="clearFilter('leadPriority')"
                                            class="text-xs text-red-500 hover:text-red-700">
                                            Clear
                                        </button>
                                    </div>
                                    <button @click="toggleDropdown('leadPriority')" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedLeadPriority
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md border-orange-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium truncate">
                                                {{ selectedLeadPriority || 'Select Priority' }}
                                            </span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': activeDropdown === 'leadPriority' }" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="activeDropdown === 'leadPriority'"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto"
                                        @click.stop data-dropdown>
                                        <button v-for="option in contactsLeadPriorityOptions" :key="option"
                                            @click="selectFilter('leadPriority', option)" :class="[
                                                'flex items-center justify-between w-full px-4 py-2 text-left transition-all duration-200 hover:bg-orange-50',
                                                selectedLeadPriority === option
                                                    ? 'bg-orange-50 text-orange-700 font-semibold'
                                                    : 'text-gray-700 hover:text-orange-600'
                                            ]">
                                            <span class="truncate">{{ option }}</span>
                                            <svg v-if="selectedLeadPriority === option" class="w-4 h-4 text-orange-600"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Contact Type Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm font-semibold text-gray-700 mb-1">Contact Type</h3>
                                        <button v-if="selectedContactType" @click="clearFilter('contactType')"
                                            class="text-xs text-red-500 hover:text-red-700">
                                            Clear
                                        </button>
                                    </div>
                                    <button @click="toggleDropdown('contactType')" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedContactType
                                            ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md border-pink-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium truncate">
                                                {{ selectedContactType || 'Select Type' }}
                                            </span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': activeDropdown === 'contactType' }" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="activeDropdown === 'contactType'"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto"
                                        @click.stop data-dropdown>
                                        <button v-for="option in contactsTypeOptions" :key="option"
                                            @click="selectFilter('contactType', option)" :class="[
                                                'flex items-center justify-between w-full px-4 py-2 text-left transition-all duration-200 hover:bg-pink-50',
                                                selectedContactType === option
                                                    ? 'bg-pink-50 text-pink-700 font-semibold'
                                                    : 'text-gray-700 hover:text-pink-600'
                                            ]">
                                            <span class="truncate">{{ option }}</span>
                                            <svg v-if="selectedContactType === option" class="w-4 h-4 text-pink-600"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Contact Engagement Dropdown -->
                            <div class="relative w-48">
                                <div class="mb-2">
                                    <div class="flex items-center justify-between">
                                        <h3 class="text-sm font-semibold text-gray-700 mb-1">Engagement</h3>
                                        <button v-if="selectedContactEngagement"
                                            @click="clearFilter('contactEngagement')"
                                            class="text-xs text-red-500 hover:text-red-700">
                                            Clear
                                        </button>
                                    </div>
                                    <button @click="toggleDropdown('contactEngagement')" data-filter-button :class="[
                                        'flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border',
                                        selectedContactEngagement
                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md border-purple-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400'
                                    ]">
                                        <div class="flex items-center gap-2">
                                            <span class="font-medium truncate">
                                                {{ selectedContactEngagement || 'Select Engagement' }}
                                            </span>
                                        </div>
                                        <svg class="w-4 h-4 transition-transform duration-300"
                                            :class="{ 'rotate-180': activeDropdown === 'contactEngagement' }"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <div v-show="activeDropdown == 'contactEngagement'"
                                        class="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto"
                                        @click.stop data-dropdown>
                                        <button v-for="option in contactEngagementOptions" :key="option"
                                            @click="selectFilter('contactEngagement', option)" :class="[
                                                'flex items-center justify-between w-full px-4 py-2 text-left transition-all duration-200 hover:bg-purple-50',
                                                selectedContactEngagement == option
                                                    ? 'bg-purple-50 text-purple-700 font-semibold'
                                                    : 'text-gray-700 hover:text-purple-600'
                                            ]">
                                            <span class="truncate">{{ option }}</span>
                                            <svg v-if="selectedContactEngagement == option"
                                                class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </transition>
                            </div>

                            <!-- Clear All Filters Button -->
                            <div class="relative w-auto self-end mb-4">
                                <button @click="clearAllFilters" :disabled="!hasActiveFilters" :class="[
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 border mt-6',
                                    hasActiveFilters
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md border-red-600 hover:from-red-600 hover:to-red-700'
                                        : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                ]">
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Right: Per Page -->

                </div>


                <!-- Loader -->
                <div v-if="isLoading" class="flex justify-center items-center py-16">
                    <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent">
                    </div>
                </div>

                <!-- Table -->
                <!-- Table Content -->
                <div v-else class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 table-zebra">
                        <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                            <tr v-if="fields.length > 0">
                                <th
                                    class="px-6 py-4 border-x text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">
                                    #
                                </th>
                                <th v-for="(field, index) in fields" :key="field.id || index"
                                    class="px-6 py-4 text-nowrap text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                                    {{ field?.label || '' }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                                <td colspan="12" class="px-6 py-8 text-center text-gray-500">
                                    <div class="flex items-center justify-center gap-3">
                                        <svg class="w-8 h-8 text-emerald-500 animate-spin" fill="none"
                                            viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span class="text-lg">Loading contacts...</span>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else-if="leads.length == 0" class="hover:bg-emerald-50 transition-colors">
                                <td colspan="12" class="px-6 py-12 text-center text-gray-500">
                                    <div class="flex flex-col items-center gap-4">
                                        <div class="relative">
                                            <div
                                                class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg class="w-12 h-12 text-gray-400" fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div
                                                class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <svg class="w-5 h-5 text-emerald-600" fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <h3 class="text-xl font-semibold text-gray-700 mb-2">No Contacts found</h3>
                                            <!-- <p class="text-gray-500 mb-4">Get started by creating your first lead</p> -->
                                            <!-- <router-link
                        to="/sales_management/leads/createLeads"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Account
                      </router-link> -->
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr v-else v-for="(lead, index) in leads" :key="lead.id"
                                class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                                <td class="px-6 py-1 whitespace-nowrap text-xs">
                                    {{ index + 1 }}
                                </td>
                                <td v-for="field in fields" :key="field"
                                    class="px-6 py-1 whitespace-nowrap text-sm text-gray-600 font-medium">

                                    <router-link v-if="field?.id" :to="{
                                        name: 'sales_management-contact-contactDetails-id',
                                        params: { id: lead?.id },

                                    }" class="hover:underline">
                                        {{lead?.values.find((e) => e?.field_id == field?.id)?.value ?? ''}}
                                    </router-link>

                                    <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-6">
                    <p class="text-sm text-gray-600">
                        Showing page <span class="font-semibold">{{ currentPage }}</span> of <span
                            class="font-semibold">{{
                                totalPages }} || Total Contacts {{ totalAccounts }}</span>
                    </p>

                    <div class="flex items-center gap-2">
                        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                            class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                            Prev
                        </button>

                        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                            class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<style scoped>
/* Enhanced Accounts Management Dashboard Styles */
.accounts-management-dashboard {
    @apply p-6 bg-gradient-to-br from-gray-50 to-violet-50 min-h-screen;
}

/* Custom animations and effects */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Apply animations to elements */
.accounts-management-dashboard>* {
    animation: fadeInUp 0.6s ease-out;
}

.accounts-management-dashboard>*:nth-child(2) {
    animation-delay: 0.1s;
}

.accounts-management-dashboard>*:nth-child(3) {
    animation-delay: 0.2s;
}

.accounts-management-dashboard>*:nth-child(4) {
    animation-delay: 0.3s;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #8b5cf6, #a855f7);
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #7c3aed, #9333ea);
}

/* Enhanced focus states */
button:focus,
a:focus,
input:focus,
select:focus {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

/* Custom gradient text effect */
.gradient-text {
    background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Enhanced card shadows */
.shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive design improvements */
@media (max-width: 768px) {
    .accounts-management-dashboard {
        @apply p-4;
    }

    .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 {
        @apply p-6;
    }

    .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 h1 {
        @apply text-2xl;
    }

    .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 p {
        @apply text-base;
    }
}

/* Loading animation enhancement */
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status badge enhancements */
.status-active {
    background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-inactive {
    background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.4);
}

.status-pending {
    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}

.status-suspended {
    background: linear-gradient(135deg, #6b7280 0%, #475569 100%);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.4);
}


.table-zebra tr:nth-child(even) {
    background-color: #f9fafb8e;
}

/* ✨ Alternate row background (striped look) */
tbody tr:nth-child(odd) td {
    background-color: #f8fcff7e;
    /* very light cyan */
}

tbody tr:nth-child(even) td {
    background-color: #e5f6ff;
    /* soft blue tint */
    border: 0.5px solid #909aa146;
}

/* Optional hover glow */
tbody tr:hover td {
    background-color: #bdeeff;
    transition: background-color 0.25s ease;
    border: 0.5px solid #909aa146;
}

tbody tr td {

    border: 0.5px solid #909aa146;
}

tbody tr th {

    border: 0.5px solid #909aa146;
}
</style>
