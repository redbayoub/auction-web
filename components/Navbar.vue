<template>
  <nav class="w-full z-30 py-2">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <NuxtLink to="/">
        <span class="font-medium text-lg">Auction</span>
      </NuxtLink>
      <div class="">
        <ul class="flex md:space-x-8 md:text-sm md:font-medium">
          <NotificationsDropdown />
          <NavDropdown v-if="isLoggedIn">
            <template v-slot:button>
              {{ username }}
            </template>

            <template v-slot:items="slotProps">
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
                  @click.native="
                    slotProps.showDropdown = !slotProps.showDropdown
                  "
                  class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                  >Settings</NuxtLink
                >
              </li>
              <li class="py-1">
                <a
                  href="#"
                  @click.prevent="logout()"
                  class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                  >Sign out</a
                >
              </li>
            </template>
          </NavDropdown>
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
    }
  },

  methods: {
    async logout() {
      try {
        this.inProgress = true
        await this.$auth.logout()
        try {
          this.$router.push('/login')
        } catch (error) {
          console.log(error)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.inProgress = false
      }
    },
  },
}
</script>
