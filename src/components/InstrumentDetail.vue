<template>
  <el-dialog
    title="仪器卡片"
    :visible="visible"
    center
    class="detailInsDialog "
    @close="$emit('close')"
  >
    <!-- <div class="header">
            <div class="title">仪器卡片</div>
            <div class="close" @click="dialogDetailVisible = false">
                <img src="../../assets/close.png">
            </div>
        </div> -->
    <el-form >
      <el-form class="left-panel">
        <el-form-item label="仪器名称">
          <div>{{detail.instrumentName}}</div>
        </el-form-item>
        <el-form-item label="型号规格">
          <div>{{detail.standard}}</div>
        </el-form-item>
        <el-form-item label="仪器频段">
          <div>{{detail.frequency}}</div>
        </el-form-item>
        <el-form-item label="探头型号">
          <div>{{detail.probeModel}}</div>
        </el-form-item>
        <el-form-item label="内部编码">
          <div>{{detail.code}}</div>
        </el-form-item>
        <el-form-item label="生产厂家">
          <div>{{detail.manufacturer}}</div>
        </el-form-item>
        <el-form-item label="器具编号">
          <div>{{detail.applianceNumber}}</div>
        </el-form-item>
      </el-form>
      <el-form class="right-panel">
        <!--        <canvas ref="qrCode" width="240px" height="240px">-->
        <!--          <img ref="needImg" crossorigin="anonymous" :src="">-->
        <!--        </canvas>-->
        <img src="../assets/QRcode.png" alt="">
        <!-- <img style="width:150px;height:150px" :src="qrLink"> -->
      </el-form>

      <el-form-item label="技术指标">
        <div class="detailTest">{{detail.target}}</div>
      </el-form-item>
    </el-form>
    <div class="jdList">

      <div class="contentTitle">
        <div class="one">检定单位</div>
        <div class="two">检定证号编号</div>
        <div class="three">有效期开始时间</div>
        <div class="four">有效期结束时间</div>
        <div class="five">操作</div>
      </div>
      <div class="tBody" v-for="(item,index) in verificationList" :key="index">
        <div class="one">{{item.verificationUnit}}</div>
        <div class="two">{{item.verificationNumber}}</div>
        <div class="three">{{item.startTime}}</div>
        <div class="four">{{item.finishTime}}</div>
        <div class="five">
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div class="buttonArray">
        <div>
          <button class="del" @click="del()">删除</button>
        </div>
        <div>
          <button class="edit" @click="edit()">编辑</button>
        </div>
        <div>
          <button class="store" @click="save()">保存二维码</button>
        </div>

      </div>
    </div>
  </el-dialog>
</template>

<script>


  export default {
    name: 'detailInfo',
    props: ['visible', "instrumentInfo"],
    data() {
      return {
        indicators: [{
          name: "频率响应范围",
          desc: "0.1V/m ~ 320V/m"
        }],
        bottomFont: "",
        qrLink: "",
        verificationList: [
          {
            verificationUnit: "",
            verificationNumber: "",
            startTime: "",
            finishTime: "",
            action: ""
          }
        ],
        detail: {
          instrumentName: '',
          standard: '',
          frequency: '',
          probeModel: '',
          manufacturer: '',
          applianceNumber: '',
          code: "",
          target: "",
        }
      }
    },
    computed: {},
    methods: {
      update() {

      },
      del() {
        this.$confirm("是否确定删除？", "提示", {}).then(() => {
          this.detail = {}
        });

      },
      edit() {

      },
      //跨域问题
      save() {
        let hreLocal = "";
        hreLocal = "https://s3.ax1x.com/2020/12/07/Dxf7M8.png";
        this.downloadByBlob(hreLocal, "QRcode")
      },
      downloadByBlob(url, name) {
        let image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
        image.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          let ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, image.width, image.height)
          canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob)
            this.download(url, name)
            // 用完释放URL对象
            URL.revokeObjectURL(url)
          })
        }
      },
      download(href, name) {
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.href = href
        eleLink.click()
        eleLink.remove()
      },
    },
    mounted() {

    },
    watch: {
      "instrumentInfo":function () {
        var object = {}
        object = this.instrumentInfo
        let params = {
          instrumentName: object.instrumentName,
          standard: object.standard,
          frequency: object.frequency,
          probeModel: object.probeModel,
          manufacturer: object.manufacturer,
          applianceNumber: object.applianceNumber,
          code: "GF-2-6-2018",
          target: "无",
        }
        Object.assign(this.detail,params)
        console.log(this.detail)
      }
    }
  }
</script>

<style lang="scss" scoped>
  //detaillDialog部分
  .detailInsDialog {
    .el-dialog__header {
      display: flex;
      justify-content: flex-start;
      height: 50px;
      padding: 0 20px 0 30px;
      border-bottom: #d1d3dc solid 1px;
    }

    .left-panel {
      vertical-align: top;
      padding-top: 25px;
      width: 60%;
      display: inline-block;
    }

    .right-panel {
      vertical-align: top;
      padding-top: 40px;
      padding-right: 40px;
      width: 30%;
      display: inline-block;
      text-align: right;
      // img {
      // 	width: 180px;
      // 	height: 180px;
      // }
    }

    .buttonArray {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0;

      button {
        border: 0;
        border-radius: 3px;
        font-size: 20px;
        width: 100px;
        height: 44px;
        color: #ffffff
      }

      button:focus {
        outline: none
      }

      .del {
        background-color: #f25656;
        box-shadow: 2px 2px 9px 0px rgba(242, 86, 86, 0.5);
      }

      .edit {
        background-color: #18be9b;
        box-shadow: 2px 2px 9px 0px rgba(24, 190, 155, 0.5);
      }

      .store {
        width: 130px !important;
        background-color: #596b8c;
        box-shadow: 2px 2px 9px 0px rgba(89, 107, 140, 0.5);
      }
    }

    .buttonArray > div {
      padding: 0 10px;
      // width: 100px
    }

    .indicators {
      width: 100%;
      max-height: 140px;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .indicators > div {
      height: 30px
    }

    .detailTest {
      line-height: 30px;
      word-break: break-all;
      width: 100%;
    }

    .indicatorsDesc {
      font-size: 16px;
      font-weight: 700;
      color: #000000 !important;

      div {
        padding-bottom: 8px;
      }
    }

    .indicatorsDesc > div {
      display: flex
    }

    & /deep/ .el-dialog__header {
      padding: 0
    }

    & /deep/ .el-dialog {
      width: 800px;
      max-height: 600px;
      border-radius: 3px;
      margin-top: 60px !important;
      margin-bottom: 0 !important;
    }

    & /deep/ .el-dialog__body {
      padding: 10px 0;
      width: 100%;
      max-height: 460px;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    & /deep/ .el-form-item__label {
      text-align: left;
      line-height: 30px;
      font-size: 16px;
      width: 110px !important;
      white-space: nowrap;
    }

    & /deep/ .el-form-item__content {
      margin-left: 100px !important;
      font-size: 16px;
      line-height: 30px;
      display: flex;
      font-weight: 700;
      color: #000000
    }

    & /deep/ .el-select .el-input__inner {
      width: 120px !important;
    }

    & /deep/ .el-select {
      margin-right: 20px;
    }

    & /deep/ .el-input__inner {
      height: 30px;
      border-radius: 50px;
      background-color: rgba(66, 198, 97, 0.0980392);
      border: 0;
    }

    & /deep/ .el-form-item {
      margin-bottom: 10px;
      padding-left: 60px;
      padding-right: 80px;
    }

    & /deep/ .el-button {
      border-radius: 50px;
      border: 0;
    }

    .jdList {
      padding: 0 60px;

      p {
        font-size: 16px;
        font-weight: 600;
        padding: 0;
        margin: 0;
        height: 40px;
        line-height: 40px;
        color: #333;

        span {
          float: right;
          background: #60cd59;
          cursor: pointer;
          color: #fff;
          border-radius: 2px;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          margin-top: 5px;
          margin-right: 13px;
        }
      }

      .contentTitle {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        background-color: #e9e9e9;

        > div {
          font-size: 14px;
          color: #000000;
          font-weight: 700;
          white-space: nowrap;
          padding-left: 5px;
        }
      }

      .tBody {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;

        > div {
          padding-right: 10px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 5px;
        }

        &:nth-of-type(odd) {
          background-color: #f6f6f6
        }
      }

      .one {
        width: 35%;
      }

      .two {
        width: 20%;
      }

      .three {
        width: 17.5%;
      }

      .four {
        width: 17.5%;
      }

      .five {
        width: 10%;

        span {
          display: inline-block;
          padding: 7px 10px;
          cursor: pointer;
          color: #fff;
          border-radius: 2px;
          background: #18be9b;
        }
      }
    }
  }

</style>

