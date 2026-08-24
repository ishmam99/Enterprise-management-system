```vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans antialiased">
    <!-- HERO -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6 py-20 md:py-28 lg:px-20"
    >
      <!-- Animated floating orbs -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-20 -left-20 h-64 w-64 animate-float rounded-full bg-purple-300 opacity-20 blur-3xl"
        ></div>
        <div
          class="absolute top-1/2 -right-20 h-80 w-80 animate-float-delayed rounded-full bg-pink-300 opacity-20 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-20 left-1/2 h-72 w-72 animate-float-slow rounded-full bg-indigo-300 opacity-20 blur-3xl"
        ></div>
      </div>
      <!-- Subtle technical pattern -->
      <div class="absolute inset-0 opacity-[0.04]">
        <div
          class="h-full w-full"
          style="background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, #4f46e5 39px, #4f46e5 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #4f46e5 39px, #4f46e5 40px);"
        ></div>
      </div>
      <div class="relative mx-auto max-w-7xl">
        <div class="flex max-w-4xl flex-col items-start">
          <span
            class="mb-4 inline-flex animate-pulse items-center gap-2 rounded-full border border-indigo-300 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 backdrop-blur-sm"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            Tooling & Equipment
          </span>
          <h1
            class="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Advanced Equipment.
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >Built for Precision.</span
            >
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
            From composite layup and curing to precision machining, inspection, and mechanical testing, our
            manufacturing infrastructure is built to support demanding mission-critical applications.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <router-link
              to="/home/contactView"
              class="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span class="relative z-10">Contact Our Team</span>
              <span
                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:translate-x-0"
              ></span>
            </router-link>
            <router-link
              to="/home/composite"
              class="group relative overflow-hidden rounded-full border border-slate-300 bg-white/80 px-8 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50/80 hover:shadow-md"
            >
              <span class="relative z-10">Explore Capabilities</span>
              <span
                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-100 to-purple-100 transition-transform duration-500 group-hover:translate-x-0"
              ></span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CAPABILITY OVERVIEW -->
    <section class="border-b border-indigo-200/50 bg-white/60 px-6 py-12 backdrop-blur-sm lg:px-20">
      <div class="mx-auto max-w-7xl">
        <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Manufacturing Capabilities
            </h2>
            <p class="mt-1 text-slate-600">
              An integrated manufacturing environment supporting composite production from layup through inspection and
              testing.
            </p>
          </div>
        </div>
        <div
          class="no-scrollbar -mx-4 flex overflow-x-auto gap-2 px-4 pb-4 md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-5"
        >
          <a
            v-for="(cap, idx) in capabilities"
            :key="idx"
            :href="'#' + cap.id"
            class="group block flex-shrink-0 rounded-xl border border-indigo-200/50 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-lg"
          >
            <span class="mr-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >0{{ idx + 1 }}</span
            >
            {{ cap.title }}
          </a>
        </div>
      </div>
    </section>

    <!-- CAPABILITY SECTIONS -->
    <section
      v-for="(cap, idx) in capabilities"
      :key="idx"
      :id="cap.id"
      class="group border-b border-indigo-200/30 bg-white/40 px-6 py-16 backdrop-blur-sm transition-all duration-500 hover:bg-white/60 md:py-24 lg:px-20"
      :class="idx % 2 === 0 ? 'from-indigo-50/20' : 'from-purple-50/20'"
    >
      <div class="mx-auto max-w-7xl">
        <div
          :class="[
            'grid items-center gap-12 lg:grid-cols-2',
            cap.imagePosition === 'right' ? 'lg:flex-row-reverse' : '',
          ]"
        >
          <!-- Image -->
          <div :class="['order-1', cap.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1']">
            <div
              class="group/image relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-indigo-200/50 bg-slate-100 shadow-lg transition-all duration-500 hover:shadow-2xl"
            >
              <img
                :src="cap.image"
                :alt="`${cap.title} equipment at Vermont Composites`"
                class="h-full w-full object-cover transition-all duration-700 group-hover/image:scale-110"
              />
              <!-- Gradient overlay on hover -->
              <div
                class="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/20 opacity-0 transition-opacity duration-500 group-hover/image:opacity-100"
              ></div>
              <!-- Glow border -->
              <div
                class="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover/image:opacity-30"
              ></div>
            </div>
          </div>

          <!-- Content -->
          <div :class="['order-2', cap.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2']">
            <div class="flex items-center gap-4">
              <span class="text-4xl font-bold text-indigo-300/50 transition-all duration-300 group-hover:text-indigo-400"
                >{{ String(idx + 1).padStart(2, '0') }}</span
              >
              <span class="h-px w-8 bg-gradient-to-r from-indigo-300 to-purple-300"></span>
              <h3
                class="text-3xl font-bold tracking-tight text-slate-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent md:text-4xl"
              >
                {{ cap.title }}
              </h3>
            </div>
            <p v-if="cap.description" class="mt-3 text-slate-600">{{ cap.description }}</p>

            <!-- Capability items -->
            <div class="mt-8 space-y-1">
              <div
                v-for="(item, itemIdx) in cap.items"
                :key="itemIdx"
                class="group/item flex cursor-default items-center justify-between rounded-xl border-b border-indigo-100/50 px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 hover:pl-6"
              >
                <span class="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span
                    class="text-xs font-mono font-light text-indigo-300 transition-colors duration-300 group-hover/item:text-indigo-500"
                    >{{ String(itemIdx + 1).padStart(2, '0') }}</span
                  >
                  <span>{{ item }}</span>
                </span>
                <span
                  class="text-indigo-300 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-indigo-500"
                  >→</span
                >
              </div>
            </div>

            <!-- Special layout for Cure section -->
            <div v-if="cap.id === 'cure'" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                v-for="(spec, specIdx) in cap.specs"
                :key="specIdx"
                class="group/spec rounded-xl border border-indigo-200/50 bg-gradient-to-br from-white/80 to-indigo-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-200/50"
              >
                <div class="text-xs font-semibold uppercase tracking-wider text-indigo-500">{{ spec.label }}</div>
                <div class="mt-1 text-lg font-bold text-slate-800">{{ spec.value }}</div>
              </div>
            </div>

            <!-- Special layout for Paint -->
            <div v-if="cap.id === 'paint'" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                v-for="(booth, boothIdx) in cap.booths"
                :key="boothIdx"
                class="group/booth rounded-xl border border-indigo-200/50 bg-gradient-to-br from-white/80 to-purple-50/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50"
              >
                <div
                  class="text-2xl font-bold transition-all duration-300 group-hover/booth:bg-gradient-to-r group-hover/booth:from-indigo-600 group-hover/booth:to-purple-600 group-hover/booth:bg-clip-text group-hover/booth:text-transparent"
                >
                  {{ String(booth.count).padStart(2, '0') }}
                </div>
                <div class="text-sm font-medium text-slate-700">{{ booth.label }}</div>
              </div>
            </div>

            <!-- Special layout for NDI -->
            <div v-if="cap.id === 'ndi'" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                v-for="(tech, techIdx) in cap.techs"
                :key="techIdx"
                class="group/tech rounded-xl border border-indigo-200/50 bg-gradient-to-br from-white/80 to-pink-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-200/50"
              >
                <div
                  class="text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover/tech:bg-gradient-to-r group-hover/tech:from-indigo-600 group-hover/tech:to-pink-600 group-hover/tech:bg-clip-text group-hover/tech:text-transparent"
                >
                  {{ tech.label }}
                </div>
                <div class="mt-0.5 text-sm text-slate-600">{{ tech.detail }}</div>
              </div>
            </div>

            <!-- Special layout for Mechanical Testing -->
            <div v-if="cap.id === 'mechanical'" class="mt-8 flex flex-wrap gap-2">
              <span
                v-for="(test, testIdx) in cap.tests"
                :key="testIdx"
                class="group/test rounded-full border border-indigo-200/50 bg-gradient-to-br from-white/80 to-indigo-50/50 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-lg hover:shadow-indigo-200/50"
                >{{ test }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative px-6 py-20 md:py-28 lg:px-20">
      <!-- Animated background -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -left-40 h-96 w-96 animate-float rounded-full bg-indigo-300 opacity-10 blur-3xl"
        ></div>
        <div
          class="absolute top-1/2 -right-40 h-96 w-96 animate-float-delayed rounded-full bg-purple-300 opacity-10 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-40 left-1/3 h-96 w-96 animate-float-slow rounded-full bg-pink-300 opacity-10 blur-3xl"
        ></div>
      </div>
      <div
        class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/80 p-12 text-center shadow-xl backdrop-blur-sm md:p-16"
      >
        <div class="absolute inset-0 opacity-[0.03]"
          style="background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, #4f46e5 39px, #4f46e5 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #4f46e5 39px, #4f46e5 40px);">
        </div>
        <div class="relative">
          <h2
            class="text-3xl font-bold tracking-tight text-slate-900 transition-all duration-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent md:text-4xl lg:text-5xl"
          >
            Built for Your Most Demanding Programs.
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore how Vermont Composites' integrated manufacturing capabilities can support your next composite
            program.
          </p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <router-link
            to="/home/contactView"
              class="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span class="relative z-10">Contact Our Team</span>
              <span
                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:translate-x-0"
              ></span>
            </router-link>
            <router-link
            to="/home/composite"
              class="group relative overflow-hidden rounded-full border border-slate-300 bg-white/80 px-10 py-4 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50/80 hover:shadow-md"
            >
              <span class="relative z-10">Explore Our Capabilities</span>
              <span
                class="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-100 to-purple-100 transition-transform duration-500 group-hover:translate-x-0"
              ></span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const capabilities = [
  {
    id: 'core',
    title: 'Core',
    description: 'Precision tooling and machining capabilities.',
    items: ['5-Axis CNC', '3-Axis CNC', 'Dual Head 3-Axis CNC'],
    imagePosition: 'left',
    image: '/src/assets/vermont/Core.jpg'
  },
  {
    id: 'layup',
    title: 'Layup',
    description: 'Advanced composite layup environments.',
    items: ['Clean Rooms', 'Automated Ply Cutters', 'Virtek Laser Ply Locating'],
    imagePosition: 'right',
    image: '/src/assets/vermont/Layup.jpg'
  },
  {
    id: 'cure',
    title: 'Cure',
    description: 'Controlled curing for composite parts.',
    items: ['Autoclaves', 'Ovens', 'Presses'],
    specs: [
      { label: 'Autoclaves', value: '10 ft dia. × 30 ft max' },
      { label: 'Ovens', value: 'Up to 8 × 10 × 12 ft' },
      { label: 'Presses', value: '150-ton max' }
    ],
    imagePosition: 'left',
    image: '/src/assets/vermont/Cure.jpg'
  },
  {
    id: 'cnc',
    title: 'CNC',
    description: 'Precision CNC machining centers.',
    items: ['5-Axis CNC', '3-Axis CNC', 'Machine Centers — Tooling'],
    imagePosition: 'right',
    image: '/src/assets/vermont/CNC.jpg'
  },
  {
    id: 'assembly',
    title: 'Assembly',
    description: 'Integrated assembly and finishing.',
    items: ['2x EMA Areas', 'Automated Grit Blast', 'Automated Part Wash', 'Reticulation'],
    imagePosition: 'left',
    image: '/src/assets/vermont/Assembly.jpg'
  },
  {
    id: 'paint',
    title: 'Paint',
    description: 'Controlled painting and finishing booths.',
    items: ['2x Paint Booth', 'Dry Booth', '3x Finishing Booths'],
    booths: [
      { count: 2, label: 'Paint Booths' },
      { count: 1, label: 'Dry Booth' },
      { count: 3, label: 'Finishing Booths' }
    ],
    imagePosition: 'right',
    image: '/src/assets/vermont/Paint.jpg'
  },
  {
    id: 'inspection',
    title: 'Inspection',
    description: 'Dimensional verification and quality control.',
    items: ['Hand Inspection', '2x Fixed-Based CMM', '3x Portable CMM', 'Laser Scan', 'Blue Light Inspection'],
    imagePosition: 'left',
    image: '/src/assets/vermont/Inspection.jpg'
  },
  {
    id: 'ndi',
    title: 'NDI',
    description: 'Non-destructive inspection capabilities.',
    items: ['C-Scan — 7-Axis, 30 ft', 'A-Scan', 'X-Ray / Attenuation', 'Level 1, 2, 3 Onsite'],
    techs: [
      { label: 'C-Scan', detail: '7-Axis · 30 ft' },
      { label: 'A-Scan', detail: 'Ultrasonic' },
      { label: 'X-Ray', detail: 'Attenuation' },
      { label: 'Onsite Certification', detail: 'Level 1 · Level 2 · Level 3' }
    ],
    imagePosition: 'right',
    image: '/src/assets/vermont/NDI .jpg'
  },
  {
    id: 'mechanical',
    title: 'Mechanical Testing',
    description: 'Comprehensive mechanical property testing.',
    items: ['Compression', 'Fatigue', 'Flexural', 'Shear', 'Tensile'],
    tests: ['Compression', 'Fatigue', 'Flexural', 'Shear', 'Tensile'],
    imagePosition: 'left',
    image: '/src/assets/vermont/Mechanical Testing.jpg'
  }
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30px, 30px) scale(1.2);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-20px, -20px) scale(1.05);
  }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}
</style>
```