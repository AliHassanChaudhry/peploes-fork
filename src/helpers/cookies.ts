export function setCookie(
  name: string,
  value: string,
  days?: number,
  options?: { sameSite?: "strict" | "lax" | "none"; secure?: boolean },
): void {
  let cookie = `${name}=${encodeURIComponent(value)}`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookie += `; expires=${date.toUTCString()}`;
  }

  cookie += "; path=/";
  cookie += `; samesite=${options?.sameSite ?? "lax"}`;

  if (
    options?.secure ??
    (typeof window !== "undefined" && window.location.protocol === "https:")
  ) {
    cookie += "; secure";
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax;`;
}

export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
