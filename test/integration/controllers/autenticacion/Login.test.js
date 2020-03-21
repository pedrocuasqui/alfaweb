var supertest = require("supertest");

describe("Autentication.login", () => {
	describe("#login()", () => {
		it("Esto debe responder el código 200 y el usuario", done => {
			supertest(sails.hooks.http.app)
				.post("/login")
				.send({ alias: "j", password: "j" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
