<template>
 <div>
   <!-- 权限列表 -->
  <div class="box"> 
   <tablelay
       :tableData='rightsdata'
        :columns="columns"
         @handleSizeChange='handleSizeChange'
         @handleCurrentChange="handleCurrentChange"
      >
        <!-- 操作 -->
        <template v-slot:action='scope'>
          <el-tag v-if="scope.scope.row.level==='0'">一级</el-tag>
         <el-tag type="success" v-if="scope.scope.row.level==='1'">二级</el-tag>
<el-tag type="warning" v-if="scope.scope.row.level==='2'">三级</el-tag>
            <!-- <el-button @click="add(scope.scope.row.level)"></el-button> -->
        </template>
        </tablelay>
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
  columns:[
              
               {label:'#',
                prop:'idx',
                width:'150',
                 align:'center'
              },
               {label:'权限名称',
                prop:'authName',
                 align:'center'
              },
                 {label:'权限等级',
                 align:'center'
              },
            ],
     
     }
   },
   methods: {
   ...userActions(['setrights']),
   Data(){
         this.setrights({type:'list'})
   },
   handleSizeChange(val){
    console.log(val);
   },
   handleCurrentChange(val){
     console.log(val);
   },
   del(){

   },
   add(va){
       console.log(va);
   }
   },
   mounted() {
    this.Data()
   },
   watch: {

   },
   computed: {
 ...userState(['rightsdata'])
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