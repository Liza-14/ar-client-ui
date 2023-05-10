<template>
  <div class="title">{{ this.$store.state.exhibitionToEdit.name }}</div>
  <div class="page-container">
    <div class="img-container">
      <div class="title">Title picture</div>
      <img src="../assets/placeholder-image.jpg" alt="">
    </div>
    <form class="exhibitionForm">
      <div class="title">Details</div>
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="name" v-model="this.$store.state.exhibitionToEdit.name">
      <label for="description">Description:</label>
      <textarea type="text" id="description" placeholder="description" v-model="this.$store.state.exhibitionToEdit.description"></textarea>
      <label for="address">Address:</label>
      <input type="text" id="address" placeholder="address" v-model="this.$store.state.exhibitionToEdit.address">
      <label for="dateFrom">Active date from: {{ this.$store.state.exhibitionToEdit.datefrom }}</label>
      <input type="date" id="dateFrom" placeholder="dateFrom" v-model="this.$store.state.exhibitionToEdit.dateFrom">
      <label for="dateTo">Active date to: {{ this.$store.state.exhibitionToEdit.dateto }}</label>
      <input type="date" id="dateTo" placeholder="dateTo" v-model="this.$store.state.exhibitionToEdit.dateto">
      <button class="btn">Save</button>
    </form>
  </div>

  <div class="title">Pictures</div>
  <div class="page-container">
        <table class="pictures">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>AR Video</th>
            <th>Ar height rate</th>
            <th>Action</th>
          </tr>
          <tr v-for="picture in this.$store.state.pictures[this.id]" :key="picture.id">
            <td>{{picture.name}}</td>
            <td>{{picture.description}}</td>
            <td>{{picture.image}}</td>
            <td>{{picture.video}}
              <input v-if="!picture.video"
                @change="uploadArVideo"
                type="file" id="videofile" ref="videofile" name="videofile">
            </td>
            <td>{{picture.height}}</td>
            <td>
              <button type="button" v-if="!picture.video" @click="saveVideo(picture.id)" class="btn btn-secondary">Save Video</button>
              <button type="button" @click="deletePicture(picture.id)" class="btn btn-secondary">Delete</button>
            </td>
          </tr>
          <tr class="formRow">
            <td><input type="text" id="name" placeholder="name" v-model="newPicture.name"></td>
            <td><textarea type="text" id="description" placeholder="description" v-model="newPicture.description"></textarea></td>
            <td><input type="file" id="imagefile" @change="uploadFile" ref="imagefile" name="imagefile"></td>
            <td></td>
            <td>1</td>
            <td><button type="button" @click="submit()" class="btn">Add</button></td>
          </tr>
        </table>
        <div>
          <button type="button" @click="generateTargets()" class="btn">Generate Targets</button>
          <button type="button" @click="toAR()" class="btn">AR</button>
          <button type="button" @click="toAR()" class="btn">Delete exhibition</button>
        </div>
    </div>
    <LoadingIndicator/>
</template>

<script>
import LoadingIndicator from './LoadingIndicator.vue';

export default {
  name: 'EditExhibitionPage',
  props: ['id'],
  components: { LoadingIndicator },
  data() {
    return {
      newPicture: {},
      imagefile: null,
      videofile: null,
    };
  },
  created() {
    this.$store.dispatch('loadExhibitionById', this.id);
    this.$store.dispatch('loadPictures', this.id);
  },
  methods: {
    uploadFile() {
      const imagefile = this.$refs.imagefile.files[0];
      this.imagefile = imagefile;
    },
    uploadArVideo(event) {
      const videofile = event.target.files[0];
      this.videofile = videofile;
    },
    saveVideo(pictureId) {
      this.$store.dispatch('uploadArVideo', {
        pictureId,
        videoFile: this.videofile,
        exhibitionid: this.$store.state.exhibitionToEdit.id,
      });
    },
    deletePicture(id) {
      this.$store.dispatch('deletePicture', {
        id,
        exhibitionid: this.$store.state.exhibitionToEdit.id,
      });
    },
    generateTargets() {
      this.$store.dispatch('generateTargets', this.$store.state.exhibitionToEdit.id);
    },
    submit() {
      this.$store.dispatch('uploadPicture', {
        imagefile: this.imagefile,
        authorid: this.$store.state.user.id,
        exhibitionid: this.$store.state.exhibitionToEdit.id,
        ...this.newPicture,
      });
    },
    toAR() {
      this.$router.push({ name: 'ar', params: { id: this.id } });
    },
  },
};
</script>

<style scoped>
.exhibitionForm {
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

.page-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 1300px;
}

.pictures {
  border: 1px solid lightgrey;
  border-radius: 20px;
  padding: 20px;
  border-collapse: collapse;
  font-size: small;
  width: 100%;
}

.pictures th, td{
  border: 1px solid lightgrey;
  padding: 10px;
  background-color: white;
}

.pictures input, .pictures textarea{
  height: 30px;
  width: auto;
  border-radius: 0px;
  margin: 0;
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgrey;
}

.pictures input:hover, textarea:hover{
  box-shadow: none;
}
</style>
