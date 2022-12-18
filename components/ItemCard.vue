<template>
  <NuxtLink :to="'/items/' + item.id" class="cursor-pointer">
    <figure>
      <img :src="item.image" class="rounded-t h-72 w-full object-cover" />
      <figcaption class="p-4">
        <div class="flex justify-between">
          <p
            class="text-lg mb-4 leading-relaxed text-gray-800"
          >
            {{ item.name }}
          </p>
          <strong class="">${{ item.price }}</strong>
        </div>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
}
</script>
