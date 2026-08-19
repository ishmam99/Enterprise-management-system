<!-- src/components/hiring/SelectionOffer.vue -->
<template>
  <div class="bg-gradient-to-br from-slate-50 to-yellow-50 rounded-2xl shadow-lg p-8 mb-6 border border-yellow-100">
    <!-- Header with Gradient -->
    <div class="bg-gradient-to-r from-yellow-800 to-amber-400 rounded-xl p-6 mb-8 text-white shadow-md">
      <h2 class="text-3xl font-bold">3. Selection & Initial Offer</h2>
      <p class="text-amber-100 mt-2">Offer Creation & Candidate Portal Access</p>
    </div>

    <!-- 3(a) Selection & Offer Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span class="inline-block w-2 h-8 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full mr-3"></span>
        3(a). Selection & Offer
      </h3>
      <div class="ml-2">
        <div class="flex gap-3 flex-wrap mb-6">
          <button @click="$emit('open-offer-modal')" class="px-6 py-3 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2 font-semibold transition-all hover:shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            📝 Create & Customize Offer Letter
          </button>
          <button v-if="candidate?.offering_date" @click="$emit('download-offer')" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold transition-all hover:shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            📄 Download Offer Letter
          </button>
        </div>

        <div v-if="candidate?.offering_date" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
            <span class="text-yellow-600 text-xs font-bold uppercase tracking-wider">Offering Date</span>
            <span class="text-gray-900 font-semibold block mt-1">{{ formatDate(candidate.offering_date) }}</span>
          </div>
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-500 hover:shadow-md transition-shadow">
            <span class="text-amber-600 text-xs font-bold uppercase tracking-wider">Joining Date</span>
            <span class="text-gray-900 font-semibold block mt-1">{{ formatDate(candidate.joining_date) }}</span>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-shadow">
            <span class="text-orange-600 text-xs font-bold uppercase tracking-wider">Negotiated Salary</span>
            <span class="text-gray-900 font-semibold block mt-1">BDT {{ formatNumber(candidate.negotiated_salary) }}</span>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <span class="text-red-600 text-xs font-bold uppercase tracking-wider">Status</span>
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold inline-block mt-1">Ready to download</span>
          </div>
        </div>
        <div v-else class="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 italic text-center">
          📋 No offer letter created yet
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 h-1 rounded"></div>

    <!-- 3(b) Candidate Access Link Section -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span class="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
        3(b). Candidate Access Link
      </h3>
      <div class="ml-2">
        <!-- No Access Token State -->
        <div v-if="!hasAccessToken" class="bg-gradient-to-r from-gray-100 to-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
          <p class="text-gray-600 mb-4">No access link generated yet. Generate a temporary link for the candidate to track their application status.</p>
          <button @click="$emit('generate-link')" :disabled="generating" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            <span v-if="generating" class="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            <span v-if="generating">Generating...</span>
            <span v-else>🔗 Generate Access Link</span>
          </button>
        </div>

        <!-- Access Token Active State -->
        <div v-else class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
              <span class="text-blue-600 text-xs font-bold uppercase tracking-wider">Access Link</span>
              <div class="mt-2 bg-white rounded-lg p-3 border border-blue-100">
                <p class="text-sm font-mono text-gray-700 break-all select-all cursor-pointer hover:bg-blue-50 transition">{{ fullAccessLink }}</p>
              </div>
            </div>
            <div class="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
              <span class="text-cyan-600 text-xs font-bold uppercase tracking-wider">Valid Until</span>
              <p class="text-lg font-bold text-gray-900 mt-1">{{ formatExpiryDate(accessTokenExpiry) }}</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button @click="$emit('copy-link')" class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              📋 Copy Access Link
            </button>
            <button @click="$emit('generate-link')" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              🔄 Regenerate
            </button>
          </div>

          <div v-if="linkCopied" class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3">
            <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-green-700 font-semibold">Link copied to clipboard!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  candidate: { type: Object, required: true },
  hasAccessToken: { type: Boolean, required: true },
  accessTokenExpiry: { type: [String, null], required: true },
  fullAccessLink: { type: String, required: true },
  generating: { type: Boolean, required: true },
  linkCopied: { type: Boolean, required: true }
})
defineEmits(['open-offer-modal', 'download-offer', 'generate-link', 'copy-link'])

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
const formatNumber = (n) => n ? Number(n).toLocaleString() : '0'
const formatExpiryDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'
</script>
