parasails.registerPage("m-1-hardware", {
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
			default: "Hardware"
		},
		cpu: {
			id: "Cpu",
			titulo: "CPU (Unidad Central de Procesamiento)",
			detalle:
				"CPU son las siglas en ingles de Central Processing Unit (Unidad de Proceso Central), El CPU es el cerebro del " +
				"ordenador ya que procesa toda la información que suministramos y  muestra un resultado en pantalla.  En general, es la parte más importante de la computadora.",
			leerMas: "https://conceptodefinicion.de/cpu/",
			imgs: [
				{
					src:
						"https://http2.mlstatic.com/cpucore-i3-8100-octava-generacion-4gb-ssd-120gb-case-halion-D_NQ_NP_955885-MPE29189916004_012019-Q.jpg",
					alt: "CPU"
				}
			]
		},
		teclado: {
			id: "Teclado",
			titulo: "Teclado",
			detalle:
				"El teclado es un instrumento externo que está representado por un conjunto de teclas, que se encargan de " +
				"ingresar una información a una computadora o dispositivo por medio de caracteres (letras, números y símbolos).",
			leerMas: "https://es.wikipedia.org/wiki/Teclado_(inform%C3%A1tica)",
			imgs: [
				{
					src:
						"https://store-images.s-microsoft.com/image/apps.45987.13510798885202450.fa37ac85-50b7-40bf-94be-f7c318f9764a.99d963b7-7b48-481e-b0a6-3d01efab7b7c?w=672&h=378&q=80&mode=letterbox&background=%23FFE4E4E4&format=jpg",
					alt: "El teclado"
				}
			]
		},
		mouse: {
			id: "Mouse",
			titulo: "Mouse",
			detalle:
				"El mouse es uno de los periféricos de entrada que forman parte de un computador, a través de él se puede " +
				"interactuar directamente con la computadora mediante un puntero (indicador) que se muestra en la pantalla. En la imagen se puede ver un mouse común con conexión por cable",
			leerMas: "https://es.wikipedia.org/wiki/Rat%C3%B3n_(inform%C3%A1tica) ",
			imgs: [
				{
					src:
						"https://product-images.www8-hp.com/digmedialib/prodimg/lowres/c03330229.png",
					alt: "Mouse"
				}
			]
		},
		monitor: {
			id: "Monitor",
			titulo: "Monitor",
			detalle:
				"El monitor es un dispositivo electrónico de salida de la computadora en el que se muestran las imágenes y " +
				"textos generados por medio de un adaptador gráfico o de video de ésta. El término monitor se refiere " +
				"normalmente a la pantalla de video, y su función principal y única es la de permitir al usuario interactuar " +
				" con la computadora.",
			leerMas: "https://es.wikipedia.org/wiki/Monitor_de_computadora",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"El término monitor se refiere normalmente a la pantalla de video, y su función principal y única es la de permitir al usuario interactuar con la computadora mostrando datos o información al usuario.",
					imagen:
						"https://www.asus.com/media/global/products/Em0Dz3MjS9JKYM88/P_setting_fff_1_90_end_500.png",
					alt: "Monitor"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Los monitores han cambiado su forma desde que fueron inventados, Inicialmente los monitores usaban un Tubo de Rayos Catódicos para proyectar la imagen en la pantalla, por tanto eran muy grandes como los monitores que se ven a la izquierda de la imagen. Actualmente los monitores son planos gracias a la tecnología que utilizan, ésta puede ser: plasma, LCD o LED como los monitores que se ven a la derecha. ",
					imagen: "https://aticser.files.wordpress.com/2011/06/monitor1.jpg",
					alt: "Historia de los monitores"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Las partes más importantes del monitor son: 1) Pantalla: es la zona donde se despliegan las imágenes. 2) Panel de controles: se encargan de modificar la posición de la pantalla, el brillo, etcétera. 3) Botón de encendido: prende y apaga el monitor de manera digital",
					imagen: "/images/informaticabasica/modulo1/computadora/monitor.png",
					alt: ""
				}
			]
		},
		impresora: {
			id: "Impresora",
			titulo: "Impresora",
			detalle:
				"La impresora es un objeto auxiliar, que está conectado a una unidad central de procesamiento de una computadora, su función es hacer hacer una copia de aquellos documentos que han sido almacenados en un formato electrónico. Estos documentos pueden ser textos o imágenes que son impresos en una hoja o transparencia utilizando cartuchos de tintas o tecnología láser. Vea el siguiente video que muestra como sacar una copia usando una impresora epson",
			leerMas: "https://conceptodefinicion.de/impresora/",
			html:
				'<iframe width="560" height="315" src="https://www.youtube.com/embed/QKIOlpO4j9c?start=87" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		},
		usb: {
			id: "Usb",
			titulo: "Pendrive o Flash memory",
			detalle:
				" Es un tipo de dispositivo de almacenamiento de datos que utiliza circuitos de estado sólido para guardar datos e información. En la imagen se puede ver varios pendrives de diferentes formas y capacidades de almacenamiento",
			leerMas: "https://es.wikipedia.org/wiki/Memoria_USB",
			imgs: [
				{
					src:
						"https://userscontent2.emaze.com/images/1396c703-d396-4136-a1a2-080acfff0b48/2b9cad36-bcd9-4445-8e3b-1d85112da0d7image3.jpeg",
					alt: "Ejemplo de memorias usb"
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
		if (SAILS_LOCALS.mostrarEvaluacion) {
			this.evaluacionIndividual("evaluacion");
		}
		//…
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
			if (idObjeto == "cpu") {
				$(() => {
					$("#modalCpu").modal("show");
				});
			} else if (idObjeto == "teclado") {
				$(() => {
					$("#modalTeclado").modal("show");
				});
			} else if (idObjeto == "mouse") {
				$(() => {
					$("#modalMouse").modal("show");
				});
			} else if (idObjeto == "monitor") {
				$(() => {
					$("#modalMonitor").modal("show");
				});
			} else if (idObjeto == "usb") {
				//usb
				$(() => {
					$("#modalUsb").modal("show");
				});
			} else {
				//impresora
				$(() => {
					$("#modalImpresora").modal("show");
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
