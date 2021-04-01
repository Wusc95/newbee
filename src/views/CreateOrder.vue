<template>
  <div class="create-order">
    <s-header title="创建订单"></s-header>
    <div class="address-wrap">
      <div class="name">
        <span style="marginRight:20px">{{address?address.userName:'昵称'}}</span>
        <span>{{address?address.userPhone:'联系电话'}}</span>
      </div>
      <div
        class="detailAddress"
      >{{address?address.provinceName+address.cityName+address.regionName+address.detailAddress:'请选择收货地址'}}</div>
      <van-icon class="arrow" name="arrow" @click="goTo" />
    </div>
    <div class="good">
      <div class="good-item" v-for="item in cartList" :key="item.goodsId">
        <van-card
          :num="item.goodsCount"
          :price="item.sellingPrice"
          :title="item.goodsName"
          :thumb="item.goodsCoverImg | prefix"
        />
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品总计</span>
        <span>¥{{total}}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block @click="createOrder">生成订单</van-button>
    </div>
    <van-popup
      v-model="showPay"
      @close="close"
      :close-on-click-overlay="false"
      position="bottom"
      :style="{ height: '30%' }"
      closeable
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="payOrder(1)"
        >支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader.vue";
import { getCartItemIds, setCartItemIds } from "@/utils/auth";
export default {
  name: "create-order",
  props: ["cartItemIds", "addressId"],
  data() {
    return {
      cartList: [],
      address: "",
      _cartItemIds: "",
      showPay: false,
      orderNo: ""
    };
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this._cartItemIds = this.cartItemIds
        ? JSON.parse(this.cartItemIds)
        : JSON.parse(getCartItemIds());
      setCartItemIds(JSON.stringify(this._cartItemIds));
      const { data: list } = await this.$api.cart.getByCartItemIds({
        params: {
          cartItemIds: this._cartItemIds.join(",")
        }
      });

      const { data: address } = this.addressId
        ? await this.$api.address.getAddressDetail(this.addressId)
        : await this.$api.address.getDefaultAddress();

      address ? (this.address = address[0]) : "";
      this.cartList = list;
      this.$toast.clear();
    },
    // 跳转到地址编辑
    goTo() {
      this.$router.push({
        name: "address",
        query: {
          cartItemIds: JSON.stringify(this._cartItemIds)
        }
      });
    },
    // 生成订单
    async createOrder() {
      if (!this.address) {
        this.$toast("请选择收货地址");
        return;
      }
      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartList.map(item => item.cartItemId)
      };
      const { data, resultCode } = await this.$api.order.createOrder({
        data: params
      });
      if (resultCode == 200) {
        this.showPay = true;
        this.orderNo = data;
      }
    },
    close() {
      // this.$router.push({
      //   name: "order"
      // });
      this.showPay = false;
    },
    async payOrder(type) {
      this.$toast.loading({
        message: "支付中...",
        forbidClick: true
      });
      await this.$api.order.payOrder({
        params: {
          orderNo: this.orderNo,
          payType: type
        }
      });
      this.$router.push({
        name: "order"
      });
      this.$toast.clear();
    }
  },
  components: {
    sHeader
  },
  computed: {
    total: function() {
      let sum = 0;
      this.cartList.forEach(item => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    }
  }
};
</script>

<style scoped lang="less">
@import "../common/style/mixin.less";
.create-order {
  background-color: #f9f9f9;
  .address-wrap {
    margin-top: 44px;
    background-color: #fff;
    position: relative;
    margin-bottom: 20px;
    font-size: 14px;
    color: #222333;
    padding: 15px;
    .name,
    .detailAddress {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      font-size: 20px;
      transform: translateY(-50%);
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    padding-bottom: 50px;
    background-color: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>