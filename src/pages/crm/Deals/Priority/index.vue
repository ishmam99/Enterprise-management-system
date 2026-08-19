<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="mx-auto pb-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-4">
                <i class="ri-filter-2-line text-3xl font-bold text-gray-800"></i>
                <select class="select">
                    <option disabled selected>Contacts-ELH-ALL</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
            <h1>My Priority Deals : <span class="uppercase"> </span></h1>
            <div class="flex items-center space-x-4">
                <i class="ri-align-justify"></i>
                <router-link to="/create-account" class="btn btn-primary">
                        Create Deals
                    </router-link>
                <!-- <button class="btn btn-primary">
                    <select class="select bg-blue-200 text-black font-bold">
                        <option disabled selected>Create Leads</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                    </select>
                </button> -->
                <select class="select">
                    <option disabled selected>Actions</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
        </div>
        <div class="flex justify-between p-4 bg-slate-200">

            <p class="text-gray-600 mt-2">Total Records: <span class="font-bold">42,801</span></p>
            <div class="flex items-center space-x-4">
                <select class="select">
                    <option disabled selected>100 Records Per Page</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
                <p>1 - 100</p>
                <div class="flex items-center space-x-2">
                    <i class="ri-arrow-left-line"></i>
                    <i class="ri-arrow-right-line"></i>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="table">
    <thead>
        <tr>
            <th class="border-e-2">
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    Deal Name <i class="ri-equalizer-line"></i>
                </div>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    G01 Sales Executive Caller(SEC) <i class="ri-equalizer-line"></i>
                </div>
            </th>

            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    G04 Lead Sales Executive <i class="ri-equalizer-line"></i>
                </div>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    D29 Sales Executive Last Call Date <i class="ri-equalizer-line"></i>
                </div>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    Account Name <i class="ri-equalizer-line"></i>
                </div>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    D25 Sales Executive <i class="ri-equalizer-line"></i>
                </div>
            </th>
            <th class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    Stage <i class="ri-equalizer-line"></i>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Software License Renewal 2025</div>
                        <div class="text-sm opacity-50">#Deal-001</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Sarah Lee</td>
            <td class="border-b border-e-2">Marcus Bell</td>
            <td class="border-b border-e-2">2025-07-20</td>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Crimson Corp</div>
                        <div class="text-sm opacity-50">New York, USA</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Liam Chen</td>
            <td class="border-b border-e-2">Proposal Sent</td>
        </tr>
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">New Marketing Campaign</div>
                        <div class="text-sm opacity-50">#Deal-002</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Alex Sharma</td>
            <td class="border-b border-e-2">Priya Singh</td>
            <td class="border-b border-e-2">2025-07-18</td>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Amber Solutions</div>
                        <div class="text-sm opacity-50">London, UK</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Ravi Kumar</td>
            <td class="border-b border-e-2">Negotiation</td>
        </tr>
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Cloud Migration Project</div>
                        <div class="text-sm opacity-50">#Deal-003</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Jessica Wong</td>
            <td class="border-b border-e-2">Mark Davis</td>
            <td class="border-b border-e-2">2025-07-15</td>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Velvet Innovations</div>
                        <div class="text-sm opacity-50">Berlin, Germany</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Sophie Martin</td>
            <td class="border-b border-e-2">Discovery</td>
        </tr>
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Supply Chain Optimization</div>
                        <div class="text-sm opacity-50">#Deal-004</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Chris Evans</td>
            <td class="border-b border-e-2">Emily White</td>
            <td class="border-b border-e-2">2025-07-21</td>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">Global Logistics Inc.</div>
                        <div class="text-sm opacity-50">Tokyo, Japan</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Kenji Sato</td>
            <td class="border-b border-e-2">Qualification</td>
        </tr>
        <tr>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">New Partnership Agreement</div>
                        <div class="text-sm opacity-50">#Deal-005</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Olivia Brown</td>
            <td class="border-b border-e-2">Daniel Green</td>
            <td class="border-b border-e-2">2025-07-19</td>
            <td class="border-b border-e-2">
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">NovaCorp Solutions</div>
                        <div class="text-sm opacity-50">Sydney, Australia</div>
                    </div>
                </div>
            </td>
            <td class="border-b border-e-2">Jessica Parker</td>
            <td class="border-b border-e-2">Closed Won</td>
        </tr>
    </tbody>
</table>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* Additional custom styles if needed */
</style>
