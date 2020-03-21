parasails.registerPage("m-1-computadora", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		descripcionActividad:
			"BIENVENIDO!!! \n Pasa el mouse sobre las imágenes para que puedas ver el nombre de los objetos.",
		breadcrumb: [{ nombre: "Cursos", id: 1, enlace: "/inicio" }],

		// modulo:{
		//   nombreModulo: 'Módulo 1- La computadora ',
		//   descripcion: 'La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.',
		// },
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
			default: "computador"
		},

		cpu: {
			id: "Cpu",
			titulo: "CPU (Unidad Central de Procesamiento)",
			detalle:
				"CPU son las siglas en ingles de Central Processing Unit (Unidad de Proceso Central), El CPU es el cerebro del" +
				"ordenador ya que procesa toda la información que le suministramos y nos muestra un resultado por pantalla.  En general, es la parte más importante del sistema.",
			leerMas: "https://conceptodefinicion.de/cpu/",
			imgs: [
				{
					src:
						"https://http2.mlstatic.com/cpucore-i3-8100-octava-generacion-4gb-ssd-120gb-case-halion-D_NQ_NP_955885-MPE29189916004_012019-Q.jpg",
					alt: "CPU"
				}
			]
		},
		teclado: {
			id: "Teclado",
			titulo: "Teclado",
			detalle:
				"El teclado es un instrumento externo que está representado por un conjunto de teclas, que se encargan de" +
				"ingresar una información a una computadora o dispositivo por medio de caracteres (letras, números y símbolos).",
			leerMas: "https://es.wikipedia.org/wiki/Teclado_(inform%C3%A1tica)",
			imgs: [
				{
					src:
						"https://store-images.s-microsoft.com/image/apps.45987.13510798885202450.fa37ac85-50b7-40bf-94be-f7c318f9764a.99d963b7-7b48-481e-b0a6-3d01efab7b7c?w=672&h=378&q=80&mode=letterbox&background=%23FFE4E4E4&format=jpg",
					alt: "El teclado"
				}
			]
		},
		mouse: {
			id: "Mouse",
			titulo: "Mouse",
			detalle:
				"El mouse es uno de los periféricos de entrada que forman parte de un computador, a través de él se puede" +
				"interactuar directamente con la computadora mediante un puntero (indicador) que se muestra en la pantalla.",
			leerMas: "https://es.wikipedia.org/wiki/Rat%C3%B3n_(inform%C3%A1tica) ",
			imgs: [
				{
					src:
						"https://image.slidesharecdn.com/presentationcomputeers-120213062438-phpapp02/95/presentation-computeers-8-728.jpg",
					alt: "Mouse"
				}
			]
		},
		monitor: {
			id: "Monitor",
			titulo: "Monitor",
			detalle:
				"El monitor es un dispositivo electrónico de salida de la computadora en el que se muestran las imágenes y" +
				"textos generados por medio de un adaptador gráfico o de video de ésta. El término monitor se refiere" +
				"normalmente a la pantalla de video, y su función principal y única es la de permitir al usuario interactuar" +
				" con la computadora.",
			leerMas: "https://es.wikipedia.org/wiki/Monitor_de_computadora",

			carousel: [
				{
					posicion: "1", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"El término monitor se refiere normalmente a la pantalla de video, y su función principal y única es la de permitir al usuario interactuar con la computadora mostrando datos o información al usuario.",
					imagen:
						"https://www.asus.com/media/global/products/Em0Dz3MjS9JKYM88/P_setting_fff_1_90_end_500.png",
					alt: "Monitor"
				},
				{
					posicion: "2", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Los monitores han cambiado su forma desde que fueron inventados, Inicialmente los monitores usaban un Tubo de Rayos Catódicos para proyectar la imagen en la pantalla, por tanto eran muy grandes (1981-1989). Actualmente los monitores son planos gracias a la tecnología que utilizan, ésta puede ser: plasma, LCD o LED (1990-2019). ",
					imagen: "https://aticser.files.wordpress.com/2011/06/monitor1.jpg",
					alt: "Historia de los monitores"
				},
				{
					posicion: "3", //siempre empezar en uno para poder identificar a los elementos
					detalle:
						"Las partes más importantes del monitor son: 1) Pantalla: es la zona donde se despliegan las imágenes. 2) Panel de controles: se encargan de modificar la posición de la pantalla, el brillo, etcétera. 3) Botón de encendido: prende y apaga el monitor de manera digital",
					imagen: "/images/informaticabasica/modulo1/computadora/monitor.png",
					alt: ""
				}
			]
		},
		usuario: null
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝

	created() {
		// aqui se puede ejecutar código apenas la instancia vue ha sido creada, la propiedad "el" aun no estará disponible
		// mostramos el modal
		this.mostrarModal();
	},
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);

		this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
		this.usuario = SAILS_LOCALS.usuario;
		this.navegarAtras =
			"/indice-estudiante/?usuarioId=" +
			this.usuario.id +
			"&cursoId=" +
			this.curso.id;
		this.navegarSiguiente =
			"/contenido-alfaweb/?enlace=" +
			this.objetoSeleccionado.submodulos[0].enlace;

		this.breadcrumb.push(SAILS_LOCALS.curso);
		this.breadcrumb.push(SAILS_LOCALS.modulo);
	},
	mounted: async function() {},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		mostrarModal() {
			// para verficar que el DOM está listo se puede usar: $(fn)
			// fuente: https://es.stackoverflow.com/questions/51946/cu%C3%A1l-es-la-diferencia-entre-window-onload-y-document-ready
			$(() => {
				$("#modalInicial").modal("show");
			});
		},
		infoObjeto(idObjeto) {
			/* this.$notify({
        message:
          "Welcome to <b>Vue Black Dashboard Pro</b> - a beautiful resource for every web developer",
        timeout: 30000,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: "bottom",
        verticalAlign: "right",
        type: "warning"
      }); */

			if (idObjeto == "cpu") {
				// Display an info toast with no title
				// toastr["warning"]("Are you the 6 fingered man?","titulo");

				//   $(()=>{
				//     $.amaran({content:{'message':'My first example!'}});
				// });

				$(() => {
					// $.notify("Alert!", {align:"center", verticalAlign:"top"});

					$("#modalCpu").modal("show");
				});
			} else if (idObjeto == "teclado") {
				$(() => {
					$("#modalTeclado").modal("show");
				});
			} else if (idObjeto == "mouse") {
				$(() => {
					$("#modalMouse").modal("show");
				});
			} else if (idObjeto == "monitor") {
				$(() => {
					$("#modalMonitor").modal("show");
				});
			}
		},
		mouseMovePc(event) {
			// clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"
			//

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
