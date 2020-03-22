module.exports = {
	friendlyName:
		"Habilitar admin para poder usar el usuario con sus permisos, solo un superadmin puede dar permisos al usuario administrador",

	description: "",

	inputs: {
		adminId: {
			type: "string",
			required: true
		},
		habilitar: {
			type: "boolean",
			required: true
		}
	},

	exits: {
		success: {
			statusCode: 200,
			message: "Admin Editado Correctamente"
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;

		try {
			await Profesor.update({ id: inputs.adminId }).set({
				confirmado: inputs.habilitar
			});
		} catch (e) {
			return res.status(500).send({ err: e });
		}

		// All done.
		return exits.success();
	}
};
