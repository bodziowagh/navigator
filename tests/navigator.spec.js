const Navigator = require("../src/components/navigator.ts").default;
const withNavigator = require("../src/components/navigator.ts").withNavigator;
const Step = require("../src/components/step.ts").default;

describe("Navigator", () => {

    test("Should return this same instance each time", () => {
        const navigator1 = Navigator.getInstance();
        const navigator2 = Navigator.getInstance();

        expect(navigator1).toEqual(navigator2);
    });

    test("Should return a step's content from the only step of the stack", () => {
        const navigator = Navigator.getInstance();
        const step = new Step("content");

        navigator.pushStep(step);

        expect(navigator.show()).toEqual(step.show());
    });

    test("Should return a step's content from the top step of the stack", () => {
        const navigator = Navigator.getInstance();
        const step1 = new Step("content 1");
        const step2 = new Step("content 2");
        const step3 = new Step("content 3");

        navigator
            .pushStep(step1)
            .pushStep(step2)
            .pushStep(step3);

        expect(navigator.show()).toEqual(step3.show());
    });

    test("Should return previous step's content after going back", () => {
        const navigator = Navigator.getInstance();
        const step1 = new Step("content 1");
        const step2 = new Step("content 2");
        const step3 = new Step("content 3");

        navigator
            .pushStep(step1)
            .pushStep(step2)
            .pushStep(step3);

        navigator.goBack();

        expect(navigator.show()).toEqual(step2.show());
    });

    test("Should return navigator object with props to a wrapped function", () => {
        const wrapped = withNavigator(
            function(props) {
                expect(props.navigator).toEqual(Navigator.getInstance());
            }
        );

        wrapped();
    });

    test("Should get access to the current step from within a wrapped function", () => {
        const navigator = Navigator.getInstance();
        const step = new Step("content");

        navigator.pushStep(step);

        const wrapped = withNavigator(
            function(props) {
                expect(props.navigator.show()).toEqual(step.show());
            }
        );

        wrapped();
    });
});
