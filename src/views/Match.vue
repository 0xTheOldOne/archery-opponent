<template>
  <div>
    <div class="title-bar">
      <div class="title">{{ $t("pages.match.title") }}</div>
    </div>
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
              <td v-for="shot in sortArray(round.shots)" :key="shot.index" :style="'width: ' + (100 - 20 - 20) / shotsPerRound + '% !important'">
                {{ shot.val }}
              </td>
              <td>{{ sumShots(round.shots) }}</td>
            </tr>
            <tr>
              <td>{{ $t("pages.match.total") }}</td>
              <td :colspan="shotsPerRound + 1">{{ total }}</td>
            </tr>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
  },
  methods: {
    sortArray(array) {
      return array.sort(function (a, b) {
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
  height: calc(100vh - @nav-height - @title-height - 2 * @title-margin);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
