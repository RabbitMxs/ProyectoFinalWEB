<template>
	<div id="chart">
		<apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
export default {
	components: {
		apexchart: VueApexCharts,
	},
	data() {
		return {
			series: [
				{
					name: 'Numero de Consultas',
					data: [],
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: 'bar',
				},
				plotOptions: {
					bar: {
						borderRadius: 10,
						dataLabels: {
							position: 'top', // top, center, bottom
						},
					},
				},
				dataLabels: {
					enabled: true,
					formatter: function(val) {
						return val;
					},
					offsetY: -20,
					style: {
						fontSize: '12px',
						colors: ['#304758'],
					},
				},

				xaxis: {
					categories: [],
					position: 'bottom',
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					crosshairs: {
						fill: {
							type: 'gradient',
							gradient: {
								colorFrom: '#D8E3F0',
								colorTo: '#BED1E6',
								stops: [0, 100],
								opacityFrom: 0.4,
								opacityTo: 0.5,
							},
						},
					},
					tooltip: {
						enabled: true,
					},
				},
				yaxis: {
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
						show: false,
						formatter: function(val) {
							return val;
						},
					},
				},
			},
		};
	},
	methods: {
		async initialize() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/reportesConsultasMedico`
				);
				const array = await data.json();
				const newdata = [];
				array.forEach((element) => {
					this.chartOptions.xaxis.categories.push(element.medico);
					newdata.push(Number(element.noconsultas));
				});
				this.series = [
					{
						data: newdata,
					},
				];
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.initialize();
	},
};
</script>

<style></style>
