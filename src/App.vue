<template>
  <div id="app">
    <router-view id="wrapper" />

    <div id="nav">
      <router-link to="/">🏠</router-link>
      <router-link to="/settings">⚙️</router-link>
      <router-link to="/shoot">🏹</router-link>
      <router-link to="/scoreboard">📋</router-link>
    </div>
  </div>
</template>

<style lang="less">
@font-size: 14px;
@font-color: white;
@background-color: #263238;
@accent-color: #455a64;
@light-color: #78909c;
@nav-height: 6rem;
@bootstrap-padding: 15px;

html {
  color: @font-color;
  background-color: @background-color;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: @font-size;

  body {
    color: inherit;
    background-color: inherit;

    #app {
      position: relative;
      height: 100vh;
      margin: auto;

      #wrapper {
        height: 100vh - @nav-height;

        .title-bar {
          .gradient(@accent-color, @light-color);
          margin-bottom: 2rem;

          .title {
            padding-left: 1.5rem;
            font-size: 3rem;
            line-height: @nav-height;
            text-shadow: 0px 2px 1px @background-color;
          }
        }

        h1 {
          font-size: 4rem;
        }
      }

      #nav {
        .gradient(@light-color, @accent-color);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: @nav-height;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
          color: @font-color;
          text-decoration: none;
          font-size: 3rem;
          height: @nav-height;
          line-height: @nav-height;
          text-shadow: 0px 1px #333;
          padding: 0px 1rem;
        }
      }
    }
  }
}

.gradient(@from, @to) {
  background: @from;
  background: linear-gradient(180deg, @from 0%, @to 100%);
  box-shadow: 0px 1px 1px @from, 0px -1px 1px @to;
}
</style>
