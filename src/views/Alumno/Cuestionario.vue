<template>
	<div>
		<header>
			<NavAlumno />
		</header>
		<main class="d-flex justify-center mt-5 mx-auto">
			<div class="container-custom">
				<v-card class="mt-2">
					<div class="card-header">
						<v-card-title class="white--text text-h5 font-weight-bold">
							Cuestinario
						</v-card-title>
						<v-card-subtitle class="white--text text-subtitle-2 font-weight-regular">
							Tener uno o más de los siguientes síntomas justifica la ausencia o retiro
							inmediato de la institución
						</v-card-subtitle>
					</div>
					<v-card-text>
						<v-form>
							<div v-for="index in list" :key="index.id">
								<div v-if="index !== list.length - 1">
									<div class="wrapper mx-auto">
										<p class="my-auto text-start black--text text-body-1 font-weight-regular">
											{{ list_preguntas[index].pregunta }}
										</p>
										<v-container class="d-flex justify-center align-center ">
											<v-radio-group v-model="preguntas[index].respuesta" row>
												<v-radio label="Si" value="Si"></v-radio>
												<v-radio label="No" value="No"></v-radio>
											</v-radio-group>
										</v-container>
									</div>
									<v-divider></v-divider>
								</div>

								<div class="form-floating mt-2" v-else>
									<v-textarea
										outlined
										class="text-body-1 font-weight-regular"
										v-model="preguntas[index].respuesta"
										:label="list_preguntas[index].pregunta"
									></v-textarea>
								</div>
							</div>
							<div>
								<v-btn color="primary" dark class="mb-2 me-2" @click="enviar()">
									Enviar
								</v-btn>
								<v-btn color="error" dark class="mb-2" @click="regresa()">
									Cancelar
								</v-btn>
							</div>
						</v-form>
					</v-card-text>
				</v-card>
			</div>
		</main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BtnAzul from '../../components/BtnAzul.vue';
import BtnRojo from '../../components/BtnRojo.vue';
import Pregunta from '../../components/Pregunta.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'Cuestionario',
	components: { NavAlumno, BtnAzul, Pregunta, BtnRojo },
	data() {
		return {
			id: localStorage.getItem('Id'),
			list: [],
			preguntas: [],
			count: 0,
			list_preguntas: [],
		};
	},
	methods: {
		async obtenerPreguntas() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/pregunta`);
				const array = await data.json();
				array.forEach((element) => {
					this.list.push(this.count);
					this.preguntas.push({ id_pregunta: element.id, respuesta: null });
					this.count++;
				});
				this.list_preguntas = array;
			} catch (error) {
				console.log(error);
			}
		},
		async enviar() {
			try {
				//if (this.preguntas[0] !== '' && this.preguntas[1] !== '') {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/encuestaRegistro`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id_modalidad: 1,
						fecha: new Date().toISOString().substr(0, 10),
						id_user: this.id,
						preguntas: this.preguntas,
					}),
				});
				const array = await data.json();
				console.log(array);
				this.regresa();
			} catch (error) {
				console.log(error);
			}
		},
		regresa() {
			this.$router.push('/homeuser');
		},
	},
	created() {
		this.obtenerPreguntas();
	},
	computed: {
		...mapState(['id']),
	},
};
</script>

<style scoped>
.container-custom {
	width: 70%;
	align-items: center;
}
.card-header {
	background-color: #428bca;
}
.wrapper {
	display: grid;
	grid-template-columns: 2fr 200px;
	grid-gap: 10px;
	grid-auto-rows: minmax(auto, 50px);
}
</style>
