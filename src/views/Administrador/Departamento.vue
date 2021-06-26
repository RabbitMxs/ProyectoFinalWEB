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
									Departamentos
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra los diferentes departamentos de la instituciòn,podras dar de alta
									a nuevos asi como eliminarlos o editarlos
								</v-card-subtitle>
							</div>
							<v-card-text>
								<DataTableDepartamento />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import DataTableDepartamento from '../../components/DataTableDepartamento.vue';
import NavAdmin from '../../components/NavAdmin.vue';
export default {
	components: { NavAdmin, DataTableDepartamento },
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
