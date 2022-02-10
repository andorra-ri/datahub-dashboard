<template>
  <div class="navbar">
    <router-link to="/" class="brand">
      <img src="/logo-ari.png">
    </router-link>
    <div class="navbar__center">
      <router-link to="/visitants" class="navbar__anchor">
        <i class="mdi mdi-human-handsdown" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'NavBar' };
</script>

<style lang="scss" scoped>
.navbar {
  align-items: center;
  background: #fff;
  border-right: 1px solid #dadde1;
  display: inline-flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;

  &__center {
    margin: auto 0;
  }

  &__anchor {
    color: #bac4d2;
    display: block;
    font-size: 20px;
    margin: 10px 0;

    &:hover,
    &.router-link-exact-active { color: var(--color-primary); }
  }

  .brand {
    display: block;

    img {
      height: 30px;
      margin: 15px;
    }
  }

  .user {
    margin-top: auto;

    .avatar {
      border-radius: 50%;
      margin: 10px 0;
      width: 30px;
    }
  }
}
</style>
