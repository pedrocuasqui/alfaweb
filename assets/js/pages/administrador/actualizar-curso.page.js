/*jshint esversion:8 */
parasails.registerPage("actualizar-curso", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		formData: {},
		// For tracking client-side validation errors in our form.
		// > Has property set to `true` for each invalid property in `formData`.
		formErrors: {
			/* … */
		},
		curso: {}
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);

		this.curso = SAILS_LOCALS.curso;
		//establecemos los valores de formData antes de cargar la instancia de vue, de forma que no tengamos errores de validación
		this.formData.nombreCurso = SAILS_LOCALS.curso.nombre;
		// this.formData.descripcion=SAILS_LOCALS.curso.descripcion; //no es necesario añadir el valor de ""descripcion"" puesto que no es necesario para la validacion
	},
	mounted: async function() {
		//…
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		validarFormulario(e) {
			// Clear out any pre-existing error messages.
			this.formErrors = {};

			var argins = this.formData;

			// Valida nombre del curso:
			if (!argins.nombreCurso || argins.nombreCurso.trim() == "") {
				this.formErrors.nombreCurso = true;
			}

			//  si el objeto que almacena errores se encuentra vacío, entonces continuar, caso contrario no recargar la página
			if (Object.keys(this.formErrors).length == 0) {
				return true;
			} else {
				//si se encuentran errores no se recarga la página
				e.preventDefault();
			}
		}
	}
});
