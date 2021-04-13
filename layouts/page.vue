<template>
  <div class="wrapper">
    <div class="main">
      <Nuxt />
    </div>
    <footer class="footer">
      <p class="footer_copyright">
        ©2021 CotuCotu / 開発者：<a
          href="https://twitter.com/kanoi_y"
          target="_blank"
          rel="noopener noreferrer"
          >@kanoi_y</a
        >
      </p>
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
