<template>
  <div>
    <div class="nav flex al-center pos-rel ">
      <div>欢迎来到小爱后台系统</div>
      <div class="pos-abs move flex al-center fz-color-AZ">
        {{ nowDate }} <div class="m-l1">{{ nowTime }}</div>
        <iframe
        class="m-l1 "
          scrolling="no"
          src="https://tianqiapi.com/api.php?style=ty&skin=pitaya"
          frameborder="0"
          width="180"
          height="50"
          allowtransparency="true"
        ></iframe>
        <div class="flex m-l1">
              <div>亲爱的,{{user.username}}</div>
        <div class="m-l1 col">退出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      str: "",
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      user:{}
    };
  },
  methods: {
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      if (this.hour > 12) {
        // this.hour -= 12;
        this.str = "下午";
      } else {
        this.str = "上午";
      }
      this.month = check(month);
      this.day = check(day);
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate = year + "年" + this.month + "月" + this.day + "日";
      this.nowTime =
        this.str + this.hour + ":" + this.minute + ":" + this.second;
    },
  },
  mounted() {
     this.user = JSON.parse(localStorage.getItem('user')) 
  },
  created() {
    this.timer = setInterval(this.getTime, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.nav {
  height: 60px;
  padding: 0 60px;
  color: rgb(46,94,133);
}
.move {
  right: 60px;
}
.col{
    color: rgb(64,158,255);
}
</style>