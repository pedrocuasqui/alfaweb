parasails.registerPage("m-6-medios-comunicacion", {
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

		outlook: {
			id: "outlook",
			titulo: "Microsoft Outlook",
			detalle:
				"Microsoft Outlook es un gestor de información personal desarrollado por Microsoft, disponible como parte de la suite Microsoft Office. Puede ser utilizado como aplicación independiente para trabajar día y noche o con Microsoft Exchange Server para dar servicios a múltiples usuarios dentro de una organización tales como buzones compartidos, calendarios comunes, etc",
			leerMas: "https://es.wikipedia.org/wiki/Microsoft_Outlook",
			imgs: [
				{
					src: "https://i.blogs.es/375004/outlook-copia/450_1000.jpg",
					alt: "Microsoft outlook"
				}
			]
		},
		yahoo: {
			id: "yahoo",
			titulo: "Yahoo",
			detalle:
				'Yahoo! es una empresa global de medios con sede en Estados Unidos que posee un portal de Internet, un directorio web y una serie de servicios tales como el popular correo electrónico Yahoo!. Su propósito es "ser el servicio global de Internet más esencial para consumidores y negocios".',
			leerMas: "https://es.wikipedia.org/wiki/Yahoo!",
			imgs: [
				{
					src: "https://s.yimg.com/dh/ap/default/130909/y_200_a.png",
					alt: "Yahoo"
				}
			]
		},
		gmail: {
			id: "gmail",
			titulo: "Gmail",
			detalle:
				"Gmail es un servicio de correo electrónico gratuito proporcionado por la empresa estadounidense Google, Inc a partir del 1 de abril de 2004. Tras más de cinco años, el 7 de julio de 2009, el servicio de Gmail, junto con Google Calendar, Google Docs (ahora integrado en Google Drive), Hangouts y Google Buzz (cerrado), dejaron su calidad de Beta y pasaron a ser considerados productos terminados.",
			leerMas: "https://es.wikipedia.org/wiki/Gmail",
			imgs: [
				{
					src:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Gmail_Icon.svg/245px-Gmail_Icon.svg.png",
					alt: "Gmail"
				}
			]
		}
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
			if (idObjeto == "outlook") {
				$(() => {
					$("#modaloutlook").modal("show");
				});
			} else if (idObjeto == "yahoo") {
				$(() => {
					$("#modalyahoo").modal("show");
				});
			} else if (idObjeto == "gmail") {
				$(() => {
					$("#modalgmail").modal("show");
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
