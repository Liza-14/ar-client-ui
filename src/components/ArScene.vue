<template>
  <div class="container">
    <a-scene 
    :mindar-image="getTargetSrc()"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    renderer="colorManagement: true, physicallyCorrectLights"
    color-space="sRGB"
    embedded>
      <a-camera position="0 0 0" look-controls="enabled: true" cursor="fuse: false; rayOrigin: mouse;" raycaster="objects: .clickable"></a-camera>
      <a-entity v-for="item in items" :key="item.id" :mindar-image-target="'targetIndex: '  + item.id">
        <ArButtons :id="item.id"/>
        <ArVideo v-if="item.video" :videoURL="item.video" width="1" :height="item.height"/>
      </a-entity>
  </a-scene>
  </div>
</template>

<script>
import ArButtons from './ArButtons.vue';
import ArVideo from './ArVideo.vue';

export default {
  name: 'ArScene',
  props: ['id'],
  components: {ArButtons, ArVideo},
  data() {
    return {
      items: [
        { 
          id: 1,
          video: "./video.mp4",
          // video: null, 
          height: "1.2"
        },
        { 
          id: 0,
          video: "./video2.webm",
          // video: null, 
          height: "1.2"
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
    },
    getTargetSrc() {
      
    console.log(this.id)
      return `imageTargetSrc: http://localhost:9000/api/targetfile/${this.id}; maxTrack: 1;`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  margin: 0 auto;
  position: relative;
  height: 90vh;  
  width: 60vw;
  overflow: hidden;
}
video {
  top: 0 !important;
}
</style>
