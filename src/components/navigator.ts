import Step from "./step";

export default class Navigator {

  private static instance: Navigator;

	// Returns, or creates if not present, the singleton's instance
	public static getInstance() {
    if (!Navigator.instance) {
      Navigator.instance = new Navigator();
    }

    return Navigator.instance;
  }

	// Resets the singleton's instance
	public static reset() {
		Navigator.instance = new Navigator();
	}

  private stack: Step[] = [];

  private constructor() { }

	// Returns content of the most recent step
  public show() {
    return !!this.stack.length && this.stack[this.stack.length - 1].show();
  }

	// Pushes the next step to the stack
  public go(step: Step) {
    this.stack.push(step);
  }

	// Replaces the most recent step
	public replace(step: Step) {
		this.stack.pop();
		this.stack.push(step);
	}

	// Returns if there are any steps on the stack to go back to
  public canGoBack() {
    return this.stack.length > 0;
  }

	// Removes the most recent step from the stack
  public goBack() {
    this.stack.pop();
  }
}

interface NavigatorInjectedProps {
  navigator: Navigator;
}

export function withNavigator<T, P>(component: (props: T) => P): (props: NavigatorInjectedProps & T) => P {
  const navigator = Navigator.getInstance();

  return (props) => component({ navigator, ...props });
}
