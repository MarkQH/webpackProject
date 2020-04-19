<template lang='pug'>
  .container
    .file-box
      h3 把文件拖放到此处上传
    .input-box
      input(type="file" name="files" multiple @change="upload_files")
      input(type="file" name="file" @change="upload_file")
</template>

<script>
  // import _ from 'lodash'
  export default {
    data () {
      return {

      }
    },

    mounted () {
      
    },

    methods:{
      upload_files(e) {
        console.log(e);
      },
      async upload_file(e) {
        let formdata = new FormData();
        formdata.append('files', e.target.files[0]);
        let res = await this.$_file_upload('/linkfin/gjfs/file/upload', formdata, this.upload_process)
      },
      upload_process(process) {
        console.log(process);
      }
    }
  }
</script>

<style lang='less' scoped>
.container{
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .file-box{
    display: flex;
    width: 500px;
    height: 200px;
    border: 2px dotted #427fed;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    h3{
      color: #427fed;
    }
  }
}
</style>