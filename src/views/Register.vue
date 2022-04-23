<template>
  <div id="registerPage">
    <div id="register">
      <div style="text-align: center; color: #fff">
        <h1>物资捐赠系统</h1>
      </div>
      <el-form
        :model="userRegisterForm"
        :rules="registerRules"
        status-icon
        ref="userRegisterFormRef"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm register-page"
      >
        <h3 class="title">用户注册</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            @keyup.enter.native="handleSubmit"
            v-model="userRegisterForm.username"
            auto-complete="off"
            placeholder="请输入用户名"
            prefix-icon="iconfont el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="handleSubmit"
            type="password"
            v-model="userRegisterForm.password"
            auto-complete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
            @keyup.enter.native="handleSubmit"
            type="password"
            v-model="userRegisterForm.checkPassword"
            auto-complete="off"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            @keyup.enter.native="handleSubmit"
            type="text"
            v-model="userRegisterForm.nickname"
            auto-complete="off"
            placeholder="你的昵称"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            @keyup.enter.native="handleSubmit"
            type="text"
            v-model="userRegisterForm.phone"
            auto-complete="off"
            placeholder="手机号码"
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-link
          :underline="false"
          style="float: right; margin-top: 10px"
          type="primary"
          @click="toLogin"
          >已有账号,立即登录</el-link
        >
        <el-form-item style="width: 50%">
          <div style="float: left">
            <el-button
              type="success"
              class="el-icon-mobile-phone"
              @click="handleSubmit"
              :loading="loading"
              >注册
            </el-button>
            <el-button class="el-icon-refresh" @click="resetForm"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div id="bg"><img id="bgImg" src="../assets/cover_12.jpg" /></div>
    <!-- 验证码 -->
    <Vcode
      :show="isShow"
      @success="success"
      @close="close"
      :canvasWidth="500"
      :canvasHeight="350"
    />
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
import md5 from "js-md5";

export default {
  data() {
    // 验证确认密码
    var validateChackPass = (rule, value, callback) => {
      if (value !== this.userRegisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证手机号
    var validatePhone = (rule, value, callback) => {
      var MobileRegex = /^1[0-9]{10}$/;
      if (!MobileRegex.test(value)) {
        callback(new Error("手机号码格式不正确！"));
      } else {
        callback();
      }
    };
    return {
      isShow: false,
      dialogVisible: false,
      imgCode: undefined,
      //表单用户登入数据
      loading: false,
      userRegisterForm: {
        username: "test05",
        password: "123456",
        checkPassword: "123456",
        nickname: "测试",
        phone: "18379568328",
      },

      //验证规则
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateChackPass, trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入你的昵称", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: validatePhone,
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
    // 进入登录页面
    toLogin: function () {
      this.$router.push("/login");
    },
    //注册提交
    handleSubmit: function () {
      this.$refs.userRegisterFormRef.validate((valid) => {
        if (!valid) {
          return;
        } else {
          this.isShow = true;
        }
      });
    },
    //重置表单
    resetForm: function () {
      this.$refs.userRegisterFormRef.resetFields();
    },
    //验证成功
    async success() {
      this.loading = true;
      this.isShow = false;
      // 密码加密
      let userRegisterFormData = JSON.parse(
        JSON.stringify(this.userRegisterForm)
      );
      let encryptKey = "QIUYONGTU19990826";
      let encryptPassword = md5(this.userRegisterForm.password + encryptKey);
      userRegisterFormData.password = encryptPassword;
      userRegisterFormData.checkPassword = encryptPassword;

      //发起注册请求
      const { data: res } = await this.$http
        .post("/user/register", userRegisterFormData)
        .catch((error) => {
          this.loading = false;
        });
      if (res.success) {
        this.loading = false;
        this.$message({
          title: "注册成功",
          message: "注册成功,已返回登录页面",
          type: "success",
        });
        // 跳转到后台管理界面
        this.$router.push("/login");
      } else {
        this.isShow = false;
        this.loading = false;
        this.$message.error({
          title: "注册失败",
          message: res.msg,
          type: "error",
        });
      }
      this.loading = false;
    },

    close() {
      this.isShow = false;
    },
  },
  created() {},
};
</script>

<style scoped>
#registerPage {
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
#register {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
}

.register-page {
  /* position: relative; */
  -webkit-border-radius: 5px;
  border-radius: 5px;
  /* margin: 190px auto; */
  width: 380px;
  padding: 30px 40px 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eaeaea;
}
</style>