parasails.registerPage("m-5-nombres-dominio", {
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

		nombre: {
			id: "nombre",
			titulo: "Nombre del sitio web",
			detalle:
				"El nombre del sitio web es un texto que permite identificar al contenido en internet, generalmente se corresponde con el nombre de la organización a la que pertenece el sitio, algunos ejemplos son: facebook.com, google.com, epn.edu.ec, youtube.com, etc.",
			leerMas: "https://duplika.com/blog/que-es-un-nombre-de-dominio/",
			imgs: [
				{
					src:
						"https://norfipc.com/img/articulos/nombres-dominio-internet.jpeg",
					alt: "nombres de dominio"
				}
			]
		},
		tipo: {
			// id: 'tipo',
			// titulo: 'Extensión de dominio',
			// detalle: '¿Cómo funcionan los dominios? Los nombres de dominio funcionan actuando como un acceso directo al servidor que aloja su sitio web.Sin un nombre de dominio, cualquiera que desee visitar un sitio web deberá ingresar la dirección IP completa. Pero el problema es que una dirección IP es difícil de memorizar, y ni hablar de ser incluída en los materiales publicitarios. ¿Te imaginás un afiche en la calle que diga “ofertas en celulares te esperan en 192.168.345.2”? Difícil de imaginar, ¿verdad? Los dominios también permiten usar redireccionamientos, lo que esencialmente implica la posibilidad de que un usuario, al entrar a un sitio, sea redirigido automáticamente a otro (pasa incluso sin que nos demos cuenta). Redireccionar puede ser útil para campañas y micrositios, o para reenviar personas a páginas especiales en su sitio principal. En un afiche publicitario, una dirección corta del tipo www.celulares.com/sorteo es más fácil de recordar que www.celulares.com/novedades/2019/galaxy/sorteo.html. Entonces, se crea una URL fácil que, al ingresarla, nos redirige automáticamente al contenido que el dueño o empresa de página realmente desea que veamos. También son útiles los redireccionamientos para evitar confusión con la ortografía. Por ejemplo, si visitas www.fb.com, serás reenviado a www.facebook.com.Diferentes tipos de dominios No todos los nombres de dominio siguen la misma fórmula, y si bien los dominios .com constituyen el 46.5% de todos los sitios web globales, eso deja mucho espacio para otros tipos de nombres de dominio como .org y .net.',
			// leerMas:'https://duplika.com/blog/que-es-un-nombre-de-dominio/',
			// imgs: [

			//   {
			//     src: 'https://i2.wp.com/www.miappmovil.info/wp-content/uploads/2017/05/nombres-dominio-internet-disponibles1.jpeg',
			//     alt: 'extensión de dominio'
			//   },

			// ]
			id: "tipo",
			titulo: "Extensión de dominio",
			detalle:
				"La extensión de dominio, por ejemplo .com, permite identificar el tipo de sitio, además del país de procedencia. Existen dos tipos de dominios: Dominios Genéricos: Se aplican según la actividad que se realicen. por ejemplo, punto com es comercial, punto edu se refiera a educación, punto org representa entidades gubernamentales o sin fines de lucro. " +
				"Dominios Geográficos o territoriales: Como su nombre indica se refiera al territorio donde se encuentra la dirección web.Por ejemplo: punto ec pertenece a Ecuador , punto ar pertenece a Argentina, punto es pertenece a España, punto co pertenece a Colombia.",
			leerMas:
				"https://www.proyectoautodidacta.com/comics/anatoma-de-una-direccin-web/",
			imgs: [
				{
					src:
						"https://www.coaching-tecnologico.com/wp-content/uploads/2012/04/dominis2.jpg",
					alt: "tipo de organización"
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
			if (idObjeto == "nombre") {
				$(() => {
					$("#modalnombre").modal("show");
				});
			}
			if (idObjeto == "tipo") {
				$(() => {
					$("#modaltipo").modal("show");
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
