parasails.registerPage("m-1-encender-computadora", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		breadcrumb: [{ nombre: "Cursos", id: 1, enlace: "/inicio" }],
		usuario: Object,
		navegarSiguiente: "",
		navegarAtras: "",
		tituloEvaluacion: "",
		evIndividual: false,
		objetoSeleccionado: "",

		mouseX: 0,
		mouseY: 0,
		mostrarToolTip: false,
		textoToolTip: {
			type: String,
			default: "software"
		},

		indice: null,
		indicaciones: [
			{
				descripcion:
					"Para encender el equipo siga los siguientes pasos. Paso 1: Encender el CPU, para ello diríjase al botón de encendido del equipo, por lo general es un círculo con una línea en el centro "
			},
			{
				descripcion:
					"Paso 2: Encender el monitor, para ello diríjase hacia la parte inferior derecha de la pantalla que es donde generalmente se encuentra el botón de encendido, presiónelo una sola vez y suéltelo, espere hasta que encienda "
			},
			{
				descripcion:
					"Paso 3: Seleccionar un usuario, la computadora requiere que cada persona se identifique como usuario, por ello debe seleccionar un usuario para poder acceder y esperar a que inicie el computador"
			},
			{
				descripcion:
					"Paso 4: Pantalla de inicio, una vez que la computadora se enciende, carga los programas y muestra accesos directos en el escritorio"
			},
			{
				descripcion:
					"Para apagar el computador, ir al botón de inicio y seleccionar la opción apagar. Recuerde que esta acción también cierra todos los programas abiertos"
			}
		],
		silenciar: true,

		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {} //puntos, niveles y medalla actuales

		// elemento:{
		//   nombre:'',
		//   detalle:'',
		//   leerMas:'',
		//   imgs:[

		//       {
		//         src:'',
		//         alt:''
		//         } ,

		//       ]
		// }
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.objetoSeleccionado.descripcion = this.indicaciones[0].descripcion;

		this.usuario = SAILS_LOCALS.usuario;
		this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
		this.navegarSiguiente =
			"/contenido-alfaweb/?enlace=" + SAILS_LOCALS.siguiente.enlace;
		this.navegarAtras =
			"/contenido-alfaweb/?enlace=" + SAILS_LOCALS.anterior.enlace;
		this.breadcrumb.push(SAILS_LOCALS.curso);
		this.breadcrumb.push(SAILS_LOCALS.modulo);
		this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
	},
	mounted: async function() {
		//…
		//Se debe hacer aqui la evaluacion para que los elementos del DOM ya se encuentren cargados
		if (SAILS_LOCALS.mostrarEvaluacion) {
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
			if (contenido == "contenido") {
				this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
				this.evIndividual = false;
				this.$refs.curso.evIndividual = false;
			} else {
				this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
				this.evIndividual = true;
				this.$refs.curso.evIndividual = true;
			}
		},

		// infoObjeto(idObjeto) {
		//   if (idObjeto == 'clic-izquierdo') {
		//     console.log('funciones');
		//     $(function () {
		//       $('#modalClicIzquierdo').modal('show');
		//     });

		//   } else if (idObjeto == 'clic-derecho') {
		//     $(function () {
		//       $('#modalClicDerecho').modal('show');
		//     });

		//   } else if (idObjeto == 'scroll') {

		//     $(function () {
		//       $('#modalScroll').modal('show');
		//     })
		//   }

		// },
		mouseMovePc(event) {
			// clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"

			this.mouseX = event.clientX;
			this.mouseY = event.clientY;

			// El text del tooltip se basa en valor de la propiedad ""id"" de cada elemento ""
			let elementoSeleccionado = event.target.parentNode.id;
			this.textoToolTip = elementoSeleccionado.toString().toUpperCase();

			//una vez que los valores para x y y del texto del tooltip han sido establecidos, se muestra en la pantalla
			this.mostrarToolTip = true;
		},
		mouseOutPc() {
			this.mostrarToolTip = false;
		},
		obtenerIndice() {
			var _this = this;
			this.$refs.curso.clickStop();
			//slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
			//slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
			$("#carouseEncendido").on("slid.bs.carousel", function() {
				this.indice = $(".indicador.active").text(); //obtiene el indice del indicador actual
				let posicion = parseInt(this.indice) - 1;

				_this.objetoSeleccionado.descripcion =
					_this.indicaciones[posicion].descripcion;
			});
		}
	},
	computed: {
		styleToolTip() {
			// translate define cuanto se moverá el objeto a partir de su posicion original
			// funciona solo con comillas dobles
			//{ transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
			let estilo = {
				top: this.mouseY + "px",
				left: this.mouseX + "px"
			};
			return estilo;
		}
	}
});
