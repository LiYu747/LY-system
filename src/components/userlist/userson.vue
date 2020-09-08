<template>
  <div class="m-t2">
    <el-table
      :data="arrusers"
      border
      style="width: 100%"
    >
      <el-table-column fixed prop="ind" align="center" label="#" width="120"></el-table-column>
      <el-table-column prop="username" align="center" label="姓名" width="200"></el-table-column>
      <el-table-column prop="role_name" align="center" label="角色" width="200"></el-table-column>
      <el-table-column prop="mobile" align="center" label="电话" width="200"></el-table-column>
      <el-table-column prop="email" align="center" label="邮编" width="200"></el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change='chang(scope.row)' active-color="#13ce66" inactive-color="#cccccc"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="add(scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" @click="del(scope.row)" icon="el-icon-delete"></el-button>
          <el-button type="warning" size="small" @click="sett(scope.row)" icon="el-icon-setting"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block m-t1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="(Number(total) )"
      ></el-pagination>
    </div>
    <formlay :Visible.sync="Visible" :formdata="kok" @lol="kok=[]" @cancel="cancel" @ok="ok"></formlay>
    <formlay :Visible.sync="Visible1" :title="title" :formdata="kok" @lol="ads=[]"  @cancel="cancel1" @ok="ok1">
       <template v-slot:mm>
            <div class="mar">当前用户：{{user}}</div>
            <div class="mar">当前角色：{{role}}</div>
       </template>
    </formlay>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      ads:[],
      title:'分配用户',
      kok: [],
      pagenum: 2, //条数
      currentPage: 1, //页数
      Visible: false,
      Visible1:false,
      id:'',
      user:'',
      role:'',
      formData: [
        {
          label: "用户名",
          type: "input",
          prop: "username",
          value: "",
          disabled: true,
          //  rules:[
          //     {
          //       message:'用户名不能为空',
          //       tirgger:'blur'
          //     }
          //   ],
          // attrs:{
          //    placeholder:'请输入用户名',
          // }
        },
        {
          label: "邮箱",
          type: "input",
          prop: "email",
          value: "",
          rules: [
            {
              required: true,
              message: "邮箱不能为空",
              tirgger: "blur",
            },
            { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
          ],
          attrs: {
            placeholder: "请输入用户名",
            clearable: true,
          },
        },
        {
          label: "电话",
          type: "input",
          prop: "tell",
          rules: [
            {
             required: true,
              message: "电话号码不能为空",
              tirgger: "blur",
            }, 
          ],
          value: "",
          attrs: {
            placeholder: "请输入电话",
            clearable: true,
          },
        },
      ],
       formData1:[
            {
          label:'',
          type:'select',
          value:'',
               prop:'role',
          children:[
          ],
          attrs:{
             placeholder:'请输入用户名',
               clearable:true,
             'show-password':true
          }
        }
       ]
    };
  },
  methods: {
    // 修改请求
    userss() {
      this.users({
        query: '',
        pagenum: this.currentPage,
        pagesize:this.pagenum,
      });
    },
    ...userActions(["users"]),
    handleSizeChange(val) {
      this.pagenum = val;
      this.userss()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
       this.userss()
    },
    // 点击状态
    chang(ivu){
     console.log(ivu);
     this.$store.dispatch('user/settype',{
         uId:ivu.id,
         type:ivu.mg_state
    })
    },
    //删除用户
   del(row){
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$store.dispatch('user/deluser',{
          id:row.id
         })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.userss();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
    //点击编辑
    add(row) {
      this.formData.map((item, index) => {
        if (index === 0) {
          item.value = row.username;
        }
        if (index === 1) {
          item.value = row.email;
        }
        if (index === 2) {
          item.value = row.mobile;
        }
      });
      this.id = row.id
      this.kok = this.formData;
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
            this.$store.dispatch('user/setuser',{
         id:this.id,
         email:val.options.email,
         mobile:val.options.tell
    })
     this.userss();
          this.kok = [];
          this.Visible = false;
          val.formRef.resetFields();
        } else {
          this.$message.error("表单填写错误");
        }
      });
    },
    //分配
    sett(row){
          this.arrsetroles.map((itema,index) => {
               this.ads.push({label:itema.roleName,type:'option',value:index},   
               )
          })
          this.formData1.map(item1=>{
            item1.children = this.ads
          })
          console.log(this.formData1);
      this.id = row.id
      this.user = row.username
      this.role = row.role_name
      this.Visible1 = true
    this.kok = this.formData1
    },
    cancel1(){
       this.Visible1 = false;
      this.ads = [];
    },
    //   角色选择
    ok1(val){
 this.arrsetroles.map((item,index) => {
        if(index===val.options.role){
          this.$store.dispatch('user/setroleid',{
         id:this.id,
         rid:item.id
    })
        }
 })
  this.Visible1 = false;
      this.ads = [];
       this.userss()
    },
    //请求
    resq(){
       this.$store.dispatch('user/getroles')
    }
  },
  mounted() {
    this.userss();
  this.resq()
  },
  watch: {
     arrusers: {
      handler() {
        console.log("得到数据");
      },
      immediate: true
    }
  },
  computed: {
    ...userState(["arrusers", "total","arrsetroles"]),
  },
};
</script>

<style scoped lang='scss'>
.mar{
  margin: 20px 0;
}
</style>