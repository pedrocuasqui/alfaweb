parasails.registerPage("m-4-guardar", {
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

		/// /images/informaticabasica/modulo4/guardar/revisar/0.png
		guardar: {
			id: "guardar",
			titulo: "Guardar documento",
			detalle: "Para guardar el documento: ",
			leerMas: "",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Para guardar un documento siga los siguientes pasos: 1. Una vez terminada la redacción del documento revisar la ortografía .",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/1.png",
					alt: "Terminar la redacción del documento"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"2.	Se puede guardar un documento de 3 maneras diferentes: Primera forma para guardar un documento de Word)	En la parte superior de la pantalla de windows con el icono en forma de disquete ",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/2.png",
					alt: "Botón guardar"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"A continuación, dar clic izquierdo en el ícono disquete y aparecerá la siguiente interfaz, que pide el nombre del documento a guardar.",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/3.png",
					alt: "Seleccionar la ruta para guardar el documento"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Segunda forma para guardar un documento de Word. Utilizando en acceso desde “Archivo”, clic en guardar o guardar como",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/4.png",
					alt: "Opción archivo"
				},
				{
					posicion: "5", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"A continuación)	Seleccionar el lugar para guardar y darle un nombre al archivo",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/5.png",
					alt: "Seleccionar la ruta para guardar el documento"
				},
				{
					posicion: "6", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Tercera forma para guardar un documento de Word.	Utilizando conmandos del teclado",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/6.png",
					alt: "Atajo de teclado para guardar un documento "
				}
			]
		},
		imprimir: {
			id: "imprimir",
			titulo: "Imprimir documento",
			detalle: "Para imprimir un documento:",
			leerMas: "",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"1. Finalizar la redacción del documento y revisar la ortografía",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/7.png",
					alt: "Finalizar la redacción del documento"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"2. Podemos imprimir un documento de 2 maneras diferentes: Primera forma para imprimir un documento.	Clic en Archivo",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/8.png",
					alt: "Clic en archivo"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Luego aparecerá la siguiente interfaz que permite la impresión del documento, eligiendo en primer lugar ciertas características a tomar en cuenta para el documento:",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/9.png",
					alt: "Opciones de impresión"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Segunda forma para imprimir un documento.	Utilizando comandos del teclado",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/10.png",
					alt: "Atajo de teclado para imprimir un documento"
				},
				{
					posicion: "5", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"A continuación, se muestra la siguiente interfaz que permite trabajar la configuración del documento:",
					imagen:
						"/images/informaticabasica/modulo4/guardar/guardar_imprimir/11.png",
					alt: "Opciones de impresión"
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
			if (idObjeto == "guardar") {
				$(() => {
					$("#modalguardar").modal("show");
				});
			} else if (idObjeto == "imprimir") {
				$(() => {
					$("#modalimprimir").modal("show");
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
