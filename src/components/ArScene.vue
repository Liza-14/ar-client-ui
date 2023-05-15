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
      <a-assets>
        <video
        :ref="'arvideo' + index"
        :id="'arvideo' + index"
        v-for="(videoitem, index) in this.$store.state.pictures[this.id]"
        :key="videoitem.id"
        autoplay
        loop
        playsinline
        :src="buildResourcesUrls(videoitem.video)"
        crossorigin="anonymous"></video>
      </a-assets>
      <a-entity
        :ref="'target'+ index"
        :id="'target'+ index"
        v-for="(item, index) in this.$store.state.pictures[this.id]"
        :key="item.id"
        :mindar-image-target="'targetIndex: '+ index"
        @targetFound="targetFound(index)">
          <a-video :src="'#arvideo' + index" width="1" :height="item.height" position="0 0 0" opacity="0.85"></a-video>
          <!-- <ArButtons :id="item.id"/> -->
      </a-entity>
      <button @click="toHome()" class="btn scene-btn">Back</button>
  </a-scene>
  </div>
</template>

<script>
import ArButtons from './ArButtons.vue';

const api = process.env.VUE_APP_API_URL;

export default {
  name: 'ArScene',
  props: ['id'],
  // eslint-disable-next-line vue/no-unused-components
  components: { ArButtons },
  async created() {
    await this.$store.dispatch('loadPictures', this.id);
  },
  methods: {
    getTargetSrc() {
      return `imageTargetSrc: ${api}/uploads/targets_${this.id}.mind; maxTrack: 1;`;
    },
    buildResourcesUrls(resourcePath) {
      return `${api}/${resourcePath}`;
    },
    toHome() {
      this.$router.push({ name: 'home' });
    },
    targetFound(index) {
      console.log('targetFound', index);
      const video = this.$refs[`arvideo${index}`][0];
      video.currentTime = 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  margin: 0 auto;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

video {
  top: 0 !important;
}

.scene-btn {
  position: absolute;
  z-index: 3;
  right: 0;
  left: 0;
  width: 150px;
}
</style>
