/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
	/***************************************************************************
	 *                                                                          *
	 * Any other custom config this Sails app should use during development.    *
	 *                                                                          *
	 ***************************************************************************/
	//Lieneas para desarrollo
	// baseUrl: "http://localhost:1337",
	// imageBaseUrl: "http://localhost:1337/images/uploaded/",

	// lineas en produccion
	// baseUrl: "https://obscure-harbor-71757.herokuapp.com",
	// imageBaseUrl: "https://obscure-harbor-71757.herokuapp.com/images/uploaded",

	// Lineas para desarrollo y produccion
	rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	correoCuentaSmtp: "pedro.cuasqui@gmail.com"
	// rememberMeCookieMaxAge: 2*1000, // 30 days
};
