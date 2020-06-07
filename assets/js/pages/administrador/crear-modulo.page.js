/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("crear-modulo", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		//…
		curso: Object,
		nombreModulo: "",
		descripcionModulo: "",
		formErrors: {},
		moduloCreado: {
			type: Object
		},
		tituloTemporal: "Agregar Nuevo Módulo",
		tipoContenido: "Modulo",
		breadcrumb: [],

		seleccionMultimedia: true,
		imagenPortada: {},
		imagenTemporal: {}, //El objeto de imagen que devuelve el elemento input
		rutaTemporal: "", //la URL que devuelve la funcion cargarImagen desde el servidor
		color: "",

		tituloEvaluacion: "",
		evIndividual: false,
		contTiny: null,

		adminCreandoModuloSubmodulo: true,
		uploadPercentage: 0,
		rutaImagenAnterior: null
		// imagensTiny: [], arreglo de imagenes que se han cargado en tiny que deben ser eliminadas
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.curso = SAILS_LOCALS.curso;
		this.breadcrumb.push(SAILS_LOCALS.curso);
		//this.moduloCreado= SAILS_LOCALS.moduloCreado;// no se remite porque en la vista_crear_modulo no se ha seleccionado un modulo
	},
	mounted: async function() {
		//se crea la variable contenidoTiny para poder guardar el contenido del textarea de contendio
		this.contTiny = window.contenidoTiny = null; // se establece el contenido
		// elimino el elemento con la clase .row.pie-contenido-central
		$(".row.pie-contenido-central").remove();
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		validarFormulario() {
			// Limpiar el objeto de almacenamiento de errores
			this.formErrors = {};
			//Valida que exista un nombre de modulo
			if (!this.nombreModulo) {
				this.formErrors.nombreModulo = true;
			}
			if (!this.descripcionModulo) {
				this.formErrors.descripcionModulo = true;
			}

			if (Object.keys(this.imagenPortada).length == 0) {
				this.formErrors.imagenPortada = true;
				this.formErrors.typeFile = false;
			} else {
				// Expresion regular que evalua si la imagen tiene cualquier tipo

				var regExpImage = new RegExp(
					".(jpg)|.(png)|.(jpeg)|.(gif)|.(JPG)|.(PNG)|.(JPEG)|.(GIF)"
				);

				if (!regExpImage.exec(this.rutaTemporal)) {
					this.formErrors.typeFile = true;
				}
			}

			if (!window.contenidoTiny) {
				this.formErrors.contenidoTiny = true;
			}

			// SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
			if (Object.keys(this.formErrors).length > 0) {
				return false;
			}
			//SI LOS VALORES INGRESADOS SON CORRECTOS SE carga la imagen, en then se carga el resto de campos
			this.enviarModulo();
		},
		onFileSelected(event) {
			//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.

			//Añadir las propiedades del objeto seleccionado a la variable imagenPortada
			if (event.target.files.length != 0) {
				// si se ha seleccionado un archivo se procede a cargar el objeto la imagen, caso contrario no se modifican los valores actuales
				this.imagenTemporal = event.target.files[0];

				//no se usa directamente URL.createObjectURL porque tinymce necesita usar url.create para mostrar las imágenes
				// this.imagenTemporal.rutaLocal = URL.createObjectURL(this.imagenTemporal);//Visualizar en el navegador la imagen seleccionada

				this.formErrors.imagenPortada = false;
				this.formErrors.typeFile = false;

				this.guardarImagenPortada();
			}
		},

		guardarImagenPortada() {
			var _this = this;
			const formData = new FormData();
			if (this.rutaImagenAnterior) {
				//si existe una rutaImagenAnterior se aniade la formulario para eliminar la ruta indicada
				formData.append("rutaImagenActual", this.rutaImagenAnterior);
			}
			formData.append(
				"multimedia",
				this.imagenTemporal,
				this.imagenTemporal.name
			);

			axios({
				method: "post",
				url: "/cargar-imagen",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data"
				},
				onUploadProgress: progressEvent => {
					this.uploadPercentage = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
				}
			})
				.then(response => {
					_this.imagenPortada = response.data;
					// $("#imagenCargadaUsuario").attr("src", response.data);
					_this.rutaTemporal = response.data.location;
					this.uploadPercentage = false;
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Oops...",
						text: `No se pudo guardar la imagen!\n ${err}`
						// footer: "<a href>Why do I have this issue?</a>",
					});
				});
		},

		enviarModulo() {
			const formData = new FormData(); //crea un objeto formData que contiene los campos enviados de un fomrulario, se crea en este caso porque no se usa las propiedades action="" ni method="" enctype="multipart/formdata" en el elemento <form> , enctype es impliscitamente declarado con este objeto
			// this.imagenPortada.urlLocal=null;
			//en primer lugar va el nombre del campo que acepta el servidor, segundo va el archivo y tecero va el nombre del archivo
			formData.append("nombreModulo", this.nombreModulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
			formData.append("descripcionModulo", this.descripcionModulo);
			formData.append("cursoId", this.curso.id);
			formData.append("contenidoTiny", window.contenidoTiny); //window.contenidoTiny se establece en el archivo layout.ejs, en el script de inicializacion de tinyMCE
			formData.append("rutaPortada", this.imagenPortada.location);
			formData.append("color", this.color);

			//   const config = {
			//     headers: { 'content-type': 'multipart/form-data' }
			// }
			axios({
				method: "post",
				url: "/crear-modulo",
				data: formData
				// config
			})
				.then(response => {
					//PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
					//pasar el objeto creado,
					// se guarda el modulo creado en el arreglo de modulos
					this.moduloCreado = response.data;

					swal({
						position: "center",
						icon: "success",
						title: "Módulo creado correctamente",
						showConfirmButton: false,
						timer: 1500
					}).then(() => {
						window.location.replace(
							"/administrar-contenido/?objetoId=" +
								this.moduloCreado.id +
								"&tipoContenido=" +
								this.tipoContenido
						);
					});

					// this.curso.modulos.push(response.data); //AUN NO SE VALIDA 23-05-2019
				})
				.catch(err => {
					//la respuesta de sails this.res
					if (err.response) {
						if (err.response.status == 409) {
							swal({
								icon: "error",
								title: "Oops...",
								text: "Ya existe un módulo con el mismo nombre o título!"
								// footer: '<a href>Why do I have this issue?</a>'
							});
						} else if (err.response.status == 400) {
							swal({
								icon: "error",
								title: "Oops...",
								text: "Existen errores en la información suministrada"
								// footer: '<a href>Why do I have this issue?</a>'
							});
						} else {
							swal({
								icon: "error",
								title: "Oops...",
								text: "Error en el servidor"
								// footer: '<a href>Why do I have this issue?</a>'
							});
						}
					} else {
						swal({
							icon: "error",
							title: "Oops...",
							text: "El servidor no está disponible en este momento"
							// footer: '<a href>Why do I have this issue?</a>'
						});
					}
				});
		},

		actualizaContTiny() {
			//para verificar que exista contenido Tiny
			this.contTiny = window.contenidoTiny;
		},
		/**
		 * Al dar click en el boton de seleccionar im'agen, se guarda la ruta de la imagen anterior,
		 * la variable this.rutaImagenAnterior se envia a la accion sails encargada de crear una imagen, evalua si la variable this.rutaImagenAnterior tienen un valor entonces procede a eliminar la imagen y a cargar la nueva
		 */
		onClickCambiarImagen() {
			if (this.rutaTemporal != "") {
				this.rutaImagenAnterior = this.rutaTemporal;
			}
		},
		onClickCancelar() {
			// this.imagensTiny = window.imagenesTemporalesTiny;
			window.location.assign("/administrar-indice/?cursoId=" + this.curso.id);
		}
	},
	computed: {
		computedErrorImagen() {
			let error = this.formErrors.imagenPortada || this.formErrors.typeFile;
			return error;
		},
		existeContenidoTiny() {
			let existeContenido = true;
			// si la variabel window.contenidoTiny es null, se evalua como falso, si window.contenidoTiny es '', tambien es falso
			// si es falso entra al else
			if (this.contTiny) {
				//|| window.contenidoTiny!=''
				existeContenido = true;
			} else {
				existeContenido = false;
			}
			return existeContenido;
		}
	}
});
