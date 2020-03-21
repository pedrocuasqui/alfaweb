parasails.registerPage("m-8-dispositivos-moviles", {
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

		dispositivo: {
			id: "dispositivo",
			titulo: "¿Qué es un dispositivo móvil?",
			detalle:
				"Un dispositivo móvil es una computadora de bolsillo con capacidad de procesamiento y memoria limitada, con conexión a internet y que puede realizar varias funciones. Se caracterizan por que pueden ser fáciles de transportar.",
			leerMas: "https://es.wikipedia.org/wiki/Dispositivo_m%C3%B3vil",
			imgs: [
				{
					src:
						"https://i.pinimg.com/originals/ee/b4/b3/eeb4b379791397c1094937b12d6b1c28.gif",
					alt: "Dispositivo móvil"
				}
			]
		},
		app: {
			id: "app",
			titulo: "¿Qué es una aplicación móvil?",
			detalle:
				"Una aplicación móvil es un tipo de software diseñado para dispositivos móviles que permiten al usuario realizar un conjunto de tareas de cualquier tipo como: educativas, acceso a servicios y ocio, de manera rápida sencilla y segura. ",
			leerMas: "https://es.wikipedia.org/wiki/Aplicaci%C3%B3n_m%C3%B3vil",
			imgs: [
				{
					src:
						"https://www.actualidadiphone.com/wp-content/uploads/2018/07/App-store.gif",
					alt: "Aplicación móvil"
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
			if (idObjeto == "dispositivo") {
				$(() => {
					$("#modaldispositivo").modal("show");
				});
			} else if (idObjeto == "app") {
				$(() => {
					$("#modalapp").modal("show");
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
