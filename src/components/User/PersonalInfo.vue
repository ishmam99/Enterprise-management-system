<template>
 <section
          id="personal-information"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              <i class="fas fa-user"></i>
              Personal Information
            </h2>
          </div>

          <div class="p-6 bg-gradient-to-br from-gray-50 to-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-5">
                <div class="info-card border-purple-500 bg-purple-50">
                  <p class="label text-purple-600"><i class="fas fa-user mr-2"></i>Name</p>
                  <p class="value">{{ userData?.name || 'Not provided' }}</p>
                </div>
                <div class="info-card border-indigo-500 bg-indigo-50">
                  <p class="label text-indigo-600"><i class="fas fa-envelope mr-2"></i>Email</p>
                  <p class="value">{{ userData?.email || 'Not provided' }}</p>
                </div>
                <div class="info-card border-blue-500 bg-blue-50">
                  <p class="label text-blue-600"><i class="fas fa-phone mr-2"></i>Phone</p>
                  <p class="value">{{ userData?.profile?.phone || 'Not provided' }}</p>
                </div>
              </div>
              <div class="space-y-5">
                <div class="info-card border-pink-500 bg-pink-50">
                  <p class="label text-pink-600"><i class="fas fa-user-tag mr-2"></i>Username</p>
                  <p class="value">{{ userData?.profile?.username || 'Not provided' }}</p>
                </div>
                <div class="info-card border-indigo-500 bg-indigo-50">
                  <p class="label text-indigo-600"><i class="fas fa-building mr-2"></i>Company</p>
                  <p class="value">
                    {{ companyName || 'Not assigned' }}
                    <span v-if="loadingCompany" class="ml-2 text-xs text-gray-500">
                      <i class="fas fa-spinner fa-spin"></i>
                    </span>
                  </p>
                </div>
                <div class="info-card border-teal-500 bg-teal-50">
                  <p class="label text-teal-600"><i class="fas fa-home mr-2"></i>Address</p>
                  <p class="value">{{ userData?.profile?.address || 'Not provided' }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'


const companyName = ref('Bell Textron')
const loadingCompany = ref(false)

const store = useAuthStore()
const userData = computed(() => store.user)
const userName = ref(userData.value?.name || 'User')
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');
main {
  scroll-behavior: smooth;
}
.scroll-smooth {
  scroll-behavior: smooth;
}
.accordion-header {
  @apply w-full flex items-center justify-between px-3 py-2
         bg-slate-300 hover:bg-slate-300 rounded-lg text-sm font-semibold transition;
}

.accordion-body {
  @apply mt-1 space-y-1 pl-2 border-l-2 border-slate-300;
}

.sidebar-btn {
  @apply w-full text-left px-3 py-2 rounded-lg text-sm font-medium
         hover:bg-slate-200 transition;
}
.info-card {
  @apply p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-300;
}

.label {
  @apply text-sm font-semibold flex items-center;
}

.value {
  @apply font-medium text-gray-800 mt-1;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section {
  animation: fadeInUp 0.5s ease-out;
}

/* Import Remix Icons */


/* Prose styles for summary section */
.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1rem;
}
</style>
