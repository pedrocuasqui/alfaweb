/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {
	/***************************************************************************
	 *                                                                          *
	 * Session secret is automatically generated when your new app is created   *
	 * Replace at your own risk in production-- you will invalidate the cookies *
	 * of your users, forcing them to log in again.                             *
	 *                                                                          *
	 ***************************************************************************/
	secret: "c43a3692ca74e5da2d379cf083666115",
	rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,

	/***************************************************************************
	 *                                                                          *
	 * Customize when built-in session support will be skipped.                 *
	 *                                                                          *
	 * (Useful for performance tuning; particularly to avoid wasting cycles on  *
	 * session management when responding to simple requests for static assets, *
	 * like images or stylesheets.)                                             *
	 *                                                                          *
	 * https://sailsjs.com/config/session                                       *
	 *                                                                          *
	 ***************************************************************************/
	// isSessionDisabled: function (req){
	//   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
	// },

	// Líneas para probar en desarrollo
	adapter: "connect-mongo",
	url: "mongodb://localhost:27017/alfabetizaweb",
	ssl: false,
	collection: "sessions",
	auto_reconnect: false,
	stringify: false

	// Lineas para Produccion
	// adapter: "connect-mongo",
	// url:
	// 	"mongodb://admin:admin@alfabetizaweb-shard-00-00-cyg3m.mongodb.net:27017,alfabetizaweb-shard-00-01-cyg3m.mongodb.net:27017,alfabetizaweb-shard-00-02-cyg3m.mongodb.net:27017/alfabetizaweb",
	// ssl: true,
	// replicaSet: "alfabetizaweb-shard-0",
	// authSource: "admin",
	// collection: "sessions"
	// auto_reconnect: false,
	// stringify: false
};
