<template>
  <el-container class="home-container">
    <!-- 导航-->
    <el-header>
      <div>
        <span style="margin-left: 20px">
          <img
            src="../assets/logo2.png"
            width="250px;"
            style="margin-left: -10px"
            height="100%;"
            alt
            srcset
          />
        </span>
      </div>
      <el-dropdown>
        <div
          class="block"
          style="cursor: pointer; display: flex; align-items: center"
        >
          <!-- style="position: absolute; right: 99px; top: 5px" -->
          <el-avatar
            :size="45"
            :src="'http://8.142.42.56/' + this.userInfo.avatar"
          ></el-avatar>
          <span style="margin-left: 10px">
            <span style="color: #bbc1ce">{{ this.userInfo.nickname }}</span>
            <i
              class="el-icon-arrow-down"
              style="font-size: 18px; margin-left: 5px"
            ></i>
          </span>
        </div>

        <el-dropdown-menu slot="dropdown" trigger="click">
          <el-dropdown-item>
            <span type="danger" @click="toWelcome"
              ><span class="el-icon-house"></span> &nbsp;系统首页</span
            >
          </el-dropdown-item>
          <el-dropdown-item>
            <span type="danger" @click="toPersonCenter"
              ><span class="el-icon-user"></span> &nbsp;个人中心</span
            >
          </el-dropdown-item>
          <el-dropdown-item>
            <span type="danger" style="color: red" @click="logout"
              ><span class="el-icon-switch-button"></span> &nbsp;退出登入</span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!--主体-->
    <el-container style="height: 500px">
      <!--菜单-->
      <el-aside :width="isOpen === true ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleMenu" style="font-size: 19px">
          <i
            style="color: #ccc"
            :class="!isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          ></i>
        </div>
        <div
          id="menuLabel"
          style="color: rgba(255, 255, 255, 0.7); border: none; height: 50px"
        >
          <span
            style="
              height: 50px;
              line-height: 65px;
              margin-left: 15px;
              font-weight: bold;
              overflow: hidden;
            "
            >应用中心</span
          >
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isOpen"
          :router="true"
          :default-active="this.$route.path"
          background-color="#00284e"
          :collapse-transition="false"
          text-color="rgba(255,255,255,0.7)"
          unique-opened
          style="border: none"
        >
          <!-- 普通用户导航 -->
          <el-menu-item index="/home" v-if="type == 0">
            <i class="el-icon-user"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/goods/register" v-if="type == 0">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">物品登记</span>
          </el-menu-item>
          <el-menu-item index="/goods/donation" v-if="type == 0">
            <i class="el-icon-goods"></i>
            <span slot="title">物品捐赠</span>
          </el-menu-item>
          <el-menu-item index="/goods/record" v-if="type == 0">
            <i class="el-icon-view"></i>
            <span slot="title">捐赠记录</span>
          </el-menu-item>

          <!-- 管理员用户导航 -->
          <!-- 普通用户导航 -->
          <el-menu-item index="/admin/home" v-if="type == 1">
            <i class="el-icon-user"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1" v-if="type == 1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>业务管理</span>
            </template>
            <!-- <el-menu-item index="#1"
              ><i class="el-icon-s-data"></i><span>物资统计</span></el-menu-item
            > -->
            <el-menu-item index="/admin/goods/audit"
              ><i class="el-icon-folder-checked"></i
              ><span>物品审核</span></el-menu-item
            >
            <el-menu-item index="/admin/goods/donationInfo"
              ><i class="el-icon-chat-line-square"></i
              ><span>捐赠信息</span></el-menu-item
            >
            <el-menu-item index="#4"
              ><i class="el-icon-chat-line-square"></i
              ><span>领取信息</span></el-menu-item
            >
            <el-menu-item index="#5"
              ><i class="el-icon-chat-line-square"></i
              ><span>需求信息</span></el-menu-item
            >
            <el-menu-item index="#6"
              ><i class="el-icon-chat-line-square"></i
              ><span>退还管理</span></el-menu-item
            >
            <el-menu-item index="#7"
              ><i class="el-icon-chat-line-square"></i
              ><span>回收管理</span></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2" v-if="type == 1">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>物品管理</span>
            </template>
            <el-menu-item index="#1"
              ><i class="el-icon-s-data"></i><span>旧物展示</span></el-menu-item
            >
            <el-menu-item index="#2"
              ><i class="el-icon-folder-checked"></i
              ><span>物品分类</span></el-menu-item
            >
            <el-menu-item index="#4"
              ><i class="el-icon-chat-line-square"></i
              ><span>需求信息</span></el-menu-item
            >
            <el-menu-item index="#5"
              ><i class="el-icon-chat-line-square"></i
              ><span>领取信息</span></el-menu-item
            >
            <el-menu-item index="#3"
              ><i class="el-icon-chat-line-square"></i
              ><span>需求信息</span></el-menu-item
            >
            <el-menu-item index="#6"
              ><i class="el-icon-chat-line-square"></i
              ><span>退还管理</span></el-menu-item
            >
            <el-menu-item index="#7"
              ><i class="el-icon-chat-line-square"></i
              ><span>回收管理</span></el-menu-item
            >
          </el-submenu>
          <el-submenu index="3" v-if="type == 1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="#1"
              ><i class="el-icon-star-off"></i
              ><span>控制面板</span></el-menu-item
            >
            <el-menu-item index="#2"
              ><i class="el-icon-user"></i><span>用户管理</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--右边主体-->
      <el-main v-loading="loading">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      isOpen: false,
      menuList: {},
      userInfo: {},
      type: 0, //用户类型(0 普通用户 1 管理员用户)
    };
  },
  components: {},
  methods: {
    /**
     *
     * 退出登入
     */
    async logout() {
      const res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        console.log(this.$store.state.userInfo);
        this.$message({
          type: "info",
          message: "已取消退出登入",
          duration: 2000,
        });
      });
      if (res === "confirm") {
        localStorage.clear();
        this.$message({
          type: "success",
          message: "已成功退出系统",
          duration: 2000,
        });
        await this.$router.push("/login");
      }
    },
    /**
     * 去系统首页
     */
    toWelcome() {
      let type = this.userInfo.type;
      if (type == 0) {
        this.$router.push("/home");
      } else if (type == 1) {
        this.$router.push("/admin/home");
      }
    },
    /**
    获取用户信息
    */
    async getUserInfo() {
      this.userInfo = this.$store.state.userInfo;
      this.type = this.userInfo.type;
    },
    /**
     * 菜单伸缩
     */
    toggleMenu() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        $("#menuLabel").css("height", "10px");
      } else {
        $("#menuLabel").css("height", "50px");
      }
    },
    /**
     * 点击交流
     */
    toPersonCenter() {
      // const w = window.open("about:blank");
      // w.location.href = "https://www.zykcoderman.xyz/";
      let routerUrl = this.$router.resolve({ path: "/personCenter" });
      window.open(routerUrl.href, "_blank");
    },
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>

<style scoped lang="scss">
/* 为对应的路由跳转时设置动画效果 */

.el-header {
  /* background-color: #001529; */
  background-color: #00284e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 19px;
  padding-left: 0px;
}
.el-aside {
  background-color: #00284e;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  width: 100%;
  height: 100% !important;
}
.toggle-btn {
  /* background-color: #2d8cf0 !important; */
  background-color: #2d8bf081 !important;
  /* background-color: #00927ca1 !important; */
  /* background-color: #42424280 !important; */
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
/deep/ .el-avatar > img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
