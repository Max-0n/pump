require('./style.scss');
import Pump from './pump';


console.log('%cCreated by Max0n', 'color: #fff; font-weight: bold; background: #47c; padding:3px 5px;');
const pump = new Pump(document.getElementById('pump'));

window.addEventListener("resize", () => {
  pump.onResize();
});
