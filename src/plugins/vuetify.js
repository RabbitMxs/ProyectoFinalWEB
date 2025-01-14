import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#428bca',
				secondary: '#b0bec5',
				accent: '#8c9eff',
				error: '#d9534f',
				success: '#008a17',
				bluegrey: '#607D8B',
			},
		},
	},
});
