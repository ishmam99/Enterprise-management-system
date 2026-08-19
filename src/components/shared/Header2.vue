<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
} from '@/components/ui/menubar'
</script>

<template>
  <div
    class="fixed top-0 w-full z-50 sm:px-[5%] h-[80px] flex bg-white items-center navBarStyle"
    ref="navBar"
  >
    <div
      class="sticky sm:static w-full flex justify-between items-center text-black gap-5 pt-3 sm:bg-transparent px-[5%] sm:px-0 z-50"
    >
      <nuxt-link to="/" class="text-2xl font-bold flex gap-2">
        <img src="/assets/logo/HTBH_Logo.png" alt="" class="w-32" />
      </nuxt-link>
      <div
        class="absolute sm:static mt-[55px] sm:mt-0 w-full sm:w-fit z-40 sm:bg-transparent flex flex-col sm:flex-row gap-5 items-center font-bold text-md justify-center duration-200"
      >
        <p :class="navigationMenuTriggerStyle()">
          <NuxtLink
            to="/"
            class="text-lg hover:bg-[#2c9299] hover:px-2 hover:py-1.5 hover:text-white rounded"
          >
            Home</NuxtLink
          >
        </p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <p :class="navigationMenuTriggerStyle()">
                <NuxtLink
                  to="/menu"
                  class="text-lg hover:bg-[#2c9299] rounded hover:px-2 hover:py-1.5 hover:text-white"
                >
                  Hotel Development</NuxtLink
                >
              </p>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div
          class="flex items-center gap-5 hover:bg-[#2c9299] rounded hover:px-2 hover:py-1.5 hover:text-white"
        >
          <div
            class="font-semibold text-lg flex gap-1 items-center relative group"
          >
            <p class="hidden sm:block cursor-pointer lg:flex">
              Hospitality Products &amp; Services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <path
                  d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                ></path>
              </svg>
            </p>
            <div
              class="p-2 rounded absolute top-[110%] right-0 hidden group-hover:flex text-black bg-white drop-shadow-md flex-col gap-2"
            >
              <!-- <NuxtLink to="/products" class="hover:bg-[#e6e1ce] px-2 py-1 rounded">Products</NuxtLink> -->

              <ul class="relative submenu">
                <NuxtLink
                  to="/products"
                  class="hover:bg-[hsl(184,55%,39%)] hover:text-white px-2 py-1 rounded flex justify-between"
                  >Telephone Systems
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="currentColor"
                  >
                    <path
                      d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                    ></path>
                  </svg>
                </NuxtLink>

                <ul
                  class="w-[150px] absolute hidden p-2 right-[-75%] bg-white drop-shadow-lg top-0 rounded-lg submenu-item"
                >
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products" class="p-2 rounded"
                      >Cisco</nuxt-link
                    >
                  </li>
                  <li
                    class="shadow-2xl py-1 border-black text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products-wholesale" class="p-2 rounded"
                      >Mitel</nuxt-link
                    >
                  </li>
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products" class="p-2 rounded"
                      >NEC</nuxt-link
                    >
                  </li>
                  <li
                    class="shadow-2xl py-1 border-black text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products-wholesale" class="p-2 rounded"
                      >PhoneSuite</nuxt-link
                    >
                  </li>
                </ul>
              </ul>
              <ul class="relative submenu">
                <NuxtLink
                  to="/products"
                  class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                  >Structured Cabling
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="currentColor"
                  >
                    <path
                      d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                    ></path>
                  </svg>
                </NuxtLink>

                <ul
                  class="w-[250px] absolute hidden p-2 right-[-120%] bg-white drop-shadow-lg top-0 rounded-lg submenu-item"
                >
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products" class="p-2 rounded"
                      >Cat 5/6 Cabling</nuxt-link
                    >
                  </li>
                </ul>
              </ul>
              <ul class="relative submenu">
                <NuxtLink
                  to="/products"
                  class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                  >TVs and Displays
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="currentColor"
                  >
                    <path
                      d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                    ></path>
                  </svg>
                </NuxtLink>

                <ul
                  class="w-[275px] absolute hidden p-2 right-[-135%] bg-white drop-shadow-lg top-0 rounded-lg submenu-item"
                >
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded sub-submenu"
                  >
                    <NuxtLink
                      to="/products"
                      class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                      >Hospitality Television
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                      >
                        <path
                          d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                        ></path>
                      </svg>
                    </NuxtLink>
                    <ul
                      class="w-[200px] absolute hidden p-2 right-[-70%] bg-white text-black drop-shadow-lg top-0 rounded-lg sub-submenu-item"
                    >
                      <li
                        class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products" class="p-2 rounded"
                          >Samsung Hospitality</nuxt-link
                        >
                      </li>
                      <li
                        class="shadow-2xl py-1 border-black text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products-wholesale" class="p-2 rounded"
                          >LG Hospitality</nuxt-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded sub-submenu"
                  >
                    <NuxtLink
                      to="/products"
                      class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                      >Medical Displays
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                      >
                        <path
                          d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                        ></path>
                      </svg>
                    </NuxtLink>
                    <ul
                      class="w-[250px] absolute hidden p-2 right-[-70%] bg-white text-black drop-shadow-lg top-[25%] rounded-lg sub-submenu-item"
                    >
                      <li
                        class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products" class="p-2 rounded"
                          >Samsung Healthcare Televisions</nuxt-link
                        >
                      </li>
                      <li
                        class="shadow-2xl py-1 border-black text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products-wholesale" class="p-2 rounded"
                          >LG Healthcare Televisions</nuxt-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded sub-submenu"
                  >
                    <NuxtLink
                      to="/products"
                      class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                      >Digital Signage
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                      >
                        <path
                          d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                        ></path>
                      </svg>
                    </NuxtLink>
                    <ul
                      class="w-[200px] absolute hidden p-2 right-[-70%] bg-white text-black drop-shadow-lg top-0 rounded-lg sub-submenu-item"
                    >
                      <li
                        class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products" class="p-2 rounded"
                          >Samsung Digital Signage</nuxt-link
                        >
                      </li>
                      <li
                        class="shadow-2xl py-1 border-black text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products-wholesale" class="p-2 rounded"
                          >LG Digital Signage</nuxt-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded sub-submenu"
                  >
                    <NuxtLink
                      to="/products"
                      class="hover:bg-[#2d939a] hover:text-white px-2 py-1 rounded flex justify-between"
                      >Hospitality Furniture
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                      >
                        <path
                          d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"
                        ></path>
                      </svg>
                    </NuxtLink>
                    <ul
                      class="w-[200px] absolute hidden p-2 right-[-70%] bg-white text-black drop-shadow-lg top-0 rounded-lg sub-submenu-item"
                    >
                      <li
                        class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                      >
                        <nuxt-link to="/products" class="p-2 rounded"
                          >Furniture</nuxt-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#2c9299] hover:text-white rounded"
                  >
                    <nuxt-link to="/products" class="p-2 rounded"
                      >Operation and Maintenance</nuxt-link
                    >
                  </li>
                </ul>
              </ul>

              <!-- <ul class="relative submenu">
                <NuxtLink
                  to="/equipments"
                  class="hover:bg-[#e6e1ce] px-2 py-1 rounded flex justify-between"
                  >Equipment
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path></svg>
                </NuxtLink>

                <ul
                  class="w-[150px] absolute hidden p-2 right-[-120%] bg-white drop-shadow-lg top-0 rounded-lg submenu-item"
                >
                  <li
                    class="shadow-2xl py-1 text-lg hover:bg-[#e6e1ce] rounded"
                  >
                    <nuxt-link to="/equipments" class="p-2 rounded"
                      >Retail</nuxt-link
                    >
                  </li>
                  <li
                    class="shadow-2xl py-1 border-black text-lg hover:bg-[#e6e1ce] rounded"
                  >
                    <nuxt-link to="/equipments" class="p-2 rounded"
                      >Wholesale</nuxt-link
                    >
                  </li>
                </ul>
              </ul> -->

              <!-- <NuxtLink to="/equipments" class="hover:bg-[#e6e1ce] px-2 py-1 rounded">Equipment</NuxtLink> -->
              <!-- <NuxtLink to="/wholesale" class="hover:bg-[#e6e1ce] px-2 py-1 rounded">Wholesale</NuxtLink> -->
            </div>
          </div>
        </div>
        <div class="flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  class="text-lg text-black hover:bg-[#2c9299] rounded hover:px-2 hover:py-1.5 hover:text-white"
                  >Hospitality Product &amp; Service</NavigationMenuTrigger
                >
                <NavigationMenuContent>
                  <ul
                    class="grid gap-3 py-1 px-1.5 rounded bg-white text-black md:w-[100px] lg:w-[120px]"
                  >
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger class="text-lg"
                  >Shop</NavigationMenuTrigger
                >
                <NavigationMenuContent>
                  <ul
                    class="grid gap-3 py-1 px-1.5 rounded bg-white text-black md:w-[100px] lg:w-[120px]"
                  >
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                    <li
                      class="cursor-pointer hover:bg-black hover:p-1 rounded hover:text-white"
                    >
                      <NuxtLink to="lmao"> demo</NuxtLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <!-- <div>
        <nuxt-link
          to=""
          class="border-[1px] py-1 px-2 rounded text-lg font-semibold flex gap-2"
        >
          Login
        </nuxt-link>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #f19822;
}
.submenu:hover .submenu-item {
  display: block;
}
.sub-submenu:hover .sub-submenu-item {
  display: block;
}
</style>
