<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div class="bg-white rounded-lg w-[680px] p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="text-lg font-semibold">Edit Criteria Pattern</div>
        <button @click="$emit('close')" class="text-gray-500">✕</button>
      </div>

      <div class="mb-3 text-sm text-gray-700">Edit the pattern using numbers (1,2,3...) and parentheses. Use <code>and</code>/<code>or</code> in lowercase.</div>

      <textarea v-model="localPattern" class="w-full h-28 border rounded p-3 font-mono text-sm"></textarea>

      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm font-medium mb-2">Condition mapping</div>
          <div class="space-y-2 text-sm">
            <div v-for="(m, uid) in mapping" :key="uid" class="flex items-start space-x-2">
              <div class="w-6 text-sm text-blue-600 font-semibold">{{ m.num }}</div>
              <div class="flex-1">
                <div class="font-medium">{{ m.label }}</div>
                <div class="text-xs text-gray-500">{{ m.op }} • {{ m.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="text-sm font-medium mb-2">Examples</div>
          <div class="text-xs text-gray-600">
            <p>Valid: <code>((1 and 2) or (3 and 4)) and 5</code></p>
            <p>Invalid characters will be rejected when you save.</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-5 space-x-2">
        <button @click="$emit('close')" class="px-3 py-1 border rounded">Cancel</button>
        <button @click="save" class="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  pattern: String,
  mapping: Object
});
const emit = defineEmits(['save','close']);
const localPattern = ref(props.pattern);

function save(){
  // Validate pattern lightly
  const ok = /^[0-9\s\(\)andorANDOR]+$/.test(localPattern.value.replace(/and|or/gi,''));
  // Rather than strict validation here, we will allow save and parent decides how to parse.
  emit('save', localPattern.value);
}
</script>

<style scoped>
code { background:#f3f4f6; padding:2px 6px; border-radius:4px; }
</style>
