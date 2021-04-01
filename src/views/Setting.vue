<template>
  <div class="seting-box">
    <s-header title="账号管理"></s-header>
    <div class="input-item">
      <van-field v-model="userInfo.nickName" label="昵称" />
      <van-field v-model="userInfo.introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="save" block>保存</van-button>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>退出登录</van-button>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader.vue";
import { cleanLocal } from "@/common/js/utils";
export default {
  name: "setting",
  data() {
    return {
      userInfo: {},
      password: ""
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let res = await this.$api.user.getUserInfo();
      console.log(res, "userInfo");
      res.resultCode == 200
        ? (this.userInfo = res.data)
        : this.$toast.fail(res.message);
    },
    async save() {
      const params = {
        introduceSign: this.userInfo.introduceSign,
        nickName: this.userInfo.nickName,
        passwordMd5: this.$md5(this.password)
      };
      const { data } = await this.$api.user.editUserInfo({ restful: params });
      this.$toast.success("保存成功");
    },
    async logout() {
      const { resultCode } = await this.$api.user.logout();
      if (resultCode == 200) {
        cleanLocal();
        this.$router.push({
          name: "home"
        });
      }
    }
  },
  components: {
    sHeader
  }
};
</script>

<style lang='less' scoped>
.seting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>