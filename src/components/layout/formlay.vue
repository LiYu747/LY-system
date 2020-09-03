<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="40%" :before-close="handleClose">
      <el-form :model="fromoption" :rules="rules"   ref="form">
        <template v-for="item in formdata" >
          <!-- 没有children -->
          <el-form-item
          label-width='70px'
            :label="item.label"
            :prop="item.prop"
            :key="item.id"
            v-if="!item.children"
          >
            <!-- 动态渲染组件 -->
            <component
            :disabled='item.disabled'
              v-model="fromoption[item.prop]"
              :is="`el-${item.type}`"
              class="ipt"
              v-bind="item.attrs"
            ></component>
          </el-form-item>
          <!-- 有children -->
          <el-form-item :label="item.label" :prop="item.prop" :key="item.id" v-else>
            <component :is="`el-${item.type}`" v-bind="item.attrs"  v-model="fromoption[item.prop]">
              <component
                v-for="(child,idx) in item.children"
                :key="idx"
                :label="child.label"
                :value="child.value"
                :is="`el-${child.type}`"
              ></component>
            </component>
          </el-form-item>
        </template>
      </el-form>
      <slot name="footer" v-if="$slots.footer"></slot>
      <span slot="footer" v-else class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    Visible: {
      type: Boolean,
      defualt: false,
    },
    title: {
      type: String,
      default: "提示",
    },
    formdata: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      fromoption: {},
      rules: {},
    };
  },
  methods: {
    handleClose() {
      //  修改父元素的值
      this.$emit("update:Visible", false);
      this.$emit('lol')
    },
    cancel() {
      let options = JSON.parse(JSON.stringify(this.fromoption));
      this.$emit("cancel", {
        options: options,
        formRef: this.$refs.form,
      });
    },
    ok() {
      let options = JSON.parse(JSON.stringify(this.fromoption));
      this.$emit("ok", {
        options: options,
        formRef: this.$refs.form,
      });
    },
    setValue() {
      let option = {};
      let rules = {};
      this.formdata.map((item) => {
        rules[item.prop] = item.rules;
        option[item.prop] = item.value;
      });
      this.fromoption = JSON.parse(JSON.stringify(option));
      this.rules = JSON.parse(JSON.stringify(rules));
    },
  },
  mounted() {
    this.setValue();
  },
  watch: {
    formdata() {
      this.setValue();
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>

</style>