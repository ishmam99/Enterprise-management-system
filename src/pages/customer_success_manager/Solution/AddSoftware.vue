<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/config/api";

const loading = ref(false);
const skillName = ref("");
const selectedsolutionId = ref("");
const solutionOptions = ref([]);
const fetchLoading = ref(false);

// Fetch solution options from API
const fetchsolutionOptions = async () => {
  fetchLoading.value = true;
  try {
    const response = await api().get("solutions");
    solutionOptions.value = response.data || [];
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch solution options",
      confirmButtonColor: "#3abff8",
    });
  } finally {
    fetchLoading.value = false;
  }
};

// Submit selected solution to customer-solution API
const submitsolutionSelection = async () => {
  if (!selectedsolutionId.value) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please select a solution",
      confirmButtonColor: "#3abff8",
    });
    return;
  }

  loading.value = true;

  try {
    const response = await api().post("customer-solution", {
      solution_id: selectedsolutionId.value

    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "solution selection submitted successfully!",
      confirmButtonColor: "#3abff8",
    });

    selectedsolutionId.value = "";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to submit solution selection",
      confirmButtonColor: "#3abff8",
    });
  } finally {
    loading.value = false;
  }
};


// Fetch solution options when component mounts
onMounted(() => {
  fetchsolutionOptions();
});
</script>

<template>
  <div class="min-h-screen w-4/5 bg-gray-50 py-8 px-4">
    <div class="mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 bg-teal-700 text-white px-6 py-4 rounded-lg">
        <h1 class="text-2xl font-semibold">Add solution</h1>
      </div>

      <!-- solution Selection Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Select solution</h2>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text font-semibold">
              Available solution <span class="text-error">*</span>
            </span>
          </label>
          <select
            v-model="selectedsolutionId"
            class="select select-bordered w-full"
            :disabled="fetchLoading || loading"
            required
          >
            <option value="" disabled>Select a solution</option>
            <option
              v-for="solution in solutionOptions"
              :key="solution.id"
              :value="solution.id"
            >
              {{ solution.name }}
            </option>
          </select>
          <div v-if="fetchLoading" class="mt-2 text-sm text-gray-500">
            <span class="loading loading-spinner loading-xs mr-2"></span>
            Loading solution options...
          </div>
          <div v-if="!fetchLoading && solutionOptions.length === 0" class="mt-2 text-sm text-gray-500">
            No solution options available
          </div>
        </div>

        <div class="form-control pt-4">
          <button
            @click="submitsolutionSelection"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            :disabled="loading || !selectedsolutionId"
          >
            <span v-if="loading" class="loading loading-spinner loading-xs"></span>
            {{ loading ? "Submitting..." : "Submit Selection" }}
          </button>
        </div>
      </div>


    </div>
  </div>
</template>
