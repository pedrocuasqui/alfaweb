var supertest = require("supertest");

describe("Autentication.login", () => {
	describe("#loginCorrecto", () => {
		it("Esto debe responder el código 200 y el usuario", done => {
			supertest(sails.hooks.http.app)
				.post("/login")
				.send({ alias: "j", password: "j" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
	describe("#loginErrorPassword", () => {
		it("Esto debe responder el código 409 (Conflicto)=> password erróneo", done => {
			supertest(sails.hooks.http.app)
				.post("/login")
				.send({ alias: "j", password: "4" })
				.expect(409, done);
			// .expect("location", "", done);
		});
	});
	describe("#loginErrorUsuario", () => {
		it("Esto debe responder el código 401 (Unauthorized) => El usuario no existe ", done => {
			supertest(sails.hooks.http.app)
				.post("/login")
				.send({ alias: "aliasInexistente", password: "123456789" })
				.expect(401, done);
			// .expect("location", "", done);
		});
	});
});
