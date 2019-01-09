const Step = require("../src/components/step.ts").default;

describe("Step", () => {

	test("Should create a new step, and return its content", () => {
		const content = "content";
		const step = new Step(content);

		expect(step.show()).toBe(content);
	});
});
