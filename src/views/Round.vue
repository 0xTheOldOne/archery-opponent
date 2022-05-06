<template>
  <div>
    <div class="title-bar">
      <div class="title">🏹 Match</div>
    </div>
    <div class="current-round">
      <div class="score-container">
        <Score v-for="shot in round" :key="shot.index" :val="shot.val" />
      </div>
    </div>
    <div class="buttons">
      <b-button variant="success" class="ml-3 mr-3" @click="shoot">🎲</b-button>
      <b-button variant="danger" class="ml-3 mr-3" @click="reset">🧺</b-button>
    </div>
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
@buttons-height: 5rem;

.buttons {
  height: @buttons-height;
  text-align: center;

  .btn {
    font-size: 3rem;
    line-height: 4rem;
    width: 8rem;
  }
}

.current-round {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56vh;

  .score-container {
    width: 100%;
    .score {
      width: 33%;
      float: left;
      margin-bottom: 1rem;
    }
  }
}
</style>
