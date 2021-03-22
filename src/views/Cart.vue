<template>
  <div class="Cart">
    <s-header title="购物车"></s-header>
    <div class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item,index) in goodsList" :key="index">
          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />
            <div class="good-img">
              <img :src="item.goodsCoverImg | prefix" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{item.goodsName}}</span>
                <span>x{{item.goodsCount}}</span>
              </div>
              <div class="good-btn">
                <div class="price">￥{{item.sellingPrice}}</div>
                <van-stepper
                  v-model.number="item.goodsCount"
                  :name="item.cartItemId"
                  integer
                  :min="1"
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <van-button
            slot="right"
            square
            type="danger"
            icon="delete"
            class="delete-button"
            @click="deleteGood(item.cartItemId)"
          />
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="goodsList.length > 0"
      class="submit-all"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll" @click="allCheck">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader";
export default {
  name: "cart",
  data() {
    return {
      goodsList: [], // 商品列表
      result: [], // 选中的购物车商品id数组
      checkAll: true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const { resultCode, data } = await this.$api.cart.getCart({
        params: { pageNumber: 1 }
      });
      if (resultCode == 200) {
        this.goodsList = data;
        this.result = data.map(item => item.cartItemId);
        this.$toast.clear();
      }
      console.log(data);
    },
    // 删除商品
    async deleteGood(id) {
      const { data } = await this.$api.cart.deleteCartItem({ restful: { id } });
      this.$store.dispatch("updateCart");
      this.getGoodsList();
    },
    // 单项购买数量变化回调
    async onChange(value, detail) {
      this.$toast.loading({
        message: "修改中...",
        forbidClick: true
      });
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      };

      const { data } = this.$api.cart.modifyCart({ data: params });
      this.$toast.clear();
    },
    // 勾选商品
    groupChange(result) {
      if (result.length == this.goodsList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.result = result;
    },
    // 全选
    allCheck() {
      // 判断 checkAll ，如果已是全选状态，checkAll 将变为false，所以清空 result 内的变量，价格变为 0
      // 如果是非全选状态checkAll 将变为 true，直接将 list 下的 id 塞进 result 变量里，total 会自动变为相应的价格
      if (this.checkAll) {
        this.result = this.goodsList.map(item => item.cartItemId);
      } else {
        this.result = [];
      }
    },
    // 结算
    onSubmit() {
      const params = JSON.stringify(this.result);
      // this.$router.push({ path: `create-order?cartItemIds=${params}` });
    }
  },
  components: {
    sHeader
  },
  computed: {
    total: function() {
      let sum = 0;
      let _list = this.goodsList.filter(item =>
        this.result.includes(item.cartItemId)
      );
      _list.forEach(item => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin.less";
.Cart {
  .cart-body {
    margin: 60px 0 100px 0;
    .good-item {
      .fj();
      padding-left: 10px;
      .wh(100%, 100%);
      align-items: center;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // height: 100%;
        // padding: 0 10px;
        flex: 1;
        padding: 20px;
        .good-title {
          .fj();
        }
        .good-btn {
          .fj();
          margin-top: 10px;
          align-items: center;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      height: 100%;
      width: 50px;
    }
  }
  .submit-all {
    margin-bottom: 57px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
}
</style>