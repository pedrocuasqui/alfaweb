var supertest = require("supertest");

describe("GET Vista Indice Estudiante", () => {
	describe("#Obtiene El indice del curso seleccionado por el estudiante", () => {
		it("Esto debe responder el código 200", done => {
			supertest(sails.hooks.http.app)
				.get("/puntuacion-estudiante/?cursoId='5e79093c135bb43fc45c0de6'")
				.send({
					cursoId: "5e79093c135bb43fc45c0de6"
				})
				.expect(200, done);
			// .expect("location", "", done);
		});
	});
});
