<template>
  <SectionMain class="mx-10">
    <!-- Back Button -->
    <SectionTitleLineWithButton
      :icon="mdiVectorCircle"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Career Life Cycle"
      main
    >
      <div class="text-left flex items-center mb-2">
        <p
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd]"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
            ></path>
          </svg>
          Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <!-- Search -->
    <div class="flex justify-end gap-3 mb-6">
      <FormControl
        v-model="searchQuery"
        class="w-full md:w-1/2 focus:outline-none"
        type="text"
        placeholder="Enter Employee Name"
        @input="filterResults"
      />
      <BaseButton class="w-1/6" color="info" label="Search" />
    </div>

    <!-- Employee Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="employee in filteredResults"
        :key="employee.id"
        class="px-6 py-6 text-center bg-white shadow-lg hover:shadow-2xl rounded-xl lg:mt-0 xl:px-10"
      >
        <div class="space-y-4 xl:space-y-6">
          <!-- <img class="mx-auto rounded-full h-24 w-24" :src="image" alt="author avatar" /> -->
          <div class="space-y-2">
            <div
              class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6"
            >
              <h3>{{ employee.first_name }} {{ employee.last_name }}</h3>
              <p class="text-indigo-600">Position: {{ employee.position_name }}</p>

              <hr class="h-px my-8 bg-gray-400 border-0 w-full" />

              <!-- Social Links -->
              <div class="flex justify-center mt-5 space-x-5 !mb-4">
                <a href="#" class="text-gray-400 hover:text-blue-500">Twitter</a>
                <a href="#" class="text-gray-400 hover:text-blue-500">GitHub</a>
                <a href="#" class="text-gray-400 hover:text-blue-500">LinkedIn</a>
              </div>

              <!-- Details Link -->
              <!-- <router-link
                :to="{
                  name: 'HRM_EmployeeManagement_CareerLifeCycle_Details',
                  params: { id: employee.user_id }
                }"
              >
                <PillTag class="cursor-pointer" color="info" label="Details" />
              </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionMain>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import PillTag from '@/components/PillTag.vue'
import { mdiVectorCircle } from '@mdi/js'
import image from '@/assets/LOGO/default.png'
import { useHRM } from '@/composables/useHRM'

const { hrmApi } = useHRM()
const router = useRouter()

// Data
const employees = ref([])
const filteredResults = ref([])
const searchQuery = ref('')

// Methods
const goBack = () => router.back()

const getAllEmployees = async () => {
  try {
    const { data } = await hrmApi.get('employee')
    employees.value = data.data
    filteredResults.value = data.data
  } catch (err) {
    console.error('Failed to fetch employees:', err)
  }
}

const filterResults = () => {
  const query = searchQuery.value.toLowerCase()
  filteredResults.value = employees.value.filter(
    (e) =>
      e.first_name.toLowerCase().includes(query) ||
      e.last_name.toLowerCase().includes(query) ||
      e.position_name.toLowerCase().includes(query)
  )
}

// Lifecycle
onMounted(() => {
  getAllEmployees()
})
</script>
