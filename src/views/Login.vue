<template>
  <div class="login">
    <img class="logo" src="//s.weituibao.com/1582958061265/mlogo.png" alt />
    <div v-if="type === 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginFrom.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginFrom.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginFrom.username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginFrom.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin:16px;">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block type="info" color="#1baeae" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// import { login, register } from "@/service/user";
import { setLocal, getLocal } from "@/common/js/utils";
import { Toast } from "vant";
import Verify from "vue2-verify";
export default {
  name: "login",
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
        userName1: "",
        password1: ""
      },

      type: "login"
      // verify: false // 判断验证码输入是否正确
    };
  },
  methods: {
    // 执行验证码
    dealTriVer() {
      // console.log(this.$refs.loginVerifyRef.$refs.instance.checkCode())
      this.$refs.loginVerifyRef.$refs.instance.checkCode();
    },
    // 验证码匹配成功后的回调函数
    success(obj) {
      this.verify = true;
      obj.refresh();
    },
    // 验证码匹配失败后的回调函数
    error(obj) {
      this.verify = false;
      // 刷新验证码
      obj.refresh();
    },
    // 登录 or 注册
    async onSubmit(values) {
      // 提交之前都要执行一次验证码，获取verify的最新值
      this.dealTriVer();
      if (!this.verify) {
        Toast.fail("验证码未填或填写错误");
        return;
      }

      if (this.type == "login") {
        const { data, resultCode } = await this.$api.user.login({
          data: {
            loginName: values.username,
            passwordMd5: this.$md5(values.password)
          }
        });
        if (resultCode == 200) {
          setLocal("token", data);
          this.$router.push({
            name: "/"
          });
        }
      } else {
        console.log(values.username1, values.password1, "注册");
        this.$api.user
          .register({
            data: {
              loginName: values.username1,
              password: values.password1
            }
          })
          .then(e => {
            if (e.resultCode == 200) {
              Toast.success("注册成功");
              this.type = "login";
            }
          });
      }
    },
    // 登录注册切换
    toggle(active) {
      this.verify = false;
      this.type = active;
    }
  },
  components: {
    Verify
  }
};
</script>

<style lang="less">
.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 0px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  // .verify-bar-area {
  //   margin-top: 24px;
  //   .verify-left-bar {
  //     border-color: #1baeae;
  //   }
  //   .verify-move-block {
  //     background-color: #1baeae;
  //     color: #fff;
  //   }
  // }
  .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      float: left !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>