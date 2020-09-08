<template>
  <div class="box">
    <div>
      <el-button @click="addto" type="primary">添加分类</el-button>
    </div>

    <tablelay
      :rowkey="cat_id"
      class="m-t3"
      :tatol="tatol"
      :tableData="categoriesdata"
      :columns="columns"
      :pageshow="true"
      :pagesize="pagesize"
      :currentPage="currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <!-- 是否有效 -->
      <template v-slot:deleted="scope">
        <i class="el-icon-success" v-if="scope.scope.row.cat_deleted===false"></i>
      </template>
      <template v-slot:level="scope">
        <el-tag v-if="scope.scope.row.cat_level===0">一级</el-tag>
        <el-tag type="success" v-if="scope.scope.row.cat_level===1">二级</el-tag>
        <el-tag type="warning" v-if="scope.scope.row.cat_level===2">三级</el-tag>
      </template>
      <!-- 操作 -->
      <template v-slot:action="scope">
        <el-button type="primary" size="small" @click="adds(scope.scope.row)" icon="el-icon-edit"></el-button>
        <el-button type="danger" size="small" @click="del(scope.scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </tablelay>

    <formlay
      :Visible.sync="Visible"
      :title="title"
      :formdata="formData"
      @cancel="cancel"
      @ok="ok"
      @input="inpt"
      :options="allda"
    ></formlay>
      <formlay
      :Visible.sync="Visible1"
      :title="title1"
      :formdata="addData"
      @cancel="cancel1"
      @ok="ok1"
      @lol='addData=[]'
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
  components: {
   
  },
  data() {
    return {
      cat_id: "cat_id",
      Visible: false,
      pagesize: 10,
      currentPage: 1,
      columns: [
        { label: "#", prop: "idx", width: 150, align: "center" },
        { label: "分类名称", prop: "cat_name", width: 250, align: "center" },
        {
          label: "是否有效",
          prop: "deleted",
          slots: "deleted",
          align: "center",
        },
        { label: "排序", prop: "level", slots: "level", align: "center" },
        { label: "操作", width: "280", align: "center" },
      ],

      //表单
      formData: [
        {
          label: "分类名称",
          type: "input",
          prop: "username",
          value: "",
          rules: [
            {
              required: true,
              message: "分类名称不能为空",
              tirgger: "blur",
            },
          ],
          attrs: {
            placeholder: "",
          },
        },
        {
          label: "父级分类",
          type: "cascader",
          prop: "user",
          value: "value",
          disabled: true,
          rules: [
            {
              message: "用户名不能为空",
              tirgger: "change",
            },
          ],
          attrs: {
            placeholder: "请选择",
          },
        },
      ],
      title: "添加分类",
      cat_pid: "",
      cat_name: "",
      cat_level: "",
      num: "",
      id:'',  //修改编辑id
      //表单
       allda: [],
     Visible1:false,
     title1:'编辑分类',
     addData:[],
      formData1: [
        {
          label: "分类名称",
          type: "input",
          prop: "username",
          value: "",
          rules: [
            {
              required: true,
              message: "分类名称不能为空",
              tirgger: "blur",
            },
          ],
          attrs: {
            placeholder: "",
          },
        },
      ]
    }
  },
  methods: {
    ...userActions(["getcategories"]),
    Gdata() {
      this.getcategories({
        type: 3,
        pagenum: this.currentPage,
        pagesize: this.pagesize,
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.pagesize = val;
      this.Gdata();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Gdata();
    },
    addto() {
      this.Visible = true;
    },
    // 编辑取消
    cancel(val) {
      this.$message.success("点击取消");
      this.Visible = false;
      this.kok = [];
      val.formRef.resetFields();
    },
    // 、、编辑确定
    ok(val) {
      val.formRef.validate((vaild) => {
        if (vaild) {
          console.log(val.options);
          this.cat_name = val.options.username;
          this.cat_pid = val.options.value[val.options.value.length - 1];
          this.categoriesdata.map((item) => {
            if (item.cat_id === this.cat_pid) {
              this.cat_level = item.cat_level + 1;
            }
            item.children.map((item1) => {
              if (item1.cat_id === this.cat_pid) {
                this.cat_level = item1.cat_level + 1;
              }
            });
          });
          console.log(this.cat_level);
          this.$store.dispatch("goodss/getcgs", {
            cat_pid: this.cat_pid,
            cat_name: this.cat_name,
            cat_level: this.cat_level,
          });
          this.Visible = false;
          val.formRef.resetFields();
          this.Gdata();
        } else {
          this.$message.error("表单填写错误");
        }
      });
    },
    inpt(val) {
      if (val) {
        this.formData.map((item) => {
          item.disabled = false;
        });
      } else {
        this.formData.map((item) => {
          if (item.label === "父级分类") {
            item.disabled = true;
          }
        });
      }
    },
    //  删除
    del(val) {
      console.log(val);
      this.$store.dispatch("goodss/cacadel", {
        id: val.cat_id,
         type: 3,
        pagenum: this.currentPage,
        pagesize: this.pagesize,
      });
    },
    // 修改编辑
    adds(val){
       console.log(val);
       this.id = val.cat_id
       this.formData1.map(item => {
         item.value = val.cat_name
       })
       this.addData =  this.formData1
       this.Visible1 = true
    },
    cancel1(){
      this.Visible1 = false
      this.addData= []
    },
    ok1(val){
      console.log(val);
         this.Visible1 = false
         this.addData = []
         this.$store.dispatch('goodss/getcate',{
            id:this.id,
            cat_name:val.options.username	,
              type: 3,
        pagenum: this.currentPage,
        pagesize: this.pagesize,
         })
    }

  },
  mounted() {
    this.Gdata();
    this.allda = JSON.parse(localStorage.getItem("categories"));
    this.allda.map((item) => {
      item.label = item.cat_name;
      item.value = item.cat_id;
      item.children.map((itema) => {
        itema.label = itema.cat_name;
        itema.value = itema.cat_id;
        itema.children = itema.children1;
      });
    });
  },
  watch: {},
  computed: {
    ...userState(["categoriesdata", "tatol"]),
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
.el-icon-success {
  color: skyblue;
}
</style>