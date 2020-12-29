<template>
  <div class="test-task-data-input">
    <!-- 当没有一个检测点位时 -->
    <div v-show="testPoints.length === 0" class="test-task-data-input-no-point">
      <div class="test-task-data-input-no-point-center">
        <div class="test-task-data-input-no-point-center-picture"></div>
        <el-button type="success" @click="confirmBeforeAdd">添加点位</el-button>
      </div>
    </div>
    <!-- 当至少有一个检测点位时 -->
    <div class="test-task-data-input-has-point" v-show="testPoints.length !== 0">
      <!-- 切换检测点位 -->
      <div class="test-point-menu">
        <p
          v-for="item in testPoints"
          :key="item.code"
          :class="{ active: currentTestPoint.code === item.code }"
          @click="toggleTestPoint(item.code)"
        >{{ '点位' + item.code }}</p>
      </div>

      <!-- 填写检测点位数据 -->
      <div class="test-point-content" v-show="!flag.showFrequencyTest">
        <el-form
          v-if="currentTestPoint"
          :model="currentTestPoint"
          ref="form"
          label-width="80px"
          :inline-message="true"
        >
          <el-form-item label="点位描述" prop="name" style="width:90%">
            <el-input v-model="currentTestPoint.description" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="VD" prop="vd">
            <el-input v-model="currentTestPoint.vd" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="HD" prop="hd">
            <el-input v-model="currentTestPoint.hd" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="值1" prop="name">
            <el-input v-model="currentTestPoint.value1" @input="compute" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="值2" prop="name">
            <el-input v-model="currentTestPoint.value2" @input="compute" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="值3" prop="name">
            <el-input v-model="currentTestPoint.value3" @input="compute" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="值4" prop="name">
            <el-input v-model="currentTestPoint.value4" @input="compute" type="number" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="值5" prop="name">
            <el-input v-model="currentTestPoint.value5" @input="compute" type="number" placeholder="请输入"/>
          </el-form-item>
        </el-form>
        <div v-if="currentTestPoint">
          <div class="computed-data-container">
            <p>
              <span>场强</span>
              <span
                :class="{active: currentTestPoint.fieldStrength > 5.4}"
              >{{ currentTestPoint.fieldStrength | computeResultFilter('v/m')}}</span>
            </p>
            <p>
              <span>标准差</span>
              <span>{{ currentTestPoint.standardDev | computeResultFilter('v/m')}}</span>
            </p>
            <p>
              <span>功率密度</span>
              <span>{{  currentTestPoint.powerDensity=== 0 ? "< 0.01" : currentTestPoint.powerDensity | computeResultFilter('μw/cm²') }}</span>
            </p>
          </div>
          <div class="el-button-group">
            <el-button type="success" @click="validate" :disabled="!canValidate">确定</el-button>
            <el-button type="danger" @click="deleteTestPoint">删除点位</el-button>
            <el-button type="success" @click="confirmBeforeAdd" :disabled="!canAddTestPoint">添加点位
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import calculation from "../utils/calculation"
  import {mapState,mapMutations} from "vuex"
  export default {
    data() {
      return {
        testPoints: [

        ],
        currentTestPoint: {
        },
        options: {
          weather: [
            {
              label: "晴",
              value: "晴"
            },
            {
              label: "多云",
              value: "多云"
            },
            {
              label: "阴",
              value: "阴"
            },
            {
              label: "雨",
              value: "雨"
            },
            {
              label: "雪",
              value: "雪"
            }
          ]
        },
        flag: {
          showFrequencyTest: false,
          showFrequencyTestStep: 1, // 0:展示检测数据， 1:展示频段基础信息， 2:频段数据
          currentFrequencyTestIndex: 0, // 当前频段检测点位的位置
          disableTestDataForm: true, // 禁用频段检测中的检测数据表格
          disableBasicInfoForm: true, // 禁用频段检测中的基础信息表格
          disableFrequencyDataForm: true // 禁用频段检测中的频段检测表格
        },
        currentFrequencyTest: {} // 当前频段检测数据
      }
    },
    computed: {
      // canViewFrequencyTest() {
      //   if (this.currentTestPoint.frequencyDetection) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      ...mapState([
        "taskInfo",
        "testPoint"
      ]),
      canValidate() {
        const {fieldStrength, standardDev} = this.currentTestPoint;
        if (fieldStrength && standardDev !== "") return true;
        else return false;
      },
      canAddTestPoint() {
        let canAddTestPoint = true;
        let testPoints = this.testPoints;

        for (let i = 0; i < testPoints.length; i++) {
          if (
            !testPoints[i].description ||
            !testPoints[i].value1 ||
            !testPoints[i].value2 ||
            !testPoints[i].value3 ||
            !testPoints[i].value4 ||
            !testPoints[i].value5
          ) {
            canAddTestPoint = false;
            break;
          }
        }
        // let testTaskMap = this.$parent.$parent.$refs.testTaskMap;
        // testTaskMap.flag.canAddTestPoint = canAddTestPoint;
        return canAddTestPoint;
      }
    },
    methods: {
      ...mapMutations([
        "addTaskInfo"
      ]),
      confirmBeforeAdd() {

      },
      toggleTestPoint(code) {
        for(var item in this.testPoints) {
          if(this.testPoints[item].code === code) {
            this.currentTestPoint = this.testPoints[item]
            this.compute()
          }
        }
      },
      deleteTestPoint() {

      },
      // 场强计算
      compute() {

        let currentTestPoint = this.currentTestPoint;
        let value1 = parseFloat(currentTestPoint.value1);
        let value2 = parseFloat(currentTestPoint.value2);
        let value3 = parseFloat(currentTestPoint.value3);
        let value4 = parseFloat(currentTestPoint.value4);
        let value5 = parseFloat(currentTestPoint.value5);
        if (
          value1 !== undefined &&
          value2 !== undefined &&
          value3 !== undefined &&
          value4 !== undefined &&
          value5 !== undefined
        ) {
          currentTestPoint.fieldStrength = calculation.keepDigits(
            (value1 + value2 + value3 + value4 + value5) / 5
          );


          currentTestPoint.standardDev = calculation.keepDigits(
            calculation.computeStandardDev(
              value1,
              value2,
              value3,
              value4,
              value5
            )
          );


          currentTestPoint.powerDensity =
            Math.round(
              (Math.pow(currentTestPoint.fieldStrength, 2) / 377) *
              100 *
              100
            ) / 100;

        }
      },
      validate() {
        const {standardDev, fieldStrength} = this.currentTestPoint;
        if (standardDev / fieldStrength > 0.4 || fieldStrength >= 5.4) {
          // this.$errDialog("可能存在异常数据");
          this.$message({
            type:"warning",
            message:"可能存在异常数据"
          })
        } else {
          this.$message({
            type:"success",
            message:"数据正常"
          });
        }
        var params={
          pointList :this.currentTestPoint
        }
        this.addTaskInfo(params)
      },
    },
    mounted() {
      this.testPoints = this.testPoint
    },
  }
</script>
<style lang='scss' scoped>

  .test-task-data-input {
    .scan-button {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .computed-data-container {
      padding: 0 10px;
      margin: 10px 0;

      p {
        display: inline-block;
        width: 25%;
        font-size: 14px;

        &:last-child {
          width: 40%;
        }

        span:first-child {
          margin-left: 20px;
          margin-right: 5px;
          font-weight: bold;
        }

        .active {
          color: red;
        }
      }
    }

    .el-button-group {
      width: 100%;
      padding-left: 10px;

      .el-button {
        margin-right: 5px;
      }
    }

    height: 100%;

    .test-task-data-input-no-point {
      height: 80%;
      padding-top: 25%;
      background-color: #f5fff7;

      .test-task-data-input-no-point-center {
        width: 100px;
        height: 160px;
        margin: auto;

        .test-task-data-input-no-point-center-picture {
          width: 100%;
          height: 100px;
          background-size: 100px 100px;
          margin-bottom: 20px;
        }
      }
    }

    .test-task-data-input-has-point {
      height: 100%;

      .test-point-menu {
        float: left;
        width: 50px;
        height: 100%;
        overflow-y: auto;
        background-color: #dff4e6;
        font-size: 14px;

        p {
          margin: 0;
          line-height: 40px;
          text-align: center;
          background-color: #dff4e6;

          &.active {
            background-color: #f6fcf8;
          }
        }
      }

      .test-point-content {
        padding-top: 20px;
        float: left;
        height: 100%;
        width: calc(100% - 50px);

        .el-form {
          width: 100%;
        }

        .el-form-item {
          display: inline-block;
          width: 45%;

          .el-input {
            width: 100%;
          }
        }
      }

      .frequency-test-content {
        float: left;
        height: 100%;
        width: calc(100% - 50px);

        .el-input {
          width: 100% !important;
        }

        .el-select {
          width: 100% !important;
        }

        .frequency-test-menu {
          float: left;
          width: 50px;
          height: 100%;
          overflow-y: auto;
          background-color: #f5fff9;
          font-size: 12px;

          p {
            margin: 0;
            line-height: 40px;
            text-align: center;
            background-color: #dff4e6;

            &.active {
              background-color: #f6fcf8;
            }
          }
        }

        .frequency-test-data {
          float: left;
          height: 100%;
          width: calc(100% - 50px);

          .frequency-test-data-step {
            .el-form {
              width: 100%;
            }

            .el-form-item {
              width: 45%;
              display: inline-block;

              .el-input {
                width: 100%;
              }

              .el-radio-group {
                width: 100%;
                height: 50px;
                line-height: 50px;

                .el-radio {
                  display: inline-block;
                  width: auto;

                  &:first-of-type {
                    margin-right: 5px;
                  }
                }
              }
            }

            .el-form-item-time-picker {
              display: block;

              .time-picker {
                width: 200px;
              }
            }

            padding-top: 20px;
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
  }
</style>
