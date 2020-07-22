<template>
    <div id="chartDivBalance" class="pieChart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


@Component
export default class BalancePieChart extends Vue {
    @Prop() private balances!: number[];
    private chart: any = null ;

    chartData(){
        return [{
            "range": "$0 - $2,500",
            "count": this.balances.filter((x: number) => {
                return x < 2500
            }).length
        }, {
            "range": "$2,500 - $5,000",
            "count": this.balances.filter((x: number) => {
                return x >= 2500 && x < 5000
            }).length
        }, {
            "range": "$5,000 - $10,000",
            "count": this.balances.filter((x: number) => {
                return x >= 5000 && x < 10000
            }).length
        }, {
            "range": "$10,000 - $20,000",
            "count": this.balances.filter((x: number) => {
                return x >= 10000 && x < 20000
            }).length
        }, {
            "range": "$20,000+",
            "count": this.balances.filter((x: number) => {
                return x >= 20000
            }).length
        }];
    }

    @Watch('balances')
    createChart(){
        console.log(this.balances)

        // Add chart
        this.chart = am4core.create(
            "chartDivBalance",
            am4charts.PieChart,
        );

        this.chart.data = this.chartData();

        const pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "range";
    }


    mounted(): void {
        this.createChart();
    }

    beforeDestroy(): void {
        this.chart.dispose();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h1 {
        color: red;
    }
    .pieChart {
        width: 600px;
        height: 250px;
    }
</style>