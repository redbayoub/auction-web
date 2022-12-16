<template>
  <nav id="header" class="w-full z-30">
    <div class="w-full flex items-center justify-between py-2">
      <span class="font-medium text-lg">Auction</span>

      <div
        class="
          order-2
          md:order-3
          flex flex-wrap
          items-center
          justify-end
          mr-0
          md:mr-4
        "
        id="nav-content"
      >
        <div class=" flex items-center w-full md:w-full">
          <Button :onClick="logout">Logout</Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>
