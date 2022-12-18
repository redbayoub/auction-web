<template>
  <div class="flex gap-3 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-6 h-6 text-gray-500"
    >
      <path
        fill="currentColor"
        d="M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z"
      />
    </svg>

    <select
      @change="onChange && onChange($event)"
      :value="value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
    >
      <option value="">Default sorting</option>
      <option value="price:asc">Price: low to high</option>
      <option value="price:desc">Price: high to low</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
    },
    value: {
      required: false,
    },
  },
}
</script>
