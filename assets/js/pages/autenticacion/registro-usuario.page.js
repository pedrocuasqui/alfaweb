/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("registro-usuario", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		formData: {},
		// For tracking client-side validation errors in our form.
		// > Has property set to `true` for each invalid property in `formData`.
		superAdministradores: [],
		formErrors: {
			/* … */
		}
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
	},
	mounted: async function() {
		this.superAdministradores = [...SAILS_LOCALS.superAdministradores];
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

	methods: {
		validarFormulario(e) {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida que exista un nombre de usuario:
			if (!argins.nombre) {
				this.formErrors.nombre = true;
			}
			// Valida que exista alias de usuario:
			if (!argins.alias) {
				this.formErrors.alias = true;
			}
			// Valida exista password:
			if (!argins.password) {
				this.formErrors.password = true;
			}
			// Valida password confirmación:
			if (this.formData.passwordConfirm != this.formData.password) {
				this.formErrors.passwordConfirm = true;
			}

			if (!argins.email) {
				this.formErrors.email = true;
			} else {
				if (!this.validEmail(argins.email)) {
					this.formErrors.email = true;
				}
			}
			// else {
			//   this.formData.email = null;
			// }
			// Valida que exista un rol:
			if (!argins.rol) {
				this.formErrors.rol = true;
			}

			/*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
			//  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				this.registrarUsuario();
			} else {
				//si se encuentran errores no se recarga la página
				return false;
			}
		},
		registrarUsuario() {
			// var _this=this;
			var formData = new FormData();
			formData.append("nombre", this.formData.nombre);
			formData.append("alias", this.formData.alias);
			formData.append("email", this.formData.email);
			formData.append("password", this.formData.password);
			formData.append("rol", this.formData.rol);

			// se envian los datos de registro,
			// si se necesita usar html en swal, es necesario crear objetos tipo nodo html
			// https://sweetalert.js.org/docs/#content

			axios({
				url: "/registro-usuario",
				method: "post",
				data: formData,
				baseURL: "https://some-domain.com/registro-usuario/",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "multipart/form-data"
				}
			})
				.then(response => {
					// var pTag = document.createElement("p");
					// pTag.appendChild(document.createTextNode("El usuario"));
					// let bNode = document.createElement("b");
					// bNode.appendChild(
					// 	document.createTextNode(response.data.usuarioCreado.nombre)
					// );
					// pTag.appendChild(bNode);
					// pTag.appendChild(document.createTextNode("con alias"));
					//CODIGO COMENTADO PRODUCE: El usuariorywtcon alias

					let texto = "";
					if (this.formData.rol == "administrador") {
						var usuariosAdmin = "";
						this.superAdministradores.forEach(sadmin => {
							usuariosAdmin = usuariosAdmin + sadmin.email + ", ";
						});

						texto = `El usuario \"${response.data.usuarioCreado.nombre}\" de tipo Administrador, con alias  \"${response.data.usuarioCreado.alias}\" ha sido creado correctamente. \nPara poder ingresar, un superAdmin (${usuariosAdmin}) debe habilitar tu cuenta`;
					} else {
						texto = `El usuario \"${response.data.usuarioCreado.nombre}\" con alias  \"${response.data.usuarioCreado.alias}\" ha sido creado correctamente. \n Ingresa al correo electrónico \"${response.data.usuarioCreado.email}\" y confirma tu cuenta `;
					}
					swal({
						title: `Usuario creado correctamente!`,
						icon: "success",
						type: "success",
						text: texto,

						confirmButtonClass: "btn btn-success btn-fill",
						buttonsStyling: false
					}).then(() => {
						window.location.replace("/view-login");
					});
				})
				.catch(err => {
					if (err.response.status == 409 && err.response.data.tipo == "alias") {
						swal({
							title: `¡No se ha podido registrar!`,
							icon: "error",
							type: "error",
							text: `El alias de usuario "${this.formData.alias}" ya se encuentra registrado`,
							confirmButtonClass: "btn-danger"
							// buttonsStyling: false
						});
					} else if (
						err.response.status == 409 &&
						err.response.data.tipo == "email"
					) {
						swal({
							title: `¡No se ha podido registrar!`,
							icon: "error",
							type: "error",
							text: `El correo "${this.formData.email}" ya se encuentra registrado`,
							confirmButtonClass: "btn-danger"
							// buttonsStyling: false
						});
					} else {
						swal({
							title: `No se puede registrar en este momento, intente más tarde!`,
							icon: "error",
							type: `error ${err}`,
							confirmButtonClass: "btn-danger"
						});
					}

					// return false;
				});
		},
		validEmail: function(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}
});
