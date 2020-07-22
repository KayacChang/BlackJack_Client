export function isFullScreenSupport(target: HTMLElement) {
  return target.requestFullscreen;
}

export async function requestFullScreen(element: HTMLElement) {
  if (!isFullScreenSupport(element)) return;

  await element.requestFullscreen({
    navigationUI: 'hide',
  });
}

export async function exitFullscreen() {
  await document.exitFullscreen();
}

export function isCurrentFullScreen() {
  return Boolean(document.fullscreen || document.fullscreenElement);
}
