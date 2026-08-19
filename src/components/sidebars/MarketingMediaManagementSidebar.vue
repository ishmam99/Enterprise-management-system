<template>
  <div class="h-full w-64 bg-gray-800 text-white overflow-y-auto">
    <div class="p-4 border-b border-gray-700">
      <!-- <h2 class="text-xl font-semibold">Sales Management System</h2> -->
      <h3 class="text-lg font-semibold pt-4">
        Welcome {{ authStore?.user?.name ? authStore?.user?.name : 'Sales' }}
      </h3>
    </div>

    <nav class="p-2 space-y-1">
      <!-- Dashboard Links -->
      <!-- <NuxtLink
           to="/"
           class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
           active-class="bg-blue-600 hover:bg-blue-700"
         >
           <Icon name="material-symbols:dashboard" class="text-lg" />
           <span>Home</span>
         </NuxtLink> -->
      <!-- <router-link
        :to="dashboardPath"
        class="flex items-center gap-3 px-3 text-lg py-1 rounded hover:bg-gray-700 transition-colors"
        exact-active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Dashboard</span>
      </router-link> -->

      <!-- {{ route.name }} -->

      <!-- Categories Section -->
      <!-- <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('categories')}"
             @click="toggleSection('categories')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:category" class="text-lg" />
               <span>Categories</span>
             </div>
             <Icon
               name="heroicons:chevron-down"
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('categories')}"
             />
           </div>

           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('categories') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink
               to="/admin/product_management/categories/create"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Category</span>
             </NuxtLink>
             <NuxtLink
               to="/admin/product_management/categories"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Categories</span>
             </NuxtLink>
           </div>
         </div> -->

      <!-- Subcategories Section -->
      <!-- <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('subcategories')}"
             @click="toggleSection('subcategories')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:layers" class="text-lg" />
               <span>Subcategories</span>
             </div>
             <Icon
               name="heroicons:chevron-down"
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('subcategories')}"
             />
           </div>

           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('subcategories') ? 'max-h-96 mt-1' : 'max-h-0'"
           >
             <NuxtLink
               to="/admin/product_management/subcategories/create"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Subcategory</span>
             </NuxtLink>
             <NuxtLink
               to="/admin/product_management/subcategories"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Subcategories</span>
             </NuxtLink>
           </div>
         </div> -->

      <!-- Leads Section -->
      <div
        v-if="
          route?.path == '/marketing_media_management'
        "
        class="relative"
      >
        <div
          class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{ 'bg-gray-700 font-semibold': isActiveSection('leads') }"
          @click="toggleSection('leads')"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Leads</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            :class="{ 'rotate-180': isActiveSection('leads') }"
            fill="currentColor"
          >
            <path
              d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
            ></path>
          </svg>
        </div>

        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
          :class="isActiveSection('leads') ? 'max-h-96 mt-1' : 'max-h-0'"
        >
          <router-link
            :to="dashboardPath"
            class="flex items-center gap-3 px-3 text-lg py-1 rounded hover:bg-gray-700 transition-colors"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:dashboard" class="text-lg" />
            <span>Dashboard</span>
          </router-link>
          <router-link
            to="/marketing_media_management/leads"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>View Leads</span>
          </router-link>
          <router-link
            to="/marketing_media_management/"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Last Week's Leads</span>
          </router-link>
          <router-link
            to="/marketing_media_management/"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Last Month's Leads</span>
          </router-link>
        </div>
      </div>

      <!-- Vendors Section -->
      <!-- <div
        v-if="
          route?.path == '/marketing_media_management'
        "
        class="relative"
      >
        <div
          class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{ 'bg-gray-700 font-semibold': isActiveSection('contacts') }"
          @click="toggleSection('contacts')"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Contacts</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            :class="{ 'rotate-180': isActiveSection('contacts') }"
            fill="currentColor"
          >
            <path
              d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
            ></path>
          </svg>
        </div>

        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
          :class="isActiveSection('contacts') ? 'max-h-96 mt-1' : 'max-h-0'"
        >
          <NuxtLink
            to="/admin/marketing_media_management/contact"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:add" class="text-lg" />
            <span>View Contacts</span>
          </NuxtLink>
          <NuxtLink
               to="/admin/supply_chain_management/vendors"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Vendor</span>
             </NuxtLink>
        </div>
      </div> -->

      <!-- Contact section -->
      <div v-if="route?.path.includes('/marketing_media_management/contact')" class="relative">
        <router-link
          to="/marketing_media_management/contact"
          class="flex items-center gap-3 px-3 text-lg py-1 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:dashboard" class="text-lg" />
          <span>Dashboard</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/allcontact"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>All</span>
        </router-link>

        <router-link
          to="/marketing_media_management/contact/nextWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/currentWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/nextMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/currentMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/currentQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/nextQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/qualificationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Qualification All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/needAnalysisAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Need Analysis All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/valuePropositionAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Value Proposition All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/identifyDecisionMakersAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Identify Decision Makers All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/proposalQuoteAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Proposal/Prize Quote All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/negotiationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Negotiation/Review All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/closedAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/closedWonAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Won All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/contact/closedLostAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Lost All</span>
        </router-link>
      </div>

      <!-- Leads section -->
      <div v-if="route?.path.includes('/marketing_media_management/leads')" class="relative">
        <router-link
          to="/marketing_media_management/leads"
          class="flex items-center gap-3 px-3 text-lg py-1 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:dashboard" class="text-lg" />
          <span>Dashboard</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/allleads"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>All</span>
        </router-link>

        <router-link
          to="/marketing_media_management/leads/nextWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/currentWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/nextMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/currentMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/currentQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/nextQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/qualificationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Qualification All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/needAnalysisAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Need Analysis All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/valuePropositionAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Value Proposition All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/identifyDecisionMakersAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Identify Decision Makers All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/proposalQuoteAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Proposal/Prize Quote All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/negotiationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Negotiation/Review All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/closedAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/closedWonAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Won All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/leads/closedLostAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Lost All</span>
        </router-link>
      </div>

      <!-- Accounts Section -->
      <div v-if="route?.path.includes('/marketing_media_management/accounts')" class="relative">
        <!-- <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('accounts')}"
             @click="toggleSection('accounts')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:mail" class="text-lg" />
               <span>Accounts</span>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" :class="{'rotate-180': isActiveSection('accounts')}" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>
           </div> -->

        <!-- <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
          :class="isActiveSection('accounts') ? 'max-h-96 mt-1' : 'max-h-0'"
        >
          <router-link
            to="/marketing_media_management/accounts"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:list" class="text-lg" />
            <span>View Accounts</span>
          </router-link>
        </div> -->
        <router-link
          to="/marketing_media_management/accounts"
          class="flex items-center gap-3 px-3 text-lg py-1 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:dashboard" class="text-lg" />
          <span>Dashboard</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/allAccounts"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>All</span>
        </router-link>

        <router-link
          to="/marketing_media_management/accounts/nextWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/currentWeek"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Week</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/nextMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/currentMonth"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Month</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/currentQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Current Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/nextQuarter"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Next Quarter</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/qualificationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Qualification All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/needAnalysisAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Need Analysis All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/valuePropositionAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Value Proposition All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/identifyDecisionMakersAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Identify Decision Makers All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/proposalQuoteAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Proposal/Prize Quote All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/negotiationAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Negotiation/Review All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/closedAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/closedWonAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Won All</span>
        </router-link>
        <router-link
          to="/marketing_media_management/accounts/closedLostAll"
          class="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:list" class="text-lg" />
          <span>Closed Lost All</span>
        </router-link>
      </div>

      <!-- Manufacturer Section -->
      <!-- <div class="relative">
           <div
             class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
             :class="{'bg-gray-700 font-semibold': isActiveSection('brands')}"
             @click="toggleSection('brands')"
           >
             <div class="flex items-center gap-3">
               <Icon name="material-symbols:branding-watermark" class="text-lg" />
               <span>Manufacturer</span>
             </div>
             <Icon
               name="heroicons:chevron-down"
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('brands')}"
             />
           </div>

           <div
             class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
             :class="isActiveSection('brands') ? 'max-h-96 mt-1 ' : 'max-h-0'"
           >
             <NuxtLink
               to="/admin/supply_chain_management/manufacturer/create"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Manufacturer</span>
             </NuxtLink>
             <NuxtLink
               to="/admin/supply_chain_management/manufacturer"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:list" class="text-lg" />
               <span>View Manufacturers</span>
             </NuxtLink>
           </div>
         </div> -->

      <!-- Products Section -->
      <div
        v-if="
          route?.path == '/marketing_media_management' ||
          route?.path == '/marketing_media_management/products'
        "
        class="relative"
      >
        <div
          class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{ 'bg-gray-700 font-semibold': isActiveSection('products') }"
          @click="toggleSection('products')"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:inventory" class="text-lg" />
            <span>Products</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            :class="{ 'rotate-180': isActiveSection('products') }"
            fill="currentColor"
          >
            <path
              d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
            ></path>
          </svg>
          <!-- <Icon
               name="heroicons:chevron-down"
               class="text-lg transition-transform duration-200"
               :class="{'rotate-180': isActiveSection('products')}"
             /> -->
        </div>

        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
          :class="isActiveSection('products') ? 'max-h-96 mt-1' : 'max-h-0'"
        >
          <!-- <NuxtLink
               to="/admin/supply_chain_management/products/create"
               class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
               active-class="text-blue-400 font-medium bg-gray-700"
             >
               <Icon name="material-symbols:add" class="text-lg" />
               <span>Create Product</span>
             </NuxtLink> -->
          <router-link
            to="/marketing_media_management/products"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:list" class="text-lg" />
            <span>View Products</span>
          </router-link>
        </div>
      </div>

      <!-- <div
         @click="logoutUser()"
        class="flex items-center gap-3 p-3  cursor-pointer hover:bg-red-700 transition-colors mt-10"

      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Logout</span>
      </div> -->
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const activeSections = ref(new Set())

const isActiveSection = (section) => {
  return (
    route.path.startsWith(`/admin/supply_chain_management/${section}`) ||
    activeSections.value.has(section)
  )
}

const toggleSection = (section) => {
  // If the section is already active, close it
  if (activeSections.value.has(section)) {
    activeSections.value.delete(section)
  } else {
    // Close all other sections first
    activeSections.value.clear()
    // Then open the clicked section
    activeSections.value.add(section)
  }
}
const logoutUser = () => {
  authStore.logout()
  // loginCookie.value = ''
  // tokenCookie.value = ''
  // userCookie.value = ''
  router.push(`/login`)
}

const dashboardPath = computed(() => {
  switch (route.name) {
    case 'marketing_media_management-accounts':
      return '/marketing_media_management/accounts'
    case 'marketing_media_management-leads':
      return '/marketing_media_management/leads'
    case 'marketing_media_management-contact':
      return '/marketing_media_management/contact'
    case 'marketing_media_management-products':
      return '/marketing_media_management/products'
    default:
      return '/'
  }
})
</script>

<style scoped>
.sidebar {
  width: 16rem;
  z-index: 10;
}

.router-link-active.router-link-exact-active {
  background-color: rgb(37 99 235);
}

.router-link-active.router-link-exact-active:hover {
  background-color: rgb(29 78 216);
}
</style>
