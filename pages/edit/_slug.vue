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
        <div class="record_arrow" @click="changeMonth(-1)">
          <font-awesome-icon class="record_arrow_icon" icon="chevron-left" />
        </div>
        <h2 class="record_title">{{ title }}</h2>
        <div class="record_arrow" @click="changeMonth(1)">
          <font-awesome-icon class="record_arrow_icon" icon="chevron-right" />
        </div>
      </div>
      <div class="record_data">
        <div class="record_head">
          <div class="record_date">日付</div>
          <div class="record_count">回数</div>
          <div class="record_space"></div>
        </div>

        <div class="record_content" v-for="(day, index) in days" :key="index">
          <p class="record_content_date">{{ day.date }}</p>
          <span class="record_content_count">{{ day.count }}</span>
          <button class="record_content_cross" @click="deleteTodo(day.date)">
            ×
          </button>
        </div>

        <button class="cotucotu-btn record_button" @click="openModel">
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

      <div class="record_model" v-show="modelFlag">
        <div class="record_model_inner">
          <label class="record_model_label" for="model_date">日付</label>
          <input
            class="record_model_input"
            type="date"
            id="model_date"
            v-model="newDate"
          />
          <label class="record_model_label" for="model_count">回数</label>
          <input
            class="record_model_input"
            type="number"
            id="model_count"
            placeholder="1"
            v-model="newCount"
          />

          <div class="record_model_buttons">
            <button
              class="cotucotu-btn record_model_add"
              @click="addTodo"
              :style="{ opacity: modelButton.opacity }"
              :disabled="modelButton.disable"
            >
              追加
            </button>
            <button
              class="cotucotu-btn record_model_cancel"
              @click="closeModel"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="edit_buttons">
      <button class="cotucotu-btn edit_deleteButton" @click="deleteTodoDB">削 除</button>
      <button class="cotucotu-btn edit_updateButton" @click="updateTodoDB">
        変更を保存する
      </button>
    </div>
  </div>
</template>

<script>
import TitleField from "~/components/TitleField.vue";
import SelectTodo from "~/components/SelectTodo.vue";
import dayjs from "dayjs";

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
      text: "",
      title: "",
      days: [],
      dates: [],
      modelFlag: false,
      newDate: "",
      newCount: ""
    };
  },
  mounted() {
    // todoの情報からアイコンとカラーとタイトルをデータにコピー
    this.nowIcon = this.iconArray.indexOf(this.todo.icon);
    this.nowColor = this.colorArray.indexOf(this.todo.color);
    this.text = this.todo.title;

    // datesをtoDate()化してからデータの配列にコピー
    this.todo.dates.forEach(date => {
      console.log(new Date(date).getTime() );
      const realDate = Number.isNaN(new Date(date).getTime()) ? date.toDate() : date;
      this.dates.push(realDate);
    });

    // 今日の日付でrecordを作成
    const now = dayjs();
    this.createCalender(now);
  },
  methods: {
    // 月を変更したときの処理
    changeMonth(n) {
      const oldDay = dayjs(`${this.title}`);
      const newDay = oldDay.add(n, "month");

      this.createCalender(newDay);
    },

    // 入力された日時に基づいたrecordを作成
    createCalender(now) {
      this.days = [];

      this.dates.forEach(date => {
        let todoArray = [];

        const dayDate = dayjs(date);

        if (
          dayDate.format("YYYY") === now.format("YYYY") &&
          dayDate.format("MM") === now.format("MM")
        ) {
          todoArray = this.days.filter(
            data => data.date === dayDate.format("YYYY/MM/DD")
          );

          if (todoArray.length === 0) {
            this.days.push({ date: dayDate.format("YYYY/MM/DD"), count: 1 });
          } else {
            this.days.forEach(day => {
              if (day.date === dayDate.format("YYYY/MM/DD")) {
                day.count++;
              }
            });
          }
        }
      });

      this.title = now.format("YYYY/MM");
    },

    // todoをdatesから削除する
    deleteTodo(date) {
      this.dates = this.dates.filter(dat => {
        const dayDate = dayjs(dat);

        if (dayDate.format("YYYY/MM/DD") !== date) {
          return dat;
        }
      });
      const now = dayjs(`${this.title}`);
      this.createCalender(now);
    },

    // todoをdatesに増やす
    addTodo() {
      for (let i = 0; i < this.newCount; i++) {
        this.dates.push(new Date(this.newDate));
      }

      this.dates.sort((a, b) => new Date(a) - new Date(b));
      const now = dayjs(`${this.title}`);
      this.createCalender(now);
      this.closeModel();

      this.newDate = "";
      this.newCount = "";
    },

    updateTodoDB() {
      const userId = this.$store.getters.getUserUid;
      const todo = {
        color: this.colorArray[this.nowColor],
        icon: this.iconArray[this.nowIcon],
        title: this.text,
        dates: this.dates,
        total: this.dates.length
      };
      const documentId = this.todo.id;
      this.$store.dispatch("todos/updateTodo", { userId, todo, documentId });
    },

    deleteTodoDB() {
      const userId = this.$store.getters.getUserUid;
      const index = this.$route.params.slug;
      const documentId = this.todo.id;
 
      const result = window.confirm("本当に削除してもよろしいでしょうか？");

      if (result) {
        this.$store.dispatch("todos/deleteTodo", { userId, documentId });
      }
    },
    // モーダルを開く
    openModel() {
      this.modelFlag = true;
    },

    // モーダルを閉じる
    closeModel() {
      this.modelFlag = false;
    }
  },
  computed: {
    // このページのtodoを取得する処理
    todo() {
      const todos = this.$store.getters["todos/getTodos"];
      const todo = todos[this.$route.params.slug];
      return todo;
    },

    modelButton() {
      if (
        !this.newCount ||
        !this.newDate ||
        this.newCount === "0" ||
        Number(this.newCount) < 0
      ) {
        return { opacity: 0.6, disable: true };
      } else {
        return { opacity: 1, disable: false };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  padding-bottom: 30px;
  &_buttons {
    display: flex;
    justify-content: space-around;
  }
  &_deleteButton {
    background-color: #ffa8a8;
  }
}
.record {
  padding: 10px 12px;
  padding-top: 30px;
  margin-bottom: 50px;
  position: relative;
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
      display: block;
      margin: 0 auto;
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
  &_model {
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    &_inner {
      background-color: #fff;
      padding: 25px;
      border-radius: 8px;
    }
    &_label {
      display: block;
      color: $text-color;
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    &_input {
      display: block;
      width: 270px;
      padding: 0.3em 0.4em;
      margin-bottom: 20px;
      color: $text-color;
      font-size: 1rem;
      border-bottom: 1px solid $text-color;
      &:last-of-type {
        margin-bottom: 40px;
      }
    }
    &_buttons {
      display: flex;
    }
    &_add {
      flex: 1;
      margin-right: 25px;
    }
    &_cancel {
      flex: 1;
    }
  }
}
</style>
