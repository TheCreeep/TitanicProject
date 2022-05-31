<template>
  <div id="navbar">
    <vs-navbar v-model="active" :color="active" center-collapsed>
      <template #left>
        <img
          src="https://3wa.fr/wp-content/uploads/2020/01/cropped-big.png"
          alt=""
          class="logo-3wa"
        />
      </template>
      <vs-navbar-item id="guide" :active="active == 'guide'">
        Accueil
      </vs-navbar-item>
      <vs-navbar-item id="docs" :active="active == 'docs'">
        Data
      </vs-navbar-item>
      <template #right>
        <vs-button flat>Login</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: 'IndexNavbar',
  data() {
    return {
      active: 'accueil',
    }
  },
}
</script>

<style lang="scss">
#navbar {
  z-index: 99;
  .logo-3wa {
    padding: 0.5em;
    width: 50px;
  }
}
</style>
