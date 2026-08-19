<template>
  <div class="grid grid-cols-6 items-center gap-3 p-3">
    <!-- Field -->
    <select
      v-model="fieldData"
      class="border rounded px-3 py-2 col-span-2 text-sm bg-white min-w-[160px]"
    >
      <option v-for="f in fields" :key="f.id" :value="f">
        {{ f.label }}
      </option>
    </select>

    <!-- Operator -->
    <select
      v-model="condition.operator"
      class="border rounded px-3 py-2 text-sm bg-white"
    >
      <option value="is">is</option>
      <option value="contains">contains</option>
      <option value="does_not_contain">does not contain</option>
      <option value="between">between</option>
    </select>

    <!-- Value -->
    <template v-if="isBetween">
      <div class="flex items-center col-span-2 gap-2">
        <input type="date" v-model="condition.value[0]" class="border rounded px-3 py-2 text-sm" />
        <input type="date" v-model="condition.value[1]" class="border rounded px-3 py-2 text-sm" />
      </div>
    </template>
    <template v-else-if="fieldData?.options && fieldData.options.length > 0">
      <select
        v-model="condition.value"
        class="border rounded px-3 py-2 col-span-2 text-sm bg-white min-w-[160px]"
      >
        <option v-for="option in fieldData.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </template>

    <template v-else>
      <input
        v-model="condition.value"
        placeholder="Value"
        class="border rounded px-3 col-span-2 py-2 text-sm w-56"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  condition: Object,
  fields: Array
});

const fieldData = ref(
  props.fields.find(f => f.id === props.condition.field) || null
);

const isBetween = computed(() => props.condition.operator === 'between');

// Sync `fieldData` to `condition.field`
watch(fieldData, (newField) => {
  if (newField) props.condition.field = newField.id;
});
</script>
