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
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Static Strength Analysis</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Evaluate structural performance under steady loads—like weight, pressure, or constant displacement—without time-dependent effects. Validate safety margins, stiffness, deformation and ensure designs meet strength requirements to prevent structural failure and material yielding.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Static Strength Analysis Capabilities</h2>

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
                  <h3 class="text-2xl font-bold mb-2">Linear &amp; Nonlinear Static Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Comprehensive static strength analysis evaluating structural behavior under sustained loads. Linear elastic analysis for small deformations and nonlinear analysis for material plasticity, large deformations, and complex material behaviors.</p>
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
                <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
                  alt="Static Strength Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Linear Static</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Nonlinear Static</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Buckling</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Contact Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section bg-white">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Static Strength Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Static Analysis -->
                    <div class="mb-6">
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Linear &amp; Nonlinear Static Analysis
                      </p>

                      <!-- Text left, Image right layout -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <!-- Text Content -->
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Our static strength analysis capabilities encompass comprehensive evaluation of structural behavior under sustained loads including <strong>weight</strong>, <strong>pressure</strong>, <strong>constant forces</strong>, and <strong>fixed displacements</strong>. We analyze stress distributions, displacements, and reaction forces to ensure designs meet strength requirements and prevent structural failure.
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>Analysis Methods:</strong>
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>1. Linear Static Analysis:</strong> Multi-load case FEA and stress evaluation for structures under fixed loads. We analyze stress concentrations, factor of safety calculations, and compliance with design codes (ASME, EN, ISO standards). Perfect for structures experiencing small deformations and linear material behavior.

                            <strong>2. Nonlinear Static Analysis:</strong> Advanced nonlinear FEA for material plasticity, contact mechanics, large deformations, and geometric nonlinearity using MSC Marc, Nastran SOL 400, and Abaqus. Essential for structures experiencing material yielding, contact interactions, or significant deflections.

                            <strong>3. Buckling Analysis:</strong> Linear and nonlinear buckling analysis to determine critical loads and stability of structures under compressive loading. Critical for slender structures, pressure vessels, and aerospace components.

                            <strong>4. Contact Analysis:</strong> Complex contact interactions between multiple components including friction, separation, and sliding behaviors. Essential for bolted joints, press-fit assemblies, and mechanical interfaces.

                            <strong>5. Pre-stress Analysis:</strong> Evaluation of structures with initial stresses, pre-tensioned cables, or residual stresses from manufacturing processes.

                            <strong>6. Code Compliance:</strong> Verification against international standards including ASME, EN, ISO, and industry-specific codes for pressure vessels, piping, and structural components.
                            </p>
                        </div>


                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80" alt="Static Strength Stress Distribution"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Applications -->
                    <div>
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Applications &amp; Industries</p>

                      <!-- Image left, Text right layout -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80" alt="Static Strength Applications"
                            class="w-full h-64 object-cover" />
                        </div>

                        <!-- Text Content -->
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Static strength analysis applications span across diverse industries where structural integrity under sustained loads is critical.
                            <strong>1. Pressure Vessels &amp; Piping:</strong> Static analysis for pressure vessels, tanks, and piping systems under internal pressure, external loads, and thermal expansion. Essential for compliance with ASME, EN, and other pressure vessel codes.
                            <strong>2. Civil Infrastructure:</strong> Building structures, bridges, and foundations under dead loads, live loads, and environmental loads. Critical for safety and code compliance in construction projects.
                            <strong>3. Aerospace Structures:</strong> Aircraft fuselage, wings, and components under steady aerodynamic loads, pressurization, and weight. Ensures structural integrity throughout the flight envelope.
                            <strong>4. Automotive:</strong> Vehicle chassis, body structures, and suspension components under static loads. Critical for safety and performance in automotive design.
                            <strong>5. Industrial Equipment:</strong> Machine frames, support structures, and enclosures under operational loads. Ensures reliable operation and safety of industrial machinery.
                            <strong>6. Marine &amp; Offshore:</strong> Ship structures, offshore platforms, and marine equipment under static loads from weight, pressure, and environmental conditions.
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
                      We employ industry-leading static strength analysis software tools to deliver accurate stress and deformation predictions across diverse engineering applications and industries.
                    </p>

                    <!-- Text left, Image right layout -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <!-- Text Content -->
                      <div>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">
                          Our static strength analysis capabilities utilize comprehensive software suites including <strong>MSC Nastran</strong> for linear and nonlinear static analysis, <strong>Ansys</strong> for advanced static structural analysis, <strong>Abaqus</strong> for nonlinear static analysis with material and geometric nonlinearity, <strong>MSC Marc</strong> for advanced nonlinear static analysis, <strong>HyperWorks</strong> for pre-processing and analysis, <strong>GT STRUDL</strong> for structural analysis of complex geometries, and specialized tools like <strong>PV Elite</strong> and <strong>CAESAR II</strong> for pressure vessel and piping stress analysis. We use validated material models and proven analysis methodologies for accurate predictions.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                            Nastran</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Ansys</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Abaqus</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC Marc</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">PV Elite</span>
                        </div>
                      </div>

                      <!-- Image -->
                      <div class="rounded-lg overflow-hidden shadow-lg">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="Static Strength Analysis Software"
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
                  <h3 class="text-2xl font-bold mb-2">Pressure Vessel &amp; Piping Analysis</h3>
                  <p class="text-orange-100 text-sm leading-relaxed">Specialized static strength analysis for pressure vessels, tanks, and piping systems. Evaluate structural integrity under internal pressure, external loads, and thermal expansion with code compliance verification.</p>
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
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                  alt="Pressure Vessel Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Internal Pressure</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">External Loads</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Code Compliance</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Stress Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Pressure Vessel Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our pressure vessel and piping analysis capabilities include static analysis under internal and external pressure, stress evaluation at critical locations including heads, shells, nozzles, and supports, code compliance verification against ASME, EN, and other international standards, thermal expansion analysis for piping systems, support and attachment analysis for vessel supports and piping hangers, and fatigue evaluation for pressure cycling. We use specialized tools like PV Elite for pressure vessel design and CAESAR II for piping stress analysis, ensuring compliance with industry codes and standards.
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
                      Our pressure vessel analysis methods include membrane stress analysis for thin-walled vessels, bending stress evaluation at discontinuities and attachments, stress concentration analysis at nozzles and openings, buckling analysis for vessels under external pressure, thermal stress analysis from temperature gradients, and comprehensive load case evaluation including pressure, weight, wind, seismic, and thermal loads. We apply code-specific stress limits and safety factors to ensure compliance with ASME Section VIII, EN 13445, and other applicable standards.
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
                      Pressure vessel and piping applications include chemical process vessels, storage tanks, heat exchangers, boiler components, nuclear reactor vessels, and industrial piping systems. Benefits include prevention of catastrophic failures through accurate stress prediction, code compliance ensuring regulatory approval, optimization of wall thickness reducing material costs, early identification of stress concentrations for design improvement, cost reduction through virtual testing reducing physical prototypes, and improved safety through comprehensive load case evaluation and proper application of safety factors.
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
                  <h3 class="text-2xl font-bold mb-2">Composite Material Analysis</h3>
                  <p class="text-amber-100 text-sm leading-relaxed">Specialized static strength analysis for composite materials including fiber-reinforced composites, laminates, and advanced materials. Evaluate ply-by-ply stresses, failure criteria, and structural performance of composite structures.</p>
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
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80"
                  alt="Composite Material Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Ply Analysis</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Failure Criteria</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Delamination</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Anisotropic</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Composite Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our composite material analysis capabilities include ply-by-ply stress evaluation analyzing individual layers in composite laminates, failure criteria analysis using Tsai-Wu, Hashin, Maximum Stress, and other composite failure theories, delamination analysis evaluating interlaminar stresses and potential delamination, progressive failure analysis tracking damage accumulation through composite structure, anisotropic material modeling accounting for directional material properties, and multi-scale analysis from fiber level to component level. We analyze carbon fiber, glass fiber, and other advanced composite materials used in aerospace, automotive, and industrial applications.
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
                      Our composite analysis methods include classical lamination theory for thin composite plates, first-ply failure analysis identifying the first layer to fail, progressive failure analysis tracking damage through multiple plies, interlaminar stress analysis for delamination prediction, thermal expansion analysis accounting for anisotropic thermal properties, and failure mode analysis identifying fiber failure, matrix failure, or delamination. We use specialized composite analysis tools and validated material models to accurately predict composite behavior under static loading conditions.
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
                      Composite material applications include aerospace structures like aircraft wings and fuselage panels, automotive body panels and chassis components, wind turbine blades, marine structures, and sports equipment. Benefits include lightweight design through optimal material usage, improved strength-to-weight ratio compared to metals, design flexibility through tailored fiber orientations, early identification of failure modes for design improvement, cost reduction through virtual testing, and compliance with composite design standards and certification requirements.
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
                  <h3 class="text-2xl font-bold mb-2">Contact &amp; Assembly Analysis</h3>
                  <p class="text-purple-100 text-sm leading-relaxed">Advanced contact analysis for bolted joints, press-fit assemblies, and mechanical interfaces. Evaluate contact stresses, friction effects, and load transfer in complex assemblies under static loading.</p>
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
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
                  alt="Contact Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Friction</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Separation</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Sliding</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Preload</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Contact Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our contact analysis capabilities include friction contact analysis evaluating sliding and sticking behavior, separation and gap analysis for components that may separate under load, preload analysis for bolted joints and press-fit assemblies, contact stress evaluation at interfaces, load transfer analysis through contact surfaces, and multi-body contact analysis for complex assemblies. We analyze bolted joints, press-fit connections, interference fits, and mechanical interfaces to ensure proper load transfer and prevent contact failures.
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
                      Our contact analysis methods include penalty method for contact constraint enforcement, Lagrange multiplier method for exact contact constraint satisfaction, augmented Lagrangian method combining penalty and Lagrange approaches, contact detection algorithms for identifying contact pairs, friction modeling using Coulomb friction or more advanced friction laws, and contact element formulation for accurate stress prediction at interfaces. We use advanced contact algorithms to handle complex contact scenarios including self-contact, large sliding, and contact with friction.
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
                      Contact analysis applications include bolted joint design and analysis, press-fit and interference fit evaluation, bearing and bushing analysis, gasket and seal design, mechanical assembly analysis, and fastener design. Benefits include accurate prediction of contact stresses preventing premature failure, optimization of preload and interference for optimal performance, identification of contact separation issues for design improvement, cost reduction through virtual testing, improved product reliability through proper contact design, and compliance with design standards for bolted connections and mechanical interfaces.
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
                  <h3 class="text-2xl font-bold mb-2">Buckling &amp; Stability Analysis</h3>
                  <p class="text-cyan-100 text-sm leading-relaxed">Buckling and stability analysis for structures under compressive loading. Determine critical loads, evaluate stability, and prevent structural instability in slender structures and pressure vessels.</p>
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
                  alt="Buckling Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Linear Buckling</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Nonlinear Buckling</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Eigenvalue</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Stability</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Buckling Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our buckling and stability analysis capabilities include linear buckling analysis using eigenvalue methods to determine critical loads, nonlinear buckling analysis accounting for geometric and material nonlinearity, initial imperfection analysis evaluating sensitivity to manufacturing defects, post-buckling analysis for structures that can carry load beyond buckling, local and global buckling evaluation for complex structures, and stability analysis for structures under various loading conditions. We analyze columns, plates, shells, and complex structures to ensure stability under compressive loads.
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
                      Our buckling analysis methods include eigenvalue buckling analysis solving the generalized eigenvalue problem to find critical loads and mode shapes, nonlinear buckling analysis using arc-length methods to trace the complete load-deflection path, initial imperfection sensitivity analysis evaluating how manufacturing defects affect buckling load, Riks method for post-buckling analysis, and stability criteria evaluation using energy methods. We apply appropriate safety factors and design codes to ensure structures remain stable under all loading conditions.
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
                      Buckling analysis applications include columns and struts in building structures, thin-walled pressure vessels under external pressure, aircraft fuselage and wing structures, offshore platform members, bridge components, and slender structural members. Benefits include prevention of catastrophic buckling failures through accurate critical load prediction, optimization of member sizes reducing material costs, compliance with buckling design codes and standards, early identification of stability issues for design improvement, cost reduction through virtual testing, and improved safety through comprehensive stability evaluation.
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
                  <h3 class="text-2xl font-bold mb-2">Stress Concentration &amp; Margin Analysis</h3>
                  <p class="text-rose-100 text-sm leading-relaxed">Detailed stress concentration analysis at geometric discontinuities and margin tracking throughout structures. Identify critical stress locations, evaluate factors of safety, and ensure adequate design margins.</p>
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
                  alt="Stress Concentration Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Stress Concentration</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Factor of Safety</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Margin Tracking</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Notch Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Stress Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our stress concentration and margin analysis capabilities include detailed stress evaluation at geometric discontinuities like holes, notches, fillets, and cutouts, stress concentration factor calculation using analytical methods and fine-mesh FEA, factor of safety calculation applying appropriate safety factors to material strength, margin tracking throughout structures identifying areas requiring design attention, notch sensitivity analysis evaluating how geometric features affect fatigue and static strength, and comprehensive stress reporting with automated margin summaries. We use submodeling techniques for detailed analysis of critical regions within larger models.
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
                      Our stress concentration analysis methods include fine-mesh FEA for accurate stress prediction at discontinuities, analytical stress concentration factors from handbooks and formulas, submodeling techniques for detailed analysis of critical regions, stress extrapolation methods for accurate peak stress prediction, margin calculation using yield strength, ultimate strength, and appropriate safety factors, and automated margin reporting systems that highlight areas requiring design attention. We apply industry-standard safety factors and design codes to ensure adequate margins throughout structures.
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
                      Stress concentration analysis applications include fastener holes and attachment points, geometric transitions and fillets, cutouts and openings in structures, weld joints and connections, and critical structural details. Benefits include prevention of unexpected failures through accurate stress prediction, optimization of geometric features reducing stress concentrations, comprehensive margin verification ensuring adequate safety factors, early identification of critical locations for design improvement, cost reduction through virtual testing, and improved product reliability through detailed stress analysis and proper margin management.
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ensure Structural Safety &amp; Compliance</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Partner with CAE SoftSys for comprehensive static strength analysis solutions that validate structural integrity, ensure code compliance, and prevent failures. Optimize designs for safety and efficiency.
        </p>
        <RouterLink to="/contact_us"
          class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Start Your Program
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
