export function debounce(func, wait = 200) {
  let timeout;

  return () => {
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}

/**
 * Prevents a function from firing too often.
 * @param  {Function} func  the function to throttle
 * @param  {Number}   limit the amount of milliseconds to wait between calls
 * @return {Function}       function to check if the function should be called
 */
export function throttle(func, limit = 200) {
  let wait = false;

  return () => {
    if (!wait) {
      func.call();
      wait = true;
      setTimeout(() => { wait = false; }, limit);
    }
  };
}
