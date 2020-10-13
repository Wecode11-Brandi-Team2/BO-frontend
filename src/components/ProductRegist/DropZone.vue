<template>
  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
// import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import '../../styles/dropzone.scss';

export default {
  name: 'DropZone',
  components: { vueDropzone: vue2Dropzone },
  data: function() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 4,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        clickable: true
      }
    };
  }
};
</script>
