<template>
  <div class="box">
    <div class="flex al-center">
      <div class="fz-color-AZ">
        <el-input v-model="input" class="ipt" placeholder="请输入内容"></el-input>
      </div>
      <div class="search flex al-center ju-center">
        <img class="img" src="../../img/userlist/search.png" alt />
      </div>
    </div>
    <tablelay
      class="m-t3"
      :tableData="gooddata"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
         <template v-slot:pay_status="scope">
         <el-tag type="danger" v-if="scope.scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
      </template>
      <!-- 操作 -->
      <template v-slot:action="scope">
        <el-button type="primary" size="small" @click="adds(scope.scope.row)" icon="el-icon-edit"></el-button>
        <el-button type="success" size="small" @click="look(scope.scope.row)" icon="el-icon-location-outline"></el-button>
      </template>
    </tablelay>
      <!-- 表单 -->
      <formlay
        :Visible.sync="Visible"
      :title="title"
         :formdata="formData"
           :options="cityOptions"
            @cancel="cancel"
      @ok="ok"
      ></formlay>
      <formlay
      :formdata="formData1"
       :title="title1"
        :Visible.sync="Visible1"
      >
      <template v-slot:footer>
     <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in kuaididata"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
      </template>
      </formlay>
  </div>
</template>

<script>
import cityOptions from '../../utils/city_data2017_element'
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("order");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      reverse:true,
        cityOptions: cityOptions,
      input:'',
      columns: [
        { label: "#", prop: "idx", width: 100, align: "center" },
        { label: "订单编号", prop: "order_number", width: 250, align: "center" },
        {
          label: "订单价格",
          prop: "order_price",
          align: "center",
        },
        { label: "是否付款", prop: "pay_status", slots:'pay_status', align: "center" },
        { label: "是否发货", prop: "is_send", align: "center" },
        { label: "下单时间", width: "280", prop: "create_time", align: "center" },
        { label: "操作", width: "280", align: "center" },
      ],
      //表单
      Visible:false,
      title:'编辑地址',
      check:false,
       formData: [
        {
          label: "",
          type: "cascader",
          prop: "addasd",
        },
       ],

       //表单二
      title1:'物流信息',
      Visible1:false,
      formData1:[]
    };
  },
  methods: {
    ...userActions(['getorders']),
    getData(){
this.$store.dispatch('order/getorders',{pagenum:1,pagesize:10})
    },
    handleSizeChange(val){
      console.log(val);
    },
    handleCurrentChange(val){
      console.log(val);
    },
    adds(val){
      console.log(val);
      this.Visible = true
    },
    cancel(val){
       this.Visible = false
      console.log(val);
    },
    ok(val){
      this.Visible = false
       val.formRef.resetFields();
      console.log(val);
    },
    look(){
      this.Visible1 = true
    },
    add(val){
      console.log(val);
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('order/getkuaidi',{
      id:1106975712662
    })
  },
  watch: {},
  computed: {
    ...userState(['gooddata','kuaididata'])
  },
};
</script>

<style scoped lang='scss'>
.box {
  width: 95%;
  margin-top: 20px;
  margin-left: 20px;
  background: white;
  box-shadow: 0 0 5px 5px #eeeeee;
  border-radius: 5px;
  padding: 20px;
}
.ipt {
  width: 300px;
}
.search {
  width: 55px;
  height: 39px;
  background: rgb(245, 247, 250);
  border: 1px solid #eee;
  border-radius: 0 4px 4px 0;
}
.img {
  width: 20px;
  height: 20px;
}
</style>