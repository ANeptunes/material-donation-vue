<template>
  <div id="personBaseInfo">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 账户信息 -->
    <el-row>
      <el-card>
        <!-- 卡片1-头部区域 -->
        <el-row style="height: 60px">
          <el-col
            :span="12"
            style="
              height: 60px;
              line-height: 50px;
              padding-left: 5px;
              color: #409eff;
            "
            >账户信息:</el-col
          >
          <!-- <el-col :span="12" style="position: relative; height: 60px"
            ><el-button
              type="primary"
              size="small"
              style="
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
              "
              >操作</el-button
            ></el-col
          > -->
        </el-row>
        <!-- 卡片1-内容区域 -->
        <el-row>
          <el-col :span="3" style="height: 100px; position: relative">
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-60%, -50%);
              "
            >
              <el-avatar
                style="width: 110px; height: 110px; border-radius: 50%"
                :src="'http://8.142.42.56/' + this.ruleForm.avatar"
              ></el-avatar>
            </div>
          </el-col>
          <el-col :span="21" style="height: 100px; position: relative">
            <div
              style="
                width: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              <el-descriptions
                class="margin-top"
                :column="3"
                size="medium"
                border
              >
                <el-descriptions-item
                  :labelStyle="{ width: '120px' }"
                  :contentStyle="{ width: '230px', height: '50px' }"
                >
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    登录账号
                  </template>
                  {{ this.ruleForm.username }}
                </el-descriptions-item>
                <el-descriptions-item
                  :labelStyle="{ width: '120px' }"
                  :contentStyle="{ width: '330px' }"
                >
                  <template slot="label">
                    <i class="el-icon-postcard"></i>
                    用户昵称
                  </template>
                  <div id="nicknameEdit" style="display: none">
                    <el-input
                      v-model="nicknameInput"
                      style="width: 160px"
                      size="mini"
                      maxlength="7"
                      show-word-limit
                      placeholder="请输入用户昵称"
                    ></el-input>
                    <el-button
                      style="margin-left: 10px"
                      size="mini"
                      icon="el-icon-close"
                      @click="closeEdit"
                    ></el-button>
                    <el-button
                      size="mini"
                      icon="el-icon-check"
                      @click="checkEdit"
                    ></el-button>
                  </div>
                  <div id="nicknameShow">
                    <span>{{ this.ruleForm.nickname }}</span>

                    <el-tooltip
                      content="修改昵称"
                      placement="bottom-start"
                      effect="light"
                      :open-delay="300"
                      :enterable="false"
                    >
                      <i
                        style="
                          margin-left: 10px;
                          color: #409eff;
                          font-size: 18px;
                          cursor: pointer;
                        "
                        class="el-icon-edit-outline"
                        @click="updateNickname"
                      ></i>
                    </el-tooltip>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ width: '120px' }">
                  <template slot="label">
                    <i class="el-icon-circle-check"></i>
                    实名认证
                  </template>
                  <el-tag
                    v-if="this.ruleForm.verified == 0"
                    type="info"
                    size="small"
                    >未实名认证</el-tag
                  >
                  <el-tag
                    v-if="this.ruleForm.verified == 1"
                    type="success"
                    size="small"
                    >个人实名认证</el-tag
                  >
                  <el-tag
                    v-if="this.ruleForm.verified == 2"
                    type="success"
                    size="small"
                    >企业实名认证</el-tag
                  >
                </el-descriptions-item>
                <el-descriptions-item
                  :labelStyle="{ width: '120px' }"
                  :contentStyle="{ height: '50px' }"
                >
                  <template slot="label">
                    <i class="el-icon-lock"></i>
                    账号ID
                  </template>
                  {{ this.ruleForm.uid }}
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ width: '120px' }">
                  <template slot="label">
                    <i class="el-icon-time"></i>
                    注册时间
                  </template>
                  {{ this.ruleForm.createTime }}
                </el-descriptions-item>
                <el-descriptions-item :labelStyle="{ width: '120px' }">
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    账号类型
                  </template>
                  <el-tag v-if="this.ruleForm.type == 0" size="small"
                    >普通用户</el-tag
                  >
                  <el-tag v-if="this.ruleForm.type == 1" size="small"
                    >管理员用户</el-tag
                  >
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <!-- 个人信息 -->
    <el-row style="margin-top: 10px">
      <el-card>
        <el-row style="height: 60px">
          <el-col
            :span="12"
            style="
              height: 60px;
              line-height: 60px;
              padding-left: 5px;
              color: #409eff;
            "
            >个人信息:</el-col
          >
          <el-col :span="12" style="position: relative; height: 60px"
            ><el-button
              type="primary"
              size="small"
              @click="editRuleForm"
              style="
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
              "
              >编辑</el-button
            ></el-col
          >
        </el-row>

        <!-- 分隔线 -->
        <el-divider content-position="left"
          ><i class="el-icon-user"></i
        ></el-divider>
        <el-alert
          style="margin-bottom: 24px"
          title="基本资料以实名信息为准，以下信息仅供参考，填写以下信息方便我们更好为您服务。"
          type="info"
          :closable="false"
        >
        </el-alert>

        <!-- 非编辑状态 -->
        <el-form
          size="small"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          style="padding-left: 15px"
        >
          <el-form-item label="真实姓名：" prop="realName">
            <el-input
              v-model="ruleForm.realName"
              style="width: 300px"
              placeholder="真实姓名"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              style="width: 300px"
              placeholder="手机号码"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input
              v-model="ruleForm.email"
              style="width: 300px"
              placeholder="邮箱"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="identity">
            <el-input
              v-model="ruleForm.identity"
              style="width: 300px"
              placeholder="身份证号"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group
              v-model="ruleForm.sex"
              size="mini"
              :disabled="isReadOnly"
            >
              <el-radio border :label="0">男</el-radio>
              <el-radio border :label="1">女</el-radio>
              <el-radio border :label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：" prop="birthday">
            <el-date-picker
              placeholder="选择日期"
              v-model="ruleForm.birthday"
              style="width: 150px"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :disabled="isReadOnly"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="居住地址：" prop="address">
            <el-cascader
              id="address"
              ref="addressLabel"
              v-model="ruleForm.address"
              style="width: 300px"
              placeholder="居住地址"
              @change="change"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              filterable
              clearable
              :disabled="isReadOnly"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailAddress">
            <el-input
              v-model="ruleForm.detailAddress"
              style="width: 300px; font-family: Helvetica Neue"
              type="textarea"
              maxlength="30"
              show-word-limit
              :autosize="{ minRows: 3, maxRows: 3 }"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item label="个人说明：" prop="description">
            <el-input
              v-model="ruleForm.description"
              style="width: 300px"
              type="textarea"
              maxlength="50"
              show-word-limit
              :autosize="{ minRows: 3, maxRows: 5 }"
              :disabled="isReadOnly"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="this.isReadOnly == false">
            <el-button type="success" @click="cancelEditRuleForm()"
              >取消</el-button
            >
            <el-button type="primary" @click="saveRuleForm()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      nicknameInput: "",
      isReadOnly: true,
      oldRuleForm: {},
      ruleForm: {},
      rules: {
        realName: [
          { required: false, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: false, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" },
        ],
        email: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
        identity: [
          { required: false, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 180, message: "长度在18个字符", trigger: "blur" },
        ],
        birthday: [
          {
            required: false,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        address: [
          {
            type: "array",
            required: false,
            message: "请选择地址",
            trigger: "change",
          },
        ],
        detailAddress: [
          { required: false, message: "请输入详细地址", trigger: "blur" },
        ],
        description: [
          { required: false, message: "请填写活动形式", trigger: "blur" },
        ],
      },
      options: [],
    };
  },
  methods: {
    updateNickname() {
      $("#nicknameShow").css("display", "none");
      $("#nicknameEdit").css("display", "block");
    },
    closeEdit() {
      $("#nicknameShow").css("display", "block");
      $("#nicknameEdit").css("display", "none");
    },
    async checkEdit() {
      this.ruleForm.nickname = this.nicknameInput;
      let addressArr = this.ruleForm.address;
      let oldRuleFormStr = JSON.stringify(this.oldRuleForm);
      let ruleFormStr = JSON.stringify(this.ruleForm);
      let ruleFormData = JSON.parse(JSON.stringify(this.ruleForm));
      ruleFormData.address = addressArr.toString();
      if (oldRuleFormStr === ruleFormStr) {
        this.$notify({
          title: "警告",
          message: "信息未做任何修改",
          type: "warning",
          duration: "1500",
        });
      } else {
        const { data: res } = await this.$http.post(
          "/user/saveUserBaseInfo",
          ruleFormData
        );
        if (res.success) {
          this.$notify({
            title: "修改成功",
            message: res.msg,
            type: "success",
            duration: "1800",
          });
          this.$store.commit("setUserInfo", this.ruleForm);
          $("#nicknameShow").css("display", "block");
          $("#nicknameEdit").css("display", "none");
          // await this.getUserInfo();
          this.reload();
        }
      }
    },
    _getaddressData() {
      this.$http.get("/user/address").then(({ data: res }) => {
        if (res.success) {
          this.options = res.data;
        }
      });
    },
    // 编辑表单
    editRuleForm() {
      this.isReadOnly = false;
      $(".el-input.is-disabled .el-input__inner").css({
        color: "#000",
        "background-color": "#fff",
      });
      $(".el-textarea.is-disabled .el-textarea__inner").css({
        color: "#000",
        "background-color": "#fff",
      });
      $(".el-radio.is-bordered.is-disabled,.el-radio__label").css({
        color: "#000",
        "background-color": "#fff",
      });
    },
    // 保存表单信息
    saveRuleForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let oldRuleFormStr = JSON.stringify(this.oldRuleForm);
          let ruleFormStr = JSON.stringify(this.ruleForm);
          if (oldRuleFormStr === ruleFormStr) {
            this.$notify({
              title: "警告",
              message: "信息未做任何修改",
              type: "warning",
              duration: "1500",
            });
          } else {
            console.log("表单数据修改");
            let addressArr = this.ruleForm.address;
            let ruleFormData = JSON.parse(JSON.stringify(this.ruleForm));
            ruleFormData.address = addressArr.toString();
            console.log(ruleFormData);
            const { data: res } = await this.$http.post(
              "/user/saveUserBaseInfo",
              ruleFormData
            );
            if (res.success) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: "1800",
              });
              this.$store.commit("setUserInfo", this.ruleForm);
              // await this.getUserInfo();
              this.reload();
              this.cancelEditRuleForm();
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消编辑
    cancelEditRuleForm() {
      this.$refs["ruleForm"].clearValidate();
      this.ruleForm = JSON.parse(JSON.stringify(this.oldRuleForm));
      this.isReadOnly = true;
      $(".el-input .el-input__inner").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
      $(".el-textarea .el-textarea__inner").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
      $(".el-radio.is-bordered,.el-radio__label").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
    },
    // 获取用户信息
    async getUserInfo() {
      let uid = this.$store.state.userInfo.uid;
      const { data: res } = await this.$http.get(
        "/user/baseInfo" + "?uid=" + uid
      );
      let data = res.data;
      let addressArr;
      if (data.address != null) {
        addressArr = data.address.split(",");
        data.address = addressArr;
      }
      this.ruleForm = data;
      // 存储旧表单数据（用于判断表单是否修改）
      this.oldRuleForm = JSON.parse(JSON.stringify(data));
      this.nicknameInput = this.ruleForm.nickname;
    },
    change() {
      if (this.$refs.addressLabel.getCheckedNodes()[0] !== undefined) {
        let addressLabelArr =
          this.$refs.addressLabel.getCheckedNodes()[0].pathLabels;
        let addressLabel = "";
        for (const elem of addressLabelArr) {
          addressLabel += elem;
        }
        this.ruleForm.addressLabel = addressLabel;
      }
    },
    // 设置只读状态的输入框样式
    setReadOnlyStyle() {
      $(".el-input.is-disabled .el-input__inner").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
      $(".el-textarea.is-disabled .el-textarea__inner").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
      $(".el-radio.is-bordered.is-disabled,.el-radio__label").css({
        color: "#000",
        "background-color": "#f9fafc",
      });
    },
  },
  mounted() {
    this.setReadOnlyStyle();
  },
  created() {
    this._getaddressData();
    this.getUserInfo();
  },
};
</script>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 0 0 24px 0;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 15px;
  /* padding: 1px; */
}
.el-radio {
  margin-right: 20px;
}
textarea {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

/deep/.el-avatar > img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>