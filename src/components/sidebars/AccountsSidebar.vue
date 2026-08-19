<template>
  <div class="h-full w-64 bg-gray-800 text-white overflow-y-auto">
    <div class="p-4 border-b border-gray-700">
      <!-- <h2 class="text-xl font-semibold">Sales Management System</h2> -->
      <h3 class="text-lg font-semibold pt-4 underline underline-offset-4">
        Welcome {{ authStore?.user?.name ? authStore?.user?.name : 'Accounts' }},
        {{ authStore?.role ? authStore?.role : 'Director' }}
      </h3>
    </div>

    <nav class="p-2 space-y-1">

      <div
        v-if="route?.path.includes('/accounts_management/revenue')"
        class="relative"
      >

       <router-link
        to="/accounts_management/revenue"
        class="flex items-center gap-3 px-3 text-lg py-2 rounded hover:bg-gray-700 transition-colors"
        exact-active-class="bg-blue-600 hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path></svg>
        <span>Dashboard</span>
      </router-link>

        <div class="rounded-md" :class="contractDropdown ? 'bg-slate-900/90 p-2' : ''">
          <p @click="contractDropdown = !contractDropdown" class="flex text-lg px-2 py-2 items-center gap-2 cursor-pointer pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(100,205,138,1)"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"></path></svg>
             Revenue List
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </p>

          <div v-if="contractDropdown" class="flex flex-col gap-2 p-2 bg-slate-800 rounded-md">
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z">
                </path>
              </svg>
               Todays List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              This Weeks List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              This Quarters List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              This Months List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Last Weeks List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
             Last Quarters List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
             Last Months List
            </router-link>
          </div>
              </div>
             <div class="rounded-md" :class="policyDropdown ? 'bg-slate-900/90 p-2' : ''">
          <p @click="policyDropdown = !policyDropdown" class="flex text-lg px-3 py-2 items-center gap-2 cursor-pointer pb-1">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(234,113,46,1)"><path d="M18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
           Revenue Category
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </p>

          <div v-if="policyDropdown" class="flex flex-col gap-2 p-2 bg-slate-800 rounded-md">
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z">
                </path>
              </svg>
              Service
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Donation
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Zakat
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Learning Center
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Campaign
            </router-link>
          </div>
              </div>



      </div>

      <!-- Contact Section -->
      <div
        v-if="route?.path.includes('/accounts_management/expense')"
        class="relative"
      >


        <router-link
        to="/accounts_management/expense"
        class="flex items-center gap-3 px-3 text-lg py-2 rounded hover:bg-gray-700 transition-colors"
        exact-active-class="bg-blue-600 hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path></svg>
        <span>Dashboard</span>
      </router-link>
        

           <div class="rounded-md" :class="contractDropdown ? 'bg-slate-900/90 p-2' : ''">
          <p @click="contractDropdown = !contractDropdown" class="flex px-3 py-2 text-lg items-center gap-2 cursor-pointer pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              fill="cyan">
              <path
                d="M17.0047 16.0028H19.0047V4.00281H9.00468V6.00281H17.0047V16.0028ZM17.0047 18.0028V21.0019C17.0047 21.5547 16.5547 22.0028 15.9978 22.0028H4.01154C3.45548 22.0028 3.00488 21.5582 3.00488 21.0019L3.00748 7.00368C3.00759 6.45091 3.45752 6.00281 4.0143 6.00281H7.00468V3.00281C7.00468 2.45052 7.4524 2.00281 8.00468 2.00281H20.0047C20.557 2.00281 21.0047 2.45052 21.0047 3.00281V17.0028C21.0047 17.5551 20.557 18.0028 20.0047 18.0028H17.0047ZM5.0073 8.00281L5.00507 20.0028H15.0047V8.00281H5.0073ZM7.00468 16.0028H11.5047C11.7808 16.0028 12.0047 15.7789 12.0047 15.5028C12.0047 15.2267 11.7808 15.0028 11.5047 15.0028H8.50468C7.12397 15.0028 6.00468 13.8835 6.00468 12.5028C6.00468 11.1221 7.12397 10.0028 8.50468 10.0028H9.00468V9.00281H11.0047V10.0028H13.0047V12.0028H8.50468C8.22854 12.0028 8.00468 12.2267 8.00468 12.5028C8.00468 12.7789 8.22854 13.0028 8.50468 13.0028H11.5047C12.8854 13.0028 14.0047 14.1221 14.0047 15.5028C14.0047 16.8835 12.8854 18.0028 11.5047 18.0028H11.0047V19.0028H9.00468V18.0028H7.00468V16.0028Z">
              </path>
            </svg>
            Expense List
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </p>

          <div v-if="contractDropdown" class="flex flex-col gap-2 p-2 bg-slate-800 rounded-md">
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z">
                </path>
              </svg>
              Todays List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              This Weeks List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              This Quarters List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
             This Months List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Last Weeks List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Last Quarters List
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Last Months List
            </router-link>
          </div>
              </div>
             <div class="rounded-md" :class="policyDropdown ? 'bg-slate-900/90 p-2' : ''">
          <p @click="policyDropdown = !policyDropdown" class="flex text-base px-3 py-2 items-center gap-2 cursor-pointer pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(240,187,64,1)"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"></path></svg>
            3b. Expense Category
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
              fill="currentColor">
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </p>

          <div v-if="policyDropdown" class="flex flex-col gap-2 p-2 bg-slate-800 rounded-md">
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z">
                </path>
              </svg>
               Operation
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Employee Salary
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
              Zakat Distribution
            </router-link>
            <router-link to="/"
              class="flex items-center gap-2 cursor-pointer hover:bg-teal-600 hover:rounded-lg hover:p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                fill="currentColor">
                <path
                  d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z">
                </path>
              </svg>
             Fund Disbursement
            </router-link>
          </div>
              </div>

      </div>

      <!-- tasks Section -->
      <div
        v-if="route?.path.includes('/accounts_management/invoice')"
        class="relative"
      >


                      <router-link
        to="/accounts_management/invoice"
        class="flex items-center gap-3 px-3 text-lg py-2 rounded hover:bg-gray-700 transition-colors"
        exact-active-class="bg-blue-600 hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(100,205,138,1)"><path d="M3 12C3 12.5523 3.44772 13 4 13H10C10.5523 13 11 12.5523 11 12V4C11 3.44772 10.5523 3 10 3H4C3.44772 3 3 3.44772 3 4V12ZM3 20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V16C11 15.4477 10.5523 15 10 15H4C3.44772 15 3 15.4477 3 16V20ZM13 20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V12C21 11.4477 20.5523 11 20 11H14C13.4477 11 13 11.4477 13 12V20ZM14 3C13.4477 3 13 3.44772 13 4V8C13 8.55228 13.4477 9 14 9H20C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H14Z"></path></svg>
        <span>Dashboard</span>
      </router-link>
         <router-link
          to="/sales_management/products/allProducts"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(70,146,221,1)"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path></svg>
          <span>Today List</span>
        </router-link>
         <router-link
          to="/sales_management/products/allProducts"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="pink"><path d="M8.5 7C8.5 5.89543 7.60457 5 6.5 5C5.39543 5 4.5 5.89543 4.5 7C4.5 8.10457 5.39543 9 6.5 9C7.60457 9 8.5 8.10457 8.5 7ZM10.5 7C10.5 9.20914 8.70914 11 6.5 11C4.29086 11 2.5 9.20914 2.5 7C2.5 4.79086 4.29086 3 6.5 3C8.70914 3 10.5 4.79086 10.5 7ZM21 4H13V6H21V4ZM21 11H13V13H21V11ZM21 18H13V20H21V18ZM6.5 19C5.39543 19 4.5 18.1046 4.5 17C4.5 15.8954 5.39543 15 6.5 15C7.60457 15 8.5 15.8954 8.5 17C8.5 18.1046 7.60457 19 6.5 19ZM6.5 21C8.70914 21 10.5 19.2091 10.5 17C10.5 14.7909 8.70914 13 6.5 13C4.29086 13 2.5 14.7909 2.5 17C2.5 19.2091 4.29086 21 6.5 21ZM6.5 8C7.05228 8 7.5 7.55228 7.5 7C7.5 6.44772 7.05228 6 6.5 6C5.94772 6 5.5 6.44772 5.5 7C5.5 7.55228 5.94772 8 6.5 8Z"></path></svg>
          <span> This Weeks List</span>
        </router-link>
         <router-link
          to="/sales_management/products/allProducts"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(100,205,138,1)"><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
          <span>This Months List</span>
        </router-link>
         <router-link
          to="/sales_management/products/allProducts"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(70,146,221,1)"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path></svg>
          <span>Pending Invoice List</span>
        </router-link>
         <router-link
          to="/sales_management/products/allProducts"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 text-lg transition-all"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="pink"><path d="M8.5 7C8.5 5.89543 7.60457 5 6.5 5C5.39543 5 4.5 5.89543 4.5 7C4.5 8.10457 5.39543 9 6.5 9C7.60457 9 8.5 8.10457 8.5 7ZM10.5 7C10.5 9.20914 8.70914 11 6.5 11C4.29086 11 2.5 9.20914 2.5 7C2.5 4.79086 4.29086 3 6.5 3C8.70914 3 10.5 4.79086 10.5 7ZM21 4H13V6H21V4ZM21 11H13V13H21V11ZM21 18H13V20H21V18ZM6.5 19C5.39543 19 4.5 18.1046 4.5 17C4.5 15.8954 5.39543 15 6.5 15C7.60457 15 8.5 15.8954 8.5 17C8.5 18.1046 7.60457 19 6.5 19ZM6.5 21C8.70914 21 10.5 19.2091 10.5 17C10.5 14.7909 8.70914 13 6.5 13C4.29086 13 2.5 14.7909 2.5 17C2.5 19.2091 4.29086 21 6.5 21ZM6.5 8C7.05228 8 7.5 7.55228 7.5 7C7.5 6.44772 7.05228 6 6.5 6C5.94772 6 5.5 6.44772 5.5 7C5.5 7.55228 5.94772 8 6.5 8Z"></path></svg>
          <span> Paid Invoice List</span>
        </router-link>
       
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
const paymentsDropdown = ref(false);
const hiringDropdown = ref(false);
const reportsDropdown = ref(false);
const hiringStepsDropdown = ref(false);
const employeeMatterDropdown = ref(false);
const holidayDropdown = ref(false);
const contractAndPolicyDropdown = ref(false);
const contractDropdown = ref(false);
const policyDropdown = ref(false);
const timecardDropdown = ref(false);
const taskDropdown = ref(false);
const empDropdown = ref(false);
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
    case 'sales_management-accounts':
      return '/sales_management/accounts'
    case 'sales_management-leads':
      return '/sales_management/leads'
    case 'sales_management-contact':
      return '/sales_management/contact'
    case 'sales_management-products':
      return '/sales_management/products'
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
  padding: 6px;
  border-radius: 10px;
}

.router-link-active.router-link-exact-active:hover {
  background-color: rgb(29 78 216);
}
</style>
