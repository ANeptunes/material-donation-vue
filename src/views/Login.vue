<template>
  <div id="loginPage">
    <div id="login">
      <div style="text-align: center; color: #fff">
        <h1>物资捐赠系统</h1>
      </div>
      <el-form
        :model="userLoginForm"
        :rules="loginRules"
        status-icon
        ref="userLoginFormRef"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-form"
      >
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            @keyup.enter.native="handleSubmit"
            v-model="userLoginForm.username"
            auto-complete="off"
            placeholder="用户名"
            prefix-icon="iconfont el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="handleSubmit"
            @change="passwordInputHandel"
            type="password"
            v-model="userLoginForm.password"
            auto-complete="off"
            placeholder="密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
        <el-link
          :underline="false"
          style="float: right"
          type="primary"
          @click="toRegister"
          >立即注册</el-link
        >
        <el-form-item style="width: 100%">
          <div style="float: right">
            <el-button
              type="primary"
              class="el-icon-mobile-phone"
              @click="handleSubmit"
              :loading="loading"
              >登录
            </el-button>
            <el-button class="el-icon-refresh" @click="resetForm"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>

      <!-- 验证码 -->
      <Vcode
        :show="isShow"
        @success="success"
        @close="close"
        :canvasWidth="500"
        :canvasHeight="350"
      />
    </div>
    <!-- 背景 -->
    <!-- <div id="bg"><img id="bgImg" src="../assets/cover_12.jpg" /></div> -->
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
import md5 from "js-md5";

export default {
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      imgCode: undefined,
      //表单用户登入数据
      loading: false,
      userLoginForm: {
        username: "",
        password: "",
      },
      checked: false,

      //验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 4,
            max: 50,
            message: "长度在 4 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Vcode,
  },

  methods: {
    // 进入注册页面
    toRegister: function () {
      this.$router.push("/register");
    },
    //登入提交
    handleSubmit: function () {
      this.$refs.userLoginFormRef.validate((valid) => {
        if (!valid) {
          return;
        } else {
          this.isShow = true;
        }
      });
    },
    //重置表单
    resetForm: function () {
      this.$refs.userLoginFormRef.resetFields();
    },
    //拼图验证码验证成功
    async success() {
      this.loading = true;
      this.isShow = false;
      var passwordByCookie = this.getCookie("password");
      if (!passwordByCookie) {
        // 密码加密
        let encryptKey = "QIUYONGTU19990826";
        let encryptPassword = md5(this.userLoginForm.password + encryptKey);
        this.userLoginForm.password = encryptPassword;
      }
      // 存储cookie
      if (this.checked == true) {
        this.setCookie(
          this.userLoginForm.username,
          this.userLoginForm.password,
          this.checked,
          7
        );
      } else {
        this.clearCookie();
      }
      //发起登入请求
      const { data: res } = await this.$http
        .post("/user/login", this.userLoginForm)
        .catch((error) => {
          this.loading = false;
        });
      if (res.success) {
        localStorage.setItem("LOCAL_KEY_ACCESS_TOKEN", res.data.token);
        // 获取用户信息
        await this.getUserInfo();
        // 跳转到后台管理界面
        if (res.data.type == 0) {
          await this.$router.push("/home");
        } else {
          await this.$router.push("/admin/home");
        }

        this.$message.success({
          message:
            "欢迎【 " + this.$store.state.userInfo.nickname + "】进入系统",
          duration: 2000,
        });
      } else {
        this.loading = false;
        this.isShow = false;
        this.$message.error({
          message: res.msg,
          duration: 2000,
        });
      }
    },
    passwordInputHandel() {
      this.clearCookie();
    },
    /**
      获取用户信息
    */
    async getUserInfo() {
      const { data: res } = await this.$http.get("/user/info", {
        params: {
          username: this.userLoginForm.username,
        },
      });
      if (res.success) {
        this.userInfo = res.data;
        this.$store.commit("setUserInfo", res.data);
        // await this.$router.push("/home");
      } else {
        return this.$message.error("获取用户信息失败");
      }
    },
    close() {
      this.isShow = false;
    },
    // 从cookie中获取账号
    account() {
      if (document.cookie.length >= 0) {
        this.userLoginForm.username = this.getCookie("username");
        this.userLoginForm.password = this.getCookie("password");
        let checkedCookie = this.getCookie("checked");
        if (checkedCookie !== "" && checkedCookie !== undefined) {
          this.checked = JSON.parse(checkedCookie);
        }
      }
    },
    // 设置cookie（账号，密码 ，过期的天数）
    setCookie(username, password, checked, expiredDate) {
      var currentDate = new Date();
      currentDate.setTime(
        currentDate.getTime() + 24 * 60 * 60 * 1000 * expiredDate
      ); //保存的天数
      document.cookie =
        "username=" +
        username +
        ";path=/;expires=" +
        currentDate.toLocaleString();
      document.cookie =
        "password=" +
        password +
        ";path=/;expires=" +
        currentDate.toLocaleString();
      document.cookie =
        "checked=" +
        checked +
        ";path=/;expires=" +
        currentDate.toLocaleString();
    },
    getCookie(name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    clearCookie() {
      this.setCookie("", "", "", -1); //清除cookie
    },
  },
  mounted() {
    this.account();
  },
  created() {},
};
</script>

<style scoped>
#loginPage {
  width: 100%;
  height: 100%;
}
#bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: -10;
}
#bg #bgImg {
  -webkit-filter: opacity(85%);
  filter: opacity(85%);
}
#login {
  /* position: relative; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -65%);
}

.login-form {
  /* position: relative; */
  -webkit-border-radius: 5px;
  border-radius: 5px;
  /* margin: 190px auto; */
  width: 380px;
  height: 280px;
  padding: 30px 40px 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eaeaea;
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>


