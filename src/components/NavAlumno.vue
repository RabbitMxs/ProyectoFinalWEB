<template>
	<div>
		<v-app-bar color="#008a17" dense dark>
			<v-app-bar-nav-icon>
				<router-link to="/homeuser">
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

			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>

			<v-btn icon v-bind="attrs" v-on="on" @click="salir()">
				<v-icon>mdi-logout-variant</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	methods: {
		salir() {
			localStorage.clear();
			this.$router.push('/');
		},
	},
};
</script>

<style></style>
