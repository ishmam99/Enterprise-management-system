<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24"
    >
      <div
        class="absolute inset-0 opacity-20"
        style="
          background-image: radial-gradient(
            circle at 30% 40%,
            rgba(37, 99, 235, 0.3) 0%,
            transparent 60%
          );
        "
      ></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-6"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            About Vermont Composites
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Precision Composites
          <span class="text-blue-400">for Critical Missions</span>
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          Serving aerospace, defense, and medical imaging since 1980 –
          delivering reliability where it matters most.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700">Our Story</span>
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              More Than <span class="text-blue-600">40 Years</span> of
              Excellence
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Vermont Composites was founded in 1980 in Bennington, Vermont,
              with a simple mission: to produce the highest‑quality composite
              structures for demanding aerospace and defense programs. What
              began as a small machine shop has grown into a 100,000 sq. ft.
              state‑of‑the‑art facility, serving the world's leading prime
              contractors.
            </p>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Our vertically integrated capabilities – from engineering and
              tooling design through production, assembly, and testing – give us
              unmatched control over quality and delivery. We are AS9100
              certified and NADCAP accredited, and our components fly on
              platforms like the F‑35, Orion, P‑8, and more.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Today, we're proud to be a trusted partner for missions that
              protect our nation, explore space, and save lives – and we're just
              getting started.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200"
              alt="Vermont Composites manufacturing facility"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Our Mission & Values -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700">Core Values</span>
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Our Mission &amp; Values
          </h2>
          <p class="text-xl text-gray-600 mt-2">What drives us every day</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-400"
          >
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Quality First</h3>
            <p class="text-gray-600">
              We never compromise on quality. Every part is inspected and
              validated to meet the most rigorous aerospace and defense
              standards.
            </p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-400"
          >
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-microchip"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Engineering Excellence
            </h3>
            <p class="text-gray-600">
              Our team combines deep composites expertise with advanced design
              and analysis tools to solve the toughest engineering challenges.
            </p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-400"
          >
            <div class="text-blue-600 text-4xl mb-4">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Mission‑Critical Reliability
            </h3>
            <p class="text-gray-600">
              We build components that perform without fail in the most extreme
              environments – because lives and missions depend on them.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Meet the Leadership -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
            <span class="text-sm font-medium text-slate-700"
              >Leadership Team</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Meet Our <span class="text-blue-600">Leadership</span>
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Experienced professionals dedicated to your success
          </p>
        </div>

        <!-- Cards generated from data -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(leader, index) in leaders"
            :key="leader.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            <div
              class="w-1/2 rounded-full flex items-center justify-center mx-auto bg-slate-200 overflow-hidden mt-4"
            >
              <img
                :src="leader.image"
                :alt="leader.name"
                class="w-full h-full object-cover object-center rounded-full"
              />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-slate-800">
                {{ leader.name }}
              </h3>
              <p class="text-blue-600 font-semibold mb-2">
                {{ leader.title }}
              </p>

              <!-- Accordion -->
              <div class="mt-3 border-t border-gray-100 pt-3">
                <button
                  @click="toggleAccordion(index)"
                  class="flex items-center justify-between w-full text-left text-sm font-medium text-slate-700 hover:text-blue-600 transition"
                >
                  <span>About {{ leader.name.split(' ')[0] }}</span>
                  <svg
                    class="w-4 h-4 transition-transform duration-300"
                    :class="{ 'rotate-180': accordionOpen[index] }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <transition
                  name="accordion"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @before-leave="beforeLeave"
                  @leave="leave"
                >
                  <div v-show="accordionOpen[index]" class="accordion-content">
                    <div
                      class="mt-3 text-sm text-gray-600 leading-relaxed p-3 rounded-lg transition-colors"
                      :class="
                        accordionOpen[index]
                          ? 'bg-blue-50/80 border border-blue-100/50'
                          : ''
                      "
                    >
                      <p
                        v-for="(paragraph, pIdx) in leader.bio"
                        :key="pIdx"
                        class="mb-2 last:mb-0"
                      >
                        {{ paragraph }}
                      </p>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-black text-blue-400">40+</div>
            <div class="text-xl text-gray-300">Years of Excellence</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">100K</div>
            <div class="text-xl text-gray-300">Sq. Ft. Facility</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">7+</div>
            <div class="text-xl text-gray-300">Leading Platforms</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">99.8%</div>
            <div class="text-xl text-gray-300">On‑Time Delivery</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
          Ready to Partner with
          <span class="text-blue-600">Vermont Composites</span>?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          From concept to production, we deliver the performance and reliability
          your mission demands.
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30"
        >
          Contact Our Team
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Accordion state: one boolean per leader
const accordionOpen = ref([]);

// Toggle function by index
const toggleAccordion = (index) => {
  accordionOpen.value[index] = !accordionOpen.value[index];
};

// Leadership data
const leaders = [
  {
    id: 1,
    name: "Timothy Tifft",
    title: "General Manager",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Timothy-Tiftt.jpg",
    bio: [
      "Timothy Tifft is an accomplished senior operations executive currently serving as General Manager of Vermont Composites. He brings extensive experience in operational leadership and supply chain management, with proven ability to drive performance, optimize processes and lead high performing teams.",
      "Prior to his current role Mr. Tifft held key leadership positions across multiple industries, including automotive, advanced composites, and medical manufacturing. His experience includes leadership roles with NSK Steering Systems, Plasan North America, and Philips Medical. Mr. Tifft earned a Bachelor of Science in Business Administration, graduating summa cum laude, from Southern Vermont College."
    ]
  },
  {
    id: 2,
    name: "Anthony Thayne",
    title: "Director of Operations",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Anthony-Thane.jpg",
    bio: [
      "Anthony Thayne is a results-driven Director of Operations with extensive experience leading cross-functional teams, optimizing complex processes, and driving sustainable business growth.",
      "He has held Director roles in different industries including automotive with high performance carbon fiber, defense industry dealing with Kevlar and fiberglass applications for ballistic panels, and currently in aerospace with Vermont Composites. Known for his clear communication style and disciplined execution, Anthony builds high-performing teams by empowering leaders, developing talent, and promoting continuous improvement."
    ]
  },
  {
    id: 3,
    name: "Thomas Ezzo",
    title: "Director, Quality & Facilities",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Tom-Ezzo.jpg",
    bio: [
      "Thomas Ezzo is an accomplished engineering and facilities leader with extensive experience driving operational excellence, manufacturing innovation, and strategic capital execution.",
      "With over two decades of progressive leadership experience, Thomas has held senior roles including Automation Team Leader and Program Manager at Philips Healthcare, Technical Program Manager at Plasan North America, and Engineering Process Improvement Team Supervisor at NSK Steering Systems America. A strong communicator and collaborative leader, Thomas excels at mentoring teams, fostering innovation, and coordinating with executive stakeholders."
    ]
  },
  {
    id: 4,
    name: "Zachary Delurey",
    title: "Senior Manager of Contracts & Compliance",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Zachary-Delurey.jpg",
    bio: [
      "Zachary Delurey is the Senior Manager of Contracts & Compliance at Vermont Composites. During his 12-year tenure, he began in engineering and has progressed through multiple management roles of increasing responsibility.",
      "He combines technical insight with practical program and contract management to drive timely, compliant outcomes and support long-term growth. Zachary holds a B.S. in Mechanical Engineering from Rochester Institute of Technology."
    ]
  },
  {
    id: 5,
    name: "Traig Bruso",
    title: "Supply Chain Manager",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Traig-Bruso.jpg",
    bio: [
      "Traig Bruso is a Supply Chain Manager with nearly two decades of aerospace composites experience and a strong track record in procurement, planning, and operations.",
      "Mr. Bruso has significantly improved cash efficiency by strategically managing supplier relationships, strengthening material flow, and leveraging data-driven forecasting and analytics. Known for increasing inventory turns and reducing operational risk, they bring disciplined, ERP-based decision-making to every stage of the supply chain."
    ]
  },
  {
    id: 6,
    name: "Jon Festa",
    title: "Finance Director",
    image: "https://vermontcomposites.com/wp-content/uploads/2026/03/Jon-Festa.jpg",
    bio: [
      "Jon Festa is a finance professional with extensive experience supporting private equity-backed manufacturing companies.",
      "Throughout his career, he has partnered closely with executive leadership teams and PE sponsors to translate complex financial and operational data into actionable insights. He specializes in budgeting, forecasting, KPI development, and performance analysis. Mr. Festa earned a Bachelor of Science in Finance from Fairfield University."
    ]
  }
];

// Initialize accordion state for each leader (closed by default)
accordionOpen.value = leaders.map(() => false);

// Transition hooks for smooth slide (optional, can also use CSS)
const enter = (el) => {
  el.style.maxHeight = '0';
  el.style.opacity = '0';
  // Trigger reflow
  void el.offsetHeight;
  el.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
  el.style.maxHeight = el.scrollHeight + 'px';
  el.style.opacity = '1';
};
const afterEnter = (el) => {
  el.style.maxHeight = 'none';
};
const beforeLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + 'px';
  el.style.opacity = '1';
  void el.offsetHeight;
};
const leave = (el) => {
  el.style.transition = 'max-height 0.35s ease, opacity 0.25s ease';
  el.style.maxHeight = '0';
  el.style.opacity = '0';
};
</script>

<style scoped>
/* Smooth rotation of chevron */
.rotate-180 {
  transform: rotate(180deg);
}

/* Transition classes for the accordion content */
.accordion-content {
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
}

/* Optional subtle background when open – already applied inline */
</style>