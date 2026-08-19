<template>
  <div
    class="bg-[url('/src/assets/images/sidebg1.jpg')] bg-contain w-1/5 min-w-[300px] min-h-screen sticky top-[80px]"
  >
    <div class="bg-[#cedae425] p-5 h-full flex flex-col font-semibold text-lg">
      <div class="mb-2 bg-cyan-100 rounded-md px-2 space-y-1 py-2">
        <h4
          class="font-bold text-base text-center text-md shadow-xl p-1 rounded-b-md bg-white text-[#2e828a]"
        >
          Customer Success Management <br />
          - Sales Dashboard
        </h4>
        <h2
          class="font-bold flex justify-start items-center gap-2 text-center text-sm text-sky-700"
        >
          <div class="p-1 px-2 rounded-full bg-sky-700 text-white items-center mx-auto">
            <i class="ri-user-line"></i> {{ store?.user?.name }}
          </div>
        </h2>
      </div>
      <router-link
        to="/customer_success_team_sales"
        class="text-center flex items-center gap-2 bg-sky-600 hover:bg-[#96b0d6] text-white font-medium py-2 px-4 rounded-xl duration-200 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="bg-purple-600 p-2 rounded"
          width="36"
          height="36"
          fill="currentColor"
        >
          <path
            d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"
          ></path>
        </svg>
        Dashboard
      </router-link>
      <div v-if="isSidebarLoading" class="flex flex-col gap-2 my-2">
        <div v-for="i in 5" :key="i" class="h-10 bg-white/40 rounded-lg animate-pulse"></div>
      </div>
      <!-- Sidebar Menus -->
      <div v-if="!isSidebarLoading" class="space-y-2 my-2">
        <div v-for="menu in menus" :key="menu.id" class="accordion-group bg-sky-600 rounded-xl">
          <!-- Top level menu -->
          <div
            v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center text-white justify-between w-full p-3 rounded-xl transition-all duration-300 group"
            :class="
              openSection === menu?.id
                ? 'bg-[#292ebe] text-white shadow-md'
                : 'hover:bg-[#96b0d6] hover:text-white hover:shadow-md  text-white shadow-md'
            "
            @click="toggleAccordion(menu?.id)"
          >
            <div class="flex items-center gap-3">
              <i
                class="text-white py-1 px-2 rounded-md"
                :class="menu.icon"
                :style="{ backgroundColor: getMenuColor(menu?.title) }"
              ></i>
              <span class="text-sm">{{ menu?.title }}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              :class="{ 'rotate-180 transition-transform duration-300': openSection === menu.id }"
            >
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
              />
            </svg>
          </div>

          <!-- Children -->
          <div
            v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
          >
            <!-- Direct links -->
            <template v-if="menu.links">
              <router-link
                v-for="link in menu.links"
                :key="link.to"
                :to="link.to"
                class="flex items-center text-white gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                active-class="router-link-active"
              >
                <i
                  class="text-white py-1 px-2 rounded-md"
                  :class="link.icon"
                  :style="{ backgroundColor: getMenuColor(menu.title) }"
                ></i>
                <span>{{ link.text }}</span>
              </router-link>
            </template>

            <!-- Groups -->
            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
                <button
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">
                    <i
                      v-if="group.icon"
                      class="text-white py-1 px-2 rounded-md"
                      :class="group.icon"
                      :style="{ backgroundColor: getMenuColor(menu.title) }"
                    ></i>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      :style="{ backgroundColor: getMenuColor(menu.title) }"
                    >
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{
                      'rotate-180 transition-transform duration-300': openGroup === group.key
                    }"
                  >
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                    />
                  </svg>
                </button>

                <!-- Group links -->
                <div
                  v-show="openGroup === group.key"
                  class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
                >
                  <router-link
                    v-for="link in group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-white duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                    active-class="router-link-active"
                  >
                    <i
                      v-if="link?.icon"
                      class="text-white py-1 px-2 rounded-md"
                      :class="link?.icon"
                      :style="{ backgroundColor: getMenuColor(menu?.title) }"
                    >
                    </i>
                    <span
                      v-else
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: getMenuColor(menu?.title) }"
                    ></span>
                    <span class="text-sm">{{ link?.text }}</span>
                  </router-link>

                  <!-- Sub-groups -->
                  <template v-if="group.sub_groups">
                    <div
                      v-for="sub_group in group.sub_groups"
                      :key="sub_group.key"
                      class="accordion-group"
                    >
                      <button
                        @click="toggleSubNested(sub_group.key)"
                        class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                      >
                        <div class="flex items-center gap-2">
                          <i
                            v-if="sub_group.icon"
                            class="text-white py-1 px-2 rounded-md"
                            :class="sub_group.icon"
                            :style="{ backgroundColor: getMenuColor(menu?.title) }"
                          ></i>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                            :style="{ backgroundColor: getMenuColor(menu.title) }"
                          >
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                          </svg>
                          <span
                            class="text-base text-start"
                            :style="{ color: getMenuColor(menu?.title) }"
                            >{{ sub_group?.title }}</span
                          >
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                          :style="{ color: getMenuColor(menu.title) }"
                          :class="{
                            'rotate-180 transition-transform duration-300':
                              openSubGroup === sub_group.key
                          }"
                        >
                          <path
                            d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                          />
                        </svg>
                      </button>

                      <!-- Sub-group links -->
                      <div
                        v-show="openSubGroup === sub_group.key"
                        class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
                      >
                        <router-link
                          v-for="link in sub_group.links"
                          :key="link.to"
                          :to="link.to"
                          class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-white duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                          active-class="router-link-active"
                        >
                          <i
                            v-if="link.icon"
                            class="text-white py-1 px-2 rounded-md"
                            :class="link.icon"
                            :style="{ backgroundColor: getMenuColor(menu?.title) }"
                          ></i>
                          <span
                            v-else
                            class="w-2 h-2 rounded-full"
                            :style="{ backgroundColor: getMenuColor(menu?.title) }"
                          ></span>
                          <span :style="{ color: getMenuColor(menu?.title) }">{{
                            link?.text
                          }}</span>
                        </router-link>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div v-if="!isSidebarLoading" class="relative">
        <button
          @click="toggleDropdown('team')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="activeDropdown === 'team' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'"
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-xs">My Customer Success Team</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'team' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'team'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div>
              <router-link
                :to="`/customer_success_team_sales/viewTeam`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">View Team</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="!isSidebarLoading" class="relative pt-2">
        <button
          @click="toggleDropdown('task')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="activeDropdown === 'task' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'"
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-no-wrap text-sm">My Task</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'task' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'task'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div class="flex flex-col gap-2 py-1">
              <router-link
                :to="`/customer_success_team_sales/taskList`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">All Task List</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/taskList/pendingTask`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Pending Task</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/taskList/completedTask`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Completed Task</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="!isSidebarLoading" class="relative pt-2">
        <button
          @click="toggleDropdown('actions')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'actions' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-no-wrap text-sm">My Actions</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'actions' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'actions'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div class="flex flex-col gap-2 py-1">
              <router-link
                :to="`/customer_success_team_sales/myActions/weekly`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">My Weekly Action List</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myActions/monthly`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">My Monthly Action List</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="!isSidebarLoading" class="relative pt-2">
        <button
          @click="toggleDropdown('myTeamContacts')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'actions' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-no-wrap text-sm">My Team Contacts</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'myTeamContacts' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'myTeamContacts'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div class="flex flex-col gap-2 py-1">
              <router-link
                :to="`/customer_success_team_sales/my-team-contacts/htss`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Contacts of Customer Success Team</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/my-team-contacts/company`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Contacts of {{ authStore?.companyName }} Representative</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/my-team-contacts/partner`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Contacts of MSC Representative</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <!-- My Contact -->
      <div v-if="!isSidebarLoading" class="relative pt-2">
        <!-- MAIN TOGGLE -->
        <button
          @click="toggleDropdown('contacts')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'contacts' ? 'rounded-t-xl shadow-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-nowrap text-sm">My Contacts</span>
          </div>

          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'contacts' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- DROPDOWN CONTENT -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'contacts'"
            class="ps-4 space-y-1 bg-sky-600 rounded-b-xl pb-2"
          >
            <!-- By Solution Dropdown -->
            <div class="relative">
              <button
                @click="toggleNestedDropdown('bySolution')"
                class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-[#96b0d6] group"
              >
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="bg-purple-600 p-2 rounded"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path
                      d="M9 3V5H6V7H9V9H6V11H9V13H6V15H9V17H6V19H9V21H11V19H13V21H15V19H18V17H15V15H18V13H15V11H18V9H15V7H18V5H15V3H13V5H11V3H9ZM11 7H13V9H11V7ZM13 9H15V11H13V9ZM11 11H13V13H11V11ZM13 13H15V15H13V13ZM11 15H13V17H11V15Z"
                    />
                  </svg>
                  <span class="text-sm font-medium">By Solution</span>
                </div>
                <svg
                  class="w-4 h-4 transition-transform duration-300"
                  :class="openNestedDropdown === 'bySolution' ? 'rotate-180' : ''"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <!-- By Solution Links -->
              <div
                v-show="openNestedDropdown === 'bySolution'"
                class="ml-4 mt-1 space-y-1 border-l-2 border-purple-400 pl-3"
              >
                <router-link
                  v-for="solution in [
                    'Structure Analysis Service',
                    'System Dynamics Analysis Service',
                    'Acoustics Analysis Service',
                    'Fluids Analysis Service',
                    'Autonomous Analysis Service',
                    'VM&C Analysis Service',
                    'ICME Analysis Service'
                  ]"
                  :key="solution"
                  :to="`/customer_success_team_sales/myContact/solution-${solution
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`"
                  class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                  @click="activeDropdown = null"
                >
                  <svg
                    class="bg-purple-600 p-1 rounded"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 20"
                    width="26"
                    height="26"
                    fill="currentColor"
                  >
                    <path
                      d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                    ></path>
                  </svg>
                  <span class="text-sm">{{ solution }}</span>
                </router-link>
              </div>
            </div>
            <!-- By Software Dropdown -->
            <button
              @click="toggleNestedDropdown('bySoftware')"
              class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-[#96b0d6] group"
            >
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bg-purple-600 p-2 rounded"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="currentColor"
                >
                  <path
                    d="M9 3V5H6V7H9V9H6V11H9V13H6V15H9V17H6V19H9V21H11V19H13V21H15V19H18V17H15V15H18V13H15V11H18V9H15V7H18V5H15V3H13V5H11V3H9ZM11 7H13V9H11V7ZM13 9H15V11H13V9ZM11 11H13V13H11V11ZM13 13H15V15H13V13ZM11 15H13V17H11V15Z"
                  />
                </svg>
                <span class="text-sm font-medium">By Software</span>
              </div>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="openNestedDropdown === 'bySoftware' ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- By Solution Links -->
            <div
              v-show="openNestedDropdown === 'bySoftware'"
              class="ml-4 mt-1 space-y-1 border-l-2 border-purple-400 pl-3"
            >
              <router-link
                v-for="software in [
                  'Adams',
                  'CAE Fatigue',
                  'MSC Apex',
                  'Dytran',
                  'Marc',
                  'Nastran',
                  'Patran',
                  'MSC Cradle CFD',
                  'MSC CoSim',
                  'Romax',
                  'Easy5',
                  'Elements',
                  'Material Center',
                  'Digimat',
                  'Material Center Databanks',
                  'ODYSSEE',
                  'Simufact',
                  'FTI FormingSuite',
                  'VTD Scale',
                  'VTD',
                  'Cloud',
                  'Actran'
                ]"
                :key="software"
                :to="`/customer_success_team_sales/myContact/software-${software
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">{{ software }}</span>
              </router-link>
            </div>

            <!-- Engineering Department Link (Normal Link) -->
            <router-link
              :to="`/customer_success_team_sales/myContact/engineering-department`"
              class="flex items-center text-white gap-3 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6] rounded-lg"
              @click="activeDropdown = null"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bg-purple-600 p-2 rounded"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path
                  d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM12 11V17H18V11H12ZM14 13H16V15H14V13ZM8 11C6.89543 11 6 11.8954 6 13C6 14.1046 6.89543 15 8 15C9.10457 15 10 14.1046 10 13C10 11.8954 9.10457 11 8 11ZM8 13C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14C7 13.4477 7.44772 13 8 13ZM8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7ZM8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9Z"
                />
              </svg>
              <span class="text-sm font-medium">Engineering Department</span>
            </router-link>

            <!-- Purchase and Sales Department Link (Normal Link) -->
            <router-link
              :to="`/customer_success_team_sales/myContact/purchase-sales-department`"
              class="flex items-center text-white gap-3 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6] rounded-lg"
              @click="activeDropdown = null"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bg-purple-600 p-2 rounded"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path
                  d="M10 15H8V11H6V9H8V7H10V9H12V11H10V15ZM18 15H16V11H14V9H16V7H18V9H20V11H18V15ZM21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 5H4V19H20V5Z"
                />
              </svg>
              <span class="text-sm font-medium">Purchase and Sales Department</span>
            </router-link>
          </div>
        </transition>
      </div>

        <!-- My Schedule -->
      <div v-if="!isSidebarLoading" class="relative pt-2">
        <!-- MAIN TOGGLE -->
        <button
          @click="toggleDropdown('contacts2')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'contacts2' ? 'rounded-t-xl shadow-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-nowrap text-sm">My Schedule Management</span>
          </div>

          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'contacts2' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- DROPDOWN CONTENT -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'contacts2'"
            class="ps-4 space-y-1 bg-sky-600 rounded-b-xl pb-2"
          >

                      <!-- Engineering Department Link (Normal Link) -->
            <router-link
              :to="`/customer_success_team_sales/meeting-management/create-meeting-schedule`"
              class="flex items-center text-white gap-3 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6] rounded-lg"
              @click="activeDropdown = null"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bg-purple-600 p-2 rounded"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path
                  d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM12 11V17H18V11H12ZM14 13H16V15H14V13ZM8 11C6.89543 11 6 11.8954 6 13C6 14.1046 6.89543 15 8 15C9.10457 15 10 14.1046 10 13C10 11.8954 9.10457 11 8 11ZM8 13C8.55228 13 9 13.4477 9 14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14C7 13.4477 7.44772 13 8 13ZM8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7ZM8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9Z"
                />
              </svg>
              <span class="text-sm font-medium">Create Meeting Schedule</span>
            </router-link>

            <!-- Purchase and Sales Department Link (Normal Link) -->
            <router-link
              :to="`/customer_success_team_sales/meeting-management/schedule-list`"
              class="flex items-center text-white gap-3 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6] rounded-lg"
              @click="activeDropdown = null"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="bg-purple-600 p-2 rounded"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path
                  d="M10 15H8V11H6V9H8V7H10V9H12V11H10V15ZM18 15H16V11H14V9H16V7H18V9H20V11H18V15ZM21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 5H4V19H20V5Z"
                />
              </svg>
              <span class="text-sm font-medium">Meeting Scheduled By Me</span>
            </router-link>

            <!-- By Software Dropdown -->
            <button
              @click="toggleNestedDropdown('bySoftware22')"
              class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-[#96b0d6] group"
            >
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bg-purple-600 p-2 rounded"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="currentColor"
                >
                  <path
                    d="M9 3V5H6V7H9V9H6V11H9V13H6V15H9V17H6V19H9V21H11V19H13V21H15V19H18V17H15V15H18V13H15V11H18V9H15V7H18V5H15V3H13V5H11V3H9ZM11 7H13V9H11V7ZM13 9H15V11H13V9ZM11 11H13V13H11V11ZM13 13H15V15H13V13ZM11 15H13V17H11V15Z"
                  />
                </svg>
                <span class="text-sm font-medium">Scheduled Meeting</span>
              </div>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="openNestedDropdown === 'bySoftware22' ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- By Solution Links -->
            <div
              v-show="openNestedDropdown === 'bySoftware22'"
              class="ml-4 mt-1 space-y-1 border-l-2 border-purple-400 pl-3"
            >
              <router-link
                v-for="software in [
                  'Todays Scheduled Meeting',
                  'This Weeks Scheduled Meeting',
                  'This Months Scheduled Meeting',
                  'This Quarters Scheduled Meeting',
                  'This Years Scheduled Meeting',
                ]"
                :key="software"
                :to="`/customer_success_team_sales/meeting-management/scheduled-meetings/${software
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">{{ software }}</span>
              </router-link>
            </div>


          </div>
        </transition>
      </div>

      <div v-if="!isSidebarLoading" class="relative pt-2">
        <button
          @click="toggleDropdown('solutions')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'solutions' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-no-wrap text-sm">My MSC Solutions</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'solutions' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'solutions'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div class="flex flex-col gap-2 py-1">
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/Structure Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Structure Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/System Dynamics Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">System Dynamics Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/Acoustics Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Acoustics Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/Fluids Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Fluids Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/Autonomous Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">Autonomous Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/VM&C Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">VM&C Analysis Service</span>
              </router-link>
              <router-link
                :to="`/customer_success_team_sales/myMscSolution/ICME Analysis Service`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <hr />
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">ICME Analysis Service</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="!isSidebarLoading" class="relative pt-2">
        <button
          @click="toggleDropdown('softwares')"
          class="flex items-center text-white justify-between w-full p-3 transition-all duration-300 group bg-sky-600 hover:bg-[#96b0d6]"
          :class="
            activeDropdown === 'softwares' ? 'rounded-t-xl shadow-b-2xl' : 'rounded-xl shadow-md'
          "
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bg-purple-600 p-2 rounded"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path
                d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"
              ></path>
            </svg>
            <span class="text-no-wrap text-sm">My MSC Softwares</span>
          </div>

          <!-- Arrow -->
          <svg
            class="w-4 h-4 transition-transform duration-300"
            :class="activeDropdown === 'softwares' ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown -->
        <transition name="fade-slide">
          <div
            v-show="activeDropdown === 'softwares'"
            class="ps-4 space-y-1 border-gray-300 bg-sky-600 rounded-b-xl"
          >
            <div class="flex flex-col gap-2 py-1">
              <router-link
                v-for="software in [
                  'Adams',
                  'CAE Fatigue',
                  'MSC Apex',
                  'Dytran',
                  'Marc',
                  'Nastran',
                  'Patran',
                  'MSC Cradle CFD',
                  'MSC CoSim',
                  'Romax',
                  'Easy5',
                  'Elements',
                  'Material Center',
                  'Digimat',
                  'Material Center Database',
                  'ODYSSEE',
                  'Simufact',
                  'FTI FormingSuite',
                  'VTD Scale',
                  'VTD',
                  'Cloud',
                  'Actran'
                ]"
                :key="software"
                :to="`/customer_success_team_sales/myMscSoftware/${software}`"
                class="flex items-center border-s-2 rounded-e-lg text-white gap-2 p-2 text-sm transition-all duration-300 hover:bg-[#96b0d6]"
                @click="activeDropdown = null"
              >
                <svg
                  class="bg-purple-600 p-1 rounded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 20"
                  width="26"
                  height="26"
                  fill="currentColor"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                  ></path>
                </svg>
                <span class="text-sm">{{ software }}</span>
              </router-link>
            </div>
          </div>
        </transition>
      </div>

      <button
        type="button"
        class="py-2 px-5 mt-4 w-1/2 bg-red-800 rounded-md text-white duration-300"
        @click="store.logout(), router.push('/login/adminLogin')"
      >
        Log Out
      </button>

      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { useAuthStore } from '/src/stores/AuthStore'

import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'
// import { useOperationStore } from '../stores/accountStore'
const authStore = useAuthStore()
const route = useRoute()
const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})

const store = useAuthStore()
const router = useRouter()

// Color palette for different menu items
const menuColors = {
  'My Locations': '#BA55D3', // Vivid Blue
  'My Customer Info': '#00BA9A', // Bright Emerald Green
  'Planning Management': 'orange', // Pure Gold Yellow
  'Schedule Management': '#FF4500', // Vivid Orange Red
  'Cleaning Management': '#BA55D3', // Rich Purple/Violet
  'Security Management': '#00CED1', // Bright Turquoise
  'Invoice Generator': '#a000ff', // Bright Turquoise
  'My Companies': '#0ea5e9' // Add more menu titles and their colors as needed
}

// Function to get color for a menu
const getMenuColor = (menuTitle) => {
  return menuColors[menuTitle] || '#6B7280' // Default gray if not found
}

// 🔑 track open states
const currentAccordions = ref('')
const openGroup = ref(null) // for groups
const openSubGroup = ref(null) // for sub_groups

// Add this ref for nested dropdowns
const openNestedDropdown = ref(null)

// Add this function to toggle nested dropdowns
const toggleNestedDropdown = (name) => {
  openNestedDropdown.value = openNestedDropdown.value === name ? null : name
}

function toggleAccordion(name) {
  if (name === currentAccordions.value) {
    currentAccordions.value = ''
    openGroup.value = null
    openSubGroup.value = null
  } else {
    currentAccordions.value = name
    openGroup.value = null
    openSubGroup.value = null
  }
}

function toggleNested(key) {
  openGroup.value = openGroup.value === key ? null : key
  openSubGroup.value = null
}

function toggleSubNested(key) {
  openSubGroup.value = openSubGroup.value === key ? null : key
}

watch(
  () => store.isAuthenticated,
  (newVal) => {
    if (!newVal) router.push('/')
  }
)

const services = ref([])

const getServices = async () => {
  try {
    const response = await api().get(`/customers/by-user/${store.user?.id}`)
    services.value = response.data.data.map((service) => ({
      ...service,
      slug: service.name.replace(/\s+/g, '-').toLowerCase()
    }))
  } catch (error) {
    console.error('Error fetching services:', error)
  }
}
const customers = ref([])
const isSidebarLoading = ref(false)

const fetchCompanyNames = async (teamId) => {
  if (!teamId) return

  isSidebarLoading.value = true

  try {
    const { data } = await api().get(`/success-teams/${teamId}`)
    customers.value = data?.company.customers ?? []
  } catch (error) {
    console.error('Error fetching customer names:', error)
    customers.value = {}
  } finally {
    isSidebarLoading.value = false
  }
}

watch(
  () => authStore.role,
  (role) => {
    if (role !== 'sales-executive' && role !== 'sales-executive') return

    const teamId = authStore.team_id

    if (!teamId) {
      console.warn('Team ID missing for sales-executive')
      return
    }

    fetchCompanyNames(teamId)
  },
  { immediate: true }
)

const menus = ref([
  {
    id: 'Systems',
    title: 'My Locations',
    icon: 'ri-user-settings-fill',
    key: 'myCustomers',
    links: []
  }
])

// 🔁 Re-fetch companies when team_id changes (dropdown or URL)
watch(
  () => authStore.team_id,
  (newTeamId, oldTeamId) => {
    if (!newTeamId || newTeamId === oldTeamId) return

    fetchCompanyNames(newTeamId)
  },
  { immediate: true }
)

watch(
  [() => authStore.role, () => services.value, () => customers.value],
  ([role]) => {
    const systemMenu = menus.value.find((m) => m.id === 'Systems')
    if (!systemMenu) return

    // 🔹 Executive Sales → Customers (flat)
    if (role === 'sales-executive' || role === 'sales-executive') {
      systemMenu.title = 'My Locations'
      systemMenu.icon = 'ri-user-settings-fill'

      systemMenu.links = (customers.value || []).map((customer) => ({
        to: {
          path: `/customer_success_team_sales/my_customers/${customer.id}`,
          query: {
            id: customer.id,
            name: customer.user?.name || customer.name,
            recordId: customer.record_id,
            industryId: customer.industry_id
          }
        },
        text: customer.user?.name || 'Unnamed Customer',
        icon: 'ri-user-line'
      }))

      // IMPORTANT: remove groups
      delete systemMenu.groups
    }

    // 🔹 Other roles → My Customers (flat)
    else {
      systemMenu.title = 'My Customers'
      systemMenu.icon = 'ri-user-settings-fill'

      systemMenu.links = (services.value || []).map((service) => ({
        to: {
          path: `/customer_success_team_sales/my_customers/${service.id}`,
          query: {
            id: service.id,
            name: service.name
          }
        },
        text: service.name,
        icon: 'ri-user-line'
      }))

      // IMPORTANT: remove groups
      delete systemMenu.groups
    }
  },
  { immediate: true }
)

const myTeams = ref([])

const fetchMyTeams = async () => {
  const { data } = await api().get('/my-success-team')
  myTeams.value = data.data.data
}

const activeDropdown = ref(null)

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

onMounted(() => {
  getServices()
  fetchMyTeams()
})
</script>

<style scoped>
.router-link-active {
  background-color: rgba(5, 59, 238, 0.671);
  color: white;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* Ensure text color remains visible on hover for links with dynamic colors */
.router-link-active i,
.router-link-active span {
  color: white !important;
}

/* For hover states - ensure text remains readable */
.hover\:bg-gray-200:hover i,
.hover\:bg-gray-200:hover span {
  color: #2e318a !important;
}

/* Ensure dynamic colors are applied with higher specificity */
.accordion-group i[style*='color'],
.accordion-group span[style*='color'],
.accordion-group svg[style*='color'] {
  transition: color 0.3s ease;
}

/* Ensure icons have proper spacing and visibility */
i {
  display: inline-block;
  min-width: 20px;
  text-align: center;
}

/* Make sure all icons are visible with proper color contrast */
.router-link-active i {
  opacity: 1 !important;
}
</style>
