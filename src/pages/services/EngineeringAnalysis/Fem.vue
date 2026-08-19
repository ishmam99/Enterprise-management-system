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
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">FEM Analysis</h1>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
            Virtual proving ground for innovation. Harness Finite Element Method (FEM) to design, predict, and optimize with confidence. Unleash the power of advanced simulation tools to ensure safety, reliability, and performance—before a single physical test.
          </p>
        </div>
      </div>
    </section>

    <!-- Key Services Overview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">FEM Analysis Capabilities</h2>

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
                  <h3 class="text-2xl font-bold mb-2">Static &amp; Dynamic Analysis</h3>
                  <p class="text-red-100 text-sm leading-relaxed">Evaluate structural integrity under fixed loads and vibrations. Comprehensive linear and nonlinear finite element analysis for static stress, dynamic response, modal analysis, and transient events across diverse engineering applications.</p>
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
                  alt="FEM Static and Dynamic Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Linear Static</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Modal Analysis</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Transient Response</p>
                  </div>
                  <div class="bg-red-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-red-700">Harmonic Analysis</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section bg-white">
                  <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Static Analysis Capabilities
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
                            Our static analysis capabilities encompass comprehensive <strong>Linear Static Analysis</strong> for multi-load case scenarios using advanced Finite Element tools like MSC Nastran, Patran, HyperWorks, Ansys, Abaqus, Femap, and GT STRUDL. We evaluate stress distributions, displacements, and reaction forces under various loading conditions.
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>Analysis Methods:</strong>
                          </p>
                          <p class="text-sm text-gray-700 leading-relaxed mb-4">
                            <strong>1. Linear Static Analysis:</strong> Multi-load case FEA and stress evaluation for structures under fixed loads. We analyze stress concentrations, factor of safety calculations, and compliance with design codes (ASME, EN, ISO standards).

                            <strong>2. Nonlinear Static Analysis:</strong> Advanced nonlinear FEA for material plasticity, contact mechanics, large deformations, and geometric nonlinearity using MSC Marc, Nastran SOL 400, and Abaqus. Perfect for structures experiencing material yielding, contact interactions, or significant deflections.

                            <strong>3. Buckling Analysis:</strong> Linear and nonlinear buckling analysis to determine critical loads and stability of structures under compressive loading. Essential for slender structures, pressure vessels, and aerospace components.

                            <strong>4. Pre-stress Analysis:</strong> Evaluation of structures with initial stresses, pre-tensioned cables, or residual stresses from manufacturing processes.

                            <strong>5. Contact Analysis:</strong> Complex contact interactions between multiple components including friction, separation, and sliding behaviors.

                            <strong>6. Composite Analysis:</strong> Specialized analysis for composite materials including ply-by-ply stress evaluation, failure criteria (Tsai-Wu, Hashin), and delamination analysis.
                            </p>
                        </div>


                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80" alt="FEM Static Analysis Stress Distribution"
                            class="w-full h-64 object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="group/section">
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <!-- Dynamic Analysis -->
                    <div>
                      <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">Dynamic Analysis Capabilities</p>

                      <!-- Image left, Text right layout -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <!-- Image -->
                        <div class="rounded-lg overflow-hidden shadow-lg">
                          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80" alt="FEM Dynamic Analysis Modal Shapes"
                            class="w-full h-64 object-cover" />
                        </div>

                        <!-- Text Content -->
                        <div>
                          <p class="text-sm text-gray-700 leading-relaxed">
                            Our dynamic analysis services cover comprehensive vibration and dynamic response evaluation across diverse engineering applications.
                            <strong>1. Modal Analysis:</strong> Natural frequency and mode shape analysis to identify resonance conditions and structural dynamic characteristics. Essential for avoiding resonance in rotating machinery, buildings, and aerospace structures.
                            <strong>2. Harmonic Response Analysis:</strong> Steady-state response to sinusoidal loading at various frequencies. Critical for rotating equipment, wind turbines, and structures subjected to periodic loads.
                            <strong>3. Transient Dynamic Analysis:</strong> Time-domain response to time-varying loads including impact, shock, and blast loading. Used for crash analysis, seismic response, and sudden load applications.
                            <strong>4. Random Vibration Analysis:</strong> Response to random loading using power spectral density (PSD) methods. Essential for aerospace structures, automotive components, and equipment subjected to random environmental loads.
                            <strong>5. Response Spectrum Analysis:</strong> Seismic analysis using response spectra for earthquake engineering applications. Evaluates maximum response without full time-history analysis.
                            <strong>6. Frequency Response Analysis:</strong> Transfer function analysis for control system design and NVH (Noise, Vibration, Harshness) applications in automotive and aerospace industries.
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
                    Software Tools &amp; Applications
                  </p>
                  <div
                    class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed mb-6">
                      We employ industry-leading FEM software tools to deliver accurate and reliable analysis results across diverse engineering applications and industries.
                    </p>

                    <!-- Text left, Image right layout -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <!-- Text Content -->
                      <div>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">
                          Our analysis capabilities utilize comprehensive FEM software suites including <strong>MSC Nastran</strong> for linear and nonlinear static/dynamic analysis, <strong>Ansys</strong> for multiphysics simulation, <strong>Abaqus</strong> for advanced nonlinear analysis, <strong>MSC Marc</strong> for nonlinear FEA with material and geometric nonlinearity, <strong>HyperWorks</strong> for pre-processing and optimization, <strong>GT STRUDL</strong> for structural analysis of complex geometries, and <strong>Femap</strong> for integrated FEA modeling and analysis. We also use specialized tools like <strong>PV Elite</strong> and <strong>CAESAR II</strong> for pressure vessel and piping stress analysis.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                            Nastran</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Ansys</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Abaqus</span>
                          <span
                            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC Marc</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">HyperWorks</span>
                          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">GT STRUDL</span>
                        </div>
                      </div>

                      <!-- Image -->
                      <div class="rounded-lg overflow-hidden shadow-lg">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="FEM Software Analysis Results"
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
                  <h3 class="text-2xl font-bold mb-2">Nonlinear &amp; Advanced Analysis</h3>
                  <p class="text-orange-100 text-sm leading-relaxed">Advanced nonlinear finite element analysis for material plasticity, contact mechanics, large deformations, and complex material behaviors. Handle real-world engineering challenges with sophisticated simulation capabilities.</p>
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
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
                  alt="Nonlinear FEM Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Material Nonlinearity</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Contact Analysis</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Large Deformation</p>
                  </div>
                  <div class="bg-orange-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-orange-700">Geometric Nonlinearity</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Nonlinear Analysis Types
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our nonlinear analysis capabilities cover material nonlinearity including elastoplastic behavior, creep, viscoelasticity, and hyperelastic materials for rubber and polymers. Geometric nonlinearity handles large displacements, rotations, and buckling instabilities. Contact analysis manages complex interactions between multiple components with friction, separation, and sliding behaviors. We also perform advanced analysis for composite materials with progressive failure, delamination, and damage mechanics. Hyperelastic analysis for elastomers and soft materials, and coupled multiphysics analysis combining structural, thermal, and fluid interactions in a single simulation.
                    </p>
                  </div>
                </div>
                <div class="group/section">
                  <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                    Advanced Analysis Methods
                  </p>
                  <div
                    class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Advanced nonlinear analysis techniques include incremental-iterative solution methods using Newton-Raphson, arc-length, and modified Newton methods for convergence in highly nonlinear problems. Material model calibration from experimental data to accurately represent real material behavior. Contact algorithms including penalty, Lagrange multiplier, and augmented Lagrangian methods for robust contact resolution. Adaptive meshing and remeshing for problems with large deformations and material failure. Submodeling techniques for detailed analysis of critical regions within larger models. Failure analysis including crack propagation, damage mechanics, and progressive failure analysis for composite materials and structures.
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
                      Nonlinear analysis delivers accurate predictions for real-world engineering problems where linear assumptions fail. Applications include metal forming and manufacturing processes, rubber and elastomer components, crash and impact analysis, bolted and welded joint analysis, pressure vessels and piping systems, and composite material structures. Benefits include reduced physical prototyping costs, early identification of failure modes, optimization of material usage, improved product reliability, compliance with design codes, and accelerated time-to-market through virtual testing and validation.
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
                  <h3 class="text-2xl font-bold mb-2">Thermal &amp; Thermo-Mechanical Analysis</h3>
                  <p class="text-amber-100 text-sm leading-relaxed">Comprehensive thermal analysis and thermo-mechanical coupling for structures subjected to temperature gradients, thermal cycling, and combined thermal-mechanical loading. Essential for high-temperature applications and thermal management systems.</p>
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
                <img src="https://images.unsplash.com/photo-1581093458791-9d42e1d5b5d3?w=1200&q=80"
                  alt="Thermal FEM Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Steady-State Thermal</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Transient Thermal</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Thermal Stress</p>
                  </div>
                  <div class="bg-amber-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-amber-700">Thermal Buckling</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Thermal Analysis Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our thermal analysis capabilities include steady-state thermal analysis for temperature distribution under constant thermal loads, transient thermal analysis for time-dependent temperature fields during heating/cooling cycles, thermal stress analysis combining temperature fields with structural analysis to evaluate thermally-induced stresses and deformations, thermal buckling analysis for structures under thermal loading, conjugate heat transfer analysis combining conduction, convection, and radiation, and thermal fatigue analysis for components subjected to cyclic thermal loading. We analyze heat exchangers, electronic cooling, engine components, pressure vessels, and process equipment.
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
                      Our thermal analysis methods include finite element heat transfer analysis using conduction, convection, and radiation boundary conditions, coupled thermo-mechanical analysis where temperature fields drive structural deformation and stress, thermal contact analysis for interfaces with thermal resistance and gap conductance, phase change analysis for melting, solidification, and evaporation processes, thermal optimization to minimize temperature gradients and thermal stresses, and thermal shock analysis for rapid temperature changes. We use temperature-dependent material properties including thermal conductivity, specific heat, and coefficient of thermal expansion to ensure accurate predictions.
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
                      Thermal analysis applications span across industries including power generation equipment, automotive engine components, aerospace thermal protection systems, electronic cooling and packaging, process equipment and heat exchangers, and nuclear reactor components. Benefits include prevention of thermal failures through accurate temperature prediction, optimization of cooling systems for improved efficiency, reduction of thermal stresses to extend component life, compliance with thermal design codes and standards, cost reduction through virtual thermal testing, and improved product reliability by identifying thermal hotspots and optimizing thermal management strategies.
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
                  <h3 class="text-2xl font-bold mb-2">Fatigue &amp; Lifecycle Analysis</h3>
                  <p class="text-purple-100 text-sm leading-relaxed">Predict where and when material fatigue may occur to prevent failure. Comprehensive fatigue analysis for crack propagation, life prediction, and damage tolerance evaluation under cyclic loading conditions.</p>
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
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
                  alt="Fatigue Analysis" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">High-Cycle Fatigue</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Low-Cycle Fatigue</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Crack Propagation</p>
                  </div>
                  <div class="bg-purple-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-purple-700">Damage Tolerance</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Fatigue Analysis Types
                  </p>
                  <div
                    class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our fatigue analysis capabilities include high-cycle fatigue (HCF) analysis for components subjected to millions of load cycles using stress-life (S-N) and strain-life (ε-N) approaches. Low-cycle fatigue (LCF) analysis for components with significant plastic deformation using strain-based methods. Multiaxial fatigue analysis for complex stress states using critical plane methods. Fatigue crack growth analysis using fracture mechanics principles (Paris law, Forman equation). Damage tolerance analysis for structures with existing flaws or cracks. Thermal fatigue analysis for components subjected to cyclic thermal loading. Vibration fatigue analysis for structures under random or harmonic loading. We use industry-standard tools like MSC Fatigue, nCode DesignLife, and FE-SAFE.
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
                      Our fatigue analysis methods include stress-based fatigue analysis using S-N curves and Goodman, Gerber, or Soderberg mean stress corrections. Strain-based fatigue analysis using ε-N curves with Neuber's rule for notch correction. Fracture mechanics-based crack growth analysis using Paris law and stress intensity factors. Rainflow counting for variable amplitude loading to extract cycle information. Miner's rule for cumulative damage calculation under variable amplitude loading. Critical plane methods for multiaxial fatigue including Findley, Matake, and Dang Van criteria. Probabilistic fatigue analysis using statistical distributions of material properties and loading. We integrate FEA stress/strain results with fatigue analysis tools for accurate life predictions.
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
                      Fatigue analysis applications include aerospace structures and components, automotive chassis and powertrain, rotating machinery and turbomachinery, offshore structures and marine equipment, pressure vessels and piping systems, and civil infrastructure. Benefits include prevention of unexpected failures through accurate life prediction, optimization of maintenance schedules based on predicted fatigue life, cost reduction by avoiding over-conservative designs, compliance with fatigue design codes and standards, improved product reliability and safety, and extended service life through proper fatigue design and material selection.
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
                  <h3 class="text-2xl font-bold mb-2">Multiphysics Simulation</h3>
                  <p class="text-cyan-100 text-sm leading-relaxed">Handle combined physics—fluid-structure interaction, thermal stress, electromagnetic effects, and more—in one integrated model. Comprehensive multiphysics analysis for complex real-world engineering problems.</p>
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
                <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80"
                  alt="Multiphysics Simulation" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Fluid-Structure</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Thermo-Mechanical</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Electromagnetic</p>
                  </div>
                  <div class="bg-cyan-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-cyan-700">Acoustic-Structure</p>
                  </div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="group/section">
                  <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span
                      class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                    Multiphysics Capabilities
                  </p>
                  <div
                    class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our multiphysics simulation capabilities include fluid-structure interaction (FSI) for problems where fluid flow affects structural deformation and vice versa, such as aeroelasticity, sloshing, and wind loading. Thermo-mechanical coupling for structures subjected to both thermal and mechanical loads simultaneously. Electromagnetic-structural coupling for MEMS devices, actuators, and sensors. Acoustic-structure interaction for noise, vibration, and harshness (NVH) analysis. Piezoelectric analysis for smart structures and sensors. Magnetostrictive analysis for actuators and transducers. We use integrated CAE platforms that combine FEA, CFD, and other physics solvers in a unified environment for accurate multiphysics predictions.
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
                      Our multiphysics analysis methods include one-way coupling where results from one physics solver are transferred as loads to another, two-way coupling with iterative solution between physics solvers until convergence, monolithic coupling where multiple physics are solved simultaneously in a single system of equations, partitioned coupling using separate solvers with data exchange at interfaces, and co-simulation with synchronized time-stepping between different physics solvers. We use advanced coupling algorithms including interface interpolation, load and displacement transfer, and convergence criteria to ensure accurate multiphysics predictions. Applications include aeroelastic flutter analysis, thermal-stress in electronic packages, FSI in offshore structures, and MEMS device simulation.
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
                      Multiphysics simulation applications include aeroelastic analysis for aircraft wings and control surfaces, thermal management in electronic systems, offshore structures under wave and wind loading, MEMS and microsystems design, automotive NVH analysis, and biomedical device simulation. Benefits include accurate prediction of real-world behavior where multiple physics interact, reduced need for physical testing through virtual prototyping, optimization of designs considering all relevant physics simultaneously, early identification of design issues before manufacturing, compliance with multiphysics design requirements, and accelerated innovation through comprehensive virtual testing capabilities.
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
                  <h3 class="text-2xl font-bold mb-2">Structural Optimization</h3>
                  <p class="text-rose-100 text-sm leading-relaxed">Optimize structures for weight, cost, and performance using topology optimization, shape optimization, and size optimization. Balance material usage, geometry, and load paths for maximum efficiency.</p>
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
                  alt="Structural Optimization" class="w-full h-64 md:h-80 object-cover" />
              </div>
              <div class="mb-6 pb-6 border-b border-gray-300">
                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Topology Optimization</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Shape Optimization</p>
                  </div>
                  <div class="bg-rose-100 rounded-lg px-3 py-2">
                    <p class="text-xs font-semibold text-rose-700">Size Optimization</p>
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
                    Optimization Types
                  </p>
                  <div
                    class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                    <p class="text-sm text-gray-700 leading-relaxed">
                      Our structural optimization capabilities include topology optimization to determine optimal material distribution within a design space, shape optimization to optimize geometric boundaries and contours, size optimization for cross-sectional dimensions, thickness, and material properties, multi-objective optimization balancing conflicting objectives like weight, cost, and performance, manufacturing constraints including minimum member size, draw direction, and symmetry, and performance constraints including stress, displacement, frequency, and buckling limits. We use gradient-based and gradient-free optimization algorithms including method of moving asymptotes (MMA), sequential quadratic programming (SQP), and genetic algorithms.
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
                      Our optimization methods include density-based topology optimization using SIMP (Solid Isotropic Material with Penalization) method, level-set methods for topology optimization with sharp boundaries, parametric shape optimization using CAD-based parameterization, free-form shape optimization using mesh morphing techniques, gradient-based optimization with adjoint sensitivity analysis for efficient computation, and surrogate model-based optimization for computationally expensive problems. We integrate optimization with FEA solvers for automated design iteration, use design of experiments (DOE) for initial exploration, and apply robust optimization considering manufacturing tolerances and material property variations. Tools include OptiStruct, TOSCA, and HyperStudy from Altair, as well as Ansys Topology Optimization and Abaqus Optimization.
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
                      Structural optimization applications include lightweight design for aerospace and automotive components, material cost reduction while maintaining performance, additive manufacturing design optimization for 3D printing, compliant mechanism design, and composite layup optimization. Benefits include significant weight reduction (often 20-50%) while maintaining structural integrity, cost reduction through optimal material usage, improved performance through better load paths and stress distribution, faster design cycles through automated optimization, innovative designs that may not be intuitive to human designers, and sustainability improvements through reduced material consumption and lower manufacturing energy requirements.
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Accelerate Your Engineering Innovation</h2>
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Partner with CAE SoftSys for comprehensive FEM analysis solutions that deliver optimized designs with
          reduced development cycles, lower costs, and proven reliability. Predict real-world performance before physical testing.
        </p>
        <RouterLink to="/contact_us"
          class="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
          Start Your Program
        </RouterLink>
      </div>
    </section>
  <!-- </DefaultLayout> -->
</template>
