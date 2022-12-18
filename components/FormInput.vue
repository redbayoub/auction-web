<template>
  <div>
    <label v-if="label"  class="block font-semibold"> {{ label }} </label>
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      class="h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400 "
    />
    <p class="text-xs text-red-400" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'error'],
}
</script>

<style></style>
