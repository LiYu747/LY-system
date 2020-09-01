<template>
 <div>
 <div class="back flex al-center ju-center">
     <div class="box">
     <div class="nav flex ju-center al-center fz-cu fz-18">
           欢迎来到小爱后台管理系统
     </div>
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
  <el-form-item label="请输入用户名" prop="username" class=" m-t3">
    <el-input v-model="ruleForm.username" class="ipt"></el-input>
  </el-form-item>
   <el-form-item label="请输入密码" prop="password" class=" m-t3">
    <el-input v-model="ruleForm.password" type="password" class="ipt"></el-input>
  </el-form-item>
     </el-form>
     <div class="flex-d al-center">
    <div class=" m-t4 fz-16">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
     <div class=" m-t3"> <el-button type="primary" @click="loginadd">立即登录</el-button></div>
     </div>
     </div>
 </div>
 </div>
</template>

<script>
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
       ruleForm: {
          username: '',
          password:''
        },
         rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '请输入至少两位用户名', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '请输入至少六位密码', trigger: 'blur' }
          ],
        }
     }
   },
   methods: {
  loginadd(){
    console.log(this.ruleForm.username);
    this.$store.dispatch('user/login',{
      username:this.ruleForm.username,    
      password:this.ruleForm.password
    })
  }
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.back{
    background: url('../img/tim3.jpg');
    width: 100%;
    height: 100vh;
}
.box{
    width: 700px;
    height: 400px;
    background: wheat;
}
.nav{
    height: 60px;
    border-bottom: 1px solid #cccccc;
}
.ipt{
  width: 80%;
}
</style>