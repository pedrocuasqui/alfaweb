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
	// mailgunDomain: 'transactional-mail.example.com',
	// mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
	// stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
	// …
	// baseUrl: "http://localhost:1337",
	baseUrl: "https://git.heroku.com",
	// imageBaseUrl: "http://localhost:1337/images/uploaded/",
	imageBaseUrl: "https://git.heroku.com/images/uploaded",
	rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	correoAdministrador: "pedro.cuasqui@gmail.com"
	// rememberMeCookieMaxAge: 2*1000, // 30 days
};
