<template>
 <div>
   <el-container style="height: 100%; border: 1px solid #eee">
     <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
       <el-menu :default-openeds="['1']">
         <el-submenu index="1">
           <template slot="title"><i class="el-icon-menu"></i>待办事项</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item index="/Task" @click="setMenuClicked()">选项1</el-menu-item>
             <el-menu-item index="1-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="1-4">
             <template slot="title">选项4</template>
             <el-menu-item index="1-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
         <el-submenu index="2">
           <template slot="title"><i class="el-icon-menu"></i>仪器管理</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item index="/instrument" @click="setMenuClicked()">选项1</el-menu-item>
             <el-menu-item index="2-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="2-4">
             <template slot="title">选项4</template>
             <el-menu-item index="2-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
         <el-submenu index="3">
           <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item ndex="/order" @click="setMenuClicked(true)">选项1</el-menu-item>
             <el-menu-item index="3-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="3-4">
             <template slot="title">选项4</template>
             <el-menu-item index="3-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
         <el-submenu index="4">
           <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item index="/user" @click="setMenuClicked(true)">选项1</el-menu-item>
             <el-menu-item index="4-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="4-4">
             <template slot="title">选项4</template>
             <el-menu-item index="4-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
       </el-menu>
     </el-aside>
     <el-container>
       <el-header >
         <el-dropdown szie="mini" placement="bottom-start" trigger="click">
           <span class="el-dropdown"><img class="user-pic" src="../assets/logo.png" ></span>
           <el-dropdown-menu class="for-user" slot="dropdown">
             <el-dropdown-item >个人中心</el-dropdown-item>
             <el-dropdown-item >修改密码</el-dropdown-item>
             <el-dropdown-item @click="exit">退出</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
       </el-header>
     </el-container>
     <router-view></router-view>
   </el-container>

 </div>

</template>

<script>

  export default {
    name: "Home",

    components: {
    },
    methods: {
      exit() {

      },
      setMenuClicked() {
        console.log(this.$route.fullPath.split("/"))
        // this.$router.push("/Home/"+index)
      }
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    width: 1235px;
    text-align: right;
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
