<template>
  <div id="accountSetting">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>安全设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-card>
          <div slot="header">
            <span style="font-size: 14px">安全设置</span
            ><el-tag style="margin-left: 8px" size="small" type="info"
              >账号安全级别：<span>中</span></el-tag
            >
          </div>
          <!-- 每个item1 -->
          <div
            style="
              height: 90px;
              border-bottom: 1px solid rgb(237, 237, 237);
              position: relative;
            "
          >
            <div>
              <div style="height: 25px">
                <el-icon
                  style="
                    vertical-align: middle;
                    color: rgb(99, 186, 77);
                    font-size: 20px;
                  "
                  class="el-icon-circle-check"
                ></el-icon
                ><span style="margin-left: 8px; font-size: 13px">登录密码</span>
              </div>
              <div
                style="
                  color: rgb(153, 153, 153);
                  margin-left: 28px;
                  font-size: 12px;
                "
              >
                安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码
              </div>
              <el-link
                style="
                  position: absolute;
                  right: 20px;
                  top: 50%;
                  transform: translateY(-125%);
                  font-size: 12px;
                  color: #409eff;
                "
                icon="el-icon-edit"
                @click="updatePassword"
                >修改</el-link
              >
            </div>
          </div>
          <!-- 每个item2 -->
          <div
            style="
              height: 90px;
              margin-top: 12px;
              border-bottom: 1px solid rgb(237, 237, 237);
              position: relative;
            "
          >
            <div>
              <div style="height: 25px">
                <span v-if="this.phoneNumber == ''">
                  <el-icon
                    style="
                      vertical-align: middle;
                      color: #f15533;
                      font-size: 20px;
                    "
                    class="el-icon-warning-outline"
                  ></el-icon
                  ><span
                    style="margin-left: 8px; color: #f15533; font-size: 10px"
                    >[未设置]
                  </span>
                </span>
                <el-icon
                  style="
                    vertical-align: middle;
                    color: rgb(99, 186, 77);
                    font-size: 20px;
                    margin-right: 8px;
                  "
                  class="el-icon-circle-check"
                  v-if="this.phoneNumber != ''"
                ></el-icon
                ><span style="margin-left: 0px; font-size: 13px">手机绑定</span>
              </div>
              <div
                style="
                  color: rgb(153, 153, 153);
                  margin-left: 28px;
                  font-size: 12px;
                "
              >
                <span v-if="this.phoneNumber != ''">
                  您已绑定了手机
                  <span style="color: #1890ff">{{ this.phoneNumber }}</span>
                  [您的手机为安全手机，可以找回密码，但不能用于登录]</span
                >
                <span v-if="this.phoneNumber == ''">
                  <span style="color: #f15533">您暂未绑定手机</span>
                  [您的手机为安全手机，可以找回密码，但不能用于登录]</span
                >
              </div>
              <el-link
                style="
                  position: absolute;
                  right: 20px;
                  top: 50%;
                  transform: translateY(-125%);
                  font-size: 12px;
                  color: #409eff;
                "
                icon="el-icon-edit"
                @click="updateBindPhone"
                >修改</el-link
              >
            </div>
          </div>
          <!-- 每个item3 -->
          <div
            style="
              height: 90px;
              margin-top: 12px;
              border-bottom: 1px solid rgb(237, 237, 237);
              position: relative;
            "
          >
            <div>
              <div style="height: 25px">
                <span v-if="this.emailNumber == ''">
                  <el-icon
                    style="
                      vertical-align: middle;
                      color: #f15533;
                      font-size: 20px;
                    "
                    class="el-icon-warning-outline"
                  ></el-icon
                  ><span
                    style="margin-left: 8px; color: #f15533; font-size: 10px"
                    >[未设置]
                  </span>
                </span>
                <el-icon
                  style="
                    vertical-align: middle;
                    color: rgb(99, 186, 77);
                    font-size: 20px;
                    margin-right: 8px;
                  "
                  class="el-icon-circle-check"
                  v-if="this.emailNumber != ''"
                ></el-icon
                ><span style="margin-left: 0px; font-size: 13px">备用邮箱</span>
              </div>
              <div
                style="
                  color: rgb(153, 153, 153);
                  margin-left: 28px;
                  font-size: 12px;
                "
              >
                <span v-if="this.emailNumber != ''">
                  您已绑定了邮箱
                  <span style="color: #1890ff">{{ this.emailNumber }}</span>
                  [备用邮箱绑定后可用来接收阿里云发送的各类系统、营销、服务通知]</span
                >
                <span v-if="this.emailNumber == ''">
                  <span style="color: #f15533">您暂未绑定邮箱</span>
                  [备用邮箱绑定后可用来接收阿里云发送的各类系统、营销、服务通知]</span
                >
              </div>
              <el-link
                style="
                  position: absolute;
                  right: 20px;
                  top: 50%;
                  transform: translateY(-125%);
                  font-size: 12px;
                  color: #409eff;
                "
                icon="el-icon-edit"
                @click="updateBindEmail"
                >修改</el-link
              >
            </div>
          </div>
          <!-- 每个item4 -->
          <div
            style="
              height: 90px;
              margin-top: 12px;
              border-bottom: 1px solid rgb(237, 237, 237);
              position: relative;
            "
          >
            <div>
              <div style="height: 25px">
                <el-icon
                  style="
                    vertical-align: middle;
                    color: rgb(99, 186, 77);
                    font-size: 20px;
                    margin-right: 8px;
                  "
                  class="el-icon-circle-check"
                  v-if="this.securityQuestionFlag"
                ></el-icon>
                <span v-if="!this.securityQuestionFlag">
                  <el-icon
                    style="
                      vertical-align: middle;
                      color: #f15533;
                      font-size: 20px;
                      margin-right: 8px;
                    "
                    class="el-icon-warning-outline"
                  ></el-icon
                  ><span style="color: #f15533; font-size: 10px"
                    >[未设置]</span
                  ></span
                ><span style="margin-left: 0px; font-size: 13px">
                  密保问题</span
                >
              </div>
              <div
                style="
                  color: rgb(153, 153, 153);
                  margin-left: 28px;
                  font-size: 12px;
                "
              >
                建议您设置三个容易记住，且最不容易被他人获取的问题及答案，更有效保障您的密码安全
              </div>
              <el-link
                style="
                  position: absolute;
                  right: 20px;
                  top: 50%;
                  transform: translateY(-125%);
                  font-size: 12px;
                  color: #409eff;
                "
                icon="el-icon-edit"
                @click="openSettingSecurityQuestionDiaog"
                >设置</el-link
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-top: 16px">
        <el-card id="#delete">
          <div style="height: 70px">
            <div style="display: flex; align-items: flex-end">
              <div class="left-content" style="flex: 1 1 0%">
                <div>
                  <span style="font-size: 14px">注销账号</span
                  ><el-tag style="margin-left: 8px" size="small" type="danger"
                    >该操作具有风险</el-tag
                  >
                </div>
                <div style="margin-top: 12px; color: #999; font-size: 12px">
                  如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复
                </div>
              </div>
              <div class="right-content" style="margin-top: 10px">
                <el-button
                  type="danger"
                  plain
                  size="small"
                  @click="cancelAccount"
                  >确认注销</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 修改登录密码 -->
    <el-dialog
      width="50%"
      title="修改登录密码"
      :visible.sync="updatePasswordDialog"
      :close-on-click-modal="false"
      @close="cancelUpdatePassword"
    >
      <el-steps :active="step" align-center>
        <el-step title="验证身份"></el-step>
        <el-step title="修改密码"></el-step>
        <el-step title="修改结果"></el-step>
      </el-steps>
      <!-- 步骤一 -->
      <div id="step1">
        <!-- 验证身份 -->
        <div id="verifyAccount" style="display: block">
          <el-tag type="warning" style="margin: 10px 0; color: #8c8c8c">
            为确认是你本人操作，请选择验证方式完成身份验证：
          </el-tag>
          <ol>
            <li>
              <div style="float: left">
                <span class="title">通过 手机验证码</span>
                <p class="info">如果你的手机还在正常使用，请选择此方式</p>
              </div>
              <el-tooltip
                effect="dark"
                content="手机验证功能暂未实现"
                placement="top-start"
              >
                <el-button
                  style="float: right; margin-top: 10px"
                  type="success"
                  size="small"
                  @click="verifyByPhone"
                  title=""
                  >点击验证
                </el-button>
              </el-tooltip>
            </li>
            <li>
              <div style="float: left">
                <span class="title">通过 邮箱验证</span>
                <p class="info">如果你的绑定了邮箱，请选择此方式</p>
              </div>
              <el-button
                style="float: right; margin-top: 10px"
                type="success"
                size="small"
                @click="verifyByEmail"
                >点击验证
              </el-button>
            </li>
          </ol>
        </div>
        <!-- 手机号验证表单 -->
        <div id="verifyPhoneForm" style="display: none">
          <el-divider content-position="left"
            ><span style="color: #999999; font-size: 13px"
              >手机验证码验证 确认是你本人操作，请完成以下验证</span
            ></el-divider
          >
          <el-form
            class="verifyForm"
            ref="form"
            :model="verifyByPhoneForm"
            label-width="80px"
          >
            <el-form-item label="手机号">
              <el-input
                size="small"
                v-model="verifyByPhoneForm.phone"
                placeholder="请输入手机号"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                size="small"
                v-model="verifyByPhoneForm.verifyCode"
                placeholder="请输入验证码"
                style="width: 408px"
              ></el-input>
              <el-button
                type="success"
                size="mini"
                plain
                @click="sendVerifyCodeByPhone"
                :class="{ 'disabled-style': getCodeBtnDisableForPhone }"
                :disabled="getCodeBtnDisableForPhone"
                >{{ sendCodeBtnWordForPhone }}</el-button
              >
            </el-form-item>
          </el-form>
          <el-link
            style="margin-left: 75px"
            icon="el-icon-caret-left"
            :underline="false"
            @click="otherVerify"
            >其他方式验证</el-link
          >
          <el-button
            style="float: right; margin-right: 98px"
            type="success"
            size="mini"
            plain
            @click="submitVerifyAccoutByPhone"
            >验证身份</el-button
          >
        </div>

        <!-- 邮箱验证表单 -->
        <div id="verifyEmailForm" style="display: none">
          <el-divider content-position="left"
            ><span style="color: #999999; font-size: 13px"
              >邮箱验证码验证 确认是你本人操作，请完成以下验证</span
            ></el-divider
          >
          <el-form
            class="verifyForm"
            ref="verifyByEmainForm"
            :model="verifyByEmainForm"
            label-width="80px"
          >
            <el-form-item label="邮箱" ref="emailRuleForm">
              <el-input
                size="small"
                v-model="verifyByEmainForm.email"
                placeholder="请输入邮箱"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                size="small"
                v-model="verifyByEmainForm.verifyCode"
                placeholder="请输入验证码"
                style="width: 408px"
                maxlength="6"
              ></el-input>
              <el-button
                type="success"
                size="mini"
                plain
                @click="sendVerifyCodeByEmail"
                :class="{ 'disabled-style': getCodeBtnDisableForEmail }"
                :disabled="getCodeBtnDisableForEmail"
                >{{ sendCodeBtnWordForEmail }}</el-button
              >
            </el-form-item>
          </el-form>
          <el-link
            style="margin-left: 75px"
            icon="el-icon-caret-left"
            :underline="false"
            @click="otherVerify"
            >其他方式验证</el-link
          >
          <el-button
            style="float: right; margin-right: 98px"
            type="success"
            size="mini"
            plain
            @click="submitVerifyAccoutByEmail"
            >验证身份</el-button
          >
        </div>
      </div>

      <!-- 步骤二 -->
      <div id="step2" style="display: none">
        <!-- 修改密码表单 -->
        <el-form>
          <el-form-item
            label="登录密码"
            label-width="100px"
            label-position="right"
            size="small"
            ref="passRuleForm"
          >
            <el-input
              style="width: 500px"
              v-model="updatePasswordRuleForm.password"
              placeholder="请输入登录密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            label-width="100px"
            label-position="right"
            size="small"
          >
            <el-input
              style="width: 500px"
              v-model="updatePasswordRuleForm.checkPassword"
              placeholder="再次输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-link
            style="margin-left: 30px"
            icon="el-icon-caret-left"
            :underline="false"
            @click="backVerifyAccout"
            >返回身份验证</el-link
          >
          <el-button
            style="float: right; margin-right: 80px"
            type="success"
            size="mini"
            plain
            @click="submitUpdatePassword"
            >确认修改</el-button
          >
        </el-form>
      </div>

      <div id="step3" style="display: none">
        <el-result
          icon="success"
          title="修改密码成功"
          subTitle="5秒后将自动退出系统返回登录界面..."
        >
          <template slot="extra">
            <el-button type="primary" size="medium" @click="exit"
              >退出</el-button
            >
          </template>
        </el-result>
      </div>
      <!-- 弹出框按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelUpdatePassword">取 消</el-button> -->
        <!-- <el-button type="primary" @click="submitUpdatePassword"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>

    <!-- 手机绑定 -->
    <el-dialog
      width="50%"
      title="手机绑定"
      :visible.sync="bindPhoneDialog"
      :close-on-click-modal="false"
      @close="cancelBindPhone"
    >
      <el-steps :active="step" align-center>
        <el-step title="验证身份"></el-step>
        <el-step title="修改手机"></el-step>
        <el-step title="修改结果"></el-step>
      </el-steps>
      <!-- 步骤一 -->
      <div id="step1">
        <!-- 手机号验证表单 -->
        <div id="verifyBindPhoneForm">
          <el-divider content-position="left"
            ><span style="color: #999999; font-size: 13px"
              >手机验证码验证 确认是你本人操作，请完成以下验证</span
            ></el-divider
          >
          <el-form
            class="verifyForm"
            ref="form"
            :model="verifyBindPhoneForm"
            label-width="80px"
          >
            <el-form-item label="手机号">
              <el-input
                size="small"
                v-model="verifyBindPhoneForm.phone"
                placeholder="请输入手机号"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                size="small"
                v-model="verifyBindPhoneForm.verifyCode"
                placeholder="请输入验证码"
                style="width: 408px"
              ></el-input>
              <el-button
                type="success"
                size="mini"
                plain
                @click="sendVerifyCodeByPhone"
                :class="{ 'disabled-style': getCodeBtnDisableForPhone }"
                :disabled="getCodeBtnDisableForPhone"
                >{{ sendCodeBtnWordForPhone }}</el-button
              >
            </el-form-item>
          </el-form>
          <el-button
            style="float: right; margin-right: 98px"
            type="success"
            size="mini"
            plain
            @click="submitVerifyAccoutByPhone"
            >验证身份</el-button
          >
        </div>
      </div>

      <!-- 步骤二 -->
      <div id="step2" style="display: none">
        <!-- 修改绑定手机号表单 -->
        <el-form>
          <el-form-item
            label="手机号"
            label-width="100px"
            label-position="right"
            size="small"
          >
            <el-input
              style="width: 500px"
              v-model="updatePasswordRuleForm.password"
              placeholder="请输入手机号"
              type="bindPhone"
            ></el-input>
          </el-form-item>
          <el-link
            style="margin-left: 30px"
            icon="el-icon-caret-left"
            :underline="false"
            @click="backVerifyAccout"
            >返回身份验证</el-link
          >
          <el-button
            style="float: right; margin-right: 80px"
            type="success"
            size="mini"
            plain
            @click="submitUpdateBindPhone"
            >确认修改</el-button
          >
        </el-form>
      </div>

      <div id="step3" style="display: none">
        <el-result
          icon="success"
          title="修改手机号"
          subTitle="绑定手机号已修改，请注意绑定手机号是否可用"
        >
          <template slot="extra">
            <el-button type="primary" size="medium" @click="confirmBindPhone"
              >确认</el-button
            >
          </template>
        </el-result>
      </div>
      <!-- 弹出框按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelUpdatePassword">取 消</el-button> -->
        <!-- <el-button type="primary" @click="submitUpdatePassword"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>

    <!-- 邮箱绑定 -->
    <el-dialog
      width="50%"
      title="邮箱绑定"
      :visible.sync="bindEmailDialog"
      :close-on-click-modal="false"
      @close="cancelBindEmail"
    >
      <el-steps :active="bindEmailStep" align-center>
        <el-step title="验证身份"></el-step>
        <el-step title="修改邮箱"></el-step>
        <el-step title="修改结果"></el-step>
      </el-steps>
      <!-- 步骤一 -->
      <div id="bindEmailStep1">
        <!-- 邮箱验证表单 -->
        <div id="verifyBindEmailForm">
          <el-divider content-position="left"
            ><span style="color: #999999; font-size: 13px"
              >邮箱验证码验证 确认是你本人操作，请完成以下验证</span
            ></el-divider
          >
          <el-form
            class="verifyForm"
            :model="verifyBindEmailForm"
            label-width="80px"
          >
            <el-form-item label="邮箱">
              <el-input
                id="emailInput"
                size="small"
                v-model="verifyBindEmailForm.email"
                placeholder="请输入邮箱"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                size="small"
                v-model="verifyBindEmailForm.verifyCode"
                placeholder="请输入验证码"
                style="width: 408px"
              ></el-input>
              <el-button
                type="success"
                size="mini"
                plain
                @click="sendVerifyCodeByBindEmail"
                :class="{ 'disabled-style': getCodeBtnDisableForBindEmail }"
                :disabled="getCodeBtnDisableForBindEmail"
                >{{ sendCodeBtnWordForBindEmail }}</el-button
              >
            </el-form-item>
          </el-form>
          <el-button
            style="float: right; margin-right: 98px"
            type="success"
            size="mini"
            plain
            @click="submitVerifyAccoutBindEmail"
            >验证身份</el-button
          >
        </div>
      </div>

      <!-- 步骤二 -->
      <div id="bindEmailStep2" style="display: none">
        <!-- 修改绑定邮箱表单 -->
        <el-form
          class="verifyForm"
          :model="updateBindEmailForm"
          label-width="80px"
        >
          <el-form-item label="修改邮箱">
            <el-input
              size="small"
              style="width: 500px"
              v-model="updateBindEmailForm.email"
              placeholder="请输入修改邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="校验码">
            <el-input
              size="small"
              v-model="updateBindEmailForm.verifyCode"
              placeholder="请输入校验码"
              style="width: 408px"
            ></el-input>
            <el-button
              type="success"
              size="small"
              plain
              @click="sendVerifyCodeByBindNewEmail"
              :class="{ 'disabled-style': getCodeBtnDisableForBindNewEmail }"
              :disabled="getCodeBtnDisableForBindNewEmail"
              >{{ sendCodeBtnWordForBindNewEmail }}</el-button
            >
          </el-form-item>
          <el-link
            style="margin-left: 30px"
            icon="el-icon-caret-left"
            :underline="false"
            @click="backVerifyAccoutForBindEmaill"
            >返回身份验证</el-link
          >
          <el-button
            style="float: right; margin-right: 80px"
            type="success"
            size="mini"
            plain
            @click="submitUpdateBindEmail"
            >确认修改</el-button
          >
        </el-form>
      </div>

      <div id="bindEmailStep3" style="display: none">
        <el-result
          icon="success"
          title="修改邮箱"
          subTitle="绑定邮箱已修改，请注意绑定邮箱是否可用"
        >
          <template slot="extra">
            <el-button type="primary" size="medium" @click="confirmBindEmail"
              >确认</el-button
            >
          </template>
        </el-result>
      </div>
      <!-- 弹出框按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelUpdatePassword">取 消</el-button> -->
        <!-- <el-button type="primary" @click="submitUpdatePassword"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>

    <!-- 密保问题 -->
    <el-dialog
      width="50%"
      title="密保问题"
      :visible.sync="settingSecurityQuestion"
      :close-on-click-modal="false"
      @close="cancelSecurityQuestionDialog"
    >
      <div id="securityQuestionForm">
        <el-divider content-position="left"
          ><span style="color: #999999; font-size: 13px"
            >密保设置 确认是你本人操作，请完成以下设置</span
          ></el-divider
        >
        <el-form
          ref="securityQuestionForm"
          :model="securityQuestionForm"
          label-width="80px"
          size="mini"
          :rules="securityQuestionFormRules"
        >
          <el-form-item label="问题一" prop="question1">
            <el-select
              v-model="securityQuestionForm.question1"
              placeholder="请选择问题"
              style="width: 350px"
            >
              <el-option
                label="你的父亲的生日是什么时候?"
                value="你的父亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的母亲的生日是什么时候?"
                value="你的母亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的生日是什么时候?"
                value="你的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的女朋友的生日是什么时候?"
                value="你的女朋友的生日是什么时候?"
              ></el-option>
              <el-option
                label="你女朋友最喜欢吃的东西?"
                value="你女朋友最喜欢吃的东西?"
              ></el-option>
              <el-option
                label="你女朋友最爱的口红颜色?"
                value="你女朋友最爱的口红颜色?"
              ></el-option>

              <el-option
                label="你的最好的朋友叫什么?"
                value="你的最好的朋友叫什么?"
              ></el-option>
              <el-option
                label="你的宠物叫什么?"
                value="你的宠物叫什么?"
              ></el-option>
              <el-option
                label="你最喜欢的颜色?"
                value="你最喜欢的颜色?"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答案" prop="answer1">
            <el-input
              v-model="securityQuestionForm.answer1"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="问题二" prop="question2">
            <el-select
              v-model="securityQuestionForm.question2"
              placeholder="请选择问题"
              style="width: 350px"
            >
              <el-option
                label="你的父亲的生日是什么时候?"
                value="你的父亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的母亲的生日是什么时候?"
                value="你的母亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的生日是什么时候?"
                value="你的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的女朋友的生日是什么时候?"
                value="你的女朋友的生日是什么时候?"
              ></el-option>
              <el-option
                label="你女朋友最喜欢吃的东西?"
                value="你女朋友最喜欢吃的东西?"
              ></el-option>
              <el-option
                label="你女朋友最爱的口红颜色?"
                value="你女朋友最爱的口红颜色?"
              ></el-option>

              <el-option
                label="你的最好的朋友叫什么?"
                value="你的最好的朋友叫什么?"
              ></el-option>
              <el-option
                label="你的宠物叫什么?"
                value="你的宠物叫什么?"
              ></el-option>
              <el-option
                label="你最喜欢的颜色?"
                value="你最喜欢的颜色?"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答案" prop="answer2">
            <el-input
              v-model="securityQuestionForm.answer2"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="问题三" prop="question3">
            <el-select
              v-model="securityQuestionForm.question3"
              placeholder="请选择问题"
              style="width: 350px"
            >
              <el-option
                label="你的父亲的生日是什么时候?"
                value="你的父亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的母亲的生日是什么时候?"
                value="你的母亲的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的生日是什么时候?"
                value="你的生日是什么时候?"
              ></el-option>
              <el-option
                label="你的女朋友的生日是什么时候?"
                value="你的女朋友的生日是什么时候?"
              ></el-option>
              <el-option
                label="你女朋友最喜欢吃的东西?"
                value="你女朋友最喜欢吃的东西?"
              ></el-option>
              <el-option
                label="你女朋友最爱的口红颜色?"
                value="你女朋友最爱的口红颜色?"
              ></el-option>

              <el-option
                label="你的最好的朋友叫什么?"
                value="你的最好的朋友叫什么?"
              ></el-option>
              <el-option
                label="你的宠物叫什么?"
                value="你的宠物叫什么?"
              ></el-option>
              <el-option
                label="你最喜欢的颜色?"
                value="你最喜欢的颜色?"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答案" prop="answer3">
            <el-input
              v-model="securityQuestionForm.answer3"
              style="width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSecurityQuestion"
              >确定</el-button
            >
            <el-button @click="cancleSecurityQuestion">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  inject: ["reload"],
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPassword !== "") {
    //       this.$refs.ruleForm.validateField("checkPassword");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      securityQuestionFormRules: {
        question1: {
          required: true,
          message: "请选择问题",
          trigger: "blur",
        },
        question2: {
          required: true,
          message: "请选择问题",
          trigger: "blur",
        },
        question3: {
          required: true,
          message: "请选择问题",
          trigger: "blur",
        },
        answer1: {
          required: true,
          message: "请输入答案",
          trigger: "blur",
        },
        answer2: {
          required: true,
          message: "请输入答案",
          trigger: "blur",
        },
        answer3: {
          required: true,
          message: "请输入答案",
          trigger: "blur",
        },
      },
      step: 0,
      updatePasswordDialog: false,
      // verifyAccoutDialog: false,

      updatePasswordRuleForm: {
        password: "",
        checkPassword: "",
        uid: this.$store.state.userInfo.uid,
      },
      verifyByPhoneForm: {
        phone: "",
        verifyCode: "",
      },
      verifyByEmainForm: {
        email: "",
        verifyCode: "",
      },
      // 是否通过身份验证
      verifyFlag: false,
      // 获取验证码按钮文字
      sendCodeBtnWordForPhone: "获取验证码",
      sendCodeBtnWordForEmail: "获取验证码",
      waitTimeForPhone: 60,
      waitTimeForEmail: 60,
      // 修改密码后的一个状态用于判断身份失效(是否失效)
      loginAccountInvalid: false,

      // *****绑定手机*****
      phoneNumber: "",
      bindPhoneDialog: false,
      verifyBindPhoneForm: {},

      // *****绑定邮箱*****
      emailNumber: "",
      bindEmailStep: 0,
      bindEmailDialog: false,
      verifyBindEmailFlag: false,
      verifyBindEmailForm: {},
      updateBindEmailForm: {},
      sendCodeBtnWordForBindEmail: "获取验证码",
      waitTimeForBindEmail: 60,
      sendCodeBtnWordForBindNewEmail: "获取校验码",
      waitTimeForBindNewEmail: 60,

      // *****设置密保*****
      settingSecurityQuestion: false,
      securityQuestionForm: {},
      // 是否设置密保
      securityQuestionFlag: false,
    };
  },
  computed: {
    getCodeBtnDisableForPhone: {
      get() {
        if (this.waitTimeForPhone == 60) {
          if (this.verifyByPhoneForm.phone) {
            return false;
          }
          return true;
        }
        return true;
      },
      set() {},
    },
    getCodeBtnDisableForEmail: {
      get() {
        if (this.waitTimeForEmail == 60) {
          if (this.verifyByEmainForm.email) {
            return false;
          }
          return true;
        }
        return true;
      },
      set() {},
    },
    getCodeBtnDisableForBindEmail: {
      get() {
        if (this.waitTimeForBindEmail == 60) {
          if (this.verifyBindEmailForm.email) {
            return false;
          }
          return true;
        }
        return true;
      },
      set() {},
    },
    getCodeBtnDisableForBindNewEmail: {
      get() {
        if (this.waitTimeForBindNewEmail == 60) {
          if (this.updateBindEmailForm.email) {
            return false;
          }
          return true;
        }
        return true;
      },
      set() {},
    },
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let uid = this.$store.state.userInfo.uid;
      const { data: res } = await this.$http.get(
        "/user/baseInfo" + "?uid=" + uid
      );
      let data = res.data;
      this.$store.commit("setUserInfo", data);
    },
    updatePassword() {
      this.updatePasswordDialog = true;
    },
    verifyByPhone() {
      return; // 功能未实现
      $("#verifyAccount").css("display", "none");
      $("#verifyPhoneForm").css("display", "block");
    },
    sendVerifyCodeByPhone() {},
    verifyByEmail() {
      $("#verifyAccount").css("display", "none");
      $("#verifyEmailForm").css("display", "block");
    },
    async sendVerifyCodeByEmail() {
      const { data: res } = await this.$http.get(
        "/user/sendVerifyCodeByEmail?email=" + this.verifyByEmainForm.email
      );
      if (res.success) {
        this.setSendMsgBtnDisable();
        this.$message({
          message: res.msg,
          type: "success",
          duration: 3000,
        });
      } else {
        // this.setSendMsgBtnDisable();
        // 发送频繁
        if (res.code == 600) {
          this.$message({
            message: res.msg,
            type: "warning",
            duration: 3000,
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000,
          });
        }
      }
    },
    otherVerify() {
      $("#verifyAccount").css("display", "block");
      $("#verifyPhoneForm").css("display", "none");
      $("#verifyEmailForm").css("display", "none");
    },
    cancelUpdatePassword() {
      this.updatePasswordDialog = false;
      this.step = 0;
      this.verifyFlag = false;
      this.verifyByEmainForm = {};
      this.updatePasswordRuleForm = {};
      setTimeout(function () {
        $("#step1").css("display", "block");
        $("#step2").css("display", "none");
        $("#verifyAccount").css("display", "block");
        $("#verifyPhoneForm").css("display", "none");
        $("#verifyEmailForm").css("display", "none");
      }, 500);
      // 修改密码后：登录账户信息已失效
      if (this.loginAccountInvalid) {
        this.$alert("登录账户信息已失效", "提示信息", {
          confirmButtonText: "确定",
          type: "warning",
          callback: (action) => {
            this.exit();
          },
        });
      }
    },
    submitVerifyAccoutByPhone() {},
    async submitVerifyAccoutByEmail() {
      let _res;
      if (this.step == 0) {
        const { data: res } = await this.$http.post(
          "/user/verifyAccountByEmail",
          this.verifyByEmainForm
        );
        _res = res;
        if (res.success) {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 3000,
          });
          this.step += 1;
          this.verifyFlag = true;
        } else {
          this.verifyFlag = false;
        }
      }
      if (this.verifyFlag) {
        if (this.step == 1) {
          $("#step1").css("display", "none");
          $("#step2").css("display", "block");
        }
      } else {
        this.$message({
          message: _res.mag,
          type: "warning",
          duration: 3000,
        });
      }

      // if (this.step == 3) {
      //   this.updatePasswordDialog = false;
      //   setTimeout(function () {
      //     $("#verifyAccount").css("display", "block");
      //     $("#verifyPhoneForm").css("display", "none");
      //     $("#verifyEmailForm").css("display", "none");
      //   }, 500);
      //   this.step = 1;
      // }
    },

    backVerifyAccout() {
      this.step = 0;
      this.verifyFlag = false;
      this.updatePasswordRuleForm = {};
      $("#step1").css("display", "block");
      $("#step2").css("display", "none");
    },
    async logout() {
      localStorage.clear();
      this.$message({
        type: "success",
        message: "已成功退出系统",
        duration: 2000,
      });
      await this.$router.push("/login");
    },
    async submitUpdatePassword() {
      // this.updatePasswordDialog = false;
      // 密码加密
      let encryptKey = "QIUYONGTU19990826";
      let encryptPassword = md5(
        this.updatePasswordRuleForm.password + encryptKey
      );
      let encryptCheckPassword = md5(
        this.updatePasswordRuleForm.checkPassword + encryptKey
      );
      this.updatePasswordRuleForm.password = encryptPassword;
      this.updatePasswordRuleForm.checkPassword = encryptCheckPassword;
      this.updatePasswordRuleForm.uid = this.$store.state.userInfo.uid;
      const { data: res } = await this.$http.post(
        "/user/updatePassword",
        this.updatePasswordRuleForm
      );
      if (res.success) {
        this.step += 1;
        this.loginAccountInvalid = true;
        if (this.step == 2) {
          $("#step2").css("display", "none");
          $("#step3").css("display", "block");
          // 5秒之后自动退出
          let _this = this;
          // setTimeout(function () {
          //   _this.exit();
          // }, 5000);
        }
        this.$notify({
          title: "成功",
          message: res.msg,
          type: "success",
          duration: "2000",
        });
      } else {
        this.$notify({
          title: "警告",
          message: res.msg,
          type: "warning",
          duration: "2000",
        });
        this.updatePasswordRuleForm = {};
      }
    },
    // 修改密码后退出
    exit() {
      this.logout();
    },
    // 改变获取验证码按钮文字
    setSendMsgBtnDisable() {
      // 因为下面用到了定时器改变按钮文字
      let $this = this;
      $this.waitTimeForEmail--;
      $this.getCodeBtnDisableForEmail = true;
      $this.sendCodeBtnWordForEmail = `${this.waitTimeForEmail}s 后获取`;
      let timerForEmail = setInterval(function () {
        if ($this.waitTimeForEmail > 1) {
          $this.waitTimeForEmail--;
          $this.sendCodeBtnWordForEmail = `${$this.waitTimeForEmail}s 后获取`;
        } else {
          clearInterval(timerForEmail);
          $this.sendCodeBtnWordForEmail = "获取验证码";
          $this.getCodeBtnDisableForEmail = false;
          $this.waitTimeForEmail = 60;
        }
      }, 1000);
    },
    // *****绑定手机号*****
    updateBindPhone() {
      this.bindPhoneDialog = true;
    },
    cancelBindPhone() {},
    submitUpdateBindPhone() {},
    // 修改成功后确认按钮
    confirmBindPhone() {},

    // *****绑定邮箱*****
    updateBindEmail() {
      setTimeout(() => {
        if (this.emailNumber != "") {
          $("#emailInput").attr("disabled", "disabled");
          $("#emailInput.el-input__inner").css({
            color: "#000",
            "background-color": "#f9fafc",
          });
        } else {
          $("#emailInput").removeAttr("disabled");
        }
      });

      this.bindEmailDialog = true;
    },
    cancelBindEmail() {
      this.bindEmailDialog = false;
      this.bindEmailStep = 0;
      this.verifyBindEmailFlag = false;
      this.verifyBindEmailForm.verifyCode = "";
      this.updateBindEmailForm = {};
      setTimeout(function () {
        $("#bindEmailStep1").css("display", "block");
        $("#bindEmailStep2").css("display", "none");
        $("#verifyBindEmailForm").css("display", "block");
      }, 500);
    },
    async sendVerifyCodeByBindEmail() {
      const { data: res } = await this.$http.get(
        "/user/sendVerifyCodeByBindEmail?email=" +
          this.verifyBindEmailForm.email
      );
      if (res.success) {
        this.setSendMsgBtnDisableForBindEmail();
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1500,
        });
      } else {
        // this.setSendMsgBtnDisableForBindEmail();
        if (res.code == 600) {
          this.$message({
            message: res.msg,
            type: "warning",
            duration: 1500,
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 1500,
          });
        }
      }
    },
    setSendMsgBtnDisableForBindEmail() {
      // 因为下面用到了定时器改变按钮文字
      let $this = this;
      $this.waitTimeForBindEmail--;
      $this.getCodeBtnDisableForBindEmail = true;
      $this.sendCodeBtnWordForBindEmail = `${this.waitTimeForBindEmail}s 后获取`;
      let timerForBindEmail = setInterval(function () {
        if ($this.waitTimeForBindEmail > 1) {
          $this.waitTimeForBindEmail--;
          $this.sendCodeBtnWordForBindEmail = `${$this.waitTimeForBindEmail}s 后获取`;
        } else {
          clearInterval(timerForBindEmail);
          $this.sendCodeBtnWordForBindEmail = "获取验证码";
          $this.getCodeBtnDisableForBindEmail = false;
          $this.waitTimeForBindEmail = 60;
        }
      }, 1000);
    },
    async submitVerifyAccoutBindEmail() {
      let _res;
      if (this.bindEmailStep == 0) {
        const { data: res } = await this.$http.post(
          "/user/verifyAccountByBindEmail",
          this.verifyBindEmailForm
        );
        _res = res;
        if (res.success) {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 1500,
          });
          this.bindEmailStep += 1;
          this.verifyBindEmailFlag = true;
        } else {
          this.verifyBindEmailFlag = false;
        }
      }
      if (this.verifyBindEmailFlag) {
        if (this.bindEmailStep == 1) {
          $("#bindEmailStep1").css("display", "none");
          $("#bindEmailStep2").css("display", "block");
        }
      } else {
        this.$message({
          message: _res.msg,
          type: "warning",
          duration: 1500,
        });
      }
    },
    backVerifyAccoutForBindEmaill() {
      this.bindEmailStep = 0;
      this.verifyBindEmailFlag = false;
      this.verifyBindEmailForm.verifyCode = "";
      this.updateBindEmailForm = {};
      $("#bindEmailStep1").css("display", "block");
      $("#bindEmailStep2").css("display", "none");
    },
    async sendVerifyCodeByBindNewEmail() {
      const { data: res } = await this.$http.get(
        "/user/sendVerifyCodeByBindNewEmail?email=" +
          this.updateBindEmailForm.email
      );
      if (res.success) {
        this.setSendMsgBtnDisableForBindNewEmail();
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1500,
        });
      } else {
        // this.setSendMsgBtnDisableForBindNewEmail();
        if (res.code == 600) {
          this.$message({
            message: res.msg,
            type: "warning",
            duration: 1500,
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 1500,
          });
        }
      }
    },
    setSendMsgBtnDisableForBindNewEmail() {
      // 因为下面用到了定时器改变按钮文字
      let $this = this;
      $this.waitTimeForBindNewEmail--;
      $this.getCodeBtnDisableForBindNewEmail = true;
      $this.sendCodeBtnWordForBindNewEmail = `${this.waitTimeForBindNewEmail}s 后获取`;
      let timerForBindNewEmail = setInterval(function () {
        if ($this.waitTimeForBindNewEmail > 1) {
          $this.waitTimeForBindNewEmail--;
          $this.sendCodeBtnWordForBindNewEmail = `${$this.waitTimeForBindNewEmail}s 后获取`;
        } else {
          clearInterval(timerForBindNewEmail);
          $this.sendCodeBtnWordForBindNewEmail = "获取校验码";
          $this.getCodeBtnDisableForBindNewEmail = false;
          $this.waitTimeForBindNewEmail = 60;
        }
      }, 1000);
    },
    async submitUpdateBindEmail() {
      this.updateBindEmailForm.uid = this.$store.state.userInfo.uid;
      const { data: res } = await this.$http.post(
        "/user/updateBindEmail",
        this.updateBindEmailForm
      );
      if (res.success) {
        this.bindEmailStep += 1;
        if (this.bindEmailStep == 2) {
          $("#bindEmailStep2").css("display", "none");
          $("#bindEmailStep3").css("display", "block");
          // 5秒之后自动退出
          let _this = this;
          // setTimeout(function () {
          //   _this.exit();
          // }, 5000);
        }
        this.$notify({
          title: "成功",
          message: res.msg,
          type: "success",
          duration: "1500",
        });
      } else {
        this.$notify({
          title: "警告",
          message: res.msg,
          type: "warning",
          duration: "1500",
        });
        this.updatePasswordRuleForm = {};
      }
    },
    // 修改成功后确认按钮
    confirmBindEmail() {
      this.bindEmailDialog = false;
      setTimeout(function () {
        $("#bindEmailStep3").css("display", "none");
      }, 500);
      this.getUserInfo();
      setTimeout(() => {
        this.reload();
      }, 100);
    },

    // 打开密保设置弹出框
    openSettingSecurityQuestionDiaog() {
      this.settingSecurityQuestion = true;
    },
    cancelSecurityQuestionDialog() {
      this.settingSecurityQuestion = false;
    },
    submitSecurityQuestion() {
      this.$refs["securityQuestionForm"].validate((valid) => {
        if (valid) {
          this.$notify({
            title: "成功",
            message: "设置密保问题成功",
            type: "success",
            duration: "1500",
          });
          this.settingSecurityQuestion = false;
          this.securityQuestionFlag = true;
        } else {
          return false;
        }
      });
    },
    cancleSecurityQuestion() {
      this.$refs["securityQuestionForm"].resetFields();
      this.settingSecurityQuestion = false;
    },

    /** 注销账号 */
    async cancelAccount() {
      this.$confirm("此操作将永久注销账号, 并清空所有数据，不可恢复", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      })
        .then(async () => {
          let uid = this.$store.state.userInfo.uid;
          console.log(uid);
          const { data: res } = await this.$http.post("/user/cancelAccount", {
            uid: uid,
          });
          if (res.success) {
            this.$alert("注销成功，登录账户信息已失效", "提示信息", {
              confirmButtonText: "确定",
              type: "warning",
              callback: (action) => {
                this.exit();
              },
            });
          }
        })
        .catch(() => {
          return;
        });
    },
  },

  mounted() {},
  created() {
    var phoneReg = /(\d{3})\d{4}(\d{4})/;
    var emailReg = /\S{4}(?=@)/;
    let phoneNumber = this.$store.state.userInfo.phone;
    this.phoneNumber = phoneNumber.replace(phoneReg, "$1****$2");
    let emailNumber = this.$store.state.userInfo.email;
    this.emailNumber = emailNumber.replace(emailReg, "****");
    if (this.emailNumber != "") {
      this.verifyBindEmailForm.email = this.$store.state.userInfo.email;
    } else {
      // this.verifyBindEmailForm.email = "";
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
/deep/.el-form {
  margin-top: 20px;
  padding-left: 50px;
}
/deep/.el-divider--horizontal {
  margin-bottom: 30px;
}

/deep/.verifyForm .el-button {
  border-radius: 0;
  height: 32px;
}
/deep/.verifyForm .el-input__inner {
  border-radius: 0;
}

ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
ol li {
  border: 1px solid #e8e8e8;
  padding: 20px;
  margin-bottom: 15px;
  height: 50px;
  box-shadow: 1px 1px 1px #f4f4f4;
}

ol li:hover {
  background: rgba(248, 248, 248, 0.76);
}

ol li div .title {
  color: #6c6c6c;
  font-weight: 700;
}

ol li div .info {
  color: #8c8c8c;
  font-size: 12px;
}
.el-button.disabled-style {
  background-color: #eeeeee;
  color: #cccccc;
}
.el-button.disabled-style:hover {
  background-color: #eeeeee;
  color: #cccccc;
}
</style>