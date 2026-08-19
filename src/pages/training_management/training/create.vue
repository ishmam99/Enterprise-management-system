<template>
  <div class="min-h-screen bg-gradient-to-r w-full from-slate-300 via-purple-100   to-blue-200">
    <!-- Animated background blur elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10">
      <div class="container mx-auto px-4 py-12">
        <!-- Header with breadcrumb-like navigation -->
        <div class="mb-12 animate-fade-in">
          <div class="flex items-center gap-4 mb-6">
            <button 
              @click="goBack" 
              class="group relative w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-indigo-300/50 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50"
              v-if="!isEditMode"
            >
              <svg class="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <div>
              <p class="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">{{ isEditMode ? 'Update Existing' : 'Create New' }}</p>
              <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900">
                {{ isEditMode ? 'Edit Training Program' : 'New Training Program' }}
              </h1>
            </div>
          </div>
          <p class="text-slate-600 text-lg ml-16">{{ isEditMode ? 'Update the details below to refine your training program' : 'Fill in the details below to create a comprehensive training program' }}</p>
        </div>

        <!-- Alert Messages with animations -->
        <transition name="slide-down">
          <div v-if="successMessage" class="mb-6 animate-success">
            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 text-emerald-800 p-4 rounded-xl shadow-lg shadow-emerald-100/30 flex items-center gap-3 backdrop-blur-sm">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="font-medium">{{ successMessage }}</span>
            </div>
          </div>
        </transition>

        <transition name="slide-down">
          <div v-if="errorMessage" class="mb-6 animate-error">
            <div class="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 text-red-800 p-4 rounded-xl shadow-lg shadow-red-100/30 flex items-center gap-3 backdrop-blur-sm">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="font-medium">{{ errorMessage }}</span>
            </div>
          </div>
        </transition>

        <!-- Main Form Container -->
        <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-100/20 border border-white/50 overflow-hidden animate-fade-in-up">
          <form @submit.prevent="submitForm" class="divide-y divide-slate-100/50">
            <!-- Form Content -->
            <div class="p-8 lg:p-12 space-y-12">
              <!-- Section 1: Basic Information -->
              <section class="animate-fade-in-up" style="animation-delay: 0.1s">
                <div class="mb-8">
                  <div class="inline-flex items-center gap-3 mb-6">
                    <div class="relative">
                      <div class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl blur opacity-75"></div>
                      <div class="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-slate-900">Basic Information</h2>
                      <p class="text-sm text-slate-500 mt-1">Essential program details</p>
                    </div>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                  <!-- Training Name -->
                  <div class="md:col-span-2 group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Training Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model="form.name"
                        type="text"
                        class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                        :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-400/30': errors.name }"
                        placeholder="Advanced Dynamic Analysis Training"
                      />
                      <div v-if="!errors.name" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
                        </svg>
                      </div>
                    </div>
                    <transition name="slide-down">
                      <p v-if="errors.name" class="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z" clip-rule="evenodd"></path></svg>
                        {{ errors.name }}
                      </p>
                    </transition>
                  </div>

                  <!-- Training Code -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Training Code <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model="form.code"
                        type="text"
                        class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 focus:bg-white transition-all duration-300 font-mono text-sm"
                        :class="{ 'border-red-400': errors.code }"
                        placeholder="NAS101"
                      />
                    </div>
                    <p class="mt-2 text-xs text-slate-500">Unique course identifier</p>
                    <transition name="slide-down">
                      <p v-if="errors.code" class="mt-1 text-sm text-red-600 font-medium">{{ errors.code }}</p>
                    </transition>
                  </div>

                  <!-- Status -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                    <select
                      v-model="form.status"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                    >
                      
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Published</option>
                    </select>
                  </div>

                  <!-- Short Description -->
                  <div class="md:col-span-2 group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Short Description</label>
                    <div class="relative">
                      <textarea
                        v-model="form.short_description"
                        rows="2"
                        class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 focus:bg-white transition-all duration-300 resize-none"
                        placeholder="A brief, compelling overview of what participants will learn"
                        maxlength="255"
                      ></textarea>
                      <div class="absolute bottom-3 right-4 text-xs text-slate-400">{{ form.short_description?.length || 0 }}/255</div>
                    </div>
                  </div>

                  <!-- Long Description -->
                  <div class="md:col-span-2 group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Detailed Description</label>
                    <textarea
                      v-model="form.long_description"
                      rows="4"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 focus:bg-white transition-all duration-300 resize-none"
                      placeholder="Comprehensive overview including objectives, content structure, and expected outcomes"
                    ></textarea>
                  </div>
                </div>
              </section>

              <!-- Section 2: Training Details -->
              <section class="animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="mb-8">
                  <div class="inline-flex items-center gap-3 mb-6">
                    <div class="relative">
                      <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl blur opacity-75"></div>
                      <div class="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-slate-900">Training Details</h2>
                      <p class="text-sm text-slate-500 mt-1">Duration, level, and pricing</p>
                    </div>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                  <!-- Duration -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Duration <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.duration"
                      type="text"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 focus:bg-white transition-all duration-300"
                      :class="{ 'border-red-400': errors.duration }"
                      placeholder="5 Days, 2 Hours"
                    />
                    <transition name="slide-down">
                      <p v-if="errors.duration" class="mt-2 text-sm text-red-600 font-medium">{{ errors.duration }}</p>
                    </transition>
                  </div>

                  <!-- Level -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Level <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.level"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                      :class="{ 'border-red-400': errors.level }"
                    >
                      <option value="">Select Difficulty Level</option>
                      <option value="Beginner">🌱 Beginner</option>
                      <option value="Intermediate">📈 Intermediate</option>
                      <option value="Advanced">🚀 Advanced</option>
                      <option value="Expert">⭐ Expert</option>
                      <option value="All">🎯 All Levels</option>
                    </select>
                    <transition name="slide-down">
                      <p v-if="errors.level" class="mt-2 text-sm text-red-600 font-medium">{{ errors.level }}</p>
                    </transition>
                  </div>

                  <!-- Price -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Price <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
                      <input
                        v-model.number="form.price"
                        type="number"
                        step="0.01"
                        class="w-full pl-8 pr-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 focus:bg-white transition-all duration-300 font-mono"
                        :class="{ 'border-red-400': errors.price }"
                        placeholder="0.00"
                      />
                    </div>
                    <p class="mt-2 text-xs text-slate-500">Set to 0 for free training</p>
                    <transition name="slide-down">
                      <p v-if="errors.price" class="mt-1 text-sm text-red-600 font-medium">{{ errors.price }}</p>
                    </transition>
                  </div>

                  <!-- Training Type -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">
                      Training Type <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="form.type"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                      :class="{ 'border-red-400': errors.type }"
                    >
                      <option value="onsite">🏢 On-Site/Online Training</option>
                      <option value="online">🥪 Lunch & Learn</option>
                    </select>
                    <transition name="slide-down">
                      <p v-if="errors.type" class="mt-2 text-sm text-red-600 font-medium">{{ errors.type }}</p>
                    </transition>
                  </div>
                </div>
              </section>

              <!-- Section 3: Software & Solution -->
              <section class="animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="mb-8">
                  <div class="inline-flex items-center gap-3 mb-6">
                    <div class="relative">
                      <div class="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur opacity-75"></div>
                      <div class="relative w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-slate-900">Software & Solution</h2>
                      <p class="text-sm text-slate-500 mt-1">Specify tools and focus areas</p>
                    </div>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                  <!-- Software -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Software</label>
                    <select
                      v-model="form.software_id"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option :value="null">Select Software (Optional)</option>
                      <option v-for="software in softwareList" :key="software.id" :value="software.id">
                        {{ software.name }}
                      </option>
                    </select>
                    <p class="mt-2 text-xs text-slate-500">Primary software used in training</p>
                  </div>

                  <!-- Solution -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Solution</label>
                    <select
                      v-model="form.solution_id"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option :value="null">Select Solution (Optional)</option>
                      <option v-for="solution in solutionList" :key="solution.id" :value="solution.id">
                        {{ solution.name }}
                      </option>
                    </select>
                    <p class="mt-2 text-xs text-slate-500">Solution area covered</p>
                  </div>

                  <!-- Analysis Type -->
                  <div class="md:col-span-2 group">
                    <label class="block text-sm font-semibold text-slate-900 mb-2">Analysis Type</label>
                    <select
                      v-model="form.analysis"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option :value="null" disabled>Select Analysis Type</option>
                      <option v-for="type in analysisTypeList" :key="type.id" :value="type.name">
                        {{ type.name }}
                      </option>
                    </select>
                    <!-- <input
                      v-model="form.analysis"
                      type="text"
                      class="w-full px-4 py-3 bg-slate-50/50 border-2 border-slate-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 focus:bg-white transition-all duration-300"
                      placeholder="e.g., Dynamic, Static, Thermal, Structural"
                    /> -->
                    <p class="mt-2 text-xs text-slate-500">Specific analysis methodology</p>
                  </div>
                </div>
              </section>
            </div>

            <!-- Form Actions -->
            <div class="bg-gradient-to-r from-slate-50/50 to-slate-100/50 px-8 lg:px-12 py-6 flex justify-end gap-4 border-t border-slate-100/50">
              <button
                type="button"
                @click="goBack"
                class="group px-6 py-3 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="group relative px-8 py-3 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg v-if="isSubmitting" class="relative w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="relative">
                  {{ isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Training' : 'Create Training') }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// ========== PROPS & ROUTER ==========
const router = useRouter();
const route = useRoute();

// ========== STATE ==========
const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const softwareList = ref([]);
const solutionList = ref([]);
const isEditMode = computed(() => !!route.params.id);

// ========== FORM DATA ==========
const form = reactive({
  name: "",
  code: "",
  status: "1",
  short_description: "",
  long_description: "",
  duration: "",
  software_id: null,
  level: "",
  price: 0,
  type: "onsite",
  solution_id: null,
  analysis: "",
});
const analysisTypeList = ref([
  { id: "dynamic", name: "Dynamic Analysis", icon: "📊", gradient: "bg-gradient-to-br from-purple-600 to-indigo-700", shortDescription: "Vibration, shock, and transient response" },
  { id: "static", name: "Static Analysis", icon: "⚖️", gradient: "bg-gradient-to-br from-blue-600 to-cyan-700", shortDescription: "Linear and nonlinear static analysis" },
  { id: "thermal", name: "Thermal Analysis", icon: "🔥", gradient: "bg-gradient-to-br from-orange-600 to-red-700", shortDescription: "Heat transfer and thermal simulation" },
  { id: "cfd", name: "CFD Analysis", icon: "🌊", gradient: "bg-gradient-to-br from-green-600 to-emerald-700", shortDescription: "Computational fluid dynamics" },
  { id: "multibody", name: "Multibody Analysis", icon: "⚙️", gradient: "bg-gradient-to-br from-pink-600 to-rose-700", shortDescription: "Mechanical system simulation" },
  { id: "fatigue", name: "Fatigue Analysis", icon: "🔄", gradient: "bg-gradient-to-br from-amber-600 to-orange-700", shortDescription: "Durability and fatigue life prediction" },
  { id: "composite", name: "Composite Analysis", icon: "📐", gradient: "bg-gradient-to-br from-teal-600 to-cyan-700", shortDescription: "Composite material modeling" },
  { id: "acoustics_analysis", name: "Acoustics Analysis", icon: "🎵", gradient: "bg-gradient-to-br from-purple-600 to-pink-700", shortDescription: "Sound and vibration simulation" },
]);
// ========== VALIDATION ERRORS ==========
const errors = reactive({
  name: "",
  code: "",
  duration: "",
  level: "",
  price: "",
  type: "",
});

// ========== API METHODS ==========
const fetchSoftwares = async () => {
  try {
    const response = await api().get(`/softwares`);
    if (response.data && response.data.data) {
      softwareList.value = response.data.data;
    } else if (Array.isArray(response.data)) {
      softwareList.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching softwares:", error);
  }
};

const fetchSolutions = async () => {
  try {
    const response = await api().get(`/solutions`);
    if (response.data && response.data.data) {
      solutionList.value = response.data.data;
    } else if (Array.isArray(response.data)) {
      solutionList.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching solutions:", error);
  }
};

const fetchTrainingForEdit = async () => {
  if (!isEditMode.value) return;
  
  try {
    const response = await api().get(`/internal-trainings/${route.params.id}`);
    let trainingData;
    
    if (response.data && response.data.data) {
      trainingData = response.data.data;
    } else {
      trainingData = response.data;
    }
    
    Object.assign(form, {
      name: trainingData.name || "",
      code: trainingData.code || "",
      status: trainingData.status?.toString() || "1",
      short_description: trainingData.short_description || "",
      long_description: trainingData.long_description || "",
      duration: trainingData.duration || "",
      software_id: trainingData.software_id || null,
      level: trainingData.level || "",
      price: trainingData.price || 0,
      type: trainingData.type || "onsite",
      solution_id: trainingData.solution_id || null,
      analysis: trainingData.analysis || "",
    });
  } catch (error) {
    console.error("Error fetching training:", error);
    errorMessage.value = "Failed to load training data";
  }
};

// ========== VALIDATION ==========
const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => errors[key] = "");
  
  if (!form.name.trim()) {
    errors.name = "Training name is required";
    isValid = false;
  } else if (form.name.length > 255) {
    errors.name = "Training name must be less than 255 characters";
    isValid = false;
  }
  
  if (!form.code.trim()) {
    errors.code = "Training code is required";
    isValid = false;
  }
  
  if (!form.duration.trim()) {
    errors.duration = "Duration is required";
    isValid = false;
  }
  
  if (!form.level) {
    errors.level = "Level is required";
    isValid = false;
  }
  
  if (form.price === null || form.price === undefined) {
    errors.price = "Price is required";
    isValid = false;
  } else if (form.price < 0) {
    errors.price = "Price cannot be negative";
    isValid = false;
  }
  
  if (!form.type) {
    errors.type = "Training type is required";
    isValid = false;
  }
  
  return isValid;
};

// ========== SUBMIT HANDLER ==========
const submitForm = async () => {
  if (!validateForm()) {
    errorMessage.value = "Please fix the errors before submitting";
    setTimeout(() => { errorMessage.value = ""; }, 3000);
    return;
  }
  
  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";
  
  const submitData = {
    ...form,
    price: parseFloat(form.price) || 0,
    status: parseInt(form.status),
  };
  
  try {
    let response;
    
    if (isEditMode.value) {
      response = await api().put(`/internal-trainings/${route.params.id}`, submitData);
      successMessage.value = "Training updated successfully!";
    } else {
      response = await api().post(`/internal-trainings`, submitData);
      successMessage.value = "Training created successfully!";
      
      if (!isEditMode.value) {
        setTimeout(() => {
          Object.assign(form, {
            name: "",
            code: "",
            status: "1",
            short_description: "",
            long_description: "",
            duration: "",
            software_id: null,
            level: "",
            price: 0,
            type: "onsite",
            solution_id: null,
            analysis: "",
          });
        }, 1000);
      }
    }
    
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
    
    if (!isEditMode.value) {
      setTimeout(() => {
        router.push("/training_management/training/approve");
      }, 1500);
    }
    
  } catch (error) {
    console.error("Error submitting form:", error);
    
    if (error.response?.data?.errors) {
      const backendErrors = error.response.data.errors;
      Object.keys(backendErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) {
          errors[key] = backendErrors[key][0];
        }
      });
      errorMessage.value = "Please fix the validation errors";
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = `Failed to ${isEditMode.value ? 'update' : 'create'} training. Please try again.`;
    }
    
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};

// ========== NAVIGATION ==========
const goBack = () => {
  router.back();
};

// ========== LIFECYCLE ==========
onMounted(async () => {
  await Promise.all([fetchSoftwares(), fetchSolutions()]);
  await fetchTrainingForEdit();
});
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes success {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes error {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.animate-success {
  animation: success 0.4s ease-out forwards;
}

.animate-error {
  animation: error 0.4s ease-out forwards;
}

.transition-all {
  transition-property: all;
}

/* Smooth transitions for Vue transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom select dropdown styling */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

/* Gradient text effect */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Glass morphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
}
</style>