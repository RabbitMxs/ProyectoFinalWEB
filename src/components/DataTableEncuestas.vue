<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		sort-by="estatus"
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
				<v-toolbar-title>Encuestas</v-toolbar-title>
			</v-toolbar>
		</template>
		<template v-slot:item.actions="{ item }">
			<router-link
				:to="{
					name: 'Respuestas',
					params: {
						id: item.idencuesta,
						idalumno: item.id,
					},
				}"
			>
				<v-icon medium class="mr-2">
					mdi-text-box-multiple-outline
				</v-icon>
			</router-link>
		</template>
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
		headers: [
			{
				text: 'ID',
				align: 'start',
				value: 'idencuesta',
			},
			{ text: 'Fecha', value: 'fecha' },
			{ text: 'Num. control', value: 'nocontrol' },
			{ text: 'Nombre', value: 'nombre' },
			{ text: 'Apellidos', value: 'apellidos' },
			{ text: 'Edad', value: 'edad.years' },
			{ text: 'Estatus', value: 'estatus' },
			{ text: 'Actions', value: 'actions', sortable: false },
		],
		desserts: [],
	}),

	watch: {
		dialog(val) {
			val || this.close();
		},
	},

	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuariosIdEncuesta`);
				const array = await data.json();
				array.forEach((element) => {
					element.fecha = new Date().toISOString().substr(0, 10);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
