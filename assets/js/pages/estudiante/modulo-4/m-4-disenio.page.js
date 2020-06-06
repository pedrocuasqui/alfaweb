parasails.registerPage("m-4-disenio", {
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
		//variables unicas en este modulo
		pestaniaActual: "temas", // por defecto se muestra esta pestaña

		/////////////////////////////
		//TEMAS
		/// /images/informaticabasica/modulo4/disenio/revisar/0.png
		temas: {
			id: "temas",
			titulo: "Temas",
			detalle: "",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Los temas permiten cambiar de forma automática el estilo de la página, los colores de fondo, de texto, etcétera. La opción temas presenta varias opciones predefinidas como se puede ver en la imagen.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/temas/1.png",
					alt: "opciones predefinidas de temas"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Se puede elegir entre diferentes tipos de formatos para el documento, como se puede ver en  la imagen.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/temas/1_1.png",
					alt: "colores predefinidos"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Cada formato dará un aspecto particular a las partes que lo conforman.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/temas/1_2.png",
					alt: "formato particular"
				}
			]
		},

		colores: {
			id: "colores",
			titulo: "Colores",
			detalle:
				"La opción colores te permite cambiar rápidamente todos los colores que se usan en el documento eligiendo de una paleta de colores diferentes",
			leerMas: "",
			html:
				"<p> La opción colores presenta varias opciones predefinidas como se puede ver en la imagen.</p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/temas/2.png" alt="colores"></div>'
		},
		fuentes: {
			id: "fuentes",
			titulo: "Fuentes",
			detalle:
				"La opción Fuentes cambia rápidamente el aspecto de todo el documento seleccionando un nuevo juego de fuentes. ",
			leerMas: "",
			html:
				"" +
				"<p> La opción fuentes presenta varias opciones predefinidas como se puede ver en la imagen.</p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/temas/3.png" alt="fuentes"></div>'
		},
		efectos: {
			id: "efectos",
			titulo: "Efectos",
			detalle:
				"La opción Efectos cambia rápidamente el aspecto general de todos los objetos del documento. ",
			leerMas: "",
			html:
				"" +
				"<p> La opción efectos presenta varias opciones predefinidas como se puede ver en la imagen. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/temas/4.png" alt="efectos"></div>'
		},
		//////////////////////////////////////////////////
		//////////////////////////////////////////////////
		// configurar
		//     /images/informaticabasica/modulo4/disenio/p_disenio/configurar/4.png
		margenes: {
			id: "margenes",
			titulo: "Márgenes",
			detalle:
				"La opción Márgenes establece los tamaños de márgenes de todo el documento o la selección actual. ",
			leerMas: "",
			html:
				"" +
				"<p> La opción márgenes presenta varias opciones predefinidas como se puede ver en la imagen. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/configurar/1.png" alt="márgenes"></div>'
		},
		orientacion: {
			id: "orientacion",
			titulo: "Orientación",
			detalle: " ",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"La opción orientación proporciona a las páginas un diseño horizontal o vertical. La opción márgenes presenta varias opciones predefinidas.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/2.png",
					alt: "Orientacion"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Para cambiar la orientación de la página. En la opción Orientación, elegir entre una orientación vertical u horizontal.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/2_1.png",
					alt: "opciones de orientación"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle: "La orientación cambió de Vertical a Horizontal.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/2_2.png",
					alt: "Orientación de vertical a horizontal"
				}
			]
		},
		tamanio: {
			id: "tamanio",
			titulo: "Tamaño",
			detalle: "Permite elegir un tamño de papel para el documento. ",
			leerMas: "",
			html:
				"" +
				"<p> La opción márgenes presenta varias opciones predefinidas. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/configurar/3.png" alt="tamanio"></div>'
		},
		columnas: {
			id: "columnas",
			titulo: "Columnas",
			detalle: "",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"La opción columnas divide el texto en dos o más columnas, al dar clic se presentar varias opciones predefinidas",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/4.png",
					alt: "Columnas "
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Cambio del documento a dos columnas. En la opción Columnas, elegir el número de columnas en las cuales se quiere dividir el texto.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/4_1.png",
					alt: "columnas"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"El texto se dividirá en el número de columnas escogido, en este caso dos.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/configurar/4_2.png",
					alt: "columnas"
				}
			]
		},
		saltos: {
			id: "saltos",
			titulo: "Saltos",
			detalle:
				"Agrega un salto en la ubicación actual para retomar denuevo el texto en la siguiente página, sección o columna.",
			leerMas: "",
			html:
				"" +
				"<p> La opción márgenes presenta varias opciones predefinidas como se puede ver en la imagen. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/configurar/5.png" alt="saltos"></div>'
		},
		numeros: {
			id: "numeros",
			titulo: "Números de línea",
			detalle:
				"Permite hacer referencia a líneas específicas del documento de forma fácil y rápido usando números de líneas en el márgen. ",
			leerMas: "",
			html:
				"" +
				"<p> La opción márgenes presenta varias opciones predefinidas como se puede ver en la imagen. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/configurar/6.png" alt="números"></div>'
		},
		guiones: {
			id: "guiones",
			titulo: "Guiones",
			detalle:
				"Cuando una palabra se queda sin espacio word normalmente la pasa a la siguiente línea. ",
			leerMas: "",
			html:
				"" +
				"<p>Cuando se activa el uso de guiones, Word divide la palabra automáticamente de forma que se ve en los párrafos de los diarios</p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/configurar/7.png" alt="guiones"></div>'
		},

		/////////////////////////////////////////
		// fondo
		marca: {
			id: "marca",
			titulo: "Marca de agua",
			detalle: "",
			leerMas: "",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'La opción "Marca de agua" agrega texto fantasma, como "Confidencial" o "Urgente" detrás del contenido de la página .La marca de agua es una forma fantástica de mostrar que el documento requiere un tratamiento especial sin distraer del contenido',
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1.png",
					alt: "Marca de agua"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'Para agregar una marca de agua: Dar clic sobre la opción marca de agua, y escoger la opción "Marcas de agua personalizadas".',
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_1.png",
					alt: "marca de agua"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Aparecerá la siguiente pantalla, en la cual podemos elegir entre una Marca de agua de imagen o una Marca de agua de Texto.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_2.png",
					alt: "opciones de marca de agua"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'Para Agregar una marca de agua de imagen, seleccione la opción "imagen"',
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_3.png",
					alt: "marca de agua de imagen"
				},
				{
					posicion: "5", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Aparecerá la siguiente pantalla, en la cual se elegirá la imagen que se desee.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_4.png",
					alt: "seleccionar la imagen"
				},
				{
					posicion: "6", //siempre empezar en uno para poder identificar a los elementos
					detalle: "Dar clic en Aceptar.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_5.png",
					alt: "clic en aceptar"
				},
				{
					posicion: "7", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"La marca de agua ya ha sido insertada. y se puede ver al fondo del texto",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_6.png",
					alt: "La marca de agua de imagen ha sido insertada"
				},
				{
					posicion: "8", //siempre empezar en uno para poder identificar a los elementos
					detalle: "Agregar una marca de agua de texto",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_7.png",
					alt: "marca de agua de texto"
				},
				{
					posicion: "9", //siempre empezar en uno para poder identificar a los elementos
					detalle: "Al dar clic en Aceptar y la marca de agua se insertará.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/1_8.png",
					alt: "La marca de agua de texto ha sido insertada"
				}
			]
		},
		color: {
			id: "color",
			titulo: "Color",
			detalle:
				"La opción Color da un toque de color al documento cambiando el color de la página. ",
			leerMas: "",
			html:
				"" +
				"<p> Se presentan colores predefinidos en una paleta como se puede ver en la imagen. </p>" +
				'<div class="d-flex justify-content-center"><img src="/images/informaticabasica/modulo4/disenio/p_disenio/fondo/2.png" alt="color"></div>'
		},
		bordes: {
			id: "bordes",
			titulo: "Bordes de página",
			detalle: "",
			leerMas: "",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'La opción "Bordes" agrega o cambia el borde alrededor de la página. Un borde atrae la atención y agrega un toque elegante al documento. ',
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/3.png",
					alt: "color"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'Para agregar bordes alrededor de la página. Dar clic en la opción "Bordes de página".',
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/3_1.png",
					alt: "Bordes de página"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle: "Se abre la siguiente ventana para personalizar los bordes.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/3_2.png",
					alt: "Opciones de borde de página"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Al dar clic en Aceptar ya se puede observar los bordes insertados.",
					imagen:
						"/images/informaticabasica/modulo4/disenio/p_disenio/fondo/3_3.png",
					alt: "Bordes de página aplicados"
				}
			]
		},
		/////////////////////////////////////////
		// parrafo

		izquierda: {
			id: "izquierda",
			titulo: "Sangría izquierda",
			detalle:
				"Permite elegir cuánto se aleja el párrafo del márgen izquierdo. Para cambiar los márgenes de todo el documento, haga clic en el botón Márgenes.",
			leerMas: "",
			html: ""
		},
		derecha: {
			id: "derecha",
			titulo: "Sangría derecha",
			detalle:
				"Permite elegir cuánto se aleja el párrafo del márgen derecho. Para cambiar los márgenes de todo el documento, haga clic en el botón Márgenes.",
			leerMas: "",
			html: ""
		},
		antes: {
			id: "antes",
			titulo: "Espaciado antes de ",
			detalle:
				"Determina cuánto espacio aparece por encima de los párrafos seleccionados. Las opciones de Espacio entre párrafos en la pestaña Diseño permiten aplicar el espaciado a todo el documento. ",
			leerMas: "",
			html: ""
		},
		despues: {
			id: "despues",
			titulo: "Espaciado después de",
			detalle:
				"Determina cuánto espacio aparece por debajo de los párrafos seleccionados. Las opciones de Espacio entre párrafos en la pestaña Diseño permiten aplicar el espaciado a todo el documento. ",
			leerMas: "",
			html: ""
		},

		/////////////////////////////////////////
		// ORGANIZAR

		organizar: {
			id: "organizar",
			titulo: "Organizar",
			detalle:
				"Permite configurar la disposición física de distintos elementos dentro de la página, permite realizar acciones como: cambiar la posición de una imagen, ajustar el texto, traer un objeto al frente, enviar el objeto atrás, alinear y girar.",
			leerMas: "",
			html: ""
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

		infoObjeto(idObjeto) {
			if (idObjeto == "temas") {
				$(() => {
					$("#modaltemas").modal("show");
				});
			} else if (idObjeto == "colores") {
				$(() => {
					$("#modalcolores").modal("show");
				});
			} else if (idObjeto == "fuentes") {
				$(() => {
					$("#modalfuentes").modal("show");
				});
			} else if (idObjeto == "efectos") {
				$(() => {
					$("#modalefectos").modal("show");
				});
			} else if (idObjeto == "margenes") {
				$(() => {
					$("#modalmargenes").modal("show");
				});
			} else if (idObjeto == "orientacion") {
				$(() => {
					$("#modalorientacion").modal("show");
				});
			} else if (idObjeto == "tamanio") {
				$(() => {
					$("#modaltamanio").modal("show");
				});
			} else if (idObjeto == "columnas") {
				$(() => {
					$("#modalcolumnas").modal("show");
				});
			} else if (idObjeto == "saltos") {
				$(() => {
					$("#modalsaltos").modal("show");
				});
			} else if (idObjeto == "numeros") {
				$(() => {
					$("#modalnumeros").modal("show");
				});
			} else if (idObjeto == "guiones") {
				$(() => {
					$("#modalguiones").modal("show");
				});
			} else if (idObjeto == "marca") {
				$(() => {
					$("#modalmarca").modal("show");
				});
			} else if (idObjeto == "color") {
				$(() => {
					$("#modalcolor").modal("show");
				});
			} else if (idObjeto == "bordes") {
				$(() => {
					$("#modalbordes").modal("show");
				});
			} else if (idObjeto == "sangria") {
				$(() => {
					$("#modalsangria").modal("show");
				});
			} else if (idObjeto == "izquierda") {
				$(() => {
					$("#modalizquierda").modal("show");
				});
			} else if (idObjeto == "derecha") {
				$(() => {
					$("#modalderecha").modal("show");
				});
			} else if (idObjeto == "antes") {
				$(() => {
					$("#modalantes").modal("show");
				});
			} else if (idObjeto == "despues") {
				$(() => {
					$("#modaldespues").modal("show");
				});
			} else if (idObjeto == "organizar") {
				$(() => {
					$("#modalorganizar").modal("show");
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
		},
		clickSelectorPestania(pestania) {
			this.pestaniaActual = pestania;
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
