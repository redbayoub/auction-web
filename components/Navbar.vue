<template>
  <nav id="header" class="w-full z-30">
    <div class="w-full flex items-center justify-between py-2">
      <NuxtLink to="/">
        <span class="font-medium text-lg">Auction</span>
      </NuxtLink>

      <div
        class="order-2 md:order-3 flex flex-wrap items-center justify-end"
        id="nav-content"
      >
        <div v-if="isLoggedIn" class="flex items-center w-full md:w-full">
          <Button :loading="inProgress" :onClick="logout">Logout</Button>
        </div>
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
