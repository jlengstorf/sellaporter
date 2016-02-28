import {Popover} from './sp-popover';
import {vimeo} from '../utils/oembed';

const __config = {
  popoverClass: 'sp-video-popover',
  buttonModifier: new RegExp(/--video\b/),
  transitionClasses: {
    animate: 'sp-video-popover--fade-out',
    hide: 'sp-video-popover--hidden',
  },
  showPopoverCB: startVimeoEmbed,
  hidePopoverCB: stopVimeoEmbed,
};

let __popover = false;
let __player = false;

class SellaporterVideoPopover {

  constructor() {

    // Start by checking if there's a button that opens a video on the page.
    const $btn = document.querySelector('[data-video-url]');
    if ($btn) {

      // Create a popover and append it to the DOM.
      __createVideoPopover();

      // Get the popover controls working properly.
      new Popover(__config);

      // Use Oembed to get the markup for displaying the video.
      vimeo(encodeURIComponent($btn.getAttribute('data-video-url')), 'handleVimeoJSONP');
    }
  }

}

function __createVideoPopover() {
  __popover = document.getElementsByClassName(__config.popoverClass)[0];

  if (!__popover) {
    const $container = document.createElement('div');
    $container.classList.add(`${__config.popoverClass}__container`);

    const $embed = document.createElement('div');
    $embed.classList.add(`${__config.popoverClass}__embed-container`);

    $container.appendChild($embed);

    const $closeBtn = document.createElement('a');
    $closeBtn.classList.add(`${__config.popoverClass}__close-btn`);
    $closeBtn.innerHTML = '&times;';

    __popover = document.createElement('div');
    __popover.classList.add(__config.popoverClass);
    __popover.classList.add(__config.transitionClasses.animate);
    __popover.classList.add(__config.transitionClasses.hide);

    __popover.appendChild($container);
    __popover.appendChild($closeBtn);

    document.body.appendChild(__popover);
  }

  return __popover;
}

function handleVimeoJSONP(containerClass, video) {
  if (video) {
    const $container = document.getElementsByClassName(containerClass).item(0);
    $container.innerHTML = unescape(video.html);

    enableVimeoAPI();
  }
}

function enableVimeoAPI() {
  const iframe = __popover.getElementsByTagName('iframe')[0];

  // We're using Vimeo's Froogaloop for this. (https://git.io/v22fy)
  __player = $f(iframe);
}

function startVimeoEmbed() {
  __player.api('play');
}

function stopVimeoEmbed() {
  __player.api('pause');
}

// Since the Vimeo Oembed is called by another script, we add this to `window`.
window.handleVimeoJSONP = handleVimeoJSONP.bind(null, `${__config.popoverClass}__embed-container`);

const instance = new SellaporterVideoPopover();

export default instance;
