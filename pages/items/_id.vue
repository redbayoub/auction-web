<template>
  <div>
    <div class="flex gap-5 flex-col md:flex-row py-5">
      <img :src="item.image" class="rounded-t h-72 w-full object-cover" />
      <div class="flex flex-col">
        <h1 class="text-lg mb-3 font-bold">{{ item.name }}</h1>
        <p class="mb-2 text-gray-700">{{ item.description }}</p>
        <div class="mb-2">
          <span>Time Left:</span>
          <Countdown :date="bids_closes_at" @onFinish="onCountdownFinish()" />
        </div>

        <span class="mb-2">
          Auction ends: {{ bids_closes_at.toLocaleString() }}
        </span>
        <span class="mb-2">
          Current bid: <strong>{{ item.price }}$</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const id = params.id
    const response = await $axios.$get('/api/items/' + id)
    const item = response.data
    return { item, id }
  },
  computed: {
    bids_closes_at() {
      return new Date(this.item.auction_closes_at)
    },
  },
  methods: {
    onCountdownFinish() {
      this.$nuxt.refresh()
    },
  },
}
</script>

<style></style>
