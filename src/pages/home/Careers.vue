<script setup>
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

const differentiators = [
  {
    title: 'Engineering-Driven, Not Just Fabrication',
    description: 'Many composites companies are build-to-print shops. We are engineering-led — we get involved early, helping customers optimize layups, resin systems, structural architecture, and manufacturability.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.0833 15.1999L21.2854 15.9212C21.5221 16.0633 21.5989 16.3704 21.4569 16.6072C21.4146 16.6776 21.3557 16.7365 21.2854 16.7787L12.5144 22.0412C12.1977 22.2313 11.8021 22.2313 11.4854 22.0412L2.71451 16.7787C2.47772 16.6366 2.40093 16.3295 2.54301 16.0927C2.58523 16.0223 2.64413 15.9634 2.71451 15.9212L3.9166 15.1999L11.9999 20.0499L20.0833 15.1999ZM20.0833 10.4999L21.2854 11.2212C21.5221 11.3633 21.5989 11.6704 21.4569 11.9072C21.4146 11.9776 21.3557 12.0365 21.2854 12.0787L11.9999 17.6499L2.71451 12.0787C2.47772 11.9366 2.40093 11.6295 2.54301 11.3927C2.58523 11.3223 2.64413 11.2634 2.71451 11.2212L3.9166 10.4999L11.9999 15.3499L20.0833 10.4999ZM12.5144 1.30864L21.2854 6.5712C21.5221 6.71327 21.5989 7.0204 21.4569 7.25719C21.4146 7.32757 21.3557 7.38647 21.2854 7.42869L11.9999 12.9999L2.71451 7.42869C2.47772 7.28662 2.40093 6.97949 2.54301 6.7427C2.58523 6.67232 2.64413 6.61343 2.71451 6.5712L11.4854 1.30864C11.8021 1.11864 12.1977 1.11864 12.5144 1.30864ZM11.9999 3.33233L5.88723 6.99995L11.9999 10.6676L18.1126 6.99995L11.9999 3.33233Z"></path></svg>`
  },
  {
    title: 'Real Ownership, Real Impact',
    description: 'We give our employees real ownership of their work. If you see a better way to design a tool, improve a cure cycle, reduce scrap, or enhance structural performance, we expect you to bring it forward — and we reward it.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>`
  },
  {
    title: 'The Best of Both Worlds',
    description: 'Unlike large primes, we move quickly and make decisions fast. But unlike small shops, we have disciplined processes, strong quality systems, and a long-term growth strategy. It\'s the agility of a focused operation backed by the rigor of an AS9100- and Nadcap-accredited facility.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 9H21L11 24V15H4L13 0V9ZM11 11V7.22063L7.53238 13H13V17.3944L17.263 11H11Z"></path></svg>`
  }
]
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-20 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 30% 40%, rgba(37,99,235,0.3) 0%, transparent 60%),
                          radial-gradient(circle at 70% 80%, rgba(37,99,235,0.15) 0%, transparent 50%);
      "></div>

      <div class="relative container mx-auto px-6 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-3 py-1.5 rounded-full mb-5"
        >
          <span class="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          <span class="text-xs font-medium tracking-wide text-blue-300 uppercase">
            Careers
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-black mb-5 leading-tight">
          Build Your Career at the Forefront of<br> <span class="text-blue-400">Composite Innovation</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed">
          We're not just manufacturing parts. We're engineering the next generation of lightweight, high-performance structures — and we want people who are ready to do meaningful, technically advanced work.
        </p>
      </div>
    </section>

    <!-- Opening Positions -->
    <section class="py-16 bg-slate-100/80">
      <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full mb-3"
          >
            <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            <span class="text-xs font-medium text-blue-700 uppercase tracking-wide">
              Opening Positions
            </span>
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800">
            Join Our Team
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-xl mt-2 leading-relaxed">
            Ready to join us? Browse our current openings and apply directly by visiting our jobs site below.
          </p>
          <div class="mt-5">
            <RouterLink
              to="/home/openings"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg shadow-blue-600/25 text-sm"
            >
              Browse Our Current Openings →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Vermont Composites (Dark) -->
    <section class="relative py-16 bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 opacity-30" style="
        background-image: radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 60%),
                          radial-gradient(circle at 80% 20%, rgba(37,99,235,0.08) 0%, transparent 50%);
      "></div>

      <div class="relative container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-3 py-1.5 rounded-full mb-3"
          >
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span class="text-xs font-medium tracking-wide text-blue-300 uppercase">
              Why Vermont Composites
            </span>
          </div>

          <h2 class="text-3xl md:text-4xl font-black text-white">
            What Makes Us <span class="text-blue-400">Different</span>
          </h2>

          <p class="text-base text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
            We offer something rare in composites manufacturing — the combination of engineering depth, individual ownership, and operational agility.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            v-for="item in differentiators"
            :key="item.title"
            class="bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-10 h-10 text-blue-400 mb-4" v-html="item.svg"></div>
            <h3 class="text-lg font-bold text-white mb-2">{{ item.title }}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who We Are (Light) -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full mb-3"
            >
              <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              <span class="text-xs font-medium text-blue-700 uppercase tracking-wide">
                Who We Are
              </span>
            </div>

            <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
              Advanced Composites Manufacturing for <span class="text-blue-600">Demanding Applications</span>
            </h2>

            <div class="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Vermont Composites is an advanced composites manufacturing company focused on designing, engineering, and producing high-performance composite structures for demanding applications.
              </p>
              <p>
                Our work supports industries such as <strong class="text-slate-800">aerospace, defense, and medical imaging</strong> — where weight, strength, durability, and precision matter.
              </p>
              <p>
                We don't just fabricate parts. We solve structural manufacturing and performance challenges using carbon fiber, glass fiber, and hybrid composite systems. From concept through production, we integrate design engineering, materials science, tooling automation, and quality assurance under one roof.
              </p>
            </div>
          </div>
          <div>
            <img
              src="/src/assets/vermont/vermont_3.jpg"
              alt="Vermont Composites engineering and manufacturing"
              class="rounded-xl shadow-lg w-full h-[320px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits (Dark) -->
    <section class="relative py-16 bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 opacity-30" style="
        background-image: radial-gradient(circle at 70% 50%, rgba(37,99,235,0.15) 0%, transparent 60%);
      "></div>

      <div class="relative container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-3 py-1.5 rounded-full mb-3"
          >
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span class="text-xs font-medium tracking-wide text-blue-300 uppercase">
              Benefits
            </span>
          </div>

          <h2 class="text-3xl md:text-4xl font-black text-white">
            Why You'll Love <span class="text-blue-400">Working Here</span>
          </h2>

          <p class="text-base text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
            We invest in our people with comprehensive benefits and growth opportunities.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-9 h-9 rounded-lg bg-blue-600/20 flex items-center justify-center mb-3">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1.5">{{ benefit.title }}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Get in Touch (Smart & Modern) -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto">
          <div class="grid lg:grid-cols-5 gap-10">
            <!-- Form -->
            <div class="lg:col-span-3">
              <div
                class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full mb-3"
              >
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                <span class="text-xs font-medium text-blue-700 uppercase tracking-wide">
                  Get in Touch
                </span>
              </div>

              <h2 class="text-2xl md:text-3xl font-black text-slate-800 mb-2">
                Interested in <span class="text-blue-600">Joining Our Team</span>?
              </h2>

              <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                If you're passionate about precision manufacturing and want to do meaningful work, we'd love to hear from you.
              </p>

              <form @submit.prevent="submitForm" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm" placeholder="Your name">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm" placeholder="you@example.com">
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm" placeholder="Company name">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm" placeholder="(555) 123-4567">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm" placeholder="Tell us about yourself..."></textarea>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                  <div class="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    <span class="text-sm font-medium text-gray-700">13 + 6 =</span>
                    <input type="text" class="w-12 px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center text-sm" placeholder="?">
                  </div>
                  <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg shadow-blue-600/25 text-sm">
                    Get Started
                  </button>
                </div>
              </form>
            </div>

            <!-- Location Card -->
            <div class="lg:col-span-2">
              <div class="bg-slate-50 rounded-xl p-6 border border-gray-100 h-full flex flex-col justify-center">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-800">Location</h3>
                    <p class="text-sm text-gray-600">
                      25 Performance Dr<br>
                      Bennington, VT 05201
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4 mt-5 pt-5 border-t border-gray-200">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-800">Contact</h3>
                    <p class="text-sm text-gray-600">
                      <a href="mailto:info@vermontcomposites.com" class="hover:text-blue-600 transition">info@vermontcomposites.com</a><br>
                      <a href="tel:+18024428967" class="hover:text-blue-600 transition">(802) 442-8967</a>
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-5 border-t border-gray-200">
                  <p class="text-xs text-gray-500">
                    Vermont Composites is an Equal Opportunity Employer.
                  </p>
                </div>
              </div>
            </div>
          </div>
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