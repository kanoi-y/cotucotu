<template>
  <div class="wrapper">
    <TitleField :title="title" />
    <div class="record">
      <Calender class="record_calender" />
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
      const todo = this.$store.getters["todos/getTodos"][
        this.$route.params.slug
      ];
      return todo.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.record {
  padding: 35px 12px;
  text-align: center;
  @include tablet-size {
    padding: 60px 24px;
  }
  &_calender {
    margin: 0 auto;
    max-width: 800px;
  }
}
</style>
