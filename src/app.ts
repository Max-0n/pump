console.log('%cCreated by Max0n', 'color: #fff; font-weight: bold; background: #47c; padding:3px 5px;');
require('./style.scss');
import Pump from './pump';
import Balloon from './balloon';

const pump: Pump = new Pump(document.getElementById('pump'));

if (window.opener) {
  document.getElementById('pump').remove();
  new Balloon();
} else {
  window.addEventListener("resize", () => {
    pump.onResize();
  });
}
