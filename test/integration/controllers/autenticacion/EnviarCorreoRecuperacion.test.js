var supertest = require("supertest");

describe("POST enviar-correo-recuperacion", () => {
	describe("#Enviar-correo-recuperacion", () => {
		it("Esto debe responder el código 200", done => {
			supertest(sails.hooks.http.app)
				.post("/enviar-correo-recuperacion")
				.send({
					correoRecuperacion: "pedro.cuasqui@gmail.com"
				})
				.expect(200, done);
		});
	});
});
