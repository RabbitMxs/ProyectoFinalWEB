<template>
	<div>
		<header>
			<NavDirectivo />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<v-card class="mt-2">
							<div class="card-header">
								<v-card-title class="white--text text-h5">
									Casos por carrera y departamento
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de casos por carrera y departamento
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<DataTableDeptoCarrera />
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<GraficaCasosDeptoCarrera />
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
import NavDirectivo from '@/components/NavDirectivo.vue';
import GraficaCasosDeptoCarrera from '@/components/Reportes/GraficaCasosDeptoCarrera.vue';
import DataTableDeptoCarrera from '@/components/Reportes/DataTableDeptoCarrera.vue';
export default {
	components: { NavDirectivo, GraficaCasosDeptoCarrera, DataTableDeptoCarrera },
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
