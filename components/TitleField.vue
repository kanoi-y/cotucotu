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
  padding-left: calc(18px + 25px);
  border-bottom: 1px solid $text-color;
  position: relative;
  @include tablet-size {
    padding-left: calc(30px + 25px);
  }
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
    @include tablet-size {
      left: 30px;
    }
    &_icon {
      width: 100%;
      height: auto;
    }
  }
  .title {
    font-size: 1.4rem;
    text-align: left;
    padding-left: 16px;
    @include tablet-size {
    padding-left: 26px;
  }
  }
}
</style>
