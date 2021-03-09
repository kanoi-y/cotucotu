<template>
  <div class="wrapper">
    <h1 class="title">ー 新規追加 ー</h1>
    <div class="create">
      <div class="create_icon_wrap">
        <div class="create_icon_cont">
          <font-awesome-icon icon="book" class="create_icon" />
          <font-awesome-icon icon="running" class="create_icon" />
          <font-awesome-icon icon="dumbbell" class="create_icon" />
          <font-awesome-icon icon="pen" class="create_icon" />
          <font-awesome-icon icon="laptop-code" class="create_icon" />
          <font-awesome-icon icon="music" class="create_icon" />
          <font-awesome-icon icon="car" class="create_icon" />
          <font-awesome-icon icon="palette" class="create_icon" />
          <font-awesome-icon icon="photo-video" class="create_icon" />
          <font-awesome-icon icon="seedling" class="create_icon" />
          <font-awesome-icon icon="utensils" class="create_icon" />
        </div>
      </div>
      <div class="create_color_wrap">
        <div class="create_color pink"></div>
        <div class="create_color purple"></div>
        <div class="create_color blue"></div>
        <div class="create_color green"></div>
        <div class="create_color yellow"></div>
      </div>
      <div class="create_todo">
        <input class="create_text" type="text" placeholder="することを入力" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$icon-width: 70px;

.wrapper {
  padding: 30px 0;
  text-align: center;
}

.title {
  font-size: 1.6rem;
}

.create {
  padding-top: 20px;
  &_icon_wrap {
    padding: 28px 0;
    overflow: scroll;
    width: 100%;
  }
  &_icon_cont {
    padding-left: calc(50vw - #{$icon-width} / 2);
    padding-right: calc(50vw - #{$icon-width} / 2);
    display: flex;
    width: calc(#{$icon-width} * 11 + 10 * (50vw - #{$icon-width}));
    box-sizing: content-box;
  }
  &_icon {
    width: $icon-width;
    height: auto;
    margin-right: calc(50vw - #{$icon-width});
  }
  &_todo {
    width: 80%;
    margin: 0 auto;
    padding: 0.5em 0;
    border-bottom: 1px solid $text-color;
  }
  &_text {
    text-align: center;
    width: 100%;
    font-size: 1.3rem;
  }
  &_color_wrap {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
  }
  &_color {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    cursor: pointer;
  }
}

.pink {
  background-color: #ffa8a8;
}

.purple {
  background-color: #f1a8ff;
}

.blue {
  background-color: #a8ffe9;
}

.green {
  background-color: #bbffa8;
}

.yellow {
  background-color: #ffe8a8;
}
</style>
