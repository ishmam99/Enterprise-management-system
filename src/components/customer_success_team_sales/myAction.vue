<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-800">
        My Action
      </h2>

      <!-- Month Selector -->
      <div class="flex items-center gap-3">
        <button
          @click="prevMonth"
          class="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
        >
          Previous
        </button>

        <span class="text-sm font-medium text-gray-700">
          {{ currentMonthLabel }}
        </span>

        <button
          @click="nextMonth"
          class="px-3 py-1 rounded-md border text-sm hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-xl shadow border overflow-x-auto">
      <table class="min-w-full text-sm table-zebra">
        <thead class="bg-sky-200 text-gray-600">
          <tr>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Company Name</th>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Solution Area</th>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Software Name</th>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Task Description</th>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Task Assigned By</th>
            <th class="px-4 border-e border-white py-3 text-left font-medium">Action List</th>
            <th class="px-4 border-e border-white py-3 text-center font-medium">Add Action</th>
          </tr>
        </thead>

        <tbody>
                    <!-- Empty state -->
          <tr v-if="loading">
            <td colspan="7" class="px-4 py-8 text-center text-gray-500">
             <div class="flex gap-2 items-center justify-center">
               <span class="loading loading-spinner"></span>
              <span>Loading...</span>
             </div>
            </td>
          </tr>
          <tr v-else-if="!tasks.length">
            <td colspan="7" class="px-4 py-8 text-center text-gray-500">
              No tasks found for this month
            </td>
          </tr>
          <tr 
            v-else
            v-for="task in tasks"
            :key="task.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 border-e">{{ task.company }}</td>
            <td class="px-4 py-3 border-e">{{ task.solutionArea }}</td>
            <td class="px-4 py-3 border-e">{{ task.software }}</td>
            <td class="px-4 py-3 border-e text-gray-700">
              {{ task.description }}
            </td>
            <td class="px-4 py-3 border-e">{{ task.assignedBy }}</td>

            <!-- Action List -->
            <td class="px-4 py-3 border-e">
             <div class="flex gap-1 flex-col">
               <div v-if="task.task" class="flex  gap-2">
                <span> {{ task.task }} </span>
                 <button
                class="px-3 py-1.5 rounded-md bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600"
              >
                Add
              </button>
              </div>
              <div v-if="task.task2" class="flex  gap-2">
                <span> {{ task.task2 }} </span>
                 <button
                class="px-3 py-1.5 rounded-md bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600"
              >
                Add
              </button>
              </div>
             </div>
            </td>

            <!-- Add Action -->
            <td class="px-4 py-3 border-e text-center">
              <button
                @click="addAction(task)"
                class="px-3 py-1.5 rounded-md bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600"
              >
                Add
              </button>
            </td>
          </tr>


        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/* ------------------ Month Logic ------------------ */
const currentDate = ref(new Date())

const currentMonthLabel = computed(() =>
  currentDate.value.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  })
)

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  )
  fetchTasks()
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  )
  fetchTasks()
}

/* ------------------ Data ------------------ */
const tasks = ref([])

/* Mock fallback data */
const fallbackData = [
  {
    id: 1,
    company: 'Bell Helicopter @ Hurst-3000South',
    solutionArea: 'Structural Analysis',
    software: 'Nastran',
    description: 'Review implementation checklist',
    assignedBy: 'Project Manager',
    task: 'Tried to figure out softwares required in future for bell.',
    task2: 'Email 10 executive, peaching new software',
    actions: ['Approve']
  },
  {
    id: 2,
    company: 'Bell Helicopter @ Hurst-3000South',
    solutionArea: 'System Dynamics',
    software: 'Pactran',
    description: 'Prepare monthly report',
    assignedBy: 'Team Lead',
     task: 'Implementation Review',
    actions: ['Approve']
  }
]

/* Mock API call */
const mockApiCall = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate API not ready sometimes
      Math.random() > 0.4
        ? resolve(fallbackData)
        : reject('API not ready')
    }, 800)
  })
const loading = ref(false)
const fetchTasks = async () => {
  loading.value = true
  try {
    const res = await mockApiCall()
    tasks.value = res
  } catch (e) {
    console.warn('Using fallback data')
    tasks.value = fallbackData
  } finally {
    loading.value = false
  }
}

/* ------------------ Actions ------------------ */
const addAction = (task) => {
  task.actions.push('Pending')
}

/* ------------------ Init ------------------ */
onMounted(fetchTasks)
</script>
