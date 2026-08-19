<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import PillTag from '@/components/PillTag.vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const mainStore = useMainStore()

const userName = computed(() => mainStore.userName)

const userSwitchVal = ref(false)
</script>

<template>
  <CardBox>
    <BaseLevel type=" ">
      <UserAvatarCurrentUser class="flex justify-center h-40 w-40" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <!-- <div class="flex justify-center md:block">
          <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Notifications"
            :input-value="true"
          />
        </div> -->
        <h1 class="text-2xl">
          Welcome, <b>{{ authStore.user.name }}</b
          >!
        </h1>
        <p>Last login <b>12 mins ago</b></p>
        <!-- <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div> -->
      </div>
    </BaseLevel>
  </CardBox>
</template>
