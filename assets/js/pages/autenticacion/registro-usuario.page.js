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
	mounted: async function() {},

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

			// eslint-disable-next-line no-undef
			axios({
				url: "/registro-usuario",
				method: "post",
				data: formData
			})
				.then(response => {
					swal({
						title: `Usuario creado correctamente!`,
						icon: "success",
						type: "success",
						text: `El usuario \"${response.data.usuarioCreado.nombre}\" con alias  \"${response.data.usuarioCreado.alias}\" ha sido creado correctamente. Para poder ingresar, confirma tu cuenta en tu correo electrónico\"${response.data.usuarioCreado.email}\"`, // html: `<p><span>El usuario </span><em>${response.data.usuarioCreado.nombre}</em> ha sido creado correctamente</p>`,
						// html: "<div>hola</div>",

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
							type: "error",
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
