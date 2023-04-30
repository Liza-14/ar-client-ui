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
      <a-entity v-for="(item, index) in this.$store.state.pictures[this.id]" :key="item.id" :mindar-image-target="'targetIndex: '+ index">
        <!-- <ArButtons :id="item.id"/> -->
        <ArVideo v-if="item.video" :videoURL="buildResourcesUrls(item.video)" width="1" :height="item.height"/>
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
  // eslint-disable-next-line vue/no-unused-components
  components: { ArButtons, ArVideo },
  async created() {
    await this.$store.dispatch('loadPictures', this.id);
  },
  methods: {
    getTargetSrc() {
      return `imageTargetSrc: http://localhost:9000/uploads/targets_${this.id}.mind; maxTrack: 1;`;
    },
    buildResourcesUrls(resourcePath) {
      return `http://localhost:9000/${resourcePath}`;
    },
  },
};
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
