<template>
  <div class="header">
    <button @click="toHome()" class="btn icon-btn btn-secondary">🏠</button>
    <div v-if="!this.$store.state.user" class="menu">
      <button @click="toLogin()" class="btn btn-secondary">Log in</button>
      <button @click="toRegister()" class="btn btn-secondary">Sing up</button>
    </div>
    <div v-else class="usermenu">
      <div class="usenname">🧑‍💼 {{ this.$store.state.user.username }}</div>
      <button @click="logout()" class="btn btn-secondary logout-btn">Log out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    toLogin() {
      this.$router.push({ name: 'login' });
    },
    toRegister() {
      this.$router.push({ name: 'register' });
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
  color: white;
  height: 50px;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.header {
  display: flex;
  flex-direction: row;
  background: rgb(116, 9, 121);
  background: linear-gradient(90deg, rgba(116, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%);
  color: white;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.header button {
  background-color: white;
  display: inline-block;
  outline: none;
  margin: 0;
  min-width: 100px;
}

.usenname {
  font-size: 20px;
  color: black;
  padding: 6px;
  width: 120px;
}

.logout-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  min-width: 76px;
  float: right;
  height: 100%;
  border-left: 1px solid lightgray;
}
.usermenu {
  background: white;
  border-radius: 20px;
  height: 42px;
}

.usermenu *{
 display: inline-block;
}
</style>
