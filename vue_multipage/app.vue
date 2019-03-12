<template lang="pug">
  div 
    div APP页面
    slot
</template>
<script>
export default {
  mounted(){
    console.log('APP')
  }
}
</script>
<style lang="scss" scoped>

</style>
