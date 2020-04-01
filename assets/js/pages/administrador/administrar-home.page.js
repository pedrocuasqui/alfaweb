/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("administrar-home", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		breadcrumb: [{ id: "", texto: "indice", enlace: "#" }],
		// cursos:Object, //esta variable será sobreescrita con el contenido de Windows.SAILS_LOCALS.cursos //vue no reconoce la variable cuando no está declarada
		cursoEliminar: {
			nombre: "",
			id: ""
		},

		editarCurso: false,
		formErrors: {},
		cursos: Object,
		estudiantes: null,
		usuario: null,
		administradores: []
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.cursos = SAILS_LOCALS.cursos;
		this.estudiantes = SAILS_LOCALS.estudiantes;
		this.usuario = SAILS_LOCALS.usuario;
		this.administradores = SAILS_LOCALS.administradores;
	},
	mounted: async function() {
		// this.asignarEventoClick();
	},
	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		asignarEventoClick() {
			var _this = this;
			this.cursos.forEach(element => {
				document.getElementById(element.id).addEventListener(
					"click",
					(abrir = function() {
						_this.abrirCurso(element.id);
					}),
					false
				);
			});

			// elementosBtn.forEach(elemento =>{
			//   elemento.addEventListener("click", this.abrirCurso);
			// });
		},
		seleccionaCursoEliminar(curso) {
			this.cursoEliminar = curso;
			$(() => {
				$("#modalConfirmaEliminar").modal("show");
			});
		},
		eliminarDocumento() {
			var _this = this;
			axios
				.get("/eliminar-curso", {
					params: {
						cursoId: this.cursoEliminar.id
					}
				})
				.then(() => {
					swal({
						icon: "success",
						title: "Curso eliminado",
						showConfirmButton: true,
						timer: 2000
					});
					_this.consultarCursos();
				})
				.catch(error => {
					swal({
						icon: "error",
						title: "No se pudo eliminar el curso",
						text: error,
						showConfirmButton: true
					});
				});
		},

		consultarCursos() {
			var _this = this;
			axios
				.get("/consulta-cursos") //llamada a la ruta curso por defecto
				.then(response => {
					_this.cursos = response.data;
				})
				.catch(error => {
					swal({
						icon: "error",
						title: "No se ha podido consultar los cursos",
						text: error,
						showConfirmButton: true
					});
				});
		},
		abrirCurso(cursoId) {
			window.location.href = "/administrar-indice/?cursoId=" + cursoId;
		},

		validarCampos(curso) {
			this.formErrors = {};

			if (curso.nombre == "") {
				this.formErrors.nombre = true;
			}
			if (curso.descripcion == "") {
				this.formErrors.descripcion = true;
			}

			if (Object.keys(this.formErrors).length > 0) {
				return false;
			} else {
				this.guardarCurso(curso);
			}
		},
		guardarCurso(curso) {
			var _this = this;
			this.editarCurso = false;

			// PROCESO PARA GUARDAR EL CURSO
			var formData = new FormData();
			formData.append("cursoId", curso.id);
			formData.append("nombreCurso", curso.nombre);
			formData.append("descripcionCurso", curso.descripcion);
			axios({
				method: "post",
				url: "/actualizar-curso",
				data: formData
			})
				.then(() => {
					swal({
						icon: "success",
						title: "Curso guardado correctamente",
						showConfirmButton: true,
						timer: 2000
					});
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Error: no se ha podido actualizar el curso",
						text: `${err}`,
						showConfirmButton: true
					});
				});

			// finalmente habilitar el evento click nuevamente
			document.getElementById(curso.id).addEventListener(
				"click",
				(abrir = function() {
					_this.abrirCurso(curso.id);
				}),
				false
			);
		},
		fechaUltimoAccesoEstudiante(estudiante) {
			let fechaUltimoAcceso = "01-01-1970";
			fechaUltimoAcceso = new Date(estudiante.createdAt);
			// let fecha= fechaUltimoAcceso.toString();
			let fecha =
				fechaUltimoAcceso.getDate() +
				"/" +
				fechaUltimoAcceso.getMonth() +
				"/" +
				fechaUltimoAcceso.getFullYear();

			// return fecha.substring(1, 12);
			return fecha;
		},
		clickOnOffAdmin(admin) {
			const formData = new FormData();
			formData.append("adminId", admin.id);
			formData.append("habilitar", admin.confirmado);
			let texto = "";
			let titulo = "";
			if (admin.confirmado) {
				texto = `El administrador ${admin.nombre} Ha sido habilitado exitosamente`;
				titulo = "Administrador Habilitado";
			} else {
				texto = `El administrador ${admin.nombre} Ha sido deshabilitado exitosamente`;
				titulo = "Administrador Deshabilitado";
			}
			axios({
				method: "post",
				url: "/habilitar-admin",
				data: formData
			})
				.then(() => {
					swal({
						icon: "success",
						title: titulo,
						text: texto,
						showConfirmButton: true,
						timer: 3000
					});
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Error: No se ha podido habilitar al usuario",
						text: `${err}`,
						showConfirmButton: true,
						timer: 2000
					});
				});
		}
	},
	computed: {}
});
