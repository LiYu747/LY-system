<template>
 <div>
   <!-- 角色列表 -->

  <div class="box">
      <div class=" m-b2"><el-button type="primary">添加角色</el-button></div> 
      <tablelay
      :expand='true'
       :tableData='arrsetroles'
        :columns="columns"
         @handleSizeChange='handleSizeChange'
         @handleCurrentChange="handleCurrentChange"
      >
        <!-- 操作 -->
        <template v-slot:action="scope">
           <el-button type="danger" size='mini' @click="del(scope.scope)" >删除</el-button>
               <el-button type="scuuess" size='mini' @click="add" >编辑</el-button>
        </template></tablelay>
  </div>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("aumt");
const { mapState: userState, mapActions: userActions } = userModule;
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
           tableData: [],
       columns:[
              
               {label:'#',
                prop:'idx',
                width:'50',
                 align:'center'
              },
               {label:'职位',
                prop:'roleName',
                 align:'center'
              },
                {label:'描述',
                prop:'roleDesc',
                 align:'center'
              },
                 {label:'操作',
                 align:'center'
              },
            ],
     }
   },
   methods: {
    handleSizeChange(){
      console.log(11);
    },
    handleCurrentChange(){
      console.log(11);
    },
    getData(){
      this.getroles()
    },
      ...userActions(['getroles']),
   },
   mounted() {
    this.getData()

   },
   watch: {

   },
   computed: {
   ...userState(['arrsetroles'])
   }
 }
</script>

<style scoped lang='scss'>
.box {
  width: 94%;
  margin-top: 20px;
  margin-left: 20px;
  background: white;
  box-shadow: 0 0 5px 5px #eeeeee;
  border-radius: 5px;
  padding: 20px;
}
</style>