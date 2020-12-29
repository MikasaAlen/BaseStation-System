<template>
  <div>
    <el-dialog
      title="基站信息"
      :visible="visible"
      center
      class="detailOrderDialog common-dialogTop"
      @close="$emit('close')"
    >
      <!--      <div class="header">-->
      <!--              <div class="title">基站信息</div>-->
      <!--              <div class="close" @click="dialogTableVisible = false">-->
      <!--                  <img src="../../assets/close.png">-->
      <!--              </div>-->
      <!--          </div> -->
      <div class="top-panel">
        <div class="left">
          <div>
            <span>基站编号</span>
            <div v-if="isEdit">
              <input type="text" v-model="stationInfo.baseStationNumber">
            </div>
            <div v-else>{{stationInfo.baseStationNumber}}</div>
          </div>
          <div>
            <span>基站名称</span>
            <div v-if="isEdit">
              <input type="text" v-model="stationInfo.baseStationName">
            </div>
            <div v-else>{{stationInfo.baseStationName}}</div>
          </div>
          <div>
            <span>所属地区</span>
            <div v-if="isEdit">
              <input type="text" v-model="stationInfo.area">
            </div>
            <div v-else>{{stationInfo.area}}</div>
          </div>
          <div>
            <span>建设地址</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.buildingAddress">
            </div>
            <div v-else>{{stationInfo.buildingAddress}}</div>
          </div>
          <div>
            <span>基站经度</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.longitude">
            </div>
            <div v-else>{{stationInfo.longitude}}</div>
          </div>
          <div>
            <span>基站纬度</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.latitude">
            </div>
            <div v-else>{{stationInfo.latitude}}</div>
          </div>
        </div>
        <div class="right">
          <div>
            <span>备案号</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.fileReport">
            </div>
            <div v-else>{{stationInfo.fileReport}}</div>
          </div>
          <div>
            <span>工程期数</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.projectPeriods">
            </div>
            <div v-else>{{stationInfo.projectPeriods}}</div>
          </div>
          <div>
            <span>塔桅类型</span>
            <div v-if="isEdit">
              <input type="text"  v-model="stationInfo.towerType">
            </div>
            <div v-else>{{stationInfo.towerType}}</div>
          </div>
          <div>
            <span>天线距地面高度</span>
            <div v-if="isEdit" sty>
              <input type="text"  v-model="stationInfo.aerialHeight">
            </div>
            <div v-else>{{stationInfo.aerialHeight}}</div>
          </div>
        </div>
      </div>
      <div class="bottom-panel">
        <div class="oneLine"></div>
        <div>
          <span>所属订单</span>
          <div>{{owningOrder}}</div>
        </div>
        <div>
          <span>检测人员</span>
          <div v-if="isEdit" sty>
            <input type="text"  v-model="inspector">
          </div>
          <div v-else>{{inspector}}</div>
        </div>
        <div>
          <span>基站状态</span>
          <!-- <div v-if="isEdit" sty>
                      <input type="text"  v-model="stationInfo.jzzt">
                  </div> -->
          <div>{{baseStationStatus}}</div>
        </div>
      </div>
      <div class="buttonArray" v-if="isEdit">
        <div>
          <button class="cancel" @click="cancel()">取消</button>
        </div>
        <div>
          <button class="edit" @click="sure()">确定</button>
        </div>
      </div>
      <div class="buttonArray" v-if="!isEdit ">
        <div>
          <button class="edit" @click="edit()">编辑</button>
        </div>
        <div>
          <button class="del" @click="del()">删除</button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {mapState, mapActions} from "vuex"
  export default {
    props:['visible','data'],
    data() {
      return {
        isEdit: false,
        stationInfo:
          {
            baseStationNumber:"",
            baseStationName:"",
            area:"",
            buildingAddress:"",
            longitude:"",
            latitude:"",
            fileReport:"",
            projectPeriods:"",
            towerType:"",
            aerialHeight:"",
          },

        inspector:"",
        baseStationStatus:"",
        owningOrder:"",
      }
    },
    mounted() {

    },
    computed: {
      ...mapState([
       "orderDetailInfo",
        "orderInfo"
      ])
    },
    methods: {
      // ...mapActions([
      //   'checkStation',
      //   'modStation'
      // ]),
      edit() {
        this.isEdit = true
      },
      sure() {
        this.isEdit = false
      },
      cancel() {
        this.isEdit = false
        this.$emit("close")
      },
      del() {
        this.stationInfo={}
      },
      setOrderDetailInfo() {
        var data = this.orderDetailInfo
        var index = this.data.index
        Object.assign(this.stationInfo,data[index])
      }
    },
    watch: {
      "data":function () {
        var data = this.data.data
        this.setOrderDetailInfo()
        this.inspector = data.inspector
        this.baseStationStatus = data.status
        this.owningOrder = this.orderInfo.orderId
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detailOrderDialog {
    input {
      border-radius: 3px;
      border: 1px solid #eaeaea;
      padding: 2px 5px;
    }
    .top-panel {
      width: 92%;
      display: flex;
      padding: 20px 20px 10px 40px;

      .left {
        width: 50%;

        input {
          width: 75%;
        }
      }

      .left div {
        width: 75%;
        padding-left: 20px;
        font-weight: bold;
      }

      .left > div {
        width: 100% !important;
        display: flex;
        padding-left: 0 !important;
        padding: 8px 0;
      }

      .right {
        width: 42%;

        input {
          width: 100%;
        }
      }

      .right > div {
        width: 100% !important;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;

      }

      .right div {
        width: 50%;
        font-weight: bold
      }

      span {
        white-space: nowrap;
        font-weight: normal;
      }

    }
    .oneLine {
      height: 1px !important;
      padding: 0 !important;
      width: 100%;
      background-color: #f5f5f5;
      margin-bottom: 20px;
    }
    .bottom-panel {
      width: 92%;
      padding: 10px 60px 10px 40px;
      div {
        padding-left: 20px;
        font-weight: bold;
      }
      span {
        font-weight: normal;
      }
    }

    .bottom-panel > div {
      display: flex;
      padding-left: 0 !important;
      padding: 8px 0;
    }

    .buttonArray {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px 0 15px 0;

      button {
        color: #ffffff;
        border-radius: 2px;
        font-size: 14px;
        width: 90px;
        height: 34px;
        border: 0;
      }

      button:focus {
        outline: none
      }

      .del {
        background-color: #f25656;
        box-shadow: 2px 2px 9px 0px rgba(242, 86, 86, 0.5);
      }

      .edit {
        background-color: #18be9b;
        box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      }
      .cancel {
        background-color: #ffffff;
        border: 1px solid #999999;
        box-shadow: 2px 2px 9px 0px rgba(153, 153, 153, 0.5);
        color: #8c8c8c;
      }
    }

    .buttonArray > div {
      padding: 0 10px;
      // width: 100px
    }
    & /deep/ .el-dialog {
      width: 620px;
      border-radius: 2px;
    }

    & /deep/ .el-dialog__body {
      padding: 10px 0;
    }

    & /deep/ .el-dialog__header {
      padding: 0;
    }
  }





</style>
