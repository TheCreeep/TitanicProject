<template>
  <div id="data">
    <client-only>
      <!--  eslint-disable-next-line vue/attribute-hyphenation -->
      <PieChart :data="survivorChartData" :options="options"></PieChart>
      <PieChart :data="sexChartData" :options="options"></PieChart>
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
        maintainAspectRatio: false,
      },
      survivorChartData: {
        labels: ['Vivants', 'Morts'],
        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.aliveStats,
            backgroundColor: ['#41B883', '#E46651'],
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

<style lang="scss"></style>
