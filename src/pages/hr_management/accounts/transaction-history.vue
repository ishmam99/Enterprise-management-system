<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold text-gray-800">Transaction History</h1>
    <div class="bg-white rounded-xl shadow p-4">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="bg-gray-100 text-left text-xs font-semibold text-gray-600">
            <th class="px-3 py-2">Date</th>
            <th class="px-3 py-2">Type</th>
            <th class="px-3 py-2">Description</th>
            <th class="px-3 py-2">Amount</th>
            <th class="px-3 py-2">Balance</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="row in demoRows" :key="row.id" class="hover:bg-gray-50">
            <td class="px-3 py-2">{{ row.date }}</td>
            <td class="px-3 py-2">{{ row.type }}</td>
            <td class="px-3 py-2">{{ row.description }}</td>
            <td class="px-3 py-2">{{ row.amount }}</td>
            <td class="px-3 py-2">{{ row.balance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const demoRows = [
  { id: 1, date: '2026-01-20', type: 'Salary', description: 'January payroll', amount: '-$45,200', balance: '$120,000' },
  { id: 2, date: '2026-01-22', type: 'Donation', description: 'Community fund', amount: '+$10,000', balance: '$130,000' },
]
</script>


