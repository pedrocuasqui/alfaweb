/* var util = require("util");

describe("User (model)", function() {
	describe("#findUsers()", function() {
		it("should return 5 users", function(done) {
			User.find({})
				.then(function(bestStudents) {
					if (bestStudents.length !== 5) {
						return done(
							new Error(
								"Should return exactly 5 students -- the students " +
									'from our test fixtures who are considered the "best".  ' +
									"But instead, got: " +
									util.inspect(bestStudents, { depth: null }) +
									""
							)
						);
					} //-•

					return done();
				})
				.catch(done);
		});
	});
});
 */
