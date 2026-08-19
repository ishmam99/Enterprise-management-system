<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccountMultipleRemove } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useHRM } from '@/composables/useHRM'

const { hrmApi } = useHRM()
const router = useRouter()

/* ---------------- state ---------------- */
const leaves = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(false)

/* ---------------- navigation ---------------- */
const goBack = () => router.back()

/* ---------------- api ---------------- */
const fetchLeaveApprovals = async () => {
  loading.value = true
  try {
    const { data } = await hrmApi.get('leave-list-hr')
    leaves.value = data.data || []
  } catch (error) {
    console.error('Leave approval fetch error:', error)
  } finally {
    loading.value = false
  }
}

/* ---------------- computed ---------------- */
const totalPages = computed(() =>
  Math.ceil(leaves.value.length / itemsPerPage.value)
)

const paginatedLeaves = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return leaves.value.slice(start, start + itemsPerPage.value)
})

/* ---------------- methods ---------------- */
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

/* ---------------- lifecycle ---------------- */
onMounted(fetchLeaveApprovals)
</script>
<template>
  <SectionMain class="mx-10">
    <!-- Header -->
    <SectionTitleLineWithButton
      :icon="mdiAccountMultipleRemove"
      title="All Leave Request"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      main
    >
      <div class="flex items-center mb-2">
        <button
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1
                 text-white bg-[#4653dd] hover:bg-[#3b47c6]"
          @click="goBack"
        >
          ← Back
        </button>
      </div>
    </SectionTitleLineWithButton>

    <!-- Table -->
    <CardBox class="w-full overflow-x-auto rounded-2xl shadow-lg" has-table>
      <table class="w-full min-w-max border border-gray-200">
        <thead class="bg-blue-600 text-white sticky top-0">
          <tr>
            <th class="px-4 py-3 text-left">Employee ID</th>
            <th class="px-4 py-3 text-left">Employee Name</th>
            <th class="px-4 py-3 text-left">From</th>
            <th class="px-4 py-3 text-left">To</th>
            <th class="px-4 py-3 text-left">Reason</th>
            <th class="px-4 py-3 text-center">HR Approval</th>
          </tr>
        </thead>

        <tbody class="bg-white text-sm">
          <tr v-if="loading">
            <td colspan="6" class="p-6 text-center">Loading...</td>
          </tr>

          <tr
            v-for="leave in paginatedLeaves"
            :key="leave.id"
            class="border-t odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition"
          >
            <td class="px-4 py-3">{{ leave.employee_uid }}</td>
            <td class="px-4 py-3">{{ leave.user_name }}</td>
            <td class="px-4 py-3">{{ leave.from_date }}</td>
            <td class="px-4 py-3">{{ leave.to_date }}</td>
            <td class="px-4 py-3">{{ leave.reason }}</td>

            <td class="px-4 py-3 text-center font-semibold">
              <span
                v-if="leave.hr_approval === 0"
                class="text-yellow-500"
              >
                Pending
              </span>
              <span
                v-else-if="leave.hr_approval === 1"
                class="text-green-600"
              >
                Approved
              </span>
              <span
                v-else
                class="text-red-500"
              >
                Declined
              </span>
            </td>
          </tr>

          <tr v-if="!loading && paginatedLeaves.length === 0">
            <td colspan="6" class="p-6 text-center text-gray-500">
              No leave requests found
            </td>
          </tr>
        </tbody>
      </table>
    </CardBox>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 mt-6"
    >
      <BaseButton
        label="Prev"
        outline
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      />

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 rounded-lg border text-sm font-semibold transition"
        :class="page === currentPage
          ? 'bg-blue-600 text-white'
          : 'bg-white hover:bg-blue-50'"
      >
        {{ page }}
      </button>

      <BaseButton
        label="Next"
        outline
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      />
    </div>
  </SectionMain>
</template>
