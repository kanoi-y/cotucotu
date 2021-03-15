<template>
  <div class="wrapper">
    <TitleField :title="title" />
    <div class="create">
      <div id="icon_cont" class="create_icon_wrap">
        <div class="create_icon_cont">
          <font-awesome-icon
            v-for="n in iconArray.length"
            :key="n"
            :style="{ color: colorArray[nowColor].code }"
            class="create_icon"
            :icon="iconArray[n - 1]"
          />
        </div>
      </div>
      <div class="create_color_wrap">
        <div
          v-for="n in colorArray.length"
          :key="n"
          @click="changeColor(n)"
          class="create_color"
          :class="[colorArray[n - 1].name, { selected: n - 1 === nowColor }]"
        ></div>
      </div>
      <div class="create_todo">
        <input
          class="create_text"
          type="text"
          v-model="text"
          placeholder="することを入力"
        />
      </div>
      <button type="button" class="cotucotu-btn create_btn" @click="createTodo">
        作 成
      </button>
    </div>
  </div>
</template>

<script>
import TitleField from "~/components/TitleField.vue"

export default {
  middleware: ["authenticated"],
  layout: "page",
  components: {
    TitleField,
  },
  data() {
    return {
      timeoutId: null,
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
      title: "新規作成",
    };
  },
  mounted() {
    const iconCont = document.getElementById("icon_cont");
    iconCont.addEventListener("scroll", this.fitScroll);
    this.fitScroll();
  },
  methods: {
    fitScroll() {
      const iconCont = document.getElementById("icon_cont");
      const iconBetween = window.innerWidth / 2;
      const difference = iconCont.scrollLeft % iconBetween;

      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        if (difference >= iconBetween / 2) {
          iconCont.scrollLeft = iconCont.scrollLeft - difference + iconBetween;
        } else {
          iconCont.scrollLeft = iconCont.scrollLeft - difference;
        }

        this.nowIcon = Math.round(iconCont.scrollLeft / iconBetween);
      }, 500);
    },
    changeColor(n) {
      this.nowColor = n - 1;
    },
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
      this.$store.dispatch("todos/addTodo", { userId, todo });
    }
  }
};
</script>

<style lang="scss" scoped>
$icon-width: 70px;

.wrapper {
  padding: 0;
  text-align: center;
}

.create {
  padding-top: 20px;
  &_icon_wrap {
    padding: 28px 0;
    margin-bottom: 28px;
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
    margin-bottom: 40px;
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
    border: 2px solid transparent;
  }
  &_btn {
    padding: 0.4em 0.8em;
    font-size: 1.3rem;
  }
}

.pink {
  background-color: #ffa8a8;
  &.selected {
    border: 2px solid #ff3c3c;
  }
}

.purple {
  background-color: #f1a8ff;
  &.selected {
    border: 2px solid #de3cff;
  }
}

.blue {
  background-color: #a8ffe9;
  &.selected {
    border: 2px solid #20ffc7;
  }
}

.green {
  background-color: #bbffa8;
  &.selected {
    border: 2px solid #49ff16;
  }
}

.yellow {
  background-color: #ffe8a8;
  &.selected {
    border: 2px solid #ffbf0d;
  }
}
</style>
