<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Add New User</h2>
        </div>
        <p class="text-gray-600 mt-2">Add New User to Your Organization</p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white shadow-lg rounded-xl p-6">
            <!-- Success Message -->
            <div v-if="showSuccess" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-green-800 font-medium">User added successfully!</span>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Personal Information -->
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Personal Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input v-model="userForm.firstName" type="text" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter first name" />
                    <p v-if="errors.firstName" class="text-red-600 text-sm">{{ errors.firstName }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input v-model="userForm.lastName" type="text" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter last name" />
                    <p v-if="errors.lastName" class="text-red-600 text-sm">{{ errors.lastName }}</p>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="userForm.email" type="email" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="user@company.com" />
                  <p v-if="errors.email" class="text-red-600 text-sm">{{ errors.email }}</p>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                  <input v-model="userForm.username" type="text" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username" />
                  <p v-if="errors.username" class="text-red-600 text-sm">{{ errors.username }}</p>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Knowledge Level *</label>
                  <select v-model="userForm.knowledgeLevel" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Knowledge Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <p v-if="errors.knowledgeLevel" class="text-red-600 text-sm">{{ errors.knowledgeLevel }}</p>
                </div>
              </div>

              <!-- Solution & Software -->
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Select Solution and Software
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Solution -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                    <select v-model="userForm.solutionId" @change="onSolutionChange" required
                      :disabled="loadingSolutions"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Solution</option>
                      <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
                        {{ solution.solution_name }}
                      </option>
                    </select>
                    <div v-if="loadingSolutions" class="text-sm text-gray-500 mt-1">Loading solutions...</div>
                    <p v-if="errors.solutionId" class="text-red-600 text-sm">{{ errors.solutionId }}</p>
                  </div>

                  <!-- Software -->
                 <!-- Software -->
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Software *</label>

  <div v-if="loadingSoftware" class="text-sm text-gray-500 mt-1">Loading software...</div>

  <div
    v-else
    class="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2"
  >
    <div
      v-for="soft in availableSoftware"
      :key="soft.id"
      class="flex items-center gap-2"
    >
      <input
        type="checkbox"
        :id="'software-' + soft.id"
        :value="soft.id"
        v-model="userForm.softwareIds"
        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label
        :for="'software-' + soft.id"
        class="text-sm text-gray-700 cursor-pointer select-none"
      >
        {{ soft.name }}
      </label>
    </div>
  </div>

  <p v-if="errors.softwareIds" class="text-red-600 text-sm mt-1">
    {{ errors.softwareIds }}
  </p>

  <div v-if="userForm.softwareIds.length" class="mt-2 text-sm text-gray-600">
    Selected: {{ userForm.softwareIds.length }}
  </div>
</div>

                </div>
              </div>

              <!-- Submit -->
              <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button type="submit" :disabled="isSubmitting"
                  class="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  <span v-if="!isSubmitting">Add User</span>
                  <span v-else>Adding...</span>
                </button>
                <button type="button" @click="resetForm"
                  class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import api from "@/config/api";

const authStore = useAuthStore();

const userForm = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  knowledgeLevel: "Intermediate",
  solutionId: "",
  softwareIds: [],
});

const solutions = ref([]);
const availableSoftware = ref([]);
const loadingSolutions = ref(false);
const loadingSoftware = ref(false);
const errors = reactive({});
const showSuccess = ref(false);
const isSubmitting = ref(false);

// ✅ Fetch solutions with softwares together
const fetchSolutions = async () => {
  loadingSolutions.value = true;
  try {
    const response = await api().get("/customer-solution?softwares=true", {

    });
    solutions.value = response.data || [];
  } catch (err) {
    console.error("Error fetching solutions:", err);
  } finally {
    loadingSolutions.value = false;
  }
};

// ✅ When a solution is selected
const onSolutionChange = () => {
  userForm.softwareIds = [];
  const selected = solutions.value.find((s) => s.id === userForm.solutionId);
  availableSoftware.value = selected?.softwares || [];
};

// ✅ Validate & Submit
const validateForm = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);
  let valid = true;
  if (!userForm.firstName.trim()) (errors.firstName = "First name required"), (valid = false);
  if (!userForm.lastName.trim()) (errors.lastName = "Last name required"), (valid = false);
  if (!userForm.email.trim()) (errors.email = "Email required"), (valid = false);
  if (!userForm.username.trim()) (errors.username = "Username required"), (valid = false);
  if (!userForm.solutionId) (errors.solutionId = "Select a solution"), (valid = false);
  if (!userForm.softwareIds.length) (errors.softwareIds = "Select at least one software"), (valid = false);
  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;
  try {
    const payload = {
      name: `${userForm.firstName} ${userForm.lastName}`,
      username: userForm.username,
      email: userForm.email,
      knowledge_level: userForm.knowledgeLevel,
      software_id: userForm.softwareIds,
      status: 1,
    };
    await api().post("end-users", payload, {

    });
    showSuccess.value = true;
    setTimeout(() => resetForm(), 2000);
  } catch (err) {
    console.error("Error submitting:", err);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(userForm, {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    knowledgeLevel: "Intermediate",
    solutionId: "",
    softwareIds: [],
  });
  availableSoftware.value = [];
};

onMounted(fetchSolutions);
</script>

<style scoped>
select[multiple] {
  background-image: none;
  padding-right: 0.75rem;
}
select[multiple] option {
  padding: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
}
select[multiple] option:last-child {
  border-bottom: none;
}
</style>
