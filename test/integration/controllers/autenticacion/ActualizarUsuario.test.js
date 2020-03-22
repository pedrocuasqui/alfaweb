var supertest = require("supertest");

describe("POST Actualizar Usuario", () => {
	// LOGUEARSE PARA LAS SIGUIENTES PRUEBAS
	var agent = supertest.agent("http://localhost:1337");
	before(done => {
		agent
			.post("/login")
			.send({ alias: "j", password: "j" })
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				done();
			});
	});

	after(done => {
		agent.get("/logout").end((err, res) => {
			if (err) {
				return done(err);
			}

			done();
		});
	});

	describe("#Actualizacion Correcta", () => {
		it("Esto debe responder el código 200 y el usuario", done => {
			agent
				.post("/actualizar-usuario")
				.send({
					usuarioId: "5e77a69cf3e2b9475c89f54c",
					nombre: "Emilio Vera1",
					alias: "j",
					email: "pedro.cuasqui@gmail.com",
					password: "j"
				})
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
