parasails.registerPage("m-3-barra-opciones", {
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

		archivo: {
			id: "archivo",
			titulo: "Archivo",
			detalle: "",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Archivo, Es la pestaña que nos da acceso a la zona de administración en la que encontraremos acciones como las de Guardar el documento, Abrir otro existente, crear uno Nuevo, Imprimir, Compartir o Exportar. Dependiendo de la función se puede encontrar un boton de INICIO o la pestaña ARCHIVO.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/0.png",
					alt: "Pestaña Archivo o botón Inicio"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Información del documento: Muestra una visión general de toda la información del documento en el que se esté trabajando.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/1.png",
					alt: "Información del documento"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Reciente: Permite ver los archivos más recientes que han sido abiertos y poder abrirlos nuevamente en otra ventana de Word.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/2.png",
					alt: "Opción reciente"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Nuevo: Permite editar un nuevo documento acorde a lo necesario.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/3.png",
					alt: "Opción nuevo"
				},
				{
					posicion: "5", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Imprimir: Permite imprimir un nuevo documento mediante un dispositivo de impresión.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/4.png",
					alt: "Opción imprimir"
				},
				{
					posicion: "6", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Guardar y enviar: Permite imprimir un nuevo documento mediante un dispositivo de impresión.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/5.png",
					alt: "Opción guardar y enviar"
				},
				{
					posicion: "7", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Opción Ayuda: Muestra opciones de ayuda para configurar el documento y Soporte técnico.",
					imagen:
						"/images/informaticabasica/modulo3/barra_opciones/p_archivo/6.png",
					alt: "Opción ayuda"
				}
			]
		},

		inicio: {
			id: "_inicio",
			titulo: "Inicio",
			detalle:
				"Es la que aparece seleccionada por defecto; en ella se encuentran las principales acciones de un procesador de textos, agrupadas en bloques de iconos: tipo y tamaño de letra, color, negrita, cursiva, efectos de texto y tipografía, sangrado, justificación, inserción de viñetas, numeración, copiar y pegar, copiar formato, etc. Si queremos acceder a más funciones no tendremos más que pulsar en la flecha que aparece en el extremo inferior derecho, y se nos mostrarán en ventana emergente (algo que ocurre en la mayoría de los grupos de comandos del resto de pestañas).",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://support.content.office.net/es-es/media/f085aa95-201a-40b9-bfd4-b510559081e6.png",
					alt: "Pestaña Inicio"
				}
			],
			html: "" //pagina 69 a pagina 100 del folleto, imagenes en la ruta /images/informaticabasica/modulo3/barra_opciones/p_inicio/0.png
		},

		insertar: {
			id: "insertar",
			titulo: "Insertar",
			detalle:
				"A partir de estos comandos incluiremos tablas, gráficos, formas, comentarios, vídeos, hipervínculos…, y una serie de complementos que podremos incorporar desde la Tienda Office (Diccionario, Traductor, GeoGebraTube, Wkipedia…). Como novedad, con Word 2016 se podrán escribir ecuaciones matemáticas sobre las pantallas táctiles; bastará con ir a la pestaña Insertar > Ecuación > Ecuación de lápiz. ",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://i.pinimg.com/originals/df/5c/74/df5c7418009d05fe0230937665dea4ac.png",
					alt: "Pestaña Insertar"
				}
			]
		},

		disenio: {
			id: "disenio",
			titulo: "Diseño",
			detalle:
				"Permite seleccionar un nuevo tema para proporcionar al documento un estilo concreto: un conjunto único de colores, fuentes y efectos",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://filestore.community.support.microsoft.com/api/images/542e9e77-c075-4cad-a09e-c2ccbab9ed19?upload=true",
					alt: "Pestaña Diseño"
				}
			]
		},

		disposicion: {
			id: "disposicion",
			titulo: "Disposición",
			detalle:
				" Para establecer los tamaños del margen del documento, cambiar la orientación de la página, el tamaño, agregar o quitar columnas, insertar saltos de página, ubicar un objeto.",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"http://www.formacionprofesional.info/wp-content/uploads/2018/12/ficha-disposicion-word.png",
					alt: "Pestaña Disposición"
				}
			]
		},

		referencias: {
			id: "referencias",
			titulo: "Referencias",
			detalle:
				" Permite insertar encabezados y pies de página, índices, citas y bibliografía, etc.",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://support.content.office.net/es-es/media/2301c87d-0ce6-4532-b9ba-aa9af6dc2712.png",
					alt: "Pestaña Referencias"
				}
			]
		},

		correspondencia: {
			id: "correspondencia",
			titulo: "Correspondencia",
			detalle:
				"Para diseñar sobres, etiquetas, crear documentos y enviarlos a varias personas insertando campos como Nombre y Dirección.",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://support.content.office.net/es-es/media/ee4696f8-b5b5-498c-8741-1598b0a769ed.png",
					alt: "Pestaña correspondencia"
				}
			]
		},

		revisar: {
			id: "revisar",
			titulo: "Revisar",
			detalle:
				" En esta pestaña están los botones correspondientes a la revisión ortográfica y gramatical, o para traducir el texto a otro idioma, añadir un comentario, estar al tanto de los cambios realizados en el documento (muy útil si se está trabajado de forma colaborativa), comparar múltiples versiones, limitar la medida en que los demás usuarios podrán intervenir en el documento",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://i.pinimg.com/originals/7a/14/1d/7a141dff1c509fe914d415fcdf523492.png",
					alt: "Pestaña Revisar"
				}
			]
		},

		vista: {
			id: "vista",
			titulo: "Vista",
			detalle:
				"Nos permitirá mostrar el documento en distintos formatos (de lectura, impresión, página web), aplicar el zoom, abrir una segunda ventana con el documento o una página, al tiempo que editamos sobre otra, visualizar dos documentos en paralelo, etc. ",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src: "https://i.blogs.es/b04d49/regla/450_1000.jpg",
					alt: "Pestaña Vista"
				}
			]
		},

		ayuda: {
			id: "ayuda",
			titulo: "Ayuda",
			detalle:
				"Muestra vaias opciones de ayuda para el usuario una de ellas es la ayuda en el uso de la herramienta, otra es la opción de escribir comentarios, y novedades ",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"/images/informaticabasica/modulo3/barra_opciones/pestania-ayuda-office.png",
					alt: "Pestaña Ayuda"
				}
			]
		},
		comandos: {
			id: "comandos",
			titulo: "Comandos de la barra de opciones",
			detalle:
				"Estos comandos permiten modificar el texto o el documento de acuerdo a nuestras necesidades, están agrupadas por cada pestaña",
			leerMas:
				"https://emtic.educarex.es/pildoras/pub/cont/archivos/Elementos_basicos_de_Word.pdf",
			imgs: [
				{
					src:
						"https://i2.wp.com/www.tecnicomo.com/wp-content/uploads/2017/01/C%C3%B3mo-contar-palabras-p%C3%A1ginas-l%C3%ADneas-y-p%C3%A1rrafos-en-Word-2016-1.png",
					alt: "Comandos de la barra de opciones"
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
			if (idObjeto == "archivo") {
				$(() => {
					$("#modalarchivo").modal("show");
				});
			}
			if (idObjeto == "inicio") {
				$(() => {
					$("#modal_inicio").modal("show");
				});
			}
			if (idObjeto == "insertar") {
				$(() => {
					$("#modalinsertar").modal("show");
				});
			}
			if (idObjeto == "disenio") {
				$(() => {
					$("#modaldisenio").modal("show");
				});
			}
			if (idObjeto == "disposicion") {
				$(() => {
					$("#modaldisposicion").modal("show");
				});
			}
			if (idObjeto == "referencias") {
				$(() => {
					$("#modalreferencias").modal("show");
				});
			}
			if (idObjeto == "correspondencia") {
				$(() => {
					$("#modalcorrespondencia").modal("show");
				});
			}
			if (idObjeto == "revisar") {
				$(() => {
					$("#modalrevisar").modal("show");
				});
			}
			if (idObjeto == "vista") {
				$(() => {
					$("#modalvista").modal("show");
				});
			}
			if (idObjeto == "ayuda") {
				$(() => {
					$("#modalayuda").modal("show");
				});
			}
			if (idObjeto == "comandos") {
				$(() => {
					$("#modalcomandos").modal("show");
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
