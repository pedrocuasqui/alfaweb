/*jshint esversion:8 */
module.exports = {
	friendlyName: "Actualizar password usuario",

	description: "",

	inputs: {
		password: {
			type: "string",
			required: true
		},
		usuarioRecuperacionId: {
			type: "string",
			required: true
		}
	},

	exits: {},

	// eslint-disable-next-line no-unused-vars
	fn: async function(inputs, exits) {
		var res = this.res;
		var usuarioEs = null;
		var passwordEncriptada = await sails.helpers.hashPassword(inputs.password);
		var usuarioRecuperacion = null;
		// All done.
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
		}

		// else implicito
		if (usuarioEs == "Profesor") {
			try {
				await Profesor.update({ id: inputs.usuarioRecuperacionId }).set({
					codigoRecuperacion: "",
					password: passwordEncriptada
				});
			} catch (e) {
				return res.status(500).send({ error: e });
			}
		} else {
			// es estudiante
			try {
				await Estudiante.update({ id: inputs.usuarioRecuperacionId }).set({
					codigoRecuperacion: "",
					password: passwordEncriptada
				});
			} catch (e) {
				return res.status(500).send({ error: e });
			}
		}

		return res.status(200).send();
	}
};
