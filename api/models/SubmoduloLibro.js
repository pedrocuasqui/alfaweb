/**
 * ModuloLibro.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
/**
 * Tipos de datos soportados en Sails
 * string
number
boolean
json
ref
 */
module.exports = {
	// datastore: 'alfabetizaweb',
	tableName: "SubmoduloLibro",
	attributes: {
		nombreSubmodulo: {
			type: "string",
			required: true,
			columnName: "nombreSubmodulo", //sirve para cuando existe una conexion a diferentes bases de datos
			//unique: true
			//defaulsTo:'', establece un valor por defecto
			//columnType: '' //define el tipo de columna del campo de la base de datos
			//allowNull: true //Los tipos de datos string, numbery boolean, no se aceptan nullcomo un valor al crear o actualizar registros.
			//isIn: ['boring', 'too many emails', 'recipes too difficult', 'other'], //la regla isIn  verifica que cualquier nuevo valor almacenado para este atributo debe coincidir exactamente con una de las pocas constantes de código diferente
		},

		descripcion: {
			type: "string",
			allowNull: true,
			columnName: "descripcion",
		},
		enlace: {
			type: "string",
			columnName: "enlace",
		},
		multimedia: {
			type: "json",
			required: false,
			columnName: "multimedia",
		},
		contenidoTiny: {
			type: "string",
			required: false,
			columnName: "contenidoTiny",
		},
		ordenNavegacion: {
			type: "Number",
			required: false,
			columnName: "ordenNavegacion",
		},
		color: {
			type: "string",
			required: false,
			columnName: "color",
		},
		evaluacion: {
			type: "json",
			required: false,
			columnName: "evaluacion",
		},

		// }
		//  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
		//  ║╣ ║║║╠╩╗║╣  ║║╚═╗
		//  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

		//  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
		//  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
		//  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
		modulo: {
			//el nombre de esta propiedad es el definido en el modulo 'Curso'--> propiedad 'moduloLibro', propiedad 'via'    un curso puede tener varios ModulosLibro curso -->ModulosLibro
			model: "modulolibro", //en minusculas
			// required: true
		},
		intentosEvaluacion: {
			//Un submodulo tiene varios intentos de evaluacion     Submodulo-->IntentosEvaluacion
			collection: "IntentoEvaluacion",
			via: "submodulo",
		},
	},
};
