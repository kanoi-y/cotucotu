<template>
  <div class="edit">
    <TitleField :title="todo.title" />
    <SelectTodo
      :color="colorArray.indexOf(this.todo.color)"
      :originIcon="iconArray.indexOf(this.todo.icon)"
      :originText="todo.title"
      @getNowIcon="nowIcon = $event"
      @getNowColor="nowColor = $event"
      @getText="text = $event"
    />

    <div class="record">
      <div class="record_top">
        <div class="record_arrow">
          <font-awesome-icon class="record_arrow_icon" icon="chevron-left" />
        </div>
        <h2 class="record_title">2021/3</h2>
        <div class="record_arrow">
          <font-awesome-icon class="record_arrow_icon" icon="chevron-right" />
        </div>
      </div>
      <div class="record_data">
        <div class="record_head">
          <div class="record_date">日付</div>
          <div class="record_count">回数</div>
          <div class="record_space"></div>
        </div>

        <div class="record_content">
          <p class="record_content_date">2021/3/5</p>
          <span class="record_content_count">1</span>
          <button class="record_content_cross">×</button>
        </div>

        <div class="record_content">
          <p class="record_content_date">2021/3/12</p>
          <span class="record_content_count">1</span>
          <button class="record_content_cross">×</button>
        </div>

        <div class="record_content">
          <p class="record_content_date">2021/3/18</p>
          <span class="record_content_count">2</span>
          <button class="record_content_cross">×</button>
        </div>

        <button class="cotucotu-btn record_button">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="plus"
            class="svg-inline--fa fa-plus fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TitleField from "~/components/TitleField.vue";
import SelectTodo from "~/components/SelectTodo.vue";

export default {
  middleware: ["authenticated"],
  layout: "page",
  components: {
    TitleField,
    SelectTodo
  },
  data() {
    return {
      iconArray: [
        "book",
        "running",
        "dumbbell",
        "pen",
        "laptop-code",
        "music",
        "car",
        "palette",
        "photo-video",
        "seedling",
        "utensils"
      ],
      nowIcon: 0,
      colorArray: ["#ffa8a8", "#f1a8ff", "#a8ffe9", "#bbffa8", "#ffe8a8"],
      nowColor: 0,
      text: ""
    };
  },
  mounted() {
    this.nowIcon = this.iconArray.indexOf(this.todo.icon);
    this.nowColor = this.colorArray.indexOf(this.todo.color);
    this.text = this.todo.title;
  },
  computed: {
    todo() {
      const todos = this.$store.getters["todos/getTodos"];
      const todo = todos[this.$route.params.slug];
      return todo;
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  padding-bottom: 30px;
}
.record {
  padding: 10px 12px;
  padding-top: 30px;
  margin-bottom: 30px;
  &_top {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  &_arrow {
    flex: 1;
    text-align: center;
    &_icon {
      width: 16px;
      height: auto;
    }
  }
  &_title {
    flex: 5;
    text-align: center;
    font-size: 1.4rem;
  }
  &_data {
    text-align: right;
    padding-bottom: 12px;
  }
  &_head {
    display: flex;
    border-bottom: 2px solid $text-color;
    margin-bottom: 20px;
  }
  &_date {
    flex: 5;
    text-align: center;
    font-weight: bold;
  }
  &_count {
    flex: 5;
    text-align: center;
    font-weight: bold;
  }
  &_space {
    flex: 1;
  }
  &_content {
    display: flex;
    background-color: #fff;
    margin-bottom: 12px;
    padding: 0.4em;
    border-radius: 8px;
    &_date {
      flex: 5;
      font-weight: bold;
      text-align: center;
    }
    &_count {
      flex: 5;
      font-weight: bold;
      text-align: center;
      color: $text-color;
    }
    &_cross {
      flex: 1;
      color: $text-color;
      font-weight: bold;
      font-size: 1.3rem;
    }
  }
  &_button {
    width: 65px;
    margin-top: 12px;
    margin-right: 12px;
  }
}
</style>
