import Vue from 'vue'
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins


Vue.component('BarChart', {
    name: 'BarChart',
    extends: Bar,
    mixins: [reactiveProp],

    // eslint-disable-next-line vue/require-prop-types
    props: ["data", "options"],
    mounted() {
        this.renderChart(this.data, this.options)
    },

})

