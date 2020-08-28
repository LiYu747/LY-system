<template>
 <div>
 <div class="back flex al-center ju-center">
     <div class="box">
     <div class="nav flex ju-center al-center fz-cu fz-18">
           欢迎来到小爱后台管理系统
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

     }
   },
   methods: {

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
</style>