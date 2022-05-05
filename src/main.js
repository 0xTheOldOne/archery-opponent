import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
Vue.config.devtools = false;

window.Vue = new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    this.$store.commit("initializeFromLocalStorage");
  },
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
