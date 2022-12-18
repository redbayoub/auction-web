<template>
  <button
    @click="onClick && onClick()"
    :class="classObject"
    class="text-white py-2 px-6 rounded-md disabled:bg-gray-400"
    :disabled="loading"
  >
    <div class="flex gap-3 justify-center items-center">
      <Spinner v-if="loading" />
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    classObject() {
      switch (this.type) {
        case 'primary':
          return {
            'bg-purple-600': true,
            'hover:bg-purple-500': true,
          }
        case 'success':
          return {
            'bg-green-600': true,
            'hover:bg-green-500': true,
          }
        case 'warning':
          return {
            'bg-yellow-600': true,
            'hover:bg-yellow-500': true,
          }
        case 'danger':
          return {
            'bg-red-600': true,
            'hover:bg-red-500': true,
          }
        case 'light':
          return {
            'bg-gray-300': true,
            'hover:bg-gray-200': true,
            'text-gray-600': true,
          }
      }
    },
  },
}
</script>
