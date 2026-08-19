<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24"
    >
      <div
        class="absolute inset-0 opacity-20"
        style="
          background-image: radial-gradient(
            circle at 30% 40%,
            rgba(37, 99, 235, 0.3) 0%,
            transparent 60%
          );
        "
      ></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-6"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Get In Touch
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Contact <span class="text-blue-400">Vermont Composites</span>
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          Have a question about our capabilities, a specific program, or a new
          project? Reach out – our team is ready to help.
        </p>
      </div>
    </section>

    <!-- Contact Information & Form -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left: Contact Details -->
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700"
                >Contact Information</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-6">
              Let's <span class="text-blue-600">Connect</span>
            </h2>
            <p class="text-gray-600 mb-8 leading-relaxed">
              We're here to answer your questions and discuss how our composite
              solutions can support your next program. Contact us by phone,
              email, or stop by our facility.
            </p>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Visit Us
                  </h3>
                  <p class="text-gray-600">
                    25 Performance Dr<br />
                    Bennington, VT 05201
                  </p>
                  <a
                    href="https://maps.google.com/?q=25+Performance+Dr+Bennington+VT"
                    target="_blank"
                    class="text-sm text-blue-600 hover:underline"
                    >Get Directions →</a
                  >
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Call Us
                  </h3>
                  <p class="text-gray-600">
                    <a href="tel:+18024428967" class="hover:text-blue-600"
                      >(802) 442-8967</a
                    >
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Email Us
                  </h3>
                  <p class="text-gray-600">
                    <a
                      href="mailto:info@vermontcomposites.com"
                      class="hover:text-blue-600"
                      >info@vermontcomposites.com</a
                    >
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Business Hours
                  </h3>
                  <p class="text-gray-600">
                    Monday – Friday: 8:00 AM – 5:00 PM EST
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-8 pt-8 border-t border-gray-200">
              <p class="text-sm text-gray-500 mb-3">Connect with us:</p>
              <div class="flex gap-4">
                <a
                  href="#"
                  class="text-gray-500 hover:text-blue-600 transition"
                  aria-label="LinkedIn"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-blue-600 transition"
                  aria-label="Twitter"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  class="text-gray-500 hover:text-blue-600 transition"
                  aria-label="YouTube"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="bg-slate-50 p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 class="text-2xl font-bold text-slate-800 mb-4">
              Send Us a <span class="text-blue-600">Message</span>
            </h3>
            <p class="text-gray-600 text-sm mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form @submit.prevent="submitForm" class="space-y-5">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-slate-700 mb-1"
                  >Full Name *</label
                >
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-slate-700 mb-1"
                  >Email Address *</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-slate-700 mb-1"
                  >Phone Number</label
                >
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-slate-700 mb-1"
                  >Subject *</label
                >
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                >
                  <option value="">Select a topic...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Request a Quote">Request a Quote</option>
                  <option value="Program Discussion">Program Discussion</option>
                  <option value="Careers">Careers</option>
                  <option value="Facility Tour">Facility Tour</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-slate-700 mb-1"
                  >Message *</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white resize-none"
                  placeholder="Tell us about your program or question..."
                ></textarea>
              </div>

              <div class="flex items-start gap-2">
                <input
                  id="consent"
                  v-model="form.consent"
                  type="checkbox"
                  class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="consent" class="text-sm text-gray-600">
                  I consent to having Vermont Composites store my submitted
                  information so they can respond to my inquiry.
                </label>
              </div>

              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg
                    class="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              </button>
            </form>

            <!-- Success message -->
            <div
              v-if="showSuccess"
              class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
            >
              ✅ Thank you! Your message has been sent. We'll get back to you
              shortly.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-0">
      <div class="w-full h-[400px] bg-slate-200 relative">
        <!-- Static map placeholder - replace with actual Google Maps embed -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.760555089808!2d-73.19624668432895!3d42.872900579155954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7f8e47d38acd9%3A0x8e3d2f4d4f7c9b1a!2s25%20Performance%20Dr%2C%20Bennington%2C%20VT%2005201!5e0!3m2!1sen!2sus!4v1700000000000"
          class="w-full h-full"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-black text-slate-800 mb-4">
          Prefer to Call or <span class="text-blue-600">Visit</span>?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Our team is available Monday through Friday to discuss your program
          requirements. Walk‑ins welcome – we'd love to show you our facility.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+18024428967"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
          >
            Call (802) 442-8967
          </a>
          <a
            href="mailto:info@vermontcomposites.com"
            class="inline-block border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white px-8 py-4 rounded-xl font-bold transition"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitForm = () => {
  // Simulate form submission
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess.value = true;
    // Reset form
    Object.assign(form, {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    });
    // Hide success after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  }, 1500);
};
</script>

<style scoped>
/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>