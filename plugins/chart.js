import Vue from 'vue'
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('PieChart', {
    name: 'PieChart',
    extends: Pie,
    mixins: [reactiveProp],
    // eslint-disable-next-line vue/require-prop-types
    props: ["data", "options"],
    mounted() {
        this.renderChart(this.data, this.options)
    }
})