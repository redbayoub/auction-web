<template>
  <div class="container px-2 mx-auto flex flex-col h-screen">
    <Navbar class="px-2" />
    <div class="py-5">
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'admin',
}
</script>
