var supertest = require("supertest");

describe("Autentication.login", () => {
	describe("#login()", () => {
		it("Esto debe responder 200 con el usuario", done => {
			supertest(sails.hooks.http.app)
				.post("/users/login")
				.send({ alias: "j", password: "test" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
