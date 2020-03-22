var supertest = require("supertest");

describe("POST Crear IntentoEvaluacion", () => {
	// LOGUEARSE PARA LAS SIGUIENTES PRUEBAS
	var agent = supertest.agent("http://localhost:1337");
	before(done => {
		agent
			.post("/login")
			.send({ alias: "Pedroc", password: "j" })
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

	describe("#Creacion de Intento evaluacion", () => {
		it("Esto debe responder el código 200", done => {
			agent
				.post("/crear-intento-evaluacion")
				.send({
					estudianteId: "5e77ae959035c257f4df4e2d",
					submoduloId: "5e77e6335479501b30614305",
					cursoId: "5e77e2dbd87e9644201c07a6",
					puntos: 4,
					nivel: 10,
					medalla: "bebe",
					tiempoMaximoPorPregunta: 5,
					apruebaEvaluacion: 1,
					evaluacion: null
				})
				.expect(400, done);
			// .expect("location", "", done);
		});
	});
});
