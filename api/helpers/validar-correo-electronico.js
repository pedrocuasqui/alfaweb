/*jshint esversion:8 */
module.exports = {
	friendlyName: "Validar correo electronico",

	description:
		"Valida que el correo electrónico pasado como parámetro sea válido, es decir contenga la estructura usuario@dominio.subdomio, se lo hace con una expresion regular tomada de: https://vuejs.org/v2/cookbook/form-validation.html",

	inputs: {
		email: {
			type: "string",
			required: true
		}
	},

	exits: {},

	fn: async function(inputs) {
		// TODO
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return re.test(inputs.email);
	}
};
