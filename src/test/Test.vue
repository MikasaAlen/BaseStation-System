<template>
  <div>
    <div class="radio">
      <el-radio-group v-model="radio" v-if="BaseStationInfo">
        <el-radio :label="index"
                  v-for="(item,index) in BaseStationInfo"
                  :key="index"
        >
            <span style="margin: 0 5px">{{ item.jcry}}</span>
            <span style="margin: 0 5px">{{ item.jzmc }}</span>
            <span style="margin: 0 5px">{{ item.detectionTime }}</span>
<!--          {{item.jcry}}-->
<!--          {{item.jzmc}}-->
<!--          {{item.detectionTime }}-->
        </el-radio>
      </el-radio-group>
    </div>

  </div>

</template>

<script>
    export default {
        name: "Test",
      data() {
          return {
            radio:"1",
            BaseStationInfo: [
              {
                jcry:"wzh",
                jzmc:"nds",
                detectionTime:"10:00"
              },
              {
                jcry:"cj",
                jzmc:"qqq",
                detectionTime:"19:00"
              },
              {
                jcry:"wxd",
                jzmc:"dsa",
                detectionTime:"22:00"
              },
            ]
          }
      }
    }
</script>

<style scoped>
  .el-radio {
    display: block;
    line-height: 25px;
    font-size: 20px;
    margin-left: 10px;
    white-space: normal;
  }
</style>
