parasails.registerPage('m-1-hardware', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [],
    
    usuario:Object,
    navegarSiguiente:'',
    navegarAtras:'',
    tituloEvaluacion:'',
    evIndividual:false,
    objetoSeleccionado:'',

    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "Hardware"
    },


 
  
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario=SAILS_LOCALS.usuario;
    this.objetoSeleccionado= SAILS_LOCALS.objetoSeleccionado,
    this.navegarSiguiente=SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras=SAILS_LOCALS.anterior.enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
    this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if(contenido=='contenido'){
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      }else{
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
    },

    infoObjeto(idObjeto){
     
      if(idObjeto=='cpu'){
        $(function(){
          $('#modalCpu').modal('show');
        });

      }else if(idObjeto=='teclado'){
        $(function(){
          $('#modalTeclado').modal('show');
        });

      }else if(idObjeto=='mouse'){
        
        $(function(){
          $('#modalMouse').modal('show');
        });
      }else if(idObjeto=='monitor') {
        $(function(){
          $('#modalMonitor').modal('show');
        });
      }
      else if(idObjeto=='usb'){ //usb
        $(function(){
          $('#modalUsb').modal('show');
        });
      }
      else { //impresora
        $(function(){
          $('#modalImpresora').modal('show');
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
  computed:{
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