<!-- src/components/hiring/JobDetails.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">Job Details</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <div><strong>Job Title:</strong> {{ candidate.job?.title || 'N/A' }}</div>
      <div><strong>Job Type:</strong> {{ candidate.job?.job_type || 'N/A' }}</div>
      <div><strong>Location:</strong> {{ candidate.job?.base_country || 'N/A' }}</div>
      <div><strong>Experience:</strong> {{ candidate.job?.required_experience || 'N/A' }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ candidate: { type: Object, required: true } })
</script>
