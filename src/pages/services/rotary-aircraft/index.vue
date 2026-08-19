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
        <section
            class="relative py-16 md:py-24 bg-gradient-to-r from-slate-800 to-slate-700 text-white overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute top-20 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl">
                </div>
            </div>
            <div class="container mx-auto px-4 md:px-6 relative z-10">
                <div class="max-w-3xl">
                    <p class="text-green-300 font-semibold text-sm md:text-base mb-3 uppercase tracking-wide">Rotorcraft
                        Engineering</p>
                    <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Rotorcraft Design &amp; Analysis</h1>
                    <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Advanced rotor dynamics, aeroelasticity, and multi-disciplinary integration for military and
                        commercial rotorcraft—from preliminary design through certification with emphasis on safety and
                        mission performance.
                    </p>
                </div>
            </div>
        </section>

        <!-- Key Services Overview -->
        <section class="py-16 md:py-24 bg-white">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Engineering Services in Rotorcraft</h2>

                <div class="space-y-6">
                    <!-- Primary Structures -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 md:p-8 cursor-pointer hover:from-green-700 hover:to-green-800 transition-all"
                            @click="toggleService('primary')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    ✈️</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">Primary Structures Analysis</h3>
                                    <p class="text-red-100 text-sm leading-relaxed">Advanced structural analysis for
                                        fighter fuselage,
                                        wing box, and empennage with multi-load path requirements, combat maneuver
                                        loads, and stealth design
                                        integration.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
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
                                <img src="/images/Military Rotorcraft.jpeg"
                                    alt="Fighter Aircraft Primary Structure Analysis"
                                    class="w-full h-64 md:h-80 object-cover" />
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Analysis Type
                                </p>
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
                                    <p
                                        class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
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
                                                        Our analysis encompasses <strong>Fuselage Frames</strong>
                                                        (stringers, longerons, ring frames) and
                                                        <strong>Bulkheads</strong> (pressure bulkheads, firewalls),
                                                        <strong>Wing Spars</strong> (front spar, rear spar, main
                                                        carry-through spar) and <strong>Ribs</strong> (formers,
                                                        stiffeners), <strong>Wing Skins</strong> (upper panels, lower
                                                        panels, stringers),
                                                        <strong>Tail Structures</strong> (vertical stabilizer,
                                                        horizontal stabilizer, fin box),
                                                        <strong>Wing Box Assemblies</strong> (torque box, carry-through
                                                        structure, attachment fittings),
                                                        <strong>Canards</strong> (control surfaces, actuator mounts,
                                                        hinge assemblies),
                                                        <strong>Landing Gear</strong> (main gear struts, nose gear,
                                                        retraction mechanisms, doors, shock absorbers),
                                                        <strong>Weapons Bay</strong> (bay doors, latches, structural
                                                        frames, ejection systems),
                                                        <strong>Stealth Panels</strong> (RAM panels, serrated edges,
                                                        conformal surfaces), and
                                                        <strong>Engine Mounts</strong> (thrust mounts, engine frames,
                                                        firewall structures, vibration isolators). Our Analysis
                                                        includes
                                                        both metallic and composite materials used in modern military
                                                        aircraft structures.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Aircraft_Wing.jpg"
                                                        alt="Aircraft Primary Structure Components"
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
                                                        <strong>1. Static Strength Analysis:</strong> Our analysis
                                                        capabilities encompass Static
                                                        Strength Analysis for multi-load cases using Classical Methods
                                                        and FEA using advanced
                                                        Finite Element tools
                                                        like MSC Nastran, Patran, HyperWorks, Ansys, Abaqus, Femap, etc.
                                                    </p>
                                                    <p class="text-sm text-gray-700 leading-relaxed mt-3">
                                                        We also perform <strong>Nonlinear Analysis</strong> for material
                                                        plasticity, contact
                                                        mechanics, and large deformations using MSC Marc, Nastran and
                                                        Abaqus. The analysis
                                                        include for high-g maneuvers, weapon loads, external air
                                                        pressure load,
                                                        pressure, temperature and enforced displacement.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Static Strength Analysis.png"
                                                        alt="Static Strength Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                            </div>

                                            <!-- 2. Fatigue Analysis -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Fatigue Analysis.png" alt="Fatigue Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                                <div
                                                    class="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>2. Fatigue Analysis:</strong> We also perform Fatigue
                                                        Analysis for crack
                                                        propagation
                                                        and life prediction with classical methods and as well as
                                                        commercial available Fatigue
                                                        Analysis software like MSC Fatigue etc.
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- 3. Damage Tolerance Analysis -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div
                                                    class="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>3. Damage Tolerance Analysis:</strong> We also perform
                                                        Damage Tolerance Analysis
                                                        for
                                                        extension of aircraft components like Landing Gear, Doors, Skin,
                                                        etc.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Damage Tolerance Analysis.png"
                                                        alt="Damage Tolerance Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                            </div>

                                            <!-- 4. Dynamic Analysis -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Dynamic Analysis.jpg" alt="Dynamic Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                                <div
                                                    class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>4. Dynamic Analysis:</strong> We perform Dynamic
                                                        Analysis like modal response,
                                                        transient events, and shock loads using Nastran, Ansys, etc.
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- 5. Aeroelastic Analysis -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="bg-gradient-to-br from-lime-50 to-lime-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>5. Aeroelastic Analysis:</strong> We conduct Aeroelastic
                                                        Analysis evaluating
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
                                                <div
                                                    class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>6. Advanced FEM Modeling for the entire
                                                            Aircraft:</strong> We perform LFEM
                                                        (Local
                                                        Finite Element Model) and GFEM (Global Finite Element Model)
                                                        modeling of the entire
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
                                            <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-4">
                                                Systems Structures</p>

                                            <p class="text-sm text-gray-700 leading-relaxed mb-6">
                                                We are capable of performing systems structures analysis which include
                                                Fuel System,
                                                Hydraulic Systems, Electrical System, Flight Control System, etc.
                                            </p>

                                            <!-- 1. Fuel Systems -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Aircraft_Fuel System.jpg"
                                                        alt="Fuel System Analysis" class="w-full h-64 object-cover" />
                                                </div>
                                                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>1. Fuel Systems:</strong> We perform Fuel System
                                                        Structure Analysis using Classical
                                                        Method and advance Finite Element Code like Nastran, Abaqus,
                                                        Patran and Femap. Major
                                                        components of a Fuel System Analysis includes: Fuel Tanks, Fuel
                                                        Tubes, Pumps and other
                                                        related components.
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- 2. Hydraulic Systems -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div
                                                    class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>2. Hydraulic Systems:</strong> We perform Hydraulic
                                                        System Structure Analysis using
                                                        Classical Method and advance Finite Element Code like Nastran,
                                                        Abaqus, and Femap. Major
                                                        components of a Hydraulic System Analysis includes Hydraulic
                                                        Tubes, Support Brackets,
                                                        Actuators, Pumps and other related components.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Hydraulic Systems.jpg"
                                                        alt="Hydraulic System Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                            </div>

                                            <!-- 3. Electrical Systems -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Electrical Systems.jpg"
                                                        alt="Electrical System Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                                <div
                                                    class="bg-gradient-to-br from-violet-50 to-violet-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>3. Electrical Systems:</strong> We perform Electrical
                                                        System Structure Analysis using
                                                        Classical Method and advance Finite Element Code like Nastran,
                                                        Abaqus, and Femap for support
                                                        structure of Power distribution, Wiring and Avionics Component.
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- 4. Flight Control Systems -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div
                                                    class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>4. Flight Control Systems:</strong> We perform Flight
                                                        Control System Structure
                                                        Analysis using Classical Method and advance Finite Element Code
                                                        like Nastran, Abaqus, and
                                                        Femap for supporting structures of Fly-by-wire technology,
                                                        Actuators, and Control Surfaces
                                                        like Flap, Aileron, Elevator, Rudder etc.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Flight Control Systems.jpg"
                                                        alt="Flight Control System Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                            </div>

                                            <!-- 5. ECS (Environmental Control Systems) -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/ECS (Environmental Control Systems).png"
                                                        alt="Environmental Control System Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                                <div
                                                    class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>5. ECS (Environmental Control Systems):</strong> We
                                                        perform Environmental Control
                                                        System Structure Analysis using Classical Method and advance
                                                        Finite Element Code like
                                                        Nastran, Abaqus, and Femap for support structures of
                                                        Pressurization, Heating, and Cooling
                                                        Systems for crew comfort and equipment functionality etc.
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- 6. Avionics Systems -->
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                                                <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-lg">
                                                    <p class="text-sm text-gray-700 leading-relaxed">
                                                        <strong>6. Avionics Systems:</strong> We perform Avionics System
                                                        Structure Analysis using
                                                        Classical Method and advance Finite Element Code like Nastran,
                                                        Abaqus, and Femap for
                                                        supporting structures of radar, navigation, and communications
                                                        equipment.
                                                    </p>
                                                </div>
                                                <div class="rounded-lg overflow-hidden shadow-lg">
                                                    <img src="/images/Avionics Systems.jpg"
                                                        alt="Avionics System Analysis"
                                                        class="w-full h-64 object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-red-50 via-white to-red-50 border-l-4 border-red-600 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3 animate-fadeIn">
                                        <p class="text-sm text-gray-700 leading-relaxed mb-6">
                                            We employ comprehensive Static Analysis, Fatigue Analysis, and Dynamic
                                            Analysis methodologies
                                            using industry-leading CAE tools to evaluate structural performance under
                                            extreme combat
                                            conditions.
                                        </p>

                                        <!-- Text left, Image right layout -->
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                            <!-- Text Content -->
                                            <div>
                                                <p class="text-sm text-gray-700 leading-relaxed mb-4">
                                                    Our analysis capabilities encompass <strong>Static Analysis</strong>
                                                    for multi-load case FEA and stress evaluation using MSC Nastran,
                                                    Patran,
                                                    <strong>Fatigue Analysis</strong> for crack propagation and life
                                                    prediction with MSC Fatigue,
                                                    <strong>Dynamic Analysis</strong> covering modal response, transient
                                                    events, and shock loads
                                                    utilizing LS-DYNA and Adams,
                                                    <strong>Nonlinear Analysis</strong> for material plasticity, contact
                                                    mechanics, and large
                                                    deformations using MSC Marc,
                                                    <strong>Aeroelastic Analysis</strong> evaluating flutter,
                                                    divergence, and gust response,
                                                    and <strong>Combat Load Analysis</strong> for high-g maneuvers,
                                                    weapon loads, and asymmetric
                                                    stores.
                                                </p>
                                                <div class="flex flex-wrap gap-2 mt-3">
                                                    <span
                                                        class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                                                        Nastran</span>
                                                    <span
                                                        class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Patran</span>
                                                    <span
                                                        class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                                                        Marc</span>
                                                    <span
                                                        class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Adams</span>
                                                    <span
                                                        class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">MSC
                                                        Fatigue</span>
                                                </div>
                                            </div>

                                            <!-- Image -->
                                            <div class="rounded-lg overflow-hidden shadow-lg">
                                                <img src="/images/Aircraft_Strcuture_Analysis.png"
                                                    alt="FEA and Structural Analysis"
                                                    class="w-full h-64 object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Secondary Structure Analysis -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 md:p-8 cursor-pointer hover:from-orange-700 hover:to-orange-800 transition-all"
                            @click="toggleService('secondary')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    📦</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">Secondary Structure Analysis</h3>
                                    <p class="text-orange-100 text-sm leading-relaxed">Main rotor and tail rotor
                                        dynamics modeling, flap-lag coupling, ground resonance avoidance, and vibration
                                        transmission to fuselage structure with blade-frequency load distribution.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                                    :class="{ 'rotate-180': expandedServices.secondary }">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-show="expandedServices.secondary"
                            class="p-6 md:p-8 bg-gradient-to-b from-orange-50 to-white">
                            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    class="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg overflow-hidden border border-orange-200 h-64 flex items-center justify-center relative">
                                    <svg class="w-full h-full p-8" viewBox="0 0 400 300"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <!-- Rotor disc -->
                                        <circle cx="200" cy="100" r="60" fill="none" stroke="#ea580c"
                                            stroke-width="2" />
                                        <!-- Blade representation -->
                                        <g stroke="#ea580c" stroke-width="3" fill="none">
                                            <line x1="200" y1="40" x2="200" y2="20" />
                                            <line x1="260" y1="100" x2="280" y2="100" />
                                            <line x1="200" y1="160" x2="200" y2="180" />
                                            <line x1="140" y1="100" x2="120" y2="100" />
                                        </g>
                                        <!-- Flap motion (curved) -->
                                        <g stroke="#f97316" stroke-width="2" fill="none" stroke-dasharray="3,3">
                                            <path d="M 200 45 Q 210 35 200 25" />
                                            <path d="M 265 100 Q 275 110 285 100" />
                                            <path d="M 200 155 Q 190 165 200 175" />
                                            <path d="M 135 100 Q 125 90 115 100" />
                                        </g>
                                        <!-- Lag motion -->
                                        <g stroke="#f97316" stroke-width="1" fill="none" opacity="0.5">
                                            <circle cx="220" cy="85" r="15" />
                                            <circle cx="185" cy="115" r="15" />
                                        </g>
                                        <!-- Swashplate -->
                                        <ellipse cx="200" cy="200" rx="40" ry="20" fill="#fed7aa" stroke="#ea580c"
                                            stroke-width="2" />
                                        <!-- Control links -->
                                        <g stroke="#ea580c" stroke-width="1.5">
                                            <line x1="200" y1="160" x2="200" y2="180" />
                                            <line x1="170" y1="160" x2="165" y2="180" />
                                            <line x1="230" y1="160" x2="235" y2="180" />
                                        </g>
                                        <!-- Label -->
                                        <text x="200" y="270" font-size="13" font-weight="bold" fill="#92400e"
                                            text-anchor="middle">Flap-Lag Coupling & Ground Resonance</text>
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-sm font-semibold text-orange-700 mb-3">Secondary Structure Analysis
                                        Visualization</p>
                                    <p class="text-gray-700 text-sm leading-relaxed mb-4">Rotor blade dynamics with
                                        flap-lag coupling analysis. Ground resonance avoidance ensures safe take-off and
                                        landing across all operating altitudes.</p>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li class="flex items-start gap-2">
                                            <span class="text-orange-600 font-bold">•</span>
                                            <span>Blade flap dynamics & frequency interaction</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-orange-700 font-bold">•</span>
                                            <span>Ground resonance avoidance analysis</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-amber-600 font-bold">•</span>
                                            <span>Swashplate actuation loads & control margin</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">Analysis
                                    Type</p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div class="bg-orange-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-orange-700">Blade Dynamics</p>
                                    </div>
                                    <div class="bg-orange-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-orange-700">Flap-Lag Coupling</p>
                                    </div>
                                    <div class="bg-orange-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-orange-700">Ground Resonance</p>
                                    </div>
                                    <div class="bg-orange-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-orange-700">Multi-Load Distribution</p>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                                        Key Components
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rotorcraft secondary structures encompass the dynamic rotor system
                                            components critical for flight control and stability, including the main
                                            rotor hub that connects rotating blades to the transmission and accommodates
                                            flapping, lagging, and feathering motions while transferring tremendous
                                            centrifugal and aerodynamic loads, individual rotor blades with complex
                                            internal spar structures and aerodynamic profiles optimized for efficiency
                                            across the broad speed range from hover through high-speed forward flight,
                                            the swashplate assembly serving as the mechanical interface between
                                            stationary flight controls and rotating rotor system enabling cyclic and
                                            collective pitch control inputs, teeter hinges for semi-rigid rotor systems
                                            that allow the rotor disc to tilt relative to the mast while minimizing
                                            bending moments at the blade root, tail rotor mast and drive shaft
                                            assemblies transmitting power to the tail rotor while maintaining critical
                                            alignment under torsional loads and thermal expansion, and sophisticated
                                            vibration dampers strategically positioned throughout the rotor system to
                                            attenuate harmful oscillations before they propagate into the fuselage
                                            structure affecting crew comfort and equipment reliability.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Our rotor dynamics analysis employs advanced time-domain rotor simulation
                                            codes that capture the nonlinear physics of rotating blade behavior
                                            including large deflections, blade-vortex interaction, and compressibility
                                            effects across the entire flight envelope, detailed flap-lag coupling
                                            analysis examining the complex interaction between out-of-plane flapping
                                            motion and in-plane lagging motion that can lead to instabilities if not
                                            properly addressed in hub design and damper tuning, comprehensive ground
                                            resonance evaluation using coupled rotor-fuselage models to identify and
                                            eliminate dangerous frequencies where rotor lag modes can couple with
                                            airframe modes causing catastrophic instability during ground contact,
                                            vibration load path tracing from blade aerodynamic excitation through hub,
                                            transmission, and mounts into the fuselage structure quantifying force
                                            transmission and identifying optimal isolation locations, precise blade
                                            tracking analysis ensuring all blades follow the same flight path minimizing
                                            vibration and blade loads during operation, and control authority
                                            assessments verifying adequate swashplate actuator force and displacement
                                            capability to achieve required control power throughout the operational
                                            envelope including one-engine-inoperative conditions and autorotation.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                                        Design Benefits
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 border-l-4 border-orange-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rigorous rotor dynamics analysis ensures stable dynamic behavior free from
                                            destructive instabilities across all operating conditions providing pilots
                                            confidence in aircraft handling characteristics, ground-safe design that
                                            eliminates ground resonance risks during startup, shutdown, and ground taxi
                                            operations protecting aircraft and ground personnel, substantially minimized
                                            vibration levels through optimized blade design, hub configuration, and
                                            damper tuning that creates a smoother ride improving pilot effectiveness and
                                            reducing maintenance on vibration-sensitive avionics and systems, resonance
                                            avoidance through careful frequency placement ensuring rotor forcing
                                            frequencies remain separated from structural natural frequencies preventing
                                            fatigue damage and structural failures, extended blade life achieved through
                                            reduced oscillatory loads and improved track and balance resulting in longer
                                            inspection intervals and lower lifecycle costs, and dramatically improved
                                            ride quality that reduces pilot fatigue during long missions, enhances
                                            passenger comfort in commercial applications, and enables more precise
                                            operations in demanding missions such as search and rescue, powerline
                                            inspection, and external load operations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Fuel System Analysis -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 md:p-8 cursor-pointer hover:from-amber-700 hover:to-amber-800 transition-all"
                            @click="toggleService('fuel')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    ⛽</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">Fuel System Analysis</h3>
                                    <p class="text-amber-100 text-sm leading-relaxed">Fuel tank structural analysis,
                                        slosh dynamics, ullage pressurization, system flow analysis, and anti-ice system
                                        design for extended-range rotorcraft operations and emergency descent
                                        capability.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                                    :class="{ 'rotate-180': expandedServices.fuel }">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-show="expandedServices.fuel" class="p-6 md:p-8 bg-gradient-to-b from-amber-50 to-white">
                            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    class="bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden border border-amber-200 h-64 flex items-center justify-center relative">
                                    <svg class="w-full h-full p-8" viewBox="0 0 400 300"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <!-- Main fuselage tank -->
                                        <rect x="80" y="80" width="120" height="140" fill="#fcd34d" stroke="#b45309"
                                            stroke-width="2" rx="5" />
                                        <!-- Wing tanks -->
                                        <rect x="50" y="100" width="30" height="100" fill="#fce7b6" stroke="#b45309"
                                            stroke-width="1.5" rx="3" />
                                        <rect x="320" y="100" width="30" height="100" fill="#fce7b6" stroke="#b45309"
                                            stroke-width="1.5" rx="3" />
                                        <!-- Fuel lines -->
                                        <g stroke="#b45309" stroke-width="1.5" fill="none">
                                            <line x1="80" y1="130" x2="50" y2="130" />
                                            <line x1="200" y1="130" x2="320" y2="130" />
                                            <line x1="140" y1="80" x2="140" y2="50" />
                                        </g>
                                        <!-- Fuel pump -->
                                        <circle cx="140" cy="40" r="10" fill="#ea580c" stroke="#b45309"
                                            stroke-width="1.5" />
                                        <!-- Slosh visualization -->
                                        <g stroke="#dc2626" stroke-width="1.5" fill="none" opacity="0.5"
                                            stroke-dasharray="3,3">
                                            <path d="M 90 120 Q 100 100 110 120" />
                                            <path d="M 130 120 Q 140 105 150 120" />
                                            <path d="M 170 120 Q 180 100 190 120" />
                                        </g>
                                        <!-- Label -->
                                        <text x="200" y="270" font-size="13" font-weight="bold" fill="#92400e"
                                            text-anchor="middle">Distributed Fuel Tank System & Slosh</text>
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-sm font-semibold text-amber-700 mb-3">Fuel System Analysis
                                        Visualization</p>
                                    <p class="text-gray-700 text-sm leading-relaxed mb-4">Multi-tank fuel system with
                                        slosh dynamics analysis for extended-range operations. Anti-ice and
                                        pressurization systems for high-altitude emergency descent.</p>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li class="flex items-start gap-2">
                                            <span class="text-amber-600 font-bold">•</span>
                                            <span>Fuel slosh dynamics during maneuvers</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-amber-700 font-bold">•</span>
                                            <span>Ullage pressurization for altitude operation</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-yellow-700 font-bold">•</span>
                                            <span>Extended-range endurance envelope</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Analysis Type
                                </p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div class="bg-amber-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-amber-700">Tank Structural</p>
                                    </div>
                                    <div class="bg-amber-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-amber-700">Slosh Dynamics</p>
                                    </div>
                                    <div class="bg-amber-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-amber-700">System Flow</p>
                                    </div>
                                    <div class="bg-amber-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-amber-700">Emergency Operations</p>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                                        Key Components
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rotorcraft fuel systems are engineered for reliable operation across extreme
                                            flight attitudes and conditions, incorporating crash-resistant fuel tank
                                            structures that maintain integrity during hard landings while minimizing
                                            post-crash fire risk through self-sealing designs and strategic placement
                                            away from hot engine components, comprehensive fuel line networks and
                                            distribution manifolds designed to deliver uninterrupted fuel flow during
                                            aggressive maneuvers including sustained sideslips, steep climbs, and
                                            autorotation descents, robust fuel pump and selector valve assemblies
                                            providing redundant fuel delivery with backup systems ensuring engine
                                            operation continues even after primary pump failures, high-efficiency filter
                                            assemblies that remove contaminants and water while minimizing pressure drop
                                            to prevent fuel starvation at high power settings, sophisticated anti-ice
                                            systems preventing fuel line freeze-up and filter icing during high-altitude
                                            operations in cold weather conditions, and advanced vent and pressurization
                                            systems that maintain proper tank pressure throughout altitude changes while
                                            preventing fuel spillage during extreme maneuvers and accommodating thermal
                                            expansion of fuel during hot weather operations on the ground and in flight.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Our fuel system analysis combines multiple engineering disciplines including
                                            detailed tank finite element analysis evaluating structural integrity under
                                            multi-load conditions from fuel weight, pressurization, crash impacts, and
                                            vibration environments, computational fluid dynamics slosh analysis
                                            predicting fuel motion during rapid maneuvers and assessing impact on
                                            aircraft center of gravity shift and structural loading that could affect
                                            handling characteristics, comprehensive system flow simulation modeling
                                            pressure drops, pump performance, and valve switching logic to ensure
                                            adequate fuel delivery throughout the operational envelope including
                                            emergency conditions, ullage pressurization studies verifying proper tank
                                            venting and pressure control during rapid altitude changes preventing tank
                                            collapse or excessive pressurization, emergency descent scenarios evaluating
                                            fuel system performance during maximum rate descents from high altitude
                                            assessing potential for vapor lock or fuel flow interruption, and extended
                                            range mission analysis optimizing fuel capacity, consumption rates, and
                                            reserve requirements to maximize endurance for search and rescue, offshore
                                            operations, and long-range utility missions while maintaining adequate
                                            safety margins.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                                        Design Benefits
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-l-4 border-amber-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Optimized fuel system design delivers robust tank construction that
                                            withstands operational loads and crash scenarios protecting occupants from
                                            post-crash fire hazards, extended range capability through efficient fuel
                                            storage and management enabling rotorcraft to reach remote locations for
                                            rescue missions, offshore platform support, and utility operations without
                                            intermediate refueling stops, all-attitude fuel delivery maintaining
                                            reliable engine operation during aggressive maneuvers including sustained
                                            sideslips during mountain operations and steep descents during emergency
                                            procedures, cold weather operational readiness through anti-icing provisions
                                            and thermal management ensuring reliable starts and operation in arctic and
                                            high-altitude environments, emergency descent capability with fuel systems
                                            proven to function during rapid altitude loss scenarios that might be
                                            required due to pressurization failure or other emergencies, and mission
                                            flexibility through modular fuel tank configurations enabling operators to
                                            adjust range versus payload based on specific mission requirements whether
                                            conducting short-haul utility work or extended search and rescue patrols.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Hydraulic System Analysis -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 md:p-8 cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-all"
                            @click="toggleService('hydraulic')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    🔧</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">Hydraulic System Analysis</h3>
                                    <p class="text-purple-100 text-sm leading-relaxed">Hydraulic actuator control, rotor
                                        swashplate actuation, flight control load analysis, and redundant system design
                                        for multi-rotor aircraft with fail-safe operation and rapid troubleshooting
                                        support.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                                    :class="{ 'rotate-180': expandedServices.hydraulic }">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-show="expandedServices.hydraulic"
                            class="p-6 md:p-8 bg-gradient-to-b from-purple-50 to-white">
                            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg overflow-hidden border border-purple-200 h-64 flex items-center justify-center relative">
                                    <svg class="w-full h-full p-8" viewBox="0 0 400 300"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <!-- Hydraulic pump -->
                                        <rect x="50" y="120" width="50" height="60" fill="#c084fc" stroke="#7e22ce"
                                            stroke-width="2" rx="3" />
                                        <text x="75" y="155" font-size="10" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">PUMP</text>
                                        <!-- Main hydraulic line -->
                                        <g stroke="#7e22ce" stroke-width="3" fill="none">
                                            <line x1="100" y1="150" x2="180" y2="150" />
                                        </g>
                                        <!-- Swashplate actuators -->
                                        <rect x="180" y="80" width="40" height="30" fill="#e9d5ff" stroke="#7e22ce"
                                            stroke-width="2" rx="2" />
                                        <text x="200" y="100" font-size="8" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">ACT-1</text>
                                        <rect x="180" y="120" width="40" height="30" fill="#e9d5ff" stroke="#7e22ce"
                                            stroke-width="2" rx="2" />
                                        <text x="200" y="140" font-size="8" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">ACT-2</text>
                                        <rect x="180" y="160" width="40" height="30" fill="#e9d5ff" stroke="#7e22ce"
                                            stroke-width="2" rx="2" />
                                        <text x="200" y="180" font-size="8" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">ACT-3</text>
                                        <!-- Connecting lines -->
                                        <g stroke="#7e22ce" stroke-width="2" fill="none">
                                            <line x1="180" y1="95" x2="180" y2="150" />
                                            <line x1="180" y1="135" x2="180" y2="150" />
                                            <line x1="180" y1="175" x2="180" y2="150" />
                                        </g>
                                        <!-- Swashplate -->
                                        <ellipse cx="280" cy="140" rx="50" ry="25" fill="#ddd6fe" stroke="#7e22ce"
                                            stroke-width="2" />
                                        <text x="280" y="145" font-size="9" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">Swashplate</text>
                                        <!-- Connection to swashplate -->
                                        <g stroke="#7e22ce" stroke-width="2" fill="none">
                                            <line x1="220" y1="95" x2="250" y2="120" />
                                            <line x1="220" y1="135" x2="280" y2="140" />
                                            <line x1="220" y1="175" x2="250" y2="160" />
                                        </g>
                                        <!-- Pressure gauge -->
                                        <circle cx="140" cy="120" r="15" fill="#f3e8ff" stroke="#7e22ce"
                                            stroke-width="2" />
                                        <text x="140" y="125" font-size="8" fill="#581c87" text-anchor="middle"
                                            font-weight="bold">3000psi</text>
                                        <!-- Return line -->
                                        <g stroke="#9333ea" stroke-width="2" fill="none" stroke-dasharray="4,2">
                                            <path d="M 100 170 L 50 170" />
                                        </g>
                                        <!-- Label -->
                                        <text x="200" y="270" font-size="13" font-weight="bold" fill="#581c87"
                                            text-anchor="middle">Hydraulic Control System & Actuation</text>
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-sm font-semibold text-purple-700 mb-3">Hydraulic System Analysis
                                        Visualization</p>
                                    <p class="text-gray-700 text-sm leading-relaxed mb-4">Triple-redundant hydraulic
                                        actuation for swashplate control. Fail-safe operation ensures continued flight
                                        control authority during system failures.</p>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li class="flex items-start gap-2">
                                            <span class="text-purple-600 font-bold">•</span>
                                            <span>3000 psi system pressure for high-force actuation</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-purple-700 font-bold">•</span>
                                            <span>Redundant actuator channels with independent pumps</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-violet-600 font-bold">•</span>
                                            <span>Fail-safe mechanical reversion capability</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Analysis
                                    Type</p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div class="bg-purple-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-purple-700">System Simulation</p>
                                    </div>
                                    <div class="bg-purple-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-purple-700">Actuator Control</p>
                                    </div>
                                    <div class="bg-purple-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-purple-700">Redundancy FMEA</p>
                                    </div>
                                    <div class="bg-purple-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-purple-700">Transient Analysis</p>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                                        Key Components
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rotorcraft hydraulic systems provide the high-force, precise control
                                            necessary for safe flight operations, incorporating the main rotor
                                            swashplate actuation system with multiple independent servo actuators that
                                            translate pilot control inputs into rotor blade pitch changes enabling
                                            cyclic and collective control, powerful hydraulic actuators with sufficient
                                            force capacity to overcome aerodynamic hinge moments on rotor blades
                                            throughout the speed envelope including high-speed flight and autorotation,
                                            sophisticated pressure regululator and accumulator systems that maintain
                                            stable hydraulic pressure despite varying actuator demands during aggressive
                                            maneuvers, flight control servos with position feedback and force-feel
                                            systems providing pilots appropriate control feedback and preventing
                                            overcontrol situations, landing gear retraction actuators for helicopters
                                            equipped with wheeled landing gear enabling aerodynamic cleanup for improved
                                            cruise performance, and critical check valves and relief valves throughout
                                            the hydraulic circuit protecting components from overpressure conditions and
                                            preventing reverse flow that could cause control reversals.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Our hydraulic system analysis employs detailed system circuit modeling
                                            capturing pressure drops, flow rates, and component interactions throughout
                                            the hydraulic network under all operating conditions, comprehensive actuator
                                            force analysis calculating required actuator sizing based on aerodynamic
                                            loads, mechanical advantage, and failure scenarios to ensure adequate
                                            control authority, rigorous redundancy checking verifying continued safe
                                            flight following any single hydraulic system failure through independent
                                            backup systems or mechanical reversion capabilities, extensive failure mode
                                            and effects analysis identifying all potential failure scenarios and their
                                            consequences on aircraft controllability and safety, transient response
                                            studies evaluating system performance during rapid control inputs and
                                            worst-case demand scenarios such as engine failures or extreme maneuvers,
                                            and pressure margin verification throughout the flight envelope ensuring
                                            adequate hydraulic pressure remains available for control actuation even
                                            during high-demand conditions or following component degradation.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                                        Design Benefits
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Advanced hydraulic system design ensures redundant operation through
                                            multiple independent hydraulic systems preventing loss of control following
                                            any single failure, fail-safe control architecture with mechanical backup or
                                            reversionary modes enabling safe landing even with complete hydraulic system
                                            loss, precise actuation with minimal deadband and hysteresis providing
                                            pilots crisp control response and predictable handling characteristics
                                            crucial for precision hovering and confined area operations, high
                                            reliability through proven components and conservative design margins
                                            delivering thousands of flight hours between hydraulic system failures,
                                            rapid diagnostic capabilities with comprehensive monitoring and built-in
                                            test features enabling quick troubleshooting and reducing aircraft downtime,
                                            and multi-rotor applicability with scalable architectures supporting
                                            single-rotor, tandem-rotor, coaxial, and compound helicopter configurations
                                            across the full size spectrum from light utility helicopters to heavy-lift
                                            cargo rotorcraft.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ECS System Analysis -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 md:p-8 cursor-pointer hover:from-cyan-700 hover:to-cyan-800 transition-all"
                            @click="toggleService('ecs')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    ❄️</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">ECS System Analysis</h3>
                                    <p class="text-cyan-100 text-sm leading-relaxed">Environmental control system
                                        design, cockpit pressurization, thermal management for high-altitude operations,
                                        and air distribution optimization for crew comfort and equipment protection.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                                    :class="{ 'rotate-180': expandedServices.ecs }">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-show="expandedServices.ecs" class="p-6 md:p-8 bg-gradient-to-b from-cyan-50 to-white">
                            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    class="bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-lg overflow-hidden border border-cyan-200 h-64 flex items-center justify-center relative">
                                    <svg class="w-full h-full p-8" viewBox="0 0 400 300"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <!-- Cockpit cabin -->
                                        <rect x="100" y="60" width="200" height="120" fill="#a5f3fc" stroke="#0891b2"
                                            stroke-width="2" rx="5" />
                                        <!-- Windscreen -->
                                        <ellipse cx="150" cy="80" rx="30" ry="20" fill="#cffafe" stroke="#0891b2"
                                            stroke-width="1.5" />
                                        <!-- Pressurization intake -->
                                        <circle cx="120" cy="30" r="15" fill="#06b6d4" stroke="#0891b2"
                                            stroke-width="2" />
                                        <text x="120" y="35" font-size="9" fill="white" text-anchor="middle"
                                            font-weight="bold">PRESS</text>
                                        <!-- Temperature zones -->
                                        <rect x="120" y="100" width="20" height="50" fill="#fbbf24" stroke="#0891b2"
                                            stroke-width="1" opacity="0.7" />
                                        <text x="130" y="130" font-size="7" fill="#92400e">+20°C</text>
                                        <rect x="160" y="100" width="20" height="50" fill="#60a5fa" stroke="#0891b2"
                                            stroke-width="1" opacity="0.7" />
                                        <text x="170" y="130" font-size="7" fill="#1e40af">+10°C</text>
                                        <rect x="200" y="100" width="20" height="50" fill="#34d399" stroke="#0891b2"
                                            stroke-width="1" opacity="0.7" />
                                        <text x="210" y="130" font-size="7" fill="#065f46">+15°C</text>
                                        <rect x="240" y="100" width="20" height="50" fill="#60a5fa" stroke="#0891b2"
                                            stroke-width="1" opacity="0.7" />
                                        <text x="250" y="130" font-size="7" fill="#1e40af">+12°C</text>
                                        <!-- Altitude chart -->
                                        <g stroke="#0891b2" stroke-width="1.5" fill="none">
                                            <path
                                                d="M 110 220 L 130 210 L 150 200 L 170 195 L 190 200 L 210 205 L 230 200" />
                                        </g>
                                        <!-- Label -->
                                        <text x="200" y="270" font-size="13" font-weight="bold" fill="#164e63"
                                            text-anchor="middle">High-Altitude Pressurization & Thermal</text>
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-sm font-semibold text-cyan-700 mb-3">ECS System Analysis
                                        Visualization</p>
                                    <p class="text-gray-700 text-sm leading-relaxed mb-4">Cabin pressurization and
                                        thermal control for extended high-altitude operations. Maintains crew safety and
                                        comfort during mountain rescue and extended-range missions.</p>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li class="flex items-start gap-2">
                                            <span class="text-cyan-600 font-bold">•</span>
                                            <span>Pressurization for 20,000+ ft operations</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-cyan-700 font-bold">•</span>
                                            <span>Thermal control in high-altitude thin air</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-teal-600 font-bold">•</span>
                                            <span>Emergency oxygen system integration</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Analysis Type
                                </p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div class="bg-cyan-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-cyan-700">Thermal Network</p>
                                    </div>
                                    <div class="bg-cyan-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-cyan-700">Pressurization</p>
                                    </div>
                                    <div class="bg-cyan-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-cyan-700">Air Distribution</p>
                                    </div>
                                    <div class="bg-cyan-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-cyan-700">Altitude Effects</p>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                                        Key Components
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rotorcraft environmental control systems maintain crew safety and comfort in
                                            the challenging helicopter operating environment, featuring efficient
                                            cooling systems that manage heat loads from engines, transmissions, and
                                            avionics in confined spaces with limited airflow compared to fixed-wing
                                            aircraft, comprehensive air intake and distribution networks drawing outside
                                            air and routing it to crew positions, windshield defogging, and equipment
                                            cooling locations throughout the cabin, robust cabin heating systems
                                            providing warmth during cold weather operations including high-altitude
                                            mountain missions where outside temperatures can reach extreme lows,
                                            pressurization valves for helicopters certified for high-altitude operations
                                            maintaining safe cabin altitude during mountain rescue or surveillance
                                            missions above 10,000 feet, strategically placed cockpit vents delivering
                                            fresh air to pilot positions reducing fatigue during extended flights, and
                                            auxiliary oil cooler systems maintaining proper transmission and engine oil
                                            temperatures critical for component life especially during sustained
                                            high-power operations such as external load lifting or high-altitude hover
                                            operations.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Our environmental control system analysis utilizes sophisticated thermal
                                            modeling techniques that predict cabin and equipment temperatures across the
                                            operational envelope from ground operations in desert heat to high-altitude
                                            flight in arctic conditions, detailed pressure analysis for pressurized
                                            helicopters ensuring proper cabin altitude control and structural loading
                                            throughout climb, cruise, and descent profiles, computational fluid dynamics
                                            studies of cabin air distribution optimizing vent placement and flow rates
                                            to eliminate hot spots and ensure adequate ventilation reaches all crew
                                            stations, comprehensive high-altitude effects evaluation assessing cooling
                                            system performance in the thin air environment where heat rejection becomes
                                            challenging and engine bleed air availability may be limited, equipment
                                            thermal protection analysis verifying sensitive avionics, hydraulic
                                            components, and electrical systems remain within temperature limits during
                                            all mission profiles, and crew comfort margin assessment using heat stress
                                            indices and ventilation standards to ensure pilot effectiveness and
                                            passenger comfort meet certification requirements and customer expectations.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                                        Design Benefits
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-cyan-50 border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Optimized environmental control delivers superior crew comfort through
                                            adequate heating and cooling that maintains cockpit temperatures within
                                            acceptable ranges reducing pilot fatigue and improving decision-making
                                            during critical flight phases, high-altitude operational capability for
                                            helicopters conducting mountain rescue, law enforcement surveillance, or
                                            utility work above 10,000 feet where thin air challenges both human
                                            performance and cooling system effectiveness, robust equipment thermal
                                            protection preventing avionics failures and extending component life by
                                            maintaining proper operating temperatures even during sustained high-power
                                            operations in hot climates, effective thermal management balancing heat
                                            loads from multiple sources including engines, transmissions, hydraulics,
                                            and avionics to prevent hot spots that could affect system reliability or
                                            crew safety, optimal system performance through efficient heat exchanger
                                            design and airflow management that minimizes parasitic power consumption
                                            while meeting cooling requirements, and mission flexibility enabling
                                            operations across the full environmental spectrum from arctic cold to desert
                                            heat, from sea level to high-altitude mountain operations, and from short
                                            utility flights to extended search and rescue missions without environmental
                                            system limitations compromising safety or effectiveness.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Internal Load Analysis -->
                    <div
                        class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <div class="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-6 md:p-8 cursor-pointer hover:from-rose-700 hover:to-rose-800 transition-all"
                            @click="toggleService('internal')">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                                    📐</div>
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">Internal Load Analysis</h3>
                                    <p class="text-rose-100 text-sm leading-relaxed">Load synthesis from rotor, engine,
                                        and payload; structural load distribution analysis; margin tracking and
                                        compliance verification across all flight regimes and operating conditions.</p>
                                </div>
                                <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg bg-white bg-opacity-20 transition-transform duration-300"
                                    :class="{ 'rotate-180': expandedServices.internal }">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div v-show="expandedServices.internal"
                            class="p-6 md:p-8 bg-gradient-to-b from-rose-50 to-white">
                            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    class="bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg overflow-hidden border border-rose-200 h-64 flex items-center justify-center relative">
                                    <svg class="w-full h-full p-8" viewBox="0 0 400 300"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <!-- Rotor hub (load source) -->
                                        <circle cx="200" cy="60" r="25" fill="#fda4af" stroke="#be123c"
                                            stroke-width="2" />
                                        <text x="200" y="65" font-size="9" fill="#881337" text-anchor="middle"
                                            font-weight="bold">HUB</text>
                                        <!-- Main transmission box -->
                                        <rect x="170" y="100" width="60" height="50" fill="#fecdd3" stroke="#be123c"
                                            stroke-width="2" rx="3" />
                                        <text x="200" y="130" font-size="10" fill="#881337" text-anchor="middle"
                                            font-weight="bold">XMSN</text>
                                        <!-- Load path arrows from hub to transmission -->
                                        <g stroke="#dc2626" stroke-width="3" fill="none" marker-end="url(#arrowred)">
                                            <defs>
                                                <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9"
                                                    refY="3" orient="auto" markerUnits="strokeWidth">
                                                    <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
                                                </marker>
                                            </defs>
                                            <line x1="200" y1="85" x2="200" y2="98" />
                                        </g>
                                        <!-- Fuselage frame attachment points -->
                                        <rect x="140" y="160" width="30" height="40" fill="#ffe4e6" stroke="#be123c"
                                            stroke-width="1.5" rx="2" />
                                        <text x="155" y="185" font-size="7" fill="#881337"
                                            text-anchor="middle">FWD</text>
                                        <rect x="185" y="160" width="30" height="40" fill="#ffe4e6" stroke="#be123c"
                                            stroke-width="1.5" rx="2" />
                                        <text x="200" y="185" font-size="7" fill="#881337"
                                            text-anchor="middle">MID</text>
                                        <rect x="230" y="160" width="30" height="40" fill="#ffe4e6" stroke="#be123c"
                                            stroke-width="1.5" rx="2" />
                                        <text x="245" y="185" font-size="7" fill="#881337"
                                            text-anchor="middle">AFT</text>
                                        <!-- Load distribution arrows -->
                                        <g stroke="#e11d48" stroke-width="2" fill="none" marker-end="url(#arrowred2)">
                                            <defs>
                                                <marker id="arrowred2" markerWidth="8" markerHeight="8" refX="7"
                                                    refY="3" orient="auto" markerUnits="strokeWidth">
                                                    <path d="M0,0 L0,6 L7,3 z" fill="#e11d48" />
                                                </marker>
                                            </defs>
                                            <line x1="180" y1="150" x2="155" y2="158" />
                                            <line x1="200" y1="150" x2="200" y2="158" />
                                            <line x1="220" y1="150" x2="245" y2="158" />
                                        </g>
                                        <!-- Landing gear load path -->
                                        <rect x="120" y="210" width="20" height="35" fill="#fecdd3" stroke="#be123c"
                                            stroke-width="1.5" rx="2" />
                                        <rect x="260" y="210" width="20" height="35" fill="#fecdd3" stroke="#be123c"
                                            stroke-width="1.5" rx="2" />
                                        <g stroke="#e11d48" stroke-width="1.5" fill="none">
                                            <line x1="155" y1="200" x2="130" y2="210" />
                                            <line x1="245" y1="200" x2="270" y2="210" />
                                        </g>
                                        <!-- Load magnitude indicators -->
                                        <text x="220" y="90" font-size="8" fill="#dc2626" font-weight="bold">10,000
                                            lbf</text>
                                        <text x="100" y="180" font-size="7" fill="#dc2626">3,200 lbf</text>
                                        <text x="270" y="180" font-size="7" fill="#dc2626">3,800 lbf</text>
                                        <!-- Label -->
                                        <text x="200" y="270" font-size="13" font-weight="bold" fill="#881337"
                                            text-anchor="middle">Load Path Distribution & Margin Analysis</text>
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-sm font-semibold text-rose-700 mb-3">Internal Load Analysis
                                        Visualization</p>
                                    <p class="text-gray-700 text-sm leading-relaxed mb-4">Complete load path tracing
                                        from rotor hub through transmission to fuselage structure. Margin tracking
                                        ensures safe operation throughout the flight envelope.</p>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li class="flex items-start gap-2">
                                            <span class="text-rose-600 font-bold">•</span>
                                            <span>10,000+ lbf rotor thrust distributed to airframe</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-rose-700 font-bold">•</span>
                                            <span>Load path optimization for weight efficiency</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <span class="text-red-600 font-bold">•</span>
                                            <span>Margin of safety verification at all attach points</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-6 pb-6 border-b border-gray-300">
                                <p class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Analysis Type
                                </p>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div class="bg-rose-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-rose-700">Loads Synthesis</p>
                                    </div>
                                    <div class="bg-rose-100 rounded-lg px-3 py-2">
                                        <p class="text-xs font-semibold text-rose-700">Load Distribution</p>
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
                                    <p
                                        class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">🔧</span>
                                        Key Components
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Internal loads analysis for rotorcraft traces all load paths from their
                                            sources to structural attachments, focusing on the main transmission that
                                            accepts engine power input while simultaneously managing massive rotor
                                            thrust loads, torque reactions, and gyroscopic moments that must be
                                            transmitted into the airframe, the fuselage primary structure serving as the
                                            central load-bearing framework that distributes loads from the transmission,
                                            engines, landing gear, and payload throughout the aircraft while maintaining
                                            structural integrity under combined loading conditions, landing skid or
                                            wheel assemblies designed to absorb vertical and lateral impact loads during
                                            hard landings while providing stable ground support, the tail boom critical
                                            structural element transmitting tail rotor thrust and providing directional
                                            stability while minimizing weight through efficient load paths and material
                                            selection, engine mounts isolating powerplant vibration while reliably
                                            transferring thrust and torque loads into the fuselage structure, and
                                            critical fastener interfaces throughout the airframe where bolted or bonded
                                            joints connect major structural assemblies requiring detailed stress
                                            analysis to prevent premature failure from fretting, fatigue, or overload
                                            conditions.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">📊</span>
                                        Analysis Methods
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Our comprehensive internal loads analysis employs sophisticated load case
                                            synthesis procedures that combine rotor aerodynamic loads, inertial loads,
                                            engine torque reactions, and control inputs across thousands of flight
                                            conditions to envelope the design space, detailed rotor hub load
                                            distribution analysis quantifying the six-component force and moment time
                                            histories transmitted from rotating system to stationary airframe throughout
                                            the rotor azimuth, stress concentration analysis at critical structural
                                            features including holes, cutouts, material transitions, and geometry
                                            changes where stress amplification can lead to crack initiation, precise
                                            margin of safety calculations for every structural element comparing applied
                                            loads against material allowables with appropriate factors of safety per FAA
                                            or EASA requirements, ultimate load verification demonstrating adequate
                                            structural strength to withstand limit loads multiplied by appropriate
                                            safety factors without failure, and comprehensive compliance verification
                                            documenting that all load cases, analysis methods, material properties, and
                                            safety margins meet certification requirements establishing complete
                                            regulatory acceptance and enabling smooth certification progress.
                                        </p>
                                    </div>
                                </div>
                                <div class="group/section">
                                    <p
                                        class="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span
                                            class="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-lg group-hover/section:scale-110 transition-transform duration-300">✨</span>
                                        Design Benefits
                                    </p>
                                    <div
                                        class="bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50 border-l-4 border-rose-600 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 mb-3">
                                        <p class="text-sm text-gray-700 leading-relaxed">
                                            Rigorous internal loads analysis enables precise load tracking throughout
                                            the airframe providing complete understanding of load paths and structural
                                            response under all operating conditions, accurate margin verification
                                            demonstrating compliance with strength requirements and identifying
                                            opportunities for weight reduction in over-designed areas while adding
                                            material where margins are inadequate, systematic design optimization
                                            balancing competing requirements for strength, stiffness, weight, and cost
                                            to achieve optimal structural efficiency, high design confidence through
                                            validated analysis methods and conservative assumptions reducing risk of
                                            in-service structural failures or costly redesigns, mission-capable
                                            structures proven to withstand the demanding rotorcraft operating
                                            environment including high-frequency vibration, combined loading, and
                                            occasional hard landing events, and certification-ready documentation
                                            satisfying FAA and EASA requirements expediting regulatory approval and
                                            enabling rapid entry into service for new rotorcraft designs or
                                            modifications to existing helicopter platforms.
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
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Enhance Your Rotorcraft Program</h2>
                <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Leverage specialized rotorcraft expertise for dynamic stability, flight control integration, and
                    rapid certification—military and commercial missions alike.
                </p>
                <RouterLink to="/contact_us"
                    class="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                    Discuss Your Program
                </RouterLink>
            </div>
        </section>
    <!-- </DefaultLayout> -->
</template>
