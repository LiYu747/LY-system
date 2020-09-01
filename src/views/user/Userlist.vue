<template>
  <div>
    <div class="box fz-color-AZ">
      <div class="flex al-center">
        <el-input v-model="input" class="ipt" placeholder="请输入内容"></el-input>
        <div class="search flex al-center ju-center">
          <img class="img" src="../../img/userlist/search.png" alt />
        </div>
        <div class="m-l3">
          <el-button @click="dialogFormVisible = true" type="primary">添加用户</el-button>
        </div>
        <div>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {},
  mounted() {},
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
</style>