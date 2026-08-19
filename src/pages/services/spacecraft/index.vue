<script setup>
// import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const expandedServices = ref({
  primary: true,
  secondary: false,
  fuel: false,
  hydraulic: false,
  ecs: false,
  internal: false
})

const toggleService = (service) => {
  expandedServices.value[service] = !expandedServices.value[service]
}
</script>

<template>
  <!-- <DefaultLayout> -->
    <!-- Banner -->
    <section class="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-3xl">
          <p class="text-purple-300 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">Space Systems</p>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Spacecraft Design &amp; Analysis</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            End-to-end CAE solutions for Earth-orbit and deep-space missions—structural analysis, thermal control, attitude dynamics, and mission-critical subsystem integration for maximum reliability in the space environment.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Engineering Services in Spacecraft</h2>
        
        <div class="space-y-6">
          <!-- Structural Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 md:p-8 cursor-pointer hover:from-indigo-700 hover:to-indigo-800 transition-all" @click="toggleService('primary')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">🛰️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Structural Analysis &amp; Design</h3>
                  <p class="text-indigo-100 text-sm leading-relaxed">Bus structure FEA, solar array design, boom deployment mechanisms, and loads analysis for launch, orbit, and on-orbit acceleration from propulsion events and atmospheric drag.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.primary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.primary" class="p-6 md:p-8 bg-gradient-to-b from-indigo-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg overflow-hidden border border-indigo-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Satellite bus -->
                    <rect x="100" y="80" width="120" height="120" fill="#e0e7ff" stroke="#4338ca" stroke-width="2" rx="3"/>
                    <!-- Solar arrays (deployed) -->
                    <rect x="50" y="110" width="40" height="60" fill="#a5b4fc" stroke="#4338ca" stroke-width="1.5" rx="2"/>
                    <rect x="310" y="110" width="40" height="60" fill="#a5b4fc" stroke="#4338ca" stroke-width="1.5" rx="2"/>
                    <!-- Antenna boom -->
                    <line x1="160" y1="80" x2="160" y2="30" stroke="#4338ca" stroke-width="2"/>
                    <circle cx="160" cy="25" r="8" fill="#818cf8" stroke="#4338ca"/>
                    <!-- Launch loads indication (acceleration vectors) -->
                    <g stroke="#dc2626" stroke-width="2" marker-end="url(#arrowred)" fill="none">
                      <line x1="160" y1="200" x2="160" y2="240"/>
                      <line x1="130" y1="200" x2="100" y2="240"/>
                      <line x1="190" y1="200" x2="220" y2="240"/>
                    </g>
                    <defs>
                      <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#dc2626"/>
                      </marker>
                    </defs>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#312e81" text-anchor="middle">Launch Environment Load Path</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-indigo-700 mb-3">Primary Structure Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Launch environment analysis for satellite bus structure under extreme vibration and acceleration loads during ascent.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-indigo-600 font-bold">•</span>
                      <span>Launch vehicle acceleration loads (multi-axis)</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-indigo-700 font-bold">•</span>
                      <span>Deployment mechanism load analysis</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-purple-600 font-bold">•</span>
                      <span>Orbital thermal cycling fatigue</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-indigo-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-indigo-700">Launch Loads</p>
                  </div>
                  <div class="bg-indigo-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-indigo-700">Deployment Mech</p>
                  </div>
                  <div class="bg-indigo-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-indigo-700">Vibration/Acoustic</p>
                  </div>
                  <div class="bg-indigo-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-indigo-700">Microgravity Ops</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Spacecraft primary structures are engineered to survive the extreme launch environment and provide a stable platform for years of orbital operations, incorporating the central bus frame which serves as the backbone supporting all subsystems while distributing launch loads from the payload adapter through to individual component mounting interfaces, solar array wing structures designed to deploy reliably after launch and maintain dimensional stability under solar heating and shadowing cycles throughout the mission, extendable antenna booms constructed from lightweight composite materials that store compactly during launch and unfold precisely to position sensors and communication equipment at optimal locations away from the spacecraft body, sophisticated deployment mechanisms using pyrotechnic release devices, motorized actuators, and spring-loaded hinges to transform the compact launch configuration into the operational on-orbit geometry, robust payload interface frames providing secure attachment for customer instruments while isolating them from spacecraft vibrations and thermal variations, and propellant tank structures designed to contain fuel and oxidizer at high pressures while maintaining structural integrity under launch acceleration, orbital maneuvers, and micrometeoroid impacts throughout multi-year missions.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our comprehensive structural analysis employs launch environment finite element analysis simulating the intense vibration, acoustic noise, and sustained acceleration experienced during ascent through the atmosphere capturing peak loads on every structural element, detailed deployment mechanism simulation using multi-body dynamics codes to verify proper kinematics, avoid interference, and confirm adequate deployment forces under worst-case temperature and friction conditions, modal analysis identifying natural frequencies and mode shapes ensuring adequate separation from launch vehicle forcing frequencies and verifying deployment sequence does not excite problematic resonances, acoustic analysis evaluating high-intensity sound pressure levels inside the payload fairing during liftoff and max-q flight regime that can induce damaging vibrations in lightweight structures, comprehensive fatigue life assessment accounting for thermal cycling induced stresses as spacecraft transitions between sunlight and eclipse thousands of times per year plus pressure cycling in tanks and mechanisms, and micrometeoroid and orbital debris protection evaluation using ballistic limit equations and hydrocode simulations to size shielding for critical components ensuring survivability against the space debris environment in the intended orbital altitude.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Rigorous structural design and analysis delivers launch qualified structures that meet or exceed launch vehicle interface requirements and successfully withstand the demanding ascent environment without damage or permanent deformation, highly reliable deployment systems proven through analysis and testing to unfold solar arrays, antennas, and instruments with near-perfect success rates critical for mission success since deployment failures typically result in total mission loss, optimized structural mass through careful material selection and efficient load paths that minimize spacecraft dry mass maximizing available payload capacity and propellant for extended mission life, microgravity-ready designs accounting for the fundamentally different load environment in orbit where thermal gradients and propulsion maneuvers dominate rather than gravitational loading enabling precision pointing and vibration-sensitive experiments, extended mission lifetime through conservative design margins and proven materials that maintain properties through years of thermal cycling, atomic oxygen exposure, and radiation degradation, and comprehensive debris protection shielding critical components and propellant tanks from the hypervelocity impact threat posed by orbital debris and micrometeoroids preventing catastrophic failures that could end missions prematurely or create additional debris hazards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Structure Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 md:p-8 cursor-pointer hover:from-orange-700 hover:to-orange-800 transition-all" @click="toggleService('secondary')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">🌡️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Secondary Structure Analysis</h3>
                  <p class="text-orange-100 text-sm leading-relaxed">Thermal network modeling, radiator and heat pipe design, multi-layer insulation (MLI) performance, and thermal balance verification across Sun-lit, eclipse, and deep space regimes.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.secondary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.secondary" class="p-6 md:p-8 bg-gradient-to-b from-orange-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg overflow-hidden border border-orange-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Satellite in space -->
                    <rect x="110" y="90" width="100" height="100" fill="#fed7aa" stroke="#ea580c" stroke-width="2" rx="3"/>
                    <!-- Radiators (heat pipes) -->
                    <g stroke="#ea580c" stroke-width="2" fill="none">
                      <line x1="110" y1="120" x2="80" y2="120"/>
                      <line x1="110" y1="150" x2="80" y2="150"/>
                      <line x1="210" y1="120" x2="240" y2="120"/>
                      <line x1="210" y1="150" x2="240" y2="150"/>
                    </g>
                    <!-- MLI (multi-layer insulation) visualization -->
                    <g opacity="0.5" fill="none" stroke="#f97316" stroke-width="1">
                      <rect x="115" y="95" width="90" height="90"/>
                      <rect x="120" y="100" width="80" height="80"/>
                      <rect x="125" y="105" width="70" height="70"/>
                    </g>
                    <!-- Heat radiation arrows -->
                    <g stroke="#fbbf24" stroke-width="1.5" fill="none" stroke-dasharray="2,2">
                      <path d="M 90 120 Q 60 100 40 80"/>
                      <path d="M 310 120 Q 340 100 360 80"/>
                    </g>
                    <!-- Sun/heat source -->
                    <circle cx="30" cy="50" r="15" fill="#fbbf24" stroke="#ea580c" stroke-width="1"/>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#92400e" text-anchor="middle">Thermal Radiator & MLI Design</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-orange-700 mb-3">Secondary Structure Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Thermal network modeling for radiator sizing and multi-layer insulation (MLI) performance in vacuum environment with extreme solar/space heating.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-orange-600 font-bold">•</span>
                      <span>Transient thermal analysis in vacuum</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-orange-700 font-bold">•</span>
                      <span>Radiator sizing and heat pipe design</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-amber-600 font-bold">•</span>
                      <span>Thermal cycling fatigue on components</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Transient Thermal</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Radiator Sizing</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Heat Pipe Design</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Margin Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Spacecraft thermal control systems manage the extreme temperature variations in the space environment, featuring multi-layer insulation blankets composed of alternating layers of metallized polymer films separated by low-conductivity spacers that dramatically reduce radiative heat transfer protecting sensitive components from the temperature extremes of direct solar heating and cold space exposure, large radiator panels with high-emissivity coatings positioned to view cold space enabling passive heat rejection from electronics and propulsion systems through thermal radiation the only heat transfer mechanism available in vacuum, sophisticated heat pipe networks using the evaporation and condensation of working fluids to transport heat efficiently with no moving parts from heat-generating equipment to radiator panels maintaining isothermal conditions across large distances, actively controlled louver assemblies with temperature-actuated vanes that modulate radiator exposure to space providing automatic thermal regulation as spacecraft power dissipation and solar illumination vary throughout the orbit, strategically placed electrical heater elements providing supplemental warmth during cold case conditions such as eclipse periods or safe mode operations when equipment is powered down, and comprehensive temperature sensor networks monitoring critical components throughout the spacecraft enabling ground operators to track thermal performance and execute contingency heating or cooling procedures if needed.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermal analysis employs sophisticated solar and infrared radiation modeling calculating absorbed and emitted energy from the Sun, Earth albedo, and Earth infrared radiation accounting for spacecraft attitude, orbital geometry, and surface optical properties throughout mission life, detailed multi-node thermal network models discretizing the spacecraft into hundreds or thousands of nodes connected by conductive, radiative, and heat pipe conductances enabling transient simulation of temperatures as the spacecraft orbits, comprehensive orbit propagation analysis evaluating thermal environments in all mission phases including sun-synchronous orbits with constant solar illumination angles, highly elliptical orbits with extreme environmental variation, and low Earth orbits with rapid day-night cycling every 90 minutes, precise equipment heat dissipation modeling accounting for operational modes, duty cycles, and component efficiency variations with temperature creating accurate predictions of waste heat generation, rigorous component temperature margin verification comparing predicted temperatures against flight-qualified limits for every piece of hardware ensuring adequate margin under worst-case hot and cold conditions, and thermal survival analysis for off-nominal scenarios such as safe mode configurations, stuck louvers, or heater failures verifying spacecraft can survive credible fault conditions without permanent damage enabling mission recovery.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized thermal design enables all-regime operation maintaining component temperatures within specifications during sun-lit, eclipse, and transitional orbital phases regardless of spacecraft attitude or equipment power states, component-safe thermal environment protecting sensitive electronics, optical instruments, and propulsion systems from temperature extremes that could cause failures or performance degradation, efficient passive and active thermal control systems balancing the benefits of passive radiative cooling requiring no power or moving parts with active louvers and heaters providing precise regulation when needed, predictable multi-year lifetime with thermal designs proven through heritage hardware and validated analytical methods giving high confidence in long-term performance, minimal electrical power consumption by thermal control systems through efficient passive designs reserving precious solar array and battery capacity for mission payloads rather than thermal regulation, and comprehensive mission assurance through robust thermal margins, redundant heaters, and validated survival modes ensuring spacecraft can weather off-nominal thermal conditions and recover from faults without loss of mission capability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fuel System Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 md:p-8 cursor-pointer hover:from-amber-700 hover:to-amber-800 transition-all" @click="toggleService('fuel')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">⛽</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Fuel System Analysis</h3>
                  <p class="text-amber-100 text-sm leading-relaxed">Propellant tank structural design, slosh dynamics, pressurization system analysis, fuel flow distribution, and propulsion module integration with on-orbit refueling capability.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.fuel }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.fuel" class="p-6 md:p-8 bg-gradient-to-b from-amber-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden border border-amber-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Propellant tank -->
                    <rect x="120" y="80" width="80" height="100" fill="#fcd34d" stroke="#b45309" stroke-width="2" rx="5"/>
                    <!-- Pressure relief -->
                    <circle cx="160" cy="70" r="8" fill="#ea580c" stroke="#b45309" stroke-width="1"/>
                    <!-- Fill/drain port -->
                    <rect x="150" y="190" width="20" height="15" fill="#b45309" rx="2"/>
                    <!-- Thruster connections -->
                    <g stroke="#b45309" stroke-width="1.5">
                      <line x1="140" y1="130" x2="100" y2="130"/>
                      <line x1="160" y1="130" x2="160" y2="160"/>
                      <line x1="180" y1="130" x2="220" y2="130"/>
                    </g>
                    <!-- Thruster nozzles -->
                    <polygon points="90,125 90,135 80,130" fill="#ea580c" stroke="#b45309" stroke-width="1"/>
                    <polygon points="220,125 220,135 230,130" fill="#ea580c" stroke="#b45309" stroke-width="1"/>
                    <polygon points="155,160 165,160 160,175" fill="#ea580c" stroke="#b45309" stroke-width="1"/>
                    <!-- Propellant level indication -->
                    <rect x="130" y="130" width="60" height="50" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#78350f" text-anchor="middle">Propellant Tank & Thruster Architecture</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-amber-700 mb-3">Fuel System Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Pressurized propellant tank design for orbital maneuver and attitude control thrusters. Design for orbital operations and long-duration missions.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-amber-600 font-bold">•</span>
                      <span>Propellant tank pressure & volume analysis</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-amber-700 font-bold">•</span>
                      <span>Microgravity fluid dynamics & slosh</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-yellow-700 font-bold">•</span>
                      <span>Thruster line integration & pressure drops</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Tank Structural</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Slosh Dynamics</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Flow Distribution</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Refuel Capability</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Spacecraft propulsion systems require sophisticated fuel management to enable years of orbital operations and mission maneuvers, incorporating high-pressure propellant tanks constructed from titanium or composite overwrapped pressure vessels storing fuel and oxidizer at pressures up to 300 bar in the smallest possible volume to maximize propellant mass fraction, comprehensive fuel line networks distributing propellant from centralized tanks through filters, valves, and regulators to multiple thruster clusters positioned around the spacecraft for six-degree-of-freedom control, advanced pressurization systems using helium or nitrogen stored in separate high-pressure tanks or generated through propellant vaporization to maintain positive pressure forcing propellant to thrusters throughout mission life as tank ullage volume increases, precision flow control valves and regulators maintaining proper fuel and oxidizer mixture ratios and thrust levels across wide-ranging operating conditions from orbital stationkeeping microburns to large delta-V maneuvers, sophisticated propulsion module integration designing the structural interfaces, thermal isolation, and fluid connections between tanks, lines, and thrusters as an integrated system optimized for reliability and performance, and emerging on-orbit refueling capability with standardized docking interfaces, fluid transfer mechanisms, and contamination control enabling propellant replenishment extending mission life beyond initial fuel load or enabling reusable space tugs and orbital transfer vehicles.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our propulsion system analysis combines structural assessment of pressure vessels using finite element analysis to verify tank integrity under internal pressure, thermal loads, and launch acceleration with appropriate factors of safety meeting human-rating requirements for crewed missions, computational fluid dynamics modeling of propellant slosh behavior in microgravity predicting the movement of liquid-vapor interfaces during spacecraft maneuvers and assessing potential coupling with attitude control dynamics that could induce instabilities, detailed flow network analysis simulating pressure drops through lines, valves, and filters verifying adequate propellant delivery to all thrusters under worst-case conditions including cold start scenarios and end-of-life low-pressure operation, comprehensive pressurization system sizing calculating helium or pressurant gas requirements to maintain tank pressure throughout mission accounting for temperature variations, propellant consumption, and ullage volume growth, propulsion performance modeling predicting thrust, specific impulse, and propellant consumption for mission trajectory analysis and delta-V budgets, and on-orbit refueling interface design for next-generation spacecraft developing standardized fluid, electrical, and data connections enabling autonomous or teleoperated propellant transfer without contamination or safety hazards.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced propulsion system design delivers safe and reliable propellant storage in high-strength tanks with multiple redundant safety features preventing catastrophic failures, efficient fuel distribution ensuring all thrusters receive adequate propellant flow for precise attitude control and orbital maneuvers throughout the mission, robust microgravity operation through propellant management devices such as surface tension tanks, diaphragms, or bladders ensuring liquid propellant reaches thruster inlets despite zero-gravity fluid behavior, extended mission capability through efficient pressurant usage and conservative propellant budgets enabling years of orbital stationkeeping and multiple high delta-V maneuvers for orbit raising or plane changes, mission flexibility with modular propulsion architectures supporting various propellant loading configurations from minimum stationkeeping fuel for short missions to maximum capacity for interplanetary trajectories or multi-year operations, and revolutionary on-orbit refueling extending spacecraft operational life indefinitely through periodic propellant replenishment enabling satellite servicing, space debris removal, and reusable orbital transfer vehicles that fundamentally change space operations economics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hydraulic System Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 md:p-8 cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-all" @click="toggleService('hydraulic')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">🔧</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Hydraulic System Analysis</h3>
                  <p class="text-purple-100 text-sm leading-relaxed">Pressurized fluid actuation system design, valve control logic, thruster gimbal actuation, and redundant system architecture for on-orbit propulsion control and payload deployment.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.hydraulic }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.hydraulic" class="p-6 md:p-8 bg-gradient-to-b from-purple-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg overflow-hidden border border-purple-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Solar panels with gimbal -->
                    <g transform="translate(150, 100) rotate(-20)">
                      <rect x="-40" y="-30" width="80" height="60" fill="#a855f7" stroke="#6d28d9" stroke-width="2" rx="2"/>
                      <g stroke="#6d28d9" stroke-width="1" opacity="0.5">
                        <line x1="-35" y1="-25" x2="35" y2="-25"/>
                        <line x1="-35" y1="-10" x2="35" y2="-10"/>
                        <line x1="-35" y1="5" x2="35" y2="5"/>
                        <line x1="-35" y1="20" x2="35" y2="20"/>
                      </g>
                    </g>
                    <!-- Gimbal actuators -->
                    <g stroke="#6d28d9" stroke-width="2" fill="none">
                      <line x1="140" y1="150" x2="120" y2="160"/>
                      <line x1="160" y1="150" x2="180" y2="160"/>
                    </g>
                    <!-- Actuator cylinders -->
                    <rect x="110" y="160" width="10" height="20" fill="#d8b4fe" stroke="#6d28d9" stroke-width="1" rx="2"/>
                    <rect x="180" y="160" width="10" height="20" fill="#d8b4fe" stroke="#6d28d9" stroke-width="1" rx="2"/>
                    <!-- Gimbal pivot point -->
                    <circle cx="150" cy="140" r="6" fill="#6d28d9"/>
                    <!-- Deployment indicator -->
                    <g stroke="#dc2626" stroke-width="1.5" fill="none" stroke-dasharray="3,3">
                      <path d="M 150 95 Q 150 50 180 60"/>
                    </g>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#6d28d9" text-anchor="middle">Solar Array Gimbal Actuation Control</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-purple-700 mb-3">Hydraulic System Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Solar array gimbal actuation and mechanism control for spacecraft attitude adjustment. Precise positioning for solar power optimization and thermal management.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-purple-600 font-bold">•</span>
                      <span>Gimbal actuator force and torque analysis</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-purple-700 font-bold">•</span>
                      <span>Deployment mechanism dynamics</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-indigo-600 font-bold">•</span>
                      <span>Multi-axis attitude control response</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Gimbal Dynamics</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Actuator Sizing</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Deploy Mech</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Control Integration</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Spacecraft gimbal and deployment systems provide precise positioning and reliable mechanism operation critical for mission success, incorporating solar array gimbal actuators with high-torque brushless DC motors and harmonic drive gearboxes that rotate solar arrays tracking the Sun maximizing power generation throughout the orbital day, precision drive electronics with closed-loop position control maintaining pointing accuracy within fractions of a degree despite thermal distortions and structural flexing, high-resolution position sensors using optical encoders or resolvers providing accurate gimbal angle feedback enabling precise solar tracking and fault detection, robust deployment mechanisms using spring-loaded hinges, cable release devices, and motorized drives to unfold appendages from compact launch configuration to full operational geometry, sophisticated lock and release mechanisms securing deployable structures during launch using pyrotechnic pin pullers or non-explosive actuators that release cleanly on command without imparting damaging shock loads, and integrated control electronics coordinating deployment sequences, managing motor currents, monitoring position feedback, and implementing protective interlocks preventing mechanism damage from improper commanding or limit violations.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our mechanism analysis employs detailed gimbal torque calculations accounting for solar array inertia, friction in bearings and gearboxes, cable harness stiffness, and worst-case cold start conditions to properly size actuators with adequate margin, comprehensive deployment kinematics simulation using multi-body dynamics codes to verify smooth motion through full deployment sequence avoiding interference between moving parts and spacecraft structure, precise control system response modeling analyzing closed-loop servo performance, settling time, tracking accuracy, and disturbance rejection ensuring gimbals maintain pointing despite vibrations from reaction wheels or thruster firings, detailed friction modeling characterizing bearing and mechanism friction as functions of temperature, lubrication, and wear over mission life to predict long-term performance degradation, rigorous pointing accuracy analysis combining structural deflections, thermal distortions, bearing play, and control system errors to verify overall pointing requirements are met, and comprehensive reliability assessment examining failure modes, redundancy provisions, and safe mode operations ensuring mechanisms can complete critical deployments and maintain functionality throughout design life.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced gimbal and deployment systems deliver precise solar array positioning maximizing power generation by maintaining optimal Sun-pointing angles throughout all mission phases and orbital geometries, highly reliable deployment with near-perfect success rates proven through extensive ground testing, thermal-vacuum qualification, and flight heritage ensuring appendages unfold correctly enabling mission success, power-optimized actuation through efficient motors and gearboxes minimizing parasitic electrical loads on the spacecraft power system, sophisticated thermal tracking capability for solar arrays with temperature-aware control algorithms adjusting pointing to manage thermal conditions preventing overheating during high-power operations or optimizing panel temperatures during eclipse exit, extended operational lifetime through robust mechanisms designed for thousands of gimbal rotations and qualified for 15+ year missions with redundant bearings, high-reliability motors, and conservative life margins, and comprehensive fault recovery with redundant actuators, backup release mechanisms, and thoroughly tested contingency procedures enabling mission continuation even after mechanism anomalies maximizing probability of mission success and return on spacecraft investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ECS System Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 md:p-8 cursor-pointer hover:from-cyan-700 hover:to-cyan-800 transition-all" @click="toggleService('ecs')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">❄️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">ECS System Analysis</h3>
                  <p class="text-cyan-100 text-sm leading-relaxed">Environmental control system design, thermal management in vacuum environment, radiator optimization, and equipment protection for extreme space conditions.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.ecs }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.ecs" class="p-6 md:p-8 bg-gradient-to-b from-cyan-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-lg overflow-hidden border border-cyan-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Equipment enclosure -->
                    <rect x="100" y="80" width="120" height="120" fill="#a5f3fc" stroke="#0891b2" stroke-width="2" rx="3"/>
                    <!-- Internal components (simplified) -->
                    <g fill="#06b6d4" opacity="0.3">
                      <rect x="110" y="90" width="30" height="30" rx="2"/>
                      <rect x="150" y="90" width="30" height="30" rx="2"/>
                      <rect x="190" y="90" width="30" height="30" rx="2"/>
                      <rect x="110" y="130" width="30" height="30" rx="2"/>
                      <rect x="150" y="130" width="30" height="30" rx="2"/>
                      <rect x="190" y="130" width="30" height="30" rx="2"/>
                      <rect x="110" y="170" width="30" height="30" rx="2"/>
                      <rect x="150" y="170" width="30" height="30" rx="2"/>
                      <rect x="190" y="170" width="30" height="30" rx="2"/>
                    </g>
                    <!-- Thermal radiation -->
                    <g stroke="#fbbf24" stroke-width="1.5" fill="none" stroke-dasharray="2,2">
                      <path d="M 95 140 Q 70 140 50 140"/>
                      <path d="M 225 140 Q 250 140 270 140"/>
                      <path d="M 160 200 Q 160 250 160 270"/>
                    </g>
                    <!-- Hot spot indicators -->
                    <circle cx="125" cy="105" r="3" fill="#dc2626" opacity="0.7"/>
                    <circle cx="205" cy="185" r="3" fill="#dc2626" opacity="0.7"/>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#164e63" text-anchor="middle">Equipment Thermal Management</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-cyan-700 mb-3">ECS System Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Equipment enclosure thermal control and heat dissipation in vacuum environment. Ensures electronics reliability during long-duration orbital missions.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-cyan-600 font-bold">•</span>
                      <span>Equipment dissipation thermal modeling</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-cyan-700 font-bold">•</span>
                      <span>Radiator effectiveness in vacuum</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-teal-600 font-bold">•</span>
                      <span>Thermal control component qualification</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Thermal Network</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Vacuum Heat Transfer</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Equipment Cooling</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Survival Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Spacecraft environmental control systems protect sensitive equipment from the extreme thermal environment of space, featuring advanced heat pipe technology using sealed tubes with internal wicking structures and working fluids that transport heat through evaporation and condensation cycles providing efficient thermal conductance with no moving parts or electrical power consumption, large radiator panels with high-emissivity coatings and optimized view factors to cold space enabling passive heat rejection from electronics bays, battery compartments, and propulsion systems through thermal radiation the only viable heat transfer mechanism in vacuum, comprehensive multi-layer insulation blanket assemblies wrapping spacecraft buses and equipment enclosures with alternating layers of metallized polymer films and low-conductivity spacers dramatically reducing radiative heat exchange protecting components from solar heating and deep space cold, strategically positioned electrical resistance heaters providing supplemental warmth during eclipse periods or safe mode operations when equipment power dissipation drops below normal levels, precision temperature sensor networks with thermistors or resistance temperature detectors monitoring critical components enabling ground operators to track thermal performance and detect anomalies, and thermal control surfaces with specialized coatings, paints, and tape providing controlled absorptivity and emissivity ratios optimized for specific thermal zones balancing solar absorption against infrared emission.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our environmental control analysis employs detailed transient thermal simulation using lumped-parameter or finite-element thermal models discretizing spacecraft geometry into thermal nodes connected by conductive, radiative, and heat pipe conductances predicting temperature evolution throughout mission phases, comprehensive equipment heat dissipation modeling cataloging power consumption and waste heat generation from every electronic box, battery, and thruster accounting for operational modes, duty cycles, and temperature-dependent efficiency variations, rigorous vacuum heat transfer calculations using radiation network analysis and view factor computations determining radiative exchange between all spacecraft surfaces and between spacecraft and the space environment, extensive orbital thermal environment modeling simulating solar flux, Earth albedo, and Earth infrared radiation inputs as spacecraft attitude and orbital position vary calculating absorbed and emitted energy at every surface, meticulous hot case and cold case analysis identifying worst-case thermal conditions for each component considering mission phases, equipment states, and environmental variations verifying all hardware remains within qualified temperature limits, and comprehensive thermal survival assessment for off-nominal scenarios such as safe mode configurations, stuck heaters, or eclipse duration exceeding predictions ensuring spacecraft can weather anomalies and recover without permanent damage enabling mission continuation.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized environmental control delivers comprehensive equipment thermal protection maintaining all components within flight-qualified temperature ranges preventing failures from overheating or cold-induced malfunctions, robust thermal stability minimizing temperature variations that could affect sensitive instruments, degrade battery performance, or induce thermal cycling fatigue in structural joints, power-efficient passive thermal control through radiators, heat pipes, and multi-layer insulation minimizing electrical power consumption by heaters preserving precious solar array and battery capacity for mission payloads, all-regime operational capability maintaining thermal control effectiveness throughout sun-lit, eclipse, and transitional mission phases regardless of spacecraft attitude enabling mission flexibility, extended equipment lifetime through benign thermal environment reducing stress on electronic components, battery cells, and mechanical systems enabling designs to exceed baseline mission duration providing margin for extended operations, and comprehensive mission assurance through validated thermal models, conservative design margins, redundant heaters with cross-strapping, and proven thermal survival modes giving high confidence in thermal system reliability throughout multi-year missions in the harsh space environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Internal Load Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-6 md:p-8 cursor-pointer hover:from-rose-700 hover:to-rose-800 transition-all" @click="toggleService('internal')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">📐</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Internal Load Analysis</h3>
                  <p class="text-rose-100 text-sm leading-relaxed">Load synthesis across all subsystems, structural load distribution, stress concentration analysis, and margin tracking for launch, orbital, and operational environments.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.internal }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.internal" class="p-6 md:p-8 bg-gradient-to-b from-rose-50 to-white">
              <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg overflow-hidden border border-rose-200 h-64 flex items-center justify-center relative">
                  <svg class="w-full h-full p-8" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Central bus -->
                    <rect x="130" y="100" width="80" height="80" fill="#fecaca" stroke="#be123c" stroke-width="2" rx="2"/>
                    <!-- Load distribution points -->
                    <g stroke="#be123c" stroke-width="2" fill="none" marker-end="url(#arrowhead)">
                      <line x1="170" y1="100" x2="170" y2="50"/>
                      <line x1="150" y1="180" x2="130" y2="230"/>
                      <line x1="170" y1="180" x2="170" y2="240"/>
                      <line x1="190" y1="180" x2="210" y2="230"/>
                      <line x1="210" y1="140" x2="260" y2="140"/>
                    </g>
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#be123c"/>
                      </marker>
                    </defs>
                    <!-- Margin indicators -->
                    <circle cx="170" cy="40" r="10" fill="#dc2626"/>
                    <text x="170" y="45" font-size="8" fill="white" text-anchor="middle" font-weight="bold">3.0x</text>
                    <circle cx="130" cy="230" r="10" fill="#f97316"/>
                    <text x="130" y="235" font-size="8" fill="white" text-anchor="middle" font-weight="bold">4.5x</text>
                    <circle cx="210" cy="230" r="10" fill="#22c55e"/>
                    <text x="210" y="235" font-size="8" fill="white" text-anchor="middle" font-weight="bold">6.0x</text>
                    <circle cx="260" cy="140" r="10" fill="#22c55e"/>
                    <text x="260" y="145" font-size="8" fill="white" text-anchor="middle" font-weight="bold">5.5x</text>
                    <!-- Label -->
                    <text x="200" y="270" font-size="13" font-weight="bold" fill="#831843" text-anchor="middle">Load Synthesis & Margin Assessment</text>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-semibold text-rose-700 mb-3">Internal Load Analysis Visualization</p>
                  <p class="text-gray-700 text-sm leading-relaxed mb-4">Comprehensive load synthesis from all spacecraft subsystems through central bus structure. Margin tracking ensures mission reliability.</p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 font-bold">•</span>
                      <span>Multi-subsystem load path synthesis</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-orange-500 font-bold">•</span>
                      <span>Structural margin of safety tracking</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 font-bold">•</span>
                      <span>Launch + orbital operational envelope</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Load Synthesis</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Stress Distribution</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Margin Tracking</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Compliance Check</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Internal loads analysis for spacecraft traces forces and moments through every structural element from initial loading to final attachment point, focusing on the central bus structure that forms the primary load-bearing framework distributing launch vehicle interface loads through to all subsystem mounting points while maintaining structural integrity under combined static and dynamic loading, critical interface frames providing robust attachment for solar arrays, antennas, and payload instruments with precisely controlled alignment and stiffness characteristics, highly loaded fastener joints connecting major structural assemblies where bolted or bonded connections must transfer substantial forces without failure from preload loss, fretting fatigue, or stress concentration, primary load paths engineered to carry major loads from launch vehicle adapter through bus structure to payload and appendage attach points with minimum weight and maximum reliability, specialized attach fittings and bracket assemblies providing local reinforcement at high-load attachment points where concentrated forces from equipment or mechanisms must be distributed into surrounding structure, and critical structural details including cutouts, holes, material transitions, and geometry changes where stress concentrations amplify applied loads requiring detailed analysis to prevent crack initiation or premature failure.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our comprehensive loads analysis employs rigorous load case synthesis combining launch vehicle acceleration profiles, acoustic and random vibration spectra, on-orbit thermal gradients, and propulsion maneuver loads into thousands of load combinations enveloping all mission phases, detailed finite element stress analysis computing stress and strain distributions throughout spacecraft structure identifying critical locations and quantifying margins of safety, precise margin of safety calculations comparing applied stresses against material allowables with appropriate factors of safety per NASA or ESA structural design requirements ensuring adequate strength throughout design life, comprehensive ultimate load verification demonstrating structure can withstand limit loads multiplied by prescribed safety factors without failure meeting human-rating requirements for crewed missions, detailed fatigue life assessment for pressure vessels, mechanisms, and structures experiencing cyclic loading from thermal variations or deployment operations predicting crack initiation life and establishing inspection intervals, and complete compliance documentation preparing stress reports, margin summaries, and verification matrices demonstrating satisfaction of all structural requirements enabling smooth design reviews and regulatory approvals.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Rigorous internal loads analysis enables complete load path tracing from applied loads through structure to reactions providing full understanding of internal force distribution and structural response, accurate margin verification comparing stresses against allowables with appropriate safety factors demonstrating compliance with structural design requirements and identifying opportunities for weight optimization, systematic structural optimization balancing strength, stiffness, and mass objectives through iterative analysis identifying over-designed regions amenable to material removal and under-margin areas requiring reinforcement, high design confidence through validated analysis methods, conservative assumptions, and comparison with test data reducing risk of structural failures or costly redesigns, mission-capable structures proven to withstand launch environment, orbital operations, and potential off-nominal conditions throughout multi-year design life with appropriate margins for degradation and uncertainty, and certification-ready documentation with comprehensive stress reports, margin summaries, verification matrices, and test-analysis correlation satisfying NASA, ESA, or commercial spacecraft structural certification requirements expediting design reviews and enabling smooth progression to flight qualification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Launch Your Mission?</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Trusted for critical spacecraft programs—from concept through on-orbit operations. High-fidelity analysis ensures mission success in the harshest environment.
        </p>
        <RouterLink to="/contact_us" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Discuss Your Mission
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
