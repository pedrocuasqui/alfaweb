
parasails.registerPage('administrar-contenido', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formErrors: {},
    objetoSeleccionado: Object,
    editarNombre: false,
    editarDescripcion: false,
    // nombre:'',
    descripcionModulo: '',
    navegarAtras: {
      type: String,
      required: false,
      description: 'la ruta del modulo anterior',
    },
    navegarSiguiente: {
      type: String,
      required: false,
      description: 'la ruta del modulo siguiente',
    },
    // breadcrumb: {
    //     type: Array,
    //     required: false,
    // },
    breadcrumb: [],
    curso: {
      type: Object,
    },
    usuario: {
      type: Object,
      default: { nombre: 'Admin', rol: 'Administrador' }
    },
    mostrarSpinner: false,
    imagenTemporal: {},


    tituloEvaluacion: '',
    evIndividualBandera: false,
    // codigoTipoEvaluacion:'Cuestionario',
    // mostrarMenuTipoEvaluacion:true,
    // **********************************OPCIONES DE EVALUACION
    tipoEvaluacion: 'Cuestionario',
    preguntaEnEdicion: {
      enunciado: null,
      opciones: {
        opcion1: null,
        opcion2: null,
        opcion3: null,
        opcion4: null,
      },
      respuesta: null,
    },
    preguntasCuestionario: [],
    evaluacion: {
      tipo: '',
      preguntas: {}
    },
    formErrorsModal: {},
    modalEdicion: false,
    indicePreguntaEditar: null,
    arregloRandom: [],


    //variables para usar en Emparejamiento del lado del Estudiante
    enunciadoSeleccionado: null,
    respuestaSeleccionada: null,
    preguntaSeleccionadaJuegoEmparejamiento: null






  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
    this.curso = SAILS_LOCALS.curso;
    this.breadcrumb.push(SAILS_LOCALS.curso);


  },
  mounted: async function () {
    // $('.contenido-tiny').html(this.objetoSeleccionado.contenidoTiny);
    this.establecerContenidoTiny();
    console.log('OBJETO RECIBIDO:');
    console.log(this.objetoSeleccionado);



    $('#modalCrearPregunta' + this.tipoEvaluacion).on('hide.bs.modal', function (e) {
      this.preguntaEnEdicion = {
        enunciado: null,
        opciones: {
          opcion1: null,
          opcion2: null,
          opcion3: null,
          opcion4: null,
        },
        respuesta: null,
      }
    });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario() {
      console.log('valida formulario ');
      console.log('contenido tiny' + window.contenidoTiny);
      // Limpiar el objeto de almacenamiento de errores
      this.formErrors = {};
      //Valida que exista un nombre de modulo
      if (!this.objetoSeleccionado.nombre) {
        this.formErrors.nombre = true;
      }
      if (!this.objetoSeleccionado.descripcion) {
        this.formErrors.descripcion = true;
      }

      // if (Object.keys(this.imagenPortada).length == 0) {
      //   this.formErrors.imagenPortada = true;
      //   this.formErrors.typeFile = false;
      // } else {
      //   // Expresion regular que evalua si la imagen tiene cualquier tipo

      //   var regExpImage = new RegExp('image\.(jpg)|image\.(png)|image\.(jpeg)');

      //   if (!regExpImage.exec(this.imagenPortada.type)) {
      //     this.formErrors.typeFile = true;
      //   }
      // }

      this.objetoSeleccionado.contenidoTiny = window.contenidoTiny;
      if (!this.objetoSeleccionado.contenidoTiny) {
        this.formErrors.contenidoTiny = true;
      }
      alert('contenido tiny: ' + this.objetoSeleccionado.contenidoTiny);

      // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
      if (Object.keys(this.formErrors).length > 0) {
        alert('error, existen errores');
        console.log(this.formErrors);
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE carga la imagen, en then se carga el resto de campos

      if (this.objetoSeleccionado.nombreModulo) {//si el objeto editado es modulo,  se envia a actualiar-modulo en el servidor
        this.actualizarModulo();
        alert('actualizar modulo');
      } else if (this.objetoSeleccionado.nombreSubmodulo) {  //si el objeto editado es submodulo, se envia a actualizar-submodulo en el servidor
        alert('actualizar submodulo');
        this.actualizarSubmodulo();
      }


    },

    actualizarModulo() {
      var formData = new FormData();

      //valor quemado, establecer el verdadero valor de color 
      // this.objetoSeleccionado.color= '#529674';

      formData.append('nombreModulo', this.objetoSeleccionado.nombre);
      formData.append('descripcionModulo', this.objetoSeleccionado.descripcion);
      formData.append('contenidoTiny', window.contenidoTiny);
      formData.append('moduloId', this.objetoSeleccionado.id);
      formData.append('color', this.objetoSeleccionado.color);
      formData.append('rutaPortada', this.objetoSeleccionado.multimedia.imagen);
      // no se envia el id del curso 
      axios({
        method: 'post',
        url: '/actualizar-modulo',
        data: formData
      }
      ).then(
        (response) => {
          alert('Modificacion Exitosa');
          this.editarNombre = false;
          this.editarDescripcion = false;
        }
      ).catch((err) => {
        alert(err);
      });
    },
    actualizarSubmodulo() {
      var formData = new FormData();

      formData.append('nombreSubmodulo', this.objetoSeleccionado.nombre);
      formData.append('descripcionSubmodulo', this.objetoSeleccionado.descripcion);
      formData.append('contenidoTiny', window.contenidoTiny);
      formData.append('submoduloId', this.objetoSeleccionado.id);
      formData.append('color', this.objetoSeleccionado.color);
      // formData.append('rutaPortada',);
      // no se envia el id del curso 
      axios({
        method: 'post',
        url: '/actualizar-submodulo',
        data: formData
      }
      ).then(
        (response) => {
          alert('Modificacion Exitosa');
          this.editarNombre = false;
          this.editarDescripcion = false;
        }
      ).catch((err) => {
        alert(err);
      });
    },

    actualizarNombre() {
      //si todo sale bien ocultar la caja de texto
      this.editarNombre = false;
    },
    mostrarEditarNombre() {
      // establece la variable this.editarNombre en true para habilitar el input nombre
      this.editarNombre = true;
    },
    actualizarDescripcion() {
      this.editarDescripcion = false;
    },
    mostrarEditarDescripcion() {
      this.editarDescripcion = true;
    },
    eliminarDocumento() {
      var _this = this;
      axios.get('/eliminar-contenido', {
        params: {
          id: _this.objetoSeleccionado.id,
        }
      })
        .then(function (response) {
          console.log(response.data);
          alert('Objeto eliminado correctamente');
          if (response.data.nombreModulo) { //si el objeto eliminado es un modulo entonces se muestra la interfaz crear modulo
            window.location.replace('/view-crear-modulo/?cursoId=' + _this.curso.id);
          } else { // si el objeto eliminado es un submodulo entonces se redirge a la interfaz del modulo padre
            window.location.replace('/administrar-contenido/?objetoId=' + _this.objetoSeleccionado.modulo + '&tipoContenido=Modulo');
          }

        })
        .catch(function (error) {
          console.log('error al eliminar');
          console.log(error);
        });


    },
    establecerContenidoTiny() {
      window.contenidoTiny = null;// se establece el contenido
      window.contenidoTiny = this.objetoSeleccionado.contenidoTiny;

    },
    onFileSelected(event) {//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.

      //Añadir las propiedades del objeto seleccionado a la variable imagenPortada

      this.imagenTemporal = event.target.files[0];
      this.mostrarSpinner = true;

      this.guardarImagenPortada()

    },
    guardarImagenPortada() {
      var _this = this;
      const formData = new FormData();
      formData.append('multimedia', this.imagenTemporal, this.imagenTemporal.name);
      axios({
        method: 'post',
        url: '/cargar-imagen',
        data: formData
      })
        .then(
          (response) => {
            console.log(response.data);
            // _this.objetoSeleccionado.multimedia.imagen = response.data.location;
            setTimeout(() => {
              _this.objetoSeleccionado.multimedia.imagen = response.data.location;
              _this.mostrarSpinner = false;
            }, 7000);
          }
        )
        .catch(
          (err) => {
            console.log('Error encontrado:\n' + err);

          }
        );
    },
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividualBandera = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombre;
        this.evIndividualBandera = true;
      }
    },
    mostrarTipoEvaluacion(codigo) {

      this.tipoEvaluacion = codigo;
      // this.codigoTipoEvaluacion = codigo;
    },
    clickMostrarModalCreaPregunta() {
      let nombreModal = this.tipoEvaluacion;
      $(function () {
        $('#modalCrearPregunta' + nombreModal).modal('show');
      });
    },
    insertarPreguntaCuestionario() {

      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('ingrese enunciado');
      }
      if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
        this.formErrorsModal.opciones = true;
        alert('registre al menos dos opciones');
      }
      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('seleccione una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        this.preguntasCuestionario.push(this.preguntaEnEdicion)
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }
      };

      this.formErrorsModal = {};

    },
    actualizarPreguntaCuestionario() {
      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('ingrese enunciado');
      }
      if (this.opcionesRespuesta(this.preguntaEnEdicion).length < 2) {
        this.formErrorsModal.opciones = true;
        alert('registre al menos dos opciones');
      }
      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('seleccione una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        //actualiza el contenido del arreglo de preguntas, remueve el elemento de la  posicion del la pregunta que se edita (indicePreguntaEditar) y se coloca la nueva pregunta editada (preguntaEnEdicion).
        this.preguntasCuestionario.splice(this.indicePreguntaEditar, 1, this.preguntaEnEdicion);
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }

      };
      this.modalEdicion = false,
        this.indicePreguntaEditar = null;
      this.formErrorsModal = {};
    },
    mostrarEditarPreguntaCuestionario(preguntaSelected, indice) {
      this.indicePreguntaEditar = indice;
      this.preguntaEnEdicion = preguntaSelected;
      this.modalEdicion = true;
      $(function () {
        $('#modalCrearPregunta').modal('show');
      });
    },
    eliminarPreguntaCuestionario(preguntaSelected, indice) {
      console.log('PREGUNTA SELECTED + INDICE');
      console.log(preguntaSelected);
      console.log(indice);
      console.log(this.preguntasCuestionario);
      this.preguntasCuestionario.splice(indice, 1);
    },
    opcionesRespuesta(preguntaEnEdicion) { //Se construye una respuesta como objeto
      let opciones = [];
      let contador = 0;
      for (let opcion in preguntaEnEdicion.opciones) { //obtiene los nombres de atributos: opcion1, opcion 2 ...
        contador += 1;
        if (preguntaEnEdicion.opciones[opcion]) { //si la opcion tiene un valor dentro
          opciones.push({ texto: preguntaEnEdicion.opciones[opcion], id: contador });
        }
      }
      return opciones;
    },
    validarEvaluacion() {
      this.evaluacion.tipo = this.tipoEvaluacion;
      if (this.tipoEvaluacion == "Cuestionario" || this.tipoEvaluacion == "Emparejamiento") {
        this.evaluacion.preguntas = this.preguntasCuestionario;
      }
      this.guardarEvaluacion();

    },
    guardarEvaluacion() {
      const formDataEv = new FormData();
      formDataEv.append('objetoId', this.objetoSeleccionado.id);
      formDataEv.append('evaluacion', JSON.stringify(this.evaluacion));
      axios({
        url: '/crear-evaluacion',
        method: 'post',
        data: formDataEv
      })
        .then((response) => {
          alert('Evaluación creada correctamente')

        })
        .catch((err) => {
          alert('Error no se puedo crear la evaluación:\n' + err)
        });
    },



    //emparejamiento
    actualizarPreguntaEmparejamiento() {

    },
    insertarPreguntaEmparejamiento() {
      if (!this.preguntaEnEdicion.enunciado) {
        this.formErrorsModal.enunciado = true;
        alert('ingrese enunciado');
      }

      if (!this.preguntaEnEdicion.respuesta) {
        this.formErrorsModal.respuesta = true;
        alert('ingrese una respuesta');
      }

      if (Object.keys(this.formErrorsModal).length == 0) {
        console.log('INSERTA EN PREGUNTASCUESTIONARIO');
        console.log(this.preguntasCuestionario);
        this.preguntasCuestionario.push(this.preguntaEnEdicion)
        this.preguntaEnEdicion = {
          enunciado: null,
          opciones: {
            opcion1: null,
            opcion2: null,
            opcion3: null,
            opcion4: null,
          },
          respuesta: null,
        }

        this.randomPreguntasCuestionario(); //randomizo las opciones de respuesta
      };

      this.formErrorsModal = {};
    },
    randomPreguntasCuestionario() {
      //

      this.arregloRandom = [];

      this.preguntasCuestionario.forEach((pregunta) => {

        let posicionAleatorio = Math.floor(Math.random() * 10); //numero aleatorio entre 0 y 10(cualquier valor entero)
        let modulo = posicionAleatorio % 2;
        if (modulo == 0) {
          this.arregloRandom.unshift(pregunta);
        } else {
          this.arregloRandom.push(pregunta);
        }
      })
      console.log(this.arregloRandom);

      // return arregloRandom;
    },
    seleccionarEnunciadoEmpareja(pregunta, indexPreg) {
      this.enunciadoSeleccionado = indexPreg;
      this.preguntaSeleccionadaJuegoEmparejamiento = pregunta;
    },
    seleccionarRespuestaEmpareja(pregunta, indexResp) {
      if (pregunta.respuesta == this.preguntaSeleccionadaJuegoEmparejamiento.respuesta) {
        this.respuestaSeleccionada = indexResp;
      }
    }



  },
  computed: {
    computedErrorImagen() {
      let error = this.formErrors.imagenPortada || this.formErrors.typeFile;
      return error
    },

  }
});
