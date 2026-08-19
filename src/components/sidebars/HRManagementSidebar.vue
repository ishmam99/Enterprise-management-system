<template>
  <div class="bg- bg-contain w-1/5 min-w-[350px] min-h-screen sticky top-[80px]">
    <div class="bg-gray-300 p-5 h-full flex flex-col font-semibold text-lg ">

      <!-- <UserDashboardInfo /> -->
      <!-- {{ store.currentSubMenu  }} -->

      <div class="mb-2 bg-cyan-500 rounded-md px-2 space-y-1 py-2">
        <h4 class="font-bold text-center text-md shadow-xl p-1 rounded-b-md bg-white text-[#2e828a]">
          <!-- {{ store?.role.match(/[A-Z][a-z]+$|[A-Z]+$/)?.[0] }} -->
          HR Management Dashboard
        </h4>

        <h2 class="font-bold flex justify-start items-center gap-2 text-center text-sm text-sky-700">
          <div class="p-1 px-2 rounded-full bg-sky-700 text-white items-center mx-auto">
            <i class="ri-user-line"></i> {{ store?.user?.name }}
          </div>

        </h2>

      </div>

      <router-link to="/hr_management"
        class="inline-block text-purple-700 text-center hover:bg-blue-600 bg-white font-medium py-2 px-4 rounded-xl transition duration-200">
        Dashboard
      </router-link>

      <div class="space-y-2 mt-4">
        <div v-for="menu in menus" :key="menu.id" class="accordion-group bg-white text-blue-600 rounded-xl ">

          <div
            class="flex items-center text-blue-600 bg-wihte justify-between w-full p-2 border border-white rounded-xl transition-all duration-300 group"
            :class="openSection === menu.id ? 'text-[#0315b6] bg-white shadow-md' : ''"
            @click="toggleAccordion(menu.id, menu.hasdb)">
            <div class="flex items-center gap-3">
              <i class=" text-white py-1 px-2 rounded-md" :class="`${menu.icon} bg-${menu.iconColor}-500`"></i>
              <span>{{ menu.title }}</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"
              :class="{ 'rotate-180 transition-transform duration-300': openSection === menu.id }">
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
            </svg>
          </div>


          <div v-if="currentAccordions === menu.id" class="ml-4 mt-1 p-2 space-y-1 border-l-2 border-gray-300 pl-3">

            <template v-if="menu.links">
              <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
                class="flex items-center text-sky-600 gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                active-class="router-link-active">
                <i class=" text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                <!-- <i :class="link.icon"></i> -->
                {{ link.text }}
              </router-link>
            </template>


            <template v-if="menu.groups">

              <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
                <button v-if="store.currentMenu == 'My Industry Solution Management' && store.currentSubMenu != group"
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 bg-white rounded-lg transition-all duration-300 bg-white hover:bg-gray-200 group hover:text-blue-900">
                  <div class="flex items-center gap-2">

                    <svg v-if="!group.icon" xmlns="http://www.w3.org/2000/svg" class=" text-white py-1 px-2 rounded-md"
                      :class="` bg-${menu.iconColor}-500`" viewBox="0 0 24 24" width="16" height="16"
                      fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i v-else class=" text-white py-1 px-2 rounded-md"
                      :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                    :class="{ 'rotate-180 transition-transform duration-300': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>
                <button v-else @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 bg-white text-blue-600 border  rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900">
                  <div class="flex items-center gap-2">

                    <svg v-if="!group.icon" xmlns="http://www.w3.org/2000/svg" class=" text-white py-1 px-2 rounded-md"
                      :class="` bg-${menu.iconColor}-500`" viewBox="0 0 24 24" width="16" height="16"
                      fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i v-else class=" text-white py-1 px-2 rounded-md"
                      :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                    :class="{ 'rotate-180 transition-transform duration-300': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key"
                  class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                  <!-- Check if group has links (normal links) -->
                  <template v-if="group.links && !group.sub_groups">
                    <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                      class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-blue-500 border duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                      active-class="router-link-active">
                      <i class=" text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                      {{ link.text }}
                    </router-link>
                  </template>

                  <!-- Handle groups with sub_groups -->
                  <template v-if="group.sub_groups">
                    <div v-for="sub_group in group.sub_groups" :key="sub_group.key" class="accordion-group">
                      <button @click="toggleSubNested(sub_group.key)"
                        class="flex items-center justify-between w-full p-2 text-blue-600 border rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900">
                        <div class="flex items-center gap-2">

                          <svg v-if="!sub_group.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
                            height="16" fill="currentColor">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                          </svg>
                          <!-- <i v-else :class="sub_groups.icon"></i> -->
                          <i v-else class=" text-white py-1 px-2 rounded-md"
                            :class="`${sub_group.icon} bg-${menu.iconColor}-500`"></i>
                          <span class="text-base text-start">{{ sub_group.title }}</span>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                          fill="currentColor"
                          :class="{ 'rotate-180 transition-transform duration-300': subDropdown === sub_group.key }">
                          <path
                            d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                        </svg>
                      </button>

                      <div v-show="subDropdown === sub_group.key"
                        class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">

                        <!-- Check if sub_group has links (for group names as links) -->
                        <template v-if="sub_group.links">
                          <router-link v-for="link in sub_group.links" :key="link.to" :to="link.to"
                            class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-blue-600 border duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                            active-class="router-link-active">
                            <i class=" text-white py-1 px-2 rounded-md"
                              :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                            {{ link.text }}
                          </router-link>
                        </template>

                        <!-- Handle nested sub_groups (3rd level - expandable groups) -->
                        <template v-if="sub_group.sub_groups">
                          <div v-for="nested_sub_group in sub_group.sub_groups" :key="nested_sub_group.key"
                            class="accordion-group">
                            <button @click="toggleSubSubNested(nested_sub_group.key)"
                              class="flex items-center justify-between w-full p-2 text-blue-600 border rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900">
                              <div class="flex items-center gap-2">
                                <svg v-if="!nested_sub_group.icon" xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                                </svg>
                                <i v-else class=" text-white py-1 px-2 rounded-md"
                                  :class="`${nested_sub_group.icon} bg-${menu.iconColor}-500`"></i>
                                <span class="text-base text-start">{{ nested_sub_group.title }}</span>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                                fill="currentColor"
                                :class="{ 'rotate-180 transition-transform duration-300': subsubDropdown === nested_sub_group.key }">
                                <path
                                  d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                              </svg>
                            </button>
                            <div v-show="subsubDropdown === nested_sub_group.key"
                              class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                              <router-link v-for="link in nested_sub_group.links" :key="link.to" :to="link.to"
                                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-black border duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                                active-class="router-link-active">
                                <i class=" text-white py-1 px-2 rounded-md"
                                  :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                                {{ link.text }}
                              </router-link>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>

                    <!-- Also show regular links in this section (other options like Pending, Not Approved, or other date options) -->
                    <template v-if="group.links">
                      <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                        class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-white duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                        active-class="router-link-active">
                        <i class=" text-white py-1 px-2 rounded-md"
                          :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                        {{ link.text }}
                      </router-link>
                    </template>
                  </template>
                </div>

              </div>
            </template>
          </div>
        </div>
      </div>


      <button type="button" @click="authStore.logout(), router.push('/login/adminLogin')"
        class="py-2 px-5 mt-4 w-1/2 bg-red-800 rounded-md text-white duration-300">
        Log Out
      </button>


      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'
import { useHRM } from '@/composables/useHRM'

const authStore = useAuthStore()
const emit = defineEmits(['changeTab'])
const store = useAuthStore()
const router = useRouter()
const dropdown = ref('')
const subDropdown = ref('')
const subsubDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions
const salesUsers = ref([])
const marketingUsers = ref([])
const techSupportUsers = ref([])
const businessDevelopmentUsers = ref([])
const trainingUsers = ref([])
const applicationEngineeringUsers = ref([])
const itUsers = ref([])
const hrAndAccountingUsers = ref([])

const { hrmApi } = useHRM();
const departments = ref([])
const employees = ref([])

function toggleAccordion(name, hasdb) {
  if (hasdb)
    emit('changeTab', name)
  if (name === currentAccordions.value) {
    currentAccordions.value = ''
    dropdown.value = ''
    subDropdown.value = ''
    subsubDropdown.value = ''
  } else {
    currentAccordions.value = name
    dropdown.value = ''
    subDropdown.value = ''
    subsubDropdown.value = ''
  }
}

function toggleNested(key) {
  dropdown.value = dropdown.value === key ? '' : key
  // Clear lower level dropdowns when closing this one
  if (dropdown.value !== key) {
    subDropdown.value = ''
    subsubDropdown.value = ''
  }
}

function toggleSubNested(key) {
  subDropdown.value = subDropdown.value === key ? '' : key
  // Clear lower level dropdown when closing this one
  if (subDropdown.value !== key) {
    subsubDropdown.value = ''
  }
}

function toggleSubSubNested(key) {
  subsubDropdown.value = subsubDropdown.value === key ? '' : key
}

// Helper function to filter users by keywords
const filterUsersByKeywords = (data, keywords) => {
  const filteredUsers = []

  Object.keys(data).forEach(roleKey => {
    if (data[roleKey] && Array.isArray(data[roleKey])) {
      data[roleKey].forEach(user => {
        const roleKeyLower = roleKey.toLowerCase()
        const userRoleLower = (user.role || '').toLowerCase()

        // Check if any keyword matches
        const matches = keywords.some(keyword => {
          const keywordLower = keyword.toLowerCase()
          return roleKeyLower.includes(keywordLower) || userRoleLower.includes(keywordLower)
        })

        if (matches) {
          const exists = filteredUsers.some(existingUser => existingUser.id === user.id)
          if (!exists) {
            filteredUsers.push({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            })
          }
        }
      })
    }
  })

  return filteredUsers
}

// Fetch all group users from API
const fetchAllGroupUsers = async () => {
  try {
    const { data } = await api().get('/users/role-get')
    if (data.status && data.data) {
      // Fetch users for each group based on keywords
      salesUsers.value = filterUsersByKeywords(data.data, ['sales'])
      marketingUsers.value = filterUsersByKeywords(data.data, ['marketing'])
      techSupportUsers.value = filterUsersByKeywords(data.data, ['techsupport'])
      businessDevelopmentUsers.value = filterUsersByKeywords(data.data, ['bussiness'])
      trainingUsers.value = filterUsersByKeywords(data.data, ['training'])
      applicationEngineeringUsers.value = filterUsersByKeywords(data.data, ['engineer-application'])
      itUsers.value = filterUsersByKeywords(data.data, ['website', 'developer'])
      hrAndAccountingUsers.value = filterUsersByKeywords(data.data, ['hr', 'accounting'])
    }
  } catch (error) {
    console.error('Error fetching group users:', error)
  }
}






const getDepartments = async () => {
  try {
    const { data } = await hrmApi.get('/department')
    departments.value = data.data
  } catch (error) {
    console.error('Error fetching departments:', error)
  }
}

const getEmployee = async () => {
  try {
    const { data } = await hrmApi.get('/employee')
    employees.value = data.data
  } catch (error) {
    console.error('Error fetching Employee:', error)
  }
}

// Add this function after your existing fetch functions
const getEmployeesByDepartment = computed(() => {
  const employeesByDept = {};

  // Group employees by department_id
  employees.value.forEach(employee => {
    const deptId = employee.department_id;
    if (!employeesByDept[deptId]) {
      employeesByDept[deptId] = [];
    }
    employeesByDept[deptId].push({
      id: employee.id,
      user_id: employee.user_id,
      name: `${employee.first_name} ${employee.last_name}`,
      department_id: employee.department_id,
      department_name: employee.department_name
    });
  });

  return employeesByDept;
});

// Helper function for date-filtered department links - returns sub_groups structure
const getDateFilteredDepartmentLinks = (dateFilter) => {
  return departments.value.map(dept => ({
    key: `${dateFilter}Department${dept.department_id}`,
    title: dept.department_name,
    icon: 'ri-group-line',
    links: generateDateFilteredEmployeeLinks(dept.department_id, dateFilter)
  }));
};


// Date-filtered computed properties
const getTodayDepartmentLinks = computed(() => getDateFilteredDepartmentLinks('today'));
const getThisWeekDepartmentLinks = computed(() => getDateFilteredDepartmentLinks('this_week'));
const getThisMonthDepartmentLinks = computed(() => getDateFilteredDepartmentLinks('this_month'));



// Generate dynamic links for each group (without date filter - for "By Group")
const getSalesGroupLinks = computed(() => generateGroupLinks(salesUsers.value, 'SalesGroup'))
const getMarketingGroupLinks = computed(() => generateGroupLinks(marketingUsers.value, 'MarketingGroup'))
const getTechSupportGroupLinks = computed(() => generateGroupLinks(techSupportUsers.value, 'TechSupportGroup'))
const getBusinessDevelopmentLinks = computed(() => generateGroupLinks(businessDevelopmentUsers.value, 'BussinessDevelopment'))
const getTrainingGroupLinks = computed(() => generateGroupLinks(trainingUsers.value, 'TrainingGroup'))
const getApplicationEngineeringLinks = computed(() => generateGroupLinks(applicationEngineeringUsers.value, 'ApplicationEngineeringGroup'))
const getITGroupLinks = computed(() => generateGroupLinks(itUsers.value, 'ITGroup'))
const getHrAndAccountingLinks = computed(() => generateGroupLinks(hrAndAccountingUsers.value, 'HrAndAccountingGroup'))

// Generate dynamic links for "Today" filter
const getTodaySalesGroupLinks = computed(() => generateGroupLinks(salesUsers.value, 'SalesGroup', 'today'))
const getTodayMarketingGroupLinks = computed(() => generateGroupLinks(marketingUsers.value, 'MarketingGroup', 'today'))
const getTodayTechSupportGroupLinks = computed(() => generateGroupLinks(techSupportUsers.value, 'TechSupportGroup', 'today'))
const getTodayBusinessDevelopmentLinks = computed(() => generateGroupLinks(businessDevelopmentUsers.value, 'BussinessDevelopment', 'today'))
const getTodayTrainingGroupLinks = computed(() => generateGroupLinks(trainingUsers.value, 'TrainingGroup', 'today'))
const getTodayApplicationEngineeringLinks = computed(() => generateGroupLinks(applicationEngineeringUsers.value, 'ApplicationEngineeringGroup', 'today'))
const getTodayITGroupLinks = computed(() => generateGroupLinks(itUsers.value, 'ITGroup', 'today'))
const getTodayHrAndAccountingLinks = computed(() => generateGroupLinks(hrAndAccountingUsers.value, 'HrAndAccountingGroup', 'today'))

// Generate dynamic links for "This Week" filter
const getThisWeekSalesGroupLinks = computed(() => generateGroupLinks(salesUsers.value, 'SalesGroup', 'this_week'))
const getThisWeekMarketingGroupLinks = computed(() => generateGroupLinks(marketingUsers.value, 'MarketingGroup', 'this_week'))
const getThisWeekTechSupportGroupLinks = computed(() => generateGroupLinks(techSupportUsers.value, 'TechSupportGroup', 'this_week'))
const getThisWeekBusinessDevelopmentLinks = computed(() => generateGroupLinks(businessDevelopmentUsers.value, 'BussinessDevelopment', 'this_week'))
const getThisWeekTrainingGroupLinks = computed(() => generateGroupLinks(trainingUsers.value, 'TrainingGroup', 'this_week'))
const getThisWeekApplicationEngineeringLinks = computed(() => generateGroupLinks(applicationEngineeringUsers.value, 'ApplicationEngineeringGroup', 'this_week'))
const getThisWeekITGroupLinks = computed(() => generateGroupLinks(itUsers.value, 'ITGroup', 'this_week'))
const getThisWeekHrAndAccountingLinks = computed(() => generateGroupLinks(hrAndAccountingUsers.value, 'HrAndAccountingGroup', 'this_week'))

// Generate dynamic links for "This Month" filter
const getThisMonthSalesGroupLinks = computed(() => generateGroupLinks(salesUsers.value, 'SalesGroup', 'this_month'))
const getThisMonthMarketingGroupLinks = computed(() => generateGroupLinks(marketingUsers.value, 'MarketingGroup', 'this_month'))
const getThisMonthTechSupportGroupLinks = computed(() => generateGroupLinks(techSupportUsers.value, 'TechSupportGroup', 'this_month'))
const getThisMonthBusinessDevelopmentLinks = computed(() => generateGroupLinks(businessDevelopmentUsers.value, 'BussinessDevelopment', 'this_month'))
const getThisMonthTrainingGroupLinks = computed(() => generateGroupLinks(trainingUsers.value, 'TrainingGroup', 'this_month'))
const getThisMonthApplicationEngineeringLinks = computed(() => generateGroupLinks(applicationEngineeringUsers.value, 'ApplicationEngineeringGroup', 'this_month'))
const getThisMonthITGroupLinks = computed(() => generateGroupLinks(itUsers.value, 'ITGroup', 'this_month'))
const getThisMonthHrAndAccountingLinks = computed(() => generateGroupLinks(hrAndAccountingUsers.value, 'HrAndAccountingGroup', 'this_month'))

// Add this mapping function
const mapDepartmentToExistingGroup = (departmentName) => {
  const departmentMap = {
    // Map department names to existing hardcoded groups
    'Software Development': 'SalesGroup', // or whichever makes sense
    'Engineering': 'TechSupportGroup',
    // Add more mappings as needed
  };

  return departmentMap[departmentName] || 'SalesGroup'; // default fallback
};

// Add this mapping function at the top (after your imports)
const mapDepartmentToExistingFolder = (departmentName) => {
  const folderMap = {
    // Map API department names to your existing folder names
    'Software Development': 'SalesGroup', // Example mapping
    'Engineering': 'TechSupportGroup', // Example mapping
    // Add all your departments here
    'HR': 'HrAndAccountingGroup',
    'IT': 'ItGroup',
    'Marketing': 'MarketingGroup',
    'Training': 'TrainingGroup',
    'Business Development': 'BussinessDevelopment',
    'Application Engineering': 'ApplicationEngineeringGroup',
    // Default fallback
  };

  // Try exact match first
  if (folderMap[departmentName]) {
    return folderMap[departmentName];
  }

  // Try partial match
  for (const [key, value] of Object.entries(folderMap)) {
    if (departmentName.includes(key) || key.includes(departmentName)) {
      return value;
    }
  }

  // Default to SalesGroup if no match
  return 'SalesGroup';
};

// Update the getDepartmentGroupLinks function to use mapping
const getDepartmentGroupLinks = computed(() => {
  const subGroups = [];

  departments.value.forEach(dept => {
    const employeesInDept = getEmployeesByDepartment.value[dept.department_id] || [];

    // Create links for each employee in this department
    const employeeLinks = employeesInDept.map(employee => ({
      to: `/hr_management/timecard/ByGroup/${dept.department_name}/${employee.user_id}`,
      icon: 'ri-list-check',
      text: employee.name
    }));

    // If no employees, show no content message
    if (employeeLinks.length === 0) {
      employeeLinks.push({
        to: `/hr_management/timecard/ByGroup/${dept.department_name}`,
        icon: 'ri-list-check',
        text: 'No employees available',
        disabled: true
      });
    }

    subGroups.push({
      key: `dept_${dept.department_id}`,
      title: dept.department_name,
      icon: 'ri-group-line',
      links: employeeLinks
    });
  });

  return subGroups;
});

// Update the generateDepartmentEmployeeLinks function for "By Group" (no date filter)
const generateDepartmentEmployeeLinks = (departmentId, dateFilter = null) => {
  const employeesInDept = getEmployeesByDepartment.value[departmentId] || [];

  if (employeesInDept.length === 0) {
    return [{ to: '#', icon: 'ri-list-check', text: 'No employees available', disabled: true }];
  }

  return employeesInDept.map(employee => {
    const dept = departments.value.find(d => d.department_id == departmentId);
    const deptName = dept ? dept.department_name : 'Unknown';

    const baseUrl = `/hr_management/timecard/ByGroup/${deptName}/${employee.user_id}`;
    const url = dateFilter ? `${baseUrl}?date_filter=${dateFilter}` : baseUrl;

    return {
      to: url,
      icon: 'ri-list-check',
      text: employee.name
    };
  });
};

// New function for date-filtered employee links (used in "By Date" section)
const generateDateFilteredEmployeeLinks = (departmentId, dateFilter) => {
  const employeesInDept = getEmployeesByDepartment.value[departmentId] || [];

  if (employeesInDept.length === 0) {
    return [{ to: '#', icon: 'ri-list-check', text: 'No employees available', disabled: true }];
  }

  return employeesInDept.map(employee => {
    const dept = departments.value.find(d => d.department_id == departmentId);
    const deptName = dept ? dept.department_name : 'Unknown';

    // For date filters, include the date_filter query param
    const baseUrl = `/hr_management/timecard/ByGroup/${deptName}/${employee.user_id}`;
    const url = `${baseUrl}?date_filter=${dateFilter}`;

    return {
      to: url,
      icon: 'ri-list-check',
      text: employee.name
    };
  });
};

// Update the "By Approval" section in your menus
// Change this in your menus computed property:
links: departments.value.map(dept => {
  const folderName = mapDepartmentToExistingFolder(dept.department_name);
  return {
    to: `/hr_management/timecard/ByGroup/${folderName}Details`,
    icon: 'ri-group-line',
    text: dept.department_name
  };
})



// Fetch all group users on component mount
onMounted(() => {
  getDepartments()
  getEmployee()
  fetchAllGroupUsers()
})

// Computed menus with dynamic Sales Group links
const menus = computed(() => {
  const baseMenus = [

    {
      id: 'Activity',
      title: 'Activity',
      icon: 'ri-pulse-line',
      hasdb: false,
      iconColor: 'red',
      groups: [

        {
          key: 'All Activity List',
          title: 'All Activity List',
          icon: 'ri-calendar-event-line',
          links: [
            { to: '/hr_management/activity/today', icon: 'ri-sun-line', text: 'Today' },
            { to: '/hr_management/activity/thisWeek', icon: 'ri-calendar-2-line', text: 'This Week' },
            { to: '/hr_management/activity/ThisMonth', icon: 'ri-calendar-line', text: 'This Month' },
            { to: '/hr_management/activity', icon: 'ri-list-unordered', text: 'All' }
          ],
        },

        {
          key: 'Sales Person Activity',
          title: 'Sales Person Activity',
          icon: 'ri-user-star-line',
          links: [
            {
              to: '/hr_management/activity/sales-person/today',
              icon: 'ri-user-follow-line',
              text: 'Today'
            },
            {
              to: '/hr_management/activity/sales-person/thisWeek',
              icon: 'ri-team-line',
              text: 'This Week'
            },
            {
              to: '/hr_management/activity/sales-person/thisMonth',
              icon: 'ri-bar-chart-line',
              text: 'This Month'
            }
          ],
        },

      ]
    },

    {
      id: 'TimeCards',
      title: 'All TimeCard',
      icon: 'ri-time-line',
      hasdb: false,
      iconColor: 'red',
      groups: [
        {
          key: 'By Group',
          title: 'By Group',
          icon: 'ri-team-line',
          sub_groups: getDepartmentGroupLinks.value
        },
        {
          key: 'By Date',
          title: 'By Date',
          icon: 'ri-calendar-2-line',
          sub_groups: [
            {
              key: 'Today',
              title: 'Today',
              icon: 'ri-calendar-line',
              sub_groups: getTodayDepartmentLinks.value
            },
            {
              key: 'This Week',
              title: 'This Week',
              icon: 'ri-calendar-line',
              sub_groups: getThisWeekDepartmentLinks.value
            },
            {
              key: 'This Month',
              title: 'This Month',
              icon: 'ri-calendar-line',
              sub_groups: getThisMonthDepartmentLinks.value
            }
          ],
        },
        {
          key: 'By Approval',
          title: 'By Approval',
          icon: 'ri-checkbox-circle-line',
          sub_groups: [
            {
              key: 'Approved',
              title: 'Approved',
              icon: 'ri-checkbox-circle-line',
              // In the "By Approval" -> "Approved" section:
              // Use department_name for the dynamic route
              links: departments.value.map(dept => ({
                to: `/hr_management/timecard/ByGroup/${dept.department_name}`,
                icon: 'ri-group-line',
                text: dept.department_name
              }))
            }
          ],
        },
      ]
    },
    {
      id: 'Recruitment',
      title: 'Recruitment',
      icon: 'ri-user-search-line',   // 🔍 hiring / talent search
      hasdb: false,
      iconColor: 'red',
      groups: [

        // Organization Structure
        {
          key: 'Organization Structure',
          title: 'Organization Structure',
          icon: 'ri-building-4-line',
          links: [
            { to: '/hr_management/recruitment/organization/organogram', icon: 'ri-node-tree', text: 'Organogram' },
            { to: '/hr_management/recruitment/organization/positions', icon: 'ri-briefcase-4-line', text: 'Positions' },
            { to: '/hr_management/recruitment/organization/create-position', icon: 'ri-add-box-line', text: 'Create Position' },
          ]
        },

        // Job Openings
        {
          key: 'Job Openings',
          title: 'Job Openings',
          icon: 'ri-suitcase-line',
          links: [
            { to: '/hr_management/recruitment/job-openings/create', icon: 'ri-file-add-line', text: 'Create Job Opening' },
            { to: '/hr_management/recruitment/job-openings/approve', icon: 'ri-list-check-2', text: 'Approve Openings' },
            { to: '/hr_management/recruitment/job-openings/all', icon: 'ri-list-check-2', text: 'All Openings' },

          ]
        },

        // Applications
        {
          key: 'Applications',
          title: 'Applications',
          icon: 'ri-file-user-line',
          links: [
            // { to: '/hr_management/recruitment/applications/all', icon: 'ri-file-list-2-line', text: 'All/Pending Applications' },
            { to: '/hr_management/recruitment/applications/0', icon: 'ri-file-list-2-line', text: 'Pending Applications' },
            { to: '/hr_management/recruitment/applications/1', icon: 'ri-award-line', text: 'Shortlisted' },
            // { to: '/hr_management/recruitment/applications/2', icon: 'ri-mic-line', text: 'Interview Stage' },
            { to: '/hr_management/recruitment/applications/10', icon: 'ri-close-circle-line', text: 'Rejected' },
          ]
        },

        // Hiring Pipeline
        {
          key: 'Hiring Pipeline',
          title: 'Hiring ',
          icon: 'ri-flow-chart',
          sub_groups: [
             {
              key: 'Current Stages',
              title: 'Current Hiring Status',
              icon: 'ri-flag-line',
          links: [
            { to: '/hr_management/recruitment/hiring_pipeline/22', icon: 'ri-calendar-check-line', text: 'List of Current Hiring' },
            { to: '/hr_management/recruitment/hiring_pipeline/2', icon: 'ri-calendar-check-line', text: '02. Interview Stage' },
            { to: '/hr_management/recruitment/hiring_pipeline/3', icon: 'ri-folder-2-line', text: '03. Selection & Initial Offer' },
            { to: '/hr_management/recruitment/hiring_pipeline/4', icon: 'ri-folder-2-line', text: '04. Verification' },
            { to: '/hr_management/recruitment/hiring_pipeline/5', icon: 'ri-folder-2-line', text: '05. Documentation' },
            { to: '/hr_management/recruitment/hiring_pipeline/6', icon: 'ri-folder-2-line', text: '06. Joining & Setup' },
            { to: '/hr_management/recruitment/hiring_pipeline/7', icon: 'ri-folder-2-line', text: '07. Probation & Confirmation' }
          ]},
             {
              key: 'Completed Stages',
              title: 'Completed Hiring',
              icon: 'ri-flag-line',
          links: [
            { to: '/hr_management/recruitment/hiring_pipeline/23', icon: 'ri-calendar-check-line', text: 'Recently Hired' },
            { to: '/hr_management/recruitment/hiring_pipeline/24', icon: 'ri-folder-2-line', text: 'All Hired' },
          ]},

             ]
        },

        // Onboarding
        // {
        //   key: 'Onboarding',
        //   title: 'Onboarding',
        //   icon: 'ri-user-received-line',
        //   links: [
        //     // { to: '/hr_management/recruitment/onboarding/newHire', icon: 'ri-user-smile-line', text: 'New Hires' },
        //     // { to: '/hr_management/recruitment/onboarding/documents', icon: 'ri-folder-2-line', text: 'Documents' },
        //     { to: '/hr_management/recruitment/onboarding/SelectionOffer', icon: 'ri-folder-2-line', text: 'Selection & Offer' },
        //     { to: '/hr_management/recruitment/onboarding/Verification', icon: 'ri-folder-2-line', text: 'Verification' },
        //     { to: '/hr_management/recruitment/onboarding/Documentation', icon: 'ri-folder-2-line', text: 'Documentation' },
        //     { to: '/hr_management/recruitment/onboarding/JoiningSetup', icon: 'ri-folder-2-line', text: 'Joining & Setup' },
        //     { to: '/hr_management/recruitment/onboarding/ProbationConfirmation', icon: 'ri-folder-2-line', text: 'Probation & Confirmation' }
        //   ]
        // },

        // Settings
        // {
        //   key: 'Recruitment Settings',
        //   title: 'Settings',
        //   icon: 'ri-settings-3-line',
        //   links: [
        //     { to: '/hr_management/recruitment/settings', icon: 'ri-settings-4-line', text: 'Settings' },
        //   ]
        // },

      ]
    },

    {
      id: 'Accounts',
      title: 'Accounts',
      icon: 'ri-wallet-3-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/hr_management/accounts/dashboard', icon: 'ri-dashboard-line', text: 'Dashboard' },
        // { to: '/hr_management/accounts/payments', icon: 'ri-secure-payment-line', text: 'Payments' },
        { to: '/hr_management/accounts/transaction-history', icon: 'ri-history-line', text: 'Transaction History' }
      ],
      groups: [
        {
          key: 'Salaries',
          title: 'Salaries',
          icon: 'ri-money-dollar-circle-line',
          links: [
            { to: '/hr_management/accounts/salaries/GenerateSalary', icon: 'ri-add-circle-line', text: 'Generate Salary' },
            { to: '/hr_management/accounts/salaries/ThisMonthsSalary', icon: 'ri-calendar-line', text: 'This Months Salary' },
            { to: '/hr_management/accounts/salaries/MonthlySalaryDisbursement', icon: 'ri-bank-card-line', text: 'Monthly Salary Disbursement' },
            { to: '/hr_management/accounts/salaries/MonthlyPaymentStatus', icon: 'ri-checkbox-circle-line', text: 'Monthly Payment Status' },
            { to: '/hr_management/accounts/salaries/EmployeesPaymentStatus', icon: 'ri-bank-card-line', text: 'Employees Payment Status' },
            { to: '/hr_management/accounts/salaries/MonthlyPaymentHistory', icon: 'ri-history-line', text: 'Monthly Payment History' },
            { to: '/hr_management/accounts/salaries/EmployeesPaymentHistory', icon: 'ri-file-history-line', text: 'Employees Payment History' }
          ]
        },
        {
          key: 'Expenses',
          title: 'Expenses',
          icon: 'ri-file-list-3-line',
          links: [
            { to: '/hr_management/accounts/expenses/CreateExpense', icon: 'ri-add-circle-line', text: 'Create Expense' },
            { to: '/hr_management/accounts/expenses/PendingExpense', icon: 'ri-time-line', text: 'Pending Expense' },
            { to: '/hr_management/accounts/expenses/ApprovedExpense', icon: 'ri-checkbox-circle-line', text: 'Approved Expense' }
          ]
        }
      ]
    },
    {
      id: 'EmployeeManagement',
      title: 'Employee Management',
      icon: 'ri-team-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/hr_management/employee-management/add-employee', icon: 'ri-user-add-line', text: 'Add Employee' },
        { to: '/hr_management/employee-management/employee-list', icon: 'ri-list-check', text: 'Employee List' },
        // { to: '/hr_management/employee-management/employee-login', icon: 'ri-login-circle-line', text: 'Employee Login' },
        { to: '/hr_management/employee-management/employee-contracts', icon: 'ri-list-check', text: 'Employee Contracts' },
        { to: '/hr_management/employee-management/timecard-approval', icon: 'ri-time-line', text: 'Time card Approval' },
        { to: '/hr_management/employee-management/leave-approval', icon: 'ri-calendar-check-line', text: 'Leave Approval' },
        { to: '/hr_management/employee-management/performance', icon: 'ri-line-chart-line', text: 'Performance' },
        { to: '/hr_management/employee-management/career-life-cycle', icon: 'ri-route-line', text: 'Career Life cycle' },
        { to: '/hr_management/employee-management/assignRole', icon: 'ri-file-user-line', text: 'Assign Role' },
        { to: '/hr_management/employee-management/allEmployees', text: 'Assigned Employees', icon: 'ri-user-line' },
        { to: '/hr_management/employee-management/unassignedEmployee', text: 'Unassigned Employees', icon: 'ri-user-line' },
      ]
    }


  ]

  return baseMenus
})

// Add this function to debug what routes you have
const checkExistingRoutes = () => {
  console.log('Available timecard routes:');
  // Check your pages folder for files like:
  // - pages/hr_management/timecard/employee/_id/index.vue
  // - pages/hr_management/timecard/_id/index.vue
  // - pages/hr_management/timecard/index.vue
}
// Add this inside onMounted or create a new function
const debugRoutes = () => {
  console.log('Checking routes structure...');

  // Check if you have these common patterns
  const possibleRoutes = [
    '/hr_management/timecard',
    '/hr_management/timecard/index',
    '/hr_management/timecard/[id]',
    '/hr_management/timecard/employee',
    '/hr_management/timecard/employee/[id]',
    '/hr_management/timecard/bygroup',
    '/hr_management/timecard/bygroup/[group]',
    '/hr_management/timecard/bygroup/[group]/[id]'
  ];

  console.log('Looking for these routes:', possibleRoutes);

  // Also check your actual pages folder structure
  console.log('Check your pages folder for:');
  console.log('- pages/hr_management/timecard/index.vue');
  console.log('- pages/hr_management/timecard/_id/index.vue');
  console.log('- pages/hr_management/timecard/employee/_id/index.vue');
}

// Call it in onMounted
onMounted(() => {
  getDepartments()
  getEmployee()
  fetchAllGroupUsers()
  debugRoutes() // Add this line
})


</script>

<style scoped>
.router-link-active {
  background-color: #1a02a5;
  color: white;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
