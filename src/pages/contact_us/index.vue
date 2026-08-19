<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkg0OHYxMkgzNnYtMTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="text-blue-200 font-semibold">Contact Us</span>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Let's Start a
            <span class="block mt-2 bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Whether you need MSC Software solutions, engineering support, or have questions about our services, we're here to help you succeed.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

      <!-- Map Section -->
      <div class="mb-20">
        <div class="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i class="fa-solid fa-map-location-dot text-blue-600"></i>
            Our Location
          </h2>
          <div class="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.0025724057123!2d-96.7034329!3d33.0300627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19010c486fdd%3A0xf59cbb2e6d5dd4b3!2s850%20Central%20Pkwy%20E%20%23248%2C%20Plano%2C%20TX%2075074%2C%20USA!5e0!3m2!1sen!2sbd!4v1760285631959!5m2!1sen!2sbd"
              class="w-full h-[400px] md:h-[500px]"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        <!-- Contact Details -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-200">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <i class="fa-solid fa-address-book text-blue-600"></i>
            Contact Information
          </h2>
          
          <div class="space-y-8">
            <!-- Address -->
            <div class="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div class="bg-blue-100 p-3 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                <i class="fa-solid fa-location-dot text-blue-600 group-hover:text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Our Address</h3>
                <p class="text-lg text-gray-600 leading-relaxed">
                  850 Central Pkwy E, STE 248<br>
                  Plano, TX 75074 USA
                </p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div class="bg-green-100 p-3 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                <i class="fa-solid fa-phone text-green-600 group-hover:text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Phone Number</h3>
                <p class="text-lg text-gray-600">
                  Main Line: <span class="font-semibold text-gray-900">469-575-9334</span>
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div class="bg-purple-100 p-3 rounded-full group-hover:bg-purple-600 transition-colors duration-300">
                <i class="fa-solid fa-envelope text-purple-600 group-hover:text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Email Addresses</h3>
                <div class="space-y-2 text-gray-600">
                  <p class="flex items-center gap-2">
                    <span class="font-medium text-gray-700">General Inquiries:</span>
                    <a href="mailto:info@hitechsoftsys.net" class="text-blue-600 hover:text-blue-800 hover:underline">info@hitechsoftsys.net</a>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="font-medium text-gray-700">Support:</span>
                    <a href="mailto:support@hitechsoftsys.net" class="text-blue-600 hover:text-blue-800 hover:underline">support@hitechsoftsys.net</a>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="font-medium text-gray-700">Sales:</span>
                    <a href="mailto:sales@hitechsoftsys.net" class="text-blue-600 hover:text-blue-800 hover:underline">sales@hitechsoftsys.net</a>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="font-medium text-gray-700">Careers:</span>
                    <a href="mailto:resume@hitechsoftsys.net" class="text-blue-600 hover:text-blue-800 hover:underline">resume@hitechsoftsys.net</a>
                  </p>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div class="bg-orange-100 p-3 rounded-full group-hover:bg-orange-600 transition-colors duration-300">
                <i class="fa-solid fa-clock text-orange-600 group-hover:text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p class="text-lg text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br>
                  Saturday: 10:00 AM - 4:00 PM<br>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-200">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <i class="fa-solid fa-paper-plane text-blue-600"></i>
            Send Us a Message
          </h2>
          
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="John"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Doe"
                >
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="john.doe@example.com"
              >
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="How can we help you?"
              >
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
              <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- Departments Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Departments
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with the right team for your specific needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="bg-blue-600 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">Sales</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">MSC Software licensing & solutions</p>
            <a href="mailto:sales@hitechsoftsys.net" class="text-sm text-blue-600 hover:text-blue-800 font-semibold">sales@hitechsoftsys.net</a>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="bg-purple-600 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">Support</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">Technical assistance & troubleshooting</p>
            <a href="mailto:support@hitechsoftsys.net" class="text-sm text-purple-600 hover:text-purple-800 font-semibold">support@hitechsoftsys.net</a>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="bg-green-600 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">Careers</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">Join our team of experts</p>
            <a href="mailto:resume@hitechsoftsys.net" class="text-sm text-green-600 hover:text-green-800 font-semibold">resume@hitechsoftsys.net</a>
          </div>

          <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200 hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="bg-orange-600 p-2 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">General</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">Questions, feedback & inquiries</p>
            <a href="mailto:info@hitechsoftsys.net" class="text-sm text-orange-600 hover:text-orange-800 font-semibold">info@hitechsoftsys.net</a>
          </div>
        </div>
      </div>

      <!-- Quick Contact Methods -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Preferred Contact Method
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We're available 24/7 to support your engineering needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:469-575-9334" class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 group hover:-translate-y-2 hover:border-blue-500">
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-8 h-8 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Call Us Now</h3>
            <p class="text-gray-600 mb-3">Speak directly with our experts</p>
            <p class="text-blue-600 font-semibold text-lg">469-575-9334</p>
          </a>

          <a href="mailto:info@hitechsoftsys.net" class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 group hover:-translate-y-2 hover:border-purple-500">
            <div class="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-8 h-8 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p class="text-gray-600 mb-3">Get detailed responses</p>
            <p class="text-purple-600 font-semibold">info@hitechsoftsys.net</p>
          </a>

          <div class="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 group hover:-translate-y-2 hover:border-green-500 cursor-pointer">
            <div class="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-8 h-8 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
            <p class="text-gray-600 mb-3">Get instant support</p>
            <p class="text-green-600 font-semibold">Available 24/7</p>
          </div>
        </div>
      </div>

      <!-- Why Choose Us Section -->
      <div class="mb-20">
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Partner With Us?
            </h2>
            <p class="text-xl text-blue-200 max-w-3xl mx-auto">
              Your trusted partner for MSC Software solutions and engineering excellence
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div class="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">24/7 Availability</h3>
              <p class="text-blue-200 text-sm">On-demand support whenever you need it</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div class="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Industry Expertise</h3>
              <p class="text-blue-200 text-sm">Subject Matter Experts across all domains</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Global Reach</h3>
              <p class="text-blue-200 text-sm">Domestic & global competitive rates</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div class="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Fast Response</h3>
              <p class="text-blue-200 text-sm">Quick turnaround on all inquiries</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
}
</style>