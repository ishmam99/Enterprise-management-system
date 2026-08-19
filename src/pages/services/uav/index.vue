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
        <div class="absolute top-20 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-3xl">
          <p class="text-orange-300 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">Unmanned Systems</p>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Unmanned Aerial Vehicle (UAV) Design</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Specialized CAE for extended-endurance platforms—aerodynamic optimization, autonomous flight systems, modular payloads, and rapid certification for commercial and defense applications.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Engineering Services for UAVs</h2>
        
        <div class="space-y-6">
          <!-- Primary Structure Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 md:p-8 cursor-pointer hover:from-red-700 hover:to-red-800 transition-all" @click="toggleService('primary')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">📐</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Primary Structure Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Lightweight composite design, wing root bending analysis, fuselage frame optimization, and payload bay structural integration for extended endurance and mission flexibility.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.primary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.primary" class="p-6 md:p-8 bg-gradient-to-b from-red-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Composite FEA</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Weight Optimization</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Wing Root Bending</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Fatigue Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV primary structures are engineered for maximum endurance through aggressive weight reduction while maintaining structural integrity, featuring advanced composite fuselage construction using carbon fiber or fiberglass laminates that provide exceptional strength-to-weight ratios enabling extended flight times and increased payload capacity, high-aspect-ratio wing structures with optimized spar and rib configurations designed to withstand bending loads from aerodynamic forces during cruise, maneuvers, and gust encounters while minimizing structural mass, lightweight tail boom assemblies connecting empennage surfaces to the fuselage providing torsional stiffness for directional stability while using thin-walled composite construction to reduce weight, retractable or fixed landing gear systems with energy-absorbing features protecting the airframe during landing impacts while folding or streamlining to minimize aerodynamic drag during flight, modular payload bay frames with standardized mounting interfaces accommodating various sensor packages, cameras, and mission equipment enabling rapid reconfiguration between missions, and critical fastener joint details at wing-fuselage interfaces and control surface attachments where composite laminates transfer concentrated loads through carefully designed bearing reinforcements preventing delamination or crushing failures.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our UAV structural analysis employs sophisticated composite laminate theory calculating ply-by-ply stiffness and strength properties accounting for fiber orientation, resin systems, and manufacturing processes to accurately predict structural response, detailed finite element analysis at the ply level capturing through-thickness stress distributions and identifying critical failure modes including fiber breakage, matrix cracking, and delamination using progressive failure criteria, comprehensive failure prediction using Tsai-Wu, Hashin, or LaRC criteria evaluating multiple damage mechanisms to establish safe operating envelopes, precise bearing stress analysis at fastener locations determining bolt torques, edge distances, and local reinforcement requirements to prevent hole elongation or composite crushing, extensive long-life fatigue assessment accounting for the millions of load cycles accumulated during typical UAV operations establishing inspection intervals and retirement times, and systematic weight optimization studies trading structural mass against strength requirements exploring material substitutions, layup variations, and geometry modifications to achieve minimum weight designs that maximize endurance while meeting all structural requirements.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized UAV structures deliver minimal airframe weight through efficient composite design maximizing payload capacity and endurance for extended surveillance and data collection missions, dramatically extended flight endurance through aggressive weight reduction enabling UAVs to remain on-station for hours longer than conventional designs, damage-tolerant construction through composite layup strategies that arrest crack propagation and prevent catastrophic failures allowing continued operation after sustaining minor damage, proven composite manufacturing methods using established processes like hand layup, resin infusion, or prepreg autoclave curing that deliver consistent quality and predictable properties, field-repairable designs with modular construction and accessible damage zones enabling operators to perform repairs at forward operating locations without returning aircraft to depot facilities minimizing downtime, and cost-effective production through optimized part count, simplified tooling, and efficient manufacturing processes that reduce unit costs for small to medium production runs typical of military and commercial UAV programs.
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
                  <p class="text-amber-100 text-sm leading-relaxed">Battery selection and state-of-charge modeling, electric motor performance curves, fuel consumption analysis, hybrid propulsion trade studies, and mission power budget management.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.fuel }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.fuel" class="p-6 md:p-8 bg-gradient-to-b from-amber-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Battery Modeling</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Motor Selection</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Hybrid Trade</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Mission Energy</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔋</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV energy storage and propulsion systems are optimized for extended mission duration through careful integration of high-energy-density battery packs using lithium-polymer or lithium-ion chemistries selected for optimal specific energy, discharge rate capability, and cycle life matching mission profiles ranging from short tactical flights to multi-hour surveillance operations, brushless electric motors with high efficiency across the operational speed range converting electrical energy to mechanical shaft power with minimal thermal losses enabling sustained cruise performance, precision-matched propeller assemblies designed using blade element momentum theory to achieve maximum thrust per watt at the design cruise condition while maintaining adequate static thrust for takeoff and climb, sophisticated electronic speed controllers managing motor commutation, current limiting, and regenerative braking functions with integrated telemetry reporting motor temperature, voltage, and current for real-time health monitoring, optional fuel tanks and small internal combustion engines for hybrid-electric configurations extending endurance beyond pure-electric limits by recharging batteries in-flight or providing supplemental power during high-demand flight phases, and comprehensive thermal management systems including heat sinks, cooling fans, and strategic airflow paths preventing battery and motor overheating during continuous high-power operations ensuring component longevity and safety.
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
                      Our UAV propulsion analysis employs detailed battery discharge modeling capturing voltage sag under load, temperature effects, and capacity fade over operational life to accurately predict available energy throughout missions, comprehensive motor efficiency mapping measuring torque-speed-efficiency relationships across the operational envelope identifying optimal operating points and quantifying losses from copper heating and iron core losses, systematic propeller selection analysis evaluating diameter, pitch, blade count, and airfoil sections using computational fluid dynamics or empirical data to maximize static thrust and cruise efficiency while avoiding tip speed limitations, time-stepped mission profile simulations integrating flight dynamics, propulsion performance, and environmental conditions to calculate instantaneous power demands during taxi, takeoff, climb, cruise, descent, and landing phases, precise endurance calculations accounting for all electrical consumers including avionics, payloads, communication systems, and control actuators establishing realistic mission duration estimates with appropriate reserves, and thermal modeling using computational heat transfer methods predicting component temperatures under sustained operation ensuring batteries and motors remain within safe operating limits preventing thermal runaway or performance degradation.
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
                      Optimized UAV propulsion systems deliver maximum flight time through efficient energy conversion and careful component matching maximizing on-station endurance for surveillance, mapping, and inspection missions, highly reliable electric propulsion with few moving parts and no combustion-related failures providing consistent performance over thousands of flight hours with minimal maintenance requirements, proven hybrid-electric capability enabling extended range beyond pure-electric limitations by combining battery power with small generator sets or fuel cells for multi-hour missions, predictable energy budgets through comprehensive modeling allowing operators to plan mission profiles with confidence knowing available endurance under various payload and environmental conditions, mission-proven component selections using commercially available motors, batteries, and controllers that have demonstrated reliability in operational UAV programs reducing development risk and procurement costs, and modular propulsion architectures with standardized mounting interfaces and electrical connections enabling rapid configuration changes to match different mission requirements or upgrade to improved battery chemistries as technology advances without redesigning the entire airframe.
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
                  <p class="text-purple-100 text-sm leading-relaxed">Flight control law design, autopilot validation, sensor suite integration, waypoint/geo-fence navigation, and autonomous mission planning with real-time fail-safe logic.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.hydraulic }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.hydraulic" class="p-6 md:p-8 bg-gradient-to-b from-purple-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Flight Control Design</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Mission Planning</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Sensor Fusion</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Safety Logic</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🎮</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV autonomous flight systems integrate sophisticated avionics enabling hands-off operation through advanced flight computers running real-time control algorithms processing sensor inputs and generating servo commands at rates exceeding 100Hz ensuring stable flight even in turbulent conditions, high-precision inertial measurement units combining MEMS accelerometers and rate gyroscopes measuring three-axis linear acceleration and angular rates providing fundamental aircraft attitude and rate information for stabilization and navigation, multi-constellation GPS/GNSS receivers utilizing signals from GPS, GLONASS, Galileo, and BeiDou satellites to determine position with meter-level accuracy enabling autonomous waypoint navigation and return-to-home capabilities, barometric altimeters measuring atmospheric pressure to determine altitude above mean sea level with decimeter precision for terrain following and controlled climbs and descents, pitot-static airspeed sensors measuring dynamic pressure to calculate indicated airspeed critical for maintaining aerodynamic flight regimes and preventing stalls, and precision servo actuators with position feedback directly controlling elevators, ailerons, and rudders translating digital flight computer commands into mechanical surface deflections with sub-degree accuracy and sufficient bandwidth to achieve desired handling qualities.
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
                      Our UAV autopilot development employs linearized flight dynamics analysis deriving small-perturbation equations of motion around trim conditions to understand natural aircraft modes including short period, phugoid, dutch roll, and spiral characteristics informing control law architecture, systematic proportional-integral-derivative controller tuning using root locus, frequency response, and time-domain methods to achieve desired phase margins, gain margins, and transient response characteristics ensuring stable tracking of commanded attitudes and flight paths, sophisticated waypoint navigation algorithms implementing line-following, orbit, and loiter patterns with wind compensation calculating required headings and bank angles to track desired ground tracks despite atmospheric disturbances, advanced extended Kalman filter design fusing GPS position, barometric altitude, airspeed, and IMU measurements into optimal state estimates rejecting sensor noise and bridging GPS outages through inertial propagation, comprehensive failure modes and effects analysis identifying critical sensor failures, actuator jams, and communication losses designing redundancy and degraded-mode logic ensuring graceful degradation rather than catastrophic failures, and extensive hardware-in-the-loop and software-in-the-loop testing simulating thousands of mission scenarios including nominal operations, off-nominal conditions, and emergency procedures validating control laws before first flight reducing risk and development time.
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
                      Optimized UAV autopilot systems enable fully autonomous mission execution from takeoff through landing without operator intervention allowing single pilots to manage multiple aircraft simultaneously expanding operational capacity, consistently stable flight characteristics through well-tuned control laws maintaining coordinated flight and preventing pilot-induced oscillations even with inexperienced operators reducing training requirements, precision navigation following pre-planned routes with meter-level accuracy maintaining consistent standoff distances and coverage patterns critical for mapping, inspection, and surveillance missions, robust fail-safe operation through comprehensive fault detection automatically identifying sensor failures, low battery conditions, or lost communication link triggering appropriate emergency responses including return-to-home or controlled descent to safe landing zones, intuitive mission planning interfaces allowing operators to define complex flight paths using simple point-and-click waypoint entry with automatic route optimization and no-fly-zone enforcement accessible to personnel without extensive aviation backgrounds, and real-time adaptive behavior responding to changing conditions including unexpected wind shifts, airspace restrictions, or target movements by recalculating optimal paths maintaining mission effectiveness despite environmental uncertainties.
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
                  <p class="text-rose-100 text-sm leading-relaxed">Design iteration acceleration, 3D printing readiness analysis, manufacturing simulation, regulatory compliance documentation, and rapid test correlation to minimize time-to-field deployment.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.internal }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.internal" class="p-6 md:p-8 bg-gradient-to-b from-rose-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Design Iteration</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Additive Mfg</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Compliance Docs</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Test Correlation</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">⚡</span>
                    Key Activities
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV rapid development programs leverage streamlined engineering processes to accelerate concept-to-deployment timelines including comprehensive concept studies exploring multiple configuration options evaluating aerodynamic efficiency, structural feasibility, and mission suitability through parametric trade studies identifying optimal design directions before committing to detailed design, rapid 3D CAD modeling using parametric solid modeling tools creating detailed digital representations of all airframe components, propulsion systems, and avionics installations enabling visualization, interference checking, and design reviews without physical prototypes, accelerated analysis cycles utilizing automated finite element meshing and batch processing running multiple load cases overnight providing structural margins and identifying design weaknesses within days rather than weeks, systematic test planning developing comprehensive ground and flight test matrices defining instrumentation requirements, success criteria, and risk mitigation strategies ensuring efficient test campaigns that gather maximum data with minimum flights, rigorous quality assurance implementing design reviews, analysis verification, and configuration control ensuring all components meet specifications and interface requirements preventing costly field failures and rework, and thorough field validation conducting representative mission profiles under operational conditions verifying predicted performance, identifying any unanticipated issues, and building operator confidence before full-scale deployment.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Methods
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our UAV development methodology employs parametric CAD techniques using design tables and configurations enabling rapid geometry changes for trade studies and optimization without rebuilding entire assemblies, automated finite element analysis workflows with scripted meshing, load application, and post-processing reducing analysis turnaround time from days to hours enabling more design iterations and higher confidence in structural margins, design-for-additive-manufacturing principles utilizing topology optimization, lattice structures, and consolidation of assemblies taking full advantage of 3D printing capabilities to reduce part count, assembly time, and weight while enabling complex organic geometries impossible with traditional manufacturing, comprehensive risk management using failure modes and effects analysis, fault tree analysis, and probabilistic assessment identifying high-risk areas focusing engineering attention and resources where they provide maximum value, stringent supplier quality oversight implementing first article inspections, process audits, and receiving inspections ensuring purchased components meet specifications and reliability requirements preventing field failures from substandard parts, and systematic model validation comparing analysis predictions against test measurements identifying and correcting modeling errors building confidence that simulation accurately represents physical hardware behavior enabling design certification based partially on analysis rather than extensive testing reducing development costs and schedules.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Program Benefits
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Accelerated UAV programs achieve rapid technology readiness level maturation advancing from preliminary design through flight test in months rather than years responding quickly to emerging operational needs or market opportunities, significant cost reduction through efficient use of engineering resources, minimized physical prototyping leveraging simulation to eliminate unnecessary hardware builds, and optimized test campaigns focusing flight hours on critical validation rather than exploratory testing, dramatically fewer design-build-test cycles through high-fidelity simulation catching problems in the digital environment before committing to hardware reducing expensive and time-consuming physical iterations, streamlined regulatory compliance producing well-organized analysis documentation, test reports, and design substantiation packages satisfying civil aviation authorities or military certification bodies facilitating approval processes, demonstrated proven performance through systematic validation building stakeholder confidence that the UAV will perform as promised in operational environments meeting mission requirements and reliability targets, and expedited market entry deploying new capabilities ahead of competitors capitalizing on first-mover advantages in rapidly evolving UAV markets for applications ranging from precision agriculture to infrastructure inspection to defense reconnaissance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">R&D for UAVs</h2>
        
        <div class="space-y-6">
          <!-- Primary Structure Analysis -->
          <div class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div class="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 md:p-8 cursor-pointer hover:from-red-700 hover:to-red-800 transition-all" @click="toggleService('primary')">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">📐</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Primary Structure Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Lightweight composite design, wing root bending analysis, fuselage frame optimization, and payload bay structural integration for extended endurance and mission flexibility.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.primary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.primary" class="p-6 md:p-8 bg-gradient-to-b from-red-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Composite FEA</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Weight Optimization</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Wing Root Bending</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Fatigue Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV primary structures are engineered for maximum endurance through aggressive weight reduction while maintaining structural integrity, featuring advanced composite fuselage construction using carbon fiber or fiberglass laminates that provide exceptional strength-to-weight ratios enabling extended flight times and increased payload capacity, high-aspect-ratio wing structures with optimized spar and rib configurations designed to withstand bending loads from aerodynamic forces during cruise, maneuvers, and gust encounters while minimizing structural mass, lightweight tail boom assemblies connecting empennage surfaces to the fuselage providing torsional stiffness for directional stability while using thin-walled composite construction to reduce weight, retractable or fixed landing gear systems with energy-absorbing features protecting the airframe during landing impacts while folding or streamlining to minimize aerodynamic drag during flight, modular payload bay frames with standardized mounting interfaces accommodating various sensor packages, cameras, and mission equipment enabling rapid reconfiguration between missions, and critical fastener joint details at wing-fuselage interfaces and control surface attachments where composite laminates transfer concentrated loads through carefully designed bearing reinforcements preventing delamination or crushing failures.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our UAV structural analysis employs sophisticated composite laminate theory calculating ply-by-ply stiffness and strength properties accounting for fiber orientation, resin systems, and manufacturing processes to accurately predict structural response, detailed finite element analysis at the ply level capturing through-thickness stress distributions and identifying critical failure modes including fiber breakage, matrix cracking, and delamination using progressive failure criteria, comprehensive failure prediction using Tsai-Wu, Hashin, or LaRC criteria evaluating multiple damage mechanisms to establish safe operating envelopes, precise bearing stress analysis at fastener locations determining bolt torques, edge distances, and local reinforcement requirements to prevent hole elongation or composite crushing, extensive long-life fatigue assessment accounting for the millions of load cycles accumulated during typical UAV operations establishing inspection intervals and retirement times, and systematic weight optimization studies trading structural mass against strength requirements exploring material substitutions, layup variations, and geometry modifications to achieve minimum weight designs that maximize endurance while meeting all structural requirements.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div class="bg-gradient-to-r from-red-50 via-red-100/50 to-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized UAV structures deliver minimal airframe weight through efficient composite design maximizing payload capacity and endurance for extended surveillance and data collection missions, dramatically extended flight endurance through aggressive weight reduction enabling UAVs to remain on-station for hours longer than conventional designs, damage-tolerant construction through composite layup strategies that arrest crack propagation and prevent catastrophic failures allowing continued operation after sustaining minor damage, proven composite manufacturing methods using established processes like hand layup, resin infusion, or prepreg autoclave curing that deliver consistent quality and predictable properties, field-repairable designs with modular construction and accessible damage zones enabling operators to perform repairs at forward operating locations without returning aircraft to depot facilities minimizing downtime, and cost-effective production through optimized part count, simplified tooling, and efficient manufacturing processes that reduce unit costs for small to medium production runs typical of military and commercial UAV programs.
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
                  <p class="text-amber-100 text-sm leading-relaxed">Battery selection and state-of-charge modeling, electric motor performance curves, fuel consumption analysis, hybrid propulsion trade studies, and mission power budget management.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.fuel }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.fuel" class="p-6 md:p-8 bg-gradient-to-b from-amber-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Battery Modeling</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Motor Selection</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Hybrid Trade</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Mission Energy</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔋</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV energy storage and propulsion systems are optimized for extended mission duration through careful integration of high-energy-density battery packs using lithium-polymer or lithium-ion chemistries selected for optimal specific energy, discharge rate capability, and cycle life matching mission profiles ranging from short tactical flights to multi-hour surveillance operations, brushless electric motors with high efficiency across the operational speed range converting electrical energy to mechanical shaft power with minimal thermal losses enabling sustained cruise performance, precision-matched propeller assemblies designed using blade element momentum theory to achieve maximum thrust per watt at the design cruise condition while maintaining adequate static thrust for takeoff and climb, sophisticated electronic speed controllers managing motor commutation, current limiting, and regenerative braking functions with integrated telemetry reporting motor temperature, voltage, and current for real-time health monitoring, optional fuel tanks and small internal combustion engines for hybrid-electric configurations extending endurance beyond pure-electric limits by recharging batteries in-flight or providing supplemental power during high-demand flight phases, and comprehensive thermal management systems including heat sinks, cooling fans, and strategic airflow paths preventing battery and motor overheating during continuous high-power operations ensuring component longevity and safety.
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
                      Our UAV propulsion analysis employs detailed battery discharge modeling capturing voltage sag under load, temperature effects, and capacity fade over operational life to accurately predict available energy throughout missions, comprehensive motor efficiency mapping measuring torque-speed-efficiency relationships across the operational envelope identifying optimal operating points and quantifying losses from copper heating and iron core losses, systematic propeller selection analysis evaluating diameter, pitch, blade count, and airfoil sections using computational fluid dynamics or empirical data to maximize static thrust and cruise efficiency while avoiding tip speed limitations, time-stepped mission profile simulations integrating flight dynamics, propulsion performance, and environmental conditions to calculate instantaneous power demands during taxi, takeoff, climb, cruise, descent, and landing phases, precise endurance calculations accounting for all electrical consumers including avionics, payloads, communication systems, and control actuators establishing realistic mission duration estimates with appropriate reserves, and thermal modeling using computational heat transfer methods predicting component temperatures under sustained operation ensuring batteries and motors remain within safe operating limits preventing thermal runaway or performance degradation.
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
                      Optimized UAV propulsion systems deliver maximum flight time through efficient energy conversion and careful component matching maximizing on-station endurance for surveillance, mapping, and inspection missions, highly reliable electric propulsion with few moving parts and no combustion-related failures providing consistent performance over thousands of flight hours with minimal maintenance requirements, proven hybrid-electric capability enabling extended range beyond pure-electric limitations by combining battery power with small generator sets or fuel cells for multi-hour missions, predictable energy budgets through comprehensive modeling allowing operators to plan mission profiles with confidence knowing available endurance under various payload and environmental conditions, mission-proven component selections using commercially available motors, batteries, and controllers that have demonstrated reliability in operational UAV programs reducing development risk and procurement costs, and modular propulsion architectures with standardized mounting interfaces and electrical connections enabling rapid configuration changes to match different mission requirements or upgrade to improved battery chemistries as technology advances without redesigning the entire airframe.
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
                  <p class="text-purple-100 text-sm leading-relaxed">Flight control law design, autopilot validation, sensor suite integration, waypoint/geo-fence navigation, and autonomous mission planning with real-time fail-safe logic.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.hydraulic }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.hydraulic" class="p-6 md:p-8 bg-gradient-to-b from-purple-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Flight Control Design</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Mission Planning</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Sensor Fusion</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Safety Logic</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🎮</span>
                    Key Components
                  </p>
                  <div class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV autonomous flight systems integrate sophisticated avionics enabling hands-off operation through advanced flight computers running real-time control algorithms processing sensor inputs and generating servo commands at rates exceeding 100Hz ensuring stable flight even in turbulent conditions, high-precision inertial measurement units combining MEMS accelerometers and rate gyroscopes measuring three-axis linear acceleration and angular rates providing fundamental aircraft attitude and rate information for stabilization and navigation, multi-constellation GPS/GNSS receivers utilizing signals from GPS, GLONASS, Galileo, and BeiDou satellites to determine position with meter-level accuracy enabling autonomous waypoint navigation and return-to-home capabilities, barometric altimeters measuring atmospheric pressure to determine altitude above mean sea level with decimeter precision for terrain following and controlled climbs and descents, pitot-static airspeed sensors measuring dynamic pressure to calculate indicated airspeed critical for maintaining aerodynamic flight regimes and preventing stalls, and precision servo actuators with position feedback directly controlling elevators, ailerons, and rudders translating digital flight computer commands into mechanical surface deflections with sub-degree accuracy and sufficient bandwidth to achieve desired handling qualities.
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
                      Our UAV autopilot development employs linearized flight dynamics analysis deriving small-perturbation equations of motion around trim conditions to understand natural aircraft modes including short period, phugoid, dutch roll, and spiral characteristics informing control law architecture, systematic proportional-integral-derivative controller tuning using root locus, frequency response, and time-domain methods to achieve desired phase margins, gain margins, and transient response characteristics ensuring stable tracking of commanded attitudes and flight paths, sophisticated waypoint navigation algorithms implementing line-following, orbit, and loiter patterns with wind compensation calculating required headings and bank angles to track desired ground tracks despite atmospheric disturbances, advanced extended Kalman filter design fusing GPS position, barometric altitude, airspeed, and IMU measurements into optimal state estimates rejecting sensor noise and bridging GPS outages through inertial propagation, comprehensive failure modes and effects analysis identifying critical sensor failures, actuator jams, and communication losses designing redundancy and degraded-mode logic ensuring graceful degradation rather than catastrophic failures, and extensive hardware-in-the-loop and software-in-the-loop testing simulating thousands of mission scenarios including nominal operations, off-nominal conditions, and emergency procedures validating control laws before first flight reducing risk and development time.
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
                      Optimized UAV autopilot systems enable fully autonomous mission execution from takeoff through landing without operator intervention allowing single pilots to manage multiple aircraft simultaneously expanding operational capacity, consistently stable flight characteristics through well-tuned control laws maintaining coordinated flight and preventing pilot-induced oscillations even with inexperienced operators reducing training requirements, precision navigation following pre-planned routes with meter-level accuracy maintaining consistent standoff distances and coverage patterns critical for mapping, inspection, and surveillance missions, robust fail-safe operation through comprehensive fault detection automatically identifying sensor failures, low battery conditions, or lost communication link triggering appropriate emergency responses including return-to-home or controlled descent to safe landing zones, intuitive mission planning interfaces allowing operators to define complex flight paths using simple point-and-click waypoint entry with automatic route optimization and no-fly-zone enforcement accessible to personnel without extensive aviation backgrounds, and real-time adaptive behavior responding to changing conditions including unexpected wind shifts, airspace restrictions, or target movements by recalculating optimal paths maintaining mission effectiveness despite environmental uncertainties.
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
                  <p class="text-rose-100 text-sm leading-relaxed">Design iteration acceleration, 3D printing readiness analysis, manufacturing simulation, regulatory compliance documentation, and rapid test correlation to minimize time-to-field deployment.</p>
                </div>
                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300" :class="{ 'rotate-180': expandedServices.internal }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.internal" class="p-6 md:p-8 bg-gradient-to-b from-rose-50 to-white">
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Design Iteration</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Additive Mfg</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Compliance Docs</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Test Correlation</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">⚡</span>
                    Key Activities
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      UAV rapid development programs leverage streamlined engineering processes to accelerate concept-to-deployment timelines including comprehensive concept studies exploring multiple configuration options evaluating aerodynamic efficiency, structural feasibility, and mission suitability through parametric trade studies identifying optimal design directions before committing to detailed design, rapid 3D CAD modeling using parametric solid modeling tools creating detailed digital representations of all airframe components, propulsion systems, and avionics installations enabling visualization, interference checking, and design reviews without physical prototypes, accelerated analysis cycles utilizing automated finite element meshing and batch processing running multiple load cases overnight providing structural margins and identifying design weaknesses within days rather than weeks, systematic test planning developing comprehensive ground and flight test matrices defining instrumentation requirements, success criteria, and risk mitigation strategies ensuring efficient test campaigns that gather maximum data with minimum flights, rigorous quality assurance implementing design reviews, analysis verification, and configuration control ensuring all components meet specifications and interface requirements preventing costly field failures and rework, and thorough field validation conducting representative mission profiles under operational conditions verifying predicted performance, identifying any unanticipated issues, and building operator confidence before full-scale deployment.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Methods
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our UAV development methodology employs parametric CAD techniques using design tables and configurations enabling rapid geometry changes for trade studies and optimization without rebuilding entire assemblies, automated finite element analysis workflows with scripted meshing, load application, and post-processing reducing analysis turnaround time from days to hours enabling more design iterations and higher confidence in structural margins, design-for-additive-manufacturing principles utilizing topology optimization, lattice structures, and consolidation of assemblies taking full advantage of 3D printing capabilities to reduce part count, assembly time, and weight while enabling complex organic geometries impossible with traditional manufacturing, comprehensive risk management using failure modes and effects analysis, fault tree analysis, and probabilistic assessment identifying high-risk areas focusing engineering attention and resources where they provide maximum value, stringent supplier quality oversight implementing first article inspections, process audits, and receiving inspections ensuring purchased components meet specifications and reliability requirements preventing field failures from substandard parts, and systematic model validation comparing analysis predictions against test measurements identifying and correcting modeling errors building confidence that simulation accurately represents physical hardware behavior enabling design certification based partially on analysis rather than extensive testing reducing development costs and schedules.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Program Benefits
                  </p>
                  <div class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Accelerated UAV programs achieve rapid technology readiness level maturation advancing from preliminary design through flight test in months rather than years responding quickly to emerging operational needs or market opportunities, significant cost reduction through efficient use of engineering resources, minimized physical prototyping leveraging simulation to eliminate unnecessary hardware builds, and optimized test campaigns focusing flight hours on critical validation rather than exploratory testing, dramatically fewer design-build-test cycles through high-fidelity simulation catching problems in the digital environment before committing to hardware reducing expensive and time-consuming physical iterations, streamlined regulatory compliance producing well-organized analysis documentation, test reports, and design substantiation packages satisfying civil aviation authorities or military certification bodies facilitating approval processes, demonstrated proven performance through systematic validation building stakeholder confidence that the UAV will perform as promised in operational environments meeting mission requirements and reliability targets, and expedited market entry deploying new capabilities ahead of competitors capitalizing on first-mover advantages in rapidly evolving UAV markets for applications ranging from precision agriculture to infrastructure inspection to defense reconnaissance.
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Accelerate Your UAV Program</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          From long-endurance surveillance to rapid-deployment tactical systems—proven CAE methodology reduces development risk and time-to-field for commercial, industrial, and defense applications.
        </p>
        <RouterLink to="/contact_us" class="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Start Your Program
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
