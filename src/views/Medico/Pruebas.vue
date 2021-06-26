<template>
	<div>
		<header>
			<NavMedico />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<template>
							<v-card class="mt-2">
								<div class="card-header">
									<v-card-title class="white--text text-h5">
										Pruebas aplicadas
									</v-card-title>
									<v-card-subtitle class="white--text text-subtitle-2">
										Aqui podras ver las pruebas de covid aplicadas a los usuarios
									</v-card-subtitle>
								</div>
								<v-card-text>
									<DataTableOrdenPrueba />
								</v-card-text>
							</v-card>
						</template>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import NavMedico from '../../components/NavMedico.vue';
import DataTableOrdenPrueba from '../../components/DataTableOrdenPrueba.vue';

export default {
	components: { NavMedico, DataTableOrdenPrueba },
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
