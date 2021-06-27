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
									Casos detectados en estudiantes
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de casos detectados en estudiantes
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<DataTableCasosEstudiantes />
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row align="center" no-gutters justify="center" class="mt-5">
					<v-col cols="12">
						<v-card class="mt-2">
							<div class="card-header">
								<v-card-title class="white--text text-h5">
									Casos detectados en el personal
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de casos detectados en el personal
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<DataTableCasosPersonal />
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import NavAdmin from '@/components/NavAdmin.vue';
import DataTableCasosEstudiantes from '../../../components/Reportes/DataTableCasosEstudiantes.vue';
import DataTableCasosPersonal from '../../../components/Reportes/DataTableCasosPersonal.vue';
export default {
	components: { NavAdmin, DataTableCasosEstudiantes, DataTableCasosPersonal },
};
</script>

<style scoped>
.container-custom {
	width: 80%;
}
.card-header {
	background-color: #428bca;
}
</style>
