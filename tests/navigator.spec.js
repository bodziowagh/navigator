const Navigator = require("../src/components/navigator.ts").default;
const withNavigator = require("../src/components/navigator.ts").withNavigator;
const Step = require("../src/components/step.ts").default;

describe("Navigator", () => {

  beforeEach(() => {
    Navigator.reset();
  });

  test("Should return this same instance each time", () => {
    const navigator1 = Navigator.getInstance();
    const navigator2 = Navigator.getInstance();

    expect(navigator1).toEqual(navigator2);
  });

  test("Should return a step's content from the only step of the stack", () => {
    const navigator = Navigator.getInstance();
    const step = new Step("content");

    navigator.go(step);

    expect(navigator.show()).toEqual(step.show());
  });

  test("Should return a step's content from the top step of the stack", () => {
    const navigator = Navigator.getInstance();
    const step1 = new Step("content 1");
    const step2 = new Step("content 2");
    const step3 = new Step("content 3");

    navigator.go(step1);
    navigator.go(step2);
    navigator.go(step3);

    expect(navigator.show()).toEqual(step3.show());
  });

  test("Should return previous step's content after going back", () => {
    const navigator = Navigator.getInstance();
    const step1 = new Step("content 1");
    const step2 = new Step("content 2");
    const step3 = new Step("content 3");

    navigator.go(step1);
    navigator.go(step2);
    navigator.go(step3);

    navigator.goBack();

    expect(navigator.show()).toEqual(step2.show());
  });

  test("Should inform if going back is possible or not", () => {
    const navigator = Navigator.getInstance();
    const step = new Step("content");

    expect(navigator.canGoBack()).toBe(false);

    navigator.go(step);

    expect(navigator.canGoBack()).toBe(true);

    navigator.goBack();

    expect(navigator.canGoBack()).toBe(false);
  });

  test("Should replace the most recent step", () => {
    const navigator = Navigator.getInstance();
    const step1 = new Step("content1");
    const step2 = new Step("content2");

    navigator.go(step1);
    navigator.go(step2);

    expect(navigator.canGoBack()).toBe(true);
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

    navigator.go(step);

    const wrapped = withNavigator(
      function(props) {
        expect(props.navigator.show()).toEqual(step.show());
      }
    );

    wrapped();
  });
});
