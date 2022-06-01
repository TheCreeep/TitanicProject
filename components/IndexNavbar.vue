<template>
  <div id="navbar">
    <vs-navbar v-model="active" color="primary" center-collapsed text-white>
      <template #left>
        <img
          src="https://3wa.fr/wp-content/uploads/2020/01/cropped-big.png"
          alt=""
          class="logo-3wa"
           @click="$router.push('/')"
        />
      </template>
      <vs-navbar-item
        id="accueil"
        :active="active == 'accueil'"
        @click="$router.push('/')"
      >
        Accueil
      </vs-navbar-item>
      <vs-navbar-item
        id="data"
        :active="active == 'data'"
        @click="$router.push('/data')"
      >
        Data
      </vs-navbar-item>
      <vs-navbar-item
        id="search"
        :active="active == 'search'"
        @click="$router.push('/search')"
      >
        Recherche
      </vs-navbar-item>
      <template #right>
        <vs-button flat color="blue">Login</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: 'IndexNavbar',
  data() {
    return {
      active:
        this.$route.path.split('/')[1] === ''
          ? 'accueil'
          : this.$route.path.split('/')[1],
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
