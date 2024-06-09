function CheckCookieExists(cookieName: string): boolean {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (name === cookieName) {
      return true;
    }
  }
  return false;
}

export default CheckCookieExists;
