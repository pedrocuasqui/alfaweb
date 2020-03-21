/*jshint esversion:8 */
module.exports = {
	friendlyName: "Crear intento evaluacion",

	description: "",

	inputs: {},

	exits: {
		success: {
			description: "retorna exito"
		}
	},

	fn: async function(inputs, exits) {
		if (this.req.isSocket === true) {
			//

			var estudiantes = null;
			var estudiantesSessions = await Sessions.find({}); //pendiente ordenar por fecha de logueo
			if (estudiantesSessions) {
				estudiantes = estudiantesSessions.map(item => {
					if (item.session.usuario) {
						item.session.usuario.fechaLogin = item.session.fechaLogin;
					}
					if (item.session.usuarioEs == "Estudiante") {
						return item.session.usuario;
					}
				});
			}
			// este if debe ir fuera del  if que evalua si hay o no sesiones
			if (!estudiantes) {
				//si no existe un arreglo de estudiantes logueados entonces se retorna un arreglo vacio
				estudiantes = [];
			}

			//
			sails.sockets.join(this.req, "estudiantesLogueados");
			// El nombre único del evento utilizado por el cliente para identificar este mensaje. Por defecto es 'message'.
			sails.sockets.broadcast("estudiantesLogueados", {
				//Fuente: https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/broadcast  ,,, LEER LAS NOTAS AL FI
				datosDifundidosChat: estudiantes
			});
		}

		return exits.success({});
	}
};
