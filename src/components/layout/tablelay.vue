<template>
 <div class="block sS-ksaka-a">
  <el-table :data="tableData" @selection-change='add'  :border="borde"    :row-key="rowkey" v-loading="!tableData.length">
       <el-table-column v-if='expand === true' type="expand">
      <template slot-scope="props"  v-for="item in columns">
        <el-form label-position="left" inline class="demo-table-expand"  :key="item.id">
                      <el-form-item :label="item.label" >
                  <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <template v-for="item in columns">
      <el-table-column
        v-if="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
        :key="item.id"
      >
         <template slot-scope="scope">
          <slot v-if="item.slots" :name="item.slots" :scope='scope'></slot>
          <template v-else>{{scope.row[item.prop]}}</template>
         </template>
      </el-table-column>
        
         <el-table-column
          v-else
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :key="item.id"
      >
        <template slot-scope="scope">
          <slot name="action" :scope='scope'></slot>
        </template>
      </el-table-column>
    </template>
  
  </el-table>
   <div class="cener">
    <el-pagination
    class="mar"
      v-if="pageshow===true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tatol">
    </el-pagination>
   </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    rowkey:{
      type:String,
     default:''
    },
    expand:{
   type:Boolean,
default:false
    },
      borde:{
type:Boolean,
default:true
      },
    //控制分页的显示与隐藏
    pageshow:{
 type: Boolean,
 default:false
    },
    // 展示数据
    tableData: {
      type: Array,
      required: true,
    },
    //表头
    columns: {
      type: Array,
      required: true,
    },
    // 总数
    tatol:{
      type:Number,
      default:0
    },
   // 默认跳转到几页
    currentPage:{
      type:Number,
      default:1
    },
    // 设置翻页数量
    pagesizes:{
      type:Array,
       default:()=> [10,20,30,40]
    },
    // 一页多少条
    pagesize:{
      type:Number,
      default:10
    }
  },
  components: {},
  data() {
    return {
      
    };
  },
  methods: {
      add(){
console.log(11);
      },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit('handleSizeChange',val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
          this.$emit('handleCurrentChange',val)
      }
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.cener{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.mar{
margin-top: 20px;
margin-right: 40px;
}
</style>