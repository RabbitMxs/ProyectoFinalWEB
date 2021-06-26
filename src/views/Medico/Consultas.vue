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
									Consultas
								</v-card-title>
								<v-card-subtitle class="white--text text-subtitle-2">
									Aqui podras ver las consultas que solicitaron los usuarios
								</v-card-subtitle>
							</div>
							<v-card-text>
								<DataTableConsultasMedico />
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import DataTableConsultasMedico from '../../components/DataTableConsultasMedico.vue';
import NavMedico from '../../components/NavMedico.vue';

export default {
	components: { NavMedico, DataTableConsultasMedico },
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
