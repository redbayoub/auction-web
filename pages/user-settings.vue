<template>
  <div class="px-2">
    <div class="">
      <NuxtLink to="/" class="text-base text-gray-500">Home</NuxtLink>
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Edit User Settings
      </p>
    </div>
    <div class="py-5">
      <div class="max-w-sm">
        <span class="text-lg font-bold text-gray-700 mb-3"
          >Auto-Bid Bot Configurations</span
        >
        <form @submit.prevent="submitForm()" method="post">
          <div class="mb-3 flex gap-3">
            <FormInput
              class="w-full"
              v-model="maxAmount"
              :error="error?.data?.maxAmount && error.data.maxAmount[0]"
              label="Max Amount $"
              placeholder="max amount $"
              required
              :disabled="inProgress"
              min="1"
              type="number"
            />

            <FormInput
              class="w-full"
              v-model="percentageAlert"
              :error="
                error?.data?.percentageAlert && error.data.percentageAlert[0]
              "
              label="Percentage Alert %"
              placeholder="Percentage Alert %"
              required
              :disabled="inProgress"
              min="1"
              max="100"
              type="number"
            />
          </div>
          <Button :loading="inProgress">Save</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/user/bot')
      const bot = response.data

      const maxAmount = bot.maxAmount
      const percentageAlert = bot.percentageAlert
      return {
        bot,
        maxAmount,
        percentageAlert,
      }
    } catch (error) {
      if (error.response.status == 404) return {}
    }
  },
  data() {
    return {
      maxAmount: null,
      percentageAlert: null,
      inProgress: false,
      error: null,
    }
  },
  methods: {
    async submitForm() {
      try {
        this.inProgress = true
        await this.$axios.$put('/api/user/bot', {
          maxAmount: this.maxAmount,
          percentageAlert: this.percentageAlert,
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
