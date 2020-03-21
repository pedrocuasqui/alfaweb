/*jshint esversion:8 */
module.exports = {
	friendlyName: "View homepage",

	description: 'Display "" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/homepage"
		}
	},

	fn: async function() {
		// Respond with view.
		var req = this.req;
		var usuario = null;

		//si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

		if (req.session.userId) {
			// si existe un usuario
			// if (req.session.userId != 1) {// si el usuario no es visitante entonces se busca la información del usuario en la base de datos
			usuario = await Estudiante.findOne({ id: req.session.userId });

			if (!usuario) {
				usuario = await Profesor.findOne({ id: req.session.userId });
			}
		}
		return { usuario: usuario };
	}
};
