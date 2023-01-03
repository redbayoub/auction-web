<template>
  <div class="px-2">
    <div class="">
      <NuxtLink to="/" class="text-base text-gray-500">Home</NuxtLink>
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Profile
      </p>
    </div>
    <div class="py-5">
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Awarded Items
      </p>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Item Id
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Name
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Amount
              </th>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="awardedItems.length > 0">
            <tr
              class="border-b"
              :class="{
                'bg-gray-100': index % 2 == 0,
                'bg-white': index % 2 != 0,
              }"
              v-for="(item, index) in awardedItems"
              :key="item.id"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ item.id }}
              </td>
              <td
                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ item.name }}
              </td>
              <td
                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ item.price }}
              </td>
              <td
                class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                <a
                  :href="item.bill_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><Button>Get Bill</Button></a
                >
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
      </div>
    </div>
    <div class="py-5">
      <div>
        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
        >
          My Bids
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Item Id
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Item Name
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody v-if="bids.length > 0">
              <tr
                class="border-b"
                :class="{
                  'bg-gray-100': index % 2 == 0,
                  'bg-white': index % 2 != 0,
                }"
                v-for="(bid, index) in bids"
                :key="bid.id"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ bid.item.id }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <NuxtLink
                    :to="'/items/' + bid.item_id"
                    class="hover:underline text-blue-500 hover:text-blue-600"
                  >
                    {{ bid.item.name }}</NuxtLink
                  >
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ bid.amount }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <span class="bg-amber-700 px-3 py-1 text-white rounded">{{
                    bid.status
                  }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const response = await $axios.$get('/api/user/bids')
    const itemResponse = await $axios.$get('/api/user/items')
    const bids = response.data
    const awardedItems = itemResponse.data
    return {
      bids,
      awardedItems,
    }
  },
  data() {
    return {
      bids: [],
      awardedItems: [],
    }
  },
}
</script>
