<template>
  <header class="container shadow bg-white mt-8 mb-8 p-8">
    <div class="flex-col items-center justify-center">
      <div class="flex items-center justify-center mb-3">
        <img
        class="rounded-full w-48 h-48 object-cover"
          src="./assets/jayz.webp"
          alt="Jay-z"
        />
      </div>
      <h1 class="text-center text-5xl">Spend Jay-z's Money</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
