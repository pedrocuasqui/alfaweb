var supertest = require("supertest");

describe("GET Vista Página de Inicio de Estudiante", () => {
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

	describe("#Obtiene la página de inicio - usuario estudiante", () => {
		it("Esto debe responder el código 200", done => {
			supertest(sails.hooks.http.app)
				.get("/inicio")

				.expect(200, done);
			// .expect("location", "", done);
		});
	});

	describe("#Obtiene la página de inicio - usuario administrador", () => {
		it("Esto debe responder el código 302 y redirección de ruta", done => {
			agent
				.get("/inicio")

				.expect(302)
				.expect("location", "/administrar-home", done);
		});
	});
});
