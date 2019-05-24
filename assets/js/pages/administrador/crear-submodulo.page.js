parasails.registerPage('crear-submodulo', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    nombreSubmodulo:'',
    descripcionSubmodulo:'',
    
    seleccionMultimedia: false,
    seleccionCarrusel: false,
    seleccionMapa: false,
    seleccionTipoAprendizaje: false,
    selectedFiles: [],
    selectedFileTooltip: '',
    selectedFileDescripcion: '',
    nuevoArchivo: {
      urlLocal: null,
    },
    indice:null,
    formErrors:{
      nombreSubmodulo:false,
      descripcionSubmodulo:false,
      multimedia: false,
      multimediaGeneral: false
    },
    moduloSeleccionado:null
    // ancho:null,
    // alto:null,
    // imagenSeleccionada:null

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.curso= SAILS_LOCALS.curso;
    this.moduloSeleccionado= SAILS_LOCALS.moduloSeleccionado
  },
  mounted: async function () {
    //…

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

  methods: {
    validarFormulario(e) {
      // solo se ejecutará cuando se pulse el botón Guardar Submodulo
      this.formErrors={};

      if(!this.nombreSubmodulo){
        this.formErrors.nombreSubmodulo= true;
      }
      if(!this.descripcionSubmodulo){
        this.formErrors.descripcionSubmodulo= true;
      }
      if(this.selectedFiles.length ==0  &&  !window.contenidoTiny){
        this.formErrors.multimediaGeneral= true;
      }

       // SI EXISTE ALGUN ERROR SE RETORNA FALSE Y LA PAGINA SE REFRESCA SIN QUE SEA PERCEPTIBLE
       if (Object.keys(this.formErrors).length > 0) {
        return false;
      }
      //SI LOS VALORES INGRESADOS SON CORRECTOS SE ENVIA AL SERVIDOR
      this.enviarSubmodulo();
    },
    enviarSubmodulo() {


      const formData = new FormData();//crea un objeto formData que contiene los campos enviados de un fomrulario, se crea en este caso porque no se usa las propiedades action="" ni method="" enctype="multipart/formdata" en el elemento <form> , enctype es implicitamente declarado con este objeto
     if(this.selectedFiles.length != 0){
      console.log(this.selectedFiles);
      console.log(this.selectedFiles[0].name);
      formData.append('multimedia', this.selectedFiles[0], this.selectedFiles[0].name);
     }
      
      //en primer lugar va el nombre del campo que acepta el servidor, segundo va el archivo y tecero va el nombre del archivo
      formData.append('nombreSubmodulo', this.nombreSubmodulo); //Se puede usar Set en lugar de append, para agregar valores, SET reemplaza el nombre del campo cuando ya existe en formData
      formData.append('descripcionSubmodulo', this.descripcionSubmodulo);
      formData.append('moduloId', this.moduloSeleccionado.id);
      formData.append('contenidoTiny', window.contenidoTiny); //window.contenidoTiny se establece en el archivo layout.ejs, en el script de inicializacion de tinyMCE
      axios({
        method: 'post',
        url: '/crear-submodulo',
        data: formData,
      })
        .then((response) => {
          console.log('corecto');
          console.log(response.data)
          //PASAR COMO PARÁMETRO AL COMPONENTE SIDE-VAR-MENU EL MODULO CREADO
          //pasar el objeto creado, 
          alert('Submodulo creado correctamente');
          $('#contenido-recibido').html(response.data.contenidoTiny);
          // window.replace('');
          // this.curso.modulos.push({ nombreModulo: this.nombreModulo, descripcion:this.descripcionModulo});
        })
        .catch((err) => { //la respuesta de sails this.res

          if (err.response.status == 409) {
            // console.log(err.response); //para ver todas las propiedades del objeto response
            alert('ya existe un submodulo con el mismo nombre');
          } else if (err.response.status == 400) {
            alert('Existen errores en la información suministrada');
            console.log(err);
          } else {
            alert('Error en el servidor');
            console.log(err);
          }
        }
        );
    },
    onSeleccionMultimedia() {
      this.seleccionMultimedia = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionCarrusel = false;
      this.seleccionMapa = false;
    },
    onSeleccionCarrusel() {
      this.seleccionCarrusel = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionMultimedia = false;
      this.seleccionMapa = false;
    },
    onSeleccionMapa() {
      this.seleccionMapa = true;
      this.seleccionTipoAprendizaje = true;
      this.seleccionCarrusel = false;
      this.seleccionMultimedia = false;
    },
    guardarArchivo() {
      this.nuevoArchivo.tooltip = this.selectedFileTooltip;
      this.nuevoArchivo.descripcion = this.selectedFileDescripcion;
      //agrego el archivo nuevo al arreglo de archivos del submodulo
      this.selectedFiles.push(this.nuevoArchivo);
      // this.selectedFiles[0].toltip='tooltip de la imagen';
      console.log(this.selectedFiles);
      console.log(this.selectedFiles[0].name);

      this.nuevoArchivo = {
        urlLocal: null,
        tooltip: '',
        descripcion: ''
      }
      this.selectedFileTooltip = '';
      this.selectedFileDescripcion = '';
    },
    onFileSelected(event) {//guarda el archivo seleccionado por el explorador de windows en un arreglo de imágenes.
      if (this.seleccionMultimedia) {
        //Si se escoge "Video,  imagen o animación" se borrará el anterior contenido de selectedFiles ya que solo se permite guardar un solo archivo en esta técnica de aprendizaje
        this.selectedFiles = [];

      }

      // console.log(event.target.files[0]);

      //Añadir las propiedades del objeto seleccionado
      this.nuevoArchivo = event.target.files[0];
      this.nuevoArchivo.urlLocal = URL.createObjectURL(event.target.files[0]);//Visualizar en el navegador la imagen seleccionada

    },
    onBorrarImagen(index) {

      if (!index) {
        //si no se envía un índice, es porque se est'a llamando a la funci'on desde el modal
        this.nuevoArchivo = {};
      } else {
        this.selectedFiles.splice(index, 1);
      }


    },
    onCambiarTecnicaAprendizaje() {
      this.seleccionTipoAprendizaje = false;
      this.seleccionMultimedia = false;
      this.seleccionCarrusel = false;
      this.seleccionMapa = false;
      // al pasar de carrusel o mapa a multimedia, solo se conservará el primer elemento del arreglo
    },
    obtenerIndice(){
      this.indice=$('.indicador.active').text();
      
    },
  ////METODOS PARA CAMBIAR EL TAMANIO DE LA IMAGEN (USADO PARA EL MAPA INTERACTIVO)
  ////Aplicar la siguiente línea al contenedor de la imagen ==> :style="{width:ancho, height:alto}"
  //   initialiseResize(urlLocal,e) {
  //     this.imagenSeleccionada=urlLocal;
  //     window.addEventListener('mousemove', this.startResizing, false);
  //     window.addEventListener('mouseup', this.stopResizing, false);
  //     console.log('se ejecuta una vez al pulsar el mouse sin soltar');
  //   },
  //   startResizing(e) {
  //     var boxPosition = $("[src='"+this.imagenSeleccionada+"']").offset();
  //     this.ancho= (e.pageX-boxPosition.left) + 'px';
  //     this.alto = (e.pageY -boxPosition.top) + 'px';
  //  },
  //  stopResizing(e) {
  //    console.log('stop resizing');
  //      window.removeEventListener('mousemove', this.startResizing, false);
  //      window.removeEventListener('mouseup', this.stopResizing, false);
  //  }
  },
  computed: {
    mapaCarrusel() {
      let valor = this.seleccionMapa || this.seleccionCarrusel;
      return valor;
    },
    ultimaUrlLocal() {
      if (this.selectedFiles.length > 0) {
        let ultimaPosicion = this.selectedFiles.length - 1;
        let file = this.selectedFiles[ultimaPosicion];
        return file.urlLocal;
      }

      return '';

    }
  },
});
