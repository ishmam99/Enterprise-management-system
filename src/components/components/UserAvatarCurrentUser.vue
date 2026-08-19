<script setup>
import { useMainStore } from '@/stores/main'
import UserAvatar from '@/components/UserAvatar.vue'
import { useAuthStore } from '@/stores/AuthStore'

const mainStore = useMainStore()
</script>

<template>
  <UserAvatar :username="useAuthStore().user?.name" :avatar="useAuthStore()?.user?.photo">
    <slot />
  </UserAvatar>
</template>
