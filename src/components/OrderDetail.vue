<template>
  <div class="orderDetail">
    <div class="titleContain">
      <div class="top">
        <div class="header">
          <div class="title">订单详情</div>
          <div class="close">
            <img class="pic" src="../assets/back.png" @click="goBack()" />
          </div>
        </div>
      </div>
      <div class="abstract">
        <div class="left">
          <div class="number">{{orderInfo.orderId}}</div>
          <div class="other">
            <div class="noChange">订单所属区域</div>
            <div class="address">{{"杭州市"}}</div>
            <span>|</span>
            <div class="noChange">订单所属区县</div>
            <div class="address">{{"拱墅区"}}</div>
            <span>|</span>
            <div class="noChange">委托时间-完成时间</div>
            <div class="time">{{orderInfo.startTime}} 至 {{orderInfo.finishTime}}</div>
          </div>
        </div>
        <div class="right">
          <div >
            <el-progress
              type="circle"
              :percentage="50"
              color="#18be9b"
              :width="65"
            ></el-progress>
          </div>

        </div>
      </div>
    </div>
    <div class="contentContain">
      <div class="top">
        <div class="header addBottom">
          <div class="title">任务管理</div>
        </div>
      </div>
      <div class="operate">
        <div class="drop">
          <el-select
            v-model="selectDistrict"
            placeholder="所属地区"
            size="medium"
            class="specialOrderDetail-select common-select"
          >
            <el-option
              v-for="item in districtOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-model="selectState"
            placeholder="基站状态"
            size="medium"
            class="specialOrderDetail-select common-select"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="selectPerson"
            placeholder="检测人员"
            size="medium"
            class="specialOrderDetail-select common-select"
          >
            <el-option
              v-for="item in personOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="selectDownload"
            placeholder="下载状态"
            size="medium"
            class="specialOrderDetail-select common-select"
          >
            <el-option
              v-for="item in downloadOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>


          <el-date-picker
            style="width:200px; margin-left: 10px"
            v-model="searchTime"
            type="date"
            size="medium"
            placeholder="基站检测时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
          <div class="searchContain">
            <div class="searchBox">
              <el-input v-model="searchName" placeholder="基站名称" class="find"></el-input>
<!--              <img src="../../assets/search.png" @click="goSearch()" />-->
            </div>
          </div>
        </div>
      </div>
      <div class="contentTitle" v-if="tableData.length>0">
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#000000'}"
          :data="tableData"
          stripe
        >
          <el-table-column prop="baseStationName" label="基站名称" >
          </el-table-column>
          <el-table-column prop="baseStationAddress" label="所属区域" width="160" >
          </el-table-column>
          <el-table-column prop="assignmentDate" label="分配日期" >
          </el-table-column>
          <el-table-column prop="detectionTime" label="检测时间" >
          </el-table-column>
          <el-table-column prop="status" label="完成状态" >
          </el-table-column>
          <el-table-column prop="inspector" label="检测人员" >
          </el-table-column>
          <el-table-column prop="checker" label="校验人员" >
          </el-table-column>
          <el-table-column prop="auditor" label="审核人员" >
          </el-table-column>
          <el-table-column prop="action" label="操作" >
            <template slot-scope="scope">
              <more-operate
                @watchDetail="watchDetail(scope.row,scope.$index)"
              ></more-operate>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="blankContent" v-if="tableData.length <1" >
        <div class="tipMessage">空空如也, 去上传基站列表吧！</div>
        <el-button
          size="middle"
          class="fileUp"
          @click="dialogStationVisible = true"
          v-if="isCreator"
        >上传基站列表</el-button>
      </div>

      <div class="pageFooter" v-if="stationListData.length > 0">
        <pagination :pagination="pageInfo" @changePage="changeList"></pagination>
      </div>
    </div>
     <Order-Info-Detail
       :visible="dialogShowDetail"
       :data="detail"
       @close="dialogShowDetail = false"
     ></Order-Info-Detail>
 </div>

</template>

<script>
  import MoreOperate from "./MoreOperate";
  import OrderInfoDetail from "./OrderInfoDetail";
  import {mapState,mapMutations} from "vuex"
  export default {
    name:"orderDetail",
    components: {
      MoreOperate,
      OrderInfoDetail,
    },
    data() {
      return {
        detail:"",
        temple:'',
        pageInfo: {
          pageSize: 8,
          pageNo: 1,
          pageCount: 15,
          totalCount: 0
        },
        tableData:[

        ],
        stateOptions: [
          {
            value: "全部",
            label: "全部状态"
          },
          {
            value: "未分配",
            label: "未分配"
          },
          {
            value: "待检测",
            label: "待检测"
          },
          {
            value: "待校验",
            label: "待校验"
          },
          {
            value: "待审核",
            label: "待审核"
          },
          {
            value: "已完成",
            label: "已完成"
          }
        ],
        downloadOptions: [
          {
            value: "全部",
            label: "全部状态"
          },
          {
            value: "未下载",
            label: "未下载"
          },
          {
            value: "已下载",
            label: "已下载"
          }
        ],
        dialogShowDetail:false,
        dialogStationVisible:false,
        selectDistrict: "",
        selectState: "",
        selectDownload: "",
        selectPerson: "",
        isSearch: false,
        stationListData: [],
        delTitle: "",
        personOptions: [],
        districtOptions: [],
        specialSearch: false,
        searchName: "",
        searchTime: "",
        isCreator:true,
        detailInfo:""
      };
    },
    filters: {
      divideDate(params) {
        if (params === "" || params === null) {
          return (params = "--");
        } else {
          return params;
        }
      },
    },
    computed:{
      ...mapState([
        "orderInfo",
        "orderDetail",
      ])
    },
    methods: {

      goBack() {
        this.$router.push({
          path: "/Home/Order"
        });
      },
      watchDetail(row,index) {
        let params={
            data:row,
            index,
        }
        this.detail = params
        this.dialogShowDetail = true
      },
      setOrderDetail() {
        var data = this.orderDetail
        var object={}
        for(var item in data) {
          if(item === this.orderInfo.orderId) {
            for(var key of data[item]) {
              Object.assign(object,key)
              this.tableData.push(key)
            }
          }
        }
      }
    },
    mounted() {
      this.setOrderDetail()
    }
  };
</script>

<style lang="scss" scoped>
  .orderDetail {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    // padding: 0 0 10px 0;

    button {
      outline: none;
    }
    .top {
      padding-top: 8px;
      .header {
        padding: 0 15px 8px 15px;
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: #ebebeb 2px solid;
      }
      .title {
        font-size: 16px;
        border-left: #18be9b 5px solid;
        padding: 0 8px;
        display: flex;
        align-items: center;
      }
      .close {
        display: flex;
        align-items: center;
        .pic{
          padding-right: 20px;
        }
      }
    }
    .titleContain {
      background-color: #ffffff;
      width: 100%;
      height: 147px;
      text-align: left;
      box-shadow: 4px 4px 8px 0px rgba(155, 155, 155, 0.28);
      border-radius: 2px;
      border: solid 1px #edeff3;
      margin-bottom: 10px;
      .abstract {
        width: 96%;
        height: auto;
        padding: 15px 15px 5px 28px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;

        .left {
          white-space: nowrap;
          padding: 5px 0 15px 0;
        }

        .right {
          width: 65px;
          height: 65px;
        }

        span {
          padding: 0 8px;
          color: #d8d8d8;
        }

        .number {
          width: 100%;
          font-size: 18px;
        }

        .other {
          padding-top: 10px;
          width: 100%;
          display: flex;
          font-size: 14px;
        }
        .noChange {
          color: #a8a8a8;
          padding-right: 10px;
        }
      }
    }

    .contentContain {
      width: 100%;
      height: calc(100% - 157px);
      // padding: 0 0 18px 0;
      background-color: #ffffff;
      box-shadow: 8px 8px 16px 0px rgba(155, 155, 155, 0.28);
      border-radius: 2px;
      border: solid 1px #edeff3;
      .common-select /deep/ .el-input__inner {
        border-radius: 2px;
      }
      .el-select + .el-select {
        margin-left: 10px;
      }
      .addBottom {
        height: 46px;
      }
      .operate {
        padding: 11px 15px 12px 15px;
        position: relative;
        display: flex;
        // justify-content: space-between;
      }
      .secOperate {
        padding: 0 15px 12px 12px;
        position: relative;
        display: flex;
      }
      .stationDoc {
        display: flex;
        align-items: center;
        padding-left: 10px;
        a {
          color: #6cc16b;
          font-size: 14px;
          text-decoration: none;
        }
      }

      .tri-small-right {
        margin-left: 30px;
      }

      .notDivide {
        background-color: #cbcbcb !important;
        box-shadow: 2px 2px 9px 0px rgba(203, 203, 203, 0.8) !important;
        pointer-events: none;
      }

      .operateButton {
        border: solid 1px #e2e2e2;
        border-radius: 2px;
        padding-top: 10px;
        padding-bottom: 10px;
        color: #666666;
      }

      .sureAdd {
        background-color: rgba(242, 242, 242, 1);
        color: #000000;
        width: 250px;
        padding: 5px;
        font-size: 16px;
        height: 40px;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }

      .drop {
        display: flex;
      }

      .searchContain {
        padding-left: 10px;
      }

      .searchBox {
        padding-right: 8px;
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: solid 1px #e2e2e2;
        border-radius: 3px;
        img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }

      .searchBox /deep/ .el-input__inner {
        padding: 0 5px;
        background-color: transparent;
      }

      .find {
        width: 150px;
        height: 34px;
      }

      .find /deep/ input {
        border: 0;
        height: 34px;
      }
      .operateBtn {
        display: flex;
        button {
          border-radius: 2px;
          height: 34px;
          width: 70px;
          border: 0;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .batchReport {
          button {
            width: 100px !important;
            background-color: #f0b446;
            box-shadow: 2px 2px 9px 0px rgba(240, 180, 70, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .batchReportDisabled {
          button {
            pointer-events: none !important;
            width: 100px !important;
            background-color: #cbcbcb;
            box-shadow: 2px 2px 9px 0px rgba(203, 203, 203, 0.8);
            div {
              padding-left: 4px;
            }
          }
        }
        .photoFiles {
          button {
            width: 100px !important;
            background-color: #2cb693;
            box-shadow: 2px 2px 9px 0px rgba(44, 182, 147, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .orderReport {
          button {
            width: 100px !important;
            background-color: #6fb2f0;
            box-shadow: 2px 2px 9px 0px rgba(111, 178, 240, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .watchMap {
          button {
            width: 100px !important;
            background-color: #1e82d2;
            box-shadow: 2px 2px 9px 0px rgba(30, 130, 210, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .addOrder {
          button {
            background-color: #60cd59;
            box-shadow: 2px 2px 9px 0px rgba(96, 205, 89, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .allot {
          button {
            background-color: #18be9b;
            box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .allotDisabled {
          button {
            background-color: #cbcbcb;
            box-shadow: 2px 2px 9px 0px rgba(203, 203, 203, 0.8);
            div {
              padding-left: 4px;
            }
          }
        }
      }
      .operateBtn > div {
        display: inline;
        padding: 0 3px;
      }

      .blankContent {
        height: calc(100% - 173px);
        width: 95%;
        background-color: #ffffff;
        border-radius: 5px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .tipMessage {
          padding: 20px 0 60px 0;
        }
        .fileUp {
          background-color: #60cd59;
          box-shadow: 2px 2px 9px 0px rgba(96, 205, 89, 0.5);
          color: #ffffff;
        }
      }
      .contentTitleContain {
        width: 95%;
        height: 36px;
        padding: 0 15px;
      }
      .contentTitle {
        // height: 36px;
        display: flex;
        align-items: center;
        background-color: #e9e9e9;
        .selSqu {
          width: 14px;
          height: 14px;
          border: 1px solid #c7c7c7;
          border-radius: 2px;
        }
        .addOrder {
          button {
            background-color: #60cd59;
            box-shadow: 2px 2px 9px 0px rgba(96, 205, 89, 0.5);
            div {
              padding-left: 4px;
            }
          }
        }
        .hook {
          width: 14px;
          height: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #18be9b;
          border-radius: 2px;
        }

        .hook > img {
          width: 13px;
          height: 14px;
        }

        .widthFir {
          width: 15%;
        }

        .widthSec {
          width: 20%;
        }

        .widthThi {
          width: 12%;
        }

        .widthFor {
          width: 10%;
        }
      }

      .contentTitle > div {
        font-size: 14px;
        color: #000000;
        font-weight: 700;
        white-space: nowrap;
      }
      .content {
        // height: calc(100% - 173px);
        height: calc(100% - 255px);
        overflow-y: auto;
        background-color: #ffffff;
        /*border-radius: 5px;*/
        padding: 0 15px;

        .selSqu {
          width: 14px;
          height: 14px;
          border: 1px solid #c7c7c7;
          border-radius: 2px;
        }

        .hook {
          width: 14px;
          height: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #18be9b;
          border-radius: 2px;
        }

        .hook > img {
          width: 13px;
          height: 14px;
        }

        .widthFir {
          width: 15%;
        }

        .widthSec {
          width: 20%;
        }

        .widthThi {
          width: 12%;
        }

        .widthFor {
          width: 10%;
        }

        .sendTask {
          line-height: 26px;
          width: 96px;
          height: 26px;
          font-weight: 700;
          border-radius: 2px;
          color: #ffffff;
          padding: 0 10px;
          display: flex;
          align-items: center;
          background-color: #18be9b;
          box-shadow: 1px 1px 2px 0px rgba(24, 190, 155, 0.5);
          div {
            padding-left: 4px;
          }
        }
        .showMore {
          height: 40px;
          line-height: 40px;
          display: flex;
          align-items: center;
        }

        .contentDetail {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 10px 0 20px;
        }

        .contentDetail:nth-child(2n + 1) {
          background-color: #f6f6f6;
        }

        .contentDetail > div {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .pageFooter {
        height: 60px;
        border-top: 1px solid #f6f6f6;
        margin: 0 15px;
        padding-top: 10px;
        .pagination {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
