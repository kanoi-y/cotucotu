<template>
  <div class="wrapper">
    <TitleField :title="title" />
    <div class="record">
      <Calender />
    </div>
  </div>
</template>

<script>
import TitleField from "~/components/TitleField.vue";
import Calender from "~/components/Calender.vue";

export default {
  middleware: ["authenticated"],
  layout: "page",
  components: {
    TitleField,
    Calender
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

<style lang="scss" scoped>
.record { 
  padding: 30px 12px;
  text-align: center;
}
</style>
