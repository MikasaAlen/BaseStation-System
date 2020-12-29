<template>
  <el-popover width="550" placement="bottom-end" trigger="hover">
    <div class="moreOperate-contain">
      <div :style="styleData"
           style="background-color: #5893df;box-shadow: 2px 2px 9px 0px rgba(88, 147, 223, 0.5);"
           @click="watchDetail"
      >
        <div :style="styleImg">
          <img src="../assets/watch.png">
        </div>
        <div :style="styleFont">基站详情</div>
      </div>
      <div :style="status === '已完成' ? styleData : styleOtherData"
           style="background-color: #f0b446;box-shadow: 2px 2px 9px 0px rgba(240, 180, 70, 0.5);"
           @click="watchReport()"
      >
        <div :style="styleImg">
          <img src="../assets/report.png">
        </div>
        <div :style="styleFont">检测报告</div>
      </div>
      <div :style="status === '已完成' ? styleData : styleOtherData"
           style="background-color: #6fb2f0;box-shadow: 2px 2px 9px 0px rgba(111, 178, 240, 0.5);"
           @click="watchChart()"
      >
        <div :style="styleImg">
          <img src="../assets/report.png">
        </div>
        <div :style="styleFont">检测图表</div>
      </div>
      <div :style="(  status === '待检测') ? styleData : styleOtherData"
           style="background-color: #18be9b;box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);"
           @click="reDivide()"
      >
        <div :style="styleImg">
          <img src="../assets/divide.png">
        </div>
        <div :style="styleFont">重新分配</div>
      </div>
      <div :style="( (status === '待检测' || status === '未分配')) ? styleData : styleOtherData"
           style="background-color: #f25656;box-shadow: 2px 2px 9px 0px rgba(242, 86, 86, 0.5);"
           @click="delStation()"
      >
        <div  :style="styleImg">
          <img src="../assets/delete.png">
        </div>
        <div :style="styleFont">删除基站</div>
      </div>
    </div>
    <div class="moreOperate-showMore" slot="reference">
      <img src="../assets/more.png">
    </div>
  </el-popover>
</template>

<script>

  export default {
    name:"moreOperate",

    data() {
      return {
        styleData: {
          'width': '96px',
          'height': '26px',
          'font-weight': 700,
          'font-size': '14px',
          'border-radius': '2px',
          'color': '#ffffff',
          'padding': '0 10px',
          'display': 'flex',
          'align-items': 'center',
          'margin': '0 5px',
          'white-space':'nowrap',
          'justify-content': 'center',
        },
        styleOtherData: {
          'width': '96px',
          'height': '26px',
          'font-weight': 700,
          'font-size': '14px',
          'border-radius': '2px',
          'color': '#ffffff',
          'padding': '0 10px',
          'display': 'flex',
          'align-items': 'center',
          'margin': '0 5px',
          'justify-content': 'center',
          'white-space':'nowrap',
          // 'pointer-events': 'none'
          'cursor': 'not-allowed',
          'background-color': '#cbcbcb !important',
          'box-shadow': '2px 2px 9px 0px rgba(203, 203, 203, 0.8) !important'
        },
        styleFont: {
          'padding-left': '3px',
          'height': '19px',
          'display': 'flex',
          'align-items': 'center',
          'line-height': 'normal !important',
        },
        styleImg: {
          'height': '19px',
          'display': 'flex',
          'align-items': 'center'
        },
        status:"已完成",
      }
    },
    computed: {
    },
    methods: {
      watchDetail () {
        this.$emit('watchDetail');
      },
      delStation () {
        if (this.isCreator && (this.status === '待检测' || this.status === '未分配')) {
          let data = {
            jzid: this.staId,
            type: "del"
          }
          this.$emit('popDeal', data);
        }
      },
      watchReport() {
        let data = {
          type: "report",
        }
        this.$emit('watchReport', data);
      },
      watchChart() {
        let data = {
          jzid: this.staId,
          type: "chart",
          orderBh: this.orderBh
        }
        this.$emit('popDeal', data);
      },
      reDivide () {
        if (this.isCreator && this.status === '待检测') {
          let data = {
            jzid: this.staId,
            type: "divide"
          }
          this.$emit('popDeal', data);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .moreOperate-contain {
    display:flex;
    height:50px;
    align-items:center;
    padding: 0 8px;
  }
  .moreOperate-showMore {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    color:#f0b446
  }

</style>

