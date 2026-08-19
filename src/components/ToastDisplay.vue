<template>
  <transition name="fade">
    <div v-if="toast.show" 
         :class="`fixed toast-style ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`">
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
const { toast } = useToast()
</script>