<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Social Media</h1>
          <p class="text-gray-500 text-sm mt-1">Manage social media campaigns and posts</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Post
        </button>
      </div>

      <!-- Social Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-blue-600">+1,240</p>
          <p class="text-xs text-gray-400">New Followers</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-purple-600">8.2K</p>
          <p class="text-xs text-gray-400">Total Followers</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">3.8%</p>
          <p class="text-xs text-gray-400">Engagement Rate</p>
        </div>
      </div>

      <!-- Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="post in socialPosts" :key="post.id" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
          <img :src="post.image" class="w-full h-48 object-cover" />
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs px-2 py-1 rounded-full" :class="post.platform === 'LinkedIn' ? 'bg-blue-100 text-blue-700' : post.platform === 'Twitter' ? 'bg-gray-100 text-gray-700' : 'bg-pink-100 text-pink-700'">{{ post.platform }}</span>
              <span class="text-xs text-gray-400">{{ post.date }}</span>
            </div>
            <p class="text-sm text-gray-800 line-clamp-2">{{ post.content }}</p>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>❤️ {{ post.likes }}</span>
              <span>💬 {{ post.comments }}</span>
              <span>🔄 {{ post.shares }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const socialPosts = ref([
  { id: 1, platform: 'LinkedIn', content: 'Excited to announce our new composite materials for aerospace applications! Learn more about how we\'re pushing the boundaries of lightweight structures.', date: 'Oct 15, 2026', likes: 145, comments: 32, shares: 18, image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400' },
  { id: 2, platform: 'Twitter', content: 'Our engineering team just completed the first prototype for the new radome program. #Aerospace #Composites', date: 'Oct 14, 2026', likes: 89, comments: 12, shares: 8, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400' },
  { id: 3, platform: 'Instagram', content: 'Inside our 100,000 sq. ft. facility in Bennington, VT. State-of-the-art autoclaves and inspection labs. #Manufacturing #Vermont', date: 'Oct 12, 2026', likes: 234, comments: 28, shares: 15, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' },
  { id: 4, platform: 'LinkedIn', content: 'We\'re hiring! Join our engineering team in Bennington, VT. Exciting projects in aerospace and defense composites.', date: 'Oct 10, 2026', likes: 312, comments: 45, shares: 28, image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400' },
  { id: 5, platform: 'Twitter', content: 'Just completed a major milestone for the Orion spacecraft composite structures. Proud of our team! #Space #NASA', date: 'Oct 8, 2026', likes: 156, comments: 23, shares: 12, image: 'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=400' },
  { id: 6, platform: 'Instagram', content: 'Quality control lab: Ultrasonic C-scan inspection in progress. Every part meets the highest standards. #Quality #Composites', date: 'Oct 5, 2026', likes: 178, comments: 19, shares: 10, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400' }
])
</script>