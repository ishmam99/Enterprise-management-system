<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent">All Email Updates</h1>
            <p class="text-slate-500 mt-2">Manage and track all email communications sent to your customers</p>
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
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Search by Recipient / Subject</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                v-model="filters.search"
                type="text"
                placeholder="Search by email or subject..."
                class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                @input="debouncedSearch"
              />
            </div>
          </div>
          <div class="w-full lg:w-64">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Status</label>
            <select 
              v-model="filters.status"
              @change="applyFilters"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="bounced">Bounced</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
          <div class="w-full lg:w-64">
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Filter by Campaign</label>
            <select 
              v-model="filters.campaign_id"
              @change="applyFilters"
              class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Campaigns</option>
              <option v-for="campaign in campaignList" :key="campaign.id" :value="campaign.id">
                {{ campaign.name }}
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

      <!-- Emails Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y table-zebra divide-slate-200">
            <thead class="bg-sky-100">
              <tr>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Recipient</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sent Date</th>
                <th scope="col" class="px-6 py-4 border-e text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-12 text-center">
                  <div class="flex justify-center items-center gap-3">
                    <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-slate-500">Loading emails...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="emails.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                  <div class="flex flex-col items-center gap-2">
                    <svg class="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>No email updates found</p>
                  </div>
                </td>
              </tr>
              <tr v-for="email in emails" :key="email.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center">
                      <span class="text-indigo-700 font-medium">{{ getInitials(email.recipient_name || email.recipient_email) }}</span>
                    </div>
                    <div class="ml-2">
                      <div class="text-sm font-medium text-slate-800">{{ email.recipient_name || '—' }}</div>
                      <div class="text-xs text-slate-500">{{ email.recipient_email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap text-sm text-slate-800">
                  {{ email.subject }}
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ email.campaign?.name || '—' }}
                  </span>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ email.email_type || '—' }}
                  </span>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap">
                  <span :class="statusBadgeClass(email.status)">
                    {{ statusText(email.status) }}
                  </span>
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap text-sm text-slate-500">
                  {{ formatDate(email.sent_at) }}
                </td>
                <td class="px-2 py-4 border-e border-slate-200/70 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center gap-2 justify-end">
                    <button
                      @click="openEmailModal(email)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
                      title="View Email Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      @click="confirmDelete(email)"
                      class="text-red-700 flex gap-1 items-center bg-red-100 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors p-1"
                      title="Delete email"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
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

    <!-- Email Details Modal -->
    <div v-if="showEmailModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="email-modal" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showEmailModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="bg-white px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Email Details</h3>
            <button @click="showEmailModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4">
            <div v-if="emailDetailLoading" class="flex justify-center py-10">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else-if="currentEmail">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p class="text-sm font-medium text-gray-500">From</p>
                  <p class="text-sm text-gray-900">{{ currentEmail.sender_email || '—' }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">To</p>
                  <p class="text-sm text-gray-900">{{ currentEmail.recipient_email }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-sm font-medium text-gray-500">Subject</p>
                  <p class="text-sm text-gray-900 font-medium">{{ currentEmail.subject }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Status</p>
                  <span :class="statusBadgeClass(currentEmail.status)">
                    {{ statusText(currentEmail.status) }}
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Sent Date</p>
                  <p class="text-sm text-gray-900">{{ formatDate(currentEmail.sent_at) }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-sm font-medium text-gray-500">Campaign</p>
                  <p class="text-sm text-gray-900">{{ currentEmail.campaign?.name || '—' }}</p>
                </div>
              </div>
              <div class="border-t pt-4">
                <p class="text-sm font-medium text-gray-500 mb-2">Email Content</p>
                <div class="bg-gray-50 p-4 rounded-lg overflow-auto max-h-80" v-html="currentEmail.body"></div>
              </div>
              <div v-if="currentEmail.opened_at || currentEmail.clicked_at" class="mt-4 grid grid-cols-2 gap-4">
                <div v-if="currentEmail.opened_at">
                  <p class="text-sm font-medium text-gray-500">Opened At</p>
                  <p class="text-sm text-gray-900">{{ formatDate(currentEmail.opened_at) }}</p>
                </div>
                <div v-if="currentEmail.clicked_at">
                  <p class="text-sm font-medium text-gray-500">Clicked At</p>
                  <p class="text-sm text-gray-900">{{ formatDate(currentEmail.clicked_at) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-10 text-gray-500">
              <p>No email details found.</p>
            </div>
          </div>
          <div class="px-6 py-4 bg-gray-50 flex justify-end">
            <button @click="showEmailModal = false" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

// ==================== MOCK DATA ====================
const mockCampaigns = [
  { id: 1, name: 'Q3 Product Launch' },
  { id: 2, name: 'Monthly Newsletter' },
  { id: 3, name: 'Webinar Invitation' },
]

const mockEmailsData = [
  {
    id: 1,
    recipient_name: 'John Doe',
    recipient_email: 'john.doe@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Welcome to Our New Product',
    body: '<p>Hello John,</p><p>We are excited to introduce our latest product...</p>',
    campaign_id: 1,
    email_type: 'Campaign',
    status: 'opened',
    sent_at: '2026-08-20T10:30:00Z',
    opened_at: '2026-08-20T11:00:00Z',
    clicked_at: null
  },
  {
    id: 2,
    recipient_name: 'Jane Smith',
    recipient_email: 'jane.smith@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Your Monthly Newsletter',
    body: '<p>Hi Jane,</p><p>Here is your monthly update...</p>',
    campaign_id: 2,
    email_type: 'Newsletter',
    status: 'clicked',
    sent_at: '2026-08-18T09:15:00Z',
    opened_at: '2026-08-18T09:30:00Z',
    clicked_at: '2026-08-18T10:00:00Z'
  },
  {
    id: 3,
    recipient_name: 'Michael Johnson',
    recipient_email: 'michael.j@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Invitation: Webinar on AI Trends',
    body: '<p>Dear Michael,</p><p>Join us for an exclusive webinar...</p>',
    campaign_id: 3,
    email_type: 'Invitation',
    status: 'delivered',
    sent_at: '2026-08-15T14:00:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 4,
    recipient_name: 'Emily Davis',
    recipient_email: 'emily.davis@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Product Launch Follow-up',
    body: '<p>Hi Emily,</p><p>Thank you for your interest...</p>',
    campaign_id: 1,
    email_type: 'Campaign',
    status: 'sent',
    sent_at: '2026-08-14T08:45:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 5,
    recipient_name: 'David Wilson',
    recipient_email: 'david.wilson@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Your Account Update',
    body: '<p>Hello David,</p><p>We have updated your account settings...</p>',
    campaign_id: 2,
    email_type: 'Transactional',
    status: 'bounced',
    sent_at: '2026-08-12T16:20:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 6,
    recipient_name: 'Sarah Brown',
    recipient_email: 'sarah.brown@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Special Offer Inside',
    body: '<p>Hi Sarah,</p><p>Don\'t miss this exclusive offer...</p>',
    campaign_id: 1,
    email_type: 'Promotion',
    status: 'opened',
    sent_at: '2026-08-10T11:10:00Z',
    opened_at: '2026-08-10T11:25:00Z',
    clicked_at: null
  },
  {
    id: 7,
    recipient_name: 'Robert Taylor',
    recipient_email: 'robert.t@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Webinar Reminder',
    body: '<p>Dear Robert,</p><p>This is a reminder for tomorrow\'s webinar...</p>',
    campaign_id: 3,
    email_type: 'Reminder',
    status: 'delivered',
    sent_at: '2026-08-09T07:00:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 8,
    recipient_name: 'Lisa Anderson',
    recipient_email: 'lisa.anderson@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Unsubscribe Confirmation',
    body: '<p>Hello Lisa,</p><p>You have been unsubscribed...</p>',
    campaign_id: 2,
    email_type: 'System',
    status: 'unsubscribed',
    sent_at: '2026-08-08T13:40:00Z',
    opened_at: '2026-08-08T13:45:00Z',
    clicked_at: null
  },
  {
    id: 9,
    recipient_name: 'James Martinez',
    recipient_email: 'james.m@example.com',
    sender_email: 'marketing@company.com',
    subject: 'New Feature Announcement',
    body: '<p>Hi James,</p><p>We are thrilled to announce...</p>',
    campaign_id: 1,
    email_type: 'Announcement',
    status: 'clicked',
    sent_at: '2026-08-07T09:30:00Z',
    opened_at: '2026-08-07T09:35:00Z',
    clicked_at: '2026-08-07T10:00:00Z'
  },
  {
    id: 10,
    recipient_name: 'Patricia Garcia',
    recipient_email: 'patricia.g@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Your Trial is Ending',
    body: '<p>Dear Patricia,</p><p>Your free trial ends soon...</p>',
    campaign_id: 2,
    email_type: 'Transactional',
    status: 'sent',
    sent_at: '2026-08-05T15:00:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 11,
    recipient_name: 'Thomas Lee',
    recipient_email: 'thomas.lee@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Webinar Follow-up',
    body: '<p>Hi Thomas,</p><p>Thanks for attending our webinar...</p>',
    campaign_id: 3,
    email_type: 'Campaign',
    status: 'opened',
    sent_at: '2026-08-04T10:10:00Z',
    opened_at: '2026-08-04T10:20:00Z',
    clicked_at: null
  },
  {
    id: 12,
    recipient_name: 'Nancy Rodriguez',
    recipient_email: 'nancy.r@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Feedback Request',
    body: '<p>Hello Nancy,</p><p>We value your feedback...</p>',
    campaign_id: 1,
    email_type: 'Survey',
    status: 'delivered',
    sent_at: '2026-08-02T12:00:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 13,
    recipient_name: 'Daniel Hernandez',
    recipient_email: 'daniel.h@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Latest Blog Post',
    body: '<p>Hi Daniel,</p><p>Check out our latest blog...</p>',
    campaign_id: 2,
    email_type: 'Newsletter',
    status: 'opened',
    sent_at: '2026-08-01T08:30:00Z',
    opened_at: '2026-08-01T08:45:00Z',
    clicked_at: null
  },
  {
    id: 14,
    recipient_name: 'Maria Lopez',
    recipient_email: 'maria.lopez@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Exclusive Discount',
    body: '<p>Dear Maria,</p><p>Use code SAVE20 at checkout...</p>',
    campaign_id: 1,
    email_type: 'Promotion',
    status: 'bounced',
    sent_at: '2026-07-30T17:20:00Z',
    opened_at: null,
    clicked_at: null
  },
  {
    id: 15,
    recipient_name: 'Charles King',
    recipient_email: 'charles.k@example.com',
    sender_email: 'marketing@company.com',
    subject: 'Account Activation',
    body: '<p>Hello Charles,</p><p>Your account has been activated...</p>',
    campaign_id: 2,
    email_type: 'System',
    status: 'sent',
    sent_at: '2026-07-28T09:00:00Z',
    opened_at: null,
    clicked_at: null
  }
]

// ==================== STATE ====================
const emails = ref([])
const loading = ref(false)
const campaignList = ref([])
const pagination = reactive({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
  next_page_url: null,
  prev_page_url: null
})

const filters = reactive({
  search: '',
  status: '',
  campaign_id: ''
})

let searchTimeout = null
const useMockData = ref(false) // fallback flag
const mockEmails = ref([...mockEmailsData]) // mutable copy for deletion

// ---- Email Detail Modal ----
const showEmailModal = ref(false)
const currentEmail = ref(null)
const emailDetailLoading = ref(false)

// ---- Helpers ----
const getInitials = (nameOrEmail) => {
  if (!nameOrEmail) return '?'
  const parts = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0].split('.') : nameOrEmail.split(' ')
  return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusBadgeClass = (status) => {
  switch (status) {
    case 'sent': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
    case 'delivered': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800'
    case 'opened': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800'
    case 'clicked': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    case 'bounced': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'
    case 'unsubscribed': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700'
    default: return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600'
  }
}

const statusText = (status) => {
  const map = {
    sent: 'Sent',
    delivered: 'Delivered',
    opened: 'Opened',
    clicked: 'Clicked',
    bounced: 'Bounced',
    unsubscribed: 'Unsubscribed'
  }
  return map[status] || 'Unknown'
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

// ==================== DATA FETCHING (API + FALLBACK) ====================
const applyMockFiltersAndPagination = () => {
  let filtered = [...mockEmails.value]
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(email =>
      email.recipient_email.toLowerCase().includes(searchLower) ||
      (email.recipient_name && email.recipient_name.toLowerCase().includes(searchLower)) ||
      email.subject.toLowerCase().includes(searchLower)
    )
  }
  if (filters.status) {
    filtered = filtered.filter(email => email.status === filters.status)
  }
  if (filters.campaign_id) {
    filtered = filtered.filter(email => email.campaign_id == filters.campaign_id)
  }

  const total = filtered.length
  const perPage = pagination.per_page || 10
  const lastPage = Math.ceil(total / perPage) || 1
  const currentPage = Math.min(pagination.current_page, lastPage)
  const start = (currentPage - 1) * perPage
  const end = start + perPage

  emails.value = filtered.slice(start, end)
  pagination.current_page = currentPage
  pagination.last_page = lastPage
  pagination.total = total
  pagination.from = total === 0 ? 0 : start + 1
  pagination.to = Math.min(end, total)
  pagination.next_page_url = currentPage < lastPage ? 'mock' : null
  pagination.prev_page_url = currentPage > 1 ? 'mock' : null
}

const fetchEmails = async () => {
  loading.value = true
  if (useMockData.value) {
    // Use mock data directly
    applyMockFiltersAndPagination()
    loading.value = false
    return
  }

  try {
    const params = {
      page: pagination.current_page,
      per_page: pagination.per_page
    }
    if (filters.search) params.search = filters.search
    if (filters.status) params.status = filters.status
    if (filters.campaign_id) params.campaign_id = filters.campaign_id

    const http = api()
    const response = await http.get('/email-updates', { params })

    if (response.data?.success) {
      const resultData = response.data.data
      emails.value = resultData.data || []
      pagination.current_page = resultData.current_page
      pagination.last_page = resultData.last_page
      pagination.per_page = resultData.per_page
      pagination.total = resultData.total
      pagination.from = resultData.from
      pagination.to = resultData.to
      pagination.next_page_url = resultData.next_page_url
      pagination.prev_page_url = resultData.prev_page_url
    } else {
      emails.value = []
    }
  } catch (err) {
    console.error('Fetch emails error, falling back to mock data:', err)
    useMockData.value = true
    applyMockFiltersAndPagination()
  } finally {
    loading.value = false
  }
}

const fetchCampaigns = async () => {
  if (useMockData.value) {
    campaignList.value = mockCampaigns
    return
  }
  try {
    const http = api()
    const response = await http.get('/campaigns')
    if (response.data?.success) {
      campaignList.value = response.data.data || []
    } else if (Array.isArray(response.data)) {
      campaignList.value = response.data
    } else {
      campaignList.value = []
    }
  } catch (err) {
    console.error('Fetch campaigns error, falling back to mock data:', err)
    campaignList.value = mockCampaigns
  }
}

// ---- Email detail ----
const openEmailModal = (email) => {
  showEmailModal.value = true
  emailDetailLoading.value = true
  currentEmail.value = null

  if (useMockData.value) {
    // Use the email passed directly (already has full data)
    currentEmail.value = email
    emailDetailLoading.value = false
    return
  }

  // Try API, fallback to list data on error
  setTimeout(async () => {
    try {
      const http = api()
      const { data } = await http.get(`/email-updates/${email.id}`)
      if (data.success) {
        currentEmail.value = data.data
      } else {
        currentEmail.value = email
      }
    } catch (err) {
      console.error('Fetch email detail error, using list data:', err)
      currentEmail.value = email
    } finally {
      emailDetailLoading.value = false
    }
  }, 0)
}

// ---- Delete Email ----
const deleteEmail = async (id) => {
  if (useMockData.value) {
    // Simulate deletion in mock data
    mockEmails.value = mockEmails.value.filter(e => e.id !== id)
    await Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The email update has been deleted successfully (mock).',
      confirmButtonColor: '#4f46e5',
      timer: 2000,
      showConfirmButton: false
    })
    applyMockFiltersAndPagination()
    return
  }

  try {
    const http = api()
    await http.delete(`/email-updates/${id}`)
    await Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The email update has been deleted successfully.',
      confirmButtonColor: '#4f46e5',
      timer: 2000,
      showConfirmButton: false
    })
    await fetchEmails()
  } catch (err) {
    console.error('Delete error:', err)
    await Swal.fire({
      icon: 'error',
      title: 'Delete Failed',
      text: err.response?.data?.message || 'Could not delete the email.',
      confirmButtonColor: '#4f46e5'
    })
  }
}

const confirmDelete = (email) => {
  Swal.fire({
    title: 'Delete Email Update?',
    html: `You are about to delete the email to <strong>${email.recipient_email}</strong> with subject "<strong>${email.subject}</strong>".<br>This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteEmail(email.id)
    }
  })
}

// ---- Pagination & Filters ----
const goToPage = (page) => {
  if (page < 1 || page > pagination.last_page) return
  pagination.current_page = page
  fetchEmails()
}

const applyFilters = () => {
  pagination.current_page = 1
  fetchEmails()
}

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

const clearFilters = () => {
  filters.search = ''
  filters.status = ''
  filters.campaign_id = ''
  applyFilters()
}

const refreshData = () => {
  fetchEmails()
}

onMounted(() => {
  fetchCampaigns()
  fetchEmails()
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