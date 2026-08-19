<script setup>
const values = [
  {
    title: 'Discipline',
    description:
      'We help students develop focus, self-control, and respect both inside and outside the training hall.'
  },
  {
    title: 'Confidence',
    description:
      'Through structured training and achievement, students gain confidence that extends into everyday life.'
  },
  {
    title: 'Fitness',
    description:
      'Our programs improve strength, flexibility, endurance, and overall physical well-being.'
  },
  {
    title: 'Leadership',
    description:
      'Students learn responsibility, teamwork, and leadership skills through martial arts practice.'
  }
]
</script>

<template>
  <div class="bg-gray-50">
    <!-- Hero -->
    <section
      class="relative bg-gradient-to-r from-red-700 via-red-800 to-black text-white py-24"
    >
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          About IDL Martial Arts
        </h1>

        <p class="max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
          Building confidence, discipline, fitness, and leadership through
          professional martial arts training for students of all ages.
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              class="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              Our Story
            </span>

            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              More Than Martial Arts
            </h2>

            <p class="text-gray-600 mb-4 leading-relaxed">
              IDL Martial Arts was founded with a simple mission: to help
              students become stronger physically, mentally, and emotionally.
            </p>

            <p class="text-gray-600 mb-4 leading-relaxed">
              Our training programs focus not only on martial arts techniques
              but also on developing character, respect, perseverance, and
              confidence.
            </p>

            <p class="text-gray-600 leading-relaxed">
              Whether you're a beginner looking to learn self-defense or an
              experienced martial artist aiming to sharpen your skills, our
              academy provides a supportive and professional environment for
              growth.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200"
              alt="Martial Arts Training"
              class="rounded-3xl shadow-xl w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>

          <p class="text-gray-600 max-w-2xl mx-auto">
            Everything we teach is built around these essential principles.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ value.title }}
            </h3>

            <p class="text-gray-600">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200"
              alt="Training"
              class="rounded-3xl shadow-xl w-full h-[450px] object-cover"
            />
          </div>

          <div>
            <span
              class="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              Why Choose Us
            </span>

            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              Professional Training For Every Level
            </h2>

            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Experienced and certified instructors</span>
              </li>

              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Programs for kids, teens, and adults</span>
              </li>

              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Self-defense and confidence-building training</span>
              </li>

              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Supportive and welcoming community</span>
              </li>

              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                <span>Safe and structured learning environment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-red-700 via-red-800 to-black text-white py-20"
    >
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-4">
          Start Your Martial Arts Journey Today
        </h2>

        <p class="text-gray-200 mb-8 max-w-2xl mx-auto">
          Join our community and discover how martial arts can transform your
          confidence, fitness, and mindset.
        </p>

        <button
          class="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Book a Free Trial Class
        </button>
      </div>
    </section>
  </div>
</template>