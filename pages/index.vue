<template>
  <div id="index-page">
    <p v-for="passenger in data" :key="passenger.id">{{ passenger }}</p>
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
  font-family: Lato;
}
</style>
