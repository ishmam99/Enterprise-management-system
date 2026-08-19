<template>
  <div class="w-full p-6">
    <Breadcrumb class="mb-4" />
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <label for="name">Name:</label>
      <input
        v-model="customView.name"
        placeholder="Enter Custom View Name"
        class="border border-gray-300 rounded-md px-4 py-2 w-80 focus:ring focus:ring-blue-200"
      />

      <div class="flex gap-2 ml-auto">
        <button
          @click="cancel"
          class="px-10 py-2 rounded-md border bg-red-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          @click="saveView"
          class="px-10 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          :disabled="isSaving"
        >
          <span v-if="!isSaving">Save</span>

          <!-- Loader spinner inside button -->
          <span
            v-else
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
        </button>
      </div>
    </div>

    <!-- Join type between root-level groups -->
    <!-- <div class="flex items-center gap-2 mb-4">
      <span class="text-gray-500 font-medium text-sm">Join type:</span>
        <select v-model="customView.root_group.join_type" class="border rounded px-2 py-1 text-sm">
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
    </div> -->

    <!-- Render root-level groups -->
    <div class="space-y-4 relative">
      <GroupBuilder
        v-for="(group, index) in customView.root_group.groups"
        :key="group.order"
        :group="group"
        :fields="fields"
        :groupIndex="index"
        :size="customView.root_group.groups.length"
        @add-group="addRootGroup"
        @remove-group="removeGroup(id, index)"
        @update="update(index)"
      />
    </div>

    <div class="mt-4 p-4 bg-gray-100 rounded text-gray-700 font-medium">
      Criteria: {{ criteriaString }}
    </div>
    <!-- <pre class="mt-4">{{ customView }}</pre>        -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import GroupBuilder from '@/components/customComponents/GroupBuilder.vue'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Swal from "sweetalert2";

const isSaving = ref(false)
const fields = ref([])
const criteriaString = ref('')
const customView = ref({
  name: '',
  module: 1,
  root_group: {
    join_type: 'AND', // join type between root-level groups
    order: 0,
    conditions: [], // root has no conditions
    groups: [
      {
        join_type: 'AND',
        order: 0,
        conditions: [{ field: null, operator: 'is', value: '', order: 0 }]
        // groups: []//
      }
    ]
  }
})

async function loadFields() {
  const { data } = await api().get(`/crm/modules/1/fields`)
  fields.value = data.data
}
const update = (index) => {
  console.log(index)
  customView.value.root_group.groups[index].join_type =
    customView.value.root_group.groups[index].join_type == 'AND' ? 'OR' : 'AND'
  getCriteriaString()
}
// Add new root-level group
function addRootGroup() {
  const newOrder = customView.value.root_group.groups.length
  customView.value.root_group.groups.push({
    join_type: 'AND',
    order: newOrder,
    conditions: [{ field: null, operator: 'is', value: '', order: 0 }]
    // groups: []/
  })
  getCriteriaString()
}
const removeGroup = (idx) => {
  customView.value.root_group.groups.splice(idx, 1)
  getCriteriaString()
}
async function saveView() {
  try {
  isSaving.value = true
    console.log(customView.value)
  await api().post('/crm/custom-views', customView.value)
      await Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Your custom view has been created successfully.",
      timer: 1500,
      showConfirmButton: false,
      
    });
    window.location.reload()
  } catch (error) {
    console.error('Error saving custom view:', error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error saving your custom view. Please try again.",
    });
  } finally {
    isSaving.value = false  
  }
}

const cancel = () => {
  window.location.reload()
}
// ✅ Build left-associative criteria string
const getCriteriaString = () => {
  const groups = customView.value.root_group.groups
  let counter = 1

  if (!groups.length) return ''

  // Start with first group
  let str = counter++
  groups.map((group, id) => {
    if (id + 1 < groups.length) str = `(${str} ${group.join_type} ${counter++})`
  })

  criteriaString.value = str
}

onMounted(() => loadFields())
</script>

<style scoped>
  @keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin .7s linear infinite;
}

</style>
