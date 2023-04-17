<template>
  <div class="container">   
    <ArScene />
  </div>
</template>

<script>
import 'mind-ar/dist/mindar-image.prod.js'
import 'aframe'
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import ArScene from './components/ArScene.vue';

export default {
  name: 'App',
  components: {
    ArScene
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  position: relative;
  height: 90vh;  
  width: 60vw;
  overflow: hidden;
}
</style>
