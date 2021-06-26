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
									Encuestas
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Aqui podras ver las encuestas realizadas por los alumnos o personal
								</v-card-subtitle>
							</div>
							<v-card-text>
								<DataTableEncuestas />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import DataTableEncuestas from '../../components/DataTableEncuestas.vue';
import NavMedico from '../../components/NavMedico.vue';

export default {
	components: { NavMedico, DataTableEncuestas },
};
</script>

<style scoped>
.c,
DataTableEncuestasontainer-custom {
	width: 80%;
}
.card-header {
	background-color: #428bca;
}
</style>
