parasails.registerPage("m-7-facebook", {
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

		facebook: {
			id: "facebook",
			titulo: "¿Qué es Facebook?",
			detalle:
				"Página web donde se puede compartir información con otras personas; generalmente, amigos o familiares. Se comparte mensajes de texto, enlaces, álbumes de fotos, vídeos, etc. También es posible comentar e interactuar con las publicaciones de tus amigos.",
			leerMas: "",
			imgs: [
				{
					src:
						"https://www.tecnologia.net/wp-content/uploads/2017/05/gif-animados-facebook-downloader.gif",
					alt: "Facebook"
				}
			]
		},
		paso1: {
			id: "paso1",
			titulo: "Paso 1: Datos básicos",
			detalle:
				"Lo primero, abrir la página principal de Facebook en un navegador: www.facebook.com. Rellenar todos los datos y dar clic en Regístrate para pasar al segundo paso.",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso1.png",
					alt: "Llenar datos personales"
				}
			]
		},
		paso2: {
			id: "paso2",
			titulo: "Paso 2: Confirmación de correo electrónico",
			detalle:
				"¿Recuerdas que la cuenta de correo era importante? Ahora sabrás por qué. Facebook ha mandado un correo a tu dirección para comprobar que efectivamente te pertenece. Hasta que no lo hagas, algunas funciones no estarán disponibles.",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso2.png",
					alt: "Confirmar correo electrónico"
				}
			]
		},
		paso3: {
			id: "paso3",
			titulo: "Paso 3: Buscar amigos",
			detalle:
				"Ingresar el correo electrónico de la persona que buscas en la siguiente interfaz, y dar clic en Buscar amigos.",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso3.jpeg",
					alt: "Ingresa correo electrónico para buscar amigos"
				},
				{
					src: "/images/informaticabasica/modulo7/fb/paso3_1.jpeg",
					alt: "Dar permisos a facebook para buscar contactos en nuestro correo"
				}
			]
		},
		paso4: {
			id: "paso4",
			titulo: "Paso 4: Configuración de la privacidad",
			detalle:
				"En el siguiente paso se puede revisar un poco más sobre quién ve lo que se comparte en Facebook.      Esta información servirá para encontrar antiguos compañeros de clase o gente con la que se ha trabajado. En cualquier caso, es opcional. Dar clic en Guardar y continuar para ir al siguiente paso.      ",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso4.png",
					alt: "Configurar la privacidad"
				}
			]
		},
		paso5: {
			id: "paso5",
			titulo: "Paso 5: Subir tu foto",
			detalle:
				'Aunque no es obligatorio, es muy recomendable que personalices tu perfil, esto implica subir una foto para que las personas que vean tu perfil sepan quién eres. Si se tiene una cámara web, se puede usar para tomar una foto de tu rostro en tiempo real, para esto da clic en "Haz una foto". Si no es el caso, también se puede subir cualquier imagen que este almacenada en el computador desde la opción "Carga una foto".',
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso5.jpeg",
					alt: "Subir tu foto"
				}
			]
		},
		paso6: {
			id: "paso6",
			titulo: "Paso 6: Encontrar amigos",
			detalle:
				"Ingresar el nombre o el correo electrónico del amigo o persona que se quieres agregarle a tu lista de amigos. ",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso6.png",
					alt: "Encontrar amigos"
				}
			]
		},
		paso7: {
			id: "paso7",
			titulo: "Paso 7: Completa tu información",
			detalle:
				"Clic en tu nombre, en este caso es Prueba. Completa los datos para que Facebook pueda encontrar a personas de la misma Ciudad, Trabajo o Lugar de Estudios que quizá conoces.",
			leerMas: "",
			imgs: [
				{
					src: "/images/informaticabasica/modulo7/fb/paso7.png",
					alt: "Dar clic en el nombre"
				},
				{
					src: "/images/informaticabasica/modulo7/fb/paso8.png",
					alt:
						"Completar datos para que fb pueda encontrar a personas de la misma ciudad"
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
			if (idObjeto == "facebook") {
				$(() => {
					$("#modalfacebook").modal("show");
				});
			} else if (idObjeto == "paso1") {
				$(() => {
					$("#modalpaso1").modal("show");
				});
			} else if (idObjeto == "paso2") {
				$(() => {
					$("#modalpaso2").modal("show");
				});
			} else if (idObjeto == "paso3") {
				$(() => {
					$("#modalpaso3").modal("show");
				});
			} else if (idObjeto == "paso4") {
				$(() => {
					$("#modalpaso4").modal("show");
				});
			} else if (idObjeto == "paso5") {
				$(() => {
					$("#modalpaso5").modal("show");
				});
			} else if (idObjeto == "paso6") {
				$(() => {
					$("#modalpaso6").modal("show");
				});
			} else if (idObjeto == "paso7") {
				$(() => {
					$("#modalpaso7").modal("show");
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
