<template>
  <div class="container">
    <a-scene
    ref="scene"
    :mindar-image="getTargetSrc()"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    renderer="colorManagement: true, physicallyCorrectLights"
    color-space="sRGB"
    embedded>
      <a-camera position="0 0 0" look-controls="enabled: true" cursor="fuse: false; rayOrigin: mouse;" raycaster="objects: .clickable"></a-camera>
      <a-assets>
        <video
        :ref="videoAsset.key"
        :id="videoAsset.key"
        v-for="videoAsset in videoAssets" :key="videoAsset.key"
        loop
        playsinline
        :src="videoAsset.path"
        crossorigin="anonymous"></video>
      </a-assets>
      <a-entity
        v-for="(pic, index) in pictures" :key="pic.id"
        :mindar-image-target="'targetIndex: '+ index"
        @loaded="setTargetEvents(index, $event.target)">
          <a-video
            v-if="showVideo"
            :autoplay="showVideo"
            :src="'#' + pic.selectedVideo"
            :ref="`arvideo${index}`" width="1" :height="pic.height" position="0 0 0" opacity="0.80">
          </a-video>
      </a-entity>
      <button @click="toHome()" class="btn scene-btn">Back</button>
      <ArSurvey
        v-if="currentSurvey"
        :survey="currentSurvey"
        @complete="(params) => completeSurvey(params)">
      </ArSurvey>
  </a-scene>
  </div>
</template>

<script>
import ArButtons from './ArButtons.vue';
import ArSurvey from './ArSurvey.vue';

const api = process.env.VUE_APP_API_URL;

export default {
  name: 'ArScene',
  props: ['id'],
  // eslint-disable-next-line vue/no-unused-components
  components: { ArButtons, ArSurvey },
  created() {
    this.$store.dispatch('loadPictures', this.id)
      .then(() => {
        this.pictures = [...this.$store.state.pictures[this.id]];
        this.pictures.forEach((p, index) => {
          p.videos.forEach((v) => {
            this.videoAssets.push({ key: `arvideo${index}_${v.id}`, path: this.buildResourcesUrls(v.path) });
          });

          // eslint-disable-next-line no-param-reassign
          p.selectedVideo = `arvideo${index}_${p.videos[0].id}`;
        });

        this.$store.dispatch('getSurveys', this.id);
      });
  },
  unmounted() {
    const overlays = document.getElementsByClassName('mindar-ui-overlay');
    [...overlays].forEach((x) => x.remove());
  },
  data() {
    return {
      currentSurvey: null,
      pictures: [],
      videoAssets: [],
      surveyTargetIndex: 0,
      showVideo: false,
    };
  },
  methods: {
    getTargetSrc() {
      return `imageTargetSrc: ${api}/uploads/targets_${this.id}.mind; maxTrack: 1; filterMinCF:0.000001; filterBeta: 1000`;
    },
    buildResourcesUrls(resourcePath) {
      return `${api}/${resourcePath}`;
    },
    toHome() {
      this.$router.push({ name: 'home' });
    },
    targetFound(index) {
      const picId = this.pictures[index].id;
      this.currentSurvey = this.$store.state.currentSurveys
        .find((x) => x.pictureId.toString() === picId.toString());

      if (!this.currentSurvey) {
        this.showVideo = true;

        // show video
        const video = this.$refs[this.pictures[index]
          .selectedVideo][0];

        video.currentTime = 0;
        video.play();
      } else {
        this.showVideo = false;
      }

      this.surveyTargetIndex = index;
    },
    targetLost(index) {
      this.currentSurvey = null;
      const video = this.$refs[this.pictures[index]
        .selectedVideo][0];

      video.pause();
    },
    setTargetEvents(index, entity) {
      entity.addEventListener('targetFound', () => this.targetFound(index));
      entity.addEventListener('targetLost', () => this.targetLost(index));
    },
    completeSurvey(params) {
      if (params.videoId > 0) {
        this.pictures[this.surveyTargetIndex].selectedVideo = `arvideo${this.surveyTargetIndex}_${params.videoId}`;
      }
      this.currentSurvey = null;
      this.showVideo = true;
      const video = this.$refs[this.pictures[this.surveyTargetIndex]
        .selectedVideo][0];

      video.currentTime = 0;
      video.play();
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
