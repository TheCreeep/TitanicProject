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
        <vs-navbar-item
        id="accueil"
        :active="active == 'accueil'"
        @click="$router.push('/')"
      >
        Accueil
      </vs-navbar-item>
      <vs-navbar-item
        id="search"
        :active="active == 'search'"
        @click="$router.push('/search')"
      >
        Recherche
      </vs-navbar-item>
      </template>
      
      <template #right>
        <vs-button flat color="blue" @click="$router.push('/register')"
          >Créer un compte</vs-button
        >
        <vs-button flat color="blue" @click="$router.push('/login')"
          >Se connecter</vs-button
        >
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
