<template>
  <div id="index-page">
    <h1 class="title">Titanic</h1>
    <h2 class="subtitle">Les Stats</h2>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'LandingLayout',
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.getPassengers()
  },
  methods: {
    async getPassengers() {
      await this.$axios
        .get('/api/data')
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#index-page {
  font-family: 'Lato';
  height: 89.4vh;
  background: url('https://images6.alphacoders.com/928/thumb-1920-928363.jpg');
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  padding-top:100px;
  overflow: hidden;

  .title {
    font-size: 17em;
    margin: 0 0.5em 0 0.5em;
    animation:slideleft 1.5s ease-in-out;
  }
  
  .subtitle {
    font-size: 10em;
    margin: 0 0.5em 0 0;
    text-align: right;
    animation:slideright 1.5s ease-in-out;
  }
}


@keyframes slideleft {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}
@keyframes slideright {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}


</style>
