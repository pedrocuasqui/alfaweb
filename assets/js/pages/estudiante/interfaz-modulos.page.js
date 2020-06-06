/*jshint esversion:8 */
parasails.registerPage("interfaz-modulos", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		breadcrumb: [],
		navegarSiguiente: "",
		navegarAtras: "",
		tituloEvaluacion: "",
		evIndividual: false,

		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {}, //puntos, niveles y medalla actuales,
		mostrarEvaluacion: false,
		enlaceCursos: {
			nombre: "Cursos",
			texto: "Cursos",
			id: 1,
			enlace: "/inicio"
		}
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		if (SAILS_LOCALS.objetoSeleccionado) {
			if (SAILS_LOCALS.objetoSeleccionado.nombreSubmodulo) {
				this.breadcrumb.push(this.enlaceCursos);
				this.breadcrumb.push(SAILS_LOCALS.curso);
				this.breadcrumb.push(SAILS_LOCALS.moduloPadre);
				this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
			} else {
				//entonces el objeto es un MODULO
				this.breadcrumb.push(this.enlaceCursos);
				this.breadcrumb.push(SAILS_LOCALS.curso);
				this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
			}
		}

		this.navegarSiguiente = SAILS_LOCALS.navegarSiguiente;
		this.navegarAtras = SAILS_LOCALS.navegarAtras;

		this.progreso.puntos = SAILS_LOCALS.usuario.ultimoIntento.puntos;
		this.progreso.nivel = SAILS_LOCALS.usuario.ultimoIntento.nivel;
		this.progreso.medalla = SAILS_LOCALS.usuario.ultimoIntento.medalla;
		this.progreso.porcentajeAvance =
			(SAILS_LOCALS.usuario.submodulosAprobadosPorCurso.length /
				SAILS_LOCALS.usuario.numeroSubmodulosCurso) *
			100;
		this.progreso.totalNiveles = SAILS_LOCALS.usuario.numeroSubmodulosCurso;
		this.mostrarEvaluacion = SAILS_LOCALS.mostrarEvaluacion;
	},
	mounted: async function() {
		//… definir el breadcrumb en este lugar o recibir desde la accion del servidor
		if (this.mostrarEvaluacion) {
			this.evaluacionIndividual("evaluacion");
		}
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		/**
		 * LLamado desde modulo-contenedor-curso cuando se pulse el icono de repetir la evaluacion
		 */
		cancelarEvaluacion() {
			this.mostrarIconoRepetir = false;
			this.$refs.componenteEvaluacion.cancelarEvaluacion();
		},
		intentarNuevamente() {
			this.$refs.componenteEvaluacion.intentarNuevamente();
		},
		clickMostrarPista() {
			if (this.evIndividual) {
				this.$refs.componenteEvaluacion.mostrarPista();
			}
		},
		finalizaEvaluacion(valor) {
			this.mostrarIconoRepetir = valor; //true o false
		},

		actualizaProgreso(progresoActual) {
			this.progreso = progresoActual;
		},

		evaluacionIndividual(contenido) {
			//funcion recibida del componente modulo-contenedor-curso
			// if (this.objetoSeleccionado.nombreSubmodulo && this.objetoSeleccionado.evaluacion) {
			if (contenido == "contenido") {
				this.tituloEvaluacion = this.objetoSeleccionado.nombre;
				this.evIndividual = false;
				this.$refs.curso.evIndividual = false;
			} else {
				this.tituloEvaluacion = this.objetoSeleccionado.nombre;
				this.evIndividual = true;
				this.$refs.curso.evIndividual = true;
			}
			// }
		}
	}
});
