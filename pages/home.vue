<template>
  <div class="wrapper">
    <div class="wrap-todos">
      <div class="todo" v-for="(todo, index) in todos" :key="index">
        <div class="todo_main" @click="goEdit(index)">
          <div class="todo_edit">
            <p class="todo_edit_text">Edit</p>
          </div>
          <div class="todo_content">
            <font-awesome-icon
              :icon="todo.icon"
              class="todo_icon"
              :style="{ color: todo.color }"
            />
            <div class="todo_middle">
              <p class="todo_title">{{ todo.title }}</p>
              <p class="todo_text">
                Total:
                <span class="todo_total">{{ todo.total }}</span>
              </p>
            </div>
            <button class="todo_up" @click.stop="upTotal(todo.id)">UP</button>
          </div>
        </div>
        <div class="todo_more">
          <nuxt-link :to="`/record/${index}`">
            <p class="todo_more_text">More</p>
            <img
              class="todo_more_arrow"
              src="~/assets/images/ifn0772.svg"
              alt=""
            />
          </nuxt-link>
        </div>
      </div>
    </div>

    <nuxt-link to="/create" class="cotucotu-btn add-btn">
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
    </nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ["authenticated"],
  layout: "default",

  created() {
    if (this.$store.getters["todos/getTodos"].length !== 0) return;
    const userId = this.$store.getters.getUserUid;
    this.$store.dispatch("todos/fetchTodos", userId);
  },
  methods: {
    upTotal(documentId) {
      const userId = this.$store.getters.getUserUid;
      this.$store.dispatch("todos/upTotal", { userId, documentId });
      this.$store.dispatch("todos/addDate", { userId, documentId });
    },
    goEdit(index) {
      this.$router.push(`edit/${index}`);
    }
  },
  computed: {
    todos() {
      return this.$store.getters["todos/getTodos"];
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px 12px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  @include tablet-size {
    padding: 45px 24px;
  }
}

.wrap-todos {
  padding-bottom: 30px;
  @include tablet-size {
    padding-bottom: 45px;
  }
}

.todo {
  padding: 15px 0 30px;
  display: flex;
  align-items: center;
  @include tablet-size {
    padding: 25px 0 40px;
  }
  &_main {
    flex: 1;
    margin-right: 20px;
    cursor: pointer;
    @include tablet-size {
      margin-right: 40px;
    }
  }
  &_content {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 0.6em 0.8em;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
  &_edit {
    width: fit-content;
    margin-left: 8px;
    background-color: $highlight-color;
    border-radius: 8px 8px 0 0;
    padding: 0.2em 0.7em;
    &_text {
      color: #fff;
      font-size: 1rem;
    }
  }
  &_icon {
    flex: 0 0 30px;
    height: auto;
    margin-right: 16px;
    @include tablet-size {
      flex: 0 0 40px;
      margin-right: 26px;
    }
  }
  &_middle {
    flex: 1;
    text-align: left;
  }
  &_title {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 12px;
    @include tablet-size {
      margin-bottom: 18px;
    }
  }
  &_text {
    font-style: italic;
    font-size: 1rem;
  }
  &_total {
    font-weight: bold;
    font-size: 1.3rem;
    font-style: normal;
    transition: opacity 0.5s;
  }
  &_up {
    display: inline-block;
    text-decoration: none;
    background: $highlight-color;
    color: #fff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;
    overflow: hidden;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #fadf7d;
    transition: 0.4s;
    @include tablet-size {
      width: 45px;
      height: 45px;
      line-height: 45px;
    }
    &:active {
      -webkit-transform: translateY(2px);
      transform: translateY(2px);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
      border-bottom: none;
    }
  }

  &_more {
    flex: 0 0 50px;
    text-align: left;
    cursor: pointer;
    @include tablet-size {
      flex: 0 0 60px;
    }
    &_text {
      font-size: 1.1rem;
      font-style: italic;
    }
    &_arrow {
      width: 100%;
      display: block;
    }
  }
}

.add-btn {
  margin: 0 auto;
  width: 150px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  .fa-plus {
    color: #fcd23b;
    width: 2rem;
  }
}
</style>
