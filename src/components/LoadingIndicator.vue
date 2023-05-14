<template>
  <div v-if="this.$store.state.loading" class="lds-facebook"><div>⏳</div><div>⌛</div><div>⏳</div></div>
  <progress v-if="this.$store.state.loading && this.$store.state.progressMessage" max="100" :value="this.$store.state.progressMessage"></progress>
</template>

<script>
export default {
};
</script>

<style>
.lds-facebook {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
</style>
