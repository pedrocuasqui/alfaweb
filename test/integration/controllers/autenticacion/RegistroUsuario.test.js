var supertest = require("supertest");

describe("POST Registro Usuario", () => {
	describe("#Registro Correcto", () => {
		it("Esto debe responder el código 200 y el usuario", done => {
			supertest(sails.hooks.http.app)
				.post("/registro-usuario")
				.send({
					nombre: "PedroCuasqui",
					alias: "PedroCuasqui",
					email: "pcuasqui@gmail.com",
					password: "j",
					rol: "administrador"
				})
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
	describe("#UsuarioYaExiste", () => {
		it("Esto debe responder el código 409 (Conflict) => No se puede duplicar el usuario", done => {
			supertest(sails.hooks.http.app)
				.post("/registro-usuario")
				.send({
					nombre: "j",
					alias: "j",
					email: "pedro.cuasqui@gmail.com",
					password: "j",
					rol: "administrador"
				})
				.expect(409, done);
			// .expect("location", "", done);
		});
	});
});
