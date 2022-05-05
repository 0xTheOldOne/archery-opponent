<template>
  <div class="component">
    <div class="score m-3" :val="val">
      {{ val }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Score",
  props: {
    val: Number,
  },
};
</script>

<style scoped lang="less">
.component {
  @size: 5rem;

  .score {
    color: black;
    width: @size;
    height: @size;
    border-radius: 100%;
    border: 1px solid;
    border-color: black;
    text-align: center;
    line-height: @size;

    &[val="0"] {
      background-color: lightgoldenrodyellow;
    }

    &[val="1"],
    &[val="2"] {
      background-color: white;
    }

    &[val="3"],
    &[val="4"] {
      color: white;
      background-color: black;
      border-color: white;
    }

    &[val="5"],
    &[val="6"] {
      background-color: #009ee1;
    }

    &[val="7"],
    &[val="8"] {
      background-color: #e50017;
    }

    &[val="9"],
    &[val="10"] {
      background-color: #ffdd00;
    }
  }
}
</style>
