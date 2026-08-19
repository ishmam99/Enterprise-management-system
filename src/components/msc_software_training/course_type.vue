<template>
  <section class="relative py-4 overflow-hidden mb-4 rounded-xl">
    <!-- Animated background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Header with gradient text -->
      <div class="text-center mb-8">
        <div class="inline-block">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/30">
            <span class="mr-1">✨</span> Learning Paths
          </span>
        </div>
        <h2 class="pt-r pb-2 text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300">
          Training Options
        </h2>
        <p class="pt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose the training format that best fits your learning needs.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <!-- Individual Training Card -->
  <div class="group relative bg-gradient-to-br from-blue-100/90 to-cyan-100/90 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
    <div class="relative p-6">
      <!-- Icon -->
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center mb-5 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
        <span class="text-3xl">👨‍🏫</span>
      </div>
      
      <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        Individual Training
      </h3>
      
      <ul class="space-y-2 mb-5">
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 flex-shrink-0 mt-0.5"></span>
          <span>One-on-one instructor-led sessions</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Personalized learning</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Flexible scheduling options</span>
        </li>
      </ul>
      
      <div class="pt-3 border-t border-gray-300/50 dark:border-gray-600/50">
        <a href="#" class="inline-flex items-center text-blue-700 dark:text-blue-300 font-medium group/link hover:gap-2 transition-all text-sm">
          Explore individual plan
          <svg class="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Group Training Card -->
  <div class="group relative bg-gradient-to-br from-emerald-100/90 to-green-100/90 dark:from-emerald-950/40 dark:to-green-950/40 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
    <div class="relative p-6">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center mb-5 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
        <span class="text-3xl">👥</span>
      </div>
      
      <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
        Group Training
      </h3>
      
      <ul class="space-y-2 mb-5">
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Learn alongside other participants</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Scheduled after minimum enrollment</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Cost-effective training option</span>
        </li>
      </ul>
      
      <div class="pt-3 border-t border-gray-300/50 dark:border-gray-600/50">
        <a href="#" class="inline-flex items-center text-emerald-700 dark:text-emerald-300 font-medium group/link hover:gap-2 transition-all text-sm">
          Explore group plan
          <svg class="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Company Training Card -->
  <div class="group relative bg-gradient-to-br from-purple-100/90 to-pink-100/90 dark:from-purple-950/40 dark:to-pink-950/40 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
    <div class="relative p-6">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30 flex items-center justify-center mb-5 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
        <span class="text-3xl">🏢</span>
      </div>
      
      <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        Company Training
      </h3>
      
      <ul class="space-y-2 mb-5">
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-purple-500 shadow-md shadow-purple-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Train your engineering team together</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-purple-500 shadow-md shadow-purple-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Customized schedule</span>
        </li>
        <li class="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm">
          <span class="inline-flex w-5 h-5 rounded-full bg-purple-500 shadow-md shadow-purple-500/30 flex-shrink-0 mt-0.5"></span>
          <span>Online or onsite delivery available</span>
        </li>
      </ul>
      
      <div class="pt-3 border-t border-gray-300/50 dark:border-gray-600/50">
        <a href="#" class="inline-flex items-center text-purple-700 dark:text-purple-300 font-medium group/link hover:gap-2 transition-all text-sm">
          Explore company plan
          <svg class="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
    </div>
  </section>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>