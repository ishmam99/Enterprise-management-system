<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/config/api";

const loading = ref(false);
const skillName = ref("");
const selectedSoftwareId = ref("");
const selectedLevel = ref(""); // New ref for software level
const softwareOptions = ref([]);
const fetchLoading = ref(false);

// Software level options
const levelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },

  { value: "advance", label: "Advance" }
];

// Fetch software options from API
const fetchSoftwareOptions = async () => {
  fetchLoading.value = true;
  try {
    const response = await api().get("softwares");
    softwareOptions.value = response.data.data || [];
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch software options",
      confirmButtonColor: "#3abff8",
    });
  } finally {
    fetchLoading.value = false;
  }
};

// Submit selected software to customer-software API
const submitSoftwareSelection = async () => {
  if (!selectedSoftwareId.value) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please select a software",
      confirmButtonColor: "#3abff8",
    });
    return;
  }

  if (!selectedLevel.value) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please select a software level",
      confirmButtonColor: "#3abff8",
    });
    return;
  }

  loading.value = true;

  try {
    const response = await api().post("end-user-software-add", {
      software_id: selectedSoftwareId.value,
      level: selectedLevel.value // Add level to the API request
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Software selection submitted successfully!",
      confirmButtonColor: "#3abff8",
    });

    selectedSoftwareId.value = "";
    selectedLevel.value = ""; // Reset level after submission
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to submit software selection",
      confirmButtonColor: "#3abff8",
    });
  } finally {
    loading.value = false;
  }
};

// Fetch software options when component mounts
onMounted(() => {
  fetchSoftwareOptions();
});
</script>

<template>
  <div class="min-h-screen w-4/5 bg-gray-50 py-8 px-4">
    <div class="mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 bg-teal-700 text-white px-6 py-4 rounded-lg">
        <h1 class="text-2xl font-semibold">Add Software</h1>
      </div>

      <!-- Software Selection Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Select Software</h2>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text font-semibold">
              Available Software <span class="text-error">*</span>
            </span>
          </label>
          <select
            v-model="selectedSoftwareId"
            class="select select-bordered w-full"
            :disabled="fetchLoading || loading"
            required
          >
            <option value="" disabled>Select a software</option>
            <option
              v-for="software in softwareOptions"
              :key="software.id"
              :value="software.id"
            >
              {{ software.name }}
            </option>
          </select>
          <div v-if="fetchLoading" class="mt-2 text-sm text-gray-500">
            <span class="loading loading-spinner loading-xs mr-2"></span>
            Loading software options...
          </div>
          <div v-if="!fetchLoading && softwareOptions.length === 0" class="mt-2 text-sm text-gray-500">
            No software options available
          </div>
        </div>

        <!-- Software Level Selection -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text font-semibold">
              Software Level <span class="text-error">*</span>
            </span>
          </label>
          <select
            v-model="selectedLevel"
            class="select select-bordered w-full"
            :disabled="loading"
            required
          >
            <option value="" disabled>Select software level</option>
            <option
              v-for="level in levelOptions"
              :key="level.value"
              :value="level.value"
            >
              {{ level.label }}
            </option>
          </select>
        </div>

        <div class="form-control pt-4">
          <button
            @click="submitSoftwareSelection"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            :disabled="loading || !selectedSoftwareId || !selectedLevel"
          >
            <span v-if="loading" class="loading loading-spinner loading-xs"></span>
            {{ loading ? "Submitting..." : "Submit Selection" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
