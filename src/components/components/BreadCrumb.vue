<template>
  <div class="w-fit flex items-center gap-2 mb-4 p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path
        d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM9 9.99998H15V16H9V9.99998ZM11 12V14H13V12H11Z"
      ></path>
    </svg>
    <nav v-if="items && items.length" class="">
      <ol class="flex space-x-1">
        <li v-for="(item, itemIndex) in items" :key="itemIndex" class="flex items-center">
          <a
            v-if="itemIndex !== items.length - 1"
            :href="item.url"
            :title="item.name"
            class="text-xl text-gray-600 hover:underline"
          >
            {{ item.name }}
          </a>
          <span v-else class="text-lg text-gray-500">{{ item.name }}</span>
          <span v-if="items[itemIndex + 1]" class="mx-2 text-gray-400">/</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
