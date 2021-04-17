<template>
  <div id="app">
    <router-view></router-view>
<!--    <test></test>-->
  </div>


<!--  <Test></Test>-->
</template>


<script>
  // 导入组件
  import Login from "./components/Login"
  // import Test from "./test/Test"

  export default {
    name: 'app',
      data() {
        return{

        }
      },
    components: {
      Login

    },

  }
</script>
<!-- 样式代码 -->
<style>
  html body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<!--<style scoped>-->

<!--.container{-->
<!--  margin: 30px auto;-->
<!--}-->
<!--</style>-->
