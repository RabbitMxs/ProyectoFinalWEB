<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		:items-per-page="5"
		class="elevation-1"
		:footer-props="{
			showFirstLastPage: true,
			firstIcon: 'mdi-arrow-collapse-left',
			lastIcon: 'mdi-arrow-collapse-right',
			prevIcon: 'mdi-minus',
			nextIcon: 'mdi-plus',
		}"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Número de casos por día</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>
			</v-toolbar> </template
	></v-data-table>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{
					text: 'Número de pruebas',
					align: 'start',
					value: 'no_pruebas',
				},
				{ text: 'Fecha', value: 'fecha' },
			],
			desserts: [],
		};
	},
	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/dashboardHistorial');
				const array = await data.json();
				array.forEach((element) => {
					element.fecha = new Date(element.fecha).toISOString().substr(0, 10);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
