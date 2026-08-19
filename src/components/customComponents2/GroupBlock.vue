<template>
  <div class="relative group-block">
    <div class="flex items-start space-x-4">
      <!-- left vertical rail with numbered circles for each condition in this group -->
      <div class="w-10 flex flex-col items-center pt-2">
        <div v-for="(c, i) in group.conditions" :key="c.uid" class="w-8 h-8 rounded-full bg-white border text-sm flex items-center justify-center text-gray-700 mb-4 shadow-sm">
          {{ getIndex(c.uid) }}
        </div>

        <!-- if grouphas children show a blank circle to indicate group indentation -->
        <div v-for="ch in group.children" :key="ch.id" class="w-1 h-12 border-l border-gray-200 mt-2"></div>
      </div>

      <!-- group card -->
      <div class="flex-1 bg-white border rounded p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <span class="text-xs text-gray-500">Match records where</span>
            <div class="flex items-center space-x-2">
              <button :class="joinBtnClass('AND')" @click="setJoin('AND')" title="AND">AND</button>
              <button :class="joinBtnClass('OR')" @click="setJoin('OR')" title="OR">OR</button>
            </div>
          </div>

          <div class="text-sm text-gray-400">Group</div>
        </div>

        <!-- conditions -->
        <div class="space-y-3">
          <ConditionRow
            v-for="(cond, idx) in group.conditions"
            :key="cond.uid"
            :condition="cond"
            :fields="fields"
            @remove="removeCondition(idx)"
            @update="emitUpdate"
          />
        </div>

        <div class="mt-3 flex items-center space-x-2">
          <button @click="addCondition" class="px-3 py-1 bg-white border rounded text-sm text-gray-700 hover:bg-gray-50">+ Add Criteria</button>
          <button @click="addChildGroup" class="px-3 py-1 bg-blue-600 text-white rounded text-sm">+ Add Criteria Group</button>
        </div>

        <!-- children groups visually indented -->
        <div v-if="group.children.length" class="mt-4 border-l pl-4 ml-2">
          <GroupBlock v-for="child in group.children" :key="child.id" :group="child" :fields="fields" @update="emitUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ConditionRow from './ConditionRow.vue';

const props = defineProps({
  group: Object,
  fields: Array
});
const emit = defineEmits(['update']);

function emitUpdate(){ emit('update'); }

function addCondition(){
  props.group.conditions.push({
    uid: crypto.randomUUID(),
    field_id: null,
    operator: 'is',
    value: ''
  });
  emitUpdate();
}

function removeCondition(idx){
  props.group.conditions.splice(idx,1);
  emitUpdate();
}

function addChildGroup(){
  props.group.children.push({
    id: Date.now() + Math.random(),
    join_type: 'AND',
    conditions: [],
    children: []
  });
  emitUpdate();
}

function setJoin(type){
  props.group.join_type = type;
  emitUpdate();
}

function joinBtnClass(type){
  return [
    'px-2 py-1 rounded text-sm font-semibold',
    props.group.join_type === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
  ];
}

// mapping displayed numbers across tree must be consistent globally.
// We'll use a simple DFS numbering by exploring upward (parent doesn't exist here).
// For local display we can show index in order of creation.
function getIndex(uid){
  // simple approach: show small index based on scanning root provided via events would be ideal.
  // For now use last 4 char of uid for visual uniqueness, but in parent component patternText shows actual numbers.
  return String(uid).slice(-4).toUpperCase().replace(/[^0-9]/g, '').slice(0,2) || '●';
}
</script>

<style scoped>
.group-block { }
</style>
