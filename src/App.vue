<template>
  <div id="app">
    <b-navbar toggleable type="dark" variant="info" id="nav">
      <b-navbar-brand href="#" v-if="$route.name.toString().toLowerCase() == 'home'">
        {{ $t("app") }}
      </b-navbar-brand>
      <b-navbar-brand href="#" v-else>
        {{ $t("pages." + $route.name.toString().toLowerCase() + ".title") }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" class="ml-auto">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-up"></b-icon>
          <b-icon v-else icon="list"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link to="/">{{ $t("pages.home.title") }}</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/settings">{{ $t("pages.settings.title") }}</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/shoot">{{ $t("pages.round.title") }}</router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/scoreboard">{{ $t("pages.match.title") }}</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view id="wrapper" />
  </div>
</template>

<style lang="less">
@import "./style/common.less";

html {
  .fullcontent();
  color: @font-color;
  background-color: @background-color;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: @font-size;

  body {
    .fullcontent();
    color: inherit;
    background-color: inherit;

    #app {
      .fullcontent();
      position: relative;
      height: 100vh;
      margin: auto;

      #wrapper {
        height: calc(100vh - @nav-height - @title-margin);

        .title-bar {
          .gradient(@accent-color, @light-color);
          margin-bottom: @title-margin;

          .title {
            padding-left: 1.5rem;
            font-size: 3rem;
            line-height: @title-height;
            text-shadow: 0px 2px 1px @background-color;
          }
        }

        h1 {
          font-size: 4rem;
        }

        .card {
          * {
            color: @background-color;
          }
        }
      }

      #nav {
        .gradient(@light-color, @accent-color);
        height: @nav-height;
        padding: 0px 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: @title-margin;

        .navbar-brand {
          font-size: 3rem;
          height: @nav-height;
          line-height: @nav-height;
          padding: 0px 1rem;
        }

        .navbar-toggler {
          .gradient(@accent-color, @light-color);
        }

        .navbar-collapse {
          background-color: @accent-color;
          border: 1px solid @light-color;
          border-top: 0px;
          z-index: 500;
          padding: 0.5rem 1rem;
        }

        * {
          color: @font-color;
          text-decoration: none;
          text-shadow: 0px 1px #333;
        }
      }
    }
  }
}
</style>
