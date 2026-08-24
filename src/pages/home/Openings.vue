<script setup>
const openings = [
  {
    title: 'Composite Manufacturing Engineer',
    department: 'Engineering',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Design and optimize composite manufacturing processes for aerospace and defense programs.',
    posted: '2 weeks ago'
  },
  {
    title: 'Quality Assurance Inspector',
    department: 'Quality',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Perform NDI and dimensional inspections on composite components per AS9100 and NADCAP requirements.',
    posted: '1 week ago'
  },
  {
    title: 'Senior Program Manager',
    department: 'Program Management',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Lead cross‑functional teams to deliver complex composite programs on time and within budget.',
    posted: '3 weeks ago'
  },
  {
    title: 'Composite Layup Technician',
    department: 'Production',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Hand‑layup and automated tape layup of advanced composite materials for mission‑critical components.',
    posted: '4 days ago'
  },
  {
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    location: 'Bennington, VT',
    type: 'Full‑Time',
    description: 'Manage material procurement, vendor relationships, and inventory for composite manufacturing.',
    posted: '2 weeks ago'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-16 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 30% 40%, rgba(37,99,235,0.3) 0%, transparent 60%);
      "></div>

      <div class="relative container mx-auto px-6 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-4"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Current Openings
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Join Our <span class="text-blue-400">Mission‑Driven</span> Team
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore opportunities across engineering, quality, production, and support roles.
        </p>
        <div class="mt-6">
          <RouterLink to="/home/careers" class="text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Careers
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Job Listings -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto space-y-4">
          <div
            v-for="job in openings"
            :key="job.title"
            class="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="text-xl font-bold text-slate-800">{{ job.title }}</h3>
                  <span class="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {{ job.department }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ job.location }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ job.type }}
                  </span>
                  <span class="flex items-center gap-1 text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Posted {{ job.posted }}
                  </span>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">{{ job.description }}</p>
              </div>
              <div class="flex-shrink-0">
                <RouterLink
                  :to="`/careers/apply?job=${encodeURIComponent(job.title)}`"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition text-sm w-full md:w-auto inline-block text-center"
                >
                  Apply Now
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <p class="text-gray-500 text-sm">
            Don't see the right role? We're always looking for talented individuals.
            <a href="#" class="text-blue-600 hover:underline font-medium">Send us your resume</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>