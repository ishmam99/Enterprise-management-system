<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold text-gray-800">Payments</h1>
    <div class="bg-white rounded-xl shadow p-4">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="bg-gray-100 text-left text-xs font-semibold text-gray-600">
            <th class="px-3 py-2">Ref</th>
            <th class="px-3 py-2">To</th>
            <th class="px-3 py-2">Method</th>
            <th class="px-3 py-2">Amount</th>
            <th class="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="row in demoRows" :key="row.id" class="hover:bg-gray-50">
            <td class="px-3 py-2">{{ row.ref }}</td>
            <td class="px-3 py-2">{{ row.to }}</td>
            <td class="px-3 py-2">{{ row.method }}</td>
            <td class="px-3 py-2">{{ row.amount }}</td>
            <td class="px-3 py-2">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="row.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'"
              >
                {{ row.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const demoRows = [
  { id: 1, ref: 'PAY-2026-001', to: 'Vendor A', method: 'Bank Transfer', amount: '$1,200', status: 'Completed' },
  { id: 2, ref: 'PAY-2026-002', to: 'Vendor B', method: 'Cheque', amount: '$900', status: 'Pending' },
]
</script>


