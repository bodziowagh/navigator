export default class Step<T = any> {

  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  public show(): T {
    return this.content;
  }
}
