import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    userLocale: state.userLocale,
    shotsPerRound: state.shotsPerRound,
    minimumScore: state.minimumScore,
    maximumScore: state.maximumScore,
    missChances: state.missChances,
    match: state.match,
    round: state.round,
  }),
});

export default new Vuex.Store({
  state: {
    userLocale: "",
    shotsPerRound: 3,
    minimumScore: 1,
    maximumScore: 10,
    missChances: 5,
    match: [],
    round: [],
  },
  mutations: {
    resetLocalStorage(state) {
      console.debug("Reset localStorage...");

      // Delete localStorage state
      localStorage.removeItem(vuexPersistKey);

      // Default values
      state.shotsPerRound = 3;
      state.minimumScore = 1;
      state.maximumScore = 10;
      state.missChances = 5;
      state.match = [];
      state.round = [];

      this.commit("initializeFromLocalStorage");

      console.debug("Reset localStorage... DONE");
    },
    initializeFromLocalStorage(state) {
      console.debug("Retrieving settings from localStorage...");

      if (localStorage.getItem(vuexPersistKey) != null && localStorage.getItem(vuexPersistKey) != undefined) {
        state = JSON.parse(localStorage.getItem(vuexPersistKey));
      } else {
        localStorage.setItem(vuexPersistKey, JSON.stringify(state));
      }

      console.debug("Retrieving settings from localStorage... DONE");
    },
    shootArrow(state) {
      console.debug("Shooting an arrow between " + state.minimumScore + " and " + state.maximumScore + "...");

      var miss = Math.random() < state.missChances / 100; // https://stackoverflow.com/a/11552190
      var score = Math.floor(Math.random() * state.maximumScore) + state.minimumScore; // https://stackoverflow.com/a/4960020
      var result = miss ? 0 : score;

      // New round if necessary
      if (state.round.length >= state.shotsPerRound) {
        state.match.push(state.round);
        state.round = [];
      }

      state.round.push({
        index: state.round.length + 1,
        val: result,
      });

      console.debug("Shooting an arrow between " + state.minimumScore + " and " + state.maximumScore + "... " + result);
    },
    resetMatch(state) {
      this.commit("resetLocalStorage");
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
