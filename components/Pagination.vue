<template>
  <div class="relative z-0 inline-flex rounded-md" v-if="hasPages">
    <span aria-disabled="true" aria-label="previous" v-if="onFirstPage">
      <span
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </span>
    <NuxtLink
      v-else
      :to="getPageUrl(currentPage - 1)"
      rel="prev"
      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="previous"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </NuxtLink>
    <div v-for="(page, index) in pages" :key="index">
      <span aria-current="page" v-if="page == currentPage">
        <span
          class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5"
          >{{ page }}</span
        >
      </span>
      <NuxtLink
        v-else
        :to="getPageUrl(page)"
        class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        :aria-label="'Go to page ' + page"
      >
        {{ page }}
      </NuxtLink>
    </div>

    <NuxtLink
      v-if="hasMorePages"
      :to="getPageUrl(currentPage + 1)"
      rel="next"
      class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
      aria-label="next"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </NuxtLink>
    <span v-else aria-disabled="true" aria-label="next">
      <span
        class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-r-md leading-5"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
    },
  },
  computed: {
    hasPages() {
      return this.pagination.total / this.pagination.perPage > 1
    },

    onFirstPage() {
      return this.currentPage == 1
    },

    currentPage() {
      return this.pagination.currentPage
    },

    lastPage() {
      return this.pagination.lastPage
    },

    hasMorePages() {
      return this.currentPage != this.lastPage
    },

    pages() {
      const totalPages = this.lastPage
      const maxPages = 5

      // Set pages obtained so far, start with 1 since we have currentPage
      let pagesCount = 1 // Maintain a copy of pagesCount.
      // Used to detect whether any new pages were added in the iteration
      let newPagesCount = 1 // Set beginning and end as currentPage
      let start = this.currentPage,
        end = this.currentPage // Continue iteration till enough pages are obtained
      while (pagesCount < maxPages) {
        if (end + 1 <= totalPages) {
          // Ok to take one more page towards end
          end++
          newPagesCount++
        }
        if (start - 1 > 0) {
          //Ok to take one more page towards start
          start--
          newPagesCount++
        } 
        /*
          Break loop if no additional pages were
          obtained in this iteration
          We have obtained maximum number of possible pages
        */
        if (newPagesCount == pagesCount) break
        else pagesCount = newPagesCount
      }
      return Array.from(new Array(pagesCount), (x, i) => i + start)
    },
  },
  methods: {
    getPageUrl(page) {
      let urlParams = new URLSearchParams(window.location.search)
      urlParams.set('page', page)
      return window.location.pathname + '?' + urlParams.toString()
    },
  },
}
</script>
