<template>
  <nav class="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white">
    <h1 class="text-xl font-bold mx-2">Hi-Tech Softsys</h1>
    <div class="flex gap-3">
      <router-link
        v-for="tab in tabs"
        :key="tab"
        :to="{ name: tab }"
        class="px-3 py-1 hover:text-slate-400 transition"
      >
        {{ tab }} 
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const tabs = [
  'Home', 'Marketing', 'Leads', 'Contacts', 'Accounts',
  'Deals', 'Contracts', 'Supply Chain', 'Products',
  'Services', 'Reports', 'Settings'
]
</script>
