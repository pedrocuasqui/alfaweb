/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerPage("inicio", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		// nombreUsuario: 'Pedro',
		usuario: {
			nombre: "Visitante",
			rol: "Estudiante",
			id: "1"
		},
		breadcrumb: [{ nombre: "Cursos", id: 1, enlace: "/inicio" }] //se envia un nombre vacio para evaluar si es o no un breadcrumb valido y  segun eso mostrar o no el bredadcrumb
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		if (SAILS_LOCALS.usuario) {
			this.usuario = SAILS_LOCALS.usuario;
		}
	},
	mounted: async function() {
		//…
		introJs().addHints();
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		redireccionar() {},
		abrirCurso(cursoId) {
			if (this.usuario) {
				if (this.usuario.administrador || this.usuario.tutor) {
					window.location.href = "/administrar-indice/?cursoId=" + cursoId;
				}
			}

			//else implicito
			window.location.href = "/indice-estudiante/?cursoId=" + cursoId;
		}
	},
	computed: {}
});
