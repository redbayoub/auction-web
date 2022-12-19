<template>
  <nav class="w-full z-30 py-2">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <NuxtLink to="/">
        <span class="font-medium text-lg">Auction</span>
      </NuxtLink>
      <div class="">
        <ul
          class="flex-col md:flex-row flex md:space-x-8 md:text-sm md:font-medium"
        >
          <li v-if="isLoggedIn" class="relative">
            <button
              @click.prevent="showDropdown = !showDropdown"
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="text-gray-700 pl-3 pr-4 py-2 hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
            >
              {{ username }}
              <svg
                :class="{
                  'rotate-180': showDropdown,
                }"
                class="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdownNavbar"
              :class="{
                hidden: !showDropdown,
              }"
              class="text-base z-10 list-none divide-y divide-gray-100 rounded shadow-xl bg-gray-50 w-44 absolute right-0"
            >
              <ul class="py-1" aria-labelledby="dropdownLargeButton">
                <li v-if="!isAdmin">
                  <span
                    v-if="$route.path == '/user-settings'"
                    class="text-sm block px-4 py-2 text-blue-700"
                  >
                    Settings
                  </span>
                  <NuxtLink
                    v-else
                    to="/user-settings"
                    @click.native="showDropdown = !showDropdown"
                    class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >Settings</NuxtLink
                  >
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  @click.prevent="logout()"
                  class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                  >Sign out</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    username() {
      return this.isLoggedIn && this.$auth.user.data.username
    },

    isAdmin() {
      return this.isLoggedIn && this.$auth.user.data.isAdmin
    },
  },
  data() {
    return {
      inProgress: false,
      showDropdown: false,
    }
  },

  methods: {
    async logout() {
      try {
        this.inProgress = true
        await this.$auth.logout()

        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      } finally {
        this.inProgress = false
      }
    },
  },
}
</script>
