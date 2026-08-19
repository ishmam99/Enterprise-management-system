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


        <!-- Create Skill -->
        <div >
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <form @submit.prevent="createSkill" class="space-y-6">
              <!-- Software -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">
                    Select Software <span class="text-error">*</span>
                  </span>
                </label>
                <select
                  class="select select-bordered w-full"
                  v-model="selectedSoftwareForSkill"
                  :disabled="loading"
                  required
                >
                  <option value="" disabled>Choose a software</option>
                  <option v-for="software in softwareList" :key="software.id" :value="software.id">
                    {{ software.name }}
                  </option>
                </select>
              </div>

              <!-- Skill Name -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">
                    Skill Name <span class="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  class="input input-bordered w-full"
                  v-model="skillName"
                  placeholder="Enter skill name"
                  :disabled="loading"
                  required
                />
              </div>

              <!-- Skill Description -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Skill Description</span>
                </label>
                <textarea
                  class="textarea textarea-bordered w-full"
                  v-model="skillDescription"
                  placeholder="Enter skill description (optional)"
                  :disabled="loading"
                  rows="3"
                ></textarea>
              </div>

              <!-- Submit -->
              <div class="form-control pt-4">
                <button
                  type="submit"
                  class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  :disabled="loading || !selectedSoftwareForSkill || !skillName.trim()"
                >
                  <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                  {{ loading ? "Creating..." : "Create Skill" }}
                </button>
              </div>
            </form>

            <!-- Created Skills List -->
            <div v-if="createdSkills.length > 0" class="mt-8">
              <h3 class="text-lg font-semibold mb-4">Created Skills</h3>
              <div class="space-y-3">
                <div
                  v-for="skill in createdSkills"
                  :key="skill.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                >
                  <div>
                    <span class="font-medium">{{ getSoftwareName(skill.software_id) }}</span>
                    <span class="mx-2">→</span>
                    <span class="font-medium">{{ skill.name }}</span>
                    <span v-if="skill.description" class="text-sm text-gray-600 ml-2">
                      - {{ skill.description }}
                    </span>
                  </div>
                  <button
                    @click="removeSkill(skill.id)"
                    class="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
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
const selectedSoftwareForSkill = ref("");
const skillName = ref("");
const skillDescription = ref("");
const softwareList = ref([]);
const IndustryList = ref([]);
const assignedIndustrys = ref([]);
const createdSkills = ref([]);

// computed title
const pageTitle = computed(() => {
  switch (currentPage.value) {
    case 'Industry':
      return "Create Software skill";
    case 'Skill':
      return "Create Skill for Software";
    default:
      return "Software Management";
  }
});

const getSoftwares = async () => {
  try {
    const response = await api().get("/softwares");
    softwareList.value = response.data || [];
  } catch (error) {
    console.error("Error fetching softwares:", error);
  }
};

const getIndustries = async () => {
  try {
    const response = await api().get("/solutions");
    IndustryList.value = response.data || [];
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
    solution_id: selectedIndustry.value,
    software_id: selectedSoftware.value,
  };

  loading.value = true;
  try {
    const res = await api().post("/add-software-solutions", payload);
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

// === Create Skill ===
const createSkill = async () => {
  if (!selectedSoftwareForSkill.value || !skillName.value.trim()) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please select software and enter a skill name",
    });
  }

  const payload = {
    name: skillName.value.trim(),
    description: skillDescription.value.trim(),
    software_id: selectedSoftwareForSkill.value,
  };

  loading.value = true;
  try {
    const response = await api().post("/software-skill", payload);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Skill created successfully!",
    });

    // Add to created skills list
    createdSkills.value.push({
      id: Date.now(),
      ...payload,
    });

    // Reset form
    selectedSoftwareForSkill.value = "";
    skillName.value = "";
    skillDescription.value = "";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Failed to create skill",
    });
  } finally {
    loading.value = false;
  }
};

const removeSkill = (skillId) => {
  createdSkills.value = createdSkills.value.filter((s) => s.id !== skillId);
  Swal.fire({
    icon: "success",
    title: "Removed!",
    text: "Skill has been removed.",
  });
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
