<template>
  <RouterView></RouterView>
</template>

<script>
import 'mind-ar/dist/mindar-image.prod.js'
import 'aframe'
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import {RouterView} from 'vue-router'

export default {
  name: 'App',
  /* eslint-disable */
  components: {
    RouterView
  }
}
</script>

<style>
body {
  background-color: whitesmoke;
}
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
