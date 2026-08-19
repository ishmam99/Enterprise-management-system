<template>
  <nav aria-label="breadcrumb" class="py-4">
    <div class="flex items-center justify-between">
      <ol class="flex space-x-2 text-gray-600 flex-1">
        <router-link to="/" class="hover:text-blue-600 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            fill="currentColor"
          >
            <path
              d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"
            ></path>
          </svg>
        </router-link>&nbsp;/
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <router-link :to="crumb.path" class="hover:text-blue-600 text-lg font-semibold">
            {{ crumb.name }}
          </router-link>
          <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
        </li>
      </ol>

      <button 
      class="flex items-center bg-red-600 text-white rounded-full px-4 py-0.5 hover:bg-red-700 mr-4"
      title="Go back"
      @click="goBack" 
    >
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
      <span class="ml-1 text-lg font-medium">Back</span>
    </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(path => path)
  const breadcrumbArray = pathArray.map((path, index) => {
    return {
      name: path.charAt(0).toUpperCase() + path.slice(1), // Capitalize the first letter
      path: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
  return breadcrumbArray
})

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(37 99 235);
  font-weight: bold;
}
</style>