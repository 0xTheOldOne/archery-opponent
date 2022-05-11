<template>
  <div>
    <div class="title-bar">
      <div class="title">{{ $t("pages.settings.title") }}</div>
    </div>
    <b-container>
      <div class="settings">
        <b-row>
          <b-col cols="5 text-right">
            <div class="label">{{ $t("pages.settings.shots_per_round") }}</div>
          </b-col>
          <b-col cols="7">
            <b-form-select v-model="shotsPerRound" :options="shotsPerRoundOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="5 text-right">
            <div class="label">{{ $t("pages.settings.level_of_mastery") }}</div>
          </b-col>
          <b-col cols="7">
            <b-form-select v-model="opponent" :options="opponentOptions"></b-form-select>
          </b-col>
        </b-row>

        <div class="spacer small"></div>

        <b-row>
          <b-col>
            <div id="graph"></div>
          </b-col>
        </b-row>

        <!-- <div class="spacer small"></div> -->

        <!-- <b-row>
          <b-col>
            <table>
              <tr>
                <th style="width: 20% !important">Score</th>
                <th>Chances of hit</th>
              </tr>
              <tr v-for="score in profiles[opponent].slice().reverse()" :key="score.val">
                <td>{{ score.val }}</td>
                <td>{{ score.percent }}%</td>
              </tr>
            </table>
          </b-col>
        </b-row> -->

        <!-- <b-row>
          <b-col cols="6 text-right">
            <div class="label">Gender</div>
          </b-col>
          <b-col cols="6">
            <b-form-select v-model="opponentGender" :options="genderOptions"></b-form-select>
          </b-col>
        </b-row> -->

        <!-- <b-row>
          <b-col v-if="this.opponentGender == 'male'">
            male
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_rtceylyu.json" background="transparent" speed="1" loop autoplay />
          </b-col>
          <b-col v-else>
            female
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_qv8r7s30.json" background="transparent" speed="1" loop autoplay />
          </b-col>
        </b-row> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import Highcharts from "../assets/scripts/highcharts";

let chartOptions = {
  chart: {
    height: 300,
    renderTo: "graph",
    backgroundColor: "transparent",
  },
  title: "",
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
    itemWidth: 200,
    floating: true,
    borderWidth: 0,
    align: "bottom",
    layout: "horizontal",
    labelFormatter: function () {
      return '<span style="color:' + this.color + '">' + this.name + ": </span>(<b>" + (100 - this.y) + "%)<br/>";
    },
  },

  tooltip: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      cursor: "pointer",
      colors: ["#ffdd00", "#ffdd00", "#e50017", "#e50017", "#009ee1", "#009ee1", "#000", "#000", "#fff", "#fff", "darkgrey"],
    },
  },
  series: [
    {
      data: [],
      type: "pie",
      name: "Chances of hit by score",
      size: "100%",
      innerSize: "60%",
      center: ["50%", "50%"],
      borderWidth: "0",
      allowPointSelect: false,
      dataLabels: {
        enabled: true,
        color: "white",
        distance: "-20%",
        formatter: function () {
          if (this.y > 0) {
            return this.point.name; // + " (" + Highcharts.numberFormat(this.point.percentage, 1) + " %)";
          }
        },
      },
    },
  ],
};

export default {
  name: "Settings",
  data() {
    return {
      shotsPerRoundOptions: [1, 3, 6],
      opponentOptions: ["beginner", "advanced", "pro"],
      genderOptions: ["male", "female"],
    };
  },
  computed: {
    lottieGender: {
      get() {
        return this.gender == "male" ? "https://assets5.lottiefiles.com/packages/lf20_rtceylyu.json" : "https://assets10.lottiefiles.com/packages/lf20_qv8r7s30.json";
      },
    },
    profiles: {
      get() {
        return this.$store.state.profiles;
      },
    },
    shotsPerRound: {
      get() {
        return this.$store.state.shotsPerRound;
      },
      set(value) {
        this.$store.commit("updateShotsPerRound", value);
      },
    },
    opponent: {
      get() {
        return this.$store.state.opponent;
      },
      set(value) {
        this.$store.commit("updateOpponent", value);
        this.drawChart();
      },
    },
    opponentGender: {
      get() {
        return this.$store.state.opponentGender;
      },
      set(value) {
        this.$store.commit("updateOpponentGender", value);
      },
    },
  },
  mounted() {
    this.drawChart();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    drawChart: function () {
      var data = [];

      var mastery = this.profiles[this.opponent].slice().reverse();
      mastery.forEach((score) => {
        data.push({
          y: 100 - score.percent,
          name: score.val,
        });
      });

      chartOptions.series[0].data = data;

      new Highcharts.Chart(chartOptions);
    },
    handleResize: function () {
      this.drawChart();
    },
  },
};
</script>

<style scoped lang="less">
@import "../style/common.less";
.settings {
  @line-height: 2rem;

  height: calc(100vh - @nav-height - @title-height - 2 * @title-margin);
  overflow-y: auto;
  overflow-x: hidden;

  .row {
    margin-bottom: 1rem;

    .label {
      line-height: @line-height;
    }

    input,
    select {
      text-align: center;
    }

    lottie-player {
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
  }
}
</style>
