<template>
    <div v-if="isInvalidToken" class="min-h-screen flex items-center justify-center bg-slate-100">
        <div class="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
            
            <div class="mb-4">
            ❌
            </div>

            <h2 class="text-xl font-bold text-slate-800 mb-2">
            Invalid or Expired Link
            </h2>

            <p class="text-slate-500 text-sm">
            This application link is no longer valid or has expired. Please contact support or request a new link.
            </p>

        </div>
</div>

<div v-else>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Card with Animation -->
      <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-8 border border-slate-100 transition-all duration-300 hover:shadow-slate-300/50">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-slate-800">
                Welcome <span class="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">{{ userName }}</span>
              </h1>
            </div>
            <p class="text-emerald-600 mt-2 font-medium flex items-center gap-2">
              Congratulations! You are selected for the next step.
            </p>
          </div>
          <div class="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <div 
                class="h-2 w-2 rounded-full animate-pulse"
                :class="{
                'bg-yellow-500': status === 0,
                'bg-blue-500': status === 1,
                'bg-indigo-500': status === 2,
                'bg-purple-500': status === 3,
                'bg-emerald-500': status === 4,
                'bg-teal-500': status === 5,
                'bg-cyan-500': status === 6,
                'bg-green-600': status === 7,
                'bg-red-500': status === 10
                }"
            ></div>

            <span class="text-sm font-semibold text-slate-700">
                Current Status: {{ statusLabel }}
            </span>
            </div>
            <!-- {{application.status}} -->
        </div>
      </div>

      <!-- Step Progress Bar -->
        <div class="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">
        <div class="flex items-center justify-between relative">

            <!-- Progress Line -->
                <div class="absolute top-5 left-[20px] right-[20px] h-1 bg-slate-200 "></div>

                <div 
                class="absolute top-5 left-[20px] h-1 bg-green-500 transition-all duration-500"
                :style="{ width: progressWidth }"
                ></div>

            <!-- Steps -->
            <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            class="relative z-10 flex flex-col items-center w-full"
            >
            <!-- Circle -->
            <div
                class="h-10 w-10 flex items-center justify-center rounded-full text-sm font-bold border-2 transition-all duration-300"
                :class="{
                'bg-green-600 text-white border-green-600': status >= step.id,
                'bg-white text-slate-400 border-slate-300': status < step.id
                }"
            >
                {{ index + 1 }}
            </div>

            <!-- Label -->
            <span 
                class="mt-2 text-xs text-center font-medium"
                :class="{
                'text-green-600': status >= step.id,
                'text-slate-400': status < step.id
                }"
            >
                {{ step.label }}
            </span>
            </div>

        </div>
        </div>

      <!-- Warning Message for One-time Submission -->
      <div v-if="showForm && !hasSubmittedBefore" class="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 mb-6 shadow-sm">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-amber-800">⚠️ Important Notice</p>
            <p class="text-sm text-amber-700 mt-1">
              This verification form can only be submitted <strong class="font-bold">ONCE</strong>. Please ensure all information is accurate before submitting. You will not be able to edit or resubmit after submission.
            </p>
          </div>
        </div>
      </div>

      <!-- FORM Section - Only show if not submitted before -->
      <div v-if="showForm && !hasSubmittedBefore" class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-300 mb-8">
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Application Status: Verification Required
          </h2>
          <p class="text-indigo-100 text-sm mt-1">Please complete the following information to proceed (One-time submission)</p>
        </div>

        <form @submit.prevent="submitForm" class="p-6">
          <!-- References Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-700">Professional References</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Reference 1 Card -->
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div class="text-sm font-medium text-indigo-600 mb-3 flex items-center gap-1">
                  <span class="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">1</span>
                  Primary Reference
                </div>
                <div class="space-y-3">
                  <input v-model="form.reference_one_name" placeholder="Full Name" class="input" />
                  <input v-model="form.reference_one_number" placeholder="Phone Number" class="input" />
                  <input v-model="form.reference_one_designation" placeholder="Designation / Title" class="input" />
                  <input v-model="form.reference_one_email" placeholder="Email Address" type="email" class="input" />
                </div>
              </div>
              <!-- Reference 2 Card -->
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div class="text-sm font-medium text-indigo-600 mb-3 flex items-center gap-1">
                  <span class="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">2</span>
                  Secondary Reference
                </div>
                <div class="space-y-3">
                  <input v-model="form.reference_two_name" placeholder="Full Name" class="input" />
                  <input v-model="form.reference_two_number" placeholder="Phone Number" class="input" />
                  <input v-model="form.reference_two_designation" placeholder="Designation / Title" class="input" />
                  <input v-model="form.reference_two_email" placeholder="Email Address" type="email" class="input" />
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Information Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-700">Personal Information</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.address" placeholder="Complete Address" class="input md:col-span-2" />
              <input v-model="form.marital_status" placeholder="Marital Status" class="input" />
              <input v-model="form.spouse_name" placeholder="Spouse Name (if applicable)" class="input" />
              <input v-model="form.spouse_number" placeholder="Spouse Phone Number" class="input" />
            </div>
          </div>

          <!-- Family Information Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-700">Family Details</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Parents / Guardians</p>
                <div class="space-y-3">
                  <input v-model="form.parent_name" placeholder="Parent/Guardian Name" class="input" />
                  <input v-model="form.parent_relation" placeholder="Relationship" class="input" />
                  <input v-model="form.parent_phone_number" placeholder="Phone Number" class="input" />
                </div>
              </div>
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Siblings</p>
                <div class="space-y-3">
                  <input v-model="form.siblings_name" placeholder="Sibling Name" class="input" />
                  <input v-model="form.siblings_relation" placeholder="Relationship" class="input" />
                  <input v-model="form.siblings_phone_number" placeholder="Phone Number" class="input" />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.mother_name" placeholder="Mother's Full Name" class="input" />
              <input v-model="form.father_name" placeholder="Father's Full Name" class="input" />
            </div>
          </div>

          <!-- Employment Information Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-700">Current Employment</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.company_name" placeholder="Company / Organization Name" class="input" />
              <input v-model="form.company_phone" placeholder="Company Phone Number" class="input" />
              <input v-model="form.company_email" placeholder="Company Email Address" type="email" class="input" />
              <input v-model="form.experience_years" placeholder="Years of Experience" type="number" class="input" />
            </div>
          </div>
           <!-- Document Upload Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                📄
              </div>
              <h3 class="text-lg font-semibold text-slate-700">Verification Documents</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

              <!-- Police -->
              <div>
                <label class="text-sm text-slate-600">Police Clearance</label>
                <input type="file" @change="e => handleFileUpload(e, 'police')" class="input" />
              </div>

              <!-- Education -->
              <div>
                <label class="text-sm text-slate-600">Educational Document</label>
                <input type="file" @change="e => handleFileUpload(e, 'education')" class="input" />
              </div>

              <!-- Experience -->
              <div>
                <label class="text-sm text-slate-600">Experience Document</label>
                <input type="file" @change="e => handleFileUpload(e, 'experience')" class="input" />
              </div>

            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4 border-t border-slate-200 flex justify-between items-center">
            <p class="text-xs text-amber-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              This action cannot be undone
            </p>
            <button type="submit" class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Submit Application (One-time)
            </button>
          </div>
        </form>
      </div>

      
<!-- Signature Upload -->
<div v-if="showSignature && !hasSignature" class="bg-white rounded-2xl shadow-xl p-6 mb-8">
  <h3 class="text-lg font-semibold mb-4">Upload Signature</h3>

  <input 
    type="file" 
    accept="image/*"
    @change="handleSignatureUpload"
    class="mb-4"
  />

  <button 
    @click="submitSignature"
    class="bg-indigo-600 text-white px-6 py-2 rounded-xl"
  >
    Submit Signature
  </button>
</div>
<div v-if="showSignature && hasSignature" class="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center">
  <div class="flex flex-col items-center">
    
    <div class="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full mb-3">
      ✅
    </div>

    <h3 class="text-lg font-semibold text-green-700">
      Signature Already Uploaded
    </h3>

    <p class="text-sm text-green-600 mt-1">
      You have already submitted your signature. No further action is required.
    </p>

  </div>
</div>

      <!-- Show Already Submitted Message -->
      <div v-if="showForm && hasSubmittedBefore" class="bg-blue-50 rounded-2xl shadow-xl shadow-slate-200/50 border border-blue-100 overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verification Already Submitted
          </h2>
          <p class="text-blue-100 text-sm mt-1">Your verification information has been successfully submitted</p>
        </div>
        <div class="p-6 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">Thank You!</h3>
          <p class="text-slate-600">Your verification information has been successfully submitted.</p>
          <p class="text-slate-500 text-sm mt-2">You have already completed this form. Multiple submissions are not allowed.</p>
        </div>
      </div>

      <!-- Display Submitted Form Data (Already Filled) -->
      <div v-if="hasSubmittedBefore && submittedFormData" class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Your Submitted Information
          </h2>
          <p class="text-emerald-100 text-sm mt-1">Here's the information you previously submitted</p>
        </div>

        <div class="p-6">
          <!-- References Section Display -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              Professional References
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-sm font-medium text-indigo-600 mb-3">Primary Reference</p>
                <div class="space-y-2 text-sm">
                  <p><span class="text-slate-500">Name:</span> <span class="font-medium">{{ submittedFormData.reference_one_name || '—' }}</span></p>
                  <p><span class="text-slate-500">Phone:</span> <span class="font-medium">{{ submittedFormData.reference_one_number || '—' }}</span></p>
                  <p><span class="text-slate-500">Designation:</span> <span class="font-medium">{{ submittedFormData.reference_one_designation || '—' }}</span></p>
                  <p><span class="text-slate-500">Email:</span> <span class="font-medium">{{ submittedFormData.reference_one_email || '—' }}</span></p>
                </div>
              </div>
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-sm font-medium text-indigo-600 mb-3">Secondary Reference</p>
                <div class="space-y-2 text-sm">
                  <p><span class="text-slate-500">Name:</span> <span class="font-medium">{{ submittedFormData.reference_two_name || '—' }}</span></p>
                  <p><span class="text-slate-500">Phone:</span> <span class="font-medium">{{ submittedFormData.reference_two_number || '—' }}</span></p>
                  <p><span class="text-slate-500">Designation:</span> <span class="font-medium">{{ submittedFormData.reference_two_designation || '—' }}</span></p>
                  <p><span class="text-slate-500">Email:</span> <span class="font-medium">{{ submittedFormData.reference_two_email || '—' }}</span></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Information Display -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Personal Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p class="text-sm"><span class="text-slate-500">Address:</span> <span class="font-medium">{{ submittedFormData.address || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Marital Status:</span> <span class="font-medium">{{ submittedFormData.marital_status || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Spouse Name:</span> <span class="font-medium">{{ submittedFormData.spouse_name || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Spouse Number:</span> <span class="font-medium">{{ submittedFormData.spouse_number || '—' }}</span></p>
            </div>
          </div>

          <!-- Family Information Display -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              Family Details
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-sm font-medium text-slate-600 mb-2">Parents / Guardians</p>
                <div class="space-y-2 text-sm">
                  <p><span class="text-slate-500">Name:</span> <span class="font-medium">{{ submittedFormData.parent_name || '—' }}</span></p>
                  <p><span class="text-slate-500">Relation:</span> <span class="font-medium">{{ submittedFormData.parent_relation || '—' }}</span></p>
                  <p><span class="text-slate-500">Phone:</span> <span class="font-medium">{{ submittedFormData.parent_phone_number || '—' }}</span></p>
                </div>
              </div>
              <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p class="text-sm font-medium text-slate-600 mb-2">Siblings</p>
                <div class="space-y-2 text-sm">
                  <p><span class="text-slate-500">Name:</span> <span class="font-medium">{{ submittedFormData.siblings_name || '—' }}</span></p>
                  <p><span class="text-slate-500">Relation:</span> <span class="font-medium">{{ submittedFormData.siblings_relation || '—' }}</span></p>
                  <p><span class="text-slate-500">Phone:</span> <span class="font-medium">{{ submittedFormData.siblings_phone_number || '—' }}</span></p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p class="text-sm"><span class="text-slate-500">Mother's Name:</span> <span class="font-medium">{{ submittedFormData.mother_name || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Father's Name:</span> <span class="font-medium">{{ submittedFormData.father_name || '—' }}</span></p>
            </div>
          </div>

          <!-- Employment Information Display -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Employment Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p class="text-sm"><span class="text-slate-500">Company Name:</span> <span class="font-medium">{{ submittedFormData.company_name || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Company Phone:</span> <span class="font-medium">{{ submittedFormData.company_phone || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Company Email:</span> <span class="font-medium">{{ submittedFormData.company_email || '—' }}</span></p>
              <p class="text-sm"><span class="text-slate-500">Experience Years:</span> <span class="font-medium">{{ submittedFormData.experience_years || '—' }}</span></p>
            </div>
          </div>

         

          <div class="mt-6 pt-4 border-t border-slate-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span class="text-sm text-slate-500">Submission Status:</span>
                <span class="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Completed ✓</span>
              </div>
              <div class="text-xs text-slate-400">
                Submitted on: {{ submissionDate }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Previous Application Details Section (Job Details) -->
      <div v-if="application" class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job Application Details
          </h2>
          <p class="text-emerald-100 text-sm mt-1">Review your job application information</p>
        </div>

        <div class="p-6">
          <!-- Personal Info Card -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div class="flex items-center gap-2 mb-4">
                <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-700">Personal Information</h3>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Full Name</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.full_name || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Email Address</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.email || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Contact Number</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.contact || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Emergency Contact</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.emergency_contact || '—' }}</span>
                </div>
              </div>
            </div>

            <!-- Education & Job Info -->
            <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div class="flex items-center gap-2 mb-4">
                <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-700">Education & Job Details</h3>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Highest Education</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.highest_education || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">University</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.university || '—' }}</span>
                </div>
                <!-- <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Applied Position</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.job?.title || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-200">
                  <span class="text-sm text-slate-500">Department</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.job?.department || '—' }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-sm text-slate-500">Required Experience</span>
                  <span class="text-sm font-medium text-slate-700">{{ application?.job?.required_experience || '—' }}</span>
                </div> -->
              </div>
            </div>
          </div>

          <!-- Job Requirements Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div class="flex items-center gap-2 mb-4">
                <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-700">Key Skills</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in application?.job?.key_skills" :key="skill" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div class="flex items-center gap-2 mb-4">
                <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 class="font-semibold text-slate-700">Required Qualifications</h3>
              </div>
              <ul class="space-y-2">
                <li v-for="(qual, index) in application?.job?.required_qualifications" :key="index" class="text-sm text-slate-600 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ qual }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Software Tools Section -->
          <div v-if="application?.job?.primary_software?.length" class="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div class="flex items-center gap-2 mb-4">
              <div class="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="font-semibold text-slate-700">Primary Software Tools</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="software in application?.job?.primary_software" :key="software" class="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                {{ software }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE Section (Alternative view if no data) -->
      <div v-if="!application" class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            No Applications Found
          </h2>
          <p class="text-indigo-100 text-sm mt-1">Start by submitting your application above</p>
        </div>
        <div class="p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-slate-500">No application data available. Please submit the verification form above.</p>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'

const isInvalidToken = ref(false)
const route = useRoute()
const token = route.params.token
const userName = ref('')
const application = ref()
const status = ref(0) // assume coming from API
const submittedFormData = ref(null)
const submissionDate = ref('')
const policeFile = ref(null)
const educationFile = ref(null)
const experienceFile = ref(null)
const handleFileUpload = (e, type) => {
  const file = e.target.files[0]
  if (!file) return

  if (type === 'police') policeFile.value = file
  if (type === 'education') educationFile.value = file
  if (type === 'experience') experienceFile.value = file
}

const signaturePath = ref(null)
const hasSignature = computed(() => !!signaturePath.value)

const signatureFile = ref(null)
const handleSignatureUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  // Optional validation
  if (!file.type.startsWith('image/')) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid File',
      text: 'Please upload an image file for signature.'
    })
    return
  }

  signatureFile.value = file
}
const submitSignature = async () => {
  if (!signatureFile.value) {
    return Swal.fire({
      icon: 'warning',
      title: 'No File',
      text: 'Please select a signature file first.'
    })
  }

  const formData = new FormData()
  formData.append('signature', signatureFile.value) 

  try {
    Swal.fire({
      title: 'Uploading...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    await api().post(`/applicant-access/${token}`, formData)

    await Swal.fire({
      icon: 'success',
      title: 'Signature Uploaded!',
      text: 'Your signature has been submitted successfully.'
    })

    fetchApplications()

  } catch (e) {
    console.error(e.response || e)

    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: e.response?.data?.message || 'Something went wrong.'
    })
  }
}

const statusLabel = computed(() => {

  
  const map = {
    0: 'Pending',
    1: 'Shortlisted',
    2: 'Interview Stage',
    3: 'Selection & Offer',
    4: 'Verification',
    5: 'Documentation',
    6: 'Joining & Setup',
    7: 'Probation & Confirmation',
    10: 'Rejected'
  }
  return map[status.value] || 'Unknown'
})

const steps = [
  { id: 0, label: 'Pending' },
  { id: 1, label: 'Shortlisted' },
  { id: 2, label: 'Interview' },
  { id: 3, label: 'Offer' },
  { id: 4, label: 'Verification' },
  { id: 5, label: 'Documentation' },
  { id: 6, label: 'Joining' },
  { id: 7, label: 'Confirmed' }
]

const progressWidth = computed(() => {
  const totalSteps = steps.length - 1
  const currentStep = steps.findIndex(s => s.id == status.value)

  if (currentStep <= 0) return '0%'

  return `${(currentStep / totalSteps) * 100}%`
})

const form = ref({
  reference_one_name: '',
  reference_one_number: '',
  reference_one_designation: '',
  reference_one_email: '',
  reference_two_name: '',
  reference_two_number: '',
  reference_two_designation: '',
  reference_two_email: '',
  address: '',
  marital_status: '',
  spouse_name: '',
  spouse_number: '',
  parent_name: '',
  parent_relation: '',
  parent_phone_number: '',
  siblings_name: '',
  siblings_relation: '',
  siblings_phone_number: '',
  company_name: '',
  company_phone: '',
  company_email: '',
  experience_years: '',
  mother_name: '',
  father_name: ''
})

// Check if user has already submitted the verification form
const hasSubmittedBefore = computed(() => {
  return submittedFormData.value !== null && Object.keys(submittedFormData.value).length > 0
})

const showForm = computed(() => {
  return status.value == 4
})
const showSignature = computed(() => status.value == 5)

const fetchApplications = async () => {
  try {
    const { data } = await api().get(`/applicant-access/${token}`)
    signaturePath.value = data.data.signature_path || null
    console.log(data)
    status.value = data.data.status || 0
    // Set user name from API
    userName.value = data.data.full_name || 'Candidate'
     application.value = data.data
    // // Handle object vs array
    // if (Array.isArray(data.data)) {
    //   application.value = data.data
    // } else if (data.data) {
    //   application.value = [data.data]
    // } else {
    //   application.value = []
    // }

    // Check if verification form data exists (look for reference_one_name or other fields)
    const applicationData = Array.isArray(data.data) ? data.data[0] : data.data
    
    if (applicationData) {
      // Check if any verification field is filled
      const hasVerificationData = applicationData.reference_one_name || 
                                   applicationData.reference_two_name ||
                                   applicationData.address ||
                                   applicationData.company_name
      
      if (hasVerificationData) {
        submittedFormData.value = {
          reference_one_name: applicationData.reference_one_name,
          reference_one_number: applicationData.reference_one_number,
          reference_one_designation: applicationData.reference_one_designation,
          reference_one_email: applicationData.reference_one_email,
          reference_two_name: applicationData.reference_two_name,
          reference_two_number: applicationData.reference_two_number,
          reference_two_designation: applicationData.reference_two_designation,
          reference_two_email: applicationData.reference_two_email,
          address: applicationData.address,
          marital_status: applicationData.marital_status,
          spouse_name: applicationData.spouse_name,
          spouse_number: applicationData.spouse_number,
          parent_name: applicationData.parent_name,
          parent_relation: applicationData.parent_relation,
          parent_phone_number: applicationData.parent_phone_number,
          siblings_name: applicationData.siblings_name,
          siblings_relation: applicationData.siblings_relation,
          siblings_phone_number: applicationData.siblings_phone_number,
          company_name: applicationData.company_name,
          company_phone: applicationData.company_phone,
          company_email: applicationData.company_email,
          experience_years: applicationData.experience_years,
          mother_name: applicationData.mother_name,
          father_name: applicationData.father_name
        }
        
        // Set submission date (use updated_at or created_at)
        submissionDate.value = applicationData.updated_at 
          ? new Date(applicationData.updated_at).toLocaleDateString() 
          : new Date().toLocaleDateString()
      }
    }

  } catch (e) {
  console.error(e)

  // mark token invalid
  isInvalidToken.value = true

  await Swal.fire({
    icon: 'error',
    title: 'Invalid or Expired Link',
    text: 'This application link is no longer valid or has expired.',
    confirmButtonColor: '#6366f1'
  })
}
}

const validateForm = () => {
  // Check required fields
  const requiredFields = [
    'reference_one_name', 'reference_one_number', 'reference_one_designation', 'reference_one_email',
    'reference_two_name', 'reference_two_number', 'reference_two_designation', 'reference_two_email',
    'address', 'marital_status', 'company_name', 'company_phone', 'company_email', 'experience_years',
    'mother_name', 'father_name'
  ]
  
  for (const field of requiredFields) {
    const value = form.value[field]
    // Check if field is empty or undefined
    if (value === undefined || value === null || value === '') {
      const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: `Please fill in the ${fieldName} field.`,
        confirmButtonColor: '#6366f1'
      })
      return false
    }
    
    // For string fields, check if they're just whitespace
    if (typeof value === 'string' && value.trim() === '') {
      const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: `Please fill in the ${fieldName} field.`,
        confirmButtonColor: '#6366f1'
      })
      return false
    }
  }
  
  // Validate email format (only for string fields)
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
  if (form.value.reference_one_email && typeof form.value.reference_one_email === 'string' && !emailRegex.test(form.value.reference_one_email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid email address for Primary Reference.',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  if (form.value.reference_two_email && typeof form.value.reference_two_email === 'string' && !emailRegex.test(form.value.reference_two_email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid email address for Secondary Reference.',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  if (form.value.company_email && typeof form.value.company_email === 'string' && !emailRegex.test(form.value.company_email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid company email address.',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  // Validate phone numbers (basic validation)
  const phoneRegex = /^[\d\s+-]{10,}$/
  if (form.value.reference_one_number && typeof form.value.reference_one_number === 'string' && !phoneRegex.test(form.value.reference_one_number)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Phone Number',
      text: 'Please enter a valid phone number for Primary Reference (minimum 10 digits).',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  if (form.value.reference_two_number && typeof form.value.reference_two_number === 'string' && !phoneRegex.test(form.value.reference_two_number)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Phone Number',
      text: 'Please enter a valid phone number for Secondary Reference (minimum 10 digits).',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  if (form.value.spouse_number && form.value.spouse_name && typeof form.value.spouse_number === 'string' && !phoneRegex.test(form.value.spouse_number)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Phone Number',
      text: 'Please enter a valid phone number for spouse.',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  // Validate experience_years is a positive number
  if (form.value.experience_years && (isNaN(form.value.experience_years) || form.value.experience_years < 0)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Experience',
      text: 'Please enter a valid number for years of experience.',
      confirmButtonColor: '#6366f1'
    })
    return false
  }
  
  return true
}

const submitForm = async () => {
  // Double-check if already submitted
  if (hasSubmittedBefore.value) {
    await Swal.fire({
      icon: 'error',
      title: 'Already Submitted',
      text: 'You have already submitted this form. Multiple submissions are not allowed.',
      confirmButtonColor: '#6366f1'
    })
    return
  }

  // Validate form
  if (!validateForm()) {
    return
  }

  // Confirm submission with warning
  const result = await Swal.fire({
    title: '⚠️ One-time Submission Warning',
    text: 'This is a ONE-TIME submission. You will NOT be able to edit or resubmit after this. Are you absolutely sure you want to proceed?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6366f1',
    confirmButtonText: 'Yes, Submit',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  })

  if (!result.isConfirmed) {
    return
  }

  // Show loading state
  Swal.fire({
    title: 'Submitting...',
    text: 'Please wait while we submit your application.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
const formData = new FormData()

// Append normal fields
Object.keys(form.value).forEach(key => {
  formData.append(key, form.value[key] || '')
})

// Append files
if (policeFile.value) {
  formData.append('police_background_check_document', policeFile.value)
}

if (educationFile.value) {
  formData.append('educational_background_check_document', educationFile.value)
}

if (experienceFile.value) {
  formData.append('experience_background_check_document', experienceFile.value)
}

// Send request
await api().post(`/applicant-access/${token}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

    // Success message
    await Swal.fire({
      icon: 'success',
      title: '✅ Submitted Successfully!',
      text: 'Your verification information has been submitted. You can view your submitted data below.',
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Great!'
    })
    
    await fetchApplications()
    
    // Reset form after submission
    form.value = {
      reference_one_name: '',
      reference_one_number: '',
      reference_one_designation: '',
      reference_one_email: '',
      reference_two_name: '',
      reference_two_number: '',
      reference_two_designation: '',
      reference_two_email: '',
      address: '',
      marital_status: '',
      spouse_name: '',
      spouse_number: '',
      parent_name: '',
      parent_relation: '',
      parent_phone_number: '',
      siblings_name: '',
      siblings_relation: '',
      siblings_phone_number: '',
      company_name: '',
      company_phone: '',
      company_email: '',
      experience_years: '',
      mother_name: '',
      father_name: ''
    }
    
  } catch (e) {
    console.error(e)
    await Swal.fire({
      icon: 'error',
      title: '❌ Submission Failed',
      text: e.response?.data?.message || 'Something went wrong. Please try again later.',
      confirmButtonColor: '#6366f1'
    })
  }
}

onMounted(() => {
  fetchApplications()
})
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400;
}
</style>