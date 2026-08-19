<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <HeaderService @open-demo="openDemoModal" @open-quote="openQuoteModal" />
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <!-- Software Services Overview -->
      <SoftwareServices />
      
      <!-- Engineering Services Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EngineeringAnalysis />
        <EngineeringDesign />
      </div>

      <!-- Why Choose Us Section -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-8 md:p-10">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
                Why Choose Hi-Tech SoftSys?
              </h2>
              <p class="text-blue-200">Your trusted partner for engineering excellence</p>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(benefit, index) in benefits" :key="index" class="text-center group">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="benefit.icon"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
              <p class="text-gray-600 text-sm">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Stories / Testimonials -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 p-8 md:p-10">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
                Client Success Stories
              </h2>
              <p class="text-emerald-200">Real results from real clients</p>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(story, index) in successStories" :key="index" class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ story.company.charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ story.company }}</h4>
                  <p class="text-sm text-gray-600">{{ story.industry }}</p>
                </div>
              </div>
              <p class="text-gray-700 mb-4 italic">"{{ story.testimonial }}"</p>
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-600">
                  <span class="font-semibold">{{ story.result }}</span>
                </div>
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Engineering Process?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get expert software services with FREE 24/7 support, training, and implementation assistance
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
import SoftwareServices from './SoftwareServiceComponent.vue'
import EngineeringAnalysis from './EngineeringAnalysis.vue'
import EngineeringDesign from './EngineeringDesign.vue'
import HeaderService from './HeaderService.vue'
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

const benefits = [
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical assistance from our expert engineers',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z'
  },
  {
    title: 'Expert Training',
    description: 'Comprehensive training programs tailored to your team\'s needs',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    title: 'Cost Effective',
    description: 'Competitive pricing with transparent costs and no hidden fees',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Industry Expertise',
    description: 'Deep knowledge across 10+ industries and specialized applications',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
  }
]

const successStories = [
  {
    company: 'Aerospace Dynamics',
    industry: 'Aerospace',
    testimonial: 'Hi-Tech SoftSys transformed our simulation capabilities. Their MSC Nastran implementation reduced our analysis time by 60%.',
    result: '60% faster analysis',
    rating: 5
  },
  {
    company: 'AutoTech Solutions',
    industry: 'Automotive',
    testimonial: 'The training program was exceptional. Our team was productive within weeks, not months. Outstanding support!',
    result: 'Weeks to productivity',
    rating: 5
  },
  {
    company: 'EnergyCorp',
    industry: 'Energy',
    testimonial: 'Cost-effective solution with incredible ROI. The 24/7 support has been invaluable for our global operations.',
    result: 'Exceptional ROI',
    rating: 5
  }
]
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>
