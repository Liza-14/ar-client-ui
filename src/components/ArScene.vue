<template>
  <a-scene mindar-image="imageTargetSrc: ./targets.mind; maxTrack: 2;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-camera position="0 0 0" look-controls="enabled: true"
        cursor="fuse: false; rayOrigin: mouse;" raycaster="objects: .clickable">
      </a-camera>
      <a-entity v-for="item in items" v-bind:key="item.id" :mindar-image-target="'targetIndex:' + item.id">
        <ArButtons :item="item"/>
        <ArVideo v-if="item.video" :width="1" :height="1"/>
      </a-entity>
    </a-scene>
</template>

<script>
import ArButtons from './ArButtons.vue';
import ArVideo from './ArVideo.vue';

export default {
  name: 'ArScene',
  components: [ArButtons, ArVideo],
  data() {
    return {
      items: [
        { 
          id: 0,
          video: "./video.mp4",
          // video: null, 
          image: "./photo.png"
        }
      ]
    }
  },
  methods: {
    getMeta(url, cb) {
      const img = new Image();
      img.onload = () => cb(null, img);
      img.onerror = (err) => cb(err);
      img.src = url;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
