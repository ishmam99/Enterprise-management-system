<script setup>
import { mdiCog } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTagTrend from '@/components/PillTagTrend.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  number: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  },
  textColor: {
    type: String,
    default: null
  },
  stringData: {
    type: String,
    default: null
  }
})
</script>

<template>
  <CardBox>
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <PillTagTrend :trend="trend" :trend-type="trendType" small />
      <!-- <BaseButton :icon="mdiCog" icon-w="w-4" icon-h="h-4" color="lightDark" small /> -->
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <h3
          class="text-xl leading-tight dark:text-slate-400"
          :class="textColor ? textColor : `text-gray-500 `"
        >
          {{ label }}
        </h3>

        <h1 v-if="stringData" class="text-xl leading-tight font-semibold">
          {{ stringData }}
        </h1>

        <h1 v-else class="text-3xl leading-tight font-semibold">
          <NumberDynamic :value="number" :prefix="prefix" :suffix="suffix" />
        </h1>
      </div>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    </BaseLevel>
  </CardBox>
</template>
