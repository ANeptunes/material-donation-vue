<template>
  <div id="goodsRegitration">
    <!-- 面包导航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <el-card class="box-card">
      <el-container style="margin-bottom: 20px">
        <el-alert
          show-icon
          title="友情提示:  请勿审核通过 '易燃'、'易爆' 的物品 , 审核通过将尽快通知用户！"
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
          <el-input
            clearable
            size="small"
            v-model="queryMap.goodsNum"
            placeholder="请输入品名称编编号"
            @clear="search"
          ></el-input>
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
          :data="goodsData"
          style="width: 100%; margin-top: 20px"
          height="440"
        >
          <el-table-column
            prop="id"
            type="index"
            label="#"
            align="center"
            fixed="left"
            width="50"
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
            width="180"
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
                type="danger"
                v-if="scope.row.status == 1"
                >未通过</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="捐赠人"
            align="center"
            width="101"
          ></el-table-column>
          <el-table-column
            prop="modifiedTime"
            label="审核时间"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <!-- 0:回收站 1:未通过 2:等待审核: 3:通过审核-->
              <span v-if="scope.row.status == 3">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-view"
                  @click="show(scope.row.id)"
                  >查看</el-button
                >
                <el-popconfirm
                  title="是否撤回该物品的审核?"
                  style="margin-left: 10px"
                  @confirm="backGoodsAudit(scope.row.id)"
                >
                  <el-button
                    slot="reference"
                    type="warning"
                    size="mini"
                    icon="el-icon-refresh-right"
                    >撤回</el-button
                  >
                </el-popconfirm>
              </span>
              <!-- 2:待审核 提供的通过和不通过-->
              <span v-if="scope.row.status == 2">
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-check"
                  @click="passGoodsAudit(scope.row.id)"
                  >通过</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-close"
                  @click="notPassGoodsAudit(scope.row.id)"
                  >拒绝</el-button
                >
              </span>

              <!-- 1:未通过 提供的查看和删除-->
              <span v-if="scope.row.status == 1">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-view"
                  @click="show(scope.row.id)"
                  >查看</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteGoodsAudit(scope.row.id)"
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
                <el-form-item label="审核时间 :">
                  <span>{{ props.row.modifiedTime }}</span>
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
        goodsNum: "",
      }, //查询对象
      dialogVisible: false,
      imgFilesList: [],
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
      };
    },
    /**
     * 搜索物资
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getGoodsList();
    },

    /**
     * 查看物品信息
     */
    async show(id) {
      const { data: res } = await this.$http.get("/goods/show/" + id);
      if (res.success) {
        this.showTableData.push(res.data);
      } else {
        return this.$message.error("物资信息查看失败");
      }
      this.showDialogVisible = true;
    },

    /**
    获取用户信息
    */
    async getUserInfo() {
      this.userInfo = this.$store.state.userInfo;
      // this.queryMap.uid = this.userInfo.uid;
    },
    /**
     * 加载物资列表
     */
    async getGoodsList() {
      const { data: res } = await this.$http.get(
        "/admin/goods/getNotAuditGoods",
        {
          params: this.queryMap,
        }
      );
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

    passGoodsAudit(id) {
      this.$confirm("是否通过该物品审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/admin/goods/passGoodsAudit/" + id
          );
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
    },
    notPassGoodsAudit(id) {
      this.$confirm("是否不通过该物品审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/admin/goods/notPassGoodsAudit/" + id
          );
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
    },
    async backGoodsAudit(id) {
      const { data: res } = await this.$http.post(
        "/admin/goods/backGoodsAudit/" + id
      );
      if (res.success) {
        this.$message({
          type: "success",
          message: res.msg,
          duration: 2000,
        });
        this.getGoodsList();
      } else {
        this.$message({
          type: "error",
          message: res.msg,
          duration: 2000,
        });
        this.getGoodsList();
      }
    },
    deleteGoodsAudit(id) {
      this.$confirm("是否删除该物品审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/admin/goods/deleteGoodsAudit/" + id
          );
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
              duration: 2000,
            });
            this.getGoodsList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
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
    //关闭查看弹出框
    closeShowDialog() {
      this.showTableData = [];
      this.imgFilesList = [];
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