<template>
  <div class="title">Schedule an exhibition 🎫</div>
  <form class="exhibitionForm">
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="name" v-model="exhibitionForm.name">
    <label for="description">Description:</label>
    <textarea type="text" id="description" placeholder="description" v-model="exhibitionForm.description"></textarea>
    <label for="address">Address:</label>
    <input type="text" id="address" placeholder="address" v-model="exhibitionForm.address">
    <label for="dateFrom">Active date from:</label>
    <input type="date" id="dateFrom" placeholder="dateFrom" v-model="exhibitionForm.dateFrom">
    <label for="dateTo">Active date to:</label>
    <input type="date" id="dateTo" placeholder="dateTo" v-model="exhibitionForm.dateTo">
    <button type="submit" class="btn" @click="submit()">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'CreateExhibitionPage',
  data() {
    return {
      exhibitionForm: {
        name: '',
        description: '',
        address: '',
        dateFrom: '',
        dateTo: '',
      },
    };
  },
  methods: {
    submit() {
      this.exhibitionForm.authorId = this.$store.state.user.id;
      this.$store.dispatch('createExhibition', this.exhibitionForm)
        .then(() => this.$router.push({ name: 'home' }));
    },
  },
};
</script>

<style scoped>

.exhibitionForm {
  margin: 0 30px;
  display: block;
}
</style>
