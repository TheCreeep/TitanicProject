<template>
  <div id="login-page">
    <h1 class="title">Se Connecter</h1>
    <!-- Login with VS input and VS button-->
    <div class="inputs">
      <vs-input
        v-model="user.email"
        class="email"
        label-placeholder="Email"
        @keyup.enter="login"
      />
      <vs-input
        v-model="user.password"
        type="password"
        class="password"
        label-placeholder="Mot de passe"
        :progress="getProgress"
        :visible-password="hasVisiblePassword"
        icon-after
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
        @keyup.enter="login"
      >
        >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
          <i v-else class="bx bx-hide"></i>
        </template>

        <template v-if="getProgress >= 100" #message-success>
          Mot de passe Sécurisé
        </template>
      </vs-input>
    </div>

    <vs-button class="login-button" @click="login">Se connecter</vs-button>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'LandingLayout',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      hasVisiblePassword: false,
    }
  },
  computed: {
    isUserConnected() {
      return Object.keys(this.$store.state.login.user).length !== 0
    },
    getProgress() {
      let progress = 0
      if (/\d/.test(this.user.password)) {
        progress += 20
      }
      if (/(.*[A-Z].*)/.test(this.user.password)) {
        progress += 20
      }
      if (/(.*[a-z].*)/.test(this.user.password)) {
        progress += 20
      }
      if (this.user.password.length >= 6) {
        progress += 20
      }
      if (/[^A-Za-z0-9]/.test(this.user.password)) {
        progress += 20
      }
      return progress
    },
  },
  created() {
    if (this.isUserConnected) {
      this.$router.push('/')
    }
  },
  methods: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.user.email)
    },
    login() {
      const { password, email } = this.user

      if (password === '' || email === '') {
        this.$vs.notification({
          title: 'Erreur',
          text: 'Veuillez remplir tous les champs',
          color: 'danger',
          iconPack: 'feather',
          icon: "<i class='bx bxs-message-rounded-error' ></i>",
          position: 'top-left',
        })
        return
      }

      if (!this.validateEmail(email)) {
        this.$vs.notification({
          title: 'Erreur',
          text: 'Veuillez entrer une adresse email valide',
          color: 'danger',
          iconPack: 'feather',
          icon: "<i class='bx bxs-message-rounded-error' ></i>",
          position: 'top-left',
        })
        return
      }

      if (this.getProgress !== 100) {
        this.$vs.notification({
          title: 'Mot de passe trop faible',
          text: 'Votre mot de passe doit contenir au moins 6 caractères dont au moins 1 chiffre, 1 majuscule, 1 minuscule et un caractère spécial',
          color: 'danger',
          iconPack: 'feather',
          icon: "<i class='bx bxs-message-rounded-error' ></i>",
          position: 'top-left',
        })
        return
      }

      this.$store.dispatch('login/LOGIN_USER', { password, email })
    },
  },
}
</script>

<style lang="scss">
#login-page {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 4em;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 2em;
    margin-bottom: 2em;
    .vs-input {
      width: 200px;
      height: 50px;
    }
  }

  .login-button {
    font-size: 1.5em;
    margin-top: 2em;
    padding: 10px 20px;
  }
}
</style>
