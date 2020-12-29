<template>
  <el-dialog
    title="新建订单"
    :visible="visible"
    center
    class="addOrderDialog common-dialogTop"
    @close="$emit('close')"
  >
    <!-- <div class="header">
			<div class="title">新建订单</div>
			<div class="close" @click="closeDialog()">
				<img src="../../../assets/close.png">
			</div>
    </div>-->
    <el-form :model="form">
      <el-form-item label="报告编号">
        <el-input v-model="form.reportNo" placeholder="请输入报告编号"></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="form.orderId" placeholder="请输入合同号"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="selectedArea">
        <v-distpicker class="selectedArea"
                      @selected="onSelected"
        ></v-distpicker>
      </el-form-item>
      <el-form-item label="委托单位" class="companySelect">
        <el-select v-model="form.selectCompany" placeholder="委托单位">
          <el-option
            v-for="item in customerList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="委托日期" class="dateStyle">
        <el-date-picker
          style="width:382px"
          v-model="form.dateFir"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="协议完成日期" class="doneDate dateStyle">
        <el-date-picker
          style="width:382px"
          v-model="form.planDoneDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>


      <!-- 新增检测依据复选框  prop="testingBase"  v-model="form.testingBase" -->
      <el-form-item label="检测依据" class=" companySelect">
        <el-select multiple :collapse-tags="true" v-model="form.testingBase">
          <el-option
            v-for="item in testingBaseList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>


      <!-- <el-form-item label="基站列表">
				<el-upload
					class="upload-demo"
					action=""
					name="file"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-change="handleChange"
					:http-request="handleRequest"
					:multiple="false"
					:limit="1"
					:file-list="fileList"
					:on-exceed="handleExceed"
					>
					<el-button size="middle" type="primary" class="fileUp">点击上传</el-button>
				</el-upload>

      </el-form-item>-->
      <!-- <div class="file">
					上传文件
					<input type="file" ref="fileUp" onChange="uploadFile()">
      </div>-->
      <!-- <el-button class="fileUp" @click="openSelect()">上传文件</el-button> -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="info" @click="sureAdd()" class="sureAdd" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import VDistpicker from 'v-distpicker'

  export default {
    props: ["visible", "value"],
    components: {
      VDistpicker,
    },
    data() {
      return {
        loading: false,
        input: "",
        fileList: [],
        dialogFormVisible: false,
        testingBaseList: [
          {
            label: "检测依据一",
            value: "检测依据一",
          },
          {
            label: "检测依据二",
            value: "检测依据二",
          }
        ],
        form: {
          reportNo: "",
          selectCompany: "",
          dateFir: "",
          planDoneDate: "",
          orderId: "",
          testingBase: [],
        },
        placeholders: {
          province: "浙江省",
          city: "杭州市",
          area: "西湖区",
        },
        orderState: true,
        customerList: [
          {
            label: "成功软件有限公司",
            value: "成功软件有限公司",
          }
        ],
        needFile: {}
      };
    },
    model: {
      prop: "getAdd",
      event: "sendAdd"
    },
    computed: {},

    methods: {
      onSelected(data) {
        this.placeholders.province = data.province.value
        this.placeholders.city = data.city.value
        this.placeholders.area = data.area.value

      },

      sureAdd() {
        let params = {
          form: this.form,
          placeholders: this.placeholders
        }
        this.$emit("addOrder", params)
      }
    },
    mounted() {
      // this.init()
    },
    watch: {}
  };
</script>

<style lang="scss" scoped>

  .addOrderDialog {
    .tri-right {
      margin-left: 50px;
    }
    .el-dialog__header {
      display: flex;
      justify-content: flex-start;
      height: 50px;
      padding: 0 20px 0 30px;
      border-bottom: #d1d3dc solid 1px;
      align-items: center;
      span {
        border-left: #18be9b solid 5px;
        display: flex;
        height: 22px;
        padding: 0 8px;
        font-size: 16px;
        color: #333333;
      }
    }

    .companySelect /deep/ .el-select {
      width: 100%;
      margin-right: 0 !important;

      .el-input__inner {
        width: 100% !important;
        padding-right: 10px !important;
      }
    }

    .selectedArea {
      display: block;
    }

    .dateStyle /deep/ .el-input__prefix {
      left: 290px;
    }

    .dateStyle /deep/ .el-input--prefix .el-input__inner {
      padding-left: 15px;
    }

    .doneDate /deep/ .el-form-item__label {
      line-height: 20px;
    }

    .el-select + .el-select {
      margin-left: 20px;
    }

    .fileUp {
      // background-color: #18be9b;
      box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      // color: #ffffff;
      // font-size: 14px;
      // height: 35px;
      // padding: 5px;
      // width: 100px;
    }

    .file {
      position: relative;
      display: inline-block;
      background: #18be9b;
      box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      // border: 1px solid #99D3F5;
      border-radius: 2px;
      padding: 4px 12px;
      overflow: hidden;
      color: #ffffff;
      text-decoration: none;
      text-indent: 0;
      line-height: 25px;
      margin-top: 5px;
    }

    .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
    }

    .file:hover {
      background: #18be9b;
      color: #ffffff;
      text-decoration: none;
    }

    .sureAdd {
      background-color: #18be9b;
      box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      color: #ffffff;
      width: 90px;
      padding: 5px;
      font-size: 15px;
      height: 40px;
    }

    & /deep/ .el-dialog__header {
      padding: 20px 0 0 0;
    }

    & /deep/ .el-input__suffix {
      right: 10px;
    }

    & /deep/ .el-dialog {
      width: 540px;
      border-radius: 2px;
    }

    & /deep/ .el-dialog__body {
      padding: 15px 0 10px 0;
    }

    & /deep/ .el-dialog__footer {
      padding: 0 0 30px 0;
    }

    & /deep/ .el-form-item__label {
      text-align: left;
      width: 80px !important;
      height: 40px;
    }

    & /deep/ .el-form-item__content {
      margin-left: 100px !important;
      display: flex;
    }


    & /deep/ .el-select {
      margin-right: 20px;
    }

    & /deep/ .el-input__inner {
      height: 40px;
      border-radius: 2px;
      background-color: #fcfcfc;
      border: 1px solid #e2e2e2;
    }

    & /deep/ .el-form {
      padding: 18px 60px;
    }

    & /deep/ .el-form-item {
      margin-bottom: 10px;
    }

    & /deep/ .el-button {
      border-radius: 2px;
      border: 0;
    }
  }
</style>
