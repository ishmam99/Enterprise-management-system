<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto mt-20 ">
      <!-- Hero Header with Illustration -->
      <div class="text-center mb-6">

        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">
          Software Request Form</h1>
        <p class="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">Request tailored software solutions for your company.
          Fill out the form and our team will get back to you within 24 hours.</p>
      </div>

      <!-- Main Form Card - Modern Glassmorphism Style -->
      <div
        class="bg-white backdrop-blur-sm rounded-3xl shadow-2xl shadow-xl border border- overflow-hidden transition-all duration-300">
        <form @submit.prevent="handleSubmit" class="p-6 md:p-10 space-y-10">
          <!-- Contact Information Section -->
          <section class="relative">
            <div class="absolute -left-4 -top-2 w-1.5 h-8 bg-indigo-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3 pb-3 mb-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Contact Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span
                    class="text-red-500">*</span></label>
                <input v-model="formData.name" type="text" placeholder="John Doe"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.name }" />
                <p v-if="validationErrors.name" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.name }}
                </p>
              </div>
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Company Name <span
                    class="text-red-500">*</span></label>
                <input v-model="formData.company_name" type="text" placeholder="Acme Inc."
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.company_name }" />
                <p v-if="validationErrors.company_name" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.company_name }}
                </p>
              </div>
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span
                    class="text-red-500">*</span></label>
                <input v-model="formData.email" type="email" placeholder="john@acme.com"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.email }" />
                <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.email }}
                </p>
              </div>
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <input v-model="formData.phone" type="tel" placeholder="+1 (555) 000-9999"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Department <span
                    class="text-red-500">*</span></label>
                <select v-model="formData.department"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.department }">
                  <option value="" disabled>Department</option>
                  <option v-for="department in departments" :key="department" :value="department">{{ department }}
                  </option>
                </select>
                <p v-if="validationErrors.department" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.department }}
                </p>
              </div>
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Position</label>
                <input v-model="formData.position" type="tel" placeholder="Position"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white" />
              </div>
            </div>
          </section>

          <!-- Company Details Section (Type & Industry) -->
          <section class="relative">
            <div class="absolute -left-4 -top-2 w-1.5 h-8 bg-indigo-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3 pb-3 mb-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Company Details
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Company Type <span
                    class="text-red-500">*</span></label>
                <select v-model="formData.company_type"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.company_type }">
                  <option value="" disabled>Select company type</option>
                  <option v-for="type in companyTypes" :key="type" :value="type">{{ type }}</option>
                </select>
                <p v-if="validationErrors.company_type" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.company_type }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Industry <span
                    class="text-red-500">*</span></label>
                <select v-model="formData.industry"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.industry }">
                  <option value="" disabled>Select industry</option>
                  <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
                </select>
                <p v-if="validationErrors.industry" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.industry }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Type of Company <span
                    class="text-red-500">*</span></label>
                <select v-model="formData.type_of_company"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.type_of_company }">
                  <option value="" disabled selected>Type of Company</option>
                  <option v-for="type in typeOfCompanies" :key="type" :value="type">{{ type }}</option>
                </select>
                <p v-if="validationErrors.type_of_company" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.type_of_company }}
                </p>
              </div>
            </div>
            <div class="mt-4">
              <div class="group">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Company Details</label>
                <textarea v-model="formData.company_details" type="text" placeholder="Company details..."
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:bg-white" />
              </div>
            </div>
          </section>

          <!-- Billing Address Section -->
          <section class="relative">
            <div class="absolute -left-4 -top-2 w-1.5 h-8 bg-indigo-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3 pb-3 mb-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              Billing Address
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Street Address</label>
                <input v-model="formData.billing_street" type="text" placeholder="123 Business Ave"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
                <input v-model="formData.billing_city" type="text" placeholder="New York"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">State / Province</label>
                <input v-model="formData.billing_state" type="text" placeholder="NY"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Country</label>
                <select v-model="formData.billing_country"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                  <option value="" disabled>Select country</option>
                  <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Software Selection Section (Single) -->
          <section class="relative">
            <div class="absolute -left-4 -top-2 w-1.5 h-8 bg-indigo-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3 pb-3 mb-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              Software Requirements
            </h2>
            <div class="grid grid-cols-3 gap-6">
              <!-- Solution Selection -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Solution Category <span
                    class="text-red-500">*</span></label>
                <select v-model="selectedSolutionId" @change="onSolutionChange"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.solution_id }"
                  :disabled="loading">
                  <option value="" disabled>Select a solution category</option>
                  <option v-for="solution in solutionList" :key="solution.id" :value="solution.id">
                    {{ solution.name }}
                  </option>
                </select>
                <div v-if="loading" class="flex items-center gap-2 mt-2 text-sm text-slate-500">
                  <svg class="animate-spin h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Loading solutions...
                </div>
                <p v-if="validationErrors.solution_id" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.solution_id }}
                </p>
              </div>

              <!-- Software Selection -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Software Product <span
                    class="text-red-500">*</span></label>
                <select v-model="selectedSoftwareId"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.software_id }"
                  :disabled="!selectedSolutionId || loadingSoftwares">
                  <option value="" disabled>Select a software product</option>
                  <option v-for="software in availableSoftwares" :key="software.id" :value="software.id">
                    {{ software.name }}
                  </option>
                </select>
                <div v-if="selectedSolutionId && availableSoftwares.length === 0 && !loadingSoftwares"
                  class="text-amber-600 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> No software products available for this solution.
                </div>
                <p v-if="validationErrors.software_id" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.software_id }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Purchase Reason <span
                    class="text-red-500">*</span></label>
                <select v-model="formData.purchase_reason"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  :class="{ 'border-red-500 focus:ring-red-500 bg-red-50/30': validationErrors.purchase_reason }">
                  <option value="" disabled>Purchase Reason</option>
                  <option v-for="reason in purchaseReasons" :key="reason" :value="reason">{{ reason }}</option>
                </select>
                <p v-if="validationErrors.purchase_reason" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span> {{ validationErrors.purchase_reason }}
                </p>
              </div>
            </div>
          </section>

          <!-- Fake reCAPTCHA Section -->
          <section class="relative">
            <div class="absolute -left-4 -top-2 w-1.5 h-8 bg-indigo-500 rounded-full"></div>

            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3 pb-3 mb-3">
              <div class="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Security Verification
            </h2>

            <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
              <div
                class="max-w-md mx-auto bg-white border border-gray-300 rounded-md shadow-sm p-4 flex items-center justify-between">

                <div class="flex items-center gap-4">
                  <div @click="verifyCaptcha"
                    class="w-7 h-7 border-2 border-gray-400 rounded cursor-pointer flex items-center justify-center transition-all duration-300"
                    :class="fakeRecaptchaVerified ? 'bg-green-500 border-green-500 text-white' : ''">

                    <svg v-if="fakeRecaptchaVerified" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <span class="text-gray-800 text-sm">
                    I'm not a robot
                  </span>
                </div>

                <div class="text-center">
                  <div class="font-semibold text-blue-600 text-xs">
                    reCAPTCHA
                  </div>
                  <div class="text-[10px] text-gray-400">
                    Privacy - Terms
                  </div>
                </div>
              </div>
            </div>

            <p v-if="validationErrors.captcha" class="text-red-500 text-xs mt-2 text-center">
              ⚠️ {{ validationErrors.captcha }}
            </p>
          </section>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200/80">
            <button type="submit" :disabled="isSubmitting"
              class="group relative flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden">
              <span
                class="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span v-else class="relative z-10">Submit Request</span>
              <svg v-if="!isSubmitting" class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button type="button" @click="resetForm"
              class="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-8 rounded-xl transition-all duration-200">
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <!-- Footer note -->
      <div class="text-center mt-8 text-sm text-slate-400">
        <p>By submitting, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { onMounted, ref, computed } from 'vue'
import Swal from 'sweetalert2'

// Static data
const companyTypes = [
  "Don't Know Yet",
  "Parent Company",
  "Subsidiary Company",
  "Sister Company",
  "Merger Company"
]

const industries = [
  "ASP (Application Service Provider)", "Data/Telecom OEM", "ERP (Enterprise Resource Planning)",
  "Government/Military", "Large Enterprise", "Management ISV", "MSP (Management Service Provider)",
  "Network Equipment Enterprise", "Non-management ISV", "Optical Networking", "Service Provider",
  "Small/Medium Enterprise", "Storage Equipment", "Storage Service Provider", "Systems Integrator",
  "Wireless Industry", "Communications", "Consulting", "Education", "Financial Services",
  "Manufacturing", "Real Estate", "Technology", "Floating Structures", "Aerospace & Defense"
]

const typeOfCompanies = [
  "Product Development-OEM", "Product Development-Tier 1 (Primary Supplier)",
  "Product Development-Tier 2 (Secondary Supplier)", "Product Development-(Others)", "Service",
]

const purchaseReasons = [
  "A. Product Development",
  "B. Consulting",
  "C. Training",
  "D. ",
  "E. ",
  "F. ",
  "G. ",
]

const departments = [
  "0. Need To Know",
  "1. Supply Chain",
  "2. HR",
  "3. Engineering Management",
  "4. IT Management",
  "5. Product Technical",
  "5a. Product Technical - MSC One",
  "5b. Product Technical - Actran",
  "5c. Product Technical - Adams",
  "5d. Product Technical - Digimat",
  "5e. Product Technical - FTI FormingSuite",
  "5f. Product Technical - Marc",
  "5g. Product Technical - MSC Apex",
  "5h. Product Technical - MSC Fatigue",
  "5i. Product Technical - MSC Nastran",
  "5j. Product Technical - Patran",
  "5k. Product Technical - Simufact Welding",
  "5l. Product Technical - Simufact Additive",
  "5m. Product Technical - Simufact Forming",
  "5n. Product Technical - SimManager",
  "5o. Product Technical - Odyssee",
  "5p. Product Technical - MSC Cradle",
  "5q. Product Technical - e-Learning Subscription",
  "5r. Product Technical - Academic e-Learning",
  "5s. Product Technical - University Bundles",
  "5h. Purchase and Sales"
]

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Spain", "Italy",
  "Australia", "Japan", "China", "India", "Brazil", "Mexico", "Netherlands", "Sweden",
  "Switzerland", "Singapore", "South Korea", "United Arab Emirates"
]

// State
const solutionList = ref([])
const loading = ref(false)
const loadingSoftwares = ref(false)
const selectedSolutionId = ref('')
const selectedSoftwareId = ref('')
const isSubmitting = ref(false)

const fakeRecaptchaVerified = ref(false)
const captchaLoading = ref(false)

const verifyCaptcha = async () => {
  captchaLoading.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  captchaLoading.value = false
  fakeRecaptchaVerified.value = true
}

// Form data
const formData = ref({
  name: '',
  company_name: '',
  email: '',
  phone: '',
  company_type: '',
  type_of_company: '',
  company_details: '',
  purchase_reason: '',
  department: '',
  position: '',
  industry: '',
  billing_street: '',
  billing_city: '',
  billing_state: '',
  billing_country: ''
})

// Validation errors
const validationErrors = ref({})

// Computed: available softwares for selected solution
const availableSoftwares = computed(() => {
  if (!selectedSolutionId.value) return []
  const solution = solutionList.value.find(s => s.id === selectedSolutionId.value)
  return solution?.softwares || []
})

// Generate random math CAPTCHA
// const generateNewCaptcha = () => {
//   captchaData.value.num1 = Math.floor(Math.random() * 20) + 1 // 1-20
//   captchaData.value.num2 = Math.floor(Math.random() * 20) + 1 // 1-20
//   captchaData.value.answer = captchaData.value.num1 + captchaData.value.num2
//   captchaAnswer.value = ''
//   if (validationErrors.value.captcha) {
//     validationErrors.value.captcha = null
//   }
// }

const validateCaptcha = () => {
  if (!fakeRecaptchaVerified.value) {
    validationErrors.value.captcha =
      'Please verify that you are not a robot.'
    return false
  }

  return true
}

// On solution change - reset software selection
const onSolutionChange = () => {
  selectedSoftwareId.value = ''
  if (validationErrors.value.solution_id) {
    validationErrors.value.solution_id = null
  }
}

// Validate form
const validateForm = () => {
  const errors = {}

  if (!formData.value.name?.trim()) errors.name = 'Full name is required'
  if (!formData.value.company_name?.trim()) errors.company_name = 'Company name is required'

  if (!formData.value.email?.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.value.company_type) errors.company_type = 'Company type is required'
  if (!formData.value.industry) errors.industry = 'Industry is required'
  if (!selectedSolutionId.value) errors.solution_id = 'Please select a solution category'
  if (!selectedSoftwareId.value) errors.software_id = 'Please select a software product'

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// Fetch solutions and software from API
const fetchSolutionAndSoftware = async () => {
  loading.value = true
  try {
    const http = api()
    const response = await http.get('/solutions?with=softwares')

    let data = response.data
    if (data && data.success === true) {
      solutionList.value = data.data || []
    } else if (Array.isArray(data)) {
      solutionList.value = data
    } else if (data && data.data && Array.isArray(data.data)) {
      solutionList.value = data.data
    } else {
      solutionList.value = []
    }
  } catch (err) {
    console.error('API fetch error:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Loading Failed',
      text: err.response?.data?.message || 'Could not load solutions. Please refresh the page.',
      confirmButtonColor: '#4f46e5'
    })
    solutionList.value = []
  } finally {
    loading.value = false
  }
}

// Submit form to API
const handleSubmit = async () => {
  // Validate CAPTCHA first
  if (!validateCaptcha()) {
    const captchaElement = document.querySelector('.bg-gradient-to-r')
    captchaElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  if (!validateForm()) {
    // Scroll to first error
    const firstError = Object.keys(validationErrors.value)[0]
    if (firstError) {
      const element = document.querySelector(`[class*="border-red-500"]`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  isSubmitting.value = true

  // Construct payload according to API spec
  const payload = {
    name: formData.value.name,
    company_name: formData.value.company_name,
    email: formData.value.email,
    phone: formData.value.phone || undefined,
    solution_id: selectedSolutionId.value,
    software_id: selectedSoftwareId.value,
    billing_street: formData.value.billing_street || undefined,
    billing_city: formData.value.billing_city || undefined,
    billing_state: formData.value.billing_state || undefined,
    billing_country: formData.value.billing_country || undefined,
    captcha_verified: true, // Add CAPTCHA verification flag
    account_data: {
      company_type: formData.value.company_type,
      industry: formData.value.industry,
      department: formData.value.department || undefined,
      position: formData.value.position || undefined,
      purchase_reason: formData.value.purchase_reason || undefined,
      company_details: formData.value.company_details || undefined,
      type_of_company: formData.value.type_of_company || undefined
    }
  }

  // Remove undefined fields to keep payload clean
  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) delete payload[key]
  })

  try {
    const http = api()
    const response = await http.post('/software-requests', payload)

    if (response.data?.success || response.status === 201 || response.status === 200) {
      await Swal.fire({
        icon: 'success',
        title: 'Request Submitted!',
        text: 'Your software request has been received. Our team will contact you shortly.',
        confirmButtonColor: '#4f46e5',
        background: '#ffffff',
        iconColor: '#4f46e5',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: true
      })
      resetForm()
    } else {
      throw new Error(response.data?.message || 'Submission failed')
    }
  } catch (err) {
    console.error('Submit error:', err)
    const errorMessage = err.response?.data?.message || err.message || 'Failed to submit request. Please try again.'
    await Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: errorMessage,
      confirmButtonColor: '#4f46e5'
    })
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  formData.value = {
    name: '',
    company_name: '',
    email: '',
    phone: '',
    company_type: '',
    industry: '',
    billing_street: '',
    billing_city: '',
    billing_state: '',
    billing_country: ''
  }
  selectedSolutionId.value = ''
  selectedSoftwareId.value = ''
  validationErrors.value = {}
  fakeRecaptchaVerified.value = false

}

onMounted(() => {
  fetchSolutionAndSoftware()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for form sections */
section {
  transition: all 0.2s ease;
}

/* Number input spinner removal */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>