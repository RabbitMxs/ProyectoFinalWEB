import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: 0,
	},
	mutations: {
		cambiarId(state, value) {
			state.id = value;
		},
	},
	actions: {
		login({ commit }, id) {
			commit('cambiarId', id);
		},
	},
	modules: {},
});
