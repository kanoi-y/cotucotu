<template>
  <div class="wrapper">
    <CommonHeader></CommonHeader>
    <div class="main">
      <Nuxt />
    </div>
    <footer class="footer">
      <p class="footer_copyright">©2021 CotuCotu</p>
    </footer>
  </div>
</template>

<script>
import CommonHeader from "~/components/Header.vue";

export default {
  name: "default",
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
  @include tablet-size {
    font-size: 18px;
  }
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

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
}

p,
small,
h1,
h2,
li {
  color: $text-color;
}

.footer {
  margin-top: auto;
  text-align: center;
  padding: 8px 0;
  &_copyright {
    font-weight: bold;
    color: $text-color;
  }
}

.cotucotu-btn {
  color: #fff;
  background-color: #f8e6a4;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4em 0.6em;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px -2px #ffd91d40;
  font-weight: bold;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  &_icon {
    width: 20px;
    height: 20px;
    margin-right: 0.4em;
  }
}

.hidden {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


</style>
