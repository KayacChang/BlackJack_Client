import { isMobile } from './device';
import { currency } from './format';

export function getURLParam(key: string) {
  const url = new URL(window.location.href);

  return url.searchParams.get(key);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function throttleBy<T>(func: () => Promise<T>) {
  //
  let fetching = false;

  return async function () {
    if (fetching) return;

    fetching = true;

    await func();

    fetching = false;
  };
}

export * from './check';
export { isMobile, currency };
