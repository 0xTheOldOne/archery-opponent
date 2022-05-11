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
    opponent: state.opponent,
    opponentGender: state.opponentGender,
    match: state.match,
    round: state.round,
  }),
});

export default new Vuex.Store({
  state: {
    userLocale: "",
    shotsPerRound: 3,
    opponent: "beginner",
    opponentGender: "male",
    profiles: {
      beginner: [
        { val: 0, percent: 100 },
        { val: 1, percent: 95 },
        { val: 2, percent: 90 },
        { val: 3, percent: 85 },
        { val: 4, percent: 80 },
        { val: 5, percent: 75 },
        { val: 6, percent: 65 },
        { val: 7, percent: 60 },
        { val: 8, percent: 30 },
        { val: 9, percent: 20 },
        { val: 10, percent: 10 },
      ],
      advanced: [
        { val: 0, percent: 100 },
        { val: 1, percent: 100 },
        { val: 2, percent: 100 },
        { val: 3, percent: 100 },
        { val: 4, percent: 100 },
        { val: 5, percent: 90 },
        { val: 6, percent: 85 },
        { val: 7, percent: 80 },
        { val: 8, percent: 75 },
        { val: 9, percent: 70 },
        { val: 10, percent: 50 },
      ],
      pro: [
        { val: 0, percent: 100 },
        { val: 1, percent: 100 },
        { val: 2, percent: 100 },
        { val: 3, percent: 100 },
        { val: 4, percent: 100 },
        { val: 5, percent: 100 },
        { val: 6, percent: 100 },
        { val: 7, percent: 100 },
        { val: 8, percent: 100 },
        { val: 9, percent: 90 },
        { val: 10, percent: 80 },
      ],
    },
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
      state.opponent = "beginner";
      state.opponentGender = "male";
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
    setUserLocale(state, payload) {
      console.debug(payload);
      state.userLocale = payload.locale;
    },
    updateShotsPerRound(state, value) {
      console.debug(value);
      state.shotsPerRound = parseInt(value);

      this.commit("resetMatch");
    },
    updateOpponent(state, value) {
      console.debug(value);
      state.opponent = value;

      this.commit("resetMatch");
    },
    updateOpponentGender(state, value) {
      console.debug(value);
      state.opponentGender = value;
    },
    resetMatch(state) {
      console.debug("Reset the entire match...");
      state.match = [];
      state.round = [];
      console.debug("Reset the entire match... DONE");
    },
    shootArrow(state) {
      console.debug("Shooting an arrow...");

      var result = 0;
      var miss = true;

      var mastery = state.profiles[state.opponent].slice().reverse();
      mastery.forEach((score) => {
        // if didn't already hit, randomize
        if (miss) {
          console.debug("Shooting an arrow... " + score.val + " has a " + score.percent + "% chance of hit...");

          // if 100% chances of hit, no random
          if (score.percent == 100) {
            result = score.val;
            miss = false;
          }

          miss = Math.random() > score.percent / 100;

          // if hit, store score
          if (!miss) {
            result = score.val;
          }

          console.debug("Shooting an arrow... " + score.val + " has a " + score.percent + "% chance of hit... " + miss ? "MISS" : "HIT !");
        }
      });

      if (state.match.length == 0) {
        state.match.push({
          index: state.match.length + 1,
          shots: [],
        });
      }

      // New round if necessary
      if (state.round.length >= state.shotsPerRound) {
        state.match.push({
          index: state.match.length + 1,
          shots: [],
        });
        state.round = [];
      }

      var arrow = {
        index: state.round.length + 1,
        val: result,
      };

      state.match[state.match.length - 1].shots.push(arrow);
      state.round.push(arrow);

      console.debug("Shooting an arrow... " + result);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
