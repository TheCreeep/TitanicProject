<template>
  <div id="register-page">
    <h1 class="title">Créer un compte</h1>

    <!-- Login with VS input and VS button-->
    <div class="inputs">
      <vs-input v-model="user.email" class="email" label-placeholder="Email" @keyup.enter="register"/>
      <vs-input
        v-model="user.username"
        class="username"
        label-placeholder="Username"
        @keyup.enter="register"
      />
      <vs-input
        v-model="user.password"
        type="password"
        class="password"
        label-placeholder="Mot de passe"
        :progress="getProgress"
        :visible-password="hasVisiblePassword"
        icon-after
        @keyup.enter="register"
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
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
      <vs-input
        v-model="user.passwordConfirm"
        type="password"
        class="passwordConfirm"
        label-placeholder="Confirmez votre votre mot de passe"
        :visible-password="hasVisiblePassword"
        @keyup.enter="register"
      />
    </div>

    <vs-button class="register-button" @click="register"
      >Créer mon compte</vs-button
    >
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'LandingLayout',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      hasVisiblePassword: false,
    }
  },
  computed: {
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
  methods: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.user.email)
    },
    register() {
      const { username, email, password, passwordConfirm } = this.user

      if (
        password === '' ||
        email === '' ||
        passwordConfirm === '' ||
        username === ''
      ) {
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

      if (password !== passwordConfirm) {
        this.$vs.notification({
          title: 'Erreur',
          text: 'Veuillez entrer le même mot de passe',
          color: 'danger',
          iconPack: 'feather',
          icon: "<i class='bx bxs-message-rounded-error' ></i>",
          position: 'top-left',
        })
        return
      }

      this.$store.dispatch('login/REGISTER_USER', { password, email, username })
    },
  },
}
</script>

<style lang="scss">
#register-page {
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
    gap: 1.5em;
    .vs-input {
      width: 250px;
      height: 50px;
    }
  }

  .register-button {
    font-size: 1.5em;
    margin-top: 2em;
    padding: 10px 20px;
  }
}
</style>
