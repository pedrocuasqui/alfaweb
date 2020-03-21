/*jshint esversion:8 */
module.exports = {
	friendlyName: "View contenido alfaweb",

	description:
		"Presenta el contenido del curso Alfabetizaweb en funcion del parametro ingresado",
	inputs: {
		enlace: {
			type: "string",
			required: true
		},
		mostrarEvaluacion: {
			type: "boolean",
			required: false,
			defaultsTo: false
		}
	},

	exits: {
		redirect: {
			description: "Redirecciona a la url enviada como parametro",
			responseType: "redirect"
		}
	},

	fn: async function(inputs) {
		var req = this.req;
		var res = this.res;
		var usuario = null;
		var mostrarEvaluacion = inputs.mostrarEvaluacion;
		var intentoEvaluacion = {
			//intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
			puntos: 0,
			nivel: 0, //modulo 1
			medalla: "novato", //medalla mas basica
			tiempoMaximoPorPregunta: 30, //en segundos por defecto
			evaluacion: null
		};
		var numeroSubmodulosCurso = 0; //sirve para enviar en el usuario y comprobar el porcentaje de evaluaciones realizadas de todo el curso

		var curso = await Curso.findOne({
			nombre: "Alfabetización informática"
		}).populate("modulos");
		let modulos = await ModuloLibro.find({
			curso: curso.id
		}).populate("submodulos", { sort: "createdAt ASC" });
		curso.modulos = modulos;
		// se aniade el enlace a si mismo para poder usar el breadcrumb
		curso.enlace = "/indice-estudiante/?cursoId=" + curso.id;
		//Conteo del número de submodulos por cada modulo del curso
		curso.modulos.forEach(modulo => {
			modulo.submodulos.forEach(() => {
				numeroSubmodulosCurso += 1;
			});
		});

		if (req.session.userId) {
			usuario = await Estudiante.findOne({ id: req.session.userId });
			sails.log(usuario);
			if (!usuario) {
				usuario = await Profesor.findOne({ id: req.session.userId });
			}

			if (!usuario) {
				// exits.ok({ error: `no se encuentra el usuario con id ${req.session.userId}` });
				res.status(401).send({ message: "su sesión ha expirado" });
				//si el usuario no tiene pareja en la collection CursoEstudiante, registrar al curso en el usuario
			} else {
				usuario.rol = "Estudiante"; // cualquier valor, se buscará este campo en el cliente
				let credenciales = { cursoId: curso.id, usuarioId: usuario.id };
				let avance = { enlace: inputs.enlace };
				await sails.helpers.registrarAvanceEstudiante(credenciales, avance); //la fecha de acceso es creada dentro
			}
		} else {
			//si el usuario es el usuario Visitante se remite su información
			usuario = {
				id: 1,
				nombre: "Visitante",
				rol: "Estudiante"
			};
			// var cursos = await Curso.find();
			// usuario.cursos = cursos;
		}
		// var curso = await Curso.findOne({ nombre: 'Alfabetización informática' }).populate('modulos');

		// retorno de ultimo intentoEvaluacion para mostrar la puntuacion actual
		//siempre se aniade un intento evaluacion al usuario
		usuario.ultimoIntento = intentoEvaluacion;
		usuario.numeroSubmodulosCurso = numeroSubmodulosCurso;
		usuario.submodulosAprobadosPorCurso = [];
		if (usuario.nombre != "Visitante") {
			//si existe un usuario logueado tipo estudiante
			//se buscan los documentos que contengan al id de usuario logueado y el curso que está siguiente en actualmente, SE BUSCA EL ULTIMO INTENTO PORQUE ESTE CONTIENE LA PUNTUACION ULTIMA
			let intentoEv = null;
			intentoEv = await IntentoEvaluacion.find({
				estudiante: usuario.id,
				curso: curso.id
			}).sort("createdAt DESC");

			if (intentoEv.length > 0) {
				//existe el arreglo de  intentos evaluacion entonces se reemplaza el valor de usuario.ultimoIntento por el intento mas actual
				usuario.ultimoIntento = intentoEv[0]; //escogemos el elemento mas reciente porque es el que contiene la ultima puntuación del usuario
			} //caso contrario se mantiene el valor por defecto, null

			//se crea una nueva conexion al servidor para obtener los intentosEvaluacion, 1 por cada submodulo de todo el curso
			var datastoreSails = sails.getDatastore().manager;
			//buscar en intentoEvaluacion las evaluaciones en cada modulo que pertenecen al curso solicitado y que han sido aprobadas
			let ObjectId = require("mongodb").ObjectID;
			let estudianteObjectId = ObjectId(usuario.id);
			await datastoreSails
				.collection("IntentoEvaluacion")
				.distinct("submodulo", {
					curso: curso.id,
					estudiante: estudianteObjectId,
					apruebaEvaluacion: 1
				})
				.then(respuesta => {
					//estudiante: usuario.id,
					//respuesta contiene un arreglo con el codigo de submodulo por cada intento aprobado
					respuesta.forEach(elemento => {
						usuario.submodulosAprobadosPorCurso.push(elemento.toString());
					});
				});
		}

		let nombreEnlace =
			inputs.enlace.substring(0, 1) + "-" + inputs.enlace.substring(1);
		var stringVista =
			"pages/estudiante/modulo-" +
			inputs.enlace.substring(1, 2) +
			"/" +
			nombreEnlace;
		var siguiente = null;
		var anterior = null;
		var modulo = null;

		// EMPIEZA LA BUSQUEDA
		let objetoSeleccionado = await ModuloLibro.findOne({
			enlace: inputs.enlace
		});

		if (objetoSeleccionado) {
			//si el enlace corresponde a un modulo entonces retorna un objeto seleccionado
			objetoSeleccionado.submodulos = await SubmoduloLibro.find({
				modulo: objetoSeleccionado.id
			}).sort("createdAt ASC");

			siguiente = objetoSeleccionado.submodulos[0];
			if (objetoSeleccionado.nombreModulo == "Módulo 1- La computadora") {
				// Es el primer modulo
				anterior =
					"/indice-estudiante/?usuarioId=" +
					usuario.id +
					"&cursoId=" +
					curso.id; //no importa si no se envia, ya esta quemado este valor en la vista m1-computadora
			} else {
				let indiceAnteriorModulo =
					"m" +
					(parseInt(objetoSeleccionado.enlace.substring(1, 2)) - 1).toString();
				let moduloAnteriorConSubmodulos = await ModuloLibro.findOne({
					enlace: { startsWith: indiceAnteriorModulo }
				}).populate("submodulos", { sort: "ordenNavegacion DESC" });

				anterior = await SubmoduloLibro.findOne({
					id: moduloAnteriorConSubmodulos.submodulos[0].id
				});
			}
			modulo = objetoSeleccionado;
			// return this.res.view(stringVista, {
			// 	usuario,
			// 	mostrarEvaluacion,
			// 	curso,
			// 	objetoSeleccionado,
			// 	siguiente,
			// 	anterior,
			// 	modulo: modulo
			// });
		} else {
			//entonces es submodulo
			// buscar el submodulo por enlace
			objetoSeleccionado = await SubmoduloLibro.findOne({
				enlace: inputs.enlace
			});
			//se buscan todos los submodulos con el mismo padre
			var submodulosHermanos = await SubmoduloLibro.find({
				modulo: objetoSeleccionado.modulo
			});

			if (objetoSeleccionado.ordenNavegacion == 1) {
				//si es el primer submodulo de la lista
				// anterior
				anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo }); //el objeto anterior es el modulo padre
				// siguiente
				siguiente = await SubmoduloLibro.findOne(
					//el objeto siguiente es el siguiente en el ordenNavegacion de submodulos
					{
						where: {
							ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
							modulo: objetoSeleccionado.modulo
						}
					}
				);

				modulo = anterior;
			} else if (
				objetoSeleccionado.ordenNavegacion == submodulosHermanos.length
			) {
				//es el último de los modulos
				//buscamos el modulo al que pertenece para obener
				modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
				anterior = await SubmoduloLibro.findOne({
					where: {
						ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
						modulo: objetoSeleccionado.modulo
					}
				});
				let comienzoSiguiente =
					"m" +
					(parseInt(objetoSeleccionado.enlace.substring(1, 2)) + 1).toString();

				siguiente = await ModuloLibro.findOne({
					enlace: { startsWith: comienzoSiguiente }
				});
			} else {
				//esta entre los submodulos
				modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
				siguiente = await SubmoduloLibro.findOne({
					where: {
						ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
						modulo: objetoSeleccionado.modulo
					}
				});
				anterior = await SubmoduloLibro.findOne({
					where: {
						ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
						modulo: objetoSeleccionado.modulo
					}
				});
			}
		}

		// busqueda de evaluaciones del usuario
		var ultimasEvaluaciones = await SubmoduloLibro.find({
			modulo: modulo.id
		}).populate("intentosEvaluacion", {
			where: {
				estudiante: usuario.id
			},
			// limit: 1,
			sort: "createdAt DESC"
		});
		usuario.ultimasEvaluaciones = ultimasEvaluaciones;
		return this.res.view(stringVista, {
			usuario,
			mostrarEvaluacion,
			curso,
			objetoSeleccionado,
			siguiente,
			anterior,
			modulo: modulo
		});
	}
};
