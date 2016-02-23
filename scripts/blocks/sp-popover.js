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

  // Any button with a `--popover` modifier should open the popover.
  buttonModifier: new RegExp(/--popover\b/),
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
      const closeBtnSel = `.${__config.popoverClass}__close-btn`;

      document.querySelector(closeBtnSel).addEventListener('click', event => {
        event.preventDefault();
        _hidePopover();
      });

      this.registerClickHandlers();
    }
  }

  registerClickHandlers() {
    document.addEventListener('click', event => {
      const cls = toArray(event.target.classList);

      // Checks the element's classList for the popover modifier.
      if (__config.buttonModifier.test(cls)) {
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
