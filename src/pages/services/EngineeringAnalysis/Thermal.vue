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
          <p class="text-red-300 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">Engineering Analysis
          </p>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Thermal Analysis</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Predict how heat moves through your product—by conduction, convection, radiation and even phase change—to ensure components stay cool, reliable, and efficient. Comprehensive thermal simulation tools capture all heat-transfer paths during design, reducing risks of overheating and thermal failure.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Thermal Analysis Capabilities</h2>

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
                  <h3 class="text-2xl font-bold mb-2">Steady-State &amp; Transient Thermal Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Comprehensive thermal analysis evaluating temperature distribution, heat flow, and thermal gradients. Simulate how temperature evolves over time or under constant load to ensure optimal thermal management and prevent overheating failures.</p>
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
                <img src="https://images.unsplash.com/photo-1581093458791-9d42e1d5b5d3?w=1200&q=80"
                  alt="Thermal Analysis Heat Distribution" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Steady-State</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Transient Thermal</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Thermal Stress</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Heat Transfer</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section bg-white">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Thermal Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Thermal Analysis -->
                    <div class="mb-6">
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Heat Transfer Analysis
                      </p>

                      <!-- Text left, Image right layout -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <!-- Text Content -->
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Our thermal analysis capabilities encompass comprehensive evaluation of temperature distribution, heat flow, and thermal gradients through <strong>conduction</strong>, <strong>convection</strong>, and <strong>radiation</strong> mechanisms. We analyze how heat moves through materials and systems to ensure components stay cool, reliable, and efficient.
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>Analysis Methods:</strong>
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>1. Steady-State Thermal Analysis:</strong> Evaluate temperature distribution under constant thermal loads. Perfect for systems operating at equilibrium conditions where temperatures have stabilized. We analyze heat sinks, electronic enclosures, and heat exchangers under steady operating conditions.

                            <strong>2. Transient Thermal Analysis:</strong> Time-dependent temperature analysis for heating and cooling cycles. Essential for understanding thermal behavior during startup, shutdown, or varying operating conditions. Critical for thermal shock analysis and thermal cycling fatigue evaluation.

                            <strong>3. Thermal Stress Analysis:</strong> Coupled thermo-mechanical analysis combining temperature fields with structural analysis to evaluate thermally-induced stresses and deformations. Temperature affects material strength, electrical performance, and system safety.

                            <strong>4. Conjugate Heat Transfer:</strong> Combined analysis of conduction, convection, and radiation in complex systems. We model heat exchangers, cooling systems, and thermal management solutions with accurate boundary conditions.

                            <strong>5. Phase Change Analysis:</strong> Evaluation of melting, solidification, and evaporation processes. Essential for manufacturing processes, thermal energy storage, and cryogenic applications.

                            <strong>6. Thermal Optimization:</strong> Identify hotspots, optimize component placement, and design cooling features to minimize temperature gradients and thermal stresses while reducing physical testing costs.
                            </p>
                        </div>


                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1581093458791-9d42e1d5b5d3?w=1200&q=80" alt="Thermal Analysis Heat Distribution"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Thermal Applications -->
                    <div>
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Applications &amp; Industries</p>

                      <!-- Image left, Text right layout -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" alt="Thermal Management Applications"
                            class="w-full h-64 object-cover" />
                        </div>

                        <!-- Text Content -->
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Thermal analysis applications span across diverse industries where temperature management is critical.
                            <strong>1. Electronics &amp; Semiconductor:</strong> PCB thermal simulation, avoiding thermal hotspots in electronic assemblies, managing airflow in data centers, and thermal management in consumer electronics. Critical for preventing component failure and ensuring reliable operation.
                            <strong>2. Automotive:</strong> Engine cooling systems, battery thermal management for electric vehicles, thermal protection systems, and HVAC systems. Essential for vehicle performance, safety, and passenger comfort.
                            <strong>3. Aerospace:</strong> Thermal protection systems for high-speed flight, engine component cooling, avionics thermal management, and thermal cycling in space applications. Critical for mission success and equipment reliability.
                            <strong>4. Power Generation:</strong> Heat exchanger design, turbine cooling, nuclear reactor thermal analysis, and renewable energy thermal systems. Ensures efficient energy conversion and system reliability.
                            <strong>5. Manufacturing:</strong> Welding thermal analysis, additive manufacturing thermal history prediction, heat treatment processes, and thermal stress in manufacturing. Prevents defects and optimizes production processes.
                            <strong>6. HVAC &amp; Building Systems:</strong> Building thermal comfort analysis, HVAC system design, thermal insulation evaluation, and energy efficiency optimization. Critical for occupant comfort and energy conservation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Software Tools &amp; Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed mb-6">
                      We employ industry-leading thermal analysis software tools to deliver accurate temperature predictions and thermal management solutions across diverse engineering applications.
                    </p>

                    <!-- Text left, Image right layout -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <!-- Text Content -->
                      <div>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">
                          Our thermal analysis capabilities utilize comprehensive software suites including <strong>Ansys Thermal</strong> for steady-state and transient thermal analysis, <strong>MSC Nastran</strong> for thermal-structural coupling, <strong>Abaqus</strong> for advanced thermal-mechanical analysis, <strong>MSC Marc</strong> for nonlinear thermal analysis with phase change, <strong>FloTHERM</strong> for electronics cooling, and <strong>CFD tools</strong> for conjugate heat transfer analysis. We use temperature-dependent material properties including thermal conductivity, specific heat, and coefficient of thermal expansion to ensure accurate predictions. Our methods include finite element heat transfer analysis, thermal contact analysis, and multiphysics coupling for realistic thermal behavior prediction.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Ansys
                            Thermal</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC Nastran</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Abaqus</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC Marc</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">FloTHERM</span>
                        </div>
                      </div>

                      <!-- Image -->
                      <div class="rounded-lg overflow-hidden shadow-lg">
                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80" alt="Thermal Analysis Software Results"
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
                  <h3 class="text-2xl font-bold mb-2">Thermo-Mechanical Coupling</h3>
                  <p class="text-orange-100 text-sm leading-relaxed">Coupled thermal-structural analysis combining heat transfer with structural deformation. Evaluate how temperature changes cause stress, deformation, and material property changes in real-world operating conditions.</p>
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
                <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
                  alt="Thermo-Mechanical Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Thermal Stress</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Thermal Expansion</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Material Properties</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Thermal Cycling</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Coupling Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermo-mechanical coupling capabilities include temperature-driven structural deformation analysis where thermal expansion causes mechanical stress, thermal stress evaluation combining temperature fields with structural loads to assess combined loading effects, material property variation with temperature including Young's modulus, yield strength, and thermal expansion coefficient changes, thermal buckling analysis for structures under thermal loading that may experience instability, residual stress analysis from manufacturing processes like welding and heat treatment, and thermal fatigue analysis for components subjected to cyclic thermal loading that causes material degradation over time.
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
                      Our thermo-mechanical analysis methods include one-way coupling where temperature fields from thermal analysis are transferred as loads to structural analysis, two-way coupling with iterative solution between thermal and structural solvers until convergence, monolithic coupling where thermal and structural physics are solved simultaneously in a single system of equations, thermal contact analysis for interfaces with thermal resistance and gap conductance affecting both heat transfer and structural behavior, temperature-dependent material properties including thermal expansion coefficients, modulus variation, and yield strength changes, and thermal shock analysis for rapid temperature changes that cause high thermal gradients and potential material failure.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Applications &amp; Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Thermo-mechanical coupling applications include electronic packaging where thermal expansion causes solder joint failure, engine components experiencing thermal cycling and high temperatures, manufacturing processes like welding and heat treatment with residual thermal stresses, aerospace structures under aerodynamic heating, and power generation equipment with thermal gradients. Benefits include prevention of thermal failures through accurate temperature and stress prediction, optimization of cooling systems for improved efficiency, reduction of thermal stresses to extend component life, compliance with thermal design codes and standards, cost reduction through virtual thermal testing, and improved product reliability by identifying thermal hotspots and optimizing thermal management strategies.
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
                  <h3 class="text-2xl font-bold mb-2">Electronics Thermal Management</h3>
                  <p class="text-amber-100 text-sm leading-relaxed">Specialized thermal analysis for electronic systems including PCB thermal simulation, component-level heat dissipation, airflow management, and thermal optimization to prevent overheating and ensure reliable operation of sensitive electronic equipment.</p>
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
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
                  alt="Electronics Thermal Management" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">PCB Thermal</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Component Cooling</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Airflow Analysis</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Heat Sink Design</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Electronics Thermal Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our electronics thermal management capabilities include PCB thermal simulation analyzing heat generation from components and trace heating, component-level thermal analysis for ICs, processors, and power devices, enclosure thermal analysis evaluating airflow patterns and heat dissipation, heat sink optimization designing efficient cooling solutions for high-power components, thermal interface material analysis evaluating contact resistance and heat transfer paths, and system-level thermal analysis for complete electronic assemblies including power supplies, displays, and communication modules.
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
                      Our electronics thermal analysis methods include detailed component power mapping identifying heat generation sources, conjugate heat transfer analysis combining conduction through PCB and components with convection from airflow, thermal resistance network modeling for simplified system-level analysis, CFD analysis for detailed airflow and heat transfer in enclosures, thermal optimization using design of experiments and parametric studies, and reliability assessment evaluating component junction temperatures against maximum operating limits to ensure long-term reliability and prevent thermal-induced failures.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Applications &amp; Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Electronics thermal management applications include consumer electronics like smartphones and laptops, data center servers and networking equipment, automotive electronics and battery management systems, aerospace avionics and satellite systems, medical devices requiring precise temperature control, and industrial control systems. Benefits include prevention of component failure through accurate temperature prediction, optimization of cooling solutions for improved efficiency and reduced power consumption, extended component life by maintaining safe operating temperatures, reduced physical prototyping costs through virtual thermal testing, improved product reliability by identifying thermal hotspots early, and compliance with thermal design standards and reliability requirements.
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
                  <h3 class="text-2xl font-bold mb-2">Heat Exchanger &amp; Cooling Systems</h3>
                  <p class="text-purple-100 text-sm leading-relaxed">Specialized thermal analysis for heat exchangers, cooling systems, and thermal management equipment. Optimize heat transfer efficiency, evaluate thermal performance, and design effective cooling solutions for diverse applications.</p>
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
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                  alt="Heat Exchanger Thermal Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Heat Transfer</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Flow Analysis</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Efficiency Optimization</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">CFD Thermal</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Heat Exchanger Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our heat exchanger and cooling system analysis capabilities include shell-and-tube heat exchanger thermal performance evaluation, plate heat exchanger efficiency analysis, air-cooled heat exchanger design optimization, liquid cooling system thermal analysis, radiator thermal performance assessment, and thermal management system design for power electronics, engines, and industrial processes. We evaluate heat transfer coefficients, pressure drops, thermal effectiveness, and optimize designs for maximum efficiency.
                    </p>
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
                      Our heat exchanger analysis methods include CFD-based conjugate heat transfer analysis combining fluid flow with heat transfer, thermal effectiveness evaluation using NTU (Number of Transfer Units) methods, pressure drop analysis for both hot and cold fluid streams, thermal optimization using parametric studies and design of experiments, fouling factor analysis for long-term performance degradation, and multiphysics coupling combining thermal, fluid, and structural analysis for comprehensive system evaluation. We use industry-standard correlations and advanced CFD tools for accurate predictions.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Applications &amp; Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Heat exchanger applications include HVAC systems for buildings and vehicles, power plant condenser and boiler systems, automotive radiator and intercooler design, process industry heat recovery systems, data center cooling solutions, and renewable energy thermal systems. Benefits include optimized heat transfer efficiency reducing energy consumption, improved thermal performance through design optimization, extended equipment life by maintaining optimal operating temperatures, cost reduction through virtual testing and optimization, compliance with thermal efficiency standards, and reduced physical prototyping costs through accurate simulation.
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
                  <h3 class="text-2xl font-bold mb-2">Thermal Cycling &amp; Fatigue</h3>
                  <p class="text-cyan-100 text-sm leading-relaxed">Thermal fatigue analysis for components subjected to cyclic thermal loading. Evaluate how repeated heating and cooling cycles cause material degradation, crack initiation, and component failure over time.</p>
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
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                  alt="Thermal Cycling Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Thermal Fatigue</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Cycle Life</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Crack Initiation</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Thermal Shock</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Thermal Fatigue Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermal fatigue analysis capabilities include thermal cycling life prediction evaluating how many heating and cooling cycles a component can withstand, thermal shock analysis for rapid temperature changes causing high thermal gradients, crack initiation prediction identifying where thermal fatigue cracks will start, damage accumulation analysis tracking progressive material degradation over thermal cycles, thermal-mechanical fatigue combining thermal and mechanical loading effects, and residual stress analysis from thermal cycling that affects fatigue behavior. We use temperature-dependent material properties and fatigue models to accurately predict thermal fatigue life.
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
                      Our thermal fatigue analysis methods include transient thermal analysis to determine temperature histories during thermal cycles, thermal stress calculation from temperature gradients and material constraints, fatigue life prediction using strain-based or stress-based approaches with temperature-dependent material properties, damage accumulation using Miner's rule or more advanced damage models, thermal shock evaluation for rapid temperature changes, and integration with structural fatigue analysis for combined thermal-mechanical fatigue. We use specialized thermal fatigue software and validated material models for accurate life predictions.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Applications &amp; Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Thermal fatigue applications include power generation equipment with startup/shutdown cycles, automotive engine components experiencing thermal cycling, electronic components with power cycling, manufacturing processes with thermal cycling like welding and heat treatment, aerospace structures under aerodynamic heating cycles, and process equipment with thermal cycling. Benefits include prevention of unexpected thermal fatigue failures through accurate life prediction, optimization of thermal cycling conditions to extend component life, cost reduction by avoiding over-conservative designs, compliance with thermal fatigue design standards, improved product reliability and safety, and extended service life through proper thermal design and material selection.
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
                  <h3 class="text-2xl font-bold mb-2">Thermal Optimization &amp; Design</h3>
                  <p class="text-rose-100 text-sm leading-relaxed">Thermal design optimization to minimize temperature gradients, reduce thermal stresses, and improve cooling efficiency. Optimize component placement, cooling features, and thermal management strategies for optimal performance.</p>
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
                <img src="https://images.unsplash.com/photo-1583551167558-4e5b39e4b8c3?w=1200&q=80"
                  alt="Thermal Optimization" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Topology Optimization</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Parameter Studies</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Design of Experiments</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Multi-Objective</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Optimization Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermal optimization capabilities include topology optimization to determine optimal material distribution for heat transfer, parametric optimization of cooling features like fin spacing and height, multi-objective optimization balancing thermal performance with weight and cost, design of experiments for systematic exploration of design space, thermal gradient minimization to reduce thermal stresses, and cooling system optimization for maximum efficiency. We use gradient-based and gradient-free optimization algorithms to find optimal thermal designs while satisfying constraints on temperature, stress, and other performance metrics.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Optimization Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermal optimization methods include gradient-based optimization with adjoint sensitivity analysis for efficient computation of thermal gradients, surrogate model-based optimization for computationally expensive thermal CFD problems, parametric studies systematically varying design parameters to understand their effect on thermal performance, design of experiments (DOE) for initial exploration of design space, multi-objective optimization balancing conflicting objectives like thermal performance, weight, and cost, and robust optimization considering manufacturing tolerances and material property variations. We integrate optimization with thermal analysis solvers for automated design iteration and use advanced algorithms to find optimal thermal designs.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                    Applications &amp; Benefits
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Thermal optimization applications include heat sink design for electronics cooling, heat exchanger optimization for maximum efficiency, thermal management system design for electric vehicles, cooling system optimization for data centers, thermal protection system design for aerospace, and process equipment thermal optimization. Benefits include improved thermal performance through optimized designs, reduced material usage and weight through efficient thermal management, cost reduction through virtual optimization reducing physical testing, extended component life by maintaining optimal temperatures, improved energy efficiency through better heat transfer, and faster design cycles through automated optimization reducing time-to-market.
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Optimize Your Thermal Performance</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Partner with CAE SoftSys for comprehensive thermal analysis solutions that ensure optimal temperature management, prevent overheating failures, and extend component life. Predict thermal behavior before physical testing.
        </p>
        <RouterLink to="/contact_us"
          class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Start Your Program
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
