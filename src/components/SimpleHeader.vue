<template>
  <header class="simple-header">
    <i class="nbicon nbfanhui" @click="goBack"></i>
    <div class="simple-header-title">{{ title }}</div>
    <i class="nbicon nbgengduo" @click="more"></i>
  </header>
</template>

<script>
export default {
  name: "simple-header",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    more(){
      
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  .simple-header-title {
    font-size: 14px;
  }
}
</style>
