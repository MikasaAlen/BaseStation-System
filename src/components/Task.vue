<template>
  <div>
    <el-main>
      <el-table

        :data="tableData"
      >
        <el-table-column prop="Area" label="地区" width="275">
        </el-table-column>
        <el-table-column prop="BaseStationName" label="基站名称" width="250">
        </el-table-column>
        <el-table-column prop="BaseStationAddress" label="基站地址" width="275">
        </el-table-column>
        <el-table-column prop="Status" label="完成状态" width="140">
        </el-table-column>
        <el-table-column prop="Type" label="任务类型" width="140">
        </el-table-column>
        <el-table-column prop="Action" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="startTask()"
              class="table-button"
            >检测</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <BasicInfoDialog
      :visible="BasicInfoDialog.visible"
      @close="BasicInfoDialog.visible = false"
    ></BasicInfoDialog>
  </div>

</template>

<script>
  import BasicInfoDialog from "./BasicInfoDialog";

  export default {
    components: {
      BasicInfoDialog
    },
    data() {
      return {
        tableData:[{
          Area:"",
          BaseStationName:"",
          BaseStationAddress:"",
          Status:"",
          Type:"",
          Action:"",
        }],
        BasicInfoDialog: {
          visible:false,
        }
      }
    },
    methods: {
      startTask() {
        this.BasicInfoDialog.visible = true
      }
    }
  }
</script>
<style scoped>
.el-main {
  display: block;
  width: 1220px;
  padding: 60px 0 0 0 !important;
}
  .table-button{
    font-size: 14px;
    color: #ffffff;
    background-color: #9baabd;
    border: none;
    padding: 4.5px 7px;
    span {
      vertical-align: text-top;
    }
  }
</style>

