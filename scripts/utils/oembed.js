export function vimeo(videoUrl, callback) {
  const endpoint = 'https://vimeo.com/api/oembed.json';
  const url = `${endpoint}?url=${videoUrl}&callback=${callback}`;

  __addScriptToHead(url);
}

function __addScriptToHead(url) {
  const oembedJS = document.createElement('script');
  oembedJS.setAttribute('type', 'text/javascript');
  oembedJS.setAttribute('src', url);
  document.getElementsByTagName('head').item(0).appendChild(oembedJS);
}
