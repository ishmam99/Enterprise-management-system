<template>
  <div class="mx-auto py-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <i class="ri-filter-2-line text-3xl font-bold text-gray-800"></i>
        <select class="select">
          <option disabled selected>ELH-ALL</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
      </div>
      <h1>My Priority Leads(Lead Level) : <span class="uppercase"> {{ route.params.name }}</span></h1>
      <div class="flex items-center space-x-4">
        <i class="ri-align-justify"></i>
        <router-link to="/create-account" class="btn btn-primary">
                        Create Leads
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
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <th>Company</th>
        <th>001 Owner-Company</th>
        <th>M01 HTB GRP Industry Name</th>
        <th>002 Owner-Contract</th>
        <th>002 Owner-Email</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Hart Hagerty</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Technology</td>
        <td>Hart Hagerty</td>
        <td>hart.h@example.com</td>
        <td>Hagerty</td>
        <td>hart.h@example.com</td>
      </tr>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Brice Swyre</div>
              <div class="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          Carroll Group
          <br />
          <span class="badge badge-ghost badge-sm">Tax Accountant</span>
        </td>
        <td>Finance</td>
        <td>Brice Swyre</td>
        <td>brice.s@example.com</td>
        <td>Swyre</td>
        <td>brice.s@example.com</td>
      </tr>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Marjy Ferencz</div>
              <div class="text-sm opacity-50">Russia</div>
            </div>
          </div>
        </td>
        <td>
          Rowe-Schoen
          <br />
          <span class="badge badge-ghost badge-sm">Office Assistant I</span>
        </td>
        <td>Healthcare</td>
        <td>Marjy Ferencz</td>
        <td>marjy.f@example.com</td>
        <td>Ferencz</td>
        <td>marjy.f@example.com</td>
      </tr>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Yancy Tear</div>
              <div class="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </td>
        <td>
          Wyman-Ledner
          <br />
          <span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
        </td>
        <td>Non-profit</td>
        <td>Yancy Tear</td>
        <td>yancy.t@example.com</td>
        <td>Tear</td>
        <td>yancy.t@example.com</td>
      </tr>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Elara Vance</div>
              <div class="text-sm opacity-50">Canada</div>
            </div>
          </div>
        </td>
        <td>
          NovaCorp Solutions
          <br />
          <span class="badge badge-ghost badge-sm">Senior Sales Manager</span>
        </td>
        <td>Software</td>
        <td>Marcus Bell</td>
        <td>marcus.b@example.com</td>
        <td>Vance</td>
        <td>elara.v@example.com</td>
      </tr>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">

            <div>
              <div class="font-bold">Liam Chen</div>
              <div class="text-sm opacity-50">Australia</div>
            </div>
          </div>
        </td>
        <td>
          Global Logistics Inc.
          <br />
          <span class="badge badge-ghost badge-sm">Logistics Coordinator</span>
        </td>
        <td>Logistics</td>
        <td>Sarah Lee</td>
        <td>sarah.l@example.com</td>
        <td>Chen</td>
        <td>liam.c@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const fontainebleauData = ref([
  { host: 'Altouseruse Rebranding Renovations', resort: '' },
  { host: 'Wind Creek Wetumpka Hotel & Casino Renovations', resort: 'Fourth Band of Creek Indians' },
  { host: 'Sonesta Simply Suites - South Austin Renovation', resort: 'The RMR Group' },
  { host: 'Travelodge by Wyndham Santa Rosa Renovations', resort: 'Sun Hospitality, Inc.' },
  { host: 'Magnuson Hotel and Conference Center Tyler Renovations', resort: 'Magnuson Hotel and Conference Center Tyler' },
  { host: 'Silver Sevens Hotel and Casino Restaurant Remodel', resort: 'Silver Sevens Hotel & Casino' }
]);

const entertainmentData = ref([
  { category: 'Entertainment Leisure and Hospitality', website: 'http://www.hhandr.com' },
  { category: 'Entertainment Leisure and Hospitality', website: 'http://jcci-nnn.gov' },
  { category: 'Entertainment Leisure and Hospitality', website: 'https://www.rrrrrgroup.com' },
  { category: 'Entertainment Leisure and Hospitality', website: 'https://www.silversevenscasino.com' }
]);
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
