<template>
  <PageHeader v-if="this.$route.name != 'ar'"></PageHeader>
  <RouterView></RouterView>
</template>

<script>
import 'mind-ar/dist/mindar-image.prod';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod';
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';

export default {
  name: 'App',
  /* eslint-disable */
  components: { RouterView, PageHeader },
  created() {
    if (this.$store.state.user) return;
    this.$store.dispatch('getUserData')
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: whitesmoke;
  margin: 0;
  overflow: scroll;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input, textarea {
  display: block;
  border: none;
  border-radius: 28px;
  margin: 0 auto;
  height: 40px;
  width: 300px;
  padding: 0px 16px 0px 16px;
  outline: none;
}

textarea {
  height: 70px;
  padding: 26px 16px;
}

label {
  text-align: left;
  display: block;
  width: 300px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 2px;
  padding-bottom: 0;
  font-size: smaller;
}

input:focus,textarea:focus {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.btn {
  border: none;
  border-radius: 28px;
  background: rgb(116, 9, 121);
  background: linear-gradient(90deg, rgba(116, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%);
  height: 40px;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  min-width: 150px;
  width: auto;
  margin: 0 auto;
  margin-top: 10px;
  display: block;
}

.btn:hover {
  background: linear-gradient(90deg, rgba(116, 9, 121, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%);
  cursor: pointer;
}

.btn-secondary {
  background: lightgray;
  color: #2c3e50;
}

.icon-btn {
  font-size: 22px;
  cursor: pointer;
}

.title {
  font-size: 30px;
}

input[type=file] {
  width: 300px;
  border-bottom: 1px solid lightgrey;
  padding: 0px;
  border: 1px solid lightgray;
  text-align: left;
}

input[type=file]::-webkit-file-upload-button {
  visibility: hidden;
}

input[type=file]::before {
  content: 'Select files 📁';
  display: inline-block;
  padding: 10px 10px;
  cursor: pointer;
}
input[type=file]:hover::before {
  content: 'Select files 📂';
}
input[type=file]:hover {
  cursor: pointer;
}

hr {
  width: 90%;
  color: lightgrey;
  height: 0px;
  border: none;
  border-top: 1px solid lightgray;
  margin: 20px;
}
</style>
