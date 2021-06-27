<template>
	<v-card>
		<v-toolbar color="primary" dark dense flat>
			<v-toolbar-title class="white--text text-h6 font-weight-medium">
				Pruebas COVID-19
			</v-toolbar-title>
		</v-toolbar>
		<v-data-table
			dense
			:headers="headers"
			:items="desserts"
			item-key="name"
			class="elevation-1 mt-3"
			:footer-props="{
				showFirstLastPage: true,
				firstIcon: 'mdi-arrow-collapse-left',
				lastIcon: 'mdi-arrow-collapse-right',
				prevIcon: 'mdi-minus',
				nextIcon: 'mdi-plus',
			}"
		>
			<template v-slot:item.actions="{ item }">
				<v-icon medium class="mr-2" @click="getReportePrueba(item)">
					mdi-file-pdf
				</v-icon>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'DataTablePruebas',
	data: () => ({
		desserts: [],
		headers: [
			{
				text: 'Num Prueba',
				align: 'start',
				sortable: true,
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Fecha', value: 'fecha', class: 'black--text' },
			{ text: 'Tipo de Prueba', value: 'tipoprueba', class: 'black--text' },
			{ text: 'Resultado', value: 'resultado', class: 'black--text' },
			{ text: 'Archivo', value: 'actions', sortable: false, class: 'black--text' },
		],
		editedIndex: -1,
		editedItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
		defaultItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
	}),
	methods: {
		async getPruebas() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/pruebas/${this.id}`
				);
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.fecha = new Date().toISOString().substr(0, 10);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getReportePrueba(item) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/pruebaReporte/${item.id}`
				);
				const array = await data.json();
				array[0].fecha = new Date().toISOString().substr(0, 10);
				var object = window.open(
					'',
					'_blank',
					'width= 1100, height=620, left=10, top=50, menubar=yes, tooblar=no, location=no, scrollbars=yes'
				);
				object.document.open();
				object.document.write(`
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<title>PRUEBA ${item.id}</title>
						<style type="text/css">   
 								.mayuscula { text-transform: uppercase;} 
								.centro {text-align: center} 
						</style>
					</head>
					<body>
						<div>
							<div style="text-align: center; padding-top: 1%; ">
								<font color="#010B56" size="8">
									<label class="mayuscula" > ${array[0].tipoprueba} COVID-19</label><br>
								</font>
								<label style=" font-size: 22px ">PACIENTE: </label> <br>
								<label style=" font-size: 20px ">${array[0].nombre}</label>
							</div>
								
							<div style=" text-align:center;">
							<br><br><br>
								<table border="1" style="margin: 0 auto; width:60%;">
									<tr>
										<td height="45">FECHA</td>
										<td height="45">TIPO DE PRUEBA</td>
										<td height="45">RESULTADO</td>
									</tr>
									<tr>
										<td height="40">${array[0].fecha}</td>
										<td height="40">${array[0].tipoprueba}</td>
										<td height="40"><b class="mayuscula"> ${array[0].resultado} </b></td>
									</tr>
								</table>
							</div>
							<div style="text-align: center; margin: 50px; padding-top: 10%; ">
							    <hr>
								<font color="#ada5a3" >
								    <label>SERVICIOS MEDICOS</label><br>
									<label>TECNOLÓGICO NACIONAL DE MÉXICO EN Celaya</label><br>
									<label>Av. Tecnológico. Celaya, Gto. México</label><br>
									<label >Telefono:  01 (461)61 17575 </label>
								</font>
							</div>
						<div>
					</body>
					</html>
				`);
				object.document.close();
			} catch (error) {
				console.log(error);
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
	created() {
		this.getPruebas();
	},
};
</script>

<style></style>
