<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Resources & Downloads
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Download technical documentation, brochures, and case studies
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <!-- Product Brochure -->
        <a
          v-if="resources.brochure"
          :href="resources.brochure"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Product Brochure
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Overview of features, capabilities, and applications
              </p>
              <div class="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Technical Datasheet -->
        <a
          v-if="resources.datasheet"
          :href="resources.datasheet"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Technical Datasheet
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Detailed technical specifications and system requirements
              </p>
              <div class="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- User Guide -->
        <a
          v-if="resources.userGuide"
          :href="resources.userGuide"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                User Guide
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Comprehensive guide to getting started
              </p>
              <div class="flex items-center gap-2 text-green-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Case Studies -->
        <a
          v-if="resources.caseStudies"
          :href="resources.caseStudies"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                Case Studies
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Real-world applications and success stories from industry leaders
              </p>
              <div class="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- White Paper -->
        <a
          v-if="resources.whitePaper"
          :href="resources.whitePaper"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                White Paper
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                In-depth technical insights and analysis methodologies
              </p>
              <div class="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Release Notes -->
        <a
          v-if="resources.releaseNotes"
          :href="resources.releaseNotes"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                Release Notes
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Latest version updates, new features, and improvements
              </p>
              <div class="flex items-center gap-2 text-yellow-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Training Materials -->
        <a
          v-if="resources.trainingMaterials"
          :href="resources.trainingMaterials"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                Training Materials
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Training guides, tutorials, and learning resources
              </p>
              <div class="flex items-center gap-2 text-teal-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Technical Specifications -->
        <a
          v-if="resources.technicalSpecs"
          :href="resources.technicalSpecs"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border-2 border-rose-200 hover:border-rose-400 hover:shadow-xl transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                Technical Specifications
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                Detailed technical specifications and requirements
              </p>
              <div class="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                <span>Download PDF</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- Note about PDFs -->
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">
          <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          All documents are in PDF format. Need help? <a href="/contact" class="text-blue-600 hover:underline">Contact us</a> for assistance.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  resources: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
