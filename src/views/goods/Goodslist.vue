<template>
  <!-- //商品列表 -->
  <div class="box">
    <div class="flex al-center">
      <div class="fz-color-AZ">
        <el-input v-model="input" class="ipt" placeholder="请输入内容"></el-input>
      </div>
      <div class="search flex al-center ju-center">
        <img class="img" src="../../img/userlist/search.png" alt />
      </div>
      <div class="m-l3">
        <el-button @click="dialogFormVisible = true" type="primary">添加商品</el-button>
      </div>
    </div>

    <tablelay
      class="m-t3"
      :tableData="goodsdata"
      :columns="columns"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <!-- 操作 -->
      <template v-slot:action="scope">
        <el-button type="primary" size="small" @click="add(scope.scope.row)" icon="el-icon-edit"></el-button>
        <el-button type="danger" size="small" @click="del(scope.scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </tablelay>
    <!-- 弹出表单 -->
    <formlay
      :Visible.sync="Visible1"
      :title="title1"
      :formdata="addData"
      @cancel="cancel1"
      @ok="ok1"
      @lol="addData=[]"
    ></formlay>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("goodss");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      input: "",
      columns: [
        { label: "#", prop: "idx", width: "100", align: "center" },
        { label: "商品名称", prop: "goods_name", align: "center" },
        {
          label: "商品价格(元)",
          prop: "goods_price",
          width: "100",
          align: "center",
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          width: "100",
          align: "center",
        },
        { label: "创建时间", width: "200", prop: "add_time", align: "center" },
        { label: "操作", width: "200", align: "center" },
      ],
      //表单
       allda: [],
      Visible1: false,
      title1: "编辑商品",
      addData: [],
      formData1: [
        {
          label: "商品名称",
          type: "input",
          prop: "goodsname",
          value: "",
          rules: [
            {
              required: true,
              message: "商品名称不能为空",
              tirgger: "blur",
            },
          ],
        },
           {
          label: "商品价格",
          type: "input",
          prop: "goodsprice",
          value: "",
          rules: [
            {
              required: true,
              message: "商品价格不能为空",
              tirgger: "blur",
            },
          ],
        },
           {
          label: "商品数量",
          type: "input",
          prop: "goodsnum",
          value: "",
          rules: [
            {
              required: true,
              message: "商品数量不能为空",
              tirgger: "blur",
            },
          ],
        },
           {
          label: "商品重量",
          type: "input",
          prop: "goodsweight",
          value: "",
          rules: [
            {
              required: true,
              message: "商品重量不能为空",
              tirgger: "blur",
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...userActions(["getgoods"]),
    Gdata() {
      this.getgoods({
        query: "",
        pagenum: 1,
        pagesize: 10,
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    add(val) {
      console.log(val);
         this.Visible1 = true
           this.formData1.map((item,index) => {
        if(index===0){
          item.value = val.goods_name
        }
        if(index===1){
          item.value = val.goods_price
        }
        if(index===2){
          item.value = val.goods_number
        }
        if(index===3){
          item.value = val.goods_weight
        }
      })
         this.addData = this.formData1
    },
    del(val) {
      console.log(val);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$store.dispatch('goodss/delgoods',{
        id:val.goods_id,
          query: "",
        pagenum: 1,
        pagesize: 10,
      })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
      cancel1(){
      this.Visible1 = false
      this.addData= []
    },
    ok1(val){
      console.log(val);
         this.Visible1 = false
         this.addData = []
    }
  },
  mounted() {
    this.Gdata();
  },
  watch: {},
  computed: {
    ...userState(["goodsdata"]),
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
.ipt1 {
  width: 500px;
  border-radius: 5px;
}
</style>