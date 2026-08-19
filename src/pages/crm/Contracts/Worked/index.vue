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
             <h1>My Worked Contract : <span class="uppercase"> </span></h1>
            <div class="flex items-center space-x-4">
                <i class="ri-align-justify"></i>
                <router-link to="/create-account" class="btn btn-primary">
                        Create Contacts
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
                                Account Name <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                First Name <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                Last Name
                                <select class="select select-bordered select-sm w-20 ml-2">
                                    <option disabled selected>All</option>
                                    <option>Crimson Corp</option>
                                    <option>Amber Solutions</option>
                                    <option>Velvet Innovations</option>
                                    <option>Global Logistics Inc.</option>
                                    <option>NovaCorp Solutions</option>
                                    <option>Wyman-Ledner</option>
                                    <option>Rowe-Schoen</option>
                                    <option>Carroll Group</option>
                                    <option>Zemlak, Daniel and Leannon</option>
                                </select>
                                <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                Title <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                Mobile <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                Phone <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                Email <i class="ri-equalizer-line"></i>
                            </div>
                        </th>
                        <th class="border-b border-e-2">
                            <div class="flex items-center gap-3">
                                D35 Target Level <i class="ri-equalizer-line"></i>
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
                        <td class="border-b">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold">Crimson Corp</div>
                                    <div class="text-sm opacity-50">New York, USA</div>
                                </div>
                            </div>
                        </td>
                        <td class="border-b">John</td>
                        <td class="border-b">Doe</td>
                        <td class="border-b">Sales Manager</td>
                        <td class="border-b">+1-555-123-4567</td>
                        <td class="border-b">+1-555-765-4321</td>
                        <td class="border-b">john.doe@crimsoncorp.com</td>
                        <td class="border-b">Tier 1</td>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td class="border-b">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold">Amber Solutions</div>
                                    <div class="text-sm opacity-50">London, UK</div>
                                </div>
                            </div>
                        </td>
                        <td class="border-b">Jane</td>
                        <td class="border-b">Smith</td>
                        <td class="border-b">Account Executive</td>
                        <td class="border-b">+44-20-7123-4567</td>
                        <td class="border-b">+44-20-7987-6543</td>
                        <td class="border-b">jane.smith@ambersolutions.com</td>
                        <td class="border-b">Tier 2</td>

                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td class="border-b">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold">Velvet Innovations</div>
                                    <div class="text-sm opacity-50">Berlin, Germany</div>
                                </div>
                            </div>
                        </td>
                        <td class="border-b">Peter</td>
                        <td class="border-b">Jones</td>
                        <td class="border-b">Marketing Specialist</td>
                        <td class="border-b">+49-30-1234-5678</td>
                        <td class="border-b">+49-30-8765-4321</td>
                        <td class="border-b">peter.jones@velvetinnovations.com</td>
                        <td class="border-b">Tier 1</td>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td class="border-b">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold">Global Logistics Inc.</div>
                                    <div class="text-sm opacity-50">Tokyo, Japan</div>
                                </div>
                            </div>
                        </td>
                        <td class="border-b">Maria</td>
                        <td class="border-b">Tanaka</td>
                        <td class="border-b">Logistics Coordinator</td>
                        <td class="border-b">+81-3-1234-5678</td>
                        <td class="border-b">+81-3-8765-4321</td>
                        <td class="border-b">maria.tanaka@globallogistics.jp</td>
                        <td class="border-b">Tier 3</td>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td class="border-b">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold">NovaCorp Solutions</div>
                                    <div class="text-sm opacity-50">Sydney, Australia</div>
                                </div>
                            </div>
                        </td>
                        <td class="border-b">David</td>
                        <td class="border-b">Miller</td>
                        <td class="border-b">Project Manager</td>
                        <td class="border-b">+61-2-1234-5678</td>
                        <td class="border-b">+61-2-8765-4321</td>
                        <td class="border-b">david.miller@novacorpsolutions.au</td>
                        <td class="border-b">Tier 2</td>
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
