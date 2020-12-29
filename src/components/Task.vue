<template>
  <div>
    <el-main>
      <el-table
        :header-cell-style="{background:'#eef1f6',color:'#808080'}"
        :data="tableTask"
        stripe
      >
        <el-table-column prop="area" label="地区" width="250" >
        </el-table-column>
        <el-table-column prop="baseStationName" label="基站名称" width="250">
        </el-table-column>
        <el-table-column prop="baseStationAddress" label="基站地址" width="250">
        </el-table-column>
        <el-table-column prop="status" label="完成状态" width="140">
        </el-table-column>
        <el-table-column prop="type" label="任务类型" width="140">
        </el-table-column>
        <el-table-column prop="action" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="startTask(scope.row,scope.$index)"
              class="table-button"
            >检测</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <BasicInfoDialog
      :visible="BasicInfoDialog.visible"
      @BaseStationInfo="setPointTest"
      @close="BasicInfoDialog.visible = false"
    ></BasicInfoDialog>
    <point-test-dialog
      :visible="PointTestDialog.visible"
      @close="PointTestDialog.visible = false"
    ></point-test-dialog>
  </div>

</template>

<script>
  import BasicInfoDialog from "./BasicInfoDialog";
  import PointTestDialog from "./PointTestDialog"
  import {mapState,mapMutations} from "vuex"

  export default {
    components: {
      BasicInfoDialog,
      PointTestDialog,
    },
    data() {
      return {
        tableTask:[{
          area:"杭州市拱墅区",
          baseStationName:"浙大城院",
          baseStationAddress:"湖州街48号",
          status:"待检测",
          type:"正常",
          action:"",
        }],
        BasicInfoDialog: {
          visible:false,
        },
        PointTestDialog: {
          visible:false,
        },

      }
    },
    methods: {
      ...mapMutations([
        "setTask",
      ]),
      startTask(row) {
        this.setTask(row)
        this.BasicInfoDialog.visible = true
      },
      setPointTest() {
        this.BasicInfoDialog.visible = false;
        this.PointTestDialog.visible = true;
      },
    },
    computed:{
      ...mapState([
        "taskInfo",
      ])
    },
  }
</script>
<style scoped>
.el-main {
  display: block;
  box-shadow: 8px 8px 16px 0px rgba(155, 155, 155, 0.28);
  border-radius: 2px;
  border: solid 1px #edeff3;
}
  .table-button{
    font-size: 14px;
    color: #ffffff;
    background-color: #1d94f7;
    border: none;
    padding: 4px 7px;
    span {
      vertical-align: text-top;
    }
  }
</style>

