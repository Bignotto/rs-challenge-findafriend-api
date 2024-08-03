export function parseCookie(cookieString: string) {
  return cookieString.split(";")[0].split("=")[1];
}
