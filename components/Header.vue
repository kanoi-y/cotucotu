<template>
  <header class="header">
    <h1 class="logo"><nuxt-link to="/">CotuCotu</nuxt-link></h1>
    <button type="button" class="header_login" @click="loginout">
      {{ $store.getters.getStatus === "login" ? "logout" : "login" }}
    </button>
  </header>
</template>

<script>
export default {
  methods: {
    loginout() {
      if (this.$store.getters.getStatus === "logout") {
        this.$store.dispatch("login");
      }
      if (this.$store.getters.getStatus === "login") {
        if (process.client) {
          window.localStorage.removeItem("userId");
          window.localStorage.removeItem("userName");
        }
        this.$store.dispatch("logout");
        this.$store.dispatch("todos/allDelete");
        this.$router.push("/");
      }
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
  @include tablet-size {
    padding: 16px 24px 0;
  }
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
    background-color: $highlight-color;
  }
}
</style>
