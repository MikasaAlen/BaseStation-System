<template>
  <el-dialog
    :visible="visible"
    :center="true"
    class="test-data"
    @close="$emit('close')"
    width="100%"
  >
    <div class="body" style="position: relative; margin-top: 10px;">
      <div class="left">
        <p class="test-data-view-control">
          <span :class="{ active: mapType === 0 }" @click="mapType = 0">地图模式</span>
          <span :class="{ active: mapType === 4 }" @click="mapType = 4">点位图</span>
          <span :class="{ active: mapType === 2 }" @click="mapType = 2">照片</span>
          <span :class="{ active: mapType === 3 }" @click="mapType = 3">手绘地图</span>
        </p>
        <div v-if="mapType === 0">
          <TestTaskMap/>
        </div>
        <div class="test-data-view-draw-map" v-show="mapType === 2">
<!--          <img :src="baseStationPhoto" width="100%" height="350px"/>-->
        </div>
<!--        <DrawMap ref="drawMap" v-show="mapType === 3"/>-->
        <div class="test-task-map" v-show="mapType === 4">
<!--          <img :src="mapPictureResponse" height="100%"/>-->
        </div>
      </div>
      <div class="right">
        <!-- 填写检测数据的地方 -->
        <TestTaskDataInput ref="testTaskDataInput" />
      </div>
    </div>
    <div slot="footer">
      <el-button type="success" round @click="">保存</el-button>
      <el-button type="success" round @click="submitData">提交数据</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import  TestTaskDataInput from "./TestTaskDataInput"
  import  TestTaskMap from "./TestTaskMap"
  import {mapState} from "vuex"

  export default {
    components: {
      TestTaskDataInput,
      TestTaskMap
    },
    props: ["visible"],
    data() {
      return {
        mapType: 0,
      };
    },
    methods: {
      submitData() {
        console.log(this.taskInfo)
       this.$message({
         message:"上传成功",
         type:"success"
       })
        this.visible = false
      },
    },
    watch: {

    },
    computed:{
      ...mapState([
        "taskInfo"
      ])
    }

  }
</script>

<style lang='scss' scoped>
  .test-data {
    max-width: 1366px;
    margin: auto;
    &.pad {
      margin-top: 10px !important;

      .el-dialog__header {
        padding: 8px 20px !important;

        .el-dialog__headerbtn {
          top: 20px;
        }
      }
    }

    .el-dialog__footer {
      padding: 5px 10px;
    }

    .body {
      .el-form {
        width: 350px;
        margin-top: 20px;

        input {
          background: #f9f9f9;
        }

        .el-form-item {
          margin-bottom: 5px;
        }
      }

      font-size: 16px;
      height: 600px;
      background-color: #ffffff;
      border-bottom: 1px solid #eeeeee;

      .left {
        width: 50%;
        height: 100%;
        float: left;
        padding: 5px;
        background-color: #ffffff;

        .test-data-view-control {
          line-height: 30px;
          margin: 5px 0;

          span {
            margin-right: 10px;

            &.active {
              color: #2ecc71;
              font-weight: bold;
            }
          }
        }

        #test-data-map {
          width: 100%;
          height: calc(100% - 30px);
        }

        .test-data-view-map-picture {
          height: 350px;
          background-color: grey;
        }

        .test-data-view-draw-map {
          height: 350px;
          background-color: grey;
        }
      }

      .right {
        width: 45%;
        height: 100%;
        float: left;
        background-color: #ffffff;

        .point-list {
          width: 80px;
          height: 100%;
          float: left;
          background-color: #f6fcf8;

          p {
            background-color: #f6fcf8;
            margin: 0;
            height: 45px;
            line-height: 45px;
            text-align: center;

            &.active {
              background-color: #ffffff;
            }
          }
        }

        .point-detail {
          width: calc(100% - 80px);
          height: 100%;
          float: left;
          position: relative;

          .computed-value {
            padding-left: 10px;

            span {
              &:first-child {
                margin-right: 10px;
              }

              &:last-child {
                color: #42c661;
              }

              &.danger {
                color: red;
              }
            }
          }

          .el-form-item__content {
            position: relative;

            .unit {
              position: absolute;
              right: 35px;
            }
          }

          .button-group {
            margin: 0;
            position: absolute;
            width: 100%;
            text-align: right;
            padding-right: 10px;
            bottom: 10px;
          }

          .button-group-top-right {
            margin: 0;
            position: absolute;
            width: 100%;
            text-align: right;
            padding-right: 10px;
            top: 10px;
          }
        }

        .frequency-test-detail {
          width: calc(100% - 80px);
          height: 100%;
          float: left;
          position: relative;

          .side-bar {
            width: 80px;
            float: left;
            height: 100%;
            background-color: #f6fcf8;

            p {
              background-color: #f6fcf8;
              margin: 0;
              height: 45px;
              line-height: 45px;
              text-align: center;

              &.active {
                background-color: #ffffff;
              }
            }
          }

          .content {
            width: calc(100% - 80px);
            padding: 10px;
            float: left;
            height: 100%;

            .el-form-item {
              width: 400px;
            }
          }

          &::after {
            content: "";
            clear: both;
            display: table;
          }
        }

        &::after {
          content: "";
          clear: both;
          display: table;
        }
      }

      &::after {
        content: "";
        display: table;
        clear: both;
      }
    }

    .el-dialog__body {
      padding: 0 !important;
    }

    .el-dialog {
      width: 300px;
      margin-top: calc(50vh - 348px) !important;
      margin-bottom: 0;
    }

    .area-selector {
      .el-input {
        width: 350px;
      }
    }

    .task-info {
      padding-left: 10px;

      .left,
      .right {
        display: inline-block;
        width: 50%;

        .label {
          color: rgb(176, 176, 176);
          margin-right: 10px;
        }
      }

      .right {
        text-align: right;
      }

      &:last-of-type {
        margin-bottom: 30px;
      }
    }

    .el-button--primary {
      width: 90px;
      height: 36px;
      box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      border-radius: 2px;
      margin-left: 0;
    }

    .el-dialog__body {
      padding: 20px 64px;
      font-size: 14px;

      label {
        width: 100%;
        display: inline-block;
        display: table;
        margin-bottom: 10px;

        .front {
          display: table-cell;
          color: #666666;
          width: 75px;
          margin-right: 20px;
          text-align: justify;
        }

        input {
          display: table-cell;
          width: 350px;
          height: 35px;
          outline-color: #18be9b;
          background-color: #f9f9f9;
          border-radius: 2px;
          border: solid 1px #e2e2e2;
          color: #333333;
          text-indent: 15px;
        }
      }

      .city {
        input {
          width: 170px;
        }
      }

      .area {
        margin-left: 10px;

        input {
          width: 170px;
        }
      }
    }
  }

  .el-message-box {
    .el-message-box__header {
      height: 50px;
      border-bottom: 2px solid #ebebeb;

      .el-message-box__title {
        font-size: 14px;
        padding-left: 10px;
        color: #666666;
        border-left: 5px solid #18be9b;
      }

      .el-message-box__headerbtn {
        top: 13px;
      }
    }

    .el-message-box__message p {
      text-align: center;
    }

    .el-icon-close:before {
      content: "";
    }
  }

  .confirm-button {
    div {
      margin-left: 0 !important;
      text-align: center !important;
    }
  }
</style>
