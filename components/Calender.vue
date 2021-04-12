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
        :style="{ backgroundColor: backColor[day.count] }"
      >
        <div class="calender_day_inner">{{ day.day }}</div>
      </div>
    </div>

    <div class="calender_figure">
      <p class="calender_less">Less</p>
      <div
        v-for="n in 4"
        :key="n"
        class="calender_color"
        :style="{ backgroundColor: backColor[n - 1] }"
      ></div>
      <p class="calender_more">More</p>
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
      backColor: ["#FFF", "#fcfbba", "#fffc60cc", "#fffb00"]
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
        this.days.push({ day, disable: true, count: 0 });
      }

      for (let i = 0; i < endDay; i++) {
        this.days.push({ day: i + 1, disable: false, count: 0 });
      }

      for (let i = 0; i < 6 - endDayOfWeek; i++) {
        this.days.push({ day: i + 1, disable: true, count: 0 });
      }

      this.todo.dates.forEach(date => {
        const realdate = Number.isNaN(new Date(date).getTime())
          ? date.toDate()
          : date;
        const dayDate = dayjs(realdate);

        const thisYear = now
          .startOf("year")
          .diff(dayDate.startOf("year"), "year");

        const thisMonth = now
          .startOf("month")
          .diff(dayDate.startOf("month"), "month");

        const thisDay = dayDate.format("D");

        if (thisYear === 0 && thisMonth === 0) {
          this.days.forEach(day => {
            if (String(day.day) === String(thisDay) && day.disable === false) {
              if (day.count === 3) return;
              day.count++;
            }
          });
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
    @include tablet-size {
      row-gap: 34px;
      margin-bottom: 26px;
    }
  }
  &_arrow {
    width: 16px;
    height: auto;
    cursor: pointer;
    @include tablet-size {
      width: 18px;
    }
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
    margin-bottom: 12px;
    @include tablet-size {
      grid-gap: 12px;
      margin-bottom: 20px;
    }
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
    &.disabled {
      opacity: 0.3;
    }
  }
  &_figure {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &_color {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    @include tablet-size {
      width: 26px;
      height: 26px;
      margin-right: 12px;
    }
    &:first-of-type {
      margin-left: 6px;
      @include tablet-size {
        margin-left: 12px;
      }
    }
  }
}
</style>
