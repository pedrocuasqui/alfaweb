module.exports = {


  friendlyName: 'View administrar contenido',


  description: 'Display "Administrar contenido" page.',

  inputs: {
    objetoId: {
      type: 'string',
      required: true,
    },
    tipoContenido: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-contenido'
    }

  },


  fn: async function (inputs, exits) {

    var objetoSeleccionado;
    var curso = Object;


    var req = this.req;
    var res = this.res;
 
    var usuario = null;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

    if (req.session.userId) {
      usuario = await Profesor.findOne({ id: req.session.userId })
      if (!usuario) {
        res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
      }

    }else{
      res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
    }



    if (inputs.tipoContenido == 'Modulo') {
      objetoSeleccionado = await ModuloLibro.findOne({ id: inputs.objetoId });
      curso = await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err) => { sails.log('ERROR EN HELPERS: ' + err) });
      //la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
      objetoSeleccionado.nombre = objetoSeleccionado.nombreModulo;
    } else if (inputs.tipoContenido == 'Submodulo') {
      // console.log('Objeto id submodulos'+inputs.objetoId);
      objetoSeleccionado = await SubmoduloLibro.findOne({ id: inputs.objetoId });
      curso = await sails.helpers.solicitarCursoCompleto(inputs.objetoId).intercept((err) => { sails.log('ERROR EN HELPERS: ' + err) });
      let moduloPadre = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      // console.log('CURSOO:'+ JSON.stringify(curso));
      //la propiedad nombre sirve para identificar indistintamente si es modulo o submodulo
      objetoSeleccionado.nombre = objetoSeleccionado.nombreSubmodulo;
      objetoSeleccionado.color = moduloPadre.color;
    } else {
      return res.status(500).send({ problema: 'no se encontró el tipo de contenido' })
    }

    if (!objetoSeleccionado) { //si no se ha encontrado un modulo o submodulo con el id entregado se devuelve un mensaje de error
      var err = new Error();
      err.name = 'objetoNoEncontrado';
      err.message = 'El objeto no se encuentra en la base de datos';
      return res.status(500).send({ error: err });
    }

    sails.log('ERROR curso: ' + JSON.stringify(curso));
    sails.log('ERROR:  objetoSeleccionado' + JSON.stringify(objetoSeleccionado));

    return exits.success({ curso, objetoSeleccionado , usuario});

  }


};
