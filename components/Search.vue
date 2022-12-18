<template>
  <div class="flex gap-3 items-center">
    <svg
      class="text-gray-600 h-6 w-6 fill-current sm:hidden"
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
        fill-rule="nonzero"
      />
    </svg>
    <form class="relative w-full" @submit.prevent="$emit('submit', $event)">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
       
        class="bg-gray-50 border w-full border-gray-300 text-gray-900 p-2.5 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        type="text"
        name="search"
        placeholder="Search"
        required
        minlength="3"
      />
      <button type="submit" class="absolute right-3 top-3">
        <svg
          class="text-gray-600 h-4 w-4 fill-current"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style></style>
