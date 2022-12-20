<template>
  <div class="px-2">
    <div class="">
      <NuxtLink to="/dashboard/items" class="text-base text-gray-500"
        >Auction Items</NuxtLink
      >
      <p
        class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Edit Item
      </p>
    </div>
    <div class="py-5">
      <form @submit.prevent="submitForm()" method="post">
        <div class="mb-3">
          <FormInput
            v-model="name"
            :error="error?.data?.name && error.data.name[0]"
            label="Name"
            placeholder="Name"
            required
            :disabled="inProgress"
          />
        </div>

        <div class="mb-3">
          <FormInput
            v-model="startingPrice"
            :error="error?.data?.startingPrice && error.data.startingPrice[0]"
            label="Starting Price"
            placeholder="1$"
            required
            type="number"
            min="1"
            :disabled="inProgress"
          />
        </div>

        <div class="mb-3 flex gap-5">
          <FormInput
            v-model="bidCloseDate"
            :error="
              error?.data?.auction_closes_at && error.data.auction_closes_at[0]
            "
            label="Bidding Close Date"
            placeholder="1$"
            required
            type="date"
            :disabled="inProgress"
          />
          <FormInput
            v-model="bidCloseTime"
            label="Bidding Close Time"
            placeholder="1$"
            required
            type="time"
            :disabled="inProgress"
          />
        </div>
        <div class="mb-3">
          <FormTextArea
            v-model="description"
            :error="error?.data?.description && error.data.description[0]"
            label="Description"
            placeholder="Item Description here ..."
            required
            :disabled="inProgress"
          />
        </div>

        <div class="mb-3">
          <FormFileInput
            @change="handleFileChange($event)"
            :error="error?.data?.image && error.data.image[0]"
            label="Image"
            required
            accept=".png, .jpg, .jpeg"
            :disabled="inProgress"
          />
        </div>
        <Button :loading="inProgress">Edit</Button>
      </form>
    </div>
  </div>
</template>

<script>
import { toDateString, toTimeString } from '../../../../helpers/date'
export default {
  layout: 'dashboard',
  async asyncData({ $axios, params }) {
    const id = params.id
    const response = await $axios.$get('/api/items/' + id)
    const item = response.data
    const auctionClose = new Date(item.auction_closes_at)

    const name = item.name
    const startingPrice = item.startingPrice
    const description = item.description
    const bidCloseDate = toDateString(auctionClose)
    const bidCloseTime = toTimeString(auctionClose)

    return {
      item,
      id,
      name,
      startingPrice,
      description,
      bidCloseDate,
      bidCloseTime,
    }
  },
  data() {
    return {
      name: '',
      startingPrice: null,
      description: '',
      bidCloseDate: null,
      bidCloseTime: null,
      image: null,
      inProgress: false,
      error: null,
    }
  },
  methods: {
    async submitForm() {
      var formData = new FormData()
      formData.append('image', this.image)
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('startingPrice', this.startingPrice)
      const closeTime = new Date(this.bidCloseDate + ' ' + this.bidCloseTime)
      formData.append('auction_closes_at', closeTime.toJSON())

      try {
        this.inProgress = true
        await this.$axios.$post('/api/items/' + this.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        try {
          this.$router.push('/dashboard/items')
        } catch (error) {
          console.log(error)
        }
      } catch (e) {
        this.error = e.response.data
      } finally {
        this.inProgress = false
      }
    },
    handleFileChange(event) {
      this.image = event.target.files[0]
    },
  },
}
</script>
