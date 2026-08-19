<!-- MonthlyActivityReport.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div class="">
      <!-- Card -->
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-10 text-white relative">
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <!-- You can put the notebook texture here as background -->
            <!-- <img src="notebook-texture.jpg" class="w-full h-full object-cover mix-blend-soft-light" alt="" /> -->
          </div>
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
            Monthly Activity Report
          </h1>
          <p class="mt-3 text-indigo-100 text-lg font-medium">
            December 2025 • Bell Textron
          </p>
        </div>

        <!-- Content -->
        <div class="p-8 md:p-12 space-y-12">
          <!-- Summary of Activities -->
          <section>
            <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-200 pb-3">
              Summary of Activities
            </h2>

            <div class="space-y-8">
              <!-- A. Customer Success Manager -->
              <div class="bg-indigo-50/40 rounded-xl p-6 border border-indigo-100">
                <h3 class="text-xl font-semibold text-indigo-800 mb-4">
                  A. As a Customer Success Manager (CSM)
                </h3>
                <ul class="space-y-3 text-gray-700 leading-relaxed">
                  <li class="flex gap-3">
                    <span class="text-indigo-600 font-bold mt-1">→</span>
                    HTSS has discovered Patran is facing challenges from HyperMesh
                  </li>
                  <li class="flex gap-3">
                    <span class="text-indigo-600 font-bold mt-1">→</span>
                    HTSS has talked to 5 different managers and leads in Bell
                  </li>
                  <li class="flex gap-3">
                    <span class="text-indigo-600 font-bold mt-1">→</span>
                    HTSS proposed a detailed plan to Fred & Hexagon – how to win over HyperMesh
                  </li>
                </ul>
              </div>

              <!-- B. Internal Champion -->
              <div class="bg-blue-50/40 rounded-xl p-6 border border-blue-100">
                <h3 class="text-xl font-semibold text-blue-800 mb-4">
                  B. As an Internal Champion
                </h3>
                <div class="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Explored with Bell Textron how to use all MSC solutions more effectively.
                  </p>
                  <p>
                    Collected <strong>94 top technical leadership MSC One contacts</strong> across 6 different solutions.
                  </p>
                  <p class="font-medium">
                    Leadership contacts per solution:
                  </p>
                  <ul class="grid md:grid-cols-2 gap-3 pl-6 list-disc marker:text-blue-600">
                    <li>Structure Analysis: <strong>24</strong></li>
                    <li>System Dynamics Analysis: <strong>15</strong></li>
                    <li>Acoustics Analysis Service: <strong>13</strong></li>
                    <li>Fluids Analysis Service: <strong>12</strong></li>
                    <li>VM&amp;C (Verification, Modeling & Certification): <strong>12</strong></li>
                    <li>ICME: <strong>8</strong></li>
                  </ul>
                  <p>
                    Fred and HTSS team planned quarterly meetings with these leadership contacts.
                  </p>
                </div>
              </div>

              <!-- C. Single Pool -->
              <div class="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
                <h3 class="text-xl font-semibold text-amber-800 mb-4">
                  C. “Single Pool” of MSC One – Regional License Visibility
                </h3>
                <p class="text-gray-700 leading-relaxed">
                  Current license token pool for US and Canada users is scattered. No clear visibility which locations are using which tools.
                  HTSS is proactively working with Bell Textron to map MSC One users by location — to establish visibility into actual usage patterns, distinguish location-based licensing demand, and enable better future expansion discussions.
                </p>
              </div>

              <!-- D. FLRAA Program -->
              <div class="bg-red-50/40 rounded-xl p-6 border border-red-100">
                <h3 class="text-xl font-semibold text-red-800 mb-4">
                  D. FLRAA Program Completion Impact
                </h3>
                <p class="text-gray-700 leading-relaxed">
                  FLRAA program reaching completion stage → number of licenses expected to reduce by <strong>~40%</strong> in 2026.<br>
                  With several programs being shut down, Bell’s quotation is projected to decrease from <strong>$1.6M</strong> to approximately <strong>lower value</strong>.
                </p>
              </div>
            </div>
          </section>

          <!-- Key Outputs / Achievements -->
          <section>
            <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-200 pb-3">
              Key Outputs
            </h2>
            <ol class="space-y-4 text-gray-700 list-decimal pl-6 marker:font-bold marker:text-indigo-700">
              <li>Detailed competitive win plan delivered to Bell Textron leadership (vs HyperMesh)</li>
              <li>94 high-value MSC One leadership contacts collected and segmented by solution</li>
              <li>Quarterly leadership engagement cadence established with Fred</li>
              <li>Proactive location-mapping initiative launched to improve license visibility</li>
              <li>Clear forecast shared regarding upcoming 40% license reduction impact in 2026</li>
            </ol>
          </section>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-6 text-center text-gray-500 text-sm border-t">
          Prepared by HTSS • Customer Success & Strategic Initiatives • December 2025
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed for now — static report
</script>
