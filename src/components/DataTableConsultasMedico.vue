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
			<router-link
				:to="{
					name: 'Diagnostico',
					params: {
						id_consulta: item.id_consulta,
						id_paciente: item.id_paciente,
					},
				}"
			>
				<v-icon medium color="success" class="mr-2">
					mdi-medical-bag
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
import { mapState } from 'vuex';
export default {
	data: () => ({
		dialog: false,
		headers: [
			{
				text: 'ID',
				align: 'start',
				value: 'id_consulta',
			},
			{ text: 'Num. control', value: 'no_control' },
			{ text: 'Nombre', value: 'nombre' },
			{ text: 'Apellidos', value: 'apellidos' },
			{ text: 'Tipo de Cita', value: 'tipocita' },
			{ text: 'Fecha', value: 'fecha' },
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
	computed: {
		...mapState(['id']),
	},
	created() {
		this.initialize();
	},
	methods: {
		async initialize() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/consultasByIdMedico/${this.id}`
				);
				const array = await data.json();
				array.forEach((element) => {
					element.fecha = new Date().toISOString().substr(0, 10);
					if (element.estatus) {
						element.estatus = 'Atendida';
					} else {
						element.estatus = 'Pendiente';
					}
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>
