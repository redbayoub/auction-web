<template>
  <div
    class="
      relative
      flex
      min-h-screen
      text-gray-800
      antialiased
      flex-col
      justify-center
      overflow-hidden
      bg-gray-50
      py-6
      sm:py-12
    "
  >
    <div class="relative py-3 sm:w-96 mx-auto text-center">
      <span class="text-2xl font-light">Login to your account</span>
      <div class="mt-4 bg-white shadow-md rounded-lg text-left">
        <div class="h-2 bg-purple-400 rounded-t-md"></div>

        <form class="px-8 py-6" method="post" @submit.prevent="login">
          <Alert type="info" v-bind:message="error.message" v-if="error" />
          <label class="block font-semibold"> Username </label>
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
            class="
              border
              w-full
              h-5
              px-3
              py-5
              mt-2
              hover:outline-none
              focus:outline-none focus:ring-indigo-500 focus:ring-1
              rounded-md
            "
          />
          <p
            class="text-xs text-red-400"
            v-if="error && error.data && error.data.username"
          >
            {{ error.data.username[0] }}
          </p>

          <label class="block mt-3 font-semibold"> Password </label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            required
            class="
              border
              w-full
              h-5
              px-3
              py-5
              mt-2
              hover:outline-none
              focus:outline-none focus:ring-indigo-500 focus:ring-1
              rounded-md
            "
          />
          <p
            class="text-xs text-red-400"
            v-if="error && error.data && error.data.password"
          >
            {{ error.data.password[0] }}
          </p>
          <div class="flex justify-between items-baseline">
            <Button type="submit" class="mt-4"> Login</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data
      }
    },
  },
}
</script>
