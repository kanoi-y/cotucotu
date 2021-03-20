<template>
  <div class="wrapper">
    <div class="main">
      <Nuxt />
    </div>
    <footer>
      <p>©2021 CotuCotu</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "page",
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
  text-align: center;
}
</style>
