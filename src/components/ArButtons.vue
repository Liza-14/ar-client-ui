<template>
    <a-image :id="'play-btn' + item.id" class="clickable" src="./logo.png" width="0.2" height="0.2" position="0.3 0 0"></a-image>
    <a-image :id="'info-btn' + item.id" class="clickable" src="./logo.png" width="0.2" height="0.2" position="-0.3 0 0"></a-image>
</template>
  
  <script>
  export default {
    name: 'ArButtons',
    props: ['item']
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  