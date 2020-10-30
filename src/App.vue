<template>
  <div>
    <router-view></router-view>
  </div>


<!--  <Test></Test>-->
</template>


<script>
  // 导入组件
  import Login from "./components/Login"
  import Test from "./test/Test"

  export default {
    name: 'app',
      data() {
        return{

        }
      },
    components: {
      Login,
      Test,
    },

  }
</script>
<!-- 样式代码 -->
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

<style scoped>
.container{
  margin: 30px auto;
}
</style>
