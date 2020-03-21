/* eslint-disable camelcase */
parasails.registerPage("m-2-navegacion-escritorio", {
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

		escritorio: {
			id: "EscritorioVacio",
			titulo: "Escritorio Vacío", //este nombre debe corresponder con el id del modulo de la funcion infoObjeto()
			detalle:
				"El escritorio vacío es el área del escritorio que no ha sido usada por un icono o acceso directo, la imagen de fondo se llama FONDO DE ESCRITORIO",
			leerMas:
				"https://es.answers.acer.com/app/answers/detail/a_id/37320/~/windows-10%3A-cambiar-el-fondo-de-la-pantalla-de-inicio",
			imgs: [
				{
					src:
						"https://i.blogs.es/3ec1b1/slideshow_wallpaper_windows10/450_1000.jpg",
					alt: "Fondo de escritorio de windows 10"
				}
			]
		},

		iconos: {
			id: "Iconos",
			titulo: "Iconos",
			detalle:
				"Los íconos son aquellas imágenes que representan a las aplicaciones, y son visibles aún cuando no se encuentre activa la aplicación.",
			leerMas:
				"https://www.softzone.es/2018/04/15/trucos-personalizar-iconos-escritorio-windows-10/",
			imgs: [
				{
					src: "https://i.ytimg.com/vi/MqQKlDVSLgE/maxresdefault.jpg",
					alt: "Iconos en el escritorio de windows 10"
				}
			]
		},

		inicio: {
			id: "BotonDeInicio",
			titulo: "Botón de inicio",
			detalle:
				"El botón de inicio de forma general permite: abrir programas y carpetas; buscar archivos, carpetas y aplicaciones; obtener ayuda sobre el sistema operativo; apagar el equipo y cerrar la sesión en Windows",
			leerMas: "https://definicion.de/boton-de-inicio/",
			imgs: [
				{
					src:
						"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/216e3f66-13a3-454c-8127-f8e07d8898c6/d5wpw84-c63ac8dd-5020-43d9-9dad-8fac90cdca4f.png",
					alt: "Botón de inicio"
				}
			]
		},

		inicio_rapido: {
			id: "BarraDeInicioRapido",
			titulo: "Barra de inicio rápido",
			detalle:
				"La barra de acceso rápido facilita el acceso a aplicaciones o carpetas preferidas, el usuario puede configurar que iconos se deben mostrar",
			leerMas:
				"https://www.softzone.es/2017/02/28/como-recuperar-la-barra-de-inicio-rapido-en-windows-10/",
			imgs: [
				{
					src:
						"https://www.softzone.es/app/uploads/2017/02/barrainicio.jpg?x=634&y=309",
					alt: "Barra de acceso rapido"
				}
			]
		},

		barra_tareas: {
			id: "BarraDeTareas",
			titulo: "Barra de tareas",
			detalle:
				"La barra de tareas se encuentra en la parte inferior de la pantalla, en esta barra se encuentra el botón de inicio  , la barra de inicio rápido y la barra de notificaciones, muestra además las aplicaciones que se encuentran activas,",
			leerMas:
				"https://www.downloadsource.es/como-aumentar-el-tamano-de-los-iconos-de-la-barra-de-tareas-de-windows-10/n/7210/",
			imgs: [
				{
					src:
						"https://www.downloadsource.es/upload/News%20July%202015/Windows%2010%20iconos%20grandes/Windows%2010%20icono%20grandes%20en%20barra%20de%20tareas.png",
					alt: "Barra de tareas de windows 10"
				}
			]
		},

		notificacion: {
			id: "BarraDeNotificacion",
			titulo: "Barra de notificación",
			detalle:
				"En esta sección se muestran programas que son ejecutados automáticamente al iniciar el computador como: el reloj, el sonido y notificacions. El reloj muestra la hora y fecha actual del computador y puede ser configurado por le usuario.",
			leerMas:
				"https://support.microsoft.com/es-ec/help/30031/windows-10-customize-taskbar-notification-area",
			imgs: [
				{
					src:
						"https://www.softzone.es/app/uploads/2017/06/sinorganizar-655x215.png",
					alt: "Área de notificación de windows 10"
				}
			]
		}
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

		this.usuario = SAILS_LOCALS.usuario;
		this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
		this.navegarSiguiente =
			"/contenido-alfaweb/?enlace=" + SAILS_LOCALS.siguiente.enlace;
		this.navegarAtras =
			"/contenido-alfaweb/?enlace=" + SAILS_LOCALS.anterior.enlace;
		this.breadcrumb.push(SAILS_LOCALS.curso);
		this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
	},
	mounted: async function() {
		//…
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		infoObjeto(idObjeto) {
			if (idObjeto == "escritorio") {
				$(() => {
					$("#modalEscritorioVacio").modal("show"); //codigo de bootstrap
				});
			} else if (idObjeto == "notificacion") {
				$(() => {
					$("#modalBarraDeNotificacion").modal("show");
				});
			} else if (idObjeto == "iconos") {
				$(() => {
					$("#modalIconos").modal("show");
				});
			} else if (idObjeto == "barra_tareas") {
				$(() => {
					$("#modalBarraDeTareas").modal("show");
				});
			} else if (idObjeto == "inicio") {
				$(() => {
					$("#modalBotonDeInicio").modal("show");
				});
			} else if (idObjeto == "inicio_rapido") {
				$(() => {
					$("#modalBarraDeInicioRapido").modal("show");
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
		obtenerIndice() {
			var _this = this;
			this.$refs.curso.clickStop();
			//slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
			//slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
			$("#carouseEncendido").on("slid.bs.carousel", function() {
				this.indice = $(".indicador.active").text(); //obtiene el indice del indicador actual
				let posicion = parseInt(this.indice) - 1;

				_this.objetoSeleccionado.descripcion =
					_this.indicaciones[posicion].descripcion;
			});
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
