/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

    //ELIMINAR LOS SUBMODULOS QUE NO PERTENECEN A NINGUN MODULO
    var submodulos = await SubmoduloLibro.find({})
    if (submodulos) {
      for (let contador = 0; contador < submodulos.length; contador++) {
        let modulo = await ModuloLibro.findOne({ id: submodulos[contador].modulo })
        if (!modulo) {
          
          let SubmoduloEliminado = await SubmoduloLibro.destroyOne({ id: submodulos[contador].id });
          console.log('SUBMODULO ELIMINADO');
          console.log(SubmoduloEliminado);
        }
      }
    }
    // else{
    //   //si no existe ningun submodulo quiere decir que se han borrado, entonces deben volverse a crear
    //   //se borra el curso alfabetizacion para que se vuelva a crear todo
    //   var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetizacion informática'});
    // }
  



  var cursoCreado;
  //ELIMINAR MODULOS QUE NO PERTENENCEN A NINGUN CURSO
  var modulos = await ModuloLibro.find({})
  if (modulos) {
    for (let contador = 0; contador < modulos.length; contador++) {
      let curso = await Curso.findOne({ id: modulos[contador].curso })
      if (!curso) {
        
        let sulbmodulosEliminados=await SubmoduloLibro.destroy({modulo:modulos[contador].id}).fetch();
        console.log('SUBMODULOs ELIMINADOs');
        sulbmodulosEliminados.forEach(element => {
          console.log(element);  
        });
        
        let moduloEliminado = await ModuloLibro.destroyOne({ id: modulos[contador].id });
        console.log('MODULO ELIMINADO');
        console.log(moduloEliminado);
      }
    }
  }
  // else{
    
  //   //si no existe ningun MODULO quiere decir que se han borrado, entonces deben volverse a crear
  //   //se borra el curso alfabetizacion para que se vuelva a crear todo
  //   // var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetizacion informática'});
  // }



//PARA QUE SE EJECUTE EL RESTO DE CODIGO, ELIMINAR EL CURSO DE NOMBRE: Alfabetizacion informática EN LA BASE DE DATOS
var cursoAlfa= await Curso.findOne({nombre:'Alfabetizacion informática'});
  if (!cursoAlfa) {

    cursoCreado = await Curso.create(
      {
        nombre: 'Alfabetizacion informática',
        descripcion: 'Enseñanza de informática básica',


      }
    ).fetch();

    var moduloCreado;
   

    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 1- La computadora ',
      descripcion: 'La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.',
      enlace: '/m1-computadora',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Hardware',
        descripcion: 'El Hardware se define principalmente como el conjunto de componentes y dispositivos físicos y tangibles que integran una computadora. ',
        enlace:'/m1-hardware',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar </p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'El Teclado',
        descripcion: 'El teclado es un instrumento externo que está representado por un conjunto de teclas, que se encargan de ingresar una información a una computadora o dispositivo por medio de caracteres (letras, números y símbolos).',
        enlace:'/m1-teclado',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      {
        nombreSubmodulo: 'Mouse',
        descripcion: 'El mouse es uno de los periféricos de entrada que forman parte de un computador, a través de él se puede interactuar directamente con la computadora mediante un puntero (indicador) que se muestra en la pantalla. ',
        enlace:'/m1-mouse',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:3
      },
  
      {
        nombreSubmodulo: 'Software',
        descripcion: 'El software es un conjunto de números binarios (bits), que tiene algún sentido para la computadora, y es almacenado en algún soporte físico (hardware), desde donde el procesador puede acceder, para ejecutarlo o mostrarlo. ',
        enlace:'/m1-software',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:4
      },
      {
        nombreSubmodulo: 'Conexión de los componentes a la computadora',
        descripcion: 'La forma en que el hardware opera es por medio de energía, el hardware externo se conecta a la computadora por medio de cables o inalambricamente, en este módulo aprenderás a conectar los principales componentes a la computadora',
        enlace:'/m1-conexion-componentes',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:5
      },
      {
        nombreSubmodulo: 'Encender y apagar la computadora',
        descripcion: 'En este módulo aprenderás a encender y apagar la computadora ',
        enlace:'/m1-encender-computadora',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:6
      },
      

    ]);

    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 2- Navegacion en escritorio',
      descripcion: 'En este módulo aprenderás a reconocer las partes del escritorio de la computadora y de forma básica aprender a usar sus aplicaciones.',
      enlace: '/m2-navegacion-escritorio',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();

    await SubmoduloLibro.createEach([
 
      {
        nombreSubmodulo: 'Aplicaciones informáticas',
        descripcion: 'Una aplicación informática es un software que les posibilita a los usuarios interesados en la tecnología realizar diferentes tipos de trabajos a través de este. Como por ejemplo podemos mencionar los diferentes procesadores de textos, las hojas de cálculos entre otros. ',
        enlace:'/m2-aplicaciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Gestión de archivos',
        descripcion: 'Un archivo o fichero informático es un conjunto de bits almacenados en un dispositivo. Un archivo es identificado por un nombre y la descripción de la carpeta o directorio que lo contiene. A los archivos informáticos se les llama así porque son los equivalentes digitales de los archivos escritos en expedientes, tarjetas, libretas, papel o microfichas del entorno de oficina tradicional.',
        enlace:'/m2-gestion-archivos',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      {
        nombreSubmodulo: 'La papelera de reciclaje',
        descripcion: 'La Papelera de reciclaje es el lugar donde se almacena la información que fue eliminada. Permite la recuperación de información que fue eliminada por equivocación.',
        enlace:'/m2-papelera',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:3
      },
     
    
  
  
    ])





    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 3- Documento Word',
      descripcion: 'En este módulo aprenderás las partes principales de la ventana de word',
      enlace: '/m3-documento-word',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Pantalla principal de word',
        descripcion: 'La pantalla principal del editor de texto Microsoft word presenta varias opciones para editar el contenido del documento',
        enlace:'/m3-pantalla-word',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Área de trabajo',
        descripcion: 'Situada en la parte central, muestra el documento que estamos editando.',
        enlace:'/m3-area-trabajo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      {
        nombreSubmodulo: 'Barra de título',
        descripcion: 'Situada en el extremo superior. En ella aparecerá el título de nuestro trabajo que, en un principio, será denominado “Documento 1”, pero que al guardar podemos renombrar asignándole el título que consideremos oportuno',
        enlace:'/m3-barra-titulo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:3
      },
      {
        nombreSubmodulo: 'Barra de herramientas de acceso rápido',
        descripcion: 'Nos da acceso a determinadas acciones que forman parte de los diferentes elementos de menú, pero que se encuentran disponibles de forma directa a partir de esta barra, por ser las más usuales.',
        enlace:'/m3-barra-acceso-rapido',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:4,
      },
      {
        nombreSubmodulo: 'Barra o cinta de opciones',
        descripcion: 'Esta barra de herramientas es la más importante, ya que contiene todas las acciones para trabajar sobre nuestro documento. Se compone de una serie de pestañas con sus correspondientes comandos, situados en la parte inferior.',
        enlace:'/m3-barra-opciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:5
      },
      {
        nombreSubmodulo: 'Iniciar sesión',
        descripcion: 'A la derecha de la cinta de opciones o barra de herramientas encontramos el botón que nos permite registrarnos y darnos de alta para Iniciar la sesión con nuestro usuario, y la posibilidad de Compartir nuestro documento en la nube con otros usuarios en tiempo real, a través de OneDrive.',
        enlace:'/m3-iniciar-sesion',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:6
      },
      {
        nombreSubmodulo: 'Barra de estado',
        descripcion: ' Situada en la parte inferior, es la que nos informa sobre el estado de nuestro documento: cuántas palabras hemos escrito, en qué página estamos. Además, nos da acceso a la revisión ortográfica y gramatical, a diferentes vistas del documento o al zoom ',
        enlace:'/m3-barra-estado',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:7
      },

      {
        nombreSubmodulo: 'Barra de desplazamiento',
        descripcion: 'Situada en el lateral derecho, nos permite movernos por todo el documento y por sus distintas páginas, según las vayamos incorporando. ',
        enlace:'/m3-barra-desplazamiento',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:8
      }
      ]);





    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 4-Edición de documentos Word',
      descripcion: 'En este módulo aprenderás como editar un documento de word con ejemplos',
      enlace: '/m4-edicion-word',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Redactar un documento',
        descripcion: 'Para redactar un documento primero se debe abrir la aplicación MICROSOFT WORD, después y por medio del teclado se insertan letra a letra las oraciones que queremos guardar ',
        enlace:'/m4-redactar-documento',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      // {
      //   nombreSubmodulo: '',
      //   descripcion: '',
      //   enlace:'',
      //   multimedia: {},
      //   contenidoTiny: '<p>Pulse para editar</p>',
      //   modulo: moduloCreado.id,
      // }
      ]);






//El modulo 5 puede estar dentro del modulo 4
    // moduloCreado = await ModuloLibro.create({
    //   nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
    //   descripcion: 'descripcion Modulo 5',
    //   enlace: '/m5-insercion-imagenes',
    //   multimedia: {},
    //   curso: cursoCreado.id,
    //   contenidoTiny: '<p>Pulse para editar</p>',
    // }).fetch();
    // await SubmoduloLibro.createEach([
    //   {
    //     nombreSubmodulo: '',
    //     descripcion: '',
    //     enlace:'',
    //     multimedia: {},
    //     contenidoTiny: '<p>Pulse para editar</p>',
    //     modulo: moduloCreado.id,
    //   }
    //   ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 5 - Navegar en Internet',
      descripcion: 'En este módulo aprenderás a navegar por internet en una computadora',
      enlace: '/m6-navegar-internet',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Dirección web',
        descripcion: 'La Web es un nuevo mundo donde se encuentran varios sitios web, unos más conocidos que otros, pero todos tienen una dirección única, que permite su acceso desde un navegador. ',
        enlace:'/m5-direccion-web',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Nombres de dominio',
        descripcion: 'Un nombre de dominio es la "dirección en la red" que posee una página web determinada. Ejemplo, www.clomputech.com.',
        enlace:'/m5-nombres-dominio',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      {
        nombreSubmodulo: 'Navegador web',
        descripcion: 'Un navegador web es la herramienta de software que nos permite acceder a información de internet, los más conocidos son: Google Chrome, Mozilla firefox y Microsoft Edge ',
        enlace:'/m5-navegador-web',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:3
      },
      {
        nombreSubmodulo: 'Motores de navegación',
        descripcion: 'Un MOTOR DE BÚSQUEDA, también conocido como "buscador", es un sistema informático que busca archivos almacenados en servidores web',
        enlace:'/m5-motores-navegacion',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:4
      }
      
      ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 6 - Correo Electrónico y Skype',
      descripcion: 'En este módulo aprenderás a usar medios de comunicación en línea principalmente lo referente a correo electrónico y videollamadas',
      enlace: '/m6-medios-comunicacion',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Creación de una cuenta de correo electónico',
        descripcion: 'Correo electrónico es un servicio electrónico mediante el cual se puede enviar y recibir mensaje de manera instantánea mediante Internet.',
        enlace:'/m6-creacion-cuenta',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Envío de correo electrónico',
        descripcion: 'El envío de correo electrónico se refiere a la acción de redactar el texto a enviar y establecer los parámetros de un destinatario',
        enlace:'/m6-envio-correo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      {
        nombreSubmodulo: 'Creación de una cuenta SKYPE',
        descripcion: 'Skype es un servicio que permite realizar intercambio de texto, voz y video, con la finalidad de comunicar a dos o más usuarios por medio de Internet.',
        enlace:'/m6-cuenta-skype',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:3
      },
      {
        nombreSubmodulo: 'Realizar videollamadas',
        descripcion: 'Una videollamada es una forma de comunicación por internet que permite ver, oir y hablar al receptor en tiempo real',
        enlace:'/m6-realizar-videollamada',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:4
      }
     
      ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 7 - Páginas de Internet',
      descripcion: 'Una Página Web es conocida como un documento de tipo electrónico, contiene información digital, la cual puede venir dada por datos visuales y/o sonoros, o una mezcla de ambos, a través de textos, imágenes, gráficos, audio o vídeos y otros tantos elementos dinámicos o estáticos.',
      enlace: '/m8-paginas-internet',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Como usar Facebook',
        descripcion: 'Facebook es lo que se denomina RED SOCIAL y permite compartir información con otras personas; generalmente, amigos o familiares. Se comparte mensajes de texto, enlaces, álbumes de fotos, vídeos, etc. También es posible comentar e interactuar con las publicaciones de tus amigos',
        enlace:'/m7-facebook',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Como usar Youtube',
        descripcion: 'Youtube Es un sitio web que permite compartir videos, estos pueden ser: películas, videoclips musicales, documentales o transmisiones en directo.',
        enlace:'/m7-youtube',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      },
      
      ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 8. Dispositivos Móviles',
      descripcion: 'Un dispositivo móvil es una computadora de bolsillo con memoria limitada y que permite la conexión a internet de forma inalámbrica. Se caracterizan por que pueden ser fáciles de transportar y permiten ejecutar varias aplicaciones.',
      enlace: '/m9-dispositivos-moviles',
      multimedia: {},
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Configuraciones básicas',
        descripcion: 'Los dispositivos móviles de paquete vienes con configuraciones básicas predeterminadas para su funcionamiento pero se permite al usuario personalizar ciertas caracteristicas del mismo para su mejor uso, estas características pueden ser: fondo de pantalla, cuenta de correo electrónico personal, etc.',
        enlace:'/m8-configuracion-basica',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:1
      },
      {
        nombreSubmodulo: 'Instalación de una app(aplicación)',
        descripcion: 'Una app es una aplicación informática diseñada para ser ejecutada en teléfonos inteligentes, tabletas y otros dispositivos móviles. En internet existen varias aplicaciones de software que permiten al dispositivo móvil ejecutar nuevas tareas',
        enlace:'/m8-app-movil',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion:2
      }
      ]);


    sails.log('creacion de curso y modulos correcta!');

  }

  
  var cursos = await Curso.find({});
  var curso = cursos[0];
  
  if (await Estudiante.count() == 0 && Object.keys(curso).length > 0) {
    await Estudiante.create(
      {
        nombre: 'Pedro Cuasqui',
        alias: 'Pedroc',
        email: 'pedro.cuasqui@gmail.com',
        password: '$2y$05$WuVNU5BVtpYDLeiN9kZdkOTYRlmf9wQe42JPbkcfneOlsvJe1ZRnS',
        ultimoAcceso: '2019-05-20',
        cursos: curso.id
      });

    await Estudiante.create({
      nombre: 'Elsa Pito',
      alias: 'esita',
      email: 'elsa.pita@gmail.com',
      password: '$2y$05$WuVNU5BVtpYDLeiN9kZdkOTYRlmf9wQe42JPbkcfneOlsvJe1ZRnS',
      ultimoAcceso: '2019-04-20',
      cursos: curso.id
    });

    sails.log('creacion de estudiante correcta!');
  }




  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  // intento numero uno por importar un componente de vue : fallido
  // sails.vuesidebarmenu = require('vue-sidebar-menu');
  return done();

};
