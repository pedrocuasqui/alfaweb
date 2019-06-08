parasails.registerPage('m-7-youtube', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
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
 
    youtube: {
      id: 'youtube',
      titulo: '¿Qué es Youtube?',
      detalle: 'Es un sitio web que permite compartir videos, estos pueden ser: películas, videoclips musicales, documentales. También permite transmisiones en directo.',
      leerMas:'',
      imgs: [
  
        {
          src: 'https://3.bp.blogspot.com/-OrZ_4P_rtdw/WsOcEM7Yj1I/AAAAAAADa-4/kqBc-Zl9hQ4futahVQn1QS9vbmr9QWUoACLcBGAs/s1600/pub.gif',
          alt: 'Youtube',
        },
  
      ]
    },
    paso1: {
      id: 'paso1',
      titulo: 'Paso 1: Abrir el sitio Youtube en el navegador',
      detalle: 'Abrir una nueva pestaña en el navegador y escribir la dirección: www.youtube.com.',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y1.png',
          alt: 'Abrir youtube',
        },
  
      ]
    },
    paso2: {
      id: 'paso2',
      titulo: 'Paso 2: Página principal de Youtube',
      detalle: 'Se abre la página principal que de antemano ya nos presenta una lista de videos y varias opciones en la parte derecha e izquierda de la pantalla',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y2.png',
          alt: 'Abrir youtube',
        },
  
      ]
    },
    paso3: {
      id: 'paso3',
      titulo: 'Paso 3: Revisar videos',
      detalle: 'En la página principal de Youtube se presentan los videos que son tendencia, recomendaciones en función del número de visitas que han tenido estos videos desde que fueron subidos',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y3.png',
          alt: 'Tendencias y recomendaciones en youtube',
        },
       
  
      ]
    },
    paso4: {
      id: 'paso4',
      titulo: 'Paso 4: buscar videos',
      detalle: 'Dirigirse a la barra BUSCAR, aquí se puede escribir palabras claves del video que se busca. Mientras escribe se presentan sugerencias para el video',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y4.png',
          alt: 'buscar videos',
        },
  
      ]
    },
    paso5: {
      id: 'paso5',
      titulo: 'Paso 5: Resultados de la búsqueda',
      detalle: 'Al presionar ENTER, aparecerán los resultados de la búsqueda. ordenados por relevancia, el usuario puede hacer búsquedas personalizas en función de la fecha de subida, el tipo de video, la duración, etc.',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y5.png',
          alt: 'Resultados de la búsqueda',
        },
  
      ]
    },
    paso6: {
      id: 'paso6',
      titulo: 'Paso 6: Seleccionar un video ',
      detalle: 'Dar clic sobre el video que le interesa ',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y6.png',
          alt: 'ver video',
        },
  
      ]
    },
    paso7: {
      id: 'paso7',
      titulo: 'Paso 7: Disfrutar del video',
      detalle: 'El video se empieza a reproducir automáticamente y el usuario puede pausar, retroceder, avanzar e video a su gusto',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/youtube/y7.png',
          alt: 'Controlar la reproduccción del video',
        },
      ]
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
       if (idObjeto == 'youtube') {

        $(function () {
          $('#modalyoutube').modal('show');
        });
      }
      else if (idObjeto == 'paso1') {
        $(function () {
          $('#modalpaso1').modal('show');
        });

      } else if (idObjeto == 'paso2') {

        $(function () {
          $('#modalpaso2').modal('show');
        });
      }
    
      else if (idObjeto == 'paso3') {

        $(function () {
          $('#modalpaso3').modal('show');
        });
      }
      else if (idObjeto == 'paso4') {

        $(function () {
          $('#modalpaso4').modal('show');
        });
      }
      else if (idObjeto == 'paso5') {

        $(function () {
          $('#modalpaso5').modal('show');
        });
      }
      else if (idObjeto == 'paso6') {

        $(function () {
          $('#modalpaso6').modal('show');
        });
      }
      else if (idObjeto == 'paso7') {

        $(function () {
          $('#modalpaso7').modal('show');
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