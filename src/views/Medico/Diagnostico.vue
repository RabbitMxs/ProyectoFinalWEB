<template>
	<div>
		<header>
			<NavMedico />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<v-card class="mt-2">
							<div class="card-header">
								<v-card-title class="white--text text-h5">
									Diagnostico de la consulta {{ $route.params.id_consulta }}
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Aqui podrás ver los sintomas del paciente asi como marcarlo como sospechoso y
									crear una diagnostico
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<v-textarea
												outlined
												no-resize
												readonly
												label="Sintomas del paciente"
												:value="this.consulta.descripcion"
											></v-textarea>
										</v-col>
									</v-row>
									<v-row>
										<v-toolbar flat>
											<v-toolbar-title>Diagnostico</v-toolbar-title>
											<v-spacer></v-spacer>
											<v-dialog v-model="dialogDelete" max-width="500px">
												<v-card>
													<v-card-title class="text-h5"
														>Seleccione el tipo de prueba</v-card-title
													>
													<v-card-text>
														<v-select
															v-model="tipopruebaselect"
															:items="tipoprueba"
															item-text="tipoprueba"
															item-value="id"
															label="Tipo de prueba"
														></v-select>
													</v-card-text>
													<v-card-actions>
														<v-spacer></v-spacer>
														<v-btn color="blue darken-1" text @click="closeDelete"
															>Cancel</v-btn
														>
														<v-btn color="blue darken-1" text @click="deleteItemConfirm"
															>OK</v-btn
														>
														<v-spacer></v-spacer>
													</v-card-actions>
												</v-card>
											</v-dialog>
											<v-btn color="error" dark class="mb-2" @click="deleteItem()">
												Marcar como sospechoso
											</v-btn>
										</v-toolbar>
									</v-row>
									<v-row>
										<v-col>
											<v-textarea
												v-model="diagnostico"
												outlined
												no-resize
												label="Diagnostico del medico"
											></v-textarea>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-toolbar flat>
												<v-toolbar-title class="mr-3">Receta</v-toolbar-title>
												<v-icon medium color="primary" @click="agregaInput()">
													mdi-plus-circle
												</v-icon>
											</v-toolbar>
										</v-col>
									</v-row>
									<v-row v-for="medicamento in list" :key="medicamento.id">
										<v-col cols="6">
											<v-select
												v-model="medicamentos[medicamento][0]"
												:items="list_medicamentos"
												item-text="medicamento"
												item-value="id"
												label="Seleccione el medicamento"
											></v-select>
										</v-col>
										<v-col cols="6">
											<v-textarea
												v-model="medicamentos[medicamento][1]"
												rows="1"
												no-resize
												label="Dosis Indicada"
											></v-textarea>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-btn color="primary" @click="muestra()"> Agrega</v-btn>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import NavMedico from '../../components/NavMedico.vue';

export default {
	components: { NavMedico },
	data() {
		return {
			dialogDelete: false,
			consulta: {},
			paciente: {},
			diagnostico: '',
			list: [],
			medicamentos: [],
			count: 0,
			list_medicamentos: [],
			tipoprueba: [],
			tipopruebaselect: 0,
		};
	},
	watch: {
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},
	methods: {
		async getPaciente() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/${this.$route.params.id_paciente}`
				);
				const array = await data.json();
				this.paciente = array[0];
			} catch (error) {
				console.log(error);
			}
		},
		async getConsulta() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/consulta/${this.$route.params.id_consulta}`
				);
				const array = await data.json();
				this.consulta = array[0];
			} catch (error) {
				console.log(error);
			}
		},
		async getMedicamentos() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/medicamento`);
				const array = await data.json();
				this.list_medicamentos = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getPrueba() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/tipoprueba`);
				const array = await data.json();
				this.tipoprueba = array;
			} catch (error) {
				console.log(error);
			}
		},
		async updateDiagnostico() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/consulta/${this.$route.params.id_consulta}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							fecha: this.consulta.fecha,
							hora: this.consulta.hora,
							idmedico: this.consulta.idmedico,
							idpaciente: this.$route.params.id_paciente,
							tipocita: this.consulta.tipocita,
							sospechoso: this.consulta.sospechoso,
							descripcion: this.consulta.descripcion,
							estatus: true,
							diagnostico: this.diagnostico,
						}),
					}
				);
			} catch (error) {
				console.log(error);
			}
		},
		async updatePaciente() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/${this.$route.params.id_paciente}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							nombre: this.paciente.nombre,
							apellidos: this.paciente.apellidos,
							email: this.paciente.email,
							clave: this.paciente.clave,
							nacimiento: this.paciente.nacimiento,
							direccion: this.paciente.direccion,
							idarea: this.paciente.idarea,
							idtipo: this.paciente.idtipo,
							estatus: 'Sospechoso',
						}),
					}
				);
			} catch (error) {
				console.log(error);
			}
		},
		async updateSospechoso() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/consulta/${this.$route.params.id_consulta}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							fecha: this.consulta.fecha,
							hora: this.consulta.hora,
							idmedico: this.consulta.idmedico,
							idpaciente: this.$route.params.id_paciente,
							tipocita: this.consulta.tipocita,
							sospechoso: true,
							descripcion: this.consulta.descripcion,
							estatus: this.consulta.estatus,
							diagnostico: this.diagnostico,
						}),
					}
				);
			} catch (error) {
				console.log(error);
			}
		},
		async insertMedicamentosReceta(medicamento) {
			try {
				if (medicamento[0] !== '' && medicamento[1] !== '') {
					const data = await fetch(`https://api-tedw-covid.herokuapp.com/receta`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							idmedicamento: medicamento[0],
							dosis: medicamento[1],
							idconsulta: this.$route.params.id_consulta,
						}),
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
		async insertOrdenPrueba() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/ordenprueba`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						resultado: '',
						fecha: new Date().toISOString().substr(0, 10),
						idusuario: this.$route.params.id_paciente,
						idtipo: this.tipopruebaselect,
					}),
				});
			} catch (error) {
				console.log(error);
			}
		},
		agregaInput() {
			this.list.push(this.count);
			this.medicamentos.push(['', '']);
			this.count++;
		},
		muestra() {
			this.updateDiagnostico();
			this.medicamentos.forEach((medicamento) => {
				this.insertMedicamentosReceta(medicamento);
			});
			console.log(this.medicamentos[0]);
			this.$router.push('/consultasmedico');
		},
		deleteItem() {
			this.dialogDelete = true;
		},
		deleteItemConfirm() {
			this.updatePaciente();
			this.updateSospechoso();
			this.insertOrdenPrueba();
			this.closeDelete();
		},
		closeDelete() {
			this.dialogDelete = false;
		},
	},
	created() {
		this.getPaciente();
		this.getConsulta();
		this.getMedicamentos();
		this.getPrueba();
	},
};
</script>

<style scoped>
.container-custom {
	width: 60%;
}
.card-header {
	background-color: #428bca;
}
</style>
