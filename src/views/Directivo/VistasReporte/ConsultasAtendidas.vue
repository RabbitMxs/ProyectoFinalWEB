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
									Encuestas aplicadas
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Se muestra el número de encuestas aplicadas en la institución
								</v-card-subtitle>
							</div>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col><DataTableConsultas /></v-col>
									</v-row>
									<v-row>
										<v-col><GraficasConsultas /> </v-col>
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
import DataTableConsultas from '@/components/Reportes/DataTableConsultas.vue';
import GraficasConsultas from '@/components/Reportes/GraficasConsultas.vue';
export default {
	components: { NavDirectivo, DataTableConsultas, GraficasConsultas },
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
