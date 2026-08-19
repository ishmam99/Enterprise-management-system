<template>
  <div class="min-h-screen px-5 py-5 w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white py-10 px-4">
  <!-- <div class="min-h-screen w-full bg-gray-100 px-6 py-10 flex items-center justify-center"> -->

    <!-- Main Card -->
    <div
      class="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

       <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-emerald-700 mb-2">
          ➕ Create New Partner
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          Fill out the form below to create a new Partner account.
        </p>
      </div>
      <!-- <h1 class="text-4xl font-bold text-teal-600 text-center mb-8 ">
  Create Partner Account
</h1> -->

      <!-- Form -->
      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-6">

        <!-- Partner Name -->
        <div>
          <label class="text-gray-700 font-medium">Partner Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-gray-700 focus:border-gray-700
                   bg-gray-50 shadow-sm transition-all"
            placeholder="Enter partner name"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="text-gray-700 font-medium">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-gray-700 focus:border-gray-700
                   bg-gray-50 shadow-sm transition-all"
            placeholder="Enter email address"
            required
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="text-gray-700 font-medium">Phone Number</label>
          <input
            v-model="form.phone"
            type="text"
            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-gray-700 focus:border-gray-700
                   bg-gray-50 shadow-sm transition-all"
            placeholder="Enter phone number"
            required
          />
        </div>

        <!-- Address -->
        <div>
          <label class="text-gray-700 font-medium">Address</label>
          <textarea
            v-model="form.address"
            rows="3"
            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300
                   focus:ring-2 focus:ring-gray-700 focus:border-gray-700
                   bg-gray-50 shadow-sm transition-all"
            placeholder="Enter address"
            required
          ></textarea>
        </div>

        


        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full sm:w-auto px-6 py-2.5 text-lg font-semibold rounded-lg
                  bg-emerald-600 text-white shadow-md hover:bg-emerald-700
                 transition-all"
        >
          Create Partner Account
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Form state
const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  type: "",
});

// Submit Handler
const submitForm = async () => {
  try {
    const res = await api().post('partners', form.value);

    Swal.fire({
      title: "Success!",
      text: "Partner account created successfully!",
      icon: "success",
      confirmButtonColor: "#4f46e5"
    });

    // reset form
    form.value = {
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "",
    };

  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error?.response?.data?.message || "Something went wrong",
      icon: "error",
      confirmButtonColor: "#ef4444"
    });
  }
};
</script>
