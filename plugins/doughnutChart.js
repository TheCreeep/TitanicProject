import Vue from 'vue'
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins


Vue.component('DoughtnutChart', {
    name: 'DoughtnutChart',
    extends: Doughnut,
    mixins: [reactiveProp],
    // eslint-disable-next-line vue/require-prop-types
    props: ["data", "options"],


    mounted() {
        this.renderChart(this.data, this.options)
    },
})

