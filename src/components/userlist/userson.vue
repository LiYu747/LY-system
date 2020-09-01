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
          <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
                  <el-button type="warning" size="small" icon="el-icon-setting"></el-button>
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
        pagenum:2, //条数
        currentPage:1, //页数
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
      }
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