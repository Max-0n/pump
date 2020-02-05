export default class Balloon {
  public element: Window = undefined;
  private colors: string[] = ['#42cef5', '#4251f5', '#ce42f5', '#f5429e', '#f54242', '#f5b342', '#f5f542', '#78f542', '#2624b3', '#7b13ab', '#92ab13', '#ab135c', '#649c85'];

  constructor(element: Window = window) {
    const color = this.colors[Math.round(Math.random()*10)]

    this.element = element;
    this.element.document.body.style.backgroundColor = color;
    console.log('%cNew Balloon', `color: white; font-weight: bold; background: ${color}; padding:3px 5px;`);
  }

  public pumpUp() {
    this.element.resizeTo(
      this.element.innerWidth + 50,
      this.element.innerHeight + 100
    );
  }

  public burst() {
    new Audio(require('./burst.mp3').default).play();
    this.element.close();
  }
}
