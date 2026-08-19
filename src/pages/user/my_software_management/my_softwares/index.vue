<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{{ software.name }}</h1>
          <p class="text-gray-600 mt-2">{{ software.description }}</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200">
            <i class="fas fa-download mr-2"></i>Export
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Overview -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Skills Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-700">Skills & Competencies</h2>
            <button @click="showAddSkillModal = true" class="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
              <i class="fas fa-plus mr-1"></i>Add Skill
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="skill in software.skills" :key="skill.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-gray-800">{{ skill.name }}</h3>
                <span :class="getProficiencyClass(skill.proficiency)" class="px-2 py-1 text-xs rounded-full">
                  {{ skill.proficiency }}%
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-3">{{ skill.description }}</p>
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>{{ skill.usersCompleted }} users completed</span>
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-4 gap-4 text-center">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ software.stats.totalSkills }}</div>
              <div class="text-sm text-gray-600">Total Skills</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ software.stats.completedSkills }}</div>
              <div class="text-sm text-gray-600">Completed</div>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">{{ software.stats.inProgressSkills }}</div>
              <div class="text-sm text-gray-600">In Progress</div>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{{ software.stats.pendingSkills }}</div>
              <div class="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <!-- Training Schedule -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-700">Training Schedule</h2>
            <button @click="showAddTrainingModal = true" class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              <i class="fas fa-plus mr-1"></i>Schedule Training
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="training in software.trainings" :key="training.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-semibold text-gray-800">{{ training.title }}</h3>
                  <p class="text-sm text-gray-600">{{ training.instructor }}</p>
                </div>
                <span :class="getTrainingStatusClass(training.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ training.status }}
                </span>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <div class="text-gray-500">Date</div>
                  <div class="font-medium">{{ formatDate(training.date) }}</div>
                </div>
                <div>
                  <div class="text-gray-500">Duration</div>
                  <div class="font-medium">{{ training.duration }}</div>
                </div>
                <div>
                  <div class="text-gray-500">Participants</div>
                  <div class="font-medium">{{ training.participants }}/{{ training.capacity }}</div>
                </div>
                <div>
                  <div class="text-gray-500">Type</div>
                  <div class="font-medium">{{ training.type }}</div>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                    <i class="fas fa-eye mr-1"></i>View
                  </button>
                  <button class="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                    <i class="fas fa-edit mr-1"></i>Edit
                  </button>
                </div>
                <button v-if="training.status === 'Upcoming'" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Sidebar -->
      <div class="space-y-8">
        <!-- Software Info -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Software Information</h2>
          <div class="space-y-3">
            <div>
              <div class="text-sm text-gray-500">Version</div>
              <div class="font-medium">{{ software.version }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">License Type</div>
              <div class="font-medium">{{ software.licenseType }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Expiration Date</div>
              <div class="font-medium">{{ formatDate(software.expirationDate) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Supported OS</div>
              <div class="font-medium">{{ software.supportedOS.join(', ') }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Category</div>
              <div class="font-medium">{{ software.category }}</div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="activity in software.recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div :class="getActivityIconClass(activity.type)" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white">
                <i :class="getActivityIcon(activity.type)"></i>
              </div>
              <div>
                <p class="text-sm text-gray-800">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <button class="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition duration-200">
              <i class="fas fa-book mr-2"></i>Documentation
            </button>
            <button class="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition duration-200">
              <i class="fas fa-video mr-2"></i>Tutorial Videos
            </button>
            <button class="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition duration-200">
              <i class="fas fa-users mr-2"></i>User Community
            </button>
            <button class="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition duration-200">
              <i class="fas fa-headset mr-2"></i>Support Ticket
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Skill Modal -->
    <div v-if="showAddSkillModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4">Add New Skill</h3>
          <!-- Add skill form content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAddSkillModal = ref(false)
const showAddTrainingModal = ref(false)

const software = ref({
  id: 1,
  name: 'MSC Nastran',
  description: 'Advanced finite element analysis software for engineering simulations',
  version: '2023',
  licenseType: 'Enterprise',
  expirationDate: '2024-12-31',
  supportedOS: ['Windows', 'Linux'],
  category: 'CAE/FEA',
  stats: {
    totalSkills: 12,
    completedSkills: 8,
    inProgressSkills: 3,
    pendingSkills: 1
  },
  skills: [
    {
      id: 1,
      name: 'Static Analysis',
      description: 'Perform linear static structural analysis',
      proficiency: 85,
      usersCompleted: 24
    },
    {
      id: 2,
      name: 'Dynamic Analysis',
      description: 'Modal and frequency response analysis',
      proficiency: 60,
      usersCompleted: 18
    },
    {
      id: 3,
      name: 'Nonlinear Analysis',
      description: 'Advanced nonlinear material and contact analysis',
      proficiency: 45,
      usersCompleted: 12
    },
    {
      id: 4,
      name: 'Thermal Analysis',
      description: 'Steady-state and transient thermal analysis',
      proficiency: 70,
      usersCompleted: 20
    }
  ],
  trainings: [
    {
      id: 1,
      title: 'Basic FEA with MSC Nastran',
      instructor: 'Dr. John Smith',
      date: '2024-02-15',
      duration: '3 days',
      participants: 15,
      capacity: 20,
      type: 'Classroom',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Advanced Dynamics',
      instructor: 'Prof. Sarah Chen',
      date: '2024-01-20',
      duration: '2 days',
      participants: 18,
      capacity: 18,
      type: 'Virtual',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Nonlinear Materials Workshop',
      instructor: 'Dr. Mike Johnson',
      date: '2023-12-10',
      duration: '1 day',
      participants: 12,
      capacity: 15,
      type: 'Hybrid',
      status: 'Completed'
    }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'training',
      description: 'New training session scheduled',
      timestamp: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      type: 'skill',
      description: '5 users completed Static Analysis',
      timestamp: '2024-01-14T16:45:00'
    },
    {
      id: 3,
      type: 'user',
      description: '12 new users registered',
      timestamp: '2024-01-14T09:15:00'
    }
  ]
})

const getProficiencyClass = (proficiency) => {
  if (proficiency >= 80) return 'bg-green-100 text-green-800'
  if (proficiency >= 60) return 'bg-blue-100 text-blue-800'
  if (proficiency >= 40) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getTrainingStatusClass = (status) => {
  const classes = {
    'Upcoming': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getActivityIconClass = (type) => {
  const classes = {
    'training': 'bg-blue-500',
    'skill': 'bg-green-500',
    'user': 'bg-purple-500'
  }
  return classes[type] || 'bg-gray-500'
}

const getActivityIcon = (type) => {
  const icons = {
    'training': 'fas fa-chalkboard-teacher',
    'skill': 'fas fa-graduation-cap',
    'user': 'fas fa-user-plus'
  }
  return icons[type] || 'fas fa-info-circle'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
