<template>
  <div class="flex flex-col justify-between bg-white">
    <figure class="">
      <img :src="item.image" class="rounded-t h-72 w-full object-cover" />
      <figcaption class="pt-4">
        <div class="flex flex-col justify-between">
          <div class="flex justify-between">
            <p class="text-lg mb-4 leading-relaxed text-gray-800">
              {{ item.name }}
            </p>
            <strong class="">${{ item.price }}</strong>
          </div>
        </div>
      </figcaption>
    </figure>
    <NuxtLink :to="'/items/' + item.id">
      <Button
        v-if="!isAuctionClosed && item.bid_user_id != currentUserId"
        type="danger"
        >Bid Now</Button
      >
      <Button v-else type="light">View Details</Button>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    currentUserId() {
      return this.$auth.user.data.id
    },

    isAuctionClosed() {
      return new Date(this.item.auction_closes_at) < new Date()
    },
  },
}
</script>
