<template>
  <div>
    <div class="flex items-center gap-2">
      <input
        :checked="value"
        @input="$emit('input', $event.target.checked)"
        type="checkbox"
        v-bind="$attrs"
        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
      />
      <label v-if="label" class="text-sm font-medium text-gray-900">
        {{ label }}
      </label>
    </div>
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
