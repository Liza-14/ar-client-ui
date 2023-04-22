<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div class="title">Login</div>
    <form class="loginForm">
        <input type="text" placeholder="email" v-model="loginForm.email">
        <input type="password" placeholder="password" v-model="loginForm.password">
        <button type="submit" class="loginForm-btn" @click="login()">Login</button>
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
      this.$store.dispatch('login', this.loginForm);
    },
  },
};
</script>

<style>
.loginForm {
    display: block;
    width: 400px;
    margin: 0 auto;
}

.loginForm input,button {
    display: block;
    border: none;
    border-radius: 28px;
    margin: 0 auto;
    margin-top: 10px;
    height: 40px;
    width: 100%;
    padding: 0px 16px 0px 16px;
    outline: none;

}
.loginForm input:focus,button {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.loginForm-btn {
    background: rgb(116,9,121);
    background: linear-gradient(90deg, rgba(116,9,121,1) 0%, rgba(0,212,255,1) 100%);
    height: 40px;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    min-width: 150px;
    width: auto;
}

.loginForm-btn:hover {
    background: rgb(116,9,121);
}

.title {
    font-size: 30px;
}
</style>
