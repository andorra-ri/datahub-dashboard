<template>
  <nav-bar />
  <router-view />
  <toast-center />
</template>

<script>
import NavBar from '/@/components/NavBar.vue';
import ToastCenter from '/@/components/ToastCenter.vue';

export default {
  name: 'App',
  components: { NavBar, ToastCenter },
};
</script>
