import Balloon from './balloon';

export default class Pump {
  private element: HTMLElement = undefined;
  private canInflate: Boolean = false;
  private balloonList: Set<Balloon> = new Set;
  private timer: NodeJS.Timeout;

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
        `nameId_${this.balloonList.size}`,
        'left=0, top=0, width=200, height=200, menubar=no, toolbar=no',
      )
    );

    balloon.element.addEventListener('click', () => { this.burstBall(balloon) });

    if (!this.balloonList.size) {
      this.timer = setInterval(() => { this.balloonObservable() }, 100);
    }

    this.balloonList.add(balloon);
  }

  private pumpUpBalloons(): void {
    this.balloonList.forEach((balloon: Balloon): void => {
      if (!!this.intersection(balloon)) balloon.pumpUp();
    })
  }

  private burstBall(balloon: Balloon): void {
    this.balloonList.delete(balloon);
    balloon.burst();

    if (!this.balloonList.size) {
      clearInterval(this.timer);
      setTimeout(() => { this.balloonObservable(); });
    }
  }

  private balloonObservable(): void {
    let hasLeftBalloons: Boolean = false;
    let hasRightBalloons: Boolean = false;

    this.balloonList.forEach((balloon: Balloon) => {
      if (!hasLeftBalloons && this.intersection(balloon) < 0) hasLeftBalloons = true;
      if (!hasRightBalloons && this.intersection(balloon) > 0) hasRightBalloons = true;
    });

    if (hasLeftBalloons && !this.element.classList.contains('left')) {
      this.element.classList.add('left');
    } else if (!hasLeftBalloons && this.element.classList.contains('left')) {
      this.element.classList.remove('left');
    }

    if (hasRightBalloons && !this.element.classList.contains('right')) {
      this.element.classList.add('right');
    } else if (!hasRightBalloons && this.element.classList.contains('right')) {
      this.element.classList.remove('right');
    }
  }

  /**
    -1: left side
    1: right side
    0: no intersection
   */
  private intersection(balloon: Balloon): -1|0|1 {
    if (
      window.screenY < balloon.element.screenY + balloon.element.innerHeight
      && window.screenY + window.innerHeight > balloon.element.screenY
      && window.screenX + window.innerWidth > balloon.element.screenX
      && window.screenX < balloon.element.screenX + balloon.element.innerWidth
    ) {
      // find and return side
      return balloon.element.screenX > window.screenX + window.innerWidth/2 ? 1 : -1;
    }
    return 0;
  }
}
