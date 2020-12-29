<template>
  <div class="dialog">
    <div class="content">
      <el-dialog
        :title="title"
        :visible="visible"
        :center="true"
        class="new-info"
        @close="$emit('close')"
      >
        <el-form ref="form" :model="formData" label-width="80px" size="mini" :rules="rules">
          <el-form-item label="单位名称" prop="unitName">
            <el-input v-model="formData.unitName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="selectedArea" >
            <v-distpicker class="selectedArea"
                          @selected="onSelected"
            ></v-distpicker>
          </el-form-item>
          <el-form-item label="单位地址" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="zipCode">
            <el-input v-model="formData.zipCode" type="number"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="formData.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="confirm-button" size="large">
            <el-button type="primary" @click="addCustomerInformation" :loading="loading">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  export default {
    props: ['visible', 'title', 'data'],
    components: {
      VDistpicker,
    },
    data () {
      return {
        loading: false,
        placeholders: {
          province: "浙江省",
          city: "杭州市",
          area: "西湖区",
        },
        formData: {
          unitName: '成功软件有限公司',
          zipCode: '310000',
          phone: '15988879470',
          contact: '吴智宏',
          address: '西湖广告大厦',
          remark: '无'
        },
        rules: {
          unitName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请填写联系人', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          zipCode: [
            { min: 6, max: 6, message: '邮编只能为6位数字', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ]
        },

      }
    },
    methods: {
      // 修改选择的地区后进行的操作
      // selectChanged(val) {
      //   let provinceId = val[0]
      //   this.$provinceChanged(provinceId)
      //   if (val[1]) {
      //     let cityId = val[1]
      //     this.$cityChanged(cityId)
      //   }
      // },
      // 添加客户信息
      onSelected(data) {
        this.placeholders.province = data.province.value
        this.placeholders.city = data.city.value
        this.placeholders.area = data.area.value

      },
      addCustomerInformation() {
        let params={
          placeholders:this.placeholders,
          formData:this.formData
        }
        this.$emit("addedCustomerInfo",params)
      },
    },
  }
</script>
<style lang="scss">
  .new-info {
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
    .el-input {
        width: 350px;
        height: 32px;
      }
    .el-dialog {
      width: 558px;
      height: 554px;
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
      .selectedArea {
         display: flex;
         select {
           width:110px;
           height: 35px;
         }
       }

    }
  }


  .confirm-button {
    div {
      margin-left: 0 !important;
      text-align: center !important;
    }
  }
</style>

