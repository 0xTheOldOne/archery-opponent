<template>
  <div class="home-container">
    <div class="text-center">
      <h1 class="text-focus-in mb-5">Shooting opponent</h1>
      <p>Press ⚙️ for settings</p>
      <p>Press 🏹 to shoot</p>
      <p>Press 📋 to see the results</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted: {},
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-focus-in {
  @duration: 2s;
  -webkit-animation: text-focus-in @duration cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: text-focus-in @duration cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
</style>
