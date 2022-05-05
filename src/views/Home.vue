<template>
  <div class="view">
    <b-row>
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Volée" active>
              <b-card-text>
                <b-row>
                  <b-col>
                    <div class="round mb-4 mt-4">
                      <Score v-for="shot in round" :key="shot.index" :val="shot.val" />
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="9">Shots per round</b-col>
                  <b-col cols="3">
                    <b-form-input type="number" :value="shotsPerRound" min="1" max="6"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="9">Minimum score</b-col>
                  <b-col cols="3">
                    <b-form-input type="number" :value="minimumScore" min="1" max="9"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="9">Maximum score</b-col>
                  <b-col cols="3">
                    <b-form-input type="number" :value="maximumScore" min="2" max="10"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="9">Chances of miss</b-col>
                  <b-col cols="3">
                    <b-form-input type="number" :value="missChances" min="0" max="100"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-center">
                    <b-button variant="success" class="ml-3 mr-3" @click="shoot">Shoot</b-button>
                    <b-button variant="danger" class="ml-3 mr-3" @click="reset">Reset</b-button>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-tab>
            <b-tab title="Récapitulatif">
              <b-card-text>
                <table class="game">
                  <tr>
                    <td></td>
                    <td>
                      <Score v-for="round in match" :key="round.index" :val="round.val" />
                    </td>
                  </tr>
                </table>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import Score from "@/components/Score.vue";

export default {
  name: "Home",
  components: {
    Score,
  },
  computed: {
    ...mapState({
      shotsPerRound: (state) => state.shotsPerRound,
      minimumScore: (state) => state.minimumScore,
      maximumScore: (state) => state.maximumScore,
      missChances: (state) => state.missChances,
      round: (state) => state.round,
      match: (state) => state.match,
    }),
  },
  methods: {
    shoot: function () {
      this.$store.commit({
        type: "shootArrow",
      });
    },
    reset: function () {
      this.$store.commit({
        type: "resetMatch",
      });
    },
  },
};
</script>

<style scoped lang="less">
.view {
  .round {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
