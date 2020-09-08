<template>
  <div class="box">
    <div id="main" style="width: 1200px;height:400px;"></div>
  </div>
  
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("repor");
const { mapState: userState, mapActions: userActions } = userModule;
import echarts from "echarts";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...userActions(['getreports']),
    getData(){
       this.getreports()
    }
  },
  mounted() {
     this.getData()
  },
  watch: {
      datas() {
           // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data:this.datas.legend.data,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.datas.xAxis[0].data,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: this.datas.series
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
      },
   
  },
  computed: {
    ...userState(['datas'])
  },
};
</script>

<style scoped lang='scss'>
.box {
  width: 96%;
  margin-top: 20px;
  margin-left: 20px;
  background: white;
  box-shadow: 0 0 5px 5px #eeeeee;
  border-radius: 5px;
  padding: 20px;
}
</style>