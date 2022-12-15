<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world! {{ user.username }}
    </h1>

    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      user: this.$auth.user.data,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    },
  },
}
</script>
