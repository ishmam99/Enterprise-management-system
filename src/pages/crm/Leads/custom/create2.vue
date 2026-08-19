<template>
  <div class="w-full p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 class="text-2xl font-semibold mb-4">Create Custom View</h2>

      <!-- View Name -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">View Name</label>
        <input v-model="form.name" type="text" class="w-full border rounded-lg p-2" placeholder="Enter Custom View Name" />
      </div>

      <!-- Criteria Section -->
      <div class="bg-gray-100 rounded-xl p-6 border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Specify Criteria - "Accounts"</h3>
          <button class="text-blue-600 text-sm" @click="addCondition(rootGroup)">+ Add Condition</button>
        </div>

        <!-- Recursive Group Rendering -->
        <div>
          <div v-for="(cond, cIndex) in rootGroup.conditions" :key="cIndex" class="mb-3 bg-white p-3 rounded-lg shadow-sm border flex items-center gap-3">

            <!-- Field -->
            <select v-model="cond.field" class="border rounded-lg p-2 w-48">
              <option v-for="f in fields" :key="f" :value="f">{{ f }}</option>
            </select>

            <!-- Operator -->
            <select v-model="cond.operator" class="border rounded-lg p-2 w-40">
              <option v-for="op in operators" :key="op" :value="op">{{ op }}</option>
            </select>

            <!-- Value -->
            <input v-model="cond.value" type="text" class="border rounded-lg p-2 flex-1" />

            <button class="text-red-500" @click="removeCondition(rootGroup, cIndex)">✕</button>
          </div>
        </div>

        <!-- Add Logic Group -->
        <button class="text-blue-600 text-sm mt-2" @click="addGroup(rootGroup)">+ Add Group</button>

      </div>

      <!-- Save Button -->
      <div class="mt-6 flex justify-end">
        <button class="px-5 py-2 bg-blue-600 text-white rounded-lg" @click="savePayload">Save</button>
      </div>

      <!-- Output -->
      <div class="mt-6 bg-gray-900 text-white p-4 rounded-lg text-sm whitespace-pre-wrap">
        {{ JSON.stringify(form, null, 2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const fields = [
  'status', 'country', 'revenue', 'website'
]

const operators = [
  'is', 'contains', '>', '<', 'between', 'doesn\'t contain'
]

const form = reactive({
  name: '',
  module: 'accounts',
  root_group: {}
})

const rootGroup = reactive({
  join_type: 'AND',
  order: 0,
  conditions: [],
  groups: []
})

form.root_group = rootGroup

function addCondition(group) {
  group.conditions.push({
    field: fields[0],
    operator: operators[0],
    value: '',
    order: group.conditions.length
  })
}

function removeCondition(group, index) {
  group.conditions.splice(index, 1)
}

function addGroup(parentGroup) {
  parentGroup.groups.push({
    join_type: 'AND',
    order: parentGroup.groups.length,
    conditions: [],
    groups: []
  })
}

function savePayload() {
  console.log(JSON.stringify(form, null, 2))
}
</script>

<style scoped>
</style>