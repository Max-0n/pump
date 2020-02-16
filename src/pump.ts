import Balloon from './balloon';

export default class Pump {
  private element: HTMLElement = undefined;
  private canInflate: Boolean = false;
  private balloonList: Balloon[] = [];
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
        `nameId_${this.balloonList.length}`,
        'left=0, top=0, width=200, height=200, menubar=no, toolbar=no',
      )
    );

    balloon.element.addEventListener('click', () => { this.burstBall(balloon) });

    if (!this.balloonList.length) {
      this.timer = setInterval(() => { this.balloonObservable() }, 100);
    }

    this.balloonList.push(balloon);
  }

  private pumpUpBalloons(): void {
    this.balloonList.forEach((balloon: Balloon): void => {
      balloon.pumpUp();
    })
  }

  private burstBall(balloon: Balloon): void {
    this.balloonList.splice(this.balloonList.indexOf(balloon), 1);
    balloon.burst();

    if (!this.balloonList.length) clearInterval(this.timer);
  }

  private balloonObservable(): void {
    const statsElement: Element = document.getElementById('stats');
    let result: string = `<b>
      Y:${window.screenY}; X:${window.screenX};
      h:${window.innerHeight}; w:${window.innerWidth};
      </b><br><br>`;

    this.balloonList.forEach((balloon: Balloon) => {
      result += `Y:${balloon.element.screenY};
      X${balloon.element.screenX};
      {${this.intersection(balloon)}}<br>`;

    });

    statsElement.innerHTML = result;
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
