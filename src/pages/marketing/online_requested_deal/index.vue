<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">All Online Software Deals</h1>
            <p class="text-slate-500 mt-2">Manage and track all software requests from your customers</p>
          </div>
          <div class="flex items-center gap-3">
            <button @click="refreshData" class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-8">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Search by Name</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                v-model="filters.search"
                type="text"
                placeholder="Search by customer name..."
                class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                @input="debouncedSearch"
              />
            </div>
          </div>
          <div class="w-full lg:w-64">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Solution</label>
            <select 
              v-model="filters.solution_id"
              @change="applyFilters"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Solutions</option>
              <option v-for="solution in solutionList" :key="solution.id" :value="solution.id">
                {{ solution.name }}
              </option>
            </select>
          </div>
          <div class="w-full lg:w-64">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Software</label>
            <select 
              v-model="filters.software_id"
              @change="applyFilters"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Software</option>
              <option v-for="software in allSoftwares" :key="software.id" :value="software.id">
                {{ software.name }}
              </option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Deals Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y table-zebra divide-slate-200">
            <thead class="bg-sky-100">
              <tr>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Details</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Department &amp; Position</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Solution</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Software</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Purchase Reason</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-4 border-e text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="9" class="px-6 py-12 text-center">
                  <div class="flex justify-center items-center gap-3">
                    <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-slate-500">Loading deals...</span>
                  </div>
                </td>
               </tr>
              <tr v-else-if="deals.length === 0">
                <td colspan="9" class="px-6 py-12 text-center text-slate-500">
                  <div class="flex flex-col items-center gap-2">
                    <svg class="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No software deals found</p>
                  </div>
                </td>
               </tr>
              <tr v-for="(deal, index) in deals" :key="deal.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center">
                      <span class="text-indigo-700 font-medium">{{ getInitials(deal.name) }}</span>
                    </div>
                    <div class="ml-2">
                      <div class="text-sm font-medium text-slate-800">{{ deal.name }}</div>
                      <div class="text-xs text-slate-500">Email: {{ deal.email }}</div>
                       <div class="text-xs text-slate-500">Phone: {{ deal.phone || 'No phone' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                   <div class="">
                      <div class="text-sm text-slate-800"> <span class="font-medium">Department: </span> {{ deal.account_data?.department || '—' }}</div>
                      <div class="text-sm text-slate-800"> <span class="font-medium">Position: </span> {{ deal.account_data?.position || '—' }}</div>
                    </div>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <div class="text-sm text-slate-800"><span class="font-medium">Company Name:</span> {{ deal.company_name }}</div>
                  <div class="text-sm text-slate-800"><span class="font-medium">Company Type:</span> {{ deal?.account_data?.type_of_company || '—' }}</div>
                  <div class="text-sm text-slate-800"><span class="font-medium">Company Details:</span> {{ deal?.account_data?.company_details || '—' }}</div>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ deal.solution?.name || '—' }}
                  </span>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ deal.software?.name || '—' }}
                  </span>
                </td>
                 <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                   <div class="text-sm text-slate-800"><span class="font-medium"></span> {{ deal?.account_data?.purchase_reason || '—' }}</div>
                 </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <div class="flex items-center flex-col gap-2">
                    <span :class="statusBadgeClass(deal.is_converted)">
                    {{ statusText(deal.is_converted) }}
                  </span>
                  <span v-if="deal?.status == 1" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 ml-2">
                    Contact Created
                  </span>
                  </div>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap text-sm text-slate-500">
                  {{ formatDate(deal.created_at) }}
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <!-- Converted: only Notes and Create Contact -->
                    <template v-if="deal.is_converted === 1">
                      <button
                        @click="openNotesModal(deal)"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
                        title="View / Add Notes"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Notes
                      </button>
                      <button 
                        v-if="deal.status == 0"
                        @click="openContactModal(deal)"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                        title="Create Contact"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Create Contact
                      </button>
                      <button 
                        v-else
                        disabled
                        class="inline-flex items-center  gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg hover:bg-purple-100 transition-colors"
                        title="Create Contact"
                      >
                      Contact Created
                      </button>
                    </template>

                    <!-- Not converted: Convert and Delete -->
                    <template v-else>
                      <button
                        @click="convertToAccount(deal)"
                        :disabled="convertingId === deal.id"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Convert to Account"
                      >
                        <svg v-if="convertingId === deal.id" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Convert to Account
                      </button>
                      <button
                        @click="confirmDelete(deal)"
                        class="text-red-700 flex gap-1 items-center bg-red-100 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors p-1"
                        title="Delete deal"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
           </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
          <div class="text-sm text-slate-500">
            Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of {{ pagination.total || 0 }} results
          </div>
          <div class="flex gap-2">
            <button 
              @click="goToPage(pagination.current_page - 1)"
              :disabled="!pagination.prev_page_url"
              class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div class="flex gap-1">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1.5 rounded-lg transition-colors',
                  page === pagination.current_page 
                    ? 'bg-indigo-600 text-white' 
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button 
              @click="goToPage(pagination.current_page + 1)"
              :disabled="!pagination.next_page_url"
              class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes Modal -->
    <div v-if="showNotesModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="notes-modal" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showNotesModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="bg-white px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Notes for {{ currentDeal?.name }} ({{ currentDeal?.company_name }})</h3>
            <button @click="showNotesModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4">
            <!-- Toggle button: Show Table / Show Create Form -->
            <div class="flex justify-end mb-4">
              <button
                @click="notesMode = notesMode === 'view' ? 'create' : 'view'; if(notesMode === 'view') fetchNotes()"
                class="px-4 py-2 text-sm font-medium rounded-lg border"
                :class="notesMode === 'view' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'"
              >
                {{ notesMode === 'view' ? '+ Create Note' : 'View Notes' }}
              </button>
            </div>

            <!-- Loading state -->
            <div v-if="notesLoading" class="flex justify-center py-10">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>

            <!-- View: Notes Table -->
            <div v-if="notesMode === 'view' && !notesLoading">
              <div v-if="notesData.length === 0" class="text-center py-10 text-gray-500">
                <p>No notes found for this account.</p>
              </div>
              <div v-else class="overflow-x-auto border rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 table-zebra">
                  <thead class="bg-gray-50">
                    <tr>
                      <th v-for="field in visibleNoteFields" :key="field.id" class="px-4 border-e py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {{ field.label || field.name }}
                      </th>
                      <th v-for="field in visibleNoteFields" :key="field.id" class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <!-- {{ field.label || field.created_at }} -->
                          Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="note in notesData" :key="note.id" class="hover:bg-gray-50">
                      <td v-for="field in visibleNoteFields" :key="field.id" class="px-4 border-e py-3 text-sm text-gray-700">
                        {{ note[field.name] || '—' }}
                      </td>
                      <td v-for="field in visibleNoteFields" :key="field.id" class="px-4 py-3 text-sm text-gray-700">
                        {{ note?.note_date ? formatDate(note.note_date) : '—' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Create: Note Form -->
            <div v-if="notesMode === 'create' && !notesLoading">
              <form @submit.prevent="saveNote" class="space-y-4">
                <div v-for="field in visibleNoteFields" :key="field.id">
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label || field.name }}</label>
                  <input
                    v-model="noteForm[field.name]"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    :required="field.required"
                  />
                </div>
                <div class="flex justify-end gap-3 pt-3">
                  <button type="button" @click="notesMode = 'view'" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" :disabled="noteSaving" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                    <span v-if="noteSaving">Saving...</span>
                    <span v-else>Save Note</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Contact Modal -->
    <div v-if="showContactModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="contact-modal" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showContactModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div class="bg-white px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Create Contact for {{ currentDeal?.company_name }}</h3>
            <button @click="showContactModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="createContact" class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input v-model="contactForm.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="contactForm.phone" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input v-model="contactForm.position" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input v-model="contactForm.department" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input v-model="contactForm.company_name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="flex justify-end gap-3 pt-3">
              <button type="button" @click="showContactModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" :disabled="contactSaving" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                <span v-if="contactSaving">Creating...</span>
                <span v-else>Create Contact</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

// ---- Main table state ----
const deals = ref([])
const loading = ref(false)
const solutionList = ref([])
const allSoftwares = ref([])
const convertingId = ref(null)
const pagination = reactive({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
  from: 0,
  to: 0,
  next_page_url: null,
  prev_page_url: null
})

const filters = reactive({
  search: '',
  solution_id: '',
  software_id: ''
})

let searchTimeout = null

// ---- Notes Modal State ----
const showNotesModal = ref(false)
const currentDeal = ref(null)
const notesMode = ref('view')
const notesLoading = ref(false)
const notesData = ref([])
const noteFields = ref([])
const noteForm = ref({})
const noteSaving = ref(false)

// ---- Contact Modal State ----
const showContactModal = ref(false)
const contactForm = ref({
  name: '',
  phone: '',
  position: '',
  department: '',
  company_name: ''
})
const contactSaving = ref(false)

// ---- Helpers ----
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusBadgeClass = (isConverted) => {
  if (isConverted === 1) return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800'
  return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600'
}

const statusText = (isConverted) => {
  if (isConverted == 1) return 'Converted to Account'
  return 'Unknown'
}

const visiblePages = computed(() => {
  const current = pagination.current_page
  const last = pagination.last_page
  const delta = 2
  const range = []
  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i)
  }
  if (current - delta > 2) range.unshift('...')
  if (current + delta < last - 1) range.push('...')
  range.unshift(1)
  if (last !== 1) range.push(last)
  return range.filter(v => v !== '...')
})

// ---- Data fetching ----
const fetchDeals = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current_page,
      per_page: pagination.per_page
    }
    if (filters.search) params.search = filters.search
    if (filters.solution_id) params.solution_id = filters.solution_id
    if (filters.software_id) params.software_id = filters.software_id

    const http = api()
    const response = await http.get('/software-requests', { params })
    
    if (response.data?.success) {
      const resultData = response.data.data
      const normalizedData = (resultData.data || []).map(deal => {
        let parsedAccountData = null
        if (deal.account_data && typeof deal.account_data === 'string') {
          try {
            parsedAccountData = JSON.parse(deal.account_data)
          } catch (e) {
            console.error('Failed to parse account_data for deal', deal.id, e)
          }
        } else if (deal.account_data && typeof deal.account_data === 'object') {
          parsedAccountData = deal.account_data
        }
        
        return {
          ...deal,
          is_converted: Number(deal.is_converted),
          account_data: parsedAccountData
        }
      })
      
      deals.value = normalizedData
      pagination.current_page = resultData.current_page
      pagination.last_page = resultData.last_page
      pagination.per_page = resultData.per_page
      pagination.total = resultData.total
      pagination.from = resultData.from
      pagination.to = resultData.to
      pagination.next_page_url = resultData.next_page_url
      pagination.prev_page_url = resultData.prev_page_url
    } else {
      deals.value = []
    }
  } catch (err) {
    console.error('Fetch deals error:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Failed to load software deals',
      confirmButtonColor: '#4f46e5'
    })
    deals.value = []
  } finally {
    loading.value = false
  }
}

const fetchSolutionsAndSoftwares = async () => {
  try {
    const http = api()
    const response = await http.get('/solutions?with=softwares')
    let data = response.data
    if (data && data.success === true) {
      solutionList.value = data.data || []
    } else if (Array.isArray(data)) {
      solutionList.value = data
    } else if (data && data.data && Array.isArray(data.data)) {
      solutionList.value = data.data
    } else {
      solutionList.value = []
    }
    const softwaresMap = new Map()
    solutionList.value.forEach(solution => {
      solution.softwares?.forEach(sw => {
        if (!softwaresMap.has(sw.id)) {
          softwaresMap.set(sw.id, { id: sw.id, name: sw.name })
        }
      })
    })
    allSoftwares.value = Array.from(softwaresMap.values())
  } catch (err) {
    console.error('Fetch solutions error:', err)
  }
}

const getIndustryFromDeal = (deal) => {
  if (!deal.account_data) return ''
  if (typeof deal.account_data === 'string') {
    try {
      const parsed = JSON.parse(deal.account_data)
      return parsed.industry || ''
    } catch (e) {
      return ''
    }
  }
  return deal.account_data.industry || ''
}

// ---- Convert to Account ----
const convertToAccount = async (deal) => {
  const confirmResult = await Swal.fire({
    title: 'Convert to Account?',
    html: `You are about to convert the deal for <strong>${deal.name}</strong> (${deal.company_name}) into a CRM account.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, convert it',
    cancelButtonText: 'Cancel'
  })
  if (!confirmResult.isConfirmed) return

  convertingId.value = deal.id

  try {
    const fields = [
      { field_id: 722, value: deal.email },
      { field_id: 22, value: deal.company_name },
      { field_id: 481, value: deal.software?.name || '' },
      { field_id: 471, value: deal.solution?.name || '' },
      { field_id: 724, value: deal.phone || '' },
      { field_id: 717, value: deal.billing_city || '' },
      { field_id: 721, value: deal.billing_country || '' },
      { field_id: 719, value: deal.billing_state || '' },
      { field_id: 426, value: getIndustryFromDeal(deal) },
      { field_id: 579, value: deal.account_data?.company_details || '' }
    ]

    const http = api()
    const crmResponse = await http.post('/crm/modules/2/records', { fields })
    const createdRecordId = crmResponse.data?.data?.id || crmResponse.data?.id
    if (!createdRecordId) throw new Error('No record ID returned from CRM')

    await http.post(`/software-requests/${deal.id}`, {
      _method: 'PUT',
      record_id: createdRecordId,
      is_converted: 1
    })

    const index = deals.value.findIndex(d => d.id === deal.id)
    if (index !== -1) {
      deals.value[index] = { 
        ...deals.value[index], 
        is_converted: 1,
        record_id: createdRecordId 
      }
    }

    await Swal.fire({
      icon: 'success',
      title: 'Converted Successfully',
      text: `Deal for ${deal.name} has been converted to a CRM account.`,
      confirmButtonColor: '#10b981',
      timer: 2500,
      showConfirmButton: false
    })

    await fetchDeals()
  } catch (err) {
    console.error('Conversion error:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Conversion Failed',
      text: err.response?.data?.message || err.message || 'Could not convert the deal.',
      confirmButtonColor: '#e11d48'
    })
  } finally {
    convertingId.value = null
  }
}

// ---- Delete Deal ----
const deleteDeal = async (id) => {
  try {
    const http = api()
    await http.delete(`/software-requests/${id}`)
    await Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The software deal has been deleted successfully.',
      confirmButtonColor: '#4f46e5',
      timer: 2000,
      showConfirmButton: false
    })
    await fetchDeals()
  } catch (err) {
    console.error('Delete error:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Delete Failed',
      text: err.response?.data?.message || 'Could not delete the deal.',
      confirmButtonColor: '#4f46e5'
    })
  }
}

const confirmDelete = (deal) => {
  Swal.fire({
    title: 'Delete Software Deal?',
    html: `You are about to delete the deal for <strong>${deal.name}</strong> from <strong>${deal.company_name}</strong>.<br>This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteDeal(deal.id)
    }
  })
}

// ---- Pagination & Filters ----
const goToPage = (page) => {
  if (page < 1 || page > pagination.last_page) return
  pagination.current_page = page
  fetchDeals()
}

const applyFilters = () => {
  pagination.current_page = 1
  fetchDeals()
}

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

const clearFilters = () => {
  filters.search = ''
  filters.solution_id = ''
  filters.software_id = ''
  applyFilters()
}

const refreshData = () => {
  fetchDeals()
}

watch(() => filters.solution_id, () => applyFilters())
watch(() => filters.software_id, () => applyFilters())

// ========================
// NOTES MODULE LOGIC
// ========================
const visibleNoteFields = computed(() => 
  noteFields.value.filter(field => field.type !== 'date')
)

const fetchNoteFields = async () => {
  try {
    const http = api()
    const { data } = await http.get('/crm/modules/8/fields')
    noteFields.value = data.data || []
  } catch (err) {
    console.error('Failed to fetch note fields', err)
    Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load note fields.' })
  }
}

const fetchNotes = async () => {
  if (!currentDeal.value?.record_id) return
  notesLoading.value = true
  try {
    const http = api()
    const { data } = await http.get(`/crm/record-child-get/${currentDeal.value.record_id}/Accounts-Notes`)
    // Flatten the notes: each note's "values" array becomes an object keyed by field name
    const notes = (data.data || []).map(note => {
      const flat = { id: note.id }
      note.values?.forEach(v => {
        if (v.field) {
          flat[v.field.name] = v.value
        }
      })
      return flat
    })
    notesData.value = notes
  } catch (err) {
    console.error('Failed to fetch notes', err)
    Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load notes.' })
  } finally {
    notesLoading.value = false
  }
}

const saveNote = async () => {
  noteSaving.value = true
  try {
    const http = api()
    const payload = visibleNoteFields.value.map(field => ({
      field_id: field.id,
      value: noteForm.value[field.name] || null
    }))

    const dateField = noteFields.value.find(f => f.type === 'date')
    if (dateField) {
      payload.push({
        field_id: dateField.id,
        value: new Date().toISOString().split('T')[0]
      })
    }

    const { data: createResponse } = await http.post('/crm/modules/8/records', { fields: payload })
    const childRecordId = createResponse.data?.id || createResponse.id
    if (!childRecordId) throw new Error('Failed to create note record')

    await http.post('/crm/record-child-create', {
      parent_record_id: currentDeal.value.record_id,
      child_record_id: childRecordId
    })

    await Swal.fire({
      icon: 'success',
      title: 'Note Created',
      timer: 2000,
      showConfirmButton: false
    })

    noteForm.value = {}
    notesMode.value = 'view'
    await fetchNotes()
  } catch (err) {
    console.error('Save note error', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Failed to create note.'
    })
  } finally {
    noteSaving.value = false
  }
}

const openNotesModal = async (deal) => {
  currentDeal.value = deal
  notesMode.value = 'view'
  noteForm.value = {}
  showNotesModal.value = true

  if (noteFields.value.length === 0) {
    await fetchNoteFields()
  }
  await fetchNotes()
}

// ========================
// CREATE CONTACT LOGIC
// ========================
const openContactModal = (deal) => {
  currentDeal.value = deal
  contactForm.value = {
    name: deal.name || '',
    phone: deal.phone || '',
    position: deal.account_data?.position || '',
    department: deal.account_data?.department || '',
    company_name: deal.company_name || ''
  }
  showContactModal.value = true
}

const createContact = async () => {
  contactSaving.value = true
  try {
    const http = api()
    const fields = [
      { field_id: 13, value: contactForm.value.name },
      { field_id: 18, value: contactForm.value.phone },
      { field_id: 16, value: contactForm.value.position },
      { field_id: 688, value: contactForm.value.department },
      { field_id: 28, value: contactForm.value.company_name }
    ]

    const { data: contactResponse } = await http.post('/crm/modules/3/records', { fields })
    const contactId = contactResponse.data?.id || contactResponse.id
    if (!contactId) throw new Error('No contact ID returned')

    await http.post('/crm/record-child-create', {
      parent_record_id: currentDeal.value.record_id,
      child_record_id: contactId
    })

    // ✅ Your original code with status: 1, fixed to use currentDeal.value.id
    await http.post(`/software-requests/${currentDeal.value.id}`, {
      _method: 'PUT',
      status: 1
    })

    await Swal.fire({
      icon: 'success',
      title: 'Contact Created',
      text: 'Contact has been linked to the account.',
      timer: 2500,
      showConfirmButton: false
    })
    showContactModal.value = false
  } catch (err) {
    console.error('Create contact error', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Failed to create contact.'
    })
  } finally {
    contactSaving.value = false
  }
}

onMounted(() => {
  fetchSolutionsAndSoftwares()
  fetchDeals()
})
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>