parasails.registerPage("m-5-motores-navegacion", {
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

		indice: null,
		indicaciones: [
			{ descripcion: "" }, //la primera descripción es la del objetoSeleccionado
			{
				descripcion:
					"Para navegar usando un motor de búsqueda siga los siguientes pasos: Paso 1: Abrir el navegador y escribir en la barra de búsqueda el nombre del motor que desea utilizar, existen varias opciones, la más común es www.google.com"
			},
			{
				descripcion:
					"Paso 2: Escribir lo que se desea búscar, por ejemplo: como navegar en internet"
			},
			{
				descripcion:
					"Paso 3: Se despliega una lista de opciones que coinciden con la búsqueda, éstas se encuentran resaltadas y subrayadas con color azul, aquí puede moverse hacia abajo o hacia arriba para ver más opciones"
			},
			{
				descripcion:
					"Paso 4: Dar clic sobre un enlace para ver su contenido, al hacer esto el navegador mostrará en la parte superior la animación de un anillo que gira, significa que el navegador está cargando la información "
			},
			{
				descripcion:
					"Paso 5: El contenido del sitio seleccionado se muestra en la pantalla."
			}
		],
		silenciar: true,
		mostrarIconoRepetir: false, //se establece en true cuando se termina la evaluación, se modifica desde el componente raiz
		progreso: {} //puntos, niveles y medalla actuales
		// elemento:{
		//   id:'',
		//   titulo:'',
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

		this.indicaciones[0].descripcion = this.objetoSeleccionado.descripcion;
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

		// mouseMovePc(event) {
		//   // clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"

		//   this.mouseX = event.clientX;
		//   this.mouseY = event.clientY;

		//   // El text del tooltip se basa en valor de la propiedad ""id"" de cada elemento ""
		//   let elementoSeleccionado = event.target.parentNode.id;
		//   this.textoToolTip = elementoSeleccionado.toString().toUpperCase();

		//   //una vez que los valores para x y y del texto del tooltip han sido establecidos, se muestra en la pantalla
		//   this.mostrarToolTip = true;
		// },
		// mouseOutPc() {
		//   this.mostrarToolTip = false;
		// },
		obtenerIndice() {
			var _this = this;
			this.$refs.curso.clickStop();
			//slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
			//slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
			$("#carouselMotores").on("slid.bs.carousel", function() {
				this.indice = $(".indicador.active").text(); //obtiene el indice del indicador actual
				let posicion = parseInt(this.indice) - 1;

				_this.objetoSeleccionado.descripcion =
					_this.indicaciones[posicion].descripcion;
			});
		}
	},
	computed: {
		// styleToolTip() {
		//   // translate define cuanto se moverá el objeto a partir de su posicion original
		//   // funciona solo con comillas dobles
		//   //{ transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
		//   let estilo = {
		//     top: this.mouseY + 'px',
		//     left: this.mouseX + 'px'
		//   }
		//   return estilo;
		// }
	}
});
