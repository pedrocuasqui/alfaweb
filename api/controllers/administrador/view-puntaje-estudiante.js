/*jshint esversion:8 */
module.exports = {
	friendlyName: "View puntaje estudiante",

	description:
		'Muestra la interfaz "Puntaje estudiante" del estudiante seleccionado.',
	inputs: {
		estudianteId: {
			type: "string",
			required: true
		}
	},

	exits: {
		success: {
			viewTemplatePath: "pages/administrador/puntaje-estudiante"
		},
		redirect: {
			description: "Redirecciona a la página indicada",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
	},

	fn: async function(inputs) {
		var req = this.req;
		var res = this.res;
		var estudiante = null;
		var usuario = null;

		if (!req.session.userId) {
			//no está logueado
			return res.forbidden();
		} else {
			usuario = await Profesor.findOne({ id: req.session.userId }); // deberá encontrar un Profesor

			if (!usuario) {
				return res.forbidden();
			} else if (!usuario.confirmado) {
				// si existe un usuario pero no esta confirmado se retorna forbidden
				return res.forbidden();
			}
		}

		//buscar toda la información del alumno

		// 1) Estudiante y los cursos en los que está inscrito, de aqui se usan los cursos para mostrar un combo con las opciones disponibles
		estudiante = await Estudiante.findOne({ id: inputs.estudianteId }).populate(
			"cursos"
		); //el estudiante y llenar la informacion de los cursos a los que está suscrito

		// 2) Los intentosEvaluación que ha tenido
		// intentosEvaluacion = await IntentoEvaluacion.find({ estudiante: inputs.estudianteId }).populate('submodulo');
		// 3) Los estudiantes y sus intentosDeEvaluacion
		// estudiantesConSusIntentos = await Estudiante.find().populate('intentosEvaluacion');

		return { usuario, estudiante };
	}
};
