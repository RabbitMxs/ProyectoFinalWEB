<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		sort-by="pregunta"
		class="elevation-5 outlined"
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
				<v-toolbar-title>Encuesta no. {{ $route.params.id }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							color="primary"
							dark
							class="mb-2 me-2"
							@click="actualizaEstado('Saludable')"
						>
							Saludable
						</v-btn>
						<v-btn color="error" dark class="mb-2 me-2" v-bind="attrs" v-on="on">
							Sospechoso
						</v-btn>
						<v-btn color="primary" text class="mb-2 me-2" @click="regresa()">
							Cancelar
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">Seleccione el tipo de prueba a aplicar</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6" md="12">
										<v-select
											:items="tipos"
											v-model="editedItem.idtipo"
											item-text="tipoprueba"
											item-value="id"
											label="Tipo Prueba"
										></v-select>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">
								Cancel
							</v-btn>
							<v-btn color="blue darken-1" text @click="saveOrden">
								Guardar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
	</v-data-table>
</template>

<script>
export default {
	data: () => ({
		tipos: [],
		dialog: false,
		headers: [
			{
				text: 'Pregunta',
				align: 'start',
				value: 'pregunta',
			},
			{ text: 'Respuesta', value: 'respuesta' },
		],
		desserts: [],
		editedItem: {
			idtipo: {},
		},
		editedItem: {
			idtipo: {},
		},
	}),
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	created() {
		this.initialize();
		this.getTipoPrueba();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/cuestionario/${this.$route.params.id}`
				);
				const array = await data.json();
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getTipoPrueba() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/tipoprueba');
				const array = await data.json();
				this.tipos = array;
			} catch (error) {
				console.log(error);
			}
		},
		async actualizaEstado(estado) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/${this.$route.params.idalumno}`
				);
				const array = await data.json();
				const alumno = array[0];
				this.actualizaAlumno(alumno, estado);
			} catch (error) {
				console.log(error);
			}
		},
		async actualizaAlumno(item, estado) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/${this.$route.params.idalumno}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							nombre: item.nombre,
							apellidos: item.apellidos,
							email: item.email,
							clave: item.clave,
							nacimiento: item.nacimiento,
							direccion: item.direccion,
							idarea: item.idarea,
							idtipo: item.idtipo,
							estatus: estado,
						}),
					}
				);
				this.regresa();
			} catch (error) {
				console.log(error);
			}
		},
		async saveOrden() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/ordenprueba', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						resultado: '',
						fecha: new Date().toISOString().substr(0, 10),
						idusuario: this.$route.params.idalumno,
						idtipo: this.editedItem.idtipo,
					}),
				});
				this.close();
				this.actualizaEstado('Sospechoso');
			} catch (error) {
				console.log(error);
			}
		},
		regresa() {
			this.$router.push('/encuestas');
		},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
	},
};
</script>
