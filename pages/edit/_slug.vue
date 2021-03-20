<template>
  <div class="wrapper">
    <TitleField :title="todo.title" />
    <SelectTodo
      :color="colorArray.indexOf(this.todo.color)"
      :originIcon="iconArray.indexOf(this.todo.icon)"
      :originText="todo.title"
      @getNowIcon="nowIcon = $event"
      @getNowColor="nowColor = $event"
      @getText="text = $event"
    />
    <h2>Record</h2>
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
  padding-top: 36px;
}
</style>
