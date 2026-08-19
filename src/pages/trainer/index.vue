<template>
  <div class="w-4/5 mx-auto">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-b-3xl shadow-xl mb-8">
      <div class="px-10 pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="text-white">
          <h1 class="text-4xl font-bold tracking-tight mb-2">
            {{ getPageTitle() }}
          </h1>
          <p class="text-blue-100 text-lg">
            <span class="font-medium bg-white/20 px-3 py-1 rounded-full animate-pulse">
              {{ store?.user?.name }}
            </span>
            <span class="ml-2">{{ getWelcomeMessage() }}</span>
          </p>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-50"></div>
          <div v-if="props.activeTab != 'All'" class="relative px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg ring-2 ring-white/20">
            <button
              class="flex items-center gap-2 text-white font-semibold hover:scale-105 transition-transform duration-200"
              @click="$emit('setTab','All')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- All Overview Dashboard -->
    <div v-if="props.activeTab == 'All'" class="px-10 py-6 mx-auto">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          title="My Trainings"
          :value="13"
          icon="ri-book-open-line"
          color="indigo"
          description="All Trainings"
        />
        <DashboardCard
          title="My Softwares"
          :value="dbStats?.purchases"
          icon="ri-computer-line"
          color="teal"
          description="All Softwares"
        />
        <DashboardCard
          title="My Solutions"
          :value="11"
          icon="ri-lightbulb-line"
          color="amber"
          description="All Solutions"
        />
        <DashboardCard
          title="My Schedule"
          :value="dbStats?.vendors_status_3"
          icon="ri-calendar-line"
          color="cyan"
          description="All Schedule"
        />
      </div>

      <!-- Quick Actions -->
      <div class="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-100 p-8 mb-12">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">Quick Actions</h3>
            <p class="text-gray-500 mt-2">Frequently used actions at your fingertips</p>
          </div>
          <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-blue-500/10">
            <i class="ri-rocket-line text-blue-600 text-xl"></i>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
          to="user/my_training/ViewTrainingList"
          title="View Trainings"
          icon="ri-book-open-line"
          color="emerald"
          description="View All Trainings"
        />
        <QuickActionCard
          to="user/my_software/ListSoftware"
          title="My Softwares"
          icon="ri-computer-line"
          color="amber"
          description="View All My Softwares"
        />
        <QuickActionCard
          to="user/my_solution/ListSolution"
          title="My Solutions"
          icon="ri-lightbulb-line"
          color="violet"
          description="View All My Solutions"
        />
        <QuickActionCard
          to="user/my_solution/ListSolution"
          title="View Schedule"
          icon="ri-calendar-line"
          color="blue"
          description="View My Schedule"
        />
        </div>
      </div>

      <!-- Recent Activity -->
      <!-- <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id"
               class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
            <div :class="`p-3 rounded-xl ${getActivityColor(activity.type)}`">
              <i :class="`${activity.icon} text-white text-lg`"></i>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.description }}</p>
            </div>
            <span class="text-sm text-gray-400">{{ activity.time }}</span>
          </div>
        </div>
      </div> -->
    </div>

    <!-- My Software Management -->
    <div v-if="props.activeTab == 'My software'" class="px-10 py-6 mx-auto">
         <!-- Software Tabs -->
      <!-- <div class="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-2 mb-8">
        <div class="flex overflow-x-auto gap-2 py-2">
          <button
            v-for="tab in softwares"
            :key="tab"
            :class="[
              'px-6 py-3 text-nowrap rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              store.currentSubMenu === tab
                ? 'bg-white text-teal-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
            @click="store.setCurrentSubMenu(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div> -->

      <!-- Software Categories -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Software Categories</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SoftwareCategoryCard
            v-for="category in softwareCategories"
            :key="category.name"
            :category="category"
          />
        </div>
      </div>
    </div>

    <!-- My Industry Solution Management -->
    <div v-if="props.activeTab == 'My Industry Solution Management'" class="px-10 py-6 mx-auto">
      <!-- Software Tabs -->
      <div class="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-2 mb-8">
        <div class="flex overflow-x-auto gap-2 py-2">
          <button
            v-for="tab in softwares"
            :key="tab"
            :class="[
              'px-6 py-3 text-nowrap rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              store.currentSubMenu === tab
                ? 'bg-white text-teal-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
            @click="store.setCurrentSubMenu(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Industry Solutions Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Total Solutions"
          :value="dbStats?.vendors_status_2"
          icon="ri-building-line"
          color="teal"
          description="Industry solutions"
        />
        <DashboardCard
          title="Active Projects"
          :value="dbStats?.bid_forms"
          icon="ri-projector-line"
          color="orange"
          description="Ongoing implementations"
        />
        <DashboardCard
          title="Completed"
          :value="dbStats?.purchases"
          icon="ri-checkbox-circle-line"
          color="green"
          description="Successfully delivered"
        />
      </div>
    </div>
    <div v-if="props.activeTab == 'My Skill Management'" class="px-10 py-6 mx-auto">
      <!-- Software Tabs -->
      <div class="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-2 mb-8">
        <div class="flex overflow-x-auto gap-2 py-2">
          <button
            v-for="tab in softwares"
            :key="tab"
            :class="[
              'px-6 py-3 text-nowrap rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              store.currentSubMenu === tab
                ? 'bg-white text-teal-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
            @click="store.setCurrentSubMenu(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Industry Solutions Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Total Solutions"
          :value="dbStats?.vendors_status_2"
          icon="ri-building-line"
          color="teal"
          description="Industry solutions"
        />
        <DashboardCard
          title="Active Projects"
          :value="dbStats?.bid_forms"
          icon="ri-projector-line"
          color="orange"
          description="Ongoing implementations"
        />
        <DashboardCard
          title="Completed"
          :value="dbStats?.purchases"
          icon="ri-checkbox-circle-line"
          color="green"
          description="Successfully delivered"
        />
      </div>
    </div>

    <!-- My Training Management -->
    <div v-if="props.activeTab == 'My Training'" class="px-10 py-6 mx-auto">
      <!-- Training Tabs -->
      <!-- <div class="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-2 mb-8">
        <div class="flex overflow-x-auto gap-2 py-2">
          <button
            v-for="tab in softwares"
            :key="tab"
            :class="[
              'px-6 py-3 text-nowrap rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              store.currentSubMenu === tab
                ? 'bg-white text-red-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
            @click="store.setCurrentSubMenu(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div> -->

      <!-- Training Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Upcoming Training"
          :value="dbStats?.vendors_status_2"
          icon="ri-calendar-event-line"
          color="red"
          description="Scheduled sessions"
        />
        <DashboardCard
          title="Ongoing Training"
          :value="dbStats?.bid_forms"
          icon="ri-progress-5-line"
          color="orange"
          description="Active learning sessions"
        />
        <DashboardCard
          title="Completed"
          :value="dbStats?.purchases"
          icon="ri-graduation-cap-line"
          color="green"
          description="Training completed"
        />
      </div>
    </div>
    <!--My Schedule Management -->
    <div v-if="props.activeTab == 'My Solution'" class="px-10 py-6 mx-auto">
      <!-- Training Tabs -->
      <!-- <div class="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-2 mb-8">
        <div class="flex overflow-x-auto gap-2 py-2">
          <button
            v-for="tab in softwares"
            :key="tab"
            :class="[
              'px-6 py-3 text-nowrap rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              store.currentSubMenu === tab
                ? 'bg-white text-red-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
            @click="store.setCurrentSubMenu(tab)"
          >
            {{ tab }}
          </button>
        </div>
      </div> -->

      <!-- Training Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Total Solutions"
          :value="dbStats?.vendors_status_2"
          icon="ri-calendar-event-line"
          color="red"
          description="Scheduled sessions"
        />
        <DashboardCard
          title="Ongoing Training"
          :value="dbStats?.bid_forms"
          icon="ri-progress-5-line"
          color="orange"
          description="Active learning sessions"
        />
        <DashboardCard
          title="Completed"
          :value="dbStats?.purchases"
          icon="ri-graduation-cap-line"
          color="green"
          description="Training completed"
        />
      </div>
    </div>




  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTrainerStore } from './stores/trainerStore';
import DashboardCard from './DashboardCard.vue';
import QuickActionCard from './QuickActionCard.vue';
import SoftwareCategoryCard from './SoftwareCategoryCard.vue';

const props = defineProps({
  activeTab: {
    type: String,
    default: ''
  }
});

defineEmits(['setTab']);

const store = useTrainerStore();
const dbStats = ref({});
const softwares = ['Actran', 'CAEfatigue', 'Cradle CFD', 'MSC Apex', 'Dytran', 'Marc', 'Patran', 'MSC Nastran', 'MSC CoSim'];

// Page title and messaging
const getPageTitle = () => {
  const titles = {
    'All': 'Dashboard Overview',
    'My Software Management': 'Software Management',
    'My Industry Solution Management': 'Industry Solutions',
    'My Training Management': 'Training Management',
    'My Skill Management': 'Skill Development',
    'My Schedule Management': 'Schedule Management'
  };
  return titles[props.activeTab] || `${props.activeTab} Overview`;
};

const getWelcomeMessage = () => {
  const messages = {
    'All': 'Welcome to your comprehensive dashboard',
    'My Software Management': 'Manage your software portfolio',
    'My Industry Solution Management': 'Oversee industry solutions',
    'My Training Management': 'Track training progress',
    'My Skill Management': 'Develop your skills',
    'My Schedule Management': 'Manage your schedule'
  };
  return messages[props.activeTab] || 'Manage your operations';
};

// Sample data for different sections
const recentActivities = [
  { id: 1, type: 'bid', icon: 'ri-auction-line', title: 'New Bid Created', description: 'Software procurement bid #245', time: '2 hours ago', color: 'bg-blue-500' },
  { id: 2, type: 'purchase', icon: 'ri-shopping-cart-line', title: 'Purchase Approved', description: 'Vendor onboarding completed', time: '5 hours ago', color: 'bg-green-500' },
  { id: 3, type: 'vendor', icon: 'ri-user-add-line', title: 'New Vendor Registered', description: 'ABC Technologies joined platform', time: '1 day ago', color: 'bg-purple-500' }
];

const softwareCategories = [
  { name: 'CAE & Simulation', count: 12, icon: 'ri-cpu-line', color: 'bg-blue-500' },
  { name: 'CFD Software', count: 8, icon: 'ri-windy-line', color: 'bg-teal-500' },
  { name: 'Structural Analysis', count: 15, icon: 'ri-building-line', color: 'bg-green-500' },
  { name: 'Fatigue Analysis', count: 6, icon: 'ri-loop-left-line', color: 'bg-orange-500' },
  { name: 'Acoustics', count: 4, icon: 'ri-volume-up-line', color: 'bg-purple-500' },
  { name: 'Multi-physics', count: 7, icon: 'ri-node-tree', color: 'bg-red-500' }
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', time: 'Today, 2:00 PM', type: 'Meeting', icon: 'ri-team-line', color: 'bg-blue-500' },
  { id: 2, title: 'Vendor Review', time: 'Tomorrow, 10:00 AM', type: 'Review', icon: 'ri-user-voice-line', color: 'bg-green-500' },
  { id: 3, title: 'Training Session', time: 'Feb 15, 9:00 AM', type: 'Training', icon: 'ri-graduation-cap-line', color: 'bg-purple-500' }
];

const getActivityColor = (type) => {
  const colors = {
    bid: 'bg-blue-500',
    purchase: 'bg-green-500',
    vendor: 'bg-purple-500',
    training: 'bg-orange-500'
  };
  return colors[type] || 'bg-gray-500';
};

// Mock API call
const fetchDbStats = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  dbStats.value = {
    bid_forms: 24,
    purchases: 156,
    vendors_status_2: 8,
    vendors_status_3: 42
  };
};

onMounted(() => {
  store.setCurrentSubMenu('');
  fetchDbStats();
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for tabs */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
