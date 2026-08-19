<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import SalesManagementSidebar from '@/components/sidebars/SalesManagementSidebar.vue'
import SalesManagementHeader from '@/components/sidebars/SalesManagementHeader.vue'
// OR: import { useUiStore } from '@/stores/UiStore'

const authStore = useAuthStore()
// const uiStore = useUiStore()
const router = useRouter()

const toggleSidebar = () => {
  authStore.toggleSidebar()
}
onMounted(() => {
  if (
    ![
      'sales-director',
      'sales-executive',
      'sales-manager',
      'manager-sales',
      'sales-executive',
      'director-sales',
      'vp-sales',
      'manager-cs',
      'vp-cs',
      'executive-cs',
      'director-cs'
    ].includes(authStore.role)
  ) {
    router.push({ name: 'errors-not-authorized' })
  }
})
</script>

<template>
  <div>
    <SalesManagementHeader
      class="fixed z-10"
      :sidebar-open="authStore.sidebarOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <div class="relative top-16" :class="authStore.role == 'sales-executive' ? 'pt-16' : '' ">
      <div class="flex gap-0">
        <div v-if="authStore.sidebarOpen">
          <SalesManagementSidebar />
        </div>

        <RouterView class="w-full" />
      </div>
    </div>
  </div>
</template>
