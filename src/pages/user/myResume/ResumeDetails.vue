<template>
  <div class="w-full flex h-screen bg-sky-300">
    <aside
      class="w-64 bg-slate-100/90 text-black shadow-xl border-r border-slate-200 backdrop-blur-md px-2 py-6 sticky top-0 h-screen overflow-y-auto">
      <button
        class="flex items-center w-full justify-center gap-2 mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg py-2 transition-all duration-300"
        @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path
            d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z">
          </path>
        </svg>
        <span class="font-semibold text-sm">Dashboard</span>
      </button>

      <div class="mb-6 px-2">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-2">Resume Owner</p>
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm rounded-full">
          <i class="ri-user-line"></i>
          {{ userName }}
        </div>
      </div>

      <hr class="my-4 border-slate-300" />

      <nav class="space-y-3">
        <!-- Current Resume -->
        <div>
          <button class="accordion-header" @click="toggleMenu('current')">
            <span>Current Resume</span>
            <i :class="openMenu === 'current' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"></i>
          </button>

          <div v-show="openMenu === 'current'" class="accordion-body">
            <button class="sidebar-btn" :class="{
              'bg-blue-600 text-white': activeView === 'view' && activeSidebar === 'create-pdf'
            }" @click="
                () => {
                  navigateToView('create-pdf')
                  scrollToSection('create-pdf')
                }
              ">
              Generate Resume
            </button>
            <button class="sidebar-btn" :class="{
              'bg-blue-600 text-white': activeView === 'view' && activeSidebar === 'view-resume'
            }" @click="
                () => {
                  navigateToView('view-resume')
                  scrollToSection('view-resume')
                }
              ">
              View Resume
            </button>
            <button class="sidebar-btn" :class="{
              'bg-blue-600 text-white': activeView === 'view' && activeSidebar === 'resume-list'
            }" @click="
                () => {
                  navigateToView('resume-list')
                }
              ">
              List of Resumes
            </button>
          </div>
        </div>

        <!-- Edit Resume -->
        <div>
          <button class="accordion-header" @click="toggleMenu('edit')">
            <span>Edit Resume</span>
            <i :class="openMenu === 'edit' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"></i>
          </button>

          <div v-show="openMenu === 'edit'" class="accordion-body">
            <button v-for="(item, index) in sidebarItems" :key="index" class="sidebar-btn"
              :class="{ 'bg-blue-600 text-white': activeSidebar === item.key }" @click="
                () => {
                  navigateToEdit(item.key)
                  scrollToSection(item.key)
                }
              ">
              {{ item.label }}
            </button>
          </div>
        </div>

        <!-- Submit Resume -->
        <div>
          <button class="accordion-header" @click="toggleMenu('submit')">
            <span>Submit Resume</span>
            <i :class="openMenu === 'submit' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"></i>
          </button>

          <div v-show="openMenu === 'submit'" class="accordion-body">
            <button class="sidebar-btn" :class="{ 'bg-blue-600 text-white': activeView === 'submit' }"
              @click="navigateToSubmit()">
              Apply Job
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <main ref="mainContainer" class="flex-1 flex flex-col overflow-y-auto scroll-smooth bg-slate-50">
      <header class="bg-slate-100 shadow-sm px-8 py-3 border-b border-gray-200 sticky top-0 z-10">
        <h1 class="text-2xl font-bold text-gray-800">Resume Dashboard</h1>
        <p class="text-gray-500 text-sm mt-1">Manage your resume and career information</p>
      </header>

      <div v-if="activeView === 'edit'" id="EditDiv" class="p-4 space-y-12">
        <!-- personal-information Section -->
        <section id="personal-information" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <PersonalInfo :activeSidebar="activeSidebar" :userData="userData" />
        </section>

        <!-- Education Section -->
        <section id="my-education" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Education :activeSidebar="activeSidebar" :userData="userData" />
        </section>

        <!-- Experience Section -->
        <section id="my-experience" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MyExperience :activeSidebar="activeSidebar" :userData="userData" />
        </section>

        <!-- msc-software Section - Updated with API Data -->
        <section id="msc-software" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <SoftwareAndSolution :activeSidebar="activeSidebar" />
        </section>

        <section id="my-references" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MyReferences />
        </section>

        <!-- general-skills Section -->
        <section id="general-skills" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <GeneralSkills :activeSidebar="activeSidebar" />
        </section>

        <!-- resume-summary Section -->
        <section id="resume-summary" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ResumeSummary :activeSidebar="activeSidebar" />
        </section>
        <!-- view resume  -->
        <footer class="p-8 text-center items-center justify-center mx-auto">
          <button @click="scrollToSection('top')"
            class="text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-medium border border-blue-600 px-10 py-2 rounded-lg transition-colors items-center justify-center mx-auto flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path
                d="M13.0001 22.0003L11.0002 22.0004L11.0002 5.82845L7.05044 9.77817L5.63623 8.36396L12.0002 2L18.3642 8.36396L16.9499 9.77817L13.0002 5.8284L13.0001 22.0003Z">
              </path>
            </svg>
            Back to Top
          </button>
        </footer>
      </div>
      
      <div v-if="activeView === 'view'" id="ViewResume" class="p-4">
        <section v-if="activeSidebar === 'create-pdf'"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CreatePdf />
        </section>

        <section v-if="activeSidebar === 'view-resume'"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ViewResume />
        </section>
        
        <section v-if="activeSidebar === 'resume-list'"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ResumeList />
        </section>
      </div>

      <div v-if="activeView === 'submit'" id="SubmitDiv" class="p-4">
        <section>
          <SubmitJob :activeSidebar="activeSidebar" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useResumeViewStore } from '@/stores/ResumeViewStore'
import Education from '@/components/User/Education.vue'
import MyExperience from '@/components/User/MyExperience.vue'
import MyReferences from '@/components/User/myReferences.vue'
import GeneralSkills from '@/components/User/GeneralSkills.vue'
import ResumeSummary from '@/components/User/ResumeSummary.vue'
import ViewResume from '@/components/User/ViewResume.vue'
import PersonalInfo from '@/components/User/PersonalInfo.vue'
import SoftwareAndSolution from '@/components/User/SoftwareAndSolution.vue'
import SubmitJob from '@/components/User/SubmitJob.vue'
import CreatePdf from '@/components/User/CreatePdf.vue'
import ResumeList from '@/components/User/ResumeList.vue'

// Use stores
const authStore = useAuthStore()
const resumeViewStore = useResumeViewStore()

// Computed properties from store
const activeView = computed(() => resumeViewStore.activeView)
const activeSidebar = computed(() => resumeViewStore.activeSidebar)
const openMenu = computed(() => resumeViewStore.openMenu)

// Methods from store
const toggleMenu = (menu) => resumeViewStore.toggleMenu(menu)
const navigateToEdit = (key) => resumeViewStore.navigateToEdit(key)
const navigateToView = (key) => resumeViewStore.navigateToView(key)
const navigateToSubmit = () => resumeViewStore.navigateToSubmit()

const userData = computed(() => authStore.user)
const userName = ref(userData.value?.name || 'User')

const sidebarItems = ref([
  { key: 'personal-information', label: 'Personal Information', count: null },
  { key: 'my-education', label: 'My Education', count: null },
  { key: 'my-experience', label: 'My Experience', count: null },
  { key: 'msc-software', label: 'MSc Software and Solutions', count: null },
  { key: 'my-references', label: 'My References', count: 3 },
  { key: 'general-skills', label: 'General Skills', count: 6 },
  { key: 'resume-summary', label: 'Resume Summary', count: null }
])

const mainContainer = ref(null)

const scrollToSection = (id) => {
  if (!mainContainer.value) return

  if (id === 'top') {
    mainContainer.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    resumeViewStore.setActiveSidebar(sidebarItems.value[0].key)
    return
  }

  const element = document.getElementById(id)

  if (element) {
    const offset = 160 // header height
    const top = element.offsetTop - offset

    mainContainer.value.scrollTo({
      top,
      behavior: 'smooth'
    })

    resumeViewStore.setActiveSidebar(id)
  }
}

const goBack = () => {
  window.history.back()
}

watch(activeView, () => {
  if (mainContainer.value) {
    mainContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

onMounted(() => {
  // Any initialization code
})
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
  @apply w-full flex items-center justify-between px-3 py-2 bg-slate-300 hover:bg-slate-300 rounded-lg text-sm font-semibold transition;
}

.accordion-body {
  @apply mt-1 space-y-1 pl-2 ml-1 border-l-2 border-blue-300 pt-1;
}

.sidebar-btn {
  @apply w-full text-left px-3 py-1 rounded-lg border border-blue-300 text-sm font-medium hover:bg-blue-200 transition;
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

.sidebar-btn {
  @apply transition-all duration-200;
}

.sidebar-btn.bg-blue-600 {
  @apply shadow-md scale-[1.02];
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