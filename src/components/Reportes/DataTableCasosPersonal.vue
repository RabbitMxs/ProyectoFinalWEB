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
				text: 'Nombre',
				align: 'start',
				value: 'nombre',
			},
			{ text: 'Apellidos', value: 'apellidos' },
			{ text: 'Fecha', value: 'fecha' },
			{ text: 'Resultado', value: 'resultado' },
			{ text: 'Carrera / Depto', value: 'carreradepto' },
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
				const data = await fetch('https://api-tedw-covid.herokuapp.com/reportesCasosPersonal');
				const array = await data.json();
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
