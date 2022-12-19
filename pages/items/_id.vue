<template>
  <div>
    <div class="flex gap-5 flex-col md:flex-row py-5">
      <img :src="item.image" class="rounded-t h-72 w-full object-cover" />
      <div class="flex flex-col">
        <h1 class="text-lg mb-3 font-bold">{{ item.name }}</h1>
        <p class="mb-2 text-gray-700">{{ item.description }}</p>
        <div class="mb-2" v-if="!isAuctionClosed">
          <span>Time Left:</span>
          <Countdown :date="bids_closes_at" @onFinish="onCountdownFinish()" />
        </div>

        <span class="mb-2">
          Auction ends: {{ bids_closes_at.toLocaleString() }}
        </span>
        <span class="mb-2">
          Current bid: <strong>{{ item.price }}$</strong>
        </span>

        <Alert
          v-if="item.bid_user_id == currentUserId"
          message="You are the highest bidder"
          type="info"
        />
        <div class="mb-2" v-else-if="!isAuctionClosed">
          <form method="post" @submit.prevent="submitBid()" class="flex gap-3">
            <FormInput
              v-model="amount"
              :disabled="inProgress"
              required
              type="number"
              :min="item.price + 1"
              :error="error?.message"
            />
            <Button :loading="inProgress">Submit a Bid</Button>
          </form>
        </div>
        <Alert
          v-else
          message="The Auction on this item is closed"
          type="info"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, $auth }) {
    const id = params.id
    const response = await $axios.$get('/api/items/' + id)
    const item = response.data
    const amount = item.price + 1
    const currentUserId = $auth.user.data.id
    return { item, id, amount, currentUserId }
  },
  computed: {
    bids_closes_at() {
      return new Date(this.item.auction_closes_at)
    },

    isAuctionClosed() {
      return this.bids_closes_at < new Date()
    },
  },
  data() {
    return {
      amount: null,
      inProgress: false,
      error: null,
    }
  },
  methods: {
    onCountdownFinish() {
      this.$nuxt.refresh()
    },
    async submitBid() {
      try {
        this.inProgress = true
        await this.$axios.$post('/api/items/' + this.item.id + '/bids', {
          amount: this.amount,
        })

        this.$nuxt.refresh()
      } catch (e) {
        this.error = e.response.data
      } finally {
        this.inProgress = false
      }
    },
  },
}
</script>

<style></style>