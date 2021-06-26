<template>
	<div>
		<header>
			<NavAdmin />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<v-card class="mt-2">
							<div class="card-header">
								<v-card-title class="white--text text-h5">
									Tipos de Usuarios
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra los diferentes tipos de usuario, podras dar de alta a nuevos asi
									como eliminarlos o editarlos
								</v-card-subtitle>
							</div>
							<v-card-text>
								<DataTableTipoUsuario />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import DataTableTipoUsuario from '../../components/DataTableTipoUsuario.vue';
import NavAdmin from '../../components/NavAdmin.vue';
export default {
	components: { NavAdmin, DataTableTipoUsuario },
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
