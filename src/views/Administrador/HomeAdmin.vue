<template>
	<div>
		<header>
			<NavAdmin />
		</header>
		<main class="d-flex justify-center mx-auto col">
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<v-card class="mt-2">
							<v-toolbar color="#428bca" dark dense flat>
								<v-icon class="mr-3">mdi-account</v-icon>
								<v-toolbar-title class="white--text text-h6 font-weight-medium">
									{{ alumno.nombre + ' ' + alumno.apellidos }}
								</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<div class="wrapper">
									<div class="one mx-auto my-auto">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="150"
											height="150"
											fill="currentColor"
											class="bi bi-person-fill align-self-center"
											viewBox="0 0 16 16"
										>
											<path
												d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
											/>
										</svg>
									</div>
									<div class="two text-start my-auto text-body-1">
										<p class="mb-2 text-wrap font-weight-bold black--text">
											Num. Control:
											<span class="font-weight-regular">{{ alumno.email }}</span>
										</p>
										<p class="mb-2  text-wrap font-weight-bold black--text">
											Especialidad: <span class="font-weight-regular">{{ especialidad }}</span>
										</p>
										<p class="mb-2  text-wrap font-weight-bold black--text">
											Rol: <span class="font-weight-regular">{{ estatus }}</span>
										</p>
									</div>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row class="mt-5" cols="12" align="center" no-gutters justify="center">
					<v-col align="center" no-gutters justify="center">
						<v-container style="width: 100%">
							<v-row>
								<BtnReporte
									class="iconApp mb-10"
									texto="Usuarios"
									link="usuario"
									image="mdi-account-group"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Departamentos"
									link="departamento"
									image="mdi-bank"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Tipo de Usuarios"
									link="tipoUsuario"
									image="mdi-book-account"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Tipos de Pruebas"
									link="tipoPrueba"
									image="mdi-test-tube"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Medicamentos"
									link="medicamento"
									image="mdi-pill"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Preguntas"
									link="pregunta"
									image="mdi-clipboard-list"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Reporte Casos detectados en la institución"
									link="reportes/admin/casosdetectados"
									image="mdi-file-chart"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Reporte casos en estudiantes/personal"
									link="reportes/admin/casoscarreradepto"
									image="mdi-file-chart"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Reporte Carrera / Departamento"
									link="reportes/admin/casoscarreradeptoseparados"
									image="mdi-file-chart"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Reporte Encuestas Aplicadas"
									link="reportes/admin/encuestasaplicadas"
									image="mdi-file-chart"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp mb-10"
									texto="Reporte Consultas Atendidas"
									link="reportes/admin/consultasatentidas"
									image="mdi-file-chart"
									tag="button"
									width="100%"
								/>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import NavAdmin from '../../components/NavAdmin.vue';
import { mapState } from 'vuex';
import BtnReporte from '../../components/BtnReporte.vue';

export default {
	name: 'HomeAdmin',
	components: { NavAdmin, BtnReporte },
	data() {
		return {
			id: localStorage.getItem('Id'),
			alumno: {},
			especialidad: '',
			estatus: '',
		};
	},
	methods: {
		async getAlumno() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${this.id}`);
				const array = await data.json();
				this.alumno = array[0];
				this.alumno.email = this.alumno.email.substr(0, 8);
				this.getArea();
				this.getTipo();
			} catch (error) {
				console.log(error);
			}
		},
		async getArea() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/area/${this.alumno.idarea}`
				);
				const array = await data.json();
				this.especialidad = array[0].carreradepto;
			} catch (error) {
				console.log(error);
			}
		},
		async getTipo() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/tipousuario/${this.alumno.idtipo}`
				);
				const array = await data.json();
				this.estatus = array[0].tipo;
			} catch (error) {
				console.log(error);
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
	created() {
		this.getAlumno();
	},
};
</script>

<style>
.container-custom {
	width: 60%;
}
.iconApp {
	width: 25%;
	height: 100px;
}
.wrapper {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-gap: 10px;
	grid-auto-rows: minmax(auto, auto);
}
.one {
	grid-column: 1;
	grid-row: 1 / 4;
}

.two {
	grid-column: 2;
	grid-row: 1 / 4;
}

.four {
	grid-column: 3;
	grid-row: 1 / 4;
}
</style>
