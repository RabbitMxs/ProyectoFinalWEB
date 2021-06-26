<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		sort-by="idprueba"
		:footer-props="{
			showFirstLastPage: true,
			firstIcon: 'mdi-arrow-collapse-left',
			lastIcon: 'mdi-arrow-collapse-right',
			prevIcon: 'mdi-minus',
			nextIcon: 'mdi-plus',
		}"
	>
		<template v-slot:top>
			<v-toolbar flat> </v-toolbar>
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon medium color="success" class="mr-2" @click="save(item, 'Positivo')">
				mdi-check-circle
			</v-icon>
			<v-icon medium color="error" @click="save(item, 'Negativo')">
				mdi-close-circle
			</v-icon>
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
				value: 'id_prueba',
			},
			{ text: 'Fecha', value: 'fecha' },
			{ text: 'Num. control', value: 'email' },
			{ text: 'Nombre', value: 'nombre' },
			{ text: 'Tipo de Prueba', value: 'tipoprueba' },
			{ text: 'Resultado', value: 'resultado' },
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
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuarioAllInfoPruebas`);
				const array = await data.json();
				array.forEach((element) => {
					element.fecha = new Date().toISOString().substr(0, 10);
					element.email = element.email.substr(0, 8);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async save(item, resultado) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/ordenprueba/${item.id_prueba}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							resultado: resultado,
							fecha: item.fecha,
							idusuario: item.id_usuario,
							idtipo: item.id_tipoprueba,
						}),
					}
				);
				this.initialize();
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
