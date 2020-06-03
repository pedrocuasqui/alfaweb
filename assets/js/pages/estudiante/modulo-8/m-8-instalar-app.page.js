parasails.registerPage("m-8-instalar-app", {
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
					"Para instalar una aplicación en android se deben seguir los siguientes pasos. Paso 1: Abrir Google play, la aplicación con el icono en forma de triángulo que apunta hacia la dercha. "
			},

			{
				descripcion:
					"Paso 2: En el recuadro de búsqueda escribir la aplicación que se desea buscar, en este caso se instalará Whatsapp. Escoger la opción requerida de entre las opciones."
			},
			{
				descripcion:
					"Paso 3: Dar clic en el botón INSTALAR debajo del icono, se mostrará un icono de espera mientras se abre la siguiente pantalla."
			},
			{
				descripcion:
					"Paso 4: Si no se está logueado, el sistema le pedirá que ingrese su nombre de usuario y contraseña. pulsar en SIGUIENTE. "
			},
			{ descripcion: "Paso 5: Dar clic en el botón INSTALAR." },
			{
				descripcion:
					'Paso 6: Esperar a que se descargue la aplicación, en la pantalla se muestra una "barra de progreso" en forma de linea de color verde  que indica cuanto se ha descargado. Debe llegar al 100% para poder abrir la aplicación. '
			},
			{
				descripcion:
					'Paso 7: Una vez instalada la aplicación, se muestra la opción "Abrir",Quiere decir que la aplicación ya está instalada. En la mayoría de aplicaciones este sería el último paso.'
			},
			{
				descripcion:
					"Paso 8: En el caso de Whatsapp es necesario configurar la aplicación para poder usarla. En la pantalla que se muestra debe dar clic en ACEPTAR TÉRMINOS Y CONDICIONES."
			},
			{
				descripcion:
					"Paso 9:  Ingresar el número de teléfono celular que usará la aplicación."
			},
			{ descripcion: "Paso 10: Confirmar el número ingresado. y pulsar OK" },
			{
				descripcion:
					'Paso 11: Whatsapp valida que el celular exista por tanto envía un mensaje de texto con un código al celular registrado. El usuario debe abrir el mensaje enviado y copiar el código recibido en la pantalla dispuesta. En caso de no llegar el mensaje, pulsar en la opción "Reenviar SMS". '
			},
			{
				descripcion:
					"Paso 12: El sistema puede pedirle autorización para configurar la aplicación, si es el caso, ingresar el correo y nombre de usuario solicitados. "
			},
			{ descripcion: "Paso 13: Ingresar la contraseña. " },
			{
				descripcion:
					"Paso 14: Si todo ha ido bien, se muestra una pantalla de bienvenida al usuario."
			},
			{ descripcion: "Paso 15: Dar clic en aceptar en la siguiente pantalla." },
			{
				descripcion:
					"Paso 16: Se solicita un nombre de usuario para la aplicación Whatsapp. Este nombre de usuario identificará a la persona ante los demás usuarios de la red social. "
			},
			{
				descripcion:
					"Paso 17: Finalmente ya se puede ver una lista de las personas que tienen cuenta en Whatsapp y que están registradas como contactos en el dispositivo móvil. "
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
		// this.navegarSiguiente = '/contenido-alfaweb/?enlace=' + SAILS_LOCALS.siguiente.enlace;
		this.navegarSiguiente = "/"; //este el es ultimo tema, por tanto debe mostrar la pantalla del indice
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

		obtenerIndice() {
			var _this = this;
			this.$refs.curso.clickStop();
			//slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
			//slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
			$("#carouselApp").on("slid.bs.carousel", function() {
				this.indice = $(".indicador.active").text(); //obtiene el indice del indicador actual
				let posicion = parseInt(this.indice) - 1;

				_this.objetoSeleccionado.descripcion =
					_this.indicaciones[posicion].descripcion;
			});
		}
	},
	computed: {}
});
