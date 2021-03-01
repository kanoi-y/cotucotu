<template>
  <header class="header">
    <h1 class="logo">CotuCotu</h1>
      <button type="button" class="header_login">{{ log }}</button>
  </header>
</template>

<script>
export default {
    data() {
      return {
          log: 'Login',
      }
    }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 0;
  .logo {
    color: $text-color;
    font-size: 2rem;
  }
  &_login {
    padding: 0.4em 0.6em;
    font-size: 1rem;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;
    background-color: #f8e6a4;
  }
}
</style>
