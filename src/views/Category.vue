<template>
  <div class="category-box">
    <header class="category-header" wrap>
      <i class="nbicon nbfanhui" @click="$router.go(-1)"></i>
      <div class="header-search" @click="goProductList">
        <i class="nbicon nbsousuo"></i>
        <!-- <router-link tag="span" class="search-title" to="./product-list?from=category">全场优惠处理</router-link> -->
        <span class="search-title">全场优惠处理</span>
      </div>
      <i class="nbicon nbgengduo"></i>
    </header>
    <div class="search-wrap" ref="searchWrap">
      <list-scroll v-if="categoryData.length" :scroll-data="categoryData" class="nav-side-wrapper">
        <ul class="nav-side">
          <li
            v-for="item in categoryData"
            :key="item.categoryId"
            v-text="item.categoryName"
            :class="{'active' : currentIndex == item.categoryId}"
            @click="selectMenu(item.categoryId)"
          ></li>
        </ul>
      </list-scroll>
      <div class="search-content" v-if="categoryData.length">
        <list-scroll :scroll-data="categoryData">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryData">
                <div class="swiper-slide" v-if="currentIndex == category.categoryId" :key="index">
                  <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                  <div
                    class="category-list"
                    v-for="(products, index) in category.secondLevelCategoryVOS"
                    :key="index"
                  >
                    <p class="catogory-title">{{products.categoryName}}</p>
                    <div
                      class="product-item"
                      v-for="(product, index) in products.thirdLevelCategoryVOS"
                      :key="index"
                      @click="selectProduct(product)"
                    >
                      <img
                        src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                        class="product-img"
                      />
                      <p v-text="product.categoryName" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import listScroll from "@/components/ListScroll";
export default {
  name: "category",
  data() {
    return {
      categoryData: [],
      currentIndex: 15
    };
  },
  created() {
    this.getCategory();
    this.$nextTick(() => {
      this.setWrapHeight();
    });
  },
  methods: {
    async getCategory() {
      let res = await this.$api.goods.getCategory();
      if (res.resultCode == 200) {
        this.categoryData = res.data;
      }
    },
    selectMenu(index) {
      this.currentIndex = index;
    },
    setWrapHeight() {
      // 设置视口高度
      let $screenHeight = document.documentElement.clientHeight;
      this.$refs.searchWrap.style.height = $screenHeight - 100 + "px";
    },
    selectProduct(item) {
      // this.$router.push({ path: `product-list?categoryId=${item.categoryId}` });
      console.log('分类',item)
      this.$router.push({
        name:'product-list',
        query:{
          from:'category',
          categoryId:item.categoryId
        }
      })
    },
    goProductList(){
      this.$router.push({
        name:'product-list',
        query:{
          from:'category'
        }
      })
    }
  },
  components: {
    listScroll
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";
.category-box {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      .wh(80%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .nbsousuo {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #f8f8f8;
    border-top: 1px solid #999;
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #f8f8f8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img {
                .wh(30px, 30px);
              }
            }
          }
        }
      }
    }
  }
}
</style>