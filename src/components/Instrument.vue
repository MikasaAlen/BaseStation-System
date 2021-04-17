<template>
  <div class="insList">
    <div class="operate">
      <div class="drop">
        <div class="searchBox">
          <img src="../assets/search.png" alt="search" @click="goSearch()">
          <el-input v-model="searchTest" placeholder="仪器名称" class="find">
          </el-input>
        </div>
      </div>
      <div class="buttonArray">
        <div class="addOrder">
          <button @click="addNew()">
            <img src="../assets/addNew.png" alt="addNew">
            <div><p>新增</p></div>
          </button>
        </div>
        <div class="batchPrint">
          <button @click="judgeCanDownload()">
            <img src="../assets/report.png" alt="report">
            <div><p>批量下载</p></div>
          </button>
        </div>
      </div>

    </div>
    <div class="content">

      <div class="contentDetail" >
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#000000'}"
          :data="tableInstrument"
          stripe
        >
          <el-table-column prop="instrumentName" label="仪器名称" width="140" >
          </el-table-column>
          <el-table-column prop="standard" label="型号规格" width="110">
          </el-table-column>
          <el-table-column prop="frequency" label="仪器频段" width="160">
          </el-table-column>
          <el-table-column prop="probeModel" label="探头型号" width="110">
          </el-table-column>
          <el-table-column prop="manufacturer" label="生产厂家" width="120">
          </el-table-column>
          <el-table-column prop="applianceNumber" label="器具编号" width="150">
          </el-table-column>
          <el-table-column prop="verificationUnit" label="检定单位" width="170">
          </el-table-column>
          <el-table-column prop="verificationNumber" label="检定证号编号" width="160">
          </el-table-column>
          <el-table-column prop="action" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="startTask(scope.row,scope.$index)"
                class="table-button"
              ><img src="../assets/watch.png" alt="watch">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="widthFif watchDetail" @click="openDetail(item)">-->
<!--          <img src="../../assets/watch.png">-->
<!--          <div>查看</div>-->
<!--        </div>-->
      </div>
    </div>
    <div class="pageFooter">
<!--      <pagination :pagination="pageInfo" @changePage="changeList"></pagination>-->
    </div>
    <AddInstrumentDialog
      @close="dialogFormVisible = false"
      @addInstrument="addInstrument"
      :title="'新建仪器信息'"
      :visible="dialogFormVisible"
    />
    <InstrumentDetail
      @close="dialogDetailVisible = false"
      :visible="dialogDetailVisible"
      :instrumentInfo ="needData"
    />
  </div>
</template>
<script>
  import AddInstrumentDialog from "./AddInstrumentDialog"
  import InstrumentDetail from "./InstrumentDetail"
  import {mapMutations, mapState} from "vuex";

  export default {
    components: {
      AddInstrumentDialog,
      InstrumentDetail,
    },
    data() {
      return {
        input: '',
        pageInfo: {
          pageSize: 13,
          pageNo: 1,
          pageCount: 15,
          totalCount: 0
        },

        dialogFormVisible:false,
        dialogDetailVisible:false,

        needData:{},
        needEdit: {},
        tipType: "",
        insList: [],
        deleteId: "",
        jdInfo: {
          title: '',
          info: ''
        },
        needDetail: {},
        copyData: {},
        searchTest: "",
        isSearch: false, //查询列表的标记
        specialSearch: false,
        superDelete: false,
        clientHeight: 0
      }
    },
    methods: {
      ...mapMutations([
        "addInstrumentInfo"
      ]),
      addInstrument(data) {
        this.tableInstrument.push(data);
        this.dialogFormVisible = false
      },
      startTask(row) {
        this.needData = row;
        this.dialogDetailVisible = true
        // this.$forceUpdate()
      },

      // sureAdd() {
      //     this.dialogFormVisible = false;
      //     this.successTip = true;
      //     setTimeout(() => {
      //         this.successTip = false;
      //     }, 3000)
      // },
      // async init() {
      //   try {
      //     // console.log(this.$route);
      //     let params = {
      //       // dwmc:"全部",
      //       dwmc: this.$route.name,
      //       yqmc: "全部",
      //       pageNum: this.pageInfo.pageNo,
      //       pageSize: this.pageInfo.pageSize,
      //     }
      //     this.$store.commit('setInsList', await this.getInsInfoList(params));
      //     let data = this.insInfoList.dataList;
      //     this.insList = data;
      //     // console.log('全部',this.insList);
      //     this.isSearch = false;
      //     this.pageInfo.totalCount = this.insInfoList.total;
      //   } catch (error) {
      //     this.pageInfo.totalCount = 0;
      //     console.log(error);
      //   }
      // },
      // async goSearch() {
      //   try {
      //     let params = {
      //       // dwmc: this.searchTest,
      //       dwmc: this.$route.name,
      //       yqmc: this.searchTest,
      //       pageNum: 1,
      //       pageSize: this.pageInfo.pageSize,
      //     }
      //     if (this.specialSearch) {
      //       params.pageNum = this.pageInfo.pageNo
      //     } else {
      //       this.pageInfo.pageNo = 1
      //     }
      //     // console.log(params);
      //     this.$store.commit('setInsList', await this.getInsInfoList(params));
      //     let data = this.insInfoList.dataList;
      //     this.insList = data;
      //     // console.log(this.insInfoList);
      //     // console.log(this.searchTest,':',this.insList);
      //     this.isSearch = true;
      //     this.pageInfo.totalCount = this.insInfoList.total;
      //     this.specialSearch = false;
      //     // if (this.pageInfo.totalCount <= (this.pageInfo.pageNo - 1) * this.pageInfo.pageSize) {
      //     // 	this.pageInfo.pageNo = this.pageInfo.pageNo - 1
      //     // }
      //     // console.log(this.pageInfo.pageNo);
      //
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      addNew() {
        // let data = {};
        // this.needEdit = data;
        this.dialogFormVisible = true;
      },
      // receiveAdd(isAdd) {
      //   // console.log("isAdd:",isAdd);
      //   if (isAdd) {
      //     this.tipType = "add";
      //     this.dialogSaveVisible = true;
      //     this.specialSearch = true;
      //     this.flashList();//刷新列表
      //     setTimeout(() => {
      //       this.dialogSaveVisible = false;
      //     }, 3000)
      //   } else {
      //     this.flashList();//刷新列表
      //     this.dialogDetailVisible = true;
      //   }
      // },
      // aeJD(operate) {
      //   this.dialogJDVisible = true;
      //   this.jdInfo.title = operate.str === 'edit' ? '编辑' : '新增';
      //   if (!operate.info) {
      //     this.jdInfo.info = {
      //       "expired": false,
      //       "id": "",
      //       "jcyqId": operate.id,
      //       "jddw": '',
      //       "jdzsbh": '',
      //       "validDateEnd": '',
      //       "validDateStart": ''
      //     };
      //   } else {
      //     this.jdInfo.info = operate.info;
      //   }
      // },
      // receiveDeal(operate) {
      //   if (operate === "openSave") {
      //     this.tipType = "save";
      //     this.dialogSaveVisible = true;
      //     setTimeout(() => {
      //       this.dialogSaveVisible = false;
      //     }, 3000);
      //   } else if (operate === "openEdit") {
      //     let data = this.needDetail;
      //     this.needEdit = data;
      //     this.dialogFormVisible = true;
      //   } else if (operate === "openDel") {
      //     let data = this.needDetail.jcyqid;
      //     this.deleteId = data;
      //     this.dialogDelVisible = true;
      //   }
      // },
      // receiveDel() {
      //   this.dialogDelVisible = false;
      //   this.dialogDetailVisible = true;
      // },
      // async getJcjgInfo() {
      //   try {
      //     let data = await this.getJcjgList();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      changeList(val) {
        this.pageInfo.pageNo = val;
        if (this.isSearch) {
          this.specialSearch = true;
          this.goSearch();
        } else {
          this.init();
        }
      },
      // flashList() {
      //   if (this.isSearch) {
      //     this.goSearch();
      //   } else {
      //     this.init();
      //   }
      // },
      // openDetail(data) {
      //   this.copyObj(data);
      //   this.needDetail = this.copyData;
      //   this.dialogDetailVisible = true;
      // },
      // closeForm(title) {
      //   if (title === '编辑仪器卡片') {
      //     this.dialogFormVisible = false;
      //     this.dialogDetailVisible = true;
      //   } else {
      //     this.dialogFormVisible = false;
      //   }
      // },
      // closeJD() {
      //   this.dialogJDVisible = false;
      //   this.dialogDetailVisible = true;
      // },
      // closeAe(data) {
      //   this.closeJD();
      //   if (data) {
      //     this.needDetail.jddw = data.jddw;
      //     this.needDetail.jdzsbh = data.jdzsbh;
      //     this.needDetail.validDate = data.validDateStart + '~' + data.validDateEnd;
      //   }
      // },
      // copyObj(params) { //防止污染父组件
      //   this.copyData = JSON.parse(JSON.stringify(params));
      // },
      // closeAsk(type) {
      //   if (type === 'normal') {
      //     //nothing
      //   } else if (type === 'super') {
      //     this.pageInfo.pageNo = this.pageInfo.pageNo - 1;
      //     this.superDelete = false;
      //   }
      //   this.dialogDelVisible = false;
      //   this.flashList();
      //
      // },
      // receivePrint(message) {
      //   if (message === 'complete') {
      //     this.dialogPrintVisible = false;
      //     //弹出成功提示
      //     this.tipType = "download";
      //     this.dialogSaveVisible = true;
      //     setTimeout(() => {
      //       this.dialogSaveVisible = false;
      //     }, 3000)
      //   } else {
      //     this.dialogPrintVisible = false;
      //     this.$message.error('错误,仪器-' + message + '不存在内部编码,下载失败');
      //   }
      // },
      // getNeedHeight() {
      //   // 获取屏幕可视区域高度
      //   this.clientHeight = `${document.documentElement.clientHeight}`;
      //   this.setClientHeight(this.clientHeight);
      //   this.pageInfo.pageSize = parseInt((this.needHeight - 50 - 30 - 61 - 65 - 2) / 40) - 1;
      // },
      // judgeCanDownload() {
      //   if (this.insList.length === 0) {
      //     this.$message.error('错误,本页无二维码可以下载');
      //   } else {
      //     this.dialogDownloadVisible = true
      //   }
      // }

    },
    watch: {
      "this.needData":function () {
        this.$forceUpdate();
        console.log(this.needData);
      }
    },
    mounted() {

      // this.init();
      // this.getJcjgInfo();
    },
    computed:{
      ...mapState([
        "tableInstrument"
      ])
    },
  }
</script>

<style lang="scss" scoped>
  .insList {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 15px 15px 5px 15px;

    .operate {
      padding: 0 0 10px 0;
      display: flex;
      justify-content: space-between;
      height: 46px;
    }

    .pageFooter {
      height: 60px;
      border-top: 1px solid #f6f6f6;

      .pagination {
        display: flex;
        align-items: center;
      }
    }

    .drop {
      display: flex
    }

    .searchBox {
      width: 270px;
      padding-right: 10px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      border-radius: 2px;
      border: #e2e2e2 1px solid;
      background-color: #fcfcfc;

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    .searchBox /deep/ .el-input__inner {
      padding-left: 10px;
      background-color: transparent;
      width: 100%;
    }

    .find {
      width: calc(100% - 20px);
      height: 34px;
    }

    .find /deep/ input {
      border: 0;
      height: 34px;
    }

    .buttonArray {
      display: flex;

      button {
        border-radius: 2px;
        height: 34px;
        border: 0;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .addOrder {
        padding-right: 20px;

        button {
          width: 70px;
          background-color: #60cd59;
          box-shadow: 2px 2px 9px 0 rgba(96, 205, 89, 0.5);

          div {
            padding-left: 4px;
          }
        }
      }

      .batchPrint {
        padding-right: 30px;
        button {
          width: 100px;
          background-color: #18be9b;
          box-shadow: 2px 2px 9px 0 rgba(24, 190, 155, 0.5);
          div {
            padding-left: 4px;

          }
        }
      }
    }


    .content {
      height: calc(100% - 106px);
      width: 100%;
      background-color: #ffffff;
      border-radius: 5px;

      .table-button{
        font-size: 14px;
        color: #ffffff;
        background-color: #66b1ff;
        border: none;
        padding: 4px 7px;
        span {
          vertical-align: text-top;
        }
      }

    }
  }
</style>
