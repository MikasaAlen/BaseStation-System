<template>
  <div>
    <el-main>
      <div class="customer-info-header">
        <el-select
          v-model="params.selectedProvince"
          class="common-select"
          placeholder="省份"
          no-data-text="暂无选项"
        >
          <el-option label="全部省份" value></el-option>
          <el-option
            v-for="item in provinceList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="params.selectedCity"
          class="common-select"
          placeholder="城市"
          no-data-text="暂无选项"
        >
          <el-option label="全部城市" value></el-option>
          <el-option
            v-for="item in cityList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="params.selectedDistrict"
          class="common-select"
          placeholder="区县"
          no-data-text="暂无选项"
        >
          <el-option label="全部区县" value></el-option>
          <el-option
            v-for="item in districtList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="common-input-search"
          placeholder="搜索单位名称"
          suffix-icon="el-icon-search"
          v-model="params.unitName"
          style="height: 35px; line-height: 35px; width: 250px"
        ></el-input>

        <el-button
          @click="flag.showAddDialog = true"
          type="success"
          style="position: absolute; right: 20px; top: 16px; width: 70px; height: 36px; padding: 0;background-color: #60cd59;box-shadow: 2px 2px 9px 0px rgba(96, 205, 89, 0.5);"
        >+ 新增</el-button>
      </div>
      <el-table
        :data="tableUser"
        :header-cell-style="{background:'#eef1f6',color:'#000000'}"
        stripe
      >
        <el-table-column prop="unitName" label="单位名称" width="160" >
        </el-table-column>
        <el-table-column prop="province" label="所属省" width="110" >
        </el-table-column>
        <el-table-column prop="city" label="所属市" width="110" >
        </el-table-column>
        <el-table-column prop="area" label="所属区" width="110" >
        </el-table-column>
        <el-table-column prop="zipCode" label="邮政编码" width="110" >
        </el-table-column>
        <el-table-column prop="address" label="详细地址" width="230" >
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="110" >
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="120" >
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="120" >
        </el-table-column>
      </el-table>
      <AddCustomerInformationDialog
        :title="'新建客户信息'"
        :visible="flag.showAddDialog "
        @addedCustomerInfo = "updateUserInfo"
        @close="flag.showAddDialog = false"
      />
    </el-main>
  </div>

</template>

<script>
  import AddCustomerInformationDialog from "../components/AddCustomerInformationDialog"
  export default {
    components: {
      AddCustomerInformationDialog,
    },
    data() {
      return {
        tableUser:[

        ],
        provinceList:[

        ],
        cityList:[

        ],
        districtList:[

        ],
        params: {
          unitName: "",
          selectedProvince: "",
          selectedCity: "",
          selectedDistrict: ""
        },
        flag: {
          showAddDialog: false
        },
      }
    },
    methods: {
      updateUserInfo(data) {
        var item = {};
        Object.assign(item,data.placeholders,data.formData);
        this.tableUser.push(item);
        // console.log(this.tableData)
        this.flag.showAddDialog = false

      }
    }
  }
</script>
<style scoped>
  .el-main {
    display: block;
    font-size: 14px;
    color: #000000;
    box-shadow: 8px 8px 16px 0px rgba(155, 155, 155, 0.28);
    border-radius: 2px;
    border: solid 1px #edeff3;
  }
  .customer-info-header {
    position: relative;
    height: 65px;
    line-height: 65px;

    .county-selector {
      width: 135px;
      margin-right: 10px;
    }

    .city-selector {
      width: 135px;
      margin-right: 10px;
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

