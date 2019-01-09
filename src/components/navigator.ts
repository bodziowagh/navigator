import Step from "./step";

export default class Navigator {

  public static getInstance() {
    if (!Navigator.instance) {
      Navigator.instance = new Navigator();
    }

    return Navigator.instance;
  }

  private static instance: Navigator;
}

interface NavigatorInjectedProps {
  navigator: Navigator;
}

export function withNavigator<T, P>(component: (props: T) => P): (props: NavigatorInjectedProps & T) => P {
  const navigator = Navigator.getInstance();

  return (props) => component({ navigator, ...props });
}
