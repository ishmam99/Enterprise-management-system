<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-gray-900 to-red-800 text-white py-20">
      <div class="absolute inset-0 bg-black opacity-40"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">IDL Martial Arts Blog</h1>
        <p class="text-xl max-w-2xl mx-auto">Tips, stories, and insights from our dojo to your home</p>
      </div>
    </section>

    <!-- Main Content Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Blog Posts Grid -->
        <div class="lg:w-2/3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              v-for="post in posts" 
              :key="post.id" 
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-2">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  <span>{{ post.date }}</span>
                  <span class="mx-2">•</span>
                  <i class="fas fa-tag mr-2"></i>
                  <span>{{ post.category }}</span>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>
                <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
                <a 
                  href="#" 
                  class="text-red-600 font-semibold hover:text-red-700 inline-flex items-center"
                >
                  Read More 
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-12 space-x-2">
            <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Previous</button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-md">1</button>
            <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">2</button>
            <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">3</button>
            <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:w-1/3">
          <!-- Search -->
          <div class="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Search</h3>
            <div class="flex">
              <input 
                type="text" 
                placeholder="Search articles..." 
                class="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button class="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Categories -->
          <div class="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Categories</h3>
            <ul class="space-y-2">
              <li v-for="cat in categories" :key="cat.name">
                <a href="#" class="flex justify-between text-gray-600 hover:text-red-600">
                  <span>{{ cat.name }}</span>
                  <span>({{ cat.count }})</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Recent Posts -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
            <ul class="space-y-4">
              <li v-for="recent in recentPosts" :key="recent.id" class="flex gap-3">
                <img :src="recent.thumbnail" alt="" class="w-16 h-16 object-cover rounded-md" />
                <div>
                  <a href="#" class="text-gray-900 font-semibold hover:text-red-600">{{ recent.title }}</a>
                  <p class="text-sm text-gray-500">{{ recent.date }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <section class="bg-red-600 py-12 mt-8">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
        <p class="text-white opacity-90 mb-6">Get the latest articles and special offers straight to your inbox</p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            class="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button class="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Mock blog post data
const posts = [
  {
    id: 1,
    title: '5 Benefits of Martial Arts for Kids',
    excerpt: 'Discover how martial arts can improve focus, confidence, and physical health in children...',
    date: 'March 15, 2025',
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 2,
    title: 'How to Stay Fit at Home: MMA Workouts',
    excerpt: 'No equipment? No problem. Here are 10 bodyweight exercises you can do anywhere...',
    date: 'March 10, 2025',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1120&q=80'
  },
  {
    id: 3,
    title: 'Bullying Prevention: What Every Parent Should Know',
    excerpt: 'Practical strategies to empower your child against bullies, both in school and online...',
    date: 'March 5, 2025',
    category: 'Parenting',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 4,
    title: 'The Journey to Black Belt: A Student’s Story',
    excerpt: 'Follow Sarah’s 4-year journey from white belt to black belt and the lessons learned...',
    date: 'February 28, 2025',
    category: 'Student Stories',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  }
]

const categories = [
  { name: 'Kids', count: 8 },
  { name: 'Fitness', count: 12 },
  { name: 'Self-Defense', count: 6 },
  { name: 'Parenting', count: 5 },
  { name: 'Student Stories', count: 4 }
]

const recentPosts = [
  {
    id: 5,
    title: '5 Benefits of Martial Arts for Kids',
    date: 'March 15, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 6,
    title: 'How to Stay Fit at Home',
    date: 'March 10, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 7,
    title: 'Bullying Prevention Tips',
    date: 'March 5, 2025',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
]
</script>