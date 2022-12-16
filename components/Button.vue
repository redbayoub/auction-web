<template>
  <button
    @click="onClick && onClick()"
    class="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
    },
  },
}
</script>

<style>
</style>