<template lang='pug'>
  div(class="container")
    h1 我是A页面
    img(src="../assets/images/dog.jpg")
    button(@click="gotoBpage") B页面
</template>

<script>
  // import _ from 'lodash'
  export default {
    data () {
      return {

      }
    },

    mounted () {
      console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    },

    methods:{
      gotoBpage() {
        this.$router.push('b')
      }
    }
  }
</script>

<style lang='less' scoped>
.container{
  background-color: darkcyan
}
</style>