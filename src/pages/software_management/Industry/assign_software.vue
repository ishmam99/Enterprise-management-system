<template>
  <div class="min-h-screen w-4/5 bg-gray-50 py-8 px-4">
    <div class="w-4/5 py-8 px-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8 bg-teal-700 text-white px-6 py-4 rounded-lg">
        <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
        <div class="badge badge-accent badge-lg">NEW</div>
      </div>

      <!-- Page Transition -->
      <transition name="page-transition" mode="out-in">
        <!-- Assign Industry -->
        <div v-if="currentPage === 'Industry'" key="Industry">
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <form @submit.prevent="assignIndustry" class="space-y-6">
              <!-- Software -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">
                    Select Software <span class="text-error">*</span>
                  </span>
                </label>
                <select
                  class="select select-bordered w-full"
                  v-model="selectedSoftware"
                  :disabled="loading"
                  required
                >
                  <option value="" disabled>Choose a software</option>
                  <option v-for="software in softwareList" :key="software.id" :value="software.id">
                    {{ software.name }}
                  </option>
                </select>
              </div>

              <!-- Industry -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">
                    Select Industry <span class="text-error">*</span>
                  </span>
                </label>
                <select
                  class="select select-bordered w-full"
                  v-model="selectedIndustry"
                  :disabled="loading"
                  required
                >
                  <option value="" disabled>Choose an industry</option>
                  <option v-for="industry in IndustryList" :key="industry.id" :value="industry.id">
                    {{ industry.name }}
                  </option>
                </select>
              </div>
                <!-- Submit -->
              <div class="form-control pt-4">
                <button
                  type="submit"
                  class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  :disabled="loading || !selectedSoftware || !selectedIndustry"
                >
                  <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                  {{ loading ? "Assigning..." : "Assign Industry" }}
                </button>
              </div>
              <!-- Assigned List -->
              <div v-if="assignedIndustrys.length > 0" class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Currently Assigned Industries</span>
                </label>
                <div class="bg-gray-50 rounded-lg p-4 border">
                  <div
                    v-for="assignment in assignedIndustrys"
                    :key="assignment.id"
                    class="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div>
                      <span class="font-medium">{{ getIndustryName(assignment.industry_id) }}</span>
                      <span class="text-gray-500 text-sm ml-2">
                        → {{ getSoftwareName(assignment.software_id) }}
                      </span>
                    </div>
                    <button
                      type="button"
                      @click="removeAssignment(assignment.id)"
                      class="btn btn-sm btn-error btn-outline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>


            </form>
          </div>
        </div>

        <!-- Create Industry -->
        <div v-else key="CreateIndustry">
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <form @submit.prevent="createIndustry" class="space-y-6">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">
                    Industry Name <span class="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter industry name"
                  class="input input-bordered w-full"
                  v-model="industryName"
                  :disabled="loading"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Industry Description</span>
                </label>
                <textarea
                  placeholder="Enter industry description"
                  class="textarea textarea-bordered w-full"
                  v-model="industryDescription"
                  :disabled="loading"
                  rows="4"
                ></textarea>
              </div>

              <div class="form-control pt-4">
                <button
                  type="submit"
                  class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  :disabled="loading"
                >
                  <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                  {{ loading ? "Creating..." : "Create Industry" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/config/api";

const loading = ref(false);
const currentPage = ref("Industry");

// form data
const selectedSoftware = ref("");
const selectedIndustry = ref("");
const softwareList = ref([]);
const IndustryList = ref([]);
const assignedIndustrys = ref([]);
const industryName = ref("");
const industryDescription = ref("");

// computed title
const pageTitle = computed(() =>
  currentPage.value === "Industry" ? "Assign Software to Industry" : "Assign Industry"
);


const getSoftwares = async () => {
  try {
    const response = await api().get("/softwares");
    softwareList.value = response.data.data || [];
  } catch (error) {
    console.error("Error fetching softwares:", error);
  }
};

const getIndustries = async () => {
  try {
    const response = await api().get("/industries");
    IndustryList.value = response.data.data || [];
  } catch (error) {
    console.error("Error fetching industries:", error);
  }
};

onMounted(() => {
  getSoftwares();
  getIndustries();
});


const getSoftwareName = (id) => {
  const s = softwareList.value.find((x) => x.id === id);
  return s ? s.name : "Unknown";
};

const getIndustryName = (id) => {
  const i = IndustryList.value.find((x) => x.id === id);
  return i ? i.name : "Unknown";
};


const assignIndustry = async () => {
  if (!selectedSoftware.value || !selectedIndustry.value) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please select both software and industry",
    });
  }

  const payload = {
    industry_id: selectedIndustry.value,
    software_id: selectedSoftware.value,
  };

  loading.value = true;
  try {
    const res = await api().post("/add-industry-softwares", payload);
    assignedIndustrys.value.push({
      id: Date.now(),
      ...payload,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: res.data.message || "Industry assigned successfully!",
    });

    selectedSoftware.value = "";
    selectedIndustry.value = "";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to assign industry",
    });
  } finally {
    loading.value = false;
  }
};


const removeAssignment = (assignmentId) => {
  assignedIndustrys.value = assignedIndustrys.value.filter((a) => a.id !== assignmentId);
  Swal.fire({
    icon: "success",
    title: "Removed!",
    text: "Industry assignment has been removed.",
  });
};

// === Create Industry ===
const createIndustry = async () => {
  if (!industryName.value.trim()) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter an industry name",
    });
  }

  loading.value = true;
  try {
    const response = await api().post("/industries", {
      name: industryName.value,
      description: industryDescription.value,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Industry created successfully!",
    });

    industryName.value = "";
    industryDescription.value = "";
    getIndustries();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to create industry",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s ease;
}
.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}
</style>
