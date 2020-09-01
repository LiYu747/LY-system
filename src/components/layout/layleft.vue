<template>
  <div>
    <div class="nav">
      <el-row class="tac">
        <el-col>
          <el-menu :default-active="$route.path"  @select="handleSelect" unique-opened>
            <template v-for="(item,index1) in menus">
              <el-menu-item v-if="index1===0" :index="item.path" @click="add(item)" :key="index1">
                   <i :class="item.icon"></i>
                <span slot="title">{{item.authName}}</span>
              </el-menu-item>
              <el-submenu v-if="index1!==0" :index="item.path" :key="index1">
                <template slot="title">
                     <i :class="item.icon"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group v-for="item1 in item.children"  :key="item1.id">
                  <el-menu-item :index="item1.path" @click="add(item1)">
                     <i :class="item1.icon"></i>
                    {{item1.authName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
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
      locaarr:[] , //存的数据
    };
  },
  methods: {
    ...userActions(["getMenus"]),
    // 点击事件
    handleSelect(key) {
     this.$bus.$emit('send',key)
     this.$router.push(`${key}`)
    },
    add(item){
      let aa =  this.locaarr.includes(JSON.stringify(item) )
        if(aa===false){
          this.locaarr = JSON.parse(this.locaarr)
          this.locaarr.push(item)
      localStorage.setItem('localist',JSON.stringify(this.locaarr) )
        }
    }
  },
  mounted() {
    this.getMenus();
    if(localStorage.getItem('localist')){
      this.locaarr = localStorage.getItem('localist')
    }
  },
  watch: {},
  computed: {
    ...userState(["menus"]),
  },
};
</script>

<style scoped lang='scss'>
.nav {
  width: 200px;
  height: 600px;
  background: red;
}
</style>