<template>
  <div class="calender">
    <div class="calender_head">
      <font-awesome-icon
        class="calender_arrow calender_left"
        icon="chevron-left"
        @click="changeMonth(-1)"
      />
      <h2 class="calender_title">{{ title }}</h2>
      <font-awesome-icon
        class="calender_arrow calender_right"
        icon="chevron-right"
        @click="changeMonth(1)"
      />
      <div class="calender_oneWeek calender_oneWeek1">Sun</div>
      <div class="calender_oneWeek calender_oneWeek2">Mon</div>
      <div class="calender_oneWeek calender_oneWeek3">Tue</div>
      <div class="calender_oneWeek calender_oneWeek4">Wed</div>
      <div class="calender_oneWeek calender_oneWeek5">Thu</div>
      <div class="calender_oneWeek calender_oneWeek6">Fri</div>
      <div class="calender_oneWeek calender_oneWeek7">Sat</div>
    </div>
    <div class="calender_body">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="calender_day"
        :class="{ disabled: day.disable }"
        :style="{ backgroundColor: backColor[0] }"
      >
        <div class="calender_day_inner">{{ day.day }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      title: "",
      days: [],
      todo: [],
      backColor: ["#FFF", "#fcfbba", "#fffd7acc", "#fffb00"]
    };
  },
  created() {
    this.todo = this.$store.getters["todos/getTodos"][this.$route.params.slug];
    const now = dayjs();
    this.createCalender(now);
  },
  methods: {
    changeMonth(n) {
      const oldDay = dayjs(`${this.title}`);
      const newDay = oldDay.add(n, "month");

      this.createCalender(newDay);
    },
    createCalender(now) {
      this.days = [];

      const startDay = now.startOf("month").format("d");
      //  今月の最後の日
      const endDay = now.endOf("month").format("DD");
      //  今月の最後の日の曜日
      const endDayOfWeek = now.endOf("month").format("d");
      // 先月の最後の日
      const lastDay = now
        .subtract(1, "month")
        .endOf("month")
        .format("DD");

      for (let i = 0; i < startDay; i++) {
        const day = lastDay - startDay + i + 1;
        this.days.push({ day, disable: true });
      }

      for (let i = 0; i < endDay; i++) {
        this.days.push({ day: i + 1, disable: false });
      }

      for (let i = 0; i < 6 - endDayOfWeek; i++) {
        this.days.push({ day: i + 1, disable: true });
      }

      this.todo.dates.forEach(date => {

        const dayDate = dayjs(date.toDate());
        const thisYear = now.diff(dayDate, "year");
        const thisMonth = now.diff(dayDate, "month");

        const thisDay = dayDate.format("DD");

        if (thisYear === 0 && thisMonth === 0) {
          const filterDays = this.days.filter((day) => String(day.day) === thisDay);
          console.log(filterDays);
        }
      });

      this.title = now.format("YYYY/MM");
    }
  }
};
</script>

<style lang="scss" scoped>
@for $i from 1 through 7 {
  .calender_oneWeek#{$i} {
    grid-area: oneWeek#{$i};
  }
}

.calender {
  padding: 0 10px;
  &_head {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-areas:
      "left  tit   tit   tit   tit   tit   right"
      "oneWeek1 oneWeek2 oneWeek3 oneWeek4 oneWeek5 oneWeek6 oneWeek7";
    justify-items: center;
    row-gap: 24px;
    align-items: center;
    margin-bottom: 16px;
  }
  &_arrow {
    width: 16px;
    height: auto;
  }
  &_left {
    grid-area: left;
  }
  &_right {
    grid-area: right;
  }
  &_title {
    font-size: 1.4rem;
    grid-area: tit;
  }
  &_oneWeek {
    font-weight: bold;
    color: $text-color;
  }
  &_body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 8px;
  }
  &_day {
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    &_inner {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      font-weight: bold;
    }
    &.row {
      background-color: #fcfbba;
    }
    &.middle {
      background-color: #fffd7acc;
    }
    &.high {
      background-color: #fffb00;
    }
    &.disabled {
      opacity: 0.3;
    }
  }
}
</style>
