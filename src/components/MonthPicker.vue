<!-- src/components/MonthPicker.vue -->
<template>
  <div class="relative w-full max-w-xs">
    <!-- Popover Trigger -->
    <Popover class="relative">
      <!-- {{!-- Button --}} -->
      <PopoverButton
        class="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm"
      >
        <span class="text-sm font-medium text-gray-900 truncate">
          {{ displayValue || 'Select month & year' }}
        </span>
        <div class="flex items-center gap-1">
          <CalendarIcon class="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <ChevronDownIcon class="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-all duration-200 group-data-[open]:rotate-180" />
        </div>
      </PopoverButton>

      <!-- {{!-- Panel --}} -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform translate-y-1 opacity-0 scale-95"
        enter-to-class="transform translate-y-0 opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform translate-y-0 opacity-100 scale-100"
        leave-to-class="transform translate-y-1 opacity-0 scale-95"
      >
        <PopoverPanel
          class="absolute left-0 z-50 mt-2 w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100/50 backdrop-blur-sm"
        >
          <div class="p-5 space-y-4">
            <!-- Year Nav -->
            <div class="flex items-center justify-between">
              <button
                @click="prevYear"
                type="button"
                class="p-2 rounded-xl hover:bg-indigo-50/50 hover:text-indigo-700 transition-all duration-200 flex items-center gap-1"
              >
                <ChevronLeftIcon class="h-5 w-5" />
                <span class="text-xs font-medium">Prev</span>
              </button>

              <div class="text-center">
                <span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {{ currentYear }}
                </span>
                <div class="text-xs text-gray-500 mt-1">Year</div>
              </div>

              <button
                @click="nextYear"
                type="button"
                class="p-2 rounded-xl hover:bg-indigo-50/50 hover:text-indigo-700 transition-all duration-200 flex items-center gap-1 justify-end"
              >
                <span class="text-xs font-medium">Next</span>
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Months Grid -->
            <div class="grid grid-cols-3 gap-2 pt-2">
              <button
                v-for="month in months"
                :key="month.value"
                @click="selectMonth(month.value)"
                type="button"
                class="group flex flex-col items-center gap-1 p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 hover:shadow-sm border-2 border-transparent hover:border-indigo-200"
                :class="[
                  month.value === selectedMonthNumber
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg border-indigo-400 font-semibold scale-105'
                    : 'text-gray-700 hover:text-indigo-700'
                ]"
              >
                <span>{{ month.short }}</span>
                <span class="text-xs opacity-75 group-hover:opacity-100 transition-opacity">{{ month.label }}</span>
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="pt-3 border-t border-gray-100 flex gap-2">
              <button
                @click="selectCurrentMonth"
                type="button"
                class="flex-1 py-2 px-3 text-xs bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-all text-center"
              >
                This Month
              </button>
              <button
                @click="$emit('clear')"
                type="button"
                class="flex-1 py-2 px-3 text-xs bg-gray-50 text-gray-500 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
              >
                Clear
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
  TransitionChild,
  Transition
} from '@headlessui/vue'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from 'lucide-vue-next'
import { format, addYears, subYears, setMonth, getMonth, getYear, startOfMonth } from 'date-fns'

// Props & Emits
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'clear'])

// State
const selected = ref(props.modelValue)
const currentDate = ref(new Date())
const currentYear = ref(new Date().getFullYear())

// Update initial state from prop
onMounted(() => {
  if (props.modelValue) {
    const date = new Date(props.modelValue + '-01')
    currentDate.value = date
    currentYear.value = getYear(date)
  }
})

const months = [
  { value: 0, short: 'JAN', label: 'January' },
  { value: 1, short: 'FEB', label: 'February' },
  { value: 2, short: 'MAR', label: 'March' },
  { value: 3, short: 'APR', label: 'April' },
  { value: 4, short: 'MAY', label: 'May' },
  { value: 5, short: 'JUN', label: 'June' },
  { value: 6, short: 'JUL', label: 'July' },
  { value: 7, short: 'AUG', label: 'August' },
  { value: 8, short: 'SEP', label: 'September' },
  { value: 9, short: 'OCT', label: 'October' },
  { value: 10, short: 'NOV', label: 'November' },
  { value: 11, short: 'DEC', label: 'December' }
]

// Computed
const selectedMonthNumber = computed(() => {
  return selected.value ? getMonth(new Date(selected.value + '-01')) : null
})

const displayValue = computed(() => {
  return selected.value
    ? format(new Date(selected.value + '-01'), 'MMMM yyyy')
    : ''
})

// Methods
const selectMonth = (monthIndex) => {
  const newDate = setMonth(currentDate.value, monthIndex)
  const formatted = format(newDate, 'yyyy-MM')
  selected.value = formatted
  emit('update:modelValue', formatted)
}

const prevYear = () => {
  currentDate.value = subYears(currentDate.value, 1)
  currentYear.value = getYear(currentDate.value)
}

const nextYear = () => {
  currentDate.value = addYears(currentDate.value, 1)
  currentYear.value = getYear(currentDate.value)
}

const selectCurrentMonth = () => {
  const now = startOfMonth(new Date())
  selected.value = format(now, 'yyyy-MM')
  emit('update:modelValue', selected.value)
  currentDate.value = now
  currentYear.value = getYear(now)
}

// Watch for v-model updates
watch(() => props.modelValue, (newVal) => {
  if (newVal !== selected.value) {
    selected.value = newVal
    if (newVal) {
      const date = new Date(newVal + '-01')
      currentDate.value = date
      currentYear.value = getYear(date)
    }
  }
}, { immediate: true })
</script>
