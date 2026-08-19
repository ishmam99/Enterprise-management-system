<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-2">
    <div class="bg-blue-500 py-10 text-white items-center rounded text-center">
      <div class="flex items-center px-48 justify-between ">
        <h3 class="text-2xl font-semibold">Licensed to HTBBD</h3>
        <h1 class="text-2xl font-semibold flex items-center gap-2">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M16.2877 9.42773C15.413 7.97351 13.8195 7 12 7 9.23999 7 7 9.23999 7 12 7 14.76 9.23999 17 12 17 13.8195 17 15.413 16.0265 16.2877 14.5723L14.5729 13.5442C14.0483 14.4166 13.0927 15 12 15 10.3425 15 9 13.6575 9 12 9 10.3425 10.3425 9 12 9 13.093 9 14.0491 9.58386 14.5735 10.4568L16.2877 9.42773ZM22 12C22 6.47998 17.52 2 12 2 6.47998 2 2 6.47998 2 12 2 17.52 6.47998 22 12 22 17.52 22 22 17.52 22 12ZM4 12C4 7.57996 7.57996 4 12 4 16.42 4 20 7.57996 20 12 20 16.42 16.42 20 12 20 7.57996 20 4 16.42 4 12Z"></path></svg>
          </span>
          <span>
             Developed by <a href="https://islamicdigitallane.com/" target="_blank">Islamic Digital Lane</a>
          </span>
          </h1>
      </div>
    </div>
  </footer>
</template>
