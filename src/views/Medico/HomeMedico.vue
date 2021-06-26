<template>
	<div>
		<header>
			<NavMedico />
		</header>
		<main class="d-flex justify-center mx-auto col">
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<v-card class="mt-2">
							<v-toolbar color="#428bca" dark dense flat>
								<v-icon class="mr-3">mdi-account</v-icon>
								<v-toolbar-title class="white--text text-h6 font-weight-medium">
									{{ this.medico.nombre + ' ' + this.medico.apellidos }}
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
											<span class="font-weight-regular">{{ this.medico.email }}</span>
										</p>
										<p class="mb-2  text-wrap font-weight-bold black--text">
											Especialidad: <span class="font-weight-regular">{{ especialidad }}</span>
										</p>
										<p class="mb-2  text-wrap font-weight-bold black--text">
											Estatus: <span class="font-weight-regular">{{ estatus }}</span>
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
							<v-row class="mb-10">
								<BtnReporte
									class="iconApp"
									texto="Encuestas"
									link="/encuestas"
									image="mdi-book-information-variant"
									tag="button"
									width="100%"
								/>
								<BtnReporte
									class="iconApp"
									texto="Pruebas COVID"
									link="/pruebas"
									image="mdi-test-tube"
									tag="button"
									width="100%"
								/>
							</v-row>
							<v-row class="mb-10">
								<BtnReporte
									class="iconApp"
									texto="Consultas"
									link="/consultasmedico"
									image="mdi-calendar-plus"
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
import { mapState } from 'vuex';
import NavMedico from '../../components/NavMedico.vue';
import BtnReporte from '../../components/BtnReporte.vue';

export default {
	components: { NavMedico, BtnReporte },
	data() {
		return {
			medico: {},
			especialidad: '',
			estatus: '',
		};
	},
	methods: {
		async getMedico() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${this.id}`);
				const array = await data.json();
				array.forEach((element) => {
					element.email.substr(0, 8);
				});
				this.medico = array[0];
				this.getArea();
				this.getTipo();
			} catch (error) {
				console.log(error);
			}
		},
		async getArea() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/area/${this.medico.idarea}`
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
					`https://api-tedw-covid.herokuapp.com/tipousuario/${this.medico.idtipo}`
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
		this.getMedico();
	},
};
</script>

<style>
.container-custom {
	width: 60%;
}
.iconApp {
	width: 45%;
	height: 100px;
}
.wrapper {
	display: grid;
	grid-template-columns: 200px 1fr 1fr;
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
