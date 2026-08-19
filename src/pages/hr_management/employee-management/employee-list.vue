<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormControl from '@/components/FormControl.vue'

import { mdiAccountMultiple } from '@mdi/js'
import { useHRM } from '@/composables/useHRM'
import api from '@/config/api'

/* ------------------ setup ------------------ */

const router = useRouter()
const { hrmApi } = useHRM()

/* ------------------ state ------------------ */

const loader = ref(false)
const syncLoadingUID = ref(null)

const employees = ref([])

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

/* ------------------ helpers ------------------ */

const normalizeEmployee = (uid, hrmEmp, systemEmp) => {
  const missing_in_system = !!hrmEmp && !systemEmp
  const missing_in_hrm = !!systemEmp && !hrmEmp

  const mismatch_fields = []

  if (missing_in_system) mismatch_fields.push('missing_in_system')
  if (missing_in_hrm) mismatch_fields.push('missing_in_hrm')

  if (hrmEmp && systemEmp) {
    if ((hrmEmp.email || '') !== (systemEmp.email || '')) {
      mismatch_fields.push('email')
    }
  }

  return {
    employee_uid: uid,

    first_name:
      hrmEmp?.first_name ||
      systemEmp?.first_name ||
      systemEmp?.user?.name?.split(' ')[0] ||
      '',

    last_name:
      hrmEmp?.last_name ||
      systemEmp?.last_name ||
      systemEmp?.user?.name?.split(' ').slice(1).join(' ') ||
      '',

    email:
      hrmEmp?.email ||
      systemEmp?.email ||
      systemEmp?.user?.email ||
      '',

    department_name:
      systemEmp?.department?.name ||
      hrmEmp?.department_name ||
      '-',

    position_name:
      systemEmp?.position?.name ||
      hrmEmp?.position_name ||
      '-',

    joined_at:
      systemEmp?.joined_at ||
      hrmEmp?.joined_at ||
      '-',

    status:
      systemEmp?.status ??
      hrmEmp?.status ??
      0,

    type:
      systemEmp?.type ||
      hrmEmp?.type ||
      '-',

    hrm_employee: hrmEmp,
    system_employee: systemEmp,

    missing_in_system,
    missing_in_hrm,

    is_mismatch:
      missing_in_system ||
      missing_in_hrm ||
      mismatch_fields.length > 0,

    mismatch_fields,
  }
}

/* ------------------ api ------------------ */

const getAllEmployee = async () => {
  loader.value = true

  try {
    const [hrmRes, systemRes] = await Promise.all([
      hrmApi.get('employee'),
      api().get('employees?with=user,department,position'),
    ])

    const hrmEmployees = hrmRes.data?.data || []
    const systemEmployees = systemRes.data?.data || []

    const hrmMap = new Map(
      hrmEmployees.map(e => [e.employee_uid, e])
    )

    const systemMap = new Map(
      systemEmployees.map(e => [e.employee_uid, e])
    )

    const allUIDs = new Set([
      ...hrmMap.keys(),
      ...systemMap.keys(),
    ])

    const merged = []

    allUIDs.forEach(uid => {
      merged.push(
        normalizeEmployee(
          uid,
          hrmMap.get(uid),
          systemMap.get(uid)
        )
      )
    })

    employees.value = merged.sort((a, b) =>
      `${a.first_name} ${a.last_name}`
        .toLowerCase()
        .localeCompare(
          `${b.first_name} ${b.last_name}`.toLowerCase()
        )
    )

  } catch (err) {
    console.error('Employee fetch failed:', err)
  } finally {
    loader.value = false
  }
}

/* ------------------ sync ------------------ */

const syncEmployee = async (emp) => {
  syncLoadingUID.value = emp.employee_uid

  try {
    // Create in system
    if (emp.missing_in_system && emp.hrm_employee) {

      await api().post('employees', {
        ...emp.hrm_employee
      })

    }

    // Create in HRM
    else if (emp.missing_in_hrm && emp.system_employee) {

      await hrmApi.post('employee', {
        ...emp.system_employee
      })

    }

    await getAllEmployee()

  } catch (err) {
    console.error('Sync failed:', err)
  } finally {
    syncLoadingUID.value = null
  }
}

/* ------------------ computed ------------------ */

const filteredEmployees = computed(() => {

  if (!searchQuery.value) return employees.value

  const q = searchQuery.value.toLowerCase()

  return employees.value.filter(emp =>
    [
      emp.first_name,
      emp.last_name,
      emp.email,
      emp.employee_uid,
      emp.department_name,
      emp.position_name,
    ]
      .join(' ')
      .toLowerCase()
      .includes(q)
  )

})

const totalPages = computed(() =>
  Math.ceil(filteredEmployees.value.length / itemsPerPage.value)
)

const paginatedEmployees = computed(() => {

  const start =
    (currentPage.value - 1) * itemsPerPage.value

  return filteredEmployees.value.slice(
    start,
    start + itemsPerPage.value
  )

})

/* ------------------ methods ------------------ */

const changePage = (page) => {

  if (page < 1 || page > totalPages.value) return

  currentPage.value = page

}

const goBack = () => router.back()

/* ------------------ lifecycle ------------------ */

watch(searchQuery, () => {
  currentPage.value = 1
})

onMounted(getAllEmployee)

</script>

<template>
  <SectionMain class="mx-10">

    <!-- Header -->

    <SectionTitleLineWithButton
      :icon="mdiAccountMultiple"
      title="Employee Sync Manager"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      main
    >
      <p
        class="flex gap-1 items-center rounded-full px-3 py-1 cursor-pointer bg-[#4653dd]"
        @click="goBack"
      >
        ← Back
      </p>
    </SectionTitleLineWithButton>

    <!-- Search -->

    <div class="flex gap-3 my-6">

      <FormControl
        v-model="searchQuery"
        placeholder="Search employee..."
        class="w-full"
      />

    </div>

    <!-- Table -->

    <CardBox has-table class="overflow-x-auto">

      <table class="w-full border">

        <thead class="bg-blue-600 text-white">

          <tr>

            <th class="p-3 border">Name</th>
            <th class="p-3 border">Email</th>
            <th class="p-3 border">Department</th>
            <th class="p-3 border">Position</th>
            <th class="p-3 border">UID</th>
            <th class="p-3 border">Sync Status</th>
            <th class="p-3 border">Action</th>

          </tr>

        </thead>

        <tbody>

          <tr v-if="loader">

            <td colspan="7" class="p-6 text-center">
              Loading employees...
            </td>

          </tr>

          <tr
            v-for="emp in paginatedEmployees"
            :key="emp.employee_uid"
            class="border-t hover:bg-gray-50"
          >

            <td class="p-3">
              {{ emp.first_name }} {{ emp.last_name }}
            </td>

            <td class="p-3">
              {{ emp.email }}
            </td>

            <td class="p-3">
              {{ emp.department_name }}
            </td>

            <td class="p-3">
              {{ emp.position_name }}
            </td>

            <td class="p-3">
              {{ emp.employee_uid }}
            </td>

            <td class="p-3">

              <span
                v-if="emp.missing_in_system"
                class="text-red-600 font-semibold"
              >
                Missing in System
              </span>

              <span
                v-else-if="emp.missing_in_hrm"
                class="text-red-600 font-semibold"
              >
                Missing in HRM
              </span>

              <span
                v-else
                class="text-green-600 font-semibold"
              >
                Synced
              </span>

            </td>

            <td class="p-3">

              <BaseButton
                v-if="emp.is_mismatch"
                label="Sync"
                color="info"
                :loading="syncLoadingUID === emp.employee_uid"
                @click="syncEmployee(emp)"
              />

            </td>

          </tr>

        </tbody>

      </table>

    </CardBox>

    <!-- Pagination -->

    <div class="flex justify-center gap-2 mt-6">

      <BaseButton
        label="Prev"
        outline
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      />

      <BaseButton
        label="Next"
        outline
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      />

    </div>

  </SectionMain>
</template>
