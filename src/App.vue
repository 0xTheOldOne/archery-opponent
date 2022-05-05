<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
    <b-container fluid class="mt-3 mb-3">
      <router-view />
    </b-container>
  </div>
</template>

<style lang="less">
html {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #333;

  * {
    color: #fff;
    background-color: #333;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
