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

const benefits = [
  {
    title: 'Competitive Compensation',
    description: 'We offer market‑competitive salaries and performance‑based bonuses.'
  },
  {
    title: 'Comprehensive Health Benefits',
    description: 'Medical, dental, and vision insurance with low deductibles and employer contributions.'
  },
  {
    title: '401(k) with Match',
    description: 'Plan for your future with our 401(k) program and company matching contributions.'
  },
  {
    title: 'Professional Development',
    description: 'Tuition reimbursement, certification support, and ongoing training opportunities.'
  },
  {
    title: 'Paid Time Off',
    description: 'Generous vacation, sick leave, and paid holidays to maintain work‑life balance.'
  },
  {
    title: 'A Mission‑Driven Culture',
    description: 'Work on programs that make a real difference – in defense, space exploration, and healthcare.'
  }
]
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 30% 40%, rgba(37,99,235,0.3) 0%, transparent 60%),
                          radial-gradient(circle at 70% 80%, rgba(37,99,235,0.15) 0%, transparent 50%);
      "></div>

      <div class="relative container mx-auto px-6 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-6"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Join Our Team
          </span>
        </div>

        <h1 class="text-5xl md:text-6xl font-black mb-6">
          Build the Future with
          <span class="text-blue-400">Advanced Composites</span>
        </h1>

        <p class="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
          At Vermont Composites, we're looking for passionate, skilled individuals who want to
          work on the world's most critical aerospace, defense, and medical imaging programs.
        </p>
      </div>
    </section>

    <!-- Why Work Here -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700">
              Why Vermont Composites
            </span>
          </div>

          <h2 class="text-4xl font-black text-slate-800 mb-4">
            Join a Team That <span class="text-blue-600">Makes a Difference</span>
          </h2>

          <p class="text-gray-600">
            When you work with us, you're not just building parts – you're contributing to
            programs that protect our nation, explore space, and save lives.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:border-blue-400 hover:shadow-xl transition"
          >
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Current Openings -->
    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div
            class="inline-flex items-center gap-2 bg-slate-200/50 border border-slate-300 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
            <span class="text-sm font-medium text-slate-700">
              Current Openings
            </span>
          </div>

          <h2 class="text-4xl font-black text-slate-800 mb-4">
            Join Our <span class="text-blue-600">Mission‑Driven</span> Team
          </h2>

          <p class="text-gray-600">
            Explore opportunities across engineering, quality, production, and support roles.
          </p>
        </div>

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
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition text-sm w-full md:w-auto">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Note about future openings -->
        <div class="text-center mt-10">
          <p class="text-gray-500 text-sm">
            Don't see the right role? We're always looking for talented individuals.
            <a href="#" class="text-blue-600 hover:underline font-medium">Send us your resume</a>.
          </p>
        </div>
      </div>
    </section>

    <!-- Culture & Mission -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700">
                Our Culture
              </span>
            </div>

            <h2 class="text-4xl font-black text-slate-800 mb-6">
              Where Passion Meets <span class="text-blue-600">Precision</span>
            </h2>

            <p class="text-gray-600 mb-4 leading-relaxed">
              At Vermont Composites, we believe that great teams build great products.
              Our culture is built on mutual respect, continuous improvement, and a shared
              commitment to excellence.
            </p>

            <p class="text-gray-600 mb-4 leading-relaxed">
              We invest in our people – through training, mentorship, and opportunities to
              grow. Whether you're a seasoned engineer or just starting your career, you'll
              find a supportive environment where your contributions matter.
            </p>

            <p class="text-gray-600 leading-relaxed">
              Join us and work alongside industry experts on programs that push the boundaries
              of what's possible with advanced composites.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200"
              alt="Vermont Composites team and facility"
              class="rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-20 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.4) 0%, transparent 60%);
      "></div>

      <div class="relative container mx-auto px-6 text-center">
        <h2 class="text-4xl font-black mb-4">
          Ready to Build <span class="text-blue-400">Something Extraordinary</span>?
        </h2>

        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Take the next step in your career. Apply today and become part of a team that's
          shaping the future of composite manufacturing.
        </p>

        <div class="flex flex-wrap gap-4 justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30">
            View All Openings
          </button>
          <router-link
            to="/home/contactView"
            class="border border-white/30 hover:bg-white hover:text-slate-900 px-10 py-4 rounded-xl font-bold transition"
          >
            Contact HR
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-slate-50 {
  background-color: #f8fafc;
}
</style>