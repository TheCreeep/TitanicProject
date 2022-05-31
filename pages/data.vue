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
      deadNumber: 52,
      aliveNumber :12,
      options: {
        responsive: true,
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Vivants', 'Morts'],
        datasets: [
          {
            label: 'Survivants',
            backgroundColor: ['#41B883', '#E46651'],
            data: [this.deadNumber, this.aliveNumber],
          },
        ],
      },
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
#pie-chart {
  width: 400px;
}
</style>
