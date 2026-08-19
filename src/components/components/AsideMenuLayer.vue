<script setup>
import { useRouter } from 'vue-router'
import AsideMenuList from '@/components/AsideMenuList.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useStore } from '@/stores/store'
import { mdiClose } from '@mdi/js'
import { computed } from 'vue'

defineProps({
  menu: {
    type: Array,
    required: true
  }
})

const router = useRouter()
const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const logout = () => {
  console.log('Logging out...')
  useStore().createProject = null
  useAuthStore().logout()
  router.push('/signIn')
}

const authStore = useAuthStore()

const getEmployeeBgClass = computed(() => {
  if (authStore.user?.role !== "employee") return ""
  switch (authStore?.user?.employeeProfile?.type) {
    case "Full-Time":
      return "!bg-sky-900"
    case "Part-Time":
      return "!bg-green-900"
    case "Consultant":
      return "!bg-purple-900"
    case "Sub-Contractor":
      return "!bg-teal-900"
    default:
      return "!bg-gray-900" // Default background
  }
})

const getEmployeeBrandBgClass = computed(() => {
  if (authStore.user?.role !== "employee") return ""
  switch (authStore?.user?.employeeProfile?.type) {
    case "Full-Time":
      return "!bg-sky-800"
    case "Part-Time":
      return "!bg-green-800"
    case "Consultant":
      return "!bg-purple-800"
    case "Sub-Contractor":
      return "!bg-teal-800"
    default:
      return "!bg-gray-800"
  }
})

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-72 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div
      :class="getEmployeeBgClass"
      class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900"
    >
      <div
        :class="getEmployeeBrandBgClass"
        class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900"
      >
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b v-if="authStore.user?.role == 'Hr'" class="font-black">HR Dashboard</b>
          <b v-else-if="authStore.user?.role == 'Admin'" class="font-black">Super Admin Dashboard</b>
          <b v-else-if="authStore.user?.role == 'employee'" class="font-black">
            Employee Dashboard <br />
            <span class="text-sm">({{ authStore?.user?.employeeProfile?.type }})</span>
          </b>
          <b v-else-if="authStore.user?.role == 'subcontractor'" class="font-black">
            Subcontractor Dashboard <br />
            <!-- <span class="text-sm">({{ authStore?.user?.employeeProfile?.type }})</span> -->
            <span class="text-sm text-gray-500">({{ authStore?.user?.email }})</span>
          </b>
          <b v-else-if="authStore.user?.role == 'project_manager'" class="font-black">
            {{ authStore.user?.department }} Manager Dashboard
          </b>
          <b v-else-if="authStore.user?.role == 'project_director'" class="font-black">
            Project Director Dashboard
          </b>
          <b v-else-if="authStore.user?.role == 'Vp'" class="font-black">VP Dashboard</b>
        </div>
        <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>

      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <button class="bg-red-500 text-white w-full h-10" @click="logout">Logout</button>
      </ul>
    </div>
  </aside>
</template>
