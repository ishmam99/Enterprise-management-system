<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <HeaderService @open-demo="openDemoModal" @open-quote="openQuoteModal" />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <MscSoftwareProducts />
      <MscSoftwareDesignEngineeringSolution />
      <TypesOfAnalysis />
      
      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Purchase MSC Software?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get competitive pricing with FREE support, training, and installation included
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openQuoteModal"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Get FREE Quote</span>
          </button>
          <button
            @click="openDemoModal"
            class="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span>Request Demo</span>
          </button>
        </div>
      </div>
    </div>
    <!-- <div>
      <FreeDemonstration/>
    </div> -->

    <!-- Request Demo Modal -->
    <RequestDemoModal
      v-model="showDemoModal"
      @submit="handleDemoSubmit"
    />

    <!-- Request Quote Modal -->
    <RequestQuoteModal
      v-model="showQuoteModal"
      @submit="handleQuoteSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MscSoftwareProducts from './MscSoftwareProducts.vue'
import MscSoftwareDesignEngineeringSolution from './MscSoftwareDesignEngineeringSolution.vue'
import TypesOfAnalysis from './TypesOfAnalysis.vue'
import HeaderService from './HeaderService.vue'
import FreeDemonstration from '@/components/shared/FreeDemonstration/FreeDemonstration.vue'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)

const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
  // Here you would typically send this to your backend API
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
  // Here you would typically send this to your backend API
}
</script>
<style scoped>

</style>
