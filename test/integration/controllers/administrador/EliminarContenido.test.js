var supertest = require("supertest");

describe("GET Eliminar contenido", () => {
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

	describe("#Eliminar contenido sin permiso", () => {
		it("Esto debe responder el código 403 (Forbidden) => Se necesitan permisos de administrador", done => {
			supertest(sails.hooks.http.app)
				.get("/eliminar-contenido/?id='5e777097d4c2d2334c222efb'")
				.send({ id: "5e777097d4c2d2334c222efb" })
				.expect(403, done);
			// .expect("location", "", done);
		});
	});

	describe("#Eliminar contenido con permiso", () => {
		it("Esto debe responder el código 500, Error en el servidor  => Se necesitan permisos de administrador", done => {
			agent
				.get("/eliminar-contenido/?id='5e77ecdf598f0219340e8fbf'")
				.send({ id: "5e77ecdf598f0219340e8fbf" })
				.expect(500, done);
			// .expect("location", "", done);
		});
	});
});
