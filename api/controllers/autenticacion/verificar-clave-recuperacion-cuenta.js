/* eslint-disable no-unused-vars */
/*jshint esversion:8 */
module.exports = {
	friendlyName: "Verificar clave recuperacion cuenta",

	description: "",

	inputs: {
		codigoTemporal: {
			type: "string",
			required: true
		},
		usuarioRecuperacionId: {
			type: "string",
			required: true
		}
	},

	exits: {},

	fn: async function(inputs, exits) {
		var res = this.res;
		var usuarioRecuperacion = null;

		try {
			usuarioRecuperacion = await Estudiante.findOne({
				id: inputs.usuarioRecuperacionId
			});
			usuarioEs = "Estudiante";
			if (!usuarioRecuperacion) {
				usuarioRecuperacion = await Profesor.findOne({
					id: inputs.usuarioRecuperacionId
				});
				usuarioEs = "Profesor";
			}
			if (!usuarioRecuperacion) {
				return res.status(409).send();
			} else {
				if (!usuarioRecuperacion.codigoRecuperacion) {
					//se verifica que el usuario haya tenga un codigo de recuperacion diferente de nulo
					return res.status(403).send(); //Acceso denegado, el usuaio no ha solicitado ningun cambio de contrase~na
				} else if (
					usuarioRecuperacion.codigoRecuperacion != inputs.codigoTemporal
				) {
					//se verifica que el codigo ingresado sea el mismo
					return res.status(401).send(); //Acceso denegado, pin incorrecto
				}
				// else implicito, se envia el return con los datos
			}
		} catch (e) {
			return res.status(500).send({ error: e });
		}

		return res.status(200).send({});
	}
};
