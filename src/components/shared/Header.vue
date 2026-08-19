<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuthStore } from "@/stores/authStore";
const currentPage = ref("Home");
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const showNavbar = ref(false);
const currentScrollPosition = ref(0);

const myFunction = () => {
  currentScrollPosition.value = window.scrollY;
};

const loginCookie = useCookie("loginCookie");
const tokenCookie = useCookie("tokenCookie");
const userCookie = useCookie("userCookie");
const logoutUser = () => {
  authStore.logout();
  loginCookie.value = "";
  tokenCookie.value = "";
  userCookie.value = "";
  router.push(`/login`);
};

const getDashboardLink = () => {
  if (!authStore.user) return "/login";

  const department = authStore.user.department
    ?.toLowerCase()
    .replace(/\s+/g, "-");
  const role = authStore.user.role?.toLowerCase();

  switch (department) {
    case "e-commerce":
      return "/admin/ecommerce/dashboard";
    case "website":
      return "/admin/website_management";
    case "inventory":
      return "/admin/inventory_management";
    case "supply-chain-management":
    case "scm":
      return "/admin/supply_chain_management";
    case "business-development":
      return "/admin/business_development";
    default:
      // Handle customer or other roles
      return role === "customer" ? "/customer-dashboard" : "/dashboard";
  }
};

onMounted(() => {
  window.addEventListener("scroll", myFunction);
});
</script>

<template>
  <div
    class="navbar h-[70px] w-full fixed bg-white justify-between items-center text-black font-semibold top-0 z-40 px-[5%] shadow-xl"
    ref="navBar"
  >
    <div class="flex items-center justify-center text-sm w-full font-semibold">
      <nuxt-link to="/" class="text-2xl font-bold flex gap-2">
        <img src="/assets/logo/HTBH_Logo.png" alt="" class="w-32" />
      </nuxt-link>
      <div class="mx-auto flex items-right justify-right pt-3">
        <Menubar class="menubar">
          <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
                to="/"
                class="text-lg hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white"
              >
                Home</NuxtLink
              >
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
                to="/hotel_development"
                class="text-lg hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white"
              >
                Hotel Development
              </NuxtLink>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <div
                class="flex items-center hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white"
              >
                <p class="text-lg">Hospitality Product &amp; Service</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="mx-2"
                >
                  <path
                    d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                  ></path>
                </svg>
              </div>
            </MenubarTrigger>
            <MenubarContent class="bg-white">
              <MenubarSub>
                <p
                  class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                >
                  <MenubarSubTrigger>
                    <p class="text-lg font-semibold">Telephone Systems</p>
                  </MenubarSubTrigger>
                </p>
                <MenubarSubContent class="bg-white">
                  <MenubarItem>
                    <NuxtLink
                      to="/hospitality_product_service/telephone_systems/cisco"
                      class="text-lg w-full font-semibold px-2 border-b-2 border-slate-200 hover:bg-[#2c9299] hover:text-white p-1"
                    >
                      Cisco
                    </NuxtLink>
                  </MenubarItem>
                  <MenubarItem>
                    <NuxtLink
                      to="/hospitality_product_service/telephone_systems/mitel"
                      class="text-lg w-full font-semibold px-2 border-b-2 border-slate-200 hover:bg-[#2c9299] hover:text-white p-1"
                    >
                      Mitel
                    </NuxtLink>
                  </MenubarItem>
                  <MenubarItem>
                    <NuxtLink
                      to="/hospitality_product_service/telephone_systems/NEC"
                      class="text-lg w-full font-semibold px-2 border-b-2 border-slate-200 hover:bg-[#2c9299] hover:text-white p-1"
                    >
                      NEC
                    </NuxtLink>
                  </MenubarItem>
                  <MenubarItem>
                    <NuxtLink
                      to="/hospitality_product_service/telephone_systems/phone_suite"
                      class="text-lg w-full font-semibold px-2 hover:bg-[#2c9299] hover:text-white p-1"
                    >
                      PhoneSuite
                    </NuxtLink>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <p
                  class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                >
                  <MenubarSubTrigger>
                    <p class="text-lg font-semibold">Structured Cabling</p>
                  </MenubarSubTrigger>
                </p>
                <MenubarSubContent class="bg-white">
                  <MenubarItem>
                    <NuxtLink
                      to="/hospitality_product_service/structured_cabling"
                      class="text-lg w-full px-2 font-semibold hover:bg-[#2c9299] hover:text-white p-1 border-1 border-black"
                    >
                      Cat 5/6 Cables
                    </NuxtLink>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <p
                  class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                >
                  <MenubarSubTrigger>
                    <p class="text-lg font-semibold">TVs and Displays</p>
                  </MenubarSubTrigger>
                </p>
                <MenubarSubContent class="bg-white">
                  <MenubarSub>
                    <p
                      class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <MenubarSubTrigger>
                        <p class="text-lg font-semibold">
                          Hospitality Television
                        </p>
                      </MenubarSubTrigger>
                    </p>
                    <MenubarSubContent class="bg-white !p-0 !m-0">
                      <MenubarItem>
                        <NuxtLink
                          to="/hospitality_product_service/tvs_and_displays/hospitality_television/samsung_hospitality"
                          class="text-lg w-full font-semibold px-2 border-b-2 border-slate-200 hover:bg-[#2c9299] hover:text-white p-1"
                        >
                          Samsung Hospitality
                        </NuxtLink>
                      </MenubarItem>
                      <MenubarItem>
                        <NuxtLink
                          to="/hospitality_product_service/tvs_and_displays/hospitality_television/lg_hospitality"
                          class="text-lg w-full font-semibold px-2 hover:bg-[#2c9299] hover:text-white p-1"
                        >
                          LG Hospitality
                        </NuxtLink>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <p
                      class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <MenubarSubTrigger>
                        <p class="text-lg font-semibold">Medical Display</p>
                      </MenubarSubTrigger>
                    </p>
                    <MenubarSubContent class="bg-white !p-0 !m-0">
                      <MenubarItem>
                        <p
                          class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                        >
                          Samsung Healthcare Television
                        </p>
                      </MenubarItem>
                      <MenubarItem>
                        <p
                          class="text-lg w-full font-semibold px-2 hover:bg-[#2c9299] hover:text-white p-1"
                        >
                          LG Healthcare Television
                        </p>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <p
                      class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <MenubarSubTrigger>
                        <p class="text-lg font-semibold">Digital Signage</p>
                      </MenubarSubTrigger>
                    </p>
                    <MenubarSubContent class="bg-white !p-0 !m-0">
                      <MenubarItem>
                        <p
                          class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                        >
                          Samsung Digital Signage
                        </p>
                      </MenubarItem>
                      <MenubarItem>
                        <p
                          class="text-lg w-full font-semibold px-2 hover:bg-[#2c9299] hover:text-white p-1"
                        >
                          LG Digital Signage
                        </p>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <p
                      class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <MenubarSubTrigger>
                        <p class="text-lg font-semibold">
                          Hospitality Furniture
                        </p>
                      </MenubarSubTrigger>
                    </p>
                    <MenubarSubContent class="bg-white">
                      <MenubarItem>
                        <p
                          class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2"
                        >
                          Furniture
                        </p>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <p
                      class="text-lg hover:bg-[#2c9299] hover:text-white py-1 px-3"
                    >
                      <MenubarItem>
                        <NuxtLink
                          to="/hospitality_product_service/tvs_and_displays/operations_and_maintanence/operations_maintanence"
                          class="text-lg font-semibold"
                        >
                          Operations and Maintanence
                        </NuxtLink>
                      </MenubarItem>
                    </p>
                  </MenubarSub>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <p
                  class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                >
                  <MenubarSubTrigger>
                    <p class="text-lg font-semibold">Equipment</p>
                  </MenubarSubTrigger>
                </p>
                <MenubarSubContent class="bg-white">
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <NuxtLink to="/hospitality_product_service/equipment/AC">
                        AC
                      </NuxtLink>
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <NuxtLink
                        to="/hospitality_product_service/equipment/fridge"
                      >
                        Fridge
                      </NuxtLink>
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <NuxtLink
                        to="/hospitality_product_service/equipment/microwave"
                      >
                        Microwave
                      </NuxtLink>
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      <NuxtLink
                        to="/hospitality_product_service/equipment/safe"
                      >
                        Safe
                      </NuxtLink>
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2"
                    >
                      <NuxtLink
                        to="/hospitality_product_service/equipment/dishwasher"
                      >
                        Dishwasher
                      </NuxtLink>
                    </p>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <p class="text-lg hover:bg-[#2c9299] hover:text-white p-1 px-2">
                  <MenubarSubTrigger>
                    <p class="text-lg font-semibold">Network Solution</p>
                  </MenubarSubTrigger>
                </p>
                <MenubarSubContent class="bg-white">
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      Data Center
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      Wi-Fi Solution
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      Wi-Fi Security
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                    >
                      Network Setup
                    </p>
                  </MenubarItem>
                  <MenubarItem>
                    <p
                      class="text-lg w-full font-semibold hover:bg-[#2c9299] hover:text-white p-1 px-2"
                    >
                      Surveillance System
                    </p>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
                to="/upcoming_project"
                class="text-lg hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white"
              >
                Our Upcoming Project
              </NuxtLink>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <span
                class="flex items-center hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white"
              >
                <p class="text-lg">Investor</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="mx-2"
                >
                  <path
                    d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                  ></path>
                </svg>
              </span>
            </MenubarTrigger>
            <MenubarContent class="bg-white">
              <MenubarItem>
                <NuxtLink
                  to="/investor/want_to_invest"
                  class="text-lg w-full hover:bg-[#2c9299] hover:text-white p-1 px-2 border-b-2 border-slate-200"
                >
                  Want to Invest
                </NuxtLink>
              </MenubarItem>
              <MenubarItem>
                <NuxtLink
                  to="/investor/islamic_invest_model"
                  class="text-lg w-full hover:bg-[#2c9299] hover:text-white p-1 px-2"
                >
                  Islamic Investor Model
                </NuxtLink>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
                to="/contact"
                class="text-xl px-1 hover:bg-[#2c9299] rounded py-1.5 hover:text-white"
              >
                Contact Us
              </NuxtLink>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
                to="/dashboard"
                class="text-xl px-1 hover:bg-[#2c9299] rounded py-1.5 hover:text-white hidden"
              >
                Dashboard
              </NuxtLink>
            </MenubarTrigger>
          </MenubarMenu>
          <!-- <MenubarMenu>
            <MenubarTrigger>
              <NuxtLink
              to="/login"
                class="text-xl px-1 hover:bg-[#2c9299] rounded py-1.5 hover:text-white"
              >
                Login
              </NuxtLink>
            </MenubarTrigger>
          </MenubarMenu> -->
        </Menubar>
      </div>
      <div class="pt-3 flex items-center gap-4">
        <!-- <nuxt-link
          to="/login"
          class="border-[1px] py-1 px-2 rounded text-lg font-semibold flex gap-2"
        >
          Login
        </nuxt-link> -->
        <nuxt-link
          v-if="!authStore.user"
          to="/login"
          class="cursor-pointer border-[1px] border-[#013067] text-lg hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white font-semibold flex gap-2"
          >Login</nuxt-link
        >
        <NuxtLink
          v-if="authStore.user"
          :to="getDashboardLink()"
          class="cursor-pointer border-[1px] border-[#013067] text-lg hover:bg-[#2c9299] rounded px-1 py-1.5 hover:text-white font-semibold flex gap-2"
        >
          <span class="flex items-center gap-2">
            <Icon name="material-symbols:dashboard" class="text-lg" />
            Dashboard
          </span>
        </NuxtLink>
        <p
          v-if="authStore.user"
          @click="logoutUser()"
          class="cursor-pointer border-[1px] border-[#013067] text-lg hover:bg-[#2c9299] rounded px-2 py-1.5 bg-red-500 text-white hover:text-white font-semibold flex gap-2"
        >
          Logout
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menubar {
  border: none;
}
.menubar-menu {
  font-size: 30px;
}
.router-link-exact-active {
  color: #013067;
  font-weight: bold;
}
.router-link-exact-active:hover {
  color: white;
  font-weight: bold;
}
.submenu:hover .submenu-item {
  display: block;
  background-color: #2c9299;
}
.sub-submenu:hover .sub-submenu-item {
  display: block;
  background-color: #2c9299;
}
</style>
