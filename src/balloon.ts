export default class Balloon {
  element: any = undefined;
  color: string = '#c1c2c3';
  width: number = 200;
  height: number = 200;

  constructor(element: any = null, color: string = '#c1c2c3', width: number = 100, height: number = 100) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.element = element;
    console.log(element);
    console.log('%cNew Balloon', `color: white; font-weight: bold; background: ${color}; padding:3px 5px;`);
  }

  scaleUp() {
    this.width += 50;
    this.height += 50;
  }
}


// balloonList.push(new Balloon(null, 'purple'));
