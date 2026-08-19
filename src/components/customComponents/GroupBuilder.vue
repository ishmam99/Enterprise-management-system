<template>
  <div class="flex relative pl-6">

    <!-- Left circle + vertical line -->
    <div class="relative flex flex-col items-center mt-5 mr-3">

      <!-- Circle with number -->
      <p class="px-3 py-1 rounded-full border text-gray-600 font-semibold text-sm z-10 bg-white">
        {{ groupIndex + 1 }}
      </p>

      <!-- Full vertical line -->
      <div v-if="groupIndex < size-1" class="relative flex-1 w-px bg-gray-300 mt-1">
        <!-- Top half -->
        <div class="absolute top-5 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gray-300"></div>

        <!-- AND/OR in middle -->
        <div
          class="absolute top-1 mt-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-blue-500 cursor-pointer"
          @click="emit('update')"
        >
          {{ group.join_type }}
        </div>

        <!-- Bottom half -->
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gray-300"></div>
      </div>
    </div>

    <!-- Right: ConditionRow -->
    <div class="flex-1">
      <ConditionRow
        v-for="(cond, idx) in group.conditions"
        :key="idx"
        :condition="cond"
        :fields="fields"

      />
    </div>
     <div class="flex gap-2 justify-end items-center">
      <button
       v-if=" size > 1"
        class="text-red-500 text-2xl font-semibold hover:scale-110 hover:shadow-lg"
        @click="$emit('remove-group',idx)"
      >
        <i class="ri-indeterminate-circle-line"></i>
      </button>

      <button
      v-if="groupIndex+1 == size"
        class="text-green-500 text-2xl font-semibold hover:scale-110 hover:shadow-lg"
        @click="$emit('add-group')"
      >
        <i class="ri-add-circle-line"></i>
      </button>

    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ConditionRow from './ConditionRow.vue';

const props = defineProps({
  group: Object,
  fields: Array,
  groupIndex: Number,
  size:Number
});
const emit = defineEmits(['remove-group','add-group','update'])


</script>
