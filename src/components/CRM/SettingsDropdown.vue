<template>
  <div class="relative inline-block text-left">
    <!-- Settings Icon -->
    <button
     class="flex items-center justify-center w-10 h-10 rounded-full hover:text-black hover:bg-gray-100 transition"
      @click="toggleDropdown"

    >
      <i class="ri-settings-5-fill text-xl cursor-pointer"></i>
    </button>

    <!-- Dropdown Menu -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        @click.stop
      >
        <ul class="py-2">

          <li>
            <router-link
             to="/crm/settings/variable"
              class="w-full text-left px-4 py-2 hover:bg-gray-100"

            >
              Variable Settings
            </router-link>
          </li>
          <li>
             <router-link
             to="/crm/settings/layout">
            <button
              class="w-full text-left px-4 py-2 hover:bg-gray-100"
              @click="goTo('account')"
            >
              Layouts Settings
            </button></router-link>
          </li>
          <li>
            <button
              class="w-full text-left px-4 py-2 hover:bg-gray-100"
              @click="goTo('account')"
            >
              Account Settings
            </button>
          </li>
          <li>
            <button
              class="w-full text-left px-4 py-2 hover:bg-gray-100"
              @click="goTo('notifications')"
            >
              Notification Settings
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (e) => {
  // Close only if clicked outside
  if (!e.target.closest(".relative")) {
    isOpen.value = false;
  }
};

const goTo = (page) => {
  console.log("Go to:", page);
  isOpen.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  window.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
