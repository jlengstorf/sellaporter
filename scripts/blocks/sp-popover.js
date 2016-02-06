/*
 * Interaction handling and validation for the popover.
 */

// document.addEventListener('click', event => {

//   if (event.target.classList.contains('sp-hero__button--popover')) {
//     event.preventDefault();
//     console.log('CTA button clicked!');
//   }

// });

/*
 * Load dependencies and helper functions.
 */
import {intersect, toArray} from '../utils/array_helpers';

/*
 * Create "private class properties" by keeping them locked in module scope.
 */
const __config = {
  popoverClass: 'sp-popover',
  buttonClasses: [
    'sp-hero__button--popover',
    'sp-button--popover',
    'sp-cta__button--popover',
    'sp-pricing__button--popover',
  ],
  transitionClasses: {
    animate: 'sp-popover--fade-out',
    hide: 'sp-popover--hidden',
  },
  transitionSpeed: 150,
};

let __popover = false;

class SellaporterPopover {

  constructor() {

    // There _should_ only ever be a single popover, so grab the first one.
    __popover = document.getElementsByClassName(__config.popoverClass)[0];

    // If no popover exists in the DOM, we're done here.
    if (!!__popover) {

      document.querySelector(`.${__config.popoverClass}__close-btn`).addEventListener('click', event => {
        event.preventDefault();
        _hidePopover();
      });

      this.registerClickHandlers();
    }
  }

  registerClickHandlers() {
    document.addEventListener('click', event => {
      const sel = toArray(__config.buttonClasses);
      const cls = toArray(event.target.classList);
      if (intersect(sel, cls).length) {
        event.preventDefault();
        _showPopover();
      }
    });
  }

}

const instance = new SellaporterPopover();

export default instance;

/*
 * Helper functions
 */

function _showPopover() {

  // Make the popover visible by removing the class that hides it.
  __popover.classList.remove(__config.transitionClasses.hide);
  __popover.classList.remove(__config.transitionClasses.animate);
}

function _hidePopover() {

  // Make the popover visible by removing the class that hides it.
  __popover.classList.add(__config.transitionClasses.animate);

  // Hide it for real once the animation is complete.
  setTimeout(() => {
    __popover.classList.add(__config.transitionClasses.hide);
  },  __config.transitionSpeed);
}
