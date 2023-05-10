<template>
  <a-video :src="videoURL" :width="width" :height="height" position="0 -0.5 0" opacity="0.5"></a-video>
</template>

<script>
export default {
  name: 'ArVideo',
  props: ['width', 'height', 'videoURL'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
