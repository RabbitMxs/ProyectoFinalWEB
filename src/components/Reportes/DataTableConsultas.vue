<template>
	<v-data-table :headers="headers" :items="desserts" sort-by="carreradepto">
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: 'Médico',
				align: 'start',
				value: 'medico',
			},
			{ text: 'No. de consultas', value: 'noconsultas' },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {},
		defaultItem: {},
	}),

	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch(
					'https://api-tedw-covid.herokuapp.com/reportesConsultasMedico'
				);
				const array = await data.json();
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
