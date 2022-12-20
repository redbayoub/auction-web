<template>
  <li class="relative">
    <button
      @click.prevent="showDropdown = !showDropdown"
      id="dropdownNavbarLink"
      data-dropdown-toggle="dropdownNavbar"
      class="text-gray-700 pl-3 pr-4 py-2 hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
    >
      <slot name="button"></slot>
      <svg
        :class="{
          'rotate-180': showDropdown,
        }"
        class="w-4 h-4 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownNavbar"
      :class="{
        hidden: !showDropdown,
      }"
      class="text-base z-10 list-none divide-y divide-gray-100 rounded shadow-xl bg-gray-50 w-44 absolute right-0"
    >
      <ul class="py-1" aria-labelledby="dropdownLargeButton">
        <slot v-bind:showDropdown="showDropdown" name="items"></slot>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    }
  },
}
</script>
