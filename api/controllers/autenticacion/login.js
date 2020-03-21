/*jshint esversion:8 */
module.exports = {
	friendlyName: "Login",

	description:
		"Evalúa las credenciales ingresadas por el usuario y de existir el usuario en la base de datos, se retorna su nombre y se redirige la página",

	extendedDescription:
		"En el cliente ya se valida que estos campos tengan valores, excepto para alias y correo que en este caso solo se acepta uno de los dos, no ambos a la vez",
	inputs: {
		alias: {
			type: "string",
			allowNull: true
		},
		email: {
			type: "string",
			allowNull: true
		},
		password: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			statusCode: 200,
			message: "logueado correctamente"
		},
		noAutorizado: {
			statusCode: 401, //401 Unauthorized:  Similar al error 403, pero se usa cuando se requiere una autentificación y ha fallado o todavía no se a facilitado.
			description: "No se ha encontrado el usuario requerido"
		},
		passwordIncorrecto: {
			statusCode: 409, //409 Conflict: Conflicto en el request, como cuando se actualizan al mismo tiempo dos recursos.
			description: "no se ha encontrado el password"
		},
		bloqueado: {
			statusCode: 423, //423 Bloqued(WEVDAV),
			description:
				"El usuario debe confirmar su cuenta mediante el correo electrónico"
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;
		var req = this.req;
		var objetoError = new Error();
		var usuarioEs = null;
		// sails.log(this.req.headers.authorization);

		// REVISAR USO DE btoa y atoa de javascript para codificar y decodificar el password
		var usuario;
		// si se envia el alias
		if (inputs.alias) {
			//buscar por alias, tanto en estudiante como en profesor
			usuario = await Estudiante.findOne({ alias: inputs.alias }).populate(
				"cursos"
			);
			usuarioEs = "Estudiante";
			if (!usuario) {
				usuario = await Profesor.findOne({ alias: inputs.alias });
				usuarioEs = "Profesor";
			}
		}
		// si se envia un correo
		else if (inputs.email) {
			//buscar por correo tanto en estudiante como en profesor
			usuario = await Estudiante.findOne({ email: inputs.email }).populate(
				"cursos"
			);
			usuarioEs = "Estudiante";
			if (!usuario) {
				usuario = await Profesor.findOne({ email: inputs.email });
				usuarioEs = "Profesor";
			}
		}

		// si no se encuentra el usuario se remite el mensaje noAutorizado con el código 401

		if (!usuario) {
			//si no se
			sails.log("no se encuentra el usuario");
			objetoError.code = 401;
			objetoError.message = "No se encuentra el usuario solicitado";
			return res.status(objetoError.code).send({ error: objetoError });
			// return exits.noAutorizado();
		}
		// Se valida si el usuario ya confirmo o no su cuenta mediante el correo electrónico,
		// este bloque de codigo debe ir antes de la validacion de la contraseña porque de lo contrario se asumiria que el usuario puede loguearse y eso no es correcto
		if (!usuario.confirmado) {
			return exits.bloqueado();
		}

		//si se encuentra el usuario se verifca que el password sea correcto
		var passwordCorrecto = await sails.helpers.compararPassword(
			usuario,
			inputs.password
		);

		if (!passwordCorrecto) {
			sails.log("existe el usuario pero el password es incorrecto");
			return exits.passwordIncorrecto();
		}

		//si se encuentra el usuario y el password coincide se remite el mensaje
		// sails.log('ESTAS LOGUEADO');
		let d = new Date();
		let fechaActual = d.getTime();

		req.session.userId = usuario.id;
		req.session.usuario = usuario;
		req.session.fechaLogin = fechaActual;
		req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
		req.session.usuarioEs = usuarioEs;
		if (usuarioEs == "Estudiante") {
			Sessions.subscribe(this.req, usuario.id);
			//si no retorna nada, entonces probar con

			var estudiantes = null;
			var estudiantesids = null;
			var estudiantesSessions = await Sessions.find({}); //pendiente ordenar por fecha de logueo
			if (estudiantesSessions) {
				estudiantes = estudiantesSessions
					.filter(item => {
						if (item.session.usuario) {
							item.session.usuario.fechaLogin = item.session.fechaLogin;
						}
						if (item.session.usuarioEs == "Estudiante") {
							return true;
						} else {
							return false;
						}
					})
					.map(item => {
						return item.session.usuario.id;
					});
			}

			// este if debe ir fuera del  if que evalua si hay o no sesiones
			if (!estudiantes || !estudiantes[0]) {
				//si no existe un arreglo de estudiantes logueados entonces se retorna un arreglo vacio
				estudiantes = [];
			} else {
				// estudiantesids = estudiantes.map(estudiante => {
				// 	return estudiante.id;
				// });
			}

			// if (!estudiantesids) {
			// 	//si no existe un arreglo de estudiantes logueados entonces se retorna un arreglo vacio
			// 	estudiantesids = [];
			// }

			Sessions.publish(estudiantes, {
				verb: "publicado",
				theSecret: "secret"
			});
		}

		// Nota: la propiedad(userId, usuario, cookie.maxAge) no se almacenará en el almacén de la sesión, ni estará disponible para otras solicitudes hasta que se envíe la respuesta; fuente: https://sailsjs.com/documentation/concepts/sessions
		// var usuariosLogueado = await Sessions.find().sort(
		// 	"session.fechaLogin DESC"
		// );
		// console.log(`USUARIOS: ${JSON.stringify(usuariosLogueado)}`);

		return res.status(200).send({ usuario: usuario });
	}
};
