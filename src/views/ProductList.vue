<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="nbicon nbfanhui" @click="$router.go(-1)"></i>
        <div class="header-search">
          <i class="nbicon nbsousuo"></i>
          <input type="text" class="search-title" v-model="keyword" placeholder="请输入搜索关键字" />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#e31d1a" @change="changeTab">
        <van-tab title="推荐" name></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="refreshing"
      @refresh="onRefresh"
      class="product-list-refresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <div
          class="product-item"
          v-for="(item, index) in productList"
          :key="index"
          @click="productDetail(item)"
        >
          <img :src="item.goodsCoverImg | prefix" />
          <div class="product-info">
            <p class="name">{{item.goodsName}}</p>
            <p class="subtitle">{{item.goodsIntro}}</p>
            <span class="price">￥ {{item.sellingPrice}}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "productList",
  props: ["from", "categoryId"],
  data() {
    return {
      keyword: this.$route.query.keyword || "", // 关键词搜索
      refreshing: false, // 是否是下拉刷新
      loading: false,
      finished: false, // 是否没有更多
      productList: [], // 列表数据
      totalPage: 0, // 页码总数
      page: 1, // 页码
      orderBy: ""
    };
  },
  created() {
    console.log(this.from, this.categoryId,"casnhu");
  },
  methods: {
    async init() {
      // const { categoryId, from } = this.$route.query;
      if (!this.categoryId && !this.keyword) {
        this.$toast.fail("请输入关键词");
        this.finished = true;
        this.loading = false;
        return;
      }
      // const {
      //   data,
      //   data: { list }
      // } = await search({
      //   pageNumber: this.page,
      //   goodsCategoryId: categoryId,
      //   keyword: this.keyword,
      //   orderBy: this.orderBy
      // });

      const {
        data,
        data: { list }
      } = await this.$api.goods.goodSearch({
        params: {
          pageNumber: this.page,
          goodsCategoryId: this.categoryId,
          keyword: this.keyword,
          orderBy: this.orderBy
        }
      });

      this.productList = this.productList.concat(list);
      this.totalPage = data.totalPage;
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true;
    },
    productDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` });
    },

    getSearch() {
      this.onRefresh();
    },
    onRefresh() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.productList = [];
        this.refreshing = false;
      }
      this.init();
    },
    changeTab(name, title) {
      this.orderBy = name;
      this.onRefresh();
    }
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
        .wh(76%, 20px);
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: #f7f7f7;
        .nbsousuo {
          padding: 0 5px 0 20px;
          font-size: 17px;
        }
        .search-title {
          font-size: 12px;
          color: #666;
          background: #f7f7f7;
        }
      }
      .search-btn {
        height: 28px;
        margin: 8px 0;
        line-height: 28px;
        padding: 0 5px;
        color: #fff;
        background: @primary;
        .borderRadius(5px);
        margin-top: 10px;
      }
    }
  }
  .product-list-refresh {
    margin-top: 78px;
    .product-item {
      .fj();
      width: 100%;
      height: 120px;
      padding: 10px 0;
      border-bottom: 1px solid #dcdcdc;
      img {
        width: 140px;
        height: 120px;
        padding: 0 10px;
        .boxSizing();
        .product-info {
          width: 56%;
          height: 120px;
          padding: 5px;
          text-align: left;
          .boxSizing();
          p {
            margin: 0;
          }
          .name {
            width: 100%;
            max-height: 40px;
            line-height: 20px;
            font-size: 15px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .subtitle {
            width: 100%;
            max-height: 20px;
            padding: 10px 0;
            line-height: 25px;
            font-size: 13px;
            color: #999;
            overflow: hidden;
          }
          .price {
            color: @primary;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>