
<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  },
  title : {type:String,required:true , default:'Tasks List'},
  hasCreate:{type:Boolean, default:true}
})

const emit = defineEmits(['create-task'])
</script>

<template>
  <div class="mb-10">
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-3 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
        </div>
        <p class="text-gray-600 max-w-2xl">
          Track and manage success team tasks and assignments with real-time updates and progress monitoring.
        </p>
      </div>
     
    </div>
  </div>
</template>
