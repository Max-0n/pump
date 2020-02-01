import Balloon from './balloon';

export default class Pump {
  element: HTMLElement = undefined;
  size: number = 430;
  canInflate: Boolean = false;
  balloonList: Balloon[] = [];

  constructor(element: HTMLElement = null) {
    this.element = element;
    console.log(this.element);
  }

  onResize() {
    if (this.element.offsetHeight < 560 && this.canInflate) {
      this.canInflate = false;
    } else if (this.element.offsetHeight >= 560 && !this.canInflate) {
      this.canInflate = true;
    }
    console.log(`canInflate: ${this.canInflate}`);
  }
}
