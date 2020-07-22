import Detect from 'mobile-detect';

function Detecter() {
  return new Detect(window.navigator.userAgent);
}

export function isMobile() {
  return Boolean(Detecter().mobile());
}

export function isTablet() {
  return Boolean(Detecter().tablet());
}

export function isBarHidden() {
  const diff = window.outerHeight - window.innerHeight;

  const trigger = isChrome() ? window.outerHeight / 10 : 0;

  return diff <= trigger;
}

export function isPortrait() {
  return window.innerHeight > window.innerWidth;
}

export function isChrome() {
  const userAgent = window.navigator.userAgent;
  return /Chrome/i.test(userAgent) || /CriOS/i.test(userAgent);
}

export function isPWA() {
  return 'standalone' in window.navigator;
}

export function inIframe() {
  return window.self !== window.top;
}
