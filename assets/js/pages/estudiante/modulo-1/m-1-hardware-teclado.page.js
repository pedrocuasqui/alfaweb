parasails.registerPage("m-1-hardware-teclado", {
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

		funcion: {
			id: "TeclasDeFuncion",
			titulo: "Teclas de función",
			detalle: "",
			leerMas: "https://es.wikipedia.org/wiki/Tecla_de_funci%C3%B3n",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Las teclas de función sirven como atajos para acceder rápidamente a determinadas funciones en los distintos programas. Los siguientes son solo algunos ejemplos de aplicaciones predeterminadas que realizan las teclas de función bajo distintos programas. En general, la tecla F1 está asociada a la ayuda que ofrecen los distintos programas, es decir que, pulsándola se abre la pantalla de ayuda del programa que se esté usando en este momento. ",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f1.png",
					alt: "Tecla de función f1"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F2: renombra el archivo, acceso directo o carpeta seleccionada. Cambiar a opción de búsqueda, también para maximizar los juegos en red",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f2.png",
					alt: "Tecla de función f2"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F3: inicia una búsqueda en el directorio donde se encuentra el usuario.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f3.png",
					alt: "Tecla de función f3"
				},
				{
					posicion: "4", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F4: despliega el menú «Ir a» una carpeta diferente desde la barra de herramientas de una carpeta, buscar la lista de la barra de direcciones en el Explorador de Windows y en otros administradores de archivos.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f4.png",
					alt: "Tecla de función f4"
				},
				{
					posicion: "5", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F5: actualiza el contenido de la ventana seleccionada. «Buscar y reemplazar» en Microsoft Word. «Ir a» en Microsoft Excel. Cambia el plano de referencia en AutoCAD.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f5.png",
					alt: "Tecla de función f5"
				},
				{
					posicion: "6", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F6: desplazarse por los elementos de la pantalla de una ventana o del escritorio. En AutoCAD modifica el estado del sistema de coordenadas. ",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f6.png",
					alt: "Tecla de función f6"
				},
				{
					posicion: "7", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F7:en Microsoft Word y Excel lanza el revisor gramatical y ortográfico de textos. En AutoCAD pone o quita la grilla de referencia. En Firefox habilita la navegación con cursor o «caret browsing».",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f7.png",
					alt: "Tecla de función f7"
				},
				{
					posicion: "8", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F8: para arrancar la computadora en modo a prueba de fallos.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f8.png",
					alt: "Tecla de función f8"
				},
				{
					posicion: "9", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F9: en Microsoft Word recalcula los códigos de campo. En Excel recalcula fórmulas. En Corel Draw abre una presentación como en Microsoft PowerPoint. En AutoCAD habilita o deshabilita el modo snap.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f9.png",
					alt: "Tecla de función f9"
				},
				{
					posicion: "10", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F10:activar la barra de menús en el programa activo. En AutoCAD entra o sale del modo de coordenadas polares.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f10.png",
					alt: "Tecla de función f10"
				},
				{
					posicion: "11", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F11:habilitar el modo a pantalla completa de diversos navegadores web, juegos y aplicaciones. En Microsoft Excel abre la ventana de inserción de gráficos.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f11.png",
					alt: "Tecla de función f11"
				},
				{
					posicion: "12", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"F12: en Microsoft Word y Excel abre la ventana de «Guardar como». En Chrome abre las herramientas para desarrolladores.",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/f12.png",
					alt: "Tecla de función f12"
				},
				{
					posicion: "13", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"ESC: La tecla de escape generalmente sirve para salir de la pantalla temporal que se muestra en pantalla. Si presiona en este momento la tecla escape, esta ventana se cerrará  .",
					imagen:
						"/images/informaticabasica/modulo1/computadora/teclado/esc.png",
					alt: "Tecla de ESC"
				}
			]
		},
		alfanumerico: {
			id: "TeclasAlfanuméricas",
			titulo: "Teclas Alfanuméricas",
			detalle:
				"Las Teclas alfanuméricas sirven para escribir porque incluyen las letras del alfabeto, números, signos de puntuación y símbolos que se encuentran en las máquinas de escribir tradicionales.",
			leerMas:
				"https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado",
			imgs: [
				{
					src:
						"https://sites.google.com/site/tecnocecprimaria/_/rsrc/1472862105428/home/grado-cuarto/tercer-periodo/el-teclado/teclado%20alfanumerico.png",
					alt: "Teclado alfanumérico"
				}
			]
		},
		posicion: {
			id: "TeclasDePosición",
			titulo: "Teclas de posición",
			detalle:
				"Las Teclas de posición también reciben el nombre de teclado direccional o de navegación. Estas teclas se utilizan para desplazarse por documentos o páginas web y editar texto. Incluyen teclas de dirección, Inicio, Fin, Re Pág (Regresar Página) , Av Pág (Avanzar Página), Supr (Suprimir) e Insert (Insertar).",
			leerMas:
				"https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado",
			imgs: [
				{
					src:
						"https://sites.google.com/site/tecnocecprimaria/_/rsrc/1472862108555/home/grado-cuarto/tercer-periodo/el-teclado/teclado%20desplazamiento.png",
					alt: "Teclas de posición o desplazamiento"
				}
			]
		},
		numerico: {
			id: "TeclasNuméricas",
			titulo: "Teclas numéricas",
			detalle:
				"Las Teclas numéricas se agrupan en un bloque al igual que una calculadora, ubicadas a la derecha del teclado. Sirven para escribir los números en forma más rápida.",
			leerMas:
				"https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado",
			imgs: [
				{
					src:
						"http://3.bp.blogspot.com/-bZTFxXLEBfk/UcixTwPY7ZI/AAAAAAAAAPg/PVDvQiGjpPM/s1600/numeric+keypad.jpg",
					alt: "Teclas numéricas"
				}
			]
		},
		otras: {
			id: "OtrasTeclas",
			titulo: "Otras teclas",
			detalle:
				'Existen otras teclas que tienen funcionalidades especiales, estas son: "impr pant", "bloq despl" y "pause" ',
			leerMas:
				"https://www.areatecnologia.com/TECNOLOGIA%20EN%20IMAGENES/EL%20TECLADO%20DEL%20ORDENADOR.htm",
			html:
				'<h5> Impr Pant o PRTSC: </h5> <p>Son las abreviaturas de "Imprimir pantalla" o en inglés: "Print Screen": al pulsar esta tecla la computadora captura una imagen del estado actual del escritorio del computador, esta imagen se almacena temporalmente en el portapapeles, y puede ser usada en paint o word o cualquier otra aplicación que tenga acceso al portapapeles. </p> <h5> Bloq Despl: </h5><p> Es la abreviatura de "Bloquear desplazamiento", sirve para cambiar la funcionalidad de las teclas "arriba" y "abajo", se usa en un editor de texto y alterna las funciones entre "desplazar el cursor para escribir", y "desplazar la pantalla hacia abajo", actualmente se usa el mouse para estas funciones. </p><h5> Pause: </h5><p> Esta tecla es usada para realizar tareas técnicas como desarrollador o help desk  </p>'
		},
		especiales: {
			id: "TeclasEspeciales",
			titulo: "Teclas especiales",
			detalle:
				"Las Teclas especiales se utilizan por sí solas o en combinación con otras teclas para realizar determinadas acciones. Las teclas que se usan con más frecuencia son Bloq Mayús, Barra espaciadora, Ctrl, Alt, la tecla del logotipo de Windows y Esc.",
			leerMas:
				"https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado",
			imgs: [
				{
					src:
						"https://jsequeiros.com/archivos/computacion/teclado/descripcion_del_teclado.png",
					alt: "Teclas especiales"
				}
			]
		},
		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {} //puntos, niveles y medalla actuales

		// elemento:{
		//   id:'',
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
			if (idObjeto == "funciones") {
				$(() => {
					$("#modalTeclasDeFuncion").modal("show");
				});
			} else if (idObjeto == "alfanumerico") {
				$(() => {
					$("#modalTeclasAlfanuméricas").modal("show");
				});
			} else if (idObjeto == "posicion") {
				$(() => {
					$("#modalTeclasDePosición").modal("show");
				});
			} else if (idObjeto == "numerico") {
				$(() => {
					$("#modalTeclasNuméricas").modal("show");
				});
			} else if (idObjeto == "otras") {
				//usb
				$(() => {
					$("#modalOtrasTeclas").modal("show");
				});
			} else {
				//especiales
				$(() => {
					$("#modalTeclasEspeciales").modal("show");
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
