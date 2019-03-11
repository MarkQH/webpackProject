<template lang="pug">
  div
    h1 我是A页面
    img(src="")
</template>

<script>
export default {
  data: () => {
    return {

    }
  },
  mounted(){
    console.log('Apage')
  }
}
</script>

<style lang="scss" scoped>
  h1{
    color: brown;
  }
</style>