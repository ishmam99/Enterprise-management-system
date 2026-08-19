<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Blog</h1>
          <p class="text-gray-500 text-sm mt-1">Manage blog posts and content</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="post in blogPosts" :key="post.id" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
          <img :src="post.image" class="w-full h-48 object-cover" />
          <div class="p-4">
            <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">{{ post.category }}</span>
            <h3 class="text-lg font-bold text-gray-900 mt-2">{{ post.title }}</h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>📅 {{ post.date }}</span>
              <span>👁️ {{ post.views }}</span>
              <span class="text-purple-600 cursor-pointer hover:underline">Read More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const blogPosts = ref([
  { id: 1, title: 'The Future of Composite Materials in Aerospace', excerpt: 'Discover how advanced composites are revolutionizing aircraft design and performance...', category: 'Aerospace', date: 'Oct 15, 2026', views: '1.2K', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
  { id: 2, title: 'Quality Control in Composite Manufacturing', excerpt: 'Learn about our rigorous inspection processes including NDI and C-scan testing...', category: 'Quality', date: 'Oct 10, 2026', views: '856', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400' },
  { id: 3, title: 'Medical Imaging: The Role of Advanced Composites', excerpt: 'How composite materials are enabling better patient outcomes in medical imaging...', category: 'Medical', date: 'Oct 5, 2026', views: '643', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' },
  { id: 4, title: 'Space Exploration: Composite Solutions for Extreme Environments', excerpt: 'From Orion to Mars, composites are enabling the next generation of space exploration...', category: 'Space', date: 'Sep 28, 2026', views: '1.8K', image: 'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=400' },
  { id: 5, title: 'Sustainable Manufacturing Practices in Composites', excerpt: 'Our commitment to reducing environmental impact through sustainable practices...', category: 'Sustainability', date: 'Sep 20, 2026', views: '432', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
  { id: 6, title: 'Defense Applications: Lightweight Composite Structures', excerpt: 'How advanced composites are enhancing military capabilities and protecting soldiers...', category: 'Defense', date: 'Sep 15, 2026', views: '2.1K', image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400' }
])
</script>