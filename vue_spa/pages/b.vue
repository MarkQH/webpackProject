<template lang='pug'>
  div
    p 我是B页面
    div.div
</template>

<script>
  // import _ from 'lodash'
  export default {
    data () {
      return {

      }
    },
    mounted () {
      console.log(_.partition([1, 2, 3, 4], n => n % 2))
    }
  }
</script>

<style lang='scss' scoped>
body{
  background-color: cadetblue;
  .div{
    background: url('../assets/images/header.png') no-repeat 0 0;
    width: 100px;
    height: 100px;
  }
}
</style>