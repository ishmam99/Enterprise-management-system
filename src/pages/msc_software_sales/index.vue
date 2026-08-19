<template>
    <div class="min-h-screen bg-white">
        <!-- Hero -->
        <section
            class="py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white relative overflow-hidden">
            <!-- Gradient background elements -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
            </div>

            <div class="container mx-auto px-6 text-center relative z-10">
                <div
                    class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-6">
                    <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-blue-200 font-semibold text-sm">COMPLETE MSC SOFTWARE SUITE</span>
                </div>

                <h1 class="text-4xl md:text-5xl font-bold mb-4">MSC Software Products & Solutions</h1>
                <p class="text-lg text-blue-200 max-w-3xl mx-auto mb-4">Industry-leading finite element analysis,
                    simulation, and engineering software. As a certified reseller, we provide complete solutions with
                    training, support, and consulting services included.</p>

                <div
                    class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 mb-8 shadow-2xl border-2 border-yellow-400 inline-block">
                    <p class="text-gray-900 font-bold">🎁 Buy License → Get FREE 24/7 Support + Training</p>
                </div>

                <div class="mt-8 flex justify-center gap-4 flex-wrap">
                    <!-- <button @click="openQuoteModal"
                        class="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">Request
                        Quote</button> -->
                    <RouterLink to="/contact_us"
                        class="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
                        Contact Sales</RouterLink>
                </div>
            </div>
        </section>

        <section id="services" class="bg-gradient-to-b from-white via-blue-50/30 to-gray-50 py-20 align-middle">
            <div class="container mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                        Complete MSC Software Solutions & Services
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        As a certified MSC Software reseller, we provide comprehensive solutions including software
                        sales, technical support, training, and engineering services
                    </p>
                </div>

                <div class="align-middle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full ">
                    <!-- Card 1: MSC Software Reseller -->
                    <div
                        class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2">
                        <!-- Gradient Header -->
                        <div class="relative h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>

                        <!-- Icon -->
                        <div class="flex justify-center pt-8 pb-4">
                            <div class="relative">
                                <div
                                    class="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity">
                                </div>
                                <div
                                    class="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="px-6 pb-8 flex flex-col items-center">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                                MSC Software Reseller
                            </h3>
                            <p class="text-gray-500 text-center mb-6 text-sm">
                                Certified Partner for Complete MSC Suite
                            </p>

                            <ul class="space-y-3 w-full">
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">MSCOne
                                        Platform</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">MSC Nastran &
                                        Patran</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Adams &
                                        Marc</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Complete Product
                                        Suite</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Licensing &
                                        Installation</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Competitive
                                        Pricing</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Card 2: 24/7 Technical Support Service -->
                    <div
                        class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-300 transform hover:-translate-y-2">
                        <!-- Gradient Header -->
                        <div class="relative h-2 bg-gradient-to-r from-green-600 to-emerald-600"></div>

                        <!-- Icon -->
                        <div class="flex justify-center pt-8 pb-4">
                            <div class="relative">
                                <div
                                    class="absolute inset-0 bg-green-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity">
                                </div>
                                <div
                                    class="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="px-6 pb-8 flex flex-col items-center">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-green-600 transition-colors">
                                24/7 Technical Support
                            </h3>
                            <p class="text-gray-500 text-center mb-6 text-sm">
                                Round-the-Clock Expert Assistance
                            </p>

                            <ul class="space-y-3 w-full">
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">24/7 Help Desk
                                        Access</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Remote
                                        Troubleshooting</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Software Updates &
                                        Patches</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Priority Response
                                        Times</span>
                                </li>
                                <li
                                    class="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-all text-sm group/item">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 group-hover/item:scale-125 transition-transform"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="group-hover/item:translate-x-1 transition-transform">Dedicated Support
                                        Team</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div class="container mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">MSC Software Suite</span>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                        Complete MSC Software Solutions
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        As a certified reseller, we offer the complete range of MSC Software products for simulation,
                        analysis, and
                        engineering excellence
                    </p>
                </div>

                <!-- Main Software Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    <!-- MSCOne -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-slate-400 lg:col-span-1">
                        <div
                            class="relative h-48 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="mscOneLogo" alt="MSCOne" class="relative z-10 h-24 w-auto object-contain" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">MSCOne</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Design everything. Simulate anything. Complete CAE suite with token-based flexible
                                access
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Unified
                                    Platform</span>
                                <span
                                    class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Subscription</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/msc-one"
                                class="text-slate-600 font-semibold text-sm hover:text-slate-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <!-- MSC Nastran -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="mscNastranLogo" alt="MSC Nastran"
                                class="relative z-10 h-24 w-auto object-contain filter" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Nastran</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Industry-leading finite element analysis (FEA) solver for structural analysis
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Structural
                                    Analysis</span>
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">FEA</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/msc-nastran"
                                class="text-blue-600 font-semibold text-sm hover:text-blue-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Patran -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="patranLogo" alt="Patran" class="relative z-10 h-24 w-auto object-contain" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Patran</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Pre and post-processing environment for FEA analysis and result visualization
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span
                                    class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Pre-Processing</span>
                                <span
                                    class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Visualization</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/patran"
                                class="text-green-600 font-semibold text-sm hover:text-green-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Marc -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="marcLogo" alt="Marc" class="relative z-10 h-24 w-auto object-contain filter" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Marc</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Advanced nonlinear simulation solution for complex engineering problems
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span
                                    class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Nonlinear</span>
                                <span
                                    class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Simulation</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/marc"
                                class="text-purple-600 font-semibold text-sm hover:text-purple-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Dytran -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="dytranLogo" alt="Dytran"
                                class="relative z-10 h-24 w-auto object-contain filter brightness-0 invert" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Dytran</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Explicit dynamics solver for impact, crash, and short-duration events
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Crash
                                    Analysis</span>
                                <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Impact</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/dytran"
                                class="text-red-600 font-semibold text-sm hover:text-red-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- MSC Apex -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="mscApexLogo" alt="MSC Apex"
                                class="relative z-10 h-24 w-auto object-contain filter " />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Apex</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Next-generation CAE platform with advanced meshing and modeling capabilities
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">CAE
                                    Platform</span>
                                <span
                                    class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Meshing</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/apex"
                                class="text-orange-600 font-semibold text-sm hover:text-orange-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Actran -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="actranLogo" alt="Actran"
                                class="relative z-10 h-24 w-auto object-contain filter brightness-0 invert" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Actran</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Advanced acoustic simulation software for noise and vibration analysis
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Acoustics</span>
                                <span class="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Vibration</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/actran"
                                class="text-cyan-600 font-semibold text-sm hover:text-cyan-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- MSC CoSim -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="mscCoSimLogo" alt="MSC CoSim" class="relative z-10 h-24 w-auto object-contain" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC CoSim</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Co-simulation engine for multi-physics and multi-domain analysis
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span
                                    class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Co-Simulation</span>
                                <span
                                    class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Multi-Physics</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/msc-cosim"
                                class="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- CAEfatigue -->
                    <div
                        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-400">
                        <div
                            class="relative h-48 bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 opacity-10">
                                <div class="absolute inset-0 bg-grid-pattern"></div>
                            </div>
                            <img :src="caeFatigueLogo" alt="CAEfatigue"
                                class="relative z-10 h-24 w-auto object-contain" />
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">CAEfatigue</h3>
                            <p class="text-gray-600 text-sm mb-4">
                                Fatigue life prediction and durability analysis software
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Fatigue
                                    Analysis</span>
                                <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Durability</span>
                            </div>
                            <a href="/Products_and_services/Software_Sales/products/caefatigue"
                                class="text-pink-600 font-semibold text-sm hover:text-pink-800 transition inline-flex items-center gap-1">
                                Learn More
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h3 class="text-3xl md:text-4xl font-bold mb-4">
                        Get Started with MSC Software Today
                    </h3>
                    <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Purchase any MSC Software license and receive FREE 24/7 technical support and training
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact_us"
                            class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                            Request a Quote
                        </a>
                        <!-- <a href="/Products_and_services/Software_Sales/Engineering_Software_List"
                            class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105">
                            View Full Catalog
                        </a> -->
                    </div>
                </div>
            </div>
        </section>

        <!-- MSC Software Products Catalog -->
        <!-- <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Complete Product
                        Suite</span>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">MSC Software Products</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Industry-leading simulation and analysis software
                        solutions for every engineering discipline</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="product in mscProducts" :key="product.id"
                        class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200">
                        <div
                            :class="['h-32 flex items-center justify-center text-white text-5xl font-bold', product.headerGradient]">
                            {{ product.icon }}
                        </div>

                        <div class="p-8">
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
                            <p class="text-blue-600 font-semibold text-sm mb-4 uppercase">{{ product.category }}</p>

                            <p class="text-gray-600 mb-6">{{ product.description }}</p>

                            <div class="mb-6 pb-6 border-b border-gray-200">
                                <h4 class="font-bold text-gray-900 mb-3">Key Features:</h4>
                                <ul class="space-y-2">
                                    <li v-for="feature in product.features" :key="feature"
                                        class="flex items-start gap-2 text-sm text-gray-600">
                                        <span class="text-blue-600 font-bold mt-1">✓</span>
                                        <span>{{ feature }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="mb-6 pb-6 border-b border-gray-200">
                                <h4 class="font-bold text-gray-900 mb-3">Use Cases:</h4>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="use in product.useCases" :key="use"
                                        class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{{
                                            use }}</span>
                                </div>
                            </div>

                            <div>
                                <h4 class="font-bold text-gray-900 mb-3">Business Benefits:</h4>
                                <p class="text-gray-600 text-sm">{{ product.benefits }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <section class="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
            </div>

            <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div
                        class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2 mb-4">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                            </path>
                        </svg>
                        <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Engineering
                            Expertise</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                        Engineering Segments & Analysis Solutions
                    </h2>
                    <p class="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
                        Comprehensive simulation solutions for structural, thermal, dynamic, acoustic, and advanced
                        manufacturing engineering challenges
                    </p>
                </div>

                <!-- Engineering Segments Grid -->
                <div class="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 mb-12">
                    <div v-for="seg in segments" :key="seg.key"
                        class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-400 transform hover:-translate-y-1">
                        <!-- Header with Icon -->
                        <div class="flex items-start gap-4 mb-6">
                            <div
                                :class="['w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md', seg.iconGradient]">
                                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="seg.iconPath">
                                    </path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {{ seg.title }}</h3>
                                <span
                                    class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{{
                                    seg.short }}</span>
                            </div>
                        </div>

                        <!-- Definition -->
                        <p class="text-gray-700 font-medium mb-3 leading-relaxed">{{ seg.definition }}</p>
                        <p class="text-gray-600 text-sm mb-6 leading-relaxed">{{ seg.description }}</p>

                        <!-- MSC Products - Clickable Blocks -->
                        <div class="mb-6 pb-6 border-b border-gray-200">
                            <h4 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                    </path>
                                </svg>
                                Relevant MSC Products
                            </h4>
                            <div class="grid grid-cols-1 gap-3">
                                <RouterLink v-for="p in seg.products" :key="p.name" :to="p.url"
                                    class="group/product flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-md">
                                    <div
                                        class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/product:rotate-12 transition-transform">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path fill-rule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p
                                            class="font-semibold text-gray-900 group-hover/product:text-blue-600 transition-colors flex items-center gap-2">
                                            {{ p.name }}
                                            <svg class="w-4 h-4 text-blue-500 opacity-0 group-hover/product:opacity-100 transition-opacity"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                            </svg>
                                        </p>
                                        <p class="text-gray-600 text-xs mt-1 line-clamp-1">{{ p.usage }}</p>
                                    </div>
                                </RouterLink>
                            </div>
                        </div>

                        <!-- Business Value -->
                        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h5 class="font-bold text-gray-900 text-sm mb-1">Business Value</h5>
                                    <p class="text-gray-700 text-sm leading-relaxed">{{ seg.business }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Key Benefits Section -->
                <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
                    <div class="text-center mb-8">
                        <h3 class="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose MSC Software Solutions?
                        </h3>
                        <p class="text-blue-100 text-lg max-w-2xl mx-auto">
                            Industry-leading simulation tools backed by decades of engineering excellence
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-6">
                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold mb-2">Faster Innovation</h4>
                            <p class="text-blue-100">Accelerate product development cycles with proven simulation
                                technology</p>
                        </div>

                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold mb-2">Reduce Costs</h4>
                            <p class="text-blue-100">Minimize physical prototyping and testing expenses significantly
                            </p>
                        </div>

                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                    </path>
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold mb-2">Ensure Quality</h4>
                            <p class="text-blue-100">Deliver safer, more reliable products that meet industry standards
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Product Detail Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="selectedProduct" @click="closeProductModal"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div @click.stop
                        class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
                        <!-- Modal Header -->
                        <div
                            class="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
                            <div class="flex items-start justify-between">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold">{{ selectedProduct.name }}</h3>
                                        <p class="text-blue-100 text-sm mt-1">{{ selectedProduct.category }}</p>
                                    </div>
                                </div>
                                <button @click="closeProductModal"
                                    class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Modal Content -->
                        <div class="p-8">
                            <!-- Description -->
                            <div class="mb-8">
                                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Overview
                                </h4>
                                <p class="text-gray-700 leading-relaxed">{{ selectedProduct.description }}</p>
                            </div>

                            <!-- Primary Use -->
                            <div class="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 class="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wider">Primary
                                    Application</h4>
                                <p class="text-gray-700">{{ selectedProduct.usage }}</p>
                            </div>

                            <!-- Key Features -->
                            <div class="mb-8">
                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                                        </path>
                                    </svg>
                                    Key Features
                                </h4>
                                <div class="grid gap-3">
                                    <div v-for="(feature, idx) in selectedProduct.features" :key="idx"
                                        class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                        <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-gray-700">{{ feature }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Benefits -->
                            <div class="mb-8">
                                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Business Benefits
                                </h4>
                                <p
                                    class="text-gray-700 leading-relaxed bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    {{ selectedProduct.benefits }}
                                </p>
                            </div>

                            <!-- CTA Buttons -->
                            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <RouterLink to="/contact_us" @click="closeProductModal"
                                    class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-center">
                                    Request Quote
                                </RouterLink>
                                <a href="/Products_and_services/Software_Sales/Engineering_Software_List"
                                    @click="closeProductModal"
                                    class="flex-1 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-all text-center">
                                    View All Products
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Career Opportunities Section -->
        <!-- <section class="py-20 bg-gradient-to-b from-white to-gray-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 mb-4">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-green-600 font-semibold text-sm uppercase tracking-wider">Join Our Team</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                        Career Opportunities in MSC Software Engineering
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We're looking for talented Mechanical and Aerospace Engineers to join our team as MSC Software specialists
                    </p>
                </div>

                <div class="space-y-12">
                    <div v-for="segment in segments" :key="'job-' + segment.key" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        <div :class="['p-6 text-white', segment.iconGradient]">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="segment.iconPath"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold">{{ segment.title }}</h3>
                                    <p class="text-white/90 text-sm">{{ segment.short }} Specialist Positions</p>
                                </div>
                            </div>
                        </div>

         
                        <div class="grid md:grid-cols-2 gap-6 p-8">
                            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
                                <div class="flex items-start gap-3 mb-4">
                                    <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-lg font-bold text-gray-900">Mechanical Engineer</h4>
                                        <p class="text-sm text-blue-600 font-semibold">{{ segment.title }} Specialist</p>
                                    </div>
                                </div>
                                <ul class="space-y-2 text-sm text-gray-700 mb-4">
                                    <li v-for="(resp, idx) in segment.jobDescriptions.mechanical" :key="idx" class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>{{ resp }}</span>
                                    </li>
                                </ul>

                
                                <div class="mb-4">
                                    <h5 class="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Required Qualifications</h5>
                                    <ul class="space-y-1.5 text-sm text-gray-700">
                                        <li v-for="(qual, idx) in segment.jobDescriptions.mechanicalQualifications" :key="idx" class="flex items-start gap-2">
                                            <span class="text-blue-600 font-bold">✓</span>
                                            <span>{{ qual }}</span>
                                        </li>
                                    </ul>
                                </div>

             
                                <div class="mb-4">
                                    <h5 class="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Key Skills</h5>
                                    <div class="flex flex-wrap gap-1.5">
                                        <span v-for="(skill, idx) in segment.jobDescriptions.mechanicalSkills" :key="idx" 
                                              class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-4 pt-4 border-t border-blue-200">
                                    <a href="/contact_us" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                        <span>Apply Now</span>
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>

    
                            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
                                <div class="flex items-start gap-3 mb-4">
                                    <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-lg font-bold text-gray-900">Aerospace Engineer</h4>
                                        <p class="text-sm text-purple-600 font-semibold">{{ segment.title }} Specialist</p>
                                    </div>
                                </div>
                                <ul class="space-y-2 text-sm text-gray-700 mb-4">
                                    <li v-for="(resp, idx) in segment.jobDescriptions.aerospace" :key="idx" class="flex items-start gap-2">
                                        <svg class="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span>{{ resp }}</span>
                                    </li>
                                </ul>


                                <div class="mb-4">
                                    <h5 class="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Required Qualifications</h5>
                                    <ul class="space-y-1.5 text-sm text-gray-700">
                                        <li v-for="(qual, idx) in segment.jobDescriptions.aerospaceQualifications" :key="idx" class="flex items-start gap-2">
                                            <span class="text-purple-600 font-bold">✓</span>
                                            <span>{{ qual }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="mb-4">
                                    <h5 class="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Key Skills</h5>
                                    <div class="flex flex-wrap gap-1.5">
                                        <span v-for="(skill, idx) in segment.jobDescriptions.aerospaceSkills" :key="idx" 
                                              class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-4 pt-4 border-t border-purple-200">
                                    <a href="/contact_us" class="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                                        <span>Apply Now</span>
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                    <h3 class="text-2xl font-bold mb-6 text-center">General Requirements for All Positions</h3>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                Education
                            </h4>
                            <p class="text-blue-100 text-sm">Bachelor's or Master's degree in Mechanical/Aerospace Engineering</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Experience
                            </h4>
                            <p class="text-blue-100 text-sm">2-5 years in CAE/FEA analysis or MSC Software applications</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                Skills
                            </h4>
                            <p class="text-blue-100 text-sm">Strong communication, presentation, and customer relationship skills</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- CTAs -->
        <section class="py-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white text-center">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p class="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">Purchase your MSC Software license today and
                    receive FREE training and 24/7 support</p>

                <div class="flex justify-center gap-4 flex-wrap">
                    <RouterLink to="/contact_us"
                        class="inline-block px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition">
                        Contact Sales</RouterLink>
                    <!-- <button @click="openDemoModal"
                        class="inline-block px-6 py-3 border border-white text-white font-bold rounded-lg hover:bg-white/20 transition">Request
                        Demo</button> -->
                </div>
            </div>
        </section>

        <RequestDemoModal v-model="showDemoModal" @submit="handleDemoSubmit" />
        <RequestQuoteModal v-model="showQuoteModal" @submit="handleQuoteSubmit" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)
const selectedProduct = ref(null)

const openDemoModal = () => (showDemoModal.value = true)
const openQuoteModal = () => (showQuoteModal.value = true)

const openProductModal = (product) => {
    selectedProduct.value = product
}

const closeProductModal = () => {
    selectedProduct.value = null
}

const handleDemoSubmit = (form) => {
    console.log('Demo request:', form)
}

const handleQuoteSubmit = (form) => {
    console.log('Quote request:', form)
}

const segments = [
    {
        key: 'structure',
        title: 'Structural Analysis',
        short: 'FEA',
        iconGradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
        iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        definition: 'Study of stresses, deformations, fatigue and certification-driven simulations.',
        description: 'Structural analysis involves the examination of structures such as beams, bridges, and buildings to ensure they can withstand the loads and forces they will encounter during use. Our Structural Analysis solutions enable engineers to accurately predict how structures and components behave under real-world loads and conditions. These tools help assess strength, stiffness, durability, and failure risks across linear, nonlinear, static, and dynamic scenarios. By leveraging advanced finite element methods, users can optimize designs early, reduce physical prototyping, and ensure compliance with safety and performance standards.',
        jobDescriptions: {
            mechanical: [
                'Conduct MSC Nastran/Marc training for structural FEA and nonlinear analysis',
                'Provide technical support for complex structural simulations and troubleshooting',
                'Drive new sales by demonstrating FEA solutions to manufacturing and industrial clients',
                'Develop simulation workflows for static, thermal, and dynamic structural problems',
                'Assist customers in model validation and results interpretation',
                'Collaborate with sales team to identify customer needs and propose MSC solutions',
                'Create technical documentation and application examples for structural analysis',
                'Support pre-sales demonstrations and proof-of-concept projects'
            ],
            aerospace: [
                'Deliver MSC Nastran training focused on aeroelastic analysis and aircraft certification',
                'Provide expert technical support for aerospace structural integrity and flutter analysis',
                'Drive aerospace sector sales through FAA/EASA certification workflow demonstrations',
                'Develop simulation best practices for composite airframe and fuselage analysis',
                'Support customers in meeting aerospace certification requirements (DO-160, etc.)',
                'Conduct fatigue and damage tolerance analysis for aircraft components',
                'Collaborate with aerospace OEMs to implement MSC solutions in design processes',
                'Present technical webinars on aerospace-specific MSC Software applications'
            ],
            mechanicalQualifications: [
                'B.S. in Mechanical Engineering (M.S. preferred)',
                '3+ years hands-on FEA experience with MSC Nastran or Marc',
                'Strong knowledge of structural mechanics and material properties',
                'Experience in manufacturing, automotive, or heavy machinery industries',
                'Proven ability to deliver technical training and presentations'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace Engineering or related field',
                '3+ years in aerospace structural analysis and certification',
                'Knowledge of FAA/EASA regulations and DO-160 standards',
                'Experience with composite materials and aeroelasticity',
                'Background in aircraft OEM or Tier-1 supplier environment'
            ],
            mechanicalSkills: ['FEA', 'CAD', 'Python/Scripting', 'DOE', 'Technical Writing', 'Public Speaking', 'Sales Support'],
            aerospaceSkills: ['Aeroelasticity', 'Composites', 'Certification', 'Fatigue Analysis', 'Technical Training', 'CRM']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete structural analysis suite with flexible token-based access.',
                description: 'Comprehensive CAE platform providing unlimited access to all MSC structural analysis tools including Nastran, Marc, Apex and more through a flexible token-based subscription.',
                features: [
                    'Access to entire MSC software portfolio',
                    'Flexible token-based licensing',
                    'Integrated pre/post processing',
                    'Multi-solver workflow automation',
                    'Cloud and on-premise deployment',
                    'Continuous software updates'
                ],
                benefits: 'Maximize ROI with flexible access to all structural analysis tools, scale resources based on project needs, and eliminate individual license management overhead.'
            },
            {
                name: 'MSC Nastran',
                category: 'FEA Solver',
                url: '/Products_and_services/Software_Sales/products/msc-nastran',
                usage: 'Finite Element Analysis (FEA) solver for structural analysis.',
                description: 'Industry-leading finite element analysis solver for linear and nonlinear structural, thermal, and dynamic simulations with advanced capabilities.',
                features: [
                    'Linear and nonlinear static analysis',
                    'Dynamic response and modal analysis',
                    'Thermal and heat transfer analysis',
                    'Composite material modeling',
                    'Optimization and sensitivity studies',
                    'Large-scale parallel processing'
                ],
                benefits: 'Reduce design cycles, minimize physical prototyping, and ensure structural integrity with industry-proven simulation technology.'
            },
            {
                name: 'Marc',
                category: 'Nonlinear FEA',
                url: '/Products_and_services/Software_Sales/products/marc',
                usage: 'Nonlinear finite element analysis software.',
                description: 'Advanced nonlinear finite element analysis software specialized in complex material behaviors, contact mechanics, and manufacturing processes.',
                features: [
                    'Material nonlinearity (plasticity, hyperelasticity)',
                    'Geometric nonlinearity (large deformations)',
                    'Contact and friction modeling',
                    'Manufacturing process simulation',
                    'Coupled multi-physics analysis',
                    'User-defined material models'
                ],
                benefits: 'Accurately predict product performance under extreme conditions and optimize manufacturing processes to reduce defects.'
            },
            {
                name: 'MSC Apex',
                category: 'CAE Platform',
                usage: '3D CAD and mesh generation software.',
                url: '/Products_and_services/Software_Sales/products/apex',
                description: 'Next-generation CAE platform with advanced meshing, modeling capabilities, and streamlined workflow for rapid simulation setup.',
                features: [
                    'Rapid mesh generation and editing',
                    'Direct CAD geometry import',
                    'Advanced surface and volume meshing',
                    'Automated mid-surface extraction',
                    'Integrated solver and post-processing',
                    'Python scripting for automation'
                ],
                benefits: 'Accelerate model preparation time by up to 10x, improve mesh quality, and enable faster design iterations.'
            }
        ],
        business: 'Ensure safety, reduce weight and shorten certification cycles.'
    },
    {
        key: 'dynamics',
        title: 'System Dynamics',
        short: 'MBD',
        iconGradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
        iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        definition: 'Modeling and simulation of moving systems, mechanisms and control interactions.',
        description: 'System dynamics focuses on the behavior of complex systems over time, using stocks, flows, internal feedback loops, and time delays. This service is ideal for analyzing mechanisms, vehicles, machinery, and coupled systems to improve performance, stability, and reliability before physical testing. Related software includes multi-body dynamics, motion simulation, control system integration, and co-simulation platforms',
        jobDescriptions: {
            mechanical: [
                'Deliver Adams MBD training for machinery, robotics, and mechanical system simulation',
                'Provide technical support for kinematics, dynamics, and control system integration',
                'Drive sales in automotive, heavy equipment, and industrial machinery sectors',
                'Develop multibody dynamics workflows for mechanism design and optimization',
                'Support customers in virtual prototyping and testing of mechanical systems',
                'Conduct pre-sales demonstrations showcasing Adams motion analysis capabilities',
                'Assist in co-simulation setup between Adams and FEA/CFD tools',
                'Create application examples for landing gear, suspension, and linkage mechanisms'
            ],
            aerospace: [
                'Conduct Adams training for landing gear dynamics and flight control systems',
                'Provide technical support for aircraft system kinematics and actuator modeling',
                'Drive aerospace sales through eVTOL and UAV simulation demonstrations',
                'Develop workflows for rotorcraft dynamics and tilt-rotor analysis',
                'Support customers in aircraft ground handling and taxi simulation',
                'Assist in flight control surface modeling and actuation system design',
                'Collaborate with aerospace engineers on store separation and ejection seat analysis',
                'Present case studies on autonomous flight systems and vehicle dynamics'
            ],
            mechanicalQualifications: [
                'B.S. in Mechanical Engineering or related field',
                '3+ years experience with Adams or similar MBD software',
                'Strong understanding of kinematics, dynamics, and control systems',
                'Experience in machinery, robotics, or automotive industries',
                'Ability to conduct technical training and customer demonstrations'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace or Mechanical Engineering',
                '3+ years in aircraft systems dynamics or landing gear design',
                'Knowledge of eVTOL, rotorcraft, or UAV dynamics',
                'Experience with flight control systems and actuators',
                'Background in aerospace OEM or defense contractor'
            ],
            mechanicalSkills: ['Adams', 'MBD', 'Controls', 'MATLAB/Simulink', 'Co-simulation', 'Training Delivery', 'Pre-sales'],
            aerospaceSkills: ['Landing Gear', 'Flight Controls', 'Rotorcraft', 'eVTOL', 'System Dynamics', 'Certification']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete multibody dynamics and system simulation suite.',
                description: 'Unified platform providing access to Adams, Easy5, and integrated FEA tools for comprehensive system-level analysis and virtual prototyping.',
                features: [
                    'Complete multibody dynamics toolkit',
                    'System-level modeling capabilities',
                    'Integrated control system design',
                    'Co-simulation framework',
                    'Flexible resource allocation',
                    'Unified workflow management'
                ],
                benefits: 'Seamlessly combine rigid body dynamics, flexible body analysis, and system controls in one platform while optimizing license costs.'
            },
            {
                name: 'Adams',
                category: 'Multibody Dynamics',
                url: '/Products_and_services/Software_Sales/products/adams',
                usage: 'Multibody dynamics simulation software.',
                description: 'Leading multibody dynamics simulation software for analyzing motion, forces, and performance of mechanical systems and mechanisms.',
                features: [
                    'Rigid and flexible body dynamics',
                    'Kinematic and dynamic motion analysis',
                    'Contact and friction simulation',
                    'Control system integration',
                    'Co-simulation with FEA and CFD',
                    'Virtual prototyping and testing'
                ],
                benefits: 'Validate system performance early in design, optimize mechanisms for efficiency, and reduce physical testing by 50%.'
            },
            {
                name: 'MSC Nastran',
                category: 'FEA Solver',
                url: '/Products_and_services/Software_Sales/products/msc-nastran',
                usage: 'Finite Element Analysis (FEA) solver for dynamic analysis.',
                description: 'Industry-standard FEA solver with comprehensive dynamic analysis capabilities including transient, frequency response, and random vibration.',
                features: [
                    'Modal analysis and eigenvalue extraction',
                    'Frequency response analysis',
                    'Transient dynamic response',
                    'Random vibration analysis',
                    'Shock and impact simulation',
                    'Rotor dynamics analysis'
                ],
                benefits: 'Identify resonance issues early, optimize structural dynamics, and ensure product reliability under dynamic loading.'
            }
        ],
        business: 'Validate motion and system-level performance earlier in design.'
    },
    {
        key: 'acoustics',
        title: 'Acoustics & NVH',
        short: 'NVH',
        iconGradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
        iconPath: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
        definition: 'Sound and vibration analysis to improve comfort and meet regulatory limits.',
        description: 'Acoustics and NVH (Noise, Vibration, and Harshness) engineering involves controlling and mitigating sound and vibration in vehicles and other machinery to improve comfort and compliance with regulations.',
        jobDescriptions: {
            mechanical: [
                'Deliver Actran training for interior/exterior acoustics and vibro-acoustic analysis',
                'Provide technical support for NVH troubleshooting and noise reduction strategies',
                'Drive sales in automotive, HVAC, and appliance industries for noise compliance',
                'Develop workflows for sound quality prediction and acoustic treatment optimization',
                'Support customers in meeting industrial noise regulations and standards',
                'Conduct demonstrations on cabin noise, engine noise, and vibration analysis',
                'Assist in acoustic material modeling and absorption coefficient validation',
                'Create technical content on NVH best practices and simulation techniques'
            ],
            aerospace: [
                'Conduct Actran training focused on aircraft cabin noise and engine acoustics',
                'Provide technical support for ICAO Chapter 14 noise certification compliance',
                'Drive aerospace sales through noise footprint and community noise demonstrations',
                'Develop workflows for interior cabin comfort and passenger noise exposure analysis',
                'Support customers in aero-acoustic analysis (trailing edge, landing gear noise)',
                'Assist in vibro-acoustic coupling for structural-borne noise prediction',
                'Collaborate with aerospace OEMs on engine noise propagation and nacelle design',
                'Present case studies on helicopter rotor noise and propeller acoustics'
            ],
            mechanicalQualifications: [
                'B.S./M.S. in Mechanical, Acoustical Engineering or Physics',
                '3+ years in NVH analysis or acoustic simulation',
                'Experience with Actran, LMS, or similar acoustic software',
                'Knowledge of automotive or industrial NVH requirements',
                'Understanding of vibro-acoustics and sound transmission'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace, Acoustics, or related field',
                '3+ years in aerospace NVH or cabin acoustics',
                'Knowledge of ICAO Chapter 14 noise certification',
                'Experience with aero-acoustics, jet noise, or rotor noise',
                'Background in aircraft interior or propulsion acoustics'
            ],
            mechanicalSkills: ['Actran', 'NVH', 'Acoustics', 'Vibration Analysis', 'Modal Testing', 'Technical Training'],
            aerospaceSkills: ['Cabin Acoustics', 'Jet Noise', 'ICAO Ch.14', 'Sound Quality', 'Vibro-acoustics', 'Rotor Noise']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete NVH and acoustics analysis solution suite.',
                description: 'Comprehensive platform combining Actran acoustics simulation with Nastran structural dynamics for complete vibro-acoustic analysis.',
                features: [
                    'Integrated acoustic simulation tools',
                    'Structural-acoustic coupling',
                    'Complete NVH workflow',
                    'Sound quality prediction',
                    'Optimization capabilities',
                    'Multi-physics integration'
                ],
                benefits: 'Solve complex NVH challenges with integrated acoustic and structural tools, reduce analysis time, and meet stringent noise regulations.'
            },
            {
                name: 'Actran',
                category: 'Acoustics Simulation',
                url: '/Products_and_services/Software_Sales/products/actran',
                usage: 'Acoustic simulation software.',
                description: 'Comprehensive acoustic and vibration simulation software for NVH analysis, sound quality prediction, and noise control design.',
                features: [
                    'Interior and exterior acoustics',
                    'Vibro-acoustic coupling analysis',
                    'Aeroacoustics simulation',
                    'Sound quality metrics',
                    'Trim and absorption modeling',
                    'Active noise control simulation'
                ],
                benefits: 'Design quieter products that meet regulatory requirements, improve customer satisfaction, and reduce warranty costs.'
            },
            {
                name: 'MSC Nastran',
                category: 'FEA Solver',
                url: '/Products_and_services/Software_Sales/products/msc-nastran',
                usage: 'Finite Element Analysis (FEA) solver for NVH analysis.',
                description: 'Industry-standard solver for structural vibration analysis and NVH predictions with comprehensive frequency domain capabilities.',
                features: [
                    'Normal modes analysis',
                    'Frequency response functions',
                    'Forced vibration analysis',
                    'Acoustic response prediction',
                    'Panel contribution analysis',
                    'Transfer path analysis support'
                ],
                benefits: 'Identify and eliminate vibration issues early, optimize acoustic performance, and meet stringent NVH targets.'
            }
        ],
        business: 'Reduce noise, improve customer satisfaction and meet regulations.'
    },
    {
        key: 'fluids',
        title: 'Fluids & FSI',
        short: 'CFD/FSI',
        iconGradient: 'bg-gradient-to-br from-green-500 to-green-700',
        iconPath: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5',
        definition: 'Fluid flow, thermal management and fluid-structure interaction simulations.',
        description: 'Fluids and FSI (Fluid-Structure Interaction) analysis involves studying the behavior of fluids (liquids and gases) and their interaction with structures.',
        jobDescriptions: {
            mechanical: [
                'Deliver Dytran FSI training for impact, crash, and coupled fluid-structure analysis',
                'Provide technical support for explicit dynamics and thermal-structural coupling',
                'Drive sales in automotive crash, packaging, and consumer product drop testing',
                'Develop workflows for fluid sloshing, airbag deployment, and impact scenarios',
                'Support customers in optimizing thermal management and cooling systems',
                'Conduct demonstrations on fuel tank sloshing and drop test simulations',
                'Assist in coupled thermal-stress analysis for electronic cooling applications',
                'Create application examples for blast loading and underwater shock analysis'
            ],
            aerospace: [
                'Conduct Dytran training for bird strike certification and ditching analysis',
                'Provide technical support for foreign object damage (FOD) and ice impact simulation',
                'Drive aerospace sales through FAA bird strike and water impact demonstrations',
                'Develop workflows for fuel sloshing in aircraft tanks and thermal aero-heating',
                'Support customers in meeting bird strike certification requirements (CS-25, FAR-25)',
                'Assist in coupled FSI analysis for engine ingestion and blade-out scenarios',
                'Collaborate with aerospace teams on thermal protection system design',
                'Present case studies on ditching performance and emergency landing simulations'
            ],
            mechanicalQualifications: [
                'B.S. in Mechanical Engineering with thermal/fluids focus',
                '3+ years in FSI, thermal analysis, or impact simulation',
                'Experience with Dytran, LS-DYNA, or explicit FEA solvers',
                'Knowledge of fluid dynamics and heat transfer',
                'Experience in automotive crash or manufacturing simulation'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace Engineering',
                '3+ years in bird strike, ditching, or impact analysis',
                'Knowledge of CS-25/FAR-25 bird strike certification',
                'Experience with foreign object damage and fuel sloshing',
                'Background in aerospace safety or certification engineering'
            ],
            mechanicalSkills: ['Dytran', 'Explicit FEA', 'FSI', 'Thermal Analysis', 'Impact Simulation', 'CFD'],
            aerospaceSkills: ['Bird Strike', 'Ditching', 'FOD', 'CS-25/FAR-25', 'Fuel Sloshing', 'TPS']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete FSI and thermal analysis platform.',
                description: 'Integrated solution for fluid-structure interaction combining Dytran explicit dynamics, thermal analysis, and structural solvers for coupled physics simulations.',
                features: [
                    'Coupled FSI analysis tools',
                    'Thermal-structural coupling',
                    'Explicit and implicit solvers',
                    'Multi-physics workflow',
                    'Advanced meshing capabilities',
                    'Comprehensive post-processing'
                ],
                benefits: 'Tackle complex FSI problems with integrated tools, reduce simulation setup time, and improve thermal management designs.'
            },
            {
                name: 'Dytran',
                category: 'Explicit Dynamics & FSI',
                url: '/Products_and_services/Software_Sales/products/dytran',
                usage: 'Explicit finite element analysis software for fluid-structure interaction.',
                description: 'Explicit dynamics and fluid-structure interaction solver for impact, crash, and high-speed transient phenomena with coupled physics.',
                features: [
                    'Explicit time integration',
                    'Eulerian and ALE fluid modeling',
                    'Fluid-structure coupling',
                    'Impact and crash simulation',
                    'Airbag deployment analysis',
                    'Blast and underwater shock'
                ],
                benefits: 'Safely simulate extreme loading conditions, optimize safety systems, and validate crash performance virtually.'
            },
            {
                name: 'MSC Apex',
                category: 'CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-apex',
                usage: '3D CAD and mesh generation software.',
                description: 'Advanced meshing platform with specialized capabilities for fluid domain creation and complex geometry handling.',
                features: [
                    'CFD volume mesh generation',
                    'Automated fluid domain extraction',
                    'Surface wrapping and cleanup',
                    'Boundary layer meshing',
                    'Mesh quality optimization',
                    'Integrated workflow automation'
                ],
                benefits: 'Reduce mesh preparation time for fluid analysis, improve solution accuracy, and streamline FSI workflows.'
            }
        ],
        business: 'Optimize thermal and aerodynamic performance and reduce prototyping.'
    },
    {
        key: 'autonomous',
        title: 'Autonomous Systems',
        short: 'Autonomous',
        iconGradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
        iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        definition: 'Simulation and validation of autonomous vehicles, robotics, and intelligent systems.',
        description: 'Autonomous systems engineering focuses on developing and validating self-driving vehicles, automated machinery, and intelligent control systems through virtual testing and scenario simulation.',
        jobDescriptions: {
            mechanical: [
                'Deliver Adams/Easy5 training for autonomous ground vehicle and robotic systems',
                'Provide technical support for sensor integration and autonomous control validation',
                'Drive sales in automotive ADAS, industrial robotics, and autonomous machinery',
                'Develop workflows for vehicle dynamics and path planning simulation',
                'Support customers in virtual testing of autonomous algorithms and sensors',
                'Conduct demonstrations on LiDAR mounting, camera shake, and sensor performance',
                'Assist in hardware-in-the-loop (HIL) setup and real-time simulation',
                'Create technical content on autonomous system virtual validation strategies'
            ],
            aerospace: [
                'Conduct Adams training for eVTOL, UAV, and autonomous aircraft dynamics',
                'Provide technical support for autonomous flight control and electric propulsion',
                'Drive aerospace sales through urban air mobility (UAM) simulation demonstrations',
                'Develop workflows for rotor dynamics, battery management, and flight envelope',
                'Support customers in certifying autonomous aircraft under EASA/FAA regulations',
                'Assist in multi-rotor vehicle stability and control law validation',
                'Collaborate with eVTOL startups on virtual testing and prototype reduction',
                'Present case studies on autonomous landing systems and collision avoidance'
            ],
            mechanicalQualifications: [
                'B.S./M.S. in Mechanical, Robotics, or Electrical Engineering',
                '3+ years in autonomous systems, robotics, or vehicle dynamics',
                'Experience with Adams, MATLAB/Simulink, or similar tools',
                'Knowledge of control systems, sensor fusion, and machine learning',
                'Background in automotive ADAS or autonomous vehicle development'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace Engineering or related field',
                '3+ years in UAV, eVTOL, or autonomous aerial systems',
                'Knowledge of autonomous flight control and electric propulsion',
                'Experience with multi-rotor dynamics and certification (EASA/FAA)',
                'Background in urban air mobility or advanced air mobility (AAM)'
            ],
            mechanicalSkills: ['Adams', 'ADAS', 'Sensor Fusion', 'Controls', 'MATLAB', 'HIL Testing', 'Machine Learning'],
            aerospaceSkills: ['UAV', 'eVTOL', 'Flight Controls', 'Electric Propulsion', 'Urban Air Mobility', 'Autonomy']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete autonomous system development and validation platform.',
                description: 'Integrated suite combining Adams vehicle dynamics, Easy5 controls, and FEA for comprehensive autonomous system design and virtual testing.',
                features: [
                    'Full autonomous vehicle toolkit',
                    'Integrated sensor and control modeling',
                    'Virtual testing environment',
                    'Hardware-in-the-loop capabilities',
                    'Real-time co-simulation',
                    'Complete validation workflow'
                ],
                benefits: 'Accelerate autonomous development with integrated tools, validate entire system performance, and reduce physical prototype testing by 60%.'
            },
            {
                name: 'Adams',
                category: 'Multibody Dynamics',
                url: '/Products_and_services/Software_Sales/products/adams',
                usage: 'Virtual prototyping and testing of autonomous vehicle dynamics and control systems.',
                description: 'Advanced multibody dynamics platform for simulating autonomous vehicle behavior, sensor interactions, and control system validation.',
                features: [
                    'Vehicle dynamics simulation',
                    'Sensor mounting and vibration analysis',
                    'Control system co-simulation',
                    'Scenario-based testing',
                    'Hardware-in-the-loop integration',
                    'Real-time simulation capabilities'
                ],
                benefits: 'Test thousands of autonomous scenarios virtually, validate sensor performance, and reduce development time by 40%.'
            },
            {
                name: 'Easy5',
                category: 'Systems Simulation',
                url: '/Products_and_services/Software_Sales/products/easy5',
                usage: 'System-level modeling of autonomous control algorithms and sensor integration.',
                description: 'Multi-domain system simulation for modeling and analyzing complex autonomous control systems and sensor fusion algorithms.',
                features: [
                    'Control algorithm development',
                    'Sensor fusion modeling',
                    'Multi-domain system integration',
                    'Real-time embedded code generation',
                    'Model-based design workflow',
                    'HIL and SIL testing support'
                ],
                benefits: 'Accelerate control system development, validate sensor fusion strategies, and reduce integration risks.'
            },
            {
                name: 'MSC Nastran',
                category: 'FEA Solver',
                url: '/Products_and_services/Software_Sales/products/msc-nastran',
                usage: 'Structural validation of autonomous vehicle components and sensor mounting.',
                description: 'Structural analysis solver for validating sensor mounting structures, autonomous vehicle components, and vibration isolation systems.',
                features: [
                    'Sensor bracket stress analysis',
                    'Vibration isolation design',
                    'Structural optimization',
                    'Fatigue life prediction',
                    'Impact resistance validation',
                    'Multi-physics coupling'
                ],
                benefits: 'Ensure sensor mounting reliability, optimize structural weight, and validate autonomous system durability.'
            }
        ],
        business: 'Accelerate autonomous system development, reduce physical testing costs, and ensure safety through virtual validation.'
    },
    {
        key: 'vmc',
        title: 'Virtual Manufacturing & Composites',
        short: 'VM&C',
        iconGradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
        iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
        definition: 'Digital manufacturing process simulation and advanced composite material analysis.',
        description: 'Virtual Manufacturing & Composites combines manufacturing process simulation with advanced composite material modeling to optimize production methods, reduce defects, and predict material behavior throughout the manufacturing lifecycle.',
        jobDescriptions: {
            mechanical: [
                'Deliver Marc/Digimat training for manufacturing simulation and material modeling',
                'Provide technical support for metal forming, welding, and injection molding processes',
                'Drive sales in automotive, aerospace, and consumer product manufacturing sectors',
                'Develop workflows for process optimization and residual stress prediction',
                'Support customers in reducing scrap rates and manufacturing defects',
                'Conduct demonstrations on additive manufacturing and composite forming',
                'Assist in material characterization and multi-scale modeling setup',
                'Create technical content on virtual manufacturing best practices'
            ],
            aerospace: [
                'Conduct Marc training for autoclave curing and composite manufacturing processes',
                'Provide technical support for aerospace composite layup and resin transfer molding',
                'Drive aerospace sales through composite airframe manufacturing demonstrations',
                'Develop workflows for cure cycle optimization and spring-in prediction',
                'Support customers in reducing composite part scrap and manufacturing time',
                'Assist in out-of-autoclave (OOA) process simulation and validation',
                'Collaborate with aerospace manufacturers on automated fiber placement (AFP)',
                'Present case studies on residual stress in composite structures and tool design'
            ],
            mechanicalQualifications: [
                'B.S./M.S. in Mechanical, Materials, or Manufacturing Engineering',
                '3+ years in composite manufacturing or process simulation',
                'Experience with Marc, Digimat, or similar material modeling tools',
                'Knowledge of manufacturing processes (forming, molding, curing)',
                'Understanding of composite materials and multi-scale modeling'
            ],
            aerospaceQualifications: [
                'B.S./M.S. in Aerospace, Materials, or Composites Engineering',
                '3+ years in aerospace composite design or manufacturing',
                'Knowledge of autoclave, RTM, AFP/ATL, OOA processes',
                'Experience with composite airframe manufacturing and tooling',
                'Background in aircraft OEM or composite Tier-1 supplier'
            ],
            mechanicalSkills: ['Marc', 'Digimat', 'Composites', 'Manufacturing Simulation', 'Material Modeling', 'Process Optimization'],
            aerospaceSkills: ['Autoclave', 'AFP/ATL', 'RTM', 'OOA', 'Cure Simulation', 'Airframe Composites']
        },
        products: [
            {
                name: 'MSCOne',
                category: 'Unified CAE Platform',
                url: '/Products_and_services/Software_Sales/products/msc-one',
                usage: 'Complete manufacturing simulation and composites analysis suite.',
                description: 'Comprehensive platform integrating Marc nonlinear FEA, Digimat material modeling, and structural analysis for end-to-end virtual manufacturing.',
                features: [
                    'Complete manufacturing simulation tools',
                    'Integrated material modeling',
                    'Process-to-performance workflow',
                    'Multi-scale analysis capabilities',
                    'Optimization and DOE tools',
                    'Unified data management'
                ],
                benefits: 'Optimize entire manufacturing process from material selection to final part performance, reduce scrap rates by 50%, and accelerate time-to-market.'
            },
            {
                name: 'Marc',
                category: 'Nonlinear FEA',
                url: '/Products_and_services/Software_Sales/products/marc',
                usage: 'Simulation of composite forming, curing, and manufacturing processes.',
                description: 'Advanced nonlinear FEA solver specialized in composite manufacturing simulation including forming, curing, and residual stress prediction.',
                features: [
                    'Composite forming simulation',
                    'Cure cycle analysis',
                    'Residual stress prediction',
                    'Spring-in and warpage analysis',
                    'Tool-part interaction modeling',
                    'Process optimization capabilities'
                ],
                benefits: 'Reduce manufacturing defects by 60%, optimize cure cycles, and minimize costly physical trials.'
            },
            {
                name: 'Digimat',
                category: 'Material Modeling',
                url: '/Products_and_services/Software_Sales/products/digimat',
                usage: 'Multi-scale material modeling for composites and advanced materials.',
                description: 'Multi-scale material modeling platform for predicting composite and advanced material behavior from micro to macro scale.',
                features: [
                    'Micro-mechanical modeling',
                    'Fiber orientation prediction',
                    'Fatigue and damage modeling',
                    'Injection molding simulation',
                    'Material property prediction',
                    'CAE solver integration'
                ],
                benefits: 'Accurately predict composite behavior, reduce material testing, and accelerate material qualification.'
            },
            {
                name: 'MSC Nastran',
                category: 'FEA Solver',
                url: '/Products_and_services/Software_Sales/products/msc-nastran',
                usage: 'Structural analysis of composite structures and laminates.',
                description: 'Industry-standard FEA solver with comprehensive composite analysis capabilities including layered shell elements and failure criteria.',
                features: [
                    'Layered composite modeling',
                    'Progressive failure analysis',
                    'Delamination prediction',
                    'Bolted joint analysis',
                    'Thermal stress analysis',
                    'Optimization for composites'
                ],
                benefits: 'Optimize composite designs, validate structural performance, and meet certification requirements faster.'
            }
        ],
        business: 'Reduce manufacturing defects, optimize composite designs, and shorten time-to-market for advanced materials.'
    }
]

const mscProducts = [
    {
        id: 'mscone',
        name: 'MSCOne',
        icon: '☁️',
        category: 'Unified Platform',
        headerGradient: 'bg-gradient-to-r from-slate-600 to-slate-800',
        description: 'Design everything. Simulate anything. MSCOne is a definitive collection of the most advanced simulation software with flexible access through a unique token-based subscription system.',
        features: [
            'Complete CAE software portfolio access',
            'Token-based flexible resource allocation',
            'Low barrier to entry subscription model',
            'Integrated e-learning platform',
            'Cloud-based deployment option',
            'Constantly updated software collection'
        ],
        useCases: ['Global Enterprises', 'SME Companies', 'Consulting Firms', 'Engineering Departments', 'Project-Based Teams', 'Multi-Discipline Engineering'],
        benefits: 'Accelerate innovation, improve productivity with flexible scaling, reduce financial risk, consolidate CAE suppliers, and provide access to infrequently used applications without individual licensing burden.'
    },
    {
        id: 'nastran',
        name: 'MSC Nastran',
        icon: '🔧',
        category: 'FEA Solver',
        headerGradient: 'bg-gradient-to-r from-blue-600 to-blue-800',
        description: 'Industry-leading finite element analysis solver for structural, thermal, and dynamic simulations with advanced nonlinear capabilities.',
        features: [
            'Linear and nonlinear analysis capabilities',
            'Static, dynamic, and thermal analysis',
            'Fatigue and durability assessment',
            'Multiphysics coupling',
            'Optimization and sensitivity analysis',
            'Large-scale model processing'
        ],
        useCases: ['Aerospace', 'Automotive', 'Energy', 'Medical Devices', 'Consumer Products'],
        benefits: 'Reduce design cycles, minimize physical prototyping, and accelerate time-to-market while ensuring product safety and performance.'
    },
    {
        id: 'adams',
        name: 'Adams',
        icon: '🔄',
        category: 'Multibody Dynamics',
        headerGradient: 'bg-gradient-to-r from-indigo-600 to-indigo-800',
        description: 'Leading multibody dynamics simulation software for analyzing motion and performance of mechanical systems.',
        features: [
            'Multibody dynamics simulation',
            'Kinematic and dynamic analysis',
            'Mechanical systems modeling',
            'Control system integration',
            'Automatic differentiation',
            'Co-simulation capabilities'
        ],
        useCases: ['Machinery Design', 'Vehicle Dynamics', 'Robotics', 'Equipment Motion', 'Mechanisms'],
        benefits: 'Validate system performance early in design, optimize mechanisms for efficiency, and reduce physical testing requirements.'
    },
    {
        id: 'actran',
        name: 'Actran',
        icon: '🔊',
        category: 'Acoustics & NVH',
        headerGradient: 'bg-gradient-to-r from-cyan-600 to-cyan-800',
        description: 'Comprehensive acoustic and vibration simulation software for NVH analysis and noise control in products.',
        features: [
            'Acoustic radiation and scattering',
            'Vibration and noise analysis',
            'Sound transmission loss prediction',
            'Acoustic impedance calculations',
            'Frequency and transient analysis',
            'Advanced post-processing tools'
        ],
        useCases: ['Automotive', 'HVAC Systems', 'Appliances', 'Industrial Equipment', 'Consumer Electronics'],
        benefits: 'Design quieter, more comfortable products that meet regulatory requirements and exceed customer expectations.'
    },
    {
        id: 'marc',
        name: 'Marc',
        icon: '📊',
        category: 'Nonlinear FEA',
        headerGradient: 'bg-gradient-to-r from-purple-600 to-purple-800',
        description: 'Advanced nonlinear finite element analysis software for complex material and contact problems.',
        features: [
            'Nonlinear material models',
            'Contact and friction modeling',
            'Large deformation analysis',
            'Time-dependent behavior',
            'Composite material simulation',
            'User-defined material subroutines'
        ],
        useCases: ['Elastomers & Polymers', 'Composites', 'Metal Forming', 'Impact & Crash', 'Adhesives'],
        benefits: 'Accurately predict product performance under extreme conditions and ensure reliability in challenging applications.'
    },
    {
        id: 'dytran',
        name: 'Dytran',
        icon: '💨',
        category: 'Fluid-Structure Interaction',
        headerGradient: 'bg-gradient-to-r from-green-600 to-green-800',
        description: 'Explicit dynamics and fluid-structure interaction solver for transient analysis and high-speed phenomena.',
        features: [
            'Explicit time integration',
            'Fluid-structure coupling',
            'Hypervelocity impact simulation',
            'Shock and blast analysis',
            'Drop and crush testing',
            'Rapid prototyping analysis'
        ],
        useCases: ['Impact Analysis', 'Blast Effects', 'Hydrodynamics', 'Crash Simulation', 'Explosive Detonation'],
        benefits: 'Safely simulate extreme loading conditions, understand failure mechanisms, and optimize designs for safety.'
    },
    {
        id: 'apex',
        name: 'MSC Apex',
        icon: '🎨',
        category: 'CAD & Meshing',
        headerGradient: 'bg-gradient-to-r from-orange-600 to-orange-800',
        description: 'Advanced CAD geometry engine and meshing software for preparation of analysis models.',
        features: [
            'Geometry import and cleanup',
            'Automated meshing algorithms',
            'Surface and solid meshing',
            'Mesh quality optimization',
            'Multi-CAD format support',
            'Parametric modeling'
        ],
        useCases: ['Model Preparation', 'Geometry Cleanup', 'Mesh Generation', 'Design Optimization', 'Manufacturing'],
        benefits: 'Accelerate model preparation time, improve mesh quality, and enable faster analysis iterations.'
    },
    {
        id: 'patran',
        name: 'Patran',
        icon: '📐',
        category: 'Pre/Post Processing',
        headerGradient: 'bg-gradient-to-r from-pink-600 to-pink-800',
        description: 'Comprehensive pre and post-processing tool for FEA with advanced visualization and result analysis.',
        features: [
            'Geometric modeling tools',
            'Mesh generation and control',
            'Boundary condition application',
            'Advanced result visualization',
            'Report generation',
            'Animation and playback'
        ],
        useCases: ['FEA Preprocessing', 'Result Analysis', 'Model Visualization', 'Report Documentation', 'Quality Assurance'],
        benefits: 'Streamline analysis workflow, enhance result visualization, and improve communication of technical findings.'
    },
    {
        id: 'simxpert',
        name: 'SimXpert',
        icon: '⚙️',
        category: 'Integrated Platform',
        headerGradient: 'bg-gradient-to-r from-red-600 to-red-800',
        description: 'Integrated simulation platform combining multiple solvers for comprehensive multi-physics analysis.',
        features: [
            'Multi-solver integration',
            'Multiphysics coupling',
            'Unified interface',
            'Workflow automation',
            'Parameter management',
            'Design exploration'
        ],
        useCases: ['Thermal-Structural', 'Fluid-Thermal', 'Multi-Domain Analysis', 'Complex Interactions', 'Integrated Workflows'],
        benefits: 'Analyze complex interactions between different physics domains without switching platforms or data conversion.'
    },
    {
        id: 'easy5',
        name: 'Easy5',
        icon: '🔌',
        category: 'Control Systems',
        headerGradient: 'bg-gradient-to-r from-teal-600 to-teal-800',
        description: 'Systems simulation software for modeling controls, powertrains, and complex system behavior.',
        features: [
            'System-level modeling',
            'Control system design',
            'Powertrain simulation',
            'Electrical systems',
            'Graphical block diagram interface',
            'Co-simulation capabilities'
        ],
        useCases: ['Vehicle Control', 'Powertrain', 'Electrical Systems', 'HVAC', 'Hydraulics'],
        benefits: 'Design and optimize control systems integrated with mechanical models for holistic system performance validation.'
    },
]

const industries = [
    { name: 'Aerospace & Defense' },
    { name: 'Automotive' },
    { name: 'Consumer Product' },
    { name: 'Electronics' },
    { name: 'Energy' },
    { name: 'Heavy Machinaries & Equipment' },
    { name: 'Automotive' },
    { name: 'Medical' },
    { name: 'Packaging' },
    { name: 'Shipbuilding' },
]

// Import MSC Software logos
import mscNastranLogo from '@/assets/LOGO/MSCNastran.png'
import patranLogo from '@/assets/LOGO/Patran.jpg'
import marcLogo from '@/assets/LOGO/Marc.png'
import dytranLogo from '@/assets/LOGO/Dytran.png'

import mscApexLogo from '@/assets/LOGO/MSC Apex.png'
import actranLogo from '@/assets/LOGO/Actran.png'
import mscCoSimLogo from '@/assets/LOGO/MSC CoSim.jpg'
import caeFatigueLogo from '@/assets/LOGO/CAEfatigue.jpg'
import mscOneLogo from '@/assets/LOGO/MSCOne.jpg'
</script>

<style scoped>
.container {
    max-width: 1100px;
}
</style>
