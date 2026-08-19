<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 ">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white pt-24 pb-4">
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2  items-center">
          <!-- Left Content -->
          <div>
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span class="text-xl">✨</span>
              <span class="font-semibold">Join Our Community</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Create Your Professional Account
            </h1>
            <p class="text-lg md:text-xl text-purple-100 mb-8">
              Unlock premium training, certifications, and career growth opportunities
            </p>
            <div class="flex gap-8">
              <div>
                <div class="text-2xl md:text-3xl font-bold">10K+</div>
                <div class="text-purple-200 text-sm">Professionals</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold">150+</div>
                <div class="text-purple-200 text-sm">Courses</div>
              </div>
              <div>
                <div class="text-2xl md:text-3xl font-bold">95%</div>
                <div class="text-purple-200 text-sm">Success Rate</div>
              </div>
            </div>
            <div class="text-xl font-semibold mt-2">
              Already have an account? <router-link to="/login?role=user" class="text-emerald-500 underline hover:text-emerald-400 font-medium">Login here</router-link>
            </div>
          </div>


          <!-- Right Visual -->
          <div class="relative h-64 md:h-80 hidden lg:block">
            <div class="absolute top-10 right-20 w-32 h-40 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow"></div>
            <div class="absolute bottom-10 right-40 w-40 h-28 bg-purple-400/30 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow delay-300"></div>
            <div class="absolute bottom-20 right-0 w-28 h-32 bg-pink-400/30 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl animate-bounce-slow delay-700"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Registration Section -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="grid lg:grid-cols-[380px,1fr] gap-8">
          <!-- Left Sidebar -->
          <aside class="space-y-6">
            <!-- Progress Card -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Your Registration</h3>
              
              <!-- Circular Progress -->
              <div class="relative w-32 h-32 mx-auto mb-4">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#e2e8f0" stroke-width="4" />
                  <circle cx="64" cy="64" r="58" fill="none" stroke="url(#gradient)" stroke-width="4" 
                    stroke-dasharray="364.4" :stroke-dashoffset="calculateDashOffset()" stroke-linecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#2563eb" />
                      <stop offset="100%" stop-color="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-blue-600">{{ currentStep }}/{{ totalSteps }}</span>
                </div>
              </div>
              <p class="text-gray-600 font-medium">{{ steps[currentStep - 1] }}</p>
            </div>

            <!-- Benefits Cards -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Why Join?</h3>
              <div class="space-y-3">
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group cursor-pointer">
                  <div class="text-2xl">🎓</div>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">Expert Training</p>
                    <p class="text-xs text-gray-500">Learn from industry leaders</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group cursor-pointer">
                  <div class="text-2xl">🏆</div>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">Certifications</p>
                    <p class="text-xs text-gray-500">Recognized globally</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group cursor-pointer">
                  <div class="text-2xl">🚀</div>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">Career Growth</p>
                    <p class="text-xs text-gray-500">Advance your skills</p>
                  </div>
                </div>
                <div class="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group cursor-pointer">
                  <div class="text-2xl">🤝</div>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">Community</p>
                    <p class="text-xs text-gray-500">Connect with peers</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonial -->
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center">
              <p class="text-sm italic mb-3">"This platform transformed my career. Highly recommended for professionals!"</p>
              <p class="text-xs opacity-90">— Sarah Chen, VP Engineering</p>
            </div>
          </aside>

          <!-- Right Column: Form -->
          <main class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <!-- Form Header -->
            <div class="p-6 md:p-8 border-b border-gray-100">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Let's Get Started</h2>
              <p class="text-gray-600">{{ getStepDescription() }}</p>
            </div>

            <!-- Progress Steps -->
            <div class="px-6 md:px-8 pt-6">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div v-for="(step, index) in steps" :key="index" class="text-center">
                  <div :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all font-semibold text-sm',
                    currentStep > index + 1 ? 'bg-green-500 text-white' :
                    currentStep === index + 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                    'bg-gray-100 text-gray-400'
                  ]">
                    <svg v-if="currentStep > index + 1" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <span :class="[
                    'text-xs font-medium',
                    currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400'
                  ]">{{ step }}</span>
                </div>
              </div>
              <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full" 
                  :style="{ width: progressPercent + '%' }"></div>
              </div>
            </div>

            <!-- Messages -->
            <transition name="fade-down">
              <div v-if="successMessage" class="mx-6 md:mx-8 mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ successMessage }}</span>
              </div>
            </transition>

            <transition name="fade-down">
              <div v-if="errorMessage" class="mx-6 md:mx-8 mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ errorMessage }}</span>
              </div>
            </transition>

            <!-- Form Content -->
            <form @submit.prevent="submitForm" class="p-6 md:p-8">
              <!-- Step 1: Personal Information -->
              <div v-show="currentStep === 1" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">
                      First Name <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.first_name" type="text" 
                      class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      :class="errors.first_name ? 'border-red-500' : 'border-gray-300'"
                      placeholder="Enter First Name" />
                    <p v-if="errors.first_name" class="mt-1 text-xs text-red-500">{{ errors.first_name }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">
                      Last Name <span class="text-red-500">*</span>
                    </label>
                    <input v-model="form.last_name" type="text"
                      class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      :class="errors.last_name ? 'border-red-500' : 'border-gray-300'"
                      placeholder="Enter Last Name" />
                    <p v-if="errors.last_name" class="mt-1 text-xs text-red-500">{{ errors.last_name }}</p>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.email" type="email"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.email ? 'border-red-500' : 'border-gray-300'"
                    placeholder="Enter Email Address" />
                  <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.phone" type="tel"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
                    placeholder="Enter Phone Number" />
                  <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Password <span class="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input v-model="form.password" type="password"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="**********" />
                  <p class="mt-1 text-xs text-gray-500">Create a custom password or we'll send you a temporary one</p>
                </div>

                <div v-if="form.password">
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm Password <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.password_confirmation" type="password"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.password_confirmation ? 'border-red-500' : 'border-gray-300'"
                    placeholder="Re-enter your password" />
                  <p v-if="errors.password_confirmation" class="mt-1 text-xs text-red-500">{{ errors.password_confirmation }}</p>
                </div>
              </div>

              <!-- Step 2: Professional Information -->
              <div v-show="currentStep === 2" class="space-y-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Job Title <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.job_title" type="text"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.job_title ? 'border-red-500' : 'border-gray-300'"
                    placeholder="Senior Software Engineer" />
                  <p v-if="errors.job_title" class="mt-1 text-xs text-red-500">{{ errors.job_title }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                  <input v-model="form.department" type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Engineering, Sales, etc." />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Company/Organization <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.company" type="text"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.company ? 'border-red-500' : 'border-gray-300'"
                    placeholder="Your company name" />
                  <p v-if="errors.company" class="mt-1 text-xs text-red-500">{{ errors.company }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Industry <span class="text-red-500">*</span>
                  </label>
                  <select v-model="form.industry_id"
                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    :class="errors.industry_id ? 'border-red-500' : 'border-gray-300'">
                    <option :value="null" disabled>Choose your industry...</option>
                    <option v-for="industry in industries" :key="industry.id" :value="industry.id">
                      {{ industry.name }}
                    </option>
                  </select>
                  <p v-if="errors.industry_id" class="mt-1 text-xs text-red-500">{{ errors.industry_id }}</p>
                </div>
              </div>

              <!-- Step 3: Skills & Expertise -->
              <div v-show="currentStep === 3" class="space-y-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">
                    Software Expertise <span class="text-red-500">*</span>
                  </label>
                  <p class="text-xs text-gray-500 mb-3">Add the tools and technologies you work with</p>
                  <div class="space-y-3">
                    <div v-for="(software, index) in selectedSoftwares" :key="index" class="flex gap-3">
                      <select v-model="software.id"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                        :class="{ 'border-red-500': errors.software_id && !selectedSoftwares.some(s => s.id) }">
                        <option :value="null">Select Software</option>
                        <option v-for="s in availableSoftwares" :key="s.id" :value="s.id"
                          :disabled="isSoftwareSelected(s.id)">
                          {{ s.name }}
                        </option>
                      </select>
                      <select v-model="software.level"
                        class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm">
                        <option :value="null">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <button v-if="selectedSoftwares.length > 1" @click.prevent="removeSoftware(index)"
                        class="w-10 h-10 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center justify-center">
                        ✕
                      </button>
                    </div>
                  </div>
                  <button @click.prevent="addSoftware"
                    class="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Software
                  </button>
                  <p v-if="errors.software_id" class="mt-1 text-xs text-red-500">{{ errors.software_id }}</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Solutions of Interest</label>
                  <p class="text-xs text-gray-500 mb-3">Which solutions interest you?</p>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <label v-for="solution in solutions" :key="solution.id" 
                      class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer">
                      <input type="checkbox" :value="solution.id" v-model="form.solution_id"
                        class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span class="text-sm text-gray-700">{{ solution.name }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Step 4: Profile & Additional Info -->
              <div v-show="currentStep === 4" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                    <input v-model="form.country" type="text"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="United States" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <input v-model="form.city" type="text"
                      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="New York" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <input v-model="form.address" type="text"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="123 Business Avenue" />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile</label>
                  <input v-model="form.linkedin" type="url"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="https://linkedin.com/in/yourprofile" />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Professional Bio</label>
                  <textarea v-model="form.bio" rows="4"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    placeholder="Tell us about your experience, achievements, and what you want to learn..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Profile Picture</label>
                  <div class="flex flex-col sm:flex-row items-center gap-4">
                    <div v-if="imagePreview" class="relative">
                      <img :src="imagePreview" alt="Profile Preview" class="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg" />
                      <button @click.prevent="removeImage"
                        class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center justify-center">
                        ✕
                      </button>
                    </div>
                    <label class="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition text-center">
                      <svg class="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <span class="text-sm text-gray-600">Click to upload or drag image</span>
                      <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Max 10MB</p>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <button v-if="currentStep > 1" type="button" @click="previousStep"
                  class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                  ← Back
                </button>
                <div class="flex-1"></div>
                <button v-if="currentStep < totalSteps" type="button" @click="nextStep"
                  class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md hover:shadow-lg">
                  Continue →
                </button>
                <button v-else type="submit" :disabled="isSubmitting"
                  class="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  <span v-if="!isSubmitting">✓ Complete Registration</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                </button>
              </div>
            </form>

            <!-- Footer -->
            <div class="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <p class="text-xs text-gray-500">
                By registering, you agree to our <a href="#" class="text-blue-600 hover:underline">Terms of Service</a> and 
                <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


// State
const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const currentStep = ref(1);
const totalSteps = 4;
const imagePreview = ref(null);
const imageFile = ref(null);

const steps = ["Personal", "Professional", "Expertise", "Profile"];

// Dropdown Data
const industries = ref([]);
const softwares = ref([]);
const solutions = ref([]);

// Form Data
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  job_title: "",
  department: "",
  company: "",
  industry_id: null,
  country: "",
  city: "",
  address: "",
  linkedin: "",
  bio: "",
  software_id: [],
  level: [],
  solution_id: []
});

const selectedSoftwares = ref([{ id: null, level: null }]);

// Validation Errors
const errors = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  job_title: "",
  company: "",
  industry_id: "",
  software_id: "",
  password_confirmation: ""
});

// Computed
const progressPercent = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100);

const calculateDashOffset = () => {
  const circumference = 2 * Math.PI * 58;
  const progress = ((currentStep.value - 1) / (totalSteps - 1)) * circumference;
  return circumference - progress;
};

const availableSoftwares = computed(() => {
  const selectedIds = selectedSoftwares.value.map(s => s.id).filter(id => id);
  return softwares.value.filter(s => !selectedIds.includes(s.id));
});

const isSoftwareSelected = (softwareId) => {
  return selectedSoftwares.value.some(s => s.id === softwareId);
};

const getStepDescription = () => {
  const descriptions = [
    "Tell us who you are",
    "Share your professional background",
    "Show us your expertise",
    "Finalize your profile"
  ];
  return descriptions[currentStep.value - 1];
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const fetchIndustries = async () => {
  try {
    const response = await api().get('/industries');
    industries.value = response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching industries:", error);
  }
};

const fetchSoftwares = async () => {
  try {
    const response = await api().get('/softwares');
    softwares.value = response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching softwares:", error);
  }
};

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions');
    solutions.value = response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching solutions:", error);
  }
};

const addSoftware = () => {
  selectedSoftwares.value.push({ id: null, level: null });
};

const removeSoftware = (index) => {
  selectedSoftwares.value.splice(index, 1);
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
};

const validateStep = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => errors[key] = "");

  if (currentStep.value === 1) {
    if (!form.first_name.trim()) {
      errors.first_name = "First name is required";
      isValid = false;
    }
    if (!form.last_name.trim()) {
      errors.last_name = "Last name is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }
    if (!form.phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    }
    if (form.password && form.password !== form.password_confirmation) {
      errors.password_confirmation = "Passwords don't match";
      isValid = false;
    }
    if (form.password && form.password.length < 8) {
      errors.password_confirmation = "Password must be 8+ characters";
      isValid = false;
    }
  }

  if (currentStep.value === 2) {
    if (!form.job_title.trim()) {
      errors.job_title = "Job title is required";
      isValid = false;
    }
    if (!form.company.trim()) {
      errors.company = "Company is required";
      isValid = false;
    }
    if (!form.industry_id) {
      errors.industry_id = "Industry is required";
      isValid = false;
    }
  }

  if (currentStep.value === 3) {
    const hasSoftware = selectedSoftwares.value.some(s => s.id);
    if (!hasSoftware) {
      errors.software_id = "Select at least one software";
      isValid = false;
    }
  }

  return isValid;
};

const nextStep = () => {
  if (validateStep()) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const submitForm = async () => {
  if (!validateStep()) {
    errorMessage.value = "Please fix the errors before continuing";
    setTimeout(() => { errorMessage.value = ""; }, 3000);
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  const formData = new FormData();

  Object.keys(form).forEach(key => {
    if (key === 'software_id' || key === 'level' || key === 'solution_id') {
      if (form[key] && form[key].length) {
        form[key].forEach(value => {
          formData.append(`${key}[]`, value);
        });
      }
    } else if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
      formData.append(key, form[key]);
    }
  });

  selectedSoftwares.value.forEach(software => {
    if (software.id) {
      formData.append('software_id[]', software.id);
      if (software.level) {
        formData.append('level[]', software.level);
      }
    }
  });

  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await api().post('/end-users', formData);
    if (response.data.status) {
      successMessage.value = "Welcome! Redirecting to your dashboard...";
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  } catch (error) {
    if (error.response?.data?.errors) {
      const backendErrors = error.response.data.errors;
      Object.keys(backendErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) {
          errors[key] = backendErrors[key][0];
        }
      });
      errorMessage.value = "Please fix the errors above";
    } else {
      errorMessage.value = error.response?.data?.message || "Registration failed";
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchIndustries();
  fetchSoftwares();
  fetchSolutions();
});
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-1000 {
  animation-delay: 1s;
}

/* Fade Down Transition */
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.3s ease;
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>