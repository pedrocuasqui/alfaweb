parasails.registerPage("m-3-barra-acceso-rapido", {
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

		acceso: {
			id: "Acceso",
			titulo: "Barra de acceso rápido",
			detalle:
				"Nos da acceso a determinadas acciones que forman parte de los diferentes elementos de menú, pero que se encuentran disponibles de forma directa a partir de esta barra, por ser las más usuales",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://support.content.office.net/es-es/media/a93355d7-6b01-45a7-909a-5c53dcae7aee.jpg",
					alt: "Barra de acceso rápido"
				}
			]
		},
		autoguardado: {
			id: "autoguardado",
			titulo: "Botón de autoguardado",
			detalle:
				"La característica de autoguradado permite que un archivo se suba a internet (nube) mediante una cuenta personal de Microsoft, cada vez que el usuario realice un cambio en el documento, este se guardará automáticamente para evitar la pérdida de su contenido, además permite ver en tiempo real los cambios que realizan otros usuarios con quienes se comparte el documento",
			leerMas: "https://support.microsoft.com/es-ec/help/2617238",
			imgs: [
				{
					src: "https://i.blogs.es/56707b/autoguardado-off/1366_2000.jpg",
					alt: "Botón de autoguardado"
				}
			]
		},
		guardar: {
			id: "guardar",
			titulo: "Guardar",
			detalle:
				"Permite guardar el documento en una carpeta del computador, la imagen debajo muestra la ventana que aparece al pulsar el botón guardar",
			leerMas: "https://www.aulaclic.es/word-2016/t_4_1.htm",
			imgs: [
				{
					src: "https://www.aulaclic.es/word-2016/graficos/guardar_como.png",
					alt: "Guardar como"
				}
			]
		},
		deshacer: {
			id: "deshacer",
			titulo: "Deshacer",
			detalle:
				"Sirve para deshacer una acción, al presionar Ctrl+Z se obtiene el mismo resultado. Puede presionar Deshacer (o CTRL + Z) varias veces para deshacer varios pasos. " +
				"Hay acciones que no se pueden deshacer, tal como hacer clic en la pestaña Archivo o guardar un archivo. Si una acción no se puede deshacer, el comando Deshacer cambia a No se puede Deshacer." +
				"Para deshacer varias acciones al mismo tiempo, haga clic en la flecha situada junto a Deshacer  Botón Deshacer , seleccione las acciones en la lista que quiere deshacer y, después, haga clic en la lista. ",
			leerMas:
				"https://support.office.com/es-es/article/deshacer-rehacer-o-repetir-una-acci%C3%B3n-84bdb9bc-4e23-4f06-ba78-f7b893eb2d28",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		fuente: {
			id: "fuente",
			titulo: "Fuente",
			detalle:
				"Permite personalizar el texto con opciones avanzadas de fuentes y caracteres para que tenga el exactamente el aspecto que desea",
			leerMas: "",
			imgs: [
				{
					src:
						"https://saberprogramas.com/wp-content/uploads/2019/01/cambiar-fuente-predeterminada-word.jpg",
					alt: "Opciones de Fuente"
				}
			]
		},
		personalizar: {
			id: "personalizar",
			titulo: "Personalizar",
			detalle: "Personalizar la barra de herramientas de acceso rápido",
			leerMas:
				"https://support.office.com/es-es/article/personalizar-la-barra-de-herramientas-de-acceso-r%C3%A1pido-43fff1c9-ebc4-4963-bdbd-c2b6b0739e52",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Para personalizar la barra de herramientas, hay que dar clic sobre la flecha hacia abajo en la barra de acceso rápido.",
					imagen:
						"/images/informaticabasica/modulo3/barra_acceso_rapido/acceso_rapido/personalizar1.png",
					alt: "Opción personalizar de la barra de acceso rápido"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Puede seleccionar las herramientas que se deseen dando clic izquierdo sobre la opción:",
					imagen:
						"/images/informaticabasica/modulo3/barra_acceso_rapido/acceso_rapido/personalizar2.png",
					alt: "Opciones de personalización"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Al final todas las opciones escogidas, se verán agregadas en la barra de acceso rápido:",
					imagen:
						"/images/informaticabasica/modulo3/barra_acceso_rapido/acceso_rapido/personalizar2.png",
					alt: "Opciones personalizadas en la barra de acceso rápido"
				}
			]
		},
		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {} //puntos, niveles y medalla actuales
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
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

		infoObjeto(idObjeto) {
			if (idObjeto == "acceso") {
				$(() => {
					$("#modalAcceso").modal("show");
				});
			}
			if (idObjeto == "autoguardado") {
				$(() => {
					$("#modalautoguardado").modal("show");
				});
			}
			if (idObjeto == "guardar") {
				$(() => {
					$("#modalguardar").modal("show");
				});
			}
			if (idObjeto == "deshacer") {
				$(() => {
					$("#modaldeshacer").modal("show");
				});
			}
			if (idObjeto == "fuente") {
				$(() => {
					$("#modalfuente").modal("show");
				});
			}
			if (idObjeto == "personalizar") {
				$(() => {
					$("#modalpersonalizar").modal("show");
				});
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
