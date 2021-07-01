<template>
	<div>
		<v-app-bar color="#008a17" dark>
			<v-app-bar-nav-icon>
				<router-link to="/homeadmin">
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
						<v-icon>mdi-archive</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="opcion in opciones"
						:key="opcion.index"
						@click="redireccionar(opcion.id)"
					>
						<v-list-item-title>{{ opcion.nombre }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

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
						@click="redireccionarReportes(reporte.id)"
					>
						<v-list-item-title>{{ reporte.nombre }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" @click="salir()">
						<v-icon>mdi-logout-variant</v-icon>
					</v-btn>
				</template>
			</v-menu>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			opciones: [
				{
					id: 0,
					nombre: 'Usuarios',
				},
				{
					id: 1,
					nombre: 'Departamentos',
				},
				{
					id: 2,
					nombre: 'Tipo de Usuarios',
				},
				{
					id: 3,
					nombre: 'Tipo Prueba',
				},
				{
					id: 4,
					nombre: 'Medicamento',
				},
				{
					id: 5,
					nombre: 'Pregunta',
				},
			],
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
		salir() {
			localStorage.clear();
			this.$router.push('/');
		},
		redireccionar(id) {
			console.log(id);
			switch (id) {
				case 0:
					this.$router.push('usuario');
					break;
				case 1:
					this.$router.push('/departamento');
					break;
				case 2:
					this.$router.push('/tipoUsuario');
					break;
				case 3:
					this.$router.push('/tipoPrueba');
					break;
				case 4:
					this.$router.push('/medicamento');
					break;
				case 5:
					this.$router.push('/pregunta');
					break;
			}
		},
		redireccionarReportes(id) {
			console.log(id);
			switch (id) {
				case 0:
					this.$router.push('/reportes/admin/casosdetectados');
					break;
				case 1:
					this.$router.push('/reportes/admin/casoscarreradepto');
					break;
				case 2:
					this.$router.push('/reportes/admin/casoscarreradeptoseparados');
					break;
				case 3:
					this.$router.push('/reportes/admin/encuestasaplicadas');
					break;
				case 4:
					this.$router.push('/reportes/admin/consultasatentidas');
					break;
			}
		},
	},
};
</script>

<style></style>
