/*jshint esversion:8 */
/**
 * forbidden.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.forbidden();
 *     // -or-
 *     return res.forbidden(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'forbidden'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function forbidden(message) {
	// Get access to `req` and `res`
	var req = this.req;
	var res = this.res;
	var viewFilePath = "403";
	var statusCode = 403;

	var result = {
		status: statusCode
	};

	// Optional message
	if (message) {
		result.message = message;
	}

	// If the user-agent wants a JSON response, send json
	if (req.wantsJSON) {
		return res.json(result, result.status);
	}

	// Set status code and view locals
	res.status(result.status);
	for (var key in result) {
		res.locals[key] = result[key];
	}
	// And render view
	res.render(viewFilePath, result, err => {
		// If the view doesn't exist, or an error occured, send json
		if (err) {
			return res.json(result, result.status);
		}

		// Otherwise, serve the `views/mySpecialView.*` page
		res.render(viewFilePath);
	});
};
