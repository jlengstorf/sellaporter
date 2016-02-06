import {throttle} from '../utils';

const __config = {
  className: 'sp-floating-bar',
  triggerEl: 'sp-hero',
};

let __floatingBar = false;
let __triggerElement = false;
let __triggerY = false;

class SellaporterFloatingBar {

  constructor() {
    __floatingBar = document.getElementsByClassName(__config.className)[0];

    console.log(__floatingBar);

    if (!!__floatingBar) {
      __triggerElement = document.getElementsByClassName(__config.triggerEl)[0];
      __triggerY = !!__triggerElement ? __triggerElement.offsetHeight : 0;

      window.addEventListener('scroll', throttle(this.setBarVisibility), false);
    }
  }

  setBarVisibility() {
    console.log('Checking bar visibility');
    console.log(`window.scrollY: ${window.scrollY}`);
    console.log(`__triggerY: ${__triggerY}`);
    if (window.scrollY >= __triggerY) {
      __floatingBar.classList.remove(`${__config.className}--hidden`);
    } else {
      __floatingBar.classList.add(`${__config.className}--hidden`);
    }
  }

};

const instance = new SellaporterFloatingBar();

export default instance;
