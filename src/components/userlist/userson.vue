<template>
  <div class="m-t2">
    <el-table :data="arrusers.slice(currentPage*pagenum-pagenum,currentPage*pagenum)" border style="width: 100%">
      <el-table-column fixed prop="ind" align="center" label="#" width="120"></el-table-column>
      <el-table-column prop="username" align="center" label="姓名" width="200"></el-table-column>
      <el-table-column prop="role_name" align="center" label="角色" width="200"></el-table-column>
      <el-table-column prop="mobile" align="center" label="电话" width="200"></el-table-column>
      <el-table-column prop="email" align="center" label="邮编" width="200"></el-table-column>
      <el-table-column label="状态" align="center" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#cccccc"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
         <template slot-scope="scope">
          <el-button type="primary" size="small" @click="add(scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
                  <el-button type="warning" size="small" icon="el-icon-setting"></el-button>
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
      :total="(Number(total) )">
    </el-pagination>
  </div>
  <formlay 
    :Visible.sync='Visible'
      :formdata="kok"
      @lol="kok=[]"
      @cancel='cancel'
      @ok='ok'></formlay>
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
      kok:[],
        pagenum:2, //条数
        currentPage:1, //页数
            Visible:false,
        formData:[
          {
          label:'用户名',
          type:'input',
          prop:'username',
          value:'',
          disabled:true,
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
          label:'邮箱',
          type:'input',
          prop:'email',
          value:'22',
           rules:[
              {
                required:true,
                message:'邮箱不能为空',
                tirgger:'blur'
              }
            ],
          attrs:{
             placeholder:'请输入用户名',
             clearable:true
          }
        },
        {
          label:'电话',
          type:'input',
            prop:'tell',
            rules:[
              {
                required:true,
                message:'电话号码不能为空',
                tirgger:'blur'
              }
            ],
          value:'',
          attrs:{
             placeholder:'请输入用户名',
               clearable:true,
          }
        },
        ]
    };
  },
  methods: {
    userss() {
      this.users({
        query: "",
        pagenum: "1",
        pagesize: "10",
      });
    },
    ...userActions(["users"]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagenum = val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
      },
       add(row){
         this.formData.map((item,index)=>{
           if(index===0){
             item.value = row.username
           }
           if(index===1){
             item.value = row.email
           }
           if(index===2){
             item.value = row.mobile
           }
         })
     this.kok = this.formData
    console.log( this.kok);
           this.Visible = true
     },
      cancel(val){
         this.$message.success('点击取消')
         this.Visible = false
         this.kok=[]
         val.formRef.resetFields()
      },
          ok(val){
            val.formRef.validate(vaild=>{
              if(vaild){
                  this.kok=[]
                 this.$message.success('点击确定')
            this.Visible = false
           val.formRef.resetFields()
              }
              else{
                this.$message.error('表单填写错误')
              }
            })
      },
  },
  mounted() {
    this.userss();
  },
  watch: {},
  computed: {
    ...userState(["arrusers", "total"]),
  },
};
</script>

<style scoped lang='scss'>

</style>