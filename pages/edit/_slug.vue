<template>
  <div class="wrapper">
    <TitleField :title="title" />
  </div>
</template>

<script>
import TitleField from "~/components/TitleField.vue";

export default {
  middleware: ["authenticated"],
  layout: "page",
  components: {
    TitleField
  },
  computed: {
    title() {
      const todos = this.$store.getters["todos/getTodos"];
      const todo = todos[this.$route.params.slug];
      return todo.title;
    }
  }
};
</script>

<style lang="scss" scoped></style>
