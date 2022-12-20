<template>
  <div class="px-2">
    <p
      class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
    >
      Auction Items
    </p>

    <div class="sm:flex items-center justify-between py-3">
      <NuxtLink to="/dashboard/items/add">
        <Button>Add Item</Button>
      </NuxtLink>
      <div class="flex gap-3 py-2 flex-col sm:flex-row">
        <Search v-model="searchTerm" @submit.prevent="startSearch()" />
        <Button
          v-if="isFilteredResults"
          :onClick="clearQuery"
          class="text-gray-600 flex justify-center items-center gap-2 bg-white hover:bg-gray-200 border border-gray-300"
        >
          <svg
            class="h-4 w-4 fill-current"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
            />
          </svg>

          <span>Clear</span>
        </Button>
      </div>
    </div>
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
              Name
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              <a
                @click="changeSort()"
                class="cursor-pointer flex gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    v-if="sort == 'price:desc'"
                    d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z"
                  />
                  <path
                    v-else-if="sort == 'price:asc'"
                    d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z"
                  />

                  <path
                    v-else
                    d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z"
                  />
                </svg>
                <span>Price</span>
              </a>
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody :key="queryTimestamp" v-if="items.length > 0">
          <tr
            class="border-b"
            :class="{
              'bg-gray-100': index % 2 == 0,
              'bg-white': index % 2 != 0,
            }"
            v-for="(item, index) in items"
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
              <div class="flex items-center gap-3">
                <NuxtLink :to="'/dashboard/items/' + item.id">
                  <Button type="light">View</Button></NuxtLink
                >

                <NuxtLink :to="'/dashboard/items/' + item.id + '/edit'"
                  ><Button type="warning">Edit</Button></NuxtLink
                >

                <Button
                  :onClick="() => deleteCurrent(item.id)"
                  type="danger"
                  :loading="selectedItemDeleting == item.id"
                  >Delete</Button
                >
              </div>
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
          :pagination="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData({ $axios, query }) {
    const params = new URLSearchParams(query)
    const response = await $axios.$get('/api/items?' + params.toString())
    const items = response.data.data
    const pagination = response.data.pagination
    const sort = params.get('sort') ?? ''

    const searchTerm = params.get('searchTerm') ?? ''
    const isFilteredResults = searchTerm != ''
    const queryTimestamp = Date.now()
    return {
      items,
      pagination,
      sort,
      searchTerm,
      isFilteredResults,
      queryTimestamp,
    }
  },
  data() {
    return {
      sort: '',
      searchTerm: '',
      selectedItemDeleting: false,
    }
  },
  watchQuery: ['page', 'sort', 'searchTerm'],
  methods: {
    startSearch() {
      let urlParams = new URLSearchParams(window.location.search)
      urlParams.set('searchTerm', this.searchTerm)

      const route = window.location.pathname + '?' + urlParams.toString()
      try {
        this.$router.push(route)
      } catch (error) {
        console.log(error)
      }
    },
    clearQuery() {
      const route = window.location.pathname
      try {
        this.$router.push(route)
      } catch (error) {
        console.log(error)
      }
    },

    changeSort() {
      let nextSort = ''
      switch (this.sort) {
        case '':
          nextSort = 'price:asc'
          break
        case 'price:asc':
          nextSort = 'price:desc'
          break
      }

      let urlParams = new URLSearchParams(window.location.search)
      if (nextSort != '') urlParams.set('sort', nextSort)
      else urlParams.delete('sort')
      const route = window.location.pathname + '?' + urlParams.toString()

      try {
        this.$router.push(route)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCurrent(id) {
      if (!confirm('Are you sure?')) return
      try {
        this.selectedItemDeleting = id
        await this.$axios.$delete('/api/items/' + id)
        this.$nuxt.refresh()
      } catch (e) {
        this.error = e.response.data
      } finally {
        this.selectedItemDeleting = null
      }
    },
  },
}
</script>
