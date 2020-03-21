/* eslint-disable no-unused-vars */
/*jshint esversion:8 */
module.exports = {
	friendlyName: "Actualizar usuario",
	description: "",
	inputs: {
		usuarioId: {
			type: "string",
			required: true
		},
		nombre: { type: "string", required: true },
		alias: {
			type: "string",
			required: true
		},
		email: {
			type: "string"
		},
		password: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			description: "exito"
		},
		// redirect: {
		//   description: 'Redirecciona a otra página despues de registrar al usuario',
		//   responseType: 'redirect' // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
		//   //ejemplos: responseType:'ok'  responseType:'view'
		// },
		aliasoEmailYaEnUso: {
			statusCode: 409,
			description: "alias  o email ya en uso."
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;
		var req = this.req;
		var passwordEncriptada = await sails.helpers.hashPassword(inputs.password);
		// All done.

		var usuario = null;

		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			// si existe un usuario
			// if (req.session.userId != 1) {// si el usuario no es visitante entonces se busca la información del usuario en la base de datos
			usuario = await Estudiante.findOne({ id: req.session.userId });

			if (!usuario) {
				usuario = await Profesor.findOne({ id: req.session.userId });
			}

			if (!usuario) {
				res.status(401).send({
					Error: "EL USUARIO NO SE ENCUENTRA EN LA BASE DE DATOS"
				});
				//respuesta pendiente de modificacion
			}
		}

		if (usuario.administrador || usuario.tutor) {
			//registra al usuario en la coleccion profesor
			await Profesor.update({ id: usuario.id })
				.set({
					nombre: inputs.nombre,
					alias: inputs.alias,
					email: inputs.email.toLowerCase(),
					password: passwordEncriptada
				})

				.intercept("E_UNIQUE", () => {
					//LAS TRES sentencias siguientes son iguales,
					// la primera toma mas tiempo que la segunda y la tercera
					// return res.status(409).send();
					//  return exits.aliasoEmailYaEnUso()
					return "aliasoEmailYaEnUso";
				})
				.intercept(err => {
					sails.log("ERROR GENERAL\n" + err + "\n FIN ERROR GENERAL");
				});

			sails.log("ADMIN actualizado CORRECTAMENTE");
		} else {
			//registra al usuario en la tabla estudiante
			await Estudiante.update({ id: usuario.id })
				.set({
					nombre: inputs.nombre,
					alias: inputs.alias,
					email: inputs.email.toLowerCase(),
					password: passwordEncriptada
				})

				.intercept("E_UNIQUE", () => {
					var errores = new Error();
					errores.message =
						"Ya existe el usuario con el alias o email provistos";
					return res.status(409).send({ error: errores });
				})
				.intercept(err => {
					sails.log("ERROR GENERAL\n" + err);
				});

			sails.log("ESTUDIANTE CREADO CORRECTAMENTE");
		}
		delete this.req.session.userId;
		// return exits.redirect('/view-login');
		return res.status(200).send(); // es necesario retornar algo para que axios sepa que realizar
	}
};
