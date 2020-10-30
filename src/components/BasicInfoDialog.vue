<template>
  <div>
    <el-dialog
      :visible="visible"
      :center="true"
      class="test-task"
      @close="$emit('close')"
    >
      <el-form ref="form" :model="formData" label-width="110px" size="mini" style="margin-left: 10px">
        <div class="task-info" style="margin-left: 0">
          <div class="left">
            <span class="label">基站名称</span>
            <span></span>
          </div>
          <div class="right">
            <span class="label">基站编号</span>
            <span></span>
          </div>
        </div>
        <div class="task-info" style="margin-left: 0">
          <div class="left">
            <span class="label">基站位置</span>
            <span></span>
            <!-- <span>{{ baseStaAddress }}</span> -->
            <!-- <img src="../../assets/edit.png">
            <el-input v-model="baseStationInfo.bsAddress"></el-input>
                      <img src="../../assets/finish.png">-->
          </div>
          <div class="right">
            <span class="label">任务状态</span>
            <span></span>
          </div>
        </div>
        <el-form-item label="射频仪器" prop="deviceCode">
          <el-select v-model="formData.deviceCode" allow-create filterable>
            <el-option
              v-for="item in testDeviceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
<!--          <i class="scan-button" @click="scanQRCode" v-if="$isWebView"></i>-->
        </el-form-item>
        <el-form-item label="检测日期" prop="testTime">
          <el-date-picker
            v-model="formData.testTime"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy/MM/dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="检测时间" prop="startTime">
          <el-time-picker
            @change="setTestTime"
            is-range
            v-model="testTime"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm"
            class="time-picker"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="天气" prop="weather">
          <el-select v-model="formData.weather">
            <el-option
              v-for="item in options.weather"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="温度(°C)" prop="temperature">
          <el-input v-model="formData.temperature"></el-input>
        </el-form-item>
        <el-form-item label="湿度(%)" prop="humidity">
          <el-input v-model="formData.humidity"></el-input>
        </el-form-item>
        <el-form-item label="塔桅类型" prop="towerType">
          <el-select v-model="formData.towerType">
            <el-option
              v-for="item in towerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="baseStationInfo.bsAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="postscript">
          <el-input v-model="baseStationInfo.remark"></el-input>
        </el-form-item>
        <el-form-item label="天线离地面高度" prop="aerialHeight">
          <el-input v-model="formData.aerialHeight" type="number"></el-input>
        </el-form-item>

        <el-form-item label="检测依据" prop="testingBase">
          <el-select v-model="testingBase" multiple :collapse-tags="true" size="medium"
                     :popper-append-to-body="false"
                     popper-class="selectinfo"
          >
            <el-option
              style="width: 450px"
              v-for="(item,index) in testingBaseList"
              :key="index"
              :label="item.label"
              :value="item.value"

            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网络制式类型" prop="netType">
          <el-input v-model="formData.netType" type="text"></el-input>
        </el-form-item>
        <el-form-item label="发射频率范围" prop="frequencyRange">
          <el-input v-model="formData.frequencyRange" type="text"></el-input>
        </el-form-item>
        <el-form-item label="天线数量" prop="antennaNum">
          <el-input v-model="formData.antennaNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="运行状态" prop="status">
          <el-input v-model="formData.status" type="text" placeholder="正常">

          </el-input>
        </el-form-item>
        <el-form-item label="认证标志" prop="certificationFlag">
          <el-radio-group v-model="formData.certificationFlag">
            <el-radio :label="true">资质认定</el-radio>
            <el-radio :label="false">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="confirm-button" size="large">
<!--          <el-button-->
<!--            v-show="$isWebView"-->
<!--            type="primary"-->
<!--            @click="takePhoto"-->
<!--          >{{ flag.hasPhoto ? '重拍基站' : '拍摄基站' }}-->
<!--          </el-button>-->
<!--          <el-upload-->
<!--            :action="$serverAddress + '/rest/detectionData/savePicture?type=picture&jzbh=' + data.jzbh"-->
<!--            v-show="!$isWebView"-->
<!--            :auto-upload="true"-->
<!--            :on-success="uploadPhotoSuccess"-->
<!--            style="display: inline-block; position: relative; top: -3px;"-->
<!--            :show-file-list="false"-->
<!--          >-->
<!--            <el-button size="small" type="primary">上传照片</el-button>-->
<!--          </el-upload>-->
          <el-button
            type="primary"
            @click="next"
            :loading="!flag.photoFinished"
            :disabled="!flag.photoFinished"
          >下一步
          </el-button>
           <el-button type="primary" @click="$emit('close')">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    props: ["visible"],
    data() {
      return {
        jzid: "",
        radio:"",
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
          ],
        },
        towerTypeList: [
          {
            label: "拉线杆塔",
            value: "拉线杆塔"
          },
          {
            label: "拉线角钢塔",
            value: "拉线角钢塔"
          },
          {
            label: "围拢",
            value: "围拢"
          },
          {
            label: "简易杆塔",
            value: "简易杆塔"
          },
          {
            label: "自立铁塔",
            value: "自立铁塔"
          }
        ],
        testDeviceList:[
          {
            label:"GF-2-1-2013",
            value:"GF-2-1-2013",
          },
          {
            label:"GF-2-10-2-18",
            value:"GF-2-10-2-18",
          },
          {
            label:"GF-2-11-2018",
            value:"GF-2-11-2018",
          },
          {
            label:"GF-2-12-2018",
            value:"GF-2-12-2018",
          },
        ],
        testingBaseList:[
          {
            label:"检测依据一",
            value:"检测依据一",
          },
          {
            label:"检测依据二",
            value:"检测依据二",
          }
        ],
        formData: {
          deviceCode: "",
          testTime: new Date(),
          startTime: new Date().toISOString(),
          endTime: new Date(
            new Date().getTime() + 15 * 60 * 1000
          ).toISOString(),
          weather: "",
          temperature: "",
          humidity: "",
          towerType: "",
          aerialHeight: "",
          testingBase: [],
          netType: "",
          frequencyRange: "",
          antennaNum: "",
          status: "",
          certificationFlag: false,
        },
        testTime: [
          new Date(),
          new Date(new Date().getTime() + 15 * 60 * 1000)
        ],
        baseStationInfo:[
          {
            bsAddress:"浙大城院",
            remark:"正常",
          }

        ],
        flag: {
          hasPhoto: false,
          photoFinished: true
        },



      };
    },
    methods: {

      checkInfo() {
        if(this.BaseStationInfo.length!==0 && this.radio!=="") {
          let baseStationId = this.BaseStationInfo[this.radio].jzid;
          this.$http({
            url: "/rest/detectionData/getDetectionData",
            method: "get",
            params: {
              bsId: baseStationId
            },
          })
            .then(res => {

              if (res.status == 200) {
                var data = res.data
                this.$emit("beginTask",data)

              }
            })
            .catch(error => {
              this.$errDialog(error.response.data.msg + "!");
            });
        }else {
          this.$emit("beginTask")

        }
      },
      setTestTime() {
        console.log(Date.now())
      },
      next() {

      },
      radioClick(index) {
        index === this.radio ? this.radio="":this.radio = index
      },

    },
    watch: {
      // "needData.taskId": function () {
      //   this.radio = "";
      //   this.$emit("reSetBaseStationInfo")
      // }
    }

  }
</script>

<style lang="scss">

  .test-task {
    .el-form-item {
      margin-bottom: -5px;

      .el-radio-group {
        width: 200px;
        height: 38px;
        line-height: 38px;

        .el-radio {
          width: auto;
          display: inline-block;
          margin-bottom: 0;
        }
      }
    }

    .el-input {
      width: 200px;
    }

    .el-select__tags {
      overflow: hidden;

      span {
        font-size: 8px;
        margin: 0;
        padding: 0;
        line-height: 8px;
        height: 15px;
        margin-left: 5px;
      }
    }

    .time-picker {
      width: 200px;
      // input {
      // 	padding-right: 5px;
      // }
    }

    .scan-button {
      display: inline-block;
      position: absolute;
      right: 70px;
      top: 5px;
    }

    .el-dialog {
      width: 100%;
      max-width: 1366px;
      margin-top: calc(50vh - 341px) !important;
      margin-bottom: 0;

      .el-dialog__body {
        padding: 10px;
      }

      .el-form-item {
        display: inline-block;
        width: 30%;

        &.confirm-button {
          width: 100%;
        }
      }
    }

    &.pad {
      .el-dialog {
        margin-top: 55px !important;
      }
    }

    .area-selector {
      .el-input {
        width: 350px;
      }
    }

    .task-info {
      padding: 0 10px;
      margin: 0 5px;

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
        margin-bottom: 10px;
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
      font-size: 14px;
      padding: 10px 20px;

      .confirm-button {
        .el-button {
          margin-right: 5px;
        }

        margin-bottom: 0;
      }

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
  .selectinfo {

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
