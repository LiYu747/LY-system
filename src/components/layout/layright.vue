<template>
 <div>
   <div class="line"></div>
    <div class="box flex al-center">
         <div v-for="(item,index) in list" :key="index" @click="add(item,index)" :class="{'dv':flag===item.path}" class="flex fz-12 text al-center ">
                <img v-if="flag===item.path" src="../../img/home/yuan.png" alt="" class="img1">
                 <div class="mar"> {{item.authName}}</div>
                <img v-if="flag===item.path" src="../../img/home/cha.png" class="img2" alt="">
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
    list:[],
    flag:'/'
     }
   },
   methods: {
           add(item){
               this.flag = item.path
              this.$router.push(`${item.path}`) 
           }
   },
   mounted() {
       this.$bus.$on('send',(data)=>{
          this.flag = data
       })
      this.list = JSON.parse(localStorage.getItem('localist'))
    this.list.map((item)=>{
       if(item.path===this.$route.path){
           this.flag = item.path
       }
    })
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.line{
  width: 1300px;
  height: 1px;
  background: #eeeeee;
}
.box{
    margin-left: 20px;
    margin-top: 10px;
    width: 1280px;
    height: 40px;
    border-bottom: 1px solid #eeeeee;
}
.img1{
    width: 8px;
    height: 8px;
}
.img2{
    width: 12px;
    height: 12px;
}
.text{
    padding: 2px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
}
.mar{
    margin: 0 4px;
}
.dv{
    background: rgb(64,158,255);
    color: white;
}
</style>