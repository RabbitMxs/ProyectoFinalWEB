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
									Casos por carrera
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de casos por carrera
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<GraficaCasosCarrera />
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
									Casos por departamento
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de casos por departamento
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col>
											<GraficaCasosDepto />
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
import GraficaCasosCarrera from '../../../components/Reportes/GraficaCasosCarrera.vue';
import GraficaCasosDepto from '../../../components/Reportes/GraficaCasosDepto.vue';
export default {
	components: { NavDirectivo, GraficaCasosCarrera, GraficaCasosDepto },
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
