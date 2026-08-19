<template>
  <div class="flex items-center space-x-3">
    <!-- Field -->
    <select v-model="condition.field_id" @change="onFieldChange" class="border rounded px-2 py-1 w-56">
      <option value="" disabled>Select field</option>
      <option v-for="f in fields" :key="f.id" :value="f.id">{{ f.label }}</option>
    </select>

    <!-- Operator -->
    <select v-model="condition.operator" @change="onOperatorChange" class="border rounded px-2 py-1 w-40">
      <option v-for="op in availableOperators" :key="op.value" :value="op.value">{{ op.label }}</option>
    </select>

    <!-- Value input -->
    <template v-if="fieldType === 'text'">
      <input v-if="condition.operator !== 'between'" v-model="condition.value" class="border rounded px-2 py-1 w-80" placeholder="Value" />
      <div v-else class="flex space-x-2">
        <input type="date" v-model="condition.value[0]" class="border rounded px-2 py-1" />
        <input type="date" v-model="condition.value[1]" class="border rounded px-2 py-1" />
      </div>
    </template>

    <template v-if="fieldType === 'date'">
      <div v-if="condition.operator === 'between'" class="flex space-x-2">
        <input type="datetime-local" v-model="condition.value[0]" class="border rounded px-2 py-1" />
        <input type="datetime-local" v-model="condition.value[1]" class="border rounded px-2 py-1" />
      </div>
      <input v-else type="date" v-model="condition.value" class="border rounded px-2 py-1" />
    </template>

    <template v-if="fieldType === 'number'">
      <input v-if="condition.operator !== 'between'" v-model.number="condition.value" type="number" class="border rounded px-2 py-1 w-40" />
      <div v-else class="flex space-x-2">
        <input type="number" v-model.number="condition.value[0]" class="border rounded px-2 py-1" />
        <input type="number" v-model.number="condition.value[1]" class="border rounded px-2 py-1" />
      </div>
    </template>

    <template v-if="fieldType === 'picklist'">
      <select v-if="!isMultiSelect" v-model="condition.value" class="border rounded px-2 py-1">
        <option value="" disabled>Select</option>
        <option v-for="opt in fieldOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <select v-else v-model="condition.value" multiple class="border rounded px-2 py-1">
        <option v-for="opt in fieldOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </template>

    <!-- Remove -->
    <button @click="$emit('remove')" class="text-red-600 ml-2">✕</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  condition: Object,
  fields: Array
});
const emit = defineEmits(['update','remove']);

const fieldObj = computed(() => props.fields.find(f => f.id === props.condition.field_id) || null);
const fieldType = computed(() => fieldObj.value?.type || 'text');
const fieldOptions = computed(() => fieldObj.value?.options || []);
const isMultiSelect = computed(() => props.condition.operator === 'in' || props.condition.operator === 'contains_any');

const availableOperators = computed(() => {
  const type = fieldType.value;
  if (type === 'text') {
    return [
      { label: 'contains', value: 'contains' },
      { label: 'does not contain', value: 'does_not_contain' },
      { label: 'is', value: 'is' },
      { label: 'is not', value: 'is_not' },
      { label: 'starts with', value: 'starts_with' },
      { label: 'ends with', value: 'ends_with' },
      { label: 'between', value: 'between' }
    ];
  }
  if (type === 'date') {
    return [
      { label: 'is', value: 'is' },
      { label: 'before', value: 'before' },
      { label: 'after', value: 'after' },
      { label: 'between', value: 'between' }
    ];
  }
  if (type === 'number') {
    return [
      { label: '=', value: 'is' },
      { label: '!=', value: 'is_not' },
      { label: '>', value: '>' },
      { label: '<', value: '<' },
      { label: 'between', value: 'between' }
    ];
  }
  if (type === 'picklist') {
    return [
      { label: 'is', value: 'is' },
      { label: 'is not', value: 'is_not' },
      { label: 'in (multi)', value: 'in' },
      { label: 'contains any', value: 'contains_any' }
    ];
  }
  return [{ label: 'is', value: 'is' }];
});

function onFieldChange(){
  // init value based on operator/type
  if (props.condition.operator === 'between'){
    props.condition.value = ['', ''];
  } else {
    props.condition.value = '';
  }
  emit('update');
}

function onOperatorChange(){
  if (props.condition.operator === 'between'){
    if (!Array.isArray(props.condition.value)) props.condition.value = ['', ''];
  } else {
    if (Array.isArray(props.condition.value)) props.condition.value = '';
  }
  emit('update');
}
</script>

<style scoped>
/* small adjustments for multi-select look */
select[multiple] { min-width: 200px; max-height: 120px; }
</style>
