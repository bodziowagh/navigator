import Step from "./step";

export default class Navigator {

  private static instance: Navigator;

  private stack: Step[] = [];

  private constructor() { }

  public static getInstance() {
    if (!Navigator.instance) {
      Navigator.instance = new Navigator();
    }

    return Navigator.instance;
  }

  public pushStep(step: Step) {
    this.stack.push(step);

	return this;
  }

  public show() {
    return !!this.stack.length && this.stack[this.stack.length - 1].show();
  }

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
