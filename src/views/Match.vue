<template>
  <div>
    <div class="title-bar">
      <div class="title">📋 Scoreboard</div>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <div class="scoreboard">
            <table>
              <tr>
                <th style="width: 20% !important">Round</th>
                <th :colspan="shotsPerRound">Shots</th>
                <th style="width: 20% !important">Total</th>
              </tr>
              <tr v-for="round in match" :key="round.index" class="round">
                <td>#{{ round.index }}</td>
                <td v-for="shot in sortArray(round.shots)" :key="shot.index" :style="'width: ' + (100 - 20 - 20) / shotsPerRound + '% !important'">
                  {{ shot.val }}
                </td>
                <td>{{ sumShots(round.shots) }}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td :colspan="shotsPerRound + 1">{{ total }}&nbsp;/&nbsp;{{ maximum }}</td>
              </tr>
            </table>
          </div>
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

      this.match.forEach((round) => {
        round.shots.forEach((shot) => {
          sum += shot.val;
        });
      });

      return sum;
    },
    maximum: function () {
      let sum = 0;

      this.match.forEach((round) => {
        round.shots.forEach((shot) => {
          sum += 10;
        });
      });

      return sum;
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
.scoreboard {
  table {
    width: 100%;

    tr {
      > * {
        text-align: center;
        border-bottom: 1px solid #ccc;
        padding: 0.5rem 0;

        &:first-child {
          text-align: left;
          font-weight: bold;
        }

        &:last-child {
          text-align: right;
        }
      }

      td {
        font-family: monospace;
      }
    }
  }
}
</style>
