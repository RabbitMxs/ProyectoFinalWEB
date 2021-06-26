<template>
	<div>
		<header>
			<NavAlumno />
		</header>
		<main class="d-flex justify-center mt-5 mx-auto">
			<div class="container-custom">
				<v-card class="mt-2">
					<div class="card-header">
						<v-card-title class="white--text text-h5">
							Administrador de Consultas Médicas
						</v-card-title>
						<v-card-subtitle class="white--text text-subtitle-2">
							Aquí podras ver las citas atendidas así como crear una nueva cita con los medicos
							internos
						</v-card-subtitle>
					</div>
					<v-card-text>
						<DataTableConsultas />
					</v-card-text>
				</v-card>
			</div>
		</main>
	</div>
</template>

<script>
import DataTableConsultas from '../../components/DataTableConsultas.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'Consultas',
	components: { NavAlumno, DataTableConsultas },
};
</script>

<style></style>

<style scoped>
.container-custom {
	width: 70%;
	align-items: center;
}
.card-header {
	background-color: #428bca;
}
</style>
