<template>
  <nav class="bg-slate-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- Logo -->
        <router-link to="/" class="flex-shrink-0 flex items-center gap-2">
          <img src="/logo-white.png" alt="Vermont Composites Logo" class="w-24 rounded bg-slate-600" />
          <span class="text-xl font-bold text-slate-100 hidden sm:block">
            Vermont Composites
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">

          <!-- Home -->
          <router-link
            to="/"
            class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            Home
          </router-link>

          <!-- Company Dropdown -->
          <div class="relative group">
            <button
              class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-1"
            >
              Company
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-1 w-56 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
            >
              <div class="py-2">
                <router-link
                  to="/home/aboutView"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5"
                >
                  About Us
                </router-link>
                <router-link
                  to="/home/leadership"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5"
                >
                  Leadership
                </router-link>
                <router-link
                  to="/home/facility"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5"
                >
                  Facilities
                </router-link>
                <router-link
                  to="/home/certifications"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors"
                >
                  Certifications
                </router-link>
              </div>
            </div>
          </div>

          <!-- Capabilities Dropdown -->
          <div class="relative group">
            <button
              class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-1"
            >
              Capabilities
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-1 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
            >
              <div class="py-2">
                <router-link
                  to="/home/composite"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5"
                >
                  Composite Capabilities
                </router-link>
                <router-link
                  to="/home/equipment"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5"
                >
                  Equipment &amp; Certificates
                </router-link>
                <router-link
                  to="/home/market"
                  class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors"
                >
                  Markets
                </router-link>
              </div>
            </div>
          </div>

          <!-- Careers (direct link) -->
          <router-link
            to="/home/careers"
            class="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            Careers
          </router-link>

          <!-- Contact Us (button) -->
          <router-link
            to="/home/contactView"
            class="ml-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-600/40"
          >
            Contact Us
          </router-link>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="md:hidden p-2 text-gray-300 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.relative.group .absolute {
  transition: all 0.2s ease-in-out;
}

.router-link-exact-active {
  color: #60a5fa !important;
  font-weight: 600;
}

@media (hover: hover) {
  .group:hover .absolute {
    opacity: 1;
    visibility: visible;
  }
}
</style>