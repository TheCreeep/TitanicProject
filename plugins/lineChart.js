import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('LineChart', {
    name: 'LineChart',
    extends: Line,
    mixins: [reactiveProp],

    // eslint-disable-next-line vue/require-prop-types
    props: ["data", "options"],
    watch: {
        data: {
            handler() {
                this.updateChart();
            },
            deep: true
        }
    },
    mounted() {
        this.renderChart(this.data, this.options)
    },

})

