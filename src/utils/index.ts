import { isMobile } from './device';
import { currency } from './format';

export function getURLParam(key: string) {
  const url = new URL(window.location.href);

  return url.searchParams.get(key);
}

export async function getToken() {
  const res = await fetch(`https://api.sunnyland.fun/v1/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Session: '8b674aec-156c-4894-a102-f3315272f626',
    },
    body: JSON.stringify({
      game: 'catpunch',
      username: 'mouse1',
    }),
  });

  const { data } = await res.json();

  return data.token.access_token;
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

export function random(min: number, max?: number) {
  if (!max) {
    max = min;
    min = 0;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return min + (max - min) * Math.random();
}

export * from './check';
export { isMobile, currency };
