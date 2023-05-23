<template>
  <div class="title">Edit picture</div>
  <div class="page-container" v-if="this.$store.state.pictureToEdit">
    <div class="img-container">
      <div class="title">{{ this.$store.state.pictureToEdit.name }}</div>
      <img :src="buildResourcesUrls(this.$store.state.pictureToEdit.image)" alt="">
    </div>
    <form class="pictureForm">
      <div class="title">Details</div>
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="name" v-model="this.$store.state.pictureToEdit.name">
      <label for="description">Description:</label>
      <textarea type="text" id="description" placeholder="description"
        v-model="this.$store.state.pictureToEdit.description"></textarea>
      <button class="btn">Save</button>
    </form>
  </div>

  <div class="title">Videos</div>
  <div class="page-container" v-if="this.$store.state.pictureToEdit">
    <table class="videos">
      <tr>
        <th>Id</th>
        <th>PictureId</th>
        <th>Path</th>
        <th>Action</th>
      </tr>
      <tr v-for="v in this.$store.state.pictureToEdit.videos" :key="v.id">
        <td>{{ v.id }}</td>
        <td>{{ v.pictureid }}</td>
        <td>{{ v.path }}</td>
        <td>
          <button type="button" @click="deleteVideo(v)" class="btn btn-secondary">Delete</button>
        </td>
      </tr>
      <tr class="formRow">
        <td></td>
        <td></td>
        <td>
          <input @change="uploadArVideo" type="file" id="videofile" ref="videofile"
            name="videofile">
        </td>
        <td>
          <button type="button" @click="saveVideo()" class="btn btn-secondary">Save Video</button>
        </td>
      </tr>
    </table>
    <button type="button" @click="toCreateSurvey()" class="btn">Create Survey</button>
  </div>
  <LoadingIndicator />
</template>

<script>
import LoadingIndicator from './LoadingIndicator.vue';

const api = process.env.VUE_APP_API_URL;

export default {
  name: 'EditPicturePage',
  props: ['id'],
  components: { LoadingIndicator },
  data() {
    return {
      videofile: null,
    };
  },
  created() {
    this.$store.dispatch('loadPictureById', this.id);
  },
  methods: {
    buildResourcesUrls(resourcePath) {
      return `${api}/${resourcePath}`;
    },
    uploadArVideo(event) {
      const videofile = event.target.files[0];
      this.videofile = videofile;
    },
    saveVideo() {
      this.$store.dispatch('uploadArVideo', {
        pictureId: this.id,
        videoFile: this.videofile,
      });
    },
    deleteVideo(id) {
      this.$store.dispatch('deleteVideo', id);
    },
    toCreateSurvey() {
      this.$router.push({ name: 'createSurveyPage', params: { pictureId: this.id, exhibitionId: this.$store.state.pictureToEdit.exhibitionid }, query: { exhibitionId: this.$store.state.pictureToEdit.exhibitionid } });
    },
  },
};
</script>

<style scoped>
.pictureForm {
  display: block;
  border-radius: 20px;
  border: 1px solid lightgray;
  padding: 20px;
  flex-grow: 3;
}

.img-container {
  padding: 20px;
  background: white;
  border-radius: 20px;
  flex-grow: 1;
}

.img-container img {
  width: 400px;
}

.page-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 1300px;
}

.videos {
  border: 1px solid lightgrey;
  border-radius: 20px;
  padding: 20px;
  border-collapse: collapse;
  font-size: small;
  width: 100%;
}

.videos th,
td {
  border: 1px solid lightgrey;
  padding: 10px;
  background-color: white;
}

.videos input,
.videos textarea {
  height: 30px;
  width: auto;
  border-radius: 0px;
  margin: 0;
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgrey;
}

.videos input:hover,
textarea:hover {
  box-shadow: none;
}</style>
