<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          >
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 text-white p-6 md:p-8 relative overflow-hidden">
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkg0OHYxMkgzNnYtMTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              
              <div class="relative flex items-start justify-between">
                <div>
                  <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
                    <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="text-emerald-200 text-sm font-semibold">Free Quote</span>
                  </div>
                  <h2 class="text-3xl md:text-4xl font-bold mb-2">
                    Request a Free Quote
                  </h2>
                  <p class="text-emerald-200">
                    Get competitive pricing for MSC Software solutions - No hidden fees
                  </p>
                </div>
                <button
                  @click="closeModal"
                  class="flex-shrink-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Modal Body - Scrollable -->
            <div class="overflow-y-auto max-h-[calc(90vh-200px)] p-6 md:p-8">
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Personal Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Personal Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.firstName"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.lastName"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <!-- Contact Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Contact Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.email"
                        type="email"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="john.doe@company.com"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.phone"
                        type="tel"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <!-- Company Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Company Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.company"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Your Company Inc."
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Industry <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="formData.industry"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                      >
                        <option value="">Select Industry</option>
                        <option value="aerospace">Aerospace</option>
                        <option value="automotive">Automotive</option>
                        <option value="consumer-products">Consumer Products</option>
                        <option value="defense">Defense</option>
                        <option value="electronics">Electronics</option>
                        <option value="energy">Energy</option>
                        <option value="heavy-equipment">Heavy Equipment</option>
                        <option value="machinery">Machinery</option>
                        <option value="medical">Medical</option>
                        <option value="packaging">Packaging</option>
                        <option value="rail">Rail</option>
                        <option value="shipbuilding">Shipbuilding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Company Address
                    </label>
                    <textarea
                      v-model="formData.address"
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                      placeholder="Company address (optional)"
                    ></textarea>
                  </div>
                </div>

                <!-- Product Selection with Quantity -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                    </svg>
                    MSC Software Products (Select products & specify quantity)
                  </h3>
                  
                  <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 mb-4">
                    <div class="flex items-center gap-2 text-sm text-green-800">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="font-semibold">Click on products you're interested in and specify the number of licenses needed</span>
                    </div>
                  </div>

                  <div class="space-y-3 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div
                      v-for="product in products"
                      :key="product.name"
                      class="bg-white rounded-lg border-2 transition-all"
                      :class="formData.selectedProducts.find(p => p.name === product.name) ? 'border-green-500 shadow-md' : 'border-gray-200'"
                    >
                      <label class="flex items-center gap-3 p-4 cursor-pointer">
                        <input
                          type="checkbox"
                          :checked="formData.selectedProducts.find(p => p.name === product.name)"
                          @change="toggleProduct(product.name)"
                          class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <div class="flex-1">
                          <div class="flex items-center justify-between">
                            <div>
                              <span class="font-semibold text-gray-900">{{ product.name }}</span>
                              <p class="text-xs text-gray-600 mt-1">{{ product.category }}</p>
                            </div>
                            <div v-if="formData.selectedProducts.find(p => p.name === product.name)" class="flex items-center gap-3">
                              <label class="text-sm font-medium text-gray-700">Licenses:</label>
                              <input
                                type="number"
                                min="1"
                                max="999"
                                v-model.number="formData.selectedProducts.find(p => p.name === product.name).quantity"
                                class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center font-semibold"
                                @click.stop
                              />
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div class="mt-3 flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-200">
                    <span class="text-sm font-semibold text-gray-700">Selected Products:</span>
                    <span class="text-lg font-bold text-green-600">{{ formData.selectedProducts.length }} products</span>
                  </div>
                </div>

                <!-- Service Type -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Additional Services Needed
                  </h3>
                  <div class="space-y-3">
                    <label
                      v-for="service in services"
                      :key="service.value"
                      class="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-transparent hover:border-green-400 transition-all cursor-pointer"
                      :class="formData.selectedServices.includes(service.value) ? 'border-green-500 bg-gradient-to-br from-green-100 to-emerald-100' : ''"
                    >
                      <input
                        type="checkbox"
                        :value="service.value"
                        v-model="formData.selectedServices"
                        class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5"
                      />
                      <div class="flex-1">
                        <div class="flex items-center justify-between">
                          <div>
                            <span class="font-semibold text-gray-900">{{ service.name }}</span>
                            <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
                          </div>
                          <div v-if="service.badge" class="ml-3">
                            <span class="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                              {{ service.badge }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- License Type -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    License Type Preference
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label
                      v-for="license in licenseTypes"
                      :key="license.value"
                      class="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-transparent hover:border-blue-400 transition-all cursor-pointer"
                      :class="formData.licenseType === license.value ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100' : ''"
                    >
                      <input
                        type="radio"
                        :value="license.value"
                        v-model="formData.licenseType"
                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                      <div>
                        <div class="font-semibold text-gray-900">{{ license.name }}</div>
                        <div class="text-xs text-gray-600 mt-1">{{ license.description }}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Budget Range -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Estimated Budget Range (Optional)
                  </h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label
                      v-for="budget in budgetRanges"
                      :key="budget"
                      class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer"
                    >
                      <input
                        type="radio"
                        :value="budget"
                        v-model="formData.budgetRange"
                        class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ budget }}</span>
                    </label>
                  </div>
                </div>

                <!-- Timeline -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Expected Purchase Timeline
                  </h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label
                      v-for="timeline in timelines"
                      :key="timeline.value"
                      class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer"
                    >
                      <input
                        type="radio"
                        :value="timeline.value"
                        v-model="formData.timeline"
                        class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ timeline.label }}</span>
                    </label>
                  </div>
                </div>

                <!-- Current Software -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Current Software / Tools Used (if any)
                  </label>
                  <input
                    v-model="formData.currentSoftware"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="e.g., ANSYS, Abaqus, SolidWorks, etc."
                  />
                </div>

                <!-- Specific Requirements -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Specific Requirements / Project Details
                  </label>
                  <textarea
                    v-model="formData.requirements"
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                    placeholder="Tell us about your project requirements, team size, specific features needed, or any questions about pricing..."
                  ></textarea>
                </div>

                <!-- Special Offers -->
                <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-5">
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                    </svg>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-2">Included with Every Purchase:</h4>
                      <ul class="space-y-1 text-sm text-gray-700">
                        <li class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>FREE 24/7 Technical Support</span>
                        </li>
                        <li class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>FREE Comprehensive Training</span>
                        </li>
                        <li class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>FREE Installation & Configuration</span>
                        </li>
                        <li class="flex items-center gap-2">
                          <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>Competitive Global Pricing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Privacy Consent -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="formData.consent"
                      required
                      class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5"
                    />
                    <span class="text-sm text-gray-700">
                      I acknowledge that the information I provide might be used by Hi-Tech SoftSys for contacting me with personalized product offerings, pricing information, and promotional offers. <span class="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <!-- Quote Summary -->
                <div v-if="formData.selectedProducts.length > 0" class="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-6 text-white">
                  <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Quote Summary
                  </h4>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center pb-2 border-b border-white/20">
                      <span class="text-blue-200">Total Products:</span>
                      <span class="font-bold">{{ formData.selectedProducts.length }}</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-white/20">
                      <span class="text-blue-200">Total Licenses:</span>
                      <span class="font-bold">{{ totalLicenses }}</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-white/20">
                      <span class="text-blue-200">Additional Services:</span>
                      <span class="font-bold">{{ formData.selectedServices.length }}</span>
                    </div>
                    <div class="pt-2">
                      <p class="text-xs text-blue-200">Our sales team will provide detailed pricing within 24 hours</p>
                    </div>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Get FREE Quote</span>
                  </button>
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  address: '',
  selectedProducts: [],
  selectedServices: [],
  licenseType: 'perpetual',
  budgetRange: '',
  timeline: 'immediate',
  currentSoftware: '',
  requirements: '',
  consent: false
})

const products = [
  { name: 'MSC Nastran', category: 'FEA Solver - Structural Analysis' },
  { name: 'Patran', category: 'Pre/Post-Processing' },
  { name: 'Marc', category: 'Nonlinear FEA Solver' },
  { name: 'Dytran', category: 'Explicit Dynamics Solver' },
  { name: 'MSC Apex', category: 'Next-Gen CAE Platform' },
  { name: 'Actran', category: 'Acoustic Simulation' },
  { name: 'Adams', category: 'Multibody Dynamics' },
  { name: 'CAEfatigue', category: 'Fatigue Analysis' },
  { name: 'MSC CoSim', category: 'Co-Simulation Engine' },
  { name: 'Digimat', category: 'Material Modeling (ICME)' },
  { name: 'Easy5', category: 'System Simulation' },
  { name: 'Simufact', category: 'Virtual Manufacturing' },
  { name: 'Cradle CFD', category: 'Computational Fluid Dynamics' },
  { name: 'MSC One', category: 'Token-Based Licensing' },
  { name: 'MaterialCenter', category: 'Material Data Management' },
  { name: 'SimManager', category: 'Engineering Data Management' }
]

const services = [
  {
    value: 'training',
    name: 'Training Services',
    description: 'On-site, online training and certifications',
    badge: 'FREE'
  },
  {
    value: 'technical-support',
    name: 'Extended Technical Support',
    description: 'Premium 24/7 support with dedicated engineer',
    badge: 'FREE'
  },
  {
    value: 'engineering-services',
    name: 'Engineering Services',
    description: 'FEA, CFD analysis and consulting',
    badge: ''
  },
  {
    value: 'installation',
    name: 'Installation & Configuration',
    description: 'Complete setup and deployment assistance',
    badge: 'FREE'
  },
  {
    value: 'custom-development',
    name: 'Custom Development',
    description: 'Custom scripts, macros, and automation',
    badge: ''
  },
  {
    value: 'annual-maintenance',
    name: 'Annual Maintenance',
    description: 'Software updates and version upgrades',
    badge: ''
  }
]

const licenseTypes = [
  {
    value: 'perpetual',
    name: 'Perpetual License',
    description: 'One-time purchase, lifetime ownership'
  },
  {
    value: 'subscription',
    name: 'Subscription License',
    description: 'Annual or monthly subscription'
  },
  {
    value: 'network',
    name: 'Network/Floating License',
    description: 'Shared licenses across team'
  }
]

const budgetRanges = [
  'Under $10K',
  '$10K - $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K+',
  'Not sure yet'
]

const timelines = [
  { value: 'immediate', label: 'Immediate' },
  { value: '1-month', label: '1 Month' },
  { value: '3-months', label: '3 Months' },
  { value: '6-months', label: '6+ Months' },
  { value: 'exploring', label: 'Just Exploring' }
]

const totalLicenses = computed(() => {
  return formData.value.selectedProducts.reduce((sum, product) => sum + (product.quantity || 0), 0)
})

const toggleProduct = (productName) => {
  const index = formData.value.selectedProducts.findIndex(p => p.name === productName)
  if (index >= 0) {
    formData.value.selectedProducts.splice(index, 1)
  } else {
    formData.value.selectedProducts.push({ name: productName, quantity: 1 })
  }
}

const closeModal = () => {
  emit('update:modelValue', false)
}

const submitForm = () => {
  // Validate that at least one product is selected
  if (formData.value.selectedProducts.length === 0) {
    alert('Please select at least one MSC Software product for your quote')
    return
  }

  console.log('Quote Request Submitted:', formData.value)
  
  // Emit the form data to parent
  emit('submit', { ...formData.value })
  
  // Show success message
  alert('Thank you for your request! Our sales team will send you a detailed quote within 24 hours.')
  
  // Reset form
  resetForm()
  closeModal()
}

const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    address: '',
    selectedProducts: [],
    selectedServices: [],
    licenseType: 'perpetual',
    budgetRange: '',
    timeline: 'immediate',
    currentSoftware: '',
    requirements: '',
    consent: false
  }
}

// Prevent body scroll when modal is open
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Custom scrollbar for product list */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>

