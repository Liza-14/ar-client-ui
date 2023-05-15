<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div class="title">Register 🔏</div>
    <form class="registerForm">
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="username" v-model="registerForm.username">
        <label for="email">Email:</label>
        <input type="text" id="email" placeholder="email" v-model="registerForm.email">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="password" v-model="registerForm.password">
        <label for="confirmPassword">Confirm password:</label>
        <input type="password" id="confirmPassword" placeholder="password" v-model="registerForm.confirmPassword">
        <label for="asArtist">Register as artist:</label>
        <input type="checkbox" id="asArtist" placeholder="asArtist" v-model="registerForm.asArtist">
        <button type="submit" class="btn" @click="register()">Login</button>
    </form>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      registerForm: {
        username: '', email: '', password: '', confirmPassword: '', asArtist: false,
      },
    };
  },
  methods: {
    register() {
      this.registerForm.role = this.registerForm.asArtist ? 'artist' : 'visitor';
      this.$store.dispatch('register', this.registerForm)
        .then(() => this.$router.push({ name: 'home' }))
        .catch((e) => this.$alert(e.message, 'Error'));
    },
  },
};
</script>

<style scoped>
.registerForm {
    display: block;
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
}

input[type=checkbox] {
  width: 20px;
  height: 20px;
  display: inline;
}

</style>
