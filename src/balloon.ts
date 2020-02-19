export default class Balloon {
  public element: Window;
  private colors: string[] = ['cyan','blue','purple','pink','red','yellow','green'];
  constructor(element: Window = window) {
    const color = this.colors[Math.round(Math.random()*6)];

    this.element = element;
    this.element.document.body.classList.add(color);
    this.element.document.body.addEventListener('click', () => {
      this.element.close();
    });
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
