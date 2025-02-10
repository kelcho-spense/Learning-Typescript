export class Counter {
  private counter = 0;
  private element: HTMLButtonElement;

  constructor(element: HTMLButtonElement) {
    this.element = element;
    this.element.addEventListener('click', () => this.setCounter(this.counter + 1));
    this.setCounter(0);
  }

  private setCounter = (count: number) => {
    this.counter = count;
    this.element.innerHTML = `count is ${this.counter}`;
  }
}
