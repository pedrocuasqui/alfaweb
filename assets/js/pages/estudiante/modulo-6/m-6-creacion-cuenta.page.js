parasails.registerPage("m-6-creacion-cuenta", {
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
					"Paso 1: Para crear un correo electrónico ingresar a la url del proveedor de correo que desea usar, en este ejercicio usaremos outlook asi que escribimos: www.outlook.com, en el Navegador Web."
			},
			{
				descripcion:
					"Paso 2: Ir a la opción ¿No tiene una cuenta? y dar clic sobre Cree una. "
			},
			{
				descripcion:
					"Paso 3: Se presentará un formulario en el cual se debe proceder a ingresar los datos personales solicitados como nombre, país, etc ."
			},
			{ descripcion: "Paso 4: Ingresar nombre y apellidos. " },
			{
				descripcion:
					"Paso 5: A continuación, se ingresa nombre de usuario, y se selecciona el dominio y la extensión; Outlook le informará si el nombre de usuario esta disponible o alguien ya lo ha tomado."
			},
			{
				descripcion:
					"Paso 6: Seguidamente se procede a crear y confirmar una contraseña. Recuerde escribir una frase facil de recordar para usted pero difícil de adivinar por terceros"
			},
			{
				descripcion:
					"Paso 7:	Ingresar el país de residencia, fecha de nacimiento, y sexo"
			},
			{
				descripcion:
					"Paso 8: A continuación, ingresar el Código del país (+593 para Ecuador) , Número de Teléfono y Dirección de correo electrónico alternativo."
			},
			{
				descripcion:
					"Paso 9: Posteriormente ingresar los caracteres especificados en el Captcha. Un captcha es una forma de validar que un humano sea quién este controlando la computadora"
			},
			{
				descripcion:
					"Paso 10: Antes de finalizar el procedimiento, Microsoft envía un código mediante un mensaje de texto a su celular para comprobar la identidad de la persona."
			},
			{
				descripcion:
					"Paso 11: Ya recibido el código de seguridad, se procede a ingresar en el campo indicado y dar clic en el botón de Crear cuenta."
			},
			{
				descripcion:
					"Paso 12: Finalmente, tendremos acceso a la cuenta de correo electrónico."
			},
			{
				descripcion:
					"Paso 13: Outlook pide realizar algunas configuraciones iniciales. Configuración de idioma y zona horaria."
			},
			{
				descripcion:
					"Paso 14: Aplicar un tema personal. Un tema personal define los colores y estilos que se aplican a la interfaz del usuario"
			},
			{
				descripcion:
					"Paso 15: Agregar su firma. La firma se refiere al último texto que acompaña al correo electrónico, e identifica al emisor del correo"
			},
			{
				descripcion:
					"Paso 16: Terminada la configuración podemos observar que la cuenta de correo electrónico ya se encuentra creada y configurada correctamente para ser utilizada"
			},
			{
				descripcion:
					"Paso 17: Ingresamos a nuestra cuenta de correo electrónico. Se muestra nuestra bandeja de entrada (buzón virtual) en donde se almacenan los correos que nos han enviado "
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
			$("#carouselCuenta").on("slid.bs.carousel", function() {
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
