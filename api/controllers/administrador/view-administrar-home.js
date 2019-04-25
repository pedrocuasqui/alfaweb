module.exports = {


  friendlyName: 'View administrar home',


  description: 'Display "Administrar home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-home'
    }

  },


  fn: async function (input, exits) {

    var cursos = await Curso.find(); //devuelve un arreglo con los cursos encotrados
    // sails.log('id'+ cursos[0].id);
    var estudiantes = await Estudiante.find().populate('curso');//buscar los estudiantes que pertenecen a un profesor 
    // console.log(JSON.stringify(estudiantes));


    return exits.success({
      cursos,
      estudiantes
    });

  }


};
