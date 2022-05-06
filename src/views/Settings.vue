<template>
  <div>
    <div class="title-bar">
      <div class="title">⚙️ Settings</div>
    </div>
    <b-container fluid>
      <div class="settings">
        <b-row>
          <b-col cols="6 text-right">
            <div class="label">Shots per round</div>
          </b-col>
          <b-col cols="6">
            <b-form-select v-model="shotsPerRound" :options="shotsPerRoundOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6 text-right">
            <div class="label">Minimum score</div>
          </b-col>
          <b-col cols="6">
            <b-form-input type="number" v-model="minimumScore" min="1" max="9"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6 text-right">
            <div class="label">Maximum score</div>
          </b-col>
          <b-col cols="6">
            <b-form-input type="number" v-model="maximumScore" min="2" max="10"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6 text-right">
            <div class="label">Chances of miss (%)</div>
          </b-col>
          <b-col cols="6">
            <b-form-input type="number" v-model="missChances" min="0" max="100"></b-form-input>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      shotsPerRoundOptions: [1, 3, 6],
    };
  },
  computed: {
    shotsPerRound: {
      get() {
        return this.$store.state.shotsPerRound;
      },
      set(value) {
        this.$store.commit("updateShotsPerRound", value);
      },
    },
    minimumScore: {
      get() {
        return this.$store.state.minimumScore;
      },
      set(value) {
        this.$store.commit("updateMinimumScore", value);
      },
    },
    maximumScore: {
      get() {
        return this.$store.state.maximumScore;
      },
      set(value) {
        this.$store.commit("updateMaximumScore", value);
      },
    },
    missChances: {
      get() {
        return this.$store.state.missChances;
      },
      set(value) {
        this.$store.commit("updateMissChances", value);
      },
    },
  },
};
</script>

<style scoped lang="less">
.settings {
  @line-height: 2rem;
  padding: 3rem 0px;

  .row {
    margin-bottom: 1rem;

    .label {
      line-height: @line-height;
    }

    input,
    select {
      width: 100px;
      line-height: @line-height;
      text-align: center;
    }
  }
}
</style>
