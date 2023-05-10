<template>
  <div class="user-exhibition-list" v-if="this.$store.state.user && this.$store.state.user.role === 'artist'">
    <div class="title">MY EXHIBITIONS</div>
    <button @click="toExhibitionCreateFrom()" class="btn btn-secondary">➕ Schedule an exhibition</button>
    <div class="exhibition-list">
      <div v-for="item in this.$store.state.exhibitions.filter(x => x.authorid == this.$store.state.user.id)" :key="item.id" class="exhibition-item">
        <div class="img-container">
          <img class="img" src="../assets/placeholder-image.jpg" alt="">
        </div>
        <div class="title">
          {{ item.name }}
        </div>
        <div>
          <button class="btn icon-btn" @click="this.toAR(item)">AR</button>
          <button v-if="this.$store.state.user.id == item.authorid" class="btn btn-secondary icon-btn" @click="this.toExhibitionEditFrom(item.id)">✏️</button>
        </div>
      </div>
    </div>
    <hr>
  </div>
  <div class="title">ALL EXHIBITIONS</div>
  <div class="exhibition-list">
    <div v-for="item in this.$store.state.exhibitions" :key="item.id" class="exhibition-item">
      <div class="img-container">
        <img class="img" src="../assets/placeholder-image.jpg" alt="">
      </div>
      <div class="title">
        {{ item.name }}
      </div>
      <div>
        <button class="btn icon-btn" @click="this.toAR(item)">AR</button>
        <button v-if="this.$store.state.user.id == item.authorid" class="btn btn-secondary icon-btn" @click="this.toExhibitionEditFrom(item.id)">✏️</button>
      </div>
    </div>
  </div>
  <hr>
</template>

<script>
export default {
  name: 'HomePage',
  created() {
    this.$store.dispatch('loadAllExhibitions');
  },
  methods: {
    toAR(item) {
      this.$router.push({ name: 'ar', params: { id: item.id } });
    },
    toExhibitionEditFrom(id) {
      this.$router.push({ name: 'exhibitionEditPage', params: { id } });
    },
    toExhibitionCreateFrom() {
      this.$router.push({ name: 'exhibitionCreatePage' });
    },
  },
};
</script>

<style scoped>
.exhibition-list {
  margin: 0 auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.exhibition-item {
  background-color: white;
  border-radius: 16px;
  padding: 10px;
  width: 250px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.exhibition-item:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.exhibition-item .title {
  text-transform: uppercase;
  font-size: 22px;
}

.img-container {
  width: 100%;
  height: 200px;
}

.img-container img {
  width: 100%;
}
</style>
