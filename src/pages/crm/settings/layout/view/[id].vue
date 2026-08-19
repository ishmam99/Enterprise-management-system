<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Layout Settings</h1>
        <button class="text-blue-600 text-sm">Preview</button>
      </div>

      <div v-for="section in sections" :key="section.id" class="mb-6 border border-dashed rounded-lg p-4 bg-white">
        <h2 class="font-medium mb-4">{{ section.title }}</h2>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="field in section.fields"
            :key="field.id"
            class="border rounded-lg px-3 py-2 flex justify-between items-center hover:shadow-sm relative"
          >
            <div>
              <div class="text-sm font-medium">{{ field.label }}</div>
              <div class="text-xs text-gray-500">{{ field.type }}</div>
            </div>

            <div class="flex items-center gap-2 relative">
              <span class="text-xs px-2 py-0.5 rounded bg-gray-100">{{ field.type }}</span>

              <!-- 3-dots button -->
              <button
                @click="toggleMenu(field.id)"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                •••
              </button>

              <!-- Dropdown menu -->
              <div
                v-if="openMenuId === field.id"
                class="absolute right-0 top-full mt-1 w-36 bg-white border rounded shadow-md z-10"
              >
                <ul>

                  <router-link :to="{name:'crm-settings-variable-edit-id',params:{id:field.id}}"
                    @click="editField(field)"
                    class="px-3 py-2 text-sm w-full hover:bg-gray-100 cursor-pointer"
                  >
                    Edit
                  </router-link>
                  <li
                    @click="deleteField(field)"
                    class="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const fields = ref([])
const openMenuId = ref(null) // Tracks which field's menu is open

// Fetch fields from API
const getFields = async () => {
  const { data } = await api().get(`/crm/modules/${route.params.id}/fields`)
  fields.value = data.data
}

// Toggle dropdown menu
const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

// Handle menu actions
const editField = (field) => {
  console.log('Edit', field)
  openMenuId.value = null
}
const deleteField = (field) => {
  console.log('Delete', field)
  openMenuId.value = null
}

const sections = computed(() => [
  {
    id: 'rapid',
    title: 'B. Account: 0_Rapid Actions',
    fields:fields.value.filter((f) => Number(f.order_group) == 1).reverse() || [],

  },
  {
    id: 'rapid-2',
    title: 'A. Industry & Market Segment',
    fields:fields.value.filter((f) => Number(f.order_group) == 2).reverse() || [],

  },
  {
    id: 'rapid-3',
    title: 'B. Account: 1_Detail Information',
     fields:fields.value.filter((f) => Number(f.order_group) == 3).reverse() || [],
  },
  {
    id: 'rapid-4',
    title: 'C. Account Review Status: 1_Contact Updates',
     fields:fields.value.filter((f) => Number(f.order_group) == 4).reverse() || [],
  },
  {
    id: 'rapid-5',
    title: 'C. Account Review Status: 2_Service Type',
     fields:fields.value.filter((f) => Number(f.order_group) == 5).reverse() || [],
  },
  {
    id: 'rapid-6',
    title: 'C. Account Review Status: 3_Engineering Sector',
    fields:fields.value.filter((f) => Number(f.order_group) == 6).reverse() || [],
  },
  {
    id: 'rapid-7',
    title: 'D. Sales Review Status:1_Software',
   fields:fields.value.filter((f) => Number(f.order_group) == 7).reverse() || [],
  },
  {
    id: 'rapid-8',
    title: 'D. Sales Review Status: 1_Software : Structure',
   fields:fields.value.filter((f) => Number(f.order_group) == 8).reverse() || [],
  },
  {
    id: 'rapid-9',
    title: 'D. Sales Review Status: 1_Software: SystemDynamics',
    fields:fields.value.filter((f) => Number(f.order_group) == 9).reverse() || [],
  },
  {
    id: 'rapid-10',
    title: 'D. Sales Review Status: 1_Software :Acoustics',
     fields:fields.value.filter((f) => Number(f.order_group) == 10).reverse() || [],
  },
  {
    id: 'rapid-11',
    title: 'D. Sales Review Status: 1_Software : Fluids',
    fields:fields.value.filter((f) => Number(f.order_group) == 11).reverse() || [],
  },
  {
    id: 'rapid-12',
    title: 'D. Sales Review Status: 1_Software : Autonomous',
     fields:fields.value.filter((f) => Number(f.order_group) == 12).reverse() || [],
  },
  {
    id: 'rapid-13',
    title: 'D. Sales Review Status: 1_Software : VM&C',
    fields:fields.value.filter((f) => Number(f.order_group) == 13).reverse() || [],
  },
  {
    id: 'rapid-14',
    title: 'D. Sales Review Status: 1_SoftwareICME (Materials)',
     fields:fields.value.filter((f) => Number(f.order_group) == 14).reverse() || [],
  },
  {
    id: 'rapid-15',
    title: 'D. Sales Review Status: 2_Engg Service: Design',
    fields:fields.value.filter((f) => Number(f.order_group) == 15).reverse() || [],
  },
  {
    id: 'rapid-16',
    title: 'D. Sales Review Status: 2_Engg Service : Analysis',
    fields:fields.value.filter((f) => Number(f.order_group) == 16).reverse() || [],
  },
  // {
  //   id: 'rapid-17',
  //   title: '',
  //   items: bottomGroup17.value || [],
  //   emptyItems: emptyBottomGroup17.value || [],
  // },
  {
    id: 'rapid-18',
    title: 'D. Sales Review Status: 3_Training',
    fields:fields.value.filter((f) => Number(f.order_group) == 18).reverse() || [],
  },
  {
    id: 'rapid-19',
    title: 'E. Contacts Details: 1_Accounts',
    fields:fields.value.filter((f) => Number(f.order_group) == 19).reverse() || [],
  },
  {
    id: 'rapid-20',
    title: 'E. Contacts Details: 1_Vendor',
    fields:fields.value.filter((f) => Number(f.order_group) == 20).reverse() || [],
  },
  {
    id: 'rapid-21',
    title: 'F. Sales Action: 1_General Activity',
     fields:fields.value.filter((f) => Number(f.order_group) == 21).reverse() || [],
  },
  {
    id: 'rapid-22',
    title: 'F. Sales Action: 2_Sales Executive Activity',
     fields:fields.value.filter((f) => Number(f.order_group) == 22).reverse() || [],
  },
  {
    id: 'rapid-23',
    title: 'F. Sales Action: 3_Senior Sales Activity',
    fields:fields.value.filter((f) => Number(f.order_group) == 23).reverse() || [],
  },
  {
    id: 'rapid-24',
    title: 'F. Sales Action: 4_VIP Sales Activity',
     fields:fields.value.filter((f) => Number(f.order_group) == 24).reverse() || [],
  },
  {
    id: 'rapid-25',
    title: 'G. Competitor Analysis: CS User List -3DS',
   fields:fields.value.filter((f) => Number(f.order_group) == 25).reverse() || [],
  },
])




onMounted(()=>{
  getFields()
})
</script>
