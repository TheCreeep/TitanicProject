<template>
  <div>
    <p v-for="passenger in data" :key="passenger.id">{{ passenger.Name }}</p>
  </div>
</template>

<script>
/* import PassengerModel from '../models/passenger.js' */

export default {
  name: 'IndexPage',
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.getPassengers()
  },
  methods: {
    /* Api Call on localhost:3000/data that puts into this.data tab */
    async getPassengers() {
      await this.$axios({
        method: 'get',
        url: '/api/data',
      })
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
