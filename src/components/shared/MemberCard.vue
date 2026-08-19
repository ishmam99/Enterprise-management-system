<!-- components/MemberCard.vue -->
<template>
  <div class="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
    <div class=" placeholder">
      <div class="bg-neutral text-white rounded-full px-4 py-2 flex justify-center items-center h-10 w-10">
        {{ initials(member.name) }}

      </div>
    </div>
    <div class="flex-1">
      <p class="font-medium">{{ member.name }}</p>
      <span class="badge badge-outline text-xs mt-1">
        {{ member.pivot.role }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({ member: Object })

const initials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
</script>
