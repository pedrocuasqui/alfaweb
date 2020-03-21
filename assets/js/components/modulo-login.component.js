/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerComponent("modulo-login", {
	props: {},
	data() {
		return {
			formData: {
				alias: null,
				email: null,
				password: null
			},
			// For tracking client-side validation errors in our form.
			// > Has property set to `true` for each invalid property in `formData`.
			formErrors: {
				/* … */
			},
			usuario: "alias",
			aliasIncorrecto: false,
			correoIncorrecto: false,
			passwordIncorrecto: false
		};
	},

	template: /*template */ `<div>
  <form  @submit.prevent="validarFormulario" >

      <!--SLOT  PARA BOTON DE REGISRATE-->
      <slot>
      </slot>
			<div class="seccion-inicia-sesion">
			<div>
			<h3 class="centrado_horizontal">Inicia Sesión</h3>
			</div>
			
			<div class="container-fluid">
				<div class="row centrado_horizontal">
					
					<div class="col-sm-3"></div>
					<div class="col-sm-3 nopadding">
						<div class="radio-item">
							<input type="radio" id="seleccionar_alias" value="alias" v-model="usuario">
							<label for="seleccionar_alias">Alias</label>
						</div>
						
					</div>
					<div class="col-sm-3">
						<div class="radio-item">
							<input type="radio" id="seleccionar_email" value="email" v-model="usuario">
							<label for="seleccionar_email">Email</label>		
						</div>
					</div>
					<div class="col-sm-3"></div>
				
				</div>
			</div>
     
      
     
      <div v-if="usuario=='alias'" class="form-group">
        <label for="alias">Alias de usuario</label>
        <input name="alias" class="form-control" id="alias" autofocus type="text"
          :class="[formErrors.alias || aliasIncorrecto ? 'is-invalid' : '']" v-model.trim="formData.alias" placeholder="Ej. pepito123">
          <div class="invalid-feedback" v-if="formErrors.alias">Ingrese un alias de usuario.</div>
          <div class="invalid-feedback" v-if="aliasIncorrecto">Usuario no registrado.</div>
      </div>
      <div v-else class="form-group">
        <label for="email">Correo electrónico</label>
        <input name="email" class="form-control" id="email" type="email" :class="[formErrors.email || correoIncorrecto ? 'is-invalid' : '']"
          v-model.trim="formData.email" placeholder="Ej. pepito@example.com">
        <div class="invalid-feedback" v-if="formErrors.email">Ingrese un correo electrónico válido.</div>
        <div class="invalid-feedback" v-if="correoIncorrecto">Usuario no registrado.</div>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input name="password" class="form-control" id="password" type="password"
          :class="[formErrors.password || passwordIncorrecto ? 'is-invalid' : '']" v-model.trim="formData.password" placeholder="••••••••">
        <div class="invalid-feedback" v-if="formErrors.password">Ingrese una contraseña</div>
        <div class="invalid-feedback" v-if="passwordIncorrecto">Contraseña incorrecta</div>
      </div>

     

			<div class="row">
			<div class="col-sm-3"></div>
			<div class="col-sm-6">
				<div class="form-group">
						<input type="submit" value="Iniciar Sesión" class="btn btn-primary boton_formulario">
				</div>
			</div>
			<div class="col-sm-3"></div>
		</div>
			<p class="enlace centrado_horizontal" @click="clickRecuperarContrasenia()"><small>¿Olvidaste tu contraseña?</small> </p>
			<p class="centrado_horizontal"><small>¿Quieres ingresar sin registrarte?, ingresa como visitante </small></p>
			<p class="centrado_horizontal">	<a class="btn btn-primary boton_formulario" href="/inicio" role="button">Ingresa como visitante</a></p>
	



     </div>
    </form>


  </div>
  `,
	methods: {
		validarFormulario() {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida que exista alias de usuario:
			if (this.usuario == "alias" && !argins.alias) {
				this.formErrors.alias = true;
			}
			// Valida que exista correo de usuario:
			if (this.usuario == "email" && !argins.email) {
				this.formErrors.email = true;
			}
			// Valida exista password:
			if (!argins.password) {
				this.formErrors.password = true;
			}

			/*INSERTAR LA VALIDACION DE CORREO ELECTRONICO VALIDO */
			//  si el objeto formErrors se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				this.valor = "hola";
				// e.preventDefault();

				this.intentarEnvio();
			}
		},
		intentarEnvio() {
			//establezco los sigueintes valores en false para que se oculten los mensajes de error en la vista
			this.aliasIncorrecto = false;
			this.correoIncorrecto = false;
			this.passwordIncorrecto = false;

			axios
				.post("/login", {
					//por defecto esto se manda en el body del request http
					alias: this.formData.alias,
					email: this.formData.email,
					password: this.formData.password
				})
				.then(response => {
					if (
						response.data.usuario.administrador ||
						response.data.usuario.tutor
					) {
						window.location.replace("/administrar-home");
					} else {
						// si es un estudiante se crea un socket con su usuario

						window.location.replace("/inicio");
					}
				})
				.catch(err => {
					if (err.response.status == 401) {
						this.aliasIncorrecto = true;
						this.correoIncorrecto = true;
					} else if (err.response.status == 409) {
						this.passwordIncorrecto = true;
					} else if (err.response.status == 423) {
						swal({
							icon: "info",
							title: "Acción requerida!!",
							text:
								"Confirma la creación de tu cuenta en el correo electrónico, o \n si eres Administrador debes solicitar el acceso al SuperAdmin del sitio.",
							showConfirmButton: true
						});
					}
				});
		},
		clickRecuperarContrasenia() {
			swal({
				position: "center",
				icon: "info",
				title: "Restauración de contraseña!!",
				text: "Introduce el correo electrónico con el que te registraste (*)",
				content: {
					element: "input",
					attributes: {
						placeholder: "Ej: nombre@dominio.com",
						type: "email"
					}
				},
				buttons: {
					confirm: {
						text: "Enviar",
						value: true
					},
					cancel: "Cancelar!" //retona null siempre
				}
			}).then(inputValue => {
				if (inputValue === "") {
					swal.showInputError("Debes ingresar un correo electrónico");
					return false;
				}
				// Si se ingresa un correo electrónico se envia la peticion de enviar, el controlador verifica que el correo se encuentre registraod, de lo contrario retorno un error 409,
				if (inputValue) {
					var formData = new FormData();
					formData.append("correoRecuperacion", inputValue);
					axios({
						method: "post",
						url: "/enviar-correo-recuperacion",
						data: formData
					})
						.then(() => {
							swal({
								icon: "success",
								title: "Correo enviado correctamente",
								showConfirmButton: true,
								timer: 2000
							}).then(() => {
								window.location.href =
									"/clave-recuperacion-cuenta/?correoRecuperacion=" +
									inputValue;
							});
						})
						.catch(err => {
							if (err.response.status == 409) {
								swal({
									icon: "error",
									title: `Error: El usuario con correo ${inputValue} no se encuentra registrado`,
									text: `${err}`,
									showConfirmButton: true
								});
							} else {
								swal({
									icon: "error",
									title: `Error en el servidor ${err.response.status} `,
									text: `${err}`,
									showConfirmButton: true
								});
							}
						});
				}
			});
		}
	}
});
