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

class SellaporterPopover {

  constructor(config) {

    // Get the config options, setting defaults if necessary.
    this.config = this._getConfig(config);

    // There _should_ only ever be a single popover, so grab the first one.
    this.popover = document.getElementsByClassName(this.config.popoverClass)[0];

    // If no popover exists in the DOM, we're done here.
    if (!!this.popover) {
      const closeBtnSel = `.${this.config.popoverClass}__close-btn`;

      document.querySelector(closeBtnSel).addEventListener('click', event => {
        event.preventDefault();
        this._hidePopover();
      });

      this.registerClickHandlers();
    }
  }

  registerClickHandlers() {
    document.addEventListener('click', event => {
      const cls = toArray(event.target.classList);

      // Checks the element's classList for the popover modifier.
      if (this.config.buttonModifier.test(cls)) {
        event.preventDefault();
        this._showPopover();
      }
    });
  }

  _getConfig({
      popoverClass = 'sp-popover',
      buttonModifier = new RegExp(/--popover\b/),
      transitionClasses = {
        animate: 'sp-popover--fade-out',
        hide: 'sp-popover--hidden',
      },
      transitionSpeed = 150,
      showPopoverCB = ()=>{},
      hidePopoverCB = ()=>{},
    } = {}) {
    return {
      popoverClass,
      buttonModifier,
      transitionClasses,
      transitionSpeed,
      showPopoverCB,
      hidePopoverCB,
    };
  }

  _showPopover() {

    // Make the popover visible by removing the class that hides it.
    this.popover.classList.remove(this.config.transitionClasses.hide);
    setTimeout(() => {
      this.popover.classList.remove(this.config.transitionClasses.animate);
    }, 10);

    this.config.showPopoverCB();
  }

  _hidePopover() {

    // Make the popover visible by removing the class that hides it.
    this.popover.classList.add(this.config.transitionClasses.animate);

    // Hide it for real once the animation is complete.
    setTimeout(() => {
      this.popover.classList.add(this.config.transitionClasses.hide);
    },  this.config.transitionSpeed);

    this.config.hidePopoverCB();
  }

}

const instance = new SellaporterPopover();

export default instance;

export { SellaporterPopover as Popover };
