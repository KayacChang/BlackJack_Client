import { isMobile } from "./device";
import { currency } from "./format";

export function getURLParam(key: string) {
  const url = new URL(window.location.href);

  return url.searchParams.get(key);
}

export * from "./check";
export { isMobile, currency };
