var supertest = require("supertest");

describe("GET Puntuacion Estudiante", () => {
	describe("#Obtiene la puntuación del estudiante", () => {
		it("Esto debe responder el código 200", done => {
			supertest(sails.hooks.http.app)
				.get(
					"/puntuacion-estudiante/?cursoId='5e77ae959035c257f4df4e34'&EstudianteId='5e77ae959035c257f4df4e2d'"
				)
				.send({
					cursoId: "5e77ae959035c257f4df4e34",
					EstudianteId: "5e77ae959035c257f4df4e2d"
				})
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
