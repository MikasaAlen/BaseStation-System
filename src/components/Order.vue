<template>
  <div class="orderList">
      <div class="operate">
        <div class="drop">
          <div class="dateComplete">
            <el-date-picker
              style="width:160px"
              v-model="searchPlanTime"
              type="date"
              size="small"
              placeholder="委托日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div class="dateComplete">
            <el-date-picker
              style="width:160px"
              v-model="searchDoneTime"
              type="date"
              size="small"
              placeholder="协议完成日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <el-select v-model="searchOrderState" placeholder="订单状态" size="medium"
                     class="specialOrderDetail-select common-select">
            <el-option
              v-for="item in stateOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="searchContain">
            <div class="searchBox">
              <el-input v-model="searchOrderName" placeholder="基站名称" class="find">
              </el-input>
              <img src="../assets/search.png" >
            </div>
          </div>
          <div class="searchContain">
            <div class="searchBox">
              <el-input v-model="searchName" placeholder="委托单位" class="find">
              </el-input>
              <img src="../assets/search.png" >
            </div>
          </div>
          <div class="searchContain">
            <div class="searchBox">
              <el-input v-model="searchPosi" placeholder="所属区县" class="find">
              </el-input>
              <img src="../assets/search.png" >
            </div>
          </div>
          <div class="addOrder" >
            <button @click="OrderDetailVisible = true">
              <div>+ 新增</div>
            </button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableOrder"
        :header-cell-style="{background:'#eef1f6',color:'#000000'}"
        stripe
      >
        <el-table-column prop="orderId" label="订单编号" width="170" >
        </el-table-column>
        <el-table-column prop="startTime" label="委托日期" width="170" >
        </el-table-column>
        <el-table-column prop="finishTime" label="协议完成日期" width="170" >
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="170" >
        </el-table-column>
        <el-table-column prop="post" label="委托单位" width="360" >
        </el-table-column>
        <el-table-column prop="action" label="操作" width="180" >
          <template slot-scope="scope">
            <el-button
              @click="startTask(scope.row,scope.$index)"
              class="table-button"
            >任务列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    <AddOrderDialog
      @close="OrderDetailVisible = false"
      @addOrder="addOrder"
      :visible = "OrderDetailVisible"
    />
  </div>

</template>

<script>
  import AddOrderDialog from "../components/AddOrderDialog";
  import {mapMutations, mapState} from "vuex";
  export default {
    components: {AddOrderDialog},
    data() {
      return {
        tableOrder:[{
          orderId:"202011240001",
          startTime:"2020-11-29 ",
          finishTime:"2020-11-30 ",
          status:"待检测",
          post:"成功软件有限公司",
          action:"",
        }],
        stateOption:[],
        pageInfo: {
          pageSize: 13,
          pageNo: 1,
          pageCount: 15,
          totalCount: 0
        },
        searchPlanTime: "",
        searchDoneTime: "",
        searchOrderState: "",
        searchName: "",
        searchOrderName: "",
        searchPosi: "",
        OrderDetailVisible:false,
      }
    },
    methods: {
      ...mapMutations([
        "setOrder"
      ]),
      startTask(row,index) {
        this.setOrder(row)

        this.$router.push("/Home/Order/OrderDetail")
      },
      addOrder(data) {
        var item = {}
        Object.assign(item,data.form,data.placeholders)
        let params= {
            orderId:item.orderId,
            startTime: item.dateFir,
            finishTime: item.planDoneDate,
            post: item.selectCompany,
            status: "未开始"
        }
        this.tableOrder.push(params)
        this.OrderDetailVisible = false
      }
    },
    computed:{
      ...mapState([
        "orderInfo",
      ])
    },
  }
</script>
<style lang="scss" scoped>

  .orderList {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 15px 0 5px 0;
    box-shadow: 8px 8px 16px 0px rgba(155, 155, 155, 0.28);
    border-radius: 2px;
    border: solid 1px #edeff3;

    .operate {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between
    }

    .drop {
      display: flex
    }

    .dateComplete {
      padding-right: 10px;
    }

    .common-select /deep/ .el-input__inner {
      border-radius: 2px;
    }

    .dateComplete /deep/ .el-input__inner {
      height: 36px;
      width: 160px;
      border-radius: 2px;
      background-color: #f9f9f9;
      border: 1px solid #e2e2e2;
      color: #666666;
      padding-left: 15px;
    }

    .dateComplete /deep/ .el-input__prefix {
      left: 130px;
    }

    .dateComplete /deep/ .el-input__suffix {
      right: 23px;
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
      padding-left: 10px;
      background-color: #f9f9f9
    }

    .find {
      width: 90px;
      height: 34px;
    }

    .find /deep/ input {
      border: 0;
      height: 34px;
    }

    .addOrder {
      display: inline;
      padding-left: 200px;
      button {
        border-radius: 2px;
        height: 34px;
        width: 70px;
        border: 0;
        background-color: #60cd59;
        box-shadow: 2px 2px 9px 0px rgba(96, 205, 89, 0.5);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        div {
          padding-left: 4px;
        }
      }
    }



    .pageFooter {
      height: 60px;
      border-top: 1px solid #f6f6f6;

      .pagination {
        display: flex;
        align-items: center;
      }
    }
  }
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
</style>

