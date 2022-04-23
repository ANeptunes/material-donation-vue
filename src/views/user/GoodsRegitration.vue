<template>
  <div id="goodsRegitration">
    <!-- 面包导航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品登记</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <el-card class="box-card">
      <el-container style="margin-bottom: 20px">
        <el-alert
          show-icon
          title="友情提示:  请勿捐赠 '易燃'、'易爆' 的物品 , 审核通过后 3 - 5 个工作日会有客服与您联系 , 请保持手机畅通 ! 谢谢配合 !"
          type="warning"
        >
        </el-alert>
      </el-container>

      <!-- 头部功能区 -->
      <el-row :gutter="45">
        <el-col :span="5">
          <el-select
            size="small"
            v-model="queryMap.goodsCategoryId"
            clearable
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in goodsCatetoryList"
              :key="item.id"
              :label="item.goodsCategoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            clearable
            size="small"
            v-model="queryMap.goodsName"
            placeholder="请输入品名称查询"
            @clear="search"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <template>
            <el-select
              clearable
              size="small"
              v-model="queryMap.status"
              @click="search"
              placeholder="请选择状态"
            >
              <el-option label="未通过" :value="1"></el-option>
              <el-option label="待审核" :value="2"></el-option>
              <el-option label="已通过" :value="3"></el-option>
              <el-option label="回收站" :value="0"></el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="8">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查找</el-button
          >
          <el-button
            size="small"
            icon="el-icon-refresh-right"
            type="warning"
            @click="resetForm"
            >重置</el-button
          >
          <el-button
            size="small"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="openAdd"
            >登记
          </el-button>
          <el-button size="small" icon="el-icon-refresh" @click="getGoodsList"
            >刷新</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <template>
        <el-table
          size="mini"
          v-loading="loading"
          border
          stripe
          :data="goodsData"
          style="width: 100%; margin-top: 20px"
          height="440"
        >
          <el-table-column
            prop="id"
            type="index"
            label="ID"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="imgUrl"
            label="图片"
            align="center"
            width="100px"
            padding="0px"
          >
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <img
                  :src="'http://8.142.42.56/' + scope.row.imgUrl"
                  style="height: 200px; width: 200px"
                />
                <img
                  slot="reference"
                  :src="'http://8.142.42.56/' + scope.row.imgUrl"
                  :alt="scope.row.imgUrl"
                  style="height: 38px; width: 38px; cursor: pointer"
                />
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            prop="goodsName"
            label="物品名称"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="goodsNum"
            :show-overflow-tooltip="true"
            label="物品编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="goodsCategoryName"
            label="类别"
            align="center"
            width="130"
          ></el-table-column>

          <el-table-column label="物品规格" width="110" align="center">
            <template slot-scope="scope">
              <el-tag
                type="success"
                size="mini"
                closable
                v-text="scope.row.specification"
              ></el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            width="70"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="70"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                size="mini"
                effect="plain"
                type="warning"
                v-if="scope.row.status == 2"
                >待审核</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="success"
                v-if="scope.row.status == 3"
                >已通过</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="info"
                v-if="scope.row.status == 1 || scope.row.status == -2"
                >未通过</el-tag
              >
              <el-tag
                size="mini"
                type="danger"
                effect="plain"
                v-if="scope.row.status == 0"
                >回收站</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="登记时间"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 0:回收站 1:未通过 2:等待审核: 3:通过审核-->

              <!-- 2:待审核 提供的编辑和回收-->
              <span v-if="scope.row.status == 2">
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="edit(scope.row.id)"
                  >编辑</el-button
                >
                <el-popconfirm
                  @confirm="remove(scope.row.id)"
                  style="margin-left: 10px"
                  confirmButtonText="是的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="#E6A23C"
                  title="该物品正在审核,确定撤销该物品的审核吗？"
                >
                  <el-button
                    type="text"
                    slot="reference"
                    size="mini"
                    icon="el-icon-refresh-left"
                    >撤销</el-button
                  >
                </el-popconfirm>
              </span>

              <!-- 1:未通过 3:已通过 -2:已被管理员删除 提供的查看和回收-->
              <span
                v-if="
                  scope.row.status == 3 ||
                  scope.row.status == 1 ||
                  scope.row.status == -2
                "
              >
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-view"
                  @click="show(scope.row.id)"
                  >查看</el-button
                >
                <el-popconfirm
                  @confirm="remove(scope.row.id)"
                  style="margin-left: 10px"
                  confirmButtonText="是的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="该物品将被移入回收站,是否执行此操作？"
                >
                  <el-button
                    type="text"
                    slot="reference"
                    size="mini"
                    icon="el-icon-delete"
                    >移除</el-button
                  >
                </el-popconfirm>
              </span>

              <!-- 0:回收站 提供的恢复和删除 -->
              <span v-if="scope.row.status == 0">
                <el-popconfirm
                  @confirm="back(scope.row.id)"
                  confirmButtonText="好的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="green"
                  title="这是一段内容确定恢复吗？"
                >
                  <el-button
                    type="text"
                    size="mini"
                    slot="reference"
                    icon="el-icon-back"
                    >恢复</el-button
                  >
                </el-popconfirm>
                <el-button
                  style="margin-left: 10px"
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(scope.row.id)"
                  >删除</el-button
                >
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 物资添加弹出框 -->
      <el-dialog
        title="登记物品"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="closeAddDialog"
      >
        <span>
          <el-form
            size="mini"
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="物品名称" prop="goodsName">
              <el-input
                v-model="addRuleForm.goodsName"
                placeholder="请选择物品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="物品图片" prop="imgUrl">
              <!-- 图片上传部分 -->
              <el-upload
                :action="uploadApi"
                :class="{ disabled: uploadDisabled }"
                list-type="picture-card"
                :limit="limitCount"
                :on-change="handleChange"
                :on-remove="handleRemove"
                accept="image/*"
                :on-success="handleSuccess"
                :headers="headerObject"
                ref="upload"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="分类" prop="goodsCategoryId">
                    <el-select
                      size="small"
                      v-model="addRuleForm.goodsCategoryId"
                      clearable
                      placeholder="请选择分类"
                    >
                      <el-option
                        v-for="item in goodsCatetoryList"
                        :key="item.id"
                        :label="item.goodsCategoryName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="物品规格" prop="specification">
                    <el-input
                      v-model="addRuleForm.specification"
                      placeholder="10片/包"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="单位" prop="unit">
                    <el-input
                      v-model="addRuleForm.unit"
                      placeholder="包"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="数量" prop="amount">
                    <el-input
                      v-model.number="addRuleForm.amount"
                      placeholder="请输入数量"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="备注信息" prop="remark">
              <el-input type="textarea" v-model="addRuleForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="add"
            :disabled="btnDisabled"
            :loading="btnLoading"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 物品编辑弹出框 -->
      <el-dialog
        title="更新物品"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEditDialog"
      >
        <span>
          <el-form
            size="mini"
            :model="editRuleForm"
            :rules="addRules"
            ref="editRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="物品名称" prop="goodsName">
              <el-input v-model="editRuleForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="物品图片" prop="imgUrl">
              <!-- 图片上传部分 -->
              <el-upload
                :action="uploadApi"
                :class="{ disabled: uploadDisabled }"
                list-type="picture-card"
                :limit="limitCount"
                accept="image/*"
                :on-success="editHandleSuccess"
                :headers="headerObject"
                ref="upload2"
                :on-preview="handlePictureCardPreview"
                :file-list="imgFilesList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="分类" prop="goodsCategoryId">
                    <el-select
                      size="small"
                      v-model="editRuleForm.goodsCategoryId"
                      clearable
                      placeholder="请选择分类"
                    >
                      <el-option
                        v-for="item in goodsCatetoryList"
                        :key="item.id"
                        :label="item.goodsCategoryName"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <el-form-item label="物品规格" prop="specification">
                  <el-input
                    v-model="editRuleForm.specification"
                    placeholder="10个/包"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="单位" prop="unit">
                    <el-input
                      v-model="editRuleForm.unit"
                      placeholder="包"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="数量" prop="amount">
                    <el-input
                      v-model.number="editRuleForm.amount"
                      placeholder="请输入数量"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注信息" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="editRuleForm.remark"
                    placeholder="请输入备注信息"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="update"
            :disabled="btnDisabled"
            :loading="btnLoading"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 物品查看弹出框 -->
      <el-dialog
        title="查看物品"
        :visible.sync="showDialogVisible"
        width="50%"
        @close="closeShowDialog"
      >
        <el-table :data="showTableData" style="width: 100%" default-expand-all>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="物品名称 :">
                  <span>{{ props.row.goodsName }}</span>
                </el-form-item>
                <el-form-item label="物品分类 :">
                  <span>{{ props.row.goodsCategoryName }}</span>
                </el-form-item>

                <el-form-item label="物品规格 :">
                  <span>{{ props.row.specification }}</span>
                </el-form-item>
                <el-form-item label="物品单位 :">
                  <span>{{ props.row.unit }}</span>
                </el-form-item>
                <el-form-item label="物品编号 :">
                  <span>{{ props.row.goodsNum }}</span>
                </el-form-item>
                <el-form-item label="登记时间 :">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="goodsNum"> </el-table-column>
          <el-table-column label="商品名称" prop="goodsName"> </el-table-column>
          <el-table-column label="描述" prop="remark"> </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 图片预览 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadApi: this.BASE_API_URL + "upload/image",
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      headerObject: {
        Authorization: localStorage.getItem("LOCAL_KEY_ACCESS_TOKEN"),
      }, //图片上传请求头

      //类别选择
      goodsCatetoryList: [],
      showTableData: [],
      showDialogVisible: false,
      editDialogVisible: false,
      addDialogVisible: false, //添加弹框是否显示
      total: 0, //总共多少条数据
      goodsData: [], //表格数据
      // 用户信息
      userInfo: {},
      queryMap: {
        pageNum: 1,
        pageSize: 10,
        goodsName: "",
        goodsCategoryId: "",
        status: "",
        // 2021-12-10增加uid
        uid: "",
      }, //查询对象
      addRuleForm: {}, //添加表单数据
      editRuleForm: {}, //修改表单数据
      uploadDisabled: false,
      limitCount: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      addRules: {
        goodsName: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        unit: [
          { required: true, message: "请输入物品单位", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        amount: [
          { required: true, message: "请输入物品数量", trigger: "blur" },
          {
            type: "number",
            message: "数量必须为数字值",
            trigger: "blur",
          },
        ],
        specification: [
          { required: true, message: "请输入物品规格", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        remark: [
          { required: true, message: "请输入物品说明备注", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        goodsCategoryId: [
          { required: true, message: "请选择物品分类", trigger: "blur" },
        ],
      }, //添加验证
      imgFilesList: [],
      categorykeys: [], //搜索类别
    };
  },
  methods: {
    //重置查询表单
    resetForm() {
      this.queryMap = {
        pageNum: 1,
        pageSize: 6,
        name: "",
        goodsCategoryId: "",
        status: "",
        // uid:this.userInfo.uid
      };
    },
    /**
     * 打开添加物资弹框
     */
    openAdd() {
      this.getGoodsCatetory();
      this.addDialogVisible = true;
    },
    /**
     * 搜索物资
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getGoodsList();
    },
    /**
     * 删除物资
     */
    async del(id) {
      var res = await this.$confirm(
        "此操作将永久删除该物品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
          duration: 1700,
        });
      });
      if (res === "confirm") {
        const { data: res } = await this.$http.delete("goods/delete/" + id);
        if (res.success) {
          this.$message.success("物品删除成功");
          this.queryMap.pageNum = 1;
          await this.getGoodsList();
        } else {
          this.$message.error("物品删除失败");
        }
      }
    },
    /**
     * 更新物资
     */
    async update() {
      this.$refs.editRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.put(
            "goods/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "物品信息已更新",
              type: "success",
            });
            this.editRuleForm = {};
            await this.getGoodsList();
          } else {
            this.$message.error("物品信息更新失败");
          }
          this.editDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
        }
      });
    },
    /**
     * 编辑物资
     */
    async edit(id) {
      const { data: res } = await this.$http.get("/goods/edit/" + id);
      if (res.success) {
        this.editRuleForm = res.data;
        const item = res.data;
        this.imgFilesList.push({
          url: "http://8.142.42.56/" + item.imgUrl,
          name: item.name,
          id: item.id,
        });
      } else {
        return this.$message.error("物资信息编辑失败" + res.data.errorMsg);
      }
      this.editDialogVisible = true;
    },

    /**
     * 查看物品信息
     */
    async show(id) {
      const { data: res } = await this.$http.get("/goods/show/" + id);
      if (res.success) {
        this.showTableData.push(res.data);
        console.log(this.showTableData);
        const item = res.data;
        this.imgFilesList.push({
          url: "http://8.142.42.56/" + item.imgUrl,
          name: item.name,
          id: item.id,
        });
      } else {
        return this.$message.error("物资信息编辑失败");
      }
      this.showDialogVisible = true;
    },
    /**
     * 添加物资
     */
    add() {
      this.addRuleForm.uid = this.userInfo.uid;
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.post(
            "goods/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success(res.msg);
            this.addRuleForm = {};
            await this.getGoodsList();
          } else {
            this.btnDisabled = false;
            this.btnLoading = false;
            return this.$message.error(res.msg);
          }
          this.addDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
        }
      });
    },
    /**
     * 移除回收站
     */
    async remove(id) {
      const { data: res } = await this.$http.delete("goods/remove/" + id);
      if (!res.success) {
        return this.$message.error("移入回收站失败:" + res.data.msg);
      } else {
        await this.getGoodsList();
        return this.$message.success("移入回收站成功");
      }
    },
    /**
     * 从回收站恢复
     */
    async back(id) {
      const { data: res } = await this.$http.put("goods/back/" + id);
      if (!res.success) {
        return this.$message.error("从回收站恢复失败");
      } else {
        await this.getGoodsList();
        return this.$message.success("从回收站中已恢复");
      }
    },
    /**
    获取用户信息
    */
    async getUserInfo() {
      this.userInfo = this.$store.state.userInfo;
      this.queryMap.uid = this.userInfo.uid;
    },
    /**
     * 加载物资列表
     */
    async getGoodsList() {
      this.queryMap.uid = this.userInfo.uid;
      const { data: res } = await this.$http.get("goods/findGoodsList", {
        params: this.queryMap,
      });
      if (res.success) {
        this.total = res.data.total;
        this.goodsData = res.data.data;
      } else {
        return this.$message.error(res.msg);
      }
    },
    /**
     * 加载物资类别
     */
    async getGoodsCatetory() {
      const { data: res } = await this.$http.get("goods/findGoodsCategoryList");
      if (res.success) {
        this.goodsCatetoryList = res.data;
      } else {
      }
    },
    handleChange(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitCount;
      this.addRuleForm.imgUrl = "";
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getGoodsList();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getGoodsList();
    },
    //关闭添加弹出框
    closeAddDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
      this.$refs.upload.clearFiles();
    },
    //关闭编辑弹出框
    closeEditDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
      this.$refs.upload2.clearFiles();
      this.imgFilesList = [];
    },
    //关闭编辑弹出框
    closeShowDialog() {
      this.showTableData = [];
      this.imgFilesList = [];
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.addRuleForm.imgUrl = response.data;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //编辑
    editHandleSuccess(response, file, fileList) {
      this.editRuleForm.imgUrl = response.data;
    },
  },
  created() {
    this.getUserInfo();
    this.getGoodsList();
    this.getGoodsCatetory();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0 !important;
}
.demo-table-expand label {
  width: 90px !important;
  color: #99a9bf !important;
}
.demo-table-expand .el-form-item {
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  width: 50% !important;
}
</style>