<template>
	<div>
		<NavMedico />
		<v-main>
			<v-container fluid class="container-custom mt-5">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<DataTableRespuestas />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import DataTableRespuestas from '../../components/DataTableRespuestas.vue';
import NavMedico from '../../components/NavMedico.vue';
export default {
	components: { NavMedico, DataTableRespuestas },
	data() {
		return {
			respuestas: {},
			especialidad: '',
			estatus: '',
		};
	},
	computed: {
		...mapState(['id']),
	},
};
</script>

<style>
.container-custom {
	width: 50%;
}
</style>
