/*jshint esversion:8 */
module.exports = {
	friendlyName: "View administrar home",

	description: 'Display "Administrar home" page.',

	exits: {
		success: {
			viewTemplatePath: "pages/administrador/administrar-home"
		},
		redirect: {
			description: "Redirecciona a la página indicada",
			responseType: "redirect" // Los diferentes tipos de response buscar en la siguiente página https://sailsjs.com/documentation/reference/response-res
			//ejemplos: responseType:'ok'  responseType:'view'
		}
	},

	fn: async function(input, exits) {
		var res = this.res;
		var req = this.req;
		var usuario = null;
		var cursoInforBasica = null;

		if (!req.session.userId) {
			//no está logueado
			return res.forbidden();
		} else {
			usuario = await Profesor.findOne({ id: req.session.userId }); // deberá encontrar un Profesor
			if (!usuario) {
				return res.forbidden();
			} else if (!usuario.confirmado) {
				return res.forbidden();
			}
			if (usuario.administrador) {
				//busqueda del curso alfaweb para todos los administradores
				cursoInforBasica = await Curso.findOne({
					nombre: "Alfabetización informática"
				});
			}

			var cursos = await Curso.find({ profesor: usuario.id }); //devuelve un arreglo con los cursos encotrados que pertenecen al profesor

			// var estudiantes = await Estudiante.find({});
			// var estudiantesSessions = await Sessions.find({}); //pendiente ordenar por fecha de logueo
			// if (estudiantesSessions) {
			// 	estudiantes = estudiantesSessions.map(item => {
			// 		if (item.session.usuario) {
			// 			item.session.usuario.fechaLogin = item.session.fechaLogin;
			// 		}
			// 		if (item.session.usuarioEs == "Estudiante") {
			// 			return item.session.usuario;
			// 		}
			// 	});
			// }
			// este if debe ir fuera del  if que evalua si hay o no sesiones
			// if (!estudiantes) {
			// 	//si no existe un arreglo de estudiantes logueados entonces se retorna un arreglo vacio
			// 	estudiantes = [];
			// }

			var estudiantes = await Estudiante.find({})
				.populate("cursos")
				.sort("updatedAt DESC"); //buscar los estudiantes que pertenecen a un curso

			var administradores = [];
			//solo si el usuario es superAdmin tiene privilegios para ver a los dem'as administradores
			if (usuario.superAdmin) {
				//se busca a todos los administradores que no son superAdmin
				administradores = await Profesor.find({
					superAdmin: { "!=": true }
				}).sort("createdAt DESC");

				// aniade el curso de informatica basica al arreglo de cursos
				cursos.unshift(cursoInforBasica);
			}

			return exits.success({
				cursos,
				estudiantes,
				usuario,
				administradores
			});
		}
	}
};
