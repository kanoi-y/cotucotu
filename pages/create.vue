<template>
  <div class="wrapper">
    <TitleField :title="title" />

    <SelectTodo
      @getNowIcon="nowIcon = $event"
      @getNowColor="nowColor = $event"
      @getText="text = $event"
    />
    <button type="button" class="cotucotu-btn create_btn" @click="createTodo">
      作 成
    </button>
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
      colorArray: [
        { name: "pink", code: "#ffa8a8" },
        { name: "purple", code: "#f1a8ff" },
        { name: "blue", code: "#a8ffe9" },
        { name: "green", code: "#bbffa8" },
        { name: "yellow", code: "#ffe8a8" }
      ],
      nowColor: 0,
      text: "",
      title: "新規追加"
    };
  },
  methods: {
    createTodo() {
      if (!this.text) {
        alert("することが入力されていないよ！");
        return;
      }
      const userId = this.$store.getters.getUserUid;
      const todo = {
        color: this.colorArray[this.nowColor].code,
        icon: this.iconArray[this.nowIcon],
        title: this.text
      };
      console.log(todo);
      this.$store.dispatch("todos/addTodo", { userId, todo });
    }
  }
};
</script>

<style lang="scss" scoped>

.wrapper {
  padding: 0 0 40px;
  text-align: center;
  @include desktop-size {
    padding-bottom: 80px;
  }
}

.create_btn {
  padding: 0.4em 0.8em;
  font-size: 1.3rem;
  width: max-content;
  margin: 0 auto;
}

</style>
