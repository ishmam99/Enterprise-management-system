<template>
  <div class="flex h-screen bg-gray-50 pb-10 mt-2">
    <aside
      class="w-64 bg-slate-100/90 text-slate-700 shadow-xl  backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto">
      <button
        class="flex items-center w-full justify-center gap-2 mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg py-2 transition-all duration-300"
        title="Go back" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path
            d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z">
          </path>
        </svg>
        <span class="font-semibold text-sm">All Accounts</span>
      </button>

      <hr class="pb-6" />
      <div class="mb-6">
        Current Account: <br />
        {{lead?.values.find((e) => e.field?.name == 'company_name')?.value || 'N/A'}}
      </div>

      <ul class="space-y-1.5">
        <li v-for="(item, index) in sidebarItems" :key="index" class="transition-all border shadow rounded-lg duration-200">
          <button
            class="w-full text-left hover:px-2 py-2 rounded-lg flex px-2 items-center justify-between hover:bg-slate-700/70"
            :class="{ 'bg-blue-600 text-white px-2 shadow-md': activeSidebar === item.key }"
            @click="scrollToSection(item.key)">
            <span>{{ item.label }}</span>
            <span v-if="item.count" class="ml-2 text-xs font-medium bg-blue-500/80 text-white px-2 py-0.5 rounded-full">
              {{ item.count }}
            </span>
          </button>
        </li>
      </ul>
    </aside>

    <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <div class="bg-white shadow-sm px-8 py-5 border-b border-gray-200">
        <h1 class="text-3xl text-center border-b-2 py-1 mb-2 font-bold text-blue-600">
          Accounts Dashboard
        </h1>
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold">
            <p class="text-gray-600 mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2" />
              </svg>
              Company Name:
              {{lead?.values.find((e) => e.field?.name == 'company_name')?.value || 'N/A'}}
              <br />
            </p>
            <p class="text-gray-600 mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2" />
              </svg>
              Parent Company Name:
              {{lead?.values.find((e) => e.field?.name == 'parent_company')?.value || 'N/A'}}
            </p>
          </div>
          <div class="flex gap-2 flex-row-reverse">
            <!-- <div v-if="authStore.role == 'sales-director'"
              class="flex items-center justify-center font-semibold bg-red-700 text-white hover:bg-red-600 rounded-lg text-center px-4 py-2 transition-all duration-300">
              <button @click="deleteRecord()">Delete Account</button>
            </div>
            <div
              v-if="lead?.values.find((e) => e.field?.name == 'account_type_new')?.value == null || lead?.values.find((e) => e.field?.name == 'account_type_new')?.value == ''"
              class="flex items-center justify-center font-semibold bg-green-700 text-white hover:bg-green-600 rounded-lg text-center px-4 py-2 transition-all duration-300">
              <button @click="showConvertModal = true">Convert to Customer</button>
            </div>
            <div v-else-if="lead?.values.find((e) => e.field?.name == 'account_type_new')?.value == 'Customer'"
              class="flex items-center justify-center font-semibold bg-blue-700 text-white rounded-lg text-center px-4 py-2 transition-all duration-300">
              <p>Already Customer</p>
            </div> -->

            <button
              class="flex items-center bg-gray-700 text-white hover:bg-gray-500 rounded-lg px-4 py-2 transition-all duration-300"
              title="Go back" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z">
                </path>
              </svg>
              <span class="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      <!-- sections reuseable -->
      <div v-for="section in sections" :key="section.id" :id="section.id"
        class="bg-emerald-100 shadow-sm rounded-lg p-6 mx-8 my-6 border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
          <div class="bg-blue-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M13 9H21L11 24V15H4L13 0V9ZM11 11V7.22063L7.53238 13H13V17.3944L17.263 11H11Z" />
            </svg>
          </div>
          {{ section.title }}
        </h2>

        <div class="space-y-4 text-sm">
          <div class="bg-white rounded-b-xl shadow-md border border-gray-200 p-6">
            <!-- LOADING -->
            <div v-if="isLoading" class="flex justify-center items-center min-h-[30vh]">
              <svg class="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span class="ml-3 text-gray-600 font-medium">
                Loading record details...
              </span>
            </div>

            <!-- DATA -->
            <div v-else class="grid md:grid-cols-5 gap-6">
              <!-- FILLED -->
              <div v-for="item in section.items" :key="item.id"
                class="flex flex-col bg-gradient-to-r from-emerald-50 to-indigo-50 border border-gray-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-semibold text-emerald-700 mb-1">
                      {{ item.field.label }}
                    </p>
                  </div>

                  <!-- <div class="flex gap-2">
                    <button v-if="editingId !== item.id" class="text-emerald-600 hover:text-emerald-800 transition"
                      title="Edit" @click="startEdit(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                        fill="currentColor">
                        <path
                          d="M16.7574 2.99678L9.29145 10.4627L9.29886 14.7099L13.537 14.7024L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z" />
                      </svg>
                    </button>

                    <button v-else class="text-red-500 hover:text-red-700 transition font-bold" title="Cancel"
                      @click="cancelEdit">
                      ✕
                    </button>
                  </div> -->
                </div>

                <div v-if="editingId !== item.id" class="mt-1">
                  <div class="mt-1">
                    <template v-if="item.field.type === 'checkbox'">
                      <template v-if="item.value === 'true'">
                        <label class="flex items-center gap-3">
                          <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
                            checked disabled />
                          <span class="text-sm font-medium text-gray-700"> Checked </span>
                        </label>
                      </template>

                      <template v-else>
                        <p class="text-emerald-500 text-lg font-medium">—</p>
                      </template>
                    </template>
                    <template v-else>
                      <p class="text-gray-900 text-lg font-medium break-words">
                        {{ item.value || '—' }}
                      </p>
                    </template>

                  </div>
                </div>

                <div v-else class="mt-2 space-y-3">
                  <div>
                    <input v-if="item.field.type === 'text'" v-model="editValue" type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400" />

                    <input v-else-if="item.field.type === 'date'" v-model="editValue" type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400" />
                    <label v-else-if="item.field.type === 'checkbox'" class="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" v-model="editValue"
                        class="form-checkbox h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-400" />

                      <span class="text-sm font-medium text-gray-700">
                        {{ editValue ? 'Checked' : 'Unchecked' }}
                      </span>
                    </label>

                    <select v-else-if="item.field.type === 'select'" v-model="editValue"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400">
                      <option disabled value="">Select option</option>
                      <option v-for="(opt, i) in item.field.options" :key="i" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button
                      class="px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      @click="cancelEdit">
                      Cancel
                    </button>
                    <button @click="saveEdit(item)"
                      class="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
                      :disabled="saving">
                      <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>{{ saving ? 'Saving...' : 'Save' }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- EMPTY -->
              <div v-for="field in section.emptyItems" :key="field.id"
                class="flex flex-col bg-white/40 border border-slate-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all">
                <template v-if="editingEmptyFieldId !== field.id">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="text-sm font-semibold text-gray-700 mb-1">
                        {{ field.label }}
                      </p>
                    </div>
                    <button class="text-emerald-600 hover:text-emerald-800 transition" title="Add Value"
                      @click="startEditEmpty(field)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                        fill="currentColor">
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="mt-1">
                    <p class="text-emerald-500 text-lg font-medium break-words">—</p>
                  </div>
                </template>

                <template v-else>
                  <div class="flex justify-between items-start">
                    <p class="text-sm font-semibold text-indigo-700 mb-1">
                      {{ field.label }}
                    </p>
                    <button class="text-red-500 hover:text-red-700 transition font-bold" title="Cancel"
                      @click="cancelEdit">
                      ✕
                    </button>
                  </div>
                  <div class="mt-2 space-y-3">
                    <div>
                      <!-- {{field.type}} -->
                      <input v-if="['text', 'email', 'number'].includes(field.type)" v-model="editValue"
                        :type="field.type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        :placeholder="`Enter ${field.label}`" />

                      <input v-else-if="field.type === 'date'" v-model="editValue" type="date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400" />

                      <label v-else-if="field.type === 'checkbox'" class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" v-model="editValue"
                          class="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-400" />
                        <span class="text-sm font-medium text-gray-700">
                          {{ editValue ? 'Checked' : 'Unchecked' }}
                        </span>
                      </label>

                      <select v-else-if="field.type === 'select'" v-model="editValue"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400">
                        <option value="" disabled>Select {{ field.label }}</option>
                        <option v-for="(opt, i) in field.options" :key="i" :value="opt">
                          {{ opt }}
                        </option>
                      </select>
                    </div>
                    <div class="flex justify-end gap-2">
                      <button
                        class="px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        @click="cancelEdit">
                        Cancel
                      </button>
                      <button @click="saveNewValue(field)"
                        class="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
                        :disabled="saving">
                        <svg v-if="saving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                          fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>{{ saving ? 'Saving...' : 'Save' }}</span>
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="!isLoading && singleLeads.length === 0" class="text-center py-12 text-gray-500">
              No data found for this record.
            </div>
          </div>
        </div>
      </div>

      <!-- All Sections Content -->
      <main class="px-8 pb-10 flex-1 space-y-6">
        <!--Marketing Notes Section -->
        <section id="Marketing-Notes"
          class="bg-orange-100/70 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              Martking Notes
            </h2>

            <div @click="addNotes"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ showForm ? 'Cancel' : 'Add Markting Notes' }}
            </div>
          </div>

          <!-- ✅ Notes list (show when form hidden) -->
          <div v-if="!showForm" class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th class="px-6 py-4 text-left border-x font-bold text-emerald-700 uppercase tracking-wider">
                      #
                    </th>
                    <th v-for="field in marketingNotesFieldsData" :key="field.id"
                      class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Notes...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="marketingNotesFieldsData?.length == 0" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Notes found</h3>
                          <p class="text-gray-500 mb-4">Get started by creating your first Notes</p>
                          <div @click="addNotes"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v16m8-8H4" />
                            </svg>
                            {{ showForm ? 'Cancel' : 'Add Notes' }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in marketingNotesData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ index + 1 }}
                    </td>
                    <td v-for="field in marketingNotesFieldsData" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-accounts-accountsDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>

                      <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else
            class="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]">
            <h2
              class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight">
              ✨ Create New Marketing Notes
            </h2>

            <div class="w-full gap-6">
              <div v-for="field in visibleFields" :key="field.id"
                class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <label class="block font-semibold mb-2 text-gray-700">
                  {{ field.label }}
                </label>

                <input v-if="['text', 'email', 'number'].includes(field.type)" v-model="form[field.name]"
                  :type="field.type"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
                  :placeholder="`Enter ${field.label}`" />

                <select v-else-if="field.type === 'select'" v-model="form[field.name]"
                  class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white">
                  <option value="" disabled selected>Select {{ field.label }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt" class="capitalize">
                    {{ opt }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 my-4">
              <!-- Save Button -->
              <button :disabled="loading"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 w-1/4 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                @click="saveMarketingNoteRecord">
                <span v-if="loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </span>
                <span v-else>Save</span>
              </button>

              <!-- Add Notes / Cancel Button -->
              <div @click="addNotes"
                class="px-6 py-3 rounded-lg flex items-center w-1/4 justify-center gap-2 cursor-pointer text-white font-medium shadow-md hover:shadow-lg transition-all"
                :class="showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="showForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'" />
                </svg>
                {{ showForm ? 'Cancel' : 'Add Notes' }}
              </div>
            </div>
          </div>
        </section>

        <!-- Email Section -->
        <section id="email"
          class="bg-pink-100/70 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              Marketing Email
            </h2>

            <div @click="addEmail"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ emailShowForm ? 'Cancel' : 'Add Marketing Email' }}
            </div>
          </div>

          <!-- Email list (show when form hidden) -->
          <div v-if="!emailShowForm" class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="emailLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th class="px-6 py-4 text-left border-x font-bold text-emerald-700 uppercase tracking-wider">
                      #
                    </th>
                    <th v-for="field in emailFieldsData" :key="field.id"
                      class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="emailLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Emails...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="emailData?.length == 0" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Emails found</h3>
                          <p class="text-gray-500 mb-4">Get started by creating your first Email</p>
                          <div @click="addEmail"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v16m8-8H4" />
                            </svg>
                            Add Email
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in emailData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ index + 1 }}
                    </td>
                    <td v-for="field in emailFieldsData" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-accounts-accountsDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Email Create Form -->
          <div v-else
            class="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]">
            <h2
              class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight">
              ✨ Create New Email
            </h2>

            <div class="w-full gap-6">
              <div v-for="field in emailFieldsData" :key="field.id"
                class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <label class="block font-semibold mb-2 text-gray-700">
                  {{ field.label }}
                </label>

                <input v-if="['text', 'email', 'number'].includes(field.type)" v-model="emailForm[field.name]"
                  :type="field.type"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
                  :placeholder="`Enter ${field.label}`" />

                <input v-else-if="field.type === 'date'" v-model="emailForm[field.name]" type="date"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none" />

                <select v-else-if="field.type === 'select'" v-model="emailForm[field.name]"
                  class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white">
                  <option value="" disabled selected>Select {{ field.label }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt" class="capitalize">
                    {{ opt }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 my-4">
              <button :disabled="emailLoading"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 w-1/4 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                @click="saveEmailRecord">
                <span v-if="emailLoading" class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </span>
                <span v-else>Save</span>
              </button>

              <div @click="addEmail"
                class="px-6 py-3 rounded-lg flex items-center w-1/4 justify-center gap-2 cursor-pointer text-white font-medium shadow-md hover:shadow-lg transition-all"
                :class="emailShowForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="emailShowForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'" />
                </svg>
                {{ emailShowForm ? 'Cancel' : 'Add Marketing Email' }}
              </div>
            </div>
          </div>
        </section>
        <!-- Phone Section -->
        <section id="phone"
          class="bg-yellow-100/70 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              Marketing Phone
            </h2>

            <div @click="addPhone"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ phoneShowForm ? 'Cancel' : 'Add Marketing Phone' }}
            </div>
          </div>

          <!-- Phone list (show when form hidden) -->
          <div v-if="!phoneShowForm" class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="phoneLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th class="px-6 py-4 text-left border-x font-bold text-emerald-700 uppercase tracking-wider">
                      #
                    </th>
                    <th v-for="field in phoneFieldsData" :key="field.id"
                      class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="phoneLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Phones...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="phoneData?.length == 0" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Phones found</h3>
                          <p class="text-gray-500 mb-4">Get started by creating your first Phone</p>
                          <div @click="addPhone"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v16m8-8H4" />
                            </svg>
                            Add Marketing Phone
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in phoneData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ index + 1 }}
                    </td>
                    <td v-for="field in phoneFieldsData" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-accounts-accountsDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Phone Create Form -->
          <div v-else
            class="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]">
            <h2
              class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight">
              ✨ Create New Phone
            </h2>

            <div class="w-full gap-6">
              <div v-for="field in phoneFieldsData" :key="field.id"
                class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <label class="block font-semibold mb-2 text-gray-700">
                  {{ field.label }}
                </label>

                <input v-if="['text', 'email', 'number'].includes(field.type)" v-model="phoneForm[field.name]"
                  :type="field.type"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
                  :placeholder="`Enter ${field.label}`" />

                <input v-else-if="field.type === 'date'" v-model="phoneForm[field.name]" type="date"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none" />

                <select v-else-if="field.type === 'select'" v-model="phoneForm[field.name]"
                  class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white">
                  <option value="" disabled selected>Select {{ field.label }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt" class="capitalize">
                    {{ opt }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 my-4">
              <button :disabled="phoneLoading"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 w-1/4 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                @click="savePhoneRecord">
                <span v-if="phoneLoading" class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </span>
                <span v-else>Save</span>
              </button>

              <div @click="addPhone"
                class="px-6 py-3 rounded-lg flex items-center w-1/4 justify-center gap-2 cursor-pointer text-white font-medium shadow-md hover:shadow-lg transition-all"
                :class="phoneShowForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="phoneShowForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'" />
                </svg>
                {{ phoneShowForm ? 'Cancel' : 'Add Phone' }}
              </div>
            </div>
          </div>
        </section>

        <!-- Notes Section -->
        <section id="notes"
          class="bg-cyan-100/70 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              Notes
            </h2>

            <!-- <div @click="addNotes"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ showForm ? 'Cancel' : 'Add Notes' }}
            </div> -->
          </div>

          <!-- ✅ Notes list (show when form hidden) -->
          <div v-if="!showForm" class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th class="px-6 py-4 text-left border-x font-bold text-emerald-700 uppercase tracking-wider">
                      #
                    </th>
                    <th v-for="field in notesFieldsData" :key="field.id"
                      class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Notes...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="notesFieldsData?.length == 0" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Notes found</h3>
                          <p class="text-gray-500 mb-4">Get started by creating your first Notes</p>
                          <div @click="addNotes"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v16m8-8H4" />
                            </svg>
                            {{ showForm ? 'Cancel' : 'Add Notes' }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in notesData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ index + 1 }}
                    </td>
                    <td v-for="field in notesFieldsData" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-accounts-accountsDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>

                      <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else
            class="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]">
            <h2
              class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight">
              ✨ Create New Notes
            </h2>

            <div class="w-full gap-6">
              <div v-for="field in visibleFields" :key="field.id"
                class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <label class="block font-semibold mb-2 text-gray-700">
                  {{ field.label }}
                </label>

                <input v-if="['text', 'email', 'number'].includes(field.type)" v-model="form[field.name]"
                  :type="field.type"
                  class="border border-slate-300 rounded-lg p-2 py-6 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
                  :placeholder="`Enter ${field.label}`" />

                <select v-else-if="field.type === 'select'" v-model="form[field.name]"
                  class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white">
                  <option value="" disabled selected>Select {{ field.label }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt" class="capitalize">
                    {{ opt }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 my-4">
              <!-- Save Button -->
              <button :disabled="loading"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 w-1/4 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                @click="saveRecord">
                <span v-if="loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </span>
                <span v-else>Save</span>
              </button>

              <!-- Add Notes / Cancel Button -->
              <div @click="addNotes"
                class="px-6 py-3 rounded-lg flex items-center w-1/4 justify-center gap-2 cursor-pointer text-white font-medium shadow-md hover:shadow-lg transition-all"
                :class="showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="showForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'" />
                </svg>
                {{ showForm ? 'Cancel' : 'Add Notes' }}
              </div>
            </div>
          </div>
        </section>

        <!-- Deal Section -->
        <section id="deals"
          class="bg-purple-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <div class="flex gap-2 items-start">
              <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <div class="bg-purple-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Deals
              </h2>
              <select v-model="perPage" @change="fetchDeals(1)"
                class="border border-gray-300 rounded-lg px-10 py-1.5 bg-white focus:ring-2 focus:ring-emerald-400">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </div>
            <!-- <router-link :to="`/marketing/Accounts/createDeal?parent_id=${route.params.id}&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
              }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
              }`" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Deal
            </router-link> -->
          </div>

          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th
                      class="px-6 py-4 text-left border-x text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      <span class="font-bold text-lg">#</span>
                    </th>
                    <th v-for="field in dealFields" :key="field.id"
                      class="px-6 py-4 text-nowrap text-left text-xs border-x font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.label }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Deals...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="dealsData != null && dealsData.length == 0"
                    class="hover:bg-emerald-50 transition-colors">
                    <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Deals found</h3>
                          <p class="text-gray-500 mb-4">Get started by creating your first Deals</p>
                          <!-- <router-link :to="`/marketing/Accounts/createDeal?parent_id=${route.params.id
                            }&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
                            }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
                            }`"
                            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                            <Icon name="material-symbols:add" class="w-5 h-5" />
                            + Create Deal
                          </router-link> -->
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in dealsData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 border-e whitespace-nowrap">
                      <span class="font-semibold">{{ index + 1 }}</span>
                    </td>
                    <td v-for="field in dealFields" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap border-e text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-deals-dealDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination for Deals -->
            <div v-if="dealsTotalPages > 1 || dealsTotalRecords"
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <div class="flex items-center gap-2">
                <button @click="goToDealsPage(dealsCurrentPage - 1)" :disabled="dealsCurrentPage === 1"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z">
                    </path>
                  </svg>
                  Prev
                </button>

                <span class="px-3 py-1.5 text-sm text-gray-600">
                  Page {{ dealsCurrentPage }} of {{ dealsTotalPages }}
                </span>

                <button @click="goToDealsPage(dealsCurrentPage + 1)" :disabled="dealsCurrentPage === dealsTotalPages"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Contacts Section -->
        <section id="contacts"
          class="bg-cyan-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <div class="flex gap-2 items-start">
              <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <div class="bg-sky-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z">
                    </path>
                  </svg>
                </div>
                Contacts
              </h2>
              <select v-model="contactPerPage" @change="fetchContacts(1)"
                class="border border-gray-300 rounded-lg px-10 py-1.5 bg-white focus:ring-2 focus:ring-emerald-400">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </div>
            <router-link :to="`/marketing/accounts/createContacts?parent_id=${route.params.id
              }&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
              }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
              }`" class="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Contacts
            </router-link>
          </div>

          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 table-zebra">
                <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <tr>
                    <th
                      class="px-6 py-4 text-left border-x text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      <span class="text-lg font-semibold">#</span>
                    </th>
                    <th v-for="field in contactFields" :key="field.id"
                      class="px-6 py-4 text-nowrap text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider">
                      {{ field.label }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                        <span class="text-lg">Loading Contacts...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="recordsData?.length == 0" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center gap-4">
                        <div class="relative">
                          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                          </div>
                          <div
                            class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">
                            No Contacts found
                          </h3>
                          <p class="text-gray-500 mb-4">
                            Get started by creating your first Contact
                          </p>
                          <router-link :to="`/marketing/accounts/createContacts?parent_id=${route.params.id
                            }&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
                            }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
                            }`"
                            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                            <Icon name="material-symbols:add" class="w-5 h-5" />
                            + Create Contact
                          </router-link>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(lead, index) in recordsData" :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <td class="px-6 py-4 whitespace-nowrap border-e">
                      <span class="font-semibold text-sm">{{ index + 1 }}</span>
                    </td>
                    <td v-for="field in contactFields" :key="field.id"
                      class="px-6 py-4 whitespace-nowrap border-e text-sm text-gray-600 font-medium">
                      <router-link :to="{
                        name: 'marketing-contact-contactDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>

                      <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination for Contacts -->
            <div v-if="contactsTotalPages > 1 || contactsTotalRecords"
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <div class="flex items-center gap-2">
                <button @click="goToContactsPage(contactsCurrentPage - 1)" :disabled="contactsCurrentPage === 1"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z">
                    </path>
                  </svg>
                  Prev
                </button>

                <span class="px-3 py-1.5 text-sm text-gray-600">
                  Page {{ contactsCurrentPage }} of {{ contactsTotalPages }}
                </span>

                <button @click="goToContactsPage(contactsCurrentPage + 1)"
                  :disabled="contactsCurrentPage === contactsTotalPages"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>

    <!-- Convert to Customer Modal -->
    <div v-if="showConvertModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Convert to Customer</h2>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Select Company
          </label>
          <select v-model="selectedCompanyId"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            <option value="" disabled>-- Select a company --</option>
            <option v-for="company in companies" :key="company.id" :value="company.id">
              {{ company.name }}
            </option>
          </select>
        </div>

        <div class="flex gap-3">
          <button @click="showConvertModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Cancel
          </button>
          <button @click="proceedConvertToCustomer()" :disabled="!selectedCompanyId || convertLoading"
            class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <span v-if="convertLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Saving...
            </span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
authStore.sidebarOpen = false

const showModal = ref(false)
const showModal2 = ref(false)
const showConvertModal = ref(false)
const selectedCompanyId = ref('')
const convertLoading = ref(false)
const tabs = ['Overview']
const overviewTab = ref('Overview')

const singleLeads = ref([])
const editingId = ref(null)
const editingEmptyFieldId = ref(null)
const editValue = ref('')
const saving = ref(false)

const fetchSingleLeads = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-values/${route.params.id}`)
    singleLeads.value = data.values || []
  } catch (err) {
    console.error('Error fetching leads:', err)
  } finally {
    isLoading.value = false
  }
}

const startEdit = (item) => {
  editingId.value = item.id
  editingEmptyFieldId.value = null
  editValue.value = item.value || ''
}

const startEditEmpty = (field) => {
  editingEmptyFieldId.value = field.id
  editingId.value = null
  editValue.value = ''
}

const cancelEdit = () => {
  editingId.value = null
  editingEmptyFieldId.value = null
  editValue.value = ''
}

const saveEdit = async (item) => {
  saving.value = true
  try {
    await api().post(`/crm/record-values/${item.id}`, {
      value: editValue.value,
      _method: 'PUT'
    })

    if (lead.value && lead.value.values) {
      const index = lead.value.values.findIndex((v) => v.id === item.id)
      if (index !== -1) {
        lead.value.values[index].value = editValue.value
      }
    }


    cancelEdit()
    showToast('Value updated successfully!')
  } catch (err) {
    console.error('Failed to update:', err)
    showToast('Failed to update value', 'error')
  } finally {
    saving.value = false
  }
}

const saveNewValue = async (field) => {
  saving.value = true
  try {
    const { data: newRecordValue } = await api().post(`/crm/create-values/${route.params.id}`, {
      field_id: field.id,
      value: editValue.value
    })

    if (lead.value && lead.value.values && newRecordValue.data) {
      const newEntry = {
        ...newRecordValue.data,
        field: field
      }
      lead.value.values.push(newEntry)
      showToast('Value added successfully!')
    }

    cancelEdit()
  } catch (err) {
    console.error('Failed to create value:', err)
    showToast('Failed to add value', 'error')
  } finally {
    saving.value = false
  }
}

const sidebarItems = [
  { key: 'overview', label: 'Company Details' },
  { key: 'rapid', label: 'Account Details' },
  { key: 'Marketing-Notes', label: 'Marketing Notes' },
  { key: 'email', label: 'Marketing Email' },
  { key: 'phone', label: 'Marketing Phone' },
  { key: 'notes', label: 'Notes' },
  { key: 'deals', label: 'Deals' },
  { key: 'contacts', label: 'Contacts' }
]

const activeSidebar = ref('overview')

const scrollToSection = (sectionId) => {
  activeSidebar.value = sectionId
  const element = document.getElementById(sectionId)
  const container = document.querySelector('.flex-1.flex.flex-col.overflow-y-auto')

  if (element && container) {
    const headerOffset = 100
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset

    container.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    element.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-70')
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-70')
    }, 2000)
  }
}

const goBack = () => {
  router.back()
}
const isLoading = ref(true)
const perPage = ref(20)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

const lead = ref()
const fields = ref([])
const companies = ref([])
const contactFields = ref([])
const dealFields = ref([])

const fetchCompanies = async () => {
  const { data } = await api().get('/companies')
  companies.value = data.data
}

const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/1/fields')
  fields.value = data.data
}
const fetchDealFields = async () => {
  const { data } = await api().get('/crm/modules/5/fields')
  dealFields.value = data.data.sort((a, b) => {
    if (a.order !== null && b.order !== null) {
      return a.order - b.order
    }
    if (a.order === null && b.order !== null) {
      return 1
    }
    if (a.order !== null && b.order === null) {
      return -1
    }
    return 0
  })
}
const fetchContactFields = async () => {
  const { data } = await api().get('/crm/modules/3/fields')
  contactFields.value = data.data
}
const fetchLead = async (page = 1) => {
  try {
    isLoading.value = true

    const { data } = await api().get(`/crm/modules/2/records/${route.params.id}`)
    lead.value = data.data

    // LEAD API HEHE

  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const topGroup = computed(() => {
  return lead.value?.values?.filter((item) => Number(item.field.order_group) == 0) || []
})

const bottomGroup = computed(() => {
  return lead.value?.values?.filter((item) => Number(item.field.order_group) == 0) || []
})



const emptyFields = computed(() => {
  const filledFieldIds = lead.value?.values.map((v) => Number(v.field_id)) || []
  return fields.value?.filter((f) => !filledFieldIds.includes(Number(f.id))) || []
})

const emptyTopGroup = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) === 0)
})

const emptyBottomGroup = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) === 1)
})

const emptyBottomGroup2 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 2)
})
const emptyBottomGroup3 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 3)
})
const emptyBottomGroup4 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 4)
})
const emptyBottomGroup5 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 5)
})
const emptyBottomGroup6 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 6)
})
const emptyBottomGroup7 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 7)
})
const emptyBottomGroup8 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 8)
})
const emptyBottomGroup9 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 9)
})
const emptyBottomGroup10 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 10)
})
const emptyBottomGroup11 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 11)
})
const emptyBottomGroup12 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 12)
})
const emptyBottomGroup13 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 13)
})
const emptyBottomGroup14 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 14)
})
const emptyBottomGroup15 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 15)
})
const emptyBottomGroup16 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 16)
})
const emptyBottomGroup18 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 18)
})
const emptyBottomGroup19 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 19)
})
const emptyBottomGroup20 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 20)
})
const emptyBottomGroup21 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 21)
})
const emptyBottomGroup22 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 22)
})
const emptyBottomGroup23 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 23)
})
const emptyBottomGroup24 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 24)
})
const emptyBottomGroup25 = computed(() => {
  return emptyFields.value.filter((f) => Number(f.order_group) == 25)
})

const sections = computed(() => [
  {
    id: 'rapid',
    title: 'Account Details',
    items: bottomGroup.value || [],
    emptyItems: emptyBottomGroup.value || [],
  },

])

const convertToCustomer = async () => {
  // This function is now replaced with proceedConvertToCustomer
  // but keeping it for backward compatibility
}

const proceedConvertToCustomer = async () => {
  const field = fields.value.find(f => f.name === "account_type_new")
  const getVal = (name) => lead.value.values.find(v => v.field?.name === name)?.value || ''

  const companyName = getVal('company_name')
  const email = getVal('email')

  if (!field) {
    console.error("account_type_new field not found")
    return
  }
  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Email not found. Customer must have an email.",
      timer: 1500,
      showConfirmButton: false
    })
    return
  }

  if (!selectedCompanyId.value) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Please select a company.",
      timer: 1500,
      showConfirmButton: false
    })
    return
  }

  const existing = lead.value.values.find(v => v.field?.name === "account_type_new")

  try {
    const { isConfirmed } = await Swal.fire({
      title: "Convert to Customer?",
      text: "This account will be converted to a Customer and added to the customer database.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, convert"
    })

    if (!isConfirmed) return

    convertLoading.value = true

    // 1. Update the CRM Status
    if (existing) {
      await api().post(`/crm/record-values/${existing.id}`, {
        value: "Customer",
        _method: "PUT"
      })
      existing.value = "Customer"
    } else {
      const { data } = await api().post(`/crm/create-values/${route.params.id}`, {
        field_id: field.id,
        value: "Customer"
      })
      lead.value.values.push({ ...data.data, field: field })
    }

    // 2. Construct Address
    const addressParts = [
      getVal('billing_street'),
      getVal('billing_state'),
      getVal('billing_city'),
      getVal('billing_country'),
      getVal('billing_code')
    ].filter(part => part.trim() !== '')

    // 3. Prepare Payload with company_id
    const customerPayload = {
      name: companyName,
      record_id: route.params.id,
      email: email,
      company_name: companyName,
      address: addressParts.join(', '),
      company_id: parseInt(selectedCompanyId.value)
    }

    // 4. Post to /customers
    await api().post('/customers', customerPayload)

    // 5. Success UI
    Swal.fire({
      icon: "success",
      title: "Converted!",
      text: "Account is now a customer.",
      timer: 1500,
      showConfirmButton: false
    })

    showConvertModal.value = false
    selectedCompanyId.value = ''
    fetchLead() // Refresh data

  } catch (err) {
    console.error(err)
    Swal.fire("Error", "Failed to convert or sync customer", "error")
  } finally {
    convertLoading.value = false
  }
}

const recordsData = ref([])
const contactPerPage = ref(10)
const fetchContacts = async (page = 1) => {
  try {
    isLoading.value = true
    const res = await api().get(
      `/crm/record-child-get/${route.params.id}/Accounts-Contacts`,
      {
        params: {
          page,
          per_page: contactPerPage.value
        }
      }
    )

    const pagination = res.data.data

    recordsData.value = pagination
    contactsCurrentPage.value = pagination.current_page
    contactsTotalPages.value = pagination.last_page
    contactsTotalRecords.value = pagination.total
    contactPerPage.value = pagination.per_page
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const goToDealsPage = (page) => {
  if (page < 1 || page > dealsTotalPages.value) return
  fetchDeals(page)
}

const goToContactsPage = (page) => {
  if (page < 1 || page > contactsTotalPages.value) return
  fetchContacts(page)
}

const dealsData = ref([])
const dealsPerPage = ref(10)
const totalPages = ref(1)
const currentPage = ref(1)
const totalRecords = ref(0)

const dealsTotalPages = ref(1)
const dealsCurrentPage = ref(1)
const dealsTotalRecords = ref(0)

const contactsTotalPages = ref(1)
const contactsCurrentPage = ref(1)
const contactsTotalRecords = ref(0)

const fetchDeals = async (page = 1) => {
  try {
    isLoading.value = true

    const res = await api().get(
      `/crm/record-child-get/${route.params.id}/Accounts-Deals`,
      // {
      //   params: {
      //     page,
      //     per_page: dealsPerPage.value
      //   }
      // }
    )

    const pagination = res.data.data

    dealsData.value = pagination
    dealsCurrentPage.value = pagination.current_page
    dealsTotalPages.value = pagination.last_page
    dealsTotalRecords.value = pagination.total
    dealsPerPage.value = pagination.per_page

  } catch (error) {
    console.error('Failed to fetch deals:', error)
  } finally {
    isLoading.value = false
  }
}
const pagesArray = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
)



const form = ref({
  companyName: route.query.name || '',
  industry: route.query.industry || '',
  title: '',
  email: '',
  phone: '',
  phone1: '',
  mobile: '',
  mobile1: '',
  firstName: '',
  lastName: ''
})

const moduleSlug = 8
const showForm = ref(false)
const notesFieldsData = ref(null)
const loading = ref(false)
const addNotes = () => {
  showForm.value = !showForm.value
}
const fetchNotesFields = async () => {
  isLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/8/fields`)
    notesFieldsData.value = data.data || []
  } catch (err) {
    console.error(err)
    alert('Failed to fetch fields')
  } finally {
    isLoading.value = false
  }
}

const notesData = ref([])
const fetchNotes = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Notes`)
    notesData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}




const marketingNotesFieldsData = ref(null)
const fetchMarketingNotesFields = async () => {
  isLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/9/fields`)
    marketingNotesFieldsData.value = data.data || []
  } catch (err) {
    console.error(err)
    alert('Failed to fetch fields')
  } finally {
    isLoading.value = false
  }
}

const marketingNotesData = ref([])
const fetchMarketingNotes = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Marketing Notes`)
    marketingNotesData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const visibleFields = computed(() => notesFieldsData.value.filter((field) => field.type !== 'date'))

const parent_id = route.params.id
const saveRecord = async () => {
  loading.value = true
  try {
    const payload = notesFieldsData.value.map((field) => ({
      field_id: field.id,
      value: form.value[field.name] || null
    }))
    const dateField = notesFieldsData.value.find((f) => f.type === 'date')
    if (dateField) {
      payload.push({
        field_id: dateField.id,
        value: new Date().toISOString().split('T')[0]
      })
    }

    const { data } = await api().post(`/crm/modules/${moduleSlug}/records`, {
      fields: payload
    })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }
    showToast('Record created successfully!')
    showForm.value = false
    await fetchNotesFields()
    await fetchNotes()
    form.value = {}
  } catch (err) {
    console.error(err)
    alert('Failed to create record')
  } finally {
    loading.value = false
  }
}

const saveMarketingNoteRecord = async () => {
  loading.value = true
  try {
    const payload = marketingNotesFieldsData.value.map((field) => ({
      field_id: field.id,
      value: form.value[field.name] || null
    }))
    const dateField = marketingNotesFieldsData.value.find((f) => f.type === 'date')
    if (dateField) {
      payload.push({
        field_id: dateField.id,
        value: new Date().toISOString().split('T')[0]
      })
    }

    const { data } = await api().post(`/crm/modules/9/records`, {
      fields: payload
    })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }
    showToast('Record created successfully!')
    showForm.value = false
    await fetchMarketingNotesFields()
    await fetchMarketingNotes()
    form.value = {}
  } catch (err) {
    console.error(err)
    alert('Failed to create record')
  } finally {
    loading.value = false
  }
}


const deleteRecord = async () => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'This record will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!confirmation.isConfirmed) return

  try {

    await api().delete(`/crm/record/${route.params.id}`)

    Swal.fire({
      title: 'Deleted!',
      text: 'Record has been deleted.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/marketing/accounts/allAccounts')
    await fetchLead()
  } catch (err) {
    console.error(err)
    Swal.fire({
      title: 'Error!',
      text: 'Failed to delete the record.',
      icon: 'error'
    })
  }
}

// Email Module (ID: 10)
const emailFieldsData = ref(null)
const emailData = ref([])
const emailShowForm = ref(false)
const emailForm = ref({})
const emailLoading = ref(false)

const fetchEmailFields = async () => {
  emailLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/10/fields`)
    emailFieldsData.value = data.data || []
  } catch (err) {
    console.error(err)
    alert('Failed to fetch email fields')
  } finally {
    emailLoading.value = false
  }
}

const fetchEmails = async () => {
  try {
    emailLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Email`)
    emailData.value = data.data
  } catch (error) {
    console.error('Failed to fetch emails:', error)
    showToast('Failed to fetch emails', 'error')
  } finally {
    emailLoading.value = false
  }
}

const addEmail = () => {
  emailShowForm.value = !emailShowForm.value
}

const saveEmailRecord = async () => {
  emailLoading.value = true
  try {
    const payload = emailFieldsData.value.map((field) => ({
      field_id: field.id,
      value: emailForm.value[field.name] || null
    }))
    const dateField = emailFieldsData.value.find((f) => f.type === 'date')
    // if (dateField) {
    //   payload.push({
    //     field_id: dateField.id,
    //     value: new Date().toISOString().split('T')[0]
    //   })
    // }

    const { data } = await api().post(`/crm/modules/10/records`, {
      fields: payload
    })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }
    showToast('Email record created successfully!')
    emailShowForm.value = false
    await fetchEmailFields()
    await fetchEmails()
    emailForm.value = {}
  } catch (err) {
    console.error(err)
    alert('Failed to create email record')
  } finally {
    emailLoading.value = false
  }
}

// Phone Module (ID: 11)
const phoneFieldsData = ref(null)
const phoneData = ref([])
const phoneShowForm = ref(false)
const phoneForm = ref({})
const phoneLoading = ref(false)

const fetchPhoneFields = async () => {
  phoneLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/11/fields`)
    phoneFieldsData.value = data.data || []
  } catch (err) {
    console.error(err)
    alert('Failed to fetch phone fields')
  } finally {
    phoneLoading.value = false
  }
}

const fetchPhones = async () => {
  try {
    phoneLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Phone`)
    phoneData.value = data.data
  } catch (error) {
    console.error('Failed to fetch phones:', error)
    showToast('Failed to fetch phones', 'error')
  } finally {
    phoneLoading.value = false
  }
}

const addPhone = () => {
  phoneShowForm.value = !phoneShowForm.value
}

const savePhoneRecord = async () => {
  phoneLoading.value = true
  try {
    const payload = phoneFieldsData.value.map((field) => ({
      field_id: field.id,
      value: phoneForm.value[field.name] || null
    }))
    const dateField = phoneFieldsData.value.find((f) => f.type === 'date')
    if (dateField) {
      payload.push({
        field_id: dateField.id,
        value: new Date().toISOString().split('T')[0]
      })
    }

    const { data } = await api().post(`/crm/modules/11/records`, {
      fields: payload
    })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }
    showToast('Phone record created successfully!')
    phoneShowForm.value = false
    await fetchPhoneFields()
    await fetchPhones()
    phoneForm.value = {}
  } catch (err) {
    console.error(err)
    alert('Failed to create phone record')
  } finally {
    phoneLoading.value = false
  }
}

onMounted(() => {
  fetchDealFields()
  fetchDeals()
  fetchLead()
  fetchFields()
  fetchSingleLeads()
  fetchContacts()
  fetchNotesFields()
  fetchContactFields()
  fetchNotes()
  fetchMarketingNotesFields()
  fetchMarketingNotes()
  fetchEmailFields()
  fetchEmails()
  fetchPhoneFields()
  fetchPhones()
  if (route.hash) {
    const sectionId = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }
  fetchCompanies()
})
</script>


<style scoped>
.table-zebra tr:nth-child(even) {
  background-color: #f9fafb8e;
}

/* ✨ Alternate row background (striped look) */
tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e;
  /* very light cyan */
}

tbody tr:nth-child(even) td {
  background-color: #e5f6ff;
  /* soft blue tint */
  border: 0.5px solid #909aa146;
}

/* Optional hover glow */
tbody tr:hover td {
  background-color: #bdeeff;
  transition: background-color 0.25s ease;
  border: 0.5px solid #909aa146;
}

tbody tr td {

  border: 0.5px solid #909aa146;
}

tbody tr th {

  border: 0.5px solid #909aa146;
}
</style>