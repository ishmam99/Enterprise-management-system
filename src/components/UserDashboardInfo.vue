<template>
      <div class="mb-2 bg-cyan-100 rounded-md px-2 space-y-1 py-2">
         <h4 class="font-bold text-center text-md shadow-xl p-1 rounded-b-md bg-white text-[#2e828a]">
           <!-- {{ store?.role.match(/[A-Z][a-z]+$|[A-Z]+$/)?.[0] }} -->
           User Dashboard
           </h4>

           <h2 class="font-bold flex justify-start items-center gap-2 text-center text-sm text-sky-700">
           <div class="p-1 px-2 rounded-full bg-sky-700 text-white">
            <i class="ri-user-line"></i>
           </div>
            {{ store?.user?.name }}
           </h2>

      </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';

const store = useAuthStore()
</script>

<style lang="scss" scoped>

</style>
