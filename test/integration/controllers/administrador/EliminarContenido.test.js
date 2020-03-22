var supertest = require("supertest");

describe("GET Eliminar contenido", () => {
	describe("#Eliminar contenido sin permiso", () => {
		it("Esto debe responder el código 403 (Forbidden) => Se necesitan permisos de administrador", done => {
			supertest(sails.hooks.http.app)
				.get("/eliminar-contenido/?id='5e777097d4c2d2334c222efb'")
				.send({ id: "5e777097d4c2d2334c222efb" })
				.expect(403, done);
			// .expect("location", "", done);
		});
	});
});
