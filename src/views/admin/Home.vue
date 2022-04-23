<template>
  <div id="welcome">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>欢迎</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="18">
      <!-- 左边部分 -->
      <el-col :span="13">
        <!-- 用户信息表格 -->
        <el-card class="box-card" style="height: 185px">
          <div slot="header" class="clearfix">
            <span>管理员信息</span>
            <el-button
              @click="getPage('https://github.com/zykzhangyukang/Xinguan')"
              type="primary"
              plain
              style="float: right"
              size="mini"
              >获取源码</el-button
            >
            <el-button
              style="float: right; margin-right: 10px"
              size="mini"
              plain
              loading
              type="primary"
              >用户中心</el-button
            >
          </div>
          <el-tooltip
            class="item"
            effect="dark"
            content="换头像功能还未实现"
            placement="top-start"
            style="margin-top: 8px"
          >
            <el-avatar
              shape="square"
              :size="80"
              :src="userInfo.avatar"
              style="float: left"
              :key="1"
            ></el-avatar>
          </el-tooltip>
          <div class="right" style="float: right; width: 520px">
            <el-table :data="tableInfo" border height="100">
              <el-table-column
                prop="username"
                label="用户账号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="nickname"
                label="用户昵称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="realName"
                label="姓名"
                align="center"
              ></el-table-column>
              <el-table-column
                fixed="right"
                prop="roles"
                label="用户角色"
                width="150"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- 功能列表 -->
        <el-card style="height: 120px; margin-top: 8px">
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <router-link to="/goods/register">
                <img
                  src="../../assets/2.svg"
                  alt
                  width="60.8px;"
                  style="cursor: pointer; margin-left: 20px"
                />
              </router-link>
              <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                物品登记
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <router-link to="/goods/donation">
                <img
                  src="../../assets/1.svg"
                  alt
                  width="60.8px;"
                  style="margin: 0px auto; cursor: pointer; margin-left: 20px"
                />
              </router-link>
              <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                物品捐赠
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"></div>
            <router-link to="/goods/record">
              <img
                src="../../assets/4.svg"
                alt
                width="60.8px;"
                style="cursor: pointer; margin-left: 20px"
              />
            </router-link>
            <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
              捐赠记录
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <router-link to="/personCenter" target="_blank">
                <img
                  src="../../assets/3.svg"
                  alt
                  width="60.8px;"
                  style="cursor: pointer; margin-left: 20px"
                />
              </router-link>
              <div style="font-size: 12px; margin-top: 5px; margin-left: 25px">
                个人中心
              </div>
            </div>
          </el-col>
        </el-card>
        <!-- 统计报表 -->
        <el-card
          class="box-card"
          style="margin-top: 8px; padding: 0px; position: relative"
        >
          <!-- 用户登入报表 -->
          <div id="goodsReport" style="width: 650px; height: 270px"></div>
          <el-pagination
            small
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="this.pageNum"
            :page-size="8"
            :total="this.total"
            :hide-on-single-page="true"
            style="
              position: absolute;
              left: 50%;
              bottom: 10px;
              transform: translate(-50%, -50%);
            "
          ></el-pagination>
        </el-card>
      </el-col>
      <!-- 右边部分 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card style="height: 635px">
            <el-carousel height="180px">
              <el-carousel-item
                v-for="item in 3"
                :key="item"
              ></el-carousel-item>
            </el-carousel>
            <aplayer
              style="margin-top: 20px; margin-bottom: 30px"
              :volume="0.1"
              :music="{
                title: '起风了',
                artist: '买辣椒也用券',
                src: 'http://music.163.com/song/media/outer/url?id=1330348068.mp3',
                pic: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              }"
              autoplay
              :list="musicList"
            ></aplayer>
            <el-divider>其他项目</el-divider>
            <el-row :gutter="20">
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-button
                    @click="
                      getPage('http://116.85.25.106/backend/loginPage.do')
                    "
                    >通用管理系统</el-button
                  >
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-button @click="getPage('http://www.zykcoderman.xyz/')"
                    >社区项目</el-button
                  >
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-button @click="getPage('http://116.85.25.106')"
                    >商城项目</el-button
                  >
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-button
                    @click="getPage('https://github.com/zykzhangyukang')"
                    >Githhub</el-button
                  >
                </div></el-col
              >
            </el-row>
            <el-divider></el-divider>
          </el-card>
          <!-- <el-calendar :v-model="new Date()"></el-calendar> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";
import aplayer from "vue-aplayer";
export default {
  components: {
    //别忘了引入组件
    aplayer: aplayer,
  },

  data() {
    return {
      pageNum: 1,
      // 统计物品总数量
      total: 0,
      xData: [],
      yData: [],
      myData: [],
      options: [], // y轴
      value: new Date(),
      userInfo: {},
      tableInfo: [],
      musicList: [
        {
          artist: "Eminem",
          lrc: "",
          title: "Airplanes",
          src: "http://music.163.com/song/media/outer/url?id=26714821.mp3",
          pic: "http://p4.music.126.net/H9HJibEzTL34aIT6nsqKsQ==/5682276092402519.jpg",
        },
        {
          artist: "Tinashe",
          lrc: "",
          title: "Story of Us",
          src: "http://music.163.com/song/media/outer/url?id=1403428061.mp3",
          pic: "http://p3.music.126.net/l2XttTpEa14IEZtUsQX1HA==/109951164486978461.jpg",
        },
        {
          artist: "Chris Brown",
          lrc: "",
          title: "War For You",
          src: "http://music.163.com/song/media/outer/url?id=30431534.mp3",
          pic: "http://p3.music.126.net/YWkl1JXVKm7bOBAew72lGg==/109951163958771792.jpg",
        },
        {
          artist: "Sarah Darling",
          lrc: "",
          title: "Jack of Hearts",
          src: "http://music.163.com/song/media/outer/url?id=19132440.mp3",
          pic: "http://p4.music.126.net/4q3kpn5VLo3x7hVWttj0QA==/109951164802108652.jpg",
        },
        {
          artist: "Benjamin Ingrosso",
          lrc: "",
          title: "Costa Rica",
          src: "http://music.163.com/song/media/outer/url?id=1372897252.mp3",
          pic: "http://p4.music.126.net/mmm97zC81t73rToPFuXXnw==/109951164159882466.jpg",
        },
        {
          artist: "Yo Trane",
          lrc: "",
          title: "Affection",
          src: "http://music.163.com/song/media/outer/url?id=1393553542.mp3",
          pic: "http://p4.music.126.net/T_vdbfQPO4HE4zVE_8rgCQ==/109951164389023010.jpg",
        },
      ],
    };
  },
  methods: {
    /**
     * 点击获取源码
     */
    getPage(url) {
      const w = window.open("about:blank");
      w.location.href = url;
    },
    /**
     * 点击分页
     */
    handleCurrentChange(current) {
      this.pageNum = current;
      this.goodsReport();
    },
    /**
     * 加载登入报表数据
     */
    async goodsReport(uid) {
      uid = this.$store.state.userInfo.uid;
      const { data: res } = await this.$http.get(
        "goods/statisticsGoods" +
          "?uid=" +
          uid +
          "&pageNum=" +
          this.pageNum +
          "&pageSize=8"
      );
      this.total = res.data.total;
      if (!res.success) {
        return this.$message.error(res.msg);
      } else {
        const $this = this;
        this.xData = [];
        this.yData = [];
        this.myData = [];
        res.data.data.forEach((e1) => {
          $this.xData.push(e1.goodsName);
          $this.yData.push(e1.amount);
        });
      }
      if (this.xData.length != 0 || this.xData == undefined) {
        $("#goodsReport").removeAttr("_echarts_instance_");
        this.draw();
      } else {
        var html =
          '<div><sapn style="font-size: 16px;font-weight: bold;">用户登录统计</sapn><span  style="position: absolute;top: 50%;left: 40%;color:#999; font-size: 20px;">暂无数据</span></div>';
        $("#goodsReport").html(html);
        $("#goodsReport").removeAttr("_echarts_instance_");
        // this.drawForNone();
      }
    },

    /**
     * 绘制登入报表
     */
    draw() {
      let myChart = echarts.init(document.getElementById("goodsReport"));
      // 指定图表的配置项和数据;
      let option = {
        title: {
          text: "已登记物品统计",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            magicType: { type: ["bar", "line"] }, ///　　折线  直方图切换
            saveAsImage: {}, // 导出图片
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#eee",
            },
          },
        },
        xAxis: {
          name: "物品",
          data: this.xData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            formatter: function (params) {
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 7; // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ""; // 表示每一次截取的字符串
                  var start = p * provideNumber; // 开始截取的位置
                  var end = start + provideNumber; // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr; // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName;
            },
          },
        },
        yAxis: {
          name: "数量",
          type: "value",
        },
        // 条形数
        series: [
          {
            name: "全部",
            data: this.yData,
            type: "bar",
            showBackground: true,
            animationDuration: 1500,
            animationEasing: "cubicInOut",
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(30, 144, 255，0.5)",
            },
          },
        ],
      };

      const optionForNone = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#65ABE7",
            fontWeight: "normal",
            fontSize: 16,
          },
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    drawForNone() {
      let myChart = echarts.init(document.getElementById("goodsReport"));
      // 指定图表的配置项和数据;
      let option = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#65ABE7",
            fontWeight: "normal",
            fontSize: 16,
          },
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },

  created() {
    this.userInfo = this.$store.state.userInfo;
    const roles = this.userInfo.type == 0 ? "普通用户" : "系统管理员";
    this.tableInfo.push({
      username: this.userInfo.username,
      nickname: this.userInfo.nickname,
      realName: this.userInfo.realName,
      roles: roles,
    });
  },
  mounted: function () {
    this.goodsReport();
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  /* background-image: url("http://myforum.oss-cn-beijing.aliyuncs.com/postImages/1582867606734617c9668-8086-4c9b-867e-efda0bff78d63.png?Expires=1677475607&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=3xKM18EXDDD%2BQmsg%2B0t7uDC%2FMGg%3D"); */
  background-size: 100% 100%;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  /* background-image: url("http://myforum.oss-cn-beijing.aliyuncs.com/postImages/15828676585536f809b01-a5c3-4229-8ce6-ed29a7bdaaa22.png?Expires=1677475658&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=k2fJfFzwKwp7f2c%2BRD7rdH%2FAj%2Bs%3D"); */
  background-size: 100% 100%;
}
</style>
