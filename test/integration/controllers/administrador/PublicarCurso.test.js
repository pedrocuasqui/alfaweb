var supertest = require("supertest");

describe("PUT publicar-curso/id", () => {
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
	describe("#PublicarCurso sin permisos", () => {
		it("Esto debe responder el código 403, no está permitido => Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.put("/publicar-curso/5e7668137ac00a4c80f32636")
				.send({ cursoId: "Nombre del curso", publicar: "true" })
				.expect(403, done);
			// .expect("location", "", done);
		});
	});

	describe("#PublicarCurso con permisos", () => {
		it("Esto debe responder el código 403, no está permitido => Solo habilitado para usuario Admin", done => {
			agent
				.put("/publicar-curso/5e7668137ac00a4c80f32636")
				.send({ cursoId: "Nombre del curso", publicar: "true" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
