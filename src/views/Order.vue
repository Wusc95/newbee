<template>
  <div class="order-box">
    <s-header title="我的订单"></s-header>
    <van-tabs
      @change="onChangeTab"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      v-model="status"
    >
      <van-tab title="全部" name></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="order-item-box"
          @click="goTo(item.orderNo)"
        >
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <van-card
            v-for="one in item.newBeeMallOrderItemVOS"
            :key="one.goodsId"
            :num="one.goodsCount"
            :price="one.sellingPrice"
            desc="全场包邮"
            :title="one.goodsName"
            :thumb="`http://lmall.xinfeng.site${one.goodsCoverImg}`"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader.vue";
export default {
  name: "order",
  data() {
    return {
      status: "",
      loading: false,  // list:true=>发起异步请求 false=>数据加载完毕
      finished: false, // list:true=>数据全部加载完毕
      refreshing: false, // false:表示加载完成
      list: [],
      page: 1,
      totalPage: 0
    };
  },
  methods: {
    // 获取订单列表
    async loadData() {
      const {
        data,
        data: { list }
      } = await this.$api.order.getOrderList({
        params: {
          pageNumber: this.page,
          status: this.status
        }
      });
      this.list = this.list.concat(list);
      console.log(this.list,'数据')
      this.totalPage = data.totalPage;
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true;
    },
    onChangeTab(name, title) {
      this.status = name;
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
      // 加载更多
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData();
    },
    goTo(id) {
      //  this.$router.push({ path: `order-detail?id=${id}` });
      this.$router.push({
        name:'orderDetail',
        query:{
          id
        }
      })
    }
  },
  components: {
    sHeader
  }
};
</script>

<style lang='less' scoped>
.order-box {
  .order-tab {
    margin-top: 44px;
    position: fixed;
    z-index: 888;
    
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>