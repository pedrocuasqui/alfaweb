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
});
