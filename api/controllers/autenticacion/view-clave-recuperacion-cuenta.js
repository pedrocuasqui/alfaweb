/*jshint esversion:8 */
module.exports = {
	friendlyName: "View clave recuperacion cuenta",

	description: 'Display "Clave recuperacion cuenta" page.',
	inputs: {
		correoRecuperacion: {
			type: "string",
			required: true
		}
	},
	exits: {
		success: {
			viewTemplatePath: "pages/autenticacion/clave-recuperacion-cuenta"
		}
	},

	fn: async function(inputs) {
		var res = this.res;
		var usuarioEs = null;
		try {
			usuarioRecuperacion = await Estudiante.findOne({
				email: inputs.correoRecuperacion
			});
			usuarioEs = "Estudiante";
			if (!usuarioRecuperacion) {
				usuarioRecuperacion = await Profesor.findOne({
					email: inputs.correoRecuperacion
				});
				usuarioEs = "Profesor";
			}

			if (!usuarioRecuperacion) {
				return res.status(409).send();
			} else {
				if (!usuarioRecuperacion.codigoRecuperacion) {
					//se verifica que el usuario haya tenga un codigo de recuperacion diferente de nulo
					return res.status(403).send(); //Acceso denegado, el usuaio no ha solicitado ningun cambio de contrase~na
				}
				// else implicito
			}
		} catch (e) {
			return res.status(500).send({ error: e });
		}
		usuarioRecuperacion.tipo = usuarioEs;

		return { usuarioRecuperacion };
	}
};
