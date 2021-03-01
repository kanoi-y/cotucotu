<template>
  <div class="wrapper">
    <CommonHeader></CommonHeader>
    <div class="main">
      <Nuxt />
    </div>
    <footer>
      <p>©2021 CotuCotu</p>
    </footer>
  </div>
</template>

<script>
import CommonHeader from "~/components/Header.vue";

export default {
  components: {
    CommonHeader
  }
};
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: $back-color;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
  color: $text-color;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

p,
small,
h1,
h2,
li {
  color: $text-color;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
}
</style>
