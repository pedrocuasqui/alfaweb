parasails.registerPage("m-7-paginas-internet", {
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

		qqcom: {
			id: "qqcom",
			titulo: "QQ.com",
			detalle:
				"El portal de servicios de Internet más grande y usado de China, propiedad de Tencent, Inc., fundado en noviembre de 1998.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		youtube: {
			id: "youtube",
			titulo: "Youtube",
			detalle:
				"Vídeos de todo tipo publicados por sus usuarios con clasificación y comentarios",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		facebook: {
			id: "facebook",
			titulo: "Facebook",
			detalle:
				"Red social que conecta a la gente, para mantenerse al tanto de amigos, subir fotos, compartir enlaces, noticias, eventos y videos.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		reddit: {
			id: "reddit",
			titulo: "Reddit",
			detalle:
				"Enlaces de noticias generados por el usuario. Los votos promueven las historias más populares a la portada.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		google: {
			id: "google",
			titulo: "Google",
			detalle:
				"Permite a sus usuarios buscar toda la información del mundo, incluidas páginas web, imágenes, noticias y vídeos. Ofrece características únicas en tecnología de búsqueda.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		wikipedia: {
			id: "wikipedia",
			titulo: "Wikipedia",
			detalle:
				"Una enciclopedia libre construida colaborativamente usando software wiki.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		yahoo: {
			id: "yahoo",
			titulo: "Yahoo",
			detalle:
				"Portal de Internet y proveedor de servicios que ofrece resultados de búsqueda, contenido personalizable, salas de chat, correo electrónico gratuito y noticias entre otros servicios.",
			leerMas: "",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		baidu: {
			id: "baidu",
			titulo: "Baidu",
			detalle:
				"Es el motor de búsqueda mas utilizado en China. Incluye búsquedas en chino de contenido multi-media (mp3 y películas).",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
				}
			]
		},
		taobao: {
			id: "taobao",
			titulo: "Taobao",
			detalle:
				"Lanzado en mayo de 2003, Taobao es el mayor marketplace onLine de China habiendo desplazado a Amazon de esta exclusiva lista de las 10 páginas web más visitadas del mundo.",
			leerMas:
				"https://1000preguntas.com/las-10-paginas-web-mas-visitadas-del-mundo-2018/",
			imgs: [
				{
					src: "",
					alt: ""
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
			if (idObjeto == "qqcom") {
				$(() => {
					$("#modalqqcom").modal("show");
				});
			} else if (idObjeto == "youtube") {
				$(() => {
					$("#modalyoutube").modal("show");
				});
			} else if (idObjeto == "facebook") {
				$(() => {
					$("#modalfacebook").modal("show");
				});
			} else if (idObjeto == "reddit") {
				$(() => {
					$("#modalreddit").modal("show");
				});
			} else if (idObjeto == "google") {
				$(() => {
					$("#modalgoogle").modal("show");
				});
			} else if (idObjeto == "wikipedia") {
				$(() => {
					$("#modalwikipedia").modal("show");
				});
			} else if (idObjeto == "yahoo") {
				$(() => {
					$("#modalyahoo").modal("show");
				});
			} else if (idObjeto == "baidu") {
				$(() => {
					$("#modalbaidu").modal("show");
				});
			} else if (idObjeto == "taobao") {
				$(() => {
					$("#modaltaobao").modal("show");
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
