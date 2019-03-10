<template lang="pug">
  <router-view></router-view>
</template>

<script>

export default {

  props: {
    name:{
      type: String,
      default: () => {
        return 'Vue'
      }
    }
  },

  data: () => {
    return {
      vue: 'Vue'
    }
  },

  mounted(){
    
  },
}
</script>