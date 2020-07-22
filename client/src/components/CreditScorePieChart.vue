<template>
    <div id="chartDivCreditScores" class="pieChart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


@Component
export default class CreditScorePieChart extends Vue {
    @Prop() private creditScores!: number[];
    private chart: any = null ;

    chartData(){
        return [{
            "range": "100-400",
            "count": this.creditScores.filter((x: number) => {
                return x < 400
            }).length
        }, {
            "range": "400-500",
            "count": this.creditScores.filter((x: number) => {
                return x >= 400 && x < 500
            }).length
        }, {
            "range": "500-650",
            "count": this.creditScores.filter((x: number) => {
                return x >= 500 && x < 650
            }).length
        }, {
            "range": "650-750",
            "count": this.creditScores.filter((x: number) => {
                return x >= 650 && x < 750
            }).length
        }, {
            "range": "750-900",
            "count": this.creditScores.filter((x: number) => {
                return x >= 750 && x < 900
            }).length
        }];
    }

    @Watch('creditScores')
    createChart(){
        console.log(this.creditScores)

        // Add chart
        this.chart = am4core.create(
            "chartDivCreditScores",
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