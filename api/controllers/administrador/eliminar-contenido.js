/*jshint esversion:8 */
module.exports = {
	friendlyName: "Eliminar contenido",

	description:
		"Elimina el contenido seleccionado segun el id especificado, Modulo o submodulo",

	inputs: {
		// Aqui se coloca lo que se acepta desde el frontend cuando se hace una REQUEST
		id: {
			type: "string",
			required: true,
		},
	},

	exits: {
		//si se usa get para llamar a esta accion, siempre se debe devolver algo,en este caso un objeto exits
		redirect: {
			description: "Redirecciona a la página establecida",
			responseType: "redirect", // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		},
	},

	fn: async function (inputs) {
		var submoduloEliminado;
		var moduloEliminado;
		var objetoError;
		var objetoEliminado;
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
		try {
			//intentar eliminar el modulo
			moduloEliminado = await ModuloLibro.destroyOne({ id: inputs.id }).meta({
				cascade: true,
			}); // el metodo destoyOne siempre retorna un solo elemento o undefined si no se eliminó nada, eso indica que el objeto a eliminar no es módulo
			objetoEliminado = moduloEliminado;
			console.log("Curso Eliminado");
			console.log(objetoEliminado);
		} catch (e) {
			console.log("ERROOOOOOOOR AL ELIMINAR EL MODULO");
			console.log(e);
			return res.status(500).send({ error: e });
		}
		try {
			// Si no se eliminó como módulo, intenta eliminarse como submódulo
			if (!moduloEliminado) {
				//si no se existe un modulo eliminado entonces el objeto no era modulo
				////intentar eliminar el submodulo
				submoduloEliminado = await SubmoduloLibro.destroyOne({ id: inputs.id }); // el metodo destoyOne siempre retorna un solo elemento o undefined si no se eliminó nada
				objetoEliminado = submoduloEliminado;
				console.log("Submodulo eliminado");
				console.log(submoduloEliminado);
			}
		} catch (e) {
			return res.status(500).send({ error: e });
		}

		if (!moduloEliminado && !submoduloEliminado) {
			//no se ha eliminado ningun documento
			objetoError = new Error();
			objetoError.name = "No existe el registro";
			objetoError.message =
				"No se ha podido eliminar ningún registro porque no se encuentra en la base de datos";
			return res.status(500).send({ error: objetoError });
		}

		return res.status(200).send(objetoEliminado);
		// return 'documento eliminado correctamente';
	},
};
