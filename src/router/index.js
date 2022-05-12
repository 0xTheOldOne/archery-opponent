import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";
import Round from "../views/Round.vue";
import Match from "../views/Match.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/shoot",
    name: "round",
    component: Round,
  },
  {
    path: "/scoreboard",
    name: "match",
    component: Match,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
];

const router = new VueRouter({
  routes,
});

export default router;
