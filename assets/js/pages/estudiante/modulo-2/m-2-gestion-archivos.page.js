parasails.registerPage("m-2-gestion-archivos", {
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

		//atributos propios
		silenciar: true,

		indicacionesCrear: [
			{
				descripcion:
					"Para Crear un archivo siga los siguientes pasos. Paso 1: Ubicarse en el lugar en el que se va a crear el archivo"
			},
			{
				descripcion: "Paso 2: Con el mouse dar clic derecho en un espacio vacío"
			},
			{
				descripcion:
					"Paso 3: En la lista de opciones seleccionar la opción nuevo"
			},
			{
				descripcion:
					"Paso 4: En la siguiente lista de opciones seleccionar el archivo que se desea crear, en este caso se selecciona carpeta"
			},
			{
				descripcion:
					"Paso 5: Se crea el icono del archivo creado, darle un nombre al archivo. Eso es todo"
			}
		],

		indicacionesRenombrar: [
			{
				descripcion:
					"Para renombrar un archivo siga los siguientes pasos. Paso 1:Seleccionar el archivo que desea renombrar"
			},
			{ descripcion: "Paso 2: Dar clic derecho sobre el objeto seleccionado" },
			{
				descripcion:
					"Paso 3: En la lista de opciones seleccionar la opción renombrar"
			},
			{
				descripcion:
					"Paso 4: El archivo ahora permite escribir un nombre debajo del icono, escribir el nombre deseado y dar ENTER, eso es todo"
			}
		],

		indicacionesCopiar: [
			{
				descripcion:
					"Para copiar un archivo siga los siguientes pasos: Paso 1: Seleccionar el archivo que se quiere copiar"
			},
			{ descripcion: "Paso 2: Dar clic derecho sobre el objeto seleccionado" },
			{
				descripcion:
					"Paso 3: En la lista de opciones seleccionar la opción copiar"
			},
			{
				descripcion:
					'Paso 4: Dirigirse al lugar donde se va a copiar el archivo. En este caso se copiará en la carpeta "Archivo1"'
			},
			{ descripcion: "Paso 5: Dar clic derecho en el espacio vacío" },
			{
				descripcion:
					"Paso 6: En la lista de opciones seleccionar la opción pegar"
			},
			{ descripcion: "Paso 7: El archivo ya se encuentra en la carpeta." }
		],

		indicacionesEliminar: [
			{
				descripcion:
					"Para eliminar un archivo siga los siguientes pasos: Paso 1: Seleccionar el archivo que se quiere eliminar"
			},
			{ descripcion: "Paso 2: Dar clic derecho sobre el objeto seleccionado" },
			{
				descripcion:
					"Paso 3: En la lista de opciones seleccionar la opción eliminar"
			},
			{
				descripcion:
					"Paso 4:	Aparecerá un mensaje preguntando si se desea enviar el archivo a la papelera de reciclaje. Seleccionar la opción “Sí”."
			},
			{
				descripcion:
					"Finalmente el archivo desaparece del lugar, eso quiere decir que se ha eliminado"
			}
		],

		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {} //puntos, niveles y medalla actuales
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);

		// this.indicaciones[0].descripcion=this.objetoSeleccionado.descripcion;
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

			// El audio se encuentra en el componente modulo-contenedor-curso.component
			let audioMouseOver = document.getElementById("audioMouseOver");
			audioMouseOver.volume = 0.2;
			// audioMouseOver.load(); //carga el archivo, esto implica detener la reproduccion actual
			audioMouseOver.play(); //reproduce el archivo de audio
		},
		/**
		 *
		 * @param {String} accion palabra clave que indica que carousel envía la solicitud, en funcion de ello se establece la descripcion
		 */
		obtenerIndice(accion) {
			var _this = this;
			this.$refs.curso.clickStop();

			//slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
			//slid.bs.carousel	This event is fired when the carousel has completed its slide transition.

			if (accion == "crear") {
				$("#carouselCrear").on("slid.bs.carousel", () => {
					let indice = $("#carouselCrear .indicador.active").text(); //obtiene el indice del indicador actual
					let posicion = parseInt(indice) - 1;
					_this.objetoSeleccionado.descripcion =
						_this.indicacionesCrear[posicion].descripcion;
				});
			} else if (accion == "renombrar") {
				$("#carouselRenombrar").on("slid.bs.carousel", () => {
					let indice = $("#carouselRenombrar .indicador.active").text(); //obtiene el indice del indicador actual
					let posicion = parseInt(indice) - 1;

					_this.objetoSeleccionado.descripcion =
						_this.indicacionesRenombrar[posicion].descripcion;
				});
			} else if (accion == "copiar") {
				$("#carouselCopiar").on("slid.bs.carousel", () => {
					let indice = $("#carouselCopiar .indicador.active").text(); //obtiene el indice del indicador actual
					let posicion = parseInt(indice) - 1;

					_this.objetoSeleccionado.descripcion =
						_this.indicacionesCopiar[posicion].descripcion;
				});
			} else if (accion == "eliminar") {
				$("#carouselEliminar").on("slid.bs.carousel", () => {
					let indice = $("#carouselEliminar .indicador.active").text(); //obtiene el indice del indicador actual
					let posicion = parseInt(indice) - 1;

					_this.objetoSeleccionado.descripcion =
						_this.indicacionesEliminar[posicion].descripcion;
				});
			}
		},
		/**
		 *
		 * @param {String} accion palabra clave que indica que carousel envía la solicitud, se debe enviar con la primera letra en mayuscula
		 */
		clickReestablecerCarousel(accion) {
			var _this = this;
			// $('#carousel'+accion)
			$("#carousel" + accion).carousel(0);

			if (accion == "Crear") {
				_this.objetoSeleccionado.descripcion =
					_this.indicacionesCrear[0].descripcion;
			} else if (accion == "Renombrar") {
				_this.objetoSeleccionado.descripcion =
					_this.indicacionesRenombrar[0].descripcion;
			} else if (accion == "Copiar") {
				_this.objetoSeleccionado.descripcion =
					_this.indicacionesCopiar[0].descripcion;
			} else if (accion == "Eliminar") {
				_this.objetoSeleccionado.descripcion =
					_this.indicacionesEliminar[0].descripcion;
			}
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
