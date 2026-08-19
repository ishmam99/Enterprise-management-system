<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'radio', 'switch'].includes(value),
  },
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: null,
  },
  inputValue: {
    type: [String, Number, Boolean],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});

const inputType = computed(() => (props.type === 'radio' ? 'radio' : 'checkbox'));
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer group">
    <!-- Hidden Input -->
    <input
      v-model="computedValue"
      :type="inputType"
      :name="name"
      :value="inputValue"
      class="hidden peer"
    />

    <!-- Custom Checkbox -->
    <div
      class="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out
        group-hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-500"
    >
      <svg
        v-if="inputType === 'checkbox'"
        class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>

      <div
        v-if="inputType === 'radio'"
        class="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
      />
    </div>

    <!-- Label -->
    <span class="text-gray-700 font-semibold group-hover:text-blue-500 transition-colors duration-200">
      {{ label }}
    </span>
  </label>
</template>
