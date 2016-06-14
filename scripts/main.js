/*
 * # Sellaporter Scripts
 * The entry point for all Sellaporter scripts.
 */

// Load styles into webpack. They're output to their own bundle.
require('../styles/sellaporter.css');

// If a PN Finalists box has been added, activate it.
// require('../templates/vendor/pn-finalists/source/init.js');

// Grab the viewport dimensions.
const viewport = {
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
};

// This is a hack, and I hate it, but I don't have time to debug iDevices right now
const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// The hacks are piling up, here.
const ie11 = !!window.MSInputMethodContext && !!document.documentMode;

// Check for a finalists element.
const $finalistsEl = document.querySelector('.sp-finalists');
if (!!$finalistsEl && !iOS && !ie11 && viewport.width >= 768) {

  // Remove the no-JS class to turn off fallback styling.
  $finalistsEl.classList.remove('sp-finalists--no-js');

  // Render the React component into the DOM.
  ReactDOM.render(
    React.createElement(PNFinalists),
    $finalistsEl
  );
}

if (iOS) {
  document.body.classList.add('js--ios');
}

// Block-specific scripts
import spFloatingBar from './blocks/sp-floating-bar';
import spPopover from './blocks/sp-popover';
import spVideoPopover from './blocks/sp-video-popover';

/*
 * Since the data is going to show us that hamburger navs are a bad idea, I'm
 * not going to bother making this clean.
 */
const toggleHamburger = event => {
  const navClass = 'sp-floating-bar__nav-items';
  const linkClass = 'sp-floating-bar__nav-link';
  const openClass = 'sp-floating-bar__nav-items--open';

  // For the hamburger toggle itself.
  if (event.target.classList.contains(navClass)) {
    event.preventDefault();
    event.target.classList.toggle(openClass);
  }

  // When a nav link is clicked, close the menu.
  if (event.target.classList.contains(linkClass)) {
    const nav = document.querySelector(`.${navClass}`);
    nav.classList.remove(openClass);
  }
};

document.addEventListener('click', toggleHamburger);
