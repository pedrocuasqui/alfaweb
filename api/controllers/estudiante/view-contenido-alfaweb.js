module.exports = {


  friendlyName: 'View contenido alfaweb',


  description: 'Presenta el contenido del curso Alfabetizaweb en funcion del parametro ingresado',
  inputs: {
    enlace: {
      type: 'string',
      required: true
    },
    mostrarEvaluacion:{
      type: 'boolean',
      required: false,
      defaultsTo:false
    }

  },

  exits: {

    redirect: {
      description: 'Redirecciona a la url enviada como parametro',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs) {
    var req=this.req;
    var res= this.res;
    var usuario=null;
    var mostrarEvaluacion= inputs.mostrarEvaluacion;
    var intentoEvaluacion = { //intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
      puntos: 0,
      nivel: 0,//modulo 1
      medalla: 'bebe', //medalla mas basica
      tiempoMaximoPorPregunta: 30, //en segundos por defecto
      evaluacion: null,
    };
    var numeroSubmodulosCurso = 0; //sirve para enviar en el usuario y comprobar el porcentaje de evaluaciones realizadas de todo el curso



    var curso = await Curso.findOne({ nombre: 'Alfabetización informática' }).populate('modulos');
    let modulos = await ModuloLibro.find({ curso: curso.id }).populate('submodulos', { sort: 'createdAt ASC' });
    curso.modulos = modulos;
    curso.enlace = '/indice-estudiante/?cursoId='+curso.id;
      if (req.session.userId) {
        usuario = await Estudiante.findOne({ id: req.session.userId });
        sails.log(usuario);
        if (!usuario) {
          usuario = await Profesor.findOne({ id: req.session.userId });
        }

        if (!usuario) {
          // exits.ok({ error: `no se encuentra el usuario con id ${req.session.userId}` });
          res.status(401).send({message:'su sesión ha expirado'});
      //si el usuario no tiene pareja en la collection CursoEstudiante, registrar al curso en el usuario
        } else {
          usuario.rol = 'Estudiante'; // cualquier valor, se buscará este campo en el cliente
          let credenciales = { cursoId: curso.id, usuarioId: usuario.id }
          let avance = { enlace:inputs.enlace };         
          await sails.helpers.registrarAvanceEstudiante(credenciales, avance);//la fecha de acceso es creada dentro 
        }
      }else { //si el usuario es el usuario Visitante se remite su información
        usuario = {
          id: 1,
          nombre: 'Visitante',
          rol: 'Estudiante'
  
        }
        // var cursos = await Curso.find();
        // usuario.cursos = cursos;
      }
    // var curso = await Curso.findOne({ nombre: 'Alfabetización informática' }).populate('modulos');




    // retorno de ultimo intentoEvaluacion para mostrar la puntuacion actual
    //siempre se aniade un intento evaluacion al usuario
    usuario.ultimoIntento = intentoEvaluacion;
    usuario.numeroSubmodulosCurso = numeroSubmodulosCurso;
    usuario.submodulosAprobadosPorCurso = [];
    if (usuario.nombre != "Visitante") { //si existe un usuario logueado tipo estudiante
      //se buscan los documentos que contengan al id de usuario logueado y el curso que está siguiente en actualmente, SE BUSCA EL ULTIMO INTENTO PORQUE ESTE CONTIENE LA PUNTUACION ULTIMA
      let intentoEv = null;
      intentoEv = await IntentoEvaluacion.find({ estudiante: usuario.id, curso: curso.id }).sort('createdAt DESC');

      if (intentoEv.length > 0) {//existe el arreglo de  intentos evaluacion entonces se reemplaza el valor de usuario.ultimoIntento por el intento mas actual
        usuario.ultimoIntento = intentoEv[0]; //escogemos el elemento mas reciente porque es el que contiene la ultima puntuación del usuario

      } //caso contrario se mantiene el valor por defecto, null

      //se crea una nueva conexion al servidor para obtener los intentosEvaluacion, 1 por cada submodulo de todo el curso
      var datastoreSails = sails.getDatastore().manager;
      //buscar en intentoEvaluacion las evaluaciones en cada modulo que pertenecen al curso solicitado y que han sido aprobadas
      let ObjectId = require('mongodb').ObjectID;
      let estudianteObjectId = ObjectId(usuario.id);
      await datastoreSails.collection('IntentoEvaluacion').distinct("submodulo", { curso: curso.id, estudiante: estudianteObjectId, apruebaEvaluacion: 1 }).then(respuesta => {  //estudiante: usuario.id,
        //respuesta contiene un arreglo con el codigo de submodulo por cada intento aprobado
        respuesta.forEach(elemento => {
          usuario.submodulosAprobadosPorCurso.push(elemento.toString());
        });

      });

    }















    
    let nombreEnlace = inputs.enlace.substring(0,1)+'-'+inputs.enlace.substring(1);
    var stringVista='pages/estudiante/modulo-'+inputs.enlace.substring(1,2)+'/'+nombreEnlace;
    var siguiente = null;
    var anterior =null;
    var modulo=null;

    // EMPIEZA LA BUSQUEDA
    let objetoSeleccionado = await ModuloLibro.findOne({ enlace: inputs.enlace });

if(objetoSeleccionado){ //si el enlace corresponde a un modulo entonces retorna un objeto seleccionado
  objetoSeleccionado.submodulos = await SubmoduloLibro.find({modulo: objetoSeleccionado.id}).sort('createdAt ASC');

    siguiente = objetoSeleccionado.submodulos[0];
    if(objetoSeleccionado.nombreModulo== "Módulo 1- La computadora"){ // Es el primer modulo
      anterior = "/indice-estudiante/?usuarioId=" +usuario.id + "&cursoId=" +curso.id; //no importa si no se envia, ya esta quemado este valor en la vista m1-computadora
    }else{
      let indiceAnteriorModulo ='m'+ (parseInt(objetoSeleccionado.enlace.substring(1,2))-1).toString();
      let moduloAnteriorConSubmodulos= await ModuloLibro.findOne({enlace:{startsWith:  indiceAnteriorModulo}}).populate('submodulos',{sort:'ordenNavegacion DESC'});

      anterior = await SubmoduloLibro.findOne({id:moduloAnteriorConSubmodulos.submodulos[0].id});
    }
    
console.log("MODULO"+stringVista);
  return this.res.view(stringVista, { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado });

  
}else{ //entonces es submodulo
    objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: inputs.enlace });
    var submodulosHermanos= await SubmoduloLibro.find({modulo:objetoSeleccionado.modulo});

    if(objetoSeleccionado.ordenNavegacion==1 ){ //si es el primero de la lista 
      // anterior
      anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });//el objeto anterior es el modulo padre
      // siguiente
      siguiente = await SubmoduloLibro.findOne( //el objeto siguiente es el siguiente en el ordenNavegacion
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });

        modulo= anterior;
    } else if (objetoSeleccionado.ordenNavegacion == submodulosHermanos.length){ //es el último de los modulos
       modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      siguiente = await ModuloLibro.findOne(
        {
          where: {
            enlace: 'm2-navegacion-escritorio'
          }
        });
        let comienzoSiguiente ='m'+ (parseInt(objetoSeleccionado.enlace.substring(1,2))+1).toString();
        siguiente = await ModuloLibro.find({
          enlace: { startsWith:  comienzoSiguiente}
        });
    }
    else{
       modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
       siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
       anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      
    }
    console.log("SUBMODULO"+stringVista);
  return this.res.view(stringVista, { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo });

}


 
/* 


    if (inputs.enlace == 'm1-computadora') {
      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm1-computadora' }).populate('submodulos', { sort: 'createdAt ASC' });
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, modulo: objetoSeleccionado });
    }
    else if (inputs.enlace == 'm1-hardware') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-hardware' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
    else if (inputs.enlace == 'm1-software') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-software' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-software', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == 'm1-teclado') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-teclado' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-teclado', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == 'm1-mouse') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-mouse' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-mouse', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == 'm1-conexion-componentes') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-conexion-componentes' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-conexion-componentes', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == 'm1-encender-computadora') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm1-encender-computadora' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne(
        {
          where: {
            enlace: 'm2-navegacion-escritorio'
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-encender-computadora', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }

    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 2////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////






    else if (inputs.enlace == 'm2-navegacion-escritorio') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm2-navegacion-escritorio' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm2-aplicaciones' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm1-encender-computadora' });

      return this.res.view('pages/estudiante/modulo-2/m-2-navegacion-escritorio', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    else if (inputs.enlace == 'm2-aplicaciones') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm2-aplicaciones' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-2/m-2-aplicaciones', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
    else if (inputs.enlace == 'm2-gestion-archivos') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm2-gestion-archivos' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-2/m-2-gestion-archivos', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == 'm2-papelera') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm2-papelera' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne(
        {
          where: {
            enlace: 'm3-documento-word'
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-2/m-2-papelera', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 3////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-documento-word') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm3-documento-word' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm3-pantalla-word' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm2-papelera' });

      return this.res.view('pages/estudiante/modulo-3/m-3-documento-word', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-pantalla-word') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-pantalla-word' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-3/m-3-pantalla-word', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }   
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-area-trabajo') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-area-trabajo' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-area-trabajo', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    } 
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-barra-titulo') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-barra-titulo' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-titulo', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })

    }

    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-barra-acceso-rapido') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-barra-acceso-rapido' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-acceso-rapido', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }

// ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-barra-opciones') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-barra-opciones' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-opciones', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    // ///////////////////////////////////////////////////////////////////////////
    else if (inputs.enlace == 'm3-otras-opciones') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm3-otras-opciones' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne({enlace: 'm4-edicion-word' });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-otras-opciones', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 4////////////////////////////
    // //////////EDITAR UN DOCUMENTO WORD/////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm4-edicion-word') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm4-edicion-word' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm4-portapapeles' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm3-otras-opciones' });

      return this.res.view('pages/estudiante/modulo-4/m-4-edicion-word', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm4-portapapeles') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm4-portapapeles' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-4/m-4-portapapeles', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }   
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm4-ortografia') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm4-ortografia' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-4/m-4-ortografia', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
       // ///////////////////////////////////////////////////////
       else if (inputs.enlace == 'm4-guardar') {

        let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm4-guardar' });
        let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
        let siguiente = await SubmoduloLibro.findOne(
          {
            where: {
              ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
              modulo: objetoSeleccionado.modulo
            }
          });
        let anterior = await SubmoduloLibro.findOne(
          {
            where: {
              ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
              modulo: objetoSeleccionado.modulo
            }
          });
        return this.res.view('pages/estudiante/modulo-4/m-4-guardar', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
      }
        // ///////////////////////////////////////////////////////////////////////////
        else if (inputs.enlace == 'm4-disenio') {

          let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm4-disenio' });
          let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
          let siguiente = await ModuloLibro.findOne({enlace: 'm5-navegar-internet' });
          let anterior = await SubmoduloLibro.findOne(
            {
              where: {
                ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
                modulo: objetoSeleccionado.modulo
              }
            });
          return this.res.view('pages/estudiante/modulo-4/m-4-disenio', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
        }






    
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 5////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm5-navegar-internet') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm5-navegar-internet' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm5-direccion-web' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm4-disenio' });

      return this.res.view('pages/estudiante/modulo-5/m-5-navegar-internet', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    else if (inputs.enlace == 'm5-direccion-web') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm5-direccion-web' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-5/m-5-direccion-web', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    } 
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    else if (inputs.enlace == 'm5-nombres-dominio') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm5-nombres-dominio' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-5/m-5-nombres-dominio', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
   //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    else if (inputs.enlace == 'm5-navegador-web') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm5-navegador-web' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-5/m-5-navegador-web', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm5-motores-navegacion') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm5-motores-navegacion' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne({enlace: 'm6-medios-comunicacion' });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-5/m-5-motores-navegacion', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }



    
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 6////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////


else if (inputs.enlace == 'm6-medios-comunicacion') {

  let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm6-medios-comunicacion' });
  let siguiente = await SubmoduloLibro.findOne({ enlace: 'm6-creacion-cuenta' });
  let anterior = await SubmoduloLibro.findOne({ enlace: 'm5-motores-navegacion' });

  return this.res.view('pages/estudiante/modulo-6/m-6-medios-comunicacion', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
}
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
else if (inputs.enlace == 'm6-creacion-cuenta') {
  let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm6-creacion-cuenta' });
  let siguiente = await SubmoduloLibro.findOne(
    {
      where: {
        ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
        modulo: objetoSeleccionado.modulo
      }
    });//.sort('createdAt');
  let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
  return this.res.view('pages/estudiante/modulo-6/m-6-creacion-cuenta', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
}
   // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
else if (inputs.enlace == 'm6-envio-correo') {

  let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm6-envio-correo' });
  let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
  let siguiente = await SubmoduloLibro.findOne(
    {
      where: {
        ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
        modulo: objetoSeleccionado.modulo
      }
    });
  let anterior = await SubmoduloLibro.findOne(
    {
      where: {
        ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
        modulo: objetoSeleccionado.modulo
      }
    });
  return this.res.view('pages/estudiante/modulo-6/m-6-envio-correo', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
}

   // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm6-cuenta-skype') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm6-cuenta-skype' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-6/m-6-cuenta-skype', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
        
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm6-realizar-videollamada') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm6-realizar-videollamada' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne({enlace: 'm7-paginas-internet' });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-6/m-6-realizar-videollamada', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }

        
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 7////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm7-paginas-internet') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm7-paginas-internet' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm7-facebook' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm6-realizar-videollamada' });
    
      return this.res.view('pages/estudiante/modulo-7/m-7-paginas-internet', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
       // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm7-facebook') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm7-facebook' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-7/m-7-facebook', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
  // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == 'm7-youtube') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm7-youtube' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne({enlace: 'm8-dispositivos-moviles' });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-7/m-7-youtube', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 8////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////\



    else if (inputs.enlace == 'm8-dispositivos-moviles') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: 'm8-dispositivos-moviles' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: 'm8-configuracion-basica' });
      let anterior = await SubmoduloLibro.findOne({ enlace: 'm7-youtube' });
    
      return this.res.view('pages/estudiante/modulo-8/m-8-dispositivos-moviles', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
          // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm8-configuracion-basica') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm8-configuracion-basica' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-8/m-8-configuracion-basica', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
       // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
else if (inputs.enlace == 'm8-otras-configuraciones') {

  let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm8-otras-configuraciones' });
  let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
  let siguiente = await SubmoduloLibro.findOne(
    {
      where: {
        ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
        modulo: objetoSeleccionado.modulo
      }
    });
  let anterior = await SubmoduloLibro.findOne(
    {
      where: {
        ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
        modulo: objetoSeleccionado.modulo
      }
    });
  return this.res.view('pages/estudiante/modulo-8/m-8-otras-configuraciones', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
}
        // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////

    else if (inputs.enlace == 'm8-app-movil') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: 'm8-app-movil' });
      let siguiente = {}
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-8/m-8-instalar-app', { usuario,mostrarEvaluacion,curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }



    return this.res.ok({});
 */
  }


};




