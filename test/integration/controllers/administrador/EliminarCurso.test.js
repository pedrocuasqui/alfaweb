var supertest = require("supertest");

describe("GET Eliminar curso", () => {
	describe("#Eliminar curso sin permiso", () => {
		it("Esto debe responder el código 403 (Forbidden)=> Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.get("/eliminar-curso/?cursoId='5e7668137ac00a4c80f32636'")
				.send({ cursoId: "5e7668137ac00a4c80f32636" })
				.expect(403, done);
			// .expect("location", "", done);
		});
	});

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
	describe("#Eliminar curso con permiso", () => {
		it("Esto debe responder el código 200 => Solo habilitado para usuario Admin", done => {
			agent
				.get("/eliminar-curso/?cursoId='5e7668137ac00a4c80f32636'")
				.send({ cursoId: "5e7668137ac00a4c80f32636" })
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
