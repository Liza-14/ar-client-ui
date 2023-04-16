<template>
  <a-video src="./video.mp4" :width="width" :height="height" position="0 0 0" ></a-video>
</template>
  
  <script>
  export default {
    name: 'ArVideo',
    props: ['width', 'height']
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  