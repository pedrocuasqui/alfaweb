/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("clave-recuperacion-cuenta", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		formData: {},
		formErrors: {
			/* … */
		},
		mostrarCamposContrasenia: false
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
	},
	mounted: async function() {
		this.usuarioRecuperacionId = SAILS_LOCALS.usuarioRecuperacion.id;
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		validarFormulario() {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida exista codigoTemporal:
			if (!argins.codigoTemporal) {
				this.formErrors.codigoTemporal = true;
			}

			//  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				this.verificarCodigoTemporal();
			} else {
				//si se encuentran errores no se recarga la página
				return false;
				// e.preventDefault();
			}
		},

		verificarCodigoTemporal() {
			// var _this=this;
			var formData = new FormData();
			formData.append("codigoTemporal", this.formData.codigoTemporal);
			formData.append("usuarioRecuperacionId", this.usuarioRecuperacionId);

			axios({
				url: "/verificar-clave-recuperacion-cuenta",
				method: "post",
				data: formData
			})
				.then(() => {
					this.mostrarCamposContrasenia = true;
				})
				.catch(err => {
					if (err.response.status == 409) {
						swal({
							icon: "error",
							title: "El usuario no existe",
							text: `${err}`,
							showConfirmButton: true
						});
					} else if (err.response.status == 401) {
						swal({
							icon: "error",
							title: "PIN incorrecto",
							text: `${err}`,
							showConfirmButton: true
						});
					} else if (err.response.status == 403) {
						swal({
							icon: "error",
							title: "No se ha solicitado la recuperación de contraseña",
							text: `${err}`,
							showConfirmButton: true
						});
					} else {
						swal({
							icon: "error",
							title: "ERROR EN EL SERVIDOR",
							text: `${err}`,
							showConfirmButton: true
						});
					}

					// return false;
				});
		},
		validarContrasenia() {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida exista password:
			if (!argins.password) {
				this.formErrors.password = true;
			}
			// Valida password confirmación:
			if (this.formData.passwordConfirm != this.formData.password) {
				this.formErrors.passwordConfirm = true;
			}

			//  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				this.clickCambiarContrasenia();
			} else {
				//si se encuentran errores no se recarga la página
				return false;
				// e.preventDefault();
			}
		},
		clickCambiarContrasenia() {
			// swal({
			// 	icon: "success",
			// 	title: "CONTRASENIA CAMBIADA",
			// 	text:
			// 		"1) Crear action para actualizar el password 2) enviar la peticion para cambiar contrase~na del usuario \n 3) setear a null la propiedad codigoRecuperacion del usuario",
			// 	showConfirmButton: true
			// });

			var formData = new FormData();
			formData.append("password", this.formData.password);
			formData.append("usuarioRecuperacionId", this.usuarioRecuperacionId);

			axios({
				url: "/actualizar-password-usuario",
				method: "post",
				data: formData
			})
				.then(() => {
					swal({
						icon: "success",
						title: "CONTRASEÑA ACTUALIZADA",
						text: "La contraseña se ha actualizado correctamente",
						showConfirmButton: true
					}).then(() => {
						window.location.replace("/view-login");
					});
				})
				.catch(err => {
					if (err.response.status == 409) {
						swal({
							icon: "error",
							title: "El usuario no existe",
							text: `${err}`,
							showConfirmButton: true
						});
					} else {
						swal({
							icon: "error",
							title: "ERROR EN EL SERVIDOR",
							text: `${err}`,
							showConfirmButton: true
						});
					}
				});
		}
	}
});
