parasails.registerPage("m-1-software", {
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

		adobe: {
			id: "Adobe",
			titulo: "Adobe",
			detalle:
				"Adobe Acrobat es una familia de programas o aplicaciones informáticas desarrollados por Adobe Systems, diseñados para visualizar, crear y modificar archivos con el formato Portable Document Format, más conocido como PDF. El uso del formato PDF es muy común para mostrar texto con un diseño visual ordenado. \n  Algunos programas de la familia, especialmente para la creación de este tipo de archivos son comerciales; mientras que otros para la lectura de este tipo de documentos son freeware.",
			leerMas: "https://es.wikipedia.org/wiki/Adobe_Acrobat",
			imgs: [
				{
					src:
						"https://www.softzone.es/app/uploads/2015/10/Adobe-Portada1.jpg?x=634&y=309",
					alt: "Adobe "
				}
			]
		},
		eset: {
			id: "Eset",
			titulo: "Eset Antivirus",
			detalle:
				"ESET, empresa pionera en protección antivirus, nació con la creación de un multipremiado software para la detección de amenazas. \n Ahora, el objetivo de ESET es garantizar que todos puedan disfrutar de las asombrosas oportunidades que ofrece la tecnología.",
			leerMas: "https://www.eset.com/es/acerca-de-eset/",
			imgs: [
				{
					src: "https://cdn1.esetstatic.com/ESET/ES/OG_images/b2c.jpg",
					alt: "Eset"
				}
			]
		},
		linux: {
			id: "Linux",
			titulo: "GNU Linux",
			detalle:
				"GNU/Linux, también conocido informalmente como Linux, es un sistema operativo libre tipo Unix; multiplataforma, multiusuario y multitarea. El sistema es la combinación de varios proyectos, entre los cuales destacan GNU (encabezado por Richard Stallman y la Free Software Foundation) y el núcleo Linux (encabezado por Linus Torvalds). Su desarrollo es uno de los ejemplos más prominentes de software libre: todo su código fuente puede ser utilizado, modificado y redistribuido libremente por cualquiera, bajo los términos de la GPL (Licencia Pública General de GNU) y otra serie de licencias libres.1",
			leerMas: "https://es.wikipedia.org/wiki/GNU/Linux",
			imgs: [
				{
					src: "https://i.blogs.es/4137ee/linux3/450_1000.png",
					alt: "Gnu Linux"
				}
			]
		},
		kaspersky: {
			id: "Kaspersky",
			titulo: "Kaspersky",
			detalle:
				"Kaspersky es una compañía internacional dedicada a la seguridad informática con presencia en aproximadamente 200 países del mundo. Su sede central se encuentra en Moscú, Rusia, mientras que el holding está registrado en Reino Unido. Sus productos y tecnologías garantizan protección informática a más de 300 millones de usuarios y la compañía posee más de 250.000 clientes corporativos a escala internacional.",
			leerMas: "https://es.wikipedia.org/wiki/Kaspersky_Lab",
			imgs: [
				{
					src:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kaspersky_virlab.JPG/1024px-Kaspersky_virlab.JPG",
					alt: "Kaspersky"
				}
			]
		},
		debian: {
			id: "Debian",
			titulo: "Debian",
			detalle:
				"Debian es un sistema operativo (S.O.) libre, para su computadora. El sistema operativo es el conjunto de programas básicos y utilidades que hacen que funcione su computadora. Debian ofrece más que un S.O. puro; viene con 51000 paquetes, programas precompilados distribuidos en un formato que hace más fácil la instalación en su computadora.",
			leerMas: "https://www.debian.org/index.es.html",
			imgs: [
				{
					src:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Debian-OpenLogo.svg/245px-Debian-OpenLogo.svg.png",
					alt: "Debian"
				}
			]
		},
		windows: {
			id: "Windows",
			titulo: "Microsoft Windows",
			detalle:
				"Microsoft Windows es un sistema operativo, es decir, un conjunto de programas que posibilita la administración de los recursos de una computadora. Este tipo de sistemas empieza a trabajar cuando se enciende el equipo para gestionar el hardware a partir desde los niveles más básicos.",
			leerMas: "https://definicion.de/windows/",
			imgs: [
				{
					src:
						"https://as01.epimg.net/meristation/imagenes/2019/03/21/betech/1553186102_297628_1553194488_noticia_normal.jpg",
					alt: "Windows"
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
		// al cargar la página se cargan los codigos de los objetos 'g' hijos de lienzo-svg
		let objetosg = document
			.getElementById("lienzo-svg")
			.getElementsByTagName("g");
		// se añade un estilo para cada objeto "g" que permita hacer el efecto de zoom con "transform: scale (1.5,1.5)"
		for (let i = 0; i < objetosg.length; i++) {
			this.anadirEstiloObjeto(objetosg[i].getAttribute("id"));
		}
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

		//con mouseEnter no reconoce muy bien al elemento
		mouseOver(event) {
			let objetoSeleccionado = event.target.parentNode.id;
			//selecciono al objeto sobre el cual se encuentra el mouse y le doy un estilo css
			this.anadirEstiloObjeto(objetoSeleccionado);
		},
		anadirEstiloObjeto(id) {
			// funcion para añadir un estilo css al objeto con "id" pasado por parametro, al pasar el mouse sobre él en la pagina
			$("#" + id).hover(
				//funcion que se lanza "onmouseenter" --> añade estilo
				function() {
					$(this).css({
						transform: "scale(1.5,1.5)",
						"transition-duration": "500ms",
						"transform-box": "fill-box",
						"transform-origin": "center",
						"transition-timing-function": "ease-out",
						fill: "chartreuse"
					});
				},
				//funcion que se ejecuta "onmouseleave" --> vuelve a su estado original
				function() {
					$(this).css({
						transform: "scale(1,1)",
						"transition-duration": "500ms",
						"transform-box": "fill-box",
						"transform-origin": "center",
						"transition-timing-function": "ease-out",
						fill: ""
					});
				}
			);
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
			if (idObjeto == "adobe") {
				$(() => {
					$("#modalAdobe").modal("show");
				});
			} else if (idObjeto == "eset") {
				$(() => {
					$("#modalEset").modal("show");
				});
			} else if (idObjeto == "linux") {
				$(() => {
					$("#modalLinux").modal("show");
				});
			} else if (idObjeto == "kaspersky") {
				$(() => {
					$("#modalKaspersky").modal("show");
				});
			} else if (idObjeto == "debian") {
				//usb
				$(() => {
					$("#modalDebian").modal("show");
				});
			} else {
				//impresora
				$(() => {
					$("#modalWindows").modal("show");
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
			var audioMouseOver = document.getElementById("audioMouseOver");
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
