import {throttle} from '../utils';
import {toArray} from '../utils/array_helpers';

const __config = {
  className: 'sp-floating-bar',
  classModifier: '--fixed-top',
  classLink: 'sp-floating-bar__nav-link',
  classLinkModifier: 'sp-floating-bar__nav-link--current',
  triggerEl: 'sp-hero',
};
const __sections = [];

let __floatingBar = false;
let __triggerElement = false;
let __triggerY = false;

class SellaporterFloatingBar {

  constructor() {
    __floatingBar = document.getElementsByClassName(__config.className)[0];

    if (!!__floatingBar) {

      /*
       * After the trigger element scrolls out of frame (bottom hits the top of
       * the screen), the nav bar's modifier class is added.
       *
       * If no trigger element is found, the modifer is added immediately.
       */
      __triggerElement = document.getElementsByClassName(__config.triggerEl)[0];
      __triggerY = !!__triggerElement ? __triggerElement.offsetHeight : 0;

      // Set up a scroll listener to determine when to detach the nav bar.
      window.addEventListener('scroll', throttle(this.setActiveSection, 25), false);
      window.addEventListener('scroll', throttle(this.setBarVisibility, 25), false);

      window.addEventListener('click', this.scrollToSection);

      this.getLinkedSections();
    }
  }

  setBarVisibility() {
    if (window.scrollY >= __triggerY) {
      __floatingBar.classList.add(`${__config.className}${__config.classModifier}`);
      __floatingBar.nextElementSibling.classList.add('--hack_sp-floating-bar__sibling--add-top-margin');
    } else {
      __floatingBar.classList.remove(`${__config.className}${__config.classModifier}`);
      __floatingBar.nextElementSibling.classList.remove('--hack_sp-floating-bar__sibling--add-top-margin');
    }
  }

  getLinkedSections() {
    const links = toArray(__floatingBar.getElementsByClassName(__config.classLink));
    links.forEach(link => {
      if (!!link.href) {
        __sections.push({
          section: document.getElementById(link.href.split('#')[1]),
          link: link,
        });
      }
    });
  }

  setActiveSection() {
    const offsetY = window.scrollY + __floatingBar.offsetHeight;

    __sections.forEach(obj => {
      const top = obj.section.offsetTop;
      const bottom = top + obj.section.offsetHeight;
      if (top <= offsetY && bottom >= offsetY) {
        obj.link.classList.add(__config.classLinkModifier);
      } else {
        obj.link.classList.remove(__config.classLinkModifier);
      }
    });
  }

  scrollToSection(event) {
    const doc = getElementToScroll();
    const targetHref = event.target.href;
    const targetObj = __sections.filter(s => s.link.href === targetHref);

    if (targetObj.length) {
      event.preventDefault();

      // Section top, minus the floating nav height. Add 5 to avoid weirdness.
      const newY = targetObj[0].section.offsetTop - __floatingBar.offsetHeight + 5;
      scrollTo(doc, newY, 750);
    }
  }

};

const instance = new SellaporterFloatingBar();

export default instance;

function scrollTo(element, targetPos, duration) {
  return new Promise((resolve, reject) => {
    const currentPos = element.scrollTop;
    const posChange = targetPos - currentPos;
    const increment = 20;

    // Quadratic easing (in/out) from http://gizma.com/easing/#quad3 (modified)
    const easeInOut = (elapsed, start, change, length) => {
      elapsed /= length / 2;

      if (elapsed < 1) {
        return change / 2 * elapsed * elapsed + start;
      }

      elapsed--;

      return -change / 2 * (elapsed * (elapsed - 2) - 1) + start;
    };

    // Sets up a loop that executes for the length of time set in duration
    const animateScroll = (elapsedTime) => {
      elapsedTime += increment;

      const newPos = easeInOut(elapsedTime, currentPos, posChange, duration);

      // Actually sets the document's scroll setting
      element.scrollTop = newPos;

      if (elapsedTime < duration) {
        setTimeout(() => { animateScroll(elapsedTime); }, increment);
      } else {
        resolve();
      }
    };

    // Starts the animation
    animateScroll(0);
  });
}

function getElementToScroll() {
  return document.body.scrollTop ? document.body : document.documentElement;
}
