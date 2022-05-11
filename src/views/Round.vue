<template>
  <div>
    <div class="title-bar">
      <div class="title">{{ $t("pages.round.title") }}</div>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <div class="current-round">
            <div class="score-container">
              <Score v-for="shot in round" :key="shot.index" :val="shot.val" />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="buttons">
            <b-button variant="success" class="ml-3 mr-3" @click="shoot">🎲</b-button>
            <b-button variant="danger" class="ml-3 mr-3" @click="reset">🧺</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      round: (state) => state.round,
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
@import "../style/common.less";

@buttons-height: @nav-height;

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
  height: calc(100vh - @nav-height - @title-height - @buttons-height - 2 * @title-margin);
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  .score-container {
    width: 90%;
    .score {
      width: 33%;
      float: left;
      margin-bottom: 1rem;
    }
  }
}
</style>
