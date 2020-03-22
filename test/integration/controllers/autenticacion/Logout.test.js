var supertest = require("supertest");

describe("Autentication.logout", () => {
	describe("#logout", () => {
		it("Esto debe responder el código 200 y redireccionar", done => {
			supertest(sails.hooks.http.app)
				.get("/logout")
				.expect(302)
				.expect("location", "/", done);
		});
	});
});
