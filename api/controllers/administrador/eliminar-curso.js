/*jshint esversion:8 */
module.exports = {
	friendlyName: "Eliminar curso",

	description: "Elimina el curso enviado como parámetro",

	inputs: {
		cursoId: {
			type: "string",
			required: true,
		},
	},

	exits: {
		redirect: {
			description: "Redirecciona a la página de home",
			responseType: "redirect", // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		},
	},

	fn: async function (inputs) {
		var req = this.req;
		var res = this.res;
		var usuario = null;
		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			usuario = await Profesor.findOne({ id: req.session.userId });
			if (!usuario) {
				return res.forbidden();
			} else if (!usuario.confirmado) {
				// si existe un usuario pero no esta confirmado se retorna forbidden
				return res.forbidden();
			}
		} else {
			return res.forbidden();
		}

		//si se pasa exits como parámetro debe ser usada

		try {
			await ModuloLibro.destroy({ curso: inputs.cursoId });
			await Curso.destroyOne({ id: inputs.cursoId });
			// sails.log('documento eliminado');
		} catch (e) {
			sails.log("Error al intentar eliminar el registro:\n" + e);
		}
		// All done.
		// return exits.redirect('/administrar-home');

		return "documento eliminado correctamente";
	},
};
