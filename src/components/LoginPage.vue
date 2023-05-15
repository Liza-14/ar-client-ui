<template>
    <div class="title">Login {{ this.$store.state.user?.email }} 🔏</div>
    <form class="loginForm">
        <label for="email">Email:</label>
        <input type="text" id="email" placeholder="email" v-model="loginForm.email">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="password" v-model="loginForm.password">
        <button type="submit" class="btn" @click="login()">Login</button>
    </form>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: { email: '', password: '' },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.loginForm)
        .then(() => this.$router.push({ name: 'home' }))
        .catch((e) => this.$alert(e.message, 'Error'));
    },
  },
};
</script>

<style scoped>
.loginForm {
    display: block;
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
}

</style>
