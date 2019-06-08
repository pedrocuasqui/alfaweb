parasails.registerPage('administrar-contenido', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    formErrors:{},
    objetoSeleccionado:Object,
    editarNombre:false,
    editarDescripcion:false,
    // nombre:'',
    descripcionModulo:'',
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
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.objetoSeleccionado=SAILS_LOCALS.objetoSeleccionado;
    this.curso= SAILS_LOCALS.curso;
    this.breadcrumb.push(SAILS_LOCALS.curso);
  },
  mounted: async function() {
// $('.contenido-tiny').html(this.objetoSeleccionado.contenidoTiny);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    validarFormulario(){
      console.log('valida formulario ');
      console.log('contenido tiny' + window.contenidoTiny);
      // Limpiar el objeto de almacenamiento de errores
      this.formErrors = {};
      //Valida que exista un nombre de modulo
      if (!this.objetoSeleccionado.nombre) {
        this.formErrors.nombre = true;
      }
      if (!this.descripcionModulo) {
        this.formErrors.descripcionModulo = true;
      }
      console.log('IMAGENPORTADA EN EN VALIDACION');
      console.log(this.imagenPortada);
      if (Object.keys(this.imagenPortada).length == 0) {
        this.formErrors.imagenPortada = true;
        this.formErrors.typeFile = false;
      } else {
        // Expresion regular que evalua si la imagen tiene cualquier tipo

        var regExpImage = new RegExp('image\.(jpg)|image\.(png)|image\.(jpeg)');

        if (!regExpImage.exec(this.imagenPortada.type)) {
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
    actualizarNombre(){
      //si todo sale bien ocultar la caja de texto
      this.editarNombre= false;
    },
    mostrarEditarNombre(){
      // establece la variable this.editarNombre en true para habilitar el input nombre
      this.editarNombre= true;
    },
    actualizarDescripcion(){
this.editarDescripcion= false;
    },
    mostrarEditarDescripcion(){
this.editarDescripcion=true;
    }
  }
});
