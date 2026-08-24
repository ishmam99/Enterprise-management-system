<template>
  <div class="flex h-screen bg-gray-50 pb-10">
    <aside
      class="w-64 bg-slate-100/90 text-black shadow-xl border-slate-700 backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto">
      <button
        class="flex items-center w-full justify-center gap-2 mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg py-2 transition-all duration-300"
        title="Go back" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path
            d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z">
          </path>
        </svg>
        <span class="font-semibold text-sm">All Accounts </span>
      </button>

      <hr class="pb-6" />
      <div class="mb-6">
        Current Account: <br />
        {{lead?.values.find((e) => e.field?.name == 'company_name')?.value || 'N/A'}}
      </div>

      <hr class="my-6" />

      <ul class="space-y-1">
        <li v-for="(item, index) in sidebarItems" :key="index" class="transition-all duration-200">
          <button
            class="w-full text-left hover:px-2 py-2 rounded-lg flex items-center justify-between hover:bg-slate-700/70"
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
          <div class="flex items-center justify-between">
            <div class="text-xl font-semibold">
              <!-- 🏢 Company Name -->
              <p class="text-gray-700 mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-indigo-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2" />
                </svg>
                Company Name:
                <span class="ml-1 font-medium text-gray-900">
                  {{lead?.values.find((e) => e.field?.name == 'company_name')?.value || 'N/A'}}
                </span>
              </p>

              <!-- 🧑‍💼 Assigned Users -->
              <div class="flex items-center gap-4">
                <!-- (Sales) -->
                <div class="mt-2 bg-gray-50 border border-indigo-100 rounded-lg px-4 py-2 shadow-sm">
                  <div class="flex items-center text-indigo-600 font-medium mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A1 1 0 006 19h12a1 1 0 00.879-1.519l-6-10a1 1 0 00-1.758 0l-6 10z" />
                    </svg>
                    Assigned To (Sales)
                  </div>
                  <div class="text-sm text-gray-700 space-y-1">
                    <p>
                      <span class="font-semibold text-gray-800">Manager:</span>
                      {{ managerName || 'Not Assigned' }}
                    </p>
                    <p>
                      <span class="font-semibold text-gray-800">Executive:</span>
                      {{ executiveName || 'Not Assigned' }}
                    </p>
                  </div>
                </div>
                <!-- Section (Marketing) -->
                <div class="mt-2 bg-gray-50 border border-indigo-100 rounded-lg px-4 py-2 shadow-sm">
                  <div class="flex items-center text-indigo-600 font-medium mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A1 1 0 006 19h12a1 1 0 00.879-1.519l-6-10a1 1 0 00-1.758 0l-6 10z" />
                    </svg>
                    Assigned To (Marketing)
                  </div>
                  <div class="text-sm text-gray-700 space-y-1">
                    <p>
                      <span class="font-semibold text-gray-800">Manager:</span>
                      {{ MarketingManagerName || 'Not Assigned' }}
                    </p>
                    <p>
                      <span class="font-semibold text-gray-800">Executive:</span>
                      {{ MarketingExecutiveName || 'Not Assigned' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2 flex-row-reverse">
            <div v-if="authStore.role != 'crm-executive'" class="flex flex-col gap-2">
              <div
                class="flex items-center justify-center font-semibold bg-red-700 text-white hover:bg-red-600 rounded-lg text-center px-4 py-2 transition-all duration-300">
                <button @click="deleteRecord()">Delete Account</button>
              </div>
              <div
                class="flex items-center cursor-pointer gap-2 justify-center font-semibold bg-violet-700 text-white hover:bg-violet-600 rounded-lg text-center px-4 py-2 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path
                    d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z">
                  </path>
                </svg>
                <button title="Go back" @click="goBack">
                  <span class="font-semibold font-semibold">Back</span>
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div>
                <button v-if="executiveName"
                  class="flex items-center bg-emerald-700 text-white hover:bg-emerald-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Update Executive" @click="updateAssignModal('sales-executive')">
                  <span class="font-medium">Update Sales Executive</span>
                </button>
                <button v-else
                  class="flex items-center bg-emerald-700 text-white hover:bg-emerald-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Assign Executive" @click="openAssignModal('sales-executive')">
                  <span class="font-medium">Assign Sales Executive</span>
                </button>
              </div>

              <div>
                <button v-if="managerName"
                  class="flex items-center bg-sky-700 text-white hover:bg-sky-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Update Manager" @click="updateAssignModal('manager-sales')">
                  <span class="font-medium">Update Sales Manager</span>
                </button>
                <button v-else
                  class="flex items-center bg-sky-700 text-white hover:bg-sky-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Assign Manager" @click="openAssignModal('manager-sales')">
                  <span class="font-medium">Assign Sales Manager</span>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div>
                <button v-if="MarketingExecutiveName"
                  class="flex items-center bg-emerald-700 text-white hover:bg-emerald-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Update Executive" @click="updateAssignModal('marketing-executive')">
                  <span class="font-medium">Update Marketing Executive</span>
                </button>
                <button v-else
                  class="flex items-center bg-emerald-700 text-white hover:bg-emerald-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Assign Executive" @click="openAssignModal('marketing-executive')">
                  <span class="font-medium">Assign Marketing Executive</span>
                </button>
              </div>

              <div>
                <button v-if="MarketingManagerName"
                  class="flex items-center bg-sky-700 text-white hover:bg-sky-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Update Manager" @click="updateAssignModal('marketing-manager')">
                  <span class="font-medium">Update Marketing Manager</span>
                </button>
                <button v-else
                  class="flex items-center bg-sky-700 text-white hover:bg-sky-500 rounded-lg px-4 py-2 transition-all duration-300"
                  title="Assign Manager" @click="openAssignModal('marketing-manager')">
                  <span class="font-medium">Assign Marketing Manager</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Assign Modal -->
          <div v-if="showAssignModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-800">
                Assign
                {{
                  assignRole === 'manager-sales'
                    ? 'Sales Manager'
                    : assignRole === 'sales-executive'
                      ? 'Sales Executive'
                      : assignRole === 'marketing-manager'
                        ? 'Marketing Manager'
                        : assignRole === 'marketing-executive'
                          ? 'Marketing Executive'
                          : ''
                }}
              </h2>

              <div v-if="isLoading" class="text-center py-6 text-gray-500">
                Loading
                {{
                  assignRole === 'manager-sales'
                    ? 'Sales Manager'
                    : assignRole === 'sales-executive'
                      ? 'Sales Executive'
                      : assignRole === 'marketing-manager'
                        ? 'Marketing Manager'
                        : assignRole === 'marketing-executive'
                          ? 'Marketing Executive'
                          : ''
                }}s...
              </div>

              <div v-else>
                <label class="block text-gray-700 font-medium mb-2">Select User</label>
                <select v-model="selectedUser"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
                  <option value="" disabled>Select {{ assignRole }}</option>
                  <option v-for="user in assignRole === 'manager-sales'
                    ? managerData
                    : assignRole === 'sales-executive'
                      ? executiveData
                      : assignRole === 'marketing-manager'
                        ? MarketingManagerData
                        : assignRole === 'marketing-executive'
                          ? MarketingExecutiveData
                          : []" :key="user.id" :value="user.id">
                    {{ user.name }} ({{ user.email }})
                  </option>
                </select>
              </div>

              <div class="flex justify-end mt-6 gap-2">
                <button @click="showAssignModal = false"
                  class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                  Cancel
                </button>
                <button @click="assignUser" :disabled="!selectedUser || assigning"
                  class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-60">
                  <span v-if="assigning">Assigning...</span>
                  <span v-else>Assign</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Update Modal -->
          <div v-if="showUpdateModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-800">
                Update
                {{
                  assignRole === 'manager-sales'
                    ? 'Sales Manager'
                    : assignRole === 'sales-executive'
                      ? 'Sales Executive'
                      : assignRole === 'marketing-manager'
                        ? 'Marketing Manager'
                        : assignRole === 'marketing-executive'
                          ? 'Marketing Executive'
                          : ''
                }}
              </h2>

              <div v-if="isLoading" class="text-center py-6 text-gray-500">
                Loading
                {{
                  assignRole === 'manager-sales'
                    ? 'Sales Manager'
                    : assignRole === 'sales-executive'
                      ? 'Sales Executive'
                      : assignRole === 'marketing-manager'
                        ? 'Marketing Manager'
                        : assignRole === 'marketing-executive'
                          ? 'Marketing Executive'
                          : ''
                }}s...
              </div>

              <div v-else>
                <label class="block text-gray-700 font-medium mb-2">Select User</label>
                <select v-model="selectedUser"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
                  <option value="" disabled>
                    Select
                    {{
                      assignRole === 'manager-sales'
                        ? 'Sales Manager'
                        : assignRole === 'sales-executive'
                          ? 'Sales Executive'
                          : assignRole === 'marketing-manager'
                            ? 'Marketing Manager'
                            : assignRole === 'marketing-executive'
                              ? 'Marketing Executive'
                              : ''
                    }}
                  </option>
                  <option v-for="user in assignRole === 'manager-sales'
                    ? managerData
                    : assignRole === 'sales-executive'
                      ? executiveData
                      : assignRole === 'marketing-manager'
                        ? MarketingManagerData
                        : assignRole === 'marketing-executive'
                          ? MarketingExecutiveData
                          : []" :key="user.id" :value="user.id">
                    {{ user.name }} ({{ user.email }})
                  </option>
                </select>
              </div>

              <div class="flex justify-end mt-6 gap-2">
                <button @click="showUpdateModal = false"
                  class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                  Cancel
                </button>
                <button @click="updateUser" :disabled="!selectedUser || assigning"
                  class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-60">
                  <span v-if="assigning">Updating...</span>
                  <span v-else>Update</span>
                </button>
              </div>
            </div>
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
              <span class="ml-3 text-gray-600 font-medium"> Loading record details... </span>
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

                  <div class="flex gap-2">
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
                  </div>
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
        <section id="Martking-Notes"
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
                        name: 'sales_management-accounts-accountsDetails-id',
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

            <div @click="addNotes"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ showForm ? 'Cancel' : 'Add Notes' }}
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
                    <th v-for="field in notesFieldsData" :key="field.id"
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
                        name: 'sales_management-leads-leadsDetails-id',
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
            <router-link :to="`/crm/Accounts/createDeal?parent_id=${route.params.id}&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
              }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
              }`" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Deal
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
                          <router-link :to="`/crm/Accounts/createDeal?parent_id=${route.params.id
                            }&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
                            }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
                            }`"
                            class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                            <Icon name="material-symbols:add" class="w-5 h-5" />
                            + Create Deal
                          </router-link>
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
                        name: 'sales_management-leads-leadsDetails-id',
                        params: { id: lead.id }
                      }" class="hover:underline">
                        {{lead.values.find((e) => e.field_id == field.id)?.value}}
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination OUTSIDE table -->
            <div v-if="totalPages > 1 || totalRecords"
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <div class="flex items-center gap-2">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z">
                    </path>
                  </svg>
                  Prev
                </button>

                <!-- <button
      v-for="page in pagesArray"
      :key="page"
      @click="goToPage(page)"
      class="px-3 py-1.5 rounded-lg transition-all"
      :class="page === currentPage
        ? 'bg-emerald-500 text-white shadow'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
    >
      {{ page }}
    </button> -->

                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
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
            <router-link :to="`/sales_management/accounts/createContacts?parent_id=${route.params.id
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
                  <tr v-else-if="recordsData != null && recordsData.length == 0"
                    class="hover:bg-emerald-50 transition-colors">
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
                          <router-link :to="`/sales_management/accounts/createContacts?parent_id=${route.params.id
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
                        name: 'sales_management-leads-leadsDetails-id',
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
            <!-- Pagination OUTSIDE table -->
            <div v-if="totalPages > 1 || totalRecords"
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <div class="flex items-center gap-2">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                  class="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    fill="currentColor">
                    <path
                      d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z">
                    </path>
                  </svg>
                  Prev
                </button>

                <!-- <button
      v-for="page in pagesArray"
      :key="page"
      @click="goToPage(page)"
      class="px-3 py-1.5 rounded-lg transition-all"
      :class="page === currentPage
        ? 'bg-emerald-500 text-white shadow'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
    >
      {{ page }}
    </button> -->

                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
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

        <!-- Task section -->
        <section id="task"
          class="bg-cyan-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-cyan-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path
                    d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z">
                  </path>
                </svg>
              </div>
              Tasks
            </h2>
            <router-link :to="`/crm/Accounts/Task/create?parent_id=${route.params.id}&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
              }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
              }`" class="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Tasks
            </router-link>
          </div>

          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full text-sm text-left rounded">
                <thead class="bg-cyan-100 text-black">
                  <tr>
                    <th class="px-6 border-x py-3">#</th>
                    <th class="px-6 border-e py-3">Title</th>
                    <th class="px-6 py-3 border-e">Description</th>
                    <th class="px-6 py-3 border-e">Deadline</th>
                    <th class="px-6 py-3 border-e">Priority</th>
                  </tr>
                </thead>

                <tbody class="divide-y">
                  <tr v-for="(task, index) in tasks" :key="task.id" class="hover:bg-gray-50 transition">
                    <!-- Title -->
                    <td class="px-6 py-4 font-medium text-gray-800">
                      {{ index + 1 }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-800">
                      {{ task.title }}
                    </td>

                    <!-- Description -->
                    <td class="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {{ task.description }}
                    </td>

                    <!-- Deadline -->
                    <td class="px-6 py-4 text-gray-700">
                      {{ formatDate(task.deadline) }}
                    </td>

                    <!-- Priority -->
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="priorityClass(task.priority)">
                        {{ task.priority }}
                      </span>
                    </td>
                  </tr>

                  <!-- Empty State -->
                  <tr v-if="tasks.length === 0">
                    <td colspan="4" class="px-6 py-10 text-center text-gray-500">
                      No tasks available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Meeting section -->
        <section id="meeting"
          class="bg-teal-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-teal-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path
                    d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z">
                  </path>
                </svg>
              </div>
              Meetings
            </h2>
            <router-link :to="`/crm/Accounts/Meeting/create?parent_id=${route.params.id}&company_name=${singleLeads.find((a) => a.field?.name === 'company_name')?.value
              }&parent_company=${singleLeads.find((a) => a.field?.name === 'parent_company')?.value
              }`" class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Meeting
            </router-link>
          </div>

          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div v-if="isLoading" class="flex justify-center items-center py-16">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
            </div>

            <!-- Table -->
            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full text-sm text-left rounded">
                <thead class="bg-teal-100 text-black">
                  <tr>
                    <th class="px-6 border-x py-3">#</th>
                    <th class="px-6 border-e py-3">Title</th>
                    <th class="px-6 py-3 border-e">Description</th>
                    <th class="px-6 py-3 border-e">Status</th>
                    <th class="px-6 py-3 border-e">Schedule</th>
                  </tr>
                </thead>

                <tbody class="divide-y">
                  <tr v-for="(meeting, index) in meetings" :key="meeting.id" class="hover:bg-gray-50 transition">
                    <!-- Title -->
                    <td class="px-6 py-4 font-medium text-gray-800">
                      {{ index + 1 }}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-800">
                      {{ meeting.title }}
                    </td>

                    <!-- Description -->
                    <td class="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {{ meeting.description }}
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="statusClass(meeting.status)">
                        {{ meeting.status }}
                      </span>
                    </td>

                    <!-- Schedule -->
                    <td class="px-6 py-4 text-gray-700">
                      {{ formatDateTime(meeting.schedule) }}
                    </td>
                  </tr>

                  <!-- Empty State -->
                  <tr v-if="meetings.length === 0">
                    <td colspan="4" class="px-6 py-10 text-center text-gray-500">
                      No meetings available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
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
const tabs = ['Overview']
const overviewTab = ref('Overview')
const getAssignments = ref([])
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
    getAssignments.value = data.assignments
  } catch (err) {
    console.error('Error fetching leads:', err)
  } finally {
    isLoading.value = false
  }
}

const startEdit = (item) => {
  editingId.value = item.id
  editingEmptyFieldId.value = null

  if (item.field.type === 'checkbox') {
    editValue.value = item.value === 'true'
  } else {
    editValue.value = item.value || ''
  }
}

const startEditEmpty = (field) => {
  editingEmptyFieldId.value = field.id
  editingId.value = null

  editValue.value = field.type === 'checkbox' ? false : ''
}

const cancelEdit = () => {
  editingId.value = null
  editingEmptyFieldId.value = null
  editValue.value = ''
}

const saveEdit = async (item) => {
  saving.value = true
  try {
    const payloadValue =
      item.field.type === 'checkbox' ? (editValue.value ? 'true' : 'false') : editValue.value

    await api().post(`/crm/record-values/${item.id}`, {
      value: payloadValue,
      _method: 'PUT'
    })

    item.value = payloadValue

    cancelEdit()
    showToast('Value updated successfully!')
    await fetchLead()
    await fetchSingleLeads()
  } catch (err) {
    console.error(err)
    showToast('Failed to update value', 'error')
  } finally {
    saving.value = false
  }
}

const saveNewValue = async (field) => {
  saving.value = true
  try {
    const payloadValue =
      field.type === 'checkbox' ? (editValue.value ? 'true' : 'false') : editValue.value

    const { data } = await api().post(`/crm/create-values/${route.params.id}`, {
      field_id: field.id,
      value: payloadValue
    })

    singleLeads.value.push({
      ...data.data,
      field
    })

    cancelEdit()
    showToast('Value added successfully!')
    await fetchLead()
    await fetchSingleLeads()
  } catch (err) {
    console.error(err)
    showToast('Failed to add value', 'error')
  } finally {
    saving.value = false
  }
}

const sidebarItems = [
  // { key: 'overview', label: 'Company Details' },
  { key: 'rapid', label: 'Account Details' },
  { key: 'Martking-Notes', label: 'Marketing Notes' },
  { key: 'notes', label: 'Notes' },
  { key: 'deals', label: 'Deals' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'task', label: 'Task' },
  { key: 'meeting', label: 'Meeting' },
  { key: 'email', label: 'Email' }
]

const activeSidebar = ref('overview')
// const goBack = () => {
//   router.go(-1)
// }
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
const perPage = ref(10)
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
const contactFields = ref([])
const dealFields = ref([])

const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/1/fields')
  fields.value = data.data
}
const fetchDealFields = async () => {
  const { data } = await api().get('/crm/modules/5/fields')
  dealFields.value = data.data.filter((e) => e.order != null)
}
const fetchContactFields = async () => {
  const { data } = await api().get('/crm/modules/3/fields')
  contactFields.value = data.data.filter((e) => e.order != null)
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
    emptyItems: emptyBottomGroup.value || []
  },

])

const recordsData = ref([])
const contactPerPage = ref(10)
const fetchContacts = async (page = 1) => {
  try {
    isLoading.value = true
    // const { data } = await api().get(`/crm/record-child-get/${route.params.id}/accounts-Contacts`)
    const res = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Contacts`, {
      params: {
        page,
        per_page: contactPerPage.value
      }
    })

    const pagination = res.data.data // 👈 IMPORTANT

    recordsData.value = pagination.data
    currentPage.value = pagination.current_page
    totalPages.value = pagination.last_page
    totalRecords.value = pagination.total
    contactPerPage.value = pagination.per_page
    // recordsData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const dealsData = ref([])
const totalPages = ref(1)
const currentPage = ref(1)
const totalRecords = ref(0)
const fetchDeals = async (page = 1) => {
  try {
    isLoading.value = true

    const res = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Deals`, {
      params: {
        page,
        per_page: perPage.value
      }
    })

    const pagination = res.data.data // 👈 IMPORTANT

    dealsData.value = pagination
    currentPage.value = pagination.current_page
    totalPages.value = pagination.last_page
    totalRecords.value = pagination.total
    perPage.value = pagination.per_page
  } catch (error) {
    console.error('Failed to fetch deals:', error)
  } finally {
    isLoading.value = false
  }
}

const pagesArray = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  fetchDeals(page)
}

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

    router.push('/sales_management/accounts/allAccounts')
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

// 🧠 Computed for cleaner template
const managerName = computed(() => {
  const manager = getAssignments.value.find((a) => a.role === 'manager-sales')
  return manager?.user?.name || null
})

const executiveName = computed(() => {
  const exec = getAssignments.value.find((a) => a.role === 'sales-executive')
  return exec?.user?.name || null
})
const MarketingManagerName = computed(() => {
  const cs_manager = getAssignments.value.find((a) => a.role === 'marketing-manager')
  return cs_manager?.user?.name || null
})

const MarketingExecutiveName = computed(() => {
  const cs_exec = getAssignments.value.find((a) => a.role === 'marketing-executive')
  return cs_exec?.user?.name || null
})

const executiveData = ref()
const fetchExecutive = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"sales-executive"}]`
    )
    executiveData.value = data.data
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}

const managerData = ref()
const fetchManager = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"manager-sales"}]`
    )
    managerData.value = data.data
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}
const MarketingExecutiveData = ref()
const fetchMarketingExecutive = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"marketing-executive"}]`
    )
    MarketingExecutiveData.value = data.data
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}

const MarketingManagerData = ref()
const fetchMarketingManager = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"marketing-manager"}]`
    )
    MarketingManagerData.value = data.data
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}

const showExecutiveDropdown = ref(false)
const showManagerDropdown = ref(false)
const showCsExecutiveDropdown = ref(false)
const showCsManagerDropdown = ref(false)

const showAssignModal = ref(false)
const showUpdateModal = ref(false)
const assignRole = ref(null)
const selectedUser = ref('')
const assigning = ref(false)

const openAssignModal = async (role) => {
  assignRole.value = role
  selectedUser.value = ''
  showAssignModal.value = true

  if (role === 'manager') {
    await fetchManager()
  } else if (role === 'executive') {
    await fetchExecutive()
  } else if (role === 'cs_manager') {
    await fetchMarketingManager()
  } else if (role === 'cs_executive') {
    await fetchMarketingExecutive()
  }
}
const updateAssignModal = async (role) => {
  assignRole.value = role
  selectedUser.value = ''
  showUpdateModal.value = true

  if (role === 'manager') {
    await fetchManager()
  } else if (role === 'executive') {
    await fetchExecutive()
  } else if (role === 'cs_manager') {
    await fetchMarketingManager()
  } else if (role === 'cs_executive') {
    await fetchMarketingExecutive()
  }

  // if (role === 'sales-manager') {
  //   await fetchManager()
  // } else {
  //   await fetchExecutive()
  // }
}

const assignUser = async () => {
  if (!selectedUser.value) return
  assigning.value = true
  try {
    const payload = {
      user_id: selectedUser.value,
      role: assignRole.value,
      permission_level:
        assignRole.value === 'manager-sales'
          ? 'edit'
          : assignRole.value === 'sales-executive'
            ? 'view'
            : assignRole.value === 'marketing-manager'
              ? 'edit'
              : assignRole.value === 'marketing-executive'
                ? 'view'
                : ''
    }
    await api().post(`/crm/assign-record/${route.params.id}`, payload)

    showToast(
      `${assignRole.value === 'manager-sales'
        ? 'Sales Manager'
        : assignRole.value === 'sales-executive'
          ? 'Sales Executive'
          : assignRole.value === 'marketing-manager'
            ? 'CS Manager'
            : assignRole.value === 'marketing-executive'
              ? 'CS Executive'
              : ''
      } assigned successfully!`
    )
    showAssignModal.value = false
    await fetchSingleLeads()
  } catch (error) {
    console.error('Failed to assign user:', error)
    showToast('Failed to assign user', 'error')
  } finally {
    assigning.value = false
  }
}
const updateUser = async () => {
  if (!selectedUser.value) return
  assigning.value = true
  try {
    // 🔍 Find the correct assignment by role
    const currentAssignment = getAssignments.value.find((a) => a.role === assignRole.value)
    if (!currentAssignment) {
      showToast('Assignment not found', 'error')
      assigning.value = false
      return
    }

    const payload = {
      user_id: selectedUser.value,
      _method: 'PUT'
    }

    await api().post(`/crm/assign-record-update/${currentAssignment.id}`, payload)

    showToast(
      `${assignRole.value === 'manager-sales'
        ? 'Sales Manager'
        : assignRole.value === 'sales-executive'
          ? 'Sales Executive'
          : assignRole.value === 'marketing-manager'
            ? 'CS Manager'
            : assignRole.value === 'marketing-executive'
              ? 'CS Executive'
              : ''
      } Updated successfully!`
    )
    showUpdateModal.value = false
    await fetchSingleLeads()
  } catch (error) {
    console.error('Failed to update user:', error)
    showToast('Failed to update user', 'error')
  } finally {
    assigning.value = false
  }
}

//tasks
const tasks = ref([
  {
    id: 1,
    title: 'Design Dashboard UI',
    description: 'Create task and CRM dashboard layout',
    deadline: '2026-01-10',
    priority: 'High'
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Connect task module with backend API',
    deadline: '2026-01-15',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Testing & Bug Fixes',
    description: 'Fix reported UI and logic issues',
    deadline: '2026-01-20',
    priority: 'Low'
  }
])

const priorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700'
    case 'Low':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

//meeting
const meetings = ref([
  {
    id: 1,
    title: 'Client Requirement Discussion',
    description: 'Initial discussion about project scope',
    status: 'Scheduled',
    schedule: '2026-01-08T15:00:00'
  },
  {
    id: 2,
    title: 'Internal Team Sync',
    description: 'Weekly development sync-up',
    status: 'Completed',
    schedule: '2026-01-05T11:30:00'
  },
  {
    id: 3,
    title: 'Proposal Review',
    description: 'Review proposal with client stakeholders',
    status: 'Cancelled',
    schedule: '2026-01-12T16:00:00'
  }
])

const statusClass = (status) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-100 text-blue-700'
    case 'Completed':
      return 'bg-green-100 text-green-700'
    case 'Cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString()
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
  fetchExecutive()
  fetchManager()
  fetchMarketingManager()
  fetchMarketingExecutive()
  fetchNotes()
  fetchMarketingNotesFields()
  fetchMarketingNotes()
  if (route.hash) {
    const sectionId = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }
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
