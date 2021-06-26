import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/homeuser',
		name: 'HomeUser',
		component: () => import('../views/Alumno/HomeUser.vue'),
	},
	{
		path: '/cuestionario',
		name: 'Cuestionario',
		component: () => import('../views/Alumno/Cuestionario.vue'),
	},
	{
		path: '/consultas',
		name: 'Consultas',
		component: () => import('../views/Alumno/AdminConsultas.vue'),
	},
	{
		path: '/homeadmin',
		name: 'HomeAdmin',
		component: () => import('../views/Administrador/HomeAdmin.vue'),
	},
	{
		path: '/usuario',
		name: 'Usuario',
		component: () => import('../views/Administrador/Usuario.vue'),
	},
	{
		path: '/departamento',
		name: 'Departamento',
		component: () => import('../views/Administrador/Departamento.vue'),
	},
	{
		path: '/tipoUsuario',
		name: 'TipoUsuario',
		component: () => import('../views/Administrador/TipoUsuario.vue'),
	},
	{
		path: '/tipoPrueba',
		name: 'TipoPrueba',
		component: () => import('../views/Administrador/TipoPrueba.vue'),
	},
	{
		path: '/medicamento',
		name: 'Medicamentos',
		component: () => import('../views/Administrador/Medicamento.vue'),
	},
	{
		path: '/pregunta',
		name: 'Preguntas',
		component: () => import('../views/Administrador/Preguntas.vue'),
	},
	{
		path: '/homemedico',
		name: 'HomeMedico',
		component: () => import('../views/Medico/HomeMedico.vue'),
	},
	{
		path: '/encuestas',
		name: 'Encuestas',
		component: () => import('../views/Medico/Encuestas.vue'),
	},
	{
		path: '/respuesta/:id',
		name: 'Respuestas',
		component: () => import('../views/Medico/Respuestas.vue'),
	},
	{
		path: '/pruebas',
		name: 'Pruebas',
		component: () => import('../views/Medico/Pruebas.vue'),
	},
	{
		path: '/consultasmedico',
		name: 'ConsultasMedico',
		component: () => import('../views/Medico/Consultas.vue'),
	},
	{
		path: '/diagnostico/:id_consulta/:id_paciente',
		name: 'Diagnostico',
		component: () => import('../views/Medico/Diagnostico.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
