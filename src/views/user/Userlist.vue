<template>
  <div>
    <div class="box ">
      <div class="flex al-center">
        <div class="fz-color-AZ">
    <el-input  v-model="input" class="ipt" placeholder="请输入内容"></el-input>
        </div>
        <div class="search flex al-center ju-center">
          <img class="img" src="../../img/userlist/search.png" alt />
        </div>
        <div class="m-l3">
          <el-button @click="dialogFormVisible = true" type="primary">添加用户</el-button>
        </div>
        <div>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
              <el-form-item label="用户名"   prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name" class="ipt1" autocomplete="off" ></el-input>
              </el-form-item>
                <el-form-item label="密码"   prop="password" :label-width="formLabelWidth">
                <el-input v-model="form.password" type="password" class="ipt1" autocomplete="off" ></el-input>
              </el-form-item>
                <el-form-item label="邮箱"   prop="email" :label-width="formLabelWidth">
                <el-input v-model="form.email" class="ipt1" autocomplete="off" ></el-input>
              </el-form-item>
               <el-form-item label="电话"   prop="tell" :label-width="formLabelWidth">
                <el-input v-model="form.tell" class="ipt1" autocomplete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="okk">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <userson></userson>
    </div>
  </div>
</template>

<script>
import userson from "../../components/userlist/userson";
export default {
  name: "",
  props: {},
  components: {
    userson,
  },
  data() {
    return {
      input: "",
      dialogFormVisible: false,
      form: {
        name: "",
        password:'',
        email:'',
        tell:''
      },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '请输入至少两位用户名', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '请输入至少六位密码', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {type:'email',message:'请输入正确的邮箱格式', trigger: 'blur'}
          ],
          tell:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
             {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: "请输入正确的手机号码格式",
            trigger: ["blur"],
          },
          ],
        },
      formLabelWidth: "150px",
    };
  },
  methods: {
    reslist(){
      this.$store.dispatch('user/getuser',{
      username:this.form.name,    
      password:this.form.password,
      email:this.form.email,
      mobile:this.form.tell
    })
    },
  okk(){
    this.dialogFormVisible = false,
    this.reslist()

  }
  },
  mounted() {
    
  },
  watch: {},
  computed: {},
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
.ipt1{
  width: 500px;
  border-radius: 5px;
}
</style>