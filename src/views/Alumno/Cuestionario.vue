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
							<div v-for="pregunta in preguntas" :key="pregunta.id">
								<Pregunta
									:name="`idPregunta${pregunta.id}`"
									:pregunta="pregunta.pregunta"
									v-if="pregunta.id !== preguntas.length"
								/>
								<div class="form-floating mt-2" v-else>
									<v-textarea
										outlined
										class="text-body-1 font-weight-regular"
										:name="`idPregunta${pregunta.id}`"
										:label="pregunta.pregunta"
									></v-textarea>
								</div>
							</div>
							<div>
								<BtnAzul class="me-5" texto="Enviar" link="" />
								<BtnRojo texto="Cancelar" link="homeuser" />
							</div>
						</v-form>
					</v-card-text>
				</v-card>
			</div>
		</main>
	</div>
</template>

<script>
import BtnAzul from '../../components/BtnAzul.vue';
import BtnRojo from '../../components/BtnRojo.vue';
import Pregunta from '../../components/Pregunta.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'Cuestionario',
	components: { NavAlumno, BtnAzul, Pregunta, BtnRojo },
	data() {
		return {
			preguntas: [],
		};
	},
	methods: {
		async obtenerPreguntas() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/pregunta`);
				const array = await data.json();
				this.preguntas = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.obtenerPreguntas();
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
</style>
