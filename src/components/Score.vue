<template>
  <div class="score" :val="val">
    <div class="value" v-if="val > 0">{{ val }}</div>
    <div class="value" v-else>M</div>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    val: 0,
  },
};
</script>

<style scoped lang="less">
@size: 6rem;

.score {
  .value {
    width: @size;
    height: @size;
    line-height: @size - 0.25rem;
    margin: 0 auto;
    text-align: center;
    font-size: @size / 2.5;
    border-radius: 100%;
    border: 0.25rem solid;
    border-color: black;
    color: black;
    position: relative;
  }

  &[val="0"] {
    .value {
      background-color: darkgrey;
    }
  }

  &[val="1"],
  &[val="2"] {
    .value {
      background-color: white;
    }
  }

  &[val="3"],
  &[val="4"] {
    .value {
      color: white;
      background-color: black;
      border-color: white;
    }
  }

  &[val="5"],
  &[val="6"] {
    .value {
      background-color: #009ee1;
    }
  }

  &[val="7"],
  &[val="8"] {
    .value {
      background-color: #e50017;
    }
  }

  &[val="9"],
  &[val="10"] {
    .value {
      background-color: #ffdd00;
    }
  }
}
</style>
