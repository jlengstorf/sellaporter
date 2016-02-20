/*
 * # Sellaporter Scripts
 * The entry point for all Sellaporter scripts.
 */

// Load styles into webpack. They're output to their own bundle.
require('../styles/sellaporter.css');

// If a PN Finalists box has been added, activate it.
// require('../templates/vendor/pn-finalists/source/init.js');

// Check for a finalists element.
const $finalistsEl = document.querySelector('.sp-finalists');
if (!!$finalistsEl) {

  // Remove the no-JS class to turn off fallback styling.
  $finalistsEl.classList.remove('sp-finalists--no-js');

  // Render the React component into the DOM.
  ReactDOM.render(
    React.createElement(PNFinalists),
    $finalistsEl
  );
}

// Block-specific scripts
import spFloatingBar from './blocks/sp-floating-bar';
import spPopover from './blocks/sp-popover';
