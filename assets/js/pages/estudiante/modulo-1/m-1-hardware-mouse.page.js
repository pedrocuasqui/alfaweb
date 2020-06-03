/* eslint-disable camelcase */
parasails.registerPage("m-1-hardware-mouse", {
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

		clic_derecho: {
			id: "ClicDerecho",
			titulo: "Clic derecho",
			detalle: "",
			leerMas: "http://www.alegsa.com.ar/Dic/clic_derecho.php",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						'El clic derecho del ratón o mouse es la acción de presionar (hacer clic) sobre el botón derecho del mouse. Esta acción suele utilizarse para abrir el menú de opciones, este será diferente dependiendo de donde se posa el cursor del mouse en ese momento. Si el mouse está configurado para zurdos, el clic derecho será en ese caso el botón de la izquierda. La animación de abajo muestra la acción "clic derecho".',
					imagen:
						"https://4.bp.blogspot.com/-bUIk7H52CJg/WvIgCwe00cI/AAAAAAAAAC4/FK9bXoH0yAgLBzFlZOeZppZ5vt9TEuRLwCLcBGAs/s400/mouse.gif",
					alt: "Clic derecho"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Algunos usos concretos del clic derecho del ratón:- En un programa editor de texto, como bloc de notas o Microsoft Word, se puede seleccionar una porción del texto, después se presiona clic derecho sobre la selección y se abrirá un menú con distintas opciones que podemos hacer con ese texto: copiar, cortar, reemplazar, buscar sinónimos, etcétera. También aparecerán funciones relacionadas al documento y no necesariamente para el texto seleccionado. Vea la animación debajo como ejemplo.",
					imagen: "https://i.stack.imgur.com/dtS3o.gif",
					alt: "Clic derecho sobre word"
				}
			]
		},
		clic_izquierdo: {
			id: "ClicIzquierdo",
			titulo: "Clic izquierdo",
			detalle:
				'Cuando se dice que "se debe hacer clic", se hace referencia a la acción de presionar un botón del mouse o ratón, generalmente el izquierdo. Se escribe "click" con K en inglés en tanto en español suele usarse en frases como: hacer clic, dar clic, clicar o cliquear, sin "k" según la Real Academia Española. Vea la animación debajo como ejemplo.',
			leerMas: "http://www.alegsa.com.ar/Dic/clic.php",
			imgs: [
				{
					src:
						"https://media1.tenor.com/images/b5e07d01440eb593dcb28f01116d7ec8/tenor.gif",
					alt: "Clic izquierdo"
				}
			]
		},
		scroll: {
			id: "Scroll",
			titulo: "Scroll",
			detalle:
				"La rueda de desplazamiento (scroll wheel) o rueda del ratón (mouse wheel) de computadora, es el disco de plástico duro o goma dura, perpendicular a la superficie del ratón de computadora. Normalmente está ubicada en el medio de los botones izquierdo y derecho del ratón. Generalmente sirve para desplazar el contenido de la pantalla hacia arriba o hacia abajo",
			leerMas: "https://es.wikipedia.org/wiki/Rueda_de_desplazamiento",
			imgs: [
				{
					src: "https://i.imgur.com/MlbJHpi.gif",
					alt: "Scroll"
				}
			]
		},
		mouse: {
			id: "mouse",
			titulo: "Mouse",
			detalle: "",
			leerMas: "https://es.wikipedia.org/wiki/Rat%C3%B3n_(inform%C3%A1tica)",
			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"El mouse es un elemento que permite controlar al ordenador usando una mano por medio de un puntero",
					imagen: "https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif",
					alt: "Mouse en movimiento"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Existen diferentes tipos de mouse, los más comunes son: 1) El mouse mecánico, funciona con una esfera que al moverse indica la posición del puntero en la pantalla, actualmente ya no se usan. 2) El mouse Óptico, funciona con una luz en lugar de una esfera. 3)El mouse láser, es el más usado actualmente y funciona con una haz de luz parecido al mouse óptico. 4) Trackball, es un mouse especial que se utilizan en una variedad de campos, desde el control del tráfico aéreo, el trabajo de diseño o juegos. 5) Touch, es un mouse sensible al tacto, se usa generalmente en los computadores portátiles.",
					imagen:
						"https://image.slidesharecdn.com/innovacionestecnolgicas-151108234626-lva1-app6891/95/innovaciones-tecnolgicas-3-638.jpg",
					alt: "Diferentes tipos de mouse"
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
			if (idObjeto == "clic-izquierdo") {
				$(() => {
					$("#modalClicIzquierdo").modal("show");
				});
			} else if (idObjeto == "clic-derecho") {
				$(() => {
					$("#modalClicDerecho").modal("show");
				});
			} else if (idObjeto == "scroll") {
				$(() => {
					$("#modalScroll").modal("show");
				});
			} else if (idObjeto == "mouse") {
				$(() => {
					$("#modalmouse").modal("show");
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
