/*jshint esversion:8 */
module.exports = {
	friendlyName: "View layout contenidos",

	description:
		"Despliega el contenido del modulo seleccionado para los estudiantes",
	inputs: {
		objetoId: {
			type: "string",
			required: true
		},
		tipoContenido: {
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
		success: {
			viewTemplatePath: "pages/estudiante/interfaz-modulos"
		}
	},

	fn: async function(inputs, exits) {
		var res = this.res;
		var req = this.req;
		var objetoSeleccionado;
		var curso = Object;
		var usuario = { nombre: "Visitante", rol: "Estudiante", id: "1" };

		var navegarAtras = "";
		var navegarSiguiente = "";
		var moduloPadre = null;
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

		curso = await sails.helpers
			.solicitarCursoCompleto(inputs.objetoId)
			.intercept(err => {
				sails.log("ERROR EN HELPERS: " + err);
			});
		if (inputs.tipoContenido == "Modulo") {
			objetoSeleccionado = await ModuloLibro.findOne({ id: inputs.objetoId });
			//la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
			objetoSeleccionado.nombre = objetoSeleccionado.nombreModulo;
			moduloPadre = objetoSeleccionado;
			objetoSeleccionado.enlace =
				"/interfaz-modulos/?objetoId=" +
				objetoSeleccionado.id +
				"&tipoContenido=Modulo";
		} else if (inputs.tipoContenido == "Submodulo") {
			objetoSeleccionado = await SubmoduloLibro.findOne({
				id: inputs.objetoId
			});
			moduloPadre = await ModuloLibro.findOne({
				id: objetoSeleccionado.modulo
			});
			//la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
			objetoSeleccionado.nombre = objetoSeleccionado.nombreSubmodulo;
			objetoSeleccionado.color = moduloPadre.color;
			objetoSeleccionado.enlace =
				"/interfaz-modulos/?objetoId=" +
				objetoSeleccionado.id +
				"&tipoContenido=Submodulo";
		} else {
			return res
				.status(500)
				.send({ problema: "no se encontró el tipo de contenido" });
		}
		// se aniade el enlace a si mismo para poder usar en el breadcrubm
		curso.enlace = "/indice-estudiante/?cursoId=" + curso.id;
		if (!objetoSeleccionado) {
			//si no se ha encontrado un modulo o submodulo con el id entregado se devuelve un mensaje de error
			var err = new Error();
			err.name = "objetoNoEncontrado";
			err.message = "El objeto no se encuentra en la base de datos";
			return res.status(500).send({ error: err });
		}

		//PREPARACION LINKS DE NAVEGACION ADELANTE Y ATRAS
		var arreglo = [];
		if (curso.modulos.length != 0) {
			//agrego modulos y submodulos en un mismo arreglo
			curso.modulos.forEach(modulo => {
				arreglo.push({ objetoId: modulo.id, tipoContenido: "Modulo" });
				modulo.submodulos.forEach(submodulo => {
					numeroSubmodulosCurso += 1;
					arreglo.push({ objetoId: submodulo.id, tipoContenido: "Submodulo" });
				});
			});

			//selecciono los elementos anteriores y posteriores al objeto seleccionado
			for (let i = 0; i <= arreglo.length - 1; i++) {
				if (arreglo[i].objetoId == objetoSeleccionado.id) {
					if (arreglo.length == 1) {
						// si el objeto es el único de la lista
						navegarAtras = "/indice-estudiante/?cursoId=" + curso.id;
						navegarSiguiente = "/indice-estudiante/?cursoId=" + curso.id;
					} else if (i == 0 && arreglo.length > 1) {
						//si el objeto es el primero  de una lista de mas de uno
						// el anterior retorna al indice
						navegarAtras = "/indice-estudiante/?cursoId=" + curso.id;
						navegarSiguiente =
							"/interfaz-modulos/?objetoId=" +
							arreglo[i + 1].objetoId +
							"&tipoContenido=" +
							arreglo[i + 1].tipoContenido;
					} else if (i == arreglo.length - 1) {
						//el ultimo elemento del arreglo
						navegarAtras =
							"/interfaz-modulos/?objetoId=" +
							arreglo[i - 1].objetoId +
							"&tipoContenido=" +
							arreglo[i - 1].tipoContenido;
						navegarSiguiente = "/indice-estudiante/?cursoId=" + curso.id;
					} else {
						navegarAtras =
							"/interfaz-modulos/?objetoId=" +
							arreglo[i - 1].objetoId +
							"&tipoContenido=" +
							arreglo[i - 1].tipoContenido;
						navegarSiguiente =
							"/interfaz-modulos/?objetoId=" +
							arreglo[i + 1].objetoId +
							"&tipoContenido=" +
							arreglo[i + 1].tipoContenido;
					}
				}
			}
		}

		// usuario = await Estudiante.findOne({ alias: 'Pedroc' });
		if (req.session.userId) {
			usuario = await Estudiante.findOne({ id: req.session.userId });

			if (!usuario) {
				//no existe el usuario, retorna error
				// exits.ok({ error: `no se encuentra el usuario con id ${req.session.userId}` });
				res.status(401).send({ message: "su sesión ha expirado" });
			} else {
				// se guarda el avance

				let credenciales = { cursoId: curso.id, usuarioId: usuario.id };
				let avance = {
					tipoContenido: inputs.tipoContenido,
					objetoId: inputs.objetoId
				};
				// se guarda el avance
				await sails.helpers.registrarAvanceEstudiante(credenciales, avance); //la fecha de acceso es creada dentro
				//se retorna el ultimo intento de evaluacion
			}
		} else {
			//si el usuario es el usuario Visitante se remite su información
			usuario = {
				id: 1,
				nombre: "Visitante",
				rol: "Estudiante"
			};
		}

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

			//consultar las evaluaciones del estudiante en el curso actual y modulo seleccionado
			//ordenar las evaluaciones por cada subomodulo y obtener la mas reciente de cada lista

			//consultar el intento evaluacion de
		}

		var ultimasEvaluaciones = await SubmoduloLibro.find({
			modulo: moduloPadre.id
		}).populate("intentosEvaluacion", {
			where: {
				estudiante: usuario.id
			},
			// limit: 1,
			sort: "createdAt DESC"
		});

		usuario.ultimasEvaluaciones = ultimasEvaluaciones;

		return exits.success({
			curso,
			objetoSeleccionado,
			moduloPadre,
			usuario,
			navegarAtras,
			navegarSiguiente,
			mostrarEvaluacion
		});
		//el objeto moduloPadre solo contiene valores cuando el objeto seleccionado es SUBMODULO
	}
};
