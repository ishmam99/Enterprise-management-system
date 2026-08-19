<!-- src/components/tasks/TaskEditForm.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['cancel', 'saved'])
const authStore = useAuthStore()
const editedTask = ref({})
const saving = ref(false)
const solutions = ref([])
const softwares = ref([])
const teamMembers = ref([])
const successTeams = ref([])

const priorityOptions = ['Training', 'Engineering Service', 'Sales Champion'
]

onMounted(() => {
  // Initialize edited task
  editedTask.value = {
    solution_id: props.task.solution_id,
    software_id: props.task.software_id,
    assigned_to: props.task.assigned_to,
    success_team_id: props.task.success_team_id,
    description: props.task.description,
    type: props.task.type ,
    date: props.task.date ? props.task.date.split('T')[0] : '',
    // estimated_hours: props.task.estimated_hours || 1
  }

  // Fetch dropdown data
  fetchDropdownData()
})

const fetchDropdownData = async () => {
  try {
    const [solutionsRes, softwaresRes, teamRes, teamsRes] = await Promise.all([
      api().get('/solutions'),
      api().get('/softwares'),
      api().get('/success-teams/'+authStore.team_id),
      api().get('/success-teams')
    ])
    console.log(teamRes)
    solutions.value = solutionsRes.data.data || solutionsRes.data
    softwares.value = softwaresRes.data.data || softwaresRes.data
    teamMembers.value = teamRes.data.members
    successTeams.value = teamsRes.data.data || teamsRes
  } catch (err) {
    console.error('Error fetching dropdown data:', err)
  }
}

const saveTask = async () => {
  saving.value = true
  try {
    const updateData = {
      solution_id: editedTask.value.solution_id,
      software_id: editedTask.value.software_id,
      assigned_to: editedTask.value.assigned_to,
      success_team_id: editedTask.value.success_team_id,
      description: editedTask.value.description,
      type: editedTask.value.type,
      // estimated_hours: editedTask.value.estimated_hours,
      _method:'put'
    }

    if (editedTask.value.date) {
      updateData.date = new Date(editedTask.value.date).toISOString()
    }

    await api().post(`/success-team-tasks/${props.task.id}`, updateData)
    emit('saved')
  } catch (err) {
    console.error('Error updating task:', err)
    alert('Failed to update task. Please try again.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Solution Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Solution</label>
        <select
          v-model="editedTask.solution_id"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">Select Solution</option>
          <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
            {{ solution.name }}
          </option>
        </select>
      </div>

      <!-- Software Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Software</label>
        <select
          v-model="editedTask.software_id"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">Select Software</option>
          <option v-for="software in softwares" :key="software.id" :value="software.id">
            {{ software.name }}
          </option>
        </select>
      </div>

      <!-- Success Team Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Success Team</label>
        <select
          v-model="editedTask.success_team_id"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">Select Success Team</option>
          <option v-for="team in successTeams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <!-- Assigned Person Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
        <select
          v-model="editedTask.assigned_to"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">Select Team Member</option>
          <option v-for="member in teamMembers" :key="member.id" :value="member.id">
            {{ member.name }} ({{ member.role }})
          </option>
        </select>
      </div>

      <!-- Priority Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
        <select
          v-model="editedTask.type"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option v-for="priority in priorityOptions" :key="priority" :value="priority">
            {{ priority }}
          </option>
        </select>
      </div>

      <!-- Due Date Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <input
          type="date"
          v-model="editedTask.date"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        />
      </div>

      <!-- Estimated Hours Field -->
      <!-- <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
        <input
          type="number"
          v-model.number="editedTask.estimated_hours"
          min="0.5"
          step="0.5"
          class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        />
      </div> -->
    </div>

    <!-- Description Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
      <textarea
        v-model="editedTask.description"
        rows="4"
        class="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        placeholder="Enter task description..."
      ></textarea>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 pt-4">
      <button
        @click="$emit('cancel')"
        class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        @click="saveTask"
        :disabled="saving"
        class="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i v-if="saving" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-save"></i>
        {{ saving ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
  </div>
</template>
