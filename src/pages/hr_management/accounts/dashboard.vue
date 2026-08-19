<template>
  <div>
<SectionMain class="mx-10">

    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-green-500 text-center py-3 rounded-2xl px-3 font-semibold text-white"
      title="Accounts Dashboard"
      main
    >
    </SectionTitleLineWithButton>
    <div class="grid grid-cols-4 gap-4">
       <CardBoxWidget
        class="!bg-white shadow-lg"
        trend="Revenue"
        trend-type="up"
        color="text-emerald-500"
        :icon="mdiViewList"
        :number="1000"
        label="Projects"
      />
       <CardBoxWidget
        class="!bg-white shadow-lg"
        trend="Expenses"
        trend-type="up"
        color="text-red-500"
        :icon="mdiViewList"
        :number="1000"
        label="Projects"
      />
       <CardBoxWidget
        class="!bg-white shadow-lg"
        trend="Revenue"
        trend-type="up"
        color="text-emerald-500"
        :icon="mdiViewList"
        :number="1000"
        label="Projects"
      />
       <CardBoxWidget
        class="!bg-white shadow-lg"
        trend="Revenue"
        trend-type="up"
        color="text-emerald-500"
        :icon="mdiViewList"
        :number="1000"
        label="Projects"
      />
    </div>

    </SectionMain>
  </div>
</template>

<script setup>
import CardBoxWidget from '@/components/CardBoxWidget.vue';
import SectionMain from '@/components/SectionMain.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';


</script>

<style lang="scss" scoped>

</style>
