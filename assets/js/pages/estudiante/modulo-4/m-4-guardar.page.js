parasails.registerPage('m-4-guardar', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data:{
    breadcrumb: [],
  
      usuario: Object,
      navegarSiguiente: '',
      navegarAtras: '',
      tituloEvaluacion: '',
      evIndividual: false,
      objetoSeleccionado: '',
  
      mouseX: 0,
      mouseY: 0,
      mostrarToolTip: false,
      textoToolTip: {
        type: String,
        default: "software"
      },
  
      /// /images/word/revisar/0.png
      guardar: {
        id: 'guardar',
        titulo: 'Guardar documento',
        detalle: 'Para guardar el documento: ',
        leerMas:'',
       
        html:''+
        
'<h5>1.	Terminar de escribir el documento.</h5>'+
'<img src="/images/word/guardar_imprimir/1.png" alt="Terminar de redactar el documento">'+
'<h5>2.	Se puede guardar un documento de 3 maneras diferentes: </h5>'+
'<p>a)	En la parte superior de la pantalla de windows con el icono en forma de disquete</p>'+
'<img src="/images/word/guardar_imprimir/2.png" alt="Botón guardar">'+
'<p>Dar clic izquierdo en el ícono disquete y aparecerá la siguiente interfaz, que pide el nombre del documento a guardar.</p>'+
'<img src="/images/word/guardar_imprimir/3.png" alt="Seleccionar la ruta para guardar el documento">'+
'<p>b)	Utilizando en acceso desde “Archivo”</p>'+
'<img src="/images/word/guardar_imprimir/4.png" alt="Opción archivo">'+
'<img src="/images/word/guardar_imprimir/5.png" alt="Seleccionar la ruta para guardar el documento">'+
'<p>c)	Utilizando conmandos del teclado</p>'+
'<img src="/images/word/guardar_imprimir/6.png" alt="Atajo de teclado para guardar un documento "></img>'
      },
      imprimir: {
        id: 'imprimir',
        titulo: 'Imprimir documento',
        detalle: 'Para imprimir un documento:',
        leerMas:'',
       
        html:''+
'<h5>1. Terminar de escribir el documento</h5>'+
'<img src="/images/word/guardar_imprimir/7.png" alt="Terminar de redactar">'+
'<h5>2. Podemos imprimir un documento de 2 maneras diferentes:</h5>'+
'<p>a)	Clic en Archivo</p>'+
'<img src="/images/word/guardar_imprimir/8.png" alt="Clic en archivo">'+
'<p>Luego aparecerá la siguiente interfaz que permite la impresión del documento, eligiendo en primer lugar ciertas características a tomar en cuenta para el documento:</p>'+
'<img src="/images/word/guardar_imprimir/9.png" alt="Opciones de impresión">'+
'<p>b)	Utilizando conmandos del teclado</p>'+
'<img src="/images/word/guardar_imprimir/10.png" alt="Atajo de teclado para imprimir un documento">'+
'<p>A continuación, se muestra la siguiente interfaz que permite trabajar la configuración del documento:</p>'+
'<img src="/images/word/guardar_imprimir/11.png" alt="Opciones de impresión">'
      },
      
      
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function () {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
  
      this.usuario = SAILS_LOCALS.usuario;
      this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado,
      this.navegarSiguiente = SAILS_LOCALS.siguiente.enlace;
      this.navegarAtras = SAILS_LOCALS.anterior.enlace;
      this.breadcrumb.push(SAILS_LOCALS.curso);
      this.breadcrumb.push(SAILS_LOCALS.modulo);
      this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
    },
    mounted: async function () {
      //…
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
        if (contenido == 'contenido') {
          this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
          this.evIndividual = false;
        } else {
          this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
          this.evIndividual = true;
        }
      },
  
      infoObjeto(idObjeto) {
        if (idObjeto == 'guardar') {
          $(function () {
            $('#modalguardar').modal('show');
          });
  
        }  
        else if (idObjeto == 'imprimir') {
          $(function () {
            $('#modalimprimir').modal('show');
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
      mouseOutPc(evet) {
        this.mostrarToolTip = false;
      },
    },
    computed: {
      styleToolTip() {
        // translate define cuanto se moverá el objeto a partir de su posicion original
        // funciona solo con comillas dobles
        //{ transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
        let estilo = {
          top: this.mouseY + 'px',
          left: this.mouseX + 'px'
        }
        return estilo;
      }
    }
  });
  