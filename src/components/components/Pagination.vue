<template>
  <div class="flex justify-center items-center gap-5 mt-1 p-2">
    <button :class="currentPage === 1 ? 'opacity-50' : ''" @click="previousPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="rgba(69,135,206,1)"
      >
        <path d="M8 12L14 6V18L8 12Z"></path>
      </svg>
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :class="currentPage === totalPages ? 'opacity-50' : ''" @click="nextPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="rgba(69,135,206,1)"
      >
        <path d="M16 12L10 18V6L16 12Z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const currentPage = ref(props.modelValue)

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('update:modelValue', currentPage.value)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('update:modelValue', currentPage.value)
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    currentPage.value = newValue
  }
)
</script>
