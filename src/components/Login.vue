<template>
  <div class="login">
    <div class="center-block">
      <p class="title">移动通信基站电磁辐射监测系统</p>
      <p class="input-username-container small">
        <input v-model="formData.username" placeholder="用户名"/>
      </p>
      <p class="input-password-container small">
        <input v-model="formData.password" type="password" placeholder="密码"/>
      </p>
      <p class="input-button-container small">
        <button @click="login">登录</button>
      </p>
    </div>

    <Center>
      <Loading v-if="isLoading"/>
    </Center>
  </div>

</template>

<script>

  import Loading from "./Loading"
  import Center from "./Center"

  export default {
    components: {
      Loading,
      Center
    },
    data: function () {
      return {
        formData: {
          username: "",
          password: "",
          checkCode: ""
        },
        isLoading: false,
        timer: ""
      };
    },
    // created() {
    //
    //   if (localStorage.getItem("username")) {
    //     this.formData.username = localStorage.getItem("username");
    //     this.formData.password = localStorage.getItem("password");
    //   }
    // },
    methods: {

      login() {
        // this.$http({
        //   url: "/login",
        //   method: "post",
        //   data: qs.stringify(this.formData),
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   }
        // })
        //   .then(data => {
        //     if (data.statusText === "OK" || data.status === 200) {
        //       // 登录成功后保存密码与用户名
        //       const { username, password } = this.formData;
        //       localStorage.setItem("username", username);
        //       localStorage.setItem("password", password);
        //
        //       this.$router.push({ path: "/home" });
        //     } else {
        //       localStorage.clear();
        //     }
        //   })
        //   .catch(error => {
        //     this.$errDialog(error.response.data.msg + "!");
        //   });
        this.isLoading = true
        this.timer = setTimeout(() => {   //设置延迟执行
          this.isLoading = false
        }, 2000);
        this.$router.push('/Home')
      },

    },
  };
</script>

<style lang="scss" scoped>

  .login {
    padding-top: 20vh;
    background-image: url("../assets/login-background.png");
    background-size: 100% 100%;
    height: 610px;
    .center-block {
      width: 800px;
      height: 449px;
      margin: auto;
      // padding-top: 105px;
      text-align: center;
      position: relative;
      // @include bg("logo.png");
      // background-size: 100% 100%;
      // background-position: center 0;
      .title {
        margin: 0;
        margin-top: 20px;
        font-size: 48px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 5px;
        color: #ffffff;
      }

      input {
        border: none;
        outline: none;
        width: 100%;
        height: 40px;
        background: none;
        font-size: 18px;
        color: #ffffff;
        border-bottom: 1px solid #ffffff;

        &:focus {
          border: none !important;
          border-bottom: 1px solid #ffffff !important;
        }

        &:-webkit-autofill {
          background-color: red !important;
        }
      }

      input::-webkit-input-placeholder {
        color: #ffffff;
      }

      input::-moz-placeholder {
        color: #ffffff;
      }

      input:-ms-input-placeholder {
        color: #ffffff;
      }

      input:input-placeholder {
        color: #ffffff;
      }

      button {
        margin: auto;
        width: 100%;
        border: none;
        background: #18be9b;
        border-radius: 2px;
        height: 50px;
        color: #ffffff;
        font-size: 18px;
      }

      .small {
        width: 400px;
        margin: auto;
        margin-top: 30px;
      }

      .input-username-container {
        margin-top: 77px;
      }

      .input-password-container {
        margin-top: 35px;
      }

      .input-password-container {
        margin-top: 20px;
      }

      input:-webkit-autofill {
        padding-left: 10px;
      }
    }

    .el-form {
      margin: auto;
      width: 300px;

      .el-form-item__content {
        text-align: center;
      }
    }
  }
</style>
