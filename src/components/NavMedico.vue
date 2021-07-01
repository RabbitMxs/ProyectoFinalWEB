<template>
	<div>
		<v-app-bar color="#008a17" dense dark>
			<v-app-bar-nav-icon>
				<router-link to="/homemedico">
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
					nombre: 'Encuestas',
				},
				{
					id: 1,
					nombre: 'Pruebas aplicadas',
				},
				{
					id: 2,
					nombre: 'Consultas',
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
					this.$router.push('/encuestas');
					break;
				case 1:
					this.$router.push('/pruebas');
					break;
				case 2:
					this.$router.push('/consultasmedico');
					break;
			}
		},
	},
};
</script>

<style></style>
