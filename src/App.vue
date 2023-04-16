<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ArScene />
</template>

<script>
import ArScene from './components/ArScene.vue';

export default {
  name: 'App',
  components: {
    ArScene
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
