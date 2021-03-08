<template>
  <div class="user-box">
    <simpleHeader title="我的"></simpleHeader>
    <div class="user-info">
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" />
        <div class="user-desc">
          <span>昵称：{{user.nickName}}</span>
          <span>登录名：{{user.loginName}}</span>
          <span class="name">个性签名：{{user.introduceSign}}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li>
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li>
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li>
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li>
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
import simpleHeader from "@/components/SimpleHeader.vue";
import { getUserInfo } from "@/service/user";
import { Toast } from "vant";
export default {
  name: "user",
  data() {
    return {
      user: {} // 用户信息
    };
  },
  methods: {
    // 获取用户信息
    async getInfo() {
      let res = await this.$api.user.getUserInfo();
      res.resultCode == 200 ? (this.user = res.data) : Toast.fail(res.message);
    }
  },
  created() {
    this.getInfo();
  },
  components: {
    simpleHeader
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    width: 94%;
    height: 25%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    li{
      width: 100%;
      padding-bottom: 5px;
      // line-height: 30px;
      .border-1px(#c1c1c1);
      color: #40515f;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>