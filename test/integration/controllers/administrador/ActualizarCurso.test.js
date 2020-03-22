var supertest = require("supertest");

describe("POST actualizar-curso/id", () => {
	describe("#ActualizarCurso", () => {
		it("Esto debe responder el código 200=> Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.post("/actualizar-curso")
				.send({
					cursoId: "5e7668137ac00a4c80f32636",
					nombreCurso: "Curso",
					descripcionCurso: "Nueva descripcion del curso"
				})
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
