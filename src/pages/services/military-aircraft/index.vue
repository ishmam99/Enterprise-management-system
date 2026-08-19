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
        <div class="absolute top-20 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl">
        </div>
      </div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-3xl">
          <p class="text-red-300 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">Defense &amp; Military
          </p>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Military Aircraft Design &amp; Analysis</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Advanced CAE solutions for fighter aircraft, transport, and rotorcraft programs—mission readiness,
            survivability, and rapid development cycles. Multi-disciplinary integration across structures, propulsion,
            avionics, and weapons integration.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Engineering Services in Military Aircraft</h2>

        <div class="space-y-6">
          <!-- Primary Structures -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 md:p-8 cursor-pointer hover:from-red-700 hover:to-red-800 transition-all"
              @click="toggleService('primary')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  ✈️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Primary Structures Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Advanced structural analysis for fighter fuselage,
                    wing box, and empennage with multi-load path requirements, combat maneuver loads, and stealth design
                    integration.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.primary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.primary" class="p-6 md:p-8 bg-gradient-to-b from-red-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80"
                  alt="Fighter Aircraft Primary Structure Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Static Analysis</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Fatigue Analysis</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Dynamic Analysis</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">CFD</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section bg-white">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Major Military Aircraft Primary Structure Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Structural Components -->
                    <div class="mb-6">
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">
                        Structural Components
                      </p>

                      <!-- Structural Components Grid -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Our analysis encompasses <strong>Fuselage Frames</strong> (stringers, longerons, ring frames) and
                            <strong>Bulkheads</strong> (pressure bulkheads, firewalls),
                            <strong>Wing Spars</strong> (front spar, rear spar, main carry-through spar) and <strong>Ribs</strong> (formers, stiffeners), <strong>Wing Skins</strong> (upper panels, lower panels, stringers),
                            <strong>Tail Structures</strong> (vertical stabilizer, horizontal stabilizer, fin box),
                            <strong>Wing Box Assemblies</strong> (torque box, carry-through structure, attachment fittings),
                            <strong>Canards</strong> (control surfaces, actuator mounts, hinge assemblies),
                            <strong>Landing Gear</strong> (main gear struts, nose gear, retraction mechanisms, doors, shock absorbers),
                            <strong>Weapons Bay</strong> (bay doors, latches, structural frames, ejection systems),
                            <strong>Stealth Panels</strong> (RAM panels, serrated edges, conformal surfaces), and
                            <strong>Engine Mounts</strong> (thrust mounts, engine frames, firewall structures, vibration isolators). Our Analysis
                            includes
                            both metallic and composite materials used in modern military aircraft structures.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Aircraft_Wing.jpg" alt="Aircraft Primary Structure Components"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">
                        <strong>Analysis Methods:</strong>
                      </p>

                      <!-- 1. Static Strength Analysis -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>1. Static Strength Analysis:</strong> Our analysis capabilities encompass Static
                            Strength Analysis for multi-load cases using Classical Methods and FEA using advanced
                            Finite Element tools
                            like MSC Nastran, Patran, HyperWorks, Ansys, Abaqus, Femap, etc.
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mt-3">
                            We also perform <strong>Nonlinear Analysis</strong> for material plasticity, contact
                            mechanics, and large deformations using MSC Marc, Nastran and Abaqus. The analysis
                            include for high-g maneuvers, weapon loads, external air pressure load,
                            pressure, temperature and enforced displacement.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Static Strength Analysis.png"
                            alt="Static Strength Analysis" class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <!-- 2. Fatigue Analysis -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Fatigue Analysis.png"
                            alt="Fatigue Analysis" class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>2. Fatigue Analysis:</strong> We also perform Fatigue Analysis for crack
                            propagation
                            and life prediction with classical methods and as well as commercial available Fatigue
                            Analysis software like MSC Fatigue etc.
                          </p>
                        </div>
                      </div>

                      <!-- 3. Damage Tolerance Analysis -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>3. Damage Tolerance Analysis:</strong> We also perform Damage Tolerance Analysis
                            for
                            extension of aircraft components like Landing Gear, Doors, Skin, etc.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Damage Tolerance Analysis.png"
                            alt="Damage Tolerance Analysis" class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <!-- 4. Dynamic Analysis -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Dynamic Analysis.jpg"
                            alt="Dynamic Analysis" class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>4. Dynamic Analysis:</strong> We perform Dynamic Analysis like modal response,
                            transient events, and shock loads using Nastran, Ansys, etc.
                          </p>
                        </div>
                      </div>

                      <!-- 5. Aeroelastic Analysis -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-lime-50 to-lime-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>5. Aeroelastic Analysis:</strong> We conduct Aeroelastic Analysis evaluating
                            flutter, divergence, and gust response.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Aeroelastic Analysis.jpg"
                            alt="Aeroelastic Analysis" class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <!-- 6. Advance FEM Modeling -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Advanced FEM Modeling for the entire Aircraft.webp"
                            alt="FEM Modeling" class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>6. Advanced FEM Modeling for the entire Aircraft:</strong> We perform LFEM
                            (Local
                            Finite Element Model) and GFEM (Global Finite Element Model) modeling of the entire
                            aircraft
                            for our customers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Systems Structures -->
                    <div>
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Systems Structures</p>

                      <p class="text-sm text-gray-700 leading-relaxed mb-6">
                        We are capable of performing systems structures analysis which include Fuel System,
                        Hydraulic Systems, Electrical System, Flight Control System, etc.
                      </p>

                      <!-- 1. Fuel Systems -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Aircraft_Fuel System.jpg" alt="Fuel System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>1. Fuel Systems:</strong> We perform Fuel System Structure Analysis using Classical
                            Method and advance Finite Element Code like Nastran, Abaqus, Patran and Femap. Major
                            components of a Fuel System Analysis includes: Fuel Tanks, Fuel Tubes, Pumps and other
                            related components.
                          </p>
                        </div>
                      </div>

                      <!-- 2. Hydraulic Systems -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>2. Hydraulic Systems:</strong> We perform Hydraulic System Structure Analysis using
                            Classical Method and advance Finite Element Code like Nastran, Abaqus, and Femap. Major
                            components of a Hydraulic System Analysis includes Hydraulic Tubes, Support Brackets,
                            Actuators, Pumps and other related components.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Hydraulic Systems.jpg" alt="Hydraulic System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <!-- 3. Electrical Systems -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Electrical Systems.jpg" alt="Electrical System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>3. Electrical Systems:</strong> We perform Electrical System Structure Analysis using
                            Classical Method and advance Finite Element Code like Nastran, Abaqus, and Femap for support
                            structure of Power distribution, Wiring and Avionics Component.
                          </p>
                        </div>
                      </div>

                      <!-- 4. Flight Control Systems -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>4. Flight Control Systems:</strong> We perform Flight Control System Structure
                            Analysis using Classical Method and advance Finite Element Code like Nastran, Abaqus, and
                            Femap for supporting structures of Fly-by-wire technology, Actuators, and Control Surfaces
                            like Flap, Aileron, Elevator, Rudder etc.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Flight Control Systems.jpg" alt="Flight Control System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>

                      <!-- 5. ECS (Environmental Control Systems) -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/ECS (Environmental Control Systems).png" alt="Environmental Control System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                        <div class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>5. ECS (Environmental Control Systems):</strong> We perform Environmental Control
                            System Structure Analysis using Classical Method and advance Finite Element Code like
                            Nastran, Abaqus, and Femap for support structures of Pressurization, Heating, and Cooling
                            Systems for crew comfort and equipment functionality etc.
                          </p>
                        </div>
                      </div>

                      <!-- 6. Avionics Systems -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-lg">
                          <p class="text-sm text-gray-700 leading-relaxed">
                            <strong>6. Avionics Systems:</strong> We perform Avionics System Structure Analysis using
                            Classical Method and advance Finite Element Code like Nastran, Abaqus, and Femap for
                            supporting structures of radar, navigation, and communications equipment.
                          </p>
                        </div>
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="/images/Avionics Systems.jpg" alt="Avionics System Analysis"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed mb-6">
                      We employ comprehensive Static Analysis, Fatigue Analysis, and Dynamic Analysis methodologies
                      using industry-leading CAE tools to evaluate structural performance under extreme combat
                      conditions.
                    </p>

                    <!-- Text left, Image right layout -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <!-- Text Content -->
                      <div>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">
                          Our analysis capabilities encompass <strong>Static Analysis</strong>
                          for multi-load case FEA and stress evaluation using MSC Nastran, Patran,
                          <strong>Fatigue Analysis</strong> for crack propagation and life prediction with MSC Fatigue,
                          <strong>Dynamic Analysis</strong> covering modal response, transient events, and shock loads
                          utilizing LS-DYNA and Adams,
                          <strong>Nonlinear Analysis</strong> for material plasticity, contact mechanics, and large
                          deformations using MSC Marc,
                          <strong>Aeroelastic Analysis</strong> evaluating flutter, divergence, and gust response,
                          and <strong>Combat Load Analysis</strong> for high-g maneuvers, weapon loads, and asymmetric
                          stores.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                            Nastran</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Patran</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                            Marc</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Adams</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                            Fatigue</span>
                        </div>
                      </div>

                      <!-- Image -->
                      <div class="rounded-lg overflow-hidden shadow-lg">
                        <img src="/images/Aircraft_Strcuture_Analysis.png" alt="FEA and Structural Analysis"
                          class="w-full h-64 object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Structures -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 md:p-8 cursor-pointer hover:from-orange-700 hover:to-orange-800 transition-all"
              @click="toggleService('secondary')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  ⚙️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Secondary Structure Analysis</h3>
                  <p class="text-orange-100 text-sm leading-relaxed">Non-primary structural components including access
                    panels, fairings, intake ramps, and thermal management systems with manufacturing and maintenance
                    accessibility.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.secondary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.secondary" class="p-6 md:p-8 bg-gradient-to-b from-orange-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1583551167558-4e5b39e4b8c3?w=1200&q=80"
                  alt="Aircraft Secondary Structures and Panels" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Pressure Loads</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Thermal Buckling</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Vibration/NVH</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Manufacturing Sim</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Secondary structural components include engine inlet ramps that control airflow into propulsion
                      systems while withstanding supersonic pressure differentials and thermal loads, avionics fairings
                      designed to house sensitive electronic equipment while maintaining aerodynamic efficiency and
                      electromagnetic shielding, access panels and doors strategically positioned for rapid maintenance
                      access to critical systems with secure latching mechanisms, canopy structure providing pilot
                      visibility and protection through advanced transparent materials and emergency ejection
                      integration, thermal protection systems using heat-resistant materials and coatings to manage
                      extreme temperature gradients during high-speed flight, and equipment bay covers that protect
                      internal systems while allowing quick removal for maintenance and upgrades.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced analysis techniques include supersonic pressure analysis using computational fluid
                      dynamics to evaluate shock wave effects and pressure distributions at high Mach numbers, thermal
                      stress coupling analysis combining heat transfer and structural mechanics to assess
                      temperature-induced deformations and stresses, vibration and flutter analysis through modal
                      testing and aeroelastic simulations to prevent destructive resonance conditions, lightning strike
                      protection analysis ensuring electromagnetic compatibility and structural integrity after direct
                      strikes, manufacturing tolerance studies using statistical methods to optimize production
                      processes and ensure part interchangeability, and field maintenance review incorporating human
                      factors engineering to minimize service time and reduce operational costs.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized designs deliver rapid access capabilities through strategically placed panels and
                      intuitive fastening systems that reduce maintenance time by up to 50%, maintenance-optimized
                      configurations featuring modular components and standardized interfaces that streamline repair
                      procedures, supersonic capability maintained across all flight regimes through aerodynamically
                      refined shapes and robust structural design, advanced thermal management incorporating passive and
                      active cooling solutions to protect sensitive components, field-replaceable units designed for
                      quick swaps in austere environments with minimal tooling requirements, and cost-effective
                      solutions achieved through design for manufacturing principles and lifecycle cost analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fuel System Analysis -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 md:p-8 cursor-pointer hover:from-amber-700 hover:to-amber-800 transition-all"
              @click="toggleService('fuel')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  ⛽</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Fuel System Analysis</h3>
                  <p class="text-amber-100 text-sm leading-relaxed">Fuel tank design, fuel distribution plumbing, pump
                    and valve performance, thermal effects, and combat survivability with leak-proof
                    compartmentalization for military operations.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.fuel }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.fuel" class="p-6 md:p-8 bg-gradient-to-b from-amber-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
                  alt="Aircraft Fuel System Engineering" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">System Modeling</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Slosh Analysis</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">FMEA</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Survivability Check</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Complete fuel system components include self-sealing fuel tank bladders utilizing advanced
                      elastomeric materials that automatically seal punctures from small arms fire, high-performance
                      fuel pumps and valves engineered for reliable operation across extreme temperature ranges and
                      altitude conditions, fuel lines and plumbing networks designed with redundant paths and
                      fire-resistant materials to ensure continuous fuel supply, comprehensive vent and drain systems
                      that maintain proper tank pressurization while preventing fuel vapor accumulation, emergency
                      jettison systems enabling rapid external tank release for combat maneuverability, and aerial
                      refueling probe assemblies compatible with multiple tanker types for extended mission endurance.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Comprehensive analysis methods include integrated system simulation modeling the entire fuel
                      distribution network from tank to engine with all control logic and failure modes, advanced fuel
                      slosh modeling using computational fluid dynamics to predict liquid motion effects on aircraft
                      stability during aggressive maneuvers, detailed pressure and flow analysis ensuring adequate fuel
                      delivery across all flight conditions including negative-g situations, thermal effects evaluation
                      assessing fuel temperature changes due to aerodynamic heating and cryogenic conditions at high
                      altitude, burst and leak scenario testing through finite element analysis to verify structural
                      integrity under overpressure and impact conditions, and regulatory compliance verification against
                      military fuel system standards including MIL-DTL specifications.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Design benefits deliver leak-proof systems through redundant sealing and advanced materials that
                      prevent fuel loss even under battle damage, combat-survivable architecture with crash-resistant
                      fuel cells and self-sealing capabilities that maximize crew safety, extended operational range
                      achieved through optimized tank placement and capacity maximization within airframe constraints,
                      rapid aerial refueling capability enabling quick turnaround times and sustained operations in
                      contested environments, emergency jettison functionality for weight reduction during critical
                      combat maneuvers, and reliable all-attitude operation ensuring consistent fuel flow regardless of
                      aircraft orientation during aerobatic combat sequences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hydraulic System Analysis -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 md:p-8 cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-all"
              @click="toggleService('hydraulic')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  🔷</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Hydraulic System Analysis</h3>
                  <p class="text-purple-100 text-sm leading-relaxed">Flight control hydraulics, landing gear actuation,
                    brake systems, and redundant pressure networks with combat-critical component reliability and
                    failure isolation.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.hydraulic }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.hydraulic" class="p-6 md:p-8 bg-gradient-to-b from-purple-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80"
                  alt="Hydraulic Systems and Actuators" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">System Simulation</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Redundancy FMEA</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Transient Analysis</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Thermal Management</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Critical hydraulic system components including pumps, accumulators, control valves, flight
                      actuators, landing gear cylinders, and brake assemblies for flight control and actuation.
                    </p>
                  </div>
                  <div class="space-y-2">
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Hydraulic pump/motor</p>
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Accumulators</p>
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Control valves</p>
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Flight actuators</p>
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Landing gear cylinders</p>
                    <p
                      class="text-sm text-gray-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-200 cursor-default">
                      • Brake assemblies</p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced hydraulic analysis encompasses comprehensive system modeling using bond graph and lumped
                      parameter methods to capture dynamic behavior of the complete hydraulic network including pumps,
                      accumulators, and actuators, detailed pressure and flow analysis evaluating system response during
                      transient conditions such as rapid control surface deflections and gear deployment, rigorous
                      redundancy verification simulating single and multiple failures to confirm continued safe
                      operation through independent hydraulic circuits, precise actuation load evaluation calculating
                      required hydraulic forces under aerodynamic loads across the flight envelope, thermal cycling
                      studies assessing fluid property changes and seal performance across temperature extremes from
                      arctic cold starts to desert operations, and comprehensive failure isolation testing validating
                      that component failures are contained within individual subsystems without cascading effects.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized hydraulic systems achieve dual or triple redundancy architectures ensuring mission
                      completion even after sustaining battle damage with automatic system reconfiguration, combat
                      survivability through physically separated hydraulic circuits and protective routing away from
                      vulnerable areas, exceptional high reliability with mean time between failure (MTBF) exceeding
                      military specifications through quality component selection and robust design practices, emergency
                      operation capability providing sufficient hydraulic power for flight control and landing even with
                      complete engine failure using accumulator reserves, minimum downtime achieved through built-in
                      test equipment and prognostic health monitoring that enables predictive maintenance, and rapid
                      troubleshooting facilitated by modular line-replaceable units and comprehensive fault isolation
                      procedures reducing aircraft-on-ground time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ECS System Analysis -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 md:p-8 cursor-pointer hover:from-cyan-700 hover:to-cyan-800 transition-all"
              @click="toggleService('ecs')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  ❄️</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">ECS System Analysis</h3>
                  <p class="text-cyan-100 text-sm leading-relaxed">Environmental control system design, cabin
                    pressurization, thermal management, and air distribution with high-altitude and high-performance
                    flight envelope compatibility.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.ecs }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.ecs" class="p-6 md:p-8 bg-gradient-to-b from-cyan-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1581093458791-9d42e1d5b5d3?w=1200&q=80"
                  alt="Environmental Control Systems" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Thermal Network</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Pressurization</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">CFD Distribution</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">System Optimization</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Environmental control system components include compressor and turbine assemblies extracting bleed
                      air from engines and conditioning it for cabin use through compression and expansion cycles,
                      efficient heat exchangers transferring thermal energy between air streams using ram air and fuel
                      as heat sinks to achieve desired cabin temperatures, comprehensive cabin duct systems distributing
                      conditioned air throughout the cockpit with adjustable louvers for personalized comfort, precise
                      pressure control valves maintaining optimal cabin altitude through modulated outflow regulation
                      and automatic pressure scheduling, air cycle machines utilizing thermodynamic cycles to cool and
                      dehumidify bleed air without requiring chemical refrigerants, and outlet air trim systems
                      providing fine temperature adjustment at distribution points for enhanced pilot comfort during
                      extended missions.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Comprehensive ECS analysis includes thermal network modeling creating detailed representations of
                      heat sources, sinks, and transfer paths to predict cockpit temperatures under all operating
                      conditions, pressure scheduling analysis developing altitude-dependent cabin pressure profiles
                      that optimize pilot comfort while minimizing structural loads on the fuselage, computational fluid
                      dynamics duct flow analysis evaluating air distribution patterns to eliminate hot spots and ensure
                      uniform temperature distribution, high-altitude effects evaluation assessing system performance at
                      ceiling altitude including reduced bleed air availability and increased pressure differentials,
                      transient response testing simulating rapid altitude changes and emergency descents to verify
                      system stability and pilot safety, and failure tolerance verification demonstrating continued
                      operation with degraded performance after single-point failures through backup modes and redundant
                      components.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized ECS designs deliver exceptional crew comfort maintaining optimal temperature and
                      humidity levels that reduce pilot fatigue and enhance decision-making during critical mission
                      phases, combat capable systems designed to continue operation even after sustaining battle damage
                      through redundant air sources and fail-safe pressure relief, high-G operation support providing
                      adequate ventilation and cooling during sustained high-g maneuvers when pilot metabolic rates
                      increase significantly, minimum weight designs achieved through integrated heat exchanger concepts
                      and optimized duct routing that reduce parasitic weight, reduced maintenance requirements through
                      accessible components and condition-based monitoring that extends service intervals, and
                      exceptional system reliability with multiple backup modes ensuring mission completion even with
                      degraded ECS performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Internal Load Analysis -->
          <div
            class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
            <div
              class="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-6 md:p-8 cursor-pointer hover:from-rose-700 hover:to-rose-800 transition-all"
              @click="toggleService('internal')">
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  📐</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-2">Internal Load Analysis</h3>
                  <p class="text-rose-100 text-sm leading-relaxed">Load synthesis, internal load distribution, stress
                    concentration analysis, and margin tracking across all flight regimes with combat maneuvering load
                    cases.</p>
                </div>
                <div
                  class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedServices.internal }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="expandedServices.internal" class="p-6 md:p-8 bg-gradient-to-b from-rose-50 to-white">
              <!-- Image Section -->
              <div class="mb-6 overflow-hidden rounded-xl shadow-lg">
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
                  alt="Structural Load Analysis and FEA" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Loads Synthesis</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Margin Tracking</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Stress Analysis</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Compliance Verification</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Key Components
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Comprehensive structural components analyzed include fuselage structure frames and bulkheads
                      forming the primary load-carrying skeleton that distributes flight loads throughout the airframe,
                      wing box assemblies integrating spars, ribs, and skins to create efficient torsion-resistant
                      structures capable of withstanding bending and shear from aerodynamic forces, control surfaces
                      including ailerons, elevators, rudders, and their actuation mechanisms requiring precise load
                      analysis for control authority, landing gear struts and attachment fittings designed to absorb
                      high-impact loads during carrier landings or rough field operations, engine mount structures
                      isolating propulsion system vibrations while transferring thrust and inertial loads to the
                      airframe, and fastener interfaces at thousands of joint locations requiring detailed load transfer
                      analysis to prevent joint failure and ensure structural integrity.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced analysis techniques include load case synthesis combining thousands of flight conditions,
                      maneuvers, and weight configurations into a comprehensive load envelope covering the entire
                      operational spectrum, internal load distribution analysis using finite element methods to trace
                      load paths through complex structural assemblies and identify critical load transfer mechanisms,
                      stress concentration evaluation at geometric discontinuities such as holes, cutouts, and radius
                      transitions using fine-mesh techniques and analytical correction factors, rigorous margin
                      calculation procedures applying factors of safety and verifying compliance with military strength
                      requirements across all structural elements, combat maneuver load assessment evaluating extreme
                      tactical scenarios including sustained turns, split-s maneuvers, and high-speed pullouts that
                      generate peak structural loads, and comprehensive compliance verification documenting conformance
                      with military specifications including MIL-STD-1530 for structural integrity programs.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Design Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Optimized internal load analysis delivers precise load tracking throughout the entire structure
                      with automated margin reporting systems that instantly highlight areas requiring design attention,
                      comprehensive margin verification at every structural element ensuring adequate safety factors
                      while avoiding over-conservative designs that add unnecessary weight, design optimization
                      capabilities identifying weight reduction opportunities through stress-based material removal and
                      topology optimization while maintaining structural performance, high confidence predictions
                      validated through correlation with test data and proven analysis methodologies reducing
                      certification risk, combat-ready structures certified for the most demanding military operational
                      scenarios including arrested landings, catapult launches, and asymmetric store loadings, and
                      certification-ready documentation packages including detailed stress reports, margin summaries,
                      and compliance matrices formatted to military acquisition standards for streamlined approval
                      processes.
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Accelerate Your Military Program</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Partner with CAE SoftSys for comprehensive engineering solutions that deliver combat-ready platforms with
          rapid development cycles and proven reliability.
        </p>
        <RouterLink to="/contact_us"
          class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Start Your Program
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
