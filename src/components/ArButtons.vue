<template>
    <a-image :id="'play-btn' + id" class="clickable" transparent="true" src="./logo.png" width="0.2" height="0.2" position="0.3 -0.7   0.1"></a-image>
    <a-image :id="'info-btn' + id" class="clickable" transparent="true" src="./logo.png" width="0.2" height="0.2" position="-0.3 -0.7 0.1"></a-image>
</template>
  
  <script>
  export default {
    name: 'ArButtons',
    props: ['id']
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  </style>
  