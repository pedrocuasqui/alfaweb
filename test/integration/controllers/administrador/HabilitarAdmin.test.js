var supertest = require("supertest");

describe("POST habilitar-admin", () => {
	describe("#Habilitar-admin", () => {
		it("Esto debe responder el código 200=> Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.post("/habilitar-admin")
				.send({ adminId: "5e7669ef59f6372a4ce62850", habilitar: "true" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
