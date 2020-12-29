<template>
  <div class="body">
    <el-container style="border: 1px solid #eee " >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="home-logo-container">
          <span >浙江国辐</span>
        </div>
        <el-menu :default-openeds="['1','3']"
        >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>待办事项</template>
            <el-menu-item-group>
              <el-menu-item index="/Task" @click="setMenuClicked('/Task')">选项1</el-menu-item>
              <el-menu-item index="/Task/2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="/Task/3">
              <template slot="title">选项3</template>
              <el-menu-item index="/Task/3-1">选项3-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>仪器管理</template>
            <el-menu-item-group>
              <el-menu-item index="/Instrument" @click="setMenuClicked('/Instrument')">选项1</el-menu-item>
              <el-menu-item index="/Instrument/2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="/Instrument/3">
              <template slot="title">选项3</template>
              <el-menu-item index="/Instrument/3-1">选项3-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="/Order" @click="setMenuClicked('/Order')">选项1</el-menu-item>
              <el-menu-item index="/Order/2" @click="setMenuClicked('/test')">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="/Order/3">
              <template slot="title">选项3</template>
              <el-menu-item index="/Order/3-1">选项3-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/User" @click="setMenuClicked('/User')">选项1</el-menu-item>
              <el-menu-item index="/User/2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="/User/3">
              <template slot="title">选项3</template>
              <el-menu-item index="/User/3-1">选项3-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header >
          <a class="block"  >
            Hello Mr.wu
            <i class="icon-down"></i>
          </a>
          <el-dropdown szie="mini" placement="bottom-start" trigger="click">
            <span class="el-dropdown"><img class="user-pic" src="../assets/images.jpeg" ></span>
            <el-dropdown-menu class="for-user" slot="dropdown">
              <el-dropdown-item @click.native="passwordChange(true)">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <router-view></router-view>
      </el-container>

      <update-password
        :visible="updatePWDVisible"
        @close="passwordChange(false)"
        @UpdatedPWD="NewPWD"
      />
    </el-container>
  </div>
</template>

<script>

  import UpdatePassword from "./UpdatePassword"

  export default {
    comments: {
      UpdatePassword,
    },
    data() {
      return {
        updatePWDVisible:false,
        password:"",
      }
    },
    components: {
      UpdatePassword
    },
    methods: {
      exit() {
        this.$router.push("/")
      },
      setMenuClicked(path) {

        if(this.$route.fullPath.split("/")[2]===path.split("/")[1]) {
          return
        }else {
          this.$router.push("/Home"+path)
        }
      },
      passwordChange(bool) {
        this.updatePWDVisible = bool
      },
      NewPWD(data) {
        this.password = data
        this.updatePWDVisible = false
      },
    },
  }
</script>

<style scoped>
  .body{
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    width: 1222px;
    text-align: right;
  }
  .home-logo-container {
    background-image: url("../assets/bgc.jpeg");
    display: flex;
    width: 100% !important;
    height: 60px;
    color: #ffffff;
    font-size: 20px;
    letter-spacing: 2px;
    justify-content: center;
    align-items: center;
  }
  .block {
    margin-right: 30px;
  }
  .el-aside {
    color: #333;
  }
  .el-dropdown {
    height: 60px;
  }
  .user-pic {
    height: 40px;
    padding-right: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
