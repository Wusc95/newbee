<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="nbicon nbfanhui" @click="$router.go(-1)"></i>
        <div class="header-search">
          <i class="nbicon nbsousuo"></i>
          <input type="text" class="search-title" v-model="keyworld" placeholder="请输入搜索关键字"/>
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @change="changeTab">
        <van-tab title="推荐" name></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "productList",
  data() {
    return {
      keyworld: "" //搜索关键字
    };
  },
  methods: {
    getSearch() {},
    changeTab() {}
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";
.product-list-wrap {
  .product-list-content {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background: #fff;
    .wh(100%, 50px);
    .category-header {
      .fj();
      .wh(100%, 50px);
      line-height: 50px;
      .boxSizing();
      padding: 0 15px;
      font-size: 15px;
      color: #656771;
      &.active {
        background: @primary;
      }
      .icon-left {
        font-size: 25px;
        font-weight: bold;
      }
      .header-search {
        background: #f7f7f7;
        .borderRadius(20px);
        .wh(76%,20px);
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: #f7f7f7;
        .nbsousuo{
          padding: 0 5px 0 20px;
          font-size: 17px;
        }
        .search-title{
          font-size: 12px;
          color: #666;
          background: #f7f7f7;
        }
      }
    }
  }
}
</style>