<template>
  <div class="px-2">
    <div class="">
      <NuxtLink to="/dashboard/items" class="text-base text-gray-500"
        >Auction Items</NuxtLink
      >
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        View Item
      </p>
    </div>
    <div class="flex gap-5 flex-col md:flex-row py-5">
      <img :src="item.image" class="rounded-t h-72 w-full object-cover" />
      <div class="flex flex-col">
        <h1 class="text-lg mb-3 font-bold">{{ item.name }}</h1>
        <p class="mb-2 text-gray-700">{{ item.description }}</p>
        <div class="mb-2" v-if="!isAuctionClosed">
          <span>Time Left:</span>
          <Countdown :date="bids_closes_at" @onFinish="onCountdownFinish()" />
        </div>

        <span class="mb-2"
          >Auction ends: {{ bids_closes_at.toLocaleString() }}</span
        >
        <span class="mb-2"
          >Starting price: <strong>{{ item.startingPrice }}$</strong></span
        >

        <span class="mb-2"
          >Current price: <strong>{{ item.price }}$</strong></span
        >
        <Alert
          v-if="isAuctionClosed"
          message="The Auction on this item is closed"
          type="info"
        />
      </div>
    </div>
    <div>
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Item Bids
      </p>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Username
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody :key="queryTimestamp" v-if="itemBids.length > 0">
            <tr
              class="border-b"
              :class="{
                'bg-gray-100': index % 2 == 0,
                'bg-white': index % 2 != 0,
              }"
              v-for="(bid, index) in itemBids"
              :key="bid.id"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ bid.id }}
              </td>
              <td
                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ bid.user.username }}
              </td>
              <td
                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ bid.amount }}$
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="bg-gray-100">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                colspan="4"
              >
                <div class="flex justify-center">
                  <span> No data available</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center">
          <Pagination
            :key="$route.fullPath"
            class="py-3"
            :pagination="bidsPagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData({ $axios, params, query }) {
    const id = params.id
    const response = await $axios.$get('/api/items/' + id)
    const item = response.data

    const urlQuery = new URLSearchParams(query)
    const bidsResponse = await $axios.$get(
      '/api/items/' + id + '/bids' + urlQuery.toString()
    )
    const itemBids = bidsResponse.data.data
    const bidsPagination = bidsResponse.data.pagination
    const queryTimestamp = Date.now()

    return {
      item,
      id,
      itemBids,
      bidsPagination,
      queryTimestamp,
    }
  },
  computed: {
    bids_closes_at() {
      return new Date(this.item.auction_closes_at)
    },
    isAuctionClosed() {
      return this.bids_closes_at < new Date()
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
