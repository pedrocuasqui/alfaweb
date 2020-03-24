/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
	//  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
	//  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
	//  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

	/***************************************************************************
	 *                                                                          *
	 * Make the view located at `views/homepage.ejs` your home page.            *
	 *                                                                          *
	 * (Alternatively, remove this and add an `index.html` file in your         *
	 * `assets` directory)                                                      *
	 *                                                                          *
	 ***************************************************************************/

	/**LAYOUT GENERAL DE CONTENIDOS */
	"GET /interfaz-modulos": {
		action: "estudiante/view-interfaz-modulos"
	},
	"GET /": {
		action: "view-homepage"
	},

	"GET /inicio": {
		action: "estudiante/view-inicio"
	},
	/**AUTENTICACION */
	"GET /view-registro-usuario": {
		action: "autenticacion/view-registro-usuario"
	},
	"GET /view-actualizar-usuario": {
		action: "autenticacion/view-actualizar-usuario"
	},
	"POST /registro-usuario": {
		action: "autenticacion/registro-usuario"
	},
	"POST /actualizar-usuario": {
		action: "autenticacion/actualizar-usuario"
	},
	"GET /view-login": {
		action: "autenticacion/view-login"
	},
	"POST /login": {
		action: "autenticacion/login"
	},
	"GET /logout": {
		action: "autenticacion/logout"
	},
	"GET /confirmar-usuario": {
		action: "autenticacion/view-confirmar-usuario"
	},
	"POST /enviar-correo-recuperacion": {
		action: "autenticacion/enviar-correo-recuperacion"
	},
	"GET /clave-recuperacion-cuenta": {
		action: "autenticacion/view-clave-recuperacion-cuenta"
	},
	"POST /verificar-clave-recuperacion-cuenta": {
		action: "autenticacion/verificar-clave-recuperacion-cuenta"
	},
	"POST /actualizar-password-usuario": {
		action: "autenticacion/actualizar-password-usuario"
	},

	/* RUTAS DE ADMINISTRADOR*/

	"GET /administrar-home": {
		action: "administrador/view-administrar-home"
	},
	"GET /administrar-indice": {
		action: "administrador/view-administrar-indice"
	},
	"GET /administrar-contenido": {
		action: "administrador/view-administrar-contenido"
	},

	"GET /view-crear-curso": {
		action: "administrador/view-crear-curso"
	},

	"POST /crear-curso": {
		action: "administrador/crear-curso"
	},
	"GET /eliminar-curso": {
		action: "administrador/eliminar-curso"
	},
	"GET /view-actualizar-curso": {
		action: "administrador/view-actualizar-curso"
	},
	"POST /actualizar-curso": {
		action: "administrador/actualizar-curso"
	},
	"GET /consulta-cursos": {
		action: "administrador/consulta-cursos"
	},

	"GET /view-crear-modulo": {
		action: "administrador/view-crear-modulo"
	},
	"POST /crear-modulo": {
		action: "administrador/crear-modulo"
	},

	"GET /view-crear-submodulo": {
		action: "administrador/view-crear-submodulo"
	},
	"POST /crear-submodulo": {
		action: "administrador/crear-submodulo"
	},
	"POST /cargar-imagen": {
		action: "administrador/cargar-imagen"
	},
	"POST /actualizar-modulo": {
		action: "administrador/actualizar-modulo"
	},
	"POST /actualizar-submodulo": {
		action: "administrador/actualizar-submodulo"
	},
	"GET /eliminar-contenido": {
		action: "administrador/eliminar-contenido"
	},
	"PUT /publicar-curso/:cursoId": {
		action: "administrador/publicar-curso"
	},
	"GET /crear-evaluacion": {
		action: "administrador/view-crear-evaluacion"
	},
	"POST /crear-evaluacion": {
		action: "administrador/crear-evaluacion"
	},
	"GET /view-puntaje-estudiante": {
		action: "administrador/view-puntaje-estudiante"
	},
	"POST /habilitar-admin": {
		action: "administrador/habilitar-admin"
	},

	/** RUTAS DE ESTUDIANTE */
	// modificar las rutas cuando se complemente con los links desde el indice de administrador o estudiante
	// estudiante
	"GET /contenido-alfaweb": {
		action: "estudiante/view-contenido-alfaweb"
	},
	"GET /indice-estudiante": {
		action: "estudiante/view-indice-estudiante"
	},
	"POST /crear-intento-evaluacion": {
		action: "estudiante/crear-intento-evaluacion"
	},
	"GET /puntuacion-estudiante": {
		action: "estudiante/puntuacion-estudiante"
	},

	/***************************************************************************
	 *                                                                          *
	 * More custom routes here...                                               *
	 * (See https://sailsjs.com/config/routes for examples.)                    *
	 *                                                                          *
	 * If a request to a URL doesn't match any of the routes in this file, it   *
	 * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
	 * not match any of those, it is matched against static assets.             *
	 *                                                                          *
	 ***************************************************************************/

	//  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
	//  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
	//  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
	"GET /401-unauthorized": {
		action: "view-401-unauthorized"
	},
	//  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
	//  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
	//  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

	//  ╔╦╗╦╔═╗╔═╗
	//  ║║║║╚═╗║
	//  ╩ ╩╩╚═╝╚═╝
	/**usar funciones de redireccion */
	"GET /acerca": { view: "pages/acerca-de" }
	// ************************************
	// ************************************
	// ************* WEB SOCKETS***********
	// ************************************
	// ************************************
};
