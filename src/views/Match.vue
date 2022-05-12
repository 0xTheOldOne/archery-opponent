<template>
  <b-container class="scoreboard">
    <b-row>
      <b-col>
        <table>
          <tr>
            <th style="width: 20% !important">{{ $t("pages.match.round") }}</th>
            <th :colspan="shotsPerRound">{{ $t("pages.match.shots") }}</th>
            <th style="width: 20% !important">{{ $t("pages.match.total") }}</th>
          </tr>
          <tr v-for="round in match" :key="round.index" class="round">
            <td>#{{ round.index }}</td>
            <td v-for="shot in sortArray(round.shots)" :key="shot.index" :style="'width: ' + columnWidth + '% !important; text-align:center !important;'">
              {{ shot.val }}
            </td>
            <td v-if="round.shots.length == shotsPerRound">{{ sumShots(round.shots) }}</td>
          </tr>
          <tr>
            <td>{{ $t("pages.match.total") }}</td>
            <td :colspan="shotsPerRound + 1">{{ total }}</td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";

export default {
  name: "Scoreboard",
  computed: {
    ...mapState({
      shotsPerRound: (state) => state.shotsPerRound,
      match: (state) => state.match,
    }),
    total: function () {
      let sum = 0;
      let max = 0;

      this.match.forEach((round) => {
        round.shots.forEach((shot) => {
          sum += shot.val;
          max += 10;
        });
      });

      return sum + " / " + max;
    },
    columnWidth: function () {
      return (100 - 20 - 20) / this.shotsPerRound;
    },
  },
  methods: {
    sortArray(array) {
      return array.slice().sort(function (a, b) {
        return b.val - a.val;
      });
    },
    sumShots(shots) {
      let sum = 0;

      shots.forEach((shot) => {
        sum += shot.val;
      });

      return sum;
    },
  },
};
</script>

<style scoped lang="less">
@import "../style/common.less";

.scoreboard {
  height: calc(100% - @nav-height - @title-height);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
