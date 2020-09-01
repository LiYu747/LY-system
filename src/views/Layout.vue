<template>
 <div>
  <laytop></laytop>
  <div class="flex">
<layleft></layleft>
<div>
<layright></layright>
 <router-view></router-view>
</div>
  </div>
 </div>
</template>

<script>
 import laytop from '../components/layout/laytop'
 import layleft from '../components/layout/layleft'
 import layright from '../components/layout/layright'
 export default {
   name: '',
   props: {
   },
   components: {
    laytop,
    layleft,
    layright
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

</style>