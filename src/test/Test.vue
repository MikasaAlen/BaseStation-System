<template>
  <div>
    <span @click="drawBackground">点位图</span>
    <div>

    </div>
  </div>

</template>

<script>
    export default {
        name: "Test",
      data() {
          return {
            layerList:[],
            background:"/api/maps/202009170001/map-202009170001HZ11-16.png?t=1604046916985"
          }
      },
      methods: {
        drawBackground() {
          let that = this;
          console.log(that.background)
          let source = that.background
          if (!source.includes('?t=')) {
            source = `${source}?t=${Date.now()}`
          }
          $("#draw-picture-target")
            .addLayer({
              name: "background",
              type: "image",
              source,
              x: 300,
              y: 250,
              width: 600,
              height: 500
            })
            .drawLayers();
          this.addLayer(false);
        },
        addLayer(isCurve) {
          this.layerList.push({
            name: this.layerList.length,
            isCurve: isCurve
          });
        },
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
