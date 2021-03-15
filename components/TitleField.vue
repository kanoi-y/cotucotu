<template>
  <div class="title-field">
    <nuxt-link class="back" to="/home">
      <font-awesome-icon class="back_icon" icon="long-arrow-alt-left" />
    </nuxt-link>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
.title-field {
  padding: 0.5em 1em;
  border-bottom: 1px solid $text-color;
  position: relative;
  .back {
    position: absolute;
    top: 50%;
    left: 18px;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    width: 25px;
    height: auto;
    color: $text-color;
    &_icon {
      width: 100%;
      height: auto;
    }
  }
  .title {
    font-size: 1.6rem;
  }
}
</style>
