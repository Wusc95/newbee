<template>
  <div class="product-detail">
    <s-header title="商品详情"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
          <van-swipe-item v-for="(item,index) in detail.goodsCarouselList" :key="index">
            <img :src="item | prefix" alt="商品展示" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">{{detail.goodsName}}</div>
        <div class="product-desc">免邮费 顺丰包邮</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        color="#ee0a24"
        :badge="!count?'':count"
        @click="goToCart(1)"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="goToCart(2)" />
    </van-goods-action>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader";
export default {
  name: "productDetail",
  props: ["id"],
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.goodsDetail();
  },
  methods: {
    // 获取商品详情
    async goodsDetail() {
      let res = await this.$api.goods.goodsDetail({ restful: { id: this.id } });
      if (res.resultCode == 200) {
        this.detail = res.data;
      }
      console.log(res, "商品详情");
    },
    // 跳转到购物车
    async goToCart(type) {
      if (type == 1) {
        this.$router.push({
          name: "cart"
        });
      } else if (type == 2) {
        // 立即购买
        const { data, resultCode } = await this.$api.cart.addCart({
          data: { goodsCount: 1, goodsId: this.detail.goodsId }
        });
        this.$store.dispatch("updateCart");
      }
    },
    // 添加到购物车
    async addCart() {
      let { data, resultCode } = await this.$api.cart.addCart({
        data: {
          goodsCount: 1,
          goodsId: this.detail.goodsId
        }
      });
      resultCode == 200
        ? this.$toast.success("添加成功")
        : this.$toast.fail("添加失败");
      this.$store.dispatch("updateCart");
    }
  },
  components: {
    sHeader
  },
  computed: {
    count() {
      return this.$store.state.cartCount;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";
.product-detail {
  .detail-content {
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        margin: 10px 0;
        width: 100%;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          border-left: 1px solid #999;
        }
        li:nth-child(1) {
          border-left: none;
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #fe5c33, @primary);
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #f6332c, #e10220);
  }
}
</style>