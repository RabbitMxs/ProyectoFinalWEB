<template>
	<div>
		<v-app-bar color="#008a17" dark>
			<v-app-bar-nav-icon>
				<router-link to="/homedirectivo">
					<v-img
						alt="ITC Logo"
						class="shrink mx-2"
						contain
						src="../assets/LogoItc.png"
						transition="scale-transition"
						width="30"
					/>
				</router-link>
			</v-app-bar-nav-icon>

			<v-toolbar-title>Instituto Tecnológico de Celaya</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-file-chart</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="reporte in reportes"
						:key="reporte.index"
						@click="redireccionar(reporte.id)"
					>
						<v-list-item-title>{{ reporte.nombre }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-logout-variant</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item v-for="n in 5" :key="n" @click="() => {}">
						<v-list-item-title>Option {{ n }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			reportes: [
				{
					id: 0,
					nombre: 'Casos detectados en la instución',
				},
				{
					id: 1,
					nombre: 'Casos estudiantes/personal',
				},
				{
					id: 2,
					nombre: 'Casos carrera/departamento',
				},
				{
					id: 3,
					nombre: 'Encuestas aplicadas',
				},
				{
					id: 4,
					nombre: 'Consultas atendidas',
				},
			],
		};
	},
	methods: {
		redireccionar(id) {
			console.log(id);
			switch (id) {
				case 0:
					this.$router.push('/reportes/directivo/casosdetectados');
					break;
				case 1:
					this.$router.push('/reportes/directivo/casoscarreradepto');
					break;
				case 2:
					this.$router.push('/reportes/directivo/casoscarreradeptoseparados');
					break;
				case 3:
					this.$router.push('/reportes/directivo/encuestasaplicadas');
					break;
				case 4:
					this.$router.push('/reportes/directivo/consultasatentidas');
					break;
			}
		},
	},
};
</script>

<style></style>
