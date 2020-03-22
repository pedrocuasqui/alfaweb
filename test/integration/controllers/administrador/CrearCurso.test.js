var supertest = require("supertest");

describe("POST crear-curso", () => {
	describe("#CrearCurso - sin permiso", () => {
		it("Esto debe responder el código 403 (REdirigido), no está permitido => Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.post("/crear-curso")
				.send({
					nombreCurso: "Nombre del curso",
					descripcionCurso:
						"Esta es la descripción del curso, puede ser cualquier texto o html "
				})
				.expect(403, done);
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
	// CREA UN NUEVO CURSO CON EL USUARIO LOGUEADO
	describe("#CrearCurso - logueado", () => {
		it("Esto debe responder el código 302 (REdirigido) => Solo habilitado para usuario Admin", done => {
			agent
				.post("/crear-curso")
				.send({
					nombreCurso: "Nombre del curso",
					descripcionCurso:
						"Esta es la descripción del curso, puede ser cualquier texto o html "
				})
				.expect(302)
				.expect("location", "/administrar-home", done);
		});
	});
});
