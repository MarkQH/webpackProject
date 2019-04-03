<template lang="pug">
  div
    slot
</template>
<script>
export default {
  mounted(){
    console.log('APP')
    this.$_get('https://www.baidu.com').then(res => console.log(res)).catch(err => console.log(err))
  }
}
</script>
<style lang="scss" scoped>

</style>
