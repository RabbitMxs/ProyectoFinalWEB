<template>
	<div>
		<NavAlumno />
		<v-main>
			<v-container>
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
									Estatus: <span class="font-weight-regular">{{ estatus }}</span>
								</p>
							</div>

							<div class="four  my-auto col">
								<BtnAzul texto="Administrador de consultas" link="consultas" />
								<br />
								<BtnAzul texto="Contestar Encuesta" link="cuestionario" class="mt-3" />
							</div>
						</div>
					</v-card-text>
				</v-card>
				<DataTablePruebas class="mt-5" />
			</v-container>
		</v-main>
	</div>
</template>

<script>
import BtnAzul from '../../components/BtnAzul.vue';
import { mapState } from 'vuex';
import DataTablePruebas from '../../components/DataTablePruebas.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'HomeUser',
	components: { NavAlumno, DataTablePruebas, BtnAzul },
	data() {
		return {
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
	mounted() {
		this.getAlumno();
	},
};
</script>

<style>
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
