<template>
  <div>
    <label class="block font-semibold"> {{ label }} </label>

    <input
      class="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100  disabled:bg-gray-100 disabled:text-gray-400"
      @change="$emit('change', $event)"
      v-bind="$attrs"
      type="file"
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
