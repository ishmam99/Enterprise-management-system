<template>
  <section class="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Trusted by Industry Leaders
        </h2>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto">
          Delivering excellence and innovation across the globe
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center group"
        >
          <div class="relative inline-block mb-4">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div class="text-5xl md:text-6xl font-bold text-white mb-2" v-html="stat.number"></div>
              <div class="text-blue-200 font-semibold text-lg">{{ stat.label }}</div>
            </div>
          </div>
          <p class="text-gray-300 text-sm max-w-xs mx-auto">{{ stat.description }}</p>
        </div>
      </div>

      <!-- Achievement Badges -->
      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(badge, index) in badges"
          :key="index"
          class="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <div class="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-3xl">
            {{ badge.icon }}
          </div>
          <h3 class="text-white font-semibold mb-2">{{ badge.title }}</h3>
          <p class="text-gray-300 text-sm">{{ badge.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    number: '500+',
    label: 'Global Clients',
    description: 'Serving companies worldwide with cutting-edge solutions'
  },
  {
    number: '25+',
    label: 'Years Experience',
    description: 'Industry expertise and proven track record'
  },
  {
    number: '1000+',
    label: 'Projects Delivered',
    description: 'Successful implementations across industries'
  },
  {
    number: '98%',
    label: 'Client Satisfaction',
    description: 'Commitment to excellence and quality service'
  }
])

const badges = ref([
  {
    icon: '🏆',
    title: 'Industry Leader',
    description: 'Recognized excellence in engineering software'
  },
  {
    icon: '🎯',
    title: 'Certified Partners',
    description: 'Official resellers of top engineering platforms'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'Cutting-edge solutions and technologies'
  },
  {
    icon: '💼',
    title: 'Enterprise Ready',
    description: 'Scalable solutions for businesses of all sizes'
  }
])
</script>

<style scoped>
/* Counter animation can be added here */
</style>

