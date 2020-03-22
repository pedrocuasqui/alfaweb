var supertest = require("supertest");

describe("PUT publicar-curso/id", () => {
	describe("#PublicarCurso", () => {
		it("Esto debe responder el código 403, no está permitido => Solo habilitado para usuario Admin", done => {
			supertest(sails.hooks.http.app)
				.put("/publicar-curso/5e7668137ac00a4c80f32636")
				.send({ cursoId: "Nombre del curso", publicar: "true" })
				.expect(403, done);
			// .expect("location", "", done);
		});
	});
});
