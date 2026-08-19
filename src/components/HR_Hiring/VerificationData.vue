<!-- src/components/hiring/VerificationData.vue -->
<template>
    <div class=" rounded-2xl shadow-md p-6 mb-6 bg-purple-50">

   <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 mb-8 text-white shadow-md">
  <h2 class="text-3xl font-bold">4. Verification</h2>
  <p class="text-indigo-100 mt-2">Background Checks & Candidate Validation</p>
</div>

    <!-- Main Content -->
    <div class="p-6">

      <!-- ✅ Family / Emergency Section -->
      <div class="mb-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="border-l-4 border-indigo-500 px-5 py-4 bg-white">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            4a. Family / Emergency Background Check
          </h4>
        </div>

        <div class="p-5">
          <div class="flex flex-col lg:flex-row items-start justify-between gap-6">

            <!-- LEFT - Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              <div v-for="field in personalFields" :key="field.key" class="space-y-1">
                <label class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ field.label }}</label>
                <input
                  v-if="isEditing"
                  v-model="verificationForm[field.key]"
                  class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  :placeholder="`Enter ${field.label.toLowerCase()}`"
                />
                <div v-else class="text-gray-700 py-1 bg-gray-50 px-3 rounded-lg">
                  {{ candidate[field.key] || '—' }}
                </div>
              </div>
            </div>

            <!-- RIGHT - Action Button -->
            <div class="lg:min-w-[140px]">
              <button
                v-if="candidate.background_verified !== '1'"
                @click="$emit('mark-verified', 'background_verified')"
                :disabled="verifying.background_verified"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="verifying.background_verified" class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve
              </button>
              <div v-else class="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2.5 text-sm font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Police Background Check - Static Section -->
      <div class="mb-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="border-l-4 border-yellow-500 px-5 py-4 bg-white">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            4b. Police Background Check
          </h4>
        </div>

        <div class="p-5">
          <div class="flex flex-col lg:flex-row items-start justify-between gap-6">

            <!-- LEFT - Document Info -->
            <div class="flex-1">
              <div class="bg-gray-50 rounded-xl p-4 space-y-2">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>

                  <div>
                    <p class="text-xs text-gray-500 uppercase">Document</p>

                    <template v-if="candidate.police_background_check_document">
                      <a
                        :href="`${baseurl}/${candidate.police_background_check_document}`"
                        target="_blank"
                        class="text-yellow-600 hover:underline font-medium text-sm inline-flex items-center gap-1"
                      >
                        View Document 📄
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </template>

                    <span v-else class="text-gray-400 text-sm">No document uploaded</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT - Approve Button -->
            <div class="lg:min-w-[140px]">
              <button
                v-if="candidate.reference_checked !== '1'"
                @click="$emit('mark-verified', 'reference_checked')"
                :disabled="verifying.reference_checked"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="verifying.reference_checked" class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve
              </button>

              <div v-else class="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2.5 text-sm font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Verified
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ✅ Dynamic Verification Sections (Education, Experience, Professional) -->
      <div
        v-for="section in verificationSections"
        :key="section.key"
        class="mb-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div class="border-l-4" :class="section.borderColor || 'border-indigo-500'">
          <div class="px-5 py-4 bg-white">
            <h4 class="font-semibold text-gray-800 flex items-center gap-2">
              <svg v-html="section.icon" class="w-5 h-5" :class="section.iconColor || 'text-indigo-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"></svg>
              {{ section.label }}
            </h4>
          </div>
        </div>

        <div class="p-5">
          <div class="flex flex-col lg:flex-row items-start justify-between gap-6">

            <!-- LEFT - Content -->
            <div class="flex-1">
              <div class="bg-gray-50 rounded-xl p-4 space-y-2">
                <!-- Education Type -->
                <template v-if="section.type === 'education'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Education -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Education:</strong>
                        {{ candidate.highest_education || '—' }}
                      </span>
                    </div>

                    <!-- University -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">University:</strong>
                        {{ candidate.university || '—' }}
                      </span>
                    </div>

                    <!-- Education Document -->
                    <div class="flex items-center gap-2 sm:col-span-2">
                      <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 7V3h10v4M7 7h10M7 7v14h10V7M9 11h6M9 15h4" />
                      </svg>

                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Education Document:</strong>

                        <template v-if="candidate.educational_background_check_document">
                          <a
                            :href="`${baseurl}/${candidate.educational_background_check_document}`"
                            target="_blank"
                            class="text-indigo-600 hover:underline ml-1"
                          >
                            View Document 📄
                          </a>
                        </template>

                        <span v-else class="text-gray-400 ml-1">—</span>
                      </span>
                    </div>
                  </div>
                </template>

                <!-- Experience Type -->
                <template v-else-if="section.type === 'experience'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Experience Years -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Experience:</strong> {{ candidate.experience_years || '0' }} years
                      </span>
                    </div>

                    <!-- Company -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Company:</strong> {{ candidate.company_name || '—' }}
                      </span>
                    </div>

                    <!-- Email -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Email:</strong> {{ candidate.company_email || '—' }}
                      </span>
                    </div>

                    <!-- Phone -->
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28"></path>
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Phone:</strong> {{ candidate.company_phone || '—' }}
                      </span>
                    </div>

                    <!-- Experience Document -->
                    <div class="flex items-center gap-2 sm:col-span-2">
                      <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 11h10M7 15h6"></path>
                      </svg>

                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Experience Document:</strong>

                        <a
                          v-if="candidate.experience_background_check_document"
                          :href="`${baseurl}/${candidate.experience_background_check_document}`"
                          target="_blank"
                          class="ml-2 text-indigo-600 hover:underline font-medium"
                        >
                          View Document
                        </a>

                        <span v-else class="ml-2 text-gray-400">—</span>
                      </span>
                    </div>
                  </div>
                </template>

                <!-- Professional Info Type -->
                <template v-else-if="section.type === 'professional_info'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Designation:</strong>
                        {{ candidate.reference_two_designation || '—' }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Company:</strong>
                        {{ candidate.company_name || '—' }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Email:</strong>
                        {{ candidate.company_email || '—' }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28" />
                      </svg>
                      <span class="text-sm text-gray-600">
                        <strong class="text-gray-800">Phone:</strong>
                        {{ candidate.company_phone || '—' }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- RIGHT - Action Button -->
            <div class="lg:min-w-[140px]">
              <button
                v-if="candidate[section.statusKey] !== '1'"
                @click="$emit('mark-verified', section.statusKey)"
                :disabled="verifying[section.statusKey]"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="verifying[section.statusKey]" class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve
              </button>
              <div v-else class="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2.5 text-sm font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Reference Information Section -->
      <div class="mb-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="border-l-4 border-indigo-500 px-5 py-4 bg-white">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Reference Information
          </h4>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Reference 1 -->
            <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h5 class="font-medium text-gray-800">Primary Reference</h5>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Name:</span> <span class="font-medium text-gray-800">{{ candidate.reference_one_name || '—' }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Contact:</span> <span class="font-medium text-gray-800">{{ candidate.reference_one_number || '—' }}</span></div>
              </div>
            </div>
            <!-- Reference 2 -->
            <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h5 class="font-medium text-gray-800">Professional Reference</h5>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Name:</span> <span class="font-medium text-gray-800">{{ candidate.reference_two_name || '—' }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Contact:</span> <span class="font-medium text-gray-800">{{ candidate.reference_two_number || '—' }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseurl = import.meta.env.VITE_BASE_URL

const props = defineProps({
  candidate: Object,
  isEditing: Boolean,
  verificationForm: Object,
  verifying: Object,
  referenceChecked: String,
  verificationProgress: Number
})

defineEmits(['edit-started', 'edit-cancelled', 'save-requested', 'mark-verified'])

const personalFields = [
  { key: 'address', label: 'Address' },
  { key: 'marital_status', label: 'Marital Status' },
  { key: 'spouse_name', label: 'Spouse Name' },
  { key: 'spouse_number', label: 'Spouse Number' },
  { key: 'mother_name', label: "Mother's Name" },
  { key: 'father_name', label: "Father's Name" }
]

const verificationSections = [
  {
    key: 'education',
    label: '4c. Educational Background Check',
    statusKey: 'educational_background_check',
    type: 'education',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500'
  },
  {
    key: 'experience',
    label: '4d. Experience Background Check',
    statusKey: 'experience_background_check',
    type: 'experience',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500'
  },
  {
    key: 'professional',
    label: '4e. Professional Background Check',
    statusKey: 'professional_background_check',
    type: 'professional_info',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500'
  }
]
</script>
