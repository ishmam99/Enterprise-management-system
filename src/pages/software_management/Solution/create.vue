<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const loading = ref(false);
const skillName = ref("");

const createSkill = async () => {
  if (!skillName.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter a skill name",
      confirmButtonColor: "#3abff8",
    });
    return;
  }

  loading.value = true;

  try {

    const response = await api().post("solutions", { name: skillName.value });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Solution created successfully!",
      confirmButtonColor: "#3abff8",
    });

    skillName.value = "";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to create skill",
      confirmButtonColor: "#3abff8",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen w-4/5 bg-gray-50 py-8 px-4">
    <div class="mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 bg-teal-700 text-white px-6 py-4 rounded-lg">
        <h1 class="text-2xl font-semibold">Create Solution</h1>
        <div class="badge badge-accent badge-lg">NEW</div>
      </div>

      <!-- Form Container -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <form @submit.prevent="createSkill" class="space-y-6">
          <!-- Skill Name Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">
                Solution Name <span class="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter solution name"
              class="input input-bordered w-full"
              v-model="skillName"
              :disabled="loading"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="form-control pt-4">
            <button
              type="submit"
              class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              :disabled="loading"
            >
              <span v-if="loading" class="loading loading-spinner loading-xs"></span>
              {{ loading ? "Creating..." : "Create Solution" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
