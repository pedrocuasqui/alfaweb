parasails.registerPage('m-5-navegador-web', {
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

 
  edge: {
    id: 'edge',
    titulo: 'Microsoft edge',
    detalle: 'Microsoft Edge es un navegador web desarrollado por Microsoft, que se encuentra incluido en Windows 10, donde reemplazó a Internet Explorer como navegador web preestablecido.   Microsoft Edge está construido en torno a los estándares web, y Microsoft se ha comprometido a actualizar Edge para integrarlo con los nuevos y existentes estándares que aun no soporta. ',
    leerMas:'https://es.wikipedia.org/wiki/Microsoft_Edge',
    imgs: [

      {
        src: 'https://ep00.epimg.net/tecnologia/imagenes/2015/04/30/actualidad/1430352162_111015_1430352523_noticia_normal.jpg',
        alt: 'Microsoft edge',
      },

    ]
  },
  chrome: {
    id: 'chrome',
    titulo: 'Google Chrome',
    detalle: 'Google Chrome es un navegador web de software privativo o código cerrado​ desarrollado por Google, aunque derivado de proyectos de código abierto (como el motor de renderizado Blink). Está disponible gratuitamente. El nombre del navegador deriva del término en inglés usado para el marco de la interfaz gráfica de usuario',
    leerMas:'https://es.wikipedia.org/wiki/Google_Chrome',
    imgs: [

      {
        src: 'https://www.abc.es/media/tecnologia/2018/09/25/google-chrome-0-kCD--620x349@abc.jpg',
        alt: 'Google Chrome',
      },

    ]
  },
 
  firefox: {
    id: 'firefox',
    titulo: 'Mozilla Firefox',
    detalle: 'Mozilla Firefox (llamado simplemente Firefox) es un navegador web libre y de código abierto​ desarrollado para Linux, Android, iOS, macOS y Microsoft Windows coordinado por la Corporación Mozilla y la Fundación Mozilla. Usa el motor Gecko para renderizar páginas web, el cual implementa actuales y futuros estándares web.​',
    leerMas:'https://es.wikipedia.org/wiki/Mozilla_Firefox',
    imgs: [

      {
        src: 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum-high-res.cfd87a8f62ae.png',
        alt: 'Mozilla Firefox',
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
   
    if (idObjeto == 'edge') {
      $(function () {
        $('#modaledge').modal('show');
      });

    }
    else if (idObjeto == 'chrome') {
      $(function () {
        $('#modalchrome').modal('show');
      });

    }
    else if (idObjeto == 'firefox') {
      $(function () {
        $('#modalfirefox').modal('show');
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