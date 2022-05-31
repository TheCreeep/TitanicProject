<template>
  <div id="data">
    <client-only>
      <PieChart :data="chartData" :options="options"></PieChart>
    </client-only>
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
      },
      chartData: {
        labels: ['Vivants', 'Morts'],
        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.aliveStats,
            backgroundColor: ['#41B883', '#E46651'],
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
#pie-chart {
  width: 400px;
}
</style>
