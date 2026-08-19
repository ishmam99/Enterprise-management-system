<script setup lang="ts">

</script>

<template>
    <div class="bordered border p-5">
        <p class="text-xl text-center font-bold pb-4">My Order</p>
        <div class="px-1">
        <table class="table-auto text-sm w-full">
        <thead>
            <tr class="border-y">
            <th>Product</th>
            <th>Price</th>
            <th class="px-3">Qty</th>
            <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b">
            <td class="mr-2">Flat Hospitality TV</td>
            <td class="text-center">$500</td>
            <td class="text-center">2</td>
            <td>1000</td>
            </tr>
            <tr class="border-b">
            <td class="mr-2">Flat Hospitality TV</td>
            <td class="text-center">$500</td>
            <td class="text-center">2</td>
            <td>1000</td>
            </tr>
            <tr class="border-b">
            <td class="mr-2">Flat Hospitality TV</td>
            <td class="text-center">$500</td>
            <td class="text-center">2</td>
            <td>1000</td>
            </tr>
            <tr class="font-semibold">
            <td colspan="3">Total Amount</td>
            <td>$1000</td>
            </tr>
        </tbody>
        </table>
        <div class="mt-3">
        <div class="text-sm text-white py-2 text-center bg-[#2c9299] w-full rounded border-none hover:bg-slate-500 hover:shadow-lg cursor-pointer">
            Checkout
        </div>
        </div>
        </div>
    </div>
</template>