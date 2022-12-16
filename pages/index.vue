<template>
  <div class="container px-2 mx-auto flex flex-col h-screen">
    <Navbar />

    <h1 class="text-3xl font-bold underline">
      Hello world! {{ user.username }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      user: this.$auth.user.data,
    }
  },
}
</script>
