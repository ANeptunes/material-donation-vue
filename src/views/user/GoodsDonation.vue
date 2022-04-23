<template>
  <div id="goodsDonation">
    <!-- 面包导航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物品捐赠</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-row :gutter="18">
      <!-- 左边主体 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card>
            <el-steps style="margin-bottom: 20px" :active="1" simple>
              <el-step title="填写" icon="el-icon-edit"></el-step>
              <el-step title="审核" icon="el-icon-postcard"></el-step>
              <el-step title="完成" icon="el-icon-set-up"></el-step>
            </el-steps>
            <el-form
              size="small"
              ref="addRuleFormRef"
              :rules="addRules"
              :model="addRuleForm"
              label-width="80px"
            >
              <el-form-item label="捐赠类型" prop="type">
                <el-radio-group v-model="addRuleForm.type">
                  <el-radio :size="'mini'" :label="1">个人</el-radio>
                  <el-radio :size="'mini'" :label="2">企业</el-radio>
                  <el-radio :size="'mini'" :label="3">众筹</el-radio>
                  <el-radio :size="'mini'" :label="4">借用</el-radio>
                </el-radio-group>
              </el-form-item>

              <div>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                    <el-form-item label="省份" prop="valueProvince">
                      <el-select
                        v-model="addRuleForm.valueProvince"
                        placeholder="请选择省"
                        @change="changeProvince"
                      >
                        <el-option
                          v-for="item in provinceList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      <el-form-item label="城市" prop="valueCity">
                        <el-select
                          v-model="addRuleForm.valueCity"
                          placeholder="请选择市"
                          @change="changeCity"
                        >
                          <el-option
                            v-for="item in cityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="区县" prop="valueOrigin">
                        <el-select
                          v-model="addRuleForm.valueOrigin"
                          placeholder="请选择区"
                          @change="changeOrigin"
                        >
                          <el-option
                            v-for="item in originOptions"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-form-item label="详细地址" prop="detailAddress">
                  <el-input
                    placeholder="请输入详细地址"
                    v-model="addRuleForm.detailAddress"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="name">
                  <el-input
                    placeholder="请输入联系人名称"
                    v-model="addRuleForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input
                    placeholder="请输入电话号码"
                    v-model="addRuleForm.phone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    placeholder="请输入邮箱地址"
                    v-model="addRuleForm.email"
                  ></el-input>
                </el-form-item>
              </div>

              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-form-item label="物资明细">
                      <el-button
                        size="mini"
                        plain
                        icon="el-icon-search"
                        @click="drawer = true"
                        >捐赠明细</el-button
                      >
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-form-item label="物资总类">
                      <el-input-number
                        v-model="itemNum"
                        :disabled="true"
                      ></el-input-number>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-form-item label="描述信息" prop="remark">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="addRuleForm.remark"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 30px">
                <el-button type="primary" @click="add">立即捐赠</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>

      <!-- 右边主体 -->
      <el-col :span="13">
        <div class="grid-content bg-purple-light">
          <el-card>
            <!-- 查询搜索 -->
            <el-form
              :inline="true"
              :model="queryMap"
              class="demo-form-inline"
              size="small"
            >
              <el-form-item label="分类">
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
              </el-form-item>
              <el-form-item>
                <el-form-item label="名称">
                  <el-input
                    clearable
                    v-model="queryMap.goodsName"
                    placeholder="物品名称"
                    @clear="search"
                  ></el-input>
                </el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
            <el-alert
              title="先勾选下方物资后,在左侧表单的明细中添加其入库数量"
              type="info"
              show-icon
              style="margin-bottom: 20px"
            >
            </el-alert>
            <!-- 入库预选表格 -->
            <el-table
              style="height: 420px"
              :data="tableData"
              v-loading="loading"
              :row-key="getRowKey"
              ref="dataTable"
              @selection-change="handleSelectionChange"
              border
            >
              <el-table-column
                type="selection"
                :reserve-selection="true"
              ></el-table-column>
              <el-table-column
                prop="imgUrl"
                label="图片"
                align="center"
                width="150px"
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
                      style="height: 32px; width: 32px; cursor: pointer"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="goodsCategoryName"
                label="类别"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specification"
                label="型号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="amount"
                label="数量"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                align="center"
              ></el-table-column>
            </el-table>
            <!-- 表格分页 -->
            <el-pagination
              background
              style="margin-top: 13px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryMap.pageNum"
              :page-sizes="[6, 8, 16, 20]"
              :page-size="queryMap.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total"
            ></el-pagination>

            <!-- 入库明细抽屉 -->
            <el-drawer
              size="49%"
              title="入库明细"
              :visible.sync="drawer"
              :with-header="false"
            >
              <span>
                <el-button
                  size="mini"
                  style="float: right; margin: 10px"
                  type="primary"
                  icon="el-icon-remove"
                  :disabled="goods.length == 0"
                  @click="removeAllItem"
                >
                  清空
                </el-button>
                <el-table height="700" :data="goods" border>
                  <el-table-column
                    prop="goodsName"
                    label="名称"
                    width="120px;"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="imgUrl"
                    label="图片"
                    align="center"
                    width="80px"
                    padding="0px"
                  >
                    <template slot-scope="scope">
                      <img
                        :src="'http://8.142.42.56/' + scope.row.imgUrl"
                        alt
                        style="width: 50px; height: 30px"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="goodsCategoryName"
                    label="类别"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="数量" width="160" align="center">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-model="scope.row.donationNums"
                        :min="0"
                        :max="scope.row.amount"
                        label="描述文字"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="unit"
                    label="单位"
                    align="center"
                    width="80px;"
                  ></el-table-column>
                  <el-table-column
                    prop="specification"
                    label="规格"
                    width="100px;"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="操作" width="100px;" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        size="mini"
                        plain
                        icon="el-icon-remove"
                        @click="removeItem(scope.row.id)"
                        >移除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </span>
            </el-drawer>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      loading: true,
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
      cityOptions: [], // 市下拉框数据
      originOptions: [], // 区下拉框数据,
      addRules: {
        type: [{ required: true, message: "请选中捐赠类型", trigger: "blur" }],
        remark: [
          { required: true, message: "请输入商品说明备注", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        detailAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            validator: checkPhone,
            trigger: "blur",
          },
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        valueProvince: [
          { required: true, message: "请输入省份", trigger: "blur" },
        ],
        valueCity: [{ required: true, message: "请输入城市", trigger: "blur" }],
        valueOrigin: [
          { required: true, message: "请输入区县", trigger: "blur" },
        ],
      }, //添加验证
      itemNum: 0,
      addRuleForm: { type: 1 },
      goodsCatetoryList: [],
      drawer: false,
      total: 0,
      queryMap: {
        pageNum: 1,
        pageSize: 6,
        goodsName: "",
        goodsCategoryId: "",
        status: 3,
        uid: "",
      },
      tableData: [],
      goods: [],
      // 捐赠的数量
      donationNums: 0,
    };
  },
  methods: {
    //重置信息
    reset() {
      this.addRuleForm = { type: 1 };
      this.$refs.addRuleFormRef.clearValidate();
    },

    /**
     * 创建入库单
     */
    //添加
    add() {
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.addRuleForm.address =
            this.addRuleForm.province +
            "/" +
            this.addRuleForm.city +
            "/" +
            this.addRuleForm.origin +
            "/" +
            this.addRuleForm.detailAddress;
          const car = [];
          this.goods.forEach((row) => {
            if (row.amount !== undefined) {
              const item = {
                goodsNum: row.goodsNum,
                goodsNumber: row.donationNums,
              };
              car.push(item);
            }
          });
          let numsFlag = true;
          if (car.length > 0) {
            car.forEach((row) => {
              if (row.goodsNumber <= 0 || row.goodsNumber == null) {
                numsFlag = false;
              }
            });
            if (numsFlag) {
              this.addRuleForm.goods = car;
            } else {
              return this.$message.warning(
                "捐赠物品数量不能为空，请勾选物资后在并在明细中添加数量"
              );
            }
          } else {
            return this.$message.warning(
              "捐赠物品不能为空，请勾选物资后在明细中添加数量"
            );
          }
          const res = await this.$confirm(
            "此操作将提交捐赠单, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).catch(() => {
            this.$message({
              type: "info",
              message: "已取消捐赠",
            });
          });
          if (res === "confirm") {
            this.addRuleForm.uid = this.userInfo.uid;
            const { data: res } = await this.$http.post(
              "donation/add",
              this.addRuleForm
            );
            if (res.success) {
              this.$message.warning("物资入库进入审核状态");
              // await this.$router.push("/business/product/in-stocks");
              this.loadTableData();
            } else {
              return this.$message.error("商品入库失败:" + res.data.errorMsg);
            }
          }
          this.addDialogVisible = false;
        }
      });
    },
    /**
     * 加载商品列表(可入库)
     */
    async loadTableData() {
      this.queryMap.uid = this.userInfo.uid;
      const { data: res } = await this.$http
        .get("donation/findDonationGoodsList", {
          params: this.queryMap,
        })
        .catch((error) => {
          this.loading = false;
        });
      if (res.success) {
        this.total = res.data.total;
        this.tableData = res.data.data;
        setTimeout(() => {
          this.loading = false;
        }, 300);
        return;
      } else {
        this.loading = false;
        return this.$message.error(res.msg);
      }
    },
    /**
     * 加载商品类别
     */
    async getCatetorys() {
      const { data: res } = await this.$http.get("goods/findGoodsCategoryList");
      if (res.success) {
        this.goodsCatetoryList = res.data;
      } else {
      }
    },

    /**
     * 搜索
     */
    search() {
      this.queryMap.pageNum = 1;
      this.loadTableData();
    },
    /**
     *  指定一个key标识这一行的数据
     */
    getRowKey(row) {
      return row.id;
    },
    /**
     * val表示选中的表格行数据
     */
    handleSelectionChange(val) {
      this.goods = val;
      console.log(val);
      this.itemNum = val.length;
    },
    /**
     * 改变页码
     */
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.loadTableData();
    },
    /**
     * 点击分页
     */
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.loadTableData();
    },
    /**
     * 清空所有
     */
    removeAllItem() {
      this.goods.forEach((row) => {
        this.$refs.dataTable.toggleRowSelection(row, false);
      });
      this.goods = [];
    },

    /**
     * 移除item从抽屉中
     */
    removeItem(val) {
      this.goods.forEach((row) => {
        if (row.id === val) {
          this.$refs.dataTable.toggleRowSelection(row, false);
        }
      });
      this.goods = this.goods.filter((item) => item.id !== val);
    },
    // 选择省
    changeProvince(val) {
      this.provinceList.forEach((province, index) => {
        if (val.toString() === this.provinceList[index].value) {
          this.cityOptions = this.provinceList[index].children;
          this.addRuleForm.valueCity =
            this.provinceList[index].children[0].value; //设置市的值
          this.addRuleForm.city = this.provinceList[index].children[0].label;

          this.addRuleForm.valueOrigin =
            this.provinceList[index].children[0].children[0].value; //设置县的值
          this.addRuleForm.origin =
            this.provinceList[index].children[0].children[0].label;

          this.originOptions = this.provinceList[index].children[0].children;
          //set value
          this.addRuleForm.province = this.provinceList[index].label;
        }
      });
    },
    // 选择市
    changeCity(val) {
      this.cityList.forEach((city, index) => {
        if (val.toString() === this.cityList[index].value) {
          this.originOptions = this.cityList[index].children;
          this.addRuleForm.valueOrigin = this.cityList[index].children[0].value; //设置县的值;
          //set value
          this.addRuleForm.city = this.cityList[index].label;
        }
      });
    },
    // 选择区
    changeOrigin(val) {
      this.addRuleForm.valueOrigin = val;

      this.originList.forEach((origin, index) => {
        if (val.toString() === this.originList[index].value) {
          //set value
          this.addRuleForm.origin = this.originList[index].label;
        }
      });
      //添加this.$forceUpdate();进行强制渲染，效果实现。搜索资料得出结果：因为数据层次太多，render函数没有自动更新，需手动强制刷新。
      this.$forceUpdate();
    },

    _getJsonData() {
      this.$http.get("/json/provinces.json").then((res) => {
        this.provinceList = [];
        this.cityList = [];
        this.originList = [];
        res.data.forEach((item) => {
          if (item.value.match(/0000$/)) {
            this.provinceList.push({
              value: item.value,
              label: item.name,
              children: [],
            });
          } else if (item.value.match(/00$/)) {
            this.cityList.push({
              value: item.value,
              label: item.name,
              children: [],
            });
          } else {
            this.originList.push({
              value: item.value,
              label: item.name,
            });
          }
        });
        for (let index in this.provinceList) {
          for (let index1 in this.cityList) {
            if (
              this.provinceList[index].value.slice(0, 2) ===
              this.cityList[index1].value.slice(0, 2)
            ) {
              this.provinceList[index].children.push(this.cityList[index1]);
            }
          }
        }
        for (let item1 in this.cityList) {
          for (let item2 in this.originList) {
            if (
              this.originList[item2].value.slice(0, 4) ===
              this.cityList[item1].value.slice(0, 4)
            ) {
              this.cityList[item1].children.push(this.originList[item2]);
            }
          }
        }
      });
    },
    /**
    获取用户信息
    */
    async getUserInfo() {
      this.userInfo = this.$store.state.userInfo;
    },
  },
  created() {
    this.getUserInfo();
    this._getJsonData();
    this.loadTableData();
    this.getCatetorys();
  },
};
</script>