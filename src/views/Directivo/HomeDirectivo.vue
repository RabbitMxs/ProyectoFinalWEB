<template>
	<div>
		<header>
			<NavDirectivo />
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
							<v-row class="mb-10 ">
								<v-col cols="6" class="my-auto">
									<p class="font-weight-black text-h5">
										<v-icon class="me-2">mdi-calendar</v-icon>
										Primer caso detectado
									</p>
									<p class="font-weight-medium text-h5">
										{{ primerCasoDetectado.fecha }}
									</p>
									<p class="font-weight-black text-h5">
										<v-icon class="me-2">mdi-calendar</v-icon>
										Último caso detectado
									</p>
									<p class="font-weight-medium text-h5">
										{{ ultimoCasoDetectado.fecha }}
									</p>
								</v-col>
								<v-col cols="6"> <DataTableDashboardHistorial /> </v-col>
							</v-row>
							<v-row class="mb-10 ">
								<v-col cols="6">
									<GraficaDashboarPruebas />
								</v-col>
								<v-col cols="6">
									<GraficaDashboarPruebas2 />
								</v-col>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import NavDirectivo from '../../components/NavDirectivo.vue';
import { mapState } from 'vuex';
import BtnReporte from '../../components/BtnReporte.vue';
import GraficaDashboarPruebas from '../../components/Reportes/GraficaDashboarPruebas.vue';
import GraficaDashboarPruebas2 from '../../components/Reportes/GraficaDashboarPruebas2.vue';
import DataTableDashboardHistorial from '../../components/Reportes/DataTableDashboardHistorial.vue';

export default {
	name: 'Homedirectivo',
	components: {
		NavDirectivo,
		BtnReporte,
		GraficaDashboarPruebas,
		GraficaDashboarPruebas2,
		DataTableDashboardHistorial,
	},
	data() {
		return {
			id: localStorage.getItem('Id'),
			alumno: {},
			especialidad: '',
			estatus: '',
			primerCasoDetectado: {},
			ultimoCasoDetectado: {},
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
		async getCasos() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/dashboardPrimeroUltimo`
				);
				const array = await data.json();

				this.primerCasoDetectado = array.primerCasoDetectado;
				this.ultimoCasoDetectado = array.ultimoCasoDetectado;
				this.primerCasoDetectado.fecha = new Date(this.primerCasoDetectado.fecha)
					.toISOString()
					.substr(0, 10);
				this.ultimoCasoDetectado.fecha = new Date(this.ultimoCasoDetectado.fecha)
					.toISOString()
					.substr(0, 10);
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
		this.getCasos();
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
