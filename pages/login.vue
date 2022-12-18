<template>
  <div
    class="relative flex text-gray-800 antialiased flex-col justify-center overflow-hidden"
  >
    <div class="relative py-3 sm:w-96 mx-auto text-center">
      <span class="text-2xl font-light">Login to your account</span>
      <div class="mt-4 bg-white shadow-md rounded-lg text-left">
        <div class="h-2 bg-purple-400 rounded-t-md"></div>

        <form class="px-8 py-6" method="post" @submit.prevent="login">
          <Alert type="info" v-bind:message="error.message" v-if="error" />
          <div class="mb-2">
            <FormInput
              label="Username"
              v-model="username"
              placeholder="Username"
              :error="error?.data?.username && error.data.username[0]"
              required
              :disabled="inProgress"
            />
          </div>

          <div class="mb-2">
            <FormInput
              type="password"
              label="Password"
              v-model="password"
              placeholder="Password"
              :error="error?.data?.password && error.data.password[0]"
              required
              :disabled="inProgress"
            />
          </div>

          <Button :loading="inProgress"> Login</Button>
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
      inProgress: false,
    }
  },
  methods: {
    async login() {
      try {
        this.inProgress = true
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data
      } finally {
        this.inProgress = false
      }
    },
  },
}
</script>
