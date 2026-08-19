<template>
  <div class="px-6">
    <Breadcrumb />

    <!-- Page Title -->
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">
      My Custom Views
    </h1>

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
      <!-- Search -->
      <div class="relative w-full sm:w-72">
        <input
          v-model="search"
          type="text"
          placeholder="Search views..."
          class="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <i class="ri-search-line absolute left-3 top-2.5 text-gray-500 text-lg"></i>
      </div>

      <!-- Create Button -->
      <router-link
        to="/crm/leads/custom/create"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-700 transition"
      >
        + Create New View
      </router-link>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="bg-white shadow-md rounded-xl border border-gray-200 p-4">
      <table class="w-full">
        <tbody>
          <tr v-for="i in 6" :key="i">
            <td class="p-3 border">
              <div class="skeleton h-4 w-6"></div>
            </td>
            <td class="p-3 border">
              <div class="skeleton h-4 w-32"></div>
            </td>
            <td class="p-3 border">
              <div class="skeleton h-4 w-28"></div>
            </td>
            <td class="p-3 border">
              <div class="skeleton h-4 w-24"></div>
            </td>
            <td class="p-3 border">
              <div class="skeleton h-4 w-40"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table -->
    <div v-else class="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full border-collapse">
        <thead class="bg-cyan-100 text-gray-700">
          <tr>
            <th class="p-3 border text-sm font-medium">#</th>
            <th class="p-3 border text-sm font-medium">Name</th>
            <th class="p-3 border text-sm font-medium">Module</th>
            <th class="p-3 border text-sm font-medium">Created At</th>
            <th class="p-3 border text-sm font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(view, index) in paginatedViews"
            :key="view.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="p-3 border text-sm text-gray-600">{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td class="p-3 border font-medium text-gray-700">{{ view.name }}</td>
            <td class="p-3 border text-gray-600">
              {{ modules?.find(e => e.id == view.module)?.name }}
            </td>
            <td class="p-3 border text-gray-600">
              {{ formatDate(view.created_at) }}
            </td>

            <!-- Actions -->
            <td class="p-3 border">
              <div class="flex gap-2">
                <router-link
                  :to="{
                    name: 'crm-Leads-custom-view-id',
                    params: { id: view.id },
                    query: { name: view.name }
                  }"
                  class="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                >
                  View
                </router-link>

                <button
                  @click="confirmDelete(view.id)"
                  class="px-3 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="paginatedViews.length === 0">
            <td colspan="5" class="p-6 text-center text-gray-500 text-sm">
              No views found.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center p-4 border-t bg-gray-50">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>

        <p class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </p>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import Swal from "sweetalert2";
import { ref, computed, onMounted } from 'vue';

const customViews = ref([]);
const modules = ref([]);
const search = ref('');
const isLoading = ref(true);

// Pagination
const currentPage = ref(1);
const perPage = 10;
const totalPages = computed(() =>
  Math.ceil(filteredViews.value.length / perPage)
);

const paginatedViews = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredViews.value.slice(start, start + perPage);
});

// Filtering
const filteredViews = computed(() => {
  if (!search.value) return customViews.value;
  return customViews.value.filter(v =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Delete with SweetAlert
const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This view will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api().delete(`/crm/custom-view-delete/${id}`);
      customViews.value = customViews.value.filter(v => v.id !== id);

      Swal.fire({
        title: "Deleted!",
        text: "Your custom view has been deleted.",
        icon: "success",
        timer: 1300,
        showConfirmButton: false
      });
    }
  });
};

// Helpers
const formatDate = (date) => new Date(date).toLocaleDateString();

// Pagination logic
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };

// API calls
const loadData = async () => {
  const { data: views } = await api().get('/crm/my-custom-views');
  const { data: mod } = await api().get('/crm/modules');
  customViews.value = views;
  modules.value = mod;
};

onMounted(async () => {
  await loadData();
  isLoading.value = false;
});
</script>


<style scoped>
/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(90deg, #e4e4e4 25%, #f3f3f3 50%, #e4e4e4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Row striping */
tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e;
}
tbody tr:nth-child(even) td {
  background-color: #e5f6ff;
  border: 0.5px solid #909aa146;
}
tbody tr:hover td {
  background-color: #bdeeff;
  transition: 0.25s ease;
}
</style>

