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
          <el-form-item label="仪器名称" prop="instrumentName">
            <el-input v-model="formData.instrumentName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="型号规格" prop="standard" >
            <el-select v-model="formData.standard" >
              <el-option
                v-for="item in standardList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="仪器频段" prop="frequency">
            <el-select v-model="formData.frequency" >
              <el-option
                v-for="item in frequencyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="探头型号" prop="probeModel">
            <el-select v-model="formData.probeModel" >
              <el-option
                v-for="item in probeModelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产厂家" prop="manufacturer">
            <el-input v-model="formData.manufacturer"></el-input>
          </el-form-item>
          <el-form-item label="器具编号" prop="applianceNumber">
            <el-input v-model="formData.applianceNumber" ></el-input>
          </el-form-item>
          <el-form-item label="检定单位" prop="verificationUnit">
            <el-input v-model="formData.verificationUnit" ></el-input>
          </el-form-item>
          <el-form-item label="检定证号编号" prop="verificationNumber">
            <el-input v-model="formData.verificationNumber"></el-input>
          </el-form-item>

          <el-form-item class="confirm-button" size="large">
            <el-button type="primary" @click="addInstrument" :loading="loading">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  export default {
    props: ['visible', 'title'],
    components: {
      VDistpicker,
    },
    data () {
      return {
        loading: false,
        formData: {
          instrumentName: '',
          standard: '',
          frequency: '',
          probeModel: '',
          manufacturer: '',
          applianceNumber: '',
          verificationUnit:'',
          verificationNumber:'',
        },
        standardList:[
          {
            label: "NBM550",
            value: "NBM550"
          },
          {
            label: "SEM600",
            value: "SEM600"
          },
          {
            label: "SMP600",
            value: "SMP600"
          },
        ],
        frequencyList:[
          {
            label: "0.1MHz~3000MHz",
            value: "0.1MHz~3000MHz",
          },
          {
            label: "0.1MHz~6000MHz",
            value: "0.1MHz~6000MHz",
          }
        ],
        probeModelList:[
          {
            label: "EF0391",
            value: "EF0391",
          },
          {
            label: "RF-06",
            value: "RF-06",
          },
          {
            label: "WPF6",
            value: "WPF6",
          },
        ],

        rules: {
          instrumentName: [
            { required: true, message: '请输入仪器名称', trigger: 'blur' }
          ],
          verificationNumber: [
            { required: true, message: '请输入选择检定证号编号', trigger: 'blur' },
            { min: 12, max: 20, message: '长度在 12 到 20 个字符', trigger: 'blur' }
          ],
          applianceNumber: [
            {required: true, message: '请输入器具编号', trigger: 'blur' },
            { min: 11, max: 17, message: '长度在 11 到 17 个字符', trigger: 'blur' }
          ],
          verificationUnit: [
            { required: true, message: '请输入检定单位', trigger: 'blur' }
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
      // onSelected(data) {
      //   this.placeholders.province = data.province.value
      //   this.placeholders.city = data.city.value
      //   this.placeholders.area = data.area.value
      //
      // },
      addInstrument() {
        var item = {}
        Object.assign(item,this.formData)
        this.$emit("addInstrument",item)
      },
    }
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
      width: 570px;
      height: 620px;
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
          width: 340px;
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

