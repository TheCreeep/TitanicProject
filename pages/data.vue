<template>
  <div id="data">
    <h1 class="title">Quelques Stats</h1>
    <div class="charts">
      <client-only>
        <PieChart :data="survivorChartData" :options="options"></PieChart>
        <PieChart :data="sexChartData" :options="options"></PieChart>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataPage',

  layout: 'LandingLayout',

  data() {
    return {
      data: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      survivorChartData: {
        labels: ['Vivants', 'Morts'],
        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.aliveStats,
            backgroundColor: ['green', '#FF2030'],
          },
        ],
      },
      sexChartData: {
        labels: ['Homme', 'Femme'],
        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.sexStats,
            backgroundColor: ['#019EDE', '#F20079'],
          },
        ],
      },
    }
  },
  computed: {
    passengers() {
      return this.$store.state.passengers
    },
    aliveStats() {
      return this.$store.state.aliveStats
    },
    sexStats() {
      return this.$store.state.sexStats
    },
  },
  created() {
    this.getPassengers()
  },
  methods: {
    getPassengers() {
      this.$store.dispatch('GET_ALL_PASSENGERS')
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#data {
  margin-top: 6em;

  .title {
    font-family: 'Lato', sans-serif;
    font-size: 2em;
    text-align: center;
    margin-top: 50px;
  }
  .charts {
    display: flex;
    client-only {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-top: 50px;
    }
  }
}
</style>
