<template>
  <div class="login">
    <div class="center-block">
      <p class="title">移动通信基站电磁辐射监测系统</p>
      <p class="input-username-container small">
        <input v-model="userData.userName" placeholder="用户名"/>
      </p>
      <p class="input-password-container small">
        <input v-model="userData.password" type="password" placeholder="密码"/>
      </p>
      <p class="input-button-container small">
        <button @click="login">登录</button>
      </p>
    </div>

  </div>

</template>

<script>

  import Loading from "./Loading"
  import Center from "./Center"
  import {mapState} from "vuex"

  export default {
    components: {
      Loading,
      Center
    },
    data: function () {
      return {
        userData: {
          userName: "",
          password: "",
          checkCode: ""
        },
        isLoading: false,
        isNullFlag: false,
        loginFlag: false,
        pwdFlag: false,
        userIDFlag: false,
        timer: "",

      }
    },
    // created() {
    //
    //   if (localStorage.getItem("username")) {
    //     this.formData.username = localStorage.getItem("username");
    //     this.formData.password = localStorage.getItem("password");
    //   }
    // },
    computed: {
      ...mapState([
        "userInfo",
      ]),
    },
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
        this.isLoading = true;
        if (this.userData.userName.length === 0 || this.userData.password.length === 0) {
          this.isNullFlag = true;
        } else {
          for (var item of this.userInfo) {
            if (item.userName === this.userData.userName) {
              if (item.pwd === this.userData.password) {
                this.timer = setTimeout(() => {   //设置延迟执行
                  this.isLoading = false;
                }, 2000);
                this.loginFlag = true;
                this.$alert("欢迎回来，Mr." + this.userData.userName);
                this.$router.push('/Home');
                break;
              } else {
                this.pwdFlag = true;
              }
            } else {
              this.userIDFlag = true;
            }
          }
        }
        if (this.loginFlag) {
          console.log("登录成功")
        } else {
          if (this.isNullFlag) {
            this.$alert("用户名和密码不能为空");
          } else {
            if (this.pwdFlag) {
              this.$alert("密码错误");
              console.log("密码错误")
            } else {
              this.$alert("用户名错误");
              console.log("用户名错误")
            }
          }

        }
        this.isLoading = false
      },

    },
    watch: {
      userData: {
        handler() {
          this.isNullFlag = false;
          this.loginFlag = false;
          this.pwdFlag = false;
        },
        deep:true
      }

    }
  }
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
