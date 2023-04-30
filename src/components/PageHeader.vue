<template>
  <div v-if="!this.$store.state.user" class="menu">
    <button @click="toHome()" class="btn icon-btn btn-secondary">🏠</button>
    <div class="usenname">😒 Please login...</div>
    <button @click="toLogin()">Login</button>
  </div>
  <div v-else class="menu">
    <button @click="toHome()" class="btn icon-btn btn-secondary">🏠</button>
    <div class="usenname">🧑‍💼 {{ this.$store.state.user.username }}</div>
    <button @click="logout()" class="btn btn-secondary">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    toLogin() {
      this.$router.push({ name: 'login' });
    },
    logout() {
      this.$store.dispatch('logout');
    },
    toHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: row;
  background: rgb(116, 9, 121);
  background: linear-gradient(90deg, rgba(116, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%);
  color: white;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-bottom: 20px;
}

.menu button {
  background-color: white;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 20px;
  margin: 0;
}

.usenname {
  font-size: 22px;
  background: white;
  border-radius: 20px;
  color: black;
  height: 32px;
  padding: 4px 10px;
}
</style>
