/*jshint esversion:8 */
module.exports = {
	friendlyName: "Logout",

	description: "Log out of this app.",

	extendedDescription: `This action deletes the \`req.session.userId\` key from the session of the requesting user agent.
  Actual garbage collection of session data depends on this app's session store, and
  potentially also on the [TTL configuration](https://sailsjs.com/docs/reference/configuration/sails-config-session)
  you provided for it.
  
  Note that this action does not check to see whether or not the requesting user was
  actually logged in.  (If they weren't, then this action is just a no-op.)`,

	exits: {
		redirect: {
			description: "Retorna  a la página principal.",
			extendedDescription:
				"After logging out from a web browser, the user is redirected away.",
			responseType: "redirect"
		}
	},

	fn: async function(inputs, exits) {
		// SEGUNDO: Eliminar la sesion del usuario
		// delete this.req.session;
		this.req.session.destroy(err => {
			if (err) {
				return res.forbidden();
			}
		});

		// TERCERO: consulta los usuarios logueados
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

		// CUARTO: Difunde la lista de usuarios logueados a los miembros de la sala
		// El nombre único del evento utilizado por el cliente para identificar este mensaje. Por defecto es 'message'.
		/* 	sails.sockets.broadcast("estudiantesLogueados", {
			//Fuente: https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/broadcast  ,,, LEER LAS NOTAS AL FI
			datosDifundidosChat: estudiantes
		}); */

		return exits.redirect("/");
	}
};
