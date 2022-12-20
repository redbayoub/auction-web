<template>
  <div class="container px-2 mx-auto flex flex-col h-screen">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
    >
      <h3
        class="sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
      >
        Auctioned Items
      </h3>
      <div class="flex gap-3 py-2 flex-col sm:flex-row">
        <SortSelect :onChange="onSortChange" :value="sort" />
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

    <div
      class="py-5 grid grid-flow-row gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      :key="queryTimestamp"
      v-if="items.length > 0"
    >
      <ItemCard
        class="rounded shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1"
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
    <div
      v-else
      class="bg-gray-50 rounded mt-5 py-5 flex justify-center items-center"
    >
      <span>No data available</span>
    </div>

    <Pagination
      :key="$route.fullPath"
      class="py-3 mx-auto"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import Search from '~/components/Search.vue'
export default {
  components: { Search },
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
    onSortChange(event) {
      const value = event.target.value

      let urlParams = new URLSearchParams(window.location.search)
      urlParams.set('sort', value)
      const route = window.location.pathname + '?' + urlParams.toString()

      try {
        this.$router.push(route)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
