import Balloon from './balloon';

export default class Pump {
  private element: HTMLElement = undefined;
  private canInflate: Boolean = false;
  private balloonList: Balloon[] = [];

  constructor(element: HTMLElement = null) {
    this.element = element;
    this.element.addEventListener('click', () => {
      this.createNewBalloon();
    });
  }

  public onResize(): void {
    if (this.element.offsetHeight < 560 && this.canInflate) {
      this.canInflate = false;
      new Audio(require('./pumpUp.mp3').default).play();
      this.pumpUpBalloons();
    } else if (this.element.offsetHeight >= 560 && !this.canInflate) {
      this.canInflate = true;
      new Audio(require('./pumpDown.mp3').default).play();
    }
  }

  private createNewBalloon(): void {
    const balloon: Balloon = new Balloon(
      window.open(
        window.location.href,
        `nameId_${this.balloonList.length}`,
        'left=100, top=100, width=200, height=200, menubar=no, toolbar=no',
      )
    );

    balloon.element.addEventListener('click', () => { this.burstBall(balloon) });
    this.balloonList.push(balloon);
  }

  private pumpUpBalloons(): void {
    this.balloonList.forEach((balloon: Balloon) => {
      balloon.pumpUp();
    })
  }

  private burstBall(balloon: Balloon) {
    this.balloonList.splice(this.balloonList.indexOf(balloon), 1);
    balloon.burst();
  }

}
